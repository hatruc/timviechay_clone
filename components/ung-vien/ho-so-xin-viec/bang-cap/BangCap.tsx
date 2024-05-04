import { useEffect, useState } from "react";
import { Select } from "antd";
import s from "./BangCap.module.scss";
import { getDate, listHocVanFilter } from "@/functions/functions";
import { POST } from "@/pages/api/base-api";

interface Form {
  handleDelete: () => void;
  handleData: (e: any) => void;
  dataInit: any;
  id: number;
  isCreate: Boolean;
  isRefresh: Boolean;
}
const Form: React.FC<Form> = ({
  handleDelete,
  handleData,
  dataInit,
  id,
  isCreate,
  isRefresh
}) => {
  const [dataObject, setDataObject] = useState<any>();
  const [changeStartTime, setChnageStartTime] = useState<boolean>(false);
  const [changeEndTime, setChnageEndTime] = useState<boolean>(false);
  const [bccc, setBccc] = useState<string>("");
  const [schoolName, setSchoolName] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [majors, setMajors] = useState<string>("");
  const [ranks, setRanks] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [errorBccc, setErrorBccc] = useState<boolean>(false);
  const [errorSchoolName, setErrorSchoolName] = useState<boolean>(false);
  const [errorStart, setErrorStart] = useState<boolean>(false);
  const [errorEnd, setErrorEnd] = useState<boolean>(false);
  const [errorMajors, setErrorMajors] = useState<boolean>(false);
  const [errorRank, setErrorRank] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<boolean>(false);

  const returnTime = (time: string) => {
    return time;
  };

  const formatTime = (time: string) => {
    const day = time.split("/");
    const yearMonthDayString = `${day[2]}-${day[1]}-${day[0]}`;
    return yearMonthDayString;
  };

  const xepLoai = [
    { label: "Chọn xếp loại", value: -1 },
    { label: "Yếu", value: 1 },
    { label: "Trung bình", value: 2 },
    { label: "Khá", value: 6 },
    { label: "Giỏi", value: 3 }
  ];

  useEffect(() => {
    if (isCreate) {
      setDataObject([]);
      setBccc("");
      setSchoolName("");
      setStartTime("");
      setEndTime("");
      setMajors("");
      setRanks("");
      setType("");
    } else {
      setChnageEndTime(false);
      setChnageStartTime(false);
      setDataObject(dataInit);
      setBccc(dataInit.bang_cap);
      setSchoolName(dataInit.truong_hoc);
      setStartTime(getDate(dataInit.tg_batdau));
      setEndTime(getDate(dataInit.tg_ketthuc));
      setMajors(dataInit.chuyen_nganh);
      setRanks(dataInit.xep_loai);
      setType(dataInit.thongtin_bosung);
    }
  }, [isCreate, isRefresh]);

  return (
    <>
      <style>
        {
          `
            .ant-select-selector {
              border: none !important;
            }
          `
        }
      </style>

      <div className={`${s.form}`}>
        <div className={s.form_input}>
          <label htmlFor="c">
            Bằng cấp chứng chỉ <span style={{ color: "red" }}>*</span>
          </label>
          <div className={`${s.form_input_div}`}>
            <input
              className={`${s.input} form-bc`}
              onBlur={() => {
                if (!bccc) {
                  setErrorBccc(true);
                } else {
                  setErrorBccc(false);
                }
              }}
              value={bccc}
              placeholder="Nhập tên bằng"
              name="bccc"
              onChange={(e) => {
                if (e.target.value) {
                  setErrorBccc(false);
                } else {
                  setErrorBccc(true);
                }
                setBccc(e.target.value);
                let copy = dataObject;
                copy.id = id;
                copy.bang_cap = e.target.value;
                setDataObject(copy);
                handleData(copy);
              }}
            ></input>
          </div>
          {errorBccc && (
            <div className={`error_message`}>Vui long nhap truong nay</div>
          )}
        </div>
        <div className={s.form_input}>
          <label htmlFor="school_name">
            Tên trường, đơn vị giảng dạy <span style={{ color: "red" }}>*</span>
          </label>
          <div className={s.form_input_div}>
            <input
              className={`${s.input} form-bc`}
              onBlur={() => {
                if (!schoolName) {
                  setErrorSchoolName(true);
                }
              }}
              value={schoolName}
              placeholder="Nhập tên trường, đơn vị giảng dạy"
              name="school_name"
              onChange={(e) => {
                if (e.target.value) {
                  setErrorSchoolName(false);
                } else {
                  setErrorSchoolName(true);
                }
                setSchoolName(e.target.value);
                let copy = dataObject;
                copy.id = id;
                copy.truong_hoc = e.target.value;
                setDataObject(copy);
                handleData(copy);
              }}
            ></input>
          </div>
          {errorSchoolName && (
            <div className={`error_message`}>Vui long nhap truong nay</div>
          )}
        </div>
        <div className={s.form_input}>
          <label htmlFor="start_times">
            Thời gian bắt đầu <span style={{ color: "red" }}>*</span>
          </label>
          <div className={s.form_input_div}>
            <input
              className={`${s.input_date} form-bc`}
              onBlur={() => {
                if (!startTime) {
                  setErrorStart(true);
                }
              }}
              value={
                changeStartTime ? returnTime(startTime) : formatTime(startTime)
              }
              name="start_times"
              type="date"
              onChange={(e) => {
                setChnageStartTime(true);
                if (e) {
                  setErrorStart(false);
                } else {
                  setErrorStart(true);
                }
                setStartTime(e.target.value);
                let copy = dataObject;
                copy.id = id;
                copy.tg_batdau = e.target.value;
                setDataObject(copy);
                handleData(copy);
              }}
            ></input>
          </div>
          {errorStart && (
            <div className={`error_message`}>Vui long nhap truong nay</div>
          )}
        </div>
        <div className={s.form_input}>
          <label htmlFor="end_times">
            Thời gian kết thúc <span style={{ color: "red" }}>*</span>
          </label>
          <div className={s.form_input_div}>
            <input
              className={`${s.input_date} form-bc`}
              onBlur={() => {
                if (!endTime) {
                  setErrorEnd(true);
                }
              }}
              value={changeEndTime ? returnTime(endTime) : formatTime(endTime)}
              type="date"
              onChange={(e) => {
                setChnageEndTime(true);
                if (e) {
                  setErrorStart(false);
                  setErrorEnd(false);
                } else {
                  setErrorEnd(true);
                }
                setEndTime(e.target.value);
                let copy = dataObject;
                copy.id = id;
                copy.tg_ketthuc = e.target.value;
                setDataObject(copy);
                handleData(copy);
              }}
            ></input>
          </div>
          {errorEnd && (
            <div className={`error_message`}>Vui long nhap truong nay</div>
          )}
        </div>
        <div className={s.form_input}>
          <label htmlFor="majors">
            Chuyên ngành <span style={{ color: "red" }}>*</span>
          </label>
          <div className={`${s.form_input_div}`}>
            <input
              className={`${s.input} form-bc`}
              onBlur={() => {
                if (!majors) {
                  setErrorMajors(true);
                }
              }}
              value={majors}
              placeholder="Nhập tên chuyên ngành"
              name="majors"
              onChange={(e: any) => {
                if (e.target.value) {
                  setErrorMajors(false);
                } else {
                  setErrorMajors(true);
                }
                setMajors(e.target.value);
                let copy = dataObject;
                copy.id = id;
                copy.chuyen_nganh = e.target.value;
                setDataObject(copy);
                handleData(copy);
              }}
            ></input>
          </div>

          {errorMajors && (
            <div className={`error_message`}>Vui long nhap truong nay</div>
          )}
        </div>
        <div className={s.form_input}>
          <label htmlFor="ranks">
            Xếp loại <span style={{ color: "red" }}>*</span>
          </label>
          <div className={s.form_input_div}>
            <Select
              value={ranks ? ranks : "Chọn xếp loại"}
              onBlur={() => {
                if (!ranks) {
                  setErrorRank(true);
                }
              }}
              options={xepLoai?.map((item: any) => ({
                value: Number(item.value),
                label: item.label
              }))}
              defaultValue={-1}
              className={`${s.select} select_search_AI select_hs_uv form-bc`}
              onChange={(e: any) => {
                if (e) {
                  setErrorRank(false);
                } else {
                  setErrorRank(true);
                }
                setRanks(e);
                let copy = dataObject;
                copy.id = id;
                copy.xep_loai = e;
                setDataObject(copy);
                handleData(copy);
              }}
            ></Select>
          </div>
          {errorRank && (
            <div className={`error_message`}>Vui long nhap truong nay</div>
          )}
        </div>
        <div className={s.form_input}>
          <label htmlFor="type">Thông tin bổ sung</label>
          <div className={`${s.form_input_div} `}>
            <textarea
              name="type"
              value={type}
              className={`form-bc`}
              onBlur={() => {
                if (!type) {
                  setErrorType(true);
                }
              }}
              onChange={(e) => {
                setType(e.target.value);
                if (e.target.value) {
                  setErrorType(false);
                } else {
                  setErrorType(true);
                }
                let copy = dataObject;
                copy.id = id;
                copy.thongtin_bosung = e.target.value;
                setDataObject(copy);
                handleData(copy);
              }}
            ></textarea>
          </div>
          {errorType && (
            <div className={`error_message`}>Vui long nhap truong nay</div>
          )}
        </div>
        {!isCreate && (
          <div className={s.btn_xoa} onClick={() => handleDelete()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
            >
              <path
                d="M16.3334 4.75065C16.5352 4.75087 16.7293 4.82814 16.876 4.96666C17.0227 5.10517 17.111 5.29449 17.1229 5.49592C17.1347 5.69736 17.0691 5.8957 16.9396 6.05044C16.8101 6.20517 16.6264 6.30461 16.4261 6.32844L16.3334 6.33398H16.2693L15.5418 15.0423C15.5418 15.6481 15.3103 16.231 14.8947 16.6718C14.4792 17.1125 13.9108 17.3778 13.3061 17.4134L13.1668 17.4173H6.83343C5.56835 17.4173 4.53443 16.4285 4.46477 15.2402L4.46081 15.108L3.7301 6.33398H3.66677C3.46499 6.33376 3.27091 6.2565 3.12418 6.11798C2.97746 5.97946 2.88916 5.79015 2.87734 5.58871C2.86551 5.38728 2.93105 5.18893 3.06056 5.0342C3.19007 4.87947 3.37377 4.78002 3.57414 4.75619L3.66677 4.75065H16.3334ZM11.5834 1.58398C12.0034 1.58398 12.4061 1.7508 12.703 2.04773C13 2.34466 13.1668 2.74739 13.1668 3.16732C13.1665 3.3691 13.0893 3.56318 12.9508 3.7099C12.8122 3.85663 12.6229 3.94492 12.4215 3.95675C12.2201 3.96857 12.0217 3.90303 11.867 3.77352C11.7122 3.64402 11.6128 3.46031 11.589 3.25994L11.5834 3.16732H8.41677L8.41122 3.25994C8.38739 3.46031 8.28795 3.64402 8.13322 3.77352C7.97848 3.90303 7.78014 3.96857 7.5787 3.95675C7.37727 3.94492 7.18796 3.85663 7.04944 3.7099C6.91092 3.56318 6.83366 3.3691 6.83343 3.16732C6.83331 2.76786 6.98417 2.38312 7.25578 2.09022C7.5274 1.79732 7.89969 1.6179 8.29802 1.58794L8.41677 1.58398H11.5834Z"
                fill="#FF0000"
              />
            </svg>
            <div>Xoá</div>
          </div>
        )}
      </div>
    </>
  );
};

interface IndexProps {
  dataUser: any;
  dataEducation: any;
  handleRefreshData: () => void;
}
const Index: React.FC<IndexProps> = ({
  dataUser,
  dataEducation,
  handleRefreshData
}) => {
  const initAdd = [
    {
      bang_cap: "",
      truong_hoc: "",
      tg_batdau: "",
      tg_ketthuc: "",
      chuyen_nganh: "",
      xep_loai: "",
      thongtin_bosung: ""
    }
  ];
  const [dataAdd, setDataAdd] = useState<any>(initAdd);
  const [isEnableClick, setIsEnableClick] = useState<any>(true);
  const [refresh, setRefresh] = useState<Boolean>(false);
  const [data, setData] = useState<any>([]);
  const [create, setCreate] = useState<Boolean>(false);
  const [edu, setEdu] = useState<number>(dataUser?.use_hocvan);
  const [errorEdu, setErrorEdu] = useState<Boolean>(false);

  const formatTime = (time: string) => {
    const day = time.split("/");
    const yearMonthDayString = `${day[2]}-${day[1]}-${day[0]}`;
    return yearMonthDayString;
  };

  const handleAdd = () => {
    setCreate(true);
    setData(initAdd);
  };

  function handleCheckForm(e: any) {
    console.log(e);
    let copy = [
      {
        bang_cap: e.bang_cap,
        truong_hoc: e.truong_hoc,
        tg_batdau: e.tg_batdau,
        tg_ketthuc: e.tg_ketthuc,
        chuyen_nganh: e.chuyen_nganh,
        xep_loai: e.xep_loai,
        thongtin_bosung: e.thongtin_bosung
      }
    ];
    if (create) {
      setData(copy);
    } else {
      copy = data;
      data?.filter((item: any, index: number) => {
        if (index + 1 == e.id) {
          copy[index] = e;
          setData(copy);
        }
      });
    }
  }

  const handleSubmit = async (dataSubmit: any) => {
    if (isEnableClick) {
      const submit = await POST("candidate/CompleteProfileUV_BangCap", {
        id_bc: dataSubmit.id_hocvan,
        bccc: dataSubmit.bang_cap,
        school_name: dataSubmit.truong_hoc,
        start_times: dataSubmit.tg_batdau,
        end_times: dataSubmit.tg_ketthuc,
        majors: dataSubmit.chuyen_nganh,
        ranks: dataSubmit.xep_loai,
        hv_add_infor: dataSubmit.thongtin_bosung,
        type: create ? 1 : 2,
        hocvan: edu
      });
      if (submit?.result && submit?.result) {
        setIsEnableClick(true);
        if (create) {
          await handleRefreshData();
          setIsEnableClick(true);
          alert("Thêm thành công.");
        } else {
          setIsEnableClick(true);
          alert("Update thành công.");
        }
      } else {
        setIsEnableClick(true);
        alert("Update không thành công. Vui lòng thử lại!");
      }
    }
  };

  const showLastData = async (e: any) => {
    let error = false;

    data.forEach((item: any, index: number) => {
      for (let key in item) {
        if (!item[key]) {
          error = true;
        }
      }
    });
    if (!error) {
      const mergedData: any = {};
      data.forEach((data: any) => {
        Object.keys(data).forEach((key) => {
          if (!mergedData[key]) {
            mergedData[key] = [];
          }
          if (data[key] > 100000) {
            const dataDate = formatTime(getDate(data[key]));
            mergedData[key].push(dataDate);
          } else {
            mergedData[key].push(data[key]);
          }
        });
      });
      await handleSubmit(mergedData);
    } else {
      alert("Vui lòng điền đầy đủ các trường.");
    }
  };

  const handleDelete = async (id: number) => {
    const submit = await POST("candidate/DeleteProfile_BangCap", {
      id: id
    });
    // console.log(submit);
    if (submit?.result) {
      await handleRefreshData();
      alert("Xóa thành công.");
    } else {
      alert("Thất bại, vui lòng thử lại.");
    }
  };

  useEffect(() => {
    setData(dataEducation);
    setCreate(false);
    setRefresh(!refresh)
  }, [dataEducation]);

  return (
    <>
      <div className={s.body} id="bang_cap">
        <div className={s.container}>
          <div className={s.title}>
            <div className={s.title_1}>BẰNG CẤP</div>
            <div className={s.title_2}></div>
          </div>

          <div className={s.form_input_div}>
            <label htmlFor="type" style={{
              color: '#333',
              fontFamily: 'Roboto',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: 'normal'
            }}>Học vấn</label>
            <Select
              style={{
                width: "100%",
                marginTop: "8px",
                border: "1px solid #d9d9d9",
                borderRadius: "10px",
                height: "50px",
                padding: "10px 20px"
              }}
              value={edu ? edu : "Chọn trình độ học vấn"}
              onBlur={() => {
                if (!edu) {
                  setErrorEdu(true);
                }
              }}
              options={listHocVanFilter?.map((item: any, index: number) => {
                if (index == 0) {
                  return { value: Number(item.value), label: "Chọn trình độ học vấn" };
                } else {
                  return { value: Number(item.value), label: item.label };
                }
              })}
              defaultValue={-1}
              className={`${s.select} select_search_AI select_hs_uv form-bc`}
              onChange={(e: any) => {
                console.log("e", e);
                if (e) {
                  setErrorEdu(false);
                } else {
                  setErrorEdu(true);
                }
                setEdu(e);
              }}
            ></Select>
            {errorEdu && (
              <div className={`error_message`} style={{
                marginTop: '8px'
              }}>Vui long nhap truong nay</div>
            )}
          </div>
          {data?.map((item: any, index: number) => (
            <Form
              dataInit={item}
              key={index}
              id={index + 1}
              handleDelete={() => handleDelete(item.id_hocvan)}
              handleData={(e) => handleCheckForm(e)}
              isCreate={create}
              isRefresh={refresh}
            ></Form>
          ))}
          <div className={s.btn}>
            {!create ? (
              <div className={s.btn_add} onClick={() => handleAdd()}>
                <div className={s.btn_add_icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M14.875 6.375H10.625V2.125C10.625 1.56141 10.4011 1.02091 10.0026 0.622398C9.60409 0.223883 9.06359 0 8.5 0C7.93641 0 7.39591 0.223883 6.9974 0.622398C6.59888 1.02091 6.375 1.56141 6.375 2.125L6.45044 6.375H2.125C1.56141 6.375 1.02091 6.59888 0.622398 6.9974C0.223883 7.39591 0 7.93641 0 8.5C0 9.06359 0.223883 9.60409 0.622398 10.0026C1.02091 10.4011 1.56141 10.625 2.125 10.625L6.45044 10.5496L6.375 14.875C6.375 15.4386 6.59888 15.9791 6.9974 16.3776C7.39591 16.7761 7.93641 17 8.5 17C9.06359 17 9.60409 16.7761 10.0026 16.3776C10.4011 15.9791 10.625 15.4386 10.625 14.875V10.5496L14.875 10.625C15.4386 10.625 15.9791 10.4011 16.3776 10.0026C16.7761 9.60409 17 9.06359 17 8.5C17 7.93641 16.7761 7.39591 16.3776 6.9974C15.9791 6.59888 15.4386 6.375 14.875 6.375Z"
                      fill="#3582CD"
                    />
                  </svg>
                </div>
                <div className={s.btn_add_text}>Thêm bằng cấp</div>
              </div>
            ) : (
              <div></div>
            )}
            <button
              type="submit"
              className={s.btn_submit}
              onClick={(e) => showLastData(e)}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Index;
