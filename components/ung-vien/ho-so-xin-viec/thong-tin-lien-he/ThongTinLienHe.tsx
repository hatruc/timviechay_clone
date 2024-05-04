import Image from "next/image";
import s from "./ThongTinLienHe.module.scss";
import { Select, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { useForm, city_array, getDistrict, getAllCity, handleImageSource } from "@/functions/functions";
import { POST, POSTCUSTOM } from "@/pages/api/base-api";
import { getDate } from "@/functions/functions";
import { useSWRConfig } from "swr";
import { data } from "jquery";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";

interface Thongtin {
  dataDetaiUser: any;
  handleRefreshData: () => void;
}

const ThongTinLienHe: React.FC<Thongtin> = ({ dataDetaiUser, handleRefreshData }) => {
  const { changeAva, changeName, name, ava } = useContext(NTD_UV_Context)
  const [avatar, setAvatar] = useState(dataDetaiUser?.use_logo);
  const [avatarApi, setAvatarApi] = useState<any>('');
  const [uploadAvatar, setUploadAvatar] = useState();
  const { handleSubmit, handleChange, error_message, formFields, setFormFields } = useForm();
  const [changeBirthday, setChangeBirthday] = useState<boolean>(false);
  const [cityAll, setCityAll] = useState<any>();
  const [districtAll, setDistrictAll] = useState<any>();
  const [numberCity, setNumberCity] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [district, setDistrict] = useState<any>(Number(dataDetaiUser?.use_district))

  const formatTime = (time: string) => {
    if (changeBirthday) {
      return time;
    } else {
      const day = time.split("/");
      const yearMonthDayString = `${day[2]}-${day[0]}-${day[1]}`;
      return yearMonthDayString;
    }
  };

  const getDetialCandidate = async () => {
    formFields.use_name = dataDetaiUser?.use_name;
    formFields.use_email_contact = dataDetaiUser?.use_email_contact;
    formFields.phone = dataDetaiUser?.use_phone;
    formFields.avatar = dataDetaiUser?.use_logo;
    formFields.birthday =
      dataDetaiUser?.birthday == 0 ? "" : getDate(dataDetaiUser?.birthday);
    formFields.use_city = dataDetaiUser?.use_city;
    formFields.use_district = Number(dataDetaiUser?.use_district);
    formFields.gender = dataDetaiUser?.gender;
    formFields.lg_honnhan = dataDetaiUser?.lg_honnhan;
    formFields.address = dataDetaiUser?.address;
  };

  const handleChangeFile = (e: any) => {
    const file = e.target.files[0];
    setUploadAvatar(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
    setAvatarApi(e.target.files[0])
  };

  const getCityAll = async () => {
    // const res = await POST("new/getCity", {});
    // if (res?.message === "success") {
    //   setCityAll(res.data);
    // }
    setCityAll(getAllCity())
  };

  const getDistrictAll = async () => {
    const res = await POST(
      "new/getDistrict",
      {
        id: numberCity !== 0 ? numberCity : dataDetaiUser?.use_city
      },
      ""
    );
    if (res?.message === "success") {
      setDistrictAll(res.data);
    }
  };

  const onSubmit = async (data: any) => {

    if (data.use_district != 0) {

      setIsLoading(true);

      const updateProfile = await POSTCUSTOM("candidate/CompleteProfileUV_TTCN", {
        use_name: data?.use_name,
        use_phone: data.phone,
        birthday: data.birthday,
        gender: data.gender,
        lg_honnhan: data.lg_honnhan,
        address: data.address,
        use_city: data.use_city,
        use_district: data.use_district,
        use_email_contact: data.use_email_contact,
        avatar: avatarApi
      });
      if (updateProfile?.data?.result !== true) {
        setIsLoading(false);

        alert("Cập nhật không thành công. Vui lòng thử lại!");
        return 0;
      } else {
        await handleRefreshData();

        setIsLoading(false);
        alert(`Bạn đã cập nhật thành công.`);
      }
    }
  };

  const handleChangeCity = () => {
    setFormFields({ ...formFields, use_district: 0 })
    // formFields.use_district = null
  }

  console.log('>>> check district: ', formFields.use_district);


  useEffect(() => {
    if (numberCity >= 0) {
      const newDistric = getDistrict(numberCity);
      setDistrictAll(newDistric);
    }
  }, [numberCity]);

  useEffect(() => {
    // console.log('refresh')
    const newDistric = getDistrict(dataDetaiUser?.use_city);
    setDistrictAll(newDistric);
    setAvatar(dataDetaiUser?.use_logo);
    changeAva(dataDetaiUser?.use_logo);
    changeName(dataDetaiUser?.use_name)
    getDetialCandidate();
    const fetchData = async () => {
      try {
        await Promise.all([getCityAll()]);
      } catch (error) {
        alert(`${error}`);
      }
    };
    fetchData();

  }, [dataDetaiUser]);
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

      <div className={s.container}>
        <div className={s.body}>
          <div className={s.title}>
            <div className={s.title_1}>THÔNG TIN LIÊN HỆ</div>
            <div className={s.title_2}></div>
          </div>
          <div className={s.form}>
            <div className={s.form_above}>
              <div className={s.form_above_avatar}>
                <Image
                  alt="avatar"
                  src={
                    avatar
                      ? avatar
                      // : "/images/ung-vien/ho-so-xin-viec/Group 1000007304.svg"
                      : "/images/candidate/ava_default.png"
                  }
                  width={190}
                  height={190}
                  style={{
                    borderRadius: "100%",
                    background: "#CAE6FF",
                    width: "190px",
                    height: "190px"
                  }}
                  quality={100}
                  onError={(e) => {
                    // e.target.onerror = null;
                    e.currentTarget.srcset =
                      "/images/candidate/ava_default.png";
                  }}
                ></Image>
                <div className={s.upload}>
                  <Image
                    alt="camera"
                    src={`${"/images/ung-vien/ho-so-xin-viec/img_uploadlogo.png.png"}`}
                    width={44}
                    height={44}
                    style={{
                      borderRadius: "100%",
                      background: "#CAE6FF",
                      width: "44px",
                      height: "44px"
                    }}
                    quality={100}
                  ></Image>
                  <input
                    type="file"
                    onChange={(e) => handleChangeFile(e)}
                  ></input>
                </div>
              </div>
              <div className={s.form_above_input}>
                <div className={s.form_above_input_div}>
                  <label htmlFor="use_name">
                    Họ và tên <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className={s.form_above_input_div_border}>
                    <input
                      className={s.input}
                      placeholder="Nhập họ và tên"
                      value={formFields.use_name}
                      name="use_name"
                      onChange={(e) => handleChange({ e, null: false })}
                    ></input>
                  </div>
                  {error_message("use_name")}
                </div>
                <div className={s.form_above_input_div}>
                  <label htmlFor="phone">
                    Số điện thoại <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className={s.form_above_input_div_border}>
                    <input
                      className={s.input}
                      placeholder="Nhập số điện thoại"
                      name="phone"
                      value={formFields.phone}
                      onChange={(e) =>
                        handleChange({ e, null: false, validate: "phone" })
                      }
                    ></input>
                  </div>
                  {error_message("phone")}
                </div>
                <div className={s.form_above_input_div}>
                  <label htmlFor="use_email_contact">
                    Email <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className={s.form_above_input_div_border}>
                    <input
                      className={s.input}
                      value={formFields.use_email_contact}
                      placeholder="Nhập email"
                      name="use_email_contact"
                      onChange={(e) =>
                        handleChange({ e, null: false, validate: "email" })
                      }
                    ></input>
                  </div>
                  {error_message("use_email_contact")}
                </div>
                <div className={s.form_above_input_div}>
                  <label htmlFor="birthday">
                    Ngày sinh <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className={s.form_above_input_div_border}>
                    <input
                      className={s.input_date}
                      placeholder=""
                      value={
                        formFields.birthday && formatTime(formFields.birthday)
                      }
                      name="birthday"
                      type="date"
                      onChange={(e) => {
                        handleChange({ e, null: false });
                        if (e) {
                          setChangeBirthday(true);
                        }
                      }}
                    ></input>
                  </div>
                  {error_message("birthday")}
                </div>
                <div className={s.form_above_input_div_1}>
                  <label htmlFor="gender">
                    Giới tính <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className={s.form_above_input_div_2}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <input
                        placeholder=""
                        name="gender"
                        type="radio"
                        checked={formFields.gender == 1}
                        value={1}
                        onChange={(e) => handleChange({ e, null: false })}
                      ></input>
                      <label htmlFor="gender">Nam</label>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <input
                        placeholder=""
                        name="gender"
                        type="radio"
                        checked={formFields.gender == 2}
                        value={2}
                        onChange={(e) => handleChange({ e, null: false })}
                      ></input>
                      <label htmlFor="gender">Nữ</label>
                    </div>
                  </div>
                  {error_message("gender")}
                </div>
                <div className={s.form_above_input_div_1}>
                  <label htmlFor="lg_honnhan">
                    Tình trạng hôn nhân <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className={s.form_above_input_div_2}>
                    <div style={{ display: "flex" }}>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <input
                          placeholder=""
                          name="lg_honnhan"
                          type="radio"
                          checked={formFields.lg_honnhan == 1}
                          value={1}
                          onChange={(e) => handleChange({ e, null: false })}
                        ></input>
                        <label htmlFor="marrie">Độc thân</label>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <input
                        placeholder=""
                        name="lg_honnhan"
                        type="radio"
                        checked={formFields.lg_honnhan == 2}
                        value={2}
                        onChange={(e) => handleChange({ e, null: false })}
                      ></input>
                      <label htmlFor="marrie">Đã kết hôn</label>
                    </div>
                  </div>
                  {error_message("lg_honnhan")}
                </div>
              </div>
            </div>
            <div className={s.form_under}>
              <div className={s.form_under_city}>
                <label htmlFor="use_city">
                  Tỉnh thành <span style={{ color: "red" }}>*</span>
                </label>
                <div className={s.form_under_city_select}>
                  <Select
                    value={
                      formFields.use_city !== 0
                        ? formFields.use_city
                        : "Chọn tỉnh thành"
                    }
                    defaultValue={"Chọn tỉnh thành"}
                    className={`${s.select} select_search_AI select_hs_uv`}
                    options={city_array?.filter((city) => city.cit_parent === 0).map((item: any) => ({

                      label: item.cit_name,
                      value: Number(item.cit_id)
                    }))}
                    onChange={(e: any) => {
                      // handleChange({ e, inputName: "use_city", null: false });
                      setNumberCity(e);
                      setFormFields({ ...formFields, use_district: 0, use_city: e })
                    }}
                  ></Select>
                </div>
                {error_message("use_city")}
              </div>
              <div className={s.form_under_city}>
                <label htmlFor="use_district">
                  Quận/Huyện <span style={{ color: "red" }}>*</span>
                </label>
                <div className={s.form_under_city_select}>
                  <Select
                    value={
                      formFields.use_district
                        ? formFields.use_district
                        : "Chọn quận huyện"
                    }
                    defaultValue={"Chọn quận huyện"}
                    className={`${s.select} select_search_AI select_hs_uv`}
                    options={
                      districtAll &&
                      districtAll?.map((item: any) => ({
                        label: item.label,
                        value: Number(item.value)
                      }))
                    }
                    onChange={(e) =>
                      handleChange({
                        e,
                        inputName: "use_district",
                        null: false
                      })
                    }
                  ></Select>
                </div>
                {error_message("use_district")}
              </div>
              <div className={s.form_under_address}>
                <label htmlFor="name">
                  Địa chỉ <span style={{ color: "red" }}>*</span>
                </label>
                <div className={s.form_above_input_div_border}>
                  <input
                    className={s.input}
                    value={formFields.address}
                    placeholder="Nhập địa chỉ"
                    name="address"
                    onChange={(e) => handleChange({ e, null: false })}
                  ></input>
                </div>
                {error_message("address")}
              </div>
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className={s.btn_submit}
              onClick={() => handleSubmit(onSubmit)}
            >
              {
                isLoading ? <Spin /> : 'Cập nhật'
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ThongTinLienHe;
