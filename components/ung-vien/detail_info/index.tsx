import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import s from './styles.module.scss';
import { getCapBac, getDate, getGioiTinh, getHinhThuc, getKinhNghiem, getMucLuong } from "@/functions/functions";
import { POST } from "@/pages/api/base-api";
import { checkLogin } from "@/components/service/functions";
import SignInNTDModal from "@/components/nha-tuyen-dung/sign_in";

const DetailInfo = ({ detailInfo, handleUngTuyenNgay, handleChatNgay, handleLuuTin }: any) => {
    const [isSaved, setIsSaved] = useState(detailInfo?.luuHoSo)
    const [isModalSignInOpen, setIsModalSignInOpen] = useState(false)
    const handleLuuHoSo = async () => {
        // Check đăng nhập
        if (!checkLogin(1)) {
            setIsModalSignInOpen(true)
        } else
        // Lưu hồ sơ
        if (!isSaved) {
            const result = await POST('ntd/SaveCandi', { id_uv: detailInfo?.use_id })
            if (result?.result) {
                alert(result?.message)
                setIsSaved(true)
            } else {
                alert(result?.message)
            }
        }
    };

    

    useEffect(() => {
        setIsSaved(detailInfo?.luuHoSo)
        return () => { };
    }, [detailInfo])

    return (
        <>
            <div className={s.job_info_header}>
                <div className={s.job_info_content_1}>
                    <span className={s.text}>{detailInfo?.use_name}</span>
                </div>
                <p className={s.description}>{detailInfo?.use_job_name || 'Chưa cập nhật'}</p>
                <div className={s.job_info_content_2}>
                    <div className={s.job_info_item}>
                        <div className={s.job_info_image_1}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21.92 16.7501C21.59 19.4101 19.41 21.5901 16.75 21.9201C15.14 22.1201 13.64 21.6801 12.47 20.8201C11.8 20.3301 11.96 19.2901 12.76 19.0501C15.77 18.1401 18.14 15.7601 19.06 12.7501C19.3 11.9601 20.34 11.8001 20.83 12.4601C21.68 13.6401 22.12 15.1401 21.92 16.7501Z" fill="white" />
                                <path d="M9.99 2C5.58 2 2 5.58 2 9.99C2 14.4 5.58 17.98 9.99 17.98C14.4 17.98 17.98 14.4 17.98 9.99C17.97 5.58 14.4 2 9.99 2ZM9.05 8.87L11.46 9.71C12.33 10.02 12.75 10.63 12.75 11.57C12.75 12.65 11.89 13.54 10.84 13.54H10.75V13.59C10.75 14 10.41 14.34 10 14.34C9.59 14.34 9.25 14 9.25 13.59V13.53C8.14 13.48 7.25 12.55 7.25 11.39C7.25 10.98 7.59 10.64 8 10.64C8.41 10.64 8.75 10.98 8.75 11.39C8.75 11.75 9.01 12.04 9.33 12.04H10.83C11.06 12.04 11.24 11.83 11.24 11.57C11.24 11.22 11.18 11.2 10.95 11.12L8.54 10.28C7.68 9.98 7.25 9.37 7.25 8.42C7.25 7.34 8.11 6.45 9.16 6.45H9.25V6.41C9.25 6 9.59 5.66 10 5.66C10.41 5.66 10.75 6 10.75 6.41V6.47C11.86 6.52 12.75 7.45 12.75 8.61C12.75 9.02 12.41 9.36 12 9.36C11.59 9.36 11.25 9.02 11.25 8.61C11.25 8.25 10.99 7.96 10.67 7.96H9.17C8.94 7.96 8.76 8.17 8.76 8.43C8.75 8.77 8.81 8.79 9.05 8.87Z" fill="white" />
                            </svg>
                        </div>
                        <div className={s.job_info_detail}>
                            <div className={s.job_info_field}>Mức lương mong muốn</div>
                            <div className={s.job_info_value}>{getMucLuong(0, 0, 0, detailInfo?.salary)}</div>
                        </div>
                    </div>
                    <div className={s.job_info_item}>
                        <div className={s.job_info_image_1}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M17.39 15.67L13.35 12H10.64L6.59998 15.67C5.46998 16.69 5.09998 18.26 5.64998 19.68C6.19998 21.09 7.53998 22 9.04998 22H14.94C16.46 22 17.79 21.09 18.34 19.68C18.89 18.26 18.52 16.69 17.39 15.67ZM13.82 18.14H10.18C9.79998 18.14 9.49998 17.83 9.49998 17.46C9.49998 17.09 9.80998 16.78 10.18 16.78H13.82C14.2 16.78 14.5 17.09 14.5 17.46C14.5 17.83 14.19 18.14 13.82 18.14Z" fill="white" />
                                <path d="M18.3499 4.32C17.7999 2.91 16.4599 2 14.9499 2H9.04992C7.53992 2 6.19992 2.91 5.64992 4.32C5.10992 5.74 5.47992 7.31 6.60992 8.33L10.6499 12H13.3599L17.3999 8.33C18.5199 7.31 18.8899 5.74 18.3499 4.32ZM13.8199 7.23H10.1799C9.79992 7.23 9.49992 6.92 9.49992 6.55C9.49992 6.18 9.80992 5.87 10.1799 5.87H13.8199C14.1999 5.87 14.4999 6.18 14.4999 6.55C14.4999 6.92 14.1899 7.23 13.8199 7.23Z" fill="white" />
                            </svg>
                        </div>
                        <div className={s.job_info_detail}>
                            <div className={s.job_info_field}>Kinh nghiệm làm việc</div>
                            <div className={s.job_info_value}>{getKinhNghiem(detailInfo?.exp_years)}</div>
                        </div>
                    </div>
                    <div className={s.job_info_item}>
                        <div className={s.job_info_image_1}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
                                <path d="M19.5749 5.81676C18.8666 5.03343 17.6832 4.64176 15.9666 4.64176H15.7666V4.60843C15.7666 3.20843 15.7666 1.4751 12.6332 1.4751H11.3666C8.2332 1.4751 8.2332 3.21676 8.2332 4.60843V4.6501H8.0332C6.3082 4.6501 5.1332 5.04176 4.42487 5.8251C3.59987 6.74176 3.62487 7.9751 3.7082 8.81675L3.71654 8.87508L3.78108 9.55283C3.79297 9.67766 3.86019 9.79041 3.96509 9.859C4.16493 9.98983 4.49938 10.2054 4.69987 10.3167C4.81653 10.3917 4.94153 10.4584 5.06653 10.5251C6.49153 11.3084 8.0582 11.8334 9.64987 12.0917C9.72487 12.8751 10.0665 13.7917 11.8916 13.7917C13.7166 13.7917 14.0749 12.8834 14.1332 12.0751C15.8332 11.8001 17.4749 11.2084 18.9582 10.3417C19.0082 10.3167 19.0415 10.2917 19.0832 10.2667C19.4138 10.0799 19.7568 9.84966 20.0694 9.62416C20.1636 9.55616 20.2238 9.45116 20.2366 9.33575L20.2499 9.21675L20.2916 8.82508C20.2999 8.77508 20.2999 8.73341 20.3082 8.67508C20.3749 7.83343 20.3582 6.68343 19.5749 5.81676ZM12.9082 11.5251C12.9082 12.4084 12.9082 12.5417 11.8832 12.5417C10.8582 12.5417 10.8582 12.3834 10.8582 11.5334V10.4834H12.9082V11.5251ZM9.42487 4.64176V4.60843C9.42487 3.19176 9.42487 2.66676 11.3666 2.66676H12.6332C14.5749 2.66676 14.5749 3.2001 14.5749 4.60843V4.6501H9.42487V4.64176Z" fill="white" />
                                <path d="M19.3947 11.4451C19.6894 11.3049 20.0288 11.5385 19.9993 11.8635L19.7001 15.1583C19.5251 16.825 18.8418 18.525 15.1751 18.525H8.82513C5.15846 18.525 4.47513 16.825 4.30013 15.1666L4.0162 12.0435C3.987 11.7222 4.31863 11.489 4.6125 11.6219C5.562 12.0515 7.31462 12.8136 8.39727 13.0972C8.53419 13.133 8.64494 13.231 8.70489 13.3593C9.2107 14.441 10.3077 15.0166 11.8918 15.0166C13.4602 15.0166 14.5711 14.4189 15.0786 13.3345C15.1386 13.2061 15.2494 13.1082 15.3864 13.0721C16.5361 12.7696 18.4016 11.9177 19.3947 11.4451Z" fill="white" />
                            </svg>
                        </div>
                        <div className={s.job_info_detail}>
                            <div className={s.job_info_field}>Hình thức làm việc</div>
                            <div className={s.job_info_value}>{getHinhThuc(detailInfo?.work_option)}</div>
                        </div>
                    </div>
                    <div className={s.job_info_item}>
                        <div className={s.job_info_image_1}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
                                <path d="M16.8417 4.57508V5.19175L13.8917 3.48341C12.775 2.84175 11.2167 2.84175 10.1083 3.48341L7.15833 5.20008V4.57508C7.15833 2.70008 8.18333 1.66675 10.0583 1.66675H13.9417C15.8167 1.66675 16.8417 2.70008 16.8417 4.57508Z" fill="white" />
                                <path d="M16.8666 6.64162L16.75 6.58328L15.6166 5.93328L13.2666 4.57495C12.55 4.15828 11.45 4.15828 10.7333 4.57495L8.38329 5.92495L7.24996 6.59162L7.09996 6.66662C5.64163 7.64995 5.54163 7.83328 5.54163 9.40829V13.175C5.54163 14.75 5.64163 14.9333 7.13329 15.9416L10.7333 18.0166C11.0916 18.2333 11.5416 18.325 12 18.325C12.45 18.325 12.9083 18.225 13.2666 18.0166L16.9 15.9166C18.3666 14.9333 18.4583 14.7583 18.4583 13.175V9.40829C18.4583 7.83328 18.3583 7.64995 16.8666 6.64162ZM14.325 11.25L13.8166 11.875C13.7333 11.9666 13.675 12.1416 13.6833 12.2666L13.7333 13.0666C13.7666 13.5583 13.4166 13.8083 12.9583 13.6333L12.2166 13.3333C12.1 13.2916 11.9083 13.2916 11.7916 13.3333L11.05 13.625C10.5916 13.8083 10.2416 13.55 10.275 13.0583L10.325 12.2583C10.3333 12.1333 10.275 11.9583 10.1916 11.8666L9.67496 11.25C9.35829 10.875 9.49996 10.4583 9.97496 10.3333L10.75 10.1333C10.875 10.1 11.0166 9.98329 11.0833 9.88329L11.5166 9.21663C11.7833 8.79996 12.2083 8.79996 12.4833 9.21663L12.9166 9.88329C12.9833 9.99163 13.1333 10.1 13.25 10.1333L14.025 10.3333C14.5 10.4583 14.6416 10.875 14.325 11.25Z" fill="white" />
                            </svg>
                        </div>
                        <div className={s.job_info_detail}>
                            <div className={s.job_info_field}>Cấp bậc</div>
                            <div className={s.job_info_value}>{getCapBac(detailInfo?.cap_bac_mong_muon)}</div>
                        </div>
                    </div>
                    <div className={s.job_info_item}>
                        <div className={s.job_info_image_1}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M22 4.85018V16.7402C22 17.7102 21.21 18.6002 20.24 18.7202L19.93 18.7602C18.29 18.9802 15.98 19.6602 14.12 20.4402C13.47 20.7102 12.75 20.2202 12.75 19.5102V5.60018C12.75 5.23018 12.96 4.89018 13.29 4.71018C15.12 3.72018 17.89 2.84018 19.77 2.68018H19.83C21.03 2.68018 22 3.65018 22 4.85018Z" fill="white" />
                                <path d="M10.7102 4.71018C8.88023 3.72018 6.11023 2.84018 4.23023 2.68018H4.16023C2.96023 2.68018 1.99023 3.65018 1.99023 4.85018V16.7402C1.99023 17.7102 2.78023 18.6002 3.75023 18.7202L4.06023 18.7602C5.70023 18.9802 8.01023 19.6602 9.87023 20.4402C10.5202 20.7102 11.2402 20.2202 11.2402 19.5102V5.60018C11.2402 5.22018 11.0402 4.89018 10.7102 4.71018ZM5.00023 7.74018H7.25023C7.66023 7.74018 8.00023 8.08018 8.00023 8.49018C8.00023 8.91018 7.66023 9.24018 7.25023 9.24018H5.00023C4.59023 9.24018 4.25023 8.91018 4.25023 8.49018C4.25023 8.08018 4.59023 7.74018 5.00023 7.74018ZM8.00023 12.2402H5.00023C4.59023 12.2402 4.25023 11.9102 4.25023 11.4902C4.25023 11.0802 4.59023 10.7402 5.00023 10.7402H8.00023C8.41023 10.7402 8.75023 11.0802 8.75023 11.4902C8.75023 11.9102 8.41023 12.2402 8.00023 12.2402Z" fill="white" />
                            </svg>
                        </div>
                        <div className={s.job_info_detail}>
                            <div className={s.job_info_field}>Bằng cấp</div>
                            <div className={s.job_info_value}>{Array.isArray(detailInfo?.hocVan) && detailInfo?.hocVan.length > 0 ? detailInfo?.hocVan[0].bang_cap : 'Chưa cập nhật'}</div>
                        </div>
                    </div>
                    <div className={s.job_info_item}>
                        <div className={s.job_info_image_1}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M11.9998 1.6665C9.8165 1.6665 8.0415 3.4415 8.0415 5.62484C8.0415 7.7665 9.7165 9.49984 11.8998 9.57484C11.9665 9.5665 12.0332 9.5665 12.0832 9.57484C12.0998 9.57484 12.1082 9.57484 12.1248 9.57484C12.1332 9.57484 12.1332 9.57484 12.1415 9.57484C14.2748 9.49984 15.9498 7.7665 15.9582 5.62484C15.9582 3.4415 14.1832 1.6665 11.9998 1.6665Z" fill="white" />
                                <path d="M16.2333 11.7919C13.9083 10.2419 10.1166 10.2419 7.77497 11.7919C6.71663 12.5002 6.1333 13.4586 6.1333 14.4836C6.1333 15.5086 6.71663 16.4586 7.76663 17.1586C8.9333 17.9419 10.4666 18.3336 12 18.3336C13.5333 18.3336 15.0666 17.9419 16.2333 17.1586C17.2833 16.4502 17.8666 15.5002 17.8666 14.4669C17.8583 13.4419 17.2833 12.4919 16.2333 11.7919Z" fill="white" />
                            </svg>
                        </div>
                        <div className={s.job_info_detail}>
                            <div className={s.job_info_field}>Giới tính</div>
                            <div className={s.job_info_value}>{getGioiTinh(detailInfo?.gender)}</div>
                        </div>
                    </div>
                    <div className={s.job_info_item}>
                        <div className={s.job_info_image_1}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M16.75 3.56V2C16.75 1.59 16.41 1.25 16 1.25C15.59 1.25 15.25 1.59 15.25 2V3.5H8.74999V2C8.74999 1.59 8.40999 1.25 7.99999 1.25C7.58999 1.25 7.24999 1.59 7.24999 2V3.56C4.54999 3.81 3.23999 5.42 3.03999 7.81C3.01999 8.1 3.25999 8.34 3.53999 8.34H20.46C20.75 8.34 20.99 8.09 20.96 7.81C20.76 5.42 19.45 3.81 16.75 3.56Z" fill="white" />
                                <path d="M20 9.84009H4C3.45 9.84009 3 10.2901 3 10.8401V17.0001C3 20.0001 4.5 22.0001 8 22.0001H16C19.5 22.0001 21 20.0001 21 17.0001V10.8401C21 10.2901 20.55 9.84009 20 9.84009ZM9.21 18.2101C9.16 18.2501 9.11 18.3001 9.06 18.3301C9 18.3701 8.94 18.4001 8.88 18.4201C8.82 18.4501 8.76 18.4701 8.7 18.4801C8.63 18.4901 8.57 18.5001 8.5 18.5001C8.37 18.5001 8.24 18.4701 8.12 18.4201C7.99 18.3701 7.89 18.3001 7.79 18.2101C7.61 18.0201 7.5 17.7601 7.5 17.5001C7.5 17.2401 7.61 16.9801 7.79 16.7901C7.89 16.7001 7.99 16.6301 8.12 16.5801C8.3 16.5001 8.5 16.4801 8.7 16.5201C8.76 16.5301 8.82 16.5501 8.88 16.5801C8.94 16.6001 9 16.6301 9.06 16.6701C9.11 16.7101 9.16 16.7501 9.21 16.7901C9.39 16.9801 9.5 17.2401 9.5 17.5001C9.5 17.7601 9.39 18.0201 9.21 18.2101ZM9.21 14.7101C9.02 14.8901 8.76 15.0001 8.5 15.0001C8.24 15.0001 7.98 14.8901 7.79 14.7101C7.61 14.5201 7.5 14.2601 7.5 14.0001C7.5 13.7401 7.61 13.4801 7.79 13.2901C8.07 13.0101 8.51 12.9201 8.88 13.0801C9.01 13.1301 9.12 13.2001 9.21 13.2901C9.39 13.4801 9.5 13.7401 9.5 14.0001C9.5 14.2601 9.39 14.5201 9.21 14.7101ZM12.71 18.2101C12.52 18.3901 12.26 18.5001 12 18.5001C11.74 18.5001 11.48 18.3901 11.29 18.2101C11.11 18.0201 11 17.7601 11 17.5001C11 17.2401 11.11 16.9801 11.29 16.7901C11.66 16.4201 12.34 16.4201 12.71 16.7901C12.89 16.9801 13 17.2401 13 17.5001C13 17.7601 12.89 18.0201 12.71 18.2101ZM12.71 14.7101C12.66 14.7501 12.61 14.7901 12.56 14.8301C12.5 14.8701 12.44 14.9001 12.38 14.9201C12.32 14.9501 12.26 14.9701 12.2 14.9801C12.13 14.9901 12.07 15.0001 12 15.0001C11.74 15.0001 11.48 14.8901 11.29 14.7101C11.11 14.5201 11 14.2601 11 14.0001C11 13.7401 11.11 13.4801 11.29 13.2901C11.38 13.2001 11.49 13.1301 11.62 13.0801C11.99 12.9201 12.43 13.0101 12.71 13.2901C12.89 13.4801 13 13.7401 13 14.0001C13 14.2601 12.89 14.5201 12.71 14.7101ZM16.21 18.2101C16.02 18.3901 15.76 18.5001 15.5 18.5001C15.24 18.5001 14.98 18.3901 14.79 18.2101C14.61 18.0201 14.5 17.7601 14.5 17.5001C14.5 17.2401 14.61 16.9801 14.79 16.7901C15.16 16.4201 15.84 16.4201 16.21 16.7901C16.39 16.9801 16.5 17.2401 16.5 17.5001C16.5 17.7601 16.39 18.0201 16.21 18.2101ZM16.21 14.7101C16.16 14.7501 16.11 14.7901 16.06 14.8301C16 14.8701 15.94 14.9001 15.88 14.9201C15.82 14.9501 15.76 14.9701 15.7 14.9801C15.63 14.9901 15.56 15.0001 15.5 15.0001C15.24 15.0001 14.98 14.8901 14.79 14.7101C14.61 14.5201 14.5 14.2601 14.5 14.0001C14.5 13.7401 14.61 13.4801 14.79 13.2901C14.89 13.2001 14.99 13.1301 15.12 13.0801C15.3 13.0001 15.5 12.9801 15.7 13.0201C15.76 13.0301 15.82 13.0501 15.88 13.0801C15.94 13.1001 16 13.1301 16.06 13.1701C16.11 13.2101 16.16 13.2501 16.21 13.2901C16.39 13.4801 16.5 13.7401 16.5 14.0001C16.5 14.2601 16.39 14.5201 16.21 14.7101Z" fill="white" />
                            </svg>
                        </div>
                        <div className={s.job_info_detail}>
                            <div className={s.job_info_field}>Ngày sinh</div>
                            <div className={s.job_info_value}>{detailInfo?.birthday && getDate(detailInfo?.birthday)}</div>
                        </div>
                    </div>
                    <div className={s.job_info_item}>
                        <div className={s.job_info_image_1}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18.6747 11C17.5855 11 16.612 11.4963 16.0048 12.2542C15.3976 11.4963 14.4241 11 13.3349 11C11.494 11 10 12.4076 10 14.1401C10 14.8078 10.1157 15.4304 10.3084 15.9989C11.253 18.8051 14.1831 20.4924 15.6289 20.9526C15.8313 21.0158 16.1687 21.0158 16.3711 20.9526C17.8168 20.4924 20.7469 18.8141 21.6915 15.9989C21.8939 15.4214 22 14.8078 22 14.1401C22.0096 12.4076 20.5156 11 18.6747 11Z" fill="white" />
                                <path d="M20 9.04818C20 9.26976 19.7792 9.41427 19.568 9.35646C18.272 9.01928 16.8512 9.29866 15.776 10.0694C15.5648 10.2235 15.2768 10.2235 15.0752 10.0694C14.3168 9.51061 13.3952 9.20232 12.4256 9.20232C9.9488 9.20232 7.9328 11.2351 7.9328 13.7399C7.9328 16.4567 9.2288 18.4894 10.5344 19.8478C10.6016 19.9152 10.544 20.0309 10.4576 19.9923C7.8368 19.0964 2 15.3777 2 9.04818C2 6.25434 4.2368 4 7.0016 4C8.6432 4 10.0928 4.78998 11.0048 6.01349C11.9264 4.78998 13.376 4 15.008 4C17.7632 4 20 6.25434 20 9.04818Z" fill="white" />
                            </svg>
                        </div>
                        <div className={s.job_info_detail}>
                            <div className={s.job_info_field}>Hôn nhân</div>
                            <div className={s.job_info_value}>{detailInfo?.lg_honnhan !== 1 || !detailInfo?.lg_honnhan  ? "Đã kết hôn"  : 'Độc Thân'}</div>
                        </div>
                    </div>
                </div>

                <div className={s.job_info_content_4} style={{justifyContent: 'center'}}>
                    {/* <button className={s.button_2} onClick={handleChatNgay}>
                        <div className={s.div}>
                            <div className={s.icon}>
                                <Image
                                    src="/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/chat.svg"
                                    width={24}
                                    height={24}
                                    style={{ height: "24px", width: "24px" }}
                                    alt=""
                                />
                            </div>
                            <div className={s.content}>Chat ngay</div>
                        </div>
                    </button> */}
                    <button className={s.button_3} onClick={handleLuuHoSo}>
                        <div className={s.div}>
                            <div className={s.icon}>
                                <Image
                                    src="/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/heart.svg"
                                    width={16}
                                    height={16}
                                    style={{ height: "16px", width: "16px" }}
                                    alt=""
                                />
                            </div>
                            <div className={s.content}>{isSaved ? 'Đã lưu hồ sơ' : 'Lưu hồ sơ'}</div>
                        </div>
                    </button>
                </div>

            </div>

            <SignInNTDModal 
                isOpenSignIn={isModalSignInOpen}
                handleCancelSignIn={() => setIsModalSignInOpen(false)}
            />
        </>
    )
}

export default DetailInfo;