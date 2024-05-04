/* eslint-disable @next/next/no-css-tags */
import { Select } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import styles from './register-ntd.module.scss';
import { useForm, Controller } from 'react-hook-form';
import Upload_img_ntd from '@/components/common/upload_img_ntd';
import { POST, POST_SERVER } from '../api/base-api';
import { useRouter } from 'next/router';
import { cookieToken, cookieType, setMultipleCookie } from '@/components/service/functions';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { NextPage, NextPageContext } from 'next';
import { getAllCity } from '@/functions/functions';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
const options: any = [];

for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}

const handleChange = (value: string | string[]) => {
    // console.log(`Selected: ${value}`);
};

export const getServerSideProps = async (context: NextPageContext) => {
    // let returnData = []
    // const result = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_NEW}/new/getCity`, { ga: 1 })
    // if (result?.result) {
    //     returnData = result?.data.map((city: any) => {
    //         return {
    //             value: city?.cit_id,
    //             label: city?.cit_name,
    //         }
    //     })
    // }

    return {
        props: {
            // city: returnData
        }
    }
}

const Register: NextPage<{}> = ({ }) => {
    const { setAll } = useContext(NTD_UV_Context)
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    };
    const [isRePasswordVisible, setRePasswordVisibility] = useState(false);
    const toggleRePasswordVisibility = () => {
        setRePasswordVisibility(!isRePasswordVisible);
    };
    const router = useRouter()
    // Xử lý ảnh
    const [parentImages, setParentImages] = useState<any[]>([]);
    const handleImagesChange = (newImages: any[]) => {
        setParentImages(newImages);
    };
    // console.log(parentImages);
    const { handleSubmit, control, register, formState: { errors }, getValues } = useForm({
        defaultValues: {
            sdt: '',
            email: '',
            password: '',
            confirmPassword: '',
            companyName: '',
            selectedOptions: [],
            companyDescription: ''
        },
    });

    // console.log(getValues('selectedOptions'))

    const onSubmit = async (data: any) => {
        const result = await POST('user/RegisterEmployers',
            {
                phoneTK: data.sdt,
                email: data.email,
                password: data.password,
                rePassword: data.confirmPassword,
                nameCompany: data.companyName,
                city: data.selectedOptions,
                descriptions: data.companyDescription,
                // image:data.image,
                'Image[]': parentImages.map(img => img.file),
            })
        // TODO Test sau khi sua API
        // console.log(result)
        if (result?.result) {
            alert(`${result?.message}\nHãy xác thực số điện thoại`)
            // router.push('/authorization/login-ntd')
            setMultipleCookie(
                `${result?.token}`,
                `${result?.checkInfo?.usc_id}`,
                '0',
                '1',
                data.companyName,
                data.sdt,
            )
            setAll(data.companyName, data.sdt)
            // Cookies.set(cookieToken, result?.token)
            // Cookies.set(cookieType, '1')
            router.push('/ma-otp')
        } else {
            if (typeof result?.message === 'object')
                alert(Object.values(result?.message).join('\n'))

            if (typeof result?.message === 'string')
                alert(result?.message)
        }

        // console.log(data);
        // console.log(parentImages.map(img => img.file))
    };
    return (
        <>
            <link rel="stylesheet" href="styles/register_select.css" />
            <div style={{
                width: '100%',
                height: '100%',
            }}>
                <Link href={'/dang-ky'}>
                  <div
          style={{
            position: "absolute",
            left: "10px",
            top: "15px",
            width: "50px",
            height: "50px",
            zIndex: 10
          }}
        >
          <svg
            width="31"
            height="18"
            viewBox="0 0 31 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.7194 2.84785C11.0127 2.52683 11.1724 2.10225 11.1648 1.66354C11.1572 1.22483 10.9829 0.806251 10.6787 0.495988C10.3744 0.185726 9.96389 0.00800433 9.53366 0.000263828C9.10342 -0.00747668 8.68703 0.155368 8.37221 0.454493L1.17357 7.79261L0 8.98928L1.17357 10.186L8.37 17.5241C8.68307 17.8327 9.10249 18.0036 9.53793 17.9999C9.97337 17.9963 10.39 17.8184 10.698 17.5046C11.0061 17.1908 11.1809 16.7661 11.1849 16.3221C11.1889 15.8781 11.0217 15.4502 10.7194 15.1307L6.35721 10.6827H29.3393C29.7797 10.6827 30.2021 10.5043 30.5136 10.1867C30.825 9.86913 31 9.43841 31 8.98928C31 8.54016 30.825 8.10944 30.5136 7.79186C30.2021 7.47429 29.7797 7.29587 29.3393 7.29587H6.35721L10.7194 2.84785Z"
              fill="#F8F8F8"
            />
          </svg>
        </div>
                </Link>
                <Image src="/images/authorization/bg-regis-768.png" alt="" fill/>

                <div className={styles.wrapper_layout} >
                    <div className={styles.wrapper_body}>
                        <div className={styles.wrapper_content}>
                            <div className={styles.container_left}>
                                <div className={styles.content_left}>
                                    <div className={styles.wrapper_img}>
                                        <Image height={124} width={377} src="/images/authorization/img_right.png" alt="" />
                                    </div>
                                    <p className={styles.title}>Tìm việc nhanh, tuyển dụng hiệu quả</p>
                                </div>
                                <Image height={354} width={606} src='/images/authorization/img_bot_left.svg' className={styles.images_bot} alt=''></Image>
                            </div>
                            <form className={styles.container_right} onSubmit={handleSubmit(onSubmit)}>
                            <p className={styles.title_right}>ĐĂNG KÝ TÀI KHOẢN NHÀ TUYỂN DỤNG ĐỂ ĐĂNG TIN MIỄN PHÍ</p>
                            <div className={styles.box_top_info}>
                                <div className={styles.form_gr}>
                                    <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                                        <label htmlFor="sdt" className={styles.form_title}>
                                            Số điện thoại <span className={styles.red_star}>*</span>
                                        </label>
                                        <Controller
                                            name="sdt"
                                            control={control}
                                            rules={{
                                                required: 'Vui lòng nhập số điện thoại',
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: 'Số điện thoại không hợp lệ',
                                                },
                                            }}
                                            render={({ field }) => (
                                                <>
                                                    <input
                                                        type="text"
                                                        {...field}
                                                        className={`${styles.form_control} ${styles.numbersonly} ${styles.valid}`}
                                                        placeholder="Vui lòng nhập số điện thoại"
                                                    />
                                                    {errors.sdt && typeof errors.sdt?.message === 'string' && (
                                                        <span className={styles.text_error}>{errors.sdt?.message}</span>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div className={`${styles.form_reg} ${styles.reg_right_50}`}>
                                        <label htmlFor="txtemail" className={styles.form_title}>
                                            Email <span className={styles.red_star}>*</span>
                                        </label>
                                        <Controller
                                            name="email"
                                            control={control}
                                            rules={{
                                                required: 'Vui lòng nhập email',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                    message: 'Email không hợp lệ',
                                                },
                                            }}
                                            render={({ field }) => (
                                                <>
                                                    <input
                                                        type="text"
                                                        {...field}
                                                        className={`${styles.form_control} ${styles.valid}`}
                                                        placeholder="Nhập email"
                                                    />
                                                    {errors.email && typeof errors.email?.message === 'string' && (
                                                        <span className={styles.text_error}>{errors.email?.message}</span>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                                        <label htmlFor="txtpassword" className={styles.form_title}>
                                            Mật khẩu đăng nhập<span className={styles.red_star}>*</span>
                                        </label>
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{
                                                required: 'Vui lòng nhập mật khẩu',
                                                validate: {
                                                    minLength: (value) => {
                                                        const trimmedValue = value.replace(/\s/g, '');
                                                        return trimmedValue.length >= 6 || 'Mật khẩu phải có ít nhất 6 ký tự';
                                                    },
                                                    noSpace: (value) => !/\s/.test(value) || 'Mật khẩu không được chứa khoảng trắng',
                                                    containsNumberAndLetter: (value) => {
                                                        const containsNumber = /[0-9]/.test(value);
                                                        const containsLetter = /[a-zA-Z]/.test(value);
                                                        return (containsNumber && containsLetter) || 'Mật khẩu phải chứa ít nhất một số và một chữ cái';
                                                    },
                                                },
                                            }}
                                            render={({ field }) => (
                                                <>
                                                    <input
                                                        type={isPasswordVisible ? 'text' : 'password'}
                                                        {...field}
                                                        className={styles.form_control}
                                                        maxLength={20}
                                                        placeholder="Nhập mật khẩu"
                                                    />
                                                    {errors.password && (
                                                        <span className={styles.text_error}>{errors.password.message}</span>
                                                    )}
                                                </>
                                            )}
                                        />
                                        {isPasswordVisible ? <svg onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12" fill="none" className={styles.icon_input_show}>
                                            <path d="M11 0C1.7875 0 0 6.65217 0 6.65217C0 6.65217 3.025 12 10.8625 12C18.7 12 22 6.78261 22 6.78261C22 6.78261 20.2125 0 11 0ZM7.2875 1.95652C7.975 1.56522 9.075 1.56522 9.075 1.56522C9.075 1.56522 8.3875 2.73913 8.3875 3.65217C8.3875 4.56522 8.6625 5.08696 8.6625 5.08696L7.15 5.34783C7.15 5.34783 6.7375 4.69565 6.7375 3.78261C6.7375 2.73913 7.2875 1.95652 7.2875 1.95652ZM10.8625 10.6957C5.225 10.6957 2.3375 7.69565 1.5125 6.52174C1.925 5.60869 3.025 3.65217 5.775 2.34783C5.6375 2.86956 5.5 3.3913 5.5 4.04348C5.5 6.91304 7.975 9.26087 11 9.26087C14.025 9.26087 16.5 6.91304 16.5 4.04348C16.5 3.3913 16.3625 2.86956 16.225 2.34783C18.975 3.52174 20.075 5.60869 20.4875 6.52174C19.525 7.69565 16.6375 10.6957 10.8625 10.6957Z" fill="#777777" />
                                        </svg> : <svg onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.icon_input}>
                                            <path d="M16.125 6.5L15.125 7.5C17.25 8.625 18.25 10.375 18.625 11.25C17.75 12.375 15.125 15.125 9.875 15.125C9 15.125 8.375 15 7.625 14.875L6.625 15.875C7.625 16.25 8.75 16.375 9.875 16.375C17 16.375 20 11.375 20 11.375C20 11.375 19.25 8.375 16.125 6.5Z" fill="#777777" />
                                            <path d="M15 8.875C15 8.5 15 8.125 14.875 7.875L8.875 13.75C9.25 13.75 9.625 13.875 10 13.875C12.75 13.875 15 11.625 15 8.875ZM19.125 0L13.625 5.5C12.625 5.25 11.375 5 10 5C1.625 5 0 11.375 0 11.375C0 11.375 1.25 13.625 4.125 15.125L0 19.125V20H0.875L20 0.875V0H19.125ZM5 14.125C3 13.25 1.875 11.875 1.375 11.25C1.75 10.375 2.75 8.5 5.25 7.25C5.125 7.75 5 8.25 5 8.875C5 10.25 5.625 11.625 6.625 12.5L5 14.125ZM7.75 9.875L6.5 10.125C6.5 10.125 6.125 9.5 6.125 8.625C6.125 7.625 6.625 6.75 6.625 6.75C7.25 6.375 8.25 6.375 8.25 6.375C8.25 6.375 7.625 7.5 7.625 8.5C7.5 9.375 7.75 9.875 7.75 9.875Z" fill="#777777" />
                                        </svg>}

                                    </div>
                                    <div className={`${styles.form_reg} ${styles.reg_right_50}`}>
                                        <label htmlFor="txtrepassword" className={styles.form_title}>
                                            Nhập lại mật khẩu<span className={styles.red_star}>*</span>
                                        </label>
                                        <Controller
                                            name="confirmPassword"
                                            control={control}
                                            rules={{
                                                required: 'Vui lòng nhập lại mật khẩu',
                                                validate: (value) => value === getValues('password') || 'Mật khẩu không khớp',
                                            }}
                                            render={({ field }) => (
                                                <>
                                                    <input
                                                        type={isRePasswordVisible ? 'text' : 'password'}
                                                        {...field}
                                                        className={styles.form_control}
                                                        maxLength={20}
                                                        placeholder="Nhập lại mật khẩu"
                                                    />
                                                    {errors.confirmPassword && (
                                                        <span className={styles.text_error}>{errors.confirmPassword.message}</span>
                                                    )}
                                                </>
                                            )}
                                        />
                                        {isRePasswordVisible ? <svg onClick={toggleRePasswordVisibility} xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12" fill="none" className={styles.icon_input_show}>
                                            <path d="M11 0C1.7875 0 0 6.65217 0 6.65217C0 6.65217 3.025 12 10.8625 12C18.7 12 22 6.78261 22 6.78261C22 6.78261 20.2125 0 11 0ZM7.2875 1.95652C7.975 1.56522 9.075 1.56522 9.075 1.56522C9.075 1.56522 8.3875 2.73913 8.3875 3.65217C8.3875 4.56522 8.6625 5.08696 8.6625 5.08696L7.15 5.34783C7.15 5.34783 6.7375 4.69565 6.7375 3.78261C6.7375 2.73913 7.2875 1.95652 7.2875 1.95652ZM10.8625 10.6957C5.225 10.6957 2.3375 7.69565 1.5125 6.52174C1.925 5.60869 3.025 3.65217 5.775 2.34783C5.6375 2.86956 5.5 3.3913 5.5 4.04348C5.5 6.91304 7.975 9.26087 11 9.26087C14.025 9.26087 16.5 6.91304 16.5 4.04348C16.5 3.3913 16.3625 2.86956 16.225 2.34783C18.975 3.52174 20.075 5.60869 20.4875 6.52174C19.525 7.69565 16.6375 10.6957 10.8625 10.6957Z" fill="#777777" />
                                        </svg> : <svg onClick={toggleRePasswordVisibility} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.icon_input}>
                                            <path d="M16.125 6.5L15.125 7.5C17.25 8.625 18.25 10.375 18.625 11.25C17.75 12.375 15.125 15.125 9.875 15.125C9 15.125 8.375 15 7.625 14.875L6.625 15.875C7.625 16.25 8.75 16.375 9.875 16.375C17 16.375 20 11.375 20 11.375C20 11.375 19.25 8.375 16.125 6.5Z" fill="#777777" />
                                            <path d="M15 8.875C15 8.5 15 8.125 14.875 7.875L8.875 13.75C9.25 13.75 9.625 13.875 10 13.875C12.75 13.875 15 11.625 15 8.875ZM19.125 0L13.625 5.5C12.625 5.25 11.375 5 10 5C1.625 5 0 11.375 0 11.375C0 11.375 1.25 13.625 4.125 15.125L0 19.125V20H0.875L20 0.875V0H19.125ZM5 14.125C3 13.25 1.875 11.875 1.375 11.25C1.75 10.375 2.75 8.5 5.25 7.25C5.125 7.75 5 8.25 5 8.875C5 10.25 5.625 11.625 6.625 12.5L5 14.125ZM7.75 9.875L6.5 10.125C6.5 10.125 6.125 9.5 6.125 8.625C6.125 7.625 6.625 6.75 6.625 6.75C7.25 6.375 8.25 6.375 8.25 6.375C8.25 6.375 7.625 7.5 7.625 8.5C7.5 9.375 7.75 9.875 7.75 9.875Z" fill="#777777" />
                                        </svg>}
                                    </div>

                                    <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                                        <label htmlFor="txtlastname" className={styles.form_title}>
                                            Tên công ty <span className={styles.red_star}>*</span>
                                        </label>
                                        <Controller
                                            name="companyName"
                                            control={control}
                                            rules={{
                                                required: 'Vui lòng nhập tên công ty',
                                            }}
                                            render={({ field }) => (
                                                <>
                                                    <input
                                                        type="text"
                                                        {...field}
                                                        className={styles.form_control}
                                                        id="txtlastname"
                                                        placeholder="Nhập công ty"
                                                    />
                                                    {errors.companyName && (
                                                        <span className={styles.text_error}>{errors.companyName.message}</span>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div className={`${styles.form_reg} ${styles.reg_right_50}`}>
                                        <label htmlFor="txtlastname" className={styles.form_title}>
                                            Địa chỉ công ty <span className={styles.red_star}>*</span>
                                        </label>
                                        <Controller
                                            name="selectedOptions"
                                            control={control}
                                            rules={{
                                                validate: (value) => {
                                                    // Custom validation logic
                                                    if (value?.length < 1) {
                                                        return 'Vui lòng chọn ít nhất một lựa chọn.';
                                                    }
                                                    if (value?.length > 3) {
                                                        return 'Bạn chỉ có thể chọn tối đa ba lựa chọn.';
                                                    }
                                                    return true;
                                                },
                                                required: "Vui lòng nhập địa chỉ công ty"
                                            }}
                                            render={({ field }) => (
                                                <>
                                                    <Select
                                                        {...field}
                                                        // type='text'
                                                        className={styles.form_control}
                                                        // mode="multiple"
                                                        placeholder="Please select"
                                                        onChange={(selectedOptions) => {
                                                            field.onChange(selectedOptions);
                                                            // Additional logic if needed
                                                        }}
                                                        style={{ width: '100%' }}
                                                        options={getAllCity()}
                                                        size='large'
                                                    />
                                                    {errors.selectedOptions && (
                                                        <span className={styles.text_error}>{errors.selectedOptions.message}</span>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div className={`${styles.form_reg} `}>
                                        <label htmlFor="txtemail" className={styles.form_title}>
                                            Giới thiệu về công ty
                                        </label>
                                        <Controller
                                            name="companyDescription"
                                            control={control}
                                            rules={{ /* Remove the 'required' rule */ }}
                                            render={({ field }) => (
                                                <>
                                                    <textarea
                                                        {...field}
                                                        placeholder={
                                                            `1. Giới thiệu chung về công ty.
                                                            2. Đặc điểm về nhân lực.
                                                            3. Nhu cầu tuyển dụng nhân sự.
                                                            4. Các vị trí thường xuyên tuyển dụng.
                                                            5. Quy trình tuyển dụng.
                                                            6. Quyền lợi làm việc của người lao động tại công ty.
                                                            7. Viết tối ưu nội dung, không sửa trong phần tên công ty. `}
                                                        className={`${styles.form_control} ${styles.text_area}`}
                                                        style={{ width: "90%" }}
                                                    />
                                                </>
                                            )}
                                        />
                                    </div>
                                    <Upload_img_ntd onImagesChange={handleImagesChange} />
                                </div>
                            </div>
                            <div className={styles.box_confirm}>
                                <button className={styles.btn_confirm} type="submit">
                                    ĐĂNG KÝ
                                </button>
                                <div className={styles.btn_content}>
                                    <p>Bạn đã có tài khoản?</p>
                                    <Link href={'/dang-nhap-nha-tuyen-dung'}>ĐĂNG NHẬP NGAY</Link>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div >
                </div >
            </div>
        </>
    )
}

export default Register
