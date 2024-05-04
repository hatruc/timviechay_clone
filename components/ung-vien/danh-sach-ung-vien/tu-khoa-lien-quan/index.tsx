import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { Radio } from 'antd';

import s from './styles.module.scss';
import Link from "next/link";

const TuKhoaLienQuan = ({ keyTag }: { keyTag: any; }) => {
    return (
        <div className={s.container}>
            <div className={s.list_news_box_3}>
                <div className={s.title}>Các từ khóa liên quan:</div>
                <div className={s.groupKeyTag}>
                    {keyTag?.map((item: any, index: any) => {
                        return (
                            <div key={index} className={s.item_list_key}>
                                <div className={s.title_tag}>{item?.title}</div>
                                <div className={s.overflow}>
                                    {item?.tags?.map((item1: any, index1: any) => {
                                        return (
                                            <Link href={item1.link}>
                                                <div key={index1} className={s.key}>{item1.label}</div>
                                            </Link>
                                        )
                                    })}
                                </div>

                            </div>
                        )
                    })}

                </div>
            </div>
        </div>

    )
}

export default TuKhoaLienQuan;
