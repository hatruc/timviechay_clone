import React, { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { allCapBac, getAllCity, getDistrict, job_array, listHinhThucFilter, listHocVanFilter, listKinhNghiemFilter, listMucLuongFilter } from "@/functions/functions";
import s from "@/components/admin/ung-vien/style.module.scss";
import { Checkbox, Input, Radio, Select } from "antd";
import axios from "axios";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
import { Input_textarea } from "../../point/add";
const { TextArea } = Input;

type LoginFormInputs = {
    fileImage: string;
    email: string;
    username: string;
    phone: string;
    date: string;
    gender: number;
    marry: boolean;
    city: number;
    district: number;
    address: string;
    jobWant: string;
    levelJob: number;
    jobListAddress: any;
    jobs: any;
    salary: number;
    workDoIn: number;
    exp: number;
    targetJob: string;
    skill: string;
    levelEdu: string;
    nameSchool: string;
    startDate: string;
    endDate: string;
    specialized: number;
    graduation: string;
    inforEdu: string;
    namePosition: string;
    position: string;
    startWork: string;
    endWork: string;
    workInfor: string;
    language: number;
    graduationLanguage: string;
    point: number;
  };
  const gioiTinh = [
    {
      label: "Chọn giới tính",
      value: 0
    },
    {
      label: "Nam",
      value: 1
    },
    {
      label: "Nữ",
      value: 2
    },
    {
      label: "Khác",
      value: 3
    }
  ];
  
  const honNhan = [
    {
      label: "Chọn tình trạng hôn nhân",
      value: 0
    },
    {
      label: "Độc thân",
      value: 1
    },
    {
      label: "Đã lập gia đình",
      value: 2
    }
  ];

const AdminApplicationDetail = () => {
    const {
        setValue,
        control,
        handleSubmit,
        formState: { errors }
      } = useForm<LoginFormInputs>();
      const {  token, changeDetailAfterUpdate, idDetailApplicationOfList, changeIdApplication} = useContext(NTD_UV_Context);
      const [ detailApp, setDetailApp ] = useState<any>([]);
      const [flowAfterUpdate, setFlowAfterUpdate] = useState<number>(0);
      const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        console.log("data", data);
      };

      const getDetailBlog = async () => {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/detailBlog`,
          {
            new_id: idDetailApplicationOfList.idDetailItem
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );
    
        if (res.data.data.result) {
            setDetailApp(res.data.data.data);
          setFlowAfterUpdate(1);
        }
      };

      const resetFields = () => {
        const listKey = [
          "new_id",
          "new_category_id",
          "new_title",
          "new_title_rewrite",
          "new_order",
          "new_picture",
          "new_tt",
          "new_des",
          "new_keyword",
          "key_lq",
          "new_teaser",
          "new_active",
          "new_new",
          "new_hot",
          "new_description"
        ];
    
        listKey.map((key: any) => {
          setValue(key, detailApp?.key?.trim());
        });
      };

      useEffect(() => {
        if (idDetailApplicationOfList?.edit == 2) {
          getDetailBlog();
        } else {
            setDetailApp([]);
        }
      }, [idDetailApplicationOfList.idDetailItem]);
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
    
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="fileImage"
              control={control}
              defaultValue=""
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
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Vui lòng nhập mật khẩu"
              }}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span>*</span>Tiêu đề tin :
                  </p>
                  <Input type="email" placeholder="" {...field} />
                </div>
              )}
            />
            <Controller
              name="district"
              control={control}
              defaultValue={0}
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
                    onChange={(selectedOptions) => {
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
              name="district"
              control={control}
              defaultValue={0}
              rules={{
                required: "Vui lòng chọn chi tiết công việc"
              }}
              render={({ field }) => (
                <div className={s.input}>
                  <p>Chọn chi tiết công việc :</p>
                  <Select
                    {...field}
                    className={``}
                    defaultValue={0}
                    placeholder="Chọn chi tiết công việc"
                    onChange={(selectedOptions) => {
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
              name="district"
              control={control}
              defaultValue={0}
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
                    defaultValue={0}
                    placeholder="Please select"
                    onChange={(selectedOptions) => {
                      field.onChange(selectedOptions);
                    }}
                    style={{ width: "100%" }}
                    options={getDistrict(0)}
                    size="middle"
                  />
                </div>
              )}
            />
            <Controller
              name="gender"
              control={control}
              defaultValue={0}
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
              name="city"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span>*</span>Hoa hồng :
                  </p>
                  <Input type="text" placeholder="" {...field} />
                </div>
              )}
            />
            <Controller
              name="district"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span>*</span>Thời gian thử việc :
                  </p>
                  <Input type="text" placeholder="" {...field} />
                </div>
              )}
            />
    
            <Controller
              name="workDoIn"
              control={control}
              defaultValue={0}
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
                  width: "100%",
                }}
              >
                <Controller
                  name="district"
                  control={control}
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
                            title: "VND",
                            value: 0
                          },
                          {
                            title: "USD",
                            value: 1
                          },
                          {
                            title: "EURO",
                            value: 2
                          }
                        ]}
                        size="middle"
                      />
                    </div>
                  )}
                />{" "}
                <Controller
                  name="district"
                  control={control}
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
              name="district"
              control={control}
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
              name="district"
              control={control}
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
                    defaultValue={0}
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
              name="district"
              control={control}
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
              name="gender"
              control={control}
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
                    defaultValue={0}
                    placeholder="Please select"
                    onChange={(selectedOptions) => {
                      field.onChange(selectedOptions);
                    }}
                    style={{ width: "100%" }}
                    options={[
                      {
                        'label': "Không yêu cầu",
                        'value': 0
                      },
                      {
                        'label': "Nam",
                        'value': 1
                      },
                      {
                        'label': "Nữ",
                        'value': 2
                      }
                    ]}
                    size="middle"
                  />
                </div>
              )}
            />
    
            <Controller
              name="district"
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
              name="workInfor"
              control={control}
              defaultValue=""
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
              name="workInfor"
              control={control}
              defaultValue=""
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
              name="workInfor"
              control={control}
              defaultValue=""
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
              name="workInfor"
              control={control}
              defaultValue=""
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
              name="fileImage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    Người liên hệ :
                  </p>
                  <Input type="text" placeholder="Người liên hệ" {...field} />
                </div>
              )}
            />
            <Controller
              name="fileImage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    Địa chỉ liên hệ :
                  </p>
                  <Input type="text" placeholder="Địa chỉ" {...field} />
                </div>
              )}
            />
            <Controller
              name="fileImage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    SĐT liên hệ :
                  </p>
                  <Input type="text" placeholder="Liên hệ sdt" {...field} />
                </div>
              )}
            />
            <Controller
              name="fileImage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    Email liên hệ :
                  </p>
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
                  resetFields()
                }}
              >
                Làm lại
              </button>
            </div>
          </form>
        </div>
      );
};

export default AdminApplicationDetail;
