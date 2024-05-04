import React, { useState } from 'react'
import { Controller } from 'react-hook-form';
import s from './input_form.module.scss'

const Pass_input = ({ control, errors, default_value }: any) => {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    };
    // {onClick={togglePasswordVisibility} sau svg
    return (
        <div className={`${s.form_reg} `}>
            <label htmlFor="txtpassword" className={s.form_title}>
                Mật khẩu
            </label>
            <Controller
                name="password"
                control={control}
                // rules={{
                //     required: 'Vui lòng nhập mật khẩu',
                //     validate: {
                //         minLength: (value) => {
                //             const trimmedValue = value.replace(/\s/g, '');
                //             return trimmedValue.length >= 6 || 'Mật khẩu phải có ít nhất 6 ký tự';
                //         },
                //         noSpace: (value) => !/\s/.test(value) || 'Mật khẩu không được chứa khoảng trắng',
                //     },
                // }}
                render={({ field }) => (
                    <>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            {...field}
                            className={s.form_control}
                            maxLength={20}
                            disabled
                            defaultValue={default_value}
                        />
                        {errors.password && (
                            <span className={s.text_error}>{errors.password.message}</span>
                        )}
                    </>
                )}
            />
            {isPasswordVisible ? <svg  xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12" fill="none" className={s.icon_input_show}>
                <path d="M11 0C1.7875 0 0 6.65217 0 6.65217C0 6.65217 3.025 12 10.8625 12C18.7 12 22 6.78261 22 6.78261C22 6.78261 20.2125 0 11 0ZM7.2875 1.95652C7.975 1.56522 9.075 1.56522 9.075 1.56522C9.075 1.56522 8.3875 2.73913 8.3875 3.65217C8.3875 4.56522 8.6625 5.08696 8.6625 5.08696L7.15 5.34783C7.15 5.34783 6.7375 4.69565 6.7375 3.78261C6.7375 2.73913 7.2875 1.95652 7.2875 1.95652ZM10.8625 10.6957C5.225 10.6957 2.3375 7.69565 1.5125 6.52174C1.925 5.60869 3.025 3.65217 5.775 2.34783C5.6375 2.86956 5.5 3.3913 5.5 4.04348C5.5 6.91304 7.975 9.26087 11 9.26087C14.025 9.26087 16.5 6.91304 16.5 4.04348C16.5 3.3913 16.3625 2.86956 16.225 2.34783C18.975 3.52174 20.075 5.60869 20.4875 6.52174C19.525 7.69565 16.6375 10.6957 10.8625 10.6957Z" fill="#777777" />
            </svg> : <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={s.icon_input}>
                <path d="M16.125 6.5L15.125 7.5C17.25 8.625 18.25 10.375 18.625 11.25C17.75 12.375 15.125 15.125 9.875 15.125C9 15.125 8.375 15 7.625 14.875L6.625 15.875C7.625 16.25 8.75 16.375 9.875 16.375C17 16.375 20 11.375 20 11.375C20 11.375 19.25 8.375 16.125 6.5Z" fill="#777777" />
                <path d="M15 8.875C15 8.5 15 8.125 14.875 7.875L8.875 13.75C9.25 13.75 9.625 13.875 10 13.875C12.75 13.875 15 11.625 15 8.875ZM19.125 0L13.625 5.5C12.625 5.25 11.375 5 10 5C1.625 5 0 11.375 0 11.375C0 11.375 1.25 13.625 4.125 15.125L0 19.125V20H0.875L20 0.875V0H19.125ZM5 14.125C3 13.25 1.875 11.875 1.375 11.25C1.75 10.375 2.75 8.5 5.25 7.25C5.125 7.75 5 8.25 5 8.875C5 10.25 5.625 11.625 6.625 12.5L5 14.125ZM7.75 9.875L6.5 10.125C6.5 10.125 6.125 9.5 6.125 8.625C6.125 7.625 6.625 6.75 6.625 6.75C7.25 6.375 8.25 6.375 8.25 6.375C8.25 6.375 7.625 7.5 7.625 8.5C7.5 9.375 7.75 9.875 7.75 9.875Z" fill="#777777" />
            </svg>}

        </div>
    )
}

export default Pass_input
