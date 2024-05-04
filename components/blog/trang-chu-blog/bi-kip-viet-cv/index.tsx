/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import s from './styles.module.scss';
import { getDate, handleImageSource } from "@/functions/functions";

const BiKipVietCv = ({ listCv, chiTietCv }: { listCv: any; chiTietCv: any; }) => {

    const handleSeeMore = () => {
        console.log("Xem tất cả");
    }

    return (

        <div className={s.box_blog_3}>
            <div className={s.box_header}>
                <span>BÍ KÍP VIẾT CV</span>
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

            <div className={s.box_blog_body_1}>
                {chiTietCv?.map((item: any, index: any) => {
                    return (
                        <div key={index} className={s.box_item}>
                            <div className={s.row_1}>
                                <Image
                                    src={handleImageSource(item?.new_picture) || '/images/blog/trang-chu-blog/cv_1.png'}
                                    alt={""} width={583} height={328} className={s.image_item_1}
                                    onError={(e) => {
                                        e.currentTarget.srcset = '/images/blog/trang-chu-blog/cv_1.png'
                                    }}
                                ></Image>
                                <div className={s.info}>
                                    <span className={s.author}>
                                        <Image
                                            src={handleImageSource(item?.adm_picture) || '/images/blog/trang-chu-blog/avatar_1.png'}
                                            alt={""} width={32} height={32} className={s.image_item_2}
                                            onError={(e) => {
                                                e.currentTarget.srcset = '/images/blog/trang-chu-blog/avatar_1.png'
                                            }}
                                        ></Image>
                                        <span>{item?.adm_name || 'chưa cập nhật tên tác giả'}</span>
                                    </span>
                                    <div className={s.dot}></div>
                                    <span className={s.time}>{getDate(item?.new_date_last_edit) || 'chưa cập nhật ngày'}</span>
                                </div>
                            </div>
                            <div className={s.row_2}>
                                <a href="#" style={{ textDecoration: "none" }} className={s.title}>
                                    {item?.new_title || ''}
                                </a>
                                <div className={s.content}>
                                    {item?.new_des || ''}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className={s.box_blog_body_2}>
                {listCv?.map((item: any, index: any) => {
                    return (
                        <div key={index} className={s.box_item_1}>
                            <div className={s.line}></div>
                            <div className={s.box_body}>
                                <Image
                                    src={handleImageSource(item?.new_picture) || '/images/blog/trang-chu-blog/thumb-list-1.png'}
                                    alt={""} width={110} height={89} className={s.image_item_3}
                                    onError={(e) => {
                                        e.currentTarget.srcset = '/images/blog/trang-chu-blog/thumb-list-1.png'
                                    }}
                                ></Image>
                                <div className={s.info_list}>
                                    <a href="#" style={{ textDecoration: "none" }} className={s.title}>{item?.new_title || ''}</a>
                                    <span className={s.author}>Tác giả: {item?.adm_name || 'chưa cập nhật tên tác giả'}</span>
                                    <span className={s.time}>{getDate(item?.new_date_last_edit) || 'chưa cập nhật ngày'}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>

            <button className={s.button_see_all} onClick={handleSeeMore}>Xem tất cả</button>
        </div>

    )
}

export default BiKipVietCv;