/* eslint-disable react-hooks/exhaustive-deps */
import * as data from '@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/data.js';
import Box_candi_online from '@/components/ung-vien/Box_candi_online';
import Box_candidate from '@/components/ung-vien/Box_candidate';
import Box_profile from '@/components/ung-vien/Box_profile';
import Box_tag_candidate from '@/components/ung-vien/Box_tag_candidate';
import Infor_common from '@/components/ung-vien/Infor_common';
import Search from '@/components/ung-vien/Search';
import Temp_comp from '@/components/ung-vien/Temp_comp';
import DetailInfo from '@/components/ung-vien/detail_info';
import RateStar from '@/components/ung-vien/rate';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import s from './chi-tiet-ung-vien.module.scss';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Cookies from 'js-cookie';
import { POST, POST_SERVER } from '../api/base-api';
import { NextPage, NextPageContext } from 'next';
import { getAllCity, getJob, getTokenServerSide } from '@/functions/functions';

export const getServerSideProps = async (context: NextPageContext) => {
    const id = context.query.id
    const token = getTokenServerSide(context);
    let preData: any = {}
    if (id) {
        const result = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_CANDI}/candidate/DetailCandi`, { id: id }, token)
        const resultPoint = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_EMPLOY}/ntd/ManageServiceNTD`, { ga: 1 }, token)

        if (result?.result) {
            return {
                props: {
                    preData: result?.data,
                    pointBuy: resultPoint?.result ? resultPoint?.data?.pointBuy : 0,
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
    } else {
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            }
        }
    }
}

const Detail_candidate: NextPage<{ preData: any, pointBuy: number }> = ({ preData, pointBuy }) => {
    // console.log(preData, pointBuy)
    const router = useRouter();
    // const [listJob, setListJob] = useState<{ value: any, label: any }[]>(data.listJob);
    // const [listDistrict, setListDisTrict] = useState<{ value: any, label: any }[]>(data.listDistrict);
    const navigateToAbout = (route: any) => {
        router.push(route);
    };
    // const [detailInfo, setDetailInfo] = useState(data.detailInfo);
    const [rateYourself, setRateYourself] = useState(null);
    const [rateInfo, setRateInfo] = useState(data.rateInfo);
    const [rateMedium, setRateMedium] = useState('');

    const [dataAll, setDataAll] = useState<any>(preData);
    const getDetialCandidate = async () => {
        // const token = Cookies.get('work247_token');
        // const res = await POST("/candidate/DetailCandi",{}, token);
        // if(res && res.message !=='success') {
        //     alert(`${res.message}`);
        //     return 0;
        // } 
        // setDataAll(res);
    }
    useEffect(() => {
        let rate = (rateInfo?.reduce((acc, obj) => acc + (obj.star * obj.count), 0) / rateInfo?.reduce((acc, obj) => acc + obj.count, 0)).toFixed(1);
        if (rate.indexOf('.') == -1) {
            rate += '.0';
        };
        setRateMedium(rate);
        getDetialCandidate()
    }, []);
    return (
        <>
            <Header />
            <Search listDistrict={[{ value: 0, label: "Toàn quốc" }, ...getAllCity()]} listJob={[{ value: 0, label: "Tất cả ngành nghề" }, ...getJob()]} />
            <div className={s.body}>
                <div className={s.router}>
                    <div className={s.textBlue} onClick={() => navigateToAbout("/")}>Trang chủ</div>
                    <div className={s.path}><div><span>›</span></div></div>
                    <div className={s.textBlue} onClick={() => navigateToAbout("/ung-vien-tim-viec")}> Tìm ứng viên</div>
                    <div className={s.path}><div><span>›</span></div></div>
                    <div className={s.text} onClick={() => navigateToAbout("#")}> {dataAll?.use_name}</div>
                </div>
                <div className={s["box"]}>
                    <div className={s[`box_2`]}>
                        <DetailInfo detailInfo={dataAll} />
                    </div>
                    <div className={s[`box_3`]}>
                        <Temp_comp title="Thông tin">
                            <Infor_common data={dataAll}/>
                        </Temp_comp>
                    </div>
                    <div className={s[`box_6`]}>
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
                    </div>
                    {/* <div className={s['box_7']}>
                        <RateStar rateInfo={rateInfo} rateMedium={rateMedium} rateYourself={rateYourself} setRateYourself={setRateYourself} />
                    </div> */}
                    {/* <div className={s[`box_8`]}>
                        <Temp_comp title="Ứng viên gợi ý bởi Work AI">
                            <Box_candidate dataBoxCandidate={undefined} />
                            <Box_candidate dataBoxCandidate={undefined} />
                            <Box_candidate dataBoxCandidate={undefined} />
                        </Temp_comp>
                    </div> */}
                    <div className={s[`divide`]}>
                        <div className={s[`box_1`]}>
                            <Box_profile profileData={preData} pointBuy={pointBuy} />
                        </div>
                        <div className={s[`box_4`]}>
                            <Box_tag_candidate dataTagCandidate={preData} />
                        </div>
                        {/* <div className={s[`box_5`]}>
                            <Box_candi_online dataCandidateOnline={preData} />
                        </div> */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Detail_candidate
