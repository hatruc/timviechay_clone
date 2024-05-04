import React, { useMemo, useState } from 'react'
import styles from './input_form.module.scss'
import { Select } from 'antd';
import { Controller } from 'react-hook-form';

const Select_form = ({ control, errors, option_arr, select_title, unique = true, key_select, left_50, right_50, multiple, alsoOnChange }: any) => {
    let placeholderNew: any;
    if (key_select === 'level') {
        placeholderNew = 'Cấp bậc mong muốn'
    } else if (key_select == 'job') {
        placeholderNew = 'Chọn ngành nghề'
    } else if (key_select == 'province') {
        placeholderNew = 'Chọn tỉnh thành'
    } else if (key_select == 'district') {
        placeholderNew = 'Chọn quận/huyện'
    } else if (key_select == 'formality') {
        placeholderNew = 'Chọn hình thức làm việc'
    } else if (key_select == 'salary') {
        placeholderNew = 'Chọn mức lương'
    } else if (key_select == 'experience') {
        placeholderNew = 'Chọn kinh nghiệm'
    } else if (key_select == 'degree') {
        placeholderNew = 'Chọn bằng cấp'
    } else if (key_select == 'gender') {
        placeholderNew = 'Chọn giới tính'
    }

    return (

        <>
            <style>
                {
                    `
            .select-antd .ant-select-selector{
                height:42px;
            }
            .select-antd .ant-select-selection-placeholder{
                 display: flex;
               height: 20px;
               flex-direction: column;
               justify-content: center;
               flex: 1 0 0;
               color: #757587;
               font-family: Roboto;
               font-size: 14px;
               font-style: normal;
               font-weight: 400;
               line-height: normal;
            }
            `
                }
            </style>
            <div className={`${styles.form_reg} ${left_50 && styles.reg_left_50} ${right_50 && styles.reg_right_50}`}>
                <label htmlFor={key_select} className={styles.form_title}>
                    {select_title}{unique && <span className={styles.red_star}>*</span>}
                </label>
                <Controller
                    name={key_select}
                    control={control}
                    rules={{
                        validate: (value) => {
                            if (value?.length < 1 || value == undefined) {
                                return 'Vui lòng chọn ít nhất một lựa chọn.';
                            }
                            if (value?.length > 3) {
                                return 'Bạn chỉ có thể chọn tối đa ba lựa chọn.';
                            }
                            return true;
                        },
                    }}
                    render={({ field }) => (
                        <>
                            <Select
                                {...field}
                                className="select-antd"
                                mode={multiple ? "multiple" : undefined}
                                id={key_select}
                                placeholder={placeholderNew}
                                onChange={(location) => {
                                    if (location.length > 3) {
                                        return 0
                                    } else {
                                        field.onChange(location);
                                        alsoOnChange && alsoOnChange()
                                    }
                                }}
                                style={{ width: '100%' }}
                                filterOption={(inputValue, option: any) => {
                                    return option?.label?.toLowerCase()?.includes(inputValue?.toLowerCase())
                                }
                                    // option?.label?.toLowerCase()?.includes(inputValue.toLowerCase())
                                }
                                options={option_arr}
                            />
                            {errors[`${key_select}`] && (
                                <span className={styles.text_error}>{errors[`${key_select}`].message}</span>
                            )}
                        </>
                    )}
                />
            </div>
        </>
    )
}

export default Select_form
