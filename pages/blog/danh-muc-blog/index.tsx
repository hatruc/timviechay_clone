/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import dynamic from 'next/dynamic';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from "cookies-next";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Pagination from '@/components/blog/danh-muc-blog/pagination';
import XemNhieuNhat from '@/components/blog/danh-muc-blog/xem-nhieu-nhat';
import TieuBieuTuan from '@/components/blog/danh-muc-blog/tieu-bieu-tuan';

import * as data from '@/components/blog/danh-muc-blog/data';
import s from './styles.module.scss';
import { NextPageContext } from 'next';
import { getDate, getTokenServerSide, handleImageSource } from '@/functions/functions';
import { POST_SERVER } from '@/pages/api/base-api';

export const getServerSideProps = async (context: NextPageContext) => {
    const token = getTokenServerSide(context);
    const type = context.query.type;
    console.log('>>> check type: ', type);

    const data = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_NEW}/new/ChildOfBlog`, { type: 2 }, token);
    if (data?.data) {
        return {
            props: {
                dataCateBlog: data
            }
        }
    } else {
        return {
            props: {
                data: 'rong~'
            }
            // redirect: {
            //     destination: '/404',
            //     permanent: false,
            // }
        }
    }

}

const DanhMucBlog: React.FC<{ dataCateBlog: any }> = ({ dataCateBlog }) => {

    console.log('>>> check data: ', dataCateBlog);

    const router = useRouter();

    const [biKipVietCv, setBiKipVietCv] = useState(data?.biKipVietCv);
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(10)
    const [totalPage, setTotalPage] = useState(Math.ceil(dataCateBlog?.data?.length / limitPerPage) || 1)
    const [listXemNhieuNhat, setListXemNhieuNhat] = useState(dataCateBlog?.xemnhieunhat || []);
    const [listTieuBieuTuan, setListTieuBieuTuan] = useState(dataCateBlog?.tieubieutuan || []);

    const handleChangePage = (page: any) => {
        setCurrentPage(page);
    };

    const navigateToAbout = (route: any) => {
        router.push(route);
    };
    return (
        <>
            <Header />
            <div className={s.body}>

                <div className={s.router}>
                    <div className={s.textBlue} onClick={() => navigateToAbout("/")}>Trang chủ</div>
                    <div className={s.path}><div><span>›</span></div></div>
                    <div className={s.textBlue} onClick={() => navigateToAbout("/blog/trang-chu-blog")}>Blog</div>
                    <div className={s.path}><div><span>›</span></div></div>
                    <div className={s.text} onClick={() => navigateToAbout("/blog/danh-muc-blog")}>Bí quyết viết CV</div>
                </div>

                <div className={s.header}>

                    <span>
                        BÍ KÍP VIẾT CV
                    </span>

                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="6" viewBox="0 0 33 6" fill="none">
                        <path d="M33 1C29.7 1 29.7 5 26.402 5C23.1 5 23.1 1 19.8 1C16.5 1 16.5 5 13.201 5C9.901 5 9.901 1 6.601 1C3.301 1 3.303 5 0 5" stroke="url(#paint0_linear_2949_199725)" strokeWidth="2" />
                        <defs>
                            <linearGradient id="paint0_linear_2949_199725" x1="0" y1="1" x2="3300" y2="1" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FE4F70" />
                                <stop offset="1" stopColor="#FFA387" />
                            </linearGradient>
                        </defs>
                    </svg>

                </div>

                <div className={s.box_blog_body}>

                    <div className={s.box_blog_1}>
                        {dataCateBlog?.data.slice(limitPerPage * (currentPage - 1), limitPerPage * currentPage)?.map((item: any, index: any) => {
                            return (
                                <div key={index} className={s.item}>
                                    <Image src={handleImageSource(item?.new_picture) || ''} alt={""} priority height={248} width={476} className={s.image_1}></Image>
                                    <div className={s.info}>
                                        <a href="#">{item?.new_title || ''}</a>
                                        <div className={s.group_info}>
                                            <Image src={handleImageSource(item?.adm_picture) || ''} priority alt={"avt author"} height={32} width={32} className={s.image_2}></Image>
                                            <div className={s.textBiKip}>{item?.adm_name || ''}</div>
                                            <div className={s.dot}></div>
                                            <div className={s.time}>{getDate(item?.new_date_last_edit) || 'chưa cập nhật ngày'} </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <div className={s.pagination}>
                            <Pagination
                                totalPage={totalPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                handleChangePage={handleChangePage}
                            />
                        </div>
                    </div>

                    <div className={s.box_blog_2}>

                        <XemNhieuNhat listXemNhieuNhat={listXemNhieuNhat} />

                        <TieuBieuTuan listTieuBieuTuan={listTieuBieuTuan} />

                    </div>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default DanhMucBlog