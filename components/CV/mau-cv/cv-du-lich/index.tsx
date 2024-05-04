import { useEffect, useState, useRef } from "react";
import s from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { message, Upload, Button, Select } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  CheckOutlined,
  FontSizeOutlined,
  ColumnHeightOutlined,
  EyeFilled,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  RedoOutlined,
  UndoOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
interface IAddItem {
  id: number;
  title: string;
  content: string;
}

// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export default function DuLich1() {
  // Test PDF
  const formCV = useRef(null);

  const DuLichData = [
    {
      language: "vi",
      name: "NGUYỄN THU HÀ",
      job: "QUẢN LÝ TOUR DU LỊCH",
      info: {
        title: "THÔNG TIN LIÊN HỆ",
        gender: "Nữ",
        birthday: "07/11/1998",
        phone: "0123 456 789",
        email: "ngocha0711@gmail.com",
        address: "KĐT Định Công, Hoàng Mai, Hà Nội",
      },
      goal: {
        title: "MỤC TIÊU NGHỀ NGHIỆP",
        content:
          "Với nền tảng kiến thức công nghệ thông tin, kiến thức chuyên môn về SEO, marketing online sẽ cùng đội marketing của công ty đưa dịch vụ của công ty đạt top những từ khóa",
      },
      degree: {
        title: "CHỨNG CHỈ",
        content: "Chứng chỉ hoàn thành khóa học SEO của Vietmoz",
      },
      reward: {
        title: "GIẢI THƯỞNG",
        content:
          "Nhân viên đạt thành tích tốt trong quá trình làm việc quý 2 năm 2018",
      },
      hobby: {
        title: "SỞ THÍCH",
        content: "Đọc báo, xem tin tức, Viết lách cảm xúc",
      },
      reference: {
        title: "NGƯỜI THAM CHIẾU",
        content: {
          line1:
            "Trần Thị Tuyết - Trưởng phòng Marketing - Công ty Vận tải Hàng hải Toàn cầu",
          line2: "SĐT: 0913 323 431",
        },
      },
      academic_level: {
        title: "TRÌNH ĐỘ HỌC VẤN",
        content: {
          line1: "Đại học Bách Khoa",
          line2: "2019 - 2023",
          line3: "Chuyên ngành: Công nghệ thông tin",
          line4: "Tốt nghiệp loại: Giỏi",
        },
      },
      experience: {
        title: "KINH NGHIỆM LÀM VIỆC",
        content: {
          line1: "7/2021 - Nay",
          line2: "Công ty CP Misha",
          line3: "Chuyên viên SEO",
          line4: "- Phân tích, lên kế hoạch triển khai các bộ từ khóa.",
        },
      },
      activity: {
        title: "HOẠT ĐỘNG",
        content: {
          line1: "2016 - 2022",
          line2:
            "Tham gia các hoạt động đoàn tại phường: Tổ chức trung thu cho trẻ em, quyên góp từ thiện trong các đợt phát động của phường ...",
        },
      },
      project: {
        title: "DỰ ÁN THAM GIA",
        content: {
          line1: "2021",
          line2: "Thành viên trong đội SEO",
          line3: "Misa.vn",
        },
      },
      more: {
        title: "THÔNG TIN THÊM",
        content: "Bổ sung thông tin (nếu cần)",
      },
    },
  ];
  const DuLichData1 = [
    {
      language: "vi",
      name: "NGUYỄN THU HÀ",
      job: "QUẢN LÝ TOUR DU LỊCH",
      info: {
        title: "THÔNG TIN LIÊN HỆ",
        gender: "Nữ",
        birthday: "07/11/1998",
        phone: "0123 456 789",
        email: "ngocha0711@gmail.com",
        address: "KĐT Định Công, Hoàng Mai, Hà Nội",
      },
      goal: {
        title: "MỤC TIÊU NGHỀ NGHIỆP",
        content:
          "Với nền tảng kiến thức công nghệ thông tin, kiến thức chuyên môn về SEO, marketing online sẽ cùng đội marketing của công ty đưa dịch vụ của công ty đạt top những từ khóa",
      },
      degree: {
        title: "CHỨNG CHỈ",
        content: "Chứng chỉ hoàn thành khóa học SEO của Vietmoz",
      },
      reward: {
        title: "GIẢI THƯỞNG",
        content:
          "Nhân viên đạt thành tích tốt trong quá trình làm việc quý 2 năm 2018",
      },
      hobby: {
        title: "SỞ THÍCH",
        content: ["Đọc báo, xem tin tức", "Viết lách cảm xúc"],
      },
      reference: {
        title: "NGƯỜI THAM CHIẾU",
        content: {
          line1:
            "Trần Thị Tuyết - Trưởng phòng Marketing - Công ty Vận tải Hàng hải Toàn cầu",
          line2: "SĐT: 0913 323 431",
        },
      },
      academic_level: {
        title: "TRÌNH ĐỘ HỌC VẤN",
        content: {
          line1: "Đại học Bách Khoa",
          line2: "2019 - 2023",
          line3: "Chuyên ngành: Công nghệ thông tin",
          line4: "Tốt nghiệp loại: Giỏi",
        },
      },
      experience: {
        title: "KINH NGHIỆM LÀM VIỆC",
        content: {
          line1: "Công ty CP Misha",
          line2: "7/2021 - Nay",
          line3: "Chuyên viên SEO",
          line4: "- Phân tích, lên kế hoạch triển khai các bộ từ khóa.",
        },
      },
      activity: {
        title: "HOẠT ĐỘNG",
        content: {
          line1: "2016 - 2022",
          line2:
            "Tham gia các hoạt động đoàn tại phường: Tổ chức trung thu cho trẻ em, quyên góp từ thiện trong các đợt phát động của phường ...",
        },
      },
      project: {
        title: "DỰ ÁN THAM GIA",
        content: {
          line1: "2021",
          line2: "Thành viên trong đội SEO",
          line3: "Misa.vn",
        },
      },
      more: {
        title: "THÔNG TIN THÊM",
        content: "Bổ sung thông tin (nếu cần)",
      },
    },
  ];

  // breadcrumb
  const breadcrumbItems = [
    {
      href: "/",
      text: "Trang chủ",
    },
    {
      href: "/",
      text: "CV xin việc",
    },
    {
      href: "/",
      text: "Mẫu CV",
    },
    {
      href: "/CV/mau-cv",
      text: "Quản lý Tour du lịch",
    },
  ];

  const [fontSpacing, setFontSpacing] = useState("normal");
  const [font, setFont] = useState("");
  const [size, setSize] = useState("normal");
  const [backgroundColor, setBackgroundColor] = useState("ffb20c");
  const [lang, setLang] = useState("vi");
  const [goals, setGoals] = useState<IAddItem[]>([]);
  const [degrees, setDegrees] = useState<IAddItem[]>([]);
  const [rewards, setRewards] = useState<IAddItem[]>([]);
  const [hobbys, setHobbys] = useState<IAddItem[]>([]);
  const [mores, setMores] = useState<IAddItem[]>([]);
  const [activitys, setActivitys] = useState<any>([]);
  const [projects, setProjects] = useState<any>([]);
  const [references, setReferences] = useState<any>([]);
  const [academicLevels, setAcademicLevels] = useState<any>([]);
  const [experiences, setExperiences] = useState<any>([]);
  const [data, setData] = useState<any>({});
  const [data1, setData1] = useState<any>({});
  const handleLang = (lang: any) => {
    setLang(lang);
  };

  const handleBackgroundColor = (backgroundColor: any) => {
    setBackgroundColor(backgroundColor);
  };

  const handleFont = (event: any) => {
    const selectedFont = event.target.value;
    setFont(selectedFont);
  };

  const handleFontSize = (size: any) => {
    setSize(size);
  };

  const handleFontSpacing = (fontSpacing: any) => {
    setFontSpacing(fontSpacing);
  };
  useEffect(() => {
    // Tìm phần tử trong cv_data có language phù hợp và cập nhật state data
    const newData = DuLichData.find((item) => item.language === lang);
    setData(newData);
    const newData1 = DuLichData1.find((item) => item.language === lang);
    setData1(newData1);
  }, [lang]);
  const handleAdd = () => {
    if (data?.goal) {
      setGoals([
        ...goals,
        {
          id: goals.length + 1,
          title: data.goal.title,
          content: data.goal.content,
        },
      ]);
    }
  };
  const handleRemove = (event: any) => {
    const targetElement = event.currentTarget.parentElement.parentElement;
    targetElement.style.display = "none";
  };
  const handleEdit = (title: string, label: string, content: string) => {
    // của map
    setData({
      ...data,
      [title]: {
        ...data[title],
        [label]: content,
      },
    });
  };
  const handleEdit1 = (title: string, label: string, content: string) => {
    ////cua khong map
    setData({
      ...data1,
      [title]: {
        ...data[title],
        [label]: content,
      },
    });
  };
  const handleEditMany = (
    title: string,
    label: string,
    item: string,
    content: string
  ) => {
    if (item == "none") {
      setData({
        ...data,
        [title]: {
          ...data[title],
          [label]: content,
        },
      });
    } else {
      setData({
        ...data,
        [title]: {
          ...data[title],
          [label]: {
            ...data[title]?.[label],
            [item]: content,
          },
        },
      });
    }
  }; //reference , content   , line1     , noidung
  const handleEditMany1 = (
    title: string,
    label: string,
    item: string,
    content: string
  ) => {
    if (item == "none") {
      setData({
        ...data1,
        [title]: {
          ...data[title],
          [label]: content,
        },
      });
    } else {
      setData({
        ...data1,
        [title]: {
          ...data[title],
          [label]: {
            ...data[title]?.[label],
            [item]: content,
          },
        },
      });
    }
  };
  //upload ảnh
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <img
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        top: "0",
      }}
      src="/images/cv/mau-cv/no_avatar.jpg"
    />
  );
  return (
    <>
      <Head>
        <title>Mẫu CV</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <link
        id="cv-font-size"
        rel="stylesheet"
        href={`/cv365/css/fonts/${size || "normal"}.css`}
      />
      <link
        id="cv-font"
        rel="stylesheet"
        href={`/cv365/css/font-family/${font || "Roboto"}.css`}
      />
      <link
        id="cv-font-spacing"
        rel="stylesheet"
        href={`/cv365/css/font-spacing/${fontSpacing || "normal"}.css`}
      />
      <link
        id="cv-bg-color"
        rel="stylesheet"
        href={`/cv365/css/bg-color/${backgroundColor || "ffb20c"}.css`}
      />
      <div className={s.banner}>
        <div className={s.title}>Tạo mẫu CV Quản lý tour du lịch</div>
      </div>
      <div className={s.container}>
        {/* Thanh navigation */}
        <div className={s.navigation}>
          {/* Breadcrumb */}
          <div className={s.list_breadcrumb}>
            {breadcrumbItems.map((item, index) => (
              <div key={index} className={s.breadcrumb}>
                {item.href ? (
                  <>
                    <Link href={item.href}>
                      <span>{item.text}</span>
                    </Link>
                    {index < breadcrumbItems.length - 1 && (
                      <RightOutlined className={s.next}></RightOutlined>
                    )}
                  </>
                ) : (
                  <>
                    <span>{item.text}</span>
                    {index < breadcrumbItems.length - 1 && (
                      <RightOutlined className={s.next}></RightOutlined>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          <div className={s.select}>
            {/* Ngôn ngữ */}
            <Select
              title="Ngôn ngữ"
              className={s.language}
              optionFilterProp="children"
              filterOption={filterOption}
              placeholder={
                <div className={s.desc}>
                  <img
                    src="/images/cv/mau-cv/language.png"
                    alt="Ngôn ngữ"
                    className={s.img}
                  />
                  <div>Ngôn ngữ</div>
                </div>
              }
            >
              <option className={s.choice} value="Vietnamese">
                Tiếng Việt
              </option>
              <option className={s.choice} value="English">
                Tiếng Anh
              </option>
              <option className={s.choice} value="Japanese">
                Tiếng Nhật
              </option>
              <option className={s.choice} value="Korean">
                Tiếng Hàn
              </option>
              <option className={s.choice} value="Chinese">
                Tiếng Trung
              </option>
            </Select>

            {/* Ngành nghề */}
            <Select
              className={s.job}
              optionFilterProp="children"
              filterOption={filterOption}
              placeholder={
                <div className={s.desc}>
                  <img
                    className={s.img}
                    src="/images/cv/mau-cv/linear---design--tools---layers.png"
                  />
                  <div>Tất cả ngành nghề</div>
                </div>
              }
            >
              <option className={s.choice} value="Business">
                Kinh doanh
              </option>
              <option className={s.choice} value="Seafood">
                Thủy sản
              </option>
              <option className={s.choice} value="Engine">
                Cơ khí
              </option>
              <option className={s.choice} value="IT">
                IT
              </option>
              <option className={s.choice} value="Manage">
                Quản lý
              </option>
            </Select>
          </div>
        </div>

        {/* Thanh toolbar */}
        <div className={s.toolbar}>
          <div className={s.toolbar_item_1}>
            {/* Ngôn ngữ */}
            <div className={s.toolbar_lang}>
              <div className={s.lang_options}>
                <p className={s.title}>Ngôn ngữ</p>
                <div className={s.options}>
                  <div
                    className={`${s.language} ${lang == "vi" ? s.active : ""}`}
                    onClick={() => handleLang("vi")}
                  >
                    <img src="/images/cv/mau-cv/vi.png" className={s.img} />
                    <img
                      src="/images/cv/mau-cv/icon-online.svg"
                      className={`${lang == "vi" ? s.selected : s.hidden}`}
                    />
                  </div>

                  <div
                    className={`${s.language} ${lang == "en" ? s.active : ""}`}
                    onClick={() => handleLang("en")}
                  >
                    <img src="/images/cv/mau-cv/en.png" className={s.img} />
                    <img
                      src="/images/cv/mau-cv/icon-online.svg"
                      className={`${lang == "en" ? s.selected : s.hidden}`}
                    />
                  </div>

                  <div
                    className={`${s.language} ${lang == "jp" ? s.active : ""}`}
                    onClick={() => handleLang("jp")}
                  >
                    <img src="/images/cv/mau-cv/jp.png" className={s.img} />
                    <img
                      src="/images/cv/mau-cv/icon-online.svg"
                      className={`${lang == "jp" ? s.selected : s.hidden}`}
                    />
                  </div>

                  <div
                    className={`${s.language} ${lang == "cn" ? s.active : ""}`}
                    onClick={() => handleLang("cn")}
                  >
                    <img src="/images/cv/mau-cv/cn.png" className={s.img} />
                    <img
                      src="/images/cv/mau-cv/icon-online.svg"
                      className={`${lang == "cn" ? s.selected : s.hidden}`}
                    />
                  </div>

                  <div
                    className={`${s.language} ${lang == "kr" ? s.active : ""}`}
                    onClick={() => handleLang("kr")}
                  >
                    <img src="/images/cv/mau-cv/kr.png" className={s.img} />
                    <img
                      src="/images/cv/mau-cv/icon-online.svg"
                      className={`${lang == "kr" ? s.selected : s.hidden}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tông màu */}
            <div className={s.toolbar_color}>
              <div className={s.color_options}>
                <p className={s.title}>Tông màu</p>
                <div className={s.options}>
                  <div
                    style={{ backgroundColor: "#ffb20c" }}
                    className={`${s.color} ${
                      backgroundColor == "ffb20c" ? s.active : ""
                    }`}
                    onClick={() => handleBackgroundColor("ffb20c")}
                  >
                    <CheckOutlined
                      className={`${s.check} ${
                        backgroundColor == "ffb20c" ? s.selected : s.hidden
                      }`}
                    ></CheckOutlined>
                  </div>
                  <div
                    style={{ backgroundColor: "#099fec" }}
                    className={`${s.color} ${
                      backgroundColor == "099fec" ? s.active : ""
                    }`}
                    onClick={() => handleBackgroundColor("099fec")}
                  >
                    <CheckOutlined
                      className={`${s.check} ${
                        backgroundColor == "099fec" ? s.selected : s.hidden
                      }`}
                    ></CheckOutlined>
                  </div>
                  <div
                    style={{ backgroundColor: "#39a908" }}
                    className={`${s.color} ${
                      backgroundColor == "39a908" ? s.active : ""
                    }`}
                    onClick={() => handleBackgroundColor("39a908")}
                  >
                    <CheckOutlined
                      className={`${s.check} ${
                        backgroundColor == "39a908" ? s.selected : s.hidden
                      }`}
                    ></CheckOutlined>
                  </div>
                </div>
              </div>
            </div>

            {/* Font chữ */}
            <div className={s.toolbar_font}>
              <div className={s.font_options}>
                <p className={s.title}>Font chữ</p>
                {
                  <select
                    title="Chọn font chữ"
                    className={s.font}
                    value={font}
                    // defaultValue={font}
                    onChange={handleFont}
                  >
                    <option value="Roboto">Roboto</option>
                    <option value="Arial">Arial</option>
                    <option value="sun-exta">sun-exta</option>
                    <option value="Tahoma">Tahoma</option>
                  </select>
                }
              </div>
            </div>

            {/* Cỡ chữ */}
            <div className={s.toolbar_fontSize}>
              <div className={s.fontSize_options}>
                <p className={s.title}>Cỡ chữ</p>
                <div className={s.options}>
                  <div
                    className={`${s.fontSize} ${
                      size == "small" ? s.active : ""
                    }`}
                    onClick={() => handleFontSize("small")}
                  >
                    <FontSizeOutlined
                      style={{ fontSize: "16px" }}
                      className={`${size == "small" ? s.selected : ""}`}
                    ></FontSizeOutlined>
                  </div>
                  <div
                    className={`${s.fontSize} ${
                      size == "normal" ? s.active : ""
                    }`}
                    onClick={() => handleFontSize("normal")}
                  >
                    <FontSizeOutlined
                      style={{ fontSize: "20px" }}
                      className={`${size == "normal" ? s.selected : ""}`}
                    ></FontSizeOutlined>
                  </div>
                  <div
                    className={`${s.fontSize} ${
                      size == "large" ? s.active : ""
                    }`}
                    onClick={() => handleFontSize("large")}
                  >
                    <FontSizeOutlined
                      style={{ fontSize: "24px" }}
                      className={`${size == "large" ? s.selected : ""}`}
                    ></FontSizeOutlined>
                  </div>
                </div>
              </div>
            </div>

            {/* Giãn dòng */}
            <div className={s.toolbar_lineHeight}>
              <div className={s.lineHeight_options}>
                <p className={s.title}>Giãn dòng</p>
                <div className={s.options}>
                  <div
                    className={`${s.lineHeight} ${
                      fontSpacing == "small" ? s.active : ""
                    }`}
                    onClick={() => handleFontSpacing("small")}
                  >
                    <ColumnHeightOutlined
                      style={{ fontSize: "16px" }}
                      className={`${fontSpacing == "small" ? s.selected : ""}`}
                    ></ColumnHeightOutlined>
                  </div>
                  <div
                    className={`${s.lineHeight} ${
                      fontSpacing == "normal" ? s.active : ""
                    }`}
                    onClick={() => handleFontSpacing("normal")}
                  >
                    <ColumnHeightOutlined
                      style={{ fontSize: "20px" }}
                      className={`${fontSpacing == "normal" ? s.selected : ""}`}
                    ></ColumnHeightOutlined>
                  </div>
                  <div
                    className={`${s.lineHeight} ${
                      fontSpacing == "large" ? s.active : ""
                    }`}
                    onClick={() => handleFontSpacing("large")}
                  >
                    <ColumnHeightOutlined
                      style={{ fontSize: "24px" }}
                      className={`${fontSpacing == "large" ? s.selected : ""}`}
                    ></ColumnHeightOutlined>
                  </div>
                </div>
              </div>
            </div>

            {/* Thêm mục */}
            <div className={s.toolbar_addItem}>
              <p className={s.title}>Thêm mục</p>
              <div className={s.addItem}>
                <img src="/images/cv/mau-cv/them-muc.png" alt="Thêm mục" />
              </div>
            </div>

            {/* Xem trước */}
            <div className={s.toolbar_preview}>
              <p className={s.title}>Xem trước</p>
              <div className={s.preview}>
                <EyeFilled style={{ color: "#92c8f9", fontSize: "28px" }} />
              </div>
            </div>

            {/* Lưu và tải xuống */}
            <div className={s.toolbar_save}>
              <p className={s.title}>Lưu và tải xuống</p>
              <div className={s.save}>
                <img
                  src="/images/cv/mau-cv/icon-save.png"
                  alt="Lưu và tải xuống"
                />
              </div>
            </div>
          </div>

          <div className={s.toolbar_item_2}>
            {/* Font setting */}
            <div className={s.item_group}>
              <div className={`${s.active} ${s.item} `}>
                <BoldOutlined className={`${s.selected}  ${s.font_setting}`} />
              </div>
              <div className={`${s.item} `}>
                <ItalicOutlined className={s.font_setting} />
              </div>
              <div className={`${s.item} `}>
                <UnderlineOutlined className={s.font_setting} />
              </div>
              <div className={`${s.item} `}>
                <StrikethroughOutlined className={s.font_setting} />
              </div>
            </div>

            {/* Paragraph setting */}
            <div className={s.item_group}>
              <div className={`${s.active} ${s.item}`}>
                <AlignLeftOutlined
                  className={`${s.selected} ${s.paragraph_setting}`}
                />
              </div>
              <div className={`${s.item} `}>
                <AlignCenterOutlined className={s.paragraph_setting} />
              </div>
              <div className={`${s.item} `}>
                <AlignRightOutlined className={s.paragraph_setting} />
              </div>
              <div className={`${s.item} `}>
                <img
                  src="/images/cv/mau-cv/align-justify.svg"
                  alt="Căn chỉnh đều"
                  className={`${s.align_justify} ${s.paragraph_setting}`}
                />
              </div>
            </div>

            {/* Setting */}
            <div className={s.item_group}>
              <div className={`${s.item} `}>
                <RedoOutlined className={s.setting} />
              </div>
              <div className={`${s.item} `}>
                <UndoOutlined className={s.setting} />
              </div>

              <div className={`${s.item} `}>
                <img
                  src="/images/cv/mau-cv/eraser.svg"
                  alt="Tẩy"
                  className={`${s.eraser} ${s.setting}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sửa CV */}
        <div id={s.page_cv}>
          {/* Sửa CV */}
          <div className={s.page_cv}>
            <div className={s.cv_title}>Quản lý tour du lịch</div>
            <div className={s.du_lich_container} id="form-cv" ref={formCV}>
              <div className={s.container}>
                <div className={s.info}>
                  <div className={s.right} id="cv-right">
                    {/* Ảnh đại diện */}
                    <div className={s.avatar}>
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                      >
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt="avatar"
                            width={240}
                            height={240}
                            style={{ position: "absolute", top: "0" }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </div>
                    <div className={`${s.title} ir`}>
                      {/* Họ và tên */}
                      <div className={s.name}>
                        <span className="name" contentEditable={true}>
                          {data?.name}
                        </span>
                      </div>
                      <p></p>

                      {/* Vị trí ứng tuyển */}
                      <div className={s.job}>
                        <span className="job" contentEditable={true}>
                          {data?.job}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={s.left} id="cv-left">
                    {/* Thông tin cá nhân */}
                    <div className={`${s.title} title`}>
                      <p
                        contentEditable={true}
                        onBlur={(event) => {
                          if (event.target.textContent !== null) {
                            handleEdit1(
                              "info",
                              "title",
                              event.target.textContent
                            );
                          }
                        }}
                      >
                        {data1?.info?.title}
                      </p>
                    </div>

                    {/* Giới tính */}
                    <div className={s.gender}>
                      <Image
                        src="/images/cv/tao-cv/gender.svg"
                        alt="Icon gender"
                        width={20}
                        height={20}
                        style={{ color: "#fff", width: "20px", height: "20px" }}
                      />
                      <p
                        contentEditable={true}
                        onBlur={(event) => {
                          if (event.target.textContent !== null) {
                            handleEdit1(
                              "info",
                              "gender",
                              event.target.textContent
                            );
                          }
                        }}
                      >
                        {data1?.info?.gender}
                      </p>
                    </div>

                    {/* Ngày sinh */}
                    <div className={s.birth}>
                      <Image
                        src="/images/cv/tao-cv/calendar.svg"
                        alt="Icon calendar"
                        width={20}
                        height={20}
                        style={{ width: "20px", height: "20px" }}
                      />
                      <p
                        contentEditable={true}
                        onBlur={(event) => {
                          if (event.target.textContent !== null) {
                            handleEdit1(
                              "info",
                              "birthday",
                              event.target.textContent
                            );
                          }
                        }}
                      >
                        {data1?.info?.birthday}
                      </p>
                    </div>

                    {/* Số điện thoại */}
                    <div className={s.phone}>
                      <Image
                        priority
                        src="/images/cv/tao-cv/phone.svg"
                        alt="Icon phone"
                        width={20}
                        height={20}
                        style={{ width: "20px", height: "20px" }}
                      />
                      <p
                        contentEditable={true}
                        onBlur={(event) => {
                          if (event.target.textContent !== null) {
                            handleEdit1(
                              "info",
                              "phone",
                              event.target.textContent
                            );
                          }
                        }}
                      >
                        {data1?.info?.phone}
                      </p>
                    </div>

                    {/* Email */}
                    <div className={s.email}>
                      <Image
                        priority
                        src="/images/cv/tao-cv/email.svg"
                        alt="Icon email"
                        width={20}
                        height={20}
                        style={{ width: "20px", height: "20px" }}
                      />
                      <p
                        contentEditable={true}
                        onBlur={(event) => {
                          if (event.target.textContent !== null) {
                            handleEdit1(
                              "info",
                              "email",
                              event.target.textContent
                            );
                          }
                        }}
                      >
                        {data1?.info?.email}
                      </p>
                    </div>

                    {/* Địa chỉ */}
                    <div className={s.address}>
                      <Image
                        src="/images/cv/tao-cv/address.svg"
                        alt="Icon address"
                        width={20}
                        height={20}
                        style={{ width: "20px", height: "20px" }}
                      />
                      <p
                        contentEditable={true}
                        onBlur={(event) => {
                          if (event.target.textContent !== null) {
                            handleEdit1(
                              "info",
                              "address",
                              event.target.textContent
                            );
                          }
                        }}
                      >
                        {data1?.info?.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Thông tin khác */}
                <div className={s.box_content}>
                  <div className={`${s.left} `}>
                    <div className={`${s.left_box} `}>
                      {/* Mục tiêu nghề nghiệp */}
                      <div className={`${s.goal} `}>
                        <div className={`${s.menu} `}>
                          <button className={s.add} onClick={handleAdd}>
                            Thêm
                          </button>
                          <button className={s.hidden} onClick={handleRemove}>
                            Ẩn
                          </button>
                        </div>
                        <div className={`${s.title} title`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEdit1(
                                  "goal",
                                  "title",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.goal?.title}
                          </p>
                        </div>
                        <div className={`${s.content} content`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEdit1(
                                  "goal",
                                  "content",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.goal?.content}
                          </p>
                        </div>
                      </div>
                      {goals.map((item) => {
                        return (
                          <div className={`${s.goal} `} key={item.id}>
                            <div className={`${s.menu} `}>
                              <button className={s.add} onClick={handleAdd}>
                                Thêm
                              </button>
                              <button
                                className={s.hidden}
                                onClick={handleRemove}
                              >
                                Ẩn
                              </button>
                            </div>
                            <div className={`${s.title} title`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEdit(
                                      "goal",
                                      "title",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.title}
                              </p>
                            </div>
                            <div className={`${s.content} content`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEdit(
                                      "goal",
                                      "content",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      {/* Chứng chỉ */}
                      <div className={`${s.degree}`}>
                        <div className={`${s.menu} `}>
                          <button
                            className={s.add}
                            onClick={() => {
                              if (data?.degree) {
                                setDegrees([
                                  ...degrees,
                                  {
                                    id: degrees.length + 1,
                                    title: data.degree.title,
                                    content: data.degree.content,
                                  },
                                ]);
                              }
                            }}
                          >
                            Thêm
                          </button>
                          <button className={s.hidden} onClick={handleRemove}>
                            Ẩn
                          </button>
                        </div>
                        <div className={`${s.title} title`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEdit1(
                                  "degree",
                                  "title",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.degree?.title}
                          </p>
                        </div>
                        <div className={`${s.content} content`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEdit1(
                                  "degree",
                                  "content",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.degree?.content}
                          </p>
                        </div>
                      </div>
                      {degrees.map((item) => {
                        return (
                          <div className={` ${s.degree} `} key={item.id}>
                            <div className={`${s.menu} `}>
                              <button
                                className={s.add}
                                onClick={() => {
                                  if (data?.degree) {
                                    setDegrees([
                                      ...degrees,
                                      {
                                        id: degrees.length + 1,
                                        title: data.degree.title,
                                        content: data.degree.content,
                                      },
                                    ]);
                                  }
                                }}
                              >
                                Thêm
                              </button>
                              <button
                                className={s.hidden}
                                onClick={handleRemove}
                              >
                                Ẩn
                              </button>
                            </div>
                            <div className={`${s.title} title`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEdit(
                                      "degree",
                                      "title",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.title}
                              </p>
                            </div>
                            <div className={`${s.content} content`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEdit(
                                      "degree",
                                      "content",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      {/* Giải thưởng */}
                      <div className={`${s.reward}`}>
                        <div className={`${s.menu} `}>
                          <button
                            className={s.add}
                            onClick={() => {
                              if (data?.degree) {
                                setRewards([
                                  ...rewards,
                                  {
                                    id: rewards.length + 1,
                                    title: data.reward.title,
                                    content: data.reward.content,
                                  },
                                ]);
                              }
                            }}
                          >
                            Thêm
                          </button>
                          <button className={s.hidden} onClick={handleRemove}>
                            Ẩn
                          </button>
                        </div>
                        <div className={`${s.title} title`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEdit1(
                                  "reward",
                                  "title",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.reward?.title}
                          </p>
                        </div>
                        <div className={`${s.content} content`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEdit1(
                                  "reward",
                                  "content",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.reward?.content}
                          </p>
                        </div>
                      </div>
                      {rewards.map((item) => {
                        return (
                          <div className={`${s.reward} `} key={item.id}>
                            <div className={`${s.menu} `}>
                              <button
                                className={s.add}
                                onClick={() => {
                                  if (data?.reward) {
                                    setRewards([
                                      ...rewards,
                                      {
                                        id: rewards.length + 1,
                                        title: data.reward.title,
                                        content: data.reward.content,
                                      },
                                    ]);
                                  }
                                }}
                              >
                                Thêm
                              </button>
                              <button
                                className={s.hidden}
                                onClick={handleRemove}
                              >
                                Ẩn
                              </button>
                            </div>
                            <div className={`${s.title} title`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEdit(
                                      "reward",
                                      "title",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.title}
                              </p>
                            </div>
                            <div className={`${s.content} content`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEdit(
                                      "reward",
                                      "content",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      {/* Sở thích */}
                      <div className={`${s.hobby} `}>
                        <div className={`${s.menu} `}>
                          <button
                            className={s.add}
                            onClick={() => {
                              if (data?.hobby) {
                                setHobbys([
                                  ...hobbys,
                                  {
                                    id: hobbys.length + 1,
                                    title: data.hobby.title,
                                    content: data.hobby.content,
                                  },
                                ]);
                              }
                            }}
                          >
                            Thêm
                          </button>
                          <button className={s.hidden} onClick={handleRemove}>
                            Ẩn
                          </button>
                        </div>
                        <div className={`${s.title} title`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEdit1(
                                  "hobby",
                                  "title",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.hobby?.title}
                          </p>
                        </div>
                        <div className={`${s.content} content`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEdit1(
                                  "hobby",
                                  "content",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.hobby?.content}
                          </p>
                        </div>
                      </div>
                      {hobbys.map((item) => {
                        return (
                          <div className={` ${s.hobby} `} key={item.id}>
                            <div className={`${s.menu} `}>
                              <button
                                className={s.add}
                                onClick={() => {
                                  if (data?.hobby) {
                                    setHobbys([
                                      ...hobbys,
                                      {
                                        id: hobbys.length + 1,
                                        title: data.hobby.title,
                                        content: data.hobby.content,
                                      },
                                    ]);
                                  }
                                }}
                              >
                                Thêm
                              </button>
                              <button
                                className={s.hidden}
                                onClick={handleRemove}
                              >
                                Ẩn
                              </button>
                            </div>
                            <div className={`${s.title} title`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEdit(
                                      "hobby",
                                      "title",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.title}
                              </p>
                            </div>
                            <div className={`${s.content} content`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEdit(
                                      "hobby",
                                      "content",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      {/* Người tham chiếu */}
                      <div className={` ${s.reference}`}>
                        <div className={`${s.menu} `}>
                          <button
                            className={s.add}
                            onClick={() => {
                              if (data?.reference) {
                                setReferences([
                                  ...references,
                                  {
                                    id: references.length + 1,
                                    title: data.reference.title,
                                    content: {
                                      line1: data.reference.content.line1,
                                      line2: data.reference.content.line2,
                                    },
                                  },
                                ]);
                              }
                            }}
                          >
                            Thêm
                          </button>
                          <button className={s.hidden} onClick={handleRemove}>
                            Ẩn
                          </button>
                        </div>
                        <div className={`${s.title} title`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "reference",
                                  "title",
                                  "none",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.reference?.title}
                          </p>
                        </div>
                        <div className={`${s.content} content`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "references",
                                  "content",
                                  "line1",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.reference?.content?.line1}
                          </p>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "references",
                                  "content",
                                  "line2",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.reference?.content?.line2}
                          </p>
                        </div>
                      </div>
                      {references.map((item: any) => {
                        return (
                          <div className={`${s.reference} `} key={item.id}>
                            <div className={`${s.menu} `}>
                              <button
                                className={s.add}
                                onClick={() => {
                                  if (data?.reference) {
                                    setReferences([
                                      ...references,
                                      {
                                        id: references.length + 1,
                                        title: data.reference.title,
                                        content: {
                                          line1: data.reference.content.line1,
                                          line2: data.reference.content.line2,
                                        },
                                      },
                                    ]);
                                  }
                                }}
                              >
                                Thêm
                              </button>
                              <button
                                className={s.hidden}
                                onClick={handleRemove}
                              >
                                Ẩn
                              </button>
                            </div>
                            <div className={`${s.title} title`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "reference",
                                      "title",
                                      "none",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.title}
                              </p>
                            </div>
                            <div className={`${s.content} content`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "reference",
                                      "content",
                                      "line1",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content.line1}
                              </p>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "reference",
                                      "content",
                                      "line2",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content.line2}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className={s.right}>
                    <div className={s.right_box}>
                      {/* Học vấn */}
                      <div className={` ${s.academic_level}`}>
                        <div className={`${s.menu} `}>
                          <button
                            className={s.add}
                            onClick={() => {
                              if (data?.academic_level) {
                                setAcademicLevels([
                                  ...academicLevels,
                                  {
                                    id: academicLevels.length + 1,
                                    title: data.academic_level.title,
                                    content: {
                                      line1: data.academic_level.content.line1,
                                      line2: data.academic_level.content.line2,
                                      line3: data.academic_level.content.line3,
                                      line4: data.academic_level.content.line4,
                                    },
                                  },
                                ]);
                              }
                            }}
                          >
                            Thêm
                          </button>
                          <button className={s.hidden} onClick={handleRemove}>
                            Ẩn
                          </button>
                        </div>
                        <div className={`${s.title} title`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "academic_level",
                                  "title",
                                  "none",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.academic_level?.title}
                          </p>
                        </div>
                        <div className={`${s.content} content`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "academic_level",
                                  "content",
                                  "line1",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.academic_level?.content?.line1}
                          </p>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "academic_level",
                                  "content",
                                  "line2",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.academic_level?.content?.line2}
                          </p>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "academic_level",
                                  "content",
                                  "line3",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.academic_level?.content?.line3}
                          </p>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "academic_level",
                                  "content",
                                  "line4",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.academic_level?.content?.line4}
                          </p>
                        </div>
                      </div>
                      {academicLevels.map((item: any) => {
                        return (
                          <div
                            className={` ${s.academic_level} `}
                            key={item.id}
                          >
                            <div className={`${s.menu} `}>
                              <button
                                className={s.add}
                                onClick={() => {
                                  if (data?.academic_level) {
                                    setAcademicLevels([
                                      ...academicLevels,
                                      {
                                        id: academicLevels.length + 1,
                                        title: data.academic_level.title,
                                        content: {
                                          line1:
                                            data.academic_level.content.line1,
                                          line2:
                                            data.academic_level.content.line2,
                                          line3:
                                            data.academic_level.content.line3,
                                          line4:
                                            data.academic_level.content.line4,
                                        },
                                      },
                                    ]);
                                  }
                                }}
                              >
                                Thêm
                              </button>
                              <button
                                className={s.hidden}
                                onClick={handleRemove}
                              >
                                Ẩn
                              </button>
                            </div>
                            <div className={`${s.title} title`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "academic_level",
                                      "title",
                                      "none",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.title}
                              </p>
                            </div>
                            <div className={`${s.content} content`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "academic_level",
                                      "content",
                                      "line1",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content.line1}
                              </p>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "academic_level",
                                      "content",
                                      "line2",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content.line2}
                              </p>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "academic_level",
                                      "content",
                                      "line3",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content.line3}
                              </p>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "academic_level",
                                      "content",
                                      "line4",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content.line4}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      {/* Kinh nghiệm */}
                      <div className={` ${s.experience}`}>
                        <div className={`${s.menu} `}>
                          <button
                            className={s.add}
                            onClick={() => {
                              if (data?.experience) {
                                setExperiences([
                                  ...experiences,
                                  {
                                    id: experiences.length + 1,
                                    title: data.experience.title,
                                    content: {
                                      line1: data.experience.content.line1,
                                      line2: data.experience.content.line2,
                                      line3: data.experience.content.line3,
                                      line4: data.experience.content.line4,
                                    },
                                  },
                                ]);
                              }
                            }}
                          >
                            Thêm
                          </button>
                          <button className={s.hidden} onClick={handleRemove}>
                            Ẩn
                          </button>
                        </div>
                        <div className={`${s.title} title`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "experience",
                                  "title",
                                  "none",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.experience?.title}
                          </p>
                        </div>
                        <div className={`${s.content} content`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "experience",
                                  "content",
                                  "line1",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.experience?.content?.line1}
                          </p>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "experience",
                                  "content",
                                  "line2",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.experience?.content?.line2}
                          </p>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "experience",
                                  "content",
                                  "line3",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.experience?.content?.line3}
                          </p>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "experience",
                                  "content",
                                  "line4",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.experience?.content?.line4}
                          </p>
                        </div>
                      </div>
                      {experiences.map((item: any) => {
                        return (
                          <div className={`${s.experience} `} key={item.id}>
                            <div className={`${s.menu} `}>
                              <button
                                className={s.add}
                                onClick={() => {
                                  if (data?.experience) {
                                    setExperiences([
                                      ...experiences,
                                      {
                                        id: experiences.length + 1,
                                        title: data.experience.title,
                                        content: {
                                          line1: data.experience.content.line1,
                                          line2: data.experience.content.line2,
                                          line3: data.experience.content.line3,
                                          line4: data.experience.content.line4,
                                        },
                                      },
                                    ]);
                                  }
                                }}
                              >
                                Thêm
                              </button>
                              <button
                                className={s.hidden}
                                onClick={handleRemove}
                              >
                                Ẩn
                              </button>
                            </div>
                            <div className={`${s.title} title`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "experience",
                                      "title",
                                      "none",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.title}
                              </p>
                            </div>
                            <div className={`${s.content} content`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "experience",
                                      "content",
                                      "line1",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content.line1}
                              </p>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "experience",
                                      "content",
                                      "line2",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content.line2}
                              </p>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "experience",
                                      "content",
                                      "line3",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content.line3}
                              </p>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "experience",
                                      "content",
                                      "line4",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content.line4}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      {/* Hoạt động */}
                      <div className={` ${s.activity}`}>
                        <div className={`${s.menu} `}>
                          <button
                            className={s.add}
                            onClick={() => {
                              if (data?.activity) {
                                setActivitys([
                                  ...activitys,
                                  {
                                    id: activitys.length + 1,
                                    title: data.activity.title,
                                    content: {
                                      line1: data.activity.content.line1,
                                      line2: data.activity.content.line2,
                                    },
                                  },
                                ]);
                              }
                            }}
                          >
                            Thêm
                          </button>
                          <button className={s.hidden} onClick={handleRemove}>
                            Ẩn
                          </button>
                        </div>
                        <div className={`${s.title} title`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "activity",
                                  "title",
                                  "none",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.activity?.title}
                          </p>
                        </div>
                        <div className={`${s.content} content`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "activity",
                                  "content",
                                  "line1",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.activity?.content?.line1}
                          </p>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "activity",
                                  "content",
                                  "line2",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.activity?.content?.line2}
                          </p>
                        </div>
                      </div>
                      {activitys.map((item: any) => {
                        return (
                          <div className={` ${s.activity} `} key={item.id}>
                            <div className={`${s.menu} `}>
                              <button
                                className={s.add}
                                onClick={() => {
                                  if (data?.activity) {
                                    setActivitys([
                                      ...activitys,
                                      {
                                        id: activitys.length + 1,
                                        title: data.activity.title,
                                        content: {
                                          line1: data.activity.content.line1,
                                          line2: data.activity.content.line2,
                                        },
                                      },
                                    ]);
                                  }
                                }}
                              >
                                Thêm
                              </button>
                              <button
                                className={s.hidden}
                                onClick={handleRemove}
                              >
                                Ẩn
                              </button>
                            </div>
                            <div className={`${s.title} title`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "activity",
                                      "title",
                                      "none",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.title}
                              </p>
                            </div>
                            <div className={`${s.content} content`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "activity",
                                      "content",
                                      "line1",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content.line1}
                              </p>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "activity",
                                      "content",
                                      "line2",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content.line2}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      {/* Dự án */}
                      <div className={`${s.project}`}>
                        <div className={`${s.menu} `}>
                          <button
                            className={s.add}
                            onClick={() => {
                              if (data?.project) {
                                setProjects([
                                  ...projects,
                                  {
                                    id: projects.length + 1,
                                    title: data.project.title,
                                    content: {
                                      line1: data.project.content.line1,
                                      line2: data.project.content.line2,
                                      line3: data.project.content.line3,
                                    },
                                  },
                                ]);
                              }
                            }}
                          >
                            Thêm
                          </button>
                          <button className={s.hidden} onClick={handleRemove}>
                            Ẩn
                          </button>
                        </div>
                        <div className={`${s.title} title`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "project",
                                  "title",
                                  "none",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.project?.title}
                          </p>
                        </div>
                        <div className={`${s.content} content`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "project",
                                  "content",
                                  "line1",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.project?.content?.line1}
                          </p>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "project",
                                  "content",
                                  "line2",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.project?.content?.line2}
                          </p>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEditMany1(
                                  "project",
                                  "content",
                                  "line3",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.project?.content?.line3}
                          </p>
                        </div>
                      </div>
                      {projects.map((item: any) => {
                        return (
                          <div className={`${s.project} `} key={item.id}>
                            <div className={`${s.menu} `}>
                              <button
                                className={s.add}
                                onClick={() => {
                                  if (data?.project) {
                                    setProjects([
                                      ...projects,
                                      {
                                        id: projects.length + 1,
                                        title: data.project.title,
                                        content: {
                                          line1: data.project.content.line1,
                                          line2: data.project.content.line2,
                                          line3: data.project.content.line3,
                                        },
                                      },
                                    ]);
                                  }
                                }}
                              >
                                Thêm
                              </button>
                              <button
                                className={s.hidden}
                                onClick={handleRemove}
                              >
                                Ẩn
                              </button>
                            </div>
                            <div className={`${s.title} title`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "project",
                                      "title",
                                      "none",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.title}
                              </p>
                            </div>
                            <div className={`${s.content} content`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "project",
                                      "content",
                                      "line1",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content.line1}
                              </p>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "project",
                                      "content",
                                      "line2",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content.line2}
                              </p>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEditMany(
                                      "project",
                                      "content",
                                      "line3",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content.line3}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      {/* Thông tin thêm */}
                      <div className={`${s.more}`}>
                        <div className={`${s.menu} `}>
                          <button
                            className={s.add}
                            onClick={() => {
                              if (data?.more) {
                                setMores([
                                  ...mores,
                                  {
                                    id: mores.length + 1,
                                    title: data.more.title,
                                    content: data.more.content,
                                  },
                                ]);
                              }
                            }}
                          >
                            Thêm
                          </button>
                          <button className={s.hidden} onClick={handleRemove}>
                            Ẩn
                          </button>
                        </div>
                        <div className={`${s.title} title`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEdit1(
                                  "more",
                                  "title",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.more?.title}
                          </p>
                        </div>
                        <div className={`${s.content} content`}>
                          <p
                            contentEditable={true}
                            onBlur={(event) => {
                              if (event.target.textContent !== null) {
                                handleEdit1(
                                  "more",
                                  "content",
                                  event.target.textContent
                                );
                              }
                            }}
                          >
                            {data1?.more?.content}
                          </p>
                        </div>
                      </div>
                      {mores.map((item) => {
                        return (
                          <div className={`${s.more} `} key={item.id}>
                            <div className={`${s.menu} `}>
                              <button
                                className={s.add}
                                onClick={() => {
                                  if (data?.more) {
                                    setMores([
                                      ...mores,
                                      {
                                        id: mores.length + 1,
                                        title: data.more.title,
                                        content: data.more.content,
                                      },
                                    ]);
                                  }
                                }}
                              >
                                Thêm
                              </button>
                              <button
                                className={s.hidden}
                                onClick={handleRemove}
                              >
                                Ẩn
                              </button>
                            </div>
                            <div className={s.title}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEdit(
                                      "more",
                                      "title",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.title}
                              </p>
                            </div>
                            <div className={`${s.content} content`}>
                              <p
                                contentEditable={true}
                                onBlur={(event) => {
                                  if (event.target.textContent !== null) {
                                    handleEdit(
                                      "more",
                                      "content",
                                      event.target.textContent
                                    );
                                  }
                                }}
                              >
                                {item?.content}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CV cùng ngành nghê */}
          <div className={s.same_job_cv}>
            <div className={s.btn_box}>
              <LeftOutlined className={s.btn} />
            </div>
            <div className={s.same_cv}>
              <div className={s.title}>CV cùng ngành nghề</div>
              <div className={s.img}>
                <img src="/images/cv/mau-cv/ava_1.png" />
                <div className={s.hover_img}>
                  <Button className={s.f_btn}>Xem trước cv </Button>
                  <Button>
                    <Link href="/CV/tao-cv">Sử dụng mẫu này</Link>
                  </Button>
                </div>
              </div>
              <div className={s.txt}>Mẫu CV Quản lý Tour du lịch 12</div>
            </div>
            <div className={s.btn_box}>
              <RightOutlined className={s.btn} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
