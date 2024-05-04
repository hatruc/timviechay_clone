/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'
import Footer from './common/Footer'
import Header from './common/Header'
const Template = ({ children }: any) => {
    return (
        <>
            <style>
                {`
                    .t-xanh{
                        color:#3582CD  !important;
                    }
                    .t-bold{
                        font-weight: 600
                    }
                `}
            </style>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
        </>
    )
}

export default Template
