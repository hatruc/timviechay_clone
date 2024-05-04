import Box_container from "@/components/quan-ly-chung-NTD/Box_container";
import Temp_comp from "@/components/quan-ly-chung-NTD/Temp_comp";
import Pagination_page from "@/components/quan-ly-chung-NTD/common/Pagination_page";
import React, { useEffect, useRef, useState } from "react";
import styles from "./qly-danh-sach.module.scss";
import Cookies from "js-cookie";
import { POST } from "@/pages/api/base-api";
import Link from "next/link";
import { createLinkTilte, getDate } from "@/functions/functions";
import ModalDelete from "@/components/nha-tuyen-dung/modal";
import { Spin } from "antd";
import { DownloadTableExcel, downloadExcel } from "react-export-table-to-excel";

interface ItemDataProps {
  data: any;
  stt: number;
  handleFilter: () => void;
  handleConfirm: (e: any) => void;
  handleOpenModal: () => void;
}

const ItemDataRow: React.FC<ItemDataProps> = ({
  data,
  stt,
  handleFilter,
  handleConfirm,
  handleOpenModal
}) => {
  const [selectedftBox, setSelectedftBox] = useState(data.result);
  const [selectedftBox2, setSelectedftBox2] = useState("tc");
  const formatTime = (time: string) => {
    const day = time.split("/");
    const yearMonthDayString = `${day[0]}-${day[1]}-${day[2]}`;
    return yearMonthDayString;
  };

  // TODO ???
  const ChangeStatusAppli = async (id: number, status: number) => {
    const token = Cookies.get("login-ntd");
    try {
      const res = await POST(
        "/ntd/UpdateResultInterview",
        {
          id: id,
          result: status
        },
        token
      );
    } catch (error: any) {
      alert(error?.message)
    }
  };

  const handleChange = (value: any) => {
    if (value !== selectedftBox) {
      setSelectedftBox(value);
      ChangeStatusAppli(data.id, value);
    }
    setSelectedftBox(value);
  };
  return (
    <tr key={stt}>
      <td>{stt}</td>
      <td>
        <p className={styles["t-xanh"]}>
          {data.use_name}
        </p>
        {
          data.use_name &&
        <Link
          href={`/chi-tiet-ung-vien/${ createLinkTilte(data.use_name[0])}-${data.use_id}.html`}
        >
          <p className={styles["t-xanh"]}>(Xem chi tiết)</p>
        </Link>
        }
      </td>
      <td>
        <p className={styles["t-xanh"]}>
          {data.use_job_name}
        </p>
      </td>
      <td>{data?.create_time && getDate(data?.create_time)}</td>
      <td
        onClick={() => {
          handleOpenModal(), handleConfirm(data.id_hoso);
        }}
      >
        <svg
          style={{ cursor: "pointer" }}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="24"
          viewBox="0 0 18 24"
          fill="none"
        >
          <path
            d="M17.25 3.78571H12.75V2.55357C12.75 2.00893 12.5525 1.4866 12.2008 1.10148C11.8492 0.716358 11.3723 0.5 10.875 0.5H7.125C6.62772 0.5 6.15081 0.716358 5.79917 1.10148C5.44754 1.4866 5.25 2.00893 5.25 2.55357V3.78571H0.75C0.551088 3.78571 0.360322 3.87226 0.21967 4.02631C0.0790178 4.18035 0 4.38929 0 4.60714C0 4.825 0.0790178 5.03393 0.21967 5.18798C0.360322 5.34203 0.551088 5.42857 0.75 5.42857H1.54688L2.4375 21.0829C2.50406 22.4614 3.46875 23.5 4.6875 23.5H13.3125C14.5373 23.5 15.4828 22.4845 15.5625 21.0871L16.4531 5.42857H17.25C17.4489 5.42857 17.6397 5.34203 17.7803 5.18798C17.921 5.03393 18 4.825 18 4.60714C18 4.38929 17.921 4.18035 17.7803 4.02631C17.6397 3.87226 17.4489 3.78571 17.25 3.78571ZM6.02672 20.2143H6C5.80563 20.2144 5.61881 20.1319 5.4789 19.9841C5.33899 19.8364 5.25692 19.6349 5.25 19.4221L4.875 7.92212C4.86791 7.70426 4.94014 7.49225 5.07578 7.33271C5.21142 7.17318 5.39937 7.07919 5.59828 7.07143C5.79719 7.06367 5.99077 7.14277 6.13644 7.29133C6.2821 7.43989 6.36791 7.64574 6.375 7.86359L6.75 19.3636C6.75357 19.4715 6.73769 19.5791 6.70326 19.6802C6.66884 19.7814 6.61654 19.8741 6.54937 19.9531C6.48219 20.0322 6.40146 20.0959 6.31178 20.1407C6.2221 20.1855 6.12523 20.2105 6.02672 20.2143ZM9.75 19.3929C9.75 19.6107 9.67098 19.8196 9.53033 19.9737C9.38968 20.1277 9.19891 20.2143 9 20.2143C8.80109 20.2143 8.61032 20.1277 8.46967 19.9737C8.32902 19.8196 8.25 19.6107 8.25 19.3929V7.89286C8.25 7.675 8.32902 7.46607 8.46967 7.31202C8.61032 7.15797 8.80109 7.07143 9 7.07143C9.19891 7.07143 9.38968 7.15797 9.53033 7.31202C9.67098 7.46607 9.75 7.675 9.75 7.89286V19.3929ZM11.25 3.78571H6.75V2.55357C6.74943 2.49946 6.75875 2.44578 6.77739 2.39567C6.79604 2.34556 6.82364 2.30004 6.85857 2.26177C6.89351 2.22351 6.93507 2.19328 6.98083 2.17286C7.02658 2.15244 7.0756 2.14224 7.125 2.14286H10.875C10.9244 2.14224 10.9734 2.15244 11.0192 2.17286C11.0649 2.19328 11.1065 2.22351 11.1414 2.26177C11.1764 2.30004 11.204 2.34556 11.2226 2.39567C11.2413 2.44578 11.2506 2.49946 11.25 2.55357V3.78571ZM12.75 19.4221C12.7431 19.6349 12.661 19.8364 12.5211 19.9841C12.3812 20.1319 12.1944 20.2144 12 20.2143H11.9728C11.8743 20.2104 11.7775 20.1854 11.6879 20.1406C11.5983 20.0957 11.5176 20.032 11.4505 19.953C11.3833 19.874 11.3311 19.7813 11.2967 19.6801C11.2623 19.579 11.2464 19.4714 11.25 19.3636L11.625 7.86359C11.6285 7.75572 11.6514 7.64966 11.6923 7.55147C11.7332 7.45328 11.7914 7.36489 11.8636 7.29133C11.9357 7.21777 12.0203 7.16049 12.1127 7.12276C12.205 7.08503 12.3032 7.06759 12.4017 7.07143C12.5002 7.07527 12.597 7.10032 12.6867 7.14515C12.7763 7.18999 12.8571 7.25372 12.9242 7.33271C12.9914 7.41171 13.0437 7.50442 13.0781 7.60555C13.1126 7.70668 13.1285 7.81425 13.125 7.92212L12.75 19.4221Z"
            fill="#777777"
          />
        </svg>
      </td>
    </tr>
  );
};

