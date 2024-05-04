import React, { useContext, useEffect, useState } from 'react'
import s from "@/components/admin/ung-vien/style.module.scss";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ExperWork, getAllCity, getDistrict, job_array, listHinhThucFilter, listMucLuongFilter, listNgonNgu, xepLoai } from '@/functions/functions';
import { Input, Radio, Select } from "antd";
import MyEditor from '../../Edit';
import axios from 'axios';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
const { TextArea } = Input;

type LoginFormInputs = {
  name: string,
  point: number,
  };

  interface AdminEditPointProps {
    action: () => void
  }


const  AdminEditPoint:React.FC<AdminEditPointProps> = ({ action }) => {
  const { idPoint, changeIdPoint, token, changeDetailAfterUpdate, afterUpdate, pointBugget,
    changePointBugget, } = useContext(NTD_UV_Context);
  const {
    watch,
    setValue,
      control,
      handleSubmit,
      formState: { errors }
    } = useForm<LoginFormInputs>();
  const [dataDetail, setDataDetail] = useState<any>([]);
  const [flowAfterUpdate, setFlowAfterUpdate] = useState<number>(0);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data: any) => {
    try {
        const post = await axios.post(process.env.NEXT_PUBLIC_BASE_URL_API + "/admin/UpdatePoint", {
            point_id: pointBugget.idDetailItem,
          name: data.name ? data.name : dataDetail.name,
            point: data.point ? data.point : dataDetail.point
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (post.data.data.result) {
          if(flowAfterUpdate == 0) {
            changeDetailAfterUpdate(
              {
                currentNumberSidebar: 50,
              }
            );
            changePointBugget({
              idDetailItem: 0,
              edit: 0
            })
          } else if(flowAfterUpdate == 1) {
            await action()
            changeDetailAfterUpdate(
              {
                currentNumberSidebar: 51,
              }
            );
            changePointBugget({
              idDetailItem: 0,
              edit: 0
            })
          }
          
          
        }
    } catch (err) {
        console.log(err);
    }
};


const getPointDetail = async (id: any) => {
    const post = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/DetailPoint`,
      {
        point_id: id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    if (post?.data.data.result) {
      setDataDetail(post.data.data.data);
    }
  };

const resetFields = () => {
  const listKey = [
    "name",
    "point",
  ];

  listKey.map((key: any) => {
    setValue(key, dataDetail?.key?.trim());
  });
};

useEffect(() => {
  getPointDetail(pointBugget.idDetailItem)
}, []);
  
return (
  <div> <div
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
  {dataDetail.name && 
  <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
    <Controller
      name="name"
      control={control}
      defaultValue={dataDetail?.name}
      rules={{
        required: "Vui lòng nhập tên gói"
      }}
      render={({ field }) => (
        <div className={s.input}>
          <p>
            <span>*</span>Nhập tên gói :
          </p>
          <Input defaultValue={dataDetail?.name} type="text" placeholder="" {...field} />
        </div>
      )}
    />
    <Controller
      name="point"
      control={control}
      rules={{
        required: "Vui lòng nhập số điểm"
      }}
      defaultValue={dataDetail?.point}
      render={({ field }) => (
        <div className={s.input}>
          <p>
            <span>*</span>Nhập số điểm  :
          </p>
          <Input defaultValue={dataDetail?.point} type="text" placeholder="" {...field} />
        </div>
      )}
    />
    <div style={{
      display: 'flex'
    }}>
      <p style={{
        marginRight: '20px'
      }}>Sau khi lưu dữ liệu :</p>
      <Radio.Group  defaultValue={flowAfterUpdate}
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
      <button onClick={(e) => {
        e.preventDefault()
        resetFields()
      }}>Làm lại</button>
    </div>
  </form>}
</div>
</div>
)
}

export default  AdminEditPoint