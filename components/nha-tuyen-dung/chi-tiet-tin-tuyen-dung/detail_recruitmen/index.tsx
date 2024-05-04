import dynamic from 'next/dynamic';
import Image from "next/image";
import { useEffect, useState } from 'react';

const VideoPlayer = dynamic(() => import('@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/video'), { ssr: false })
import SignInModal from '../sign_in';

import s from './styles.module.scss';
import ProgressLine from './progress_line';
import * as data from '@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/data';
import DOMPurify from 'dompurify'

const RecruitmentDetail = ({ recruitmentInfo, fitJobLevel, handleLuuTin, handleUngTuyenNgay, isApply, isSave }: any) => {
    const [isOpenSignIn, setIsOpenSignIn] = useState(false);
    const [groupCircleFirst, setGroupCircleFirst] = useState<React.ReactNode>(<></>);
    const [groupCircleSecond, setGroupCircleSecond] = useState<React.ReactNode>(<></>);
    const [groupCircleThird, setGroupCircleThird] = useState<React.ReactNode>(<></>);
    const [groupCircleFourth, setGroupCircleFourth] = useState<React.ReactNode>(<></>);
    const [groupCircleFifth, setGroupCircleFifth] = useState<React.ReactNode>(<></>);

    useEffect(() => {
        if (fitJobLevel != undefined) {
            setGroupCircleFirst(data.groupCircleFirst.slice(0, Math.round(36 * Number(fitJobLevel?.yeu_to_khac) / 100)));
            setGroupCircleSecond(data.groupCircleSecond.slice(0, Math.round(32 * Number(fitJobLevel?.muc_luong) / 100)));
            setGroupCircleThird(data.groupCircleThird.slice(0, Math.round(24 * Number(fitJobLevel?.kinh_nghiem) / 100)));
            setGroupCircleFourth(data.groupCircleFourth.slice(0, Math.round(16 * Number(fitJobLevel?.ky_nang) / 100)));
            setGroupCircleFifth(data.groupCircleFifth.slice(0, Math.round(12 * Number(fitJobLevel?.vi_tri_cong_viec) / 100)));
        }
    }, [fitJobLevel])
    const handleCancelSignIn = () => {
        setIsOpenSignIn(false);
    }
    return (
        <div className={s.job_detail_box_3}>

            {/* <VideoPlayer url={recruitmentInfo?.video} /> */}

            <div className={s.job_detail_content_1}>
                <div className={s.job_header}>
                    <span className={s.text}>Chi tiết tin tuyển dụng</span>
                </div>
                <div className={s.job_content}>
                    <span className={s.job_title}>Mô tả công việc</span>
                    <pre className={s.job_body} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recruitmentInfo?.moTaCongViec) }}></pre>
                </div>
                <div className={s.job_content}>
                    <span className={s.job_title}>Yêu cầu ứng viên</span>
                    <pre className={s.job_body} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recruitmentInfo?.yeuCauUngVien) }}></pre>
                </div>
                <div className={s.job_content}>
                    <span className={s.job_title}>Quyền lợi</span>
                    <pre className={s.job_body} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recruitmentInfo?.quyenLoi) }}></pre>
                </div>
                <div className={s.job_content}>
                    <span className={s.job_title}>Địa điểm làm việc</span>
                    <pre className={s.job_body} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recruitmentInfo?.diaDiemTuyenDung) }}></pre>
                </div>
                <div className={s.job_content}>
                    <span className={s.job_title}>Yêu cầu hồ sơ</span>
                    <pre className={s.job_body} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recruitmentInfo?.yeuCauHoSo) }}></pre>
                </div>
            </div>

            <div className={s.job_detail_content_2}>
                <span className={s.title}>Ứng viên nộp hồ sơ trực tuyến bằng cách bấm <strong>Ứng tuyển</strong> ngay dưới đây.</span>
                <div className={s.groupButton}>
                    {!isApply ?
                        <button className={s.button_blue} onClick={handleUngTuyenNgay}><span>Ứng tuyển ngay</span></button>
                        : <button className={s.button_blue}><span>Bạn đã ứng tuyển công việc này</span></button>
                    }
                    {!isSave ? <button className={s.button} onClick={handleLuuTin}>
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
                    </button> : <button className={s.button}>
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
                    </button>}

                </div>
            </div>

            <div className={s.job_detail_content_3}>
                <div className={s.img}>
                    <Image src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/icon-info.png"} alt={""} width={15} height={15} style={{ width: "15px", height: "auto" }}></Image>
                </div>
                <span className={s.text}>Báo cáo tin tuyển dụng: Nếu bạn thấy rằng tin tuyển dụng này không đúng hoặc có dấu hiệu lừa đảo, <a href="#">hãy phản ánh với chúng tôi.</a></span>
            </div>

            {/* <div className={s.job_detail_content_4}>
                <div className={s.title}>
                    <div className={s.chart}>
                        <div className={s.content}>Mức độ phù hợp với công việc</div>
                    </div>
                </div>

                {fitJobLevel ?
                    (
                        <div className={s.fitJobLevel}>
                            <div className={s.fitLeft}>
                                <ProgressLine percent={fitJobLevel?.vi_tri_cong_viec} title={"Vị trí công việc"} />
                                <ProgressLine percent={fitJobLevel?.ky_nang} title={"Kỹ năng"} />
                                <ProgressLine percent={fitJobLevel?.kinh_nghiem} title={"Kinh nghiệm"} />
                                <ProgressLine percent={fitJobLevel?.muc_luong} title={"Mức lương"} />
                                <ProgressLine percent={fitJobLevel?.yeu_to_khac} title={"Yếu tố khác"} />
                            </div>
                            <div className={s.fitRight}>
                                <div className={s.left}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="236" height="236" viewBox="0 0 236 236" fill="none">
                                        {groupCircleFirst}
                                        {groupCircleSecond}
                                        {groupCircleThird}
                                        {groupCircleFourth}
                                        {groupCircleFifth}
                                    </svg>
                                </div>
                                <div className={s.right}>
                                    <div className={s.item_note}>
                                        <div className={s.vtcv} style={{ background: "#FF9384" }}></div>
                                        <span className={s.textNote}>Vị trí công việc</span>
                                    </div>
                                    <div className={s.item_note}>
                                        <div className={s.vtcv} style={{ background: "#8CE3FF" }}></div>
                                        <span className={s.textNote}>Kỹ năng</span>
                                    </div>
                                    <div className={s.item_note}>
                                        <div className={s.vtcv} style={{ background: "#FFE588" }}></div>
                                        <span className={s.textNote}>Kinh nghiệm</span>
                                    </div>
                                    <div className={s.item_note}>
                                        <div className={s.vtcv} style={{ background: "#81FFA4" }}></div>
                                        <span className={s.textNote}>Mức lương</span>
                                    </div>
                                    <div className={s.item_note}>
                                        <div className={s.vtcv} style={{ background: "#FFBDE7" }}></div>
                                        <span className={s.textNote}>Yếu tố khác</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                    :
                    (
                        <span className={s.text}>
                            Bạn có phù hợp với công việc này?
                            <div>
                                <a href="#" onClick={() => setIsOpenSignIn(true)}>Đăng nhập</a> với tư cách ứng viên ngay để xem các phân tích từ WorkAI
                            </div>
                        </span>
                    )
                }

            </div> */}
            <SignInModal isOpenSignIn={isOpenSignIn} handleCancelSignIn={handleCancelSignIn} successType={0} idNew={0}/>
        </div >
    )
}

export default RecruitmentDetail;