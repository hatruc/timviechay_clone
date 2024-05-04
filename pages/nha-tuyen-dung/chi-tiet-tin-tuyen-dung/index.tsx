/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import dynamic from 'next/dynamic';
import Image from "next/image";
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from "cookies-next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Search from "@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/search";
import SuggestWork from "@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/suggest_work";
import RateStar from "@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/rate";
import JobGuide from "@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/job_guide";
import DetailInfo from "@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/detail_info"
import RecruitmentDetail from "@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/detail_recruitmen";
import BoxChat from "@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/box_chat";
import Login from "@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/sign_in/index";
const Comment = dynamic(() => import('@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/comment'), { ssr: false });
import * as data from '@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/data.js';
import s from './styles.module.scss';
import ContentEditable from 'react-contenteditable';
import Head from 'next/head';
import { NextPageContext } from 'next';
import { POST, POST_SERVER } from '@/pages/api/base-api';
import { getAllCity, getJob, getJobName, getQuyMo, getTokenServerSide, handleImageSource } from '@/functions/functions';
import { redirect } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

export const getServerSideProps = async (context: NextPageContext) => {
    const token = getTokenServerSide(context);
    const id = context.query.id;

    const data = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_NEW}/new/DetailNew`, { id }, token);
    if (data?.result == true) {
        return {
            props: {
                data: data.data,
                id: id
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



const ChiTietTinTuyenDung: React.FC<{ data: any, id: any }> = ({ data, id }) => {
    const [actionType, setActionType] = useState<any>(0) // 1 - save | 2 - apply
    const [idNew, setIdNew] = useState<any>(id)
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);
    const [type, setType] = useState(false);
    const [newsDetail, setNewsDetail] = useState({
        title: "123",
        content: "456",
        pla: "789",

    });
    const [detailInfo, setDetailInfo] = useState({
        title: data?.new_title,
        cap_bac: data?.new_cap_bac,
        hinh_thuc_lam_viec: data?.new_hinh_thuc,
        gioi_tinh: data?.new_gioi_tinh,
        kinh_nghiem: data?.new_exp,
        bang_cap: data?.new_bang_cap,
        new_money_type: data?.new_money_type,
        new_money_from: data?.new_money_from,
        new_money_to: data?.new_money_to,
        new_money: data?.new_money,
        so_luong_can_tuyen: data?.new_so_luong,
        thoi_gian_thu_viec: data?.new_thuviec,
        hoa_hong: data?.new_hoahong,
        han_nop_ho_so: data?.new_han_nop,
        new_update_time: data?.new_update_time,
        apply: data?.apply,
        saveNew: data?.SaveNew,
    });
    const [recruitmentInfo, setRecruitmentInfo] = useState({
        moTaCongViec: data?.new_mota,
        yeuCauUngVien: data?.new_yeucau,
        quyenLoi: data?.new_quyenloi,
        diaDiemTuyenDung: data?.new_addr,
        yeuCauHoSo: data?.new_ho_so,
    });

    const [listJob, setListJob] = useState<{ value: any, label: any }[]>([{ value: 0, label: 'Tất cả ngành nghề' }, ...getJob()]);
    const [listDistrict, setListDisTrict] = useState<{ value: any, label: any }[]>([{ value: 0, label: 'Toàn quốc' }, ...getAllCity()]);
    const [chiTietCongViec, setChiTietCongViec] = useState(data?.arrNganhNghe);
    const [diaDiemLamViec, setDiaDiemLamViec] = useState(data?.new_city);
    const [fitJobLevel, setFitJobLevel] = useState<any>(null);
    const [rateYourself, setRateYourself] = useState(null);
    const [rateInfo, setRateInfo] = useState(data?.rateInfo);
    const [rateMedium, setRateMedium] = useState('');
    const [workInfo, setWorkInfo] = useState(data?.workInfo);
    const [listGuide, setListGuide] = useState(data?.Blog);
    const [letter, setLetter] = useState<any>(null);
    const [isOpenLetter, setIsOpenLetter] = useState(false);
    const [increasing, setIncreasing] = useState(true);
    const [openModelLogin, setOpenModelLogin] = useState(false);
    const [isApply, setIsApply] = useState(data?.apply);
    const [isSave, setIsSave] = useState(data?.SaveNew);
    const [contentApply, setContentApply] = useState('');

    const handleSearch = (inputKey: any, distric: any, job: any) => {
        // console.log("key: ", inputKey, "distric: ", distric, "job: ", job);
        // console.log("API tìm kiếm đã được gọi");
        let query: any = {};
        inputKey && typeof inputKey === 'string' && inputKey.trim() && (query.name = inputKey.trim())
        distric && Number(distric) && Number(distric) !== 0 && (query.address = distric)
        job && Number(job) && Number(job) !== 0 && (query.nameWork = job)
        router.push({
            pathname: '/tin-tuyen-dung',
            query: query
        })
    }

    const handleUngTuyenNgay = async (id: number) => {

        // setIsOpenLetter(true);
    }

    const handleCloseLetter = () => {
        setIsOpenLetter(false);
    }

    const handleChatNgay = () => {
        console.log("Chat ngay thành công");
    }

    const handleLuuTin = async () => {
        // const token = Cookies.get('work247_token');
        // const type = Cookies.get('work247_type') || 1;
        // if (!token || type == 1) {
        //     setOpenModelLogin(true)
        // } else {
        // }
        // Không cần lưu tin trước đăng nhập
        const response = await POST('candidate/SaveNew', { id_tin: data.new_id })
        if (response.result) {
            alert('Lưu tin thành công.')
            setIsSave(true)
        }
    }

    const handleTaoCvAI = () => {
        console.log("Tạo CV WorkAI");
    }

    const handleGuiThuUngTuyen = async (id: number) => {
        const response = await POST('candidate/ApplyJob', { id: id, lt: contentApply })
        if (response.result) {
            alert('Ứng tuyển thành công.')
            setIsOpenLetter(false);
            setIsApply(true)
        }
    }

    const navigateToAbout = (route: any) => {
        router.push(route);
    };

    useEffect(() => {
        let rate = (rateInfo?.reduce((acc: number, obj: { star: number; count: number; }) => acc + (obj.star * obj.count), 0) / rateInfo?.reduce((acc: any, obj: { count: any; }) => acc + obj.count, 0)).toFixed(1);
        if (rate.indexOf('.') == -1) {
            rate += '.0';
        };
        setRateMedium(rate);
        setIsLogin(getCookie("isLogin") == "true");
    }, []);

    useEffect(() => {
        if (isLogin == true) {
            setFitJobLevel(data?.fitJobLevel);
        }
        else {
            setFitJobLevel(null);
        }
    }, [isLogin]);

    const checkLoginToOpenModelApply = () => {
        setActionType(2)
        setIdNew(data?.new_id)
        const token = Cookies.get('work247_token');
        const type = Cookies.get('work247_type') || 1;
        if (!token || type == 1) {
            setOpenModelLogin(true)
        } else {
            setIsOpenLetter(true);
        }
    }

    // console.log('>>> check chi tiet cong viec: ', chiTietCongViec);

    return (
        <>
            <Header />
            {/* <div className={s.position_chat}>
                <BoxChat />
            </div> */}

            <Search listDistrict={listDistrict} listJob={listJob} onClickSearch={handleSearch} />

            <div className={s.body}>

                <div className={s.router}>
                    <div className={s.textBlue} onClick={() => navigateToAbout("/")}>Trang chủ</div>
                    <div className={s.path}><div><span>›</span></div></div>
                    <div className={s.textBlue} onClick={() => navigateToAbout("/tin-tuyen-dung")}>Việc làm {getJobName(data?.new_cat_id)}</div>
                    <div className={s.path}><div><span>›</span></div></div>
                    <div className={s.text} onClick={() => navigateToAbout("#")}>{data?.new_title}</div>
                </div>

                <div className={s.job_detail_body}>

                    <div className={s.grid_collum_1}>
                        <DetailInfo detailInfo={detailInfo} isApply={isApply} handleUngTuyenNgay={checkLoginToOpenModelApply} handleLuuTin={handleLuuTin} handleChatNgay={handleChatNgay} isSave={isSave} />
                    </div>

                    <div className={s.grid_collum_2}>
                        <div className={s.job_detail_box_1}>

                            <div className={s.job_detail_content_1}>
                                <div>
                                    <Image src={data?.usc_logo ? handleImageSource(data?.usc_logo) : "/images/candidate/ava_default.png"} alt={""} width={60} height={60} style={{ height: "60px", width: "60px", borderRadius: "100%", objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.currentTarget.srcset = "/images/candidate/ava_default.png"
                                        }}
                                    ></Image>
                                </div>

                                <div className={s.content}>
                                    <span className={s.text}>{data?.usc_company}</span>
                                </div>
                            </div>

                            <div className={s.job_detail_content_2}>
                                <div className={s.item_1}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M6.00017 1.33325C4.2535 1.33325 2.8335 2.75325 2.8335 4.49991C2.8335 6.21325 4.1735 7.59991 5.92017 7.65991C5.9735 7.65325 6.02684 7.65325 6.06684 7.65991C6.08017 7.65991 6.08684 7.65991 6.10017 7.65991C6.10684 7.65991 6.10684 7.65991 6.1135 7.65991C7.82017 7.59991 9.16017 6.21325 9.16684 4.49991C9.16684 2.75325 7.74684 1.33325 6.00017 1.33325Z" fill="#7F878F" />
                                        <path d="M9.38664 9.43342C7.52664 8.19342 4.49331 8.19342 2.61997 9.43342C1.77331 10.0001 1.30664 10.7668 1.30664 11.5868C1.30664 12.4068 1.77331 13.1668 2.61331 13.7268C3.54664 14.3534 4.77331 14.6668 5.99997 14.6668C7.22664 14.6668 8.45331 14.3534 9.38664 13.7268C10.2266 13.1601 10.6933 12.4001 10.6933 11.5734C10.6866 10.7534 10.2266 9.99342 9.38664 9.43342Z" fill="#7F878F" />
                                        <path d="M13.3268 4.89332C13.4334 6.18666 12.5134 7.31999 11.2401 7.47332C11.2334 7.47332 11.2334 7.47332 11.2268 7.47332H11.2068C11.1668 7.47332 11.1268 7.47332 11.0934 7.48666C10.4468 7.51999 9.8534 7.31332 9.40674 6.93332C10.0934 6.31999 10.4868 5.39999 10.4068 4.39999C10.3601 3.85999 10.1734 3.36666 9.8934 2.94666C10.1468 2.81999 10.4401 2.73999 10.7401 2.71332C12.0468 2.59999 13.2134 3.57332 13.3268 4.89332Z" fill="#7F878F" />
                                        <path d="M14.66 11.0599C14.6067 11.7066 14.1933 12.2666 13.5 12.6466C12.8333 13.0132 11.9933 13.1866 11.16 13.1666C11.64 12.7332 11.92 12.1932 11.9733 11.6199C12.04 10.7932 11.6467 9.99994 10.86 9.36661C10.4133 9.01327 9.89333 8.73327 9.32666 8.52661C10.8 8.09994 12.6533 8.38661 13.7933 9.30661C14.4067 9.79994 14.72 10.4199 14.66 11.0599Z" fill="#7F878F" />
                                    </svg>
                                    <div className={s.text}>Quy mô:</div>
                                </div>
                                <div className={s.item_2}>{getQuyMo(data?.usc_size)}</div>
                            </div>

                            <div className={s.job_detail_content_3}>
                                <div className={s.item_1}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M13.7468 5.63342C13.0468 2.55342 10.3601 1.16675 8.00006 1.16675C8.00006 1.16675 8.00006 1.16675 7.9934 1.16675C5.64006 1.16675 2.94673 2.54675 2.24673 5.62675C1.46673 9.06675 3.5734 11.9801 5.48006 13.8134C6.18673 14.4934 7.0934 14.8334 8.00006 14.8334C8.90673 14.8334 9.8134 14.4934 10.5134 13.8134C12.4201 11.9801 14.5268 9.07342 13.7468 5.63342ZM8.00006 8.97342C6.84006 8.97342 5.90006 8.03342 5.90006 6.87342C5.90006 5.71342 6.84006 4.77342 8.00006 4.77342C9.16006 4.77342 10.1001 5.71342 10.1001 6.87342C10.1001 8.03342 9.16006 8.97342 8.00006 8.97342Z" fill="#7F878F" />
                                    </svg>
                                    <div className={s.text}>Địa điểm:</div>
                                </div>
                                <div className={s.item_2}>{data?.usc_address}</div>
                            </div>

                            <div className={s.job_detail_content_4}>
                                <Link href={`/nha-tuyen-dung/chi-tiet-cong-ty/${data?.usc_id}`} className={s.link}>Xem trang công ty</Link>
                            </div>

                        </div>

                        <div className={s.job_detail_box_2}>

                            <div className={s.job_detail_content}>
                                <span className={s.title}>Chi tiết công việc</span>
                                <div>
                                    <div className={s.list_tag}>
                                        {chiTietCongViec?.map((item: any, index: any) => (
                                            <div key={index + 1} className={s.tag}>
                                                <span className={s.text}>{item?.cat_name}</span>
                                            </div>
                                        ))}
                                        <span className={s.text}>{chiTietCongViec.filter((item: any) => !!item).length == 0 ? 'Tất cả ngành nghề' : ''}</span>
                                        <div></div>
                                    </div>
                                </div>
                            </div>

                            <div className={s.job_detail_content}>
                                <span className={s.title}>Địa điểm làm việc</span>
                                <div>
                                    <div className={s.list_tag}>
                                        {diaDiemLamViec?.map((item: string | number | boolean | ReactFragment | ReactElement<any, string | JSXElementConstructor<any>> | ReactPortal | PromiseLikeOfReactNode | null | undefined, index: number) => (
                                            <div key={index + 1} className={s.tag}>
                                                <span className={s.text}>{item}</span>
                                            </div>
                                        ))}
                                        <span className={s.text}>{diaDiemLamViec?.length == 0 ? 'Toàn quốc' : ''}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={s.job_detail_content}>
                                <span className={s.title}>Địa điểm tuyển dụng</span>
                                <div className={s.list_tag}>
                                    <div className={s.tag}>
                                        <span className={s.text}> {data?.new_addr}</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* {isLogin && <div className={s.job_detail_box_9}>
                            <Image src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/tao_cv_ai.png"} alt={""} width={352} height={183} style={{ width: "352px", height: "auto", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}></Image>
                            <div className={s.body_cv_ai}>
                                <span>Tạo CV online miễn phí bằng WorkAI</span>
                                <div className={s.item_cv_ai}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <circle cx="8" cy="8" r="8" fill="#3582CD" />
                                        <path d="M4 8.18471L7.13043 10.4001L12 5.6001" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <span className={s.item_cv}>
                                        + 3500 mẫu CV siêu đẹp, chuyên nghiệp, độc đáo theo từng ngành nghề và 5 ngôn ngữ: Việt, Anh, Hàn, Nhật, Trung.
                                    </span>
                                </div>
                                <div className={s.item_cv_ai}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <circle cx="8" cy="8" r="8" fill="#3582CD" />
                                        <path d="M4 8.18471L7.13043 10.4001L12 5.6001" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <span className={s.item_cv}>
                                        Website tìm việc làm chất lượng hàng đầu Việt Nam.
                                    </span>
                                </div>
                                <button onClick={handleTaoCvAI} className={s.buttonCV}>Tạo CV ngay</button>
                            </div>
                        </div>} */}
                    </div>

                    <div className={s.grid_collum_1}>
                        <RecruitmentDetail recruitmentInfo={recruitmentInfo} isApply={isApply} isSave={isSave} fitJobLevel={fitJobLevel} handleLuuTin={handleLuuTin} handleUngTuyenNgay={checkLoginToOpenModelApply} />
                    </div>

                    <div className={s.job_detail_box_4}>

                        <div className={s.header}>
                            <span>Chia sẻ tin tuyển dụng</span>
                        </div>

                        <a className={s.facebook} href={"https://www.facebook.com"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 10 20" fill="none">
                                <g>
                                    <path d="M9.29429 10.9025L9.80622 7.65275H6.65274V5.54043C6.65274 4.65183 7.09299 3.78354 8.5008 3.78354H9.95468V1.01619C9.10801 0.881299 8.25249 0.808322 7.39503 0.797852C4.79955 0.797852 3.10507 2.35671 3.10507 5.17483V7.65275H0.228027V10.9025H3.10507V18.7628H6.65274V10.9025H9.29429Z" fill="#7F878F" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1590_38075">
                                        <rect width="10" height="19" fill="white" transform="translate(0 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>

                        <a className={s.twitter} href={"https://twitter.com"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                                <g>
                                    <path d="M15.9288 2.29435C15.4113 2.50666 14.8672 2.6545 14.3099 2.73421C14.5705 2.69165 14.9538 2.24469 15.1064 2.06378C15.3382 1.7909 15.5148 1.47938 15.6274 1.14504C15.6274 1.12021 15.6534 1.08474 15.6274 1.067C15.6143 1.06017 15.5995 1.05659 15.5846 1.05659C15.5696 1.05659 15.5549 1.06017 15.5418 1.067C14.9367 1.37931 14.2928 1.61767 13.6252 1.77646C13.6019 1.78323 13.5771 1.78384 13.5535 1.77821C13.5299 1.77259 13.5084 1.76094 13.4912 1.74453C13.4392 1.68555 13.3833 1.62986 13.3237 1.57781C13.0514 1.34527 12.7425 1.15494 12.4082 1.01379C11.957 0.837346 11.4696 0.76093 10.9828 0.790317C10.5105 0.818748 10.0494 0.939493 9.62819 1.14504C9.21337 1.36175 8.84879 1.65616 8.55637 2.01057C8.24878 2.37536 8.0267 2.7987 7.90509 3.25211C7.80481 3.68341 7.79344 4.12917 7.8716 4.5646C7.8716 4.63909 7.8716 4.64973 7.80461 4.63909C5.15112 4.26663 2.97399 3.36917 1.19507 1.44301C1.11691 1.35788 1.07598 1.35788 1.01271 1.44301C0.238619 2.56395 0.614499 4.33758 1.58211 5.21375C1.71237 5.33081 1.84635 5.44432 1.98777 5.55074C1.54412 5.52072 1.11131 5.40612 0.714982 5.21375C0.64055 5.16763 0.599613 5.19246 0.595891 5.2776C0.585341 5.39563 0.585341 5.5143 0.595891 5.63233C0.673544 6.19797 0.907417 6.73381 1.27359 7.18504C1.63977 7.63628 2.12511 7.98673 2.67998 8.20054C2.81525 8.25576 2.95619 8.29737 3.10052 8.32469C2.68982 8.40176 2.26859 8.41375 1.85379 8.36017C1.76447 8.34243 1.73098 8.38855 1.76447 8.47013C2.31154 9.88904 3.49873 10.3218 4.36958 10.563C4.48867 10.5808 4.60776 10.5808 4.74174 10.6091C4.74174 10.6091 4.74174 10.6091 4.71941 10.6304C4.46262 11.0774 3.4243 11.3789 2.94794 11.535C2.07845 11.8326 1.15142 11.9464 0.231175 11.8684C0.0860336 11.8471 0.0525391 11.8507 0.0153232 11.8684C-0.0218927 11.8861 0.0153232 11.9252 0.0562607 11.9606C0.24234 12.0777 0.42842 12.1806 0.621942 12.2799C1.19806 12.5794 1.80713 12.8173 2.43808 12.9893C5.70563 13.8478 9.38256 13.2164 11.8351 10.8929C13.7629 9.06962 14.4402 6.55461 14.4402 4.03606C14.4402 3.94028 14.563 3.88353 14.6337 3.83386C15.1214 3.47165 15.5514 3.04389 15.9102 2.56395C15.9724 2.4924 16.0042 2.40132 15.9996 2.30854C15.9996 2.25534 15.9996 2.26598 15.9288 2.29435Z" fill="#7F878F" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1590_38078">
                                        <rect width="16" height="13" fill="white" transform="translate(0 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>

                        <a className={s.instagram} href={"https://www.instagram.com"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                                <g clipPath="url(#clip0_1590_38081)">
                                    <path d="M4.27512 15.3558V5.33137H0.845235V15.3558H4.27512ZM2.56089 3.96294C3.75672 3.96294 4.50119 3.19318 4.50119 2.2312C4.47881 1.2473 3.75672 0.499023 2.58363 0.499023C1.40975 0.499023 0.643066 1.2473 0.643066 2.23111C0.643066 3.19309 1.38728 3.96285 2.53842 3.96285L2.56089 3.96294ZM6.17361 15.3558H9.60323V9.75832C9.60323 9.45911 9.62561 9.15912 9.71622 8.94542C9.96405 8.34657 10.5284 7.72668 11.4761 7.72668C12.7169 7.72668 13.2135 8.64586 13.2135 9.9936V15.3558H16.6431V9.60811C16.6431 6.52916 14.9512 5.09636 12.6947 5.09636C10.8446 5.09636 10.0321 6.10087 9.58067 6.78505H9.6035V5.33172H6.17379C6.21856 6.27213 6.17361 15.3558 6.17361 15.3558Z" fill="#7F878F" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1590_38081">
                                        <rect width="17" height="15" fill="white" transform="translate(0.5 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>

                        <a className={s.linked} href={"#"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10.8832 9.11621C12.7582 10.9912 12.7582 14.0245 10.8832 15.8912C9.00821 17.7579 5.97487 17.7662 4.10821 15.8912C2.24154 14.0162 2.23321 10.9829 4.10821 9.11621" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.8248 11.1754C6.8748 9.22539 6.8748 6.05873 8.8248 4.10039C10.7748 2.14206 13.9415 2.15039 15.8998 4.10039C17.8581 6.05039 17.8498 9.21706 15.8998 11.1754" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>

                    </div>

                    {/* <div className={s.grid_collum_1}>
                        <Comment />
                    </div> */}

                    {/* <div className={s.grid_collum_1}>
                        <RateStar rateInfo={rateInfo} rateMedium={rateMedium} rateYourself={rateYourself} setRateYourself={setRateYourself} />
                    </div> */}

                    {/* <div className={s.grid_collum_1}>
                        <SuggestWork workInfo={workInfo} handleUngTuyenNgay={handleUngTuyenNgay} handleChatNgay={handleChatNgay} />
                    </div> */}

                    {/* <div className={s.grid_collum_1} style={{ marginBottom: "60px" }}>
                        <JobGuide listGuide={listGuide} />
                    </div> */}

                </div>
            </div >

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
                                <textarea name="content" className={s.letter_body_content} placeholder={data?.placeholderLetter}
                                    onChange={(e) => setContentApply(e.target.value)}

                                ></textarea>
                            </div>

                            <div style={{ width: "469px", marginTop: "135px", display: "flex", justifyContent: "center" }} className={s.groupDiv}>
                                <div className={s.groupButton}>
                                    <button onClick={handleCloseLetter} className={s.cancelButton}>Hủy</button>
                                    <button onClick={() => handleGuiThuUngTuyen(data.new_id)} className={s.button_ung_tuyen}>Ứng tuyển</button>
                                </div>
                            </div>

                            <div className={s.textThank}>Thanks for watching!</div>
                            <Image src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/letter.png"} alt={""} height={700} width={700} className={s.imageLetter}></Image>
                        </div>
                    </div>
                </div>
            </div>
            <Login
                isOpenSignIn={openModelLogin}
                handleCancelSignIn={() => setOpenModelLogin(false)}
                successType={actionType}
                idNew={idNew}
            ></Login>

            <Footer />
        </>
    )
}

export default ChiTietTinTuyenDung