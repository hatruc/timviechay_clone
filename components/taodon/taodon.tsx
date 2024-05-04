/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
// @ts-nocheck
import { likeCv } from "@/pages/api/cv";
import { CloseCircleOutlined, HeartOutlined } from "@ant-design/icons";
import { Image, Modal } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import $ from "jquery";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Menu from "../CV/tao-cv/menu";
import { STATIC_URL, loadRemoteComponent } from "../CV/tao-cv/tao_cv";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { base_timviec365 } from "../service/functions";
import { parseable } from "../taothu/taothu";
import styles from "./taodon.module.css";
import Top_footer from "./top_footer";

type Props = {};

const changeEl = (id: string, data: string) => {
  const el = document.querySelector(id);
  if (el) el.innerHTML = data;
};

const PLACEHOLDERS = {
  head1: {
    vi: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
    en: "SOCIALIST REPUBLIC OF VIETNAM",
    jp: "ベトナム社会主義共和国",
    cn: "越南社会主义共和国",
    kr: "베트남 사회주의 공화국",
  },
  head2: {
    vi: "Độc lập - Tự do - Hạnh phúc",
    en: "Independence – Freedom – Happiness",
    jp: "独立―自由―幸福",
    cn: "独立 – 自由 - 幸福",
    kr: "독립 - 자유 – 행복",
  },
  name: {
    vi: "ĐƠN ỨNG TUYỂN",
    en: "COVER LETTER",
    jp: "就職申込書",
    cn: "求职申请书",
    kr: "고용 신청서",
  },
  to: {
    vi: "Kính gửi:",
    en: "To:",
    jp: "御中:",
    cn: "敬致:",
    kr: "귀중:",
  },
  nameIs: {
    vi: "Tên tôi là:",
    en: "My name is:",
    jp: "氏名:",
    cn: "我是:",
    kr: "제 이름은:",
  },
  born: {
    vi: "Sinh năm:",
    en: "Date of birth:",
    jp: "生年月日:",
    cn: "出生日期:",
    kr: "년생월일:",
  },
  add: {
    vi: "Địa chỉ",
    en: "Permanent address",
    jp: "戸籍住所:",
    cn: "常驻地址:",
    kr: "등록지:",
  },
  cit: {
    vi: "Hà Nội",
    en: "Ha Noi",
    jp: "ハノイ",
    cn: "河内",
    kr: "하노이",
  },
  date: {
    vi: "ngày",
    en: "date",
    jp: "年",
    cn: "年",
    kr: "년",
  },
  month: {
    vi: "tháng",
    en: "month",
    jp: "月",
    cn: "月",
    kr: "월",
  },
  year: {
    vi: "năm",
    en: "year",
    jp: "日",
    cn: "日",
    kr: "일",
  },
};

