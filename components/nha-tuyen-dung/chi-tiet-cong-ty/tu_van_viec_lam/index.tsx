import React from "react";
import { useState } from 'react';
import Image from "next/image";
import { Rate } from 'antd';

import s from './styles.module.scss';

const TuVanViecLam = ({ listTuVan }: { listTuVan: any; }) => {
    const [showAll, setShowAll] = useState(false);

    return (
        <div className={s.box_6}>
            <div className={s.title}>Chuyên gia tư vấn việc làm</div>
            {listTuVan?.map((item: any, index: any) => {
                return (
                    <div key={index} className={s.body}>
                        <div className={s.title}>{item?.new_title || ''}</div>
                        <div className={s.content}>{item?.new_des || ''}</div>
                        <div className={s.content}>
                            Theo chuyên gia: <span style={{ cursor: "pointer" }} className={s.author}>{item?.admin_name}</span>
                        </div>
                    </div>
                )
            })}
            <div className={s.showAll} >Xem bộ câu hỏi phỏng vấn mới nhất →</div>
        </div>
    )
}

export default TuVanViecLam;
