import Box_container from "@/components/quan-ly-chung-NTD/Box_container";
import Temp_comp from "@/components/quan-ly-chung-NTD/Temp_comp";
import Pagination_page from "@/components/quan-ly-chung-NTD/common/Pagination_page";
import { useEffect, useRef, useState } from "react";
import styles from "./qly-danh-sach.module.scss";
import Link from "next/link";
import Cookies from "js-cookie";
import { POST } from "@/pages/api/base-api";
import { Modal, Select, Spin } from "antd";
import { DownloadTableExcel, downloadExcel } from "react-export-table-to-excel";
import ModalDelete, { ModalNote } from "@/components/nha-tuyen-dung/modal";
import { createLinkTilte, getDate } from "@/functions/functions";
import { format } from "date-fns";

interface ItemDataProps {
  data: any;
  stt: number;
  handleFilter: () => void;
  handleConfirm: (e: any) => void;
  handleOpenModal: (e: string, text: any) => void;
}

const ItemDataRow: React.FC<ItemDataProps> = ({
  data,
  stt,
  handleFilter,
  handleConfirm,
  handleOpenModal
}) => {
  const [selectedftBox, setSelectedftBox] = useState(data.type_err);

  const formatHour = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const formattedHour = format(date, "HH:mm");
    return formattedHour;
  };
  const formatTime = (time: string) => {
    const day = time.split("/");
    const yearMonthDayString = `${day[0]}/${day[1]}/${day[2]}`;
    return yearMonthDayString;
  };

  const ChangeStatusAppli = async (id: number, status: number) => {
    const token = Cookies.get("login-ntd");
    try {
      const res = await POST(
        "ntd/UpdateStatusCandiFilterPoint",
        {
          use_id: id,
          status: status
        },
        token
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (value: any) => {
    if (value !== selectedftBox) {
      setSelectedftBox(value);
      ChangeStatusAppli(data.use_id, value);
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
        <Link
          href={`/chi-tiet-ung-vien/${createLinkTilte(data.use_name)}-${data.use_id}.html`}
        >
          <p className={styles["t-xanh"]}>(Xem chi tiết)</p>
        </Link>
      </td>
      <td>{data.status ? data.status : "Đã mở"}</td>
      <td>
        {formatHour(data.used_day)} - {formatTime(getDate(data.used_day))}
      </td>
      <td>
        <p className={styles["t-xanh"]}>
          {data.use_job_name}
        </p>
      </td>
      <td>
        <p className={styles["t-xanh"]}>{data.point}</p>
      </td>
      <td>
        <p
          className={styles["t-xanh"]}
          style={{
            display: "flex"
          }}
          onClick={() => {
            handleOpenModal("note", {
              text: data.note_uv,
              use_id: data.use_id
            });
          }}
        >
          <svg
            style={{ marginRight: "8px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M12.7143 6.60714C12.7143 8.22686 12.0709 9.78023 10.9255 10.9255C9.78023 12.0709 8.22686 12.7143 6.60714 12.7143C4.98743 12.7143 3.43405 12.0709 2.28874 10.9255C1.14343 9.78023 0.5 8.22686 0.5 6.60714C0.5 4.98743 1.14343 3.43405 2.28874 2.28874C3.43405 1.14343 4.98743 0.5 6.60714 0.5C8.22686 0.5 9.78023 1.14343 10.9255 2.28874C12.0709 3.43405 12.7143 4.98743 12.7143 6.60714ZM7.28571 3.89286C7.28571 3.71289 7.21422 3.54029 7.08697 3.41303C6.95971 3.28578 6.78711 3.21429 6.60714 3.21429C6.42717 3.21429 6.25458 3.28578 6.12732 3.41303C6.00006 3.54029 5.92857 3.71289 5.92857 3.89286V5.92857H3.89286C3.71289 5.92857 3.54029 6.00006 3.41303 6.12732C3.28578 6.25458 3.21429 6.42717 3.21429 6.60714C3.21429 6.78711 3.28578 6.95971 3.41303 7.08697C3.54029 7.21422 3.71289 7.28571 3.89286 7.28571H5.92857V9.32143C5.92857 9.5014 6.00006 9.67399 6.12732 9.80125C6.25458 9.92851 6.42717 10 6.60714 10C6.78711 10 6.95971 9.92851 7.08697 9.80125C7.21422 9.67399 7.28571 9.5014 7.28571 9.32143V7.28571H9.32143C9.5014 7.28571 9.67399 7.21422 9.80125 7.08697C9.92851 6.95971 10 6.78711 10 6.60714C10 6.42717 9.92851 6.25458 9.80125 6.12732C9.67399 6.00006 9.5014 5.92857 9.32143 5.92857H7.28571V3.89286ZM16.1071 4.57143H13.7905C13.6577 4.10263 13.4791 3.64805 13.2571 3.21429H16.1071C17.007 3.21429 17.87 3.57175 18.5063 4.20803C19.1425 4.84431 19.5 5.7073 19.5 6.60714V12.4239C19.4995 12.9636 19.2847 13.481 18.9029 13.8624L13.8624 18.9042C13.4808 19.2856 12.9634 19.4999 12.4239 19.5H6.60714C5.7073 19.5 4.84431 19.1425 4.20803 18.5063C3.57175 17.87 3.21429 17.007 3.21429 16.1071V13.2571C3.6445 13.477 4.09779 13.6561 4.57143 13.7905V16.1071C4.57143 16.647 4.7859 17.1648 5.16768 17.5466C5.54945 17.9284 6.06724 18.1429 6.60714 18.1429H11.3571V15.4286C11.3571 14.3488 11.7861 13.3132 12.5496 12.5496C13.3132 11.7861 14.3488 11.3571 15.4286 11.3571H18.1429V6.60714C18.1429 6.06724 17.9284 5.54945 17.5466 5.16768C17.1648 4.7859 16.647 4.57143 16.1071 4.57143ZM12.7143 18.0777C12.7848 18.0446 12.8491 17.9996 12.9043 17.9447L17.9447 12.9029C17.9995 12.8481 18.0445 12.7843 18.0777 12.7143H15.4286C14.7087 12.7143 14.0183 13.0003 13.5093 13.5093C13.0003 14.0183 12.7143 14.7087 12.7143 15.4286V18.0777Z"
              fill="#4C72DF"
            />
          </svg>
          Xem ghi chú
          <span
            style={{
              display: "none"
            }}
          >
            {data.note_uv}
          </span>
        </p>
      </td>
      <td>
        <Select
          defaultValue={2}
          value={selectedftBox}
          style={{
            width: 120
          }}
          onChange={handleChange}
          options={[
            {
              value: 0,
              label: "Trạng thái"
            },
            {
              value: 1,
              label: "Đã có việc"
            },
            {
              value: 2,
              label: "Không nghe máy"
            },
            {
              value: 3,
              label: "Sai thông tin"
            },
            {
              value: 4,
              label: "Khác"
            }
          ]}
        />
      </td>
      <td
        onClick={() => {
          handleOpenModal("delete", {
            text: "",
            use_id: data.use_id
          }),
            handleConfirm(data.use_id);
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

const UngvienDiemLoc = () => {
  const tableRef = useRef(null);
  const header = ["STT", "Vị trí tuyển dụng", "Trạng thái", "Ngày xem hồ sơ", "Điểm lọc", "Ghi chú", "Giải pháp tuyển dụng"];
  const [openModal, setOpenModal] = useState<Boolean>();
  const [openModalNote, setOpenModalNote] = useState<Boolean>();
  const [textNote, setTextNote] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [idLeter, setIdLeter] = useState<number>(0);
  // const [isOpenDanhGia1, setIsOpenDanhGia1] = useState(false);
  const [isLoading, setIsLoading] = useState<Boolean>();
  const [listUser, setListUser] = useState<any>([]);
  // const [filterStatus, setFilterStatus] = useState<any>();
  const [dataUser, setDataUser] = useState<any>();

  const [selectedftBox, setSelectedftBox] = useState(0);
  const [selectedftBox2, setSelectedftBox2] = useState(0);
  const handleSelectChangeftBox = (event: any) => {
    setSelectedftBox(event.target.value);
  };
  // Modal xem ghi chu
  const [isModalOpen, setIsModalOpen] = useState<Record<number, boolean>>({});

  const handleOpenModal = (id: any) => {
    setIsModalOpen((prevState) => ({ ...prevState, [id]: true }));
  };

  const handleCloseModal = (id: any) => {
    setIsModalOpen((prevState) => ({ ...prevState, [id]: false }));
  };

  const danhSachUngVien = async () => {
    setIsLoading(true);
    const token = Cookies.get("login-ntd");
    const res = await POST(
      "ntd/CandiFilterPoint",
      {
        page: page,
        perPage: perPage,
        filter1: selectedftBox,
        filter2: selectedftBox2
      },
      token
    );
    if (res?.result) {
      setIsLoading(false);
      setListUser(res);
      setDataUser(res.data);
    } else {
      setIsLoading(false);
    }
  };

  const handleSelectChangeftBox2 = (e: any) => {
   setSelectedftBox2(e)
  };

  // const handleClose = () => {
  //   // setIsOpenLetter(false);
  //   setIsOpenDanhGia1(false);
  //   // setIsOpenDanhGia2(false);
  // };
  // const handleGuiDanhGia1 = () => {
  //   setIsOpenDanhGia1(false);
  // };

  const confirmDelete = (idHoSo: any) => {
    setIdLeter(idHoSo);
  };

  const DeleteApplication = async () => {
    const token = Cookies.get("login-ntd");
    try {
      const res = await POST(
        "ntd/DeleteCandiFilterPoint",
        {
          use_id: idLeter
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

  const changeNote = async (e: string) => {
    const token = Cookies.get("login-ntd");
    try {
      const res = await POST(
        "ntd/UpdateNoteCandiFilterPoint",
        {
          use_id: idLeter,
          note: e
        },
        token
      );
      if (res?.result) {
        setOpenModalNote(false);
        danhSachUngVien();
        setTextNote("");
        alert("Cập nhật thành công.");
      }
    } catch (error) {
      alert("Thất bại, vui lòng thử lại.");
    }
  };

  const handleChooseModalOpen = (type: string, text: any) => {
    // console.log("parent", text);
    if (type == "delete") {
      setOpenModal(true);
    } else {
      setTextNote(text?.text);
      setIdLeter(text?.use_id);
      setOpenModalNote(true);
    }
  };


  const convertDate = (timestamp: number) => {
    let date = new Date(timestamp * 1000);
    let hours: any = date.getHours();
    let minutes: any = date.getMinutes();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    let day: any = date.getDate();
    let month:any = date.getMonth() + 1; 
    let year = date.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    const result =  hours + ':' + minutes + ' - ' + day + '/' + month + '/' + year;
    return result
  }
  
  function handleDownloadExcel() {
    let  body2: any = []
    dataUser.map(async (emply: any, index: number) => {
      let status: string = ''
      switch (emply.type_err) {
        case 0 :
          status = "Trạng thái"
          break;
        case 1 :
          status = "Đã có việc"
        case 2 :
          status = "Không nghe máy"
          break;
        case 3 :
          status = "Trạng thái"
          break;
        case 4 :
          status = "Khác"
          break;
        default:
          break
      }
      body2.push({
          "STT" : index + 1,
           "Vị trí tuyển dụng":emply.use_name,
           "Trạng thái": emply.use_job_name,
           "Ngày xem hồ sơ": convertDate(emply.used_day) ,
           "Điểm lọc": emply.return_point,
           "Ghi chú": emply.note_uv,
           "Giải pháp tuyển dụng": status
      })
    })
    downloadExcel({
      fileName: "Danh sách Ứng viên từ điểm lọc",
      sheet: "Ứng viên từ điểm lọc",
      tablePayload: {
        header,
        body:  body2,
      },
    });
  }

  useEffect(() => {
    danhSachUngVien();
    return () => {};
  }, [selectedftBox, selectedftBox2, page]);
  return (
    <Temp_comp>
      <Box_container title={"ỨNG VIÊN TỪ ĐIỂM LỌC"}>
        <div className={styles.filter_box}>
          <select
            className={styles.ft_uvut + " " + styles.ft1}
            value={selectedftBox}
            onChange={handleSelectChangeftBox}
          >
            <option value={0}>Tất cả</option>
            <option value={2}>Điểm mất phí</option>
            <option value={1}>Điểm miễn phí</option>
          </select>{" "}
          <select
            className={styles.ft_uvut + " " + styles.ft2}
            value={selectedftBox2}
            onChange={(e) => handleSelectChangeftBox2(e.target.value)}
          >
            <option value="tc">Tất cả</option>
            <option value={0}>Trạng thái</option>
            <option value={1}>Đã có việc</option>
            <option value={2}>Không nghe máy</option>
            <option value={3}>Sai thông tin</option>
            <option value={4}>Khác</option>
          </select>
        </div>
        <div className={styles.box_excel}>
            <a onClick={() => handleDownloadExcel()} className={styles.xuat_excel}>Xuất excel</a>
        </div>
        <div className={styles.table_container}>
          {!isLoading ? (
            <table className={styles.table} >
              <thead>
                <tr>
                  <th style={{ width: "4%" }}>STT</th>
                  <th style={{ width: "16%" }}>Vị trí tuyển dụng</th>
                  <th style={{ width: "10%" }}>Trạng thái</th>
                  <th style={{ width: "14%" }}>Ngày xem hồ sơ</th>
                  <th style={{ width: "22%" }}>Vị trí</th>
                  <th style={{ width: "6%" }}>Điểm lọc</th>
                  <th style={{ width: "12%" }}>Ghi chú</th>
                  <th style={{ width: "12%" }}>Giải pháp tuyển dụng</th>
                  <th style={{ width: "4%" }}></th>
                </tr>
              </thead>
              <tbody>
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
                        handleOpenModal={(e) =>
                          handleChooseModalOpen(e, {
                            text: data.note_uv,
                            use_id: data.use_id
                          })
                        }
                        handleConfirm={confirmDelete}
                      />
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div
              style={{
                paddingTop: "370.5px",
                paddingBottom: "405.5px",
                display: "flex",
                justifyContent: "center",
                width: "100%"
              }}
            >
              <Spin size="large" />
            </div>
          )}
        </div>
        {dataUser?.length > 0 && <Pagination_page total={listUser.total} />}
      </Box_container>
      <ModalDelete
        isOpenModal={openModal}
        onCancel={() => setOpenModal(false)}
        onDelete={() => DeleteApplication()}
      />
      <ModalNote
        text={textNote ? textNote : ""}
        isOpenModal={openModalNote}
        onCancel={() => {
          setTextNote(""), setOpenModalNote(false);
        }}
        onDelete={(e: string) => changeNote(e)}
      />
    </Temp_comp>
  );
};

export default UngvienDiemLoc;
