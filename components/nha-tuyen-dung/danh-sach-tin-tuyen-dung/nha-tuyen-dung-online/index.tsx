import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import s from './styles.module.scss';
import { handleImageSource } from "@/functions/functions";

const NhaTuyenDungOnline = ({ handleChatNgay, companyInfo }: { handleChatNgay: any; companyInfo: any; }) => {

    return (
        <div className={s.list_news_box_1}>
            <div className={s.border_box}>
                <div className={s.title}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                        <path d="M0.86084 7.99953C0.86084 9.14778 1.89427 10.0775 3.17092 10.0775C4.44634 10.0775 11.6383 7.99953 11.6383 7.99953C11.6383 7.99953 4.44634 5.92033 3.17092 5.92033C1.89427 5.92156 0.86084 6.85375 0.86084 7.99953ZM3.38701 1.81009C2.77338 2.77932 3.1524 4.12017 4.23027 4.80048C5.30691 5.48078 12.5001 7.5612 12.5001 7.5612C12.5001 7.5612 7.52687 1.96566 6.44653 1.28535C5.36989 0.605047 3.99817 0.839639 3.38701 1.81009ZM3.38701 14.189C3.99941 15.1607 5.36989 15.3952 6.44653 14.7149C7.52687 14.0346 12.5001 8.43906 12.5001 8.43906C12.5001 8.43906 5.30691 10.5195 4.23027 11.1998C3.15117 11.8801 2.77338 13.2197 3.38701 14.189Z" fill="#3582CD" />
                    </svg>
                    <span>NHÀ TUYỂN DỤNG ONLINE</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                        <path d="M12.1392 7.99953C12.1392 9.14778 11.1057 10.0775 9.82908 10.0775C8.55366 10.0775 1.36168 7.99953 1.36168 7.99953C1.36168 7.99953 8.55366 5.92033 9.82908 5.92033C11.1057 5.92156 12.1392 6.85375 12.1392 7.99953ZM9.61299 1.81009C10.2266 2.77932 9.8476 4.12017 8.76973 4.80048C7.69309 5.48078 0.499877 7.5612 0.499877 7.5612C0.499877 7.5612 5.47313 1.96566 6.55347 1.28535C7.63011 0.605047 9.00183 0.839639 9.61299 1.81009ZM9.61299 14.189C9.00059 15.1607 7.63011 15.3952 6.55347 14.7149C5.47313 14.0346 0.499877 8.43906 0.499877 8.43906C0.499877 8.43906 7.69309 10.5195 8.76973 11.1998C9.84883 11.8801 10.2266 13.2197 9.61299 14.189Z" fill="#3582CD" />
                    </svg>
                </div>

                {companyInfo?.map((item: any, index: any) => {
                    return (
                        <div key={index} className={s.item_ntd}>
                            <div className={s.avatar}>
                                <Image src={handleImageSource(item.url) || "/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/avatar.svg"} alt={""} height={48} width={48} ></Image>
                                <div className={s.isOnline}></div>
                            </div>

                            <div className={s.groupInFo}>
                                <div className={s.text_title}>{item.name}</div>
                                <div className={s.text_2}>{item.address}</div>
                                <div className={`${s.text_2} ${s.text_3}`}>{item.title}</div>
                            </div>

                            <button className={s.buttonChat} onClick={handleChatNgay}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M11.9868 7.19334V9.86001C11.9868 10.0333 11.9802 10.2 11.9602 10.36C11.8068 12.16 10.7468 13.0533 8.7935 13.0533H8.52684C8.36017 13.0533 8.20016 13.1333 8.10016 13.2667L7.30017 14.3333C6.94684 14.8067 6.3735 14.8067 6.02016 14.3333L5.22015 13.2667C5.13349 13.1533 4.94016 13.0533 4.7935 13.0533H4.52684C2.40017 13.0533 1.3335 12.5267 1.3335 9.86001V7.19334C1.3335 5.24001 2.2335 4.18001 4.02684 4.02667C4.18684 4.00667 4.3535 4 4.52684 4H8.7935C10.9202 4 11.9868 5.06667 11.9868 7.19334Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.6535 4.52667V7.19333C14.6535 9.15333 13.7535 10.2067 11.9602 10.36C11.9802 10.2 11.9869 10.0333 11.9869 9.86V7.19333C11.9869 5.06667 10.9202 3.99999 8.79352 3.99999H4.52686C4.35352 3.99999 4.18686 4.00667 4.02686 4.02667C4.18019 2.23333 5.24019 1.33333 7.19352 1.33333H11.4602C13.5869 1.33333 14.6535 2.4 14.6535 4.52667Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8.99684 8.83333H9.00284" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.66383 8.83333H6.66983" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4.33033 8.83333H4.33633" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    )
                })}

            </div>

        </div >
    )
}

export default NhaTuyenDungOnline;
