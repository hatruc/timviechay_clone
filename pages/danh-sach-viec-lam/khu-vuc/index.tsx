import { useState, useEffect, useRef } from 'react';
import { getCookie } from 'cookies-next';
import Image from 'next/image';

// import Item from '@/components/danh-sach-viec-lam/tag/item'
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

import * as data from '@/components/danh-sach-viec-lam/khu-vuc/data';
import s from './styles.module.scss';

export default function ViecLamTheoKhuVuc() {
    const [listKhuVucMienBac, setListKhuVucMienBac] = useState(data.listKhuVucBac);
    const [listKhuVucMienTrung, setListKhuVucMienTrung] = useState(data.listKhuVucTrung);
    const [listKhuVucMienNam, setListKhuVucMienNam] = useState(data.listKhuVucNam);

    return (
        <>
            <Header />
            <div className={s.backgroup}>
                <div className={s.body}>
                    <div className={s.title}>VIỆC LÀM THEO <span>KHU VỰC</span></div>
                    <div className={s.box_1}>
                        {listKhuVucMienBac?.map((item: any, index: any) => {
                            return (
                                <div key={index} className={s.item}>{item}</div>
                            )
                        })}
                    </div>
                    <div className={s.box_1}>
                        {listKhuVucMienTrung?.map((item: any, index: any) => {
                            return (
                                <div key={index} className={s.item}>{item}</div>
                            )
                        })}
                    </div>
                    <div className={s.box_1}>
                        {listKhuVucMienNam?.map((item: any, index: any) => {
                            return (
                                <div key={index} className={s.item}>{item}</div>
                            )
                        })}
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}