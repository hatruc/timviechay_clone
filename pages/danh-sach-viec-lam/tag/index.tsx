import { useState, useEffect, useRef } from 'react';
import { getCookie } from 'cookies-next';
import Image from 'next/image';

import Item from '@/components/danh-sach-viec-lam/tag/item'
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

import * as data from '@/components/danh-sach-viec-lam/tag/data';
import s from './styles.module.scss';

export default function ViecLamTheoTag() {
    const [tag, setTag] = useState(data.tag);
    const [show, setShow] = useState(false);
    return (
        <>
            <Header />
            <div className={s.backgroup}>
                <div className={s.body}>
                    <div className={s.title}>VIỆC LÀM <span>THEO TAG</span></div>
                    {show == false ? tag?.slice(0, 5)?.map((item: any, index: any) => {
                        return (
                            <Item key={index} title={item.title} listTag={item.listTag} />
                        )
                    }) : tag?.map((item: any, index: any) => {
                        return (
                            <Item key={index} title={item.title} listTag={item.listTag} />
                        )
                    })}
                    {
                        tag.length > 5 ?
                            <div className={show == false ? s.show : s.displayNone} onClick={() => { setShow(true) }}>
                                Xem thêm
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M10.9492 7.79331C10.9003 7.73425 10.8401 7.68542 10.7723 7.64963C10.7044 7.61384 10.6301 7.59179 10.5537 7.58475C10.4773 7.57771 10.4003 7.5858 10.327 7.60858C10.2537 7.63136 10.1857 7.66836 10.1267 7.71748L7.58341 9.83498V2.91665C7.58341 2.76194 7.52195 2.61356 7.41256 2.50417C7.30316 2.39477 7.15479 2.33331 7.00008 2.33331C6.84537 2.33331 6.697 2.39477 6.5876 2.50417C6.4782 2.61356 6.41674 2.76194 6.41674 2.91665V9.83498L3.87341 7.71748C3.81443 7.66845 3.74636 7.63152 3.6731 7.6088C3.59985 7.58608 3.52283 7.57801 3.44646 7.58505C3.37008 7.59209 3.29584 7.61411 3.22797 7.64984C3.1601 7.68558 3.09994 7.73433 3.05091 7.79331C3.00188 7.8523 2.96496 7.92036 2.94223 7.99362C2.91951 8.06688 2.91144 8.14389 2.91848 8.22027C2.92552 8.29664 2.94754 8.37089 2.98327 8.43875C3.01901 8.50662 3.06776 8.56679 3.12674 8.61581L6.62674 11.5325L6.71424 11.585L6.79008 11.6258C6.92522 11.678 7.07493 11.678 7.21008 11.6258L7.28591 11.585L7.37341 11.5325L10.8734 8.61581C10.9325 8.56684 10.9813 8.5067 11.0171 8.43883C11.0529 8.37096 11.0749 8.2967 11.082 8.2203C11.089 8.14389 11.0809 8.06685 11.0581 7.99358C11.0354 7.92031 10.9984 7.85226 10.9492 7.79331Z" fill="#3582CD" />
                                </svg>
                            </div>
                            :
                            <></>
                    }
                </div>
            </div >
            <Footer />
        </>
    )
}