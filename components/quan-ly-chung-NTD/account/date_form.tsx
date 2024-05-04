import React from 'react'
import styles from './input_form.module.scss'
import { Controller } from 'react-hook-form'
import { DatePicker } from 'antd';

const Date_form = ({ control, errors, key_date, unique, date_title, left_50, right_50, default_value }: any) => {
    let rules: any = {
        required: `Vui lòng chọn ${date_title.toLowerCase()}`,
    };
    return (
        <div className={`${styles.form_reg} ${left_50 && styles.reg_left_50} ${right_50 && styles.reg_right_50}`}>
            <label htmlFor={styles[`${key_date}`]} className={styles.form_title}>
                {date_title}
                {unique && <span className={styles.red_star}>*</span>}
            </label>
            <Controller
                name={key_date}
                control={control}
                defaultValue={default_value}
                rules={unique && rules}
                render={({ field }) => (
                    <input
                        type="date"
                        id={styles[`${key_date}`]}
                        {...field}
                        className={`${styles.form_control} `}
                    />
                    // <DatePicker placeholder='Vui lòng chọn' defaultValue={default_value}  size='large' style={{
                    //     width: '100%'
                    // }}/>
                )}
            />
            {errors[`${key_date}`] && (
                <span className={styles.text_error}>{errors[`${key_date}`].message}</span>
            )}
        </div>
    )
}

export default Date_form