const HoSoUngVienDaLuu = () => {
  // ftBox
  const header = ["STT", "Tên ứng viên", "Vị trí", "Ngày lưu hồ sơ"];
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [idLeter, setIdLeter] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<Boolean>();
  const [openModal, setOpenModal] = useState<Boolean>();
  const [listUser, setListUser] = useState<any>([]);
  const [dataUser, setDataUser] = useState<any>();


  const danhSachUngVien = async () => {
    setIsLoading(true);
    const token = Cookies.get("login-ntd");
    // TODO Đổi sang danh sách đã lưu
    // const res = await POST("ntd/CandidatesComeToApply", {}, token);
    const res = await POST("ntd/CandiDidSave", {
      page: page,
      pageSize: perPage
    });
    if (res?.result) {
      setIsLoading(false);
      setListUser(res);
      setDataUser(res.data);
    } else {
      setIsLoading(false);
    }
  };

 
  const confirmDelete = (idHoSo: any) => {
    setIdLeter(idHoSo);
  };

  // TODO Sửa thành xóa đã lưu
  const DeleteApplication = async () => {
    const token = Cookies.get("login-ntd");
    try {
      const res = await POST(
        "ntd/DeleteCandiDidSave",
        {
          id_hoso: idLeter
        },
        token
      );
      if (res?.result) {
        danhSachUngVien();

        alert("Xóa thành công.");
      }
    } catch (error) {
      alert("Thất bại, vui lòng thử lại.");
    }
    setOpenModal(false);
  };


  function handleDownloadExcel() {
    let  body2: any = []
    dataUser.map(async (emply: any, index: number) => {
      body2.push({
          "STT" : index + 1,
           "Tên ứng viên":emply?.use_name[0],
           "Vị trí": emply?.use_job_name[0],
           "Ngày lưu hồ sơ": getDate(emply.create_time)
      })
    });
    downloadExcel({
      fileName: "Hồ sơ ứng viên đã lưu",
      sheet: "Ứng viên đã lưu",
      tablePayload: {
        header,
        body:  body2,
      },
    });
  }

  useEffect(() => {
    danhSachUngVien();
    return () => {};
  }, [page]);


  return (
    <Temp_comp>
          <Box_container title={"HỒ SƠ ỨNG VIÊN ĐÃ LƯU"}>
            <div className={styles.box_excel}>
              <a onClick={() => handleDownloadExcel()}
                className={styles.xuat_excel}
              >
                Xuất excel
              </a>
            </div>
            <div className={styles.table_container}>
            {!isLoading ? (
              <table className={styles.table} >
                <thead>
                  <tr>
                    <th style={{ width: "4%" }}>STT</th>
                    <th style={{ width: "16%" }}>Tên ứng viên</th>
                    <th style={{ width: "22%" }}>Vị trí</th>
                    <th style={{ width: "14%" }}>Ngày lưu hồ sơ</th>
                    <th style={{ width: "4%" }}></th>
                  </tr>
                </thead>
                
                <tbody style={{
                  width: '100%',
                  position: 'relative'
                }}>
                  {dataUser &&
                    dataUser.map((data: any, index: number) => {
                      return (
                        <ItemDataRow
                          data={data}
                          stt={
                            page > 1
                              ? (page - 1) * perPage + index + 1
                              : index + 1
                          }
                          handleFilter={() => {}}
                          handleOpenModal={() => setOpenModal(true)}
                          handleConfirm={confirmDelete}
                        />
                      );
                    })}
                </tbody> 
              </table> )
              : <div style={{
                paddingTop: '370.5px',
                paddingBottom: '405.5px',
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
              }}>
              <Spin size="large" />
              </div>}
            </div>
            {dataUser?.length > 0 && (
              <Pagination_page
                current={page}
                pageSize={perPage}
                setCurrent={setPage}
                total={listUser.total}
              />
            )}
          </Box_container>
          <ModalDelete
            isOpenModal={openModal}
            onCancel={() => setOpenModal(false)}
            onDelete={() => DeleteApplication()}
          />
    </Temp_comp>
  );
}

export default HoSoUngVienDaLuu;
