import s from "./styles.module.scss";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  LoadingOutlined,
  PlusOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { message, Upload } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import axios from "axios";
import { post } from "jquery";
import { render } from "react-dom";

interface IAddItem {
  id: number;
  content: any;
}

const cv_data = [
  {
    language: "vi",
    name: "TRẦN MINH NGỌC",
    job: "NHÂN VIÊN S.E.O",
    gender: "Nữ",
    birthday: "07/11/1998",
    phone: "0123 456 789",
    email: "minhngoc0711@gmail.com",
    address: "KĐT Định Công, Hoàng Mai, Hà Nội",
    goal: {
      id: 1,
      title: "MỤC TIÊU NGHỀ NGHIỆP",
      content:
        "Với nền tảng kiến thức công nghệ thông tin, kiến thức chuyên môn về SEO, marketing online sẽ cùng đội marketing của công ty đưa dịch vụ của công ty đạt top những từ khóa",
    },
    skill: {
      id: 2,
      title: "KỸ NĂNG",
      content: [
        {
          title: "Kỹ năng chuyên môn",
          point: 5,
        },
        {
          title: "Kỹ năng mềm",
          point: 3,
        },
      ],
    },
    degree: {
      id: 3,
      title: "CHỨNG CHỈ",
      content: "Chứng chỉ hoàn thành khóa học SEO của Vietmoz",
    },
    reward: {
      id: 4,
      title: "GIẢI THƯỞNG",
      content:
        "Nhân viên đạt thành tích tốt trong quá trình làm việc quý 2 năm 2018",
    },
    hobby: {
      id: 5,
      title: "SỞ THÍCH",
      content: ["Đọc báo, xem tin tức", "Viết lách cảm xúc"],
    },
    reference: {
      id: 6,
      title: "NGƯỜI THAM CHIẾU",
      content: {
        name: "Trần Thị Tuyết",
        pos: "Trưởng phòng Marketing",
        com: "Công ty Vận tải Hàng hải Toàn cầu",
        phone: "SĐT: 0913 323 431",
      },
    },
    academic_level: {
      id: 7,
      title: "TRÌNH ĐỘ HỌC VẤN",
      content: {
        uni: "Đại học Bách Khoa",
        time: "2019 - 2023",
        chuyen_nganh: "Chuyên ngành: Công nghệ thông tin",
        graduation: "Tốt nghiệp loại: Giỏi",
      },
    },
    experience: {
      id: 8,
      title: "KINH NGHIỆM LÀM VIỆC",
      content: {
        com: "Công ty CP Misha",
        time: "7/2021 - Nay",
        pos: "Chuyên viên SEO",
        desc: [
          "- Phân tích, lên kế hoạch triển khai các bộ từ khóa.",
          "- Xây dựng mô hình liên kết internal link, backlink cho hệ thống.",
        ],
      },
    },
    activity: {
      id: 9,
      title: "HOẠT ĐỘNG",
      content: {
        title: "Tình nguyện viên",
        time: "2016 - 2022",
        desc: "Tham gia các hoạt động đoàn tại phường: Tổ chức trung thu cho trẻ em, quyên góp từ thiện trong các đợt phát động của phường ...",
      },
    },
    project: {
      id: 10,
      title: "DỰ ÁN THAM GIA",
      content: {
        time: "2021",
        pos: "Thành viên trong đội SEO",
        desc: "Misa.vn",
      },
    },
    more: {
      id: 11,
      title: "THÔNG TIN THÊM",
      content: "Bổ sung thông tin (nếu cần)",
    },
  },
  {
    language: "eng",
    name: "TRAN MINH NGOC",
    job: "S.E.O employee",
    gender: "Female",
    birthday: "07/11/1998",
    phone: "0123 456 789",
    email: "minhngoc0711@gmail.com",
    address: "Dinh Cong Urban Area, Hoang Mai, Ha Noi",
    goal: {
      title: "CAREER GOALS",
      content:
        "With a foundation of information technology knowledge and expertise in SEO and online marketing, we will work with the company's marketing team to bring the company's services to the top keywords.",
    },
    skill: {
      title: "SKILL",
      content: [
        {
          title: "Advanced skill",
          point: 5,
        },
        {
          title: "Soft skills",
          point: 3,
        },
      ],
    },
    degree: {
      title: "CERTIFICATE",
      content: "Certificate of completion of Vietmoz SEO course",
    },
    reward: {
      title: "PRIZE",
      content:
        "Employees achieved good results during the second quarter of 2018",
    },
    hobby: {
      title: "HOBBIES",
      content: ["Reading newspapers, watching news", "Writing emotions"],
    },
    reference: {
      title: "REFERENCE PERSON",
      content: {
        name: "Tran Thi Tuyet",
        pos: "Head of Marketing Department",
        com: "Global Shipping Company",
        phone: "Tel: 0913 323 431",
      },
    },
    academic_level: {
      title: "ACADEMIC LEVEL",
      content: {
        uni: "Hanoi University of Science and Technology",
        time: "2019 - 2023",
        chuyen_nganh: "Specialized: Information technology",
        graduation: "Graduation: Good",
      },
    },
    experience: {
      title: "WORK EXPERIENCE",
      content: {
        com: "Misha Joint Stock Company",
        time: "7/2021 - Now",
        pos: "SEO specialist",
        desc: [
          "- Analyze and plan to deploy keyword sets.",
          "- Build a model of internal links and backlinks for the system.",
        ],
      },
    },
    activity: {
      title: "ACTIVITIES",
      content: {
        title: "Volunteer",
        time: "2016 - 2022",
        desc: "Participate in union activities in the ward: Organize Mid-Autumn Festival for children, make charitable donations in ward campaigns...",
      },
    },
    project: {
      title: "PARTICIPATING PROJECTS",
      content: {
        time: "2021",
        pos: "Member of the SEO team",
        desc: "Misa.vn",
      },
    },
    more: {
      title: "MORE INFORMATION",
      content: "Additional information (if necessary)",
    },
  },
];

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

export default function MauCV() {
  const [lang, setLang] = useState("vi");

  const handleLang = (lang: any) => {
    setLang(lang);
  };

  const [goals, setGoals] = useState<IAddItem[]>([]);
  const [skills, setSkills] = useState<IAddItem[]>([]);
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
  // const [data1, setData1] = useState<any>({});

  useEffect(() => {
    // Tìm phần tử trong cv_data có language phù hợp và cập nhật state data
    const newData = cv_data.find((item) => item.language === lang);
    setData(newData);
  }, [lang]);

  const handleAdd = () => {
    if (data?.goal) {
      setGoals([
        ...goals,
        {
          id: goals.length + 1,
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
        width: "485px",
        height: "485px",
      }}
      src="/images/cv/mau-cv/no_avatar.jpg"
    />
  );

  const SkillItem = ({ title, point }: { title: any; point: any }) => {
    const liElements = [];
    for (let i = 0; i < point; i++) {
      liElements.push(<li key={i}></li>);
    }
    for (let i = 0; i < 5 - point; i++) {
      liElements.push(
        <li
          key={i}
          style={{
            border: "1px solid #ed7d31",
            background: "#fff",
          }}
        ></li>
      );
    }

    return (
      <>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
          rel="stylesheet"
          type="text/css"
        ></link>
        <div className={s.item}>
          <div className={s.item_title}>
            <p
              contentEditable={true}
              onBlur={(event) => {
                if (event.target.textContent !== null) {
                  handleEdit(
                    "skill",
                    "content-title",
                    event.target.textContent
                  );
                }
              }}
            >
              {title}
            </p>
          </div>
          <div className={s.item_content}>
            <ul>{liElements}</ul>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {/* <div className={s.button_box}>
        <button className="s.vi_button" onClick={() => handleLang("vi")}>
          <Image
            src="/images/cv/tao-cv/icon_vietnam.svg"
            alt=""
            width={33}
            height={33}
            style={{ width: "33px", height: "33px" }}
          />
        </button>
        <button className="s.eng_button" onClick={() => handleLang("eng")}>
          <Image
            src="/images/cv/tao-cv/icon_eng.svg"
            alt=""
            width={33}
            height={33}
            style={{ width: "33px", height: "33px" }}
          />
        </button>
      </div> */}
      <div className={s.container}>
        <div className={s.info} id="info-cv">
          <div className={s.left}>
            <div className={s.title}>
              <div
                className={s.name}
                id="cv-profile-fullname"
                contentEditable={true}
              >
                {data.name}
              </div>
              <div className={s.job} id="cv-profile-job" contentEditable={true}>
                {data.job}
              </div>
            </div>

            <div className={s.box} id="personal-info">
              <div className={s.gender}>
                <Image
                  src="/images/cv/tao-cv/gender.svg"
                  alt="Icon gender"
                  width={20}
                  height={20}
                  style={{ width: "20px", height: "20px" }}
                />
                <div id="cv-profile-gender" contentEditable={true}>
                  {data.gender}
                </div>
              </div>
              <div className={s.birth}>
                <Image
                  src="/images/cv/tao-cv/calendar.svg"
                  alt="Icon calendar"
                  width={20}
                  height={20}
                  style={{ width: "20px", height: "20px" }}
                />
                <div id="cv-profile-birthday" contentEditable={true}>
                  {data.birthday}
                </div>
              </div>
              <div className={s.phone}>
                <Image
                  priority
                  src="/images/cv/tao-cv/phone.svg"
                  alt="Icon phone"
                  width={20}
                  height={20}
                  style={{ width: "20px", height: "20px" }}
                />
                <div contentEditable={true} id="cv-profile-phone">
                  {data.phone}
                </div>
              </div>
              <div className={s.email}>
                <Image
                  priority
                  src="/images/cv/tao-cv/email.svg"
                  alt="Icon email"
                  width={20}
                  height={20}
                  style={{ width: "20px", height: "20px" }}
                />
                <div contentEditable={true} id="cv-profile-email">
                  {data.email}
                </div>
              </div>
              <div className={s.address}>
                <Image
                  src="/images/cv/tao-cv/address.svg"
                  alt="Icon address"
                  width={20}
                  height={20}
                  style={{ width: "20px", height: "20px" }}
                />
                <div contentEditable={true} id="cv-profile-address">
                  {data.address}
                </div>
              </div>
            </div>
          </div>
          <div className={s.right}>
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
                    priority
                    src={imageUrl}
                    alt="avatar"
                    width={240}
                    height={240}
                    style={{ width: "100%", height: "auto" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
          </div>
        </div>

        {/* CV content */}
        <div className={s.box_content} id="content-cv">
          <div className={s.left}>
            {/* Mục tiêu nghề nghiệp */}
            <div className={`${s.goal} cvo-block `}>
              <div className={`blockControls ${s.blockControls}`}>
                <div className="show-layout-editor">
                  <i className="fa fa-bars"></i>
                </div>
                <div className="up">
                  <CaretUpOutlined />
                </div>
                <div className="down">
                  <CaretDownOutlined />
                </div>
                <div className="hide" onClick={handleRemove} style={{width: "84px", backgroundColor: "red", color: "white"}} >
                  <i className="fa fa-minus"></i>
                  Ẩn
                </div>
              </div>
              <div className={`${s.title} title`}>
                <p contentEditable={true}>{data?.goal?.title}</p>
              </div>
              <div className={s.content}>
                <div className={`${s.menu} `}>
                  <button className={s.add} onClick={handleAdd}>
                    Thêm
                  </button>
                  <button className={s.hidden} onClick={handleRemove}>
                    Xóa
                  </button>
                </div>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEdit("goal", "content", event.target.textContent);
                    }
                  }}
                >
                  {data?.goal?.content}
                </p>
              </div>
              {goals.map((item) => {
                return (
                  <div className={s.content} key={item.id}>
                    <div className={`${s.menu} `}>
                      <button className={s.add} onClick={handleAdd}>
                        Thêm
                      </button>
                      <button className={s.hidden} onClick={handleRemove}>
                        Xóa
                      </button>
                    </div>
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
                      {data?.goal?.content}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Kỹ năng */}
            <div
              className={`${s.skill} cvo-block `}
              // onDragOver={(e) => onDragOver(e, data?.skill?.id)}
            >
              <div className={`blockControls ${s.blockControls}`}>
                <div
                  className="show-layout-editor"
                  // onDragStart={(e) => onDragStart(e, data?.skill?.id)}
                  // onDragEnd={onDragEnd}
                >
                  <i className="fa fa-bars"></i>
                </div>
                <div className="up">
                  <CaretUpOutlined />
                </div>
                <div className="down">
                  <CaretDownOutlined />
                </div>
                <div className="hide" onClick={handleRemove} style={{width: "84px", backgroundColor: "red", color: "white"}}>
                  <i className="fa fa-minus"></i>
                  Ẩn
                </div>
              </div>
              <div className={`${s.title} title`}>
                <p contentEditable={true}>{data?.skill?.title}</p>
              </div>
              <div className={s.content}>
                <div className={`${s.menu} `}>
                  <button
                    className={s.add}
                    onClick={() => {
                      if (data?.skill) {
                        setSkills([
                          ...skills,
                          {
                            id: skills.length + 1,
                            content: {
                              title: data.skill.content.title,
                              point: data.skill.content.point,
                            },
                          },
                        ]);
                      }
                    }}
                  >
                    Thêm
                  </button>
                  <button className={s.hidden} onClick={handleRemove}>
                    Xóa
                  </button>
                </div>
                {data?.skill?.content?.map((skl: any, index: any) => (
                  <SkillItem
                    key={index}
                    title={skl?.title}
                    point={skl?.point}
                  />
                ))}
              </div>
              {skills.map((item) => {
                return (
                  <div className={s.content} key={item.id}>
                    <div className={`${s.menu} `}>
                      <button
                        className={s.add}
                        onClick={() => {
                          if (data?.skill) {
                            setSkills([
                              ...skills,
                              {
                                id: skills.length + 1,
                                content: {
                                  title: data.skill.content.title,
                                  point: data.skill.content.point,
                                },
                              },
                            ]);
                          }
                        }}
                      >
                        Thêm
                      </button>
                      <button className={s.hidden} onClick={handleRemove}>
                        Xóa
                      </button>
                    </div>
                    {data?.skill?.content?.map((skl: any, index: any) => (
                      <SkillItem
                        key={index}
                        title={skl?.title}
                        point={skl?.point}
                      />
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Chứng chỉ */}
            <div className={`${s.degree} cvo-block`}>
              <div className={`blockControls ${s.blockControls}`}>
                <div className="show-layout-editor">
                  <i className="fa fa-bars"></i>
                </div>
                <div className="up">
                  <CaretUpOutlined />
                </div>
                <div className="down">
                  <CaretDownOutlined />
                </div>
                <div className="hide" onClick={handleRemove} style={{width: "84px", backgroundColor: "red", color: "white"}}>
                  <i className="fa fa-minus"></i>
                  Ẩn
                </div>
              </div>
              <div className={`${s.title} title`}>
                <p contentEditable={true}>{data?.degree?.title}</p>
              </div>
              <div className={s.content}>
                <div className={`${s.menu} `}>
                  <button
                    className={s.add}
                    onClick={() => {
                      if (data?.degree) {
                        setDegrees([
                          ...degrees,
                          {
                            id: degrees.length + 1,
                            content: data.degree.content,
                          },
                        ]);
                      }
                    }}
                  >
                    Thêm
                  </button>
                  <button className={s.hidden} onClick={handleRemove}>
                    Xóa
                  </button>
                </div>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEdit("degree", "content", event.target.textContent);
                    }
                  }}
                >
                  {data?.degree?.content}
                </p>
              </div>
              {degrees.map((item) => {
                return (
                  <div className={s.content} key={item.id}>
                    <div className={`${s.menu} `}>
                      <button
                        className={s.add}
                        onClick={() => {
                          if (data?.degree) {
                            setDegrees([
                              ...degrees,
                              {
                                id: degrees.length + 1,
                                content: data.degree.content,
                              },
                            ]);
                          }
                        }}
                      >
                        Thêm
                      </button>
                      <button className={s.hidden} onClick={handleRemove}>
                        Xóa
                      </button>
                    </div>
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
                      {data?.degree?.content}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Giải thưởng */}
            <div className={`${s.reward} cvo-block`}>
              <div className={`blockControls ${s.blockControls}`}>
                <div className="show-layout-editor">
                  <i className="fa fa-bars"></i>
                </div>
                <div className="up">
                  <CaretUpOutlined />
                </div>
                <div className="down">
                  <CaretDownOutlined />
                </div>
                <div className="hide" onClick={handleRemove} style={{width: "84px", backgroundColor: "red", color: "white"}}>
                  <i className="fa fa-minus"></i>
                  Ẩn
                </div>
              </div>
              <div className={`${s.title} title`}>
                <p contentEditable={true}>{data?.reward?.title}</p>
              </div>
              <div className={s.content}>
                <div className={`${s.menu} `}>
                  <button
                    className={s.add}
                    onClick={() => {
                      if (data?.degree) {
                        setRewards([
                          ...rewards,
                          {
                            id: rewards.length + 1,
                            content: data.reward.content,
                          },
                        ]);
                      }
                    }}
                  >
                    Thêm
                  </button>
                  <button className={s.hidden} onClick={handleRemove}>
                    Xóa
                  </button>
                </div>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEdit("reward", "title", event.target.textContent);
                    }
                  }}
                >
                  {data?.reward?.content}
                </p>
              </div>
              {rewards.map((item) => {
                return (
                  <div className={s.content} key={item.id}>
                    <div className={`${s.menu} `}>
                      <button
                        className={s.add}
                        onClick={() => {
                          if (data?.degree) {
                            setRewards([
                              ...rewards,
                              {
                                id: rewards.length + 1,
                                content: data.reward.content,
                              },
                            ]);
                          }
                        }}
                      >
                        Thêm
                      </button>
                      <button className={s.hidden} onClick={handleRemove}>
                        Xóa
                      </button>
                    </div>
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
                      {data?.reward?.content}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Sở thích */}
            <div className={`${s.hobby} cvo-block`}>
              <div className={`blockControls ${s.blockControls}`}>
                <div className="show-layout-editor">
                  <i className="fa fa-bars"></i>
                </div>
                <div>
                  <CaretUpOutlined />
                </div>
                <div className="down">
                  <CaretDownOutlined />
                </div>
                <div className="hide" onClick={handleRemove} style={{width: "84px", backgroundColor: "red", color: "white"}}>
                  <i className="fa fa-minus"></i>
                  Ẩn
                </div>
              </div>
              <div className={`${s.title} title`}>
                <p contentEditable={true}>{data?.hobby?.title}</p>
              </div>
              <div className={s.content}>
                <div className={`${s.menu} `}>
                  <button
                    className={s.add}
                    onClick={() => {
                      if (data?.hobby) {
                        setHobbys([
                          ...hobbys,
                          {
                            id: hobbys.length + 1,
                            content: data.hobby.content,
                          },
                        ]);
                      }
                    }}
                  >
                    Thêm
                  </button>
                  <button className={s.hidden} onClick={handleRemove}>
                    Xóa
                  </button>
                </div>
                {data?.hobby?.content?.map((item: any, index: any) => (
                  <p
                    key={index}
                    contentEditable={true}
                    onBlur={(event) => {
                      if (event.target.textContent !== null) {
                        handleEdit("hobby", "title", event.target.textContent);
                      }
                    }}
                  >
                    {item}
                  </p>
                ))}
              </div>
              {hobbys.map((item) => {
                return (
                  <div className={s.content} key={item.id}>
                    <div className={`${s.menu} `}>
                      <button
                        className={s.add}
                        onClick={() => {
                          if (data?.hobby) {
                            setHobbys([
                              ...hobbys,
                              {
                                id: hobbys.length + 1,
                                content: data.hobby.content,
                              },
                            ]);
                          }
                        }}
                      >
                        Thêm
                      </button>
                      <button className={s.hidden} onClick={handleRemove}>
                        Xóa
                      </button>
                    </div>
                    {data?.hobby?.content?.map((item: any, index: any) => (
                      <p
                        key={index}
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
                        {item}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Người tham chiếu */}
            <div className={`${s.reference} cvo-block`}>
              <div className={`blockControls ${s.blockControls}`}>
                <div className="show-layout-editor">
                  <i className="fa fa-bars"></i>
                </div>
                <div className="up">
                  <CaretUpOutlined />
                </div>
                <div className="down">
                  <CaretDownOutlined />
                </div>
                <div className="hide" onClick={handleRemove} style={{width: "84px", backgroundColor: "red", color: "white"}}>
                  <i className="fa fa-minus"></i>
                  Ẩn
                </div>
              </div>
              <div className={`${s.title} title`}>
                <p contentEditable={true}>{data?.reference?.title}</p>
              </div>
              <div className={s.content}>
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
                              name: data.reference.content.name,
                              pos: data.reference.content.pos,
                              com: data.reference.content.com,
                              phone: data.reference.content.phone,
                            },
                          },
                        ]);
                      }
                    }}
                  >
                    Thêm
                  </button>
                  <button className={s.hidden} onClick={handleRemove}>
                    Xóa
                  </button>
                </div>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEditMany(
                        "references",
                        "content",
                        "name - pos - com",
                        event.target.textContent
                      );
                    }
                  }}
                >
                  {data?.reference?.content?.name +
                    " - " +
                    data?.reference?.content?.pos +
                    " - " +
                    data?.reference?.content?.com}
                </p>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEditMany(
                        "references",
                        "content",
                        "phone",
                        event.target.textContent
                      );
                    }
                  }}
                >
                  {data?.reference?.content?.phone}
                </p>
              </div>
              {references.map((item: any) => {
                return (
                  <div className={s.content} key={item.id}>
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
                                  name: data.reference.content.name,
                                  pos: data.reference.content.pos,
                                  com: data.reference.content.com,
                                  phone: data.reference.content.phone,
                                },
                              },
                            ]);
                          }
                        }}
                      >
                        Thêm
                      </button>
                      <button className={s.hidden} onClick={handleRemove}>
                        Xóa
                      </button>
                    </div>
                    <p
                      contentEditable={true}
                      onBlur={(event) => {
                        if (event.target.textContent !== null) {
                          handleEditMany(
                            "references",
                            "content",
                            "name - pos - com",
                            event.target.textContent
                          );
                        }
                      }}
                    >
                      {data?.reference?.content?.name +
                        " - " +
                        data?.reference?.content?.pos +
                        " - " +
                        data?.reference?.content?.com}
                    </p>
                    <p
                      contentEditable={true}
                      onBlur={(event) => {
                        if (event.target.textContent !== null) {
                          handleEditMany(
                            "references",
                            "content",
                            "phone",
                            event.target.textContent
                          );
                        }
                      }}
                    >
                      {data?.reference?.content?.phone}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={s.right}>
            {/* Trình độ học vấn */}
            <div className={`${s.academic_level} cvo-block`}>
              <div className={`blockControls ${s.blockControls}`}>
                <div className="show-layout-editor">
                  <i className="fa fa-bars"></i>
                </div>
                <div className="up">
                  <CaretUpOutlined />
                </div>
                <div className="down">
                  <CaretDownOutlined />
                </div>
                <div className="hide" onClick={handleRemove} style={{width: "84px", backgroundColor: "red", color: "white"}}>
                  <i className="fa fa-minus"></i>
                  Ẩn
                </div>
              </div>
              <div className={`${s.title} title`}>
                <p contentEditable={true}>{data?.academic_level?.title}</p>
              </div>
              <div className={`${s.content} content`}>
                <div className={`${s.menu} `}>
                  <button
                    className={s.add}
                    onClick={() => {
                      if (data?.academic_level) {
                        setAcademicLevels([
                          ...academicLevels,
                          {
                            id: academicLevels.length + 1,
                            content: {
                              uni: data.academic_level.content.uni,
                              time: data.academic_level.content.time,
                              chuyen_nganh:
                                data.academic_level.content.chuyen_nganh,
                              graduation:
                                data.academic_level.content.graduation,
                            },
                          },
                        ]);
                      }
                    }}
                  >
                    Thêm
                  </button>
                  <button className={s.hidden} onClick={handleRemove}>
                    Xóa
                  </button>
                </div>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEditMany(
                        "academic_level",
                        "content",
                        "uni",
                        event.target.textContent
                      );
                    }
                  }}
                >
                  {data?.academic_level?.content?.uni}
                </p>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEditMany(
                        "academic_level",
                        "content",
                        "time",
                        event.target.textContent
                      );
                    }
                  }}
                >
                  {data?.academic_level?.content?.time}
                </p>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEditMany(
                        "academic_level",
                        "content",
                        "chuyen_nganh",
                        event.target.textContent
                      );
                    }
                  }}
                >
                  {data?.academic_level?.content?.chuyen_nganh}
                </p>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEditMany(
                        "academic_level",
                        "content",
                        "graduation",
                        event.target.textContent
                      );
                    }
                  }}
                >
                  {data?.academic_level?.content?.graduation}
                </p>
              </div>
              {academicLevels.map((item: any) => {
                return (
                  <div className={`${s.content} content`} key={item.id}>
                    <div className={`${s.menu} `}>
                      <button
                        className={s.add}
                        onClick={() => {
                          if (data?.academic_level) {
                            setAcademicLevels([
                              ...academicLevels,
                              {
                                id: academicLevels.length + 1,
                                content: {
                                  uni: data.academic_level.content.uni,
                                  time: data.academic_level.content.time,
                                  chuyen_nganh:
                                    data.academic_level.content.chuyen_nganh,
                                  graduation:
                                    data.academic_level.content.graduation,
                                },
                              },
                            ]);
                          }
                        }}
                      >
                        Thêm
                      </button>
                      <button className={s.hidden} onClick={handleRemove}>
                        Xóa
                      </button>
                    </div>
                    <p
                      contentEditable={true}
                      onBlur={(event) => {
                        if (event.target.textContent !== null) {
                          handleEditMany(
                            "academic_level",
                            "content",
                            "uni",
                            event.target.textContent
                          );
                        }
                      }}
                    >
                      {data?.academic_level?.content?.uni}
                    </p>
                    <p
                      contentEditable={true}
                      onBlur={(event) => {
                        if (event.target.textContent !== null) {
                          handleEditMany(
                            "academic_level",
                            "content",
                            "time",
                            event.target.textContent
                          );
                        }
                      }}
                    >
                      {data?.academic_level?.content?.time}
                    </p>
                    <p
                      contentEditable={true}
                      onBlur={(event) => {
                        if (event.target.textContent !== null) {
                          handleEditMany(
                            "academic_level",
                            "content",
                            "chuyen_nganh",
                            event.target.textContent
                          );
                        }
                      }}
                    >
                      {data?.academic_level?.content?.chuyen_nganh}
                    </p>
                    <p
                      contentEditable={true}
                      onBlur={(event) => {
                        if (event.target.textContent !== null) {
                          handleEditMany(
                            "academic_level",
                            "content",
                            "graduation",
                            event.target.textContent
                          );
                        }
                      }}
                    >
                      {data?.academic_level?.content?.graduation}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Kinh nghiệm làm việc */}
            <div className={`${s.experience} cvo-block`}>
              <div className={`blockControls ${s.blockControls}`}>
                <div className="show-layout-editor">
                  <i className="fa fa-bars"></i>
                </div>
                <div className="up">
                  <CaretUpOutlined />
                </div>
                <div className="down">
                  <CaretDownOutlined />
                </div>
                <div className="hide" onClick={handleRemove} style={{width: "84px", backgroundColor: "red", color: "white"}}>
                  <i className="fa fa-minus"></i>
                  Ẩn
                </div>
              </div>
              <div className={`${s.title} title`}>
                <p contentEditable={true}>{data?.experience?.title}</p>
              </div>
              <div className={`${s.content} content`}>
                <div className={`${s.menu} `}>
                  <button
                    className={s.add}
                    onClick={() => {
                      if (data?.experience) {
                        setExperiences([
                          ...experiences,
                          {
                            id: experiences.length + 1,
                            content: {
                              com: data.experience.content.com,
                              time: data.experience.content.time,
                              pos: data.experience.content.pos,
                              desc: data.experience.content.desc,
                            },
                          },
                        ]);
                      }
                    }}
                  >
                    Thêm
                  </button>
                  <button className={s.hidden} onClick={handleRemove}>
                    Xóa
                  </button>
                </div>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEditMany(
                        "experience",
                        "content",
                        "com",
                        event.target.textContent
                      );
                    }
                  }}
                >
                  {data?.experience?.content?.com}
                </p>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEditMany(
                        "experience",
                        "content",
                        "time",
                        event.target.textContent
                      );
                    }
                  }}
                >
                  {data?.experience?.content?.time}
                </p>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEditMany(
                        "experience",
                        "content",
                        "pos",
                        event.target.textContent
                      );
                    }
                  }}
                >
                  {data?.experience?.content?.pos}
                </p>
                {data?.experience?.content?.desc?.map(
                  (item: any, index: any) => (
                    <p key={index} contentEditable={true}>
                      {item}
                    </p>
                  )
                )}
              </div>
              {experiences.map((item: any) => {
                return (
                  <div className={`${s.content} content`} key={item.id}>
                    <div className={`${s.menu} `}>
                      <button
                        className={s.add}
                        onClick={() => {
                          if (data?.experience) {
                            setExperiences([
                              ...experiences,
                              {
                                id: experiences.length + 1,
                                content: {
                                  com: data.experience.content.com,
                                  time: data.experience.content.time,
                                  pos: data.experience.content.pos,
                                  desc: data.experience.content.desc,
                                },
                              },
                            ]);
                          }
                        }}
                      >
                        Thêm
                      </button>
                      <button className={s.hidden} onClick={handleRemove}>
                        Xóa
                      </button>
                    </div>
                    <p
                      contentEditable={true}
                      onBlur={(event) => {
                        if (event.target.textContent !== null) {
                          handleEditMany(
                            "experience",
                            "content",
                            "com",
                            event.target.textContent
                          );
                        }
                      }}
                    >
                      {data?.experience?.content?.com}
                    </p>
                    <p
                      contentEditable={true}
                      onBlur={(event) => {
                        if (event.target.textContent !== null) {
                          handleEditMany(
                            "experience",
                            "content",
                            "time",
                            event.target.textContent
                          );
                        }
                      }}
                    >
                      {data?.experience?.content?.time}
                    </p>
                    <p
                      contentEditable={true}
                      onBlur={(event) => {
                        if (event.target.textContent !== null) {
                          handleEditMany(
                            "experience",
                            "content",
                            "pos",
                            event.target.textContent
                          );
                        }
                      }}
                    >
                      {data?.experience?.content?.pos}
                    </p>
                    {data?.experience?.content?.desc?.map(
                      (item: any, index: any) => (
                        <p
                          key={index}
                          contentEditable={true}
                          onBlur={(event) => {
                            if (event.target.textContent !== null) {
                              handleEditMany(
                                "experience",
                                "content",
                                "des",
                                event.target.textContent
                              );
                            }
                          }}
                        >
                          {item}
                        </p>
                      )
                    )}
                  </div>
                );
              })}
            </div>

            {/* Hoạt động */}
            <div className={`${s.activity} cvo-block`}>
              <div className={`blockControls ${s.blockControls}`}>
                <div className="show-layout-editor">
                  <i className="fa fa-bars"></i>
                </div>
                <div className="up">
                  <CaretUpOutlined />
                </div>
                <div className="down">
                  <CaretDownOutlined />
                </div>
                <div className="hide" onClick={handleRemove} style={{width: "84px", backgroundColor: "red", color: "white"}}>
                  <i className="fa fa-minus"></i>
                  Ẩn
                </div>
              </div>
              <div className={`${s.title} title`}>
                <p contentEditable={true}>{data?.activity?.title}</p>
              </div>
              <div className={`${s.content} content`}>
                <div className={`${s.menu} `}>
                  <button
                    className={s.add}
                    onClick={() => {
                      if (data?.activity) {
                        setActivitys([
                          ...activitys,
                          {
                            id: activitys.length + 1,
                            content: {
                              title: data.activity.content.title,
                              time: data.activity.content.time,
                              desc: data.activity.content.desc,
                            },
                          },
                        ]);
                      }
                    }}
                  >
                    Thêm
                  </button>
                  <button className={s.hidden} onClick={handleRemove}>
                    Xóa
                  </button>
                </div>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEditMany(
                        "activity",
                        "content",
                        "title",
                        event.target.textContent
                      );
                    }
                  }}
                >
                  {data?.activity?.content?.title}
                </p>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEditMany(
                        "activity",
                        "content",
                        "time",
                        event.target.textContent
                      );
                    }
                  }}
                >
                  {data?.activity?.content?.time}
                </p>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEditMany(
                        "activity",
                        "content",
                        "desc",
                        event.target.textContent
                      );
                    }
                  }}
                >
                  {data?.activity?.content?.desc}
                </p>
              </div>
              {activitys.map((item: any) => {
                return (
                  <div className={`${s.content} content`} key={item.id}>
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
                                  title: data.activity.content.title,
                                  time: data.activity.content.time,
                                  desc: data.activity.content.desc,
                                },
                              },
                            ]);
                          }
                        }}
                      >
                        Thêm
                      </button>
                      <button className={s.hidden} onClick={handleRemove}>
                        Xóa
                      </button>
                    </div>
                    <p
                      contentEditable={true}
                      onBlur={(event) => {
                        if (event.target.textContent !== null) {
                          handleEditMany(
                            "activity",
                            "content",
                            "title",
                            event.target.textContent
                          );
                        }
                      }}
                    >
                      {data?.activity?.content?.title}
                    </p>
                    <p
                      contentEditable={true}
                      onBlur={(event) => {
                        if (event.target.textContent !== null) {
                          handleEditMany(
                            "activity",
                            "content",
                            "time",
                            event.target.textContent
                          );
                        }
                      }}
                    >
                      {data?.activity?.content?.time}
                    </p>
                    <p
                      contentEditable={true}
                      onBlur={(event) => {
                        if (event.target.textContent !== null) {
                          handleEditMany(
                            "activity",
                            "content",
                            "desc",
                            event.target.textContent
                          );
                        }
                      }}
                    >
                      {data?.activity?.content?.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Dự án */}
            <div className={`${s.project} cvo-block`}>
              <div className={`blockControls ${s.blockControls}`}>
                <div className="show-layout-editor">
                  <i className="fa fa-bars"></i>
                </div>
                <div className="up">
                  <CaretUpOutlined />
                </div>
                <div className="down">
                  <CaretDownOutlined />
                </div>
                <div className="hide" onClick={handleRemove} style={{width: "84px", backgroundColor: "red", color: "white"}}>
                  <i className="fa fa-minus"></i>
                  Ẩn
                </div>
              </div>
              <div className={`${s.title} title`}>
                <p contentEditable={true}>{data?.project?.title}</p>
              </div>
              <div className={`${s.content} content`}>
                <div className={`${s.menu} `}>
                  <button
                    className={s.add}
                    onClick={() => {
                      if (data?.project) {
                        setProjects([
                          ...projects,
                          {
                            id: projects.length + 1,
                            content: {
                              pos: data.project.content.pos,
                              time: data.project.content.time,
                              desc: data.project.content.desc,
                            },
                          },
                        ]);
                      }
                    }}
                  >
                    Thêm
                  </button>
                  <button className={s.hidden} onClick={handleRemove}>
                    Xóa
                  </button>
                </div>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEditMany(
                        "project",
                        "content",
                        "pos",
                        event.target.textContent
                      );
                    }
                  }}
                >
                  {data?.project?.content?.pos}
                </p>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEditMany(
                        "project",
                        "content",
                        "time",
                        event.target.textContent
                      );
                    }
                  }}
                >
                  {data?.project?.content?.time}
                </p>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEditMany(
                        "project",
                        "content",
                        "desc",
                        event.target.textContent
                      );
                    }
                  }}
                >
                  {data?.project?.content?.desc}
                </p>
              </div>
              {projects.map((item: any) => {
                return (
                  <div className={`${s.content} content`} key={item.id}>
                    <div className={`${s.menu} `}>
                      <button
                        className={s.add}
                        onClick={() => {
                          if (data?.project) {
                            setProjects([
                              ...projects,
                              {
                                id: projects.length + 1,
                                content: {
                                  pos: data.project.content.pos,
                                  time: data.project.content.time,
                                  desc: data.project.content.desc,
                                },
                              },
                            ]);
                          }
                        }}
                      >
                        Thêm
                      </button>
                      <button className={s.hidden} onClick={handleRemove}>
                        Xóa
                      </button>
                    </div>
                    <p
                      contentEditable={true}
                      onBlur={(event) => {
                        if (event.target.textContent !== null) {
                          handleEditMany(
                            "project",
                            "content",
                            "pos",
                            event.target.textContent
                          );
                        }
                      }}
                    >
                      {data?.project?.content?.pos}
                    </p>
                    <p
                      contentEditable={true}
                      onBlur={(event) => {
                        if (event.target.textContent !== null) {
                          handleEditMany(
                            "project",
                            "content",
                            "time",
                            event.target.textContent
                          );
                        }
                      }}
                    >
                      {data?.project?.content?.time}
                    </p>
                    <p
                      contentEditable={true}
                      onBlur={(event) => {
                        if (event.target.textContent !== null) {
                          handleEditMany(
                            "project",
                            "content",
                            "des",
                            event.target.textContent
                          );
                        }
                      }}
                    >
                      {data?.project?.content?.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Thông tin thêm */}
            <div className={`${s.more} cvo-block`}>
              <div className={`blockControls ${s.blockControls}`}>
                <div className="show-layout-editor">
                  <i className="fa fa-bars"></i>
                </div>
                <div className="up">
                  <CaretUpOutlined />
                </div>
                <div className="down">
                  <CaretDownOutlined />
                </div>
                <div className="hide" onClick={handleRemove} style={{width: "84px", backgroundColor: "red", color: "white"}}>
                  <i className="fa fa-minus"></i>
                  Ẩn
                </div>
              </div>
              <div className={`${s.title} title`}>
                <p contentEditable={true}>{data?.more?.title}</p>
              </div>
              <div className={`${s.content} content`}>
                <div className={`${s.menu} `}>
                  <button
                    className={s.add}
                    onClick={() => {
                      if (data?.more) {
                        setMores([
                          ...mores,
                          {
                            id: mores.length + 1,
                            content: data.more.content,
                          },
                        ]);
                      }
                    }}
                  >
                    Thêm
                  </button>
                  <button className={s.hidden} onClick={handleRemove}>
                    Xóa
                  </button>
                </div>
                <p
                  contentEditable={true}
                  onBlur={(event) => {
                    if (event.target.textContent !== null) {
                      handleEdit("more", "content", event.target.textContent);
                    }
                  }}
                >
                  {data?.more?.content}
                </p>
              </div>
              {mores.map((item) => {
                return (
                  <div className={`${s.content} content`} key={item.id}>
                    <div className={`${s.menu} `}>
                      <button
                        className={s.add}
                        onClick={() => {
                          if (data?.more) {
                            setMores([
                              ...mores,
                              {
                                id: mores.length + 1,
                                content: data.more.content,
                              },
                            ]);
                          }
                        }}
                      >
                        Thêm
                      </button>
                      <button className={s.hidden} onClick={handleRemove}>
                        Xóa
                      </button>
                    </div>
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
                      {data?.more?.content}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
