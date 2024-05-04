import React, { useContext, useEffect, useState } from "react";
import { Input_textarea } from "../../point/add";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  getAllCity,
  getDate,
  getDistrict,
  handleRemoveImage,
  job_array
} from "@/functions/functions";
import s from "@/components/admin/ung-vien/style.module.scss";
import { Checkbox, Input, Radio, Select } from "antd";
import axios from "axios";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
const { TextArea } = Input;

type LoginFormInputs = {
  new_id: string;
  new_hot: any;
  new_cao: any;
  expired: any;
};

interface AdminDetailPinedProps {
  action: () => void;
}
const AdminDetailPined: React.FC<AdminDetailPinedProps> = ({ action }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<LoginFormInputs>();
  const { token, changeDetailAfterUpdate, idPinded, changeIdPined, afterUpdate } =
    useContext(NTD_UV_Context);
  const [flowAfterUpdate, setFlowAfterUpdate] = useState<number>(0);
  const [detailBlog, setDetailBlog] = useState<any>();
  const formatDate = (dateString: string): string => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const getDetailPin = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/DetailPinNew`,
      {
        new_id: idPinded.idDetailItem
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (res.data.data.result) {
      if (res.data.data.data !== null) {
        setDetailBlog(res.data.data.data);
      } else {
        setDetailBlog([]);
      }
    }
    setFlowAfterUpdate(1);
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data: any) => {
    const json = {
      new_id: idPinded.idDetailItem,
      new_hot: data?.new_hot ? 1 : "0",
      new_cao: data?.new_cao ? 1 : "0",
      expired: data?.expired ? data.expired : detailBlog.expired
    };
    try {
      const post = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/PinNew`,
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
          console.log('1');
          changeIdPined({
            idDetailItem: 0,
            edit: 0
          });
          changeDetailAfterUpdate({
            currentNumberSidebar: 32
          })
        } 
        else if (flowAfterUpdate == 1) {
          console.log('2');
          await action();
          changeDetailAfterUpdate({
            currentNumberSidebar: 30
          });
          changeIdPined({
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
    const listKey = ["new_id", "new_hot", "new_cao", "expired"];

    listKey.map((key: any) => {
      setValue(key, detailBlog?.key?.trim());
    });
  };

  useEffect(() => {
    if (idPinded.idDetailItem) {
      getDetailPin();
    }
  }, []);

  return (
    <div>
      {" "}
      <div
        style={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {detailBlog && (
          <div>
            <span>Những ô dấu sao (*) là bắt buộc phải nhập.</span>
            <form
              style={{
                width: "100%"
              }}
              className={s.form}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="expired"
                rules={{
                  required: detailBlog?.expired ? false : true
                }}
                control={control}
                render={({ field }) => (
                  <div className={s.input}>
                    <p><span>*</span>Ghim trang chủ đến ngày :</p>
                    <Input
                      style={{
                        marginLeft: "10px"
                      }}
                      type="date"
                      defaultValue={
                        detailBlog?.expired
                          ? formatDate(getDate(detailBlog?.expired))
                          : 0
                      }
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
                <Controller
                  name="new_hot"
                  control={control}
                  defaultValue={detailBlog?.new_hot === 1 ? true : false}
                  render={({ field }) => (
                    <div className={s.input}>
                      <Checkbox
                        defaultChecked={
                          detailBlog?.new_hot === 1 ? true : false
                        }
                        {...field}
                      />
                      <p
                        style={{
                          marginRight: "30px",
                          marginLeft: "10px"
                        }}
                      >
                        Box Hấp Dẫn
                      </p>
                    </div>
                  )}
                />
                <Controller
                  name="new_cao"
                  control={control}
                  render={({ field }) => (
                    <div className={s.input}>
                      <Checkbox
                        defaultChecked={
                          detailBlog?.new_cao === 1 ? true : false
                        }
                        {...field}
                      />
                      <p
                        style={{
                          marginRight: "30px",
                          marginLeft: "10px"
                        }}
                      >
                        Box Lương Cao :
                      </p>
                    </div>
                  )}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  width: "100%"
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
        )}
      </div>
    </div>
  );
};

export default AdminDetailPined;
