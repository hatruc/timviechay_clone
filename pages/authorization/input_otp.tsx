/* eslint-disable @next/next/no-css-tags */
import Content_left from '@/components/auth/content_left';
import Link from 'next/link';
import { useContext, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './input_otp.module.scss';
import Cookies from 'js-cookie';
import { cookieAuth, cookieForgetPass, cookieId, cookieOTP, cookiePhone, cookieToken, cookieType, setMultipleCookie } from '@/components/service/functions';
import { GetFbConfig, POST } from '../api/base-api';
import { useRouter } from 'next/router';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
import firebase, { initializeApp, getApps, deleteApp, getApp } from "firebase/app";
import { Auth, ConfirmationResult, RecaptchaVerifier, getAuth, signInWithPhoneNumber } from "firebase/auth";
import parsePhoneNumberFromString from 'libphonenumber-js';
import { Statistic } from 'antd';

const { Countdown } = Statistic
const options: any = [];

for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}

// TODO Tam thoi
const firebaseConfig = {
    apiKey: "AIzaSyDZpBM6r-RHptBOd_LVRBhdoAkfpW6w4iQ",
    authDomain: "timviechay13.firebaseapp.com",
    projectId: "timviechay13",
    storageBucket: "timviechay13.appspot.com",
    messagingSenderId: "340228496359",
    appId: "1:340228496359:web:5deef67e2991a941783b42",
    measurementId: "G-SH3571BYFV"
}

