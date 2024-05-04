import React,{useState,useEffect} from 'react'
import { Controller } from 'react-hook-form'
import styles from './input_form.module.scss'

const Textarea = ({ control, errors, input_title, key_input , defaut, text, setText }: any) => {

    const handleChange = (e: any) => {
        setText(e.target.value);
    };
    useEffect(()=>{
        if(defaut){
            setText(defaut)
        }
    },[])
    
    return (
        <div className={`${styles.form_reg}`}>
            <label htmlFor={key_input} className={styles.form_title}>
                {input_title} <span className={styles.red_star}>*</span>
            </label>
            <Controller
                name={key_input}
                control={control}
                render={({ field }) => (
                    <>
                        <textarea
                            {...field}
                            id={key_input}
                            placeholder={
                                `Giới thiệu về công ty`}
                            className={`${styles.form_control}`}
                            style={{ height: '190px' }}
                            value={text}
                            onChange={handleChange}
                        />
                        {errors[`${key_input}`] && typeof errors[`${key_input}`].message === 'string' && (
                         <span className={styles.text_error}>{errors[`${key_input}`].message}</span>
                        )}   
                    </>

                )}
            />
        </div>
    )
}

export default Textarea
