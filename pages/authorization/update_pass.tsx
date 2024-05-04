/* eslint-disable @next/next/no-css-tags */
import Content_left from '@/components/auth/content_left';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './update_pass.module.scss';
import { POST } from '../api/base-api';
import Cookies from 'js-cookie';
import { cookieAuth, cookieForgetPass, cookieOTP, cookieType } from '@/components/service/functions';
import { useRouter } from 'next/router';
const options: any = [];

for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}

const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
};
const Register = () => {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    };
    const [isRePasswordVisible, setRePasswordVisibility] = useState(false);
    const toggleRePasswordVisibility = () => {
        setRePasswordVisibility(!isRePasswordVisible);
    };
    // xử lý upload ảnh
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [uploadedImages, setUploadedImages] = useState<any[]>([]);

    const router = useRouter()

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFiles = Array.from(event.target.files);
            const newImages: any[] = selectedFiles.map((file, index) => ({
                id: Date.now() + index,
                file,
                imageUrl: URL.createObjectURL(file),
            }));
            setSelectedImages([...selectedImages, ...selectedFiles]);
            setUploadedImages([...uploadedImages, ...newImages]);
        }
    };

    const handleRemoveImage = (id: number) => {
        const newUploadedImages = uploadedImages.filter(image => image.id !== id);
        const newSelectedImages = newUploadedImages.map(image => image.file);
        setUploadedImages(newUploadedImages);
        setSelectedImages(newSelectedImages);
    };

    const handleUpload = async () => {
        if (selectedImages.length === 0) {
            console.error('No images selected');
            return;
        }
        const formData = new FormData();
        selectedImages.forEach(image => {
            formData.append('images', image);
        });

        try {

        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };
    const { handleSubmit, control, register, formState: { errors }, getValues } = useForm({
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: any) => {
        // console.log(data);

        const type = Cookies.get(cookieType)
        const isOtp = Cookies.get(cookieOTP)
        if (isOtp === '1') {
            // if (type === '2') {
                const formData = {
                    password: data.password,
                    rePassword: data.confirmPassword,
                    type: '1'
                }
    
                const result = await POST(`${type === '1' ? 'user/UpdatePasswordEmployers' :'user/changePassUv'}`, formData)
                if (result?.result) {
                    alert(`${result?.message}`)
                    Cookies.remove(cookieForgetPass)
                    Cookies.remove(cookieOTP)
                    Cookies.set(`${process.env.NEXT_PUBLIC_TOKEN}`, `${result?.token}`)

                    router.push(type === '1' ? '/dang-nhap-nha-tuyen-dung' : '/dang-nhap-ung-vien')
                } else {
                    alert(`${result?.message}`)
                }
            // }
        } else {
            alert('Hãy nhập mã OTP')
            router.push('/ma-otp')
        }
    };
    return (
        <>
            <link rel="stylesheet" href="styles/register_select.css" />
            <div className={styles.wrapper_layout}>
                <div className={styles.wrapper_body}>
                    <div className={styles.wrapper_content}>
                        <div className={styles.container_left}>
                            <Content_left />
                        </div>
                        <form className={styles.container_right} onSubmit={handleSubmit(onSubmit)}>
                            <p className={styles.title_right}>TIMVIECHAY.VN HỖ TRỢ ỨNG VIÊN LẤY LẠI MẬT KHẨU BẰNG THAO TÁC ĐƠN GIẢN, NHANH CHÓNG</p>
                            <div className={styles.box_top_info}>
                                <div className={styles.form_gr}>
                                    <div className={`${styles.form_reg} `}>
                                        <label htmlFor="txtpassword" className={styles.form_title}>
                                            Mật khẩu <span className={styles.red_star}>*</span>
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
                                    <div className={`${styles.form_reg}`}>
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
                                </div>
                            </div>
                            <div className={styles.box_confirm}>
                                <button className={styles.btn_confirm} type="submit">
                                    Cập nhật
                                </button>
                                <div className={styles.btn_content}>
                                    <p>Bạn chưa có tài khoản?</p>
                                    <Link href={'/dang-ky'}>ĐĂNG KÝ NGAY</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default Register
