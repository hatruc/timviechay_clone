import React, { useContext } from "react";
import s from "@/components/admin/ung-vien/style.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ExperWork,
  getAllCity,
  getDistrict,
  job_array,
  listHinhThucFilter,
  listMucLuongFilter,
  listNgonNgu,
  xepLoai
} from "@/functions/functions";
import { Input, Radio, Select } from "antd";
import axios from "axios";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
const { TextArea } = Input;

type LoginFormInputs = {
  usc_id: number;
  point: number;
  endDay: string;
};

const AdminAddCompanyPoint = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();
  const { handlePermission, token } = useContext(NTD_UV_Context);
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data: any) => {
    try {
      const post = await axios.post(
        "https://timviechay.vn/api/work247/admin/CreatePoint",
        {
          usc_id: data.usc_id,
          point: data.point,
          day_end: new Date(data.endDay).getTime()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      if (post?.data.result) {
        alert("Tạo thành công.");
      }
    } catch (err) {
      alert("Thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <>
      {" "}
      {handlePermission.add && (
        <div>
          {" "}
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
                name="usc_id"
                control={control}
                rules={{
                  required: "Vui lòng nhập ID công ty "
                }}
                render={({ field }) => (
                  <div className={s.input}>
                    <p>
                      <span>*</span>Nhập ID công ty :
                    </p>
                    <Input type="text" placeholder="" {...field} />
                  </div>
                )}
              />
              <Controller
                name="point"
                control={control}
                rules={{
                  required: "Vui lòng nhập số điểm mất phí"
                }}
                render={({ field }) => (
                  <div className={s.input}>
                    <p>
                      <span>*</span>Nhập số điểm mất phí :
                    </p>
                    <Input type="text" placeholder="" {...field} />
                  </div>
                )}
              />
              <Controller
                name="endDay"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div className={s.input}>
                    <p>
                      <span>*</span>Ngày hết hạn :
                    </p>
                    <Input type="date" placeholder="" {...field} />
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
                <Radio.Group defaultValue={1}>
                  <Radio value={1}>Thêm mới </Radio>
                  <Radio value={2}>Quay về danh sách</Radio>
                  <Radio value={3}>Sửa bản ghi</Radio>
                </Radio.Group>
              </div>
              <div className={s.btns_add}>
                <button type="submit" className={`${s.update}`}>
                  Cập nhật
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Làm lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAddCompanyPoint;