const Register = () => {
    const { formDangTin, setFormDangTin, setAll, } = useContext(NTD_UV_Context)

    const router = useRouter()
    // const [isForgetPassword, setIsForgetPassword] = useState(false)
    const [isSent, setIsSent] = useState(false) // Check da gui chua
    const [isLoading, setIsLoading] = useState(false)
    const [timeSent, setTimeSent] = useState(Date.now())
    const [isWaiting, setIsWaiting] = useState(false)
    const [fbKey, setFbKey] = useState('')

    const [otpConfirm, setOtpConfirm] = useState<any | ConfirmationResult>('')
    const [mainAuth, setMainAuth] = useState<Auth>()
    const captchaContainerRef = useRef<HTMLDivElement>(null)

    const handleWait = () => {
        setTimeSent(Date.now() + 3 * 60 * 1000)
        setIsWaiting(true)
    }

    const handleSend = async () => {
        setIsLoading(true)

        const result = await GetFbConfig()
        if (result?.result) {

            if (getApps().length > 0) {
                await deleteApp(getApps()[0])
            }
            const app = initializeApp(result?.firebase);
            setFbKey(result?.firebase?.projectId)
            // const app = initializeApp(firebaseConfig);
            // setFbKey('timviechay13')
            const auth = getAuth(app);
            setMainAuth(auth)


            const phoneNumber = Cookies.get(cookiePhone)
            if (!phoneNumber) {
                alert('Thiếu số điện thoại')
                router.back()
                return
            }
            const parsedNumber = parsePhoneNumberFromString(phoneNumber, 'VN')
            if (!parsedNumber) {
                alert('Số điện thoại không hợp lệ')
                router.back()
                return
            }
            const formattedNumber = parsedNumber.format('E.164')

            if (captchaContainerRef && captchaContainerRef?.current) {
                captchaContainerRef.current.innerHTML = "<div id='captcha'></div>"
            }

            const appVerifier = new RecaptchaVerifier(auth, 'captcha', {
                'size': 'invisible',
                // 'size': 'normal',
                'callback': (response: any) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                },
                'expired-callback': () => {
                    // Response expired. Ask user to solve reCAPTCHA again.
                }
            });
            await signInWithPhoneNumber(auth, formattedNumber, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    alert('Đã gửi OTP.\nVui lòng kiểm tra tin nhắn.')
                    setOtpConfirm(confirmationResult)
                    setIsSent(true)
                    handleWait()
                    // ...
                }).catch((error: any) => {
                    // Error; SMS not sent
                    // ...
                    console.log(error)
                    alert('Đã có lỗi khi gửi OTP qua tin nhắn.\nVui lòng thử lại.')
                });
            appVerifier.clear()
        } else {
            alert(`${result?.message}`)
        }

        setIsLoading(false)
    }

    const handleVerify = async () => {
        setIsLoading(true)

        const otp = getValues('otp')
        if (otp && otpConfirm && mainAuth) {
            await otpConfirm.confirm(otp).then(async (result: any) => {
                // alert('Xác thực thành công.')
                const token = await mainAuth.currentUser?.getIdToken()
                if (token) {
                    handleVerifySuccess(token)
                } else {
                    alert('Lỗi token')
                }
                // console.log(token)
            }).catch((error: any) => {
                // User couldn't sign in (bad verification code?)
                console.log(error)
                alert('Đã có lỗi khi xác thực OTP.\nVui lòng kiểm tra lại.')
            });
        }

        setIsLoading(false)
    }

    const handleVerifySuccess = async (token: string) => {
        const isForgetPass = Cookies.get(cookieForgetPass)
        const id = Cookies.get(cookieId)
        const type = Cookies.get(cookieType)
        if (id && type) {
            const formData = {
                id: id,
                otp: getValues('otp'),
                type: type === '1' ? '2' : '1',
                // key
                key: fbKey,
            }
            const result = await POST('user/ConfirmOtpFb', formData, token)
            if (result?.result) {
                alert(`${result?.message}`)
                Cookies.set(cookieToken, result?.token)

                if (isForgetPass === '1') { // Quên mật khẩu 
                    Cookies.set(cookieOTP, '1')
                    router.push('/cap-nhat-mat-khau')
                } else { // Xác thực 
                    //set cookie
                    setMultipleCookie(
                        result?.token,
                        type === '1' ? result?.data.usc_id : result?.data.use_id,
                        '1',
                        type,
                        type === '1' ? result?.data.usc_company : result?.data.use_name,
                        type === '1' ? result?.data.usc_phone_tk : result?.data.use_phone_tk,
                        type === '1' ? result?.data.usc_logo : result?.data.use_logo,
                    )
                    if (type === '1') {
                        setAll(result?.data.usc_company, result?.data.usc_phone_tk, result?.data.usc_logo)
                    }
                    if (type === '2') {
                        setAll(result?.data.use_name, result?.data.use_phone_tk, result?.data.use_logo)
                    }
                    //nếu người dăng tin trước đăng nhập và đăng ký
                    if (Object.keys(formDangTin).length > 0) {
                        const result = await POST(`new/postNew`, formDangTin)
                        //nếu oke thì chuyẻn về trang tin đã đăng và xóa formdata
                        // console.log(result)
                        if (result?.result) {
                            alert(result?.message)
                            router.push('/nha-tuyen-dung/tin-da-dang')
                            setFormDangTin({})
                            // nếu không thành công thì chuyển về trang đăng tin miễn phí và xóa formdata
                        } else {
                            alert(result?.message)
                            setFormDangTin({})
                            router.push('/nha-tuyen-dung/dang-tin-moi')
                        }
                        // đăng nhập từ trang thường
                    } else {
                        router.push('/')
                    }
                }
            } else {
                alert(`${result?.message}`)
            }
        }
    }

    const { handleSubmit, control, register, formState: { errors }, getValues } = useForm({
        defaultValues: {
            // sdt: '',
            // password: '',
            otp: '',
        },
    });

    const onSubmit = async (data: any) => {

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
                        <form
                            className={styles.container_right}
                            onSubmit={handleSubmit(onSubmit)}
                            // onSubmit={(e) => {e.preventDefault()}}
                            id='form-otp'
                        >
                            <p className={styles.title_right}>TIMVIECHAY.VN HỖ TRỢ ỨNG VIÊN {Cookies.get(cookieForgetPass) === '1' ? 'LẤY LẠI MẬT KHẨU' : (Cookies.get(cookieAuth) === '0' ? 'XÁC THỰC TÀI KHOẢN' : 'XÁC THỰC OTP')} BẰNG THAO TÁC ĐƠN GIẢN, NHANH CHÓNG</p>
                            {isSent ? <div className={styles.box_confirm}>
                                <Controller
                                    name='otp'
                                    control={control}
                                    rules={{
                                        required: 'Vui lòng nhập mã OTP',
                                        validate: {
                                            minLength: (value) => {
                                                const trimmedValue = value.replace(/\s/g, '');
                                                return trimmedValue.length >= 6 || 'Mã OTP phải có 6 ký tự';
                                            }
                                        }
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <input
                                                {...field}
                                                type="text"
                                                style={{
                                                    background:
                                                        'repeating-linear-gradient(90deg, #4C5BD4 0, #4C5BD4 1ch, transparent 0, transparent 1.8ch) 0 100%/10ch 2px no-repeat',
                                                    font: '6ch "Droid Sans Mono", Consolas, monospace',
                                                    padding: 0,
                                                    border: "none",
                                                    width: "280px",
                                                    margin: "0 auto 24px auto",
                                                    letterSpacing: "0.8ch",
                                                    outline: 0,
                                                }}
                                                maxLength={6} />
                                            {errors.otp && typeof errors.otp?.message === 'string' && (
                                                <span className={styles.text_error}>{errors.otp?.message}</span>
                                            )}
                                        </>
                                    )}
                                />
                                <button
                                    className={styles.btn_confirm}
                                    type="submit"
                                    onClick={handleVerify}
                                    disabled={isLoading}
                                    style={{
                                        cursor: isLoading ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    Xác nhận
                                </button>
                                <button
                                    className={styles.refesh_otp}
                                    id='send-otp-btn'
                                    type='button'
                                    disabled={isWaiting || isLoading}
                                    onClick={handleSend}
                                    style={{
                                        cursor: isWaiting || isLoading ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    Gửi lại
                                </button>
                                {
                                    isWaiting &&
                                    <div>
                                        <Countdown
                                            title={'Chưa nhập được OTP? Hãy gửi lại sau:'}
                                            value={timeSent}
                                            onFinish={() => setIsWaiting(false)}
                                            style={{
                                                textAlign: 'center'
                                            }}
                                        />
                                    </div>
                                }
                            </div> :
                                <div className={styles.box_confirm}>
                                    <button className={styles.btn_confirm} id='send-otp-btn' onClick={handleSend} type='button' disabled={isLoading} style={{
                                        cursor: isLoading ? 'not-allowed' : 'pointer'
                                    }}>
                                        Gửi mã OTP
                                    </button>
                                </div>}
                            <div ref={captchaContainerRef}>
                                <div id='captcha'></div>
                            </div>
                            <div className={styles.btn_content}>
                                <p>Bạn chưa có tài khoản?</p>
                                <Link href={'/dang-ky'}>ĐĂNG KÝ NGAY</Link>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default Register
