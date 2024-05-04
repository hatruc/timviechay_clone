/* eslint-disable @next/next/no-img-element */
import { Modal } from 'antd/lib';
import s from './box_profile.module.scss'
import { use, useContext, useEffect, useState } from 'react'
import { data } from 'jquery';
import { POST, POST_SERVER } from '@/pages/api/base-api';
import SignInNTDModal from '../nha-tuyen-dung/sign_in';
import { checkLogin } from '../service/functions';
import { useRouter } from 'next/router';
import { NTD_UV_Context } from '../context/ntd_uv_context';
import Image from 'next/image';
// import Link from 'next/link';

export interface ProfileProps {
    profileData: any,
    pointBuy?: number,
}
const Box_profile: React.FC<ProfileProps> = ({ profileData, pointBuy }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { point, changePoint } = useContext(NTD_UV_Context)
    const router = useRouter()
    // const [pointBuyProfile, setPointBuyProfile] = useState<number>(0)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // useEffect(() => {
    //     fetchEmployInfo()
    // }, [pointBuyProfile])

    // const fetchEmployInfo = async () => {
    //     let response = await POST('ntd/ManageServiceNTD', {})

    //     if (response && response.result) {
    //         setPointBuyProfile(response?.data?.pointBuy || 0)
    //     } else {
    //         alert(response.message)
    //     }
    // }

    const handleViewProfileBtn = () => {
        if (!checkLogin(1)) {
            setIsLoginOpen(true)
        } else {
            showModal()
        }
    }

    const handleBuyPointProfile = async (e: any) => {

        // if ((point || 0) >= 2) {
            let response = await POST(`ntd/ViewCandidateInformation`, { iduv: profileData.use_id })
            if (response && response.result == true) {
                // window.location.reload()
                changePoint(point - 2)
                router.reload()
            } else {
                alert(response.message)
            }
        // } else {
        //     alert('Không đủ điểm!')
        // }
    }

    return (
        <>
            <style>
                {`
            .customize-modal .ant-modal-content{
                padding:0 !important;
            }
            `}
            </style>
            <div className={s.box_profile}>
                <p className={s.title_info}>Thông tin liên hệ</p>
                <div className={s.box_img_profile}>
                    {/* <img src={'/images/authorization/imh_up.jpg'} alt='' /> */}
                    <Image width={90} height={90} src={`${profileData?.use_logo ? profileData.use_logo : '/images/candidate/ava_default.png'}`} alt='' onError={(e) => {
                        e.currentTarget.srcset = '/images/candidate/ava_default.png'
                    }}/>
                </div>
                <div className={s.box_info_detail}>
                    <p className={s.label}>Mã ứng viên: </p>
                    <p className={s.value}>{profileData?.use_id ? profileData.use_id : ''} </p>
                </div>
                <div className={s.box_info_detail}>
                    <p className={s.label}>Lượt xem: </p>
                    <p className={s.value}>{profileData?.use_view_count ? profileData.use_view_count : '0'} </p>
                </div>

                <div className={s.box_info_detail}>
                    <p className={s.label}>Email: </p>
                    <p className={s.value + ' ' + s.t_hidden} >{profileData?.xemTT ? (profileData?.use_mail || profileData?.use_email_contact || 'Chưa cập nhật') : `Thông tin đang ẩn`}</p>
                </div>
                <div className={s.box_info_detail}>
                    <p className={s.label}>Số điện thoại: </p>
                    <p className={s.value + ' ' + s.t_hidden} >{profileData?.xemTT ? (profileData?.use_phone || profileData?.use_phone_tk || 'Chưa cập nhật') : `Thông tin đang ẩn`} </p>
                </div>
                {!profileData?.xemTT && <div className={s.btn_send} onClick={handleViewProfileBtn}>
                    <img src="/images/candidate/send-icon.png" alt="" />
                    <p>Xem liên hệ</p>
                </div>}
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} title={null} footer={null} closeIcon={false} className='customize-modal'>
                    <div className={s.container_modal}>
                        <div className={s.header_modal}> <p>Thông báo</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" style={{ cursor: 'pointer' }} onClick={handleCancel}>
                                <g clip-path="url(#clip0_1625_50882)">
                                    <path d="M19.9689 3.78117C20.2576 4.06981 20.4197 4.4613 20.4197 4.8695C20.4197 5.27771 20.2576 5.6692 19.9689 5.95784L13.8017 12.1251L19.9689 18.2923C20.2576 18.581 20.4197 18.9725 20.4197 19.3807C20.4197 19.7889 20.2576 20.1804 19.9689 20.469C19.6803 20.7576 19.2888 20.9198 18.8806 20.9198C18.4724 20.9198 18.0809 20.7576 17.7922 20.469L11.625 14.3018L5.45776 20.469C5.16912 20.7576 4.77763 20.9198 4.36942 20.9198C3.96122 20.9198 3.56973 20.7576 3.28109 20.469C2.99244 20.1804 2.83028 19.7889 2.83028 19.3807C2.83028 18.9725 2.99244 18.581 3.28109 18.2923L9.44833 12.1251L3.28109 5.95784C2.99244 5.6692 2.83028 5.27771 2.83028 4.8695C2.83028 4.4613 2.99244 4.06981 3.28109 3.78117C3.56973 3.49252 3.96122 3.33036 4.36942 3.33036C4.77763 3.33036 5.16912 3.49252 5.45776 3.78117L11.625 9.94841L17.7922 3.78117C18.0809 3.49252 18.4724 3.33036 18.8806 3.33036C19.2888 3.33036 19.6803 3.49252 19.9689 3.78117Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1625_50882">
                                        <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className={s.body_modal}>
                            <div className={s.content}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="57" height="56" viewBox="0 0 57 56" fill="none">
                                    <g clip-path="url(#clip0_1625_50886)">
                                        <path d="M28.5 0C13.0602 0 0.5 12.5602 0.5 28C0.5 43.4398 13.0602 56 28.5 56C43.9398 56 56.5 43.4398 56.5 28C56.5 12.5602 43.9398 0 28.5 0Z" fill="#77C900" />
                                        <path d="M30.5662 8L30.2694 36.4741H26.4566L26.137 8H30.5662ZM26 45.139C26 44.3215 26.2055 43.6312 26.6164 43.0681C27.0426 42.505 27.6667 42.2234 28.4886 42.2234C29.2953 42.2234 29.9117 42.505 30.3379 43.0681C30.7793 43.6312 31 44.3215 31 45.139C31 45.9201 30.7793 46.5922 30.3379 47.1553C29.9117 47.7184 29.2953 48 28.4886 48C27.6667 48 27.0426 47.7184 26.6164 47.1553C26.2055 46.5922 26 45.9201 26 45.139Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1625_50886">
                                            <rect width="56" height="56" fill="white" transform="translate(0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>Điểm lọc hồ sơ: <span>2 điểm</span></p>
                                <div className={s.confirm}>
                                    <button className={s.cancel} onClick={handleCancel}>Hủy</button>
                                    <button type='submit' className={s.use_point} onClick={(e) => handleBuyPointProfile(e)}>Dùng 2 điểm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            <SignInNTDModal isOpenSignIn={isLoginOpen} handleCancelSignIn={() => setIsLoginOpen(false)} />
        </>
    )
}

export default Box_profile
