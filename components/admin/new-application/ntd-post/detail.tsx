import React, { useContext, useEffect, useState } from "react";
import { Input_textarea } from "../../point/add";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  allCapBac,
  city_array,
  getAllCity,
  getDate,
  getDistrict,
  handleRemoveImage,
  job_array,
  listHinhThucFilter,
  listHocVanFilter,
  listKinhNghiemFilter,
  listMucLuongFilter
} from "@/functions/functions";
import s from "@/components/admin/ung-vien/style.module.scss";
import { Checkbox, Input, Radio, Select } from "antd";
import axios from "axios";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
import { listDistrict } from "@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/data";
const { TextArea } = Input;

type LoginFormInputs = {
  new_user_id: number; // usc_id
  new_title: string;
  new_cap_bac: number;
  new_cat_id: any;
  new_tag: number;
  new_city: any;
  new_qh_id: any;
  new_addr: number;
  new_hoahong: string;
  new_thuviec: any;
  new_hinh_thuc: number;
  new_money: number;
  new_money_type: number;
  new_money_from: number;
  new_money_to: number;
  new_so_luong: number;
  new_exp: number;
  new_bang_cap: number;
  new_gioi_tinh: number;
  new_han_nop: string;
  new_mota: string;
  new_yeucau: string;
  new_quyenloi: string;
  new_ho_so: string;
  new_usercontact: string;
  new_addcontact: string;
  new_phonecontact: string;
  new_emailcontact: string;
};

