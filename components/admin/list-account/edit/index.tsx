import React, { useContext, useEffect, useState } from "react";
import styleButton from "@/components/admin/ung-vien/style.module.scss";
import s from "./index.module.scss";
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
  loginname: string;
  name: string;
  // point: number;
  phone: string;
  email: string;
  password: string;
  rePassword: string;
};

interface InputTextAreaProps {
  name: string;
  value: string;
  handleChange: any;
  dataCustom: (e: any) => void;
  isAgain: boolean;
}

const AdminEditAccount: React.FC<{onClose: any, id: any}> = ({onClose, id}) => {
  const { idPoint, changeIdPoint, token, handlePermission } = useContext(NTD_UV_Context);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();
  const [dataEdit, setDataEdit] = useState<any>();
  const [dataDetail, setDataDetail] = useState<any>();
  const [permission, setPermission] = useState<any>();
  const listName = ["47", "72", "72", "28", "41", "34"];
  const [  dataCheckBox, setDataCheckBox ] = useState<any>();


  const getBlogDetail = async (id: number) => {
    const post = await axios.post(
      "https://timviechay.vn/api/work247/admin/adminDetail",
      {
        id: id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    if (post?.data.data.result) {
      console.log('post.data.data.data asssss', post.data.data.data);
      const data: any = {}
      const formattedData = post.data.data.data.permision.map((item: any) => ({
        [item.adu_admin_module_id]: {
          adu_admin_module_id: item.adu_admin_module_id,
          adu_add: item.adu_add,
          adu_edit: item.adu_edit,
          adu_delete: item.adu_delete
        }
      }));
      console.log('formattedData', formattedData);
      setDataCheckBox(formattedData)
      setDataDetail(post.data.data.data);
      changeIdPoint(0);
    }
  };

  const getvalueKey = (key: string) => {
    dataCheckBox.find((item: any) => item.hasOwnProperty(key));
    const { adu_admin_module_id, adu_add, adu_edit, adu_delete } = dataCheckBox['54'];
    
  console.log({
    adu_admin_module_id,
    adu_add,
    adu_edit,
    adu_delete
  });
  }


  const onSubmit: SubmitHandler<LoginFormInputs> = async (data: any) => {
    console.log("data", data);
    // try {
    //   const post = await axios.post(
    //     "https://timviechay.vn/api/work247/admin/UpdatePoint",
    //     {
    //       name: data.name,
    //       point: Number(data.point)
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json"
    //       }
    //     }
    //   );

    //   if (post?.data.result) {
    //     alert("Tạo thành công.");
    //   }
    // } catch (err) {
    //   alert("Thất bại! Vui lòng thử lại.");
    // }
    try {
      const permision = getPermissionValues()
      const post = await axios.post(
        "https://timviechay.vn/api/work247/admin/editAdminUser",
        {
          adm_id: id,
          adm_name: data?.name,
          adm_phone: data?.phone,
          adm_email: data?.email,
          permision: JSON.stringify(permision)
        }
      )
    } catch (error) {
      alert("Thất bại! Vui lòng thử lại.");
    }
    onClose();
  };


  const getPermissionValues = () => {
    const valueParent: any = [];
    const valueChild: any = [];
    const idParent: any = [];
    const parentElement = document.querySelectorAll('.parent');
    Array.from(parentElement).map((e: any) => {
      valueParent.push(e.checked)
      idParent.push(e.getAttribute('name'))
    })
    const childElement = document.querySelectorAll('.child');
    Array.from(childElement).map((e: any) => {
      valueChild.push(e.checked)
    })
    const data = []
    for (let i = 0; i < valueParent.length; i++) {
      const element = valueParent[i];
      data.push({
        mod_view: element,
        adu_admin_module_id: Number(idParent[i]),
        adu_add: valueChild[i * 3],
        adu_edit: valueChild[i * 3 + 1],
        adu_delete: valueChild[i * 3 + 2],
      })
    }
    console.log(data.filter(item => item?.mod_view))
    console.log(data)
    return data.filter(item => item?.mod_view)
  }

  useEffect(() => {
    // console.log("point", idPoint);
    if (id) {
      getBlogDetail(id);
    } else {
      setDataDetail([]);
    }
  }, []);

  return (
    <div>
      {" "}
      {
        handlePermission.add &&
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
          {
            dataDetail && 
          <form className={styleButton.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styleButton.container}>
              {/* <form
              className={styleButton.form}
              onSubmit={handleSubmit(onSubmit)}
            > */}
              <Controller
                name="loginname"
                control={control}
                defaultValue={dataDetail?.adm_loginname}
                // rules={{
                //   required: "Vui lòng nhập tên đăng nhập"
                // }}
                render={({ field }) => (
                  <div className={styleButton.input}>
                    <p>Tên đăng nhập :</p>
                    <Input
                      disabled={true}
                      defaultValue={dataDetail?.adm_loginname}
                      type="text"
                      placeholder=""
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                name="name"
                control={control}
                defaultValue={""}
                rules={{
                  required: "Vui lòng nhập họ tên"
                }}
                render={({ field }) => (
                  <div className={styleButton.input}>
                    <p>Họ tên :</p>
                    <Input
                      defaultValue={dataDetail?.point}
                      type="text"
                      placeholder=""
                      {...field}
                    />
                  </div>
                )}
              />

              <Controller
                name="phone"
                control={control}
                defaultValue={""}
                rules={{
                  // required: "Vui lòng nhập số điểm"
                }}
                render={({ field }) => (
                  <div className={styleButton.input}>
                    <p>Số điện thoại :</p>
                    <Input
                      defaultValue={dataDetail?.point}
                      type="text"
                      placeholder=""
                      {...field}
                    />
                  </div>
                )}
              />
              {/* <Controller
                name="password"
                control={control}
                defaultValue={""}
                rules={{
                  required: "Vui lòng nhập mật khẩu"
                }}
                render={({ field }) => (
                  <div className={styleButton.input}>
                    <p>Mật khẩu :</p>
                    <Input
                      defaultValue={dataDetail?.point}
                      type="text"
                      placeholder=""
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                name="rePassword"
                control={control}
                defaultValue={""}
                rules={{
                  required: "Vui lòng nhập lại mật khẩu"
                }}
                render={({ field }) => (
                  <div className={styleButton.input}>
                    <p>Nhập lại mật khẩu :</p>
                    <Input
                      defaultValue={dataDetail?.point}
                      type="text"
                      placeholder=""
                      {...field}
                    />
                  </div>
                )}
              /> */}
              <Controller
                name="email"
                control={control}
                defaultValue={""}
                rules={{
                  // required: "Vui lòng nhập số điểm"
                }}
                render={({ field }) => (
                  <div className={styleButton.input}>
                    <p>Email :</p>
                    <Input
                      defaultValue={dataDetail?.point}
                      type="text"
                      placeholder=""
                      {...field}
                    />
                  </div>
                )}
              />
              {/* <Controller
                name="point"
                control={control}
                defaultValue={0}
                rules={{
                  required: "Vui lòng nhập số điểm"
                }}
                render={({ field }) => (
                  <div className={styleButton.input}>
                    <p>Phòng ban :</p>
                    <Input
                      defaultValue={dataDetail?.point}
                      type="text"
                      placeholder=""
                      {...field}
                    />
                  </div>
                )}
              /> */}
              <div
                style={{
                  display: "flex",
                  whiteSpace: "nowrap",
                  alignItems: "center"
                }}
              >
                <p>Quyền quản lý :</p>
                <table className={s.table}>
                  <thead>
                    <tr>
                      <th>Chọn</th>
                      <th>Danh sách</th>
                      <th>Thêm</th>
                      <th>Sửa</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input className="parent"  type="checkbox" name="47" />
                      </td>
                      <td>Ứng viên</td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="parent" defaultChecked={ false } type="checkbox" name="72" />
                      </td>
                      <td>Nhà tuyển dụng - KD</td>
                      <td>
                        <input  className="child" type="checkbox" />
                      </td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="parent" type="checkbox" name="73" />
                      </td>
                      <td>Tin tuyển dụng - KD</td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="parent" type="checkbox" name="28" />
                      </td>
                      <td>Blog</td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="parent" type="checkbox" name="41" />
                      </td>
                      <td>Trường điểm</td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="parent" type="checkbox" name="34" />
                      </td>
                      <td>Danh sách tài khoản</td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                      <td>
                        <input className="child" type="checkbox" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                style={{
                  display: "flex"
                }}
              >
                <p
                  style={{
                    display: "flex",
                    marginRight: "20px"
                  }}
                >
                  Ngôn ngữ :
                </p>
                <div
                  style={{
                    display: "flex"
                  }}
                >
                  <label style={{ marginRight: "30px" }}>
                    <input type="checkbox" />
                    Tiếng Việt
                  </label>
                  <label>
                    <input type="checkbox" />
                    Tiếng Anh
                  </label>
                </div>
              </div>
              <div
                style={{
                  display: "flex"
                }}
              >
                <p
                  style={{
                    display: "flex",
                    marginRight: "20px"
                  }}
                >
                  Tất cả:{" "}
                </p>
                <input type="checkbox"></input>
              </div>
              <div onClick={() => onClose()}>aaaa</div>
              <div className={styleButton.btns_add}>
                <button type="submit" className={`${styleButton.update}`}>
                  Cập nhật
                </button>
              </div>
              {/* </form> */}
            </div>
          </form>
          }
        </div>
      }
    </div>
  );
};

export default AdminEditAccount;
