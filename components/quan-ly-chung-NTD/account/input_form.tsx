import { Controller } from 'react-hook-form'
import s from './input_form.module.scss'
const Input_form = ({ control, errors, input_title, key_input, default_value, uniqe = true, left_50, right_50, disable = false, type = 'text' }: any) => {
    let placeholderNew: any;
    let rules: any = {
        required: `Vui lòng nhập ${input_title.toLowerCase()}`,
    };
    if (key_input === 'sdt' || key_input === 'phone' || key_input === 'phoneContact') {
        rules.pattern = {
            value: /^[0-9]{10}$/,
            message: 'Số điện thoại không hợp lệ',
        };
        placeholderNew = "Nhập số điện thoại"
    } else if (key_input === 'nameCompany') {
        placeholderNew = "Vui lòng nhập tên công ty"
    } else if (key_input === 'usc_boss') {
        placeholderNew = 'Nhập tên Tổng giám đốc'
    } else if (key_input === 'phone') {
        placeholderNew = 'Nhập số điện thoại'
    } else if (key_input == 'mst') {
        placeholderNew = 'Nhập mã số thuế'
    } else if (key_input == 'skype') {
        placeholderNew = 'Nhập link tài khoản Skype'
    } else if (key_input == 'website') {
        placeholderNew = 'Nhập link Website'
    } else if (key_input == 'address') {
        placeholderNew = 'Nhập địa chỉ công ty'
    } else if (key_input == 'nameContact') {
        placeholderNew = 'Nhập tên người liên hệ'
    } else if (key_input == 'addressContact') {
        placeholderNew = 'Nhập địa chỉ liên hệ'
    } else if (key_input == 'phoneContact') {
        placeholderNew = 'Nhập số điện thoại liên hệ'
    } else if (key_input == 'emailContact') {
        placeholderNew = 'Nhập email liên hệ'
    } else if (key_input == 'inforCompany') {
        placeholderNew = `Giới thiệu về công ty`
    }
    return (
        <div className={`${s.form_reg} ${left_50 && s.reg_left_50} ${right_50 && s.reg_right_50}`}>
            <label htmlFor={key_input} className={s.form_title} >
                {input_title + ' '}
                {uniqe && <span className={s.red_star}>*</span>}
            </label>
            <Controller
                name={key_input}
                control={control}
                rules={uniqe && rules}
                defaultValue={default_value ? default_value : undefined }
                render={({ field }) => (
                    <>
                        <input
                            id={key_input}
                            type={type}
                            {...field}
                            disabled={disable}
                            className={`${s.form_control}`}
                            placeholder={placeholderNew}
                        />
                        {errors[`${key_input}`] && typeof errors[`${key_input}`].message === 'string' && (
                            <span className={s.text_error}>{errors[`${key_input}`].message}</span>
                        )}
                    </>
                )}
            />
        </div>
    )
}

export default Input_form
