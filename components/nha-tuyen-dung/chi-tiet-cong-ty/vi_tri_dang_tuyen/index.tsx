import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import ContentEditable from 'react-contenteditable';
import { Modal, Tabs } from 'antd';
import { listMucLuongFilter, city_array, formatDateDifference, getHanNop, array_muc_luong, handleImageSource } from "@/functions/functions";

import s from './styles.module.scss';
import Link from "next/link";

const ViTriDangTuyen = ({
    workInfo, handleChatNgay, handleUngTuyenNgay,
}
    :
    {
        workInfo: any; handleChatNgay: any; handleUngTuyenNgay: any
    }) => {

    console.log('>>> check vi tri dang tuyen: ', workInfo);

    return (
        <div className={s.job_detail_box_7}>
            <div className={s.title}>
                <span>Vị trí đang tuyển</span>
            </div>
            <div className={s.list_suggest}>
                {workInfo?.map((item: any, index: any) => (
                    <div key={index} className={s.item}>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="33" height="35" viewBox="0 0 33 35" fill="none">
                            <path d="M17.1263 0.527284C16.9171 0.325242 16.7352 0.153333 16.5842 0C16.4319 0.153333 16.2496 0.325242 16.04 0.527284C13.5063 2.9319 6.95809 8.53033 0.578613 8.91187C0.578613 8.91187 3.51207 27.3114 16.3482 34.8652C16.4275 34.91 16.5047 34.9553 16.5842 35C16.6618 34.9553 16.7412 34.91 16.8188 34.8652C29.6548 27.3114 32.5903 8.91187 32.5903 8.91187C26.2084 8.53033 19.6626 2.9319 17.1263 0.527284Z" fill="url(#paint0_linear_2631_8441)" fillOpacity="0.82" />
                            <path d="M17.1096 1.04337C16.9066 0.847388 16.7304 0.68079 16.5839 0.532196C16.4361 0.68079 16.2595 0.847578 16.0561 1.04337C13.5996 3.37482 7.25058 8.80305 1.06494 9.17302C1.06494 9.17302 3.90909 27.013 16.3548 34.3374C16.4318 34.381 16.5065 34.4246 16.5839 34.468C16.6591 34.4244 16.7363 34.3808 16.8114 34.3374C29.2572 27.013 32.1032 9.17302 32.1032 9.17302C25.9155 8.80305 19.5687 3.37482 17.1096 1.04337Z" fill="url(#paint1_linear_2631_8441)" fillOpacity="0.82" />
                            <path d="M17.0934 1.58428C16.897 1.39474 16.7267 1.23364 16.5851 1.08978C16.4422 1.23364 16.2713 1.39474 16.0747 1.58428C13.6988 3.83916 7.55843 9.08885 1.57617 9.44669C1.57617 9.44669 4.32679 26.7005 16.3636 33.7843C16.438 33.8264 16.5105 33.8686 16.5851 33.9105C16.6577 33.8686 16.7324 33.8264 16.8052 33.7843C28.8418 26.7005 31.5942 9.44669 31.5942 9.44669C25.6098 9.08885 19.4714 3.83916 17.0934 1.58428Z" fill="url(#paint2_linear_2631_8441)" fillOpacity="0.82" />
                            <path d="M17.075 2.12502C16.8852 1.94193 16.7207 1.78614 16.5839 1.6474C16.4458 1.78614 16.2808 1.94193 16.0908 2.12502C13.7955 4.30314 7.86403 9.37449 2.08496 9.72039C2.08496 9.72039 4.74224 26.3878 16.3699 33.2309C16.4419 33.2716 16.5116 33.3126 16.5839 33.3531C16.6539 33.3126 16.726 33.2716 16.7966 33.2309C28.4241 26.388 31.0834 9.72039 31.0834 9.72039C25.3021 9.37468 19.3725 4.30314 17.075 2.12502Z" fill="url(#paint3_linear_2631_8441)" fillOpacity="0.82" stroke="url(#paint4_linear_2631_8441)" strokeMiterlimit="10" />
                            <path d="M17.0714 2.21971C16.8829 2.03776 16.7195 1.8831 16.5833 1.74512C16.4461 1.8831 16.282 2.03795 16.0933 2.21971C13.8121 4.38437 7.91714 9.42463 2.17383 9.76826C2.17383 9.76826 4.8146 26.3329 16.3707 33.1337C16.4422 33.1741 16.5117 33.2147 16.5834 33.2554C16.653 33.2147 16.7248 33.1741 16.7947 33.1337C28.3503 26.3329 30.9931 9.76826 30.9931 9.76826C25.2477 9.42463 19.3546 4.38456 17.0714 2.21971Z" fill="url(#paint5_linear_2631_8441)" fillOpacity="0.82" />
                            <path d="M17.0632 2.45231C16.8774 2.27302 16.7166 2.12082 16.5826 1.98492C16.4474 2.12082 16.2858 2.27302 16.0999 2.45231C13.8534 4.58419 8.04811 9.54769 2.39209 9.88601C2.39209 9.88601 4.9927 26.1988 16.3731 32.8963C16.4437 32.9359 16.512 32.9763 16.5826 33.0157C16.6511 32.9763 16.7218 32.9359 16.7907 32.8963C28.1708 26.199 30.7734 9.88601 30.7734 9.88601C25.1155 9.54769 19.3117 4.58419 17.0632 2.45231Z" fill="url(#paint6_linear_2631_8441)" fillOpacity="0.82" />
                            <path d="M17.1076 3.45989C17.1076 3.7584 16.8736 4.00044 16.5845 4.00044C16.2957 4.00044 16.0615 3.7584 16.0615 3.45989C16.0615 3.16137 16.2957 2.91934 16.5845 2.91934C16.8734 2.91934 17.1076 3.16118 17.1076 3.45989Z" fill="white" />
                            <path d="M3.79897 10.5367C3.79897 10.8352 3.56497 11.0772 3.27595 11.0772C2.98711 11.0772 2.75293 10.8352 2.75293 10.5367C2.75293 10.2382 2.98711 9.99615 3.27595 9.99615C3.56478 9.99615 3.79897 10.2382 3.79897 10.5367Z" fill="white" />
                            <path d="M30.1058 10.5367C30.1058 10.8352 29.8716 11.0772 29.5826 11.0772C29.2938 11.0772 29.0596 10.8352 29.0596 10.5367C29.0596 10.2382 29.2938 9.99615 29.5826 9.99615C29.8714 9.99615 30.1058 10.2382 30.1058 10.5367Z" fill="white" />
                            <path d="M16.585 30.3606C16.4145 30.3606 16.2764 30.5192 16.2764 30.7152C16.2764 30.911 16.585 32.015 16.585 32.015C16.585 32.015 16.8938 30.911 16.8938 30.7152C16.8937 30.5192 16.7552 30.3606 16.585 30.3606ZM17.5043 30.7484C17.3604 30.6542 17.1612 30.7123 17.0602 30.8778C16.9591 31.0431 16.6501 32.1473 16.6501 32.1473C16.6501 32.1473 17.4812 31.3839 17.5823 31.218C17.6833 31.0527 17.6485 30.8422 17.5043 30.7484ZM15.6657 30.7484C15.5214 30.8424 15.4865 31.0527 15.5876 31.218C15.6886 31.3839 16.5197 32.1473 16.5197 32.1473C16.5197 32.1473 16.2107 31.0431 16.1097 30.8778C16.0086 30.7122 15.8097 30.6542 15.6657 30.7484Z" fill="white" />
                            <path d="M19.0685 7.57062C19.0502 7.59909 18.2712 8.39075 18.2712 8.39075L13.2881 18.9997L17.7239 17.5537L14.2455 26.5994L15.6522 25.1456L22.5265 12.9737L17.5356 14.495L19.0685 7.57062Z" fill="#B3D7FB" />
                            <path d="M18.2711 8.39075C18.1974 8.50525 11.8813 20.4535 11.8813 20.4535L16.3171 19.0075L14.2454 26.5994L21.2631 14.3841L16.1292 15.9491L18.2711 8.39075Z" fill="white" />
                            <defs>
                                <linearGradient id="paint0_linear_2631_8441" x1="16.5844" y1="0" x2="16.5844" y2="35" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#AAD5FF" />
                                    <stop offset="0.21875" stopColor="#377ABB" />
                                    <stop offset="0.458333" stopColor="#377ABB" />
                                    <stop offset="0.71875" stopColor="#6EACE8" />
                                    <stop offset="1" stopColor="#075CAF" />
                                </linearGradient>
                                <linearGradient id="paint1_linear_2631_8441" x1="16.584" y1="0.532196" x2="16.584" y2="34.468" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#AAD5FF" />
                                    <stop offset="0.21875" stopColor="#377ABB" />
                                    <stop offset="0.458333" stopColor="#377ABB" />
                                    <stop offset="0.71875" stopColor="#6EACE8" />
                                    <stop offset="1" stopColor="#075CAF" />
                                </linearGradient>
                                <linearGradient id="paint2_linear_2631_8441" x1="16.5852" y1="1.08978" x2="16.5852" y2="33.9105" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#AAD5FF" />
                                    <stop offset="0.21875" stopColor="#377ABB" />
                                    <stop offset="0.458333" stopColor="#377ABB" />
                                    <stop offset="0.71875" stopColor="#6EACE8" />
                                    <stop offset="1" stopColor="#075CAF" />
                                </linearGradient>
                                <linearGradient id="paint3_linear_2631_8441" x1="16.5842" y1="1.6474" x2="16.5842" y2="33.3531" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#AAD5FF" />
                                    <stop offset="0.21875" stopColor="#377ABB" />
                                    <stop offset="0.458333" stopColor="#377ABB" />
                                    <stop offset="0.71875" stopColor="#6EACE8" />
                                    <stop offset="1" stopColor="#075CAF" />
                                </linearGradient>
                                <linearGradient id="paint4_linear_2631_8441" x1="1.97797" y1="17.4881" x2="31.1904" y2="17.4881" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.0056" stopColor="#DEE3E6" />
                                    <stop offset="0.2528" stopColor="#FFFDE5" />
                                    <stop offset="0.3953" stopColor="#F0ECD8" />
                                    <stop offset="0.5955" stopColor="#D6CDC1" />
                                    <stop offset="0.7865" stopColor="#EDEDEE" />
                                    <stop offset="1" stopColor="#D8D5BB" />
                                </linearGradient>
                                <linearGradient id="paint5_linear_2631_8441" x1="16.5834" y1="1.74512" x2="16.5834" y2="33.2554" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#AAD5FF" />
                                    <stop offset="0.21875" stopColor="#377ABB" />
                                    <stop offset="0.458333" stopColor="#377ABB" />
                                    <stop offset="0.71875" stopColor="#6EACE8" />
                                    <stop offset="1" stopColor="#075CAF" />
                                </linearGradient>
                                <linearGradient id="paint6_linear_2631_8441" x1="16.5827" y1="1.98492" x2="16.5827" y2="33.0157" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#AAD5FF" />
                                    <stop offset="0.21875" stopColor="#377ABB" />
                                    <stop offset="0.458333" stopColor="#377ABB" />
                                    <stop offset="0.71875" stopColor="#6EACE8" />
                                    <stop offset="1" stopColor="#075CAF" />
                                </linearGradient>
                            </defs>
                        </svg> */}
                        <div className={s.content}>
                            <div className={s.contentLeft}>
                                <div className={s.image_logo}>
                                    {/* <Image src={item?.url || "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/avatar_cty.svg"} alt={""} width={90} height={90} style={{ width: "90px", height: "90px", borderRadius: "50%" }}></Image> */}
                                    <Image src={handleImageSource(item?.usc_logo) || ''} alt={""} width={90} height={90} style={{ width: "90px", height: "90px", borderRadius: "50%" }}></Image>
                                    {/* <div className={s.status_online}></div> */}
                                </div>

                                <div className={s.detail}>
                                    <Link href={`/${item?.new_alias}-${item?.new_id}.html`}>
                                        <span className={s.detail_1}>
                                            {item?.new_title}
                                        </span>
                                    </Link>

                                    <span className={s.detail_2}>
                                        {item?.usc_company}
                                    </span>
                                    <div className={s.list_tag}>

                                        <div className={s.tag}>
                                            <span className={s.text}>{city_array.find((city) => city?.cit_id == item?.new_city)?.cit_name}</span>
                                        </div>

                                        <div className={s.tag}>
                                            <span className={s.text}>{listMucLuongFilter.find((salary) => salary?.value == item?.new_money)?.label}</span>
                                        </div>

                                        <div className={s.tag}>
                                            <span className={s.text}>Cập nhật: {formatDateDifference(new Date(item.new_update_time * 1000), new Date())}</span>
                                        </div>

                                        <div className={s.tag}>
                                            <span className={s.text}>{getHanNop(item.new_han_nop)}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className={s.contentRight}>
                                {item?.checkUngTuyen ?
                                    <div className={s.buttonBlue}>Bạn đã ứng tuyển công việc này</div>
                                    :
                                    <button className={s.buttonBlue} onClick={() => handleUngTuyenNgay(item?.new_id)}>
                                        Ứng tuyển
                                    </button>
                                }
                                {/* <button className={s.buttonChat} onClick={handleChatNgay}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M11.9868 7.19334V9.86001C11.9868 10.0333 11.9802 10.2 11.9602 10.36C11.8068 12.16 10.7468 13.0533 8.7935 13.0533H8.52684C8.36017 13.0533 8.20016 13.1333 8.10016 13.2667L7.30017 14.3333C6.94684 14.8067 6.3735 14.8067 6.02016 14.3333L5.22015 13.2667C5.13349 13.1533 4.94016 13.0533 4.7935 13.0533H4.52684C2.40017 13.0533 1.3335 12.5267 1.3335 9.86001V7.19334C1.3335 5.24001 2.2335 4.18001 4.02684 4.02667C4.18684 4.00667 4.3535 4 4.52684 4H8.7935C10.9202 4 11.9868 5.06667 11.9868 7.19334Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14.6535 4.52667V7.19333C14.6535 9.15333 13.7535 10.2067 11.9602 10.36C11.9802 10.2 11.9869 10.0333 11.9869 9.86V7.19333C11.9869 5.06667 10.9202 3.99999 8.79352 3.99999H4.52686C4.35352 3.99999 4.18686 4.00667 4.02686 4.02667C4.18019 2.23333 5.24019 1.33333 7.19352 1.33333H11.4602C13.5869 1.33333 14.6535 2.4 14.6535 4.52667Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8.99684 8.83333H9.00284" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.66383 8.83333H6.66983" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4.33033 8.83333H4.33633" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Chat</span>
                                </button> */}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div >
    )
}

export default ViTriDangTuyen;