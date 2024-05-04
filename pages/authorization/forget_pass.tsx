/* eslint-disable @next/next/no-css-tags */
import Content_left from '@/components/auth/content_left';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './forget_pass.module.scss';
import { POST } from '../api/base-api';
import { cookieForgetPass, cookieId, cookiePhone, cookieType, useLoading } from '@/components/service/functions';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
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
    const { contextHolder, startMessage } = useLoading()
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
            sdt: '',
            password: '',
        },
    });

    const onSubmit = async (data: any) => {
        // console.log(data);
        const type = Cookies.get(cookieType)
        if (type === '2') {
            const result = await POST('user/ForgotPassUv', { username: data.sdt })
            // console.log(result)
            if (result?.result) {
                Cookies.set(cookieId, `${result?.id}`)
                Cookies.set(cookieForgetPass, '1')
                Cookies.set(cookiePhone, data.sdt)
                // startMessage('Thành công. Mời bạn nhập mã OTP.', 'success', 3, 'loading', () => {
                //     router.push('/ma-otp')
                // })
                // alert('Thành công. Mời bạn nhập mã OTP.')
                // alert(`${result?.message}`)
                router.push('/ma-otp')
            } else {
                // startMessage('Có lỗi xảy ra. Vui lòng xem lại.', 'error', 3)
                // alert('Có lỗi xảy ra. Vui lòng xem lại.')
                alert(`${result?.message}`)
            }
        }

        if (type === '1') {
            const result = await POST('user/EmployersForgotPass', { phoneTK: data.sdt })
            if (result?.result) {
                Cookies.set(cookieId, `${result?.id}`)
                Cookies.set(cookieForgetPass, '1')
                Cookies.set(cookiePhone, data.sdt)
                router.push('/ma-otp')

            } else {
                // startMessage('Có lỗi xảy ra. Vui lòng xem lại.', 'error', 3)
                // alert('Có lỗi xảy ra. Vui lòng xem lại.')
                alert(`${result?.message}`)
            }
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
                            <Content_left />
                        </div>
                        <form className={styles.container_right} onSubmit={handleSubmit(onSubmit)}>
                            <p className={styles.title_right}>TIMVIECHAY.VN HỖ TRỢ LẤY LẠI MẬT KHẨU BẰNG THAO TÁC ĐƠN GIẢN, NHANH CHÓNG</p>
                            <div className={styles.box_top_info}>
                                <div className={styles.form_gr}>
                                    <div className={`${styles.form_reg}`}>
                                        <Controller
                                            name="sdt"
                                            control={control}
                                            rules={{
                                                required: 'Nhập số điện thoại',
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
                                        <svg className={styles.icon_input} xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.977 19.4973C12.6067 19.4469 8.72315 18.9103 4.65598 14.8449C0.589752 10.7785 0.0539962 6.89678 0.00260931 5.52579C-0.0735194 3.43648 1.52709 1.40712 3.37606 0.614592C3.59872 0.518468 3.84254 0.48187 4.08361 0.508391C4.32468 0.534912 4.55471 0.623639 4.75114 0.765867C6.27371 1.87522 7.32429 3.55351 8.22641 4.87312C8.4249 5.16304 8.50977 5.51584 8.46484 5.8643C8.41992 6.21275 8.24834 6.53251 7.9828 6.76263L6.12621 8.14122C6.03651 8.20598 5.97338 8.30109 5.94852 8.40888C5.92367 8.51667 5.93879 8.62981 5.99108 8.7273C6.41169 9.49128 7.15966 10.6292 8.01611 11.4854C8.8735 12.3417 10.0649 13.139 10.8824 13.6071C10.9848 13.6646 11.1055 13.6807 11.2195 13.652C11.3334 13.6234 11.4321 13.5521 11.4952 13.453L12.7037 11.6139C12.9259 11.3188 13.2537 11.1211 13.6184 11.0622C13.9831 11.0034 14.3564 11.0878 14.6602 11.298C15.9992 12.2247 17.5617 13.257 18.7055 14.7212C18.8593 14.919 18.9572 15.1545 18.9888 15.403C19.0204 15.6516 18.9847 15.904 18.8854 16.1341C18.0889 17.9922 16.0734 19.5744 13.977 19.4973Z" fill="#3582CD" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.box_confirm}>
                                <span className={styles.forgot_pass}>Mời bạn nhập địa chỉ email/số điện thoại đã đăng ký tài khoản trên Timviechay.vn</span>
                                <button className={styles.btn_confirm} type="submit">
                                    LẤY LẠI MẬT KHẨU
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
