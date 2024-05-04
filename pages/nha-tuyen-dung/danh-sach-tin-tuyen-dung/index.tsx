"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import Login from "@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/sign_in/index";

import { Radio, Popover, Select, Spin } from "antd";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

import {
  city_array,
  createLinkTilte,
  findCityFromLink,
  findJobFromLink,
  getAllCity,
  getDate,
  getDistrict,
  getDistrictName,
  getJob,
  getKeyTag,
  getMucLuong,
  getTokenServerSide,
  listHinhThucFilter,
  listHocVanFilter,
  listKinhNghiemFilter,
  listMucLuongFilter
} from "@/functions/functions";
import Search from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/search";
import TinTuyenDung from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/tin-tuyen-dung";
import NhaTuyenDungOnline from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/nha-tuyen-dung-online";
import MauCVXinViec from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/mau-CV-xin-viec";
import TuKhoaLienQuan from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/tu-khoa-lien-quan";
import HoTroTimViec from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/ho-tro-ung-vien-tim-viec";
import Blog from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/blog";
import ChiTietTinTuyenDung from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/chi-tiet-tin-tuyen-dung";
import BoxChat from "@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/box_chat";

import * as data from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/data.js";
import s from "./styles.module.scss";
import { POST, POST_SERVER } from "@/pages/api/base-api";
import { NextPageContext } from "next";
import Cookies from "js-cookie";

export const getServerSideProps = async (context: NextPageContext) => {
  // Slug = link ngành nghề tỉnh thành 
  const slug = context.query.slug
  // console.log(slug)
  // check slug có trùng với tag nào không 
  let job_index = -1
  if (slug && typeof slug === 'string') {
    // job_index = getJob().findIndex((item) => createLinkTilte(item.label).replace(/-+/g, '-') === slug)
    // console.log(getJob()[job_index]?.label)
    // console.log(getJob().map((item) => createLinkTilte(item.label).replace(/-+/g, '-')))
    const job_id = findJobFromLink(slug)
    if (job_id) {
      context.query.nameWork = `${job_id}`
    }
    const city_id = findCityFromLink(slug)
    if (city_id) {
      context.query.address = `${city_id}`
    }
  }
  delete context.query.slug
  // Hết slug
  const { query } = context;
  const token = getTokenServerSide(context)
  const data = await POST_SERVER(
    `${process.env.NEXT_PUBLIC_BASE_URL_API_NEW}/new/SearchNew`,
    { ga: 1, ...query }, token
  );
  return {
    props: {
      data
    }
  };
};

