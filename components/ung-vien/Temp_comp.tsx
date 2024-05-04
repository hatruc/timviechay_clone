import React from 'react'
import s from './temp_comp.module.scss'
const Temp_comp = ({ title, children }: any) => {
    return (
        <div className={s.temp_comp}>
            <h2 className={s.h2_title}>
                <p>{title}</p> </h2>
            {children}
        </div>
    )
}

export default Temp_comp
