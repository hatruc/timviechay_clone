/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import dynamic from 'next/dynamic';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from "cookies-next";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import DanhSachBlog from "@/components/blog/trang-chu-blog/danh-sach-blog";
import TinMoi from "@/components/blog/trang-chu-blog/tin-moi";
import BiKipVietCv from "@/components/blog/trang-chu-blog/bi-kip-viet-cv";
import CamNangTimViec from "@/components/blog/trang-chu-blog/cam-nang-tim-viec";
import BieuMau from "@/components/blog/trang-chu-blog/bieu-mau";
import TieuBieuTuan from "@/components/blog/trang-chu-blog/tieu-bieu-tuan";
import ChuyenMuc from "@/components/blog/trang-chu-blog/chuyen-muc";
import CauHoiTuyenDung from "@/components/blog/trang-chu-blog/cau-hoi-tuyen-dung";

import * as data from "@/components/blog/trang-chu-blog/data.js";
import s from './styles.module.scss';
import { NextPageContext } from 'next';
import { getTokenServerSide } from '@/functions/functions';
import { POST_SERVER } from '@/pages/api/base-api';

export const getServerSideProps = async (context: NextPageContext) => {
    const token = getTokenServerSide(context);
    // const id = context.query.id;

    const data = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_NEW}/new/getBlog`, { id: 159563 }, token);
    if (data?.result) {
        return {
            props: {
                dataBlog: data
            }
        }
    } else {
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            }
        }
    }

}

const TrangChuBlog: React.FC<{ dataBlog: any }> = ({ dataBlog }) => {

    console.log('>>> check dataBlog: ', dataBlog);

    const router = useRouter();

    const [limitPerPage, setLimitPerPage] = useState(2)

    const [totalPage, setTotalPage] = useState<any>(Math.round((dataBlog?.hotNew.length / limitPerPage)));
    const [currentPage, setCurrentPage] = useState(1)
    const [listBlog, setListBlog] = useState(dataBlog?.hotNew || []);
    const [listNews, setListNews] = useState(dataBlog?.data || []);
    const [chiTietNews, setChiTietNews] = useState(dataBlog.data[0] || {});
    const [listCv, setListCv] = useState(dataBlog?.BlogCate[0].slice(2, 4) || []); // Bi kip viet cv
    const [chiTietCv, setChiTietCv] = useState(dataBlog?.BlogCate[0].slice(0, 2) || []); // Bi kip viet cv 
    const [listCamNang, setListCamNang] = useState(dataBlog?.BlogCate[1] || []); // Cam nang tim viec
    const [listBieuMau, setListBieuMau] = useState(dataBlog?.BlogCate[2] || []); // Bieu mau
    const [listTieuBieuTuan, setListTieuBieuTuan] = useState(data?.listTieuBieuTuan);
    const [listChuyenMuc, setListChuyenMuc] = useState(data?.listChuyenMuc);
    const [listCauHoiTuyenDung, setListCauHoiTuyenDung] = useState(dataBlog?.cauhoituyendung);
    const [inputSearch, setInputSearch] = useState("");

    const handleInputSearch = (value: any) => {
        setInputSearch(value);
    }

    const handleSearch = () => {
        console.log("Đang tìm kiếm với từ khóa: ", inputSearch);
    }

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
                    <div className={s.text} onClick={() => navigateToAbout("/blog")}>Blog</div>
                </div>

                <div className={s.box_blog_body}>
                    <div className={s.grid_col_1}>
                        <DanhSachBlog
                            listBlog={listBlog}
                            totalPage={totalPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            limitPerPage={limitPerPage}
                            setLimitPerPage={setLimitPerPage}
                        />

                        <TinMoi listNews={listNews} chiTietNews={chiTietNews} />

                        <BiKipVietCv listCv={listCv} chiTietCv={chiTietCv} />

                        <CamNangTimViec listCamNang={listCamNang} />

                        <BieuMau listBieuMau={listBieuMau} />
                    </div>

                    <div className={s.grid_col_2}>
                        {/* <div className={s.search_bar}>
                            <div className={s.input_search}>
                                <input
                                    className={s.text_search}
                                    placeholder='Search'
                                    value={inputSearch}
                                    onChange={(event: any) => handleInputSearch(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            handleSearch();
                                        }
                                    }}
                                />
                                <button className={s.button_search} onClick={handleSearch}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                        <path d="M18.2099 16.5322H17.059L16.6511 16.1417C18.1281 14.4411 18.9399 12.2701 18.9383 10.0247C18.9383 8.16561 18.3829 6.34828 17.3424 4.80251C16.3019 3.25674 14.8231 2.05195 13.0928 1.34051C11.3626 0.629073 9.45863 0.442927 7.6218 0.805617C5.78497 1.16831 4.09773 2.06354 2.77345 3.37811C1.44917 4.69268 0.547319 6.36755 0.181951 8.19091C-0.183417 10.0143 0.00410284 11.9042 0.720799 13.6218C1.43749 15.3394 2.65118 16.8074 4.20837 17.8403C5.76556 18.8731 7.59631 19.4244 9.46913 19.4244C11.8146 19.4244 13.9706 18.5712 15.6313 17.154L16.0247 17.5589V18.7013L18.0478 20.625L20 18.5291L18.2099 16.5322ZM9.46913 16.5322C5.84173 16.5322 2.91358 13.6255 2.91358 10.0247C2.91358 6.42389 5.84173 3.51722 9.46913 3.51722C13.0965 3.51722 16.0247 6.42389 16.0247 10.0247C16.0247 13.6255 13.0965 16.5322 9.46913 16.5322Z" fill="#8B8B8B" />
                                    </svg>
                                </button>

                            </div>
                        </div> */}

                        <TieuBieuTuan listTieuBieuTuan={listTieuBieuTuan} />

                        <ChuyenMuc listChuyenMuc={listChuyenMuc} />

                        <CauHoiTuyenDung listCauHoiTuyenDung={listCauHoiTuyenDung} />
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default TrangChuBlog