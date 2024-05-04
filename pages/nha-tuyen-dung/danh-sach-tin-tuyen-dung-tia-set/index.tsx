/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import dynamic from 'next/dynamic';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from "cookies-next";
import { useSearchVariables } from '@/components/store';

import { Radio, Popover, Select } from 'antd';
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Search from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung-tia-set/search";
import TinTuyenDung from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/tin-tuyen-dung";
import NhaTuyenDungOnline from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/nha-tuyen-dung-online";
import MauCVXinViec from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/mau-CV-xin-viec";
import TuKhoaLienQuan from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/tu-khoa-lien-quan";
import HoTroTimViec from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/ho-tro-ung-vien-tim-viec";
import Blog from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/blog";
import ChiTietTinTuyenDung from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/chi-tiet-tin-tuyen-dung";
import BoxChat from "@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/box_chat";

import * as data from '@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/data.js';
import * as data1 from '@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung-tia-set/data.js';
import s from './styles.module.scss';
import { city_array } from '@/functions/functions';

export default function DanhSachTinTuyenDungTiaSet() {
    const router = useRouter();
    const searchVariables: any = useSearchVariables();

    const [listTin, setListTin] = useState<any>("");
    const [resetFilter, setResetFilter] = useState(false);
    const [totalHuyHieu, setTotalHuyHieu] = useState(0);
    const [listDistrict, setListDistrict] = useState(data?.listDistrict);
    const [listCity, setListCity] = useState<any>([
        { cit_id: 0, cit_name: "Toàn quốc" },
        ...city_array
    ]);
    const [listJob, setListJob] = useState(data.listJob);
    const [listExp, setListExp] = useState(data.listExp);
    const [listSalary, setListSalary] = useState(data.listSalary);
    const [listLevel, setListLevel] = useState(data.listLevel);
    const [listWorkForm, setWorkForm] = useState(data.listWorkForm);
    const [isOpenLetter, setIsOpenLetter] = useState(false);
    const [workInfo, setWorkInfo] = useState(data1.workInfo);
    const [totalPage, setTotalPage] = useState(80);
    const [idNews, setIdNews] = useState(0);
    const [newsDetail, setNewsDetail] = useState<any>({});
    const [companyInfo, setCompanyInfo] = useState(data.companyInfo);
    const [keyTag, setKeyTag] = useState(data.keyTag);
    const [listCv, setListCv] = useState(data.listCv);
    const [contentBlog, setContentBlog] = useState(data.contentBlog);
    const [seeNow, setSeeNow] = useState(false);
    const [choice, setChoice] = useState("1");
    const [nameCity, setNameCity] = useState<string>();


    const [listSelect, setListSelect] = useState([
        { value: '1', label: 'Liên quan' },
        { value: '2', label: 'Ngày đăng' },
        { value: '3', label: 'Cập nhật gần nhất' },
        { value: '4', label: 'Lương cao đến thấp' },
    ]);

    const convertCityName = (cityNumber: number) => {
        listCity.filter((city: any) => {
            if (city.cit_id == cityNumber) {
                setNameCity(city.cit_name)
            }
        })
    }

    const handleRadioChange = (value: any) => {
        setChoice(value);
    };

    const handleUngTuyenNgay = () => {
        setIsOpenLetter(true);
    };

    const handleGuiThuUngTuyen = () => {
        console.log("Thư đã được gửi");
        setIsOpenLetter(false);
    };

    const handleCloseLetter = () => {
        setIsOpenLetter(false);
    };

    const handleChatNgay = () => {
        console.log("Chat ngay thành công");
    };

    const handleLuuTin = () => {
        console.log("Tin đã được lưu");
    };

    const handleTaoCv = () => {
        console.log("Tạo CV ngay");
    };

    const handleSeeNow = (status: any, id: any) => {
        setIdNews(id);
        setSeeNow(status);
    };

    const handleResetFilter = () => {
        setResetFilter(true);
    };

    const handleSearch = (keyword: any, selectCity: any, selectDistrict: any, selectJob: any, selectExp: any, selectSalary: any, selectLevel: any, selectWorkForm: any) => {
        console.log(
            "key:", keyword,
            "selectDistrict:", selectDistrict,
            "selectCity:", selectCity,
            "selectJob:", selectJob,
            "selectExp:", selectExp,
            "selectSalary:", selectSalary,
            "selectLevel:", selectLevel,
            "selectWorkForm:", selectWorkForm
        );
        setTotalHuyHieu(49);
    };

    const navigateToAbout = (route: any) => {
        router.push(route);
    };

    useEffect(() => {
        if (idNews != undefined) {
            let item = data.newsDetail.find(item => item.id === idNews);
            setNewsDetail(item || {})
        }
    }, [idNews])

    useEffect(() => {
        if (searchVariables.isSearch == true) {
            searchVariables.setIsSearch(false);
            handleSearch(searchVariables.keyword, searchVariables.selectCity, searchVariables.selectDistrict, searchVariables.selectJob, searchVariables.selectExp, searchVariables.selectSalary, searchVariables.selectLevel, searchVariables.selectWorkForm);
        }
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const address = urlParams.get('address');
        convertCityName(Number(address))
    }, [data])

    return (
        <>
            <Header />

            {/* <div className={s.position_chat}>
                <BoxChat />
            </div> */}

            <Search
                onClickSearch={handleSearch}
                totalHuyHieu={totalHuyHieu}
                resetFilter_1={resetFilter}
                setResetFilter={setResetFilter}
                listCity={listCity}
                listDistrict={listDistrict}
                listJob={listJob}
                listExp={listExp}
                listSalary={listSalary}
                listLevel={listLevel}
                listWorkForm={listWorkForm}
            />

            <div className={s.body}>

                <div className={s.header}>
                    <div>Tuyển Dụng, Tìm Việc Làm Tại {nameCity}</div>
                </div>

                <div className={s.router}>
                    <div className={s.textBlue} onClick={() => navigateToAbout("/")}>Trang chủ</div>
                    <div className={s.path}><div><span>›</span></div></div>
                    <div className={s.text} onClick={() => navigateToAbout("/nha-tuyen-dung/danh-sach-tin-tuyen-dung-tia-set")}> Tuyển dụng, tìm việc làm tại {nameCity}</div>
                </div>

                <div className={s.box_news_1}>
                    <div className={s.grid_item_2}>

                        <div className={s.grid_item_header}>
                            <div className={s.title}>
                                <span>Hiển thị theo:</span>
                                <Radio.Group value={choice} onChange={(e: any) => handleRadioChange(e.target.value)}>
                                    {listSelect?.map((item: any, index: any) => {
                                        return (
                                            <Radio key={index} value={item?.value}>{item?.label}</Radio>
                                        )
                                    })}

                                </Radio.Group>
                            </div>
                            <div className={s.title_1}>
                                <div className={s.selectNews}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M14.3196 19.07C14.3196 19.68 13.9195 20.48 13.4095 20.79L11.9996 21.7C10.6896 22.51 8.86957 21.6 8.86957 19.98V14.63C8.86957 13.92 8.46957 13.01 8.05957 12.51L4.21954 8.47C3.70954 7.96 3.30957 7.06001 3.30957 6.45001V4.13C3.30957 2.92 4.21959 2.01001 5.32959 2.01001H18.6696C19.7796 2.01001 20.6896 2.92 20.6896 4.03V6.25C20.6896 7.06 20.1796 8.07001 19.6796 8.57001" stroke="#999999" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16.0701 16.52C17.8374 16.52 19.2701 15.0873 19.2701 13.32C19.2701 11.5527 17.8374 10.12 16.0701 10.12C14.3028 10.12 12.8701 11.5527 12.8701 13.32C12.8701 15.0873 14.3028 16.52 16.0701 16.52Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M19.8701 17.12L18.8701 16.12" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <Select
                                        style={{ width: "100%" }}
                                        className={`select_list_news`}
                                        value={choice}
                                        onChange={handleRadioChange}
                                        options={listSelect}
                                        suffixIcon={
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path d="M9.52982 10.0506C9.38918 10.1912 9.19845 10.2701 8.99957 10.2701C8.8007 10.2701 8.60997 10.1912 8.46932 10.0506L5.02982 6.61181C4.88837 6.47519 4.69892 6.39959 4.50227 6.4013C4.30562 6.40301 4.11752 6.48189 3.97846 6.62094C3.8394 6.76 3.76053 6.94811 3.75882 7.14476C3.75711 7.3414 3.8327 7.53086 3.96932 7.67231L7.40882 11.1088C7.83076 11.5306 8.40295 11.7676 8.99957 11.7676C9.59619 11.7676 10.1684 11.5306 10.5903 11.1088L14.0298 7.66931C14.1664 7.52786 14.242 7.3384 14.2403 7.14176C14.2386 6.94511 14.1597 6.757 14.0207 6.61794C13.8816 6.47889 13.6935 6.40001 13.4969 6.3983C13.3002 6.39659 13.1108 6.47219 12.9693 6.60881L9.52982 10.0506Z" fill="#999999" />
                                            </svg>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={s.grid_search}>

                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                                    <path d="M11.7273 0.361566C11.5791 0.223023 11.4501 0.105142 11.3432 0C11.2352 0.105142 11.106 0.223023 10.9574 0.361566C9.16182 2.01044 4.52112 5.84937 0 6.11099C0 6.11099 2.07893 18.7278 11.1759 23.9076C11.232 23.9383 11.2868 23.9693 11.3432 24C11.3981 23.9693 11.4544 23.9383 11.5094 23.9076C20.6062 18.7278 22.6866 6.11099 22.6866 6.11099C18.1638 5.84937 13.5248 2.01044 11.7273 0.361566Z" fill="url(#paint0_linear_1576_87159)" fillOpacity="0.82" />
                                    <path d="M11.7156 0.715476C11.5717 0.581092 11.4468 0.466853 11.343 0.36496C11.2382 0.466853 11.1131 0.581222 10.9689 0.715476C9.22803 2.31419 4.72848 6.03641 0.344727 6.2901C0.344727 6.2901 2.36037 18.5233 11.1806 23.5457C11.2352 23.5755 11.2881 23.6054 11.343 23.6352C11.3962 23.6053 11.451 23.5754 11.5042 23.5457C20.3245 18.5233 22.3415 6.2901 22.3415 6.2901C17.9563 6.03641 13.4583 2.31419 11.7156 0.715476Z" fill="url(#paint1_linear_1576_87159)" fillOpacity="0.82" />
                                    <path d="M11.7031 1.0864C11.5639 0.956431 11.4432 0.845958 11.3429 0.747314C11.2416 0.845958 11.1205 0.956431 10.9812 1.0864C9.29732 2.6326 4.94567 6.23239 0.706055 6.47777C0.706055 6.47777 2.65541 18.3089 11.1859 23.1664C11.2386 23.1953 11.29 23.2242 11.3429 23.253C11.3943 23.2242 11.4472 23.1953 11.4988 23.1664C20.0291 18.3089 21.9798 6.47777 21.9798 6.47777C17.7386 6.23239 13.3884 2.6326 11.7031 1.0864Z" fill="url(#paint2_linear_1576_87159)" fillOpacity="0.82" />
                                    <path d="M11.6908 1.45715C11.5563 1.3316 11.4397 1.22477 11.3427 1.12964C11.2449 1.22477 11.1279 1.3316 10.9933 1.45715C9.36662 2.95072 5.163 6.42821 1.06738 6.6654C1.06738 6.6654 2.95059 18.0945 11.1911 22.7869C11.2422 22.8148 11.2915 22.8429 11.3427 22.8707C11.3924 22.8429 11.4435 22.8148 11.4935 22.7869C19.7339 18.0946 21.6185 6.6654 21.6185 6.6654C17.5213 6.42834 13.319 2.95072 11.6908 1.45715Z" fill="url(#paint3_linear_1576_87159)" fillOpacity="0.82" stroke="url(#paint4_linear_1576_87159)" strokeMiterlimit="10" />
                                    <path d="M11.6888 1.52215C11.5552 1.39738 11.4394 1.29133 11.3428 1.19672C11.2456 1.29133 11.1293 1.39751 10.9955 1.52215C9.37889 3.00649 5.20113 6.46267 1.13086 6.6983C1.13086 6.6983 3.00237 18.0569 11.1922 22.7203C11.2429 22.748 11.2921 22.7758 11.3429 22.8038C11.3922 22.7758 11.4431 22.748 11.4927 22.7203C19.6821 18.0569 21.555 6.6983 21.555 6.6983C17.4833 6.46267 13.3068 3.00662 11.6888 1.52215Z" fill="url(#paint5_linear_1576_87159)" fillOpacity="0.82" />
                                    <path d="M11.6835 1.68149C11.5519 1.55854 11.4379 1.45418 11.3429 1.36099C11.2471 1.45418 11.1326 1.55854 11.0008 1.68149C9.40874 3.14334 5.29454 6.54689 1.28613 6.77888C1.28613 6.77888 3.12918 17.9648 11.1945 22.5574C11.2445 22.5845 11.2929 22.6122 11.3429 22.6392C11.3915 22.6122 11.4415 22.5845 11.4904 22.5574C19.5554 17.9649 21.3999 6.77888 21.3999 6.77888C17.3902 6.54689 13.277 3.14334 11.6835 1.68149Z" fill="url(#paint6_linear_1576_87159)" fillOpacity="0.82" />
                                    <path d="M11.714 2.37252C11.714 2.57722 11.5481 2.74319 11.3433 2.74319C11.1386 2.74319 10.9727 2.57722 10.9727 2.37252C10.9727 2.16783 11.1386 2.00186 11.3433 2.00186C11.548 2.00186 11.714 2.1677 11.714 2.37252Z" fill="#567EBA" />
                                    <path d="M2.28234 7.22518C2.28234 7.42988 2.1165 7.59584 1.91168 7.59584C1.70698 7.59584 1.54102 7.42988 1.54102 7.22518C1.54102 7.02049 1.70698 6.85452 1.91168 6.85452C2.11637 6.85452 2.28234 7.02049 2.28234 7.22518Z" fill="#567EBA" />
                                    <path d="M20.926 7.22518C20.926 7.42988 20.7601 7.59584 20.5552 7.59584C20.3505 7.59584 20.1846 7.42988 20.1846 7.22518C20.1846 7.02049 20.3505 6.85452 20.5552 6.85452C20.7599 6.85452 20.926 7.02049 20.926 7.22518Z" fill="#567EBA" />
                                    <path d="M11.3435 20.8187C11.2227 20.8187 11.1248 20.9275 11.1248 21.0619C11.1248 21.1961 11.3435 21.9532 11.3435 21.9532C11.3435 21.9532 11.5624 21.1961 11.5624 21.0619C11.5623 20.9275 11.4642 20.8187 11.3435 20.8187ZM11.9951 21.0846C11.893 21.02 11.7519 21.0599 11.6803 21.1734C11.6087 21.2867 11.3897 22.0439 11.3897 22.0439C11.3897 22.0439 11.9787 21.5204 12.0503 21.4067C12.1219 21.2933 12.0972 21.1489 11.9951 21.0846ZM10.692 21.0846C10.5897 21.1491 10.565 21.2933 10.6367 21.4067C10.7083 21.5204 11.2973 22.0439 11.2973 22.0439C11.2973 22.0439 11.0783 21.2867 11.0067 21.1734C10.9351 21.0598 10.794 21.02 10.692 21.0846Z" fill="#567EBA" />
                                    <path d="M13.1034 5.19128C13.0904 5.21081 12.5383 5.75366 12.5383 5.75366L9.00684 13.0284L12.1505 12.0368L9.68534 18.2396L10.6822 17.2427L15.5541 8.89627L12.0171 9.93941L13.1034 5.19128Z" fill="#B3D7FB" />
                                    <path d="M12.5382 5.75366C12.486 5.83218 8.00977 14.0253 8.00977 14.0253L11.1534 13.0337L9.68518 18.2396L14.6586 9.86337L11.0202 10.9365L12.5382 5.75366Z" fill="white" />
                                    <defs>
                                        <linearGradient id="paint0_linear_1576_87159" x1="11.3433" y1="0" x2="11.3433" y2="24" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#AAD5FF" />
                                            <stop offset="0.21875" stopColor="#377ABB" />
                                            <stop offset="0.458333" stopColor="#377ABB" />
                                            <stop offset="0.71875" stopColor="#6EACE8" />
                                            <stop offset="1" stopColor="#075CAF" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_1576_87159" x1="11.3431" y1="0.36496" x2="11.3431" y2="23.6352" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#AAD5FF" />
                                            <stop offset="0.21875" stopColor="#377ABB" />
                                            <stop offset="0.458333" stopColor="#377ABB" />
                                            <stop offset="0.71875" stopColor="#6EACE8" />
                                            <stop offset="1" stopColor="#075CAF" />
                                        </linearGradient>
                                        <linearGradient id="paint2_linear_1576_87159" x1="11.3429" y1="0.747314" x2="11.3429" y2="23.253" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#AAD5FF" />
                                            <stop offset="0.21875" stopColor="#377ABB" />
                                            <stop offset="0.458333" stopColor="#377ABB" />
                                            <stop offset="0.71875" stopColor="#6EACE8" />
                                            <stop offset="1" stopColor="#075CAF" />
                                        </linearGradient>
                                        <linearGradient id="paint3_linear_1576_87159" x1="11.3429" y1="1.12964" x2="11.3429" y2="22.8707" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#AAD5FF" />
                                            <stop offset="0.21875" stopColor="#377ABB" />
                                            <stop offset="0.458333" stopColor="#377ABB" />
                                            <stop offset="0.71875" stopColor="#6EACE8" />
                                            <stop offset="1" stopColor="#075CAF" />
                                        </linearGradient>
                                        <linearGradient id="paint4_linear_1576_87159" x1="0.991561" y1="11.9918" x2="21.6943" y2="11.9918" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.0056" stopColor="#DEE3E6" />
                                            <stop offset="0.2528" stopColor="#FFFDE5" />
                                            <stop offset="0.3953" stopColor="#F0ECD8" />
                                            <stop offset="0.5955" stopColor="#D6CDC1" />
                                            <stop offset="0.7865" stopColor="#EDEDEE" />
                                            <stop offset="1" stopColor="#D8D5BB" />
                                        </linearGradient>
                                        <linearGradient id="paint5_linear_1576_87159" x1="11.3429" y1="1.19672" x2="11.3429" y2="22.8038" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#AAD5FF" />
                                            <stop offset="0.21875" stopColor="#377ABB" />
                                            <stop offset="0.458333" stopColor="#377ABB" />
                                            <stop offset="0.71875" stopColor="#6EACE8" />
                                            <stop offset="1" stopColor="#075CAF" />
                                        </linearGradient>
                                        <linearGradient id="paint6_linear_1576_87159" x1="11.343" y1="1.36099" x2="11.343" y2="22.6392" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#AAD5FF" />
                                            <stop offset="0.21875" stopColor="#377ABB" />
                                            <stop offset="0.458333" stopColor="#377ABB" />
                                            <stop offset="0.71875" stopColor="#6EACE8" />
                                            <stop offset="1" stopColor="#075CAF" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            <div className={s.resultText}>Tìm thấy <span className={s.result}>{totalHuyHieu}</span> tin đăng NTD tương tác thường xuyên trong 12 giờ qua và phù hợp với yêu cầu của bạn</div>

                            <div className={s.dashed}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1" height="18" viewBox="0 0 1 18" fill="none">
                                    <path d="M1 0V18H0V0H1Z" fill="#474747" />
                                </svg>
                            </div>

                            <div className={s.deleteFilter} onClick={handleResetFilter}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M10.0574 15.5925L8.99992 16.275C8.01742 16.8825 6.65242 16.2 6.65242 14.985V10.9725C6.65242 10.44 6.35242 9.75751 6.04492 9.38251L3.16492 6.35248C2.78242 5.96998 2.48242 5.29501 2.48242 4.83751V3.0975C2.48242 2.19 3.16492 1.50751 3.99742 1.50751H14.0024C14.8349 1.50751 15.5174 2.19002 15.5174 3.02252V4.6875C15.5174 5.295 15.1349 6.05251 14.7599 6.42751" stroke="#3582CD" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16.2227 11.0625C16.2227 11.73 16.0352 12.36 15.7052 12.9C15.0902 13.935 13.9577 14.625 12.6602 14.625C11.3627 14.625 10.2302 13.9275 9.61516 12.9C9.28516 12.3675 9.09766 11.73 9.09766 11.0625C9.09766 9.0975 10.6952 7.5 12.6602 7.5C14.6252 7.5 16.2227 9.0975 16.2227 11.0625Z" stroke="#3582CD" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.612 11.9925L11.7295 10.11" stroke="#3582CD" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.5973 10.1325L11.7148 12.015" stroke="#3582CD" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.5174 3.01501V4.67999C15.5174 5.28749 15.1349 6.04501 14.7599 6.42751L13.4399 7.59C13.1924 7.53 12.9299 7.5 12.6599 7.5C10.6949 7.5 9.09742 9.0975 9.09742 11.0625C9.09742 11.73 9.28492 12.36 9.61492 12.9C9.89242 13.365 10.2749 13.7625 10.7399 14.0475V14.3025C10.7399 14.76 10.4399 15.3675 10.0574 15.5925L8.99992 16.275C8.01742 16.8825 6.65242 16.2 6.65242 14.985V10.9725C6.65242 10.44 6.34492 9.75751 6.04492 9.38251L3.16492 6.35248C2.78992 5.96998 2.48242 5.28751 2.48242 4.83751V3.09C2.48242 2.1825 3.16492 1.5 3.99742 1.5H14.0024C14.8349 1.5 15.5174 2.18251 15.5174 3.01501Z" stroke="#3582CD" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className={s.deleteText}>Xóa lọc</span>
                            </div>

                        </div>
                        <div className={seeNow ? s.grid_show : s.grid_hide}>
                            <TinTuyenDung
                                workInfo={workInfo}
                                totalPage={totalPage}
                                seeNow={seeNow}
                                handleChatNgay={handleChatNgay}
                                handleUngTuyenNgay={handleUngTuyenNgay}
                                handleSeeNow={handleSeeNow}
                            />

                            <div className={s.grid_item_detail}>
                                <ChiTietTinTuyenDung
                                    newsDetail={newsDetail}
                                    handleCloseSeeNow={handleSeeNow}
                                    handleLuuTin={handleLuuTin}
                                    handleChatNgay={handleChatNgay}
                                    handleUngTuyenNgay={handleUngTuyenNgay}
                                />
                            </div>

                        </div>
                    </div>

                    <div className={seeNow == false ? s.grid_item_1 : s.displayNone}>
                        <NhaTuyenDungOnline handleChatNgay={handleChatNgay} companyInfo={companyInfo} />
                        <MauCVXinViec listCv={listCv} seeNow={seeNow} />
                    </div>

                </div>

                <div>
                    <TuKhoaLienQuan keyTag={keyTag} />
                </div>

                <div className={s.box_news_2}>
                    <div className={s.grid_item_1}>
                        <HoTroTimViec handleTaoCv={handleTaoCv} />
                    </div>
                    <div className={s.grid_item_2}>
                        <Blog contentBlog={contentBlog} />
                    </div>
                </div>

            </div>

            <div>
                <div className={isOpenLetter ? s.modal_mask : s.displayNone}></div>
                <div className={isOpenLetter ? s.modal_wrap : s.displayNone}>
                    <div className={s.modal_rate}>
                        <div className={s.modal_content}>
                            <div className={s.title}>
                                <span>Bạn có muốn viết thư giới thiệu cho nhà tuyển dụng không ?</span>
                                <svg onClick={handleCloseLetter} style={{ zIndex: "1", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 22 22" fill="none">
                                    <rect width="1.43075" height="29.3304" rx="0.715376" transform="matrix(0.715183 0.698937 -0.715183 0.698937 20.9766 0)" fill="#474747" />
                                    <rect width="1.43075" height="29.3304" rx="0.715376" transform="matrix(-0.715183 0.698937 -0.715183 -0.698937 22 21)" fill="#474747" />
                                </svg>
                            </div>
                            <div className={s.letter_body}>
                                <span className={s.letter_body_title}>THƯ GIỚI THIỆU</span>
                                <textarea name="content" className={s.letter_body_content} placeholder={data.placeholderLetter}></textarea>
                            </div>

                            <div style={{ width: "469px", marginTop: "135px", display: "flex", justifyContent: "center" }} className={s.groupDiv}>
                                <div className={s.groupButton}>
                                    <button onClick={handleCloseLetter} className={s.cancelButton}>Hủy</button>
                                    <button onClick={handleGuiThuUngTuyen} className={s.button_ung_tuyen}>Ứng tuyển</button>
                                </div>
                            </div>

                            <div className={s.textThank}>Thanks for watching!</div>
                            <Image src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/letter.png"} alt={""} height={700} width={700} className={s.imageLetter}></Image>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className={seeNow ? s.modal_mask_1 : s.displayNone}></div>
                <div className={seeNow ? s.modal_wrap_1 : s.displayNone}>
                    <div className={s.modal_see_more}>
                        <div className={s.groupHeader}>
                            <div className={s.header}>
                                <span>{newsDetail?.titleModal}</span>
                                <svg onClick={() => handleSeeNow(false, 0)} style={{ marginRight: "auto", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <rect width="32" height="32" rx="16" fill="#F0F0F0" />
                                    <path d="M20.5281 22.7103L16 18.1822L11.4719 22.7103C11.2317 22.9505 10.9059 23.0855 10.5663 23.0855C10.2266 23.0855 9.90084 22.9505 9.66066 22.7103C9.42047 22.4702 9.28554 22.1444 9.28554 21.8047C9.28553 21.4651 9.42047 21.1393 9.66066 20.8991L14.1888 16.371L9.66065 11.8429C9.42047 11.6027 9.28553 11.2769 9.28553 10.9373C9.28553 10.5976 9.42047 10.2718 9.66065 10.0317C9.90084 9.79147 10.2266 9.65653 10.5663 9.65653C10.9059 9.65653 11.2317 9.79147 11.4719 10.0317L16 14.5598L20.5281 10.0317C20.7683 9.79147 21.0941 9.65653 21.4337 9.65653C21.7734 9.65653 22.0992 9.79147 22.3393 10.0317C22.5795 10.2718 22.7145 10.5976 22.7145 10.9373C22.7145 11.2769 22.5795 11.6027 22.3393 11.8429L17.8112 16.371L22.3393 20.8991C22.5795 21.1393 22.7145 21.4651 22.7145 21.8047C22.7145 22.1444 22.5795 22.4702 22.3393 22.7103C22.0992 22.9505 21.7734 23.0855 21.4337 23.0855C21.0941 23.0855 20.7683 22.9505 20.5281 22.7103Z" fill="#8B8B8B" />
                                </svg>
                            </div>

                            <div className={s.info}>
                                <div className={s.item_info}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M5.78125 9.98803C5.78125 10.848 6.44125 11.5414 7.26125 11.5414H8.93458C9.64792 11.5414 10.2279 10.9347 10.2279 10.188C10.2279 9.3747 9.87458 9.08803 9.34792 8.90137L6.66125 7.96803C6.13458 7.78137 5.78125 7.4947 5.78125 6.68137C5.78125 5.9347 6.36125 5.32803 7.07458 5.32803H8.74792C9.56792 5.32803 10.2279 6.02137 10.2279 6.88137" stroke="#474747" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8 4.43481V12.4348" stroke="#474747" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7.9987 15.1014C11.6806 15.1014 14.6654 12.1166 14.6654 8.43473C14.6654 4.75283 11.6806 1.76807 7.9987 1.76807C4.3168 1.76807 1.33203 4.75283 1.33203 8.43473C1.33203 12.1166 4.3168 15.1014 7.9987 15.1014Z" stroke="#474747" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {newsDetail?.infoContact?.salary}
                                </div>
                                <div className={s.item_info}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M7.99992 9.38827C9.14867 9.38827 10.0799 8.45702 10.0799 7.30827C10.0799 6.15952 9.14867 5.22827 7.99992 5.22827C6.85117 5.22827 5.91992 6.15952 5.91992 7.30827C5.91992 8.45702 6.85117 9.38827 7.99992 9.38827Z" stroke="#474747" />
                                        <path d="M2.41379 6.09473C3.72712 0.321401 12.2805 0.328068 13.5871 6.1014C14.3538 9.48807 12.2471 12.3547 10.4005 14.1281C9.06046 15.4214 6.94046 15.4214 5.59379 14.1281C3.75379 12.3547 1.64712 9.4814 2.41379 6.09473Z" stroke="#474747" />
                                    </svg>
                                    {newsDetail?.infoContact?.city}
                                </div>
                                <div className={s.item_info}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M14 9.16666C14 12.4804 11.3137 15.1667 8 15.1667C4.68629 15.1667 2 12.4804 2 9.16666C2 5.85295 4.68629 3.16666 8 3.16666C11.3137 3.16666 14 5.85295 14 9.16666Z" stroke="#474747" />
                                        <path d="M8 9.16667V6.5" stroke="#474747" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.66675 1.83334H9.33341" stroke="#474747" strokeLinecap="round" />
                                    </svg>
                                    {newsDetail?.infoContact?.time}
                                </div>
                            </div>

                            <div className={s.group_button_info}>
                                <div className={s.group_button}>
                                    <button className={s.buttonChat} onClick={handleChatNgay}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <path d="M13.485 8.09251V11.0925C13.485 11.2875 13.4775 11.475 13.455 11.655C13.2825 13.68 12.09 14.685 9.8925 14.685H9.59251C9.40501 14.685 9.225 14.775 9.1125 14.925L8.21251 16.125C7.81501 16.6575 7.17 16.6575 6.7725 16.125L5.87249 14.925C5.77499 14.7975 5.5575 14.685 5.3925 14.685H5.09251C2.70001 14.685 1.5 14.0925 1.5 11.0925V8.09251C1.5 5.89501 2.51251 4.70251 4.53001 4.53001C4.71001 4.50751 4.89751 4.5 5.09251 4.5H9.8925C12.285 4.5 13.485 5.70001 13.485 8.09251Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.485 5.09251V8.09251C16.485 10.2975 15.4725 11.4825 13.455 11.655C13.4775 11.475 13.485 11.2875 13.485 11.0925V8.09251C13.485 5.70001 12.285 4.5 9.89252 4.5H5.09253C4.89753 4.5 4.71003 4.50751 4.53003 4.53001C4.70253 2.51251 5.89503 1.5 8.09253 1.5H12.8925C15.285 1.5 16.485 2.70001 16.485 5.09251Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.1216 9.9375H10.1284" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7.49662 9.9375H7.50337" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4.87162 9.9375H4.87837" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Chat ngay
                                    </button>
                                    <button className={s.buttonBlue} onClick={handleUngTuyenNgay}>Ứng tuyển</button>
                                    <button className={s.buttonSave} onClick={handleLuuTin}>Lưu tin</button>
                                </div>
                                <span className={s.chi_tiet_tin}>Chi tiết tin đăng {`>`}</span>
                            </div>
                        </div>
                        <div className={s.group_info_text}>
                            {newsDetail?.infoDetail?.map((item: any, index: any) => {
                                return (
                                    <div key={index} className={s.item_info_text}>
                                        <div className={s.title}>{item.title}</div>
                                        <pre className={s.content}>{item.content}</pre>
                                    </div>
                                )
                            })}
                            <div className={s.item_info_text}>
                                <div className={s.title}>Thông tin liên hệ</div>
                                <div className={s.content}>Tên người liên hệ: {newsDetail?.infoContact?.name}</div>
                                <div className={s.content}>Địa chỉ liên hệ: {newsDetail?.infoContact?.address}</div>
                                <div className={s.content}>Số điện thoại liên hệ: {newsDetail?.infoContact?.phone}</div>
                                <div className={s.content}>Email liên hệ: {newsDetail?.infoContact?.email}</div>
                            </div>

                            <div className={s.item_info_text}>
                                <div className={s.title}>Địa điểm làm việc</div>
                                <div className={s.group_content}>
                                    <div className={s.city}>Tỉnh thành: <div className={s.tag}>{newsDetail?.infoContact?.city}</div></div>
                                    <div className={s.district}>Quận huyện: <div className={s.tag}>{newsDetail?.infoContact?.district}</div></div>
                                </div>
                                <div className={s.content_1}>
                                    <div className={s.text_1}>Địa chỉ chi tiết:</div>
                                    <div className={s.text_2}>{newsDetail?.infoContact?.addressDetail}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}