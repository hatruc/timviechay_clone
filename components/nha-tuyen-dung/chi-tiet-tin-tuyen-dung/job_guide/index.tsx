import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import s from './styles.module.scss';
import { handleImageSource } from "@/functions/functions";

const JobGuide = ({ listGuide }: { listGuide: any }) => {
    return (
        <div className={s.job_detail_box_8}>
            <div className={s.header}>
                <span>Hướng dẫn tìm việc</span>
            </div>

            <div className={s.list_guide}>
                {listGuide?.map((item: any, index: any) => (
                    <a key={index} href="#" style={{ textDecoration: "none" }}>
                        <div className={s.item}>
                            <Image src={handleImageSource(item.new_picture)} alt={""} height={158} width={261} className={s.img_css}></Image>
                            <div className={s.content}>
                                <span className={s.text}>
                                    {item.new_des}
                                </span>
                            </div>
                        </div>
                    </a>
                ))}

            </div>
        </div>
    )
}

export default JobGuide;