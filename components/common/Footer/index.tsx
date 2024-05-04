'use client'
import { getFooterLink } from "@/functions/functions";
// import "/styles/footer.css";
import style from "./styles.module.scss";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { checkLogin } from "@/components/service/functions";
const hashtag = ["CV là gì,", "CV xin việc,", "Mẫu CV tiếng Việt,", "Mẫu CV tiếng Anh,", "Mẫu CV tiếng Hàn,", "Mẫu CV tiếng Nhật,", "Mẫu thư xin việc,", "Mẫu sơ yếu lý lịch,", "Mẫu CV IT,", "Hồ sơ xin việc,", "Mẫu đơn xin nghỉ việc,", "Câu hỏi phỏng vấn,", "Mẫu đơn xin thực tập,", "Đơn xin nghỉ phép,", "Việc làm PHP,", "Việc làm Kế toán nội bộ,", "Việc làm Digital Marketing,", "Việc làm Tư vấn bất động sản,", "Tuyển lập trình viên .Net,", "Tuyển lập trình viên PHP,", "Tuyển lập trình viên Java,", "Tuyển dụng nhân viên kinh doanh,", "Tìm việc kế toán"];



export default function Footer() {
    const [activeRow, setActiveRow] = useState<any>([]);
    const [isArrowFlipped, setIsArrowFlipped] = useState([]);

    function toggleModal(index: any) {
        const updatedActiveRows: any = [...activeRow];
        const updatedIsArrowFlipped: any = [...isArrowFlipped];

        if (updatedActiveRows.includes(index)) {
            const indexToRemove = updatedActiveRows.indexOf(index);
            updatedActiveRows.splice(indexToRemove, 1);
            updatedIsArrowFlipped[index] = false;
        } else {
            updatedActiveRows.push(index);
            updatedIsArrowFlipped[index] = true;
        }

        setActiveRow(updatedActiveRows);
        setIsArrowFlipped(updatedIsArrowFlipped);
    }
    function Modal({ content, modalItems, id, handleClick }: { content: any; modalItems: any; id: any; handleClick: any; }) {
        const isOpen = activeRow.includes(id);


        return (
            <div className={style[`row_${id}`]} style={{ marginBottom: "20px" }}>
                <div className={`${style[`${isArrowFlipped[id] && isOpen ? 'flipped' : ''}`]} ${style.row}`} onClick={handleClick}>
                    <p>{content}</p>
                    <Image loading="eager" src="/images/footer/arrow_down.svg" width={0} height={0} style={{ width: "20px,", height: "20px,", }} alt="" className={style.arrow} />
                </div>
                <div className={style.modal} style={{ display: isOpen ? 'flex' : 'none' }}>
                    {modalItems?.map((modalItem: any, index: any) => (
                        <a key={index} className={style.item}>{modalItem}</a>
                    ))}
                </div>
            </div>
        );
    }

    // const rows = [
    //     {
    //         content: 'Về Timviechay',
    //         modalItems: [
    //             'Giới thiệu',
    //             'Thông tin',
    //             'Hỏi đáp',
    //             'Cẩm nang',
    //             'Thỏa thuận',
    //             'Bảo mật',
    //             'Giải quyết tranh chấp',
    //             'Sơ đồ website',
    //             'Huy hiệu tia sét'
    //         ]
    //     },
    //     {
    //         content: 'Dành cho ứng viên',
    //         modalItems: [
    //             'Mẫu CV xin việc',
    //             'Thư xin việc',
    //             'Bí quyết viết CV'
    //         ]
    //     },
    //     {
    //         content: 'Việc làm theo khu vực',
    //         modalItems: [
    //             'Việc làm tại Hà Nội',
    //             'Việc làm tại Hồ Chí Minh',
    //             'Việc làm tại Hải Phòng',
    //             'Việc làm tại Đà Nẵng',
    //             'Việc làm tại Cần Thơ',
    //             'Việc làm tại Bình Dương',
    //             'Việc làm tại Đồng Nai',
    //             'Xem tất cả'
    //         ]
    //     },
    //     {
    //         content: 'Dành cho nhà tuyển dụng',
    //         modalItems: [
    //             'Đăng tuyển dụng',
    //             'Cẩm nang tuyển dụng',
    //             'Tìm hồ sơ'
    //         ]
    //     },
    //     {
    //         content: 'Việc làm theo ngành nghề',
    //         modalItems: [
    //             'Việc làm kinh doanh',
    //             'Việc làm bất động sản',
    //             'Việc làm bảo hiểm',
    //             'Việc làm IT',
    //             'Việc làm nhân sự',
    //             'Việc làm bán hàng',
    //             'Việc làm lương cao',
    //             'Xem tất cả'
    //         ]
    //     },
    //     {
    //         content: 'Việc làm theo tag',
    //         modalItems: [
    //             'Việc làm PHP',
    //             'Việc làm kế toán nội bộ',
    //             'Việc làm Digital Marketing',
    //             'Việc làm chuyên viên seo',
    //             'Việc làm bất động sản',
    //             'Việc làm thực tập sinh',
    //             'Việc làm nhân viên bảo hiểm',
    //             'Việc làm content',
    //             'Việc làm thiết kế',
    //             'Việc làm kinh doanh',
    //             'Việc làm lập trình viên java',
    //             'Việc làm editor',
    //             'Xem tất cả'
    //         ]
    //     },
    //     {
    //         content: 'Công cụ',
    //         modalItems: [
    //             'Tra cứu lương',
    //             'Trang vàng',
    //             'Việc làm theo giờ',
    //             'Việc làm Freelancer',
    //             'Gia sư',
    //             'Khóa học',
    //             'Nhà trọ',
    //             'Chấm công',
    //             'Quản lý nhà hàng cafe',
    //             'Máy in hóa đơn',
    //             'Máy quét mã vạch',
    //             'Giúp việc',
    //             'Máy chấm công'
    //         ]
    //     },
    //     // Add more rows and modalItems as needed
    // ];

    return (

        <>
            <div className={style.container_footer}>
                {/* <div className={style.hashtag}>
                    {hashtag.map((text, index) => {
                        return (
                            <p key={index}>{text}</p>
                        )
                    })}
                </div> */}
                <div className={style.contact_info}>
                    <div className={style.about_container}>
                        <div className={style.column} style={{ width: "20%" }}>
                            <div className={style.title}>Về Timviechay</div>
                            {/* <a href="/about-us" className="">Giới thiệu</a> */}
                            <Link href="/about-us">Giới thiệu</Link>
                            {/* <Link href="#" className="">Thông tin</Link>
                            <Link href="#" className="">Hỏi đáp</Link>
                            <Link href="#" className="">Cẩm nang</Link>
                            <Link href="#" className="">Thỏa thuận</Link>
                            <Link href="#" className="">Bảo mật</Link>
                            <Link href="#" className="">Giải quyết tranh chấp</Link>
                            <Link href="#" className="">Sơ đồ Website</Link>
                            <Link href="#" className="">Huy hiệu tia sét</Link> */}
                        </div>
                        {/* <div className={`${style.column} ${style.merge_columns}`} style={{ width: "23%" }}>
                            <div className={style.merge_column}>
                                <div className={style.title}>Dành cho ứng viên</div>
                                <Link href="/CV/trang-chu-cv" className="">Mẫu CV xin việc</Link> */}
                        {/* <Link href="/ung-vien/thu-xin-viec" className="">Thư xin việc</Link> */}
                        {/* <a href="#" className="">Bí quyết viết CV</a> */}
                        {/* </div>
                            <div className={style.merge_column}>
                                <div className={style.title}>Việc làm theo khu vực</div>
                                <a href="#" className="">Việc làm tại Hà Nội</a>
                                <a href="#" className="">Việc làm tại Hồ Chí Minh</a>
                                <a href="#" className="">Việc làm tại Hải Phòng</a>
                                <a href="#" className="">Việc làm tại Đà Nẵng</a>
                                <a href="#" className="">Việc làm tại Cần Thơ</a>
                                <a href="#" className="">Việc làm tại Bình Dương</a>
                                <a href="#" className="">Việc làm tại Đồng Nai</a>
                                <a href="#" className="" style={{ fontStyle: "italic" }}>Xem tất cả &raquo;</a>
                            </div>
                        </div> */}
                        <div className={style.column} style={{ width: "20%" }}>
                            <div className={style.title}>Dành cho ứng viên</div>
                            <Link href="/CV/trang-chu-cv" className="">Mẫu CV xin việc</Link>
                            {/* <Link href="/ung-vien/thu-xin-viec" className="">Thư xin việc</Link> */}
                            {/* <a href="#" className="">Bí quyết viết CV</a> */}
                        </div>
                        <div className={style.column} style={{ width: "20%" }}>
                            <div className={style.title}>Dành cho nhà tuyển dụng</div>
                            <Link href={checkLogin(1) ? "/nha-tuyen-dung/dang-tin-moi" : "/dang-tin"} className="">Đăng tuyển dụng</Link>
                            {/* <a href="#" className="">Cẩm nang tuyển dụng</a> */}
                            <Link href="/ung-vien-tim-viec" className="">Tìm hồ sơ</Link>
                        </div>
                        {/* <div className={style.column} style={{ width: "20%" }}>
                            <div className={style.title}>Việc làm theo khu vực</div>
                            <a href="#" className="">Việc làm tại Hà Nội</a>
                            <a href="#" className="">Việc làm tại Hồ Chí Minh</a>
                            <a href="#" className="">Việc làm tại Hải Phòng</a>
                            <a href="#" className="">Việc làm tại Đà Nẵng</a>
                            <a href="#" className="">Việc làm tại Cần Thơ</a>
                            <a href="#" className="">Việc làm tại Bình Dương</a>
                            <a href="#" className="">Việc làm tại Đồng Nai</a>
                            <a href="#" className="" style={{ fontStyle: "italic" }}>Xem tất cả &raquo;</a>
                        </div>

                        <div className={style.column} style={{ width: "20%" }}>
                            <div className={style.title}>Việc làm theo ngành nghề</div>
                            <a href="#" className="">Việc làm kinh doanh</a>
                            <a href="#" className="">Việc làm bất động sản</a>
                            <a href="#" className="">Việc làm bảo hiểm</a>
                            <a href="#" className="">Việc làm IT</a>
                            <a href="#" className="">Việc làm bán hàng</a>
                            <a href="#" className="">Việc làm nhân sự</a>
                            <a href="#" className="">Việc làm lương cao</a>
                            <a href="#" className="" style={{ fontStyle: "italic" }}>Xem tất cả &raquo;</a>
                        </div> */}
                        {getFooterLink().map((group) => (
                            <div className={style.column} style={{ width: "20%" }}>
                                <div className={style.title}>{group.title}</div>
                                {group.tags.map(item => (
                                    <Link
                                        href={item.link}
                                    >{item.label}</Link>
                                ))}
                                <Link href="/tin-tuyen-dung" className="" style={{ fontStyle: "italic" }}>Xem tất cả &raquo;</Link>
                            </div>
                        ))}
                        {/* <div className={`${style.column} ${style.merge_columns}`} style={{ width: "24%" }}>
                            <div className={style.merge_column}>
                                <div className={style.title}>Dành cho nhà tuyển dụng</div>
                                <a href="/nha-tuyen-dung/dang-tin-moi" className="">Đăng tuyển dụng</a>
                                <a href="#" className="">Cẩm nang tuyển dụng</a>
                                <a href="#" className="">Tìm hồ sơ</a>
                            </div>
                            <div className={style.column}>
                                <div className={style.title}>Việc làm theo ngành nghề</div>
                                <a href="#" className="">Việc làm kinh doanh</a>
                                <a href="#" className="">Việc làm bất động sản</a>
                                <a href="#" className="">Việc làm bảo hiểm</a>
                                <a href="#" className="">Việc làm IT</a>
                                <a href="#" className="">Việc làm bán hàng</a>
                                <a href="#" className="">Việc làm nhân sự</a>
                                <a href="#" className="">Việc làm lương cao</a>
                                <a href="#" className="" style={{ fontStyle: "italic" }}>Xem tất cả &raquo;</a>
                            </div>
                        </div> */}
                        {/* <div className={style.column} style={{ width: "23%" }}>
                            <div className={style.title}>Việc làm theo tag</div>
                            <a href="#" className="">Việc làm PHP</a>
                            <a href="#" className="">Việc làm kế toán nội bộ</a>
                            <a href="#" className="">Việc làm Digital Marketing</a>
                            <a href="#" className="">Việc làm chuyên viên seo</a>
                            <a href="#" className="">Việc làm bất động sản</a>
                            <a href="#" className="">Việc làm thực tập sinh</a>
                            <a href="#" className="">Việc làm nhân viên bảo hiểm</a>
                            <a href="#" className="">Việc làm content</a>
                            <a href="#" className="">Việc làm thiết kế</a>
                            <a href="#" className="">Việc làm kinh doanh</a>
                            <a href="#" className="">Việc làm lập trình viên Java</a>
                            <a href="#" className="">Việc làm editor</a>
                            <a href="#" className="" style={{ fontStyle: "italic" }}>Xem tất cả &raquo;</a>
                        </div> */}
                        {/* <div className={style.column} style={{ width: "15%" }}>
                            <div className={style.title}>Công cụ</div>
                            <a href="#" className="">Tra cứu lương</a>
                            <a href="#" className="">Trang vàng</a>
                            <a href="#" className="">Việc làm theo giờ</a>
                            <a href="#" className="">Việc làm Freelancer</a>
                            <a href="#" className="">Gia sư</a>
                            <a href="#" className="">Khóa học</a>
                            <a href="#" className="">Nhà trọ</a>
                            <a href="#" className="">Chấm công</a>
                            <a href="#" className="">Quản lý nhà hàng cafe</a>
                            <a href="#" className="">Máy in hóa đơn</a>
                            <a href="#" className="">Máy quét mã vạch</a>
                            <a href="#" className="">Giúp việc</a>
                            <a href="#" className="">Máy chấm công</a>
                        </div> */}
                    </div>
                    {/* <div className={style.mini_about_container}>
                        {rows.map((row, index) => (
                            <Modal
                                key={index}
                                content={row.content}
                                modalItems={row.modalItems}
                                id={index + 1}
                                handleClick={() => toggleModal(index + 1)}
                            ></Modal>
                        ))}

                    </div> */}
                    <div className={style.logo_container}>
                        <Link href={"/"}>
                            <div className={style.logo}>
                                {/* <img src="/images/footer/Joblike-logo.png" alt="" className="" /> */}
                                <Image loading="eager" src="/images/footer/logo_timviechay.svg" alt="Logo Timviechay.vn" width={347} height={113} style={{ width: "347px,", height: "113px" }} />
                                <p>Tìm việc nhanh - Tuyển dụng hiệu quả</p>
                            </div>
                        </Link>
                        {/* <div className={style.stamp}>
                            <Image loading="eager" src="/images/footer/stamp_1.svg" alt="Stamp 1" width={132} height={49} style={{ width: "132px", height: "49px" }} />
                            <Image loading="eager" src="/images/footer/stamp_2.svg" alt="Stamp 2" width={137} height={49} style={{ width: "auto", height: "auto", paddingBottom: "10px", marginLeft: "10px" }} />
                        </div> */}
                    </div>
                    <div className={style.contact}>
                        <div className={style.left}>
                            <div className={style.com_name} style={{ textTransform: "uppercase" }}>Công ty TNHH MTV JOB 365</div>
                            <div className={style.email}>
                                <Image loading="eager" src="/images/footer/envelope-solid.svg" alt="Icon email" width={15} height={15} style={{ width: "15px,", height: "15px,", marginTop: "2px,", marginRight: "6px" }} />
                                <p>Email: timviechay.vn@gmail.com</p>
                            </div>
                            <div className={style.hotline}>
                                <Image loading="eager" src="/images/footer/phone-volume-solid.svg" alt="Icon phone" width={15} height={15} style={{ width: "15px,", height: "15px,", marginTop: "2px,", marginRight: "6px" }} />
                                <p>Hotline: 0963.695.689</p>
                            </div>
                            <div className={style.address}>
                                <Image loading="eager" src="/images/footer/location-dot-solid.svg" alt="Icon address" width={15} height={15} style={{ width: "15px,", height: "15px,", marginTop: "2px,", marginRight: "6px" }} />
                                <p>Địa chỉ: Tổ 10, Phường Mỏ Chè, Thành phố Sông Công, Tỉnh Thái Nguyên</p>
                            </div>
                        </div>
                        <div className={style.right}>
                            {/* <div className={style.social_title}>Kết nối với Timviechay.vn</div>
                            <div className={style.social_icon}>
                                <div className={style.timviec}>
                                    <Image loading="eager" src="/images/footer/timviec.svg" alt="timviec365" width={40} height={40} style={{ width: "40px,", height: "40px" }} />
                                </div>
                                <div className={style.facebook}>
                                    <Image loading="eager" src="/images/footer/facebook.svg" alt="facebook" width={40} height={40} style={{ width: "40px,", height: "40px" }} />
                                </div>
                                <div className={style.twitter}>
                                    <Image loading="eager" src="/images/footer/twitter.svg" alt="twitter" width={40} height={40} style={{ width: "40px,", height: "40px" }} />
                                </div>
                                <div className={style.youtube}>
                                    <Image loading="eager" src="/images/footer/youtube.svg" alt="youtube" width={40} height={40} style={{ width: "40px,", height: "40px" }} />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                {/* Chưa chắc đã đúng */}
                {/* <div className={style.tax_code} style={{ textAlign: "center" }}>
                    <p>Mã số thuế: 0109218540 do Sở kế hoạch và đầu tư thành phố Hà Nội cấp ngày 10/06/2020. All Rights Reversed.</p>
                </div> */}
            </div>
        </>

    );
}
