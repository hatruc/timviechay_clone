import { Anchor, Avatar, Button, Input, Pagination, Select, Space } from "antd";
import s from "./styles.module.scss";
import { EditFilled, SearchOutlined } from "@ant-design/icons";
import * as data from "@/components/CV/cv-theo-ngon-ngu/data"
import { useContext, useEffect, useRef, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BusinessAnalyst from "@/components/CV/cv-theo-ngon-ngu/busines-analyst";
import BaContent from "@/components/CV/cv-theo-ngon-ngu/ba-table";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { city_array, createLinkTilte, getAllCity, getTokenServerSide, job_array } from "@/functions/functions";
import { POST_SERVER } from "@/pages/api/base-api";
import Image from "next/image";
import Link from "next/link";
import dataJson from '../../../components/data.json'
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
import Cookies from "js-cookie";
import { cookieLogo, cookieName, cookiePhone } from "@/components/service/functions";

interface listCandidate {
  position?: string;
  avatar?: string;
  name?: string;
  adress?: string;
  time?: string;
  ex?: string;
  title?: string;
  id?: number;
}
interface listCandidateFlow {

  title?: string;
  content?: listCandidate[];
}

export const getServerSideProps = async (context: NextPageContext) => {
  const token = getTokenServerSide(context);
  const id = context.query.id;

  const data = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_NEW}/new/getDangTin`, { id: 121 }, token);
  if (data?.error == null) {
    return {
      props: {
        dataDangtin: data
      }
    }
  } else {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      }
    }
  }

}

const Dangtin: React.FC<{ dataDangtin: any }> = ({ dataDangtin }) => {

  console.log('>>> check data: ', dataDangtin);
  const router = useRouter();

  const [input, setInput] = useState("Nhập từ khóa")
  const [baContent, setBaContent] = useState(``);
  const [contentBA, setContentBA] = useState(``);


  const [listDistrict, setListDisTrict] = useState<{ value: any, label: any }[]>([{ value: 0, label: 'Toàn quốc' }, ...getAllCity()]);
  const [selectedDistric, setSelectedDistrict] = useState<string>('');
  const { name, setAll, setCandiAllowEmployerSearch, changePercent } = useContext(NTD_UV_Context)
  const [selectedValue, setSelectedValue] = useState("0");
  const [keyword, setKeyWord] = useState<string>('')
  const formRef = useRef<any>();
  const nameRef = useRef<any>();
  const allJobRef = useRef<any>();
  const allJobMobileRef = useRef<any>();
  const [historySearch, setHistorySearch] = useState<any>([]);

  const [ungVienTheoNganhNghe, setUngVienTheoNganhNghe] = useState(dataDangtin?.uvNganhNghe || [])

  const [limitPerPage, setLimitPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(Math.ceil(((dataDangtin?.data.length) / limitPerPage)))

  const [limitPerPageUVTheoNganhNghe, setLimitPerPageUVTheoNganhNghe] = useState(3)
  const [currentPageUVTheoNganhNghe, setCurrentPageUVTheoNganhNghe] = useState(1)

  useEffect(() => {
    setBaContent(data.BaContent)
    setContentBA(data.BusinesAnalyst)
  }, [])

  useEffect(() => {
    if (typeof document != 'undefined') {
      $(document).ready(function () {
        $('.select-location').select2();
        $('.select-location').on('change', async (e: any) => {
          setSelectedValue(e.target.value)
        });
      });
    }
  }, [])

  const data_g: listCandidate[] = [
    {
      id: 9,
      position: "Nhân viên kế toán tổng hợp",
      avatar: "/images/nha-tuyen-dung/dang-tin/image387.png",
      name: "Nguyen Thi Thuy Dung",
      adress: "Ba Ria- Vung Tau",
      time: " 2 phut truoc",
      ex: "Chua co kinh nghiem"
    },
    {
      id: 8,
      position: "Nhân viên kế toán tổng hợp",
      avatar: "/images/nha-tuyen-dung/dang-tin/image387.png",
      name: "Nguyen Thi Thuy Dung",
      adress: "Ba Ria- Vung Tau",
      time: " 2 phut truoc",
      ex: "Chua co kinh nghiem"
    },
    {
      id: 7,
      position: "Nhân viên kế toán tổng hợp",
      avatar: "/images/nha-tuyen-dung/dang-tin/image387.png",
      name: "Nguyen Thi Thuy Dung",
      adress: "Ba Ria- Vung Tau",
      time: " 2 phut truoc",
      ex: "Chua co kinh nghiem"
    },
    {
      id: 6,
      position: "Nhân viên kế toán tổng hợp",
      avatar: "/images/nha-tuyen-dung/dang-tin/image387.png",
      name: "Nguyen Thi Thuy Dung",
      adress: "Ba Ria- Vung Tau",
      time: " 2 phut truoc",
      ex: "Chua co kinh nghiem"
    },
  ]
  const data_f: listCandidateFlow[] = [
    {
      title: "KẾ TOÁN",
      content: data_g,
    },
    {
      title: "KINH DOANH",

      content: data_g,
    },
    {
      title: "BẢO HIỂM",

      content: data_g,
    },
    {
      title: "IT PHẦN MỀM",

      content: data_g,
    },
  ]

  const handleChangePage = (currentPage: number) => {
    setCurrentPage(currentPage)
    if (currentPage == totalPage) {
      const danh_sach_ung_vien = document.getElementById('danh_sach_ung_vien')
      danh_sach_ung_vien?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleChangePageUVTheoNganhNghe = (currentPage: number) => {
    setCurrentPageUVTheoNganhNghe(currentPage)
  }

  const handleChangeDistrict = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedDistrict(selectedValue);
  };

  const handleSearch = () => {
    console.log('historySearch.includes(keyword)', historySearch.includes(keyword));

    const jobCategoryId = job_array.find((job: any) => job.cat_name == keyword)?.cat_id

    if (!historySearch.includes(keyword)) {
      const newHistorySearch = [...historySearch, keyword]
      localStorage.setItem('history-search', JSON.stringify(newHistorySearch));
    }
    let query: any = {}
    if (jobCategoryId) {
      query.nameWork = jobCategoryId
    } else {
      keyword && typeof keyword === 'string' && keyword.trim() && (query.name = keyword.trim().replace(/\++/g, ' '))
    }

    selectedValue && Number(selectedValue) && Number(selectedValue) !== 0 && (query.address = selectedValue)

    router.push({
      pathname: '/tin-tuyen-dung',
      query: {
        ...query,
        page: 1
      }
    })
  }

  const handleEnterSearch = (e: any) => {
    if (e.keyCode == 13) {
      handleSearch()
    }
  }

  const listenFocus = () => {
    allJobRef?.current?.addEventListener('focus', function () {
      const getElementJobs = document.querySelector('.all_job');
      getElementJobs?.classList.add('all_job_show')
    })
  };

  const listenFocusMobile = () => {
    allJobMobileRef?.current?.addEventListener('focus', function () {
      const getElementJobs = document.querySelector('.all_job_mobile');
      getElementJobs?.classList.add('all_job_show')
    })
  }

  const closeAllJob = () => {
    const getElementJobs = document.querySelector('.all_job');
    getElementJobs?.classList.remove('all_job_show')
  };

  const closeAllJobMobile = () => {
    const getElementJobs = document.querySelector('.all_job_mobile');
    getElementJobs?.classList.remove('all_job_show')
  };

  const checkIsSetContext = () => {
    setAll(`${Cookies.get(cookieName)}`, `${Cookies.get(cookiePhone)}`, `${Cookies.get(cookieLogo)}`)
    // setCandiAllowEmployerSearch(result?.data?.data?.usc_search == 1 ? '1' : '0')
    // changePercent(`${result?.data?.data?.percentHoSo}`)
  }

  useEffect(() => {
    listenFocus()
    listenFocusMobile()
    const currentHistory = localStorage.getItem('history-search') ? JSON.parse(localStorage.getItem('history-search') as any) : [];
    setHistorySearch(currentHistory)
    if (!name) {
      checkIsSetContext()
    }
  }, [])

  return (
    <>
      <link rel="stylesheet" href="styles/home.css" />
      <Header />

      {/* <style>
        {
          `
            .selection {
              display: flex;
              width: 420px;
              padding: 10px;
              align-items: center;
              gap: 10px;
              flex-shrink: 0;
              border-radius: 4px;
              border: 1px solid #2878AA;
              background: #769FCB;
              color: white;
              height: 47px;
              width: 100%;
            }

            .select2-selection--single {
              width: 100% !important;
              border: none !important;
            }

            .select2-selection__rendered {
              width: 100% !important;
              background-color: #769FCB;
              color: #fff !important;
            }

            .select2-selection__arrow {
              top: 10px !important;
              right: 4px !important;
            }

            .select2-selection__arrow b {
              border-color: #fff transparent transparent transparent !important;
            }

            @media (min-width: 375px) {
              .selection2 {
                width: 342px;
              }
              .selection {
                width: 100%;
              }
            }

            @media (min-width: 768px) {
              .selection2 {
                width: 720px;
              }
              .selection {
                width: 100%;
              }
            }

            @media (min-width: 1024px) {
              .selection {
                width: 380px;
              }
            }
          `
        }
      </style> */}

      <div className={s.container_post_new}>
        <div className={s.first_map}>
          <div className={s.header_map}>
            {/* <div style={{ display: "flex", justifyContent: "center", marginBottom: '16px' }}>
              <div className={s.body_header}>
                <Input
                  className={s.input_search} placeholder={'Nhập từ khóa'}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)} />
                <select
                  name="select-district" className={`select-district ${s.input_search}`}
                  placeholder='hihi'
                  value={selectedDistric}
                  onChange={handleChangeDistrict}
                >
                  {listDistrict?.map((item: any, index: any) => (
                    <option key={index} value={item.value}>{item.label}</option>
                  ))}
                </select>
                <Button
                  size="large" type="primary" icon={<SearchOutlined />} className={s.search_btn}
                  onClick={handleSearch}
                  onKeyUp={handleEnterSearch}
                >
                  Tìm Kiếm
                </Button>
              </div>
            </div> */}
            <div
              className={`${s.form_search_job} form_search_job`}
              style={{ maxWidth: '100%', width: '100%', alignSelf: 'center', marginBottom: '16px' }}
            >
              <div>
                <div className="box_form">
                  <div className="wrapper_search" style={{ width: '100%' }}>
                    <div className="box_position" style={{ position: 'relative', width: '44%' }}>
                      <div className="img_box_form img_search">
                        <img src="/images/search.svg" alt="Tìm kiếm" />
                      </div>
                      <input
                        style={{ padding: '0 0 0 16px', width: '100%' }}
                        ref={allJobRef} type="text" name="name" className="search_pojob" placeholder="Vị trí ứng tuyển"
                        value={keyword} onChange={(e) => setKeyWord(e.target.value)}
                        onKeyUp={(e) => handleEnterSearch(e)}
                      />
                    </div>
                    <div className="all_job" style={{ width: '100%' }}>
                      <div className='all_job_filtered'>
                        <p>Tìm kiếm gần đây</p>
                        <ul style={{
                          width: '100%'
                        }} className='job-list job-list-history'>
                          {
                            historySearch.map((job: string) => (
                              <li onClick={() => setKeyWord(job)}>{job}</li>
                            ))
                          }
                        </ul>
                      </div>
                      <div className='job_have'>
                        <div className='job_have_title'>
                          <p>Từ khóa phổ biến</p>
                          <div onClick={() => closeAllJob()} className='job_have_close'>
                            ×
                          </div>
                        </div>
                        <ul className='job-list'>
                          {
                            job_array.map((job) => (
                              <li onClick={() => setKeyWord(job.cat_name)}>{job.cat_name}</li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                    <div className="box_position_addr" style={{ width: 'unset' }}>
                      <div className="img_box_form img_location">
                        <img src="/images/location.svg" alt="Địa chỉ" />
                      </div>
                      <select name="address" className="select-location" value={selectedValue}>
                        <option key={0} value={0}>Chọn địa điểm</option>
                        {dataJson?.city.map((item: any) => (
                          <option key={item.cit_id} value={item.cit_id}>{item.cit_name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button className="submit_job" onClick={handleSearch}>
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </div>

            <div className={s['banner-top-mobile']}>
              <div className={s.backgroud}></div>
              <div className={s['box-container']}>
                <div style={{
                  width: '100%',
                  gap: '10px !important',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}>

                  <div className={s.search_text}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.19444 13.6389C10.7536 13.6389 13.6389 10.7536 13.6389 7.19444C13.6389 3.63528 10.7536 0.75 7.19444 0.75C3.63528 0.75 0.75 3.63528 0.75 7.19444C0.75 10.7536 3.63528 13.6389 7.19444 13.6389Z" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15.2503 15.25L11.7461 11.7458" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                      ref={allJobMobileRef} placeholder='Vị trí ứng tuyển' type="text" name="name" className="search_pojob"
                      value={keyword} onChange={(e) => setKeyWord(e.target.value)}
                    />
                  </div>
                  <div className={`${s.all_job_filtered} all_job_mobile`}>
                    {/* <div className={s.job_have_title}>
                      <p>Tìm kiếm gần đây</p>
                      <div onClick={() => closeAllJobMobile()} className={s.job_have_close_mobile}>
                        ×
                      </div>
                    </div> */}
                    <ul className='job-list job-list-history'>
                      {
                        historySearch.map((job: string) => (
                          <li onClick={() => setKeyWord(job)}>{job}</li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className={s.search_select}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.99992 8.95334C9.14867 8.95334 10.0799 8.02209 10.0799 6.87334C10.0799 5.72458 9.14867 4.79333 7.99992 4.79333C6.85117 4.79333 5.91992 5.72458 5.91992 6.87334C5.91992 8.02209 6.85117 8.95334 7.99992 8.95334Z" stroke="#333333" strokeWidth="1.5" />
                      <path d="M2.41379 5.66004C3.72712 -0.113291 12.2805 -0.106624 13.5871 5.66671C14.3538 9.05338 12.2471 11.92 10.4005 13.6934C9.06046 14.9867 6.94046 14.9867 5.59379 13.6934C3.75379 11.92 1.64712 9.04671 2.41379 5.66004Z" stroke="#333333" strokeWidth="1.5" />
                    </svg>
                    <select name="address" className="select-location" value={selectedValue} onChange={(e: any) => {
                      console.log(e);
                    }}>
                      <option key={0} value={0}>Chọn địa điểm</option>
                      {dataJson?.city.map(item => (
                        <option key={item.cit_id} value={item.cit_id}>{item.cit_name}</option>
                      ))}
                    </select>
                    {/* <p>Text</p> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ display: 'none' }}>
                      <path d="M9.5308 10.0506C9.39015 10.1912 9.19942 10.2701 9.00055 10.2701C8.80168 10.2701 8.61095 10.1912 8.4703 10.0506L5.0308 6.61181C4.88935 6.47519 4.6999 6.39959 4.50325 6.4013C4.3066 6.40301 4.11849 6.48189 3.97944 6.62094C3.84038 6.76 3.7615 6.94811 3.75979 7.14476C3.75808 7.3414 3.83368 7.53086 3.9703 7.67231L7.4098 11.1088C7.83174 11.5306 8.40393 11.7676 9.00055 11.7676C9.59717 11.7676 10.1694 11.5306 10.5913 11.1088L14.0308 7.66931C14.1674 7.52786 14.243 7.3384 14.2413 7.14176C14.2396 6.94511 14.1607 6.757 14.0217 6.61794C13.8826 6.47889 13.6945 6.40001 13.4979 6.3983C13.3012 6.39659 13.1118 6.47219 12.9703 6.60881L9.5308 10.0506Z" fill="#999999" />
                    </svg>
                  </div>
                  <button className={s.button_search} onClick={handleSearch}>
                    <p>Tìm kiếm</p>
                  </button>
                </div>
              </div>
            </div>

            <div className={s.body}>
              <p className={s.fp}>Đăng Tin Tuyển Dụng Miễn Phí Hiệu Quả Tại Website Tuyển Dụng Uy Tín</p>
              <p className={s.sp}>+30.000 ứng viên tiềm năng</p>
              <Button className={s.post_btn} size="large" icon={<EditFilled />} onClick={() => { router.push('/dang-tin-mien-phi') }}>
                Đăng tin tuyển dụng miễn phí
              </Button>
            </div>
          </div>
        </div>
        <div className={s.second_map}>
          <div className={s.content_map}>
            <div className={s.fc_map}>
              <p className={s.text} id="danh_sach_ung_vien"> DANH SÁCH ỨNG VIÊN</p>
              <div className={s.f_item}>
                {
                  dataDangtin?.data.slice((limitPerPage * (currentPage - 1)), limitPerPage * currentPage).map((item: any, index: number) => {
                    return (
                      <div key={index}>
                        <Space>
                          <div className={s.body_candidate} key={index}>
                            <div>
                              <Image
                                src={item?.use_logo || '/images/candidate/ava_default.png'}
                                // size={70}
                                width={70}
                                height={70}
                                alt="Logo Ứng viên"
                                className={s.avatar}
                                style={{
                                  borderRadius: '50%',
                                  width: '70px',
                                  height: '70px'
                                }}
                                onError={(e) => {
                                  e.currentTarget.srcset = '/images/candidate/ava_default.png'
                                }}
                              />
                            </div>
                            <div style={{ width: '100%' }}>
                              <Link
                                href={`/chi-tiet-ung-vien/${createLinkTilte(item.use_name)}-${item.use_id}.html`}
                                className={s.line_p}
                                style={{ color: "#F88C00" }}
                              >
                                {item?.use_name || ''}
                              </Link>
                              <div className={s.line_p}>{item?.use_job_name || ''}</div>
                              <div className={s.line_div}>
                                <Space size={5} className={s.last_line} style={{ flex: 2 }}>
                                  <div >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                      <path d="M10.0004 11.1917C11.4363 11.1917 12.6004 10.0276 12.6004 8.5917C12.6004 7.15576 11.4363 5.9917 10.0004 5.9917C8.56445 5.9917 7.40039 7.15576 7.40039 8.5917C7.40039 10.0276 8.56445 11.1917 10.0004 11.1917Z" stroke="#474747" strokeWidth="1.5" />
                                      <path d="M3.01675 7.07508C4.65842 -0.141583 15.3501 -0.13325 16.9834 7.08342C17.9418 11.3167 15.3084 14.9001 13.0001 17.1168C11.3251 18.7334 8.67508 18.7334 6.99175 17.1168C4.69175 14.9001 2.05842 11.3084 3.01675 7.07508Z" stroke="#474747" strokeWidth="1.5" />
                                    </svg>
                                    &#160;
                                    {/* {city_array.find((city: any, index_city: number) => city.cit_id == item?.use_city)?.cit_name} */}
                                    {item?.use_city_job_name && Array.isArray(item.use_city_job_name) ? item.use_city_job_name.join(', ') : 'Chưa cập nhật'}
                                  </div>
                                </Space>
                                {/* <div style={{ flex: 2 }}>
                                  KN:&#160;<span style={{ color: "red" }}>{(item?.exp_years == (0 || null || undefined)) ? 'chưa có kinh nghiệm' : `${item?.exp_years} năm kinh nghiệm`}</span>
                                </div> */}
                                {/* <div style={{ display: "flex", gap: "7px", flex: 1, minWidth: '120px' }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <g>
                                      <path d="M10.6438 1.27375C10.4295 1.25793 10.2148 1.25001 10 1.25V0C10.2457 0.000119784 10.4913 0.00929268 10.7362 0.0275L10.6438 1.27375ZM13.1488 1.83625C12.7481 1.68163 12.3365 1.55671 11.9175 1.4625L12.1913 0.2425C12.67 0.35 13.1412 0.4925 13.5987 0.67L13.1488 1.83625ZM14.8612 2.72375C14.6825 2.60456 14.4995 2.49199 14.3125 2.38625L14.9288 1.29875C15.3561 1.54092 15.7651 1.81415 16.1525 2.11625L15.3837 3.1025C15.2143 2.97029 15.04 2.84437 14.8612 2.725V2.72375ZM17.1537 4.96125C16.9065 4.60997 16.6337 4.2774 16.3375 3.96625L17.2425 3.10375C17.58 3.46 17.8925 3.84125 18.1763 4.24125L17.1537 4.96125ZM18.0837 6.65125C18.0017 6.45307 17.9125 6.25794 17.8163 6.06625L18.9325 5.50375C19.1532 5.94261 19.3413 6.39718 19.495 6.86375L18.3075 7.255C18.2403 7.05108 18.1657 6.8497 18.0837 6.65125ZM18.7463 9.785C18.7361 9.35542 18.6944 8.92718 18.6213 8.50375L19.8525 8.29125C19.9362 8.77375 19.985 9.26375 19.9975 9.75375L18.7475 9.785H18.7463ZM18.5825 11.7075C18.6238 11.495 18.6575 11.2837 18.6837 11.07L19.925 11.2238C19.865 11.7114 19.7689 12.194 19.6375 12.6675L18.4325 12.3337C18.49 12.1275 18.54 11.9187 18.5825 11.7075ZM17.3925 14.6812C17.6225 14.3187 17.825 13.9388 18 13.5462L19.1425 14.0525C18.9425 14.5025 18.7112 14.935 18.4487 15.35L17.3925 14.6812ZM16.1875 16.1875C16.34 16.035 16.4863 15.8775 16.625 15.715L17.5725 16.5312C17.412 16.7173 17.2449 16.8974 17.0712 17.0712L16.1875 16.1875Z" fill="#474747" />
                                      <path d="M10 1.25C8.5611 1.2501 7.14443 1.60506 5.87547 2.28342C4.60651 2.96179 3.52443 3.94263 2.72507 5.13906C1.92571 6.3355 1.43374 7.7106 1.29274 9.14258C1.15174 10.5746 1.36606 12.0192 1.91672 13.3486C2.46738 14.6779 3.33738 15.851 4.44966 16.7638C5.56194 17.6766 6.88217 18.3011 8.29342 18.5818C9.70466 18.8626 11.1634 18.791 12.5403 18.3733C13.9173 17.9557 15.17 17.2049 16.1875 16.1875L17.0712 17.0712C15.9084 18.2347 14.4766 19.0934 12.9025 19.5712C11.3285 20.0491 9.66096 20.1313 8.04758 19.8106C6.4342 19.4899 4.92482 18.7762 3.65318 17.7328C2.38155 16.6893 1.38692 15.3483 0.757416 13.8286C0.127915 12.3089 -0.117019 10.6573 0.0443161 9.02034C0.205651 7.38332 0.768273 5.81138 1.68233 4.44377C2.59639 3.07617 3.83367 1.95514 5.28453 1.18C6.7354 0.404869 8.35505 -0.000435915 10 3.51823e-07V1.25Z" fill="#474747" />
                                      <path d="M9.375 3.75C9.54076 3.75 9.69973 3.81585 9.81694 3.93306C9.93415 4.05027 10 4.20924 10 4.375V10.8875L14.06 13.2075C14.1997 13.2918 14.301 13.4274 14.342 13.5854C14.3831 13.7433 14.3608 13.9111 14.2798 14.0527C14.1988 14.1944 14.0657 14.2989 13.9087 14.3437C13.7518 14.3885 13.5836 14.3701 13.44 14.2925L9.065 11.7925C8.96934 11.7379 8.88982 11.6589 8.83451 11.5636C8.77919 11.4684 8.75004 11.3602 8.75 11.25V4.375C8.75 4.20924 8.81585 4.05027 8.93306 3.93306C9.05027 3.81585 9.20924 3.75 9.375 3.75Z" fill="#474747" />
                                    </g>
                                  </svg>
                                  {'2 Phút Trước'}
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </Space>
                      </div>
                    )
                  })
                }
              </div>
              <Pagination
                className={s.pagi_first}
                onChange={(currentPage) => handleChangePage(currentPage)}
                defaultCurrent={1}
                total={dataDangtin?.data.length || 10}
                pageSize={10}
                showSizeChanger={false}
              />
            </div>
            <div className={s.sc_map}>
              <div style={{ display: "flex", gap: "2px" }} id="ung_vien_theo_nganh_nghe_tieu_bieu">
                <p className={s.text_second}>ỨNG VIÊN&#160;</p>
                <p className={s.text_third} >THEO NGÀNH NGHỀ TIÊU BIỂU</p>
              </div>
              <div className={s.box}>
                {
                  ungVienTheoNganhNghe.map((item: any, index: number) =>
                  (
                    <div key={item.title} className={s.body_candidate_second}>
                      <div className={s.title}>{job_array.find((job: any, index_job: number) => job.cat_id == item?.id_job)?.cat_name}</div>
                      <div className={s.content_wrapper}>

                        {
                          item?.data?.slice((limitPerPageUVTheoNganhNghe * (currentPageUVTheoNganhNghe - 1)), limitPerPageUVTheoNganhNghe * currentPageUVTheoNganhNghe)?.map((record: any, indexRecord: number) => {
                            return (
                              <div className={s.content} key={record.id}>
                                <Image
                                  src={record?.use_logo || '/images/candidate/ava_default.png'}
                                  // size={60}
                                  width={60}
                                  height={60}
                                  alt="Logo Ứng viên"
                                  className={s.avatar}
                                  style={{
                                    borderRadius: '50%',
                                    width: '60px',
                                    height: '60px'
                                  }}
                                  onError={(e) => {
                                    e.currentTarget.srcset = '/images/candidate/ava_default.png'
                                  }}
                                />
                                <div >
                                  <Link
                                    className={s.line_p} style={{ color: "#F88C00" }}
                                    href={`/chi-tiet-ung-vien/${createLinkTilte(record.use_name)}-${record.use_id}.html`}
                                  >
                                    {record?.use_name}
                                  </Link>
                                  <div className={s.line_p}>{record?.use_job_name || 'chưa cập nhật vị trí làm việc'}</div>
                                  <Space className={s.last_line}>
                                    <div >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10.0004 11.1917C11.4363 11.1917 12.6004 10.0276 12.6004 8.5917C12.6004 7.15576 11.4363 5.9917 10.0004 5.9917C8.56445 5.9917 7.40039 7.15576 7.40039 8.5917C7.40039 10.0276 8.56445 11.1917 10.0004 11.1917Z" stroke="#474747" strokeWidth="1.5" />
                                        <path d="M3.01675 7.07508C4.65842 -0.141583 15.3501 -0.13325 16.9834 7.08342C17.9418 11.3167 15.3084 14.9001 13.0001 17.1168C11.3251 18.7334 8.67508 18.7334 6.99175 17.1168C4.69175 14.9001 2.05842 11.3084 3.01675 7.07508Z" stroke="#474747" strokeWidth="1.5" />
                                      </svg>
                                      {/* {(city_array.find((city: any, index_city: number) => city.cit_id == record?.use_city))?.cit_name} */}
                                      {record?.use_city_job_name && Array.isArray(record.use_city_job_name) ? record.use_city_job_name.join(', ') : 'Chưa cập nhật'}
                                    </div>
                                    {/* <div>
                                      KN:&#160;
                                      <span style={{ color: "red" }}>
                                        {(record?.exp_years == (0 || null || undefined)) ? 'chưa có kinh nghiệm' : `${record?.exp_years} năm kinh nghiệm`}
                                      </span>
                                    </div> */}
                                  </Space>
                                  {/* <div className={s.last_online} style={{ display: "flex", alignItems: "center", fontFamily: "Roboto", gap: "7px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                      <g>
                                        <path d="M10.6438 1.27375C10.4295 1.25793 10.2148 1.25001 10 1.25V0C10.2457 0.000119784 10.4913 0.00929268 10.7362 0.0275L10.6438 1.27375ZM13.1488 1.83625C12.7481 1.68163 12.3365 1.55671 11.9175 1.4625L12.1913 0.2425C12.67 0.35 13.1412 0.4925 13.5987 0.67L13.1488 1.83625ZM14.8612 2.72375C14.6825 2.60456 14.4995 2.49199 14.3125 2.38625L14.9288 1.29875C15.3561 1.54092 15.7651 1.81415 16.1525 2.11625L15.3837 3.1025C15.2143 2.97029 15.04 2.84437 14.8612 2.725V2.72375ZM17.1537 4.96125C16.9065 4.60997 16.6337 4.2774 16.3375 3.96625L17.2425 3.10375C17.58 3.46 17.8925 3.84125 18.1763 4.24125L17.1537 4.96125ZM18.0837 6.65125C18.0017 6.45307 17.9125 6.25794 17.8163 6.06625L18.9325 5.50375C19.1532 5.94261 19.3413 6.39718 19.495 6.86375L18.3075 7.255C18.2403 7.05108 18.1657 6.8497 18.0837 6.65125ZM18.7463 9.785C18.7361 9.35542 18.6944 8.92718 18.6213 8.50375L19.8525 8.29125C19.9362 8.77375 19.985 9.26375 19.9975 9.75375L18.7475 9.785H18.7463ZM18.5825 11.7075C18.6238 11.495 18.6575 11.2837 18.6837 11.07L19.925 11.2238C19.865 11.7114 19.7689 12.194 19.6375 12.6675L18.4325 12.3337C18.49 12.1275 18.54 11.9187 18.5825 11.7075ZM17.3925 14.6812C17.6225 14.3187 17.825 13.9388 18 13.5462L19.1425 14.0525C18.9425 14.5025 18.7112 14.935 18.4487 15.35L17.3925 14.6812ZM16.1875 16.1875C16.34 16.035 16.4863 15.8775 16.625 15.715L17.5725 16.5312C17.412 16.7173 17.2449 16.8974 17.0712 17.0712L16.1875 16.1875Z" fill="#474747" />
                                        <path d="M10 1.25C8.5611 1.2501 7.14443 1.60506 5.87547 2.28342C4.60651 2.96179 3.52443 3.94263 2.72507 5.13906C1.92571 6.3355 1.43374 7.7106 1.29274 9.14258C1.15174 10.5746 1.36606 12.0192 1.91672 13.3486C2.46738 14.6779 3.33738 15.851 4.44966 16.7638C5.56194 17.6766 6.88217 18.3011 8.29342 18.5818C9.70466 18.8626 11.1634 18.791 12.5403 18.3733C13.9173 17.9557 15.17 17.2049 16.1875 16.1875L17.0712 17.0712C15.9084 18.2347 14.4766 19.0934 12.9025 19.5712C11.3285 20.0491 9.66096 20.1313 8.04758 19.8106C6.4342 19.4899 4.92482 18.7762 3.65318 17.7328C2.38155 16.6893 1.38692 15.3483 0.757416 13.8286C0.127915 12.3089 -0.117019 10.6573 0.0443161 9.02034C0.205651 7.38332 0.768273 5.81138 1.68233 4.44377C2.59639 3.07617 3.83367 1.95514 5.28453 1.18C6.7354 0.404869 8.35505 -0.000435915 10 3.51823e-07V1.25Z" fill="#474747" />
                                        <path d="M9.375 3.75C9.54076 3.75 9.69973 3.81585 9.81694 3.93306C9.93415 4.05027 10 4.20924 10 4.375V10.8875L14.06 13.2075C14.1997 13.2918 14.301 13.4274 14.342 13.5854C14.3831 13.7433 14.3608 13.9111 14.2798 14.0527C14.1988 14.1944 14.0657 14.2989 13.9087 14.3437C13.7518 14.3885 13.5836 14.3701 13.44 14.2925L9.065 11.7925C8.96934 11.7379 8.88982 11.6589 8.83451 11.5636C8.77919 11.4684 8.75004 11.3602 8.75 11.25V4.375C8.75 4.20924 8.81585 4.05027 8.93306 3.93306C9.05027 3.81585 9.20924 3.75 9.375 3.75Z" fill="#474747" />
                                      </g>
                                    </svg>
                                    {'2 Phút Trước'}
                                  </div> */}
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
              {/* <Pagination
                className={s.pagi_first}
                onChange={(currentPage) => handleChangePageUVTheoNganhNghe(currentPage)}
                defaultCurrent={1}
                total={Math.max(Math.max.apply(null, ungVienTheoNganhNghe?.map((item: any, index: number) => item?.total))) || 100}
                pageSize={limitPerPageUVTheoNganhNghe}
                showSizeChanger={false}
              /> */}
            </div>
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              {/* <div className={s.box_blog}>
                <div className={s.blog}><BusinessAnalyst contentBA={contentBA} /></div>
                <div className={s.table_blog}><BaContent BaContent={baContent} /></div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


export default Dangtin