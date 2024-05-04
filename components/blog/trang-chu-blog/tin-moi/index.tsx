/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import s from './styles.module.scss';
import { getDate } from "@/functions/functions";

const TinMoi = ({ listNews, chiTietNews }: { listNews: any; chiTietNews: any; }) => {

    const handleSeeMore = () => {
        console.log("Xem tất cả");
    }

    return (
        <div className={s.box_blog_2}>
            <div className={s.box_header}>
                <span>TIN MỚI</span>
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

            <div className={s.box_blog_body}>
                <div className={s.box_left}>
                    <div className={s.row_1}>
                        <Image
                            src={chiTietNews?.new_picture}
                            onError={(e) => {
                                e.currentTarget.srcset = '/images/blog/trang-chu-blog/tin_1.png'
                            }}
                            alt={""} width={583} height={328}
                            className={s.image_item_1}
                        >

                        </Image>
                        <div className={s.info}>
                            <span className={s.author}>
                                <Image
                                    src={chiTietNews?.adm_picture || '/images/blog/trang-chu-blog/avatar_1.png'}
                                    alt={""} width={32} height={32}
                                    className={s.image_item_2}
                                    onError={(e) => {
                                        e.currentTarget.srcset = '/images/blog/trang-chu-blog/avatar_1.png'
                                    }}
                                >

                                </Image>
                                <span>{chiTietNews?.adm_name || ''}</span>
                            </span>
                            <div className={s.dot}></div>
                            <span className={s.time}>{getDate(chiTietNews?.new_date_last_edit) || 'chưa cập nhật ngày'}</span>
                        </div>
                    </div>
                    <div className={s.row_2}>
                        <div className={s.title}>
                            {chiTietNews?.new_title || ''}
                        </div>
                        <div className={s.content}>
                            {chiTietNews?.new_des || ''}
                        </div>
                    </div>
                </div>

                <div className={s.box_right}>
                    {listNews.slice(1, 5)?.map((item: any, index: any) => {
                        return (
                            <div key={index} className={s.item_box}>
                                <div className={s.group_1}>
                                    <Image
                                        src={item?.new_picture || '/images/blog/trang-chu-blog/thumb-list.png'}
                                        alt={""} width={110} height={89}
                                        className={s.image_item_3}
                                        onError={(e) => {
                                            e.currentTarget.srcset = '/images/blog/trang-chu-blog/thumb-list.png'
                                        }}
                                    ></Image>
                                    <div className={s.info_list}>
                                        <a href="#" style={{ textDecoration: "none" }} className={s.title}>{item?.new_title || ''}</a>
                                        <span className={s.author}>Tác giả: {item?.adm_name || ''}</span>
                                        <span className={s.time}>{getDate(item?.new_date_last_edit) || 'chưa cập nhật ngày'}</span>
                                    </div>
                                </div>
                                <div className={s.line}></div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <button className={s.button_see_all} onClick={handleSeeMore}>Xem tất cả</button>
        </div>
    )
}

export default TinMoi;