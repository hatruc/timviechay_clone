import React, { useState, useEffect } from "react";
import s from "./styles.module.scss";
import Temp_comp from "@/components/quan-ly-chung-UV/Temp_comp";
import Intro from "@/components/ung-vien/intro/intro";
import Image from "next/image";
import Pagination_page from "@/components/quan-ly-chung-UV/common/Pagination_page";
import { NextPage, NextPageContext } from "next";
import { getDate, getTokenServerSide } from "@/functions/functions";
import { POST, POST_SERVER } from "@/pages/api/base-api";
import { Modal } from "antd";
import ModalUpload from "@/components/dang-tai-ho-so";
import { useRouter } from "next/router";

const file_data = [
  {
    name: "HỒ_SƠ_SỐ_01.JPG",
    update_time: "10/11/2023",
    file_type: "jpg",
    file_link: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
  },
  {
    name: "HỒ_SƠ_SỐ_02.JPG",
    update_time: "10/11/2023",
    file_type: "jpg",
    file_link: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
  },
  {
    name: "HỒ_SƠ_SỐ_03.JPG",
    update_time: "10/11/2023",
    file_type: "jpg",
    file_link: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
  },
  {
    name: "HỒ_SƠ_SỐ_04.JPG",
    update_time: "10/11/2023",
    file_type: "jpg",
    file_link: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
  },
  {
    name: "HỒ_SƠ_SỐ_05.JPG",
    update_time: "10/11/2023",
    file_type: "jpg",
    file_link: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
  },
  {
    name: "HỒ_SƠ_SỐ_06.JPG",
    update_time: "10/11/2023",
    file_type: "jpg",
    file_link: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
  },
  {
    name: "HỒ_SƠ_SỐ_07.JPG",
    update_time: "10/11/2023",
    file_type: "jpg",
    file_link: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
  },
  {
    name: "HỒ_SƠ_SỐ_08.JPG",
    update_time: "10/11/2023",
    file_type: "jpg",
    file_link: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
  },
  {
    name: "HỒ_SƠ_SỐ_09.JPG",
    update_time: "10/11/2023",
    file_type: "jpg",
    file_link: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
  },
  {
    name: "HỒ_SƠ_SỐ_10.JPG",
    update_time: "10/11/2023",
    file_type: "jpg",
    file_link: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
  },
  {
    name: "HỒ_SƠ_SỐ_11.JPG",
    update_time: "10/11/2023",
    file_type: "jpg",
    file_link: "/images/ung-vien/cv-xin-viec/cv_mau.svg",
  },

];

