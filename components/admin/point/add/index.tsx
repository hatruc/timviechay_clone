import React, { useContext, useEffect, useState } from "react";
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
import MyEditor from "../../Edit";
import axios from "axios";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
const { TextArea } = Input;

type LoginFormInputs = {
  name: string;
  point: number;
};

interface InputTextAreaProps {
  name: string;
  value: string;
  handleChange: (e: any, type: string) => void;
  dataCustom: (e: any) => void;
  isAgain: boolean;
  handleUrlDelete: (e: string) => void;
}

export const Input_textarea = ({
  name,
  value,
  handleChange,
  dataCustom,
  isAgain,
  handleUrlDelete
}: InputTextAreaProps) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState(value);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  return (
    <div className={``}>
      <MyEditor
        name={name}
        onChange={(data: React.SetStateAction<string>) => {
          setData(data);
        }}
        editorLoaded={editorLoaded}
        value={value}
        dataEdit={(e, type) => {
          {
            handleChange(e, type);
          }
        }}
        isAgain={isAgain}
        valueUrlEdit={(e) => handleUrlDelete(e)}
      />
    </div>
  );
};

const AdminAddPoint = () => {
  const {
    token,
    changeDetailAfterUpdate,
    changePointBugget,
    handlePermission
  } = useContext(NTD_UV_Context);
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();
  const [dataDetail, setDataDetail] = useState<any>([]);
  const [flowAfterUpdate, setFlowAfterUpdate] = useState<number>(0);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data: any) => {
    try {
      const post = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/CreatePoint`,
        {
          name: data.name,
          point: Number(data.point)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log(
        "post?.data.data.result",
        post?.data.data.result,
        post?.data.data.point_id
      );
      if (post?.data.data.result) {
        if (flowAfterUpdate == 0) {
          changeDetailAfterUpdate({
            currentNumberSidebar: 50
          });
          changePointBugget({
            idDetailItem: 0,
            edit: 0
          });
        } else if (flowAfterUpdate == 1) {
          changeDetailAfterUpdate({
            currentNumberSidebar: 52
          });
          changePointBugget({
            idDetailItem: 0,
            edit: 1
          });
        } else if (flowAfterUpdate == 2) {
          changeDetailAfterUpdate({
            currentNumberSidebar: 52
          });
          changePointBugget({
            idDetailItem: post?.data.data.point_id,
            edit: 2
          });
        }
      }
    } catch (err) {
      alert("Thất bại! Vui lòng thử lại.");
    }
  };

  const resetFields = () => {
    const listKey = ["name", "point"];

    listKey.map((key: any) => {
      setValue(key, dataDetail?.key?.trim());
    });
  };

  useEffect(() => {
    setDataDetail([]);
  }, []);

  return (
    <>
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
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: "Vui lòng nhập tên gói"
                }}
                render={({ field }) => (
                  <div className={s.input}>
                    <p>
                      <span>*</span>Nhập tên gói :
                    </p>
                    <Input
                      defaultValue={dataDetail?.name}
                      type="text"
                      placeholder=""
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                name="point"
                control={control}
                defaultValue={0}
                rules={{
                  required: "Vui lòng nhập số điểm"
                }}
                render={({ field }) => (
                  <div className={s.input}>
                    <p>
                      <span>*</span>Nhập số điểm :
                    </p>
                    <Input
                      defaultValue={dataDetail?.point}
                      type="text"
                      placeholder=""
                      {...field}
                    />
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
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAddPoint;
