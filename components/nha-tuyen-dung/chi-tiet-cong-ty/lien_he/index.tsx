import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import s from './styles.module.scss';

const LienHe = ({ addressInfo }: { addressInfo: any; }) => {
    return (
        <div className={s.box_8}>
            <div className={s.title}>Liên hệ</div>
            <div className={s.body}>
                <div className={s.group_left}>
                    <div className={s.item}>
                        <div className={s.title}>Địa chỉ:</div>
                        <div className={s.value}> {addressInfo?.diaChi}</div>
                    </div>

                    <div className={s.item}>
                        <div className={s.title}>Quy mô:</div>
                        <div className={s.value}> {addressInfo?.quyMo}</div>
                    </div>

                    <div className={s.item}>
                        <div className={s.title}>Lĩnh vực:</div>
                        <div className={s.value}> {addressInfo?.linhVuc}</div>
                    </div>
                </div>
                <div className={s.group_right}>
                    <Image priority src={"/images/nha-tuyen-dung/chi-tiet-cong-ty/map.png"} alt={""} width={464} height={166} className={s.img}></Image>
                </div>
            </div >
        </div>
    )
}

export default LienHe;

