import { Modal, Rate } from 'antd';
import { useState } from 'react';

import Image from 'next/image';
import ProgressStar from "../ProgressStar";
import s from './styles.module.scss';

const RateStar = ({ rateInfo, rateMedium, rateYourself, setRateYourself }: any) => {
    const handleRateYourself = (star: any) => {
        setRateYourself(star);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={s.job_detail_box_6}>
            <div className={s.title}>
                <span>Đánh giá</span>
            </div>
            <div className={s.content}>
                <div className={s.rate}>
                    <div className={s.rateLeft}>
                        {rateInfo?.sort((a: any, b: any) => b.star - a.star)?.map((item: any, index: any) => (
                            <div key={index} className={s.rateDetail}>
                                <div className={s.star}>
                                    <span>{item.star}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ paddingBottom: "2px" }}>
                                        <g clipPath="url(#clip0_1590_37881)">
                                            <path d="M10.243 12.25C10.1497 12.2504 10.0576 12.2283 9.97462 12.1858L6.99962 10.6283L4.02462 12.1858C3.92801 12.2366 3.8191 12.2593 3.71025 12.2513C3.6014 12.2432 3.49698 12.2048 3.40887 12.1404C3.32076 12.076 3.25248 11.9882 3.21181 11.8869C3.17114 11.7856 3.15969 11.6749 3.17878 11.5675L3.76212 8.28331L1.35878 5.94998C1.2838 5.87515 1.23061 5.78132 1.20492 5.67855C1.17922 5.57578 1.182 5.46795 1.21295 5.36664C1.24676 5.26297 1.30895 5.17085 1.39247 5.10073C1.47599 5.03062 1.57749 4.98532 1.68545 4.96998L5.01045 4.48581L6.47462 1.49331C6.52238 1.39469 6.59696 1.31151 6.68982 1.25331C6.78267 1.19511 6.89003 1.16425 6.99962 1.16425C7.1092 1.16425 7.21657 1.19511 7.30942 1.25331C7.40227 1.31151 7.47685 1.39469 7.52462 1.49331L9.00628 4.47998L12.3313 4.96414C12.4392 4.97949 12.5407 5.02479 12.6243 5.0949C12.7078 5.16502 12.77 5.25714 12.8038 5.36081C12.8347 5.46212 12.8375 5.56994 12.8118 5.67271C12.7861 5.77548 12.7329 5.86932 12.658 5.94414L10.2546 8.27748L10.838 11.5616C10.8588 11.671 10.8479 11.784 10.8065 11.8874C10.7652 11.9908 10.6951 12.0801 10.6046 12.145C10.499 12.219 10.3718 12.2559 10.243 12.25Z" fill="#FFA317" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1590_37881">
                                                <rect width="14" height="14" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div className={s.percent}>
                                    <ProgressStar percent={item.percent} />
                                </div>
                                <span >
                                    {item.count}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className={s.rateRight}>
                        <span className={s.tyLe}>{rateMedium}/5</span>
                        <div className={s.star_chi_tiet_tin}>
                            <Rate disabled tooltips={[]} allowHalf value={Number(rateMedium)} />
                        </div>
                        <span className={s.danhGia}>{rateInfo?.reduce((acc: any, obj: any) => acc + obj.count, 0)} đánh giá</span>
                    </div>
                </div>
                <span className={s.text}>Bạn đánh giá sao tin tuyển dụng này</span>
                <button onClick={showModal} className={s.buttonRate}>Đánh giá ngay</button>
            </div>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} title={null} footer={null} closeIcon={false} className='customize-modal'>
                <div className={s.modal_content} >
                    <div className={s.box_content}>
                        <Image height={181} width={236} alt='' src='/images/candidate/evaluate.png' className={s.evaluate}></Image>
                        <p>Bạn thấy ứng viên này như thế nào?</p>
                    </div>
                    <div className={s.star_evaluate}>
                        <Rate onChange={handleRateYourself} allowHalf value={rateYourself || 0} />
                    </div>
                    <div className={s.list_content}>
                        <p className={s.very_bad}>Rất tệ</p>
                        <p className={s.bad}>Tệ</p>
                        <p className={s.normal}>Bình thường</p>
                        <p className={s.good}>Tốt</p>
                        <p className={s.very_god}>Rát tốt</p>
                    </div>
                    <button className={rateYourself ? s.btn_active_value : s.btn_normal}>Gửi đánh giá</button>
                </div>
            </Modal>
        </div>
    )
}

export default RateStar;