const handleChangeHtml = (html: any, selectedLang: string) => {
  // handle ten ng nhan
  changeEl("#letter-title", html?.lt_title);
  changeEl("#lto-user-to", html?.user_to);
  changeEl("#lto-name", html?.profile?.name);
  changeEl("#lto-birthday", html?.profile?.birthday);
  changeEl("#lto-address", html?.profile?.address);
  changeEl("#lto-content", html?.content);
  changeEl("#lto-user_don", html?.user_don);
  changeEl("#lto-ngay", html?.ngay);
  changeEl("#lto-thang", html?.thang);
  changeEl("#lto-nam", html?.nam);

  const infor = Cookies.get("infor");
  if (infor && parseable(infor)) {
    const data = JSON.parse(infor);

    if (data?.use_first_name) {
      changeEl("#lto-name", data?.use_first_name);
      changeEl("#lto-user_don", data?.use_first_name);
    }
    if (data?.use_birth_day)
      changeEl(
        "#lto-birthday",
        dayjs(data?.use_birth_day)?.format("DD/MM/YYYY")
      );
    if (data?.use_address) changeEl("#lto-address", data?.use_address);
  }

  // handle static data

  const el = document.querySelector("#lt-top");
  if (el) {
    const list = el.getElementsByTagName("p");
    if (list.length > 0) {
      list[0].innerHTML = PLACEHOLDERS.head1[selectedLang];
      list[1].innerHTML = PLACEHOLDERS.head2[selectedLang];
    }

    const listh1 = el.getElementsByTagName("h1");
    if (listh1.length > 0) {
      listh1[0].innerHTML = PLACEHOLDERS.name[selectedLang];
    }
  }

  // kinh gui
  const temp = document.querySelectorAll(
    "#lt-content > .ir > .lt-box > .text-top > span"
  );
  if (temp.length > 0) {
    temp[0].innerHTML = PLACEHOLDERS.to[selectedLang];
  }

  // ten toi la
  const temp2 = document.querySelectorAll(
    "#lt-content > div > div.lt-box > p:nth-child(2)"
  );
  if (temp2.length > 0) {
    temp2[0].firstChild.nodeValue = PLACEHOLDERS.nameIs[selectedLang];
  }

  // sinh ngay
  const temp3 = document.querySelectorAll(
    "#lt-content > div > div.lt-box > p:nth-child(3)"
  );
  if (temp3.length > 0) {
    temp3[0].firstChild.nodeValue = PLACEHOLDERS.born[selectedLang];
  }

  const temp4 = document.querySelectorAll(
    "#lt-content > div > div.lt-box > p.text-ad > span:nth-child(1)"
  );
  if (temp4.length > 0) {
    temp4[0].firstChild.nodeValue = PLACEHOLDERS.add[selectedLang];
  }

  const loc = document.querySelector("#lto-local");
  if (loc) loc.innerHTML = PLACEHOLDERS.cit[selectedLang];
  const elTemp = document.querySelector(
    "#lt-content > div > div.end_write > p:nth-child(1)"
  );
  if (elTemp) {
    const listIndex = [1, 3, 5];
    elTemp.childNodes.forEach((item, index) => {
      if (index === 1) {
        item.nodeValue = " " + PLACEHOLDERS.date[selectedLang] + ",";
      }
      if (index === 4) {
        item.nodeValue = PLACEHOLDERS.month[selectedLang];
      }
      if (index === 7) {
        item.nodeValue = PLACEHOLDERS.year[selectedLang];
      }
    });
  }

  // set placeholder
  $("#lto-user-to").attr(
    "cvo-placeholder",
    PLACEHOLDERS?.to?.[selectedLang]?.replace(":", "")
  );
  $("#lto-name").attr(
    "cvo-placeholder",
    PLACEHOLDERS?.nameIs?.[selectedLang]?.replace(":", "")
  );
  $("#lto-birthday").attr(
    "cvo-placeholder",
    PLACEHOLDERS?.born?.[selectedLang]?.replace(":", "")
  );
  $("#lto-name").attr(
    "cvo-placeholder",
    PLACEHOLDERS?.add?.[selectedLang]?.replace(":", "")
  );

  $("#lto-local").attr(
    "cvo-placeholder",
    PLACEHOLDERS?.cit?.[selectedLang]?.replace(":", "")
  );
  $("#lto-user_don").attr(
    "cvo-placeholder",
    PLACEHOLDERS?.nameIs?.[selectedLang]?.replace(":", "")
  );
};

