import Header from "@/components/common/Header";
import s from "./styles.module.scss";
import Image from "next/image";
import Footer from "@/components/common/Footer";
import { Button, Radio, RadioChangeEvent, Select, Space } from "antd";
import { useEffect, useState } from "react";
import Pagination_page from "@/components/quan-ly-chung-UV/common/Pagination_page";
import BusinessAnalyst from "@/components/CV/trang-chu-cv/busines-analyst";
import BaContent from "@/components/CV/trang-chu-cv/ba-table";
import * as data from "@/components/CV/trang-chu-cv/data";
import ModalCv from "./modal-cv";
import { useRouter } from "next/router";
import { POST, POST_SERVER } from "@/pages/api/base-api";
import { NextPage, NextPageContext } from "next";
import { createLinkTilte, createLinkTilte2, handleImageSource } from "@/functions/functions";
import XemTruocFull from "@/components/CV/trang-chu-cv/xem-truoc-full";
import Head from "next/head";

export const getServerSideProps = async (context: NextPageContext) => {
  let lang = []
  const langResult: any = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_CV}/getLangCv`, { ga: 1 })
  if (langResult?.result) {
    lang = langResult?.data
  }

  let cate = []
  const cateResult: any = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_CV}/getNganhCv`, { ga: 1 })
  if (cateResult?.result) {
    cate = cateResult?.data
  }

  const slug = context.query.slug
  let query: any = {}
  if (slug && typeof slug === 'string') {
    if (Array.isArray(lang)) {
      const lang_index = lang.findIndex((item: any) => item?.name && typeof item?.name === 'string' && createLinkTilte2(slug).includes(createLinkTilte2(item?.name)))
      if (lang_index != -1) {
        query.idlang = lang[lang_index]?.id || 0
      }
    }

    if (Array.isArray(cate)) {
      const cate_index = cate.findIndex((item: any) => item?.name && typeof item?.name === 'string' && createLinkTilte2(slug).includes(createLinkTilte2(item?.name)))
      if (cate_index != -1) {
        query.idnganh = cate[cate_index]?.id || 0
      }
    }
  }

  let data = []
  let total = 0
  let blog = {}
  const dataResult: any = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_CV}/ListSampleCV`, { ga: 1, ...query })
  if (dataResult?.result) {
    data = dataResult?.data
    total = dataResult?.total
    blog = dataResult?.blog
  }

  return {
    props: {
      preLang: lang,
      preCate: cate,
      preData: data,
      preTotal: total,
      preBlog: blog,
    }
  }
}

const TrangChuCV: NextPage<{ preLang: any, preCate: any, preData: any, preTotal: any, preBlog: any, }> = ({ preLang, preCate, preData, preTotal, preBlog, }) => {
  const [baContent, setBaContent] = useState(``);
  const [contentBA, setContentBA] = useState(``);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpentModal, setIsOpenModal] = useState(false);
  const [seo_tt, setSeo_tt] = useState(preBlog?.seo_tt || '')
  const [seo_des, setSeo_des] = useState(preBlog?.seo_des || '')

  const [langOption, setLangOption] = useState<any[]>([{ label: 'Tất cả ngôn ngữ', value: 0 }]);
  const [cateOption, setCateOption] = useState<any[]>([{ label: 'Tất cả ngành nghề', value: 0 }]);
  const [selectLang, setSelectLang] = useState<any>(0)
  const [selectCate, setSelectCate] = useState<any>(0)
  const [selectSort, setSelectSort] = useState<any>(1)
  const [page, setPage] = useState<any>(1)
  const [pageSize, setPageSize] = useState<any>(12)
  const [total, setTotal] = useState(preTotal || 100)
  const [listCv, setListCv] = useState<any[]>([])
  const [previewData, setPreviewData] = useState<any>()
  const [firstLoad, setFirstLoad] = useState(true)
  const [previewFull, setPreviewFull] = useState(false)
  const [previewSrc, setPreviewSrc] = useState('')
  const [showFullBlog, setShowFullBlog] = useState(false)

  // mobile
  const [showOption, setShowOption] = useState(0)

  const { Option } = Select;

  const router = useRouter();

  const rawDataToDisplayData = (data: any[]) => {
    try {
      let returnData: any[] = []
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          const cv = {
            id: element?.id,
            img1: element?.image,
            name: element?.name,
            codecolor: element?.codecolor,
            link: createLinkTilte(element?.name),
            img2: element?.image2,
            img3: element?.image3,
            cover: element?.cover_image,
          }
          returnData.push(cv)
        }
      }
      setListCv(returnData)
    } catch (error) {
      setListCv([])
    }
  }

  const fetchData = async (lang?: number, cate?: number, sort?: number, page?: number, pageSize?: number) => {
    const result = await POST('CV/ListSampleCV', {
      ...(lang && { idlang: `${lang}` }),
      ...(cate && { idnganh: `${cate}` }),
      ...(sort && { sortOption: `${sort}` }),
      page: page || 1,
      pageSize: pageSize || 12,
    })

    if (result?.result) {
      rawDataToDisplayData(result?.data)
      setTotal(result?.total)
      setContentBA(result?.blog)
      setSeo_tt(result?.blog?.seo_tt)
      setSeo_des(result?.blog?.seo_des)

      let newName = 'CV'
      if (cate != 0) {
        const cate_index = cateOption.findIndex((item: any) => item?.value == cate)
        if (cate_index != -1) newName += ` ${cateOption[cate_index]?.label}`
      }
      if (lang != 0) {
        const lang_index = langOption.findIndex((item: any) => item?.value == lang)
        if (lang_index != -1) newName += ` ${langOption[lang_index]?.label}`
        // const newPath = createLinkTilte2(`CV ${}`)
      } 
      if (newName == 'CV') newName = ''
      router.push({
        pathname: `/CV/trang-chu-cv/${createLinkTilte2(newName)}`
      }, undefined, {shallow: true})

    } else {
      setListCv([])
      setTotal(0)
    }
  }

  useEffect(() => {
    // setBaContent(data.BaContent);
    // setContentBA(data.BusinesAnalyst);
    if (preBlog) {
      setSeo_tt(preBlog?.seo_tt)
      setSeo_des(preBlog?.seo_des)
      setContentBA(preBlog)
    }
    let lang = [
      { label: 'Tất cả ngôn ngữ', value: 0 }
    ],
      cate = [
        { label: 'Tất cả ngành nghề', value: 0 }
      ]
    if (Array.isArray(preLang) && preLang.length > 0) {
      for (let i = 0; i < preLang.length; i++) {
        const element = preLang[i];
        lang.push({
          label: element?.name,
          value: element?.id,
        })
      }
    }
    if (Array.isArray(preCate) && preCate.length > 0) {
      for (let i = 0; i < preCate.length; i++) {
        const element = preCate[i];
        cate.push({
          label: element?.name,
          value: element?.id,
        })
      }
    }
    setLangOption(lang);
    setCateOption(cate);
    rawDataToDisplayData(preData)
    setTotal(preTotal)

    // check link
    const path = router.asPath
    const lang_index = lang.findIndex((item) => path.includes(createLinkTilte2(item.label)))
    if (lang_index != -1) {
      setSelectLang(lang[lang_index].value)
    }
    const cate_index = cate.findIndex((item) => path.includes(createLinkTilte2(item.label)))
    if (cate_index != -1) {
      setSelectCate(cate[cate_index].value)
    }
  }, []);

  useEffect(() => {
    if (firstLoad) return () => { }
    if (page === 1) {
      fetchData(selectLang, selectCate, selectSort, page, pageSize)
    } else {
      setPage(1)
    }
    // console.log('change')
    return () => { };
  }, [selectLang, selectCate, selectSort])

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false)
    } else {
      fetchData(selectLang, selectCate, selectSort, page, pageSize)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return () => { };
  }, [page])

  const RadioChange = (e: RadioChangeEvent) => {
    // setValue(e.target.value);
    setSelectSort(e.target.value)
    // console.log(e.target.value, typeof e.target.value)
  };

  const handleChangeLang = (lang: number) => {
    setSelectLang(lang)
  }

  const handleChangeCate = (cate: number) => {
    setSelectCate(cate)
  }

  const handleShowOption = (option: number) => {
    if (showOption === option) {
      setShowOption(0)
    } else {
      setShowOption(option)
    }
  }

  const handleChangeSelect = (e: any) => {
    console.log("object", e);
  };
  // const listCv = [
  //   {
  //     img: "/images/cv/cv-theo-ngon-ngu/avatar1.png",
  //     name: "Cơ khí 01",
  //   },
  // ];
  // for (let i = 0; i <= 10; i++) {
  //   listCv.push({
  //     img: "/images/cv/cv-theo-ngon-ngu/avatar1.png",
  //     name: "Cơ khí 01",
  //   });
  // }

  const handleChangeValueTable = (e: any) => {
    // console.log('e', e);
    setBaContent(e)

  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="stylesheet" href="/styles/ck_blog.css" type="text/css" />
        <title>{seo_tt}</title>
        <meta name="description" content={seo_des} />
      </Head>
      {
        previewFull && <XemTruocFull imgSrc={previewSrc} onClose={() => { setPreviewFull(false) }} />
      }
      {!previewFull && <>
        <Header />
        <div className={s.main_container}>
          {/* <div className={s.chat}>
          <div className={s.content_chat}>
            <div className={`${s.div_chat} ${isOpen ? s.none : ""}`}>
              Hỗ Trợ trực tuyến
            </div>
            <svg
              className={`${s.close} ${isOpen ? s.none : ""}`}
              onClick={() => setIsOpen(true)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M24 12C24 14.2484 23.3684 16.3706 22.2568 18.1895C20.1853 21.6758 16.3705 24 12 24C7.62947 24 3.81474 21.6506 1.74316 18.1895C0.631578 16.3958 0 14.2484 0 12C0 5.38105 5.38105 0 12 0C18.6189 0 24 5.38105 24 12Z"
                fill="#727272"
              />
              <path
                d="M15.2084 15.0658L8.86719 8.72461"
                stroke="white"
                strokeWidth="1.2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.1581 8.80078L8.81689 15.142"
                stroke="white"
                strokeWidth="1.2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className={`${s.triangle} ${isOpen ? s.none : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
            >
              <path
                d="M12.75 7.36122C13.4167 7.74612 13.4167 8.70837 12.75 9.09327L1.5 15.5885C0.833333 15.9734 -6.77187e-07 15.4922 -6.43538e-07 14.7224L-7.57104e-08 1.73205C-4.20614e-08 0.962251 0.833333 0.481125 1.5 0.866025L12.75 7.36122Z"
                fill="white"
              />
            </svg>
            <svg
              className={s.chat_hear}
              onClick={() => setIsOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <path
                d="M35.4209 19.3107C35.4766 20.6398 35.0027 21.9367 34.1033 22.9169C33.2039 23.8971 31.9525 24.4805 30.6235 24.5391C30.5458 24.5427 30.4682 24.5445 30.3908 24.5445C30.0377 24.5443 29.6856 24.5061 29.3407 24.4306C28.3172 26.0108 26.9751 27.3601 25.4003 28.392C23.8256 29.4239 22.0528 30.1157 20.1953 30.4233C19.9756 31.0687 19.5373 31.6171 18.9562 31.9737C18.3751 32.3302 17.6876 32.4725 17.0127 32.376C16.3378 32.2794 15.7178 31.9501 15.2599 31.4449C14.802 30.9398 14.5351 30.2905 14.5051 29.6094C14.4752 28.9282 14.6842 28.258 15.0959 27.7146C15.5077 27.1712 16.0964 26.7888 16.7602 26.6334C17.4241 26.478 18.1214 26.5594 18.7315 26.8636C19.3417 27.1678 19.8265 27.6756 20.1019 28.2992C22.717 27.8156 25.0794 26.4296 26.7774 24.383C28.4755 22.3363 29.4015 19.7586 29.3941 17.0992C29.3941 10.8164 24.2827 5.70508 17.9999 5.70508C11.7172 5.70508 6.60581 10.8164 6.60581 17.0992C6.60546 19.042 7.10197 20.9525 8.04813 22.6493C8.08019 22.7053 8.10426 22.7655 8.11963 22.8281C8.21102 23.0822 8.20125 23.3616 8.09235 23.6086C7.98344 23.8556 7.78374 24.0513 7.53456 24.1552C6.92443 24.4119 6.26912 24.5442 5.60716 24.5441C5.52925 24.5441 5.45118 24.5422 5.37295 24.5386C4.04452 24.4793 2.79385 23.8955 1.89518 22.9154C0.996508 21.9353 0.523175 20.6388 0.578969 19.3102C0.601399 18.7804 0.588883 18.3077 0.576649 17.8506C0.565258 17.4202 0.553376 16.9751 0.572923 16.5107C0.631259 15.2135 1.18928 13.9891 2.1301 13.0941C3.07093 12.1991 4.32157 11.7028 5.62009 11.7093C7.70528 6.93843 12.4692 3.5957 17.9999 3.5957C23.5307 3.5957 28.2947 6.93843 30.3799 11.7093C31.6785 11.7019 32.9296 12.1978 33.8706 13.0928C34.8116 13.9878 35.3693 15.2125 35.4269 16.5099C35.4465 16.975 35.4347 17.4201 35.4232 17.8504C35.4111 18.3076 35.3985 18.7805 35.4209 19.3107ZM26.8456 17.0992C26.8451 18.4544 26.5333 19.7913 25.9344 21.0069C25.3354 22.2226 24.4653 23.2844 23.3911 24.1105C22.3168 24.9366 21.0672 25.505 19.7386 25.7718C18.4099 26.0386 17.0377 25.9966 15.7279 25.6492L12.1475 27.7169C11.9668 27.8212 11.7593 27.8696 11.5511 27.856C11.343 27.8424 11.1435 27.7673 10.978 27.6403C10.8125 27.5133 10.6884 27.3401 10.6213 27.1426C10.5543 26.945 10.5473 26.732 10.6013 26.5305L11.5164 23.117C10.001 21.479 9.15783 19.3306 9.15463 17.0992C9.15463 12.2204 13.1224 8.25152 17.9999 8.25152C22.8775 8.25152 26.8456 12.2204 26.8456 17.0992ZM15.5408 17.0992C15.5408 16.8195 15.4297 16.5512 15.2319 16.3534C15.0341 16.1557 14.7658 16.0445 14.4861 16.0445H14.4843C14.2758 16.0449 14.0721 16.1071 13.8989 16.2232C13.7257 16.3394 13.5908 16.5042 13.5113 16.697C13.4318 16.8897 13.4112 17.1017 13.4521 17.3062C13.493 17.5106 13.5936 17.6984 13.7412 17.8457C13.8888 17.993 14.0767 18.0932 14.2813 18.1338C14.4858 18.1743 14.6978 18.1533 14.8904 18.0734C15.083 17.9936 15.2476 17.8584 15.3634 17.685C15.4792 17.5116 15.541 17.3077 15.541 17.0992H15.5408ZM19.0548 17.0992C19.0548 17.0647 19.0529 17.0302 19.0492 16.9959C19.0459 16.9614 19.0408 16.9271 19.0338 16.8932C19.0275 16.8594 19.019 16.8261 19.0084 16.7934C18.9987 16.7603 18.9867 16.728 18.9741 16.6956C18.9614 16.6633 18.9459 16.633 18.9298 16.6028C18.9137 16.5724 18.8961 16.5428 18.877 16.5142C18.8578 16.4853 18.8371 16.4574 18.8151 16.4305C18.7934 16.4037 18.7702 16.3781 18.7455 16.3539C18.7216 16.3293 18.6956 16.3061 18.6689 16.2836C18.6421 16.2625 18.614 16.2414 18.5852 16.2224C18.5566 16.2034 18.527 16.1858 18.4966 16.1697C18.4663 16.1535 18.4348 16.1388 18.403 16.1254C18.3714 16.1121 18.339 16.1006 18.3061 16.0909C18.2403 16.0698 18.1724 16.0561 18.1036 16.0502C18.0003 16.0402 17.8961 16.0452 17.7942 16.0649C17.7603 16.0718 17.7268 16.0805 17.6937 16.0909C17.6608 16.1006 17.6284 16.1121 17.5967 16.1254C17.5651 16.1388 17.5334 16.1535 17.5032 16.1697C17.473 16.1859 17.4434 16.2034 17.4145 16.2224C17.3856 16.2414 17.3576 16.2625 17.3316 16.2836C17.3042 16.3061 17.2789 16.3293 17.2543 16.3539C17.2296 16.3781 17.2063 16.4037 17.1846 16.4305C17.1628 16.4574 17.1424 16.4853 17.1235 16.5142C17.1042 16.5428 17.0863 16.5724 17.0701 16.6028C17.0538 16.6329 17.0393 16.6639 17.0264 16.6956C17.0131 16.7276 17.0013 16.7602 16.9912 16.7934C16.9815 16.8257 16.973 16.8595 16.966 16.8932C16.9591 16.9271 16.9539 16.9614 16.9505 16.9959C16.947 17.0303 16.9455 17.0648 16.9455 17.0992C16.9455 17.1337 16.947 17.1688 16.9505 17.2033C16.9539 17.2375 16.9591 17.2715 16.966 17.3052C16.973 17.339 16.9815 17.3727 16.9912 17.4058C17.0013 17.4387 17.0131 17.4711 17.0264 17.5028C17.0393 17.5347 17.0538 17.566 17.0701 17.5963C17.0862 17.6266 17.1045 17.6561 17.1235 17.6849C17.1424 17.7136 17.1628 17.7413 17.1846 17.7679C17.2065 17.7948 17.2298 17.8206 17.2543 17.8452C17.2789 17.8691 17.3042 17.893 17.3316 17.9148C17.3581 17.9368 17.3857 17.9572 17.4145 17.976C17.4434 17.995 17.4729 18.0133 17.5032 18.0295C17.5643 18.0613 17.628 18.0876 17.6937 18.1082C17.7267 18.118 17.7605 18.1265 17.7942 18.1335C17.862 18.1474 17.931 18.1542 18.0002 18.1539C18.2796 18.1532 18.5474 18.0422 18.7455 17.8452C18.7941 17.7959 18.8382 17.7422 18.877 17.6849C18.896 17.6561 18.9136 17.6266 18.9298 17.5963C18.9459 17.5661 18.9607 17.5345 18.9741 17.5028C18.9874 17.4712 18.9987 17.4381 19.0084 17.4058C19.019 17.3728 19.0274 17.3392 19.0338 17.3052C19.0407 17.2715 19.0458 17.2375 19.0492 17.2033C19.0528 17.1687 19.0546 17.1339 19.0546 17.0991L19.0548 17.0992ZM22.5705 17.0992C22.5705 16.8195 22.4594 16.5512 22.2616 16.3534C22.0638 16.1557 21.7955 16.0445 21.5158 16.0445H21.5137C21.3052 16.0449 21.1015 16.1071 20.9284 16.2233C20.7552 16.3394 20.6203 16.5043 20.5408 16.697C20.4613 16.8898 20.4407 17.1018 20.4816 17.3062C20.5225 17.5107 20.6231 17.6984 20.7707 17.8457C20.9183 17.993 21.1062 18.0933 21.3108 18.1338C21.5153 18.1743 21.7273 18.1533 21.9199 18.0734C22.1125 17.9935 22.2771 17.8584 22.3929 17.685C22.5087 17.5116 22.5705 17.3077 22.5705 17.0992Z"
                fill="white"
              />
            </svg>
          </div>
        </div> */}
          <div className={s.first_map}>
            <div>
              DANH SÁCH MẪU CV XIN VIỆC VỚI 5 NGÔN NGỮ, 92 NGÀNH NGHỀ ĐẸP NHẤT
              2024
            </div>
            <div>
              Các mẫu CV được thiết kế đa dạng, nhiều ngành nghề, theo đúng quy
              chuẩn, phù hợp cho mọi đối tượng
            </div>
          </div>
          <div className={s.second_map}>
            <div className={s.search_box}>
              <div className={s.box}>
                <Select
                  size="large"
                  className={s.select}
                  placeholder={
                    <div className={s.place}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="22"
                        viewBox="0 0 24 22"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_2663_30350)">
                          <path
                            d="M8.73277 12.7416C7.84155 12.7416 6.98241 12.7382 6.12395 12.7478C6.05025 12.7484 5.95745 12.8197 5.90832 12.8849C5.51867 13.3987 5.13789 13.9186 4.7537 14.4365C4.4241 14.8811 3.98122 15.0453 3.509 14.8987C3.01903 14.7467 2.74812 14.3611 2.74266 13.7978C2.73925 13.4598 2.74198 13.1217 2.74198 12.7634C2.65736 12.7484 2.58639 12.7315 2.51406 12.7233C1.04212 12.5563 0.0253473 11.4703 0.0137465 9.99475C-0.00399585 7.85195 -0.00331345 5.70914 0.0130641 3.56701C0.0253473 1.96381 1.21545 0.81469 2.83138 0.813333C6.04207 0.810618 9.25207 0.809939 12.4628 0.813333C14.0876 0.815369 15.2661 1.98689 15.2722 3.60027C15.2763 4.65029 15.2729 5.70032 15.2729 6.75102C15.2729 6.84197 15.2729 6.93224 15.2729 7.05034C15.3998 7.05034 15.5001 7.05034 15.5998 7.05034C17.4648 7.05034 19.3298 7.04491 21.1947 7.05238C22.5718 7.05781 23.6384 7.89606 23.9264 9.19315C23.9755 9.41442 23.9933 9.64655 23.994 9.87394C23.9987 11.9658 24.0008 14.0577 23.9953 16.1496C23.9912 17.594 23.0782 18.6936 21.697 18.9345C21.5646 18.9576 21.4295 18.9644 21.263 18.982C21.263 19.3173 21.2555 19.6452 21.2644 19.9723C21.2787 20.4889 21.0842 20.8812 20.5977 21.0957C20.1514 21.2925 19.7208 21.1785 19.3072 20.7678C18.7586 20.2235 18.2168 19.6723 17.6586 19.1382C17.5617 19.0459 17.3979 18.9753 17.2648 18.9746C15.3575 18.9644 13.4495 18.9719 11.5422 18.9658C10.1822 18.9617 9.11559 18.1485 8.81261 16.8854C8.75597 16.6492 8.73754 16.4001 8.7355 16.1564C8.72731 15.1234 8.73209 14.0903 8.73209 13.0566C8.73277 12.9636 8.73277 12.872 8.73277 12.7416ZM20.1152 20.0694C20.1363 20.0579 20.1575 20.0456 20.1787 20.0341C20.1787 19.6316 20.1787 19.2291 20.1787 18.8266C20.1787 17.9721 20.264 17.8879 21.1306 17.8866C22.2265 17.8852 22.8973 17.2221 22.8987 16.1313C22.9007 14.0482 22.9007 11.9652 22.8987 9.88208C22.8973 8.79201 22.2265 8.13091 21.1279 8.13023C17.952 8.12955 14.7754 8.12955 11.5995 8.13023C10.4961 8.13023 9.81983 8.80423 9.81915 9.90584C9.81778 11.9719 9.81778 14.0381 9.81915 16.1042C9.81983 17.2193 10.4947 17.8859 11.62 17.8859C13.6037 17.8866 15.5882 17.8893 17.5719 17.8825C17.8394 17.8818 18.0434 17.9646 18.2277 18.1553C18.605 18.5463 18.9981 18.9216 19.3809 19.3078C19.6293 19.5576 19.8702 19.8149 20.1152 20.0694ZM14.1694 7.05034C14.179 6.97161 14.1865 6.93835 14.1865 6.90509C14.1872 5.7872 14.1899 4.6693 14.1838 3.5514C14.1831 3.39257 14.1565 3.22967 14.1135 3.07628C13.9047 2.3378 13.2762 1.8939 12.4375 1.89322C9.61033 1.89118 6.78315 1.89254 3.95529 1.89254C3.55472 1.89254 3.15483 1.8844 2.75426 1.89458C1.82757 1.91901 1.1206 2.57604 1.11446 3.46656C1.10013 5.67656 1.10286 7.88724 1.11446 10.0979C1.11855 10.8147 1.61466 11.4188 2.31821 11.5864C2.5782 11.6482 2.85731 11.6407 3.12822 11.6468C3.63115 11.6577 3.82631 11.8437 3.827 12.3371C3.82768 12.8163 3.827 13.2948 3.827 13.8371C3.92321 13.717 3.98122 13.6498 4.03376 13.5785C4.42819 13.0478 4.82808 12.5204 5.21295 11.9821C5.38287 11.7452 5.59373 11.6434 5.88307 11.6455C6.7347 11.6529 7.58634 11.6482 8.43797 11.6482C8.52873 11.6482 8.61949 11.6482 8.73209 11.6482C8.73209 11.0774 8.74573 10.5371 8.72799 9.99747C8.70957 9.44904 8.83103 8.93319 9.08557 8.40988C8.94022 8.40377 8.85765 8.39698 8.77439 8.39698C8.01625 8.3963 7.25878 8.40241 6.50064 8.39223C6.32049 8.38951 6.22973 8.44517 6.15807 8.61079C5.92265 9.15446 5.66879 9.68999 5.4204 10.2276C5.31872 10.4482 5.14471 10.5737 4.89768 10.5635C4.66362 10.554 4.4664 10.4346 4.42068 10.2113C4.38588 10.0443 4.41454 9.83728 4.48551 9.67981C5.34465 7.77389 6.21949 5.87543 7.08341 3.97155C7.19737 3.72041 7.34477 3.52493 7.63956 3.52425C7.93436 3.52289 8.08585 3.71634 8.19913 3.96747C8.70411 5.08605 9.21727 6.20055 9.72839 7.31641C9.76592 7.39854 9.80959 7.47728 9.85804 7.57366C10.4517 7.13655 11.1082 7.02591 11.807 7.04559C12.4621 7.06392 13.1186 7.04967 13.7743 7.04967C13.9013 7.05034 14.0268 7.05034 14.1694 7.05034ZM7.64229 5.37452C7.33521 6.04987 7.05338 6.66821 6.76541 7.30216C7.36933 7.30216 7.933 7.30216 8.52464 7.30216C8.22984 6.65939 7.94664 6.04037 7.64229 5.37452Z"
                            fill="#666666"
                          />
                          <path
                            d="M15.3254 15.1709C15.004 14.6836 14.6765 14.222 14.3899 13.7367C14.2322 13.4693 14.3605 13.1543 14.6191 13.0206C14.8894 12.8815 15.1924 12.9806 15.3582 13.265C15.4005 13.3383 15.4285 13.4211 15.4783 13.4883C15.7485 13.8514 16.0242 14.2111 16.3108 14.5892C17.0928 13.9281 17.518 13.1557 17.6838 12.1953C17.5753 12.1953 17.4852 12.1953 17.3958 12.1953C16.1955 12.1953 14.9951 12.1953 13.7948 12.1946C13.7013 12.1946 13.6051 12.198 13.5157 12.1776C13.2543 12.1192 13.0749 11.8722 13.0953 11.6156C13.1172 11.3407 13.3267 11.1269 13.616 11.1215C14.237 11.1106 14.8587 11.1161 15.4803 11.1154C15.5806 11.1154 15.6816 11.1154 15.8236 11.1154C15.8236 10.7414 15.8167 10.3891 15.8256 10.0375C15.8338 9.71376 16.0433 9.502 16.3442 9.49317C16.6657 9.48435 16.8984 9.70833 16.9059 10.0511C16.9134 10.3959 16.9072 10.7414 16.9072 11.1154C17.2784 11.1154 17.6251 11.1154 17.9718 11.1154C18.3375 11.1154 18.704 11.1099 19.0697 11.1181C19.4096 11.1262 19.6245 11.3414 19.6245 11.6529C19.6245 11.9611 19.4028 12.179 19.0697 12.1939C18.9851 12.198 18.9005 12.1946 18.7886 12.1946C18.6371 13.3247 18.1724 14.3001 17.3453 15.1288C17.7657 15.3392 18.1949 15.4071 18.6323 15.4431C18.7169 15.4499 18.8036 15.4417 18.8875 15.4539C19.1871 15.496 19.3877 15.7431 19.37 16.041C19.3529 16.3288 19.1387 16.5223 18.822 16.5236C18.0325 16.5264 17.2873 16.3404 16.5913 15.9745C16.4275 15.8883 16.3108 15.8938 16.1511 15.9786C15.4715 16.3377 14.7433 16.5223 13.9715 16.5236C13.6003 16.5243 13.341 16.2956 13.3437 15.9705C13.3458 15.665 13.5826 15.4539 13.9422 15.4465C14.4328 15.4376 14.9023 15.3372 15.3254 15.1709Z"
                            fill="#666666"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2663_30350">
                            <rect
                              width="24"
                              height="20.3774"
                              fill="white"
                              transform="translate(0 0.81134)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <div>Ngôn ngữ</div>
                    </div>
                  }
                  options={langOption}
                  // defaultValue={0}
                  value={selectLang}
                  onChange={(value) => handleChangeLang(value)}
                />
                <Select
                  size="large"
                  className={s.select}
                  placeholder={
                    <div className={s.place}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z"
                          stroke="#666666"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M5.76613 10L4.97883 10.3149C2.99294 11.1093 2 11.5065 2 12C2 12.4935 2.99294 12.8907 4.97883 13.6851L7.7873 14.8085C9.77318 15.6028 10.7661 16 12 16C13.2339 16 14.2268 15.6028 16.2127 14.8085L19.0212 13.6851C21.0071 12.8907 22 12.4935 22 12C22 11.5065 21.0071 11.1093 19.0212 10.3149L18.2339 10"
                          stroke="#666666"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M5.76613 14L4.97883 14.3149C2.99294 15.1093 2 15.5065 2 16C2 16.4935 2.99294 16.8907 4.97883 17.6851L7.7873 18.8085C9.77318 19.6028 10.7661 20 12 20C13.2339 20 14.2268 19.6028 16.2127 18.8085L19.0212 17.6851C21.0071 16.8907 22 16.4935 22 16C22 15.5065 21.0071 15.1093 19.0212 14.3149L18.2339 14"
                          stroke="#666666"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <div>Tất cả ngành nghề</div>
                    </div>
                  }
                  options={cateOption}
                  // defaultValue={0}
                  value={selectCate}
                  onChange={(value) => handleChangeCate(value)}
                />
                <Radio.Group
                  size="large"
                  value={selectSort}
                  onChange={RadioChange}
                  className={s.radio}
                  defaultValue={1}
                >
                  <Radio value={1}> Mới cập nhật</Radio>
                  <Radio value={2}> Được dùng nhiều nhất</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className={s.search_v2}>
              <Select
                onClick={() => handleShowOption(1)}
                dropdownStyle={{ display: 'none' }}
                popupMatchSelectWidth={382}
                className={s.select_btn}
                placeholder={
                  <div className={s.place_2}>
                    <div className={s.left_item}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="18"
                        viewBox="0 0 30 18"
                        fill="none"
                      >
                        <path
                          d="M1 1H28.0896"
                          stroke="#3582CD"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 9H23.0893"
                          stroke="#3582CD"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11 17H18.089"
                          stroke="#3582CD"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div>Tìm mẫu CV</div>
                    </div>
                    <div className={s.right_item}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_2708_6445)">
                          <path
                            d="M10.4001 19.4128C15.5987 19.4128 19.813 15.1986 19.813 10C19.813 4.80144 15.5987 0.587166 10.4001 0.587166C5.20157 0.587166 0.987305 4.80144 0.987305 10C0.987305 15.1986 5.20157 19.4128 10.4001 19.4128Z"
                            fill="#3582CD"
                          />
                          <path
                            d="M4.93506 10H15.8655"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.3999 15.4655V4.535"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2708_6445">
                            <rect
                              width="20"
                              height="20"
                              fill="white"
                              transform="translate(0.399902)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                }

              >
                {/* <Option value="option1">Ngôn ngữ
                
              </Option>
              <Option value="option2">

              </Option> */}
              </Select>
              <Select
                // onChange={(e) => handleChangeSelect(e)}
                onClick={() => handleShowOption(2)}
                dropdownStyle={{ display: 'none' }}
                popupClassName={s.select_radio}
                popupMatchSelectWidth={382}
                placeholder={
                  <div className={s.place_2}>
                    <div>Sắp xếp</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="12"
                      viewBox="0 0 10 12"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_2708_6488)">
                        <path
                          d="M0.508824 4.35623L4.93954 0.103606C4.97376 0.070759 5.01439 0.0447032 5.0591 0.0269264C5.10382 0.0091496 5.15174 0 5.20014 0C5.24854 0 5.29646 0.0091496 5.34118 0.0269264C5.38589 0.0447032 5.42652 0.070759 5.46074 0.103606L9.89146 4.35623C9.943 4.4057 9.9781 4.46873 9.99232 4.53735C10.0065 4.60597 9.99924 4.67709 9.97135 4.74173C9.94345 4.80636 9.89622 4.86161 9.83561 4.90048C9.775 4.93934 9.70375 4.96009 9.63086 4.96009H0.769426C0.696535 4.96009 0.62528 4.93934 0.564673 4.90048C0.504065 4.86161 0.456828 4.80636 0.428933 4.74173C0.401039 4.67709 0.39374 4.60597 0.407961 4.53735C0.422181 4.46873 0.457282 4.4057 0.508824 4.35623Z"
                          fill="#3582CD"
                        />
                        <path
                          d="M0.508824 7.64377L4.93954 11.8964C5.00865 11.9627 5.1024 12 5.20014 12C5.29788 12 5.39163 11.9627 5.46074 11.8964L9.89146 7.64377C9.943 7.5943 9.9781 7.53127 9.99232 7.46265C10.0065 7.39404 9.99924 7.32291 9.97135 7.25827C9.94345 7.19364 9.89622 7.13839 9.83561 7.09952C9.775 7.06066 9.70375 7.03991 9.63086 7.03991H0.769426C0.696535 7.03991 0.62528 7.06066 0.564673 7.09952C0.504065 7.13839 0.456828 7.19364 0.428933 7.25827C0.401039 7.32291 0.39374 7.39403 0.407961 7.46265C0.422181 7.53127 0.457282 7.5943 0.508824 7.64377Z"
                          fill="#3582CD"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2708_6488">
                          <rect
                            width="9.6"
                            height="12"
                            fill="white"
                            transform="translate(0.399902)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                }
              >
                {/* <Option value="12">
                <Radio value={2}> Được dùng nhiều nhất</Radio>
              </Option>
              <Option value="13">
                <Radio value={1}> Mới cập nhật</Radio>
              </Option> */}
              </Select>
              <div
                style={{
                  width: '100%',
                  display: showOption === 1 ? 'flex' : 'none',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}

              >
                <Select
                  size="large"
                  style={{ width: "100%" }}
                  placeholder={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="22"
                        viewBox="0 0 24 22"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_2663_30350)">
                          <path
                            d="M8.73277 12.7416C7.84155 12.7416 6.98241 12.7382 6.12395 12.7478C6.05025 12.7484 5.95745 12.8197 5.90832 12.8849C5.51867 13.3987 5.13789 13.9186 4.7537 14.4365C4.4241 14.8811 3.98122 15.0453 3.509 14.8987C3.01903 14.7467 2.74812 14.3611 2.74266 13.7978C2.73925 13.4598 2.74198 13.1217 2.74198 12.7634C2.65736 12.7484 2.58639 12.7315 2.51406 12.7233C1.04212 12.5563 0.0253473 11.4703 0.0137465 9.99475C-0.00399585 7.85195 -0.00331345 5.70914 0.0130641 3.56701C0.0253473 1.96381 1.21545 0.81469 2.83138 0.813333C6.04207 0.810618 9.25207 0.809939 12.4628 0.813333C14.0876 0.815369 15.2661 1.98689 15.2722 3.60027C15.2763 4.65029 15.2729 5.70032 15.2729 6.75102C15.2729 6.84197 15.2729 6.93224 15.2729 7.05034C15.3998 7.05034 15.5001 7.05034 15.5998 7.05034C17.4648 7.05034 19.3298 7.04491 21.1947 7.05238C22.5718 7.05781 23.6384 7.89606 23.9264 9.19315C23.9755 9.41442 23.9933 9.64655 23.994 9.87394C23.9987 11.9658 24.0008 14.0577 23.9953 16.1496C23.9912 17.594 23.0782 18.6936 21.697 18.9345C21.5646 18.9576 21.4295 18.9644 21.263 18.982C21.263 19.3173 21.2555 19.6452 21.2644 19.9723C21.2787 20.4889 21.0842 20.8812 20.5977 21.0957C20.1514 21.2925 19.7208 21.1785 19.3072 20.7678C18.7586 20.2235 18.2168 19.6723 17.6586 19.1382C17.5617 19.0459 17.3979 18.9753 17.2648 18.9746C15.3575 18.9644 13.4495 18.9719 11.5422 18.9658C10.1822 18.9617 9.11559 18.1485 8.81261 16.8854C8.75597 16.6492 8.73754 16.4001 8.7355 16.1564C8.72731 15.1234 8.73209 14.0903 8.73209 13.0566C8.73277 12.9636 8.73277 12.872 8.73277 12.7416ZM20.1152 20.0694C20.1363 20.0579 20.1575 20.0456 20.1787 20.0341C20.1787 19.6316 20.1787 19.2291 20.1787 18.8266C20.1787 17.9721 20.264 17.8879 21.1306 17.8866C22.2265 17.8852 22.8973 17.2221 22.8987 16.1313C22.9007 14.0482 22.9007 11.9652 22.8987 9.88208C22.8973 8.79201 22.2265 8.13091 21.1279 8.13023C17.952 8.12955 14.7754 8.12955 11.5995 8.13023C10.4961 8.13023 9.81983 8.80423 9.81915 9.90584C9.81778 11.9719 9.81778 14.0381 9.81915 16.1042C9.81983 17.2193 10.4947 17.8859 11.62 17.8859C13.6037 17.8866 15.5882 17.8893 17.5719 17.8825C17.8394 17.8818 18.0434 17.9646 18.2277 18.1553C18.605 18.5463 18.9981 18.9216 19.3809 19.3078C19.6293 19.5576 19.8702 19.8149 20.1152 20.0694ZM14.1694 7.05034C14.179 6.97161 14.1865 6.93835 14.1865 6.90509C14.1872 5.7872 14.1899 4.6693 14.1838 3.5514C14.1831 3.39257 14.1565 3.22967 14.1135 3.07628C13.9047 2.3378 13.2762 1.8939 12.4375 1.89322C9.61033 1.89118 6.78315 1.89254 3.95529 1.89254C3.55472 1.89254 3.15483 1.8844 2.75426 1.89458C1.82757 1.91901 1.1206 2.57604 1.11446 3.46656C1.10013 5.67656 1.10286 7.88724 1.11446 10.0979C1.11855 10.8147 1.61466 11.4188 2.31821 11.5864C2.5782 11.6482 2.85731 11.6407 3.12822 11.6468C3.63115 11.6577 3.82631 11.8437 3.827 12.3371C3.82768 12.8163 3.827 13.2948 3.827 13.8371C3.92321 13.717 3.98122 13.6498 4.03376 13.5785C4.42819 13.0478 4.82808 12.5204 5.21295 11.9821C5.38287 11.7452 5.59373 11.6434 5.88307 11.6455C6.7347 11.6529 7.58634 11.6482 8.43797 11.6482C8.52873 11.6482 8.61949 11.6482 8.73209 11.6482C8.73209 11.0774 8.74573 10.5371 8.72799 9.99747C8.70957 9.44904 8.83103 8.93319 9.08557 8.40988C8.94022 8.40377 8.85765 8.39698 8.77439 8.39698C8.01625 8.3963 7.25878 8.40241 6.50064 8.39223C6.32049 8.38951 6.22973 8.44517 6.15807 8.61079C5.92265 9.15446 5.66879 9.68999 5.4204 10.2276C5.31872 10.4482 5.14471 10.5737 4.89768 10.5635C4.66362 10.554 4.4664 10.4346 4.42068 10.2113C4.38588 10.0443 4.41454 9.83728 4.48551 9.67981C5.34465 7.77389 6.21949 5.87543 7.08341 3.97155C7.19737 3.72041 7.34477 3.52493 7.63956 3.52425C7.93436 3.52289 8.08585 3.71634 8.19913 3.96747C8.70411 5.08605 9.21727 6.20055 9.72839 7.31641C9.76592 7.39854 9.80959 7.47728 9.85804 7.57366C10.4517 7.13655 11.1082 7.02591 11.807 7.04559C12.4621 7.06392 13.1186 7.04967 13.7743 7.04967C13.9013 7.05034 14.0268 7.05034 14.1694 7.05034ZM7.64229 5.37452C7.33521 6.04987 7.05338 6.66821 6.76541 7.30216C7.36933 7.30216 7.933 7.30216 8.52464 7.30216C8.22984 6.65939 7.94664 6.04037 7.64229 5.37452Z"
                            fill="#666666"
                          />
                          <path
                            d="M15.3254 15.1709C15.004 14.6836 14.6765 14.222 14.3899 13.7367C14.2322 13.4693 14.3605 13.1543 14.6191 13.0206C14.8894 12.8815 15.1924 12.9806 15.3582 13.265C15.4005 13.3383 15.4285 13.4211 15.4783 13.4883C15.7485 13.8514 16.0242 14.2111 16.3108 14.5892C17.0928 13.9281 17.518 13.1557 17.6838 12.1953C17.5753 12.1953 17.4852 12.1953 17.3958 12.1953C16.1955 12.1953 14.9951 12.1953 13.7948 12.1946C13.7013 12.1946 13.6051 12.198 13.5157 12.1776C13.2543 12.1192 13.0749 11.8722 13.0953 11.6156C13.1172 11.3407 13.3267 11.1269 13.616 11.1215C14.237 11.1106 14.8587 11.1161 15.4803 11.1154C15.5806 11.1154 15.6816 11.1154 15.8236 11.1154C15.8236 10.7414 15.8167 10.3891 15.8256 10.0375C15.8338 9.71376 16.0433 9.502 16.3442 9.49317C16.6657 9.48435 16.8984 9.70833 16.9059 10.0511C16.9134 10.3959 16.9072 10.7414 16.9072 11.1154C17.2784 11.1154 17.6251 11.1154 17.9718 11.1154C18.3375 11.1154 18.704 11.1099 19.0697 11.1181C19.4096 11.1262 19.6245 11.3414 19.6245 11.6529C19.6245 11.9611 19.4028 12.179 19.0697 12.1939C18.9851 12.198 18.9005 12.1946 18.7886 12.1946C18.6371 13.3247 18.1724 14.3001 17.3453 15.1288C17.7657 15.3392 18.1949 15.4071 18.6323 15.4431C18.7169 15.4499 18.8036 15.4417 18.8875 15.4539C19.1871 15.496 19.3877 15.7431 19.37 16.041C19.3529 16.3288 19.1387 16.5223 18.822 16.5236C18.0325 16.5264 17.2873 16.3404 16.5913 15.9745C16.4275 15.8883 16.3108 15.8938 16.1511 15.9786C15.4715 16.3377 14.7433 16.5223 13.9715 16.5236C13.6003 16.5243 13.341 16.2956 13.3437 15.9705C13.3458 15.665 13.5826 15.4539 13.9422 15.4465C14.4328 15.4376 14.9023 15.3372 15.3254 15.1709Z"
                            fill="#666666"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2663_30350">
                            <rect
                              width="24"
                              height="20.3774"
                              fill="white"
                              transform="translate(0 0.81134)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <div>Ngôn ngữ</div>
                    </div>
                  }
                  options={langOption}
                  // defaultValue={0}
                  value={selectLang}
                  onChange={(value) => handleChangeLang(value)}
                />
                <Select
                  size="large"
                  style={{ width: "100%" }}
                  placeholder={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z"
                          stroke="#666666"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M5.76613 10L4.97883 10.3149C2.99294 11.1093 2 11.5065 2 12C2 12.4935 2.99294 12.8907 4.97883 13.6851L7.7873 14.8085C9.77318 15.6028 10.7661 16 12 16C13.2339 16 14.2268 15.6028 16.2127 14.8085L19.0212 13.6851C21.0071 12.8907 22 12.4935 22 12C22 11.5065 21.0071 11.1093 19.0212 10.3149L18.2339 10"
                          stroke="#666666"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M5.76613 14L4.97883 14.3149C2.99294 15.1093 2 15.5065 2 16C2 16.4935 2.99294 16.8907 4.97883 17.6851L7.7873 18.8085C9.77318 19.6028 10.7661 20 12 20C13.2339 20 14.2268 19.6028 16.2127 18.8085L19.0212 17.6851C21.0071 16.8907 22 16.4935 22 16C22 15.5065 21.0071 15.1093 19.0212 14.3149L18.2339 14"
                          stroke="#666666"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <div>Ngành nghề</div>
                    </div>
                  }
                  options={cateOption}
                  // defaultValue={0}
                  value={selectCate}
                  onChange={(value) => handleChangeCate(value)}
                />
              </div>
              <div
                style={{
                  // height: '100px',
                  // marginLeft: 'auto',
                  // marginRight: 'auto',
                  marginLeft: '15px',
                  display: showOption === 2 ? 'block' : 'none'
                }}
              >
                <Radio.Group
                  size="large"
                  value={selectSort}
                  onChange={RadioChange}
                  className={s.radio}
                  defaultValue={1}
                >
                  <Space direction="vertical">
                    <Radio value={1}> Mới cập nhật</Radio>
                    <Radio value={2}> Được dùng nhiều nhất</Radio>
                  </Space>
                </Radio.Group>
              </div>
            </div>
            <div className={s.box_content}>
              <div style={{ padding: "20px" }} className={s.cv_content}>
                {listCv.map((item, index) => (
                  <div key={index} className={s.item_cv}>
                    <Image
                      src={handleImageSource(item.cover, '/images/cv/trang-chu-cv/mau11.png')}
                      alt="Ảnh xem trước CV"
                      width={260}
                      height={311}
                      className={s.img_cv}
                      onError={(e) => {
                        e.currentTarget.srcset = '/images/cv/trang-chu-cv/mau11.png'
                      }}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'left top'
                      }}
                    />
                    <div className={s.hover_img}>
                      <Button
                        className={s.f_btn}
                        onClick={() => { setPreviewData(item); setIsOpenModal(true) }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="23"
                          height="18"
                          viewBox="0 0 23 18"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_2003_96789)">
                            <path
                              d="M11.2577 0.931641C14.2041 0.980584 16.4849 2.0035 18.4035 3.84866C18.9712 4.39682 19.4753 5.0184 19.9794 5.6302C20.7527 6.56501 21.5065 7.51451 22.2651 8.46401C22.5734 8.85066 22.5734 9.159 22.27 9.53587C21.3009 10.7448 20.3416 11.9635 19.3481 13.1528C17.8112 14.9979 15.9122 16.3096 13.5434 16.8333C10.6753 17.4647 8.07154 16.8088 5.70758 15.1105C4.61125 14.3225 3.74006 13.3143 2.91292 12.262C2.20813 11.3712 1.48867 10.4903 0.774095 9.60439C0.411915 9.14922 0.40702 8.87513 0.7692 8.42486C1.8019 7.14744 2.80035 5.84555 3.8722 4.60728C5.44328 2.78659 7.39612 1.5679 9.78455 1.11763C10.3572 1.00016 10.9396 0.970795 11.2577 0.931641ZM20.8262 9.02196C20.7527 8.92897 20.7038 8.86045 20.6549 8.79682C20.0284 8.01863 19.397 7.24532 18.7754 6.46223C18.1098 5.62041 17.4099 4.81774 16.5436 4.17658C14.6789 2.7817 12.6086 2.15522 10.2887 2.50761C8.49734 2.7817 6.94584 3.58437 5.67821 4.85689C4.86086 5.67424 4.15607 6.59927 3.40724 7.48515C2.99122 7.97947 2.59478 8.49338 2.18366 9.00239C2.25218 9.08559 2.30602 9.15901 2.36475 9.22753C3.10379 10.1428 3.84284 11.058 4.57699 11.9732C5.20835 12.7661 5.92293 13.4709 6.75986 14.0484C8.63928 15.3454 10.6998 15.8789 12.9659 15.4531C14.9089 15.0909 16.5289 14.1121 17.8308 12.6487C18.8684 11.4838 19.8228 10.2455 20.8262 9.02196Z"
                              fill="white"
                            />
                            <path
                              d="M11.4975 13.4025C9.06995 13.4025 7.09753 11.4301 7.10243 9.00741C7.10243 6.57982 9.07484 4.6123 11.5024 4.6123C13.93 4.6123 15.8975 6.58472 15.8975 9.00741C15.8975 11.4301 13.9251 13.4025 11.4975 13.4025ZM8.56583 8.99273C8.56094 10.6079 9.86772 11.9293 11.478 11.9391C13.0931 11.944 14.4194 10.6421 14.4292 9.03188C14.439 7.40696 13.1273 6.0806 11.5024 6.07571C9.8873 6.07081 8.57072 7.3776 8.56583 8.99273Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2003_96789">
                              <rect
                                width="22"
                                height="16.1366"
                                fill="white"
                                transform="translate(0.5 0.931641)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        Xem trước cv
                      </Button>
                      <Button
                        className={s.s_btn}
                        onClick={(e) => {
                          // router.push(`/tao-cv/danh-cho-nguoi-moi-ra-truong-${1854}`);
                          router.push(`/tao-cv/${item.link}-${item.id}`)
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_2003_96797)">
                            <path
                              d="M0 4.69822C0.0340165 4.58579 0.0657267 4.47221 0.102049 4.36036C0.388595 3.48688 1.23901 2.87342 2.22779 2.82672C2.32811 2.82211 2.42785 2.81923 2.52817 2.81923C5.54987 2.81865 8.57157 2.81865 11.5933 2.8198C11.7218 2.8198 11.8539 2.81865 11.9778 2.84344C12.3347 2.91493 12.5849 3.23723 12.5648 3.57855C12.5434 3.93255 12.2546 4.22256 11.8804 4.25889C11.7812 4.26869 11.6803 4.26523 11.58 4.26523C8.5439 4.2658 5.50778 4.26523 2.47167 4.2658C2.01966 4.2658 1.70659 4.44915 1.6103 4.78586C1.57456 4.91097 1.57398 5.04761 1.57398 5.17849C1.57225 8.09298 1.57283 11.0075 1.57225 13.922C1.57225 15.7197 1.57225 17.5174 1.57283 19.3145C1.57283 19.4136 1.57341 19.5134 1.58724 19.6114C1.63048 19.9181 1.90665 20.1695 2.24047 20.207C2.33964 20.2179 2.44054 20.2191 2.54028 20.2191C7.1302 20.2197 11.7201 20.2197 16.31 20.2191C16.4103 20.2191 16.5112 20.2179 16.6104 20.207C16.9604 20.1689 17.2417 19.9014 17.2734 19.5762C17.2827 19.4846 17.2809 19.3912 17.2809 19.2989C17.2815 16.999 17.2804 14.6992 17.2838 12.3993C17.2838 12.2626 17.2977 12.1191 17.3426 11.9899C17.447 11.6947 17.775 11.5045 18.1106 11.5206C18.4502 11.5373 18.7425 11.7524 18.8221 12.0597C18.8503 12.1675 18.8572 12.2817 18.8572 12.3929C18.859 14.7193 18.8595 17.0457 18.8584 19.3716C18.8578 20.5719 18.129 21.3953 16.8549 21.642C16.8353 21.6461 16.8185 21.6605 16.8001 21.6703C11.8873 21.6703 6.97453 21.6703 2.06174 21.6703C2.02196 21.6576 1.98333 21.6409 1.94297 21.634C1.27591 21.5192 0.737984 21.2085 0.390901 20.6746C0.212747 20.4007 0.127418 20.0726 0 19.7688C0 14.7453 0 9.72175 0 4.69822Z"
                              fill="white"
                            />
                            <path
                              d="M22 3.43364C21.9873 4.16529 21.6898 4.88771 21.0948 5.48271C17.673 8.90572 14.2512 12.3287 10.8236 15.746C10.6973 15.8722 10.5249 15.9737 10.3549 16.0314C8.85929 16.5387 7.35969 17.0334 5.86181 17.5333C5.57584 17.6284 5.2991 17.6434 5.04195 17.4584C4.73696 17.2387 4.64817 16.8951 4.78712 16.4776C5.20224 15.23 5.64733 13.9915 6.0244 12.7323C6.24291 12.0018 6.62285 11.4264 7.16366 10.8914C10.3802 7.70937 13.5737 4.50315 16.7701 1.2998C17.3922 0.675971 18.1239 0.325425 19.0077 0.327155C20.6544 0.330038 21.9954 1.6786 22 3.43364ZM6.74854 15.5701C6.81888 15.5523 6.85924 15.5448 6.89787 15.5321C7.82611 15.2213 8.75551 14.9129 9.68203 14.5958C9.77774 14.5629 9.86653 14.4897 9.94032 14.4164C13.2538 11.1064 16.5649 7.79413 19.8754 4.48181C19.9665 4.39072 20.0571 4.29732 20.1332 4.19411C20.4629 3.74728 20.5212 3.25663 20.2969 2.75561C20.0692 2.24651 19.6604 1.95938 19.0971 1.91268C18.5938 1.87059 18.2029 2.08969 17.8575 2.43562C14.8208 5.4758 11.7951 8.52635 8.73245 11.5394C8.05501 12.2059 7.53669 12.9082 7.31298 13.8399C7.17346 14.4193 6.94515 14.9769 6.74854 15.5701Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2003_96797">
                              <rect
                                width="22"
                                height="21.3452"
                                fill="white"
                                transform="translate(0 0.327148)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        Dùng mẫu
                      </Button>
                      <div className={s.space}></div>
                    </div>
                    <div>{item.name}</div>
                    <div className={s.color_box}>
                      {/* <span></span>
                    <span></span>
                    <span></span> */}
                      {item.codecolor.split(',').map((color: any, index: any) => (
                        <span style={{ background: `#${color}` }}></span>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ width: "100%", height: "85px" }}>
                  <Pagination_page
                    current={page}
                    setCurrent={setPage}
                    pageSize={pageSize}
                    total={total}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={s.third_map}>
            <div className={s.content_third}>
              <div className={s.bg_div}>
                <div className={s.text_box}>
                  <div>30.000+</div>
                  <div>Việc làm đang tuyển dụng</div>
                </div>
                <Button onClick={() => router.push('/tin-tuyen-dung')}> Tìm việc ngay </Button>
              </div>
              <div className={s.tablet}>
                <Image
                  className={s.screen_here2}
                  alt="Ảnh minh họa"
                  width={149}
                  height={114}
                  src="/images/cv/trang-chu-cv/screen_here2.png"
                />
                <Image
                  className={s.screen_here1}
                  alt="Ảnh minh họa"
                  width={225}
                  height={165}
                  src="/images/cv/trang-chu-cv/screen_here1.png"
                />
                <Image
                  className={s.screen_here3}
                  alt="Ảnh minh họa"
                  width={193}
                  height={186}
                  src="/images/cv/trang-chu-cv/screen_here3.png"
                />
                <Image
                  className={s.imac}
                  alt="Ảnh minh họa"
                  width={216}
                  height={277}
                  src="/images/cv/trang-chu-cv/imac.png"
                />
              </div>
            </div>
          </div>
          <div className={s.last_map}>
            <div className={s.box_blog}>
              <div className={s.blog}>
                <BusinessAnalyst contentBA={contentBA} handleShowTable={(e: any) => handleChangeValueTable(e)} showFullBlog={showFullBlog} setShowFullBlog={() => {
                  setShowFullBlog(!showFullBlog)
                  const element = document.getElementById('blog_title');
                  if (element) {
                    showFullBlog && element.scrollIntoView({behavior: 'smooth'})
                  }
                }} />
              </div>
              {showFullBlog && <div className={s.table_blog}>
                <BaContent BaContent={baContent} />
              </div>}
            </div>
          </div>
          <ModalCv
            isOpenModal={isOpentModal}
            onCancel={() => setIsOpenModal(false)}
            previewData={previewData}
            setPreviewSrc={(src: any) => { setPreviewSrc(src) }}
            openFullPreview={() => { setPreviewFull(true) }}
          />
        </div>
        <Footer />
      </>}
    </>
  );
}

export default TrangChuCV