import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { Radio } from 'antd';

import s from './styles.module.scss';

const HoTroTimViec = ({ handleTaoCv }: { handleTaoCv: any; }) => {
    return (
        <>
            <div className={s.list_news_box_4}>
                <div className={s.title}>Hỗ trợ ứng viên tìm việc làm</div>
                <div className={s.item}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M14.6663 5.33301C14.6663 2.66634 13.333 1.33301 10.6663 1.33301H5.33301C2.66634 1.33301 1.33301 2.66634 1.33301 5.33301V13.9997C1.33301 14.3663 1.63301 14.6663 1.99967 14.6663H10.6663C13.333 14.6663 14.6663 13.333 14.6663 10.6663V7.99967" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.5315 11.2002H5.41C4.6325 11.2002 4 10.5677 4 9.7907V6.6102C4 5.8327 4.6325 5.2002 5.4095 5.2002H6.531C6.807 5.2002 7.031 5.4242 7.031 5.7002C7.031 5.9762 6.807 6.2002 6.531 6.2002H5.4095C5.1835 6.2002 5 6.3842 5 6.6097V9.7902C5 10.0162 5.184 10.1997 5.4095 10.1997H6.531C6.807 10.1997 7.031 10.4237 7.031 10.6997C7.031 10.9757 6.8075 11.2002 6.5315 11.2002Z" fill="#444444" />
                        <path d="M9.37465 11.2006C9.36815 11.2006 9.36215 11.2006 9.35565 11.2006C9.13215 11.1921 8.94165 11.0366 8.88865 10.8191L7.66965 5.8191C7.60415 5.5506 7.76865 5.2801 8.03715 5.2151C8.30615 5.1526 8.57615 5.3141 8.64115 5.5826L9.44315 8.8716L10.5237 5.5466C10.6092 5.2846 10.8907 5.1406 11.1537 5.2256C11.4162 5.3111 11.5602 5.5931 11.4747 5.8556L9.84965 10.8556C9.78315 11.0616 9.59065 11.2006 9.37465 11.2006Z" fill="#444444" />
                    </svg>
                    <div className={s.item_text}>CV xin việc</div>
                </div>
                <div className={s.item}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M14.6663 5.33301C14.6663 2.66634 13.333 1.33301 10.6663 1.33301H5.33301C2.66634 1.33301 1.33301 2.66634 1.33301 5.33301V13.9997C1.33301 14.3663 1.63301 14.6663 1.99967 14.6663H10.6663C13.333 14.6663 14.6663 13.333 14.6663 10.6663V7.99967" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 11V5L10 11V5" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className={s.item_text}>CV theo ngành nghề</div>
                </div>
                <div className={s.item}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M14.6663 5.33301C14.6663 2.66634 13.333 1.33301 10.6663 1.33301H5.33301C2.66634 1.33301 1.33301 2.66634 1.33301 5.33301V13.9997C1.33301 14.3663 1.63301 14.6663 1.99967 14.6663H10.6663C13.333 14.6663 14.6663 13.333 14.6663 10.6663V7.99967" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 5.75C5.58579 5.75 5.25 5.41421 5.25 5C5.25 4.58579 5.58579 4.25 6 4.25V5.75ZM10 5V4.25C10.4142 4.25 10.75 4.58579 10.75 5H10ZM10 11H10.75C10.75 11.4142 10.4142 11.75 10 11.75V11ZM6 11.75C5.58579 11.75 5.25 11.4142 5.25 11C5.25 10.5858 5.58579 10.25 6 10.25V11.75ZM6 4.25H10V5.75H6V4.25ZM10 11.75H6V10.25H10V11.75ZM10.75 5V8H9.25V5H10.75ZM10.75 8V11H9.25V8H10.75Z" fill="#444444" />
                        <path d="M6 8H10" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <div className={s.item_text}>CV theo ngôn ngữ</div>
                </div>
                <div className={s.item}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M7.3335 1.3335H6.00016C2.66683 1.3335 1.3335 2.66683 1.3335 6.00016V10.0002C1.3335 13.3335 2.66683 14.6668 6.00016 14.6668H10.0002C13.3335 14.6668 14.6668 13.3335 14.6668 10.0002V8.66683" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.2583 1.73545L8.52621 5.05332C8.38412 5.17963 8.24204 5.42805 8.21362 5.6091L8.00997 6.87646C7.93419 7.3354 8.29887 7.6554 8.81511 7.59224L10.2407 7.41119C10.4396 7.38593 10.719 7.25962 10.8659 7.1333L14.5979 3.81543C15.242 3.2428 15.5452 2.57754 14.5979 1.73545C13.6507 0.893347 12.9024 1.16282 12.2583 1.73545Z" stroke="#444444" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 2C12.217 3.16113 12.8227 4.06964 13.6 4.4" stroke="#444444" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className={s.item_text}>Bí quyết viết CV</div>
                </div>
                <div className={s.item}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M14.6668 5.3335C14.6668 2.66683 13.3335 1.3335 10.6668 1.3335H5.3335C2.66683 1.3335 1.3335 2.66683 1.3335 5.3335V14.0002C1.3335 14.3668 1.6335 14.6668 2.00016 14.6668H10.6668C13.3335 14.6668 14.6668 13.3335 14.6668 10.6668V8.00016" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 6.3335H11.3333" stroke="#444444" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.6665 6.3335H7.99984" stroke="#444444" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.6665 9.6665H9.33317" stroke="#444444" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className={s.item_text}>Đơn xin việc</div>
                </div>
                <div className={s.item}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M14.6665 8.65332V10.3333C14.6665 12.6667 13.3332 13.6667 11.3332 13.6667H4.6665" stroke="#444444" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.3335 5.66683C1.3335 3.3335 2.66683 2.3335 4.66683 2.3335H11.3335C13.3335 2.3335 14.6668 3.3335 14.6668 5.66683" stroke="#444444" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.3332 6L9.2465 7.66667C8.55983 8.21333 7.43317 8.21333 6.7465 7.66667L4.6665 6" stroke="#444444" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.3335 11H5.3335" stroke="#444444" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.3335 8.3335H3.3335" stroke="#444444" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className={s.item_text}>Thư xin việc</div>
                </div>
                <div className={s.item}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 12.5735H11.4933C10.96 12.5735 10.4533 12.7802 10.08 13.1535L8.93998 14.2802C8.41998 14.7935 7.57334 14.7935 7.05334 14.2802L5.91333 13.1535C5.54 12.7802 5.02667 12.5735 4.5 12.5735H4C2.89333 12.5735 2 11.6868 2 10.5935V3.3135C2 2.22016 2.89333 1.3335 4 1.3335H12C13.1067 1.3335 14 2.22016 14 3.3135V10.5868C14 11.6802 13.1067 12.5735 12 12.5735Z" stroke="#444444" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.04671 5.9667C8.02005 5.9667 7.98003 5.9667 7.9467 5.9667C7.2467 5.94003 6.69336 5.37337 6.69336 4.6667C6.69336 3.9467 7.27337 3.3667 7.99337 3.3667C8.71337 3.3667 9.29338 3.95337 9.29338 4.6667C9.30004 5.37337 8.74671 5.9467 8.04671 5.9667Z" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.16646 7.97314C5.2798 8.56648 5.2798 9.53314 6.16646 10.1265C7.17313 10.7998 8.82646 10.7998 9.83313 10.1265C10.7198 9.53314 10.7198 8.56648 9.83313 7.97314C8.82646 7.30648 7.1798 7.30648 6.16646 7.97314Z" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className={s.item_text}>Sơ yếu lý lịch</div>
                </div>
            </div>

            <div className={s.list_news_box_5}>
                <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/bg_create_cv.png"} alt={""} height={183} width={992} className={s.imageCreateCV} />
                <div className={s.box_1}>
                    <div className={s.head}>
                        Tạo CV online miễn phí bằng WorkAI
                    </div>
                    <div className={s.item_body}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="#3582CD" />
                            <path d="M4 8.18471L7.13043 10.4001L12 5.6001" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        + 3500 mẫu CV siêu đẹp, chuyên nghiệp, độc đáo theo từng ngành nghề và 5 ngôn ngữ: Việt, Anh, Hàn, Nhật, Trung.
                    </div>
                    <div className={s.item_body}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="#3582CD" />
                            <path d="M4 8.18471L7.13043 10.4001L12 5.6001" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Website tìm việc làm chất lượng hàng đầu Việt Nam.
                    </div>
                    <button className={s.button_tao_cv} onClick={handleTaoCv}>Tạo CV ngay</button>
                </div>
            </div>
        </>

    )
}

export default HoTroTimViec;