export const getServerSideProps = async (context: NextPageContext) => {
  const token = getTokenServerSide(context)
  let data = []
  let total = 0
  const result = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_CANDI}/candidate/UploadedFiles`, { ga: 1 }, token)
  if (result?.result) {
    // console.log(result?.data)
    const fetchData = result?.data
    total = result?.total
    if (fetchData && Array.isArray(fetchData) && fetchData.length > 0) {
      for (let i = 0; i < fetchData.length; i++) {
        const element = fetchData[i];
        data.push({
          name: element?.file_name,
          update_time: getDate(element?.file_time),
          file_type: element?.file_type,
          file_link: element?.file_link,
          file_id: element?.file_id,
          hoso_type: element?.hoso_type,
        })
      }
    }
  }

  return {
    props: {
      preData: data,
      preTotal: total
    }
  }
}

const TaiLenHoSo: NextPage<{ preData: any, preTotal: any }> = ({ preData, preTotal }) => {
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<any>(preTotal || 100)
  const [firstLoad, setFirstLoad] = useState(true)
  const [modalUploadOpen, setModalUploadOpen] = useState(false)
  const [hoso_type, setHoso_type] = useState(1)
  const router = useRouter();

  // console.log(preTotal)

  function handleView(fileLink: any) {
    window.open(fileLink, "_blank");
  }

  const [fileData, setFileData] = useState(preData);
  async function handleDelete(id: any, hoso_type: any) {
    if (window.confirm("Bạn có chắc chắn muốn xóa tệp tin này?")) {
      // const updatedFileData = [...fileData];
      // updatedFileData.splice(index, 1);
      // setFileData(updatedFileData);
      // alert(hoso_type)
      const result = await POST('candidate/DeleteFile', {
        id_upload: id,
        hoso_type: hoso_type,
      })
      if (result?.result) {
        fetchData(page)
        alert(result?.message)
      } else {
        alert(result?.message)
      }
    }
  }

  const fetchData = async (page: number) => {
    let data = []
    let total = 0
    const result = await POST('candidate/UploadedFiles', { page: page })
    if (result?.result) {
      const fetchData = result?.data
      total = result?.total
      if (fetchData && Array.isArray(fetchData) && fetchData.length > 0) {
        for (let i = 0; i < fetchData.length; i++) {
          const element = fetchData[i];
          data.push({
            name: element?.file_name,
            update_time: getDate(element?.file_time),
            file_type: element?.file_type,
            file_link: element?.file_link,
            file_id: element?.file_id,
            hoso_type: element?.hoso_type,
          })
        }
      }
    }
    setFileData([...data])
    setTotal(total)
  }

  const openModal = (hoso_type: number) => {
    setHoso_type(hoso_type)
    setModalUploadOpen(true)
  }

  //chueern trang
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false)
    } else {
      fetchData(page)
    }
  }, [page])
  return (
    <>
      <Temp_comp>
        <div className={s.container}>
          {/* <Intro /> */}
          <div className={s.content_box}>
            <div className={s.list_box}>
              <div className={s.title}>
                <p>DANH SÁCH HỒ SƠ TẢI LÊN</p>
                <div
                  style={{
                    width: "50px",
                    height: "3px",
                    background: "#f39623",
                  }}
                ></div>
              </div>
              <div className={s.box_excel}>
                <a className={s.xuat_excel} onClick={() => openModal(1)}>
                  Đăng hồ sơ mới
                </a>
                <a className={s.xuat_excel} onClick={() => openModal(2)}>
                  Đăng video mới
                </a>
              </div>
              <div className={s.content}>
                {fileData.map((data: any, index: number) => {
                  return (
                    <div className={s.item} key={index}>
                      <div className={s.file}>
                        <Image
                          src="/images/ung-vien/tai-len-ho-so/file.svg"
                          alt="Icon file"
                          width={83}
                          height={83}
                        />
                        <div className={s.text}>
                          <div className={s.file_name}>{data.name}</div>
                          <div className={s.file_info}>
                            <div className={s.update_time}>
                              <p>Tải lên ngày: </p>
                              <p style={{ fontWeight: "400" }}>
                                {data.update_time}
                              </p>
                            </div>
                            <div className={s.file_type}>
                              <p>Kiểu file: </p>
                              <p style={{ fontWeight: "400" }}>
                                {data.file_type}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={s.button}>
                        <div
                          className={s.view_button}
                          onClick={() => handleView(data.file_link)}
                        >
                          <Image
                            src="/images/ung-vien/tai-len-ho-so/eye.svg"
                            alt="Icon eye"
                            width={20}
                            height={11}
                          />
                          <p>Xem</p>
                        </div>
                        <div
                          className={s.delete_button}
                          onClick={() => handleDelete(data.file_id, data.hoso_type)}
                        >
                          <Image
                            src="/images/ung-vien/tai-len-ho-so/delete.svg"
                            alt="Icon delete"
                            width={20}
                            height={20}
                          />
                          <p>Xóa</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={s.pagination}>
                <Pagination_page current={page} setCurrent={setPage} total={total} pageSize={10} />
              </div>
            </div>
          </div>
        </div>
        <ModalUpload
          hoso_type={hoso_type}
          isOpen={modalUploadOpen}
          onCancel={() => setModalUploadOpen(false)}
          onSuccess={() => fetchData(page)}
        />
      </Temp_comp>
    </>
  );
}

export default TaiLenHoSo