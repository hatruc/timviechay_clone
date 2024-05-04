import React from 'react'
import s from './temp_comp.module.scss'
import Sidebar from './common/Sidebar'
import Header_manage from './common/Header_manage'
import Header_mobile from './common/Header_mobile'
import Footer from '../common/Footer';

const Temp_comp = ({ children }: any) => {
    return (
        <>
            <div className={s.container}>
                <Sidebar />
                <div className={s.content}>
                    <Header_manage />
                    <Header_mobile />
                    {children}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Temp_comp
