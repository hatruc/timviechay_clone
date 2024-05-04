import { useState, useEffect, useRef } from 'react';
import { getCookie } from 'cookies-next';
import Image from 'next/image';

// import Item from '@/components/danh-sach-viec-lam/tag/item'

import * as data from '@/components/danh-sach-viec-lam/nganh-nghe/data';
import s from './styles.module.scss';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function ViecLamTheoNganhNghe() {
    const [listJob, setListJob] = useState(data.listJob);

    return (
        <>
            <Header />
            <div className={s.backgroup}>
                <div className={s.body}>
                    <div className={s.title}>VIỆC LÀM THEO <span>{listJob.length} NGÀNH NGHỀ</span></div>
                    <div className={s.container}>
                        {listJob?.map((item: any, index: any) => {
                            return (
                                <div key={index} className={s.item}>
                                    <span>{item}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}