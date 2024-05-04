import { useState, useEffect, useRef, useMemo } from 'react';
import { getCookie } from 'cookies-next';
import Image from 'next/image';

import { Carousel, Form, Modal, Rate, Checkbox, Input, Button } from 'antd';
import ViTriDangTuyen from '@/components/nha-tuyen-dung/chi-tiet-cong-ty/vi_tri_dang_tuyen';
import CongViecYeuThich from '@/components/nha-tuyen-dung/chi-tiet-cong-ty/cong_viec_yeu_thich';
import DoanhNghiepTuongTu from '@/components/nha-tuyen-dung/chi-tiet-cong-ty/doanh_nghiep_tuong_tu';
import TuVanViecLam from '@/components/nha-tuyen-dung/chi-tiet-cong-ty/tu_van_viec_lam';
import RateStar from '@/components/nha-tuyen-dung/chi-tiet-cong-ty/rate';
import LienHe from '@/components/nha-tuyen-dung/chi-tiet-cong-ty/lien_he';
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";


import * as dataComponent from '@/components/nha-tuyen-dung/chi-tiet-cong-ty/data.js';
import s from './styles.module.scss';
import { POST, POST_SERVER } from '@/pages/api/base-api';
import Cookies from 'js-cookie';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { city_array, getQuyMo, getTokenServerSide, handleImageSource, job_array } from '@/functions/functions';

const CheckboxGroup = Checkbox.Group;

