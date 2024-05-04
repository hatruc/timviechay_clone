import { Input, Radio } from 'antd';
import React from 'react'
import s from "@/components/admin/ung-vien/style.module.scss";
import { Controller, useForm, SubmitHandler } from 'react-hook-form';


type AdminSentUV = {
    idUV: string,
    idNew: string,
}

const AdminSentCandidateSent = () => {

    const {
        control,
        handleSubmit,
        formState: { errors }
      } = useForm<AdminSentUV>();

      const onSubmit: SubmitHandler<AdminSentUV> = async (data) => {
        console.log("data", data);
      };
  return (
    <div
      style={{
        width: "100%",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: '50px'
      }}
    >
      <span>Những ô dấu sao (*) là bắt buộc phải nhập.</span>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="idUV"
          control={control}
          defaultValue=""
          rules={{
            required: 'Vui lòng nhập id ứng viên'
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>ID hồ sơ ứng viên :</p>
              <Input type="text" placeholder="Vui lòng nhập id ứng viên" {...field} />
            </div>
          )}
        />
        <Controller
          name="idNew"
          control={control}
          defaultValue=""
          rules={{
            required: "Vui lòng nhập id tin tuyển dụng"
          }}
          render={({ field }) => (
            <div className={s.input}>
              <p>
                <span>*</span>ID tin tuyển dụng :
              </p>
              <Input type="email" placeholder="Vui lòng nhập id tin tuyển dụng" {...field} />
            </div>
          )}
        />
        
        <div style={{
          display: 'flex'
        }}>
          <p style={{
            marginRight: '20px'
          }}>Sau khi lưu dữ liệu :</p>
          <Radio.Group defaultValue={1}>
            <Radio value={1}>Thêm mới  </Radio>
            <Radio value={2}>Quay về danh sách</Radio>
            <Radio value={3}>Sửa bản ghi</Radio>
          </Radio.Group>
        </div>
        <div className={s.btns_add}>
          <button type="submit" className={`${s.update}`}>
            Cập nhật
          </button>
          <button onClick={(e) => {
            e.preventDefault()
          }}>Làm lại</button>
        </div>
      </form>
    </div>
  )
}

export default AdminSentCandidateSent