import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import s from "./sidebar.module.scss";
import { Button } from "antd";
import ContentAdmin from "./Content_admin";
import { CloudFilled } from "@ant-design/icons";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
import Cookies from "js-cookie";

interface SidebaAdminProps {
  isMarginTop: Boolean;
}

const SidebarAdmin = ({ isMarginTop }: SidebaAdminProps) => {
  const {
    afterUpdate,
    changeDetailAfterUpdate,
    changePointBugget,
    changePointEdit,
    changeIdRecuitment,
    changeIdBlog,
    changeIdApplication,
    changeIdPin,
    changeIdPined,
    permission,
    ChangePermission,
    newSidebar,
    changeNewSidebar,
    handleChangeHandlePermission
  } = useContext(NTD_UV_Context);
  const storedSidebar: any = localStorage.getItem("permission");

  const [isClose, setIsClose] = useState<Boolean>(false);
  const [currentPage, setCurrentPage] = useState<any>([]);
  const [numberContent, setNumberContent] = useState<number>(0);

  const ungVien = [
    {
      parent: "Ứng viên",
      mod_id: 47,
      show: false,
      add: false,
      edit: false,
      delete: false,
      child: [
        {
          id: 1,
          text: "Thêm mới"
        },
        {
          id: 2,
          text: "Ứng viên đăng ký mới"
        },
        {
          id: 3,
          text: "Ứng viên sửa, cập nhật hồ sơ"
        },
        {
          id: 4,
          text: "Ứng viên tải CV từ máy tính cá nhân"
        },
        {
          id: 5,
          text: "Ứng viên chưa hoàn thiện hồ sơ từ Website"
        },
        {
          id: 6,
          text: "Ứng viên chưa hoàn thiện hồ sơ từ App Timviec"
        },
        {
          id: 7,
          text: "Ứng viên chưa hoàn thiện hồ sơ từ App CV"
        },
        {
          id: 8,
          text: "Ứng viên ứng tuyển NTD"
        },
        {
          id: 9,
          text: "Tất cả ứng viên"
        },
        {
          id: 10,
          text: "Ứng viên bị ẩn"
        },
        {
          id: 11,
          text: "Trạng thái ứng viên NHS"
        },
        {
          id: 12,
          text: "Xuất file ứng viên"
        },
        {
          id: 13,
          text: "Ứng viên nhập từ Timviec365"
        },
        {
          id: 14,
          text: "Ứng viên nhập từ site vệ tinh"
        },
        {
          id: 15,
          text: "Ứng viên add lỗi"
        },
        {
          id: 16,
          text: "Ứng viên đăng ký lỗi"
        },
        {
          id: 17,
          text: "Xuất excel ứng viên lỗi cv"
        },
        {
          id: 18,
          text: "Thêm từ khóa nhạy cảm"
        },
        {
          id: 19,
          text: "Tải cv ứng viên"
        }
      ]
    }
  ];
  const nhaTuyenDung = [
    {
      parent: "Nhà tuyển dụng - KD",
      mod_id: 72,
      show: false,
      add: false,
      edit: false,
      delete: false,
      child: [
        {
          id: 1,
          text: "Thêm mới"
        },
        {
          id: 2,
          text: "NTD đăng ký"
        },
        {
          id: 3,
          text: "Tất cả NTD"
        },
        {
          id: 4,
          text: "NTD bị ẩn"
        },
        {
          id: 5,
          text: "NTD chưa đăng tin"
        },
        {
          id: 6,
          text: "NTD có tin sắp hết hạn"
        },
        {
          id: 7,
          text: "NTD đăng nhập"
        },
        {
          id: 8,
          text: "Gửi ứng viên (Chuyên viên gửi)"
        },
        {
          id: 9,
          text: "Gửi ứng viên (Ứng viên tự ứng tuyển)"
        },
        {
          id: 10,
          text: "	Gửi ứng viên trong ngày"
        }
      ]
    }
  ];

  const blog = [
    {
      parent: "Blog",
      mod_id: 28,
      show: false,
      add: false,
      edit: false,
      delete: false,
      child: [
        {
          id: 1,
          text: "Bài viết mới"
        },
        {
          id: 2,
          text: "Danh sách"
        }
      ]
    }
  ];

  const tinTuyenDung = [
    {
      parent: "Tin tuyển dụng - KD",
      mod_id: 73,
      show: false,
      add: false,
      edit: false,
      delete: false,
      child: [
        {
          id: 1,
          text: "NTD tự đăng"
        },
        {
          id: 2,
          text: "Danh sách lấy về"
        },
        {
          id: 3,
          text: "	Thêm mới"
        }
      ]
    }
  ];

  const point = [
    {
      parent: "Trường điểm",
      mod_id: 41,
      show: false,
      add: false,
      edit: false,
      delete: false,
      child: [
        {
          id: 1,
          text: "Thêm gói"
        },
        {
          id: 2,
          text: "Gói điểm"
        },
        {
          id: 3,
          text: "Danh sách"
        },
        {
          id: 4,
          text: "Thêm công ty"
        },
        {
          id: 5,
          text: "Lịch sử"
        },
        {
          id: 6,
          text: "Lịch sử cộng điểm"
        }
      ]
    }
  ];

  const accounts = [
    {
      parent: "Danh sách tài khoản",
      mod_id: 34,
      show: false,
      add: false,
      edit: false,
      delete: false,
      child: [
        {
          id: 1,
          text: "Thêm gói"
        },
        {
          id: 2,
          text: "Danh sách"
        }
      ]
    }
  ];

  const allSildebar = [
    ungVien,
    nhaTuyenDung,
    tinTuyenDung,
    blog,
    point,
    accounts
  ];

  const changeListNumberPage = (index: number) => {
    const isHave = currentPage.includes(index);
    if (isHave) {
      setCurrentPage(currentPage.filter((page: any) => page !== index));
    } else {
      setCurrentPage((pre: any) => [...pre, index]);
    }
  };

  const removeContextWhenClick = (idCurrentSidebar: number) => {
    if (idCurrentSidebar == 22) {
      changeIdRecuitment({
        idDetailItem: 0,
        edit: 0
      });
    } else if (idCurrentSidebar == 41) {
      changeIdBlog({
        idDetailItem: 0,
        edit: 0
      });
    } else if (idCurrentSidebar == 51) {
      changePointBugget({
        idDetailItem: 0,
        edit: 0
      });
    } else if (idCurrentSidebar == 52) {
      changePointEdit({
        idDetailItem: 0,
        edit: 0
      });
    } else if (idCurrentSidebar == 31) {
      changeIdApplication({
        idDetailItem: 0,
        edit: 0
      });
    } else if (idCurrentSidebar == 30) {
      changeIdPin({
        idDetailItem: 0,
        edit: 0
      });
      changeIdPined({
        idDetailItem: 0,
        edit: 0
      });
    }
  };

  useEffect(() => {
    if (afterUpdate) {
      setNumberContent(afterUpdate.currentNumberSidebar);
      if (numberContent == 0) {
        changeDetailAfterUpdate({
          currentNumberSidebar: 1
        });
      } else {
        changeDetailAfterUpdate({
          currentNumberSidebar: afterUpdate.currentNumberSidebar
        });
      }
    }
  }, [afterUpdate.currentNumberSidebar]);

  useEffect(() => {
    if (permission) {
      if (storedSidebar == undefined) {
        permission.map((per: any) => {
          allSildebar.map((itemSidebar: any, index: number) => {
            if (itemSidebar[0].mod_id == per.adu_admin_module_id) {
              allSildebar[index][0].show = true;
              allSildebar[index][0].add = per.adu_add ? true : false;
              allSildebar[index][0].edit = per.adu_edit ? true : false;
              allSildebar[index][0].delete = per.adu_delete ? true : false;
            }
          });
        });
        localStorage.setItem("permission", JSON.stringify(allSildebar));
        changeNewSidebar([...[],allSildebar]);
      } 
      else if(typeof permission == 'string'){
        const parsedSidebar = JSON.parse(storedSidebar);
        changeNewSidebar([...[], parsedSidebar]);
      }
  } 
}, [permission]);

  return (
    <>
      {" "}
      {newSidebar?.length > 0 &&  (
        <div
          className={s.wrapper_sidebar}
          style={{
            top: !isMarginTop ? "60px" : "11px"
          }}
        >
          <div
            className={s.admin_sidebar_wrapper}
            style={{
              width: !isClose ? "230px" : "0",
              minWidth: !isClose ? "230px" : "0",
              overflow: "hidden"
            }}
          >
            <div className={s.admin__sidebar}>
              <h3 className={s.admin__sidebar_title}>DANH MỤC QUẢN TRỊ</h3>
              <div>
                {Array.from(newSidebar[0]).map((item: any, index: any) => (
                  <>
                    {item[0]?.show && (
                      <div>
                        <div
                          key={index}
                          className={s.admin__sidebar_parent}
                          onClick={() => {
                            changeListNumberPage(index + 1);
                          }}
                        >
                          <div className={s.sidebar_parent_left}>
                            <div
                              style={{
                                position: "relative",
                                width: "12px",
                                height: "12px"
                              }}
                            >
                              {!currentPage.includes(index + 1) ? (
                                <Image
                                  src="https://work247.vn/admin/resource/images/show.png"
                                  alt=""
                                  width={12}
                                  height={12}
                                />
                              ) : (
                                <Image
                                  src="https://work247.vn/admin/resource/images/hidden.png"
                                  alt=""
                                  width={12}
                                  height={12}
                                />
                              )}
                            </div>
                            <p>{item[0].parent}</p>
                          </div>
                          <div
                            style={{
                              position: "relative",
                              width: "12px",
                              height: "12px"
                            }}
                          >
                            <Image
                              src="https://work247.vn/admin/resource/images/arrow.png"
                              alt=""
                              width={12}
                              height={12}
                            />
                          </div>
                        </div>
                        {currentPage.includes(index + 1) ? (
                          <ul className={s.admin__sidebar_childs}>
                            {item[0].child.map(
                              (itemChild: any, currentChild: any) => (
                                <li
                                  key={itemChild.id}
                                  className={s.child_text}
                                  onClick={() => {
                                    handleChangeHandlePermission({
                                      add: item[0].add,
                                      edit: item[0].edit,
                                      delete: item[0].delete
                                    });
                                    let number = Number(
                                      (index + 1).toString() +
                                        currentChild.toString()
                                    );
                                    setNumberContent(number),
                                      removeContextWhenClick(number),
                                      changeDetailAfterUpdate({
                                        currentNumberSidebar: number
                                      });
                                  }}
                                  style={{
                                    background:
                                      numberContent ==
                                      Number(
                                        (index + 1).toString() +
                                          currentChild.toString()
                                      )
                                        ? "#79C5EB"
                                        : "",
                                    color:
                                      numberContent ==
                                      Number(
                                        (index + 1).toString() +
                                          currentChild.toString()
                                      )
                                        ? "#FFFF"
                                        : ""
                                  }}
                                >
                                  <img
                                    src="https://work247.vn/admin/resource/images/4.gif"
                                    style={{
                                      width: "4px",
                                      height: "7px"
                                    }}
                                  ></img>
                                  <span>{itemChild.text}</span>
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <></>
                        )}
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
          <div onClick={() => setIsClose(!isClose)}>
            <div className={s.btn_close_sidebar}>
              <div className={s.btn_close_sidebar_box}>
                {!isClose ? (
                  <Image
                    src={
                      "https://work247.vn/admin/resource/images/bar_close.gif"
                    }
                    alt="close"
                    height={50}
                    width={9}
                  />
                ) : (
                  <Image
                    src={
                      "https://work247.vn/admin/resource/images/bar_open.gif"
                    }
                    alt="close"
                    height={50}
                    width={9}
                  />
                )}
              </div>
            </div>
          </div>
          <div
            id="admin-content"
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden"
            }}
          >
            <ContentAdmin
              lisContentShow={numberContent}
              changeActiveSidebar={(e) => setNumberContent(e)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarAdmin;
