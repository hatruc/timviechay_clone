/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

import MenuAccount from "../menu-account";
import MenuSidebar from "../menu-sidebar";

import s from "./style.module.css";
import Link from "next/link";
import {
  cookieLogo,
  cookieName,
  cookieType,
} from "@/components/service/functions";
import Cookies from "js-cookie";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
import { handleImageSource } from "@/functions/functions";

export default function Header() {
  const { name, ava } = useContext(NTD_UV_Context)
  const [checkLogin, setCheckLogin] = useState(false);
  const [menuHoverStates, setMenuHoverStates] = useState({
    cv: false,
    congCu: false,
  });

  const handleHover = (menu: any) => {
    setMenuHoverStates((prevMenuHoverStates) => ({
      ...prevMenuHoverStates,
      [menu]: true,
    }));
  };
  const handleLeave = (menu: any) => {
    setMenuHoverStates((prevMenuHoverStates) => ({
      ...prevMenuHoverStates,
      [menu]: false,
    }));
  };
  // Menu
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const [checkAccount, setCheckAccount] = useState(true);
  const [menuSidebar, setMenuSidebar] = useState(false);
  const toggleMenuSidebar = () => {
    setMenuSidebar(!menuSidebar);
  };
  useEffect(() => {
    setCheckLogin(getCookie("isLogin") === "true");
    setCheckAccount(getCookie(cookieType) === "2");
  }, []);
  return (
    <>
      <div className={s.container_header + " " + s.header_pc}>
        <div className={s.header_left}>
          <Link href="/" className={s.text_decoration}>
            <div className={s.div_logo}>
              <img
                src="/images/header/logo.jpg"
                className={s.image_logo}
                alt="Tìm việc làm nhanh, tuyển dụng 24h"
              />
            </div>
          </Link>

          <div className={s.list_category}>
            <div
              className={s.node_cate + " " + s.node_cv}
              onMouseEnter={() => handleHover("cv")}
              onMouseLeave={() => handleLeave("cv")}
            >
              <button
                className={s.button_all}
                style={{ fontFamily: "Roboto", fontSize: "16px" }}
              >
                CV & Hồ sơ
              </button>
              <div className={s.arrow}>
                <img
                  className={s.img_all}
                  src="/images/arrow_up.svg"
                  alt="xem thêm"
                />
              </div>
              {/* --menu con-- */}
              <div
                className={`${s.list_cate_detail} ${menuHoverStates.cv ? "" : s.none
                  }`}
              >
                {/* CV xin việc */}
                <a
                  href="/CV/trang-chu-cv"
                  className={s.text_decoration + " " + s.cate_detail}
                >
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/cv.svg"
                      alt="CV xin việc"
                    />
                  </div>
                  <span className={s.font15_500}>CV xin việc</span>
                </a>

                {/* CV theo ngành nghề */}
                {/* <a
                  href="/CV/cv-theo-nganh-nghe"
                  className={s.text_decoration + " " + s.cate_detail}
                >
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/cv_N.svg"
                      alt="CV theo ngành nghề"
                    />
                  </div>
                  <span className={s.font15_500}>CV theo ngành nghề</span>
                </a> */}

                {/* CV theo ngôn ngữ */}
                {/* <a
                  href="/CV/cv-theo-ngon-ngu"
                  className={s.text_decoration + " " + s.cate_detail}
                >
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/cv_L.svg"
                      alt="CV theo ngôn ngữ"
                    />
                  </div>
                  <span className={s.font15_500}>CV theo ngôn ngữ</span>
                </a> */}

                {/* Bí quyết viết CV */}
                {/* <a
                  href="#"
                  className={s.text_decoration + " " + s.cate_detail}
                >
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/biquyetvietcv.svg"
                      alt="Bí quyết viết CV"
                    />
                  </div>
                  <span className={s.font15_500}>Bí quyết viết CV</span>
                </a> */}

                {/* Đơn xin việc */}
                {/* <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/donxinviec.svg"
                      alt="Đơn xin việc"
                    />
                  </div>
                  <span className={s.font15_500}>Đơn xin việc</span>
                </a> */}

                {/* Thư xin việc */}
                {/* <a
                  href="/CV/thu-xin-viec"
                  className={s.text_decoration + " " + s.cate_detail}
                >
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/thuxinviec.svg"
                      alt="Thư xin việc"
                    />
                  </div>
                  <span className={s.font15_500}>Thư xin việc</span>
                </a> */}

                {/* Sơ yếu lí lịch */}
                {/* <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/soyeulylich.svg"
                      alt="Sơ yếu lý lịch"
                    />
                  </div>
                  <span className={s.font15_500}>Sơ yếu lý lịch</span>
                </a> */}
              </div>
            </div>
            <div
              className={s.node_cate}
              onMouseEnter={() => handleHover("congCu")}
              onMouseLeave={() => handleLeave("congCu")}
            >
              <button
                className={s.button_all}
                style={{ fontFamily: "Roboto", fontSize: "16px" }}
              >
                Công cụ
              </button>
              <div className={s.arrow}>
                <img
                  className={s.img_all}
                  src="/images/arrow_up.svg"
                  alt="xem thêm"
                />
              </div>
              {/* --menu con-- */}
              {/* <div
                className={`${s.list_cate_detail} ${menuHoverStates.congCu ? "" : s.none
                  }`}
              >
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Tìm việc làm thêm"
                    />
                  </div>
                  <span className={s.font15_500}>Tìm việc làm thêm</span>
                </a>
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Bảng giá"
                    />
                  </div>
                  <span className={s.font15_500}>Bảng giá</span>
                </a>
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Việc tìm người"
                    />
                  </div>
                  <span className={s.font15_500}>Việc tìm người</span>
                </a>
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Trang vàng"
                    />
                  </div>
                  <span className={s.font15_500}>Trang vàng</span>
                </a>
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Tra cứu lương"
                    />
                  </div>
                  <span className={s.font15_500}>Tra cứu lương</span>
                </a>
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Việc làm theo giờ"
                    />
                  </div>
                  <span className={s.font15_500}>Việc làm theo giờ</span>
                </a>
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Việc làm Freelancer"
                    />
                  </div>
                  <span className={s.font15_500}>Việc làm Freelancer</span>
                </a>
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Gia sư"
                    />
                  </div>
                  <span className={s.font15_500}>Gia sư</span>
                </a>
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Khóa học"
                    />
                  </div>
                  <span className={s.font15_500}>Khóa học</span>
                </a>
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Nhà trọ"
                    />
                  </div>
                  <span className={s.font15_500}>Nhà trọ</span>
                </a>
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Chấm công"
                    />
                  </div>
                  <span className={s.font15_500}>Chấm công</span>
                </a>
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Phần mềm quản lý nhà hàng cafe"
                    />
                  </div>
                  <span className={s.font15_500}>
                    Phần mềm quản lý nhà hàng cafe
                  </span>
                </a>
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Máy in hóa đơn"
                    />
                  </div>
                  <span className={s.font15_500}>Máy in hóa đơn</span>
                </a>
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Máy quét mã vạch"
                    />
                  </div>
                  <span className={s.font15_500}>Máy quét mã vạch</span>
                </a>
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Giúp việc"
                    />
                  </div>
                  <span className={s.font15_500}>Giúp việc</span>
                </a>
                <a href="#" className={s.text_decoration + " " + s.cate_detail}>
                  <div className={s.img_cate_detail}>
                    <img
                      className={s.img_all}
                      src="/images/Star.svg"
                      alt="Máy chấm công"
                    />
                  </div>
                  <span className={s.font15_500}>Máy chấm công</span>
                </a>
              </div> */}
            </div>
            <div className={s.node_cate}>
              <Link
                className={s.text_decoration}
                style={{ fontFamily: "Roboto", fontSize: "16px" }}
                href="/ung-vien-tim-viec"
              >
                Tìm ứng viên
              </Link>
            </div>
            <div className={s.node_cate}>
              <a
                className={s.text_decoration}
                href="/tin-tuyen-dung"
                style={{ fontFamily: "Roboto", fontSize: "16px" }}
              >
                Tin tuyển dụng
              </a>
            </div>
          </div>
        </div>
        {!checkLogin ? (
          <div className={s.header_right}>
            <div
              className={s.btn_service + " " + s.dangtin + " " + s.font16_500}
            >
              {/* <a className={s.text_decoration} style={{ fontFamily: "Roboto", fontSize: "16px" }} href="#">Đăng tin</a> */}
              <Link
                className={s.text_decoration}
                style={{ fontFamily: "Roboto", fontSize: "16px" }}
                href="/dang-tin"
              >
                Đăng tin
              </Link>
            </div>
            <div
              className={s.btn_service + " " + s.dangnhap + " " + s.font16_500}
              style={{ width: "102px" }}
            >
              {/* <a className={s.text_decoration} style={{ fontFamily: "Roboto", fontSize: "16px", width: "100%" }} href="/dang-nhap">Đăng nhập</a> */}
              <Link
                className={s.text_decoration}
                style={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  width: "100%",
                }}
                href="/dang-nhap"
              >
                Đăng nhập
              </Link>
            </div>
            <div
              className={s.btn_service + " " + s.dangky + " " + s.font16_500}
            >
              <div className={s.btn_dangky}>
                <div className={s.img_person}>
                  <img
                    className={s.img_all}
                    src="/images/person.svg"
                    alt="Đăng ký"
                  />
                </div>
                {/* <a className={s.text_decoration} style={{ fontFamily: "Roboto", fontSize: "16px" }} href="/dang-ky">Đăng ký</a> */}
                <Link
                  className={s.text_decoration}
                  style={{ fontFamily: "Roboto", fontSize: "16px" }}
                  href="/dang-ky"
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className={s.header_right}>
            {!checkAccount && <div
              className={s.btn_service + " " + s.dangtin + " " + s.font16_500}
            >
              <a
                style={{ fontFamily: "Roboto", fontSize: "16px" }}
                className={s.text_decoration}
                href="/nha-tuyen-dung/dang-tin-moi"
              >
                Đăng tin
              </a>
            </div>}
            {/* <a
              className={s.text_decoration + " " + s.btn_person + " " + s.chat}
              href="#"
            >
              <div className={s.img_p + " " + s.img_chat}>
                <img className={s.img_all} src="/images/chat.svg" alt="Chat" />
              </div>
            </a> */}
            <button
              className={
                s.button_all + " " + s.btn_person + " " + s.notification
              }
              style={{ cursor: "pointer" }}
            >
              <div className={s.img_p + " " + s.img_chuong}>
                <img
                  className={s.img_all}
                  src="/images/bell.svg"
                  alt="Thông báo"
                />
              </div>
            </button>
            <div style={{ position: "relative" }}>
              <button
                className={s.button_all + " " + s.btn_infomation}
                onClick={toggleModal}
                style={{ cursor: "pointer" }}
              >
                <div className={s.avata}>
                  <Image
                    width={30}
                    height={30}
                    className={s.img_all}
                    src={handleImageSource(ava)}
                    alt="avata"
                    onError={(e) => {
                      e.currentTarget.srcset = "/images/candidate/ava_default.png";
                    }}
                  />
                </div>
                <span className={s.name + " " + s.font16_500} style={{ whiteSpace: 'nowrap' }}>
                  {name}
                </span>
                <div className={s.xemthem}>
                  <img
                    className={s.img_all}
                    src="/images/them.svg"
                    alt="avata"
                  />
                </div>
              </button>
              {showModal && (
                <MenuAccount
                  checkAccount={checkAccount}
                  setCheckLogin={setCheckLogin}
                />
              )}
            </div>
          </div>
        )}
      </div>

      <div className={s.container_header + " " + s.header_mobile}>
        <div style={{ width: '40px' }}>
          <button
            className={s.button_all + " " + s.more_cate}
            onClick={toggleMenuSidebar}
            style={{ cursor: "pointer" }}
          >
            <div className={s.img_more_cate}>
              <img
                className={s.img_all}
                src="/images/menu.svg"
                alt="Xem thêm"
              />
            </div>
          </button>
          {menuSidebar && <MenuSidebar closeMenuSidebar={() => setMenuSidebar(false)}/>}
        </div>
        <Link href="/" className={s.text_decoration}>
          <div className={s.div_logo}>
            <Image
              src="/images/header/logo.jpg"
              width={125}
              height={46}
              className={s.image_logo}
              alt="Tìm việc làm nhanh, tuyển dụng 24h"
            />
          </div>
        </Link>
        <div style={{ width: '40px' }}></div>
        {checkLogin ? (
          <>
            {/* <a></a> */}
            {/* <a className={s.btn_person + " " + s.chat} href="#">
              <div className={s.img_p + " " + s.img_chat}>
                <img className={s.img_all} src="/images/chat.svg" alt="Chat" />
              </div>
            </a> */}
          </>
        ) : (
          // <a></a>
          <></>
        )}
      </div>
    </>
  );
}