const AdminDetailPin = () => {
  const { idBlog } = useContext(NTD_UV_Context);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<LoginFormInputs>();
  const { token, changeDetailAfterUpdate, idPin, changeIdPin } =
    useContext(NTD_UV_Context);
  const [flowAfterUpdate, setFlowAfterUpdate] = useState<number>(0);
  const [detailBlog, setDetailBlog] = useState<any>();
  const [blogCategory, setBlogCategory] = useState<any>([]);
  const [listDistrict, setListDistrict] = useState<any>([]);
  const [ listJobTag, setListJobTag ] = useState<any>([]);

  const formatDate = (dateString: string): string => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };
  const changeListDistrict = (ids: any) => {
    let allDistrict: any = [];
    ids.map((id: number) => {
      if (id) {
        let districts = getDistrict(id);
        districts.map((district) => {
          allDistrict.push(district);
          console.log('districts', allDistrict);
          setListDistrict(allDistrict);
        });
      }
    });
  };

  const getDetailPin = async (id: number) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/DetailNew`,
      {
        new_id: id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("res.data.data.result", res.data.data.result);
    if (res.data.data.result) {
      setDetailBlog(res.data.data.data);
      setFlowAfterUpdate(1);
      changeListDistrict(
        res.data.data.data.new_city.toString().split(",").map(Number)
      );
    }
  };


  const getDetailJob = async () => {
    const jobs = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/GetTagsNew`,{} , {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    if(jobs.data.data.result) {
      setListJobTag(jobs.data.data.data)
    }
  }

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data: any) => {
    const json = {
      new_user_id: detailBlog.new_user_id,
      new_id: idPin.idDetailItem,
      new_title: data?.new_title ? data.new_title : "",
      new_cap_bac: data?.new_cap_bac ? Number(data.new_cap_bac) : 0,
      new_cat_id: data?.new_cat_id ? data.new_cat_id.join(",") : 0,
      new_tag: data?.new_tag ? data.new_cat_id.join(",") : 0,
      new_city: data?.new_city ? data.new_city.join(",") : 0,
      new_qh_id: data?.new_qh_id ? data.new_qh_id.join(",") : 0,
      new_addr: data?.new_addr ? data.new_addr : "",
      new_hoahong: data?.new_hoahong ? data.new_hoahong : "",
      new_thuviec: data?.new_thuviec ? data.new_thuviec : "",
      new_hinh_thuc: data?.new_hinh_thuc ? data.new_hinh_thuc : "",
      new_money: data?.new_money ? data.new_money : 0,
      new_money_type: data?.new_money_type ? data.new_money_type : 0,
      new_money_from: "",
      new_money_to: "",
      new_so_luong: data?.new_so_luong ? data.new_so_luong : 0,
      new_exp: data?.new_exp ? data.new_exp : 0,
      new_bang_cap: data?.new_bang_cap ? data.new_bang_cap : 0,
      new_gioi_tinh: data?.new_gioi_tinh ? data.new_gioi_tinh : 0,
      new_han_nop: data?.new_han_nop ? data.new_han_nop : "",
      new_mota: data?.new_mota ? data.new_mota : "",
      new_yeucau: data?.new_yeucau ? data.new_yeucau : "",
      new_quyenloi: data?.new_quyenloi ? data.new_quyenloi : "",
      new_ho_so: data?.new_ho_so ? data.new_ho_so : "",
      new_usercontact: data?.new_usercontact ? data.new_usercontact : "",
      new_addcontact: data?.new_addcontact ? data.new_addcontact : "",
      new_phonecontact: data?.new_phonecontact ? data.new_phonecontact : "",
      new_emailcontact: data?.new_emailcontact ? data.new_emailcontact : "",
    };
    try {
      const post = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/UpdateNew`,
        json,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (post.data.data.result) {
        if (flowAfterUpdate == 0) {
          changeDetailAfterUpdate({
            currentNumberSidebar: 32
          });
          changeIdPin({
            idDetailItem: 0,
            edit: 0
          });
        } else if (flowAfterUpdate == 1) {
          changeDetailAfterUpdate({
            currentNumberSidebar: 30
          });
          changeIdPin({
            idDetailItem: 0,
            edit: 1
          });
        } else if (flowAfterUpdate == 2) {
          return;
        }
      }
    } catch (error: any) {
      alert(error);
    }
  };

  const resetFields = () => {
    const listKey = [
      "new_user_id",
      "new_title",
      "new_cap_bac",
      "new_cat_id",
      "new_tag",
      "new_city",
      "new_qh_id",
      "new_addr",
      "new_hoahong",
      "new_thuviec",
      "new_hinh_thuc",
      "new_money",
      "new_money_type",
      "new_money_from",
      "new_money_to",
      "new_so_luong",
      "new_exp",
      "new_bang_cap",
      "new_gioi_tinh",
      "new_han_nop",
      "new_mota",
      "new_yeucau",
      "new_quyenloi",
      "new_ho_so",
      "new_usercontact",
      "new_addcontact",
      "new_phonecontact",
      "new_emailcontact"
    ];

    listKey.map((key: any) => {
      setValue(key, detailBlog?.key?.trim());
    });
  };

  useEffect(() => {
    getDetailJob()
    if (idPin.idDetailItem) {
      getDetailPin(idPin.idDetailItem);
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "50px"
      }}
    >
      <span>Những ô dấu sao (*) là bắt buộc phải nhập.</span>
      {detailBlog && (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="new_user_id"
            control={control}
            defaultValue={detailBlog?.new_user_id}
            render={({ field }) => (
              <div className={s.input}>
                <p>
                  <span>*</span>ID công ty :
                </p>
                <Input type="text" placeholder="ID công ty" {...field} />
              </div>
            )}
          />
          <Controller
            name="new_title"
            control={control}
            defaultValue={detailBlog?.new_title}
            rules={{
              required: "Vui lòng nhập mật khẩu aaa"
            }}
            render={({ field }) => (
              <div className={s.input}>
                <p>
                  <span>*</span>Tiêu đề tin :
                </p>
                <Input type="text" placeholder="" {...field} />
              </div>
            )}
          />
          <Controller
            name="new_cap_bac"
            control={control}
            defaultValue={detailBlog?.new_cap_bac ? detailBlog?.new_cap_bac : 0}
            rules={{
              required: "Vui lòng nhập mật khẩu"
            }}
            render={({ field }) => (
              <div className={s.input}>
                <p>
                  <span>*</span>Chọn cấp bậc :
                </p>
                <Select
                  {...field}
                  className={``}
                  defaultValue={0}
                  placeholder="Please select"
                  onChange={(selectedOptions: any) => {
                    field.onChange(selectedOptions);
                  }}
                  style={{ width: "100%" }}
                  options={allCapBac}
                  size="middle"
                />
              </div>
            )}
          />
          <Controller
            name="new_tag"
            control={control}
            defaultValue={
              detailBlog?.new_cat_id
                ? detailBlog?.new_cat_id.toString().split("").map(Number)
                : []
            }
            rules={{
              required: "Vui lòng chọn chi tiết công việc"
            }}
            render={({ field }) => (
              <div className={s.input}>
                <p>Chọn ngành nghề :</p>
                <Select
                  {...field}
                  mode="multiple"
                  className={``}
                  placeholder="Please select"
                  onChange={(selectedOptions: any) => {
                    field.onChange(selectedOptions);
                  }}
                  style={{ width: "100%" }}
                  options={job_array.map((job) => ({
                    label: job.cat_name,
                    value: job.cat_id
                  }))}
                  size="middle"
                />
              </div>
            )}
          />
          <Controller
            name="new_cat_id"
            control={control}
            defaultValue={
              detailBlog?.new_cat_id
                ? detailBlog?.new_cat_id.toString().split("").map(Number)
                : []
            }
            rules={{
              required: "Vui lòng chọn chi tiết công việc"
            }}
            render={({ field }) => (
              <div className={s.input}>
                <p>Chọn chi tiết công việc :</p>
                <Select
                  {...field}
                  mode="multiple"
                  className={``}
                  placeholder="Chọn tối đa 3 công việc"
                  onChange={(selectedOptions: any) => {
                    field.onChange(selectedOptions);
                  }}
                  style={{ width: "100%" }}
                  options={listJobTag.map((job: any) => ({
                    label: job.tag_name,
                    value: job.tag_id
                  }))}
                  size="middle"
                />
              </div>
            )}
          />

          <Controller
            name="new_city"
            control={control}
            defaultValue={
              detailBlog?.new_city
                ? detailBlog?.new_city.toString().split(",").map(Number)
                : []
            }
            rules={{
              required: "Vui lòng chọn chi tiết công việc"
            }}
            render={({ field }) => (
              <div className={s.input}>
                <p>Chọn địa điểm làm việc :</p>
                <Select
                  {...field}
                  className={``}
                  mode="multiple"
                  placeholder="Chọn tối đa 3 địa điểm"
                  onChange={(selectedOptions) => {
                    if (
                      selectedOptions.length <= 3 &&
                      selectedOptions.length >= 0
                    ) {
                      changeListDistrict(selectedOptions);
                      field.onChange(selectedOptions);
                    }
                  }}
                  style={{ width: "100%" }}
                  options={[
                    ...city_array.map((city: any) => ({
                      value: city.cit_id,
                      label: city.cit_name
                    }))
                  ]}
                  size="middle"
                />
              </div>
            )}
          />
          <Controller
            name="new_qh_id"
            control={control}
            defaultValue={
              detailBlog?.new_qh_id
                ? detailBlog?.new_qh_id.toString().split(",").map(Number)
                : []
            }
            rules={{
              required: "Vui lòng nhập mật khẩu"
            }}
            render={({ field }) => (
              <div className={s.input}>
                <p>
                  <span>*</span>Chọn quận huyện :
                </p>
                <Select
                  {...field}
                  className={``}
                  mode="multiple"
                  placeholder="Please select"
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions);
                  }}
                  style={{ width: "100%" }}
                  options={[
                    {
                      label: "Chọn quận huyện",
                      value: 0
                    },
                    ...listDistrict
                  ]}
                  size="middle"
                />
              </div>
            )}
          />
          <Controller
            name="new_addr"
            control={control}
            defaultValue={detailBlog?.new_addr}
            rules={{
              required: "Vui lòng nhập mật khẩu"
            }}
            render={({ field }) => (
              <div className={s.input}>
                <p>
                  <span>*</span> Địa chỉ chi tiết :
                </p>
                <Input type="text" placeholder="" {...field} />
              </div>
            )}
          />
          <Controller
            name="new_hoahong"
            control={control}
            defaultValue={detailBlog?.new_hoahong}
            render={({ field }) => (
              <div className={s.input}>
                <p>Hoa hồng :</p>
                <Input type="text" placeholder="" {...field} />
              </div>
            )}
          />
          <Controller
            name="new_thuviec"
            control={control}
            defaultValue={detailBlog?.new_thuviec}
            render={({ field }) => (
              <div className={s.input}>
                <p>Thời gian thử việc :</p>
                <Input type="text" placeholder="" {...field} />
              </div>
            )}
          />

          <Controller
            name="new_hinh_thuc"
            control={control}
            defaultValue={
              detailBlog?.new_hinh_thuc ? detailBlog?.new_hinh_thuc : 0
            }
            rules={{
              required: "Vui lòng nhập mật khẩu"
            }}
            render={({ field }) => (
              <div className={s.input}>
                <p>
                  <span>*</span> Hình thức làm việc :
                </p>
                <Select
                  {...field}
                  className={``}
                  defaultValue={0}
                  placeholder=" Hình thức làm việc"
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions);
                  }}
                  style={{ width: "100%" }}
                  options={listHinhThucFilter}
                  size="middle"
                />
              </div>
            )}
          />
          <div
            style={{
              display: "flex",
              gap: "20px",
              width: "100%"
            }}
          >
            <p
              style={{
                width: "50%"
              }}
            >
              <span>*</span> Chọn mức lương :
            </p>
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "flex-start",
                width: "100%"
              }}
            >
              {/* <Controller
                name="new_money_type"
                control={control}
                defaultValue={0}
                rules={{
                  required: "Vui lòng nhập  Chọn mức lương"
                }}
                render={({ field }) => (
                  <div className={s.input}>
                    <Select
                      {...field}
                      className={``}
                      defaultValue={0}
                      placeholder=""
                      onChange={(selectedOptions) => {
                        field.onChange(selectedOptions);
                      }}
                      style={{ width: "100%" }}
                      options={[
                        {
                          label: "VND",
                          value: 0
                        },
                        {
                          label: "USD",
                          value: 1
                        },
                        {
                          label: "EURO",
                          value: 2
                        }
                      ]}
                      size="middle"
                    />
                  </div>
                )}
              />{" "} */}
              <Controller
                name="new_money"
                control={control}
                defaultValue={detailBlog?.new_money ? detailBlog?.new_money : 0}
                rules={{
                  required: "Vui lòng nhập  Chọn mức lương"
                }}
                render={({ field }) => (
                  <div className={s.input}>
                    <Select
                      {...field}
                      className={``}
                      defaultValue={0}
                      placeholder=""
                      onChange={(selectedOptions) => {
                        field.onChange(selectedOptions);
                      }}
                      style={{ width: "100%" }}
                      options={listMucLuongFilter}
                      size="middle"
                    />
                  </div>
                )}
              />
            </div>
          </div>
          <Controller
            name="new_so_luong"
            control={control}
            defaultValue={
              detailBlog?.new_so_luong ? detailBlog?.new_so_luong : 0
            }
            rules={{
              required: "Vui lòng nhập Số lượng cần tuyển"
            }}
            render={({ field }) => (
              <div className={s.input}>
                <p>
                  <span>*</span>Số lượng cần tuyển :
                </p>
                <Input type="text" placeholder="" {...field} />
              </div>
            )}
          />

          <Controller
            name="new_exp"
            control={control}
            defaultValue={detailBlog?.new_exp ? detailBlog.new_exp : 0}
            rules={{
              required: "Vui lòng nhập chọn kinh nghiệm làm việc"
            }}
            render={({ field }) => (
              <div className={s.input}>
                <p>
                  <span>*</span>Chọn kinh nghiệm làm việc :
                </p>
                <Select
                  {...field}
                  className={``}
                  placeholder="Please select"
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions);
                  }}
                  style={{ width: "100%" }}
                  options={listKinhNghiemFilter}
                  size="middle"
                />
              </div>
            )}
          />

          <Controller
            name="new_bang_cap"
            control={control}
            defaultValue={
              detailBlog?.new_bang_cap ? detailBlog.new_bang_cap : 0
            }
            rules={{
              required: "Vui lòng nhập chọn bằng cấp"
            }}
            render={({ field }) => (
              <div className={s.input}>
                <p>
                  <span>*</span>Chọn bằng cấp :
                </p>
                <Select
                  {...field}
                  className={``}
                  defaultValue={0}
                  placeholder="Please select"
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions);
                  }}
                  style={{ width: "100%" }}
                  options={listHocVanFilter}
                  size="middle"
                />
              </div>
            )}
          />

          <Controller
            name="new_gioi_tinh"
            control={control}
            defaultValue={
              detailBlog?.new_gioi_tinh ? Number(detailBlog.new_gioi_tinh) : 0
            }
            rules={{
              required: "Vui lòng nhập chọn bằng cấp"
            }}
            render={({ field }) => (
              <div className={s.input}>
                <p>
                  <span>*</span>Chọn giới tính :
                </p>
                <Select
                  {...field}
                  className={``}
                  placeholder="Please select"
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions);
                  }}
                  style={{ width: "100%" }}
                  options={[
                    {
                      label: "Không yêu cầu",
                      value: 0
                    },
                    {
                      label: "Nam",
                      value: 1
                    },
                    {
                      label: "Nữ",
                      value: 2
                    }
                  ]}
                  size="middle"
                />
              </div>
            )}
          />

          <Controller
            name="new_han_nop"
            defaultValue={
              detailBlog?.new_han_nop
                ? formatDate(getDate(detailBlog.new_han_nop))
                : ""
            }
            control={control}
            rules={{
              required: "Vui lòng nhập chọn bằng cấp"
            }}
            render={({ field }) => (
              <div className={s.input}>
                <p>
                  <span>*</span>Hạn nộp:
                </p>
                <Input type="date" {...field} />
              </div>
            )}
          />

          <Controller
            name="new_mota"
            control={control}
            defaultValue={detailBlog?.new_mota ? detailBlog.new_mota : ""}
            render={({ field }) => (
              <div className={s.input}>
                <p>
                  <span>*</span>Mô tả công việc :
                </p>
                <TextArea placeholder="" {...field} />
              </div>
            )}
          />

          <Controller
            name="new_yeucau"
            control={control}
            defaultValue={detailBlog?.new_yeucau ? detailBlog.new_yeucau : ""}
            render={({ field }) => (
              <div className={s.input}>
                <p>
                  <span>*</span> Yêu cầu công việc :
                </p>
                <TextArea placeholder="" {...field} />
              </div>
            )}
          />

          <Controller
            name="new_quyenloi"
            control={control}
            defaultValue={
              detailBlog?.new_quyenloi ? detailBlog.new_quyenloi : ""
            }
            render={({ field }) => (
              <div className={s.input}>
                <p>
                  <span>*</span>Quyền lợi :
                </p>
                <TextArea placeholder="" {...field} />
              </div>
            )}
          />

          <Controller
            name="new_ho_so"
            control={control}
            defaultValue={detailBlog?.new_ho_so ? detailBlog.new_ho_so : ""}
            render={({ field }) => (
              <div className={s.input}>
                <p>
                  <span>*</span>Hồ sơ :
                </p>
                <TextArea placeholder="" {...field} />
              </div>
            )}
          />
          <Controller
            name="new_usercontact"
            control={control}
            defaultValue={
              detailBlog?.new_usercontact ? detailBlog.new_usercontact : ""
            }
            render={({ field }) => (
              <div className={s.input}>
                <p>Người liên hệ :</p>
                <Input type="text" placeholder="Người liên hệ" {...field} />
              </div>
            )}
          />
          <Controller
            name="new_addcontact"
            control={control}
            defaultValue={
              detailBlog?.new_addcontact ? detailBlog.new_addcontact : ""
            }
            render={({ field }) => (
              <div className={s.input}>
                <p>Địa chỉ liên hệ :</p>
                <Input type="text" placeholder="Địa chỉ" {...field} />
              </div>
            )}
          />
          <Controller
            name="new_phonecontact"
            control={control}
            defaultValue={
              detailBlog?.new_phonecontact ? detailBlog.new_phonecontact : ""
            }
            render={({ field }) => (
              <div className={s.input}>
                <p>SĐT liên hệ :</p>
                <Input type="text" placeholder="Liên hệ sdt" {...field} />
              </div>
            )}
          />
          <Controller
            name="new_emailcontact"
            control={control}
            defaultValue={
              detailBlog?.new_emailcontact ? detailBlog.new_emailcontact : ""
            }
            render={({ field }) => (
              <div className={s.input}>
                <p>Email liên hệ :</p>
                <Input type="email" placeholder="Email" {...field} />
              </div>
            )}
          />

          <div
            style={{
              display: "flex"
            }}
          >
            <p
              style={{
                marginRight: "20px"
              }}
            >
              Sau khi lưu dữ liệu :
            </p>
            <Radio.Group
              defaultValue={flowAfterUpdate}
              onChange={(e) => setFlowAfterUpdate(e.target.value)}
            >
              <Radio value={0}>Thêm mới </Radio>
              <Radio value={1}>Quay về danh sách</Radio>
              <Radio value={2}>Sửa bản ghi</Radio>
            </Radio.Group>
          </div>
          <div className={s.btns_add}>
            <button type="submit" className={`${s.update}`}>
              Cập nhật
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                resetFields();
              }}
            >
              Làm lại
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminDetailPin;