export default function DanhSachTinTuyenDung({ data }: any) {

  console.log('>>> check data danh sach tin tim kiem: ', data);


  const router = useRouter();
  const [listTin, setListTin] = useState<any>("");
  const [total, setTotal] = useState(0);
  const [totalHuyHieu, setTotalHuyHieu] = useState(0);
  const [listCity, setListCity] = useState<any>([
    { cit_id: 0, cit_name: "Toàn quốc" },
    ...city_array
  ]);
  const [nameCity, setNameCity] = useState<string>();
  const [listDistrict, setListDistrict] = useState(data?.listDistrict);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pathCurrent, setPathCurrent] = useState<any>("");
  const [listJob, setListJob] = useState([
    { value: 0, label: "Tất cả ngành nghề" },
    ...getJob()
  ]);
  const [isOpenLetter, setIsOpenLetter] = useState(false);
  const [workInfo, setWorkInfo] = useState(data?.data);
  const [totalPage, setTotalPage] = useState(Math.round(data?.total / 10));
  const [idNews, setIdNews] = useState<number>(0);
  const [newsDetail, setNewsDetail] = useState<any>({});
  const [companyInfo, setCompanyInfo] = useState(data?.companyInfo);
  const [keyTag, setKeyTag] = useState(getKeyTag());
  const [listCv, setListCv] = useState(data?.listCv);
  const [contentBlog, setContentBlog] = useState(data?.contentBlog);
  const [seeNow, setSeeNow] = useState(false);
  const [choice, setChoice] = useState("1");
  const [loading, setLoading] = useState(false);

  const [openModelLogin, setOpenModelLogin] = useState(false);
  // const [isSave, setIsSave] = useState(data?.checkLuuTin);

  // form
  const [keySearch, setKeySearch] = useState<any>("name");
  const [address, setAddress] = useState<any>("address");
  const [param, setParam] = useState<any>();

  const [idNew, setIdNew] = useState<number>(0)
  const [contentApply, setContentApply] = useState<string>('')

  const [actionType, setActionType] = useState<any>(0) // 1 - save | 2 - apply

  const [listSelect, setListSelect] = useState([
    { value: "1", label: "Liên quan" },
    { value: "2", label: "Ngày đăng" },
    { value: "3", label: "Cập nhật gần nhất" },
    { value: "4", label: "Lương cao đến thấp" }
  ]);

  const handleRadioChange = (value: any) => {
    if (value == 1) {
      setWorkInfo(data?.data);
    } else if (value == 2) {
      const dataFlowDate = data?.data.sort(
        (a: any, b: any) => b.new_create_time - a.new_create_time
      );
      setWorkInfo(dataFlowDate);
    } else if (value == 3) {
      const dataFlowDate = data?.data.sort(
        (a: any, b: any) => b.new_update_time - a.new_update_time
      );
      setWorkInfo(dataFlowDate);
    } else if (value == 4) {
      const dataFlowDate = data?.data.sort(
        (a: any, b: any) => b.new_money - a.new_money
      );
      setWorkInfo(dataFlowDate);
    }
    setChoice(value);
  };

  const convertCityName = (cityNumber: number) => {
    listCity.filter((city: any) => {
      if (city.cit_id == cityNumber) {
        setNameCity(city.cit_name);
      }
    });
  };

  const handleUngTuyenNgay = (id: number) => {
    setIdNew(id)
    setActionType(2)
    const token = Cookies.get('work247_token');
    const type = Cookies.get('work247_type') || 1;
    if (!token || type == 1) {
      setOpenModelLogin(true)
    } else {
      setIsOpenLetter(true);
    }
  };

  const handleGuiThuUngTuyen = async () => {
    const response = await POST('candidate/ApplyJob', { id: idNew, lt: contentApply })
    if (response.result) {
      alert('Ứng tuyển thành công.')
      setNewsDetail({ ...newsDetail, checkUngTuyen: true })
      setIsOpenLetter(false);
      setWorkInfo(workInfo.map((item: any, index: number) => {
        if (item?.new_id === idNew) {
          return { ...item, checkUngTuyen: true }
        } else {
          return item
        }
      }))
      // setIsApply(true)
    }

  };

  const handleCloseLetter = () => {
    setIsOpenLetter(false);
  };

  const handleChatNgay = () => {
    console.log("Chat ngay thành công");
  };

  const handleLuuTin = async (id: number) => {
    // const token = Cookies.get('work247_token');
    // const type = Cookies.get('work247_type') || 1;
    // setIdNew(id)
    // setActionType(1)
    // if (!token || type == 1) {
    //   setOpenModelLogin(true)
    // } else {
    // }
    // Không cần lưu tin trước đăng nhập 
    const response = await POST('candidate/SaveNew', { id_tin: id })
    if (response?.result) {
      setNewsDetail({ ...newsDetail, checkLuuTin: true })
      alert('Lưu tin thành công.')
      // setIsSave(true)
    } else {
      alert(response?.message)
    }
  };

  const handleTaoCv = () => {
    console.log("Tạo CV ngay");
  };

  const handleSeeNow = (status: any, id: number) => {
    setIdNews(id);
    setSeeNow(status);
  };

  const handleSearch = async (
    keyword: any,
    selectCity: any,
    selectDistrict: any,
    selectJob: any,
    selectExp: any,
    selectSalary: any,
    selectLevel: any,
    selectWorkForm: any
  ) => {
    setNewsDetail(undefined);
    setSeeNow(false)
    setIdNews(0)
    const data = {
      page: 1,
      pageSize: pageSize,
      hinhThuc: selectWorkForm,
      hocVan: selectLevel,
      kinhNghiem: selectExp,
      district: selectDistrict,
      mucLuong: selectSalary,
      diaDiem: selectCity,
      nganhNghe: selectJob,
      keywords: keyword
    };
    let fomati: any;
    let edu: any;
    let exp: any;
    let district: any;
    let salary: any;
    let address: any;
    let nameWork: any;
    let keywords: any;
    if (data?.hinhThuc) {
      fomati = data.hinhThuc ? "fomati=" + data.hinhThuc : "";
    }
    if (data?.hocVan) {
      edu = data.hocVan ? "edu=" + data.hocVan : "";
    }
    if (data?.kinhNghiem) {
      exp = data.kinhNghiem ? "exp=" + data.kinhNghiem : "";
    }
    if (data?.district) {
      district = data.district ? "district=" + data.district : "";
    }
    if (data?.mucLuong) {
      salary = data.mucLuong ? "salary=" + data.mucLuong : "";
    }
    if (data?.diaDiem) {
      address = data.diaDiem ? "address=" + data.diaDiem : "";
    }
    if (data?.nganhNghe) {
      nameWork = data.nganhNghe ? "nameWork=" + data.nganhNghe : "";
    }
    if (data?.keywords) {
      keywords = data.keywords ? "name=" + data.keywords : "";
    }
    const newPath: any = [
      keywords,
      fomati,
      edu,
      exp,
      salary,
      address,
      district,
      nameWork
    ];
    let path: any = "";
    let count = 0;
    await newPath.forEach((item: any, index: number) => {
      if (item) {
        let parts = item && item.split("=");
        if (parts[1] !== "0" && parts[1] !== "-1") {
          if (count < 1) {
            path = path + item;
          } else {
            path = path + "&" + item;
          }
          count++;
        }
      }
    });
    setPathCurrent(path);
    path = path + `${path ? "&" : ""}page=` + page;
    router.push(`/tin-tuyen-dung?${path}`);
  };

  const handleChangeCity = (city: number) => {
    if (city > 0) {
      setListDistrict(getDistrict(city));
    } else {
      setListDistrict([]);
    }
  };

  const handleChangePage = async (page: number) => {
    const newQuery: any = { ...router.query }
    newQuery.page = page
    router.push({ pathname: '/tin-tuyen-dung', query: newQuery })
  };

  const navigateToAbout = (route: any) => {
    router.push(route);
  };

  const listCityText = (listCity: any) => {
    const textCitys: any = []
    const listDisctrict: any = [];
    listCity.map((c: any) => {
      listDisctrict.push(getDistrict(c))
      city_array.map((city: any) => {
        if (city.cit_id == c) {
          if (textCitys.length == 0) {
            textCitys.push(city.cit_name)
          } else {
            let addSpace = ", " + city.cit_name
            textCitys.push(addSpace)
          }
        }

      })
    });
    return textCitys
  }

  const getDistrictText = (listDistrictNumber: any) => {
    const textDistricts: any = []
    const listDisctrict: any = [];
    listDistrictNumber.map((num: any) => {
      if (textDistricts.length == 0) {
        textDistricts.push(getDistrictName(Number(num)))
      } else {
        let addSpace = ", " + getDistrictName((Number(num)))
        textDistricts.push(addSpace)
      }
    })
    return textDistricts
  }

  useEffect(() => {
    if (idNews != undefined) {
      let item = workInfo?.find((item: any) => item.new_id === idNews);
      setNewsDetail(item || undefined);
    }
  }, [workInfo, idNews]);

  useEffect(() => {
    (async () => {
      document.cookie = "urlUt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      const urlParams = new URLSearchParams(window.location.search);
      const address = urlParams.get("address");
      const nameWorkUrl = urlParams.get("nameWork");
      setParam({
        nameWork: nameWorkUrl
      });
      convertCityName(Number(address));
      setWorkInfo(data?.data);
      setTotal(data?.total);
      setTotalPage(Math.round(data?.total / 10));
      // setTotalHuyHieu(0);
    })();
    handleRadioChange(choice)
  }, [data]);

  return (
    <>
      <Spin size="large" spinning={loading}>
        <Header />

        {/* <div className={s.position_chat}>
          <BoxChat />
        </div> */}

        {address && (
          <Search
            changeCity={handleChangeCity}
            keySearch={keySearch}
            address={address}
            onClickSearch={handleSearch}
            total={total}
            totalHuyHieu={totalHuyHieu}
            listCity={listCity}
            listDistrict={listDistrict}
            listJob={listJob}
            listExp={listKinhNghiemFilter}
            listSalary={listMucLuongFilter}
            listLevel={listHocVanFilter}
            listWorkForm={listHinhThucFilter}
            setLoading={setLoading}
          />
        )}

        <div className={s.body}>
          <div className={s.header}>
            <div>Tuyển Dụng, Tìm Việc Làm Tại {nameCity}</div>
          </div>

          <div className={s.router}>
            <div className={s.textBlue} onClick={() => navigateToAbout("/")}>
              Trang chủ
            </div>
            <div className={s.path}>
              <div>
                <span>›</span>
              </div>
            </div>
            <div
              className={s.text}
              onClick={() => navigateToAbout("/tin-tuyen-dung")}
            >
              Tuyển dụng, tìm việc làm tại {nameCity}
            </div>
          </div>

          <div className={s.box_news_1}>
            <div className={s.grid_item_2}>
              {/* <div className={s.grid_item_header}>
                <div className={s.title}>
                  <span>Hiển thị theo:</span>
                  <Radio.Group
                    value={choice}
                    onChange={(e: any) => handleRadioChange(e.target.value)}
                  >
                    {listSelect?.map((item: any, index: any) => {
                      return (
                        <Radio key={index} value={item?.value}>
                          {item?.label}
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
                <div className={s.title_1}>
                  <div className={s.selectNews}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M14.3196 19.07C14.3196 19.68 13.9195 20.48 13.4095 20.79L11.9996 21.7C10.6896 22.51 8.86957 21.6 8.86957 19.98V14.63C8.86957 13.92 8.46957 13.01 8.05957 12.51L4.21954 8.47C3.70954 7.96 3.30957 7.06001 3.30957 6.45001V4.13C3.30957 2.92 4.21959 2.01001 5.32959 2.01001H18.6696C19.7796 2.01001 20.6896 2.92 20.6896 4.03V6.25C20.6896 7.06 20.1796 8.07001 19.6796 8.57001"
                        stroke="#999999"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.0701 16.52C17.8374 16.52 19.2701 15.0873 19.2701 13.32C19.2701 11.5527 17.8374 10.12 16.0701 10.12C14.3028 10.12 12.8701 11.5527 12.8701 13.32C12.8701 15.0873 14.3028 16.52 16.0701 16.52Z"
                        stroke="#999999"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.8701 17.12L18.8701 16.12"
                        stroke="#999999"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <Select
                      style={{ width: "80%" }}
                      className={`select_list_news`}
                      value={choice}
                      onChange={handleRadioChange}
                      options={listSelect}
                      suffixIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M9.52982 10.0506C9.38918 10.1912 9.19845 10.2701 8.99957 10.2701C8.8007 10.2701 8.60997 10.1912 8.46932 10.0506L5.02982 6.61181C4.88837 6.47519 4.69892 6.39959 4.50227 6.4013C4.30562 6.40301 4.11752 6.48189 3.97846 6.62094C3.8394 6.76 3.76053 6.94811 3.75882 7.14476C3.75711 7.3414 3.8327 7.53086 3.96932 7.67231L7.40882 11.1088C7.83076 11.5306 8.40295 11.7676 8.99957 11.7676C9.59619 11.7676 10.1684 11.5306 10.5903 11.1088L14.0298 7.66931C14.1664 7.52786 14.242 7.3384 14.2403 7.14176C14.2386 6.94511 14.1597 6.757 14.0207 6.61794C13.8816 6.47889 13.6935 6.40001 13.4969 6.3983C13.3002 6.39659 13.1108 6.47219 12.9693 6.60881L9.52982 10.0506Z"
                            fill="#999999"
                          />
                        </svg>
                      }
                    />
                  </div>
                </div>
              </div> */}

              <div
                className={
                  seeNow
                    ? window.innerWidth < 920
                      ? s.grid_hide
                      : s.grid_show
                    : s.grid_hide
                }
              >
                {data?.total > 0 && (
                  <TinTuyenDung
                    pageSize={pageSize}
                    total={data?.total}
                    workInfo={workInfo}
                    totalPage={totalPage}
                    seeNow={seeNow}
                    newId={idNews}
                    handleChatNgay={handleChatNgay}
                    handleUngTuyenNgay={handleUngTuyenNgay}
                    handleSeeNow={handleSeeNow}
                    handleChangePage={handleChangePage}
                    newsDetail={newsDetail}
                  />
                )}

                <div className={s.grid_item_detail}>
                  {newsDetail && (
                    <ChiTietTinTuyenDung
                      newsDetail={newsDetail}
                      handleCloseSeeNow={handleSeeNow}
                      handleLuuTin={handleLuuTin}
                      handleChatNgay={handleChatNgay}
                      handleUngTuyenNgay={handleUngTuyenNgay}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className={seeNow == false ? s.grid_item_1 : s.displayNone}>
              {/* <NhaTuyenDungOnline
                handleChatNgay={handleChatNgay}
                companyInfo={companyInfo}
              /> */}
              {/* <MauCVXinViec listCv={listCv} seeNow={seeNow} /> */}
            </div>
          </div>

          <div>
            <TuKhoaLienQuan keyTag={keyTag} />
          </div>

          <div className={s.box_news_2}>
            {/* <div className={s.grid_item_1}>
              <HoTroTimViec handleTaoCv={handleTaoCv} />
            </div> */}
            <div className={s.grid_item_2} style={{
              transition: 'all 0.5s'
            }}>
              {/* <Blog contentBlog={contentBlog} /> */}
            </div>
          </div>
        </div>

        <div>
          <div className={isOpenLetter ? s.modal_mask : s.displayNone}></div>
          <div className={isOpenLetter ? s.modal_wrap : s.displayNone}>
            <div className={s.modal_rate}>
              <div className={s.modal_content}>
                <div className={s.title}>
                  <span>
                    Bạn có muốn viết thư giới thiệu cho nhà tuyển dụng không ?
                  </span>
                  <svg
                    onClick={handleCloseLetter}
                    style={{ zIndex: "1", cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <rect
                      width="1.43075"
                      height="29.3304"
                      rx="0.715376"
                      transform="matrix(0.715183 0.698937 -0.715183 0.698937 20.9766 0)"
                      fill="#474747"
                    />
                    <rect
                      width="1.43075"
                      height="29.3304"
                      rx="0.715376"
                      transform="matrix(-0.715183 0.698937 -0.715183 -0.698937 22 21)"
                      fill="#474747"
                    />
                  </svg>
                </div>
                <div className={s.letter_body}>
                  <span className={s.letter_body_title}>THƯ GIỚI THIỆU</span>
                  <textarea
                    name="content"
                    className={s.letter_body_content}
                    placeholder={data?.placeholderLetter}
                    onChange={(e) => setContentApply(e.target.value)}
                  ></textarea>
                </div>

                <div
                  style={{
                    width: "469px",
                    marginTop: "135px",
                    display: "flex",
                    justifyContent: "center"
                  }}
                  className={s.groupDiv}
                >
                  <div className={s.groupButton}>
                    <button
                      onClick={handleCloseLetter}
                      className={s.cancelButton}
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleGuiThuUngTuyen}
                      className={s.button_ung_tuyen}
                    >
                      Ứng tuyển
                    </button>
                  </div>
                </div>

                <div className={s.textThank}>Thanks for watching!</div>
                <Image
                  src={
                    "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/letter.png"
                  }
                  alt={""}
                  height={700}
                  width={700}
                  className={s.imageLetter}
                ></Image>
              </div>
            </div>
          </div>
        </div>

        {newsDetail && (
          <div>
            <div className={seeNow ? s.modal_mask_1 : s.displayNone}></div>
            <div className={seeNow ? s.modal_wrap_1 : s.displayNone}>
              <div className={s.modal_see_more}>
                <div className={s.groupHeader}>
                  <div className={s.header}>
                    <span>{newsDetail?.new_title}</span>
                    <svg
                      onClick={() => {
                        {
                          handleSeeNow(false, 0);
                        }
                      }}
                      style={{
                        // marginRight: "auto", 
                        cursor: "pointer"
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <rect width="32" height="32" rx="16" fill="#F0F0F0" />
                      <path
                        d="M20.5281 22.7103L16 18.1822L11.4719 22.7103C11.2317 22.9505 10.9059 23.0855 10.5663 23.0855C10.2266 23.0855 9.90084 22.9505 9.66066 22.7103C9.42047 22.4702 9.28554 22.1444 9.28554 21.8047C9.28553 21.4651 9.42047 21.1393 9.66066 20.8991L14.1888 16.371L9.66065 11.8429C9.42047 11.6027 9.28553 11.2769 9.28553 10.9373C9.28553 10.5976 9.42047 10.2718 9.66065 10.0317C9.90084 9.79147 10.2266 9.65653 10.5663 9.65653C10.9059 9.65653 11.2317 9.79147 11.4719 10.0317L16 14.5598L20.5281 10.0317C20.7683 9.79147 21.0941 9.65653 21.4337 9.65653C21.7734 9.65653 22.0992 9.79147 22.3393 10.0317C22.5795 10.2718 22.7145 10.5976 22.7145 10.9373C22.7145 11.2769 22.5795 11.6027 22.3393 11.8429L17.8112 16.371L22.3393 20.8991C22.5795 21.1393 22.7145 21.4651 22.7145 21.8047C22.7145 22.1444 22.5795 22.4702 22.3393 22.7103C22.0992 22.9505 21.7734 23.0855 21.4337 23.0855C21.0941 23.0855 20.7683 22.9505 20.5281 22.7103Z"
                        fill="#8B8B8B"
                      />
                    </svg>
                  </div>

                  <div className={s.info}>
                    <div className={s.item_info}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                      >
                        <path
                          d="M5.78125 9.98803C5.78125 10.848 6.44125 11.5414 7.26125 11.5414H8.93458C9.64792 11.5414 10.2279 10.9347 10.2279 10.188C10.2279 9.3747 9.87458 9.08803 9.34792 8.90137L6.66125 7.96803C6.13458 7.78137 5.78125 7.4947 5.78125 6.68137C5.78125 5.9347 6.36125 5.32803 7.07458 5.32803H8.74792C9.56792 5.32803 10.2279 6.02137 10.2279 6.88137"
                          stroke="#474747"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 4.43481V12.4348"
                          stroke="#474747"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.9987 15.1014C11.6806 15.1014 14.6654 12.1166 14.6654 8.43473C14.6654 4.75283 11.6806 1.76807 7.9987 1.76807C4.3168 1.76807 1.33203 4.75283 1.33203 8.43473C1.33203 12.1166 4.3168 15.1014 7.9987 15.1014Z"
                          stroke="#474747"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {getMucLuong(
                        newsDetail?.new_money_type,
                        newsDetail?.new_money_from,
                        newsDetail?.new_money_to,
                        newsDetail?.new_money
                      )}
                    </div>
                    <div className={s.item_info}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                      >
                        <path
                          d="M7.99992 9.38827C9.14867 9.38827 10.0799 8.45702 10.0799 7.30827C10.0799 6.15952 9.14867 5.22827 7.99992 5.22827C6.85117 5.22827 5.91992 6.15952 5.91992 7.30827C5.91992 8.45702 6.85117 9.38827 7.99992 9.38827Z"
                          stroke="#474747"
                        />
                        <path
                          d="M2.41379 6.09473C3.72712 0.321401 12.2805 0.328068 13.5871 6.1014C14.3538 9.48807 12.2471 12.3547 10.4005 14.1281C9.06046 15.4214 6.94046 15.4214 5.59379 14.1281C3.75379 12.3547 1.64712 9.4814 2.41379 6.09473Z"
                          stroke="#474747"
                        />
                      </svg>
                      {newsDetail?.new_city && listCityText(newsDetail?.new_city.split(',').map(Number))}
                    </div>
                    <div className={s.item_info}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                      >
                        <path
                          d="M14 9.16666C14 12.4804 11.3137 15.1667 8 15.1667C4.68629 15.1667 2 12.4804 2 9.16666C2 5.85295 4.68629 3.16666 8 3.16666C11.3137 3.16666 14 5.85295 14 9.16666Z"
                          stroke="#474747"
                        />
                        <path
                          d="M8 9.16667V6.5"
                          stroke="#474747"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.66675 1.83334H9.33341"
                          stroke="#474747"
                          strokeLinecap="round"
                        />
                      </svg>
                      {getDate(newsDetail?.new_update_time)}
                    </div>
                  </div>

                  <div className={s.group_button_info}>
                    <div className={s.group_button}>
                      {/* <button className={s.buttonChat} onClick={handleChatNgay}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M13.485 8.09251V11.0925C13.485 11.2875 13.4775 11.475 13.455 11.655C13.2825 13.68 12.09 14.685 9.8925 14.685H9.59251C9.40501 14.685 9.225 14.775 9.1125 14.925L8.21251 16.125C7.81501 16.6575 7.17 16.6575 6.7725 16.125L5.87249 14.925C5.77499 14.7975 5.5575 14.685 5.3925 14.685H5.09251C2.70001 14.685 1.5 14.0925 1.5 11.0925V8.09251C1.5 5.89501 2.51251 4.70251 4.53001 4.53001C4.71001 4.50751 4.89751 4.5 5.09251 4.5H9.8925C12.285 4.5 13.485 5.70001 13.485 8.09251Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.485 5.09251V8.09251C16.485 10.2975 15.4725 11.4825 13.455 11.655C13.4775 11.475 13.485 11.2875 13.485 11.0925V8.09251C13.485 5.70001 12.285 4.5 9.89252 4.5H5.09253C4.89753 4.5 4.71003 4.50751 4.53003 4.53001C4.70253 2.51251 5.89503 1.5 8.09253 1.5H12.8925C15.285 1.5 16.485 2.70001 16.485 5.09251Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.1216 9.9375H10.1284"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.49662 9.9375H7.50337"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.87162 9.9375H4.87837"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Chat ngay
                      </button> */}

                      {newsDetail?.checkUngTuyen ?
                        <button className={s.buttonBlue}>
                          Đã ứng tuyển
                        </button>
                        :
                        <button
                          className={s.buttonBlue}
                          onClick={() => handleUngTuyenNgay(newsDetail?.new_id)}
                        >
                          Ứng tuyển
                        </button>

                      }
                      {newsDetail?.checkLuuTin ?
                        <div className={s.buttonSave}>
                          Đã lưu
                        </div>
                        :
                        <button className={s.buttonSave} onClick={() => handleLuuTin(newsDetail?.new_id)}>
                          Lưu tin
                        </button>
                      }
                    </div>
                    <span
                      className={s.chi_tiet_tin}
                      onClick={() =>
                        navigateToAbout(
                          `${newsDetail?.new_alias}-${newsDetail?.new_id}.html`
                        )
                      }
                    >
                      Chi tiết tin đăng {`>`}
                    </span>
                  </div>
                </div>
                <div className={s.group_info_text}>
                  {newsDetail?.infoDetail?.map((item: any, index: any) => {
                    return (
                      <div key={index} className={s.item_info_text}>
                        <div className={s.title}>{item.title}</div>
                        <pre className={s.content}>{item.content}</pre>
                      </div>
                    );
                  })}
                  <div className={s.item_info_text}>
                    <div className={s.title}>Thông tin liên hệ</div>
                    <div className={s.content}>
                      Tên người liên hệ: {newsDetail?.usc_company}
                    </div>
                    <div className={s.content}>
                      Địa chỉ liên hệ: {newsDetail?.address}
                    </div>
                    <div className={s.content}>
                      Số điện thoại liên hệ:{" "}
                      {newsDetail?.usc_phone != ""
                        ? newsDetail?.usc_phone
                        : "Chưa cập nhật"}
                    </div>
                    <div className={s.content}>
                      Email liên hệ:{" "}
                      {newsDetail?.usc_mail && newsDetail?.usc_mail != ""
                        ? newsDetail?.usc_mail
                        : "Chưa cập nhật"}
                    </div>
                  </div>

                  <div className={s.item_info_text}>
                    <div className={s.title}>Địa điểm làm việc</div>
                    <div className={s.group_content} style={{ flexDirection: 'column' }}>
                      <div className={s.city}>
                        Tỉnh thành:
                        <div className={s.tag}>
                          {newsDetail?.new_city && listCityText(newsDetail?.new_city.split(',').map(Number))}
                        </div>
                      </div>
                      <div className={s.district}>
                        Quận huyện:
                        <div className={s.tag}>
                          {newsDetail?.new_qh_id && getDistrictText(newsDetail?.new_qh_id.split(',').map(Number))}
                        </div>
                      </div>
                    </div>
                    <div className={s.content_1}>
                      <div className={s.text_1}>Địa chỉ chi tiết: {newsDetail?.new_addr}</div>
                      {/* <div className={s.text_2}>
                        {newsDetail?.new_addr}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Login
          isOpenSignIn={openModelLogin}
          handleCancelSignIn={() => setOpenModelLogin(false)}
          successType={actionType}
          idNew={idNew}
        ></Login>

        <Footer />
      </Spin>
    </>
  );
}
