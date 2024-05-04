/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import s from './styles.module.scss';

const ChuyenMuc = ({ listChuyenMuc }: { listChuyenMuc: any; }) => {
    const handleRedirectPage = (url: any) => {
        console.log("Chuyển page:", url)
    }
    return (
        <div className={s.box_blog_7}>
            <div className={s.box_header}>
                <span>Chuyên Mục</span>
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
                {listChuyenMuc?.map((item: any, index: any) => {
                    return (
                        <div key={index} className={s.box_item_1}>
                            <div className={s.box_body} onClick={() => { handleRedirectPage(item?.title) }}>
                                <div className={s.box_left}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M5.38384 13.625C5.28127 13.625 5.19166 13.5921 5.115 13.5263C5.03833 13.4614 5 13.3836 5 13.2927C5 13.201 5.03678 13.1227 5.11033 13.0578L10.1033 8.59094L5.18648 4.20195C5.14297 4.15561 5.11189 4.10324 5.09324 4.04485C5.07563 3.98646 5.07563 3.92946 5.09324 3.87385C5.11189 3.81824 5.14297 3.76773 5.18648 3.72232C5.259 3.65744 5.3481 3.625 5.45377 3.625C5.55944 3.625 5.64854 3.65744 5.72106 3.72232L10.8897 8.35599C10.9259 8.38843 10.9534 8.42596 10.972 8.4686C10.9907 8.5103 11 8.55248 11 8.59511C11 8.63774 10.9907 8.67852 10.972 8.71745C10.9534 8.75638 10.9259 8.79206 10.8897 8.8245L5.64491 13.5263C5.60865 13.5587 5.56669 13.5833 5.51904 13.6C5.47242 13.6167 5.42735 13.625 5.38384 13.625Z" fill="#FE4F70" />
                                    </svg>
                                    <a href="#" style={{ textDecoration: "none" }}>{item?.title}</a>
                                </div>
                                <div className={s.box_right}>
                                    ({item?.number})
                                </div>
                            </div>
                            {index != listChuyenMuc.length - 1 ? <div className={s.line}></div> : <></>}
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default ChuyenMuc;