/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Temp_comp from "@/components/quan-ly-chung-NTD/Temp_comp";
import Intro from "@/components/nha-tuyen-dung/quan-ly-chung/Intro/Intro";
import style from "./styles.module.scss";
import Link from "next/link";
import DOMPurify from 'dompurify';
import { useForm, Controller } from "react-hook-form";
import { Select, DatePicker } from "antd";
import Textarea from "@/components/quan-ly-chung-UV/input/textarea";
import Input_form from "@/components/quan-ly-chung-UV/input/input_form";
import Select_form from "@/components/quan-ly-chung-UV/input/select_form";
import Date_form from "@/components/quan-ly-chung-UV/input/date_form";
import { ExperWork, allCapBac, getAllCity, getDistrict, getJob, getList, gioiTinh, listHinhThucFilter, listHocVanFilter, listMucLuongFilter } from "@/functions/functions";
import { NextPage, NextPageContext } from "next";
import { POST, POST_SERVER } from "@/pages/api/base-api";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { checkLogin, logOut } from "@/components/service/functions";
import Cookies from "js-cookie";
const { Option } = Select;
const options: any = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

export const getServerSideProps = async (context: NextPageContext) => {
  const id = context.query.id
  let existData = {}
  if (id) {
    const resultExistData = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_NEW}/new/DetailNew`, { id: id })
    if (resultExistData?.result) {
      existData = resultExistData?.data
    }
  }
  return {
    props: {
      existData: existData,
    }
  }
}

const DangTinMoi: NextPage<{ existData: any }> = ({ existData }) => {
  const router = useRouter()
  const [district, setDistrict] = useState(getDistrict())
  const [selectedCity, setSelectedCity] = useState<any[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const { reset, handleSubmit, control, register, formState, setError, getValues, setValue, watch } = useForm({});
  const [info, setInfo] = useState<any>()

  // console.log(getValues('job'))

  async function fetchData() {
    const id = Cookies.get('id');
    try {
      const response = await POST('ntd/DetailNTD', { id })
      // console.log(response)
      setInfo(response?.data)
      // const date = new Date(response?.data?.usc_create_time)
      // let month = date.getMonth() + 1
      // let day = date.getDate()
      // setDate(`${date?.getFullYear()}-${month <= 9 ? `0${month}` : month}-${day <= 9 ? `0${day}` : day}`)
    } catch (error) {
      alert('Có lỗi xảy ra vui lòng thử lại')
      router.push('/nha-tuyen-dung/quan-ly-chung');
    }
  }
  useEffect(() => {
    fetchData();
  }, [])


  const onSubmit = async (data: any) => {
    const formData = {
      title: `${data?.position}`,
      capBac: `${data?.level}`,
      catId: Array.isArray(data?.job) ? data.job.join(',') : `${data?.job}`,
      // city: `${data?.province}`,
      city: Array.isArray(data?.province) ? data.province.join(',') : `${data?.province}`,
      // district: `${data?.district}`,
      district: Array.isArray(data?.district) ? data.district.join(',') : `${data?.district}`,
      address: `${data?.address}`,
      hinhThuc: `${data?.formality}`,
      money: `${data?.salary}`,
      soLuong: `${data?.quanlity}`,
      thuViec: `${data?.trial_time}`,
      hoaHong: `${data?.commission}`,
      moTa: `${data?.job_desc}`,
      exp: `${data?.experience}`,
      bangCap: `${data?.degree}`,
      gioiTinh: `${data?.gender}`,
      yeuCau: `${data?.yeuCau}`,
      quyenLoi: `${data?.benefits}`,
      hoSo: `${data?.forms}`,
      hanNop: `${data?.deadline}`,
      userContact: `${data?.name}`,
      addressContact: `${data?.address_contact}`,
      phoneContact: `${data?.phone}`,
      emailContact: `${data?.email}`,
      idNew: existData ? existData?.new_id : ''
    }
    const result = await POST(isEdit ? 'new/UpdateNew' : `new/postNew`, formData)
    if (result?.result) {
      alert(result?.message)
      reset();
      router.push('/nha-tuyen-dung/tin-da-dang')
    } else {
      alert(result?.message)
    }
  };
  const handleReset = () => {
    if (window.confirm('Những gì bạn đã nhập sẽ bị mất. \nTiếp tục hủy đăng tin?')) {
      reset();
      router.push('/nha-tuyen-dung/tin-da-dang')
    }
  };
  function extractTextFromHTML(htmlString: string) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html');
    const sanitizedHTML = DOMPurify.sanitize(htmlString);
    const sanitizedDoc = parser.parseFromString(sanitizedHTML, 'text/html')
    const paragraphs = sanitizedDoc.querySelectorAll('p');
    paragraphs.forEach(paragraph => {
      paragraph.textContent += '\n';
    });
    // Process list items: add a newline character after each <li> element
    const listItems = sanitizedDoc.querySelectorAll('li');
    listItems.forEach(listItem => {
      listItem.textContent += '\n';
    });
    // Return the concatenated text content of the document body
    return sanitizedDoc.body.textContent || "";
  }
  const showExistData = async () => {
    if (existData && typeof existData === 'object' && Object.entries(existData).length > 0) {
      // console.log(existData)
      const new_mota = extractTextFromHTML(existData?.new_mota);
      const new_yeucau = extractTextFromHTML(existData?.new_yeucau);
      const new_quyenloi = extractTextFromHTML(existData?.new_quyenloi);
      const new_ho_so = extractTextFromHTML(existData?.new_ho_so);
      setValue('position', existData?.new_title)
      setValue('level', existData?.new_cap_bac)
      // setValue('job', Number(existData?.new_cat_id))
      setValue('job', typeof existData?.new_cat_id === 'string' ? existData.new_cat_id.split(',').map((item: any) => Number(item)) : existData.new_cat_id)
      // setValue('province', Number(existData?.new_city_id))
      setValue('province', typeof existData?.new_city_id === 'string' ? existData.new_city_id.split(',').map((item: any) => Number(item)) : existData.new_city_id)
      // setDistrict(getDistrict(Number(existData?.new_city_id)))
      setSelectedCity(getValues('province'))
      // setValue('district', Number(existData?.new_qh_id))
      setValue('district', typeof existData?.new_qh_id === 'string' ? existData.new_qh_id.split(',').map((item: any) => Number(item)) : existData.new_qh_id)
      setValue('address', existData?.new_addr)
      setValue('formality', Number(existData?.new_hinh_thuc))
      setValue('salary', Number(existData?.new_money))
      setValue('quanlity', Number(existData?.new_so_luong))
      setValue('trial_time', existData?.new_thuviec)
      setValue('commission', existData?.new_hoahong)
      setValue('job_desc', new_mota)
      setValue('experience', existData?.new_exp)
      setValue('degree', existData?.new_bang_cap)
      setValue('gender', Number(existData?.new_gioi_tinh))
      setValue('yeuCau', new_yeucau)
      setValue('benefits', new_quyenloi)
      setValue('forms', new_ho_so)
      setValue('deadline', format(new Date(existData?.new_han_nop * 1000), 'yyyy-MM-dd'))
      setValue('name', existData?.new_usercontact)
      setValue('address_contact', existData?.new_addcontact)
      setValue('phone', existData?.new_phonecontact)
      setValue('email', existData?.new_emailcontact)
      setIsEdit(true)
    }
  }

  useEffect(() => {
    if (!checkLogin(1)) {
      logOut()
      router.push('/')
    }
    return () => { };
  }, [])

  useEffect(() => {
    showExistData()
    return () => { };
  }, [existData])

  useEffect(() => {
    let district = []
    if (Array.isArray(selectedCity) && selectedCity.length > 0) {
      for (let i = 0; i < selectedCity.length; i++) {
        const element = selectedCity[i];
        district.push(...getDistrict(element))
      }
    }
    setDistrict(district)
    return () => { };
  }, [selectedCity])

  return (
    <>
      <Temp_comp>
        {info &&
          <form onSubmit={handleSubmit(onSubmit)} className={style.container}>
            <Intro />
            <div className={style.input_container}>
              {!checkLogin(1) && <div className={style.title}>
                <p>Đăng tin tuyển dụng miễn phí</p>
                <p className={style.note}>
                  <span style={{ color: "#f8971c", fontWeight: "600" }}>
                    Lưu ý:{" "}
                  </span>
                  <span style={{ fontWeight: "400" }}>
                    Tính năng Đăng tin miễn phí chỉ dành cho khách hàng chưa từng
                    có tài khoản trênTimviechay.vn. Nếu bạn đã có tài khoản, vui
                    lòng đăng nhập và đăng tin trên trang Dịch vụ của
                    Timviechay.vn tại{" "}
                  </span>
                  <Link
                    href="/dang-nhap-nha-tuyen-dung"
                    style={{
                      color: "#2767a5",
                      fontWeight: "400",
                      textDecoration: "underline",
                    }}
                  >
                    ĐÂY
                  </Link>
                </p>
              </div>}
              <div className={style.job_info_box}>
                <div className={style.box_title}>
                  <p>Thông tin việc làm</p>
                  <div
                    style={{
                      width: "20px",
                      height: "4px",
                      background: "#f8971c",
                    }}
                  ></div>
                </div>
                <div className={style.box_content}>
                  <div>
                    <Input_form
                      control={control}
                      errors={formState.errors}
                      input_title="Vị trí đăng tuyển"
                      key_input="position"
                      default_value=""
                    />
                    <Select_form
                      control={control}
                      errors={formState.errors}
                      select_title="Cấp bậc"
                      key_select="level"
                      option_arr={allCapBac.filter(item => item.value !== 0)}
                    />
                    <Select_form
                      control={control}
                      errors={formState.errors}
                      select_title="Ngành nghề"
                      key_select="job"
                      option_arr={getJob()}
                      multiple={true}
                      alsoOnChange={() => console.log(getValues('job'))}
                    />
                    <Select_form
                      control={control}
                      errors={formState.errors}
                      select_title="Tỉnh thành làm việc"
                      key_select="province"
                      option_arr={getAllCity()}
                      multiple={true}
                      alsoOnChange={() => {
                        // getDistrict(getValues('province'))
                        // setDistrict(getDistrict(getValues('province')))
                        // if (getDistrict(getValues('province')).findIndex(item => item.value === getValues('district')) === -1) {
                        //   setValue('district', null)
                        // }
                        setSelectedCity(getValues('province'))
                        setValue('district', undefined)
                      }}
                    />
                    <Select_form
                      control={control}
                      errors={formState.errors}
                      select_title="Quận huyện làm việc"
                      key_select="district"
                      option_arr={district}
                      multiple={true}
                    />
                    <Input_form
                      control={control}
                      errors={formState.errors}
                      input_title="Địa chỉ làm việc chi tiết"
                      key_input="address"
                      default_value=""
                    />
                    <Select_form
                      control={control}
                      errors={formState.errors}
                      select_title="Hình thức làm việc"
                      key_select="formality"
                      option_arr={listHinhThucFilter.filter(item => item.value !== 0)}
                    />
                    <Select_form
                      control={control}
                      errors={formState.errors}
                      select_title="Mức lương"
                      key_select="salary"
                      option_arr={listMucLuongFilter.filter(item => item.value !== 0)}
                    />
                    <Input_form
                      control={control}
                      errors={formState.errors}
                      input_title="Số lượng cần tuyển"
                      key_input="quanlity"
                      default_value=""
                      type='number'
                    />
                    <Input_form
                      control={control}
                      errors={formState.errors}
                      input_title="Thời gian thử việc (Nếu có)"
                      key_input="trial_time"
                      default_value=""
                      uniqe={false}
                    />
                    <Input_form
                      control={control}
                      errors={formState.errors}
                      input_title="Hoa hồng (Nếu có)"
                      key_input="commission"
                      default_value=""
                      uniqe={false}
                    />
                  </div>
                </div>
              </div>
              <div className={style.job_desc_box}>
                <div className={style.box_title}>
                  <p>Mô tả công việc</p>
                  <div
                    style={{
                      width: "20px",
                      height: "4px",
                      background: "#f8971c",
                    }}
                  ></div>
                </div>
                <div className={style.box_content}>
                  <div>
                    <Textarea
                      control={control}
                      errors={formState.errors}
                      type="textarea"
                      input_title="Mô tả công việc"
                      key_input="job_desc"
                      default_value=""
                    />
                  </div>
                </div>
              </div>
              <div className={style.job_required_box}>
                <div className={style.box_title}>
                  <p>Yêu cầu công việc</p>
                  <div
                    style={{
                      width: "20px",
                      height: "4px",
                      background: "#f8971c",
                    }}
                  ></div>
                </div>
                <div className={style.box_content}>
                  <div>
                    <Select_form
                      control={control}
                      errors={formState.errors}
                      select_title="Kinh nghiệm"
                      key_select="experience"
                      option_arr={ExperWork}
                    />
                  </div>
                  <div >
                    <Select_form
                      control={control}
                      errors={formState.errors}
                      select_title="Yêu cầu bằng cấp"
                      key_select="degree"
                      option_arr={listHocVanFilter.filter(item => item.value !== -1)}
                      left_50={true}
                    />
                    <Select_form
                      control={control}
                      errors={formState.errors}
                      select_title="Giới tính"
                      key_select="gender"
                      option_arr={getList(gioiTinh)}
                      right_50={true}
                    />
                  </div>
                  <div>
                    <Textarea
                      control={control}
                      errors={formState.errors}
                      type="textarea"
                      input_title="Yêu cầu công việc"
                      key_input="yeuCau"
                      default_value=""
                    />
                  </div>
                </div>
              </div>
              <div className={style.benefits}>
                <div className={style.box_title}>
                  <p>Quyền lợi được hưởng</p>
                  <div
                    style={{
                      width: "20px",
                      height: "4px",
                      background: "#f8971c",
                    }}
                  ></div>
                </div>
                <div className={style.box_content}>
                  <div>
                    <Textarea
                      control={control}
                      errors={formState.errors}
                      type="textarea"
                      input_title="Quyền lợi được hưởng"
                      key_input="benefits"
                      default_value=""
                    />
                  </div>
                </div>
              </div>
              <div className={style.form_required}>
                <div className={style.box_title}>
                  <p>Yêu cầu hồ sơ</p>
                  <div
                    style={{
                      width: "20px",
                      height: "4px",
                      background: "#f8971c",
                    }}
                  ></div>
                </div>
                <div className={style.box_content}>
                  <div>
                    <Textarea
                      control={control}
                      errors={formState.errors}
                      type="textarea"
                      input_title="Yêu cầu hồ sơ"
                      key_input="forms"
                      default_value=""
                    />
                    <Date_form
                      control={control}
                      errors={formState.errors}
                      key_date="deadline"
                      date_title="Hạn nộp"
                      default_value=""
                      unique={true}
                      min={format(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd')}
                    />
                  </div>
                </div>
              </div>
              <div className={style.contact_info}>
                <div className={style.box_title}>
                  <p>Thông tin liên hệ</p>
                  <div
                    style={{
                      width: "20px",
                      height: "4px",
                      background: "#f8971c",
                    }}
                  ></div>
                </div>
                <div className={style.box_content}>
                  <div>
                    <Input_form
                      control={control}
                      errors={formState.errors}
                      input_title="Tên người liên hệ"
                      key_input="name"
                      default_value={info?.usc_name ? info?.usc_name : info?.usc_company}
                      left_50
                    />
                    <Input_form
                      control={control}
                      errors={formState.errors}
                      input_title="Địa chỉ liên hệ"
                      key_input="address_contact"
                      default_value={info?.usc_name_add}
                      right_50
                    />
                  </div>
                  <div>
                    <Input_form
                      control={control}
                      errors={formState.errors}
                      input_title="Số điện thoại liên hệ"
                      key_input="phone"
                      default_value={info?.usc_name_phone ? info?.usc_name_phone : info?.usc_phone_tk}
                      left_50
                    />
                    <Input_form
                      control={control}
                      errors={formState.errors}
                      input_title="Email liên hệ"
                      key_input="email"
                      default_value={info?.usc_name_email ? info?.usc_name_email : info?.usc_email}
                      type="email"
                      right_50
                    />
                  </div>
                </div>
              </div>
              <div className={style.button_box}>
                <button onClick={handleReset} className={style.cancel_button}>
                  {isEdit ? 'Hủy' : 'Hủy tạo tin'}
                </button>
                <button type="submit" className={style.submit_button}>
                  {isEdit ? 'Cập nhật' : 'Đăng tin'}
                </button>
              </div>
            </div>
          </form>
        }
      </Temp_comp>
    </>
  );
}

export default DangTinMoi