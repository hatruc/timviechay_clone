import React from 'react'
import styles from './input_form.module.scss'
import { Select } from 'antd';
import { Controller } from 'react-hook-form';
import { useForm } from "@/functions/functions";

const Select_form = ({ control, errors, option_arr, select_title, unique = true, key_select, left_50, right_50, multiple, defaultValue }: any) => {
    const { handleChange, error_message, formFields } = useForm();
    let placeholderNew: any;
    if (key_select === 'city') {
        placeholderNew = 'Chọn Tỉnh/Thành phố'
    } else if (key_select == 'district') {
        placeholderNew = 'Chọn Quận/Huyện'
    } else if (key_select == 'quyMo') {
        placeholderNew = 'Chọn quy mô'
    } else if (key_select == 'financial_sector') {
        placeholderNew = 'Chọn tối đa 3 lĩnh vực hoạt động'
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
                    defaultValue={defaultValue}
                    rules={{
                        validate: (value) => {
                            if(key_select === 'financial_sector'){
                                if (value?.length < 1 || value == undefined) {
                                    return 'Vui lòng chọn ít nhất một lựa chọn.';
                                }
                                if (value?.length > 3) {
                                    return 'Bạn chỉ có thể chọn tối đa ba lựa chọn.';
                                }
                                return true;
                            } 
                            if(key_select === 'district'|| key_select === 'city'|| key_select ==='quyMo') {
                                if (!value) {
                                    return 'Vui lòng chọn một lựa chọn.';
                                }
                                return true;
                            }
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
                                    if(key_select === 'financial_sector'){
                                      if(location.length <= 3) {
                                        field.onChange(location);
                                      }
                                    }else {
                                        field.onChange(location);
                                    }
                                }}
                                style={{ width: '100%' }}
                                options={option_arr}
                                maxTagCount= 'responsive'
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