const Taodon = ({ in4DonSsr, in4user, Don, dataDonMau }: any) => {
  const [data, setdata] = useState({
    Font: "",
    colors: "",
    Fontsize: "",
    Fontspace: "",
    lang: "vi",
  });
  const [in4Don, setIn4Don] = useState(in4DonSsr);
  const [listcolors, setListcolors] = useState([]);
  const [selectedColor, setSelectedColor] = useState();
  const [html, sethtml] = useState(
    in4DonSsr?.item_ur?.html || in4DonSsr?.html_vi
  );
  const [listLang, setListLang] = useState<string[]>([]);
  const [exist, setExsist] = useState(false);
  // let Container_don: any =
  const [Container_don, setContainer] = useState<any>();
  // Lỗi ở đây
  const [showshare, setshowshare] = useState<boolean>(false);
  console.log("res: ", in4DonSsr.alias);

  useEffect(() => {
    const load = async () => {
      const res = await loadRemoteComponent(
        "https://devnext.timviec365.vn/static-tv/cv365/upload/donxinviec/sinh-vien-moi-ra-truong-05/index.html"
      );
      // ${STATIC_URL}/cv365/upload/donxinviec/${in4DonSsr?.alias}/index.html
      setContainer(res);
    };
    load();
  }, [in4DonSsr]);

  // get similar
  const [similar, setSimilar] = useState<any[]>();
  useEffect(() => {
    const getSimilar = async () => {
      try {
        const token = Cookies.get("work247_token");
        const res = await axios.post(
          `${base_timviec365}/api/timviec/appli/list`,
          { page: 1, pageSize: 5 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res?.status === 200) {
          const items = res?.data?.data?.items;
          const arr = items?.filter(
            (item: any) => item?._id !== in4DonSsr?._id
          );
          setSimilar(arr);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSimilar();
  }, [in4DonSsr]);

  useEffect(() => {
    if (in4DonSsr) {
      setListcolors(in4DonSsr?.colors?.split(","));
      setSelectedColor(in4DonSsr?.colors?.split(",")?.[0]);

      //handle set lang
      const tempLang = [];
      if (in4DonSsr?.html_vi) tempLang.push("vi");
      if (in4DonSsr?.html_en) tempLang.push("en");
      if (in4DonSsr?.html_cn) tempLang.push("cn");
      if (in4DonSsr?.html_jp) tempLang.push("jp");
      if (in4DonSsr?.html_kr) tempLang.push("kr");
      setListLang(tempLang);
    }
  }, [in4DonSsr]);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "/cv365/css/font-awesome.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    $("#lt-top").css("position", "unset");
  }, []);

  const [selectedLang, setSelectedLang] = useState<string>("vi");
  const fonts = ["Roboto", "Tahoma", "Arial", "sun-exta"];
  const fontsizes = ["small", "normal", "large"];
  const [selectedFont, setSelectedFont] = useState<string>(fonts[0]);
  const [selectedFontSize, setSelectedFontSize] = useState<string>(
    fontsizes[1]
  );
  const spacings = ["small", "normal", "large"];
  const [selectedSpacing, setSelectedSpacing] = useState(spacings?.[1]);
  const handleChangeLang = (lang: string) => {
    window.localStorage.setItem("langDxv", lang);
    setSelectedLang(lang);
  };

  const changeHtmlByLang = (lang: string, data: any) => {
    if (lang === "vi") return data["html_vi"];
    else if (lang === "en") return data["html_en"];
    else if (lang === "jp") return data["html_jp"];
    else if (lang === "kr") return data["html_kr"];
    else if (lang === "cn") return data["html_cn"];
    else return null;
  };

  useEffect(() => {
    const langStore = window.localStorage.getItem("langDxv");
    if (langStore) {
      setSelectedLang(langStore);
    }
  }, []);

  useEffect(() => {
    if (exist) {
      sethtml(changeHtmlByLang(selectedLang, in4DonSsr));
    }
  }, [selectedLang, exist]);

  // handle change html

  useEffect(() => {
    if (!exist) {
      setTimeout(() => {
        handleChangeHtml(html, selectedLang);
        setExsist(true);
      }, 500);
    }
  }, []);

  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (exist) {
      handleChangeHtml(html, selectedLang);
    }
  }, [html, selectedLang]);

  useEffect(() => {
    const script3 = document.createElement("script");
    script3.src = `https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js`;
    script3.async = false;
    document.head.appendChild(script3);

    const script2 = document.createElement("script");
    script2.src = `/cv365/js/html2canvas.js`;
    script2.async = false;
    document.head.appendChild(script2);

    const script = document.createElement("script");
    script.src = `/cv365/js/donh.js`;
    script.async = false;
    document.head.appendChild(script);
  }, []);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const [select, setSelect] = useState<any>();
  const [dataPresent, setDataPresent] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      const item = in4DonSsr?.item_ur;

      const setHtml = (selector: string, data: string) => {
        $(selector).html(data);
      };

      if (item) {
        setSelectedLang(item?.lang);
        const html = item?.html;
        const css = html?.css;
        const profile = html?.profile;
        setSelectedColor(css?.color);
        setSelectedFont(css?.font);
        setSelectedFontSize(css?.font_size);
        setSelectedSpacing(css?.font_spacing);
        setHtml("#letter-title", html?.lt_title);
        setHtml("#lto-user-to", html?.user_to);
        setHtml("#lto-name", profile?.name);
        setHtml("#lto-birthday", profile?.birthday);
        setHtml("#lto-address", profile?.address);
        setHtml("#lto-content", html?.content);
        setHtml("#lto-local", html?.local);
        setHtml("#lto-ngay", html?.ngay);
        setHtml("#lto-thang", html?.thang);
        setHtml("#lto-nam", html?.nam);
        setHtml("#lto-user_don", html?.user_don);
      }

      setDataPresent(false);
    }, 1000);
  }, [in4DonSsr]);

  return (
    <>
      <link
        rel="stylesheet"
        href="/cv365/css/fonts/font_css.css"
        media="print"
      ></link>

      {/* <link rel="preload" as="style" href="/cv365/css/style_cv2.css" /> */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
        rel="stylesheet"
        type="text/css"
      ></link>
      <link rel="stylesheet" media="all" href="/cv365/css/style_cv2.css" />
      <link rel="preload" as="style" href="/cv365/css/style_header_chung.css" />
      <link rel="stylesheet" href="/cv365/css/style_header_chung.css" />
      <link rel="preload" as="style" href="/cv365/css/footer_new.css" />
      <link rel="stylesheet" href="/cv365/css/respon.css" type="text/css" />
      <link rel="stylesheet" href="/cv365/css/letter.css" type="text/css" />
      <link rel="stylesheet" href="/cv365/css/lth.css" type="text/css"></link>
      <link
        rel="stylesheet"
        href={`${STATIC_URL}/cv365/upload/donxinviec/${in4DonSsr?.alias}/css/letter.css`}
        type="text/css"
      />
      <link
        id="cv-color-css"
        rel="stylesheet"
        href={`${STATIC_URL}/cv365/upload/donxinviec/${in4DonSsr?.alias}/css/colors/${selectedColor}.css`}
        type="text/css"
      />
      <link
        id="cv-font"
        rel="stylesheet"
        href={`${STATIC_URL}/cv365/upload/donxinviec/${in4DonSsr?.alias}/css/fonts/${selectedFont}.css`}
        type="text/css"
      />
      <link
        id="cv-font-size"
        rel="stylesheet"
        href={`${STATIC_URL}/cv365/upload/donxinviec/font-size/${selectedFontSize}.css`}
        type="text/css"
      />
      <link
        id="cv-cpacing-css"
        rel="stylesheet"
        href={`${STATIC_URL}/cv365/upload/donxinviec/${in4DonSsr?.alias}/css/font-spacing/${selectedSpacing}.css`}
        type="text/css"
      />
      <link rel="stylesheet" href={`/css/don-overwrite.css`} type="text/css" />

      {/* <script src="/js/html2canvas.js"></script> */}
      <script src="/js/dist/jspdf.debug.js"></script>
      <script src="/js/slick/slick.min.js"></script>
      <script src="/js/jquery.validate.min.js" async></script>
      <script src="/js/cv.js?v=182" async></script>
      <script src="https://cdn.timviec365.vn/js/style_header.js"></script>
      <script src="/js/check_login_dt.js?v=182"></script>

      <div style={{ display: `${dataPresent ? "none" : "block"}` }}>
        <Header />
        <Menu />

        <div className={`blog-hd ${styles.wrapper}`} id="page-taocv">
          <div className={`head ${styles.head}`}>
            <div className="ctr">
              <a href="/cv365/mau-don-xin-viec">
                <i className="img back1" />
                Quay lại danh sách mẫu đơn xin việc
              </a>
              <h2>Bạn đang dùng mẫu đơn </h2>
            </div>
          </div>
          <div className="clr" />
          <div id="cvo-toolbar" className="">
            <div className="toolbar-global-controls">
              <div className={`ctr ${styles.scale}`}>
                <div className="item" id="cvo-toolbar-lang">
                  <div className="title">Ngôn ngữ</div>
                  <div className="options">
                    {listLang?.map((item: any, index: number) => (
                      <span
                        key={index}
                        className={`flag btn-lang-option ${item} ${
                          item === selectedLang ? "active" : ""
                        }`}
                        data-lang={item}
                        onClick={() => handleChangeLang(item)}
                      >
                        <img
                          src={`https://devnext.timviec365.vn/static-tv/images/${item}.png`}
                          alt=""
                        />
                        <i className="flag-selected" />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="item" id="toolbar-color">
                  <div className="title">Tông màu</div>
                  <div className="options">
                    {listcolors?.map((item: any, index: number) => {
                      return (
                        <span
                          key={index}
                          className={`color ${
                            item === selectedColor ? "active" : ""
                          }`}
                          style={{ backgroundColor: `#${item}` }}
                          data-color={item}
                          onClick={() => setSelectedColor(item)}
                        >
                          <i className="fa fa-check" />
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="item" id="toolbar-font">
                  <div className="title">Font chữ</div>
                  <select
                    name="font"
                    id="font-selector"
                    style={{ width: 150 }}
                    onChange={(e) => setSelectedFont(e.target.value)}
                  >
                    {fonts.map((item: string, index: number) => (
                      <option
                        key={index}
                        value={item}
                        selected={item === selectedFont}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="item">
                  <div className="title">Cỡ chữ</div>
                  <div className="options">
                    {fontsizes?.map((item: any, index: number) => (
                      <span
                        key={index}
                        className={`fontsize ${
                          item === selectedFontSize ? "active" : ""
                        }`}
                        data-size={item}
                        onClick={(e) => setSelectedFontSize(item)}
                      >
                        <i className="fa fa-font" />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="item">
                  <div className="title">Cách dòng</div>
                  <div className="options">
                    {spacings?.map((item: any, index: number) => (
                      <span
                        key={index}
                        className={`line-height ${
                          item === selectedSpacing ? "active" : ""
                        }`}
                        data-spacing={item}
                        onClick={() => setSelectedSpacing(item)}
                      >
                        <i className="fa fa-arrows-v" />
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="item button btn-topcv-primary"
                  id="btn-save-file"
                >
                  <div className="title">Lưu và tải đơn</div>
                  <i className="fa fa-floppy-o" />
                </div>
                {/* 	<div class="item button btn-topcv-primary" onclick="btnDown(2)">
	<div class="title">Tải về máy</div>
	<i class="fa fa-download"></i>
	</div> */}
              </div>
            </div>
          </div>
          <div className={`ctr ${styles.scale}`}>
            <div dangerouslySetInnerHTML={{ __html: Container_don }}></div>
            <form
              method="POST"
              encType="multipart/form-data"
              action="render.php"
              id="myForm"
            >
              <input
                type="hidden"
                id="ltid"
                name="ltid"
                defaultValue={in4DonSsr?._id}
              />
              <input
                type="hidden"
                name="img_val"
                id="img_val"
                defaultValue=""
              />
              <input
                type="hidden"
                name="lttype"
                id="lttype"
                defaultValue="donxinviec"
              />
              <input
                type="hidden"
                id="uid_letter"
                name="uid"
                defaultValue={1111112031}
              />
              <input
                type="hidden"
                name="name_img"
                defaultValue="ĐXV sinh viên mới ra trường "
              />
            </form>
            {/*End giao dien mau đơn */}
            <ul className="plugin">
              <li id="bt-share">
                <div
                  title="Chia sẻ"
                  onClick={() => {
                    setshowshare(!showshare);
                  }}
                >
                  <i className="tcv_share" />
                </div>
                {showshare && (
                  <ul>
                    <li>
                      <a
                        rel="nofollow"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="img ico19" />
                      </a>
                    </li>
                    <li>
                      <a
                        rel="nofollow"
                        href={`http://www.twitter.com/share?url=${window.location.href}`}
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="img ico20" />
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
            <div id="hoso-scroll" style={{ height: "auto" }}>
              <div className={`box-four ${styles.box4}`}>
                {similar?.map((item: any, index: number) => {
                  return (
                    <div className="item" key={index}>
                      <div className="wa">
                        <img src={item?.image} alt="Sản xuất vận hành 03" />
                        <div className="info">
                          <div className="btn-box">
                            <p>
                              <a
                                // href="javascript:void(0)"
                                // onclick="seeImg(249,'thu')"
                                onClick={async () => {
                                  setSelect(item);
                                  setOpen(true);
                                }}
                              >
                                Xem trước
                              </a>
                            </p>
                            <p>
                              <a
                                href={`/cv365/tao-don-xin-viec/${item?.alias}`}
                              >
                                Tạo đơn
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="clr" />
        </div>
        <Top_footer />
        <Footer />
      </div>

      <Modal
        footer={null}
        open={open}
        title={
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  background: "#4C5BD5",
                  padding: "8px",
                  borderRadius: "10px",
                  marginRight: "20px",
                  color: "#fff",
                }}
                onClick={() =>
                  (window.location.href = `/cv365/tao-don-xin-viec/${select?.alias}`)
                }
              >
                Tạo đơn của tôi
              </div>
              <div
                style={{
                  background: "#4C5BD5",
                  padding: "8px",
                  borderRadius: "10px",
                }}
                onClick={async () => {
                  const token = Cookies.get("work247_token");
                  if (token) {
                    const res = await likeCv(2, select?._id);
                    window.alert(res?.data?.message);
                  }
                }}
              >
                <HeartOutlined style={{ padding: "0px 5px", color: "#fff" }} />
              </div>
            </div>
            <CloseCircleOutlined onClick={() => setOpen(false)} />
          </div>
        }
      >
        <Image
          src={`${STATIC_URL}/cv365/upload/donxinviec/${select?.alias}/ava.jpg`}
          preview={false}
          alt=""
        />
      </Modal>
    </>
  );
};

export default Taodon;
