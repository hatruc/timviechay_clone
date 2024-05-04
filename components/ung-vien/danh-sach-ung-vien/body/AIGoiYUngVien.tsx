import Image from 'next/image';
import s from './AIGoiYUngVien.module.scss'
import { Carousel, Select } from 'antd';
import { useRef, useState } from 'react';
const AIGoiYUngVien = () => {
    const carouselRef = useRef<any>(null);
    const [fillter, setFillter] = useState(0)
    return (
        <>
            <div className={s.container}>
                <div className={s.body}>
                    <div style={{ color: "#3582CD" }} className={s.title}><span style={{ color: '#F8971C' }}>WORK AI</span> GỢI Ý ỨNG VIÊN</div>
                    <div className={s.filter}>
                        <div className={s.filter_1}>
                            <div className={s.filter_1_1}>
                                <div className={s.filter_1_icon}>
                                    <Image
                                        src={'/images/candidate/filter-search.png'}
                                        alt='filter-search'
                                        width={24}
                                        height={24}
                                    ></Image>
                                </div>
                                <div className={s.filter_1_loctheo}>
                                    Lọc theo:
                                </div>
                            </div>
                            <Select
                                defaultValue={"Địa điểm"}
                                className={"select_search_AI"}
                            >
                            </Select>
                        </div>
                        <div className={s.filter_chon}>
                            <div onClick={() => carouselRef.current.prev()}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" fill="white" />
                                <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#3582CD" />
                                <path d="M12.9187 14.5059C12.7616 14.3717 12.6733 14.1897 12.6733 14C12.6733 13.8103 12.7616 13.6283 12.9187 13.4941L16.7614 10.2126C16.9141 10.0777 16.9985 9.89694 16.9966 9.70932C16.9947 9.52171 16.9066 9.34224 16.7512 9.20958C16.5958 9.07691 16.3856 9.00166 16.1658 9.00003C15.9461 8.9984 15.7344 9.07052 15.5763 9.20086L11.7362 12.4823C11.2648 12.8849 11 13.4308 11 14C11 14.5692 11.2648 15.1151 11.7362 15.5177L15.5797 18.7991C15.7377 18.9295 15.9494 19.0016 16.1692 19C16.3889 18.9983 16.5991 18.9231 16.7545 18.7904C16.9099 18.6578 16.9981 18.4783 17 18.2907C17.0019 18.1031 16.9174 17.9223 16.7647 17.7874L12.9187 14.5059Z" fill="#3582CD" />
                            </svg>
                            </div>
                            <Carousel ref={carouselRef} dots={false} autoplay={false} infinite={true} slidesToShow={5} slidesToScroll={2} className={`${s.sliderCarousel} carousel_ds_ung_vien`}>
                                <div className={fillter == 0 ? s.active : s.filter_chon_item} key={0} onClick={() => setFillter(0)}>
                                    Ngẫu nhiên
                                </div>
                                <div className={fillter == 1 ? s.active : s.filter_chon_item} key={0} onClick={() => setFillter(1)}>
                                    Hà Nội
                                </div>
                                <div className={fillter == 2 ? s.active : s.filter_chon_item} key={0} onClick={() => setFillter(2)}>
                                    Hồ chí minh
                                </div>
                                <div className={fillter == 3 ? s.active : s.filter_chon_item} key={0} onClick={() => setFillter(3)}>
                                    Miền Bắc
                                </div>
                                <div className={fillter == 4 ? s.active : s.filter_chon_item} key={0} onClick={() => setFillter(4)}>
                                    Miền trung
                                </div>
                                <div className={fillter == 5 ? s.active : s.filter_chon_item} key={0} onClick={() => setFillter(5)}>
                                    Miền trung
                                </div>
                                <div className={fillter == 6 ? s.active : s.filter_chon_item} key={0} onClick={() => setFillter(6)}>
                                    Miền trung
                                </div>
                                <div className={fillter == 7 ? s.active : s.filter_chon_item} key={0} onClick={() => setFillter(7)}>
                                    Miền trung
                                </div>
                                <div className={fillter == 8 ? s.active : s.filter_chon_item} key={0} onClick={() => setFillter(8)}>
                                    Miền trung
                                </div>
                                <div className={fillter == 9 ? s.active : s.filter_chon_item} key={0} onClick={() => setFillter(9)}>
                                    Miền trung
                                </div>
                                <div className={fillter == 10 ? s.active : s.filter_chon_item} key={0} onClick={() => setFillter(10)}>
                                    Miền trung
                                </div>
                            </Carousel>
                            <div onClick={() => carouselRef.current.next()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" fill="white" />
                                    <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#3582CD" />
                                    <path d="M16.2651 12.4687L12.4255 9.18492C12.2662 9.06164 12.0576 8.99552 11.8429 9.00024C11.6281 9.00495 11.4238 9.08015 11.2721 9.21027C11.1204 9.34038 11.0329 9.51543 11.0279 9.69919C11.0228 9.88295 11.1005 10.0613 11.2449 10.1974L15.082 13.4812C15.2388 13.6155 15.327 13.7976 15.327 13.9875C15.327 14.1774 15.2388 14.3595 15.082 14.4937L11.2449 17.7776C11.088 17.9119 10.9999 18.0941 11 18.2841C11.0001 18.474 11.0883 18.6561 11.2453 18.7904C11.4023 18.9247 11.6152 19.0001 11.8372 19C12.0591 18.9999 12.2719 18.9244 12.4288 18.7901L16.2651 15.5062C16.7356 15.1034 17 14.5571 17 13.9875C17 13.4179 16.7356 12.8716 16.2651 12.4687Z" fill="#3582CD" />
                                </svg>
                            </div>
                        </div>
                        <div className={s.filter_chon_1024}>
                            <div className={s.filter_chon_1024_1}>
                                <div className={s.filter_chon_1024_icon}>
                                    <Image
                                        src={'/images/candidate/location.svg'}
                                        alt='filter-search'
                                        width={24}
                                        height={24}
                                    ></Image>
                                </div>
                                <div className={s.filter_chon_1024_diadiem}>
                                    Việc làm tại:
                                </div>
                            </div>
                            <Select
                                defaultValue={"Ngẫu nhiên"}
                                className={"select_search_AI"}
                            >
                            </Select>

                        </div>
                    </div>
                    <div className={s.listCandi}>
                        <div className={s.listCandi_item}>
                            <div className={s.listCandi_item_avatar}>
                                <Image
                                    alt='avatar'
                                    src='/images/candidate/Ellipse 11511110.svg'
                                    fill

                                ></Image>
                                <div className={s.listCandi_item_online}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12.0002" r="11" fill="#5DC22D" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                            <div className={s.listCandi_item_info}>
                                <div className={s.listCandi_item_info_name}>Ngô Minh Trang</div>
                                <div className={s.listCandi_item_info_nganhnghe}>Nhân viên kinh doanh</div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.33333C5.05456 1.33333 2.66675 4.00172 2.66675 6.99999C2.66675 9.97478 4.36896 13.2083 7.02479 14.4496C7.64391 14.739 8.35625 14.739 8.97537 14.4496C11.6312 13.2083 13.3334 9.97478 13.3334 6.99999C13.3334 4.00172 10.9456 1.33333 8.00008 1.33333ZM8.00008 7.99999C8.73646 7.99999 9.33342 7.40304 9.33342 6.66666C9.33342 5.93028 8.73646 5.33333 8.00008 5.33333C7.2637 5.33333 6.66675 5.93028 6.66675 6.66666C6.66675 7.40304 7.2637 7.99999 8.00008 7.99999Z" fill="#3582CD" />
                                    </svg>
                                    <div>Bà Rịa - Vũng Tàu</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.03459 0.833329H7.96525C7.36628 0.83331 6.86678 0.833295 6.47027 0.886605C6.05174 0.942875 5.67387 1.06665 5.37022 1.3703C5.06658 1.67395 4.9428 2.05181 4.88653 2.47034C4.83322 2.86686 4.83323 3.36634 4.83325 3.96532V4.01714C3.4858 4.06123 2.67666 4.21868 2.1143 4.78104C1.33325 5.56209 1.33325 6.81917 1.33325 9.33333C1.33325 11.8475 1.33325 13.1046 2.1143 13.8856C2.89535 14.6667 4.15243 14.6667 6.66658 14.6667H9.33325C11.8474 14.6667 13.1045 14.6667 13.8855 13.8856C14.6666 13.1046 14.6666 11.8475 14.6666 9.33333C14.6666 6.81917 14.6666 5.56209 13.8855 4.78104C13.3232 4.21868 12.514 4.06123 11.1666 4.01714V3.96533C11.1666 3.36636 11.1666 2.86686 11.1133 2.47034C11.057 2.05181 10.9333 1.67395 10.6296 1.3703C10.326 1.06665 9.9481 0.942875 9.52957 0.886605C9.13306 0.833295 8.63356 0.83331 8.03459 0.833329ZM10.1666 4.00125V4C10.1666 3.35732 10.1655 2.92562 10.1222 2.60359C10.0809 2.29595 10.0094 2.16429 9.92251 2.07741C9.83563 1.99053 9.70397 1.91905 9.39633 1.87769C9.0743 1.83439 8.64259 1.83333 7.99992 1.83333C7.35725 1.83333 6.92554 1.83439 6.60351 1.87769C6.29587 1.91905 6.16421 1.99053 6.07733 2.07741C5.99045 2.16429 5.91897 2.29595 5.87761 2.60359C5.83431 2.92562 5.83325 3.35732 5.83325 4V4.00125C6.09461 4 6.37196 4 6.66658 4H9.33325C9.62787 4 9.90523 4 10.1666 4.00125ZM11.3333 6C11.3333 6.36819 11.0348 6.66666 10.6666 6.66666C10.2984 6.66666 9.99992 6.36819 9.99992 6C9.99992 5.63181 10.2984 5.33333 10.6666 5.33333C11.0348 5.33333 11.3333 5.63181 11.3333 6ZM5.33325 6.66666C5.70144 6.66666 5.99992 6.36819 5.99992 6C5.99992 5.63181 5.70144 5.33333 5.33325 5.33333C4.96506 5.33333 4.66658 5.63181 4.66658 6C4.66658 6.36819 4.96506 6.66666 5.33325 6.66666Z" fill="#3582CD" />
                                    </svg>
                                    <div>Dưới 1 năm kinh nghiệm</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8C1.33325 4.3181 4.31802 1.33334 7.99992 1.33334C11.6818 1.33334 14.6666 4.3181 14.6666 8Z" fill="#3582CD" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 4.83334C8.27606 4.83334 8.49992 5.05719 8.49992 5.33334V7.7929L10.0201 9.31312C10.2154 9.50838 10.2154 9.82496 10.0201 10.0202C9.82488 10.2155 9.50829 10.2155 9.31303 10.0202L7.64637 8.35356C7.5526 8.25979 7.49992 8.13261 7.49992 8V5.33334C7.49992 5.05719 7.72378 4.83334 7.99992 4.83334Z" fill="white" />
                                    </svg>
                                    <div>Vừa truy cập</div>
                                </div>
                            </div>
                            <div className={s.listCandi_item_btn}>
                                <div className={s.listCandi_item_btn_save}>Lưu ứng viên</div>
                                <div className={s.listCandi_item_btn_chat}>Chat</div>
                            </div>
                        </div>
                        <div className={s.listCandi_item}>
                            <div className={s.listCandi_item_avatar}>
                                <Image
                                    alt='avatar'
                                    src='/images/candidate/Ellipse 11511110.svg'
                                    fill

                                ></Image>
                                <div className={s.listCandi_item_online}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12.0002" r="11" fill="#5DC22D" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                            <div className={s.listCandi_item_info}>
                                <div className={s.listCandi_item_info_name}>Ngô Minh Trang</div>
                                <div className={s.listCandi_item_info_nganhnghe}>Nhân viên kinh doanh</div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.33333C5.05456 1.33333 2.66675 4.00172 2.66675 6.99999C2.66675 9.97478 4.36896 13.2083 7.02479 14.4496C7.64391 14.739 8.35625 14.739 8.97537 14.4496C11.6312 13.2083 13.3334 9.97478 13.3334 6.99999C13.3334 4.00172 10.9456 1.33333 8.00008 1.33333ZM8.00008 7.99999C8.73646 7.99999 9.33342 7.40304 9.33342 6.66666C9.33342 5.93028 8.73646 5.33333 8.00008 5.33333C7.2637 5.33333 6.66675 5.93028 6.66675 6.66666C6.66675 7.40304 7.2637 7.99999 8.00008 7.99999Z" fill="#3582CD" />
                                    </svg>
                                    <div>Bà Rịa - Vũng Tàu</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.03459 0.833329H7.96525C7.36628 0.83331 6.86678 0.833295 6.47027 0.886605C6.05174 0.942875 5.67387 1.06665 5.37022 1.3703C5.06658 1.67395 4.9428 2.05181 4.88653 2.47034C4.83322 2.86686 4.83323 3.36634 4.83325 3.96532V4.01714C3.4858 4.06123 2.67666 4.21868 2.1143 4.78104C1.33325 5.56209 1.33325 6.81917 1.33325 9.33333C1.33325 11.8475 1.33325 13.1046 2.1143 13.8856C2.89535 14.6667 4.15243 14.6667 6.66658 14.6667H9.33325C11.8474 14.6667 13.1045 14.6667 13.8855 13.8856C14.6666 13.1046 14.6666 11.8475 14.6666 9.33333C14.6666 6.81917 14.6666 5.56209 13.8855 4.78104C13.3232 4.21868 12.514 4.06123 11.1666 4.01714V3.96533C11.1666 3.36636 11.1666 2.86686 11.1133 2.47034C11.057 2.05181 10.9333 1.67395 10.6296 1.3703C10.326 1.06665 9.9481 0.942875 9.52957 0.886605C9.13306 0.833295 8.63356 0.83331 8.03459 0.833329ZM10.1666 4.00125V4C10.1666 3.35732 10.1655 2.92562 10.1222 2.60359C10.0809 2.29595 10.0094 2.16429 9.92251 2.07741C9.83563 1.99053 9.70397 1.91905 9.39633 1.87769C9.0743 1.83439 8.64259 1.83333 7.99992 1.83333C7.35725 1.83333 6.92554 1.83439 6.60351 1.87769C6.29587 1.91905 6.16421 1.99053 6.07733 2.07741C5.99045 2.16429 5.91897 2.29595 5.87761 2.60359C5.83431 2.92562 5.83325 3.35732 5.83325 4V4.00125C6.09461 4 6.37196 4 6.66658 4H9.33325C9.62787 4 9.90523 4 10.1666 4.00125ZM11.3333 6C11.3333 6.36819 11.0348 6.66666 10.6666 6.66666C10.2984 6.66666 9.99992 6.36819 9.99992 6C9.99992 5.63181 10.2984 5.33333 10.6666 5.33333C11.0348 5.33333 11.3333 5.63181 11.3333 6ZM5.33325 6.66666C5.70144 6.66666 5.99992 6.36819 5.99992 6C5.99992 5.63181 5.70144 5.33333 5.33325 5.33333C4.96506 5.33333 4.66658 5.63181 4.66658 6C4.66658 6.36819 4.96506 6.66666 5.33325 6.66666Z" fill="#3582CD" />
                                    </svg>
                                    <div>Dưới 1 năm kinh nghiệm</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8C1.33325 4.3181 4.31802 1.33334 7.99992 1.33334C11.6818 1.33334 14.6666 4.3181 14.6666 8Z" fill="#3582CD" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 4.83334C8.27606 4.83334 8.49992 5.05719 8.49992 5.33334V7.7929L10.0201 9.31312C10.2154 9.50838 10.2154 9.82496 10.0201 10.0202C9.82488 10.2155 9.50829 10.2155 9.31303 10.0202L7.64637 8.35356C7.5526 8.25979 7.49992 8.13261 7.49992 8V5.33334C7.49992 5.05719 7.72378 4.83334 7.99992 4.83334Z" fill="white" />
                                    </svg>
                                    <div>Vừa truy cập</div>
                                </div>
                            </div>
                            <div className={s.listCandi_item_btn}>
                                <div className={s.listCandi_item_btn_save}>Lưu ứng viên</div>
                                <div className={s.listCandi_item_btn_chat}>Chat</div>
                            </div>
                        </div>
                        <div className={s.listCandi_item}>
                            <div className={s.listCandi_item_avatar}>
                                <Image
                                    alt='avatar'
                                    src='/images/candidate/Ellipse 11511110.svg'
                                    fill

                                ></Image>
                                <div className={s.listCandi_item_online}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12.0002" r="11" fill="#5DC22D" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                            <div className={s.listCandi_item_info}>
                                <div className={s.listCandi_item_info_name}>Ngô Minh Trang</div>
                                <div className={s.listCandi_item_info_nganhnghe}>Nhân viên kinh doanh</div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.33333C5.05456 1.33333 2.66675 4.00172 2.66675 6.99999C2.66675 9.97478 4.36896 13.2083 7.02479 14.4496C7.64391 14.739 8.35625 14.739 8.97537 14.4496C11.6312 13.2083 13.3334 9.97478 13.3334 6.99999C13.3334 4.00172 10.9456 1.33333 8.00008 1.33333ZM8.00008 7.99999C8.73646 7.99999 9.33342 7.40304 9.33342 6.66666C9.33342 5.93028 8.73646 5.33333 8.00008 5.33333C7.2637 5.33333 6.66675 5.93028 6.66675 6.66666C6.66675 7.40304 7.2637 7.99999 8.00008 7.99999Z" fill="#3582CD" />
                                    </svg>
                                    <div>Bà Rịa - Vũng Tàu</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.03459 0.833329H7.96525C7.36628 0.83331 6.86678 0.833295 6.47027 0.886605C6.05174 0.942875 5.67387 1.06665 5.37022 1.3703C5.06658 1.67395 4.9428 2.05181 4.88653 2.47034C4.83322 2.86686 4.83323 3.36634 4.83325 3.96532V4.01714C3.4858 4.06123 2.67666 4.21868 2.1143 4.78104C1.33325 5.56209 1.33325 6.81917 1.33325 9.33333C1.33325 11.8475 1.33325 13.1046 2.1143 13.8856C2.89535 14.6667 4.15243 14.6667 6.66658 14.6667H9.33325C11.8474 14.6667 13.1045 14.6667 13.8855 13.8856C14.6666 13.1046 14.6666 11.8475 14.6666 9.33333C14.6666 6.81917 14.6666 5.56209 13.8855 4.78104C13.3232 4.21868 12.514 4.06123 11.1666 4.01714V3.96533C11.1666 3.36636 11.1666 2.86686 11.1133 2.47034C11.057 2.05181 10.9333 1.67395 10.6296 1.3703C10.326 1.06665 9.9481 0.942875 9.52957 0.886605C9.13306 0.833295 8.63356 0.83331 8.03459 0.833329ZM10.1666 4.00125V4C10.1666 3.35732 10.1655 2.92562 10.1222 2.60359C10.0809 2.29595 10.0094 2.16429 9.92251 2.07741C9.83563 1.99053 9.70397 1.91905 9.39633 1.87769C9.0743 1.83439 8.64259 1.83333 7.99992 1.83333C7.35725 1.83333 6.92554 1.83439 6.60351 1.87769C6.29587 1.91905 6.16421 1.99053 6.07733 2.07741C5.99045 2.16429 5.91897 2.29595 5.87761 2.60359C5.83431 2.92562 5.83325 3.35732 5.83325 4V4.00125C6.09461 4 6.37196 4 6.66658 4H9.33325C9.62787 4 9.90523 4 10.1666 4.00125ZM11.3333 6C11.3333 6.36819 11.0348 6.66666 10.6666 6.66666C10.2984 6.66666 9.99992 6.36819 9.99992 6C9.99992 5.63181 10.2984 5.33333 10.6666 5.33333C11.0348 5.33333 11.3333 5.63181 11.3333 6ZM5.33325 6.66666C5.70144 6.66666 5.99992 6.36819 5.99992 6C5.99992 5.63181 5.70144 5.33333 5.33325 5.33333C4.96506 5.33333 4.66658 5.63181 4.66658 6C4.66658 6.36819 4.96506 6.66666 5.33325 6.66666Z" fill="#3582CD" />
                                    </svg>
                                    <div>Dưới 1 năm kinh nghiệm</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8C1.33325 4.3181 4.31802 1.33334 7.99992 1.33334C11.6818 1.33334 14.6666 4.3181 14.6666 8Z" fill="#3582CD" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 4.83334C8.27606 4.83334 8.49992 5.05719 8.49992 5.33334V7.7929L10.0201 9.31312C10.2154 9.50838 10.2154 9.82496 10.0201 10.0202C9.82488 10.2155 9.50829 10.2155 9.31303 10.0202L7.64637 8.35356C7.5526 8.25979 7.49992 8.13261 7.49992 8V5.33334C7.49992 5.05719 7.72378 4.83334 7.99992 4.83334Z" fill="white" />
                                    </svg>
                                    <div>Vừa truy cập</div>
                                </div>
                            </div>
                            <div className={s.listCandi_item_btn}>
                                <div className={s.listCandi_item_btn_save}>Lưu ứng viên</div>
                                <div className={s.listCandi_item_btn_chat}>Chat</div>
                            </div>
                        </div>
                        <div className={s.listCandi_item}>
                            <div className={s.listCandi_item_avatar}>
                                <Image
                                    alt='avatar'
                                    src='/images/candidate/Ellipse 11511110.svg'
                                    fill

                                ></Image>
                                <div className={s.listCandi_item_online}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12.0002" r="11" fill="#5DC22D" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                            <div className={s.listCandi_item_info}>
                                <div className={s.listCandi_item_info_name}>Ngô Minh Trang</div>
                                <div className={s.listCandi_item_info_nganhnghe}>Nhân viên kinh doanh</div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.33333C5.05456 1.33333 2.66675 4.00172 2.66675 6.99999C2.66675 9.97478 4.36896 13.2083 7.02479 14.4496C7.64391 14.739 8.35625 14.739 8.97537 14.4496C11.6312 13.2083 13.3334 9.97478 13.3334 6.99999C13.3334 4.00172 10.9456 1.33333 8.00008 1.33333ZM8.00008 7.99999C8.73646 7.99999 9.33342 7.40304 9.33342 6.66666C9.33342 5.93028 8.73646 5.33333 8.00008 5.33333C7.2637 5.33333 6.66675 5.93028 6.66675 6.66666C6.66675 7.40304 7.2637 7.99999 8.00008 7.99999Z" fill="#3582CD" />
                                    </svg>
                                    <div>Bà Rịa - Vũng Tàu</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.03459 0.833329H7.96525C7.36628 0.83331 6.86678 0.833295 6.47027 0.886605C6.05174 0.942875 5.67387 1.06665 5.37022 1.3703C5.06658 1.67395 4.9428 2.05181 4.88653 2.47034C4.83322 2.86686 4.83323 3.36634 4.83325 3.96532V4.01714C3.4858 4.06123 2.67666 4.21868 2.1143 4.78104C1.33325 5.56209 1.33325 6.81917 1.33325 9.33333C1.33325 11.8475 1.33325 13.1046 2.1143 13.8856C2.89535 14.6667 4.15243 14.6667 6.66658 14.6667H9.33325C11.8474 14.6667 13.1045 14.6667 13.8855 13.8856C14.6666 13.1046 14.6666 11.8475 14.6666 9.33333C14.6666 6.81917 14.6666 5.56209 13.8855 4.78104C13.3232 4.21868 12.514 4.06123 11.1666 4.01714V3.96533C11.1666 3.36636 11.1666 2.86686 11.1133 2.47034C11.057 2.05181 10.9333 1.67395 10.6296 1.3703C10.326 1.06665 9.9481 0.942875 9.52957 0.886605C9.13306 0.833295 8.63356 0.83331 8.03459 0.833329ZM10.1666 4.00125V4C10.1666 3.35732 10.1655 2.92562 10.1222 2.60359C10.0809 2.29595 10.0094 2.16429 9.92251 2.07741C9.83563 1.99053 9.70397 1.91905 9.39633 1.87769C9.0743 1.83439 8.64259 1.83333 7.99992 1.83333C7.35725 1.83333 6.92554 1.83439 6.60351 1.87769C6.29587 1.91905 6.16421 1.99053 6.07733 2.07741C5.99045 2.16429 5.91897 2.29595 5.87761 2.60359C5.83431 2.92562 5.83325 3.35732 5.83325 4V4.00125C6.09461 4 6.37196 4 6.66658 4H9.33325C9.62787 4 9.90523 4 10.1666 4.00125ZM11.3333 6C11.3333 6.36819 11.0348 6.66666 10.6666 6.66666C10.2984 6.66666 9.99992 6.36819 9.99992 6C9.99992 5.63181 10.2984 5.33333 10.6666 5.33333C11.0348 5.33333 11.3333 5.63181 11.3333 6ZM5.33325 6.66666C5.70144 6.66666 5.99992 6.36819 5.99992 6C5.99992 5.63181 5.70144 5.33333 5.33325 5.33333C4.96506 5.33333 4.66658 5.63181 4.66658 6C4.66658 6.36819 4.96506 6.66666 5.33325 6.66666Z" fill="#3582CD" />
                                    </svg>
                                    <div>Dưới 1 năm kinh nghiệm</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8C1.33325 4.3181 4.31802 1.33334 7.99992 1.33334C11.6818 1.33334 14.6666 4.3181 14.6666 8Z" fill="#3582CD" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 4.83334C8.27606 4.83334 8.49992 5.05719 8.49992 5.33334V7.7929L10.0201 9.31312C10.2154 9.50838 10.2154 9.82496 10.0201 10.0202C9.82488 10.2155 9.50829 10.2155 9.31303 10.0202L7.64637 8.35356C7.5526 8.25979 7.49992 8.13261 7.49992 8V5.33334C7.49992 5.05719 7.72378 4.83334 7.99992 4.83334Z" fill="white" />
                                    </svg>
                                    <div>Vừa truy cập</div>
                                </div>
                            </div>
                            <div className={s.listCandi_item_btn}>
                                <div className={s.listCandi_item_btn_save}>Lưu ứng viên</div>
                                <div className={s.listCandi_item_btn_chat}>Chat</div>
                            </div>
                        </div>
                        <div className={s.listCandi_item}>
                            <div className={s.listCandi_item_avatar}>
                                <Image
                                    alt='avatar'
                                    src='/images/candidate/Ellipse 11511110.svg'
                                    fill

                                ></Image>
                                <div className={s.listCandi_item_online}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12.0002" r="11" fill="#5DC22D" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                            <div className={s.listCandi_item_info}>
                                <div className={s.listCandi_item_info_name}>Ngô Minh Trang</div>
                                <div className={s.listCandi_item_info_nganhnghe}>Nhân viên kinh doanh</div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.33333C5.05456 1.33333 2.66675 4.00172 2.66675 6.99999C2.66675 9.97478 4.36896 13.2083 7.02479 14.4496C7.64391 14.739 8.35625 14.739 8.97537 14.4496C11.6312 13.2083 13.3334 9.97478 13.3334 6.99999C13.3334 4.00172 10.9456 1.33333 8.00008 1.33333ZM8.00008 7.99999C8.73646 7.99999 9.33342 7.40304 9.33342 6.66666C9.33342 5.93028 8.73646 5.33333 8.00008 5.33333C7.2637 5.33333 6.66675 5.93028 6.66675 6.66666C6.66675 7.40304 7.2637 7.99999 8.00008 7.99999Z" fill="#3582CD" />
                                    </svg>
                                    <div>Bà Rịa - Vũng Tàu</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.03459 0.833329H7.96525C7.36628 0.83331 6.86678 0.833295 6.47027 0.886605C6.05174 0.942875 5.67387 1.06665 5.37022 1.3703C5.06658 1.67395 4.9428 2.05181 4.88653 2.47034C4.83322 2.86686 4.83323 3.36634 4.83325 3.96532V4.01714C3.4858 4.06123 2.67666 4.21868 2.1143 4.78104C1.33325 5.56209 1.33325 6.81917 1.33325 9.33333C1.33325 11.8475 1.33325 13.1046 2.1143 13.8856C2.89535 14.6667 4.15243 14.6667 6.66658 14.6667H9.33325C11.8474 14.6667 13.1045 14.6667 13.8855 13.8856C14.6666 13.1046 14.6666 11.8475 14.6666 9.33333C14.6666 6.81917 14.6666 5.56209 13.8855 4.78104C13.3232 4.21868 12.514 4.06123 11.1666 4.01714V3.96533C11.1666 3.36636 11.1666 2.86686 11.1133 2.47034C11.057 2.05181 10.9333 1.67395 10.6296 1.3703C10.326 1.06665 9.9481 0.942875 9.52957 0.886605C9.13306 0.833295 8.63356 0.83331 8.03459 0.833329ZM10.1666 4.00125V4C10.1666 3.35732 10.1655 2.92562 10.1222 2.60359C10.0809 2.29595 10.0094 2.16429 9.92251 2.07741C9.83563 1.99053 9.70397 1.91905 9.39633 1.87769C9.0743 1.83439 8.64259 1.83333 7.99992 1.83333C7.35725 1.83333 6.92554 1.83439 6.60351 1.87769C6.29587 1.91905 6.16421 1.99053 6.07733 2.07741C5.99045 2.16429 5.91897 2.29595 5.87761 2.60359C5.83431 2.92562 5.83325 3.35732 5.83325 4V4.00125C6.09461 4 6.37196 4 6.66658 4H9.33325C9.62787 4 9.90523 4 10.1666 4.00125ZM11.3333 6C11.3333 6.36819 11.0348 6.66666 10.6666 6.66666C10.2984 6.66666 9.99992 6.36819 9.99992 6C9.99992 5.63181 10.2984 5.33333 10.6666 5.33333C11.0348 5.33333 11.3333 5.63181 11.3333 6ZM5.33325 6.66666C5.70144 6.66666 5.99992 6.36819 5.99992 6C5.99992 5.63181 5.70144 5.33333 5.33325 5.33333C4.96506 5.33333 4.66658 5.63181 4.66658 6C4.66658 6.36819 4.96506 6.66666 5.33325 6.66666Z" fill="#3582CD" />
                                    </svg>
                                    <div>Dưới 1 năm kinh nghiệm</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8C1.33325 4.3181 4.31802 1.33334 7.99992 1.33334C11.6818 1.33334 14.6666 4.3181 14.6666 8Z" fill="#3582CD" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 4.83334C8.27606 4.83334 8.49992 5.05719 8.49992 5.33334V7.7929L10.0201 9.31312C10.2154 9.50838 10.2154 9.82496 10.0201 10.0202C9.82488 10.2155 9.50829 10.2155 9.31303 10.0202L7.64637 8.35356C7.5526 8.25979 7.49992 8.13261 7.49992 8V5.33334C7.49992 5.05719 7.72378 4.83334 7.99992 4.83334Z" fill="white" />
                                    </svg>
                                    <div>Vừa truy cập</div>
                                </div>
                            </div>
                            <div className={s.listCandi_item_btn}>
                                <div className={s.listCandi_item_btn_save}>Lưu ứng viên</div>
                                <div className={s.listCandi_item_btn_chat}>Chat</div>
                            </div>
                        </div>
                        <div className={s.listCandi_item}>
                            <div className={s.listCandi_item_avatar}>
                                <Image
                                    alt='avatar'
                                    src='/images/candidate/Ellipse 11511110.svg'
                                    fill

                                ></Image>
                                <div className={s.listCandi_item_online}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12.0002" r="11" fill="#5DC22D" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                            <div className={s.listCandi_item_info}>
                                <div className={s.listCandi_item_info_name}>Ngô Minh Trang</div>
                                <div className={s.listCandi_item_info_nganhnghe}>Nhân viên kinh doanh</div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.33333C5.05456 1.33333 2.66675 4.00172 2.66675 6.99999C2.66675 9.97478 4.36896 13.2083 7.02479 14.4496C7.64391 14.739 8.35625 14.739 8.97537 14.4496C11.6312 13.2083 13.3334 9.97478 13.3334 6.99999C13.3334 4.00172 10.9456 1.33333 8.00008 1.33333ZM8.00008 7.99999C8.73646 7.99999 9.33342 7.40304 9.33342 6.66666C9.33342 5.93028 8.73646 5.33333 8.00008 5.33333C7.2637 5.33333 6.66675 5.93028 6.66675 6.66666C6.66675 7.40304 7.2637 7.99999 8.00008 7.99999Z" fill="#3582CD" />
                                    </svg>
                                    <div>Bà Rịa - Vũng Tàu</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.03459 0.833329H7.96525C7.36628 0.83331 6.86678 0.833295 6.47027 0.886605C6.05174 0.942875 5.67387 1.06665 5.37022 1.3703C5.06658 1.67395 4.9428 2.05181 4.88653 2.47034C4.83322 2.86686 4.83323 3.36634 4.83325 3.96532V4.01714C3.4858 4.06123 2.67666 4.21868 2.1143 4.78104C1.33325 5.56209 1.33325 6.81917 1.33325 9.33333C1.33325 11.8475 1.33325 13.1046 2.1143 13.8856C2.89535 14.6667 4.15243 14.6667 6.66658 14.6667H9.33325C11.8474 14.6667 13.1045 14.6667 13.8855 13.8856C14.6666 13.1046 14.6666 11.8475 14.6666 9.33333C14.6666 6.81917 14.6666 5.56209 13.8855 4.78104C13.3232 4.21868 12.514 4.06123 11.1666 4.01714V3.96533C11.1666 3.36636 11.1666 2.86686 11.1133 2.47034C11.057 2.05181 10.9333 1.67395 10.6296 1.3703C10.326 1.06665 9.9481 0.942875 9.52957 0.886605C9.13306 0.833295 8.63356 0.83331 8.03459 0.833329ZM10.1666 4.00125V4C10.1666 3.35732 10.1655 2.92562 10.1222 2.60359C10.0809 2.29595 10.0094 2.16429 9.92251 2.07741C9.83563 1.99053 9.70397 1.91905 9.39633 1.87769C9.0743 1.83439 8.64259 1.83333 7.99992 1.83333C7.35725 1.83333 6.92554 1.83439 6.60351 1.87769C6.29587 1.91905 6.16421 1.99053 6.07733 2.07741C5.99045 2.16429 5.91897 2.29595 5.87761 2.60359C5.83431 2.92562 5.83325 3.35732 5.83325 4V4.00125C6.09461 4 6.37196 4 6.66658 4H9.33325C9.62787 4 9.90523 4 10.1666 4.00125ZM11.3333 6C11.3333 6.36819 11.0348 6.66666 10.6666 6.66666C10.2984 6.66666 9.99992 6.36819 9.99992 6C9.99992 5.63181 10.2984 5.33333 10.6666 5.33333C11.0348 5.33333 11.3333 5.63181 11.3333 6ZM5.33325 6.66666C5.70144 6.66666 5.99992 6.36819 5.99992 6C5.99992 5.63181 5.70144 5.33333 5.33325 5.33333C4.96506 5.33333 4.66658 5.63181 4.66658 6C4.66658 6.36819 4.96506 6.66666 5.33325 6.66666Z" fill="#3582CD" />
                                    </svg>
                                    <div>Dưới 1 năm kinh nghiệm</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8C1.33325 4.3181 4.31802 1.33334 7.99992 1.33334C11.6818 1.33334 14.6666 4.3181 14.6666 8Z" fill="#3582CD" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 4.83334C8.27606 4.83334 8.49992 5.05719 8.49992 5.33334V7.7929L10.0201 9.31312C10.2154 9.50838 10.2154 9.82496 10.0201 10.0202C9.82488 10.2155 9.50829 10.2155 9.31303 10.0202L7.64637 8.35356C7.5526 8.25979 7.49992 8.13261 7.49992 8V5.33334C7.49992 5.05719 7.72378 4.83334 7.99992 4.83334Z" fill="white" />
                                    </svg>
                                    <div>Vừa truy cập</div>
                                </div>
                            </div>
                            <div className={s.listCandi_item_btn}>
                                <div className={s.listCandi_item_btn_save}>Lưu ứng viên</div>
                                <div className={s.listCandi_item_btn_chat}>Chat</div>
                            </div>
                        </div>
                        <div className={s.listCandi_item}>
                            <div className={s.listCandi_item_avatar}>
                                <Image
                                    alt='avatar'
                                    src='/images/candidate/Ellipse 11511110.svg'
                                    fill

                                ></Image>
                                <div className={s.listCandi_item_online}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12.0002" r="11" fill="#5DC22D" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                            <div className={s.listCandi_item_info}>
                                <div className={s.listCandi_item_info_name}>Ngô Minh Trang</div>
                                <div className={s.listCandi_item_info_nganhnghe}>Nhân viên kinh doanh</div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.33333C5.05456 1.33333 2.66675 4.00172 2.66675 6.99999C2.66675 9.97478 4.36896 13.2083 7.02479 14.4496C7.64391 14.739 8.35625 14.739 8.97537 14.4496C11.6312 13.2083 13.3334 9.97478 13.3334 6.99999C13.3334 4.00172 10.9456 1.33333 8.00008 1.33333ZM8.00008 7.99999C8.73646 7.99999 9.33342 7.40304 9.33342 6.66666C9.33342 5.93028 8.73646 5.33333 8.00008 5.33333C7.2637 5.33333 6.66675 5.93028 6.66675 6.66666C6.66675 7.40304 7.2637 7.99999 8.00008 7.99999Z" fill="#3582CD" />
                                    </svg>
                                    <div>Bà Rịa - Vũng Tàu</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.03459 0.833329H7.96525C7.36628 0.83331 6.86678 0.833295 6.47027 0.886605C6.05174 0.942875 5.67387 1.06665 5.37022 1.3703C5.06658 1.67395 4.9428 2.05181 4.88653 2.47034C4.83322 2.86686 4.83323 3.36634 4.83325 3.96532V4.01714C3.4858 4.06123 2.67666 4.21868 2.1143 4.78104C1.33325 5.56209 1.33325 6.81917 1.33325 9.33333C1.33325 11.8475 1.33325 13.1046 2.1143 13.8856C2.89535 14.6667 4.15243 14.6667 6.66658 14.6667H9.33325C11.8474 14.6667 13.1045 14.6667 13.8855 13.8856C14.6666 13.1046 14.6666 11.8475 14.6666 9.33333C14.6666 6.81917 14.6666 5.56209 13.8855 4.78104C13.3232 4.21868 12.514 4.06123 11.1666 4.01714V3.96533C11.1666 3.36636 11.1666 2.86686 11.1133 2.47034C11.057 2.05181 10.9333 1.67395 10.6296 1.3703C10.326 1.06665 9.9481 0.942875 9.52957 0.886605C9.13306 0.833295 8.63356 0.83331 8.03459 0.833329ZM10.1666 4.00125V4C10.1666 3.35732 10.1655 2.92562 10.1222 2.60359C10.0809 2.29595 10.0094 2.16429 9.92251 2.07741C9.83563 1.99053 9.70397 1.91905 9.39633 1.87769C9.0743 1.83439 8.64259 1.83333 7.99992 1.83333C7.35725 1.83333 6.92554 1.83439 6.60351 1.87769C6.29587 1.91905 6.16421 1.99053 6.07733 2.07741C5.99045 2.16429 5.91897 2.29595 5.87761 2.60359C5.83431 2.92562 5.83325 3.35732 5.83325 4V4.00125C6.09461 4 6.37196 4 6.66658 4H9.33325C9.62787 4 9.90523 4 10.1666 4.00125ZM11.3333 6C11.3333 6.36819 11.0348 6.66666 10.6666 6.66666C10.2984 6.66666 9.99992 6.36819 9.99992 6C9.99992 5.63181 10.2984 5.33333 10.6666 5.33333C11.0348 5.33333 11.3333 5.63181 11.3333 6ZM5.33325 6.66666C5.70144 6.66666 5.99992 6.36819 5.99992 6C5.99992 5.63181 5.70144 5.33333 5.33325 5.33333C4.96506 5.33333 4.66658 5.63181 4.66658 6C4.66658 6.36819 4.96506 6.66666 5.33325 6.66666Z" fill="#3582CD" />
                                    </svg>
                                    <div>Dưới 1 năm kinh nghiệm</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8C1.33325 4.3181 4.31802 1.33334 7.99992 1.33334C11.6818 1.33334 14.6666 4.3181 14.6666 8Z" fill="#3582CD" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 4.83334C8.27606 4.83334 8.49992 5.05719 8.49992 5.33334V7.7929L10.0201 9.31312C10.2154 9.50838 10.2154 9.82496 10.0201 10.0202C9.82488 10.2155 9.50829 10.2155 9.31303 10.0202L7.64637 8.35356C7.5526 8.25979 7.49992 8.13261 7.49992 8V5.33334C7.49992 5.05719 7.72378 4.83334 7.99992 4.83334Z" fill="white" />
                                    </svg>
                                    <div>Vừa truy cập</div>
                                </div>
                            </div>
                            <div className={s.listCandi_item_btn}>
                                <div className={s.listCandi_item_btn_save}>Lưu ứng viên</div>
                                <div className={s.listCandi_item_btn_chat}>Chat</div>
                            </div>
                        </div>
                        <div className={s.listCandi_item}>
                            <div className={s.listCandi_item_avatar}>
                                <Image
                                    alt='avatar'
                                    src='/images/candidate/Ellipse 11511110.svg'
                                    fill

                                ></Image>
                                <div className={s.listCandi_item_online}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12.0002" r="11" fill="#5DC22D" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                            <div className={s.listCandi_item_info}>
                                <div className={s.listCandi_item_info_name}>Ngô Minh Trang</div>
                                <div className={s.listCandi_item_info_nganhnghe}>Nhân viên kinh doanh</div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.33333C5.05456 1.33333 2.66675 4.00172 2.66675 6.99999C2.66675 9.97478 4.36896 13.2083 7.02479 14.4496C7.64391 14.739 8.35625 14.739 8.97537 14.4496C11.6312 13.2083 13.3334 9.97478 13.3334 6.99999C13.3334 4.00172 10.9456 1.33333 8.00008 1.33333ZM8.00008 7.99999C8.73646 7.99999 9.33342 7.40304 9.33342 6.66666C9.33342 5.93028 8.73646 5.33333 8.00008 5.33333C7.2637 5.33333 6.66675 5.93028 6.66675 6.66666C6.66675 7.40304 7.2637 7.99999 8.00008 7.99999Z" fill="#3582CD" />
                                    </svg>
                                    <div>Bà Rịa - Vũng Tàu</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.03459 0.833329H7.96525C7.36628 0.83331 6.86678 0.833295 6.47027 0.886605C6.05174 0.942875 5.67387 1.06665 5.37022 1.3703C5.06658 1.67395 4.9428 2.05181 4.88653 2.47034C4.83322 2.86686 4.83323 3.36634 4.83325 3.96532V4.01714C3.4858 4.06123 2.67666 4.21868 2.1143 4.78104C1.33325 5.56209 1.33325 6.81917 1.33325 9.33333C1.33325 11.8475 1.33325 13.1046 2.1143 13.8856C2.89535 14.6667 4.15243 14.6667 6.66658 14.6667H9.33325C11.8474 14.6667 13.1045 14.6667 13.8855 13.8856C14.6666 13.1046 14.6666 11.8475 14.6666 9.33333C14.6666 6.81917 14.6666 5.56209 13.8855 4.78104C13.3232 4.21868 12.514 4.06123 11.1666 4.01714V3.96533C11.1666 3.36636 11.1666 2.86686 11.1133 2.47034C11.057 2.05181 10.9333 1.67395 10.6296 1.3703C10.326 1.06665 9.9481 0.942875 9.52957 0.886605C9.13306 0.833295 8.63356 0.83331 8.03459 0.833329ZM10.1666 4.00125V4C10.1666 3.35732 10.1655 2.92562 10.1222 2.60359C10.0809 2.29595 10.0094 2.16429 9.92251 2.07741C9.83563 1.99053 9.70397 1.91905 9.39633 1.87769C9.0743 1.83439 8.64259 1.83333 7.99992 1.83333C7.35725 1.83333 6.92554 1.83439 6.60351 1.87769C6.29587 1.91905 6.16421 1.99053 6.07733 2.07741C5.99045 2.16429 5.91897 2.29595 5.87761 2.60359C5.83431 2.92562 5.83325 3.35732 5.83325 4V4.00125C6.09461 4 6.37196 4 6.66658 4H9.33325C9.62787 4 9.90523 4 10.1666 4.00125ZM11.3333 6C11.3333 6.36819 11.0348 6.66666 10.6666 6.66666C10.2984 6.66666 9.99992 6.36819 9.99992 6C9.99992 5.63181 10.2984 5.33333 10.6666 5.33333C11.0348 5.33333 11.3333 5.63181 11.3333 6ZM5.33325 6.66666C5.70144 6.66666 5.99992 6.36819 5.99992 6C5.99992 5.63181 5.70144 5.33333 5.33325 5.33333C4.96506 5.33333 4.66658 5.63181 4.66658 6C4.66658 6.36819 4.96506 6.66666 5.33325 6.66666Z" fill="#3582CD" />
                                    </svg>
                                    <div>Dưới 1 năm kinh nghiệm</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8C1.33325 4.3181 4.31802 1.33334 7.99992 1.33334C11.6818 1.33334 14.6666 4.3181 14.6666 8Z" fill="#3582CD" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 4.83334C8.27606 4.83334 8.49992 5.05719 8.49992 5.33334V7.7929L10.0201 9.31312C10.2154 9.50838 10.2154 9.82496 10.0201 10.0202C9.82488 10.2155 9.50829 10.2155 9.31303 10.0202L7.64637 8.35356C7.5526 8.25979 7.49992 8.13261 7.49992 8V5.33334C7.49992 5.05719 7.72378 4.83334 7.99992 4.83334Z" fill="white" />
                                    </svg>
                                    <div>Vừa truy cập</div>
                                </div>
                            </div>
                            <div className={s.listCandi_item_btn}>
                                <div className={s.listCandi_item_btn_save}>Lưu ứng viên</div>
                                <div className={s.listCandi_item_btn_chat}>Chat</div>
                            </div>
                        </div>
                        <div className={s.listCandi_item}>
                            <div className={s.listCandi_item_avatar}>
                                <Image
                                    alt='avatar'
                                    src='/images/candidate/Ellipse 11511110.svg'
                                    fill

                                ></Image>
                                <div className={s.listCandi_item_online}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12.0002" r="11" fill="#5DC22D" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                            <div className={s.listCandi_item_info}>
                                <div className={s.listCandi_item_info_name}>Ngô Minh Trang</div>
                                <div className={s.listCandi_item_info_nganhnghe}>Nhân viên kinh doanh</div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.33333C5.05456 1.33333 2.66675 4.00172 2.66675 6.99999C2.66675 9.97478 4.36896 13.2083 7.02479 14.4496C7.64391 14.739 8.35625 14.739 8.97537 14.4496C11.6312 13.2083 13.3334 9.97478 13.3334 6.99999C13.3334 4.00172 10.9456 1.33333 8.00008 1.33333ZM8.00008 7.99999C8.73646 7.99999 9.33342 7.40304 9.33342 6.66666C9.33342 5.93028 8.73646 5.33333 8.00008 5.33333C7.2637 5.33333 6.66675 5.93028 6.66675 6.66666C6.66675 7.40304 7.2637 7.99999 8.00008 7.99999Z" fill="#3582CD" />
                                    </svg>
                                    <div>Bà Rịa - Vũng Tàu</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.03459 0.833329H7.96525C7.36628 0.83331 6.86678 0.833295 6.47027 0.886605C6.05174 0.942875 5.67387 1.06665 5.37022 1.3703C5.06658 1.67395 4.9428 2.05181 4.88653 2.47034C4.83322 2.86686 4.83323 3.36634 4.83325 3.96532V4.01714C3.4858 4.06123 2.67666 4.21868 2.1143 4.78104C1.33325 5.56209 1.33325 6.81917 1.33325 9.33333C1.33325 11.8475 1.33325 13.1046 2.1143 13.8856C2.89535 14.6667 4.15243 14.6667 6.66658 14.6667H9.33325C11.8474 14.6667 13.1045 14.6667 13.8855 13.8856C14.6666 13.1046 14.6666 11.8475 14.6666 9.33333C14.6666 6.81917 14.6666 5.56209 13.8855 4.78104C13.3232 4.21868 12.514 4.06123 11.1666 4.01714V3.96533C11.1666 3.36636 11.1666 2.86686 11.1133 2.47034C11.057 2.05181 10.9333 1.67395 10.6296 1.3703C10.326 1.06665 9.9481 0.942875 9.52957 0.886605C9.13306 0.833295 8.63356 0.83331 8.03459 0.833329ZM10.1666 4.00125V4C10.1666 3.35732 10.1655 2.92562 10.1222 2.60359C10.0809 2.29595 10.0094 2.16429 9.92251 2.07741C9.83563 1.99053 9.70397 1.91905 9.39633 1.87769C9.0743 1.83439 8.64259 1.83333 7.99992 1.83333C7.35725 1.83333 6.92554 1.83439 6.60351 1.87769C6.29587 1.91905 6.16421 1.99053 6.07733 2.07741C5.99045 2.16429 5.91897 2.29595 5.87761 2.60359C5.83431 2.92562 5.83325 3.35732 5.83325 4V4.00125C6.09461 4 6.37196 4 6.66658 4H9.33325C9.62787 4 9.90523 4 10.1666 4.00125ZM11.3333 6C11.3333 6.36819 11.0348 6.66666 10.6666 6.66666C10.2984 6.66666 9.99992 6.36819 9.99992 6C9.99992 5.63181 10.2984 5.33333 10.6666 5.33333C11.0348 5.33333 11.3333 5.63181 11.3333 6ZM5.33325 6.66666C5.70144 6.66666 5.99992 6.36819 5.99992 6C5.99992 5.63181 5.70144 5.33333 5.33325 5.33333C4.96506 5.33333 4.66658 5.63181 4.66658 6C4.66658 6.36819 4.96506 6.66666 5.33325 6.66666Z" fill="#3582CD" />
                                    </svg>
                                    <div>Dưới 1 năm kinh nghiệm</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8C1.33325 4.3181 4.31802 1.33334 7.99992 1.33334C11.6818 1.33334 14.6666 4.3181 14.6666 8Z" fill="#3582CD" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 4.83334C8.27606 4.83334 8.49992 5.05719 8.49992 5.33334V7.7929L10.0201 9.31312C10.2154 9.50838 10.2154 9.82496 10.0201 10.0202C9.82488 10.2155 9.50829 10.2155 9.31303 10.0202L7.64637 8.35356C7.5526 8.25979 7.49992 8.13261 7.49992 8V5.33334C7.49992 5.05719 7.72378 4.83334 7.99992 4.83334Z" fill="white" />
                                    </svg>
                                    <div>Vừa truy cập</div>
                                </div>
                            </div>
                            <div className={s.listCandi_item_btn}>
                                <div className={s.listCandi_item_btn_save}>Lưu ứng viên</div>
                                <div className={s.listCandi_item_btn_chat}>Chat</div>
                            </div>
                        </div>
                        <div className={s.listCandi_item}>
                            <div className={s.listCandi_item_avatar}>
                                <Image
                                    alt='avatar'
                                    src='/images/candidate/Ellipse 11511110.svg'
                                    fill

                                ></Image>
                                <div className={s.listCandi_item_online}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12.0002" r="11" fill="#5DC22D" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                            <div className={s.listCandi_item_info}>
                                <div className={s.listCandi_item_info_name}>Ngô Minh Trang</div>
                                <div className={s.listCandi_item_info_nganhnghe}>Nhân viên kinh doanh</div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.33333C5.05456 1.33333 2.66675 4.00172 2.66675 6.99999C2.66675 9.97478 4.36896 13.2083 7.02479 14.4496C7.64391 14.739 8.35625 14.739 8.97537 14.4496C11.6312 13.2083 13.3334 9.97478 13.3334 6.99999C13.3334 4.00172 10.9456 1.33333 8.00008 1.33333ZM8.00008 7.99999C8.73646 7.99999 9.33342 7.40304 9.33342 6.66666C9.33342 5.93028 8.73646 5.33333 8.00008 5.33333C7.2637 5.33333 6.66675 5.93028 6.66675 6.66666C6.66675 7.40304 7.2637 7.99999 8.00008 7.99999Z" fill="#3582CD" />
                                    </svg>
                                    <div>Bà Rịa - Vũng Tàu</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.03459 0.833329H7.96525C7.36628 0.83331 6.86678 0.833295 6.47027 0.886605C6.05174 0.942875 5.67387 1.06665 5.37022 1.3703C5.06658 1.67395 4.9428 2.05181 4.88653 2.47034C4.83322 2.86686 4.83323 3.36634 4.83325 3.96532V4.01714C3.4858 4.06123 2.67666 4.21868 2.1143 4.78104C1.33325 5.56209 1.33325 6.81917 1.33325 9.33333C1.33325 11.8475 1.33325 13.1046 2.1143 13.8856C2.89535 14.6667 4.15243 14.6667 6.66658 14.6667H9.33325C11.8474 14.6667 13.1045 14.6667 13.8855 13.8856C14.6666 13.1046 14.6666 11.8475 14.6666 9.33333C14.6666 6.81917 14.6666 5.56209 13.8855 4.78104C13.3232 4.21868 12.514 4.06123 11.1666 4.01714V3.96533C11.1666 3.36636 11.1666 2.86686 11.1133 2.47034C11.057 2.05181 10.9333 1.67395 10.6296 1.3703C10.326 1.06665 9.9481 0.942875 9.52957 0.886605C9.13306 0.833295 8.63356 0.83331 8.03459 0.833329ZM10.1666 4.00125V4C10.1666 3.35732 10.1655 2.92562 10.1222 2.60359C10.0809 2.29595 10.0094 2.16429 9.92251 2.07741C9.83563 1.99053 9.70397 1.91905 9.39633 1.87769C9.0743 1.83439 8.64259 1.83333 7.99992 1.83333C7.35725 1.83333 6.92554 1.83439 6.60351 1.87769C6.29587 1.91905 6.16421 1.99053 6.07733 2.07741C5.99045 2.16429 5.91897 2.29595 5.87761 2.60359C5.83431 2.92562 5.83325 3.35732 5.83325 4V4.00125C6.09461 4 6.37196 4 6.66658 4H9.33325C9.62787 4 9.90523 4 10.1666 4.00125ZM11.3333 6C11.3333 6.36819 11.0348 6.66666 10.6666 6.66666C10.2984 6.66666 9.99992 6.36819 9.99992 6C9.99992 5.63181 10.2984 5.33333 10.6666 5.33333C11.0348 5.33333 11.3333 5.63181 11.3333 6ZM5.33325 6.66666C5.70144 6.66666 5.99992 6.36819 5.99992 6C5.99992 5.63181 5.70144 5.33333 5.33325 5.33333C4.96506 5.33333 4.66658 5.63181 4.66658 6C4.66658 6.36819 4.96506 6.66666 5.33325 6.66666Z" fill="#3582CD" />
                                    </svg>
                                    <div>Dưới 1 năm kinh nghiệm</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8C1.33325 4.3181 4.31802 1.33334 7.99992 1.33334C11.6818 1.33334 14.6666 4.3181 14.6666 8Z" fill="#3582CD" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 4.83334C8.27606 4.83334 8.49992 5.05719 8.49992 5.33334V7.7929L10.0201 9.31312C10.2154 9.50838 10.2154 9.82496 10.0201 10.0202C9.82488 10.2155 9.50829 10.2155 9.31303 10.0202L7.64637 8.35356C7.5526 8.25979 7.49992 8.13261 7.49992 8V5.33334C7.49992 5.05719 7.72378 4.83334 7.99992 4.83334Z" fill="white" />
                                    </svg>
                                    <div>Vừa truy cập</div>
                                </div>
                            </div>
                            <div className={s.listCandi_item_btn}>
                                <div className={s.listCandi_item_btn_save}>Lưu ứng viên</div>
                                <div className={s.listCandi_item_btn_chat}>Chat</div>
                            </div>
                        </div>
                        <div className={s.listCandi_item}>
                            <div className={s.listCandi_item_avatar}>
                                <Image
                                    alt='avatar'
                                    src='/images/candidate/Ellipse 11511110.svg'
                                    fill

                                ></Image>
                                <div className={s.listCandi_item_online}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12.0002" r="11" fill="#5DC22D" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                            <div className={s.listCandi_item_info}>
                                <div className={s.listCandi_item_info_name}>Ngô Minh Trang</div>
                                <div className={s.listCandi_item_info_nganhnghe}>Nhân viên kinh doanh</div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.33333C5.05456 1.33333 2.66675 4.00172 2.66675 6.99999C2.66675 9.97478 4.36896 13.2083 7.02479 14.4496C7.64391 14.739 8.35625 14.739 8.97537 14.4496C11.6312 13.2083 13.3334 9.97478 13.3334 6.99999C13.3334 4.00172 10.9456 1.33333 8.00008 1.33333ZM8.00008 7.99999C8.73646 7.99999 9.33342 7.40304 9.33342 6.66666C9.33342 5.93028 8.73646 5.33333 8.00008 5.33333C7.2637 5.33333 6.66675 5.93028 6.66675 6.66666C6.66675 7.40304 7.2637 7.99999 8.00008 7.99999Z" fill="#3582CD" />
                                    </svg>
                                    <div>Bà Rịa - Vũng Tàu</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.03459 0.833329H7.96525C7.36628 0.83331 6.86678 0.833295 6.47027 0.886605C6.05174 0.942875 5.67387 1.06665 5.37022 1.3703C5.06658 1.67395 4.9428 2.05181 4.88653 2.47034C4.83322 2.86686 4.83323 3.36634 4.83325 3.96532V4.01714C3.4858 4.06123 2.67666 4.21868 2.1143 4.78104C1.33325 5.56209 1.33325 6.81917 1.33325 9.33333C1.33325 11.8475 1.33325 13.1046 2.1143 13.8856C2.89535 14.6667 4.15243 14.6667 6.66658 14.6667H9.33325C11.8474 14.6667 13.1045 14.6667 13.8855 13.8856C14.6666 13.1046 14.6666 11.8475 14.6666 9.33333C14.6666 6.81917 14.6666 5.56209 13.8855 4.78104C13.3232 4.21868 12.514 4.06123 11.1666 4.01714V3.96533C11.1666 3.36636 11.1666 2.86686 11.1133 2.47034C11.057 2.05181 10.9333 1.67395 10.6296 1.3703C10.326 1.06665 9.9481 0.942875 9.52957 0.886605C9.13306 0.833295 8.63356 0.83331 8.03459 0.833329ZM10.1666 4.00125V4C10.1666 3.35732 10.1655 2.92562 10.1222 2.60359C10.0809 2.29595 10.0094 2.16429 9.92251 2.07741C9.83563 1.99053 9.70397 1.91905 9.39633 1.87769C9.0743 1.83439 8.64259 1.83333 7.99992 1.83333C7.35725 1.83333 6.92554 1.83439 6.60351 1.87769C6.29587 1.91905 6.16421 1.99053 6.07733 2.07741C5.99045 2.16429 5.91897 2.29595 5.87761 2.60359C5.83431 2.92562 5.83325 3.35732 5.83325 4V4.00125C6.09461 4 6.37196 4 6.66658 4H9.33325C9.62787 4 9.90523 4 10.1666 4.00125ZM11.3333 6C11.3333 6.36819 11.0348 6.66666 10.6666 6.66666C10.2984 6.66666 9.99992 6.36819 9.99992 6C9.99992 5.63181 10.2984 5.33333 10.6666 5.33333C11.0348 5.33333 11.3333 5.63181 11.3333 6ZM5.33325 6.66666C5.70144 6.66666 5.99992 6.36819 5.99992 6C5.99992 5.63181 5.70144 5.33333 5.33325 5.33333C4.96506 5.33333 4.66658 5.63181 4.66658 6C4.66658 6.36819 4.96506 6.66666 5.33325 6.66666Z" fill="#3582CD" />
                                    </svg>
                                    <div>Dưới 1 năm kinh nghiệm</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8C1.33325 4.3181 4.31802 1.33334 7.99992 1.33334C11.6818 1.33334 14.6666 4.3181 14.6666 8Z" fill="#3582CD" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 4.83334C8.27606 4.83334 8.49992 5.05719 8.49992 5.33334V7.7929L10.0201 9.31312C10.2154 9.50838 10.2154 9.82496 10.0201 10.0202C9.82488 10.2155 9.50829 10.2155 9.31303 10.0202L7.64637 8.35356C7.5526 8.25979 7.49992 8.13261 7.49992 8V5.33334C7.49992 5.05719 7.72378 4.83334 7.99992 4.83334Z" fill="white" />
                                    </svg>
                                    <div>Vừa truy cập</div>
                                </div>
                            </div>
                            <div className={s.listCandi_item_btn}>
                                <div className={s.listCandi_item_btn_save}>Lưu ứng viên</div>
                                <div className={s.listCandi_item_btn_chat}>Chat</div>
                            </div>
                        </div>
                        <div className={s.listCandi_item}>
                            <div className={s.listCandi_item_avatar}>
                                <Image
                                    alt='avatar'
                                    src='/images/candidate/Ellipse 11511110.svg'
                                    fill

                                ></Image>
                                <div className={s.listCandi_item_online}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12.0002" r="11" fill="#5DC22D" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                            <div className={s.listCandi_item_info}>
                                <div className={s.listCandi_item_info_name}>Ngô Minh Trang</div>
                                <div className={s.listCandi_item_info_nganhnghe}>Nhân viên kinh doanh</div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.33333C5.05456 1.33333 2.66675 4.00172 2.66675 6.99999C2.66675 9.97478 4.36896 13.2083 7.02479 14.4496C7.64391 14.739 8.35625 14.739 8.97537 14.4496C11.6312 13.2083 13.3334 9.97478 13.3334 6.99999C13.3334 4.00172 10.9456 1.33333 8.00008 1.33333ZM8.00008 7.99999C8.73646 7.99999 9.33342 7.40304 9.33342 6.66666C9.33342 5.93028 8.73646 5.33333 8.00008 5.33333C7.2637 5.33333 6.66675 5.93028 6.66675 6.66666C6.66675 7.40304 7.2637 7.99999 8.00008 7.99999Z" fill="#3582CD" />
                                    </svg>
                                    <div>Bà Rịa - Vũng Tàu</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.03459 0.833329H7.96525C7.36628 0.83331 6.86678 0.833295 6.47027 0.886605C6.05174 0.942875 5.67387 1.06665 5.37022 1.3703C5.06658 1.67395 4.9428 2.05181 4.88653 2.47034C4.83322 2.86686 4.83323 3.36634 4.83325 3.96532V4.01714C3.4858 4.06123 2.67666 4.21868 2.1143 4.78104C1.33325 5.56209 1.33325 6.81917 1.33325 9.33333C1.33325 11.8475 1.33325 13.1046 2.1143 13.8856C2.89535 14.6667 4.15243 14.6667 6.66658 14.6667H9.33325C11.8474 14.6667 13.1045 14.6667 13.8855 13.8856C14.6666 13.1046 14.6666 11.8475 14.6666 9.33333C14.6666 6.81917 14.6666 5.56209 13.8855 4.78104C13.3232 4.21868 12.514 4.06123 11.1666 4.01714V3.96533C11.1666 3.36636 11.1666 2.86686 11.1133 2.47034C11.057 2.05181 10.9333 1.67395 10.6296 1.3703C10.326 1.06665 9.9481 0.942875 9.52957 0.886605C9.13306 0.833295 8.63356 0.83331 8.03459 0.833329ZM10.1666 4.00125V4C10.1666 3.35732 10.1655 2.92562 10.1222 2.60359C10.0809 2.29595 10.0094 2.16429 9.92251 2.07741C9.83563 1.99053 9.70397 1.91905 9.39633 1.87769C9.0743 1.83439 8.64259 1.83333 7.99992 1.83333C7.35725 1.83333 6.92554 1.83439 6.60351 1.87769C6.29587 1.91905 6.16421 1.99053 6.07733 2.07741C5.99045 2.16429 5.91897 2.29595 5.87761 2.60359C5.83431 2.92562 5.83325 3.35732 5.83325 4V4.00125C6.09461 4 6.37196 4 6.66658 4H9.33325C9.62787 4 9.90523 4 10.1666 4.00125ZM11.3333 6C11.3333 6.36819 11.0348 6.66666 10.6666 6.66666C10.2984 6.66666 9.99992 6.36819 9.99992 6C9.99992 5.63181 10.2984 5.33333 10.6666 5.33333C11.0348 5.33333 11.3333 5.63181 11.3333 6ZM5.33325 6.66666C5.70144 6.66666 5.99992 6.36819 5.99992 6C5.99992 5.63181 5.70144 5.33333 5.33325 5.33333C4.96506 5.33333 4.66658 5.63181 4.66658 6C4.66658 6.36819 4.96506 6.66666 5.33325 6.66666Z" fill="#3582CD" />
                                    </svg>
                                    <div>Dưới 1 năm kinh nghiệm</div>
                                </div>
                                <div className={s.listCandi_item_info_thongtinchung}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8C1.33325 4.3181 4.31802 1.33334 7.99992 1.33334C11.6818 1.33334 14.6666 4.3181 14.6666 8Z" fill="#3582CD" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 4.83334C8.27606 4.83334 8.49992 5.05719 8.49992 5.33334V7.7929L10.0201 9.31312C10.2154 9.50838 10.2154 9.82496 10.0201 10.0202C9.82488 10.2155 9.50829 10.2155 9.31303 10.0202L7.64637 8.35356C7.5526 8.25979 7.49992 8.13261 7.49992 8V5.33334C7.49992 5.05719 7.72378 4.83334 7.99992 4.83334Z" fill="white" />
                                    </svg>
                                    <div>Vừa truy cập</div>
                                </div>
                            </div>
                            <div className={s.listCandi_item_btn}>
                                <div className={s.listCandi_item_btn_save}>Lưu ứng viên</div>
                                <div className={s.listCandi_item_btn_chat}>Chat</div>
                            </div>
                        </div>
                    </div>
                    <div className={s.btn_xemthem}>
                        <div >Xem thêm</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AIGoiYUngVien;