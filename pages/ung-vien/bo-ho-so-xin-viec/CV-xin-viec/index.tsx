import React, { useEffect, useState } from "react";
import style from "./styles.module.scss";
import Temp_comp from "@/components/quan-ly-chung-UV/Temp_comp";
import Intro from "@/components/ung-vien/intro/intro";
import Image from "next/image";
import { POST, POSTCUSTOM, POST_SERVER } from "@/pages/api/base-api";
import Cookies from "js-cookie";
import Link from "next/link";
import { Button } from "antd";
import { useRouter } from "next/router";
import ModalCv from "./modal-cv";
import axios from "axios";

const my_cv_data = [
  {
    image: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
    name: "SEO 01",
  },
  {
    image: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
    name: "SEO 02",
  },
  {
    image: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
    name: "SEO 03",
  },
];

const saved_cv_data = [
  {
    image: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
    name: "SEO 01",
  },
  {
    image: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
    name: "SEO 02",
  },
  {
    image: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
    name: "SEO 03",
  },
  {
    image: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
    name: "SEO 04",
  },
  {
    image: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
    name: "SEO 05",
  },
  {
    image: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
    name: "SEO 06",
  },
  {
    image: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
    name: "SEO 07",
  },
  {
    image: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
    name: "SEO 08",
  },
];

