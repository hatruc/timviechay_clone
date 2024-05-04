import React from 'react'

import Footer from './common/Footer'
import Header from './common/Header'
import { useRouter } from 'next/router'

export default function Layout({ children }: any) {
    const router = useRouter();
    const asName = router.asPath;
    const pathName = router.pathname;


    const array_path_not_header: any = [
        "/dang-ky-nha-tuyen-dung", "/nha-tuyen-dung/quan-ly-chung", "/dang-nhap"
    ];

    const array_path_not_footer: any = [
        "/dang-ky-nha-tuyen-dung", "/dang-nhap"
    ];

    return (
        <>
            {/* {!array_path_not_header.includes(asName) && <Header />} */}
            {children}
            {/* {!array_path_not_footer.includes(asName) && <Footer />} */}
        </>
    )
}
