import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { Radio, Popover, Select } from 'antd';

import s from './styles.module.scss';
import { checkLoginServerSide, city_array, getDate, getDistrict, getDistrictName, getMucLuong } from "@/functions/functions";
import { useRouter } from "next/router";
import Link from "next/link";
import { NextPageContext } from "next";
import { setCookie } from "cookies-next";

const ChiTietTinTuyenDung = ({
    newsDetail,
    handleCloseSeeNow,
    handleLuuTin,
    handleUngTuyenNgay,
    handleChatNgay,
}: {
    newsDetail: any;
    handleCloseSeeNow: any;
    handleLuuTin: any;
    handleUngTuyenNgay: any;
    handleChatNgay: any;
}) => {
    // console.log('newsDetail', newsDetail);
    const router = useRouter();
    // const navigateToAbout = (link: string) => {
    //     router.push({
    //         pathname: link,
    //     })
    // }


    const [districts, setDisticts] = useState<any>();
    const [listDistrictText, setListDistrictText] = useState<any>([]);

    const handleFirstUT = async (id: any) => {
        const context: NextPageContext = {} as NextPageContext;
        const isLoggedIn = checkLoginServerSide(context, 2);
        if (isLoggedIn) {
        } else {
            setCookie("urlUt", router.asPath)
            handleUngTuyenNgay(id)
        }
    };

    const listCityText = (listCity: any) => {
        const textCitys: any = []
        const listDisctrict: any = [];
        if (listCity.includes(0)) return 'Toàn quốc'
        listCity.map((c: any) => {
            listDisctrict.push(getDistrict(c))
            city_array.map((city: any) => {
                if (city.cit_id == c) {
                    if (textCitys.length == 0) {
                        textCitys.push(city.cit_name)
                    } else {
                        let addSpace = ", " + city.cit_name
                        textCitys.push(addSpace)
                    }
                }

            })
        });
        return textCitys
    }


    const getDistrictText = (listDistrictNumber: any) => {
        const textDistricts: any = []
        const listDisctrict: any = [];
        // newsDetail?.city.map((c: any) => {
        //     listDisctrict.push(getDistrict(c))
        // });
        listDistrictNumber.map((num: any) => {
            // listDisctrict.map((dis: any) => {
            //     if(dis.value == _) {
            //         if(textDistricts.length == 0) {
            //             textDistricts.push(dis.label)    
            //         } else {
            //             let addSpace = "," + dis.label
            //             textDistricts.push(addSpace)  
            //         }
            //     }
            // })
            if (textDistricts.length == 0) {
                textDistricts.push(getDistrictName(Number(num)))
            } else {
                let addSpace = ", " + getDistrictName((Number(num)))
                textDistricts.push(addSpace)
            }
        })
        return textDistricts
    }


    return (
        <div className={s.modal_see_more} style={{
            position: 'sticky',
            top: '20px'
        }}>
            <div className={s.groupHeader}>
                <div className={s.header}>
                    <span>{newsDetail?.new_title}</span>
                    <svg
                        onClick={() => { handleCloseSeeNow(false, 0) }}
                        style={{
                            marginRight: "auto",
                            cursor: "pointer"
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                    >
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
                        {getMucLuong(newsDetail?.new_money_type, newsDetail?.new_money_from, newsDetail?.new_money_to, newsDetail?.new_money)}
                    </div>
                    <div className={s.item_info}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M7.99992 9.38827C9.14867 9.38827 10.0799 8.45702 10.0799 7.30827C10.0799 6.15952 9.14867 5.22827 7.99992 5.22827C6.85117 5.22827 5.91992 6.15952 5.91992 7.30827C5.91992 8.45702 6.85117 9.38827 7.99992 9.38827Z" stroke="#474747" />
                            <path d="M2.41379 6.09473C3.72712 0.321401 12.2805 0.328068 13.5871 6.1014C14.3538 9.48807 12.2471 12.3547 10.4005 14.1281C9.06046 15.4214 6.94046 15.4214 5.59379 14.1281C3.75379 12.3547 1.64712 9.4814 2.41379 6.09473Z" stroke="#474747" />
                        </svg>
                        {newsDetail?.new_city && listCityText(newsDetail?.new_city.split(',').map(Number))}
                    </div>
                    <div className={s.item_info}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M14 9.16666C14 12.4804 11.3137 15.1667 8 15.1667C4.68629 15.1667 2 12.4804 2 9.16666C2 5.85295 4.68629 3.16666 8 3.16666C11.3137 3.16666 14 5.85295 14 9.16666Z" stroke="#474747" />
                            <path d="M8 9.16667V6.5" stroke="#474747" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6.66675 1.83334H9.33341" stroke="#474747" strokeLinecap="round" />
                        </svg>
                        {getDate(newsDetail?.new_update_time)}
                    </div>
                </div>

                <div className={s.group_button_info}>
                    <div className={s.group_button}>
                        {/* <button className={s.buttonChat} onClick={handleChatNgay}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M13.485 8.09251V11.0925C13.485 11.2875 13.4775 11.475 13.455 11.655C13.2825 13.68 12.09 14.685 9.8925 14.685H9.59251C9.40501 14.685 9.225 14.775 9.1125 14.925L8.21251 16.125C7.81501 16.6575 7.17 16.6575 6.7725 16.125L5.87249 14.925C5.77499 14.7975 5.5575 14.685 5.3925 14.685H5.09251C2.70001 14.685 1.5 14.0925 1.5 11.0925V8.09251C1.5 5.89501 2.51251 4.70251 4.53001 4.53001C4.71001 4.50751 4.89751 4.5 5.09251 4.5H9.8925C12.285 4.5 13.485 5.70001 13.485 8.09251Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.485 5.09251V8.09251C16.485 10.2975 15.4725 11.4825 13.455 11.655C13.4775 11.475 13.485 11.2875 13.485 11.0925V8.09251C13.485 5.70001 12.285 4.5 9.89252 4.5H5.09253C4.89753 4.5 4.71003 4.50751 4.53003 4.53001C4.70253 2.51251 5.89503 1.5 8.09253 1.5H12.8925C15.285 1.5 16.485 2.70001 16.485 5.09251Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.1216 9.9375H10.1284" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7.49662 9.9375H7.50337" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4.87162 9.9375H4.87837" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Chat ngay
                        </button> */}

                        {newsDetail?.checkUngTuyen ?
                            <button className={s.buttonBlue} style={{ whiteSpace: 'nowrap' }}>Đã ứng tuyển</button>
                            :
                            <button className={s.buttonBlue} onClick={() => handleFirstUT(newsDetail?.new_id)}>
                                Ứng tuyển
                            </button>
                        }

                        {newsDetail?.checkLuuTin ?
                            <div className={s.buttonSave}>
                                Đã lưu
                            </div>
                            :
                            <button className={s.buttonSave} onClick={() => handleLuuTin(newsDetail?.new_id)}>
                                Lưu tin
                            </button>
                        }
                    </div>
                    <Link href={`/${newsDetail?.new_alias}-${newsDetail?.new_id}.html`} className={s.chi_tiet_tin}
                    >Chi tiết tin đăng {`>`}</Link>
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
                    <div className={s.content}>Tên người liên hệ: {newsDetail?.new_usercontact ? newsDetail?.new_usercontact : 'Chưa cập nhật'}</div>
                    <div className={s.content}>Địa chỉ liên hệ: {newsDetail?.new_addcontact ? newsDetail?.new_addcontact : 'Chưa cập nhật'}</div>
                    <div className={s.content}>Số điện thoại liên hệ: {newsDetail?.new_phonecontact ? newsDetail?.new_phonecontact : 'Chưa cập nhật'}</div>
                    <div className={s.content}>Email liên hệ: {newsDetail?.new_emailcontact ? newsDetail?.new_emailcontact : 'Chưa cập nhật'}</div>
                </div>

                <div className={s.item_info_text}>
                    <div className={s.title}>Địa điểm làm việc</div>
                    <div className={s.group_content} style={{ flexDirection: 'column' }}>
                        <div className={s.city}>Tỉnh thành: <div className={s.tag}>{newsDetail?.new_city && listCityText(newsDetail?.new_city.split(',').map(Number))}</div></div>
                        <div className={s.district}>Quận huyện: <div className={s.tag}>{newsDetail?.new_qh_id && getDistrictText(newsDetail?.new_qh_id.split(',').map(Number))}</div></div>
                    </div>
                    <div className={s.content_1}>
                        <div className={s.text_1}>Địa chỉ chi tiết:</div>
                        <div className={s.text_2}>{newsDetail?.new_addr}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChiTietTinTuyenDung;