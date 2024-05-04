import { getAllCity, useForm } from "@/functions/functions";
import s from "./KinhNghiemLamViec.module.scss";
import { useEffect, useState } from "react";
import { getDate } from "@/functions/functions";
import { POST, POSTCUSTOM } from "@/pages/api/base-api";
import { logOut } from "@/components/service/functions";
import { useRouter } from "next/router";
import { Spin } from 'antd';

interface KinhNghiemLamViecProps {
  dataExWork: any;
  handleRefreshData: () => void
}
const KinhNghiemLamViec: React.FC<KinhNghiemLamViecProps> = ({
  dataExWork,
  handleRefreshData
}) => {
  const { handleSubmit, handleChange, error_message, formFields } = useForm();
  const [changeEndTime, setChangeEndTime] = useState<boolean>(false);
  const [changeTimeStart, setChangeTimeStart] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<any>(false);
  
  const [cityAll, setCityAll] = useState<any>();
  const router = useRouter();

  const getDetialCandidate = () => {
    formFields.idkn = dataExWork?.exp_years;
    formFields.use_chucdanh = dataExWork?.use_chucdanh;
    formFields.use_cty_lamviec = dataExWork?.use_cty_lamviec;
    formFields.tg_batdau = getDate(dataExWork?.tg_batdau);
    formFields.tg_ketthuc = getDate(dataExWork?.tg_ketthuc);
    formFields.type = 1;
    formFields.them_thongtin = dataExWork?.them_thongtin;
  };

  const returnTime = (time: string) => {
    if(time) {
      return time;
    }
  } 

  const formatTime = (time: string) => {
    if(time) {
      const day = time?.split("/");
      const yearMonthDayString = `${day[2]}-${day[1]}-${day[0]}`;
      return yearMonthDayString;
    }
  };
  const getCityAll = async () => {
    setCityAll(getAllCity())
  };

  const formatTimeSubmit = (date: string) => {
    let parts = date.split("-");
    return parts[2] + "-" + parts[1] + "-" + parts[0];
  }

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const submitData = await POSTCUSTOM("candidate/CompleteProfileUV_KNLV", {
      idkn: data.exp_years,
      use_chucdanh: data.use_chucdanh,
      use_cty_lamviec: data.use_cty_lamviec,
      tg_batdau: changeTimeStart ?  data.tg_batdau.includes('/') ?  data.tg_batdau.replace(/\//g, "-") : data.tg_batdau : formatTime(data.tg_batdau),
      tg_ketthuc: changeEndTime ? data.tg_ketthuc.includes('/') ? data.tg_ketthuc.replace(/\//g, "-") : data.tg_ketthuc  : formatTime(data.tg_ketthuc) ,
      them_thongtin: data.them_thongtin,
      type: 1
    });
    if (!submitData) {
      logOut();
      router.pathname !== "/" && router.push("/");
      return 0;
    }
    if (submitData?.data?.result) {
      setIsLoading(false)
      alert("Cập nhật thông tin thành công");
      setChangeEndTime(false)
      setChangeTimeStart(false)
      await handleRefreshData()
    } else {
      setIsLoading(false)
      alert("Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCityAll();
      await getDetialCandidate();
  };

  fetchData();
  }, [dataExWork]);


  return (
    <>
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.title}>
            <div className={s.title_1}>KINH NGHIỆM LÀM VIỆC</div>
            <div className={s.title_2}></div>
          </div>

          <div className={s.form}>
            <div className={s.form_input}>
              <label htmlFor="use_chucdanh">
                Chức danh / Vị trí <span style={{ color: "red" }}>*</span>
              </label>
              <div className={s.form_input_div}>
                <input
                  value={formFields.use_chucdanh}
                  className={s.input}
                  placeholder="Nhập chức danh / vị trí"
                  name="use_chucdanh"
                  onChange={(e) => handleChange({ e, null: false })}
                ></input>
              </div>
              {error_message('use_chucdanh')}
            </div>
            <div className={s.form_input}>
              <label htmlFor="use_cty_lamviec">
                Công ty <span style={{ color: "red" }}>*</span>
              </label>
              <div className={s.form_input_div}>
                <input
                  value={formFields.use_cty_lamviec}
                  className={s.input}
                  placeholder="Nhập tên công ty"
                  name="use_cty_lamviec"
                  onChange={(e) => {
                   
                    handleChange({ e, null: false })}
                  } 
                ></input>
              </div>
                {error_message('use_cty_lamviec')}
            </div>
            <div className={s.form_input}>
              <label htmlFor="tg_batdau">
                Thời gian bắt đầu <span style={{ color: "red" }}>*</span>
              </label>
              <div className={s.form_input_div}>
                <input
                  className={s.input_date}
                  placeholder=""
                  name="tg_batdau"
                  type="date"
                  value={
                    changeTimeStart ? formFields.tg_batdau &&  returnTime(formFields.tg_batdau) : formFields.tg_batdau && formatTime(formFields.tg_batdau)
                  }
                  onChange={(e) => {
                    setChangeTimeStart(true)
                    handleChange({ e, null: false });
                    // console.log('form ', formFields);
                  }}
                ></input>
              </div>
                {error_message('tg_batdau')}
            </div>
            <div className={s.form_input}>
              <label htmlFor="tg_ketthuc">
                Thời gian kết thúc <span style={{ color: "red" }}>*</span>
              </label>
              <div className={s.form_input_div}>
                <input
                  className={s.input_date}
                  placeholder=""
                  name="tg_ketthuc"
                  type="date"
                  value={
                     changeEndTime ? formFields.tg_ketthuc && returnTime(formFields.tg_ketthuc)  : formFields.tg_ketthuc && formatTime(formFields.tg_ketthuc)
                  }
                  onChange={(e) => {
                    setChangeEndTime(true) ,
                    handleChange({ e, null: false });
                  }}
                ></input>
              </div>
                {error_message('tg_ketthuc')}
            </div>
            <div className={s.form_input} style={{ width: "100%" }}>
              <label htmlFor="them_thongtin">
                Mô tả công việc <span style={{ color: "red" }}>*</span>
              </label>
              <div className={s.form_input_div}>
                <input
                value={formFields.them_thongtin}
                  className={s.input}
                  placeholder="Ghi ngắn gọn mô tả công việc"
                  name="them_thongtin"
                  onChange={(e) => handleChange({ e, null: false })}
                ></input>
              </div>
                 {error_message('them_thongtin')}
            </div>
          </div>
          <button  
          disabled={isLoading}
          className={s.btn_submit} onClick={() => handleSubmit(onSubmit)}>
            {
             isLoading ?  <Spin/> : 'Cập nhật'
           } 
          </button>
         
        </div>
      </div>
    </>
  );
};
export default KinhNghiemLamViec;