export const getServerSideProps = async (context: NextPageContext) => {
    const token = getTokenServerSide(context);
    const id = context.query.id;

    const data = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_EMPLOY}/ntd/DetailNTD`, { id }, token);
    if (data?.result == true) {
        return {
            props: {
                data: data.data
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

const ChiTietCongTy: React.FC<{ data: any }> = ({ data }) => {

    const carouselRef = useRef<any>(null);
    // const [listTongQuan, setListTongQuan] = useState<any>(dataComponent.listTongQuan);
    const [showAll, setShowAll] = useState(false);
    const [listImage, setListImage] = useState<any>(data?.image_com);
    const [workInfo, setWorkInfo] = useState(data?.news || []);
    const [sameJob, setSameJob] = useState(data?.sameJob || [])
    const [isOpenLetter, setIsOpenLetter] = useState(false);
    // const [listCongViec, setListCongViec] = useState(dataComponent.listCongViec);
    const [listDoanhNghiep, setListDoanhNghiep] = useState(data?.sameCom || []);
    const [listTuVan, setListTuVan] = useState(data?.blog || []);
    const [rateInfo, setRateInfo] = useState(dataComponent.rateInfo);
    const [rateMedium, setRateMedium] = useState(3);
    const [rateYourself, setRateYourSelf] = useState({
        vanHoaCongTy: 0,
        vanPhongCongTy: 0,
        phucLoiCongTy: 0,
        coHoiThangTien: 0,
        lanhDaoCongTy: 0
    });
    const [addressInfo, setAddressInfo] = useState(dataComponent.addressInfo);
    const [isOpenDanhGia1, setIsOpenDanhGia1] = useState(false);
    const [isOpenDanhGia2, setIsOpenDanhGia2] = useState(false);
    const [options, setOptions] = useState(["Sẽ giới thiệu cho bạn bè", "Hài lòng về môi trường làm việc", "Hài lòng về lãnh đạo công ty"]);
    const [checkedList, setCheckedList] = useState([]);
    // const [isApply, setIsApply] = useState(data?.apply);
    const [applyingId, setApplyingId] = useState<number>(0)
    const [contentApply, setContentApply] = useState<string>('');

    // console.log('check data: ', data);

    useEffect(() => {
        if(data?.image_com) {
            setListImage(data?.image_com)
        }
        setWorkInfo(data?.news)
        setSameJob(data?.sameJob)
        setListDoanhNghiep(data?.sameCom)
        setListTuVan(data?.blog)
        setRateInfo(dataComponent.rateInfo)
    }, [data])

    const onChangeChecked = (list: any) => {
        setCheckedList(list);
    }

    const handleSeeMore = () => {
        setShowAll(true);
    };

    const handleChatNgay = () => {
        console.log("Chat ngay thành công");
    };

    const handleUngTuyenNgay = (id: number) => {
        setApplyingId(id)
        setIsOpenLetter(true);
    };

    const handleGuiThuUngTuyen = async () => {
        const response = await POST('candidate/ApplyJob', { id: applyingId, lt: contentApply })
        if (response.result) {
            alert('Ứng tuyển thành công.')
            const newArr = workInfo.map((tintuc: any, index: number) => {
                if (tintuc?.new_id === applyingId) {
                    return { ...tintuc, checkUngTuyen: true }
                }
                return tintuc
            })
            setWorkInfo(newArr)
            setIsOpenLetter(false);
        }
    };

    const handleClose = () => {
        setIsOpenLetter(false);
        setIsOpenDanhGia1(false);
        setIsOpenDanhGia2(false);
    };

    const handleLike = () => {
        console.log("like");
    };

    const handleDanhGia1 = () => {
        setIsOpenDanhGia1(true)
    };

    const handleGuiDanhGia1 = () => {
        console.log("rateYourself", rateYourself, "checkedList", checkedList);
        setIsOpenDanhGia1(false);
    }

    const handleDanhGia2 = () => {
        setIsOpenDanhGia2(true)
    }

    const handleGuiDanhGia2 = (values: any) => {
        console.log('Received values:', values);
        setIsOpenDanhGia2(false);
    }

    const handleRateChange = (itemName: any, value: any) => {
        setRateYourSelf((prevState: any) => ({
            ...prevState,
            [itemName]: value,
        }));
    };

    const convertTime = useMemo(() => {
        const dateString = data?.usc_create_time || '';
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('vi-VN');
        return formattedDate
    }, [data?.usc_create_time])

    // lay linh vuc hoat dong
    const sectorList: any[] = [];
    const sectorId: any = (data?.financial_sector || []).map((sector: any) => sector.id)

    sectorId?.forEach((id: any) => {
        sectorList.push(job_array.find((job: any) => job?.cat_id == id)?.cat_name)
    })

    return (
        <>
            <style>
                {`
                    .ant-rate {
                        color: #ffa317;
                    }
                    .modal-danh-gia-1{
                        margin-top: 20px;
                        margin-bottom: 20px;
                        .ant-modal-content{
                            padding: 0px 0px 20px 0px;

                            .ant-modal-title{
                                display: flex;
                                height: 45px;
                                padding: 10px 24px;
                                justify-content: space-between;
                                align-items: center;

                                border-radius: 4px 4px 0px 0px;
                                background: #3582CD;
                                color: var(--FFFFFF, #FFF);
                                font-family: Roboto;
                                font-size: 16px;
                                font-style: normal;
                                font-weight: 600;
                                line-height: normal;
                            }

                            .ant-modal-close{
                                top: 14px;
                            }

                            .ant-modal-body{
                                padding: 0px 24px;
                                display: flex;
                                flex-direction: column;
                                gap: 16px;
                            }
                        }
                        .ant-checkbox-group{
                            display: flex;
                            flex-direction: column;
                            gap: 16px;
                            .ant-checkbox-group-item{
                                color: #666;
                                leading-trim: both;
                                text-edge: cap;
                                font-family: Roboto;
                                font-size: 16px;
                                font-style: normal;
                                font-weight: 400;
                                line-height: normal;
                            }
                        }
                    }
                    .modal-danh-gia-2{

                        @media (min-width: 1366px) {
                            width: 1200px!important;
                        }

                        @media (min-width: 1024px) and (max-width: 1365px) {
                            width: 768px!important;
                        }

                        margin-top: 20px;
                        margin-bottom: 20px;
                        .ant-modal-content{
                            padding: 0px 0px 0px 0px;
                            .ant-modal-header{
                                background: #3582CD;
                                border-radius: 4px 4px 0px 0px;
                                width: 100%;
                                display: flex;
                                height: max-content;

                                .ant-modal-title{
                                    @media(min-width: 414px) and (max-width: 500px){
                                        width: 95%;
                                    }
                                    display: flex;
                                    height: 45px;
                                    padding: 10px 24px;
                                    justify-content: space-between;
                                    align-items: center;
                                    border-radius: 4px 4px 0px 0px;
                                    color: #FFF;
                                    font-family: Roboto;
                                    font-size: 16px;
                                    font-style: normal;
                                    font-weight: 600;
                                    line-height: normal;
                                }
                            }

                            .ant-modal-close{
                                top: 14px;
                            }

                            .ant-modal-body{
                                padding: 0px 24px;
                                display: flex;
                                flex-direction: column;
                                gap: 16px;
                            }
                        }
                    }
                `}
            </style>

            <Header />

            <div className={s.header}>
                <div className={s.background_header}>
                    <div className={s.banner}>
                        <Image priority src={(data?.image_com || [])[0] || "/images/nha-tuyen-dung/chi-tiet-cong-ty/banner_1200.png"} alt={""} height={164} width={768} className={s.banner_image} style={{ objectFit: 'cover' }} onError={(e) => {
                            e.currentTarget.srcset = '/images/candidate/ava_default.png'
                        }}></Image>
                        <Image
                            src={(handleImageSource(data?.usc_logo) || 'https://43.239.223.188/pictures/2024/2/26/1709624793_meo.jpg')}
                            // src=" https://43.239.223.188/pictures/2024/2/26/1709624793_meo.jpg"
                            alt={"logo"} height={125} width={132} className={s.icon_banner}
                            onError={(e) => {
                                e.currentTarget.srcset = '/images/candidate/ava_default.png'
                            }}
                            style={{
                                objectFit: 'cover'
                            }}
                        ></Image>
                    </div >
                    <div className={s.content}>
                        <div className={s.banner_item_1}>
                            <span>{data?.usc_company || ''}</span>
                            <div className={s.lien_he}>
                                <div className={s.lien_he_item}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M14 6.45337C14 7.05781 13.9326 7.59411 13.7978 8.06226C13.6615 8.53189 13.3985 9.08967 13.0089 9.73559C12.6178 10.3815 12.0733 11.1986 11.3756 12.1867C10.6778 13.166 9.76074 14.4837 8.62444 16.14C8.55185 16.2348 8.46074 16.3104 8.35111 16.3667C8.24148 16.4245 8.12444 16.4534 8 16.4534C7.87556 16.4534 7.75852 16.4245 7.64889 16.3667C7.53926 16.3104 7.44815 16.2348 7.37556 16.14C6.23926 14.4837 5.32222 13.166 4.62444 12.1867C3.92667 11.1986 3.38222 10.3815 2.99111 9.73559C2.60148 9.08967 2.33852 8.53189 2.20222 8.06226C2.06741 7.59411 2 7.05781 2 6.45337C2 5.62078 2.1563 4.84448 2.46889 4.12448C2.78148 3.39559 3.21111 2.75781 3.75778 2.21115C4.30444 1.66448 4.94222 1.23485 5.67111 0.922258C6.39111 0.609665 7.16741 0.453369 8 0.453369C8.83407 0.453369 9.61037 0.609665 10.3289 0.922258C11.0578 1.23485 11.6956 1.66448 12.2422 2.21115C12.7889 2.75781 13.2185 3.39559 13.5311 4.12448C13.8437 4.84448 14 5.62078 14 6.45337ZM13 6.45337C13 5.76596 12.8696 5.11485 12.6089 4.50004C12.3481 3.89559 11.9919 3.3667 11.54 2.91337C11.0867 2.46152 10.5578 2.10522 9.95333 1.84448C9.33852 1.58374 8.68741 1.45337 8 1.45337C7.31259 1.45337 6.66148 1.58374 6.04667 1.84448C5.44222 2.10522 4.91333 2.46152 4.46 2.91337C4.00815 3.3667 3.65185 3.89559 3.39111 4.50004C3.13037 5.11485 3 5.76596 3 6.45337C3 6.95411 3.05704 7.39707 3.17111 7.78226C3.2763 8.16744 3.50593 8.65189 3.86 9.23559C4.21407 9.81781 4.71926 10.5726 5.37556 11.5C6.03185 12.4274 6.90667 13.683 8 15.2667C9.09333 13.6726 9.97333 12.4119 10.64 11.4845C11.2963 10.5571 11.7993 9.80448 12.1489 9.2267C12.497 8.64892 12.7289 8.16744 12.8444 7.78226C12.9481 7.39707 13 6.95411 13 6.45337ZM10.5 6.45337C10.4896 7.14078 10.2422 7.72448 9.75778 8.20448C9.27333 8.683 8.68741 8.92226 8 8.92226C7.31259 8.92226 6.7237 8.67707 6.23333 8.1867C5.74444 7.69781 5.5 7.10967 5.5 6.42226C5.5 5.73485 5.74444 5.14596 6.23333 4.65559C6.7237 4.1667 7.31259 3.92226 8 3.92226C8.68741 3.92226 9.2763 4.1667 9.76667 4.65559C10.2556 5.14596 10.5 5.73485 10.5 6.42226C10.5 6.43263 10.5 6.44004 10.5 6.44448C10.5 6.45041 10.5 6.45337 10.5 6.45337ZM9.5 6.45337C9.5 6.45337 9.5 6.45041 9.5 6.44448C9.5 6.44004 9.5 6.43263 9.5 6.42226C9.5 6.00596 9.35407 5.65189 9.06222 5.36004C8.77037 5.06818 8.4163 4.92226 8 4.92226C7.5837 4.92226 7.22963 5.06818 6.93778 5.36004C6.64593 5.65189 6.5 6.00596 6.5 6.42226C6.5 6.83855 6.64593 7.19263 6.93778 7.48448C7.22963 7.77633 7.5837 7.92226 8 7.92226C8.40593 7.92226 8.75481 7.77929 9.04667 7.49337C9.33852 7.20596 9.48963 6.85929 9.5 6.45337Z" fill="#2C95FF" />
                                    </svg>
                                    <span>{city_array.find((city: any) => city?.cit_id == data?.usc_city)?.cit_name}</span>
                                </div>
                                <div className={s.lien_he_item}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                        <path d="M16.2047 8.45337C16.2047 9.48448 16.0121 10.4534 15.627 11.36C15.2314 12.2771 14.6951 13.0741 14.0181 13.7511C13.341 14.4282 12.544 14.9593 11.627 15.3445C10.7203 15.74 9.7514 15.9378 8.72028 15.9378C7.68917 15.9378 6.7151 15.74 5.79806 15.3445C4.8914 14.9489 4.09954 14.4126 3.42251 13.7356C2.74547 13.0586 2.20917 12.2667 1.81362 11.36C1.42843 10.4534 1.23584 9.47929 1.23584 8.43781C1.23584 7.4067 1.42843 6.43781 1.81362 5.53115C2.20917 4.61411 2.74547 3.81707 3.42251 3.14004C4.09954 2.463 4.8914 1.93189 5.79806 1.5467C6.7151 1.15115 7.68917 0.953369 8.72028 0.953369C9.7514 0.953369 10.7255 1.15115 11.6425 1.5467C12.5492 1.93189 13.341 2.463 14.0181 3.14004C14.6951 3.81707 15.2314 4.61411 15.627 5.53115C16.0121 6.43781 16.2047 7.4067 16.2047 8.43781C16.2047 8.44818 16.2047 8.45337 16.2047 8.45337ZM2.54917 10.4534H4.87584C4.83436 10.1511 4.79806 9.83115 4.76695 9.49337C4.73584 9.15411 4.72028 8.80744 4.72028 8.45337C4.72028 8.0993 4.73362 7.74744 4.76028 7.39781C4.78547 7.04967 4.82399 6.70892 4.87584 6.37559V6.45337H2.54917C2.44399 6.75559 2.36547 7.07559 2.31362 7.41337C2.26177 7.75263 2.23584 8.0993 2.23584 8.45337C2.23584 8.80744 2.26473 9.15633 2.32251 9.50004C2.3788 9.84374 2.45954 10.1771 2.56473 10.5L2.54917 10.4534ZM2.98695 5.42226L2.9714 5.45337H5.06473C5.19954 4.88004 5.3788 4.34374 5.60251 3.84448C5.82621 3.34374 6.08917 2.86967 6.3914 2.42226L6.37584 2.45337C5.63658 2.74522 4.97806 3.14596 4.40028 3.65559C3.82251 4.1667 3.3514 4.75559 2.98695 5.42226ZM6.37584 14.5C6.07362 14.0734 5.81065 13.6074 5.58695 13.1023C5.36325 12.5971 5.19436 12.0682 5.08028 11.5156L5.06473 11.4534H2.9714C3.33584 12.1511 3.80695 12.7608 4.38473 13.2823C4.96251 13.8023 5.61065 14.203 6.32917 14.4845L6.37584 14.5ZM5.8914 10.4534H11.5803C11.6218 10.1719 11.6551 9.87263 11.6803 9.55559C11.707 9.23707 11.7203 8.91115 11.7203 8.57781C11.7203 8.55707 11.7203 8.53633 11.7203 8.51559C11.7203 8.49485 11.7203 8.47411 11.7203 8.45337C11.7203 8.0993 11.7047 7.75041 11.6736 7.4067C11.6425 7.063 11.601 6.7193 11.5492 6.37559L11.5647 6.45337H5.8914C5.83954 6.75559 5.80102 7.07559 5.77584 7.41337C5.74917 7.75263 5.73584 8.0993 5.73584 8.45337C5.73584 8.80744 5.74917 9.15633 5.77584 9.50004C5.80102 9.84374 5.84473 10.1874 5.90695 10.5311L5.8914 10.4534ZM6.09584 5.45337H11.3758C11.1062 4.38078 10.721 3.52892 10.2203 2.89781C9.72103 2.26818 9.22102 1.95337 8.72028 1.95337C8.22102 1.95337 7.72621 2.26818 7.23584 2.89781C6.74695 3.52892 6.36695 4.38078 6.09584 5.45337ZM11.3447 11.4534H6.09584C6.36695 12.526 6.74695 13.3778 7.23584 14.0089C7.72621 14.6386 8.22102 14.9534 8.72028 14.9534C9.22102 14.9534 9.71584 14.6386 10.2047 14.0089C10.6936 13.3778 11.0736 12.526 11.3447 11.4534ZM11.127 2.46892L11.0958 2.45337C11.3877 2.88004 11.6455 3.34078 11.8692 3.83559C12.0929 4.33041 12.267 4.84892 12.3914 5.39115L12.407 5.45337H14.487C14.121 4.76596 13.6492 4.1667 13.0714 3.65559C12.4936 3.14596 11.8455 2.75041 11.127 2.46892ZM14.487 11.4845L14.5025 11.4534H12.407C12.2721 12.0371 12.0929 12.5837 11.8692 13.0934C11.6455 13.6045 11.3773 14.0837 11.0647 14.5311L11.0958 14.5C11.8351 14.2082 12.4936 13.8023 13.0714 13.2823C13.6492 12.7608 14.121 12.1615 14.487 11.4845ZM14.9225 6.45337H12.5958C12.6373 6.74522 12.6684 7.05485 12.6892 7.38226C12.7099 7.71115 12.7203 8.04744 12.7203 8.39115C12.7203 8.40152 12.7203 8.41189 12.7203 8.42226C12.7203 8.43263 12.7203 8.443 12.7203 8.45337C12.7203 8.80744 12.707 9.15633 12.6803 9.50004C12.6551 9.84374 12.6166 10.1874 12.5647 10.5311L12.5803 10.4534H14.9225C15.0173 10.1511 15.0929 9.83115 15.1492 9.49337C15.207 9.15411 15.2358 8.80744 15.2358 8.45337C15.2358 8.0993 15.207 7.75041 15.1492 7.4067C15.0929 7.063 15.0121 6.72967 14.907 6.4067L14.9225 6.45337Z" fill="#2C95FF" />
                                    </svg>
                                    {/* <span>{listTongQuan?.data?.usc_website}</span> */}
                                    <span>{data?.usc_website}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                        <path d="M3.72021 1.7511H13.7202C14.2728 1.7511 14.7439 1.94591 15.1335 2.33554C15.5247 2.72665 15.7202 3.19851 15.7202 3.7511V13.7511C15.7202 14.3022 15.5247 14.7733 15.1335 15.1644C14.7439 15.5555 14.2728 15.7511 13.7202 15.7511H3.72021C3.16762 15.7511 2.69651 15.5555 2.30688 15.1644C1.91577 14.7733 1.72021 14.3022 1.72021 13.7511V3.7511C1.72021 3.19851 1.91577 2.72665 2.30688 2.33554C2.69651 1.94591 3.16762 1.7511 3.72021 1.7511ZM2.72021 3.7511V13.7511C2.72021 14.0207 2.81651 14.2548 3.0091 14.4533C3.2017 14.6518 3.43873 14.7511 3.72021 14.7511H13.7202C14.0017 14.7511 14.2387 14.6518 14.4313 14.4533C14.6239 14.2548 14.7202 14.0207 14.7202 13.7511V3.7511C14.7202 3.46962 14.6239 3.23258 14.4313 3.03999C14.2387 2.84739 14.0017 2.7511 13.7202 2.7511H3.72021C3.43873 2.7511 3.2017 2.84739 3.0091 3.03999C2.81651 3.23258 2.72021 3.46962 2.72021 3.7511ZM5.87577 10.8911L9.98688 6.7511H7.1891C7.05429 6.74073 6.94244 6.68591 6.85355 6.58665C6.76466 6.48739 6.72021 6.37554 6.72021 6.2511C6.72021 6.24073 6.72021 6.23258 6.72021 6.22665C6.72021 6.22221 6.72021 6.21999 6.72021 6.21999C6.73059 6.08369 6.78244 5.9711 6.87577 5.88221C6.97059 5.7948 7.08021 5.7511 7.20466 5.7511C7.21503 5.7511 7.22021 5.7511 7.22021 5.7511H11.2202C11.355 5.7511 11.4721 5.79777 11.5713 5.8911C11.6706 5.98443 11.7202 6.10443 11.7202 6.2511V10.2511C11.7202 10.3859 11.6706 10.5029 11.5713 10.6022C11.4721 10.7015 11.355 10.7511 11.2202 10.7511C11.0854 10.7511 10.9684 10.7015 10.8691 10.6022C10.7698 10.5029 10.7202 10.3859 10.7202 10.2511V7.45332L6.56466 11.5933C6.52318 11.6348 6.47355 11.6718 6.41577 11.7044C6.35799 11.7355 6.29281 11.7511 6.22021 11.7511C6.14762 11.7511 6.08244 11.7355 6.02466 11.7044C5.96688 11.6718 5.91725 11.6348 5.87577 11.5933C5.82392 11.5518 5.7854 11.5 5.76021 11.4378C5.73355 11.3755 5.72021 11.3133 5.72021 11.2511C5.72021 11.177 5.73355 11.1089 5.76021 11.0467C5.7854 10.9844 5.82392 10.9326 5.87577 10.8911Z" fill="#3582CD" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/* <div className={s.banner_item_2}>
                            <button className={s.button_like} onClick={handleLike}>Like</button>
                            <button className={s.button_danh_gia} onClick={handleDanhGia1}>Đánh giá</button>
                        </div> */}
                    </div>

                </div>
            </div>

            <div className={s.body}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>

                    <div className={s.grid_col_1}>

                        <div className={s.box_1}>
                            <div className={s.box_1_title}> Tổng quan</div>
                            <div className={s.box_1_content}>Trụ sở chính: {data?.usc_address}</div>
                            <div className={s.box_1_content}>Quy mô công ty: {getQuyMo(data?.usc_size || 0)}</div>
                            <div className={s.box_1_content}>Mã số thuế: {data?.usc_mst || ''}</div>
                            <div className={s.box_1_content}>Tổng giám đốc/Người đại diện pháp luật: {data?.usc_boss || ''}</div>
                            <div className={s.box_1_content}>Website: {data?.usc_website || ''}</div>
                            <div className={s.box_1_content}>Ngày tham gia Timviechay: {convertTime}</div>
                            <div className={s.box_1_content}>Lĩnh vực hoạt động: {sectorList.map((sector, indexSector) => { return <span>{sector}{indexSector + 1 < sectorList.length ? `,` : '.'}&#160;</span> })}</div>
                            <div className={s.box_1_content}>Mô tả công ty: {data?.usc_company_info || ''}</div>
                            {/* <div className={s.box_1_content}>
                                Nếu bạn chưa có kinh nghiệm phỏng vấn FPT Shop thì hãy tham khảo bộ câu hỏi phỏng vấn FPT Shop sau đây để
                                có thêm kinh nghiệm vượt qua vòng phỏng vấn dễ dàng
                            </div> */}
                        </div>
                    </div>

                    <div className={s.grid_col_1}>
                        <div className={s.box_2}>
                            <span className={s.box_2_title}>Hình ảnh</span>
                            <div className={s.carousel}>
                                <div className={s.carousel_left}>
                                    {listImage?.length > 1 && (
                                        <>
                                            {listImage && listImage?.slice(0, 3)?.map((item: any, index: any) => {
                                                return (
                                                    <Image key={index} src={item} alt={""} height={123} width={123} className={s.carousel_item} style={{ objectFit: 'cover' }}></Image>
                                                )
                                            })}

                                            {/* <div className={s.carousel_item_last}>
                                                    <Image src={listImage[4]} alt={""} height={123} width={123} style={{ height: "123px", width: "123px" }}></Image>
                                                    {listImage?.length > 4 ? <div className={s.modal_mask}>+ {listImage?.length - 4}</div> : <></>}
                                                </div> */}
                                        </>

                                    )}

                                    {
                                        listImage?.length  == 1 &&
                                            <Image src={listImage ? listImage[0] : ''} alt={""} height={123} width={123} className={s.carousel_item} style={{ objectFit: 'cover' }}></Image>
                                    }
                                     
                                </div>
                                <div className={s.carousel_left_plus}>
                                    {listImage?.slice(0, 2).length > 0  && listImage?.slice(0, 2)?.map((item: any, index: any) => {
                                        return (
                                            <Image key={index} src={item} alt={""} height={123} width={123} className={s.carousel_item} style={{ objectFit: 'cover' }}></Image>
                                        )
                                    })}
                                    {listImage?.length > 2 ? (
                                        <div className={s.carousel_item_last}>
                                            <Image src={listImage[3]} alt={""} height={123} width={123} style={{ height: "123px", width: "123px", objectFit: 'cover' }}></Image>
                                            {listImage?.length > 3 ? <div className={s.modal_mask}>+ {listImage?.length - 3}</div> : <></>}
                                        </div>
                                    ) : <></>}
                                </div>

                                {
                                    listImage?.length > 0 &&
                                <div className={s.carousel_right}>
                                    <Carousel
                                        ref={carouselRef}
                                        dots={false}
                                    >
                                        {listImage && listImage?.map((item: any, index: any) => {
                                            return (
                                                <Image key={index} src={item} alt={""} height={521} width={798} className={s.carousel_right_item} style={{ objectFit: 'contain' }}></Image>
                                            )
                                        })}
                                    </Carousel>
                                    <button className={s.pastButtonCarousel} onClick={() => carouselRef.current.prev()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="#fff">
                                            <path d="M17.3997 2.65852C17.7044 2.96325 17.8755 3.3765 17.8755 3.80739C17.8755 4.23828 17.7044 4.65153 17.3997 4.95626L9.356 13L17.3997 21.0437C17.6958 21.3502 17.8595 21.7607 17.8558 22.1868C17.8521 22.6128 17.6812 23.0204 17.38 23.3217C17.0787 23.623 16.6711 23.7939 16.245 23.7976C15.819 23.8013 15.4085 23.6375 15.102 23.3415L5.90937 14.1489C5.60473 13.8441 5.43359 13.4309 5.43359 13C5.43359 12.5691 5.60473 12.1559 5.90937 11.8511L15.102 2.65852C15.4067 2.35388 15.82 2.18274 16.2509 2.18274C16.6818 2.18274 17.095 2.35388 17.3997 2.65852Z" fill="white" />
                                        </svg>
                                    </button>
                                    <button className={s.nextButtonCarousel} onClick={() => carouselRef.current.next()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                            <path d="M8.60025 2.65852C8.29561 2.96325 8.12448 3.3765 8.12448 3.80739C8.12448 4.23828 8.29561 4.65153 8.60025 4.95626L16.644 13L8.60025 21.0437C8.30425 21.3502 8.14046 21.7607 8.14416 22.1868C8.14786 22.6128 8.31876 23.0204 8.62005 23.3217C8.92134 23.623 9.32891 23.7939 9.75498 23.7976C10.181 23.8013 10.5915 23.6375 10.898 23.3415L20.0906 14.1489C20.3953 13.8441 20.5664 13.4309 20.5664 13C20.5664 12.5691 20.3953 12.1559 20.0906 11.8511L10.898 2.65852C10.5933 2.35388 10.18 2.18274 9.74913 2.18274C9.31824 2.18274 8.90499 2.35388 8.60025 2.65852Z" fill="white" />
                                        </svg>
                                    </button>
                                </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className={s.grid_col_1}>
                        <ViTriDangTuyen
                            workInfo={workInfo}
                            handleChatNgay={handleChatNgay} handleUngTuyenNgay={handleUngTuyenNgay}
                        />
                    </div>

                    {/* <div className={s.grid_col_1}>
                        <RateStar rateInfo={rateInfo} rateMedium={rateMedium} handleDanhGia1={handleDanhGia1} />
                    </div> */}

                    {/* <div className={s.grid_col_1}>
                        <div className={s.box_9}>
                            <span className={s.box_9_title}>Phòng vấn tại công ty</span>
                            <span className={s.box_9_content}>HÃY CHO CHÚNG TÔI BIẾT ĐÁNH GIÁ CỦA BẠN</span>
                            <button className={s.button_danh_gia_ngay} onClick={handleDanhGia2}>Đánh giá ngay</button>
                        </div>
                    </div> */}

                    {/* <div className={s.grid_col_1}>
                        <LienHe addressInfo={addressInfo} />
                    </div> */}

                </div>

                <div className={s.grid_col_2}>
                    <CongViecYeuThich listCongViec={sameJob} handleChatNgay={handleChatNgay} />

                    <DoanhNghiepTuongTu listDoanhNghiep={listDoanhNghiep} handleChatNgay={handleChatNgay} />

                    <TuVanViecLam listTuVan={listTuVan} />
                </div>

            </div>


            <div>
                <div className={isOpenLetter ? s.modal_mask : s.displayNone}></div>
                <div className={isOpenLetter ? s.modal_wrap : s.displayNone}>
                    <div className={s.modal_rate}>
                        <div className={s.modal_content}>
                            <div className={s.title}>
                                <span>Bạn có muốn viết thư giới thiệu cho nhà tuyển dụng không ?</span>
                                <svg onClick={handleClose} style={{ zIndex: "1", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 22 22" fill="none">
                                    <rect width="1.43075" height="29.3304" rx="0.715376" transform="matrix(0.715183 0.698937 -0.715183 0.698937 20.9766 0)" fill="#474747" />
                                    <rect width="1.43075" height="29.3304" rx="0.715376" transform="matrix(-0.715183 0.698937 -0.715183 -0.698937 22 21)" fill="#474747" />
                                </svg>
                            </div>
                            <div className={s.letter_body}>
                                <span className={s.letter_body_title}>THƯ GIỚI THIỆU</span>
                                <textarea
                                    name="content" className={s.letter_body_content} placeholder={data.placeholderLetter}
                                    onChange={(e) => setContentApply(e.target.value)}
                                ></textarea>
                            </div>

                            <div style={{ width: "469px", marginTop: "135px", display: "flex", justifyContent: "center" }} className={s.groupDiv}>
                                <div className={s.groupButton}>
                                    <button onClick={handleClose} className={s.cancelButton}>Hủy</button>
                                    <button onClick={handleGuiThuUngTuyen} className={s.button_ung_tuyen} >Ứng tuyển</button>
                                </div>
                            </div>

                            <div className={s.textThank}>Thanks for watching!</div>
                            <Image src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/letter.png"} alt={""} height={700} width={700} className={s.imageLetter}></Image>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                title="Đánh giá công ty"
                centered
                open={isOpenDanhGia1}
                onCancel={handleClose}
                className="modal-danh-gia-1"
                footer={[
                    <div key="ok" style={{
                        display: "flex", width: "162px", padding: "10px", justifyContent: "center", alignItems: "center", gap: "10px", borderRadius: "30px", background: "#3582CD", outline: "none", border: "none", cursor: "pointer", boxSizing: "border-box", margin: "auto"
                    }}
                        onClick={handleGuiDanhGia1}>
                        <span style={{ color: "#FFF", fontFamily: "Roboto", fontSize: "14px", fontStyle: "normal", fontWeight: "500", lineHeight: "normal" }}>Gửi đánh giá</span>
                    </div>,
                ]}
            >
                <div style={{ display: "flex", gap: "4px", flexDirection: "column" }}>
                    <span style={{ color: "#474747", fontFamily: "Roboto", fontSize: "16px", fontStyle: "normal", fontWeight: "400", lineHeight: "24px" }}>Văn hóa công ty</span>
                    <Rate allowHalf={true} value={rateYourself.vanHoaCongTy} onChange={(value: any) => handleRateChange('vanHoaCongTy', value)} />
                </div>


                <div style={{ display: "flex", gap: "4px", flexDirection: "column" }}>
                    <span style={{ color: "#474747", fontFamily: "Roboto", fontSize: "16px", fontStyle: "normal", fontWeight: "400", lineHeight: "24px" }}>Văn phòng công ty</span>
                    <Rate allowHalf={true} value={rateYourself.vanPhongCongTy} onChange={(value: any) => handleRateChange('vanPhongCongTy', value)} />
                </div>


                <div style={{ display: "flex", gap: "4px", flexDirection: "column" }}>
                    <span style={{ color: "#474747", fontFamily: "Roboto", fontSize: "16px", fontStyle: "normal", fontWeight: "400", lineHeight: "24px" }}>Phúc lợi công ty</span>
                    <Rate allowHalf={true} value={rateYourself.phucLoiCongTy} onChange={(value: any) => handleRateChange('phucLoiCongTy', value)} />
                </div>


                <div style={{ display: "flex", gap: "4px", flexDirection: "column" }}>
                    <span style={{ color: "#474747", fontFamily: "Roboto", fontSize: "16px", fontStyle: "normal", fontWeight: "400", lineHeight: "24px" }}>Cơ hội thăng tiến</span>
                    <Rate allowHalf={true} value={rateYourself.coHoiThangTien} onChange={(value: any) => handleRateChange('coHoiThangTien', value)} />
                </div>


                <div style={{ display: "flex", gap: "4px", flexDirection: "column" }}>
                    <span style={{ color: "#474747", fontFamily: "Roboto", fontSize: "16px", fontStyle: "normal", fontWeight: "400", lineHeight: "24px" }}>Lãnh đạo công ty</span>
                    <Rate allowHalf={true} value={rateYourself.lanhDaoCongTy} onChange={(value: any) => handleRateChange('lanhDaoCongTy', value)} />
                </div>

                <CheckboxGroup options={options} value={checkedList} onChange={onChangeChecked} />
            </Modal >

            <Modal
                title="Hãy cho chúng tôi biết về cuôc phỏng vấn tại công ty này"
                centered
                open={isOpenDanhGia2}
                onCancel={handleClose}
                className={`modal-danh-gia-2 ${s.modal_2}`}
                footer={[]}
            >
                <Form
                    name="myForm"
                    onFinish={handleGuiDanhGia2}
                    initialValues={{ input1: ``, input2: ``, input3: ``, input4: `` }}
                    style={{ width: "100%" }}
                >
                    <span className={s.text_3}>Vị trí ứng tuyển <span className={s.text_red}>*</span></span>
                    <Form.Item
                        name="input1"
                        className={s.input_2}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập thông tin vị trí ứng tuyển!',
                            },
                        ]}
                    >
                        <Input placeholder='Bạn đã ứng tuyển vị trí gì?' />
                    </Form.Item>

                    <span className={s.text_3}>Mô tả quá trình phỏng vấn <span className={s.text_red}>*</span></span>
                    <Form.Item
                        name="input2"
                        className={s.input_2}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mô tả quá trình phỏng vấn!',
                            },
                        ]}>
                        <Input.TextArea placeholder='Mô tả' style={{ minHeight: "80px" }} />
                    </Form.Item>

                    <span className={s.text_3}>Câu hỏi phỏng vấn <span className={s.text_red}>*</span></span>
                    <Form.Item
                        name="input3"
                        className={s.input_2}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập câu hỏi phỏng vấn!',
                            },
                        ]}
                    >
                        <Input.TextArea placeholder='Bạn đã nhận được những câu hỏi gì?' style={{ minHeight: "80px" }} />
                    </Form.Item>

                    <span className={s.text_3}>Câu trả lời phỏng vấn <span className={s.text_red}>*</span></span>
                    <Form.Item
                        name="input4"
                        className={s.input_2}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập câu trả lời phỏng vấn!',
                            },
                        ]}
                    >
                        <Input.TextArea placeholder='Bạn đã trả lời câu hỏi như thế nào?' style={{ minHeight: "80px" }} />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" className={s.button}>
                            Gửi đánh giá
                        </Button>
                    </Form.Item>

                </Form>

            </Modal >

            <Footer />
        </>
    )
}

export default ChiTietCongTy