const json = "{\"css\":{\"color\":\"f4ca51\",\"font\":\"Roboto\",\"font_size\":\"normal\",\"font_spacing\":\"normal\"},\"cv_title\":\"kinh+doanh+18\",\"avatar\":\"/../upload/cv_uv/uv_31143/5DegRFahuqN3daD.jpg\",\"name\":\"Nguyễn Văn Cường\",\"position\":\"fdsaf\",\"introduction\":\"\",\"menu\":[{\"id\":\"box01\",\"order\":1,\"content\":{\"title\":\"\",\"content\":{\"type\":\"profile\",\"content\":{\"birthday\":\"19/05/1992\",\"sex\":\"Nữ\",\"phone\":\"0359506333\",\"email\":\"ff@gmail.cCm\",\"address\":\"bacninh\",\"face\":\"\"}}},\"status\":\"\"},{\"id\":\"box02\",\"order\":2,\"content\":{\"title\":\"Mục+tiêu+nghề+nghiệp++++++++++++++++++++++\",\"content\":\"Trong+cuộc+sống+hay+công+việc+tôi+luôn+đặt+mục+tiêu+cho+mình+để+phấn+đấu+hoàn+thành+nó,+là+kim+chỉ+nam+giúp+tôi+có+động+lực+để+làm+việc+hơn.<br>Mục+tiêu+ngắn+hạn:+Nhân+viên+kinh+doanh+xuất+sắc\"},\"status\":\"hide\"},{\"id\":\"box03\",\"order\":3,\"content\":{\"title\":\"Kỹ+năng\",\"content\":{\"type\":\"skill\",\"skills\":[{\"name\":\"Tin+học+văn+phòng\",\"exp\":\"50\"},{\"name\":\"Tiếng+anh+giao+tiếp\",\"exp\":\"80\"}]}},\"status\":\"hide\"},{\"id\":\"box04\",\"order\":4,\"content\":{\"title\":\"Giải+thưởng++++++++++++++++++++++\",\"content\":\"fdsaf\"},\"status\":\"\"},{\"id\":\"box05\",\"order\":5,\"content\":{\"title\":\"Chứng+chỉ++++++++++++++++++++++\",\"content\":\"dsfa\"},\"status\":\"hide\"},{\"id\":\"box06\",\"order\":6,\"content\":{\"title\":\"Sở+thích++++++++++++++++++++++\",\"content\":\"fdsafa\"},\"status\":\"\"},{\"id\":\"box07\",\"order\":7,\"content\":{\"title\":\"\"},\"status\":\"\"},{\"id\":\"box01\",\"order\":1,\"content\":{\"title\":\"\",\"content\":{\"type\":\"profile\",\"content\":{\"birthday\":\"19/05/1992\",\"sex\":\"Nữ\",\"phone\":\"0359506333\",\"email\":\"ff@gmail.cCm\",\"address\":\"bacninh\",\"face\":\"\"}}},\"status\":\"\"},{\"id\":\"box02\",\"order\":2,\"content\":{\"title\":\"Mục+tiêu+nghề+nghiệp++++++++++++++++++++++\",\"content\":\"Trong+cuộc+sống+hay+công+việc+tôi+luôn+đặt+mục+tiêu+cho+mình+để+phấn+đấu+hoàn+thành+nó,+là+kim+chỉ+nam+giúp+tôi+có+động+lực+để+làm+việc+hơn.<br>Mục+tiêu+ngắn+hạn:+Nhân+viên+kinh+doanh+xuất+sắc\"},\"status\":\"hide\"},{\"id\":\"box03\",\"order\":3,\"content\":{\"title\":\"Kỹ+năng\",\"content\":{\"type\":\"skill\",\"skills\":[{\"name\":\"Tin+học+văn+phòng\",\"exp\":\"50\"},{\"name\":\"Tiếng+anh+giao+tiếp\",\"exp\":\"80\"}]}},\"status\":\"hide\"},{\"id\":\"box04\",\"order\":4,\"content\":{\"title\":\"Giải+thưởng++++++++++++++++++++++\",\"content\":\"fdsaf\"},\"status\":\"\"},{\"id\":\"box05\",\"order\":5,\"content\":{\"title\":\"Chứng+chỉ++++++++++++++++++++++\",\"content\":\"dsfa\"},\"status\":\"hide\"},{\"id\":\"box06\",\"order\":6,\"content\":{\"title\":\"Sở+thích++++++++++++++++++++++\",\"content\":\"fdsafa\"},\"status\":\"\"},{\"id\":\"box07\",\"order\":7,\"content\":{\"title\":\"\"},\"status\":\"\"}],\"experiences\":[{\"id\":\"block01\",\"order\":1,\"content\":{\"title\":\"+trình+độ+học+vấn\",\"content\":[{\"title\":\"Đại+học+Apex\",\"date\":\"2017-2019\",\"subtitle\":\"Chuyên+ngành:+Tài+Chính+–+Ngân+Hàng\",\"content\":\"\\n++++++++++++++++++++++++Xếp+loại:+Giỏi++++++++++++++++++++++\"}]},\"status\":\"hide\"},{\"id\":\"block02\",\"order\":2,\"content\":{\"title\":\"Kinh+nghiệm+làm+việc\",\"content\":[{\"title\":\"Công+ty+cổ+phần+bánh+kẹo+Apex\",\"date\":\"2017-2019\",\"subtitle\":\"Vị+trí:+Nhân+viên+kinh+doanh\",\"content\":\"\\n++++++++++++++++++++++++-+Thiết+lập+mạng+lưới+nhà+phân+phối,+đại+lý+bánh+kẹo+khu+vực+quận+Hoàng+Mai+thông+qua:+Quảng+cáo,+giới+thiệu+chương+trình+khuyến+mãi,+…<br>-+Tiếp+cận,+chăm+sóc+khách+hàng+đại+lý+cũ+–+mới+trong+khu+vực+quận+Hoàng+Mai:+Giải+đáp+khó+khăn,+đưa+các+chương+trình+mới+của+công+ty,+báo+giá+hàng+hóa,+tư+vấn+dịch+vụ…<br>-+Đi+đến+các+đại+lý+làm+việc:+Sản+lượng+tháng,+hoa+hồng+tháng,+…<br>++++++++++++++++++++++\"}]},\"status\":\"hide\"},{\"id\":\"block03\",\"order\":3,\"content\":{\"title\":\"Hoạt+động\",\"content\":[{\"title\":\"Chương+trình+giao+lưu+Shark+Tank+với+sinh+viên.\",\"date\":\"09/2018\",\"subtitle\":\"CLB+Nhà+quản+trị+tương+lai+tại+trường+Đại+học+Apex\",\"content\":\"\\n++++++++++++++++++++++++CLB+dành+cho+những+bạn+trẻ+yêu+thích+kinh+doanh.+Ở+đó+tôi+được+học+hỏi+các+kỹ+năng:+làm+việc+nhóm,+kỹ+năng+thuyết+trình,+….++++++++++++++++++++++\"}]},\"status\":\"hide\"},{\"id\":\"block04\",\"order\":4,\"content\":{\"title\":\"Dự+án+tham+gia\",\"content\":[{\"title\":\"fdsafas\",\"date\":\"09/2018\",\"subtitle\":\"Đội+thanh+niên+xung+kích+trường\",\"content\":\"saf\"}]},\"status\":\"\"},{\"id\":\"block05\",\"order\":5,\"content\":{\"title\":\"Thông+tin+thêmfsdafa\",\"content\":[{\"date\":\"\",\"subtitle\":\"Thêm+những+thông+tin+khác+(+nếu+cần+)\",\"content\":\"\\n++++++++++++++++++++++++++++++++++++++++++++++\"}]},\"status\":\"\"},{\"id\":\"block01\",\"order\":1,\"content\":{\"title\":\"+trình+độ+học+vấn\",\"content\":[{\"title\":\"Đại+học+Apex\",\"date\":\"2017-2019\",\"subtitle\":\"Chuyên+ngành:+Tài+Chính+–+Ngân+Hàng\",\"content\":\"\\n++++++++++++++++++++++++Xếp+loại:+Giỏi++++++++++++++++++++++\"}]},\"status\":\"hide\"},{\"id\":\"block02\",\"order\":2,\"content\":{\"title\":\"Kinh+nghiệm+làm+việc\",\"content\":[{\"title\":\"Công+ty+cổ+phần+bánh+kẹo+Apex\",\"date\":\"2017-2019\",\"subtitle\":\"Vị+trí:+Nhân+viên+kinh+doanh\",\"content\":\"\\n++++++++++++++++++++++++-+Thiết+lập+mạng+lưới+nhà+phân+phối,+đại+lý+bánh+kẹo+khu+vực+quận+Hoàng+Mai+thông+qua:+Quảng+cáo,+giới+thiệu+chương+trình+khuyến+mãi,+…<br>-+Tiếp+cận,+chăm+sóc+khách+hàng+đại+lý+cũ+–+mới+trong+khu+vực+quận+Hoàng+Mai:+Giải+đáp+khó+khăn,+đưa+các+chương+trình+mới+của+công+ty,+báo+giá+hàng+hóa,+tư+vấn+dịch+vụ…<br>-+Đi+đến+các+đại+lý+làm+việc:+Sản+lượng+tháng,+hoa+hồng+tháng,+…<br>++++++++++++++++++++++\"}]},\"status\":\"hide\"},{\"id\":\"block03\",\"order\":3,\"content\":{\"title\":\"Hoạt+động\",\"content\":[{\"title\":\"Chương+trình+giao+lưu+Shark+Tank+với+sinh+viên.\",\"date\":\"09/2018\",\"subtitle\":\"CLB+Nhà+quản+trị+tương+lai+tại+trường+Đại+học+Apex\",\"content\":\"\\n++++++++++++++++++++++++CLB+dành+cho+những+bạn+trẻ+yêu+thích+kinh+doanh.+Ở+đó+tôi+được+học+hỏi+các+kỹ+năng:+làm+việc+nhóm,+kỹ+năng+thuyết+trình,+….++++++++++++++++++++++\"}]},\"status\":\"hide\"},{\"id\":\"block04\",\"order\":4,\"content\":{\"title\":\"Dự+án+tham+gia\",\"content\":[{\"title\":\"fdsafas\",\"date\":\"09/2018\",\"subtitle\":\"Đội+thanh+niên+xung+kích+trường\",\"content\":\"saf\"}]},\"status\":\"\"},{\"id\":\"block05\",\"order\":5,\"content\":{\"title\":\"Thông+tin+thêmfsdafa\",\"content\":[{\"date\":\"\",\"subtitle\":\"Thêm+những+thông+tin+khác+(+nếu+cần+)\",\"content\":\"\\n++++++++++++++++++++++++++++++++++++++++++++++\"}]},\"status\":\"\"}]}"

export default function CVXinViec() {

  const router = useRouter();

  const [isOpentModal, setIsOpenModal] = useState(false);
  const [dataCv, setDataCv] = useState<any>();
  const [cvItem, setCvItem] = useState<any>()

  const getDataCV = async () => {
    const token = Cookies.get("work247_token");
    const res = await POST('candidate/ManageCvCandiDidCreated', {}, token);
    if (res && res?.result) {
      console.log('>>> check res: ', res);
      setDataCv(res);
    } else {
      console.log('>>> check res fail: ', res);
    }

  };

  useEffect(() => {
    getDataCV()
  }, [])

  console.log('>>> check length cv: ', dataCv?.cvXinViecCuaToi.length);

  const handleXemTruocCv = (cvItemData: any) => {
    setIsOpenModal(true)
    setCvItem(cvItemData)
  }

  const handleDownloadCv = (iduser: number, idcv: number) => {
    const downloadLink = document.createElement("a");
    downloadLink.target = "_blank";
    downloadLink.href = `https://timviechay.vn/download/cv_pdf/user_${iduser}/cvid_${idcv}/${idcv}-timviechay`;
    downloadLink.download = `${idcv}-timviechay.pdf`;
    downloadLink.click();
  }

  const handleDeleteCv = async (idcv: number, cvDeleted: any) => {
    const response = await POST('candidate/CandiDeleteCV', { idcv: idcv })
    if (response && response?.result) {
      setDataCv({ ...dataCv, cvXinViecCuaToi: dataCv?.cvXinViecCuaToi?.filter((cv: any, index: number) => cv?.idcv !== cvDeleted?.idcv) })
      console.log('>>> check delete success');
    } else {
      console.log('>>> check delete fail');
    }
  }

  return (
    <>

      {/* <div dangerouslySetInnerHTML={{__html:json.html}}></div> */}
      <Temp_comp>
        <div className={style.container}>
          {/* <Intro /> */}
          <div className={style.my_cv_box}>
            <div className={style.title}>
              <p>CV XIN VIỆC CỦA TÔI</p>
              <div
                style={{ width: "50px", height: "3px", background: "#f39623" }}
              ></div>
            </div>
            <div className={style.content}>
              <Link href={`/CV/trang-chu-cv`} className={style.create_cv}>
                <Image
                  src="/images/ung-vien/cv-xin-viec/create_new.svg"
                  alt="Icon tạo mới"
                  width={79}
                  height={79}
                />
                <p>Tạo thêm hồ sơ từ các CV xin việc online</p>
              </Link>
              {dataCv?.cvXinViecCuaToi && dataCv.cvXinViecCuaToi.map((data: any, index: number) => {
                return (
                  <>

                    {/* <ModalCv
                      isOpenModal={isOpentModal}
                      onCancel={() => setIsOpenModal(false)}
                      dataCvUser={data}
                    /> */}

                    <div className={style.item_cv} key={index}>
                      <Link href={`#`}>
                        {/* <div dangerouslySetInnerHTML={{ __html: json }}></div> */}
                        <Image
                          src={data?.name_cv || ""}
                          alt="CV Mẫu"
                          width={337}
                          height={477}
                          onError={(e) => {
                            e.currentTarget.srcset = '/images/cv/cv-theo-ngon-ngu/avatar1.png'
                          }}
                        >

                        </Image>
                      </Link>
                      <div className={style.hover_img}>
                        <Button
                          className={style.f_btn}
                          onClick={() => handleXemTruocCv(data)}
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
                          className={style.s_btn}
                          // TODO Add real link /tao-cv-:slug/:slug2
                          onClick={(e) => {
                            router.push(`/sua-cv/${data?.cv_title}-${data?.idcv}`);
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
                          Sửa CV
                        </Button>

                        <Button
                          className={`${style.s_btn}`}
                          onClick={() => handleDownloadCv(data?.iduser, data?.idcv)}
                        >
                          Tải xuống
                        </Button>

                        <Button
                          className={`${style.s_btn}`}
                          onClick={() => handleDeleteCv(data?.idcv, data)}
                        >
                          Xóa CV
                        </Button>
                        <div className={style.space}></div>
                      </div>
                      <div>{data?.cv_title || ""}</div>
                      {/* <div className={style.color_box}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div> */}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className={style.saved_cv}>
            <div className={style.title}>
              <p>CV XIN VIỆC ĐÃ LƯU</p>
              <div
                style={{ width: "50px", height: "3px", background: "#f39623" }}
              ></div>
            </div>
            <div className={style.content}>
              {dataCv?.cvDaLuu && dataCv.cvDaLuu.map((data: any, index: number) => {
                return (
                  <Link href={`${'/' + data.idcv}`}>
                    <div className={style.item} key={index}>
                      <Image
                        src={data.image}
                        alt="CV Mẫu"
                        width={337}
                        height={477}
                      />
                      <p>{data.name}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <ModalCv
            isOpenModal={isOpentModal}
            onCancel={() => setIsOpenModal(false)}
            dataCvUser={cvItem}
          />
        </div>
      </Temp_comp>
    </>
  );
}
