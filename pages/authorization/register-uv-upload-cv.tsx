/* eslint-disable @next/next/no-css-tags */
import Image from "next/image";
import styles from "./register-uv-upload-cv.module.scss";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, Radio, RadioChangeEvent, Select, Space, Upload, message } from "antd";
import { format, getYear, isValid, parse } from "date-fns";
import { useContext, useState } from "react";
import {
    cookieAuth,
    cookieId,
    cookieLogin,
    cookieName,
    cookiePhone,
    cookieStep1,
    cookieTempId,
    cookieToken,
    cookieType,
    setMultipleCookie,
    useLoading,
} from "@/components/service/functions";
import { POST } from "../api/base-api";
import Cookies from "js-cookie";
import { registerStep2Upload, registerStep2UploadType } from "../api/handle_uv";
import { useRouter } from "next/router";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";

const { Dragger } = Upload;
const optionsExp: any = [
    {
        value: 0,
        label: "Chưa có kinh nghiệm",
    },
    {
        value: 1,
        label: "Dưới 1 năm",
    },
    {
        value: 2,
        label: "1 năm",
    },
    {
        value: 3,
        label: "2 năm",
    },
    {
        value: 4,
        label: "3 năm",
    },
    {
        value: 5,
        label: "4 năm",
    },
    {
        value: 6,
        label: "5 năm",
    },
    {
        value: 7,
        label: "Trên 5 năm",
    },
    {
        value: 8,
        label: "Trên 10 năm",
    },
    {
        value: 9,
        label: "Trên 15 năm",
    },
    {
        value: 10,
        label: "Trên 20 năm",
    },
    {
        value: 11,
        label: "Trên 25 năm",
    },
];

