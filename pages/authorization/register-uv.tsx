/* eslint-disable @next/next/no-css-tags */
import {
  cookiePhone,
  cookieStep1,
  cookieTempId,
  getPropOrDefault,
  useLoading,
} from "@/components/service/functions";
import { Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { axiosWork247 } from "../api/api_work247";
import { registerStep1, registerStep1Type } from "../api/handle_uv";
import styles from "./register-uv.module.scss";
import { useRouter } from "next/router";
import { POST } from "../api/base-api";
import Cookies from "js-cookie";
import { getAllCity, getDistrict, getJob, handleImageSource } from "@/functions/functions";
import Select_form from "@/components/quan-ly-chung-NTD/account/select_form";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";

interface optionType {
  value: number | string;
  label: string;
}

const Register = () => {
  const { url, changeUrl } = useContext(NTD_UV_Context)
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  const [isRePasswordVisible, setRePasswordVisibility] = useState(false);
  const toggleRePasswordVisibility = () => {
    setRePasswordVisibility(!isRePasswordVisible);
  };
  // xử lý upload ảnh
  const [avatar, setAvatar] = useState("");
  const [avatarApi, setAvatarApi] = useState<any>("");
  // const [isValidPhone, setIsValidPhone] = useState(true)
  // const [errMsgPhone, setErrMsgPhone] = useState('')
  const [optionCity, setOptionCity] = useState<optionType[]>(getAllCity()); // Lưu danh sách tỉnh thành
  const [optionNganhNghe, setOptionNganhNghe] = useState<optionType[]>(getJob()); // Lưu danh sách ngành nghề
  const [optionDistrict, setOptionDistrict] = useState<any[]>([])
  const [isCreateCv, setIsCreateCv] = useState(true); // Lưu cách của bước 2
  const router = useRouter();
  const [disableButton, setDisableButton] = useState(false);
  const { contextHolder, startMessage, stopMessage } = useLoading();
  const [cityChosen, setCityChosen] = useState<number[]>([])

  useEffect(() => {
    let arrDistrict = []
    if (cityChosen.length > 0) {
      console.log('lon hon 0', cityChosen.length, cityChosen);
      for (let i = 0; i < cityChosen.length; i++) {
        const element = cityChosen[i];
        arrDistrict.push(...getDistrict(element))
      }
      console.log('arrDistrict', arrDistrict);
      setOptionDistrict(arrDistrict)
    } else {
      setValue('district', [])
    }

    return () => { };
  }, [cityChosen])

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
    setAvatarApi(event.target.files[0]);
  };
  // console.log(avatarApi);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    getValues,
    setError,
    setValue,
  } = useForm({
    defaultValues: {
      sdt: "",
      name: "",
      password: "",
      confirmPassword: "",
      position: "",
      career: [],
      location: [],
      district: []
    },
  });

  const onSubmit = async (data: any) => {
    setDisableButton(true);
    // startMessage('Đang xử lý yêu cầu của bạn...')
    // // console.log(data);
    const formData: any = {
      phoneTK: data.sdt,
      password: data.password,
      rePassword: data.confirmPassword,
      jobName: data.position,
      nganhNghe: data.career,
      jobCity: data.location,
      jobDistrict: data.district,
      name: data.name,
      // Image: avatarApi,
    };
    if (avatarApi) formData.Image = avatarApi;
    // console.log(formData)

    const result = await POST("user/RegisterCandidate", formData);
    setDisableButton(false);
    if (result?.result) {
      alert("Đăng ký bước 1 thành công");
      // alert(`${result?.message}`);
      Cookies.set(cookieStep1, "1");
      Cookies.set(cookieTempId, `${result?.data}`);
      Cookies.set(cookiePhone, data.sdt);
      if (isCreateCv) {
        window.location.href = "/CV/trang-chu-cv"
      } else {
        router.push("/dang-ky-dang-tai-cv");
      }
      // router.push(`/${isCreateCv ? "CV/trang-chu-cv" : "dang-ky-dang-tai-cv"}`);
    } else {
      alert(`${result?.message}`);
    }
  };
  return (
    <>
      {contextHolder}
      <link rel="stylesheet" href="styles/register_select.css" />
      <div className={styles.wrapper_layout}>
        <Link href={"/dang-ky"}>
          <div
            style={{
              position: "absolute",
              left: "10px",
              top: "15px",
              width: "50px",
              height: "50px",
              zIndex: 10,
            }}
          >
            <svg
              width="31"
              height="18"
              viewBox="0 0 31 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.7194 2.84785C11.0127 2.52683 11.1724 2.10225 11.1648 1.66354C11.1572 1.22483 10.9829 0.806251 10.6787 0.495988C10.3744 0.185726 9.96389 0.00800433 9.53366 0.000263828C9.10342 -0.00747668 8.68703 0.155368 8.37221 0.454493L1.17357 7.79261L0 8.98928L1.17357 10.186L8.37 17.5241C8.68307 17.8327 9.10249 18.0036 9.53793 17.9999C9.97337 17.9963 10.39 17.8184 10.698 17.5046C11.0061 17.1908 11.1809 16.7661 11.1849 16.3221C11.1889 15.8781 11.0217 15.4502 10.7194 15.1307L6.35721 10.6827H29.3393C29.7797 10.6827 30.2021 10.5043 30.5136 10.1867C30.825 9.86913 31 9.43841 31 8.98928C31 8.54016 30.825 8.10944 30.5136 7.79186C30.2021 7.47429 29.7797 7.29587 29.3393 7.29587H6.35721L10.7194 2.84785Z"
                fill="#F8F8F8"
              />
            </svg>
          </div>
        </Link>
        <div className={styles.wrapper_body}>
          <div className={styles.wrapper_content}>
            <div className={styles.container_left}>
              <div className={styles.content_left}>
                <div className={styles.wrapper_img}>
                  <Image
                    height={124}
                    width={377}
                    src="/images/authorization/img_right.png"
                    alt=""
                  />
                </div>
                <p className={styles.title}>
                  Tìm việc nhanh, tuyển dụng hiệu quả
                </p>
              </div>
              <Image
                height={354}
                width={606}
                src="/images/authorization/img_bot_left.svg"
                className={styles.images_bot}
                alt=""
              ></Image>
            </div>
            <form
              className={styles.container_right}
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className={styles.title_right}>
                ĐĂNG KÝ TÀI KHOẢN NGAY, ĐÓN NHẬN GỢI Ý VIỆC LÀM HAY
              </p>
              <div className={styles.box_top_info}>
                <div className={styles.box_avatar}>
                  <label className={styles.form_title}>Ảnh đại diện</label>
                  {
                    avatar ? (
                      <div className={styles.up_avatar}>
                        <Image
                          className={styles.avatar}
                          src={avatar}
                          alt=""
                          height={90}
                          width={90}
                        />
                        <label htmlFor="up_avatar">
                          <Image
                            height={28}
                            width={28}
                            className={styles.nut_up}
                            src={"/images/authorization/img_uploadlogo.png"}
                            alt=""
                            style={{ cursor: "pointer" }}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className={styles.up_avatar}>
                        <Image
                          className={styles.avatar}
                          src="/images/candidate/ava_default.png"
                          alt=""
                          height={90}
                          width={90}
                        />
                        <label htmlFor="up_avatar">
                          <Image
                            height={28}
                            width={28}
                            className={styles.nut_up}
                            src={"/images/authorization/img_uploadlogo.png"}
                            alt=""
                            style={{ cursor: "pointer" }}
                          />
                        </label>
                      </div>
                    )
                    // <label htmlFor="up_avatar">
                    //         <Image src={'/images/candidate/ava_default.png'} alt='' height={90} width={90} style={{borderRadius: '50%'}} />
                    //     </label>
                  }
                  <input
                    type="file"
                    hidden
                    id="up_avatar"
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png, .gif"
                  />
                </div>
                <div className={styles.form_gr}>
                  <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                    <label htmlFor="sdt" className={styles.form_title}>
                      Tài khoản (Số điện thoại){" "}
                      <span className={styles.red_star}>*</span>
                    </label>
                    <Controller
                      name="sdt"
                      control={control}
                      rules={{
                        required: "Vui lòng nhập số điện thoại",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Số điện thoại không hợp lệ",
                        },
                        // validate: {
                        //     isValidPhone: (value) => isValidPhone || errMsgPhone
                        // }
                      }}
                      render={({ field }) => (
                        <>
                          <input
                            type="text"
                            {...field}
                            className={`${styles.form_control} ${styles.numbersonly} ${styles.valid}`}
                            placeholder="Vui lòng nhập số điện thoại"
                          // onChange={(e) => {
                          //     field.onChange(e)
                          //     setIsValidPhone(true)
                          // }}
                          />
                          {errors.sdt &&
                            typeof errors.sdt?.message === "string" && (
                              <span className={styles.text_error}>
                                {errors.sdt?.message}
                              </span>
                            )}
                        </>
                      )}
                    />
                  </div>
                  <div className={`${styles.form_reg} ${styles.reg_right_50}`}>
                    <label htmlFor="name" className={styles.form_title}>
                      Họ và tên <span className={styles.red_star}>*</span>
                    </label>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: "Vui lòng nhập name",
                      }}
                      render={({ field }) => (
                        <>
                          <input
                            type="text"
                            {...field}
                            className={`${styles.form_control} ${styles.valid}`}
                            placeholder="Nhập họ tên"
                          />
                          {errors.name &&
                            typeof errors.name?.message === "string" && (
                              <span className={styles.text_error}>
                                {errors.name?.message}
                              </span>
                            )}
                        </>
                      )}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={styles.icon_input}
                    >
                      <path
                        d="M10 8.22222C10.4086 8.22222 10.8131 8.14175 11.1906 7.9854C11.568 7.82906 11.911 7.59989 12.1999 7.311C12.4888 7.02211 12.7179 6.67914 12.8743 6.30168C13.0306 5.92422 13.1111 5.51967 13.1111 5.11111C13.1111 4.70255 13.0306 4.298 12.8743 3.92054C12.7179 3.54308 12.4888 3.20012 12.1999 2.91122C11.911 2.62233 11.568 2.39317 11.1906 2.23682C10.8131 2.08047 10.4086 2 10 2C9.17488 2 8.38356 2.32778 7.80011 2.91122C7.21667 3.49467 6.88889 4.28599 6.88889 5.11111C6.88889 5.93623 7.21667 6.72755 7.80011 7.311C8.38356 7.89445 9.17488 8.22222 10 8.22222ZM2 17.4667V18H18V17.4667C18 15.4756 18 14.48 17.6124 13.7191C17.2716 13.0501 16.7277 12.5062 16.0587 12.1653C15.2978 11.7778 14.3022 11.7778 12.3111 11.7778H7.68889C5.69778 11.7778 4.70222 11.7778 3.94133 12.1653C3.27234 12.5062 2.72843 13.0501 2.38756 13.7191C2 14.48 2 15.4756 2 17.4667Z"
                        fill="#777777"
                        stroke="#777777"
                        strokeWidth="2.91667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                    <label htmlFor="txtpassword" className={styles.form_title}>
                      Mật khẩu <span className={styles.red_star}>*</span>
                    </label>
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: "Vui lòng nhập mật khẩu",
                        validate: {
                          minLength: (value: any) => {
                            const trimmedValue = value.replace(/\s/g, "");
                            return (
                              trimmedValue.length >= 6 ||
                              "Mật khẩu phải có ít nhất 6 ký tự"
                            );
                          },
                          noSpace: (value: any) =>
                            !/\s/.test(value) ||
                            "Mật khẩu không được chứa khoảng trắng",
                          containsAlphaNumeric: (value: any) =>
                            /^(?=.*[A-Za-z])(?=.*\d).+$/.test(value) ||
                            "Mật khẩu phải bao gồm có ít nhất 1 chữ và 1 số.",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <input
                            type={isPasswordVisible ? "text" : "password"}
                            {...field}
                            className={styles.form_control}
                            maxLength={20}
                            placeholder="Nhập mật khẩu"
                          />
                          {errors.password && (
                            <span className={styles.text_error}>
                              {errors.password.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                    {isPasswordVisible ? (
                      <svg
                        onClick={togglePasswordVisibility}
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="12"
                        viewBox="0 0 22 12"
                        fill="none"
                        className={styles.icon_input_show}
                      >
                        <path
                          d="M11 0C1.7875 0 0 6.65217 0 6.65217C0 6.65217 3.025 12 10.8625 12C18.7 12 22 6.78261 22 6.78261C22 6.78261 20.2125 0 11 0ZM7.2875 1.95652C7.975 1.56522 9.075 1.56522 9.075 1.56522C9.075 1.56522 8.3875 2.73913 8.3875 3.65217C8.3875 4.56522 8.6625 5.08696 8.6625 5.08696L7.15 5.34783C7.15 5.34783 6.7375 4.69565 6.7375 3.78261C6.7375 2.73913 7.2875 1.95652 7.2875 1.95652ZM10.8625 10.6957C5.225 10.6957 2.3375 7.69565 1.5125 6.52174C1.925 5.60869 3.025 3.65217 5.775 2.34783C5.6375 2.86956 5.5 3.3913 5.5 4.04348C5.5 6.91304 7.975 9.26087 11 9.26087C14.025 9.26087 16.5 6.91304 16.5 4.04348C16.5 3.3913 16.3625 2.86956 16.225 2.34783C18.975 3.52174 20.075 5.60869 20.4875 6.52174C19.525 7.69565 16.6375 10.6957 10.8625 10.6957Z"
                          fill="#777777"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={togglePasswordVisibility}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className={styles.icon_input}
                      >
                        <path
                          d="M16.125 6.5L15.125 7.5C17.25 8.625 18.25 10.375 18.625 11.25C17.75 12.375 15.125 15.125 9.875 15.125C9 15.125 8.375 15 7.625 14.875L6.625 15.875C7.625 16.25 8.75 16.375 9.875 16.375C17 16.375 20 11.375 20 11.375C20 11.375 19.25 8.375 16.125 6.5Z"
                          fill="#777777"
                        />
                        <path
                          d="M15 8.875C15 8.5 15 8.125 14.875 7.875L8.875 13.75C9.25 13.75 9.625 13.875 10 13.875C12.75 13.875 15 11.625 15 8.875ZM19.125 0L13.625 5.5C12.625 5.25 11.375 5 10 5C1.625 5 0 11.375 0 11.375C0 11.375 1.25 13.625 4.125 15.125L0 19.125V20H0.875L20 0.875V0H19.125ZM5 14.125C3 13.25 1.875 11.875 1.375 11.25C1.75 10.375 2.75 8.5 5.25 7.25C5.125 7.75 5 8.25 5 8.875C5 10.25 5.625 11.625 6.625 12.5L5 14.125ZM7.75 9.875L6.5 10.125C6.5 10.125 6.125 9.5 6.125 8.625C6.125 7.625 6.625 6.75 6.625 6.75C7.25 6.375 8.25 6.375 8.25 6.375C8.25 6.375 7.625 7.5 7.625 8.5C7.5 9.375 7.75 9.875 7.75 9.875Z"
                          fill="#777777"
                        />
                      </svg>
                    )}
                  </div>
                  <div className={`${styles.form_reg} ${styles.reg_right_50}`}>
                    <label
                      htmlFor="txtrepassword"
                      className={styles.form_title}
                    >
                      Nhập lại mật khẩu
                      <span className={styles.red_star}>*</span>
                    </label>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{
                        required: "Vui lòng nhập lại mật khẩu",
                        validate: (value: any) =>
                          value === getValues("password") ||
                          "Mật khẩu không khớp",
                      }}
                      render={({ field }) => (
                        <>
                          <input
                            type={isRePasswordVisible ? "text" : "password"}
                            {...field}
                            className={styles.form_control}
                            maxLength={20}
                            placeholder="Nhập lại mật khẩu"
                          />
                          {errors.confirmPassword && (
                            <span className={styles.text_error}>
                              {errors.confirmPassword.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                    {isRePasswordVisible ? (
                      <svg
                        onClick={toggleRePasswordVisibility}
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="12"
                        viewBox="0 0 22 12"
                        fill="none"
                        className={styles.icon_input_show}
                      >
                        <path
                          d="M11 0C1.7875 0 0 6.65217 0 6.65217C0 6.65217 3.025 12 10.8625 12C18.7 12 22 6.78261 22 6.78261C22 6.78261 20.2125 0 11 0ZM7.2875 1.95652C7.975 1.56522 9.075 1.56522 9.075 1.56522C9.075 1.56522 8.3875 2.73913 8.3875 3.65217C8.3875 4.56522 8.6625 5.08696 8.6625 5.08696L7.15 5.34783C7.15 5.34783 6.7375 4.69565 6.7375 3.78261C6.7375 2.73913 7.2875 1.95652 7.2875 1.95652ZM10.8625 10.6957C5.225 10.6957 2.3375 7.69565 1.5125 6.52174C1.925 5.60869 3.025 3.65217 5.775 2.34783C5.6375 2.86956 5.5 3.3913 5.5 4.04348C5.5 6.91304 7.975 9.26087 11 9.26087C14.025 9.26087 16.5 6.91304 16.5 4.04348C16.5 3.3913 16.3625 2.86956 16.225 2.34783C18.975 3.52174 20.075 5.60869 20.4875 6.52174C19.525 7.69565 16.6375 10.6957 10.8625 10.6957Z"
                          fill="#777777"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={toggleRePasswordVisibility}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className={styles.icon_input}
                      >
                        <path
                          d="M16.125 6.5L15.125 7.5C17.25 8.625 18.25 10.375 18.625 11.25C17.75 12.375 15.125 15.125 9.875 15.125C9 15.125 8.375 15 7.625 14.875L6.625 15.875C7.625 16.25 8.75 16.375 9.875 16.375C17 16.375 20 11.375 20 11.375C20 11.375 19.25 8.375 16.125 6.5Z"
                          fill="#777777"
                        />
                        <path
                          d="M15 8.875C15 8.5 15 8.125 14.875 7.875L8.875 13.75C9.25 13.75 9.625 13.875 10 13.875C12.75 13.875 15 11.625 15 8.875ZM19.125 0L13.625 5.5C12.625 5.25 11.375 5 10 5C1.625 5 0 11.375 0 11.375C0 11.375 1.25 13.625 4.125 15.125L0 19.125V20H0.875L20 0.875V0H19.125ZM5 14.125C3 13.25 1.875 11.875 1.375 11.25C1.75 10.375 2.75 8.5 5.25 7.25C5.125 7.75 5 8.25 5 8.875C5 10.25 5.625 11.625 6.625 12.5L5 14.125ZM7.75 9.875L6.5 10.125C6.5 10.125 6.125 9.5 6.125 8.625C6.125 7.625 6.625 6.75 6.625 6.75C7.25 6.375 8.25 6.375 8.25 6.375C8.25 6.375 7.625 7.5 7.625 8.5C7.5 9.375 7.75 9.875 7.75 9.875Z"
                          fill="#777777"
                        />
                      </svg>
                    )}
                  </div>
                  <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                    <label htmlFor="position" className={styles.form_title}>
                      Vị trí mong muốn{" "}
                      <span className={styles.red_star}>*</span>
                    </label>
                    <Controller
                      name="position"
                      control={control}
                      rules={{
                        required: "Vui lòng nhập vị trí mong muốn",
                      }}
                      render={({ field }) => (
                        <>
                          <input
                            type="text"
                            {...field}
                            className={styles.form_control}
                            id="position"
                            placeholder="Nhập vị trí mong muốn"
                          />
                          {errors.position && (
                            <span className={styles.text_error}>
                              {errors.position.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      className={styles.icon_input}
                    >
                      <path
                        d="M1.6 14C1.16 14 0.783201 13.8556 0.469601 13.5667C0.156001 13.2779 -0.000531975 12.9311 1.35823e-06 12.5263V4.42105C1.35823e-06 4.01579 0.156801 3.66874 0.470401 3.3799C0.784001 3.09105 1.16053 2.94688 1.6 2.94737H4.8V1.47369C4.8 1.06842 4.9568 0.721369 5.2704 0.432527C5.584 0.143685 5.96053 -0.000489977 6.4 1.25101e-06H9.6C10.04 1.25101e-06 10.4168 0.144422 10.7304 0.433264C11.044 0.722106 11.2005 1.06891 11.2 1.47369V2.94737H14.4C14.84 2.94737 15.2168 3.09179 15.5304 3.38063C15.844 3.66947 16.0005 4.01628 16 4.42105V12.5263C16 12.9316 15.8432 13.2786 15.5296 13.5675C15.216 13.8563 14.8395 14.0005 14.4 14H1.6ZM6.4 2.94737H9.6V1.47369H6.4V2.94737Z"
                        fill="#777777"
                      />
                    </svg>
                  </div>
                  <div className={`${styles.form_reg} ${styles.reg_right_50}`}>
                    <label htmlFor="txtlastname" className={styles.form_title}>
                      Ngành nghề<span className={styles.red_star}>*</span>
                    </label>
                    <Controller
                      name="career"
                      control={control}
                      rules={{
                        validate: (value: any) => {
                          // Custom validation logic
                          if (value?.length < 1) {
                            return "Vui lòng chọn ít nhất một lựa chọn.";
                          }
                          if (value?.length > 3) {
                            return "Bạn chỉ có thể chọn tối đa ba lựa chọn.";
                          }
                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            // className="select-address"
                            // className={`${styles.form_reg} ${styles.reg_right_50} ${styles.select_address}`}
                            mode="multiple"
                            placeholder="Chọn ngành nghề"
                            onChange={(location) => {
                              if (location.length > 3) {
                                return 0;
                              } else {
                                field.onChange(location);
                              }
                              // Additional logic if needed
                            }}
                            style={{
                              width: "98%",
                              marginLeft: "1%",
                              // overflow: 'hidden'
                            }}
                            size="large"
                            filterOption={(inputValue, option: any) => {
                              return option?.label?.toLowerCase()?.includes(inputValue?.toLowerCase())
                            }
                            }
                            options={optionNganhNghe}
                          />
                          {errors.career && (
                            <span className={styles.text_error}>
                              {errors.career.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </div>
                  {/* <Select_form control={control} errors={formState.errors} select_title='Lĩnh vực hoạt động' key_select='financial_sector'
                                        defaultValue={info?.financial_sector.length === 0 ? null : info?.financial_sector?.map((item: any) => Number(item?.id))}
                                        option_arr={optionJob} left_50 multiple={true}
                                    /> */}
                  <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                    <label htmlFor="txtlastname" className={styles.form_title}>
                      Tỉnh, thành làm việc{" "}
                      <span className={styles.red_star}>*</span>
                    </label>
                    <Controller
                      name="location"
                      control={control}
                      rules={{
                        validate: (value: any) => {
                          // Custom validation logic
                          if (value?.length < 1) {
                            return "Vui lòng chọn ít nhất một lựa chọn.";
                          }
                          if (value?.length > 3) {
                            return "Bạn chỉ có thể chọn tối đa ba lựa chọn.";
                          }
                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            // className="select-address"
                            mode="multiple"
                            placeholder="Chọn tỉnh, thành"
                            onChange={(location) => {
                              if (location.length > 3) {
                                return 0;
                              } else {
                                setCityChosen(location)
                                field.onChange(location);
                              }
                              // Additional logic if needed
                            }}
                            style={{
                              width: "98%",
                              marginLeft: "1%",
                            }}
                            filterOption={(inputValue, option: any) => {
                              return option?.label?.toLowerCase()?.includes(inputValue?.toLowerCase())
                            }
                            }
                            size="large"
                            options={optionCity}
                          />
                          {errors.location && (
                            <span className={styles.text_error}>
                              {errors.location.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className={`${styles.form_reg} ${styles.reg_right_50}`}>
                    <label htmlFor="txtlastname" className={styles.form_title}>
                      Quận, huyện làm việc{" "}
                      <span className={styles.red_star}>*</span>
                    </label>
                    <Controller
                      name="district"
                      control={control}
                      rules={{
                        validate: (value: any) => {
                          // Custom validation logic
                          if (value?.length < 1) {
                            return "Vui lòng chọn ít nhất một lựa chọn.";
                          }
                          if (value?.length > 3) {
                            return "Bạn chỉ có thể chọn tối đa ba lựa chọn.";
                          }
                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            // className="select-address"
                            mode="multiple"
                            placeholder="Chọn quận, huyện"
                            onChange={(district) => {
                              if (district.length > 3) {
                                return 0;
                              } else {
                                field.onChange(district);
                              }
                              // Additional logic if needed
                            }}
                            style={{
                              width: "98%",
                              marginLeft: "1%",
                            }}
                            filterOption={(inputValue, option: any) => {
                              return option?.label?.toLowerCase()?.includes(inputValue?.toLowerCase())
                            }
                            }
                            size="large"
                            options={optionDistrict}
                          />
                          {errors.district && (
                            <span className={styles.text_error}>
                              {errors.district.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.box_confirm}>
                <p className={styles.title}>
                  Chọn 1 trong 2 cách sau để lưu và hoàn thiện hồ sơ
                </p>
                <div className={styles.box_choose}>
                  <div className={styles.cv_online}>
                    <p>Cách 1:</p>
                    <div className={styles.btn_cv}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M13.2599 3.60022L5.04985 12.2902C4.73985 12.6202 4.43985 13.2702 4.37985 13.7202L4.00985 16.9602C3.87985 18.1302 4.71985 18.9302 5.87985 18.7302L9.09985 18.1802C9.54985 18.1002 10.1799 17.7702 10.4899 17.4302L18.6999 8.74022C20.1199 7.24022 20.7599 5.53022 18.5499 3.44022C16.3499 1.37022 14.6799 2.10022 13.2599 3.60022Z"
                          stroke="#377ABB"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.8901 5.0498C12.3201 7.8098 14.5601 9.9198 17.3401 10.1998"
                          stroke="#377ABB"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 22H21"
                          stroke="#377ABB"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <button
                        type="submit"
                        disabled={disableButton}
                        style={{
                          cursor: disableButton ? "not-allowed" : "pointer",
                        }}
                        onClick={(e) => setIsCreateCv(true)}
                      >
                        Tạo CV online từ Timviechay
                      </button>
                    </div>
                  </div>
                  <div className={styles.cv_local}>
                    <p>Hoặc cách 2:</p>
                    <div className={styles.btn_cv2}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M9.49994 17.75C9.08994 17.75 8.74994 17.41 8.74994 17V12.81L8.02994 13.53C7.73994 13.82 7.25994 13.82 6.96994 13.53C6.67994 13.24 6.67994 12.76 6.96994 12.47L8.96994 10.47C9.17994 10.26 9.50994 10.19 9.78994 10.31C10.0699 10.42 10.2499 10.7 10.2499 11V17C10.2499 17.41 9.90994 17.75 9.49994 17.75Z"
                          fill="#F8971C"
                        />
                        <path
                          d="M11.4999 13.7499C11.3099 13.7499 11.1199 13.6799 10.9699 13.5299L8.96994 11.5299C8.67994 11.2399 8.67994 10.7599 8.96994 10.4699C9.25994 10.1799 9.73994 10.1799 10.0299 10.4699L12.0299 12.4699C12.3199 12.7599 12.3199 13.2399 12.0299 13.5299C11.8799 13.6799 11.6899 13.7499 11.4999 13.7499Z"
                          fill="#F8971C"
                        />
                        <path
                          d="M15.5 22.75H9.5C4.07 22.75 1.75 20.43 1.75 15V9C1.75 3.57 4.07 1.25 9.5 1.25H14.5C14.91 1.25 15.25 1.59 15.25 2C15.25 2.41 14.91 2.75 14.5 2.75H9.5C4.89 2.75 3.25 4.39 3.25 9V15C3.25 19.61 4.89 21.25 9.5 21.25H15.5C20.11 21.25 21.75 19.61 21.75 15V10C21.75 9.59 22.09 9.25 22.5 9.25C22.91 9.25 23.25 9.59 23.25 10V15C23.25 20.43 20.93 22.75 15.5 22.75Z"
                          fill="#F8971C"
                        />
                        <path
                          d="M22.5 10.75H18.5C15.08 10.75 13.75 9.41999 13.75 5.99999V1.99999C13.75 1.69999 13.93 1.41999 14.21 1.30999C14.49 1.18999 14.81 1.25999 15.03 1.46999L23.03 9.46999C23.24 9.67999 23.31 10.01 23.19 10.29C23.07 10.57 22.8 10.75 22.5 10.75ZM15.25 3.80999V5.99999C15.25 8.57999 15.92 9.24999 18.5 9.24999H20.69L15.25 3.80999Z"
                          fill="#F8971C"
                        />
                      </svg>
                      <button
                        type="submit"
                        disabled={disableButton}
                        style={{
                          cursor: disableButton ? "not-allowed" : "pointer",
                        }}
                        onClick={(e) => setIsCreateCv(false)}
                      >
                        Tải CV từ máy tính của bạn
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.redirect_login}>
                <div className={styles.content}>
                  <p className={styles.ask}>Bạn đã có tài khoản?</p>
                  <Link
                    href={"/dang-nhap-ung-vien"}
                    className={styles.now_login}
                  >
                    ĐĂNG NHẬP NGAY
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
