import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import s from './styles.module.scss';
import { getCapBac, getDate, getGioiTinh, getHanNop, getHinhThuc, getHocVan, getKinhNghiem, getMucLuong } from "@/functions/functions";

const DetailInfo = ({ detailInfo, handleUngTuyenNgay, handleChatNgay, handleLuuTin, isApply, isSave }: any) => {



    return (
        <div className={s.job_info_header}>

            <div className={s.job_info_content_1}>
                <span className={s.text}>{detailInfo.title}</span>
            </div>

            <div className={s.job_info_content_2}>
                <div className={s.job_info_item}>
                    <div className={s.job_info_image_1}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M16.8415 4.57484V5.1915L13.8915 3.48317C12.7749 2.8415 11.2165 2.8415 10.1082 3.48317L7.1582 5.19984V4.57484C7.1582 2.69984 8.1832 1.6665 10.0582 1.6665H13.9415C15.8165 1.6665 16.8415 2.69984 16.8415 4.57484Z" fill="white" />
                            <path d="M16.8665 6.64186L16.7498 6.58353L15.6165 5.93353L13.2665 4.5752C12.5498 4.15853 11.4498 4.15853 10.7332 4.5752L8.38317 5.9252L7.24984 6.59186L7.09984 6.66686C5.6415 7.65019 5.5415 7.83353 5.5415 9.40854V13.1752C5.5415 14.7502 5.6415 14.9335 7.13317 15.9419L10.7332 18.0169C11.0915 18.2335 11.5415 18.3252 11.9998 18.3252C12.4498 18.3252 12.9082 18.2252 13.2665 18.0169L16.8998 15.9169C18.3665 14.9335 18.4582 14.7585 18.4582 13.1752V9.40854C18.4582 7.83353 18.3582 7.65019 16.8665 6.64186ZM14.3248 11.2502L13.8165 11.8752C13.7332 11.9669 13.6748 12.1419 13.6832 12.2669L13.7332 13.0669C13.7665 13.5585 13.4165 13.8085 12.9582 13.6335L12.2165 13.3335C12.0998 13.2919 11.9082 13.2919 11.7915 13.3335L11.0498 13.6252C10.5915 13.8085 10.2415 13.5502 10.2748 13.0585L10.3248 12.2585C10.3332 12.1335 10.2748 11.9585 10.1915 11.8669L9.67484 11.2502C9.35817 10.8752 9.49984 10.4585 9.97484 10.3335L10.7498 10.1335C10.8748 10.1002 11.0165 9.98354 11.0832 9.88354L11.5165 9.21687C11.7832 8.8002 12.2082 8.8002 12.4832 9.21687L12.9165 9.88354C12.9832 9.99187 13.1332 10.1002 13.2498 10.1335L14.0248 10.3335C14.4998 10.4585 14.6415 10.8752 14.3248 11.2502Z" fill="white" />
                        </svg>
                    </div>
                    <div className={s.job_info_detail}>
                        <div className={s.job_info_field}>Cấp bậc</div>
                        <div className={s.job_info_value}>{detailInfo?.cap_bac ? getCapBac(detailInfo.cap_bac) : 'Không yêu cầu'}</div>
                    </div>
                </div>
                <div className={s.job_info_item}>
                    <div className={s.job_info_image_1}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19.5749 5.81676C18.8666 5.03343 17.6832 4.64176 15.9666 4.64176H15.7666V4.60843C15.7666 3.20843 15.7666 1.4751 12.6332 1.4751H11.3666C8.2332 1.4751 8.2332 3.21676 8.2332 4.60843V4.6501H8.0332C6.3082 4.6501 5.1332 5.04176 4.42487 5.8251C3.59987 6.74176 3.62487 7.9751 3.7082 8.81675L3.71654 8.87508L3.78108 9.55283C3.79297 9.67766 3.86019 9.79041 3.96509 9.859C4.16493 9.98983 4.49938 10.2054 4.69987 10.3167C4.81653 10.3917 4.94153 10.4584 5.06653 10.5251C6.49153 11.3084 8.0582 11.8334 9.64987 12.0917C9.72487 12.8751 10.0665 13.7917 11.8916 13.7917C13.7166 13.7917 14.0749 12.8834 14.1332 12.0751C15.8332 11.8001 17.4749 11.2084 18.9582 10.3417C19.0082 10.3167 19.0415 10.2917 19.0832 10.2667C19.4138 10.0799 19.7568 9.84966 20.0694 9.62416C20.1636 9.55616 20.2238 9.45116 20.2366 9.33575L20.2499 9.21675L20.2916 8.82508C20.2999 8.77508 20.2999 8.73341 20.3082 8.67508C20.3749 7.83343 20.3582 6.68343 19.5749 5.81676ZM12.9082 11.5251C12.9082 12.4084 12.9082 12.5417 11.8832 12.5417C10.8582 12.5417 10.8582 12.3834 10.8582 11.5334V10.4834H12.9082V11.5251ZM9.42487 4.64176V4.60843C9.42487 3.19176 9.42487 2.66676 11.3666 2.66676H12.6332C14.5749 2.66676 14.5749 3.2001 14.5749 4.60843V4.6501H9.42487V4.64176Z" fill="white" />
                            <path d="M19.3944 11.4454C19.6891 11.3051 20.0285 11.5387 19.999 11.8637L19.6999 15.1585C19.5249 16.8252 18.8415 18.5252 15.1749 18.5252H8.82489C5.15822 18.5252 4.47489 16.8252 4.29989 15.1669L4.01596 12.0437C3.98675 11.7225 4.31839 11.4892 4.61225 11.6221C5.56176 12.0517 7.31438 12.8139 8.39703 13.0975C8.53394 13.1333 8.64469 13.2313 8.70464 13.3595C9.21045 14.4413 10.3075 15.0169 11.8915 15.0169C13.4599 15.0169 14.5709 14.4191 15.0784 13.3347C15.1384 13.2064 15.2492 13.1085 15.3862 13.0724C16.5359 12.7699 18.4014 11.918 19.3944 11.4454Z" fill="white" />
                        </svg>
                    </div>
                    <div className={s.job_info_detail}>
                        <div className={s.job_info_field}>Hình thức làm việc</div>
                        <div className={s.job_info_value}>{detailInfo?.hinh_thuc_lam_viec ? getHinhThuc(detailInfo.hinh_thuc_lam_viec) : 'Chưa cập nhật'}</div>
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
                        <div className={s.job_info_value}>{getGioiTinh(detailInfo.gioi_tinh)}</div>
                    </div>
                </div>
                <div className={s.job_info_item}>
                    <div className={s.job_info_image_1}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M17.39 15.67L13.35 12H10.64L6.59998 15.67C5.46998 16.69 5.09998 18.26 5.64998 19.68C6.19998 21.09 7.53998 22 9.04998 22H14.94C16.46 22 17.79 21.09 18.34 19.68C18.89 18.26 18.52 16.69 17.39 15.67ZM13.82 18.14H10.18C9.79998 18.14 9.49998 17.83 9.49998 17.46C9.49998 17.09 9.80998 16.78 10.18 16.78H13.82C14.2 16.78 14.5 17.09 14.5 17.46C14.5 17.83 14.19 18.14 13.82 18.14Z" fill="white" />
                            <path d="M18.3502 4.32C17.8002 2.91 16.4602 2 14.9502 2H9.05016C7.54016 2 6.20016 2.91 5.65016 4.32C5.11016 5.74 5.48016 7.31 6.61016 8.33L10.6502 12H13.3602L17.4002 8.33C18.5202 7.31 18.8902 5.74 18.3502 4.32ZM13.8202 7.23H10.1802C9.80016 7.23 9.50016 6.92 9.50016 6.55C9.50016 6.18 9.81016 5.87 10.1802 5.87H13.8202C14.2002 5.87 14.5002 6.18 14.5002 6.55C14.5002 6.92 14.1902 7.23 13.8202 7.23Z" fill="white" />
                        </svg>
                    </div>
                    <div className={s.job_info_detail}>
                        <div className={s.job_info_field}>Kinh nghiệm</div>
                        <div className={s.job_info_value}>{detailInfo?.kinh_nghiem ? getKinhNghiem(detailInfo.kinh_nghiem) : 'Không yêu cầu'}</div>
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
                        <div className={s.job_info_value}>{getHocVan(detailInfo.bang_cap)}</div>
                    </div>
                </div>
                <div className={s.job_info_item}>
                    <div className={s.job_info_image_1}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21.9199 16.7501C21.5899 19.4101 19.4099 21.5901 16.7499 21.9201C15.1399 22.1201 13.6399 21.6801 12.4699 20.8201C11.7999 20.3301 11.9599 19.2901 12.7599 19.0501C15.7699 18.1401 18.1399 15.7601 19.0599 12.7501C19.2999 11.9601 20.3399 11.8001 20.8299 12.4601C21.6799 13.6401 22.1199 15.1401 21.9199 16.7501Z" fill="white" />
                            <path d="M9.99 2C5.58 2 2 5.58 2 9.99C2 14.4 5.58 17.98 9.99 17.98C14.4 17.98 17.98 14.4 17.98 9.99C17.97 5.58 14.4 2 9.99 2ZM9.05 8.87L11.46 9.71C12.33 10.02 12.75 10.63 12.75 11.57C12.75 12.65 11.89 13.54 10.84 13.54H10.75V13.59C10.75 14 10.41 14.34 10 14.34C9.59 14.34 9.25 14 9.25 13.59V13.53C8.14 13.48 7.25 12.55 7.25 11.39C7.25 10.98 7.59 10.64 8 10.64C8.41 10.64 8.75 10.98 8.75 11.39C8.75 11.75 9.01 12.04 9.33 12.04H10.83C11.06 12.04 11.24 11.83 11.24 11.57C11.24 11.22 11.18 11.2 10.95 11.12L8.54 10.28C7.68 9.98 7.25 9.37 7.25 8.42C7.25 7.34 8.11 6.45 9.16 6.45H9.25V6.41C9.25 6 9.59 5.66 10 5.66C10.41 5.66 10.75 6 10.75 6.41V6.47C11.86 6.52 12.75 7.45 12.75 8.61C12.75 9.02 12.41 9.36 12 9.36C11.59 9.36 11.25 9.02 11.25 8.61C11.25 8.25 10.99 7.96 10.67 7.96H9.17C8.94 7.96 8.76 8.17 8.76 8.43C8.75 8.77 8.81 8.79 9.05 8.87Z" fill="white" />
                        </svg>
                    </div>
                    <div className={s.job_info_detail}>
                        <div className={s.job_info_field}>Mức lương</div>
                        <div className={s.job_info_value}>{detailInfo?.new_money_type && detailInfo?.new_money ? getMucLuong(detailInfo.new_money_type, detailInfo.new_money_from, detailInfo.new_money_to, detailInfo.new_money) : 'Thỏa thuận'}</div>
                    </div>
                </div>
                <div className={s.job_info_item}>
                    <div className={s.job_info_image_1}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
                            <path d="M9.49984 1.6665C7.3165 1.6665 5.5415 3.4415 5.5415 5.62484C5.5415 7.7665 7.2165 9.49984 9.39984 9.57484C9.4665 9.5665 9.53317 9.5665 9.58317 9.57484C9.59984 9.57484 9.60817 9.57484 9.62484 9.57484C9.63317 9.57484 9.63317 9.57484 9.6415 9.57484C11.7748 9.49984 13.4498 7.7665 13.4582 5.62484C13.4582 3.4415 11.6832 1.6665 9.49984 1.6665Z" fill="white" />
                            <path d="M13.7333 11.7919C11.4083 10.2419 7.61663 10.2419 5.27497 11.7919C4.21663 12.5002 3.6333 13.4586 3.6333 14.4836C3.6333 15.5086 4.21663 16.4586 5.26663 17.1586C6.4333 17.9419 7.96663 18.3336 9.49997 18.3336C11.0333 18.3336 12.5666 17.9419 13.7333 17.1586C14.7833 16.4502 15.3666 15.5002 15.3666 14.4669C15.3583 13.4419 14.7833 12.4919 13.7333 11.7919Z" fill="white" />
                            <path d="M18.6583 6.11659C18.7916 7.73325 17.6416 9.14991 16.05 9.34158C16.0416 9.34158 16.0416 9.34158 16.0333 9.34158H16.0083C15.9583 9.34158 15.9083 9.34158 15.8666 9.35824C15.0583 9.39991 14.3166 9.14158 13.7583 8.66658C14.6166 7.89992 15.1083 6.74992 15.0083 5.49992C14.95 4.82492 14.7166 4.20825 14.3666 3.68325C14.6833 3.52492 15.05 3.42492 15.425 3.39159C17.0583 3.24992 18.5166 4.46659 18.6583 6.11659Z" fill="white" />
                            <path d="M20.3249 13.8252C20.2582 14.6335 19.7415 15.3335 18.8749 15.8085C18.0415 16.2668 16.9915 16.4835 15.9499 16.4585C16.5499 15.9168 16.8999 15.2418 16.9665 14.5252C17.0499 13.4918 16.5582 12.5002 15.5749 11.7085C15.0165 11.2668 14.3665 10.9168 13.6582 10.6585C15.4999 10.1252 17.8165 10.4835 19.2415 11.6335C20.0082 12.2502 20.3999 13.0252 20.3249 13.8252Z" fill="white" />
                        </svg>
                    </div>
                    <div className={s.job_info_detail}>
                        <div className={s.job_info_field}>Số lượng cần tuyển</div>
                        <div className={s.job_info_value}>{detailInfo?.so_luong_can_tuyen ? `${detailInfo.so_luong_can_tuyen} nhân viên` : 'Chưa cập nhật'}</div>
                    </div>
                </div>
                <div className={s.job_info_item}>
                    <div className={s.job_info_image_1}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z" fill="white" />
                            <path d="M20 9.83984H4C3.45 9.83984 3 10.2898 3 10.8398V16.9998C3 19.9998 4.5 21.9998 8 21.9998H16C19.5 21.9998 21 19.9998 21 16.9998V10.8398C21 10.2898 20.55 9.83984 20 9.83984ZM9.21 18.2098C9.16 18.2498 9.11 18.2998 9.06 18.3298C9 18.3698 8.94 18.3998 8.88 18.4198C8.82 18.4498 8.76 18.4698 8.7 18.4798C8.63 18.4898 8.57 18.4998 8.5 18.4998C8.37 18.4998 8.24 18.4698 8.12 18.4198C7.99 18.3698 7.89 18.2998 7.79 18.2098C7.61 18.0198 7.5 17.7598 7.5 17.4998C7.5 17.2398 7.61 16.9798 7.79 16.7898C7.89 16.6998 7.99 16.6298 8.12 16.5798C8.3 16.4998 8.5 16.4798 8.7 16.5198C8.76 16.5298 8.82 16.5498 8.88 16.5798C8.94 16.5998 9 16.6298 9.06 16.6698C9.11 16.7098 9.16 16.7498 9.21 16.7898C9.39 16.9798 9.5 17.2398 9.5 17.4998C9.5 17.7598 9.39 18.0198 9.21 18.2098ZM9.21 14.7098C9.02 14.8898 8.76 14.9998 8.5 14.9998C8.24 14.9998 7.98 14.8898 7.79 14.7098C7.61 14.5198 7.5 14.2598 7.5 13.9998C7.5 13.7398 7.61 13.4798 7.79 13.2898C8.07 13.0098 8.51 12.9198 8.88 13.0798C9.01 13.1298 9.12 13.1998 9.21 13.2898C9.39 13.4798 9.5 13.7398 9.5 13.9998C9.5 14.2598 9.39 14.5198 9.21 14.7098ZM12.71 18.2098C12.52 18.3898 12.26 18.4998 12 18.4998C11.74 18.4998 11.48 18.3898 11.29 18.2098C11.11 18.0198 11 17.7598 11 17.4998C11 17.2398 11.11 16.9798 11.29 16.7898C11.66 16.4198 12.34 16.4198 12.71 16.7898C12.89 16.9798 13 17.2398 13 17.4998C13 17.7598 12.89 18.0198 12.71 18.2098ZM12.71 14.7098C12.66 14.7498 12.61 14.7898 12.56 14.8298C12.5 14.8698 12.44 14.8998 12.38 14.9198C12.32 14.9498 12.26 14.9698 12.2 14.9798C12.13 14.9898 12.07 14.9998 12 14.9998C11.74 14.9998 11.48 14.8898 11.29 14.7098C11.11 14.5198 11 14.2598 11 13.9998C11 13.7398 11.11 13.4798 11.29 13.2898C11.38 13.1998 11.49 13.1298 11.62 13.0798C11.99 12.9198 12.43 13.0098 12.71 13.2898C12.89 13.4798 13 13.7398 13 13.9998C13 14.2598 12.89 14.5198 12.71 14.7098ZM16.21 18.2098C16.02 18.3898 15.76 18.4998 15.5 18.4998C15.24 18.4998 14.98 18.3898 14.79 18.2098C14.61 18.0198 14.5 17.7598 14.5 17.4998C14.5 17.2398 14.61 16.9798 14.79 16.7898C15.16 16.4198 15.84 16.4198 16.21 16.7898C16.39 16.9798 16.5 17.2398 16.5 17.4998C16.5 17.7598 16.39 18.0198 16.21 18.2098ZM16.21 14.7098C16.16 14.7498 16.11 14.7898 16.06 14.8298C16 14.8698 15.94 14.8998 15.88 14.9198C15.82 14.9498 15.76 14.9698 15.7 14.9798C15.63 14.9898 15.56 14.9998 15.5 14.9998C15.24 14.9998 14.98 14.8898 14.79 14.7098C14.61 14.5198 14.5 14.2598 14.5 13.9998C14.5 13.7398 14.61 13.4798 14.79 13.2898C14.89 13.1998 14.99 13.1298 15.12 13.0798C15.3 12.9998 15.5 12.9798 15.7 13.0198C15.76 13.0298 15.82 13.0498 15.88 13.0798C15.94 13.0998 16 13.1298 16.06 13.1698C16.11 13.2098 16.16 13.2498 16.21 13.2898C16.39 13.4798 16.5 13.7398 16.5 13.9998C16.5 14.2598 16.39 14.5198 16.21 14.7098Z" fill="white" />
                        </svg>
                    </div>
                    <div className={s.job_info_detail}>
                        <div className={s.job_info_field}>Thời gian thử việc</div>
                        <div className={s.job_info_value}>{detailInfo?.thoi_gian_thu_viec ? detailInfo.thoi_gian_thu_viec : 'Chưa cập nhật'}</div>
                    </div>
                </div>
                <div className={s.job_info_item}>
                    <div className={s.job_info_image_1}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19.17 6.64002C18.74 4.47002 17.13 3.52002 14.89 3.52002H6.10996C3.46996 3.52002 1.70996 4.84002 1.70996 7.92002V13.07C1.70996 15.29 2.61996 16.59 4.11996 17.15C4.33996 17.23 4.57996 17.3 4.82996 17.34C5.22996 17.43 5.65996 17.47 6.10996 17.47H14.9C17.54 17.47 19.3 16.15 19.3 13.07V7.92002C19.3 7.45002 19.26 7.03002 19.17 6.64002ZM5.52996 12C5.52996 12.41 5.18996 12.75 4.77996 12.75C4.36996 12.75 4.02996 12.41 4.02996 12V9.00002C4.02996 8.59002 4.36996 8.25002 4.77996 8.25002C5.18996 8.25002 5.52996 8.59002 5.52996 9.00002V12ZM10.5 13.14C9.03996 13.14 7.85996 11.96 7.85996 10.5C7.85996 9.04002 9.03996 7.86002 10.5 7.86002C11.96 7.86002 13.14 9.04002 13.14 10.5C13.14 11.96 11.96 13.14 10.5 13.14ZM16.96 12C16.96 12.41 16.62 12.75 16.21 12.75C15.8 12.75 15.46 12.41 15.46 12V9.00002C15.46 8.59002 15.8 8.25002 16.21 8.25002C16.62 8.25002 16.96 8.59002 16.96 9.00002V12Z" fill="white" />
                            <path d="M22.2998 10.9198V16.0698C22.2998 19.1498 20.5398 20.4798 17.8898 20.4798H9.10977C8.35977 20.4798 7.68977 20.3698 7.10977 20.1498C6.63977 19.9798 6.22977 19.7298 5.89977 19.4098C5.71977 19.2398 5.85977 18.9698 6.10977 18.9698H14.8898C18.5898 18.9698 20.7898 16.7698 20.7898 13.0798V7.91979C20.7898 7.67979 21.0598 7.52979 21.2298 7.70979C21.9098 8.42979 22.2998 9.47979 22.2998 10.9198Z" fill="white" />
                        </svg>
                    </div>
                    <div className={s.job_info_detail}>
                        <div className={s.job_info_field}>Hoa hồng</div>
                        <div className={s.job_info_value}>{detailInfo?.hoa_hong ? detailInfo.hoa_hong : 'Chưa cập nhật'}</div>
                    </div>
                </div>
                <div className={s.job_info_item}>
                    <div className={s.job_info_image_1}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12.0001 4.6499C7.22008 4.6499 3.33008 8.5399 3.33008 13.3199C3.33008 18.0999 7.22008 21.9999 12.0001 21.9999C16.7801 21.9999 20.6701 18.1099 20.6701 13.3299C20.6701 8.5499 16.7801 4.6499 12.0001 4.6499ZM12.7501 12.9999C12.7501 13.4099 12.4101 13.7499 12.0001 13.7499C11.5901 13.7499 11.2501 13.4099 11.2501 12.9999V7.9999C11.2501 7.5899 11.5901 7.2499 12.0001 7.2499C12.4101 7.2499 12.7501 7.5899 12.7501 7.9999V12.9999Z" fill="white" />
                            <path d="M14.8901 3.45H9.11014C8.71014 3.45 8.39014 3.13 8.39014 2.73C8.39014 2.33 8.71014 2 9.11014 2H14.8901C15.2901 2 15.6101 2.32 15.6101 2.72C15.6101 3.12 15.2901 3.45 14.8901 3.45Z" fill="white" />
                        </svg>
                    </div>
                    <div className={s.job_info_detail}>
                        <div className={s.job_info_field}>Hạn nộp hồ sơ</div>
                        <div className={s.job_info_value}>{getHanNop(detailInfo.han_nop_ho_so)}</div>
                    </div>
                </div>
            </div>

            <div className={s.job_info_content_3}>
                <div className={s.job_info_image_2}>
                    <div className={s.image}>
                        <div className={s.background}>
                            <span className={s.text}>🕓</span>
                        </div>
                    </div>
                </div>
                <div className={s.job_info_detail_1}>Ngày cập nhật: {getDate(detailInfo.new_update_time)}</div>
            </div>

            <div className={s.job_info_content_4}>
                {!isApply ? <button className={s.button_1} onClick={handleUngTuyenNgay}>
                    <div className={s.div}>
                        <div className={s.icon}>
                            <Image
                                src="/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/may-bay.svg"
                                width={15}
                                height={20}
                                style={{ height: "20px", width: "15px" }}
                                alt=""
                            />
                        </div>
                        <div className={s.content}>Ứng tuyển ngay</div>
                    </div>
                </button> : <div className={s.button_1}>
                    <div className={s.div}>
                        <div className={s.icon}>
                            <Image
                                src="/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/may-bay.svg"
                                width={15}
                                height={20}
                                style={{ height: "20px", width: "15px" }}
                                alt=""
                            />
                        </div>
                        <div className={s.content}>Bạn đã ứng tuyển công việc này</div>
                    </div>
                </div>}

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
                {!isSave ? <button className={s.button_3} onClick={handleLuuTin}>
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
                        <div className={s.content}>Lưu tin</div>
                    </div>
                </button> : <div className={s.button_3}>
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
                        <div className={s.content}>Đã lưu</div>
                    </div>
                </div>}
            </div>

        </div>
    )
}

export default DetailInfo;