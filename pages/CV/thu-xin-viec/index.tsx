import style from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Footer from "@/components/common/Footer";
import Select, { components } from "react-select";
import Pagination_page from "@/components/quan-ly-chung-NTD/common/Pagination_page";
import Blog from "@/components/CV/blog";
import Header from "@/components/common/Header";

// danh sách option select
const searchOptions = [
  { value: "all", label: "Tất cả ngành nghề" },
  { value: "IT", label: "Công nghệ thông tin" },
  { value: "BA", label: "Business Analyst" },
  { value: "Tester", label: "Tester" },
];

const sortOptions = [
  { value: "new", label: "Mới nhất" },
  { value: "mostUsed", label: "Được dùng nhiều nhất" },
];
// style của thẻ Select
const searchStyles = {
  control: (provided: any) => ({
    ...provided,
    width: "242px",
    height: "48px",
    padding: "8px 20px",
    boxSizing: "border-box",
    borderRadius: "8px",
    border: "1px solid rgba(53, 130, 205, 0.50)",
    background: "#FFF",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.06)",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
  option: (provided: any) => ({
    ...provided,
    color: "#3852CD",
    textAlign: "justify",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "135%",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#3852cd",
    textAlign: "justify",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "135%",
  }),
};

const sortStyles = {
  control: (provided: any) => ({
    ...provided,
    width: "120px",
    height: "48px",
    padding: "8px 20px",
    boxSizing: "border-box",
    borderRadius: "8px",
    border: "1px solid rgba(53, 130, 205, 0.50)",
    background: "#FFF",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.06)",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
  option: (provided: any) => ({
    ...provided,
    color: "#3852CD",
    textAlign: "justify",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "135%",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#3852cd",
    textAlign: "justify",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "135%",
  }),
};

// data thư xin việc
const data_thu = [
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 01",
  },
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 02",
  },
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 03",
  },
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 04",
  },
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 05",
  },
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 06",
  },
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 07",
  },
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 08",
  },
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 09",
  },
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 10",
  },
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 11",
  },
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 12",
  },
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 13",
  },
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 14",
  },
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 15",
  },
  {
    src: "/images/cv/thu-xin-viec/mau_thu_xin_viec.svg",
    name: "Mẫu thư số 16",
  },
];

export default function ThuXinViec() {
  const [isNewChecked, setIsNewChecked] = useState(false);
  const [isMostUsedChecked, setIsMostUsedChecked] = useState(true);

  const handleClickNew = () => {
    if (!isNewChecked) {
      setIsNewChecked(true);
      setIsMostUsedChecked(false);
    }
  };

  const handleClickMostUsed = () => {
    if (!isMostUsedChecked) {
      setIsNewChecked(false);
      setIsMostUsedChecked(true);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const [modalActive, setModalActive] = useState(false);
  const [modalSrc, setModalSrc] = useState("");

  const openModal = (src: any) => {
    setModalSrc(src);
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  function MauThu({ src, name }: { src: any; name: any }) {
    return (
      <div className={style.item}>
        <div className={style.image_container}>
          <Image
            className={style.image}
            src={src}
            width={255}
            height={326}
            alt="mẫu ảnh thư xin việc"
            style={{ width: "255px", height: "326px" }}
          />
          <div className={style.button_container}>
            <button
              className={style.view_button}
              onClick={() => openModal(src)}
            >
              Xem trước
            </button>
            <button className={style.new_button}>Tạo đơn</button>
          </div>
        </div>
        <p>{name}</p>
      </div>
    );
  }

  return (
    <>
      <Header></Header>
      {/* <Image src='/images/cv/thu-xin-viec/icon_search_bar_add.svg' width={20} height={20} alt='' style={{ width: '20px', height: '20px' }} /> */}
      <div className={style.cover_letter}>
        <div className={style.title}>
          <p className={style.text} style={{ textTransform: "uppercase" }}>
            Tổng hợp danh sách mẫu thư xin việc online đẹp nhất 2023, miễn phí
          </p>
        </div>
        <div className={style.content_box}>
          <div className={style.navbar}>
            <Link href="/">Trang chủ</Link>
            <p>/</p>
            <Link href="#">Thư xin việc</Link>
          </div>
          <div className={style.search_bar}>
            <div className={style.search_input}>
              <select name="" id="" className="">
                <option value="all" className="">
                  Tất cả ngành nghề
                </option>
                <option value="IT" className="">
                  Công nghệ thông tin
                </option>
                <option value="BA" className="">
                  Business Analyst
                </option>
                <option value="Tester" className="">
                  Tester
                </option>
              </select>
            </div>
            <div className={style.sort_by_new} onClick={handleClickNew}>
              <Image
                src={
                  isNewChecked
                    ? "/images/cv/thu-xin-viec/round_checked.svg"
                    : "/images/cv/thu-xin-viec/round.svg"
                }
                width={26}
                height={26}
                style={{ width: "26px", height: "26px" }}
                alt=""
              />
              <p>Mới cập nhật</p>
            </div>
            <div
              className={style.sort_by_most_used}
              onClick={handleClickMostUsed}
            >
              <Image
                src={
                  isMostUsedChecked
                    ? "/images/cv/thu-xin-viec/round_checked.svg"
                    : "/images/cv/thu-xin-viec/round.svg"
                }
                width={26}
                height={26}
                style={{ width: "26px", height: "26px" }}
                alt=""
              />
              <p>Được dùng nhiều nhất</p>
            </div>
          </div>
          <div className={style.mini_search_bar}>
            <Select
              placeholder="Tìm mẫu CV"
              options={searchOptions}
              styles={searchStyles}
              isMulti={false}
              isSearchable={false}
              isDisabled={true}
            />
            <Select
              placeholder="Sắp xếp"
              options={sortOptions}
              styles={sortStyles}
              isMulti={false}
              isSearchable={false}
              isDisabled={true}
            />
          </div>
          <div className={style.search_content}>
            <div className={style.search_result}>
              {data_thu.map((data, index) => (
                <MauThu key={index} src={data.src} name={data.name} />
              ))}
            </div>
            <div className={style.search_pagination}>
              <Pagination_page />
            </div>
          </div>
          <Blog />
        </div>
      </div>
      {modalActive && (
        <div className={style.modal} onClick={closeModal}>
          <div
            className={style.modal_content}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span className={style.modal_close} onClick={closeModal}>
              &times;
            </span>
            <Image src={modalSrc} alt="" width={100} height={100} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
