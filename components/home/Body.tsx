/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Modal } from 'antd';

import $ from 'jquery';
// import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
// import { useEffect, useLayoutEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import 'select2';
import { POST } from '@/pages/api/base-api';
import { getCityName, job_array } from '@/functions/functions'
import Banner_top from "./Banner_top";
import Detail_com_onl from './Detail_com_onl';
import Job_listing from './Job_listing';
import News_box from './News_box';
import ViecLamLuongCao from './ViecLamLuongCao';

import Cookies from 'js-cookie';
import { checkLogin, cookieAuth } from '../service/functions';
import Link from 'next/link';
import { NTD_UV_Context } from '../context/ntd_uv_context';


const Body = ({ data }: any) => {
    const { name } = useContext(NTD_UV_Context);
    const [selectedAddress, setSelectedAddress] = useState<number>();
    const [viecLamHapDan, setViecLamHapDan] = useState<any>(null);
    const [viecLamLuongCao, setViecLamLuongCao] = useState<any>(null);
    const [selectedLuongCao, setSelectedLuongCao] = useState<number>();
    const [rdTinTucNoiBat, SetRdTinTucNoiBat] = useState<any>([]);
    const [pageTintuc, setPageTinTuc] = useState<number>(0)
    const nganhNgheNoiBat = data?.data?.nganhNgheNoiBat
    const tinTucNoiBat = data?.data?.tinTucNoiBat
    const router = useRouter()
    let totalPage = Array.isArray(tinTucNoiBat) ? Math.ceil(tinTucNoiBat.length / 4) - 1 : 1
    const [openModalCheckAuth, setOpenModalCheckAuth] = useState(false);

    useEffect(() => {
        const renderTinTuc = []
        let width = window.innerWidth
        // console.log(width)
        if (Array.isArray(tinTucNoiBat)) {
            if (width >= 1024 && width < 1365) {
                for (let i = pageTintuc * 3; i < pageTintuc * 3 + 3; i++) {
                    if (tinTucNoiBat[i]) {
                        renderTinTuc.push(tinTucNoiBat[i])
                    }
                }
                SetRdTinTucNoiBat(renderTinTuc)
            } else {
                for (let i = pageTintuc * 4; i < pageTintuc * 4 + 4; i++) {
                    if (tinTucNoiBat[i]) {
                        renderTinTuc.push(tinTucNoiBat[i])
                    }
                }
                SetRdTinTucNoiBat(renderTinTuc)
            }
        }
    }, [pageTintuc])


    // Luồng mới: sau khi UV đăng ký thì chưa cần xác thực ngay 
    // Thông báo và hỏi xem ứng viên có muốn xác thực luôn không 
    useLayoutEffect(() => {
        handleNoAuth()
        return () => { };
    }, [])
    const handleNoAuth = () => {
        const auth = Cookies.get(cookieAuth)
        const denyAuth = sessionStorage.getItem('denyAuth')
        // console.log(auth, denyAuth)
        if (auth && auth === '0') {
            if (!denyAuth) {
                // const check = confirm('Bạn chưa xác thực tài khoản.\nXác thực ngay?')
                setOpenModalCheckAuth(true)
                // if (check) {
                //     router.push('/ma-otp')
                // } else {
                //     sessionStorage.setItem('denyAuth', '1')
                // }
            }
        }
    }
    const denyAuth = () => {
        setOpenModalCheckAuth(false)
        sessionStorage.setItem('denyAuth', '1')
    }
    const acceptAuth = () => {
        setOpenModalCheckAuth(false)
        router.push('/ma-otp')
    }

    const handlePrevTinTuc = () => {
        setPageTinTuc((pre) => {
            if (pre - 1 < 0) {
                return totalPage
            } else {
                return pre - 1
            }
        });
    };

    const handleNextTinTuc = () => {
        setPageTinTuc((pre) => {
            if (pre + 1 > totalPage) {
                return 0
            } else {
                return pre + 1
            }
        });
    };

    const tags = [
        { label: 'Ngẫu nhiên' },
        { label: 'Hà Nội' },
        { label: 'Hồ Chí Minh' },
        { label: 'Miền Bắc' },
        { label: 'Miền Trung' },
        { label: 'Miền Nam' },
    ];

    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleTagClick = (index: number) => {
        setActiveIndex(index);
    };

    const handleNextClick = () => {
        setActiveIndex((prevIndex) => (prevIndex < tags.length - 1 ? prevIndex + 1 : prevIndex));
    };

    const handlePrevClick = () => {
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    const handleSearchFollowAdress = async (address: number) => {
        if (address !== 0) {
            // const data = await POST('new/searchViecLamHapDan', { address: address });
            const getCity = getCityName(address)
            const viecLamHapDanTheoCity = data?.data?.ViecLamHapDan?.filter((newhapDan: any) => newhapDan?.new_city == getCity)
            setViecLamHapDan({ ViecLamHapDan: viecLamHapDanTheoCity })
        } else {
            setViecLamHapDan(data?.ViecLamHapDan)
        }
    }

    const handleSearchLuongCao = async (address: number) => {
        if (address !== 0) {
            // const data = await POST('new/searchViecLamLuongCao', { address: address });
            const getCity = getCityName(address)
            const viecLamLuongCaoTheoCity = data?.data?.ViecLamThuongHieu?.filter((newLuongCao: any) => newLuongCao?.new_city == getCity)
            setViecLamLuongCao({ ViecLamThuongHieu: viecLamLuongCaoTheoCity })
        } else {
            setViecLamLuongCao(data?.ViecLamThuongHieu)
        }
    }

    const countNganhNgheNoiBat = (id: any) => {
        const count = nganhNgheNoiBat?.find((job: any) => Number(job._id) == id)?.count
        return count
    }

    useEffect(() => {
        if (typeof document != 'undefined') {
            $(document).ready(function () {
                $('.select-address').select2();
                $('.select-address').on('change', async (e: any) => {
                    console.log('>>> check e address: ', e);

                    setSelectedAddress(e.target.value)
                });

                $('.select-random').select2();
                $('.select-random').on('change', async (e: any) => {
                    console.log('>>> check e random: ', e);

                    setSelectedAddress(e.target.value)
                });

                $('.select-luongcao').select2();
                $('.select-luongcao').on('change', async (e: any) => {
                    console.log('>>> check e luongcao: ', e);

                    setSelectedLuongCao(e.target.value)
                });

                $('.select-random-salary').select2();
                $('.select-random-salary').on('change', async (e: any) => {
                    console.log('>>> check e random-salary: ', e);

                    setSelectedLuongCao(e.target.value)
                });


            });
        }
    }, []);

    useEffect(() => {
        if (selectedAddress !== undefined) {
            handleSearchFollowAdress(selectedAddress)
        }
    }, [selectedAddress])


    useEffect(() => {
        if (selectedLuongCao !== undefined) {
            handleSearchLuongCao(selectedLuongCao)
        }
    }, [selectedLuongCao])

    const [currentSlide, setCurrentSlide] = useState(0);
    const handlePrevClickSlider = () => {
        setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : 0));
    };
    const handleNextClickSlider = () => {
        setCurrentSlide((prevSlide) => (prevSlide < 4 ? prevSlide + 1 : 4));
    };


    //nganh nghe noi bat
    const nganhNgheHandle = (id: number) => {
        const path = `nameWork=${id}&page=1`
        return `/tin-tuyen-dung?${path}`
    }

    return (
        <>
            <link rel="stylesheet" href="styles/home.css" />
            <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
            <div className="container_Trangchu">
                <div className="wrapper">
                    <div className="wrapper_child">
                        <Banner_top />
                        <Job_listing data={viecLamHapDan ? viecLamHapDan : data?.data} changeChooseAuto={(e: number) => {
                            setSelectedAddress(e)
                        }} />
                        {/* <div className="box_wrap bg_fff">
                            <div className="wrapper_company pt-online">
                                <p className="com_onl"><span className="F8971C">NHÀ TUYỂN DỤNG</span><span> ONLINE</span></p>
                                <div className="box_list">
                                    <div className="show_com_onl show_left" onClick={handlePrevClickSlider} >
                                        <img src="/images/small-left1.svg" alt="Lùi" />
                                    </div>
                                    <Carousel selectedItem={currentSlide} showArrows={false} showThumbs={false} showStatus={false} showIndicators={false} >
                                        <div className="list_company ">
                                            <Detail_com_onl />
                                            <Detail_com_onl />
                                            <Detail_com_onl />
                                            <Detail_com_onl />
                                            <Detail_com_onl />
                                            <Detail_com_onl />
                                        </div>
                                        <div className="list_company ">
                                            <Detail_com_onl />
                                            <Detail_com_onl />
                                        </div>
                                        <div className="list_company ">
                                            <Detail_com_onl />
                                        </div>
                                        <div className="list_company ">
                                            <Detail_com_onl />
                                            <Detail_com_onl />
                                            <Detail_com_onl />
                                        </div>
                                        <div className="list_company ">
                                            <Detail_com_onl />
                                            <Detail_com_onl />
                                            <Detail_com_onl />
                                            <Detail_com_onl />
                                        </div>
                                    </Carousel>
                                    <div className="show_com_onl show_right" onClick={handleNextClickSlider}>
                                        <img src="/images/small-right.svg" alt="Tiến" />
                                    </div>
                                </div>
                                <div className="button_al">
                                    <button className="show_all_c">
                                        <span className="ffffff t_a">Tất cả</span>
                                        <img src="/images/tatca.svg" alt="Tất cả" />
                                    </button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="wrapper_child">
                        <div className="banner_taocv">
                            <div className="box_banner">
                                <div className="box_describe">
                                    <h2 className="text_cvonl ffffff font28_700">Tạo CV online hoặc sử dụng CV có sẵn để tìm việc làm</h2>
                                    <p className="ffffff font16_500 text_des_cv">Timviechay hiện có 3500+ mẫu CV chuyên nghiệp, độc đáo cùng 5 ngôn ngữ Anh, Việt, Hàn... phù hợp với mọi ngành nghề</p>
                                    <div className="dou_btn">
                                        <a href="/CV/trang-chu-cv" className="create_cvo">
                                            <span className="ffffff">Tạo CV online</span>
                                            <div className="img_cr_cv">
                                                <img src="/images/BG.svg" alt="Tạo cv" />
                                            </div>
                                        </a>
                                        <button className="upload_cvo">
                                            <Link style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }} href={`${name ? '/ung-vien/tai-len-ho-so' : '/dang-ky-ung-vien'}`}>
                                                <span className="ffffff">Upload CV ngay</span>
                                                <div className="img_upload">
                                                    <img src="/images/upload_cvo.svg" alt="Upload cv" />
                                                </div>
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                                <div className="img_cv">
                                    <img src="/images/cvo.png" alt="ảnh CV" />
                                    <div className="img_up">
                                        <img src="/images/up.png" alt="up" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ViecLamLuongCao data={viecLamLuongCao ? viecLamLuongCao : data?.data} changeChooseAuto={(e: number) => {
                            setSelectedLuongCao(e)
                        }} />
                    </div>
                    <div className="wrapper_child">
                        {/* <div className="banner_tiaset">
                            <div className="box_banner">
                                <div className="box_describe box_tiaset">
                                    <div className="title_ts">
                                        <h2 className="ffffff font40_800 tt_ts">HUY HIỆU TIA SÉT</h2>
                                        <p className="ffffff font16_400 ct_ts">Ghi nhận sự tương tác giữa ứng viên và nhà tuyển dụng thông quá tin tuyển dụng trong vòng 12 giờ.</p>
                                    </div>
                                    <div className="tindang_ts">
                                        <p className="sub_tt ffffff font16_500_216"><span className="font24 f_weight500 line_h32.4">3.256</span> tin đăng của NTD tương tác thường xuyên trong 12 giờ qua</p>
                                    </div>
                                    <div className="auto_update_ts">
                                        <p className="tt_update">TỰ ĐỘNG CẬP NHẬT SAU</p>
                                        <div className="time_auto_update">
                                            <div className="gio box_time">
                                                <div className="b_box_time">
                                                    <div className="d_boxtime chuc"><span className="bodem">0</span></div>
                                                    <div className="d_boxtime donvi"><span className="bodem">9</span></div>
                                                </div>
                                                <div className="sub_t">Giờ</div>
                                            </div>
                                            <div className="haicham">:</div>
                                            <div className="phut box_time">
                                                <div className="b_box_time">
                                                    <div className="d_boxtime chuc"><span className="bodem">1</span></div>
                                                    <div className="d_boxtime donvi"><span className="bodem">4</span></div>
                                                </div>
                                                <div className="sub_t">Phút</div>
                                            </div>
                                            <div className="haicham">:</div>
                                            <div className="giay box_time">
                                                <div className="b_box_time">
                                                    <div className="d_boxtime chuc"><span className="bodem">3</span></div>
                                                    <div className="d_boxtime donvi"><span className="bodem">8</span></div>
                                                </div>
                                                <div className="sub_t">Giây</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box_list_ts">
                                        <p className="ffffff">Danh sách tin đăng đạt Huy hiệu Tia sét</p>
                                        <button className="see_now">
                                            <span>XEM NGAY</span>
                                            <div className="img_did">
                                                <img src="/images/diden.svg" alt="Xem thêm" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className="img_cv_ts">
                                    <img src="/images/huyhieutiaset.svg" alt="Huy hiệu tia sét" />
                                </div>
                            </div>
                        </div> */}
                        <div className="box_wrap bg_fff">
                            <div className="wrapper_company pt60">
                                <p className="tt_job_outstanding"><span className="F8971C">NGÀNH NGHỀ</span><span> NỔI BẬT</span></p>
                                <div className="list_box_job_outstanding">
                                    <a href={nganhNgheHandle(9)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_hd img70">
                                                <img src="/images/sale.svg" alt="Kinh doanh" />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <p className="job_o">Kinh doanh</p>
                                            <p className="">{countNganhNgheNoiBat(9)} việc làm</p>
                                        </div>
                                    </a>
                                    <a href={nganhNgheHandle(13)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_IT img70">
                                                <img src="/images/ITphanmem.svg" alt="IT Phần Mềm" />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <p className="job_o">IT phần mềm</p>
                                            <p className="">{countNganhNgheNoiBat(13)} việc làm</p>
                                        </div>
                                    </a>
                                    <a href={nganhNgheHandle(2)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_HCVP">
                                                <img src="/images/hanhchinhvanphong.svg" alt="Hành chính văn phòng" />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <p className="job_o">Hành chính văn phòng</p>
                                            <p className="">{countNganhNgheNoiBat(2)} việc làm</p>
                                        </div>
                                    </a>
                                    <a href={nganhNgheHandle(14)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_mkt img70">
                                                <img src="/images/marketing.svg" alt="Marketing" />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <p className="job_o">Marketing</p>
                                            <p className="">{countNganhNgheNoiBat(14)} việc làm</p>
                                        </div>
                                    </a>
                                    <a href={nganhNgheHandle(33)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_bds img70">
                                                <img src="/images/bds.svg" alt="Bất động sản" />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <p className="job_o">Bất động sản</p>
                                            <p className="">{countNganhNgheNoiBat(33)} việc làm</p>
                                        </div>
                                    </a>
                                    <a href={nganhNgheHandle(27)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_ns img70">
                                                <img src="/images/nhansu.svg" alt="Nhân sự" />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <p className="job_o">Nhân sự</p>
                                            <p className="">{countNganhNgheNoiBat(27)} việc làm</p>
                                        </div>
                                    </a>
                                    <a href={nganhNgheHandle(66)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_bh">
                                                <img src="/images/baohiem.svg" alt="Bảo hiểm" />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <p className="job_o">Bảo hiểm</p>
                                            <p className="">{countNganhNgheNoiBat(66)} việc làm</p>
                                        </div>
                                    </a>
                                    <a href={nganhNgheHandle(10)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_banhang img70">
                                                <img src="/images/banhang.svg" alt="Bán hàng" />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <p className="job_o">Bán hàng</p>
                                            <p className="">{countNganhNgheNoiBat(10)} việc làm</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* <Job_listing /> */}
                    </div>
                    <div className="wrapper_child">
                        {/* <div className="wrapper_banner4">
                            <div className="box_banner">
                                <div className="img_phone box_img">
                                    <img src="/images/dienthoai.svg" alt="Điện thoại" />
                                </div>
                                <div className="ct_ungtuyen_vl">
                                    <p className="cr_cv">TẠO CV MIỄN PHÍ</p>
                                    <p className="apply_job">ỨNG TUYỂN VIỆC LÀM ƯNG Ý</p>
                                    <p className="sub_a">
                                        Trải nghiệm tạo CV, tìm việc, ứng tuyển việc làm
                                        <br />
                                        <span>nhanh chóng, chất lượng.</span>
                                    </p>
                                    <div className="list_box_qr">
                                        <div className="item_qr">
                                            <p className="t_qr">App CV</p>
                                            <div className="box_img img_appcv img_qr">
                                                <img src="/images/app_cv.svg" alt="App CV" />
                                            </div>
                                            <a href="#" className="download_app appcv">Tải Ngay</a>
                                        </div>
                                        <div className="item_qr">
                                            <p className="t_qr">App tìm việc</p>
                                            <div className="box_img img_apptv img_qr">
                                                <img src="/images/app_cv.svg" alt="App tìm việc" />
                                            </div>
                                            <a href="#" className="download_app apptv">Tải Ngay</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="box_wrap">
                            <div className="wrapper_company pt64">
                                <p className="job_hapdan"><span className="F8971C">TIN TỨC</span><span> TUYỂN DỤNG</span></p>
                                <div className="list_news">
                                    <div className="show_com_onl show_left"
                                        onClick={handlePrevTinTuc}
                                    >
                                        <img src="/images/small-left1.svg" alt="Lùi" />
                                    </div>
                                    <div className="many_news">
                                        {
                                            rdTinTucNoiBat?.map((item: any, i: number) => (
                                                <div key={i} >
                                                    <News_box info={item} />
                                                </div>
                                            ))
                                        }

                                    </div>
                                    <div className="show_com_onl show_right"
                                        onClick={handleNextTinTuc}
                                    >
                                        <img src="/images/small-right.svg" alt="Tiến" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Modal
                open={openModalCheckAuth}
                footer={
                    <div style={{ textAlign: 'center' }}>
                        <Button onClick={denyAuth}>
                            Để sau
                        </Button>
                        <Button type='primary' onClick={acceptAuth}>
                            Xác thực ngay
                        </Button>
                    </div>
                }
                closable={false}
                maskClosable={false}
                width={300}
            >
                <div style={{ textAlign: 'center' }}>
                    <div>Bạn chưa xác thực số điện thoại</div>
                    <div>Xác thực OTP ngay?</div>
                </div>
            </Modal>
        </ >
    )
}

export default Body
