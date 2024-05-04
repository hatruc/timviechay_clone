/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import s from './styles.module.scss';

const CauHoiTuyenDung = ({ listCauHoiTuyenDung }: { listCauHoiTuyenDung: any; }) => {
    const handleRedirectPage = (url: any) => {
        console.log("Chuyển page:", url)
    }
    return (
        <div className={s.box_blog_8}>
            <div className={s.box_header}>
                <span>Câu hỏi tuyển dụng</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="6" viewBox="0 0 33 6" fill="none">
                    <g clipPath="url(#clip0_1808_3597)">
                        <path d="M33 1C29.7 1 29.7 5 26.402 5C23.1 5 23.1 1 19.8 1C16.5 1 16.5 5 13.201 5C9.901 5 9.901 1 6.601 1C3.301 1 3.303 5 0 5" stroke="url(#paint0_linear_1808_3597)" strokeWidth="2" />
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_1808_3597" x1="0" y1="1" x2="3300" y2="1" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FE4F70" />
                            <stop offset="1" stopColor="#FFA387" />
                        </linearGradient>
                        <clipPath id="clip0_1808_3597">
                            <rect width="33" height="6" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>

            <div className={s.box_blog_body_2}>
                {listCauHoiTuyenDung?.map((item: any, index: any) => {
                    return (
                        <div key={index} className={s.box_item_1}>
                            <div className={s.box_body} onClick={() => { handleRedirectPage(item) }}>
                                <a href="#" style={{ textDecoration: "none" }}>{item?.new_title || ''}</a>
                            </div>
                            {index != listCauHoiTuyenDung.length - 1 ? <div className={s.line}></div> : <></>}
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default CauHoiTuyenDung;