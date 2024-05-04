import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import styles from './index_styles.module.scss' // Import SCSS module
import axios from 'axios';
import { setMultipleCookie, setMultipleCookieAdmin } from '@/components/service/functions';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';

type LoginFormInputs = {
    username: string;
    password: string;
};


interface AdminLoginProps {
    isNTDLogin: boolean
}

const LoginPage: React.FC<AdminLoginProps> = ({isNTDLogin}) => {
    const { setAll, changeToken, permission,changePermission, checkFullRight } = useContext(NTD_UV_Context)
    const router = useRouter()
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    const getPermission = async (token: string) => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/getAdminUserRight`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": 'application/json'
            }
        });
        
        if(res.data.data.result) {
            changePermission(res.data.data.data)
        }
    }

    const loginWithAdmin = async (data: any) => {
        const res: any = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/login`,{
            "username": data?.username,
            "password": data?.password
        })
        if(res?.data.data.result) {
            console.log('permisstion', res.data.data.data);
            const newData = res.data.data.data
            changeToken(newData.Token)
            getPermission(newData.Token)
            Cookies.set('work247_token_admin', newData.Token)
            Cookies.set('id_admin', newData.data?.adm_id, { expires: 60 })
            Cookies.set('auth_admin', 'admin', { expires: 1 })
            Cookies.set('work247_type_admin', newData.data?.type, { expires: 1 })
            Cookies.set('phone_admin', newData.data.adm_phone, { expires: 1 })
            Cookies.set('userName_admin', newData.data.adm_name, { expires: 1 })
            Cookies.set('percentHoSo_admin', newData.data.adm_picture, { expires: 1 })
            newData.RefreshToken && Cookies.set('rf_token_admin',newData.RefreshToken, { expires: 60 })
            Cookies.set('isLogin_admin', 'true', { expires: 1 })
            Cookies.set('email_admin',newData.data.adm_email)
            checkFullRight();
            router.push('/admin')
            console.log('push');
        } 
    };


    const loginWithNTD = async (data: any) => {
        const res: any = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/user/login`,{
            "userName": data?.username,
            "password": data?.password
        })
        if(res?.data.data.result) {
            const result = res.data.data
            Cookies.set('login-ntd', result?.token, { expires: 60 })
            setMultipleCookie(
                result?.token,
                result?.user?.usc_id,
                result?.user?.auth,
                result?.user?.type,
                result?.user?.usc_company,
                result?.user?.phone,
                result?.user?.logo,
                result?.reFreshToken,
            )
            setAll(result?.user?.usc_company, result?.user?.phone, result?.user?.logo)
            window.open('/nha-tuyen-dung/quan-ly-chung', '_blank');
        } 
    }

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data: any) => {
        const token  = Cookies.get('work247_token_admin');
        if(token) {
            router.push('/admin')
            return
        }
        try {
            if(isNTDLogin) {
                await loginWithNTD(data)
            } else {
                await loginWithAdmin(data)
            }
        } catch (error) {
            alert(error)
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles['login-form']} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Vui lòng nhập tên đăng nhập'
                    }}
                    render={({ field }) => (
                        <>
                            <input
                                type="text"
                                className={styles['login-input']}
                                placeholder="Tên đăng nhập"
                                {...field}
                            />
                            {errors.username && typeof errors.username?.message === 'string' && (
                                <span className={styles.text_error}>{errors.username?.message}</span>
                            )}
                        </>
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Vui lòng nhập mật khẩu'
                    }}
                    render={({ field }) => (
                        <input
                            type="password"
                            className={styles['login-input']}
                            placeholder="Mật khẩu"
                            {...field}
                        />
                    )}
                />
                <button type="submit" className={styles['login-button']}>Log In</button>
            </form>
        </div>
    );
};

export default LoginPage;