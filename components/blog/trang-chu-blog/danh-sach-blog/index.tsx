/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import Pagination from "@/components/blog/trang-chu-blog/pagination"
import s from './styles.module.scss';
import { getDate } from "@/functions/functions";
import Link from "next/link";

const DanhSachBlog = ({ listBlog, totalPage, currentPage, setCurrentPage, limitPerPage, setLimitPerPage }: { listBlog: any; totalPage: number; currentPage: number; setCurrentPage: any, limitPerPage: any, setLimitPerPage: any }) => {

    const handleChangePage = (page: any) => {
        setCurrentPage(page);
    };

    const tinNoiBat = listBlog.find((tintuc: any) => tintuc.tinNoiBat)

    return (
        <>
            <div className={s.box_blog_1}>

                <div className={s.item_blog_1}>
                    <Image
                        src={listBlog[0]?.new_picture || '/images/blog/trang-chu-blog/blog_1.png'}
                        alt={""} width={946} height={450} className={s.image_item_1}
                        onError={(e) => {
                            e.currentTarget.srcset = '/images/tintuc_tuyendung_im.svg'
                        }}
                        style={{
                            objectFit: 'cover'
                        }}
                        ></Image>
                    <div className={s.opacity_blog}></div>
                    <div className={s.blog_content_1}>
                        <button className={s.hot_news_button}>Tin nổi bật</button>
                        <Link href={`/blog/${listBlog[0]?.new_title_rewrite}-${listBlog[0]?.new_id}.html`} className={s.blog_text}>{listBlog[0]?.new_title || ''}</Link>
                        <div className={s.group_tag}>
                            <span className={s.tag_text}>{listBlog[0]?.adm_name || ''}</span>
                            <span className={s.tag_dot}></span>
                            <span className={s.tag_text}>{getDate(listBlog[0]?.new_date_last_edit) || 'chưa cập nhật ngày'}</span>
                        </div>
                    </div>
                </div>

                {listBlog.slice(limitPerPage * (currentPage - 1), limitPerPage * currentPage)?.map((item: any, index: any) => {

                    if (item?.tinNoiBat)
                        return (
                            <div key={index} className={s.item_blog_1}>
                                <Image
                                    src={item?.new_picture || '/images/blog/trang-chu-blog/blog_1.png'}
                                    alt={""} width={946} height={450} className={s.image_item_1}
                                    onError={(e) => {
                                        e.currentTarget.srcset = '/images/tintuc_tuyendung_im.svg'
                                    }}
                                    style={{
                                        objectFit: 'cover'
                                    }}
                                    ></Image>
                                <div className={s.opacity_blog}></div>
                                <div className={s.blog_content_1}>
                                    <button className={s.hot_news_button}>Tin nổi bật</button>
                                    <a href={"#"} className={s.blog_text}>{item?.new_title || ''}</a>
                                    <div className={s.group_tag}>
                                        <span className={s.tag_text}>{item?.adm_name || ''}</span>
                                        <span className={s.tag_dot}></span>
                                        <span className={s.tag_text}>{getDate(item?.new_date_last_edit) || 'chưa cập nhật ngày'}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    else
                        return (
                            <div key={index} className={s.item_blog_2}>
                                <Image
                                    src={item?.new_picture || '/images/blog/trang-chu-blog/blog_2.png'}
                                    alt={""} width={459} height={288} className={s.image_item_2}
                                    onError={(e) => {
                                        e.currentTarget.srcset = '/images/tintuc_tuyendung_im.svg'
                                    }}
                                    style={{
                                        objectFit: 'cover'
                                    }}
                                ></Image>
                                <a href="#" className={s.title}>{item?.new_title}</a>
                                <div className={s.author}>Tác giả: {item?.adm_name || ''}</div>
                            </div>
                        )

                })}
                <div className={s.pagination}>
                    <Pagination
                        totalPage={totalPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        handleChangePage={handleChangePage}
                        limitPerPage={limitPerPage}
                    />
                </div>
            </div>
        </>
    )
}

export default DanhSachBlog;