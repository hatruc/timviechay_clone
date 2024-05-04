import Header from "@/components/common/Header"
import s from "./styles.module.scss"
import Footer from "@/components/common/Footer"
import { Avatar, Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space } from "antd"
import BlogEditor from "@/components/common/BlogEditor"
import Cookies from "js-cookie";
import Image from 'next/image';
import { useRef, useState, useContext, useEffect } from "react"
import { createLinkTilte, hocVan, city_array, getList, listKinhNghiemFilter, allCapBac, gioiTinh, getAllCity, getDistrict, getJob, listHinhThucFilter, listMucLuongFilter, getTokenServerSide } from "@/functions/functions"
import { NTD_UV_Context } from '@/components/context/ntd_uv_context'
import { POST, POST_SERVER } from "@/pages/api/base-api";
import { useRouter } from "next/router";
import DOMPurify from "dompurify"
import { NextPageContext } from "next"
import Link from "next/link"
const listHocVanFilter = getList(hocVan)
const listGioiTinh = getList(gioiTinh)

interface listCandidate {
    position?: string;
    avatar?: string;
    name?: string;
    adress?: string;
    time?: string;
    ex?: string;
    title?: string;
    id?: number;
}
interface listHotLine {
    name?: string;
    phone?: string;
}

export const getServerSideProps = async (context: NextPageContext) => {
    const token = getTokenServerSide(context);
    // const id = context.query.id;

    const data = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_NEW}/new/getDangTin`, { id: 121 }, token);

    if (data?.error == null) {
        return {
            props: {
                dataDangTin: data
            }
        }
    } else {
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            }
        }
    }
}

const DangTinSau: React.FC<{ dataDangTin: any }> = ({ dataDangTin }) => {

    console.log('>>> check dataDangTin: ', dataDangTin);

    const router = useRouter()

    const { formDangTin, setFormDangTin } = useContext(NTD_UV_Context)
    const [isSubmit, setIsSubmit] = useState(false)
    const [dataUngVien, setDataUngVien] = useState([])
    const [form] = Form.useForm();
    const [blogValue, setBlogValue] = useState({
        descriptJob: "",
        requriedjob: "",
        benefits: "",
        cv: "",
    });
    const [city, setCity] = useState<number>(0)
    const [districtSelected, setDistrictSelected] = useState<number>(0)

    // console.log(dataUngVien)
    // useEffect(() => {
    //     const fetch = async () => {
    //         const result = await POST(`/new/SearchCandi`, { page: 1, perPage: 10 })
    //         // console.log(result)
    //         if (result?.result) {
    //             console.log('>>> check data fetch: ', result);
    //             setDataUngVien(result?.data)
    //         } else {
    //             console.log('>>> check error fetch data: ', result);

    //         }
    //     }
    //     fetch()
    // }, [])
    const hotline: listHotLine[] = [
        {
            name: "Nhóm Ngô Dung",
            phone: "0985.472.529"
        },
        {
            name: "Nhóm Huyền Ly",
            phone: "0985.771.347"
        },
        {
            name: "Nhóm Mai Hương",
            phone: "0904.646.975"
        },
        {
            name: "Nhóm Thùy Linh",
            phone: "0981.208.813"
        },
        {
            name: "Nhóm Thanh Hoa",
            phone: "0946.131.908"
        },
        {
            name: "Nhóm Ngọc Hà",
            phone: "0971.207.216"
        },
    ];

    //date field
    const disabledDate = (current: any) => {
        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        return current && current < startDate;
    };

    const validatePhone = (_: any, value: any) => {
        const phoneRegex = /^[0-9]{10}$/;
        if (!value || phoneRegex.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Số điện thoại không hợp lệ.'));
    };

    const validateEmail = (_: any, value: any) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || emailRegex.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Email không hợp lệ.'));
    };

    const handleReset = () => {
        if (window.confirm('Những gì bạn đã nhập sẽ bị mất. \nTiếp tục hủy đăng tin?')) {
            router.push('/nha-tuyen-dung/tin-da-dang')
        }
    };


    function extractTextFromHTML(htmlString: string) {
        const parser = new DOMParser();
        const sanitizedHTML = DOMPurify.sanitize(htmlString);
        const sanitizedDoc = parser.parseFromString(sanitizedHTML, 'text/html');

        return sanitizedDoc.body.innerHTML || "";
    }
    const onSubmit = async (value: any) => {
        setIsSubmit(true)

        const data = {
            ...value,
            hanNop: value?.hanNop?.$d,
            moTa: extractTextFromHTML(value.moTa),
            yeuCau: extractTextFromHTML(value.yeuCau),
            quyenLoi: extractTextFromHTML(value.quyenLoi),
            hoSo: extractTextFromHTML(value.hoSo),
        }
        const isLogin = Cookies.get('isLogin');

        if (isLogin) {
            // console.log(data)
            const result = await POST(`new/postNew`, data)
            if (result?.result) {
                alert(result?.message)
                router.push('/nha-tuyen-dung/tin-da-dang')
            } else {
                alert(result?.message)
            }
            //nếu chưa dăng nhập sẽ chạy code này
        } else {
            setFormDangTin(data)
            alert('Bạn vui lòng đăng nhập để có thể đăng tin.')
            router.push('/dang-nhap-nha-tuyen-dung')
        }
        setIsSubmit(false)
    }

    const ungVienTimViec = () => {
        router.push('/ung-vien-tim-viec')

    }

    const chiTietUngVien = (name: any, id: any) => {
        const string = createLinkTilte(name)
        router.push(`/chi-tiet-ung-vien/${string}-${id}.html`)
    }

    return (
        <>
            <Header />
            <div className={s.container_post_before_login}>
                <div className={s.first_map}>
                    <div className={s.title_f}>
                        <span className={s.f_span}>ĐĂNG TIN MIỄN PHÍ THU HÚT ỨNG VIÊN ƯNG Ý</span>
                        <span className={s.s_span}>Tuyển dụng nhanh chóng, dễ dàng và hiệu quả</span>
                        <span className={s.t_span}>Đồng hành cùng 400.000 + doanh nghiệp và ứng viên uy tín, chất lượng bậc nhất tại Việt Nam đang tin dùng Timviechay.vn</span>
                    </div>
                </div>
                <div className={s.second_map}>
                    <div className={s.form_post}>
                        <p className={s.title_second}>Đăng tin tuyển dụng miễn phí</p>
                        <p className={s.title_third}>
                            Lưu ý:
                            <span>Tính năng Đăng tin miễn phí chỉ dành cho khách hàng chưa từng có tài khoản trênTimviechay.vn. Nếu bạn đã có tài khoản, vui lòng đăng nhập và đăng tin trên trang Dịch vụ của Timviechay.vn </span>
                            <link href="#" />
                        </p>

                        <Form
                            className={s.info_work}
                            name="info_work"
                            onFinish={onSubmit}
                            form={form}
                        >
                            <div className={s.label_ff}>Thông tin việc làm <span style={{ width: "20px", height: "4px", background: "#F8971C" }}></span></div>
                            <div className={s.content_form_x}>
                                <Form.Item className={s.form_item} label="Vị trí đăng tuyển " name="title" colon={false} rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}>
                                    <Input className={s.value_fill} placeholder="Ví dụ: Nhân viên kinh doanh, Nhân viên hành chính nhân sự" />
                                </Form.Item>
                                <Form.Item className={s.form_item} label="Cấp bậc" name="capBac" rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]} colon={false}>
                                    <Select className={s.value_fill} placeholder="Cấp bậc mong muốn" options={allCapBac.filter(item => item.value != 0)} />
                                </Form.Item>
                                <Form.Item className={s.form_item} label="Ngành nghề " name="catId" rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]} colon={false}>
                                    <Select className={s.value_fill} placeholder="Chọn ngành nghề" options={getJob()} />
                                </Form.Item>
                                <Form.Item className={s.form_item} label="Tỉnh thành làm việc " name="city" rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]} colon={false}>
                                    <Select className={s.value_fill} placeholder="Chọn tỉnh thành" options={getAllCity()} onChange={(value) => { setCity(value); form.setFieldValue('district', undefined) }} />
                                </Form.Item>
                                <Form.Item className={s.form_item} label="Quận huyện làm việc " name="district" rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]} colon={false}>
                                    <Select className={s.value_fill} placeholder="Chọn quận / huyện" options={getDistrict(city)} disabled={city == 0} />
                                </Form.Item>
                                <Form.Item className={s.form_item} label="Địa chỉ chi tiết làm việc " name="address" rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]} colon={false}>
                                    <Input className={s.value_fill} placeholder="Bạn vui lòng nhập địa chỉ làm việc chi tiết" />
                                </Form.Item>
                                <Form.Item className={s.form_item} label="Hình thức làm việc " name="hinhThuc" rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]} colon={false}>

                                    <Select className={s.value_fill} placeholder="Chọn hình thức làm việc" options={listHinhThucFilter.filter(item => item.value !== 0)} />
                                </Form.Item>
                                <Form.Item className={s.form_item} label="Mức lương " name="money" rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]} colon={false}>
                                    <Select className={s.value_fill} placeholder="Chọn mức lương" options={listMucLuongFilter.filter(item => item.value !== 0)} />
                                </Form.Item>
                                <Form.Item className={s.form_item} label="Số lượng cần tuyển" name="soLuong"
                                    rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
                                    colon={false}>
                                    <Input type='number' className={s.value_fill} placeholder="Nhập số lượng" />
                                </Form.Item>
                                <Form.Item className={s.form_item_none} label="Thời gian thử việc (nếu có) " name="thuViec" colon={false}>
                                    <Input className={s.value_fill} placeholder="VD: 3 tuẩn, 5 tuần, ..." />
                                </Form.Item>
                                <Form.Item className={s.form_item_none} label="Hoa hồng (Nếu có) " name="hoaHong" colon={false}>
                                    <Input className={s.value_fill} placeholder="VD: 25%, 35%, ..." />
                                </Form.Item>
                            </div>
                            <div className={s.label_ff}>Mô tả công việc <span style={{ width: "20px", height: "4px", background: "#F8971C" }}></span></div>
                            <div className={s.content_form}>
                                <Form.Item
                                    label="Mô tả công việc"
                                    name="moTa"
                                    colon={false}
                                    className={s.form_editor}
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                new Promise((resolve: any, reject: any) => {
                                                    // console.log(value);
                                                    if (value == '<p></p>' || value == '<p><br></p>' || value == "" || value == undefined) {
                                                        reject('Vui lòng nhập trường này!');
                                                    } else {
                                                        resolve();
                                                    }
                                                })
                                        },
                                    ]}
                                >
                                    <BlogEditor className={s.blog} className_rv={s.preview} name="moTa" form={form} />
                                </Form.Item>
                            </div>
                            <div className={`${s.label_ff} ${s.label_fff}`} >Yêu cầu công việc <span style={{ width: "20px", height: "4px", background: "#F8971C" }}></span></div>
                            <div className={s.content_form}>
                                <Form.Item className={s.form_item} label="Kinh nghiệm" name="exp" rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]} colon={false}>
                                    <Select className={s.value_fill} placeholder="Chọn kinh nghiệm" options={listKinhNghiemFilter} />
                                </Form.Item>
                                <Space className={s.space_input}>
                                    <Form.Item className={s.form_item} label="Yêu cầu bằng cấp " name="bangCap" rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]} colon={false}>
                                        <Select className={s.value_fill} placeholder="không yêu cầu" options={listHocVanFilter} />
                                    </Form.Item>
                                    <Form.Item className={s.form_item} label="Giới tính" name="gioiTinh" rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]} colon={false}>
                                        <Select className={s.value_fill} placeholder="không yêu cầu" options={listGioiTinh} />
                                    </Form.Item>
                                </Space>
                                <Form.Item
                                    label="Yêu cầu công việc"
                                    name="yeuCau"
                                    colon={false}
                                    className={s.form_editor}
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                new Promise((resolve: any, reject: any) => {
                                                    if (value == '<p></p>' || value == '<p><br></p>' || value == "" || value == undefined) {
                                                        reject('Vui lòng nhập trường này!');
                                                    } else {
                                                        resolve();
                                                    }
                                                })
                                        },
                                    ]}
                                >
                                    <BlogEditor className={s.blog} className_rv={s.preview} form={form} name="yeuCau" />
                                </Form.Item>
                            </div>
                            <div className={`${s.label_ff} ${s.label_fff}`}>Quyền lợi được hưởng <span style={{ width: "20px", height: "4px", background: "#F8971C" }}></span></div>
                            <div className={s.content_form}>
                                <Form.Item
                                    label="Quyền lợi được hưởng"
                                    name="quyenLoi"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                new Promise((resolve: any, reject: any) => {
                                                    if (value == '<p></p>' || value == '<p><br></p>' || value == "" || value == undefined) {
                                                        reject('Vui lòng nhập trường này!');
                                                    } else {
                                                        resolve();
                                                    }
                                                })
                                        },
                                    ]}
                                    colon={false}
                                    className={s.form_editor}
                                >
                                    <BlogEditor
                                        className={s.blog}
                                        className_rv={s.preview}
                                        name="quyenLoi"
                                        form={form}
                                    />
                                </Form.Item>
                            </div>
                            <div className={`${s.label_ff} ${s.label_fff}`} >Yêu cầu hồ sơ<span style={{ width: "20px", height: "4px", background: "#F8971C" }}></span></div>
                            <div className={`${s.content_form_y} ${s.gap_content}`}>
                                <Form.Item
                                    label="Hồ sơ bao gồm"
                                    name="hoSo"
                                    colon={false}
                                    className={s.form_editor}
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                new Promise((resolve: any, reject: any) => {
                                                    if (value == '<p></p>' || value == '<p><br></p>' || value == "" || value == undefined) {
                                                        reject('Vui lòng nhập trường này!');
                                                    } else {
                                                        resolve();
                                                    }
                                                })
                                        },
                                    ]}
                                >
                                    <BlogEditor className={s.blog} className_rv={s.preview} form={form} name="hoSo" />
                                </Form.Item>
                                <div style={{ height: "75px" }}></div>
                                <Form.Item className={s.form_item} name="hanNop" rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]} label="Hạn Nộp" colon={false}>
                                    <DatePicker disabledDate={disabledDate} format="DD/MM/YYYY" className={s.value_fill} style={{ justifyContent: "center" }} placeholder="dd/mm/yyyy" />
                                </Form.Item>
                            </div>
                            <div className={s.label_ff}>Thông tin liên hệ <span style={{ width: "20px", height: "4px", background: "#F8971C" }}></span></div>
                            <div className={s.content_form} id="form-contact">
                                <Space className={s.space_input}>
                                    <Form.Item className={s.form_item} label="Tên người liên hệ " rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]} name="userContact" colon={false}>
                                        <Input className={s.value_fill} placeholder="Nguyễn Văn Quân" />
                                    </Form.Item>
                                    <Form.Item className={s.form_item} label="Địa chỉ liên hệ" rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]} name="addressContact" colon={false}>
                                        <Input className={s.value_fill} placeholder="Số 123 đường Cầu Giấy Hà Nội" />
                                    </Form.Item>
                                </Space>
                                <Space className={s.space_input}>
                                    <Form.Item className={s.form_item} label="Số điện thoại liên hệ"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập trường này!' },
                                            { validator: validatePhone }
                                        ]}
                                        name="phoneContact" colon={false}>
                                        <Input className={s.value_fill} placeholder="0123456789" />
                                    </Form.Item>
                                    <Form.Item className={s.form_item} label="Email liên hệ"
                                        name="emailContact"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập trường này!' },
                                            { validator: validateEmail }
                                        ]} colon={false}>
                                        <Input className={s.value_fill} placeholder="abcxyz@gmail.com" />
                                    </Form.Item>
                                </Space>
                            </div>
                            {/* <Space className={s.group_button}> */}
                            <Form.Item className={s.group_button}>
                                <Button disabled={isSubmit} onClick={handleReset} style={{ color: "#3A85D4", borderColor: "#3A85D4" }}>Hủy tạo tin</Button>
                                <Button disabled={isSubmit} type="primary" htmlType="submit" form="info_work">Đăng tin</Button>
                            </Form.Item>
                            {/* </Space> */}
                        </Form>
                    </div>
                </div>
                <div className={s.third_map}>
                    <div className={s.title_candidate}>
                        <div className={s.f_div}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                                <g clipPath="url(#clip0_3141_97243)">
                                    <path d="M2.4394 10.0063C3.76344 8.52594 5.61706 7.70714 7.66363 7.70154C7.67268 7.70154 7.68409 7.70154 7.69206 7.70154C11.7953 7.70154 14.2371 10.2915 16.2501 12.9973C16.815 13.6873 17.6969 14.3267 18.8202 13.6929C19.5134 13.3033 19.76 12.422 19.3715 11.7299C19.0842 11.2205 18.4351 11.0405 17.9258 11.3261C17.7503 11.4249 17.6249 11.5856 17.5698 11.7796C17.5142 11.9739 17.5397 12.1789 17.6396 12.3542C17.7048 12.4707 17.8095 12.5472 17.928 12.5853C18.0001 12.323 18.2516 12.1436 18.5271 12.1843C18.8178 12.2286 19.0142 12.491 18.9875 12.7782C19.0773 12.9936 19.0017 13.2439 18.7933 13.3597C18.0998 13.7472 17.2186 13.5029 16.8303 12.8101C16.6104 12.4184 16.5561 11.9622 16.6758 11.5272C16.7969 11.0935 17.0801 10.733 17.4731 10.5131C18.4282 9.97381 19.6459 10.3158 20.1862 11.2727C20.825 12.4123 20.418 13.8615 19.2817 14.5026C18.8355 14.7535 18.3759 14.8767 17.9234 14.8767C17.8069 14.8767 17.6958 14.8466 17.5827 14.8302C17.9842 15.3908 18.3828 15.9443 18.798 16.4667C19.7542 17.6706 20.5765 18.6768 21.3737 19.4536C21.473 19.4626 21.5719 19.4966 21.6496 19.5694C23.3077 21.1218 25.0278 21.3365 26.4978 20.1645C27.6364 19.2582 27.827 17.5922 26.9208 16.4532C26.2234 15.5816 24.9511 15.4362 24.08 16.1318C23.7625 16.384 23.5616 16.7441 23.5161 17.1494C23.4696 17.5549 23.5859 17.9501 23.8381 18.2715C24.0078 18.4862 24.2475 18.6122 24.5115 18.6634C24.4859 18.5816 24.4592 18.4952 24.4592 18.4022C24.4592 17.9116 24.8578 17.5117 25.3512 17.5117C25.8431 17.5117 26.2428 17.9092 26.2428 18.4022C26.2428 18.5316 26.214 18.6531 26.1651 18.7633C26.1827 18.9178 26.1315 19.0767 26.001 19.179C25.5711 19.5221 25.0323 19.6754 24.4872 19.6129C23.9415 19.5494 23.453 19.2802 23.1113 18.8521C22.7008 18.341 22.5184 17.6971 22.5929 17.0439C22.6672 16.3922 22.9892 15.8112 23.5019 15.4039C24.7756 14.3887 26.6341 14.6004 27.6506 15.8717C28.7994 17.3209 28.6297 19.3855 27.3304 20.6473C27.8675 20.3396 28.3445 19.9261 28.7206 19.4017C29.4321 18.4056 29.716 17.1393 29.5008 15.9341C29.158 14.0258 27.3259 12.753 25.4176 13.094C25.1665 13.1394 24.9224 12.9708 24.877 12.7186C24.8316 12.4647 24.9991 12.2245 25.253 12.1791C27.6722 11.7428 29.9824 13.3567 30.4148 15.7677C30.675 17.2209 30.3332 18.7427 29.4739 19.942C28.6363 21.1118 27.4058 21.8751 26.0072 22.0909C22.4973 22.6224 20.4457 20.0398 18.0688 17.0437C18.0574 17.0301 18.0445 17.0142 18.033 16.9982C18.0313 16.9959 18.029 16.9959 18.0279 16.9937C17.4175 16.3166 16.4532 15.6654 15.3318 16.4075C14.6719 16.8481 14.488 17.7453 14.9239 18.4041C15.2465 18.888 15.9057 19.0196 16.3939 18.6972C16.5628 18.5837 16.6767 18.4145 16.7161 18.2168C16.756 18.0203 16.7161 17.8181 16.6059 17.6568C16.5229 17.533 16.3939 17.4593 16.2576 17.4376C16.1917 17.6908 15.9589 17.8726 15.6904 17.8498C15.3891 17.8261 15.1679 17.559 15.1929 17.2593C15.1929 17.2558 15.1952 17.2526 15.1974 17.2478C15.1451 17.0594 15.2099 16.8503 15.3813 16.7368C16.0423 16.2985 16.9379 16.4779 17.379 17.1389C17.6277 17.5112 17.7156 17.959 17.6264 18.3996C17.5379 18.8437 17.2823 19.224 16.9065 19.4738C16.5682 19.6965 16.1842 19.8055 15.8066 19.8055C15.1621 19.8055 14.5293 19.4943 14.1479 18.9197C13.4278 17.8351 13.7278 16.3621 14.8147 15.6359C15.416 15.2383 16.0554 15.0988 16.6903 15.1907C16.625 15.0988 16.5602 15.009 16.4939 14.9166C16.1633 14.451 15.8299 13.9847 15.4892 13.5264C15.4728 13.5066 15.4565 13.4941 15.4416 13.4754C15.433 13.4652 15.4295 13.451 15.4229 13.4396C13.512 10.8867 11.328 8.63297 7.69378 8.63297C7.68581 8.63297 7.6744 8.63297 7.66772 8.63297C5.89143 8.63922 4.2788 9.34711 3.13631 10.6289C1.85298 12.065 1.24652 14.098 1.47588 16.2036C1.64386 17.7402 2.40021 19.12 3.60408 20.09C4.71706 20.9848 6.09365 21.405 7.50513 21.3369C8.36248 21.1915 9.03053 20.8121 9.47116 20.1875C9.99793 19.445 10.1707 18.4024 9.94129 17.3256C9.79592 16.6375 9.38954 16.0446 8.7988 15.6608C8.20591 15.2758 7.5019 15.1481 6.81123 15.2911C6.28317 15.4041 5.82789 15.716 5.53457 16.1672C5.24168 16.6194 5.14068 17.1587 5.25288 17.688C5.33709 18.0832 5.5686 18.4229 5.90715 18.6453C6.24785 18.868 6.65876 18.9395 7.05631 18.8587C7.31539 18.8043 7.53119 18.6522 7.69357 18.4478C7.30506 18.3477 7.01561 18.007 7.02013 17.5881C7.02573 17.0975 7.43104 16.7034 7.924 16.7103C8.18631 16.7137 8.4146 16.8352 8.57461 17.0181C8.70081 17.0781 8.80182 17.185 8.83477 17.3327C8.95063 17.8687 8.84833 18.4183 8.55092 18.8773C8.24877 19.3384 7.78876 19.6562 7.25057 19.7708C6.60427 19.906 5.95022 19.7857 5.39804 19.4267C4.8508 19.0679 4.47607 18.5204 4.34406 17.8821C4.17823 17.1111 4.3236 16.3242 4.75518 15.6617C5.18569 14.999 5.84771 14.5453 6.61762 14.3825C7.55229 14.185 8.50742 14.362 9.30684 14.8817C10.1065 15.402 10.6574 16.2012 10.8538 17.1348C11.0629 18.1173 10.989 19.087 10.6653 19.9116C10.7448 19.8264 10.8357 19.754 10.9072 19.6631C11.6668 18.7205 12.0122 17.5347 11.8806 16.3295C11.6683 14.3911 9.91588 12.9908 7.98064 13.1956C7.71941 13.2314 7.49565 13.0384 7.46722 12.7834C7.44009 12.5278 7.62401 12.2984 7.87942 12.2706C10.3257 12.0021 12.5381 13.7805 12.8049 16.2285C12.965 17.6807 12.5472 19.1083 11.6329 20.2439C10.7187 21.3843 9.41495 22.0997 7.96363 22.2565C7.81805 22.2724 7.67268 22.2724 7.52752 22.2791C7.50577 22.2847 7.48682 22.2927 7.46399 22.295C7.44461 22.2974 7.42523 22.2985 7.40498 22.2985C7.39594 22.2985 7.38905 22.2905 7.38 22.2894C7.32788 22.2905 7.27318 22.2985 7.22107 22.2985C5.69695 22.2985 4.23185 21.7864 3.02799 20.8187C1.62663 19.6943 0.749899 18.0931 0.556721 16.3078C0.289673 13.9324 0.979042 11.6377 2.4394 10.0063Z" fill="#474747" />
                                </g>
                            </svg>
                            <span>ỨNG VIÊN</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                                <g clipPath="url(#clip0_3141_97247)">
                                    <path d="M28.5606 10.0063C27.2366 8.52594 25.3829 7.70714 23.3364 7.70154C23.3273 7.70154 23.3159 7.70154 23.3079 7.70154C19.2047 7.70154 16.7629 10.2915 14.7499 12.9973C14.185 13.6873 13.3031 14.3267 12.1798 13.6929C11.4866 13.3033 11.24 12.422 11.6285 11.7299C11.9158 11.2205 12.5649 11.0405 13.0742 11.3261C13.2497 11.4249 13.3751 11.5856 13.4302 11.7796C13.4858 11.9739 13.4603 12.1789 13.3604 12.3542C13.2952 12.4707 13.1905 12.5472 13.072 12.5853C12.9999 12.323 12.7484 12.1436 12.4729 12.1843C12.1822 12.2286 11.9858 12.491 12.0125 12.7782C11.9227 12.9936 11.9983 13.2439 12.2067 13.3597C12.9002 13.7472 13.7814 13.5029 14.1697 12.8101C14.3896 12.4184 14.4439 11.9622 14.3242 11.5272C14.2031 11.0935 13.9199 10.733 13.5269 10.5131C12.5718 9.97381 11.3541 10.3158 10.8138 11.2727C10.175 12.4123 10.582 13.8615 11.7183 14.5026C12.1645 14.7535 12.6241 14.8767 13.0766 14.8767C13.1931 14.8767 13.3042 14.8466 13.4173 14.8302C13.0158 15.3908 12.6172 15.9443 12.202 16.4667C11.2458 17.6706 10.4235 18.6768 9.62627 19.4536C9.52699 19.4626 9.42814 19.4966 9.35039 19.5694C7.69233 21.1218 5.97224 21.3365 4.50219 20.1645C3.36357 19.2582 3.17298 17.5922 4.07922 16.4532C4.77656 15.5816 6.04891 15.4362 6.92005 16.1318C7.23749 16.384 7.43842 16.7441 7.48386 17.1494C7.53038 17.5549 7.41408 17.9501 7.1619 18.2715C6.99219 18.4862 6.75249 18.6122 6.48846 18.6634C6.51409 18.5816 6.54079 18.4952 6.54079 18.4022C6.54079 17.9116 6.14216 17.5117 5.64877 17.5117C5.15689 17.5117 4.75717 17.9092 4.75717 18.4022C4.75717 18.5316 4.78603 18.6531 4.83492 18.7633C4.81726 18.9178 4.86852 19.0767 4.99903 19.179C5.42889 19.5221 5.96772 19.6754 6.5128 19.6129C7.05852 19.5494 7.54696 19.2802 7.88874 18.8521C8.29922 18.341 8.48163 17.6971 8.40711 17.0439C8.33281 16.3922 8.01085 15.8112 7.49807 15.4039C6.22443 14.3887 4.36586 14.6004 3.34936 15.8717C2.20062 17.3209 2.37033 19.3855 3.6696 20.6473C3.13249 20.3396 2.65547 19.9261 2.27945 19.4017C1.56789 18.4056 1.28405 17.1393 1.49919 15.9341C1.84205 14.0258 3.67412 12.753 5.58244 13.094C5.83355 13.1394 6.07755 12.9708 6.12299 12.7186C6.16844 12.4647 6.00088 12.2245 5.74697 12.1791C3.32782 11.7428 1.01765 13.3567 0.585202 15.7677C0.325046 17.2209 0.666823 18.7427 1.52611 19.942C2.36365 21.1118 3.59423 21.8751 4.99278 22.0909C8.50273 22.6224 10.5543 20.0398 12.9312 17.0437C12.9426 17.0301 12.9555 17.0142 12.967 16.9982C12.9687 16.9959 12.971 16.9959 12.9721 16.9937C13.5825 16.3166 14.5468 15.6654 15.6682 16.4075C16.3281 16.8481 16.512 17.7453 16.0761 18.4041C15.7535 18.888 15.0943 19.0196 14.6061 18.6972C14.4372 18.5837 14.3233 18.4145 14.2839 18.2168C14.244 18.0203 14.2839 17.8181 14.3941 17.6568C14.4771 17.533 14.6061 17.4593 14.7424 17.4376C14.8083 17.6908 15.0411 17.8726 15.3096 17.8498C15.6109 17.8261 15.8321 17.559 15.8071 17.2593C15.8071 17.2558 15.8048 17.2526 15.8026 17.2478C15.8549 17.0594 15.7901 16.8503 15.6187 16.7368C14.9577 16.2985 14.0621 16.4779 13.621 17.1389C13.3723 17.5112 13.2844 17.959 13.3736 18.3996C13.4621 18.8437 13.7177 19.224 14.0935 19.4738C14.4318 19.6965 14.8158 19.8055 15.1934 19.8055C15.8379 19.8055 16.4707 19.4943 16.8521 18.9197C17.5722 17.8351 17.2722 16.3621 16.1853 15.6359C15.584 15.2383 14.9446 15.0988 14.3097 15.1907C14.375 15.0988 14.4398 15.009 14.5061 14.9166C14.8367 14.451 15.1701 13.9847 15.5108 13.5264C15.5272 13.5066 15.5435 13.4941 15.5584 13.4754C15.567 13.4652 15.5705 13.451 15.5771 13.4396C17.488 10.8867 19.672 8.63297 23.3062 8.63297C23.3142 8.63297 23.3256 8.63297 23.3323 8.63297C25.1086 8.63922 26.7212 9.34711 27.8637 10.6289C29.147 12.065 29.7535 14.098 29.5241 16.2036C29.3561 17.7402 28.5998 19.12 27.3959 20.09C26.2829 20.9848 24.9063 21.405 23.4949 21.3369C22.6375 21.1915 21.9695 20.8121 21.5288 20.1875C21.0021 19.445 20.8293 18.4024 21.0587 17.3256C21.2041 16.6375 21.6105 16.0446 22.2012 15.6608C22.7941 15.2758 23.4981 15.1481 24.1888 15.2911C24.7168 15.4041 25.1721 15.716 25.4654 16.1672C25.7583 16.6194 25.8593 17.1587 25.7471 17.688C25.6629 18.0832 25.4314 18.4229 25.0929 18.6453C24.7522 18.868 24.3412 18.9395 23.9437 18.8587C23.6846 18.8043 23.4688 18.6522 23.3064 18.4478C23.6949 18.3477 23.9844 18.007 23.9799 17.5881C23.9743 17.0975 23.569 16.7034 23.076 16.7103C22.8137 16.7137 22.5854 16.8352 22.4254 17.0181C22.2992 17.0781 22.1982 17.185 22.1652 17.3327C22.0494 17.8687 22.1517 18.4183 22.4491 18.8773C22.7512 19.3384 23.2112 19.6562 23.7494 19.7708C24.3957 19.906 25.0498 19.7857 25.602 19.4267C26.1492 19.0679 26.5239 18.5204 26.6559 17.8821C26.8218 17.1111 26.6764 16.3242 26.2448 15.6617C25.8143 14.999 25.1523 14.5453 24.3824 14.3825C23.4477 14.185 22.4926 14.362 21.6932 14.8817C20.8935 15.402 20.3426 16.2012 20.1462 17.1348C19.9371 18.1173 20.011 19.087 20.3347 19.9116C20.2552 19.8264 20.1643 19.754 20.0928 19.6631C19.3332 18.7205 18.9878 17.5347 19.1194 16.3295C19.3317 14.3911 21.0841 12.9908 23.0194 13.1956C23.2806 13.2314 23.5043 13.0384 23.5328 12.7834C23.5599 12.5278 23.376 12.2984 23.1206 12.2706C20.6743 12.0021 18.4619 13.7805 18.1951 16.2285C18.035 17.6807 18.4528 19.1083 19.3671 20.2439C20.2813 21.3843 21.5851 22.0997 23.0364 22.2565C23.182 22.2724 23.3273 22.2724 23.4725 22.2791C23.4942 22.2847 23.5132 22.2927 23.536 22.295C23.5554 22.2974 23.5748 22.2985 23.595 22.2985C23.6041 22.2985 23.611 22.2905 23.62 22.2894C23.6721 22.2905 23.7268 22.2985 23.7789 22.2985C25.303 22.2985 26.7681 21.7864 27.972 20.8187C29.3734 19.6943 30.2501 18.0931 30.4433 16.3078C30.7103 13.9324 30.021 11.6377 28.5606 10.0063Z" fill="#474747" />
                                </g>
                            </svg>
                        </div>
                        <p className={s.tiemNang}>Danh sách ứng viên tiềm năng</p>
                    </div>
                    <div className={s.content_candidate}>
                        {
                            dataDangTin?.data?.slice(0, 10)?.map((item: any, index: number) => {
                                return (
                                    <div style={{ position: "relative" }} key={index}>
                                        <Space>
                                            <div className={s.body_candidate} key={index}>
                                                {/* <div className={s.dot_online}>
                                                    <img src="/images/dotOnline.svg" alt="Online" />
                                                </div> */}
                                                <div>
                                                    <Image
                                                        style={{ borderRadius: '50%', width: '70px', height: '70px' }}
                                                        src={item?.use_logo || '/images/candidate/ava_default.png'}
                                                        alt="logo candidate"
                                                        onError={(e) => {
                                                            e.currentTarget.srcset = '/images/candidate/ava_default.png'
                                                            return true
                                                        }}
                                                        width={70}
                                                        height={70}
                                                        className={s.avatar}
                                                    />
                                                </div>
                                                <div style={{ width: "100%" }} >
                                                    <Link
                                                        href={`/chi-tiet-ung-vien/${createLinkTilte(item.use_name)}-${item.use_id}.html`}
                                                        className={s.line_p}
                                                        style={{ color: "#F88C00" }}
                                                    >
                                                        {item.use_name}
                                                    </Link>
                                                    <div className={s.line_p}>
                                                        <div>{item?.use_job_name}</div>
                                                    </div>
                                                    <div className={s.line_div}>
                                                        <div className={s.line_div_ad}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path d="M10.0004 11.1917C11.4363 11.1917 12.6004 10.0276 12.6004 8.5917C12.6004 7.15576 11.4363 5.9917 10.0004 5.9917C8.56445 5.9917 7.40039 7.15576 7.40039 8.5917C7.40039 10.0276 8.56445 11.1917 10.0004 11.1917Z" stroke="#474747" strokeWidth="1.5" />
                                                                <path d="M3.01675 7.07496C4.65842 -0.141705 15.3501 -0.133372 16.9834 7.08329C17.9418 11.3166 15.3084 14.9 13.0001 17.1166C11.3251 18.7333 8.67508 18.7333 6.99175 17.1166C4.69175 14.9 2.05842 11.3083 3.01675 7.07496Z" stroke="#474747" strokeWidth="1.5" />
                                                            </svg>
                                                            {item?.use_city_job_name && Array.isArray(item.use_city_job_name) ? item.use_city_job_name.join(', ') : 'Chưa cập nhật'}
                                                        </div>
                                                        {/* <div className={s.last_line}>
                                                            <div className={s.cursor} onClick={() => chiTietUngVien(item?.use_name, item?.use_id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                                                    <path d="M7.16666 18.3333H13.8333C17.1833 18.3333 17.7833 16.9917 17.9583 15.3583L18.5833 8.69167C18.8083 6.65833 18.225 5 14.6667 5H6.33333C2.775 5 2.19166 6.65833 2.41666 8.69167L3.04166 15.3583C3.21666 16.9917 3.81666 18.3333 7.16666 18.3333Z" stroke="#474747" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M7.16669 4.99996V4.33329C7.16669 2.85829 7.16669 1.66663 9.83335 1.66663H11.1667C13.8334 1.66663 13.8334 2.85829 13.8334 4.33329V4.99996" stroke="#474747" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M12.1666 10.8333V11.6667C12.1666 11.675 12.1666 11.675 12.1666 11.6833C12.1666 12.5917 12.1583 13.3333 10.5 13.3333C8.84998 13.3333 8.83331 12.6 8.83331 11.6917V10.8333C8.83331 10 8.83331 10 9.66665 10H11.3333C12.1666 10 12.1666 10 12.1666 10.8333Z" stroke="#474747" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M18.5417 9.16663C16.6167 10.5666 14.4167 11.4 12.1667 11.6833" stroke="#474747" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M2.68335 9.3916C4.55835 10.6749 6.67502 11.4499 8.83335 11.6916" stroke="#474747" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                                Chi tiết trong CV
                                                            </div>
                                                            <div className={s.time} >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                    <g>
                                                                        <path d="M10.6438 1.27375C10.4295 1.25793 10.2148 1.25001 10 1.25V0C10.2457 0.000119784 10.4913 0.00929268 10.7362 0.0275L10.6438 1.27375ZM13.1488 1.83625C12.7481 1.68163 12.3365 1.55671 11.9175 1.4625L12.1913 0.2425C12.67 0.35 13.1412 0.4925 13.5987 0.67L13.1488 1.83625ZM14.8612 2.72375C14.6825 2.60456 14.4995 2.49199 14.3125 2.38625L14.9288 1.29875C15.3561 1.54092 15.7651 1.81415 16.1525 2.11625L15.3837 3.1025C15.2143 2.97029 15.04 2.84437 14.8612 2.725V2.72375ZM17.1537 4.96125C16.9065 4.60997 16.6337 4.2774 16.3375 3.96625L17.2425 3.10375C17.58 3.46 17.8925 3.84125 18.1763 4.24125L17.1537 4.96125ZM18.0837 6.65125C18.0017 6.45307 17.9125 6.25794 17.8163 6.06625L18.9325 5.50375C19.1532 5.94261 19.3413 6.39718 19.495 6.86375L18.3075 7.255C18.2403 7.05108 18.1657 6.8497 18.0837 6.65125ZM18.7463 9.785C18.7361 9.35542 18.6944 8.92718 18.6213 8.50375L19.8525 8.29125C19.9362 8.77375 19.985 9.26375 19.9975 9.75375L18.7475 9.785H18.7463ZM18.5825 11.7075C18.6238 11.495 18.6575 11.2837 18.6837 11.07L19.925 11.2238C19.865 11.7114 19.7689 12.194 19.6375 12.6675L18.4325 12.3337C18.49 12.1275 18.54 11.9187 18.5825 11.7075ZM17.3925 14.6812C17.6225 14.3187 17.825 13.9388 18 13.5462L19.1425 14.0525C18.9425 14.5025 18.7112 14.935 18.4487 15.35L17.3925 14.6812ZM16.1875 16.1875C16.34 16.035 16.4863 15.8775 16.625 15.715L17.5725 16.5312C17.412 16.7173 17.2449 16.8974 17.0712 17.0712L16.1875 16.1875Z" fill="#474747" />
                                                                        <path d="M10 1.25C8.5611 1.2501 7.14443 1.60506 5.87547 2.28342C4.60651 2.96179 3.52443 3.94263 2.72507 5.13906C1.92571 6.3355 1.43374 7.7106 1.29274 9.14258C1.15174 10.5746 1.36606 12.0192 1.91672 13.3486C2.46738 14.6779 3.33738 15.851 4.44966 16.7638C5.56194 17.6766 6.88217 18.3011 8.29342 18.5818C9.70466 18.8626 11.1634 18.791 12.5403 18.3733C13.9173 17.9557 15.17 17.2049 16.1875 16.1875L17.0712 17.0712C15.9084 18.2347 14.4766 19.0934 12.9025 19.5712C11.3285 20.0491 9.66096 20.1313 8.04758 19.8106C6.4342 19.4899 4.92482 18.7762 3.65318 17.7328C2.38155 16.6893 1.38692 15.3483 0.757416 13.8286C0.127915 12.3089 -0.117019 10.6573 0.0443161 9.02034C0.205651 7.38332 0.768273 5.81138 1.68233 4.44377C2.59639 3.07617 3.83367 1.95514 5.28453 1.18C6.7354 0.404869 8.35505 -0.000435915 10 3.51823e-07V1.25Z" fill="#474747" />
                                                                        <path d="M9.375 3.75C9.54076 3.75 9.69973 3.81585 9.81694 3.93306C9.93415 4.05027 10 4.20924 10 4.375V10.8875L14.06 13.2075C14.1997 13.2918 14.301 13.4274 14.342 13.5854C14.3831 13.7433 14.3608 13.9111 14.2798 14.0527C14.1988 14.1944 14.0657 14.2989 13.9087 14.3437C13.7518 14.3885 13.5836 14.3701 13.44 14.2925L9.065 11.7925C8.96934 11.7379 8.88982 11.6589 8.83451 11.5636C8.77919 11.4684 8.75004 11.3602 8.75 11.25V4.375C8.75 4.20924 8.81585 4.05027 8.93306 3.93306C9.05027 3.81585 9.20924 3.75 9.375 3.75Z" fill="#474747" />
                                                                    </g>
                                                                </svg>
                                                                2 phút trước
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </Space>
                                        {/* <div className={s.chat}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                                                <g clipPath="url(#clip0_3141_97285)">
                                                    <path d="M9.49977 15.9506C13.8853 15.9506 17.4409 12.617 17.4409 8.50471C17.4409 4.39246 13.8853 1.05884 9.49977 1.05884C5.11426 1.05884 1.55859 4.39246 1.55859 8.50471C1.55859 10.3768 2.29613 12.0894 3.51411 13.3977C3.41782 14.4784 3.10017 15.6634 2.74878 16.5526C2.67036 16.7505 2.82223 16.9717 3.01977 16.9377C5.25918 16.5441 6.59032 15.94 7.16903 15.6251C7.92931 15.8424 8.71292 15.9518 9.49977 15.9506Z" stroke="white" strokeWidth="1.5" />
                                                    <mask id="path-2-inside-1_3141_97285" fill="white">
                                                        <path d="M6.08525 8.8586C6.08525 9.12191 5.99782 9.32816 5.82236 9.4779C5.64397 9.62594 5.39751 9.69996 5.08239 9.69996H3.49976V9.08462H4.8107C4.96444 9.08462 5.07652 9.05976 5.14635 9.0106C5.21618 8.95974 5.25139 8.8812 5.25139 8.77384C5.25139 8.67496 5.21794 8.59755 5.15105 8.54161C5.08122 8.48793 4.96796 8.46137 4.81128 8.46137L3.74152 8.46532V7.85055H4.79133C4.94977 7.85055 5.06361 7.82682 5.13344 7.77879C5.20034 7.73245 5.23379 7.65561 5.23379 7.54825C5.23379 7.44654 5.20034 7.37082 5.13344 7.31996C5.09941 7.29228 5.05422 7.2725 4.99848 7.26007C4.93979 7.24933 4.87114 7.24368 4.79133 7.24368H3.49976V6.62891H5.01608C5.36699 6.62891 5.63282 6.69671 5.81356 6.83232C5.99195 6.96963 6.08114 7.18266 6.08114 7.47196C6.08114 7.61718 6.0477 7.74601 5.9808 7.85846C5.91097 7.9709 5.8206 8.06979 5.70911 8.15455C5.83175 8.22744 5.92094 8.31446 5.97669 8.4156C6.04887 8.53426 6.08525 8.68174 6.08525 8.8586Z" />
                                                    </mask>
                                                    <path d="M6.08525 8.8586C6.08525 9.12191 5.99782 9.32816 5.82236 9.4779C5.64397 9.62594 5.39751 9.69996 5.08239 9.69996H3.49976V9.08462H4.8107C4.96444 9.08462 5.07652 9.05976 5.14635 9.0106C5.21618 8.95974 5.25139 8.8812 5.25139 8.77384C5.25139 8.67496 5.21794 8.59755 5.15105 8.54161C5.08122 8.48793 4.96796 8.46137 4.81128 8.46137L3.74152 8.46532V7.85055H4.79133C4.94977 7.85055 5.06361 7.82682 5.13344 7.77879C5.20034 7.73245 5.23379 7.65561 5.23379 7.54825C5.23379 7.44654 5.20034 7.37082 5.13344 7.31996C5.09941 7.29228 5.05422 7.2725 4.99848 7.26007C4.93979 7.24933 4.87114 7.24368 4.79133 7.24368H3.49976V6.62891H5.01608C5.36699 6.62891 5.63282 6.69671 5.81356 6.83232C5.99195 6.96963 6.08114 7.18266 6.08114 7.47196C6.08114 7.61718 6.0477 7.74601 5.9808 7.85846C5.91097 7.9709 5.8206 8.06979 5.70911 8.15455C5.83175 8.22744 5.92094 8.31446 5.97669 8.4156C6.04887 8.53426 6.08525 8.68174 6.08525 8.8586Z" fill="white" />
                                                    <path d="M5.82236 9.4779L6.46104 10.2475L6.47152 10.2386L5.82236 9.4779ZM3.49976 9.69996H2.49976V10.7H3.49976V9.69996ZM3.49976 9.08462V8.08462H2.49976V9.08462H3.49976ZM5.14635 9.0106L5.722 9.8283L5.72856 9.82368L5.73504 9.81896L5.14635 9.0106ZM5.15105 8.54161L5.79254 7.77447L5.77678 7.7613L5.7605 7.74878L5.15105 8.54161ZM4.81128 8.46137V7.46136L4.80758 7.46138L4.81128 8.46137ZM3.74152 8.46532H2.74152V9.46903L3.74522 9.46532L3.74152 8.46532ZM3.74152 7.85055V6.85055H2.74152V7.85055H3.74152ZM5.13344 7.77879L5.70014 8.60272L5.70283 8.60086L5.13344 7.77879ZM5.13344 7.31996L4.50238 8.0957L4.51515 8.10609L4.52826 8.11605L5.13344 7.31996ZM4.99848 7.26007L5.21612 6.28404L5.19736 6.27986L5.17844 6.2764L4.99848 7.26007ZM3.49976 7.24368H2.49976V8.24368H3.49976V7.24368ZM3.49976 6.62891V5.62891H2.49976V6.62891H3.49976ZM5.81356 6.83232L6.42355 6.03982L6.41372 6.03245L5.81356 6.83232ZM5.9808 7.85846L6.83031 8.38602L6.83534 8.37793L6.84021 8.36974L5.9808 7.85846ZM5.70911 8.15455L5.10392 7.35846L3.92293 8.25625L5.19819 9.01418L5.70911 8.15455ZM5.97669 8.4156L5.10091 8.8983L5.11122 8.91702L5.12233 8.93528L5.97669 8.4156ZM5.08525 8.8586C5.08525 8.8793 5.08203 8.86033 5.09906 8.8202C5.11759 8.77654 5.14649 8.74004 5.1732 8.71724L6.47152 10.2386C6.90288 9.87042 7.08525 9.36782 7.08525 8.8586H5.08525ZM5.18374 8.70837C5.20858 8.68776 5.22514 8.68397 5.21616 8.68666C5.20422 8.69025 5.16347 8.69996 5.08239 8.69996V10.7C5.5473 10.7 6.04795 10.5902 6.46098 10.2474L5.18374 8.70837ZM5.08239 8.69996H3.49976V10.7H5.08239V8.69996ZM4.49976 9.69996V9.08462H2.49976V9.69996H4.49976ZM3.49976 10.0846H4.8107V8.08462H3.49976V10.0846ZM4.8107 10.0846C5.02814 10.0846 5.39602 10.0578 5.722 9.8283L4.57071 8.1929C4.67412 8.1201 4.76245 8.09662 4.79434 8.08958C4.82823 8.08209 4.83756 8.08462 4.8107 8.08462V10.0846ZM5.73504 9.81896C6.12312 9.53634 6.25139 9.11894 6.25139 8.77384H4.25139C4.25139 8.71995 4.26014 8.62217 4.31137 8.50699C4.36566 8.38493 4.45207 8.27914 4.55766 8.20224L5.73504 9.81896ZM6.25139 8.77384C6.25139 8.42328 6.11871 8.04723 5.79254 7.77447L4.50956 9.30874C4.42739 9.24003 4.35571 9.14792 4.30833 9.03826C4.26243 8.93202 4.25139 8.83757 4.25139 8.77384H6.25139ZM5.7605 7.74878C5.42387 7.49001 5.03402 7.46137 4.81128 7.46137V9.46137C4.83751 9.46137 4.82391 9.46402 4.78428 9.45468C4.74559 9.44556 4.64936 9.41727 4.54159 9.33443L5.7605 7.74878ZM4.80758 7.46138L3.73783 7.46533L3.74522 9.46532L4.81498 9.46136L4.80758 7.46138ZM4.74152 8.46532V7.85055H2.74152V8.46532H4.74152ZM3.74152 8.85055H4.79133V6.85055H3.74152V8.85055ZM4.79133 8.85055C4.99981 8.85055 5.37131 8.82888 5.70014 8.60271L4.56675 6.95486C4.67376 6.88125 4.76367 6.85956 4.79062 6.85391C4.82047 6.84766 4.82485 6.85055 4.79133 6.85055V8.85055ZM5.70283 8.60086C6.1223 8.31032 6.23379 7.86796 6.23379 7.54825H4.23379C4.23379 7.50167 4.24063 7.40484 4.29179 7.28731C4.34697 7.16053 4.43983 7.04276 4.56406 6.95672L5.70283 8.60086ZM6.23379 7.54825C6.23379 7.20535 6.10602 6.80317 5.73863 6.52388L4.52826 8.11605C4.42896 8.04056 4.34619 7.93775 4.29342 7.81786C4.24327 7.70391 4.23379 7.60588 4.23379 7.54825H6.23379ZM5.7645 6.54423C5.57585 6.39076 5.37345 6.31912 5.21612 6.28404L4.78083 8.2361C4.735 8.22588 4.62296 8.19379 4.50238 8.0957L5.7645 6.54423ZM5.17844 6.2764C5.04708 6.25236 4.91626 6.24368 4.79133 6.24368V8.24368C4.80786 8.24368 4.81822 8.24428 4.82318 8.24467C4.8282 8.24507 4.82625 8.24516 4.81851 8.24374L5.17844 6.2764ZM4.79133 6.24368H3.49976V8.24368H4.79133V6.24368ZM4.49976 7.24368V6.62891H2.49976V7.24368H4.49976ZM3.49976 7.62891H5.01608V5.62891H3.49976V7.62891ZM5.01608 7.62891C5.1301 7.62891 5.19812 7.64023 5.23147 7.64873C5.26338 7.65687 5.24837 7.65845 5.21339 7.6322L6.41372 6.03245C5.98763 5.71274 5.47123 5.62891 5.01608 5.62891V7.62891ZM5.20361 7.62477C5.18025 7.60679 5.15677 7.58381 5.13587 7.55643C5.11505 7.52917 5.10084 7.50287 5.09175 7.48115C5.07407 7.43889 5.08114 7.42762 5.08114 7.47196H7.08114C7.08114 6.96868 6.91529 6.41841 6.4235 6.03988L5.20361 7.62477ZM5.08114 7.47196C5.08114 7.46742 5.08173 7.45093 5.08815 7.4262C5.09473 7.40087 5.10575 7.37346 5.12139 7.34717L6.84021 8.36974C7.00899 8.08605 7.08114 7.77684 7.08114 7.47196H5.08114ZM5.13128 7.33089C5.12844 7.33547 5.12229 7.34449 5.10392 7.35846L6.31429 8.95063C6.51891 8.79508 6.69349 8.60634 6.83031 8.38602L5.13128 7.33089ZM5.19819 9.01418C5.2036 9.01739 5.14915 8.98583 5.10091 8.8983L6.85248 7.9329C6.69274 7.64308 6.4599 7.43748 6.22002 7.29491L5.19819 9.01418ZM5.12233 8.93528C5.0772 8.86109 5.08525 8.81739 5.08525 8.8586H7.08525C7.08525 8.54609 7.02054 8.20743 6.83105 7.89592L5.12233 8.93528Z" fill="white" mask="url(#path-2-inside-1_3141_97285)" />
                                                    <mask id="path-4-inside-2_3141_97285" fill="white">
                                                        <path d="M9.24826 8.75741C9.24826 9.07949 9.12679 9.32359 8.88444 9.48972C8.64208 9.65584 8.29293 9.73834 7.83639 9.73834C7.2977 9.73834 6.89925 9.61346 6.64105 9.36371C6.38462 9.11565 6.2561 8.72633 6.2561 8.19518C6.2561 7.65895 6.39342 7.26341 6.66863 7.00858C6.93974 6.75487 7.36225 6.6283 7.93673 6.6283H9.08278L9.08043 7.24307H7.9203C7.63218 7.24307 7.42327 7.29675 7.29359 7.40355C7.23256 7.4544 7.1862 7.51882 7.15451 7.59679C7.11872 7.67929 7.10111 7.77366 7.10111 7.88045H8.13625C8.50946 7.88045 8.7882 7.95221 8.97246 8.09517C9.15613 8.23982 9.24826 8.46019 9.24826 8.75741ZM8.42027 8.79018C8.42027 8.6913 8.39386 8.61671 8.34105 8.56586C8.28824 8.51952 8.20784 8.49579 8.09928 8.49579H7.10522C7.10522 8.70543 7.16625 8.86421 7.28889 8.971C7.4086 9.08062 7.60049 9.13543 7.86397 9.13543C8.06525 9.13543 8.20726 9.10718 8.29176 9.05124C8.37802 8.9953 8.42027 8.90828 8.42027 8.79018Z" />
                                                    </mask>
                                                    <path d="M9.24826 8.75741C9.24826 9.07949 9.12679 9.32359 8.88444 9.48972C8.64208 9.65584 8.29293 9.73834 7.83639 9.73834C7.2977 9.73834 6.89925 9.61346 6.64105 9.36371C6.38462 9.11565 6.2561 8.72633 6.2561 8.19518C6.2561 7.65895 6.39342 7.26341 6.66863 7.00858C6.93974 6.75487 7.36225 6.6283 7.93673 6.6283H9.08278L9.08043 7.24307H7.9203C7.63218 7.24307 7.42327 7.29675 7.29359 7.40355C7.23256 7.4544 7.1862 7.51882 7.15451 7.59679C7.11872 7.67929 7.10111 7.77366 7.10111 7.88045H8.13625C8.50946 7.88045 8.7882 7.95221 8.97246 8.09517C9.15613 8.23982 9.24826 8.46019 9.24826 8.75741ZM8.42027 8.79018C8.42027 8.6913 8.39386 8.61671 8.34105 8.56586C8.28824 8.51952 8.20784 8.49579 8.09928 8.49579H7.10522C7.10522 8.70543 7.16625 8.86421 7.28889 8.971C7.4086 9.08062 7.60049 9.13543 7.86397 9.13543C8.06525 9.13543 8.20726 9.10718 8.29176 9.05124C8.37802 8.9953 8.42027 8.90828 8.42027 8.79018Z" fill="white" />
                                                    <path d="M6.64105 9.36371L5.94579 10.0825L5.9458 10.0825L6.64105 9.36371ZM6.66863 7.00858L7.34806 7.74233L7.35192 7.73872L6.66863 7.00858ZM9.08278 6.6283L10.0828 6.63211L10.0866 5.6283H9.08278V6.6283ZM9.08043 7.24307V8.24307H10.0766L10.0804 7.24689L9.08043 7.24307ZM7.29359 7.40355L6.65789 6.63159L6.65342 6.63531L7.29359 7.40355ZM7.15451 7.59679L8.07188 7.99484L8.07654 7.98411L8.08094 7.97327L7.15451 7.59679ZM7.10111 7.88045H6.10111V8.88045H7.10111V7.88045ZM8.97246 8.09517L9.59119 7.30954L9.58545 7.30508L8.97246 8.09517ZM8.34105 8.56586L9.03467 7.84552L9.01797 7.82944L9.00054 7.81415L8.34105 8.56586ZM7.10522 8.49579V7.49579H6.10522V8.49579H7.10522ZM7.28889 8.971L7.96424 8.2335L7.95502 8.22506L7.94559 8.21685L7.28889 8.971ZM8.29176 9.05124L7.74763 8.21218L7.73975 8.2174L8.29176 9.05124ZM8.24826 8.75741C8.24826 8.7917 8.24232 8.77604 8.26174 8.73697C8.2709 8.71855 8.28263 8.70135 8.29531 8.68705C8.30772 8.67306 8.31716 8.66619 8.31905 8.66489L9.44983 10.3145C9.99297 9.94223 10.2483 9.37278 10.2483 8.75741H8.24826ZM8.31905 8.66489C8.31259 8.66932 8.19595 8.73834 7.83639 8.73834V10.7383C8.38991 10.7383 8.97158 10.6424 9.44983 10.3145L8.31905 8.66489ZM7.83639 8.73834C7.64068 8.73834 7.51166 8.71523 7.4326 8.69045C7.35785 8.66702 7.33662 8.64526 7.33631 8.64495L5.9458 10.0825C6.46548 10.5852 7.16571 10.7383 7.83639 10.7383V8.73834ZM7.33632 8.64496C7.33629 8.64493 7.33618 8.64482 7.33596 8.64458C7.33574 8.64434 7.33535 8.64389 7.33479 8.64319C7.33373 8.64184 7.33165 8.63905 7.32878 8.6343C7.32311 8.62491 7.3131 8.60576 7.30216 8.57258C7.2794 8.50353 7.2561 8.38395 7.2561 8.19518H5.2561C5.2561 8.86614 5.41706 9.57101 5.94579 10.0825L7.33632 8.64496ZM7.2561 8.19518C7.2561 8.0089 7.28038 7.89186 7.30375 7.82463C7.32506 7.76329 7.34428 7.74582 7.34805 7.74232L5.98921 6.27483C5.43434 6.78862 5.2561 7.50294 5.2561 8.19518H7.2561ZM7.35192 7.73872C7.35858 7.73249 7.48144 7.6283 7.93673 7.6283V5.6283C7.24305 5.6283 6.5209 5.77724 5.98534 6.27843L7.35192 7.73872ZM7.93673 7.6283H9.08278V5.6283H7.93673V7.6283ZM8.08279 6.62448L8.08044 7.23925L10.0804 7.24689L10.0828 6.63211L8.08279 6.62448ZM9.08043 6.24307H7.9203V8.24307H9.08043V6.24307ZM7.9203 6.24307C7.54987 6.24307 7.05546 6.30422 6.6579 6.6316L7.92928 8.17549C7.89144 8.20665 7.8575 8.22592 7.83383 8.23714C7.81058 8.24816 7.79645 8.25179 7.79579 8.25196C7.79512 8.25213 7.80449 8.24971 7.8263 8.24736C7.84797 8.24502 7.87887 8.24307 7.9203 8.24307V6.24307ZM6.65342 6.63531C6.45874 6.79754 6.31779 6.99957 6.22809 7.22032L8.08094 7.97327C8.05461 8.03806 8.00638 8.11126 7.93375 8.17178L6.65342 6.63531ZM6.23715 7.19875C6.13701 7.42955 6.10111 7.66381 6.10111 7.88045H8.10111C8.10111 7.88351 8.10043 7.92904 8.07188 7.99484L6.23715 7.19875ZM7.10111 8.88045H8.13625V6.88045H7.10111V8.88045ZM8.13625 8.88045C8.26212 8.88045 8.33805 8.8929 8.37635 8.90274C8.41334 8.91224 8.39724 8.91456 8.35947 8.88526L9.58545 7.30508C9.14859 6.96614 8.60838 6.88045 8.13625 6.88045V8.88045ZM8.35374 8.88078C8.33385 8.86512 8.3134 8.84485 8.29499 8.82047C8.27665 8.79617 8.26415 8.77286 8.25623 8.75385C8.24075 8.71672 8.24826 8.71006 8.24826 8.75741H10.2483C10.2483 8.24293 10.0779 7.6929 9.59118 7.30956L8.35374 8.88078ZM9.42027 8.79018C9.42027 8.51664 9.34362 8.14302 9.03467 7.84552L7.64742 9.2862C7.4441 9.09041 7.42027 8.86596 7.42027 8.79018H9.42027ZM9.00054 7.81415C8.69157 7.54308 8.33014 7.49579 8.09928 7.49579V9.49579C8.08554 9.49579 7.8849 9.49597 7.68155 9.31757L9.00054 7.81415ZM8.09928 7.49579H7.10522V9.49579H8.09928V7.49579ZM6.10522 8.49579C6.10522 8.90293 6.23069 9.37554 6.6322 9.72516L7.94559 8.21685C8.01304 8.27558 8.05888 8.34684 8.08399 8.41188C8.10687 8.47118 8.10522 8.5057 8.10522 8.49579H6.10522ZM6.61355 9.7085C7.00332 10.0654 7.49797 10.1354 7.86397 10.1354V8.13543C7.79725 8.13543 7.78047 8.12801 7.79736 8.13284C7.81694 8.13843 7.8865 8.16232 7.96424 8.2335L6.61355 9.7085ZM7.86397 10.1354C8.10397 10.1354 8.50082 10.1121 8.84376 9.88508L7.73975 8.2174C7.79315 8.18204 7.83935 8.16171 7.86972 8.15044C7.90019 8.13914 7.92105 8.13461 7.92804 8.13323C7.93941 8.13099 7.92212 8.13543 7.86397 8.13543V10.1354ZM8.83586 9.89026C9.2574 9.61689 9.42027 9.18153 9.42027 8.79018H7.42027C7.42027 8.7309 7.43102 8.62498 7.49058 8.50357C7.5533 8.37574 7.64759 8.27711 7.74766 8.21222L8.83586 9.89026Z" fill="white" mask="url(#path-4-inside-2_3141_97285)" />
                                                    <mask id="path-6-inside-3_3141_97285" fill="white">
                                                        <path d="M12.1573 8.76989C12.1573 9.06993 12.0593 9.30047 11.8645 9.46095C11.6679 9.62029 11.3903 9.6994 11.0324 9.6994H9.35352V9.08462H10.8869C11.0377 9.08462 11.1445 9.05976 11.2055 9.0106C11.2642 8.96257 11.2929 8.88233 11.2929 8.76989C11.2929 8.65462 11.2636 8.57155 11.2055 8.52126C11.1445 8.47324 11.0377 8.4495 10.8869 8.4495H9.35352V6.62891H12.0012L11.9989 7.24368H10.1381V7.83812H11.175C11.476 7.83812 11.7166 7.91835 11.8979 8.07883C11.9818 8.16246 12.047 8.26078 12.0928 8.37322C12.1356 8.48793 12.1573 8.62071 12.1573 8.76989Z" />
                                                    </mask>
                                                    <path d="M12.1573 8.76989C12.1573 9.06993 12.0593 9.30047 11.8645 9.46095C11.6679 9.62029 11.3903 9.6994 11.0324 9.6994H9.35352V9.08462H10.8869C11.0377 9.08462 11.1445 9.05976 11.2055 9.0106C11.2642 8.96257 11.2929 8.88233 11.2929 8.76989C11.2929 8.65462 11.2636 8.57155 11.2055 8.52126C11.1445 8.47324 11.0377 8.4495 10.8869 8.4495H9.35352V6.62891H12.0012L11.9989 7.24368H10.1381V7.83812H11.175C11.476 7.83812 11.7166 7.91835 11.8979 8.07883C11.9818 8.16246 12.047 8.26078 12.0928 8.37322C12.1356 8.48793 12.1573 8.62071 12.1573 8.76989Z" fill="white" />
                                                    <path d="M11.8645 9.46095L12.4942 10.2378L12.5003 10.2328L11.8645 9.46095ZM9.35352 9.6994H8.35352V10.6994H9.35352V9.6994ZM9.35352 9.08462V8.08462H8.35352V9.08462H9.35352ZM11.2055 9.0106L11.8328 9.78939L11.8389 9.78444L11.2055 9.0106ZM11.2055 8.52126L11.86 7.7652L11.8423 7.7499L11.8239 7.73544L11.2055 8.52126ZM9.35352 8.4495H8.35352V9.4495H9.35352V8.4495ZM9.35352 6.62891V5.62891H8.35352V6.62891H9.35352ZM12.0012 6.62891L13.0012 6.63272L13.005 5.62891H12.0012V6.62891ZM11.9989 7.24368V8.24368H12.9951L12.9989 7.2475L11.9989 7.24368ZM10.1381 7.24368V6.24368H9.13808V7.24368H10.1381ZM10.1381 7.83812H9.13808V8.83812H10.1381V7.83812ZM11.8979 8.07883L12.6038 7.37051L12.5829 7.34961L12.5607 7.32998L11.8979 8.07883ZM12.0928 8.37322L13.0296 8.02337L13.0245 8.00971L13.019 7.9962L12.0928 8.37322ZM11.1573 8.76989C11.1573 8.81155 11.1506 8.80735 11.1633 8.77734C11.1696 8.76253 11.179 8.74537 11.1919 8.72816C11.2048 8.71099 11.2179 8.69797 11.2287 8.68908L12.5003 10.2328C12.9691 9.84665 13.1573 9.30756 13.1573 8.76989H11.1573ZM11.2348 8.6841C11.2783 8.64882 11.2561 8.6994 11.0324 8.6994V10.6994C11.5245 10.6994 12.0575 10.5918 12.4942 10.2378L11.2348 8.6841ZM11.0324 8.6994H9.35352V10.6994H11.0324V8.6994ZM10.3535 9.6994V9.08462H8.35352V9.6994H10.3535ZM9.35352 10.0846H10.8869V8.08462H9.35352V10.0846ZM10.8869 10.0846C11.0852 10.0846 11.4915 10.0643 11.8328 9.78937L10.5782 8.23183C10.7018 8.13229 10.8144 8.10109 10.8535 8.09201C10.8964 8.08204 10.9124 8.08462 10.8869 8.08462V10.0846ZM11.8389 9.78444C12.2271 9.46665 12.2929 9.02802 12.2929 8.76989H10.2929C10.2929 8.73665 10.3012 8.45849 10.5721 8.23675L11.8389 9.78444ZM12.2929 8.76989C12.2929 8.50937 12.2274 8.08327 11.86 7.7652L10.551 9.27733C10.2998 9.05984 10.2929 8.79987 10.2929 8.76989H12.2929ZM11.8239 7.73544C11.4823 7.46658 11.0777 7.4495 10.8869 7.4495V9.4495C10.915 9.4495 10.9014 9.4522 10.8608 9.4431C10.8247 9.43498 10.712 9.40545 10.5871 9.30709L11.8239 7.73544ZM10.8869 7.4495H9.35352V9.4495H10.8869V7.4495ZM10.3535 8.4495V6.62891H8.35352V8.4495H10.3535ZM9.35352 7.62891H12.0012V5.62891H9.35352V7.62891ZM11.0012 6.62509L10.9989 7.23987L12.9989 7.2475L13.0012 6.63272L11.0012 6.62509ZM11.9989 6.24368H10.1381V8.24368H11.9989V6.24368ZM9.13808 7.24368V7.83812H11.1381V7.24368H9.13808ZM10.1381 8.83812H11.175V6.83812H10.1381V8.83812ZM11.175 8.83812C11.2374 8.83812 11.2636 8.84649 11.2653 8.84705C11.266 8.84728 11.2621 8.84602 11.2554 8.84218C11.2486 8.83827 11.2415 8.83326 11.2352 8.82768L12.5607 7.32998C12.1554 6.9713 11.659 6.83812 11.175 6.83812V8.83812ZM11.192 8.78714C11.1865 8.78164 11.1808 8.77481 11.1758 8.7672C11.1708 8.75962 11.1679 8.75351 11.1666 8.75024L13.019 7.9962C12.9238 7.76235 12.7847 7.55072 12.6038 7.37051L11.192 8.78714ZM11.156 8.72307C11.1492 8.70508 11.1573 8.71576 11.1573 8.76989H13.1573C13.1573 8.52567 13.122 8.27077 13.0296 8.02337L11.156 8.72307Z" fill="white" mask="url(#path-6-inside-3_3141_97285)" />
                                                    <path d="M14.3401 10.6377C14.2213 10.6011 13.8996 10.5143 13.5794 10.4292L13.8335 10.2086L14.8141 10.4827C14.8263 10.4886 14.8427 10.497 14.8615 10.5077C14.9051 10.5325 14.9466 10.5613 14.9769 10.5895C14.897 10.6635 14.8739 10.6761 14.8395 10.686C14.7929 10.6994 14.6606 10.7196 14.3401 10.6377ZM15.0025 10.5539C15.0025 10.5539 15.0023 10.5545 15.0018 10.5558L15.0025 10.5539Z" fill="white" stroke="white" />
                                                    <path d="M8.17962 11.4887C8.31205 11.4796 8.44602 11.4654 8.58097 11.4471L8.17962 11.4887ZM8.17962 11.4887C8.55487 11.4439 8.91857 11.3594 9.26446 11.2568L9.26455 11.2568C10.3709 10.9286 11.4187 10.4376 12.3154 9.66222L12.3168 9.66101C12.3298 9.64973 12.3378 9.64272 12.3456 9.63624L12.3457 9.63637L12.3554 9.62787C12.6479 9.37164 13.0061 9.03672 13.2797 8.6431C13.5538 8.24869 13.7753 7.74848 13.7143 7.17596L13.7143 7.1757C13.7075 7.11233 13.6959 7.05178 13.6802 6.99399C13.7383 7.05903 13.7836 7.13006 13.8169 7.20716C13.8675 7.37177 13.8822 7.5637 13.865 7.76509L13.865 7.76551C13.8327 8.14754 13.6778 8.52959 13.4363 8.87985L13.4362 8.88009C13.0279 9.47292 12.4165 9.95103 11.7336 10.3542L11.7334 10.3543C11.165 10.6902 10.5812 10.9498 9.95061 11.1387L9.95052 11.1387C9.49433 11.2755 9.03902 11.3849 8.58102 11.4471L8.17962 11.4887ZM5.78693 10.0344C5.80982 10.0824 5.83505 10.1288 5.86263 10.1745L5.75113 9.95247C5.75651 9.96429 5.76155 9.97623 5.76659 9.98817C5.77311 10.0036 5.77965 10.0191 5.78693 10.0344Z" fill="white" stroke="white" />
                                                    <mask id="path-10-inside-4_3141_97285" fill="white">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.10352 9.89863C6.10352 9.89863 7.7284 11.3141 10.5181 9.79749C10.2071 10.1512 6.73375 11.769 6.10352 9.89863Z" />
                                                    </mask>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.10352 9.89863C6.10352 9.89863 7.7284 11.3141 10.5181 9.79749C10.2071 10.1512 6.73375 11.769 6.10352 9.89863Z" fill="white" />
                                                    <path d="M6.10352 9.89863L6.76036 9.1446L3.97724 6.7202L5.15587 10.218L6.10352 9.89863ZM10.5181 9.79749L11.2691 10.4578L10.0405 8.91892L10.5181 9.79749ZM6.10352 9.89863C5.44667 10.6527 5.44719 10.6531 5.44771 10.6536C5.44789 10.6537 5.44842 10.6542 5.44879 10.6545C5.44952 10.6551 5.45028 10.6558 5.45107 10.6565C5.45265 10.6578 5.45433 10.6593 5.45613 10.6608C5.45972 10.6639 5.46376 10.6673 5.46823 10.671C5.47718 10.6784 5.4879 10.6872 5.50037 10.6971C5.52529 10.7169 5.55731 10.7414 5.59632 10.7693C5.67424 10.8252 5.78068 10.8953 5.91482 10.97C6.18293 11.1191 6.56488 11.2879 7.05203 11.3939C8.04838 11.6107 9.39641 11.5455 10.9957 10.676L10.0405 8.91892C8.8501 9.56606 7.99083 9.5514 7.47731 9.43965C7.20953 9.38138 7.0109 9.29107 6.88717 9.22224C6.82538 9.18786 6.78308 9.15928 6.76125 9.14363C6.75038 9.13584 6.74476 9.13139 6.74452 9.1312C6.74441 9.13111 6.74566 9.1321 6.74829 9.13429C6.74961 9.13539 6.75127 9.13678 6.75328 9.1385C6.75428 9.13935 6.75537 9.14029 6.75655 9.14131C6.75714 9.14181 6.75776 9.14234 6.75839 9.14289C6.75871 9.14317 6.7592 9.14359 6.75936 9.14373C6.75985 9.14416 6.76036 9.1446 6.10352 9.89863ZM9.76711 9.13717C9.84459 9.04906 9.88418 9.04358 9.75625 9.11917C9.66693 9.17195 9.53606 9.24065 9.37231 9.315C9.04264 9.46468 8.62738 9.61571 8.2176 9.705C7.79064 9.79804 7.46319 9.80328 7.26025 9.75204C7.1155 9.71549 7.08317 9.6743 7.05116 9.5793L5.15587 10.218C5.43898 11.0581 6.07715 11.5161 6.77063 11.6912C7.40592 11.8516 8.08441 11.781 8.64344 11.6591C9.21965 11.5336 9.77043 11.3307 10.1992 11.1361C10.4146 11.0382 10.6111 10.9371 10.7737 10.841C10.8977 10.7678 11.1139 10.6343 11.2691 10.4578L9.76711 9.13717Z" fill="white" mask="url(#path-10-inside-4_3141_97285)" />
                                                </g>
                                            </svg>
                                            <div className={s.w_chat}>Chat</div>
                                        </div> */}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={s.div_btn}>
                        <Button className={s.more_btn} onClick={ungVienTimViec} type="primary">Xem Thêm</Button>

                    </div>
                </div>
                <div className={s.last_map}>
                    <div className={s.div_a}>

                    </div>
                    <div className={s.div_b}>
                        <div className={s.title_candidate}>
                            <div className={s.f_div}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                                    <g clipPath="url(#clip0_3141_97243)">
                                        <path d="M2.4394 10.0063C3.76344 8.52594 5.61706 7.70714 7.66363 7.70154C7.67268 7.70154 7.68409 7.70154 7.69206 7.70154C11.7953 7.70154 14.2371 10.2915 16.2501 12.9973C16.815 13.6873 17.6969 14.3267 18.8202 13.6929C19.5134 13.3033 19.76 12.422 19.3715 11.7299C19.0842 11.2205 18.4351 11.0405 17.9258 11.3261C17.7503 11.4249 17.6249 11.5856 17.5698 11.7796C17.5142 11.9739 17.5397 12.1789 17.6396 12.3542C17.7048 12.4707 17.8095 12.5472 17.928 12.5853C18.0001 12.323 18.2516 12.1436 18.5271 12.1843C18.8178 12.2286 19.0142 12.491 18.9875 12.7782C19.0773 12.9936 19.0017 13.2439 18.7933 13.3597C18.0998 13.7472 17.2186 13.5029 16.8303 12.8101C16.6104 12.4184 16.5561 11.9622 16.6758 11.5272C16.7969 11.0935 17.0801 10.733 17.4731 10.5131C18.4282 9.97381 19.6459 10.3158 20.1862 11.2727C20.825 12.4123 20.418 13.8615 19.2817 14.5026C18.8355 14.7535 18.3759 14.8767 17.9234 14.8767C17.8069 14.8767 17.6958 14.8466 17.5827 14.8302C17.9842 15.3908 18.3828 15.9443 18.798 16.4667C19.7542 17.6706 20.5765 18.6768 21.3737 19.4536C21.473 19.4626 21.5719 19.4966 21.6496 19.5694C23.3077 21.1218 25.0278 21.3365 26.4978 20.1645C27.6364 19.2582 27.827 17.5922 26.9208 16.4532C26.2234 15.5816 24.9511 15.4362 24.08 16.1318C23.7625 16.384 23.5616 16.7441 23.5161 17.1494C23.4696 17.5549 23.5859 17.9501 23.8381 18.2715C24.0078 18.4862 24.2475 18.6122 24.5115 18.6634C24.4859 18.5816 24.4592 18.4952 24.4592 18.4022C24.4592 17.9116 24.8578 17.5117 25.3512 17.5117C25.8431 17.5117 26.2428 17.9092 26.2428 18.4022C26.2428 18.5316 26.214 18.6531 26.1651 18.7633C26.1827 18.9178 26.1315 19.0767 26.001 19.179C25.5711 19.5221 25.0323 19.6754 24.4872 19.6129C23.9415 19.5494 23.453 19.2802 23.1113 18.8521C22.7008 18.341 22.5184 17.6971 22.5929 17.0439C22.6672 16.3922 22.9892 15.8112 23.5019 15.4039C24.7756 14.3887 26.6341 14.6004 27.6506 15.8717C28.7994 17.3209 28.6297 19.3855 27.3304 20.6473C27.8675 20.3396 28.3445 19.9261 28.7206 19.4017C29.4321 18.4056 29.716 17.1393 29.5008 15.9341C29.158 14.0258 27.3259 12.753 25.4176 13.094C25.1665 13.1394 24.9224 12.9708 24.877 12.7186C24.8316 12.4647 24.9991 12.2245 25.253 12.1791C27.6722 11.7428 29.9824 13.3567 30.4148 15.7677C30.675 17.2209 30.3332 18.7427 29.4739 19.942C28.6363 21.1118 27.4058 21.8751 26.0072 22.0909C22.4973 22.6224 20.4457 20.0398 18.0688 17.0437C18.0574 17.0301 18.0445 17.0142 18.033 16.9982C18.0313 16.9959 18.029 16.9959 18.0279 16.9937C17.4175 16.3166 16.4532 15.6654 15.3318 16.4075C14.6719 16.8481 14.488 17.7453 14.9239 18.4041C15.2465 18.888 15.9057 19.0196 16.3939 18.6972C16.5628 18.5837 16.6767 18.4145 16.7161 18.2168C16.756 18.0203 16.7161 17.8181 16.6059 17.6568C16.5229 17.533 16.3939 17.4593 16.2576 17.4376C16.1917 17.6908 15.9589 17.8726 15.6904 17.8498C15.3891 17.8261 15.1679 17.559 15.1929 17.2593C15.1929 17.2558 15.1952 17.2526 15.1974 17.2478C15.1451 17.0594 15.2099 16.8503 15.3813 16.7368C16.0423 16.2985 16.9379 16.4779 17.379 17.1389C17.6277 17.5112 17.7156 17.959 17.6264 18.3996C17.5379 18.8437 17.2823 19.224 16.9065 19.4738C16.5682 19.6965 16.1842 19.8055 15.8066 19.8055C15.1621 19.8055 14.5293 19.4943 14.1479 18.9197C13.4278 17.8351 13.7278 16.3621 14.8147 15.6359C15.416 15.2383 16.0554 15.0988 16.6903 15.1907C16.625 15.0988 16.5602 15.009 16.4939 14.9166C16.1633 14.451 15.8299 13.9847 15.4892 13.5264C15.4728 13.5066 15.4565 13.4941 15.4416 13.4754C15.433 13.4652 15.4295 13.451 15.4229 13.4396C13.512 10.8867 11.328 8.63297 7.69378 8.63297C7.68581 8.63297 7.6744 8.63297 7.66772 8.63297C5.89143 8.63922 4.2788 9.34711 3.13631 10.6289C1.85298 12.065 1.24652 14.098 1.47588 16.2036C1.64386 17.7402 2.40021 19.12 3.60408 20.09C4.71706 20.9848 6.09365 21.405 7.50513 21.3369C8.36248 21.1915 9.03053 20.8121 9.47116 20.1875C9.99793 19.445 10.1707 18.4024 9.94129 17.3256C9.79592 16.6375 9.38954 16.0446 8.7988 15.6608C8.20591 15.2758 7.5019 15.1481 6.81123 15.2911C6.28317 15.4041 5.82789 15.716 5.53457 16.1672C5.24168 16.6194 5.14068 17.1587 5.25288 17.688C5.33709 18.0832 5.5686 18.4229 5.90715 18.6453C6.24785 18.868 6.65876 18.9395 7.05631 18.8587C7.31539 18.8043 7.53119 18.6522 7.69357 18.4478C7.30506 18.3477 7.01561 18.007 7.02013 17.5881C7.02573 17.0975 7.43104 16.7034 7.924 16.7103C8.18631 16.7137 8.4146 16.8352 8.57461 17.0181C8.70081 17.0781 8.80182 17.185 8.83477 17.3327C8.95063 17.8687 8.84833 18.4183 8.55092 18.8773C8.24877 19.3384 7.78876 19.6562 7.25057 19.7708C6.60427 19.906 5.95022 19.7857 5.39804 19.4267C4.8508 19.0679 4.47607 18.5204 4.34406 17.8821C4.17823 17.1111 4.3236 16.3242 4.75518 15.6617C5.18569 14.999 5.84771 14.5453 6.61762 14.3825C7.55229 14.185 8.50742 14.362 9.30684 14.8817C10.1065 15.402 10.6574 16.2012 10.8538 17.1348C11.0629 18.1173 10.989 19.087 10.6653 19.9116C10.7448 19.8264 10.8357 19.754 10.9072 19.6631C11.6668 18.7205 12.0122 17.5347 11.8806 16.3295C11.6683 14.3911 9.91588 12.9908 7.98064 13.1956C7.71941 13.2314 7.49565 13.0384 7.46722 12.7834C7.44009 12.5278 7.62401 12.2984 7.87942 12.2706C10.3257 12.0021 12.5381 13.7805 12.8049 16.2285C12.965 17.6807 12.5472 19.1083 11.6329 20.2439C10.7187 21.3843 9.41495 22.0997 7.96363 22.2565C7.81805 22.2724 7.67268 22.2724 7.52752 22.2791C7.50577 22.2847 7.48682 22.2927 7.46399 22.295C7.44461 22.2974 7.42523 22.2985 7.40498 22.2985C7.39594 22.2985 7.38905 22.2905 7.38 22.2894C7.32788 22.2905 7.27318 22.2985 7.22107 22.2985C5.69695 22.2985 4.23185 21.7864 3.02799 20.8187C1.62663 19.6943 0.749899 18.0931 0.556721 16.3078C0.289673 13.9324 0.979042 11.6377 2.4394 10.0063Z" fill="#474747" />
                                    </g>
                                </svg>
                                <span>HOTLINE</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                                    <g clipPath="url(#clip0_3141_97247)">
                                        <path d="M28.5606 10.0063C27.2366 8.52594 25.3829 7.70714 23.3364 7.70154C23.3273 7.70154 23.3159 7.70154 23.3079 7.70154C19.2047 7.70154 16.7629 10.2915 14.7499 12.9973C14.185 13.6873 13.3031 14.3267 12.1798 13.6929C11.4866 13.3033 11.24 12.422 11.6285 11.7299C11.9158 11.2205 12.5649 11.0405 13.0742 11.3261C13.2497 11.4249 13.3751 11.5856 13.4302 11.7796C13.4858 11.9739 13.4603 12.1789 13.3604 12.3542C13.2952 12.4707 13.1905 12.5472 13.072 12.5853C12.9999 12.323 12.7484 12.1436 12.4729 12.1843C12.1822 12.2286 11.9858 12.491 12.0125 12.7782C11.9227 12.9936 11.9983 13.2439 12.2067 13.3597C12.9002 13.7472 13.7814 13.5029 14.1697 12.8101C14.3896 12.4184 14.4439 11.9622 14.3242 11.5272C14.2031 11.0935 13.9199 10.733 13.5269 10.5131C12.5718 9.97381 11.3541 10.3158 10.8138 11.2727C10.175 12.4123 10.582 13.8615 11.7183 14.5026C12.1645 14.7535 12.6241 14.8767 13.0766 14.8767C13.1931 14.8767 13.3042 14.8466 13.4173 14.8302C13.0158 15.3908 12.6172 15.9443 12.202 16.4667C11.2458 17.6706 10.4235 18.6768 9.62627 19.4536C9.52699 19.4626 9.42814 19.4966 9.35039 19.5694C7.69233 21.1218 5.97224 21.3365 4.50219 20.1645C3.36357 19.2582 3.17298 17.5922 4.07922 16.4532C4.77656 15.5816 6.04891 15.4362 6.92005 16.1318C7.23749 16.384 7.43842 16.7441 7.48386 17.1494C7.53038 17.5549 7.41408 17.9501 7.1619 18.2715C6.99219 18.4862 6.75249 18.6122 6.48846 18.6634C6.51409 18.5816 6.54079 18.4952 6.54079 18.4022C6.54079 17.9116 6.14216 17.5117 5.64877 17.5117C5.15689 17.5117 4.75717 17.9092 4.75717 18.4022C4.75717 18.5316 4.78603 18.6531 4.83492 18.7633C4.81726 18.9178 4.86852 19.0767 4.99903 19.179C5.42889 19.5221 5.96772 19.6754 6.5128 19.6129C7.05852 19.5494 7.54696 19.2802 7.88874 18.8521C8.29922 18.341 8.48163 17.6971 8.40711 17.0439C8.33281 16.3922 8.01085 15.8112 7.49807 15.4039C6.22443 14.3887 4.36586 14.6004 3.34936 15.8717C2.20062 17.3209 2.37033 19.3855 3.6696 20.6473C3.13249 20.3396 2.65547 19.9261 2.27945 19.4017C1.56789 18.4056 1.28405 17.1393 1.49919 15.9341C1.84205 14.0258 3.67412 12.753 5.58244 13.094C5.83355 13.1394 6.07755 12.9708 6.12299 12.7186C6.16844 12.4647 6.00088 12.2245 5.74697 12.1791C3.32782 11.7428 1.01765 13.3567 0.585202 15.7677C0.325046 17.2209 0.666823 18.7427 1.52611 19.942C2.36365 21.1118 3.59423 21.8751 4.99278 22.0909C8.50273 22.6224 10.5543 20.0398 12.9312 17.0437C12.9426 17.0301 12.9555 17.0142 12.967 16.9982C12.9687 16.9959 12.971 16.9959 12.9721 16.9937C13.5825 16.3166 14.5468 15.6654 15.6682 16.4075C16.3281 16.8481 16.512 17.7453 16.0761 18.4041C15.7535 18.888 15.0943 19.0196 14.6061 18.6972C14.4372 18.5837 14.3233 18.4145 14.2839 18.2168C14.244 18.0203 14.2839 17.8181 14.3941 17.6568C14.4771 17.533 14.6061 17.4593 14.7424 17.4376C14.8083 17.6908 15.0411 17.8726 15.3096 17.8498C15.6109 17.8261 15.8321 17.559 15.8071 17.2593C15.8071 17.2558 15.8048 17.2526 15.8026 17.2478C15.8549 17.0594 15.7901 16.8503 15.6187 16.7368C14.9577 16.2985 14.0621 16.4779 13.621 17.1389C13.3723 17.5112 13.2844 17.959 13.3736 18.3996C13.4621 18.8437 13.7177 19.224 14.0935 19.4738C14.4318 19.6965 14.8158 19.8055 15.1934 19.8055C15.8379 19.8055 16.4707 19.4943 16.8521 18.9197C17.5722 17.8351 17.2722 16.3621 16.1853 15.6359C15.584 15.2383 14.9446 15.0988 14.3097 15.1907C14.375 15.0988 14.4398 15.009 14.5061 14.9166C14.8367 14.451 15.1701 13.9847 15.5108 13.5264C15.5272 13.5066 15.5435 13.4941 15.5584 13.4754C15.567 13.4652 15.5705 13.451 15.5771 13.4396C17.488 10.8867 19.672 8.63297 23.3062 8.63297C23.3142 8.63297 23.3256 8.63297 23.3323 8.63297C25.1086 8.63922 26.7212 9.34711 27.8637 10.6289C29.147 12.065 29.7535 14.098 29.5241 16.2036C29.3561 17.7402 28.5998 19.12 27.3959 20.09C26.2829 20.9848 24.9063 21.405 23.4949 21.3369C22.6375 21.1915 21.9695 20.8121 21.5288 20.1875C21.0021 19.445 20.8293 18.4024 21.0587 17.3256C21.2041 16.6375 21.6105 16.0446 22.2012 15.6608C22.7941 15.2758 23.4981 15.1481 24.1888 15.2911C24.7168 15.4041 25.1721 15.716 25.4654 16.1672C25.7583 16.6194 25.8593 17.1587 25.7471 17.688C25.6629 18.0832 25.4314 18.4229 25.0929 18.6453C24.7522 18.868 24.3412 18.9395 23.9437 18.8587C23.6846 18.8043 23.4688 18.6522 23.3064 18.4478C23.6949 18.3477 23.9844 18.007 23.9799 17.5881C23.9743 17.0975 23.569 16.7034 23.076 16.7103C22.8137 16.7137 22.5854 16.8352 22.4254 17.0181C22.2992 17.0781 22.1982 17.185 22.1652 17.3327C22.0494 17.8687 22.1517 18.4183 22.4491 18.8773C22.7512 19.3384 23.2112 19.6562 23.7494 19.7708C24.3957 19.906 25.0498 19.7857 25.602 19.4267C26.1492 19.0679 26.5239 18.5204 26.6559 17.8821C26.8218 17.1111 26.6764 16.3242 26.2448 15.6617C25.8143 14.999 25.1523 14.5453 24.3824 14.3825C23.4477 14.185 22.4926 14.362 21.6932 14.8817C20.8935 15.402 20.3426 16.2012 20.1462 17.1348C19.9371 18.1173 20.011 19.087 20.3347 19.9116C20.2552 19.8264 20.1643 19.754 20.0928 19.6631C19.3332 18.7205 18.9878 17.5347 19.1194 16.3295C19.3317 14.3911 21.0841 12.9908 23.0194 13.1956C23.2806 13.2314 23.5043 13.0384 23.5328 12.7834C23.5599 12.5278 23.376 12.2984 23.1206 12.2706C20.6743 12.0021 18.4619 13.7805 18.1951 16.2285C18.035 17.6807 18.4528 19.1083 19.3671 20.2439C20.2813 21.3843 21.5851 22.0997 23.0364 22.2565C23.182 22.2724 23.3273 22.2724 23.4725 22.2791C23.4942 22.2847 23.5132 22.2927 23.536 22.295C23.5554 22.2974 23.5748 22.2985 23.595 22.2985C23.6041 22.2985 23.611 22.2905 23.62 22.2894C23.6721 22.2905 23.7268 22.2985 23.7789 22.2985C25.303 22.2985 26.7681 21.7864 27.972 20.8187C29.3734 19.6943 30.2501 18.0931 30.4433 16.3078C30.7103 13.9324 30.021 11.6377 28.5606 10.0063Z" fill="#474747" />
                                    </g>
                                </svg>
                            </div>
                            <div className={s.s_div}>Hotline hỗ trợ nhà tuyển dụng</div>
                        </div>
                        <div className={s.hotline}>
                            <p>Hotline tư vấn tuyển dụng</p>
                            <div className={s.info_hotline}>

                                {
                                    hotline.map((item, index) => {
                                        return (
                                            <div key={index} className={s.box_hl} style={{ display: "flex", gap: "6px" }} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M15.2 10.4899L13.23 8.51993L10.02 5.30993C9.33999 4.63993 8.17999 5.11993 8.17999 6.07993V12.3099V17.9199C8.17999 18.8799 9.33999 19.3599 10.02 18.6799L15.2 13.4999C16.03 12.6799 16.03 11.3199 15.2 10.4899Z" fill="#2767A5" />
                                                </svg>
                                                <div className={s.phone_div}>{item.phone} </div>
                                                <div className={s.name_div}>{item.name} </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={s.complain}>cSKH & Khiếu nại dịch vụ</div>
                        <div >
                            <Button className={s.phone} type="primary" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 9.75H16.5C16.4994 9.15345 16.2622 8.5815 15.8403 8.15967C15.4185 7.73784 14.8466 7.5006 14.25 7.5V6C15.2442 6.00119 16.1973 6.39666 16.9003 7.09966C17.6033 7.80267 17.9988 8.7558 18 9.75Z" fill="white" />
                                    <path d="M20.9993 9.75001H19.4993C19.4977 8.35811 18.9441 7.02367 17.9598 6.03945C16.9756 5.05523 15.6412 4.50159 14.2493 4.50001V3.00001C16.0389 3.00199 17.7546 3.71379 19.0201 4.97923C20.2855 6.24467 20.9973 7.9604 20.9993 9.75001ZM15.249 16.1115L16.929 14.4315C17.1539 14.2066 17.4398 14.0526 17.7514 13.9886C18.063 13.9246 18.3864 13.9534 18.6818 14.0715L20.7278 14.8905C21.0293 15.0112 21.2878 15.2194 21.4699 15.4884C21.652 15.7573 21.7493 16.0747 21.7493 16.3995V20.1203C21.7498 20.3414 21.7052 20.5603 21.6182 20.7636C21.5312 20.9669 21.4036 21.1504 21.2432 21.3026C21.0828 21.4549 20.8931 21.5729 20.6856 21.6493C20.478 21.7257 20.2571 21.7589 20.0363 21.747C5.69478 20.8545 2.79828 8.70751 2.26053 4.05601C2.23449 3.8286 2.25688 3.59826 2.32624 3.38013C2.3956 3.16201 2.51036 2.96104 2.66296 2.79044C2.81556 2.61984 3.00255 2.48349 3.21163 2.39034C3.42071 2.29719 3.64714 2.24937 3.87603 2.25001H7.53078C7.85558 2.25 8.17294 2.3473 8.44191 2.52938C8.71088 2.71146 8.91912 2.96995 9.03978 3.27151L9.85803 5.31751C9.97612 5.61284 10.0049 5.93633 9.94096 6.24788C9.87696 6.55944 9.72296 6.84538 9.49803 7.07026L7.81803 8.75026C7.81803 8.75026 8.74953 15.2993 15.249 16.1115Z" fill="white" />
                                </svg>
                                <span>Hotline:</span>
                                <p>1900633682 - phím 1</p>
                            </Button>
                        </div>
                    </div>
                    <div className={s.div_c}>
                        < Image
                            // style={{height:"61%"}}
                            className={s.img_last}
                            src="/images/nha-tuyen-dung/dang-tin-sau-dang-nhap/vector11.png"
                            alt="ảnh của bạn" width={653} height={845}
                            priority
                        >
                        </Image>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DangTinSau
