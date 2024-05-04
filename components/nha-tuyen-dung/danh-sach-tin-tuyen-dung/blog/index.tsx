/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import * as data from '@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/data.js';

import s from './styles.module.scss';

const Blog = ({ contentBlog }: { contentBlog: any; }) => {

    const [content, setContent] = useState(``);
    const [tableContent, setTableContent] = useState(``);

    const handleRutGon = () => {
        console.log("Rút gon")
    };

    useEffect(() => {
        //Tách mục lục và nội dung ở đây
        setContent(contentBlog);
        setTableContent(data.contentTable);
    }, [])
    return (
        <div className={s.list_news_box_6}>
            <div className={s.note}>SAPO: When everyone had finished eating, I walked over to the front door to see what the weather was like. It was a sad scene. The darkness fell too soon, and the wind blew the snowflakes so that the hills and the sky were no longer visible. When everyone had finished eating, I walked over to the front door to see what the weather was like. It was a sad scene. The darkness fell too soon, and the wind blew the snowflakes so that the hills and the sky were no longer visible.</div>

            <div className={s.tableContent}>
                <div className={s.tableContentHeader}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M22 19L7 19" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M22 12L7 12" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M22 5L7 5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="3" cy="5" r="1" fill="#333333" />
                        <circle cx="3" cy="12" r="1" fill="#333333" />
                        <circle cx="3" cy="19" r="1" fill="#333333" />
                    </svg>
                    <span>Mục lục:</span>
                </div>

                <div className={s.tableContentItem} dangerouslySetInnerHTML={{ __html: tableContent }} />
            </div>

            <div className={s.blogContent} dangerouslySetInnerHTML={{ __html: content }} />

            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <button className={s.button_rut_gon} style={{ cursor: "pointer" }} onClick={() => { handleRutGon() }}>Rút gọn</button>
            </div>
        </div >
    )
}
export default Blog;
