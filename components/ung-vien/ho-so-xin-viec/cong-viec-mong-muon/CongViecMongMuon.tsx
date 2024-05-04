import { Input, Radio, Select, Space, Spin } from "antd";
import s from "./CongViecMongMuon.module.scss";
import {
  useForm,
  getCapBac,
  allCapBac,
  ExperWork,
  listMucLuongFilter,
  listHinhThucFilter,
  getList,
  getAllCity,
  city_array,
  getDistrict
} from "@/functions/functions";
import { useEffect, useState } from "react";
import { POST, POSTCUSTOM } from "@/pages/api/base-api";
import { logOut } from "@/components/service/functions";
import { useRouter } from "next/router";
import { job_array } from "@/functions/functions";

export interface CongViecMongMuonProps {
  dataDetaiUser: any;
  handleRefreshData: () => void;
}

const CongViecMongMuon: React.FC<CongViecMongMuonProps> = ({
  dataDetaiUser,
  handleRefreshData
}) => {
  const router = useRouter();
 
  const { handleSubmit, handleChange, error_message, formFields } = useForm();
  const [cityAll, setCityAll] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(false);
  const [listDistrict, setListDistrict] = useState<any>([]);
  const [currentCity, setCurrentCity] = useState<number>();
  const [ listCheckRadio, setListCheckRadio ] = useState<any>();
  const [ count, setCount ] = useState<number>(0);
  const [ isHaveCity, setIsHaveCity ] = useState<boolean>(false);
  const onChangeCurrentCity = (e: any) => {
    setCurrentCity(e);
  };

  let citys: any = [];
  let jobs: any = [];

  const tranformValue = async () => {
    await dataDetaiUser?.use_city_job.map((city: any, index: number) => {
      if (city && city.id) {
        citys.push(Number(city.id));
      }
    });
    await dataDetaiUser?.use_nganh_nghe.map((job: any, index: number) => {
      if (job && job.id) {
        jobs.push(Number(job.id));
      }
    });
    formFields.job_name = dataDetaiUser?.use_job_name;
    formFields.hinh_thuc = Number(dataDetaiUser?.work_option);
    formFields.cap_bac = Number(dataDetaiUser?.cap_bac_mong_muon);
    formFields.kinh_nghiem = dataDetaiUser?.exp_years;
    formFields.city = citys;
    formFields.district = listDistrict;
    formFields.nganh_nghe = jobs;
    formFields.muc_luong = dataDetaiUser?.salary;
    if (citys.length > 0) {
      setIsHaveCity(true)
      setCurrentCity(citys[0]);
      changeListCity(citys)
      firstGetListDitrict(citys)
    }
  };

  useEffect(() => {
    if(currentCity && count > 0) {
      const addListDistrict = getDistrict(currentCity);
      setListDistrict(addListDistrict)
    }
    setCount(1)
  }, [currentCity]);

  const firstGetListDitrict = (e: any) => {
    let districts: any = []
      e.map((value: any) => {
        const getItemDistric = getDistrict(value);
        districts.push(getItemDistric[0])
      })
      formFields.district = districts
      setListDistrict(districts)
  }


  const changeListCity = (e: any) => {

    let districts: any = []
    if(e.length > 0) {
    setIsHaveCity(true)

      e.map((value: number, index: number) => {
        if(index < 3) {
          const getItemCity = city_array.filter((city) => city.cit_id == value);
          districts.push(getItemCity[0])
        }
      })
      if(districts.length == 0) {
        formFields.district = []
      } 
    }
    else {
      setIsHaveCity(false)
      setListDistrict([])
      formFields.district = []
    }
    setListCheckRadio(districts)
    onChangeCurrentCity(e[0])
  }
 
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log(data);
    if(data.district.length > 0) {

      const submitData = await POSTCUSTOM("candidate/CompleteProfileUV_CVMM", {
        jobName: data.job_name,
        workOption: data.hinh_thuc,
        levelDesired: data.cap_bac,
        experience: data.kinh_nghiem,
        jobCity: data.city.join(","),
        category: data.nganh_nghe.join(","),
        money: data.muc_luong,
        jobDistrict: data.district.join(",")
      });
      if (!submitData) {
        logOut();
        router.pathname !== "/" && router.push("/");
        return 0;
      }
      if (submitData?.data?.result) {
        setIsLoading(false);
        alert("Cập nhật thông tin thành công");
        await handleRefreshData();
      } else {
        setIsLoading(false);
        alert("Vui lòng thử lại.");
      }
    }
  };

  const getCityAll = async () => {
    setCityAll(getAllCity());
  };

  useEffect(() => {
    const fetchData = async () => {
      tranformValue();
      await getCityAll();
    };

    fetchData();
  }, []);

  return (
    <>
      <style>
        {`
            .ant-select-selector {
              border: none !important;
            }
          `}
      </style>

      <div className={s.body}>
        <div className={s.container}>
          <div className={s.title}>
            <div className={s.title_1}>CÔNG VIỆC MONG MUỐN</div>
            <div className={s.title_2}></div>
          </div>
          <div className={s.form}>
            <div className={s.form_input}>
              <label htmlFor="job_name">
                Công việc <span style={{ color: "red" }}>*</span>
              </label>
              <div className={s.form_input_div}>
                <input
                  type="text"
                  value={formFields.job_name}
                  name="job_name"
                  placeholder="Nhập tên công việc mong muốn"
                  onChange={(e) => handleChange({ e, null: false })}
                ></input>
              </div>
              {error_message("job_name")}
            </div>
            <div className={s.form_input}>
              <label htmlFor="hinh_thuc">
                Hình thức làm việc <span style={{ color: "red" }}>*</span>
              </label>
              <div className={s.form_input_div}>
                <Select
                  value={formFields.hinh_thuc}
                  defaultValue={0}
                  className={`${s.select} select_search_AI select_hs_uv`}
                  onChange={(e) =>
                    handleChange({ e, inputName: "hinh_thuc", null: false })
                  }
                  options={listHinhThucFilter?.map((item) => {
                    if (item.value === 0)
                      return {
                        value: Number(item.value),
                        label: "Chọn hình thức làm việc"
                      };
                    return {
                      value: Number(item.value),
                      label: item.label
                    };
                  })}
                ></Select>
              </div>
              {error_message("hinh_thuc")}
            </div>
            <div className={s.form_input}>
              <label htmlFor="cap_bac">
                Cấp bậc mong muốn <span style={{ color: "red" }}>*</span>
              </label>
              <div className={s.form_input_div}>
                <Select
                  value={formFields.cap_bac ? formFields.cap_bac : 0}
                  defaultValue={"Chọn cấp bậc mong muốn"}
                  className={`${s.select} select_search_AI select_hs_uv`}
                  onChange={(e) =>
                    handleChange({ e, inputName: "cap_bac", null: false })
                  }
                  options={allCapBac?.map((item) => ({
                    label: item.label,
                    value: item.value
                  }))}
                ></Select>
              </div>
              {error_message("cap_bac")}
            </div>
            <div className={s.form_input}>
              <label htmlFor="kinh_nghiem">
                Kinh nghiệm làm việc <span style={{ color: "red" }}>*</span>
              </label>
              <div className={s.form_input_div}>
                <Select
                  value={formFields.kinh_nghiem}
                  defaultValue={"Chọn kinh nghiệm làm việc"}
                  className={`${s.select} select_search_AI select_hs_uv`}
                  onChange={(e) =>
                    handleChange({ e, inputName: "kinh_nghiem", null: false })
                  }
                  options={ExperWork?.map((item) => ({
                    label: item.label,
                    value: item.value
                  }))}
                ></Select>
              </div>
              {error_message("kinh_nghiem")}
            </div>
            <div className={s.form_input}>
              <label htmlFor="city">
                Tỉnh thành <span style={{ color: "red" }}>*</span>
              </label>
              <div className={s.form_input_div}>
                <Select
                  value={formFields.city}
                  placeholder={"Chọn tối đa 3 tỉnh thành mong muốn"}
                  className={`${s.select} select_search_AI select_hs_uv_cvmm`}
                  mode="multiple"
                  maxTagCount="responsive"
                  onChange={(e) => {
                    handleChange({
                      e,
                      inputName_arr: "city",
                      null: false,
                      validate: "3"
                    })

                    changeListCity(e)}
                  }
                  // options={cityAll?.map((item: any) => ({
                  //   label: item.cit_name,
                  //   value: Number(item.cit_id)
                  // }))}
                  options={cityAll}
                  // options={getAllCity()}
                ></Select>
              </div>
              {error_message("city")}
            </div>
            <div className={s.form_input}>
              <label htmlFor="nganh_nghe">
                Ngành nghề mong muốn <span style={{ color: "red" }}>*</span>
              </label>
              <div className={s.form_input_div}>
                <Select
                  value={formFields.nganh_nghe}
                  defaultValue={"a"}
                  placeholder={"Chọn tối đa 3 ngành nghề mong muốn"}
                  className={`${s.select} select_search_AI select_hs_uv_cvmm`}
                  mode="multiple"
                  maxTagCount="responsive"
                  onChange={(e: any) =>
                    {
                      if(!isHaveCity) {
                        handleChange({
                          e,
                          inputName_arr: "nganh_nghe",
                          null: false,
                          validate: "3"
                        })
                      } else {
                        e = []
                        handleChange({
                          e,
                          inputName_arr: "nganh_nghe",
                          null: false,
                          validate: "3"
                        })
                      }
                    }
                  }
                  options={job_array?.map((item: any) => ({
                    label: item.cat_name,
                    value: Number(item.cat_id)
                  }))}
                ></Select>
              </div>
              {error_message("nganh_nghe")}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: '100%'
              }}
            >
              <div>
                { 
                  listCheckRadio && 
                <Radio.Group onChange={(e) => onChangeCurrentCity(e.target.value)} value={currentCity}>
                    {listCheckRadio && listCheckRadio.map((city: any) => (
                      <Radio value={city.cit_id}>{city.cit_name}</Radio>
                    ))}
                </Radio.Group>
                }
              </div>
              <div className={s.form_input}>
                <label htmlFor="district">
                  Quận/ huyện <span style={{ color: "red" }}>*</span>
                </label>
                <div className={s.form_input_div}>
                  <Select
                    value={isHaveCity ? formFields.district : []}
                    placeholder={"Chọn tối đa 3 quận huyện"}
                    className={`${s.select} select_search_AI select_hs_uv_cvmm`}
                    mode="multiple"
                    maxTagCount="responsive"
                    onChange={(e) => {
                      handleChange({
                        e,
                        inputName_arr: "district",
                        null: false,
                        validate: "3"
                      });
                    }}
                    options={listDistrict}
                  ></Select>
                </div>
                {error_message("district")}
              </div>
            </div>

            <div className={s.form_input}>
              <label htmlFor="muc_luong">
                Mức lương <span style={{ color: "red" }}>*</span>
              </label>
              <div className={s.form_input_div}>
                <Select
                  value={formFields.muc_luong}
                  defaultValue={"Chọn mức lương"}
                  className={`${s.select_1} select_search_AI select_hs_uv`}
                  onChange={(e) =>
                    handleChange({ e, inputName: "muc_luong", null: false })
                  }
                  options={listMucLuongFilter?.map((item) => ({
                    label: item.label,
                    value: Number(item.value)
                  }))}
                ></Select>
              </div>
              {/* {error_message("muc_luong")} */}
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className={s.btn_submit}
              onClick={() => handleSubmit(onSubmit)}
            >
              {isLoading ? <Spin /> : "Cập nhật"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CongViecMongMuon;
