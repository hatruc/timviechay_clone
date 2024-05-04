import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { Carousel, Card } from 'antd';

import s from './styles.module.scss';
import { handleImageSource } from "@/functions/functions";

const MauCVXinViec = ({ listCv, seeNow }: { listCv: any; seeNow: any; }) => {
    const carouselRef = useRef<any>(null);
    const [screenWidth, setScreenWidth] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3);
    useEffect(() => {
        const updateScreenWidth = () => {
            setScreenWidth(window.innerWidth);
        };

        updateScreenWidth();
        window.addEventListener('resize', updateScreenWidth);
        return () => {
            window.removeEventListener('resize', updateScreenWidth);
        };
    }, []);

    useEffect(() => {
        if (screenWidth < 1366) {
            setSlidesToShow(3);
        }
        else {
            setSlidesToShow(1);
        }
    }, [screenWidth]);

    return (
        <div className={s.list_news_box_2}>
            <div className={s.border_box}>
                <div className={s.title}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                        <path d="M0.86084 7.99953C0.86084 9.14778 1.89427 10.0775 3.17092 10.0775C4.44634 10.0775 11.6383 7.99953 11.6383 7.99953C11.6383 7.99953 4.44634 5.92033 3.17092 5.92033C1.89427 5.92156 0.86084 6.85375 0.86084 7.99953ZM3.38701 1.81009C2.77338 2.77932 3.1524 4.12017 4.23027 4.80048C5.30691 5.48078 12.5001 7.5612 12.5001 7.5612C12.5001 7.5612 7.52687 1.96566 6.44653 1.28535C5.36989 0.605047 3.99817 0.839639 3.38701 1.81009ZM3.38701 14.189C3.99941 15.1607 5.36989 15.3952 6.44653 14.7149C7.52687 14.0346 12.5001 8.43906 12.5001 8.43906C12.5001 8.43906 5.30691 10.5195 4.23027 11.1998C3.15117 11.8801 2.77338 13.2197 3.38701 14.189Z" fill="#3582CD" />
                    </svg>
                    <span>MẪU CV XIN VIỆC</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                        <path d="M12.1392 7.99953C12.1392 9.14778 11.1057 10.0775 9.82908 10.0775C8.55366 10.0775 1.36168 7.99953 1.36168 7.99953C1.36168 7.99953 8.55366 5.92033 9.82908 5.92033C11.1057 5.92156 12.1392 6.85375 12.1392 7.99953ZM9.61299 1.81009C10.2266 2.77932 9.8476 4.12017 8.76973 4.80048C7.69309 5.48078 0.499877 7.5612 0.499877 7.5612C0.499877 7.5612 5.47313 1.96566 6.55347 1.28535C7.63011 0.605047 9.00183 0.839639 9.61299 1.81009ZM9.61299 14.189C9.00059 15.1607 7.63011 15.3952 6.55347 14.7149C5.47313 14.0346 0.499877 8.43906 0.499877 8.43906C0.499877 8.43906 7.69309 10.5195 8.76973 11.1998C9.84883 11.8801 10.2266 13.2197 9.61299 14.189Z" fill="#3582CD" />
                    </svg>
                </div>

                <div className={s.item_cv}>
                    <Carousel key={seeNow} ref={carouselRef} slidesToShow={slidesToShow} autoplay={false} dots={false} style={{ width: "100%", display: "flex" }}>
                        {listCv?.map((item: any, index: any) => {
                            return (
                                <a href={item.link || "#"} key={index} className={s.group_image_listCv}>
                                    <Image src={handleImageSource(item.url) || "/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/cv_image.png"} alt={""} width={276} height={349} className={s.image_listCv}></Image>
                                </a>
                            )
                        })}
                    </Carousel>
                    <button className={s.button_carousel_left} onClick={() => carouselRef.current.prev()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="45" viewBox="0 0 24 45" fill="none">
                            <path d="M24 20C24 8.9543 15.0457 0 4 0H0V45H4C15.0457 45 24 36.0457 24 25V20Z" fill="white" fillOpacity="0.77" />
                            <path d="M11.4147 16.2573L5.20276 22.0198C5.12903 22.0884 5.07693 22.1627 5.04645 22.2427C5.01548 22.3228 5 22.4085 5 22.5C5 22.5915 5.01548 22.6772 5.04645 22.7573C5.07693 22.8373 5.12903 22.9116 5.20276 22.9802L11.4147 28.7599C11.5868 28.92 11.8018 29 12.0599 29C12.318 29 12.5392 28.9142 12.7235 28.7427C12.9078 28.5712 13 28.3712 13 28.1425C13 27.9138 12.9078 27.7137 12.7235 27.5422L7.30415 22.5L12.7235 17.4578C12.8955 17.2977 12.9816 17.1006 12.9816 16.8664C12.9816 16.6318 12.8894 16.4288 12.7051 16.2573C12.5207 16.0858 12.3057 16 12.0599 16C11.8141 16 11.5991 16.0858 11.4147 16.2573Z" fill="#2767A5" fillOpacity="0.8" />
                        </svg>
                    </button>
                    <button className={s.button_carousel_right} onClick={() => carouselRef.current.next()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="45" viewBox="0 0 24 45" fill="none">
                            <path d="M0 20C0 8.9543 8.9543 0 20 0H24V45H20C8.95431 45 0 36.0457 0 25V20Z" fill="white" fillOpacity="0.77" />
                            <path d="M12.5853 16.2573L18.7972 22.0198C18.871 22.0884 18.9231 22.1627 18.9535 22.2427C18.9845 22.3228 19 22.4085 19 22.5C19 22.5915 18.9845 22.6772 18.9535 22.7573C18.9231 22.8373 18.871 22.9116 18.7972 22.9802L12.5853 28.7599C12.4132 28.92 12.1982 29 11.9401 29C11.682 29 11.4608 28.9142 11.2765 28.7427C11.0922 28.5712 11 28.3712 11 28.1425C11 27.9138 11.0922 27.7137 11.2765 27.5422L16.6959 22.5L11.2765 17.4578C11.1045 17.2977 11.0184 17.1006 11.0184 16.8664C11.0184 16.6318 11.1106 16.4288 11.2949 16.2573C11.4793 16.0858 11.6943 16 11.9401 16C12.1859 16 12.4009 16.0858 12.5853 16.2573Z" fill="#2767A5" fillOpacity="0.8" />
                        </svg>
                    </button>
                </div>

                <a href="#" className={s.footer_cv}>Xem tất cả mẫu CV xin việc {`>>`}</a>

            </div>

            <div className={s.downloadApp}>
                <div className={s.txt_download}>Tải ngay ứng dụng TIMVIEC và CV để trải nghiệm tốt nhất</div>
                <div className={s.groupButton}>
                    <button className={s.buttonTimViec}>
                        <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/down_1.png"} alt={""} height={35} width={35} style={{ height: "35px", width: "35px" }}></Image>
                        <span>Tải app Timviec</span>
                    </button>
                    <button className={s.buttonCV}>
                        <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/down_2.png"} alt={""} height={35} width={35} style={{ height: "35px", width: "35px" }}></Image>
                        <span>Tải app CV</span>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default MauCVXinViec;