const Register_Upload_CV = () => {
    const { setAll, setCandiAllowEmployerSearch } = useContext(NTD_UV_Context)
    const [cvFile, setCvFile] = useState<any>(null)
    const [cvFileName, setCvFileName] = useState('')
    const [cvApi, setCvApi] = useState('')
    const { contextHolder, startMessage, stopMessage } = useLoading()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [typeUpload, setTypeUpload] = useState(1)

    const handleFile = (newFile: File) => {
        // Check file type
        const allowedTypes = typeUpload === 1 ? 
        [
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/pdf",
            "image/png",
            "image/jpeg",
            "image/jpg",
        ] : 
        ["video/mp4"];

        const allowedSize = typeUpload === 1 ? 10 * 1024 * 1024 : 50 * 1024 * 1024

        if (!allowedTypes.includes(newFile.type)) {
            alert(`Hãy chọn file hợp lệ (${typeUpload === 1 ? 'doc, docx, pdf, png, jpg, jpeg' : 'mp4'})`);
            return;
        }

        // Check file size
        if (newFile.size > allowedSize) {
            alert(`Tệp không được lớn hơn ${typeUpload === 1 ? '10MB' : '50MB'}`);
            return;
        }

        setCvFile(newFile);
        setCvFileName(newFile.name);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const dropFile = e.dataTransfer.files[0];
        handleFile(dropFile);
    };

    const handleClickFile = () => {
        const inputFile = document.getElementById("up_cv");
        if (inputFile) inputFile.click();
    };

    const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            handleFile(selectedFile);
        }
    };

    const clearFile = () => {
        setCvFile(null);
        setCvFileName("");
    };

    const handleChangeTypeUpload = (e: RadioChangeEvent): void => {
        clearFile()
        setTypeUpload(e.target.value)
    }

    // const handleChangeTypeUpload = (e: Event) => {
    //     setTypeUpload(e.target.value)
    // }

    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
        getValues,
        setError,
    } = useForm({
        defaultValues: {
            birthday: "",
            bangcap: "",
            exp: 0,
        },
    });

    // console.log(cvFile)
    const onSubmit = async (data: any) => {
        // console.log(cv)
        // console.log(data)
        // startMessage('Đang xử lý...')
        if (cvFile) {
            const isStep1Ok = Cookies.get(cookieStep1)
            const step1Id = Cookies.get(cookieTempId)
            if (isStep1Ok && step1Id && isStep1Ok === '1' && step1Id !== '0') {
                const formData: any = {
                    CV: cvFile,
                    birthday: data.birthday,
                    exp: data.exp,
                    bangcap: data.bangcap,
                    id: Number(step1Id) || 0,
                    type: typeUpload,
                }
                setIsLoading(true)
                const result = await POST('user/CandidateRegisterByUploadCV', formData)
                setIsLoading(false)
                if (result?.result) {
                    // alert('Upload CV thành công')
                    alert(`${result?.message}`)

                    setMultipleCookie(
                        `${result?.Token}`,
                        `${result?.use_id}`,
                        `${result?.auth}`,
                        `${result?.type}`,
                        `${result?.userName}`,
                        `${result?.phone}`,
                        `${result?.use_logo}`,
                    )
                    setAll(`${result?.userName}`,
                        `${result?.phone}`,
                        `${result?.use_logo}`,)
                    // TODO Sửa cả tạo CV nữa 
                    Cookies.remove(cookieStep1)
                    Cookies.remove(cookieTempId)
                    setCandiAllowEmployerSearch('1')
                    // router.push('/ung-vien/quan-ly-chung')
                    // router.push('/ma-otp')

                    // Luồng mới, ứng viên mới đăng ký chưa cần xác thực ngay
                    router.push('/')
                } else {
                    alert(`${result?.message}`)
                }
            }
        } else {
            startMessage("Hãy đăng tệp CV của bạn", "error", 3);
        }
    };

    return (
        <>
            {contextHolder}
            <link rel="stylesheet" href="styles/register_select.css" />
            <div className={styles.wrapper_layout}>
                <div className={styles.wrapper_body}>
                    <div className={styles.wrapper_content}>
                        <div className={styles.container_left}>
                            <div className={styles.content_left}>
                                <div className={styles.wrapper_img}>
                                    <Image
                                        height={124}
                                        width={377}
                                        src="/images/authorization/img_right.png"
                                        alt=""
                                    />
                                </div>
                                <p className={styles.title}>
                                    Tìm việc nhanh, tuyển dụng hiệu quả
                                </p>
                            </div>
                            <Image
                                height={354}
                                width={606}
                                src="/images/authorization/img_bot_left.svg"
                                className={styles.images_bot}
                                alt=""
                            ></Image>
                        </div>
                        <form
                            className={styles.container_right}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <p className={styles.title_right}>
                                HOÀN THIỆN ĐĂNG KÝ HỒ SƠ ỨNG VIÊN
                            </p>
                            <div className={styles.box_top_info}>
                                <div className={styles.form_gr}>
                                    <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                                        <label htmlFor="birthday" className={styles.form_title}>
                                            Ngày sinh <span className={styles.red_star}>*</span>
                                        </label>
                                        <Controller
                                            name="birthday"
                                            control={control}
                                            rules={{
                                                required: "Vui lòng chọn ngày sinh",
                                                validate: {
                                                    notInThisYear: (value: any) =>
                                                        getYear(new Date()) !== getYear(new Date(value)) ||
                                                        "Không được chọn năm hiện tại",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <>
                                                    <input
                                                        type="date"
                                                        {...field}
                                                        className={`${styles.form_control} ${styles.valid}`}
                                                        // onChange={(e) => {
                                                        //     if (e.target.valueAsDate !== null) {
                                                        //         field.onChange(format(e.target.valueAsDate, 'yyyy-MM-dd'))
                                                        //     } else {
                                                        //         field.onChange('')
                                                        //     }
                                                        //     //// field.onChange(formatDateForStorage(e.target.value))
                                                        // }}
                                                        style={{
                                                            paddingRight: "18px",
                                                        }}
                                                        max={format(new Date(), "yyyy-MM-dd")}
                                                    // value={field.value ? formatDateForDisplay(field.value) : ''}
                                                    // value={field.value ? formatDateForDisplay(field.value) : ''}
                                                    // onChange={(e) => field.onChange(formatDateForStorage(e.target.value))}
                                                    />
                                                    {errors.birthday &&
                                                        typeof errors.birthday?.message === "string" && (
                                                            <span className={styles.text_error}>
                                                                {errors.birthday?.message}
                                                            </span>
                                                        )}
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div className={`${styles.form_reg} ${styles.reg_right_50}`}>
                                        <label htmlFor="exp" className={styles.form_title}>
                                            Kinh nghiệm làm việc{" "}
                                            <span className={styles.red_star}>*</span>
                                        </label>
                                        <Controller
                                            name="exp"
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    <Select
                                                        {...field}
                                                        placeholder="Vui lòng chọn"
                                                        onChange={(exp) => {
                                                            field.onChange(exp);
                                                        }}
                                                        style={{
                                                            width: "98%",
                                                            marginLeft: "1%",
                                                            // overflow: 'hidden'
                                                        }}
                                                        size="large"
                                                        options={optionsExp}
                                                    />
                                                    {errors.exp &&
                                                        typeof errors.exp?.message === "string" && (
                                                            <span className={styles.text_error}>
                                                                {errors.exp?.message}
                                                            </span>
                                                        )}
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div className={`${styles.form_reg} `}>
                                        <label htmlFor="bangcap" className={styles.form_title}>
                                            Bằng cấp <span className={styles.red_star}>*</span>
                                        </label>
                                        <Controller
                                            name="bangcap"
                                            control={control}
                                            rules={{
                                                required: "Vui lòng nhập bằng cấp",
                                            }}
                                            render={({ field }) => (
                                                <>
                                                    <input
                                                        type="text"
                                                        {...field}
                                                        className={styles.form_control}
                                                        id="position"
                                                        placeholder="Nhập bằng cấp"
                                                    />
                                                    {errors.bangcap && (
                                                        <span className={styles.text_error}>
                                                            {errors.bangcap.message}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div className={`${styles.form_reg} `}>
                                        <div className={`${styles.radio_group}`}>
                                            <label htmlFor="type" className={styles.form_title}>
                                                Hình thức tải:
                                            </label>
                                            <Radio.Group
                                                name="type"
                                                onChange={handleChangeTypeUpload}
                                                value={typeUpload}
                                            >
                                                <Space>
                                                    <Radio value={1}>Tải lên file CV</Radio>
                                                    <Radio value={2}>Tải lên video</Radio>
                                                </Space>
                                            </Radio.Group>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_reg} `}>
                                        <div className={styles.upload_cv}
                                            onDragOver={(e) => { e.preventDefault() }}
                                            onDrop={handleDrop}
                                        >
                                            {!cvFile ?
                                                <div className={styles.drag_drop_container}>
                                                    <div className={styles.file_icon} onClick={handleClickFile}>
                                                        <img src='/images/upLoadCV_2.png' alt='Images ChooseCV' style={{ objectFit: 'cover', width: '150px' }} />
                                                    </div>
                                                    <div className={styles.cv_title} onClick={handleClickFile}>{`Chọn ${typeUpload === 1 ? 'CV' : 'Video'} từ máy tính của bạn`}</div>
                                                    <div className={styles.cv_note}>{`Tải lên ${typeUpload === 1 ? 'DOC, DOCX, PDF, PNG, JPG & JPEG' : 'MP4'}. Kích thước tối đa ${typeUpload === 1 ? '10MB' : '50MB'}`}</div>
                                                </div> :
                                                <div className={styles.cv_file_container}>
                                                    <div className={styles.cv_file}>
                                                        <span className={styles.delete_file} onClick={clearFile}>x</span>
                                                        <div className={styles.file_icon_upload}>
                                                            <img src='/images/upLoadCV_3.png' alt='Images ChooseCV' style={{ objectFit: 'cover', width: '75px' }} />
                                                        </div>
                                                        <div className={styles.cv_name}>{cvFileName}</div>
                                                    </div>
                                                </div>}
                                            <input
                                                type="file"
                                                hidden
                                                id="up_cv"
                                                onChange={handleInputFileChange}
                                                accept={typeUpload === 1 ? ".doc,.docx,.pdf,.png,.jpg,.jpeg" : ".mp4"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.box_confirm}>
                                <button
                                    className={styles.btn_confirm}
                                    type="submit"
                                    disabled={isLoading}
                                    style={{
                                        cursor: isLoading ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    ĐĂNG KÝ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register_Upload_CV;
