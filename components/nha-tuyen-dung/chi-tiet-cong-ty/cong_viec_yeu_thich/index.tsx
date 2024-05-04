import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import ContentEditable from 'react-contenteditable';
import { Modal, Tabs } from 'antd';

import s from './styles.module.scss';
import { city_array, listMucLuongFilter } from "@/functions/functions";
import Link from "next/link";

const CongViecYeuThich = ({ listCongViec, handleChatNgay }: { listCongViec: any; handleChatNgay: any }) => {
    const [showAll, setShowAll] = useState(false);
    const [imgError, setImgError] = useState(false)

    // const handleImgError = () => {
    //     setImgError(true)
    //     console.log('>>> check error img: ', imgError);
    // }

    console.log('>>> check cong viec yeu thich: ', listCongViec);

    return (
        <div className={s.box_4}>
            <div className={s.title}>Công việc bạn có thể thích</div>
            {showAll == false ? listCongViec?.slice(0, 5)?.map((item: any, index: any) => {
                return (
                    <div key={index} className={s.body}>
                        <div className={s.box_item_1}>
                            <div className={s.image_logo}>
                                <img
                                    src={item?.usc_logo || "/images/candidate/ava_default.png"}
                                    alt={""} height={60} width={60} className={s.image_4}
                                    onError={(e) => {
                                        // e.currentTarget.srcset = '/images/nha-tuyen-dung/chi-tiet-cong-ty/icon-baner'
                                        e.currentTarget.srcset = '/images/candidate/ava_default.png'
                                    }}
                                >

                                </img>
                                {/* <div className={s.status_online}></div> */}
                            </div>
                            <div className={s.group_right}>
                                <Link href={`/${item?.new_alias}-${item?.new_id}.html`} >
                                    <span className={s.item_1}>{item?.new_title || ''}</span>
                                </Link>
                                <span className={s.item_2}>{item?.usc_company || 'Tên công ty chưa cập nhật'}</span>
                            </div>
                        </div>
                        <div className={s.box_item_2}>
                            <div className={s.div_left}>
                                <div className={s.tag}>
                                    <span className={s.text}>{city_array.find((city) => city?.cit_id == item?.new_city)?.cit_name}</span>
                                </div>

                                <div className={s.tag}>
                                    <span className={s.text}>{listMucLuongFilter.find((salary) => salary?.value == item?.new_money)?.label}</span>
                                </div>
                            </div>
                            {/* <div className={s.div_right}>
                                <svg onClick={handleChatNgay} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                                    <path d="M16.4818 10.3908V14.0575C16.4818 14.2958 16.4727 14.525 16.4452 14.745C16.2343 17.22 14.7768 18.4483 12.091 18.4483H11.7243C11.4952 18.4483 11.2752 18.5583 11.1377 18.7417L10.0377 20.2083C9.55184 20.8592 8.7635 20.8592 8.27766 20.2083L7.17765 18.7417C7.05848 18.5858 6.79267 18.4483 6.591 18.4483H6.22434C3.30017 18.4483 1.8335 17.7242 1.8335 14.0575V10.3908C1.8335 7.70501 3.071 6.24751 5.53684 6.03667C5.75684 6.00917 5.986 6 6.22434 6H12.091C15.0152 6 16.4818 7.46667 16.4818 10.3908Z" stroke="#5DC22D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20.1483 6.72422V10.3909C20.1483 13.0859 18.9108 14.5342 16.4449 14.745C16.4724 14.525 16.4816 14.2959 16.4816 14.0575V10.3909C16.4816 7.46672 15.0149 6.00004 12.0908 6.00004H6.22412C5.98579 6.00004 5.75662 6.00922 5.53662 6.03672C5.74745 3.57088 7.20495 2.33337 9.89079 2.33337H15.7574C18.6816 2.33337 20.1483 3.80005 20.1483 6.72422Z" stroke="#5DC22D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12.3707 12.6458H12.379" stroke="#5DC22D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.1627 12.6458H9.17095" stroke="#5DC22D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.95421 12.6458H5.96246" stroke="#5DC22D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div> */}
                        </div>
                    </div>
                )
            }) :
                listCongViec?.map((item: any, index: any) => {
                    return (
                        <div key={index} className={s.body}>
                            <div className={s.box_item_1}>
                                <div className={s.image_logo}>

                                    <img
                                        src={item?.usc_logo || "/images/candidate/ava_default.png"}
                                        alt={""} height={60} width={60} className={s.image_4}
                                        onError={(e) => {
                                            e.currentTarget.srcset = '/images/candidate/ava_default.png'
                                        }}
                                    >

                                    </img>

                                    {/* <div className={s.status_online}></div> */}
                                </div>
                                <div className={s.group_right}>
                                    <Link href={`/${item?.new_alias}-${item?.new_id}.html`} >
                                        <span className={s.item_1}>{item?.new_title || ''}</span>
                                    </Link>
                                    <span className={s.item_2}>{item?.usc_company || 'Tên công ty chưa cập nhật'}</span>
                                </div>
                            </div>
                            <div className={s.box_item_2}>
                                <div className={s.div_left}>
                                    <div className={s.tag}>
                                        <span className={s.text}>{city_array.find((city) => city?.cit_id == item?.new_city)?.cit_name}</span>
                                    </div>

                                    <div className={s.tag}>
                                        <span className={s.text}>{listMucLuongFilter.find((salary) => salary?.value == item?.new_money)?.label}</span>
                                    </div>
                                </div>
                                {/* <div className={s.div_right}>
                                    <svg onClick={handleChatNgay} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                                        <path d="M16.4818 10.3908V14.0575C16.4818 14.2958 16.4727 14.525 16.4452 14.745C16.2343 17.22 14.7768 18.4483 12.091 18.4483H11.7243C11.4952 18.4483 11.2752 18.5583 11.1377 18.7417L10.0377 20.2083C9.55184 20.8592 8.7635 20.8592 8.27766 20.2083L7.17765 18.7417C7.05848 18.5858 6.79267 18.4483 6.591 18.4483H6.22434C3.30017 18.4483 1.8335 17.7242 1.8335 14.0575V10.3908C1.8335 7.70501 3.071 6.24751 5.53684 6.03667C5.75684 6.00917 5.986 6 6.22434 6H12.091C15.0152 6 16.4818 7.46667 16.4818 10.3908Z" stroke="#5DC22D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M20.1483 6.72422V10.3909C20.1483 13.0859 18.9108 14.5342 16.4449 14.745C16.4724 14.525 16.4816 14.2959 16.4816 14.0575V10.3909C16.4816 7.46672 15.0149 6.00004 12.0908 6.00004H6.22412C5.98579 6.00004 5.75662 6.00922 5.53662 6.03672C5.74745 3.57088 7.20495 2.33337 9.89079 2.33337H15.7574C18.6816 2.33337 20.1483 3.80005 20.1483 6.72422Z" stroke="#5DC22D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.3707 12.6458H12.379" stroke="#5DC22D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9.1627 12.6458H9.17095" stroke="#5DC22D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5.95421 12.6458H5.96246" stroke="#5DC22D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div> */}
                            </div>
                        </div>
                    )
                })}
            {showAll == false ? <div className={s.showAll} onClick={() => { setShowAll(true) }}>Xem thêm công việc  →</div> : <></>}
        </div>
    )
}


export default CongViecYeuThich;
