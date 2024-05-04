import React, { useContext, useEffect, useState } from "react";
import s from "@/components/admin/ung-vien/style.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { getAllCity, getDistrict } from "@/functions/functions";
import {  Input, Radio, Select } from "antd";
import { Input_textarea } from "../../point/add";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
import axios from "axios";
const { TextArea } = Input;

type LoginFormInputs = {
  usc_name_email: string;
  usc_company: string;
  usc_phone_tk: string;
  usc_phone: string;
  usc_website: string;
  usc_skype: string;
  usc_address: string;
  usc_city: number;
  usc_district: number;
  usc_logo: string;
  usc_boss: string;
  usc_mst: string;
  usc_note: string;
  meta_tit: string;
  meta_key: string;
  meta_des: string;
  usc_size: number;
  financial_sector: number;
  adm_id: number;
  usc_company_info: string;
};

const AdminDetailRecuitment = () => {
  const { changeDetailAfterUpdate, token, afterUpdate, changeIdRecuitment, idRecument, fullRight } =
    useContext(NTD_UV_Context);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<LoginFormInputs>();
  const [isFetching, setIsFetching] = useState(false);
  const [dataEditOne, setDataEditOne] = useState<any>();
  const [detailNTD, setDetailNTD] = useState<any>();
  const [avatarApi, setAvatarApi] = useState<any>("");
  const [listDistrictFilter, setListDistricFilter] = useState<any>([]);
  const [districtReRender, setDistrictReRender] = useState<number>(1);
  const [flowAfterUpdate, setFlowAfterUpdate] = useState<number>(0);
  const [city, setCity] = useState<number>();
  const [listSupport, setListSupport] = useState<any>();
  const [listTC, setListTC] = useState<any>();
  const [isAgain, setIsAgain ] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data: any) => {
    setIsFetching(true);
    editEmployerSubmit(data)
    setIsFetching(false);
  };

  const handleChangeFile = (e: any) => {
    setAvatarApi(e.target.files[0]);
  };

  const handleCKEChangeOne = async (e: any, type: string) => {
    setDataEditOne(e);
  };
  const getAllKD = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/getAllKD`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      {
      }
      if (res.data.data.result) {
        setListSupport([
          {
            adm_id: 0,
            adm_name: "Chọn người hỗ trợ"
          },
          ...res.data.data.data
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTC = async () => {

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/financialSectors`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      {
      }
      if (res.data.data.result) {
        setListTC([
          {
            cate_id: 0,
            cate_name: "Chọn lĩnh vực"
          },
          ...res.data.data.data
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getDetailNTD = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/detailEmployer`,
      {
        usc_id: idRecument.idDetailItem
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (res.data.data.result) {
      setDetailNTD(res.data.data.data);
      setFlowAfterUpdate(1);
    }
  };

  const resetFields = () => {
    const listKey = [
      "usc_phone_tk",
      "usc_pass",
      "usc_company",
      "usc_phone",
      "usc_website",
      "usc_skype",
      "usc_city",
      "usc_district",
      "usc_address",
      "usc_logo",
      "usc_boss",
      "usc_mst",
      "usc_note",
      "meta_tit",
      "meta_key",
      "meta_des",
      "usc_size",
      "financial_sector",
      "usc_company_info",
      // "adm_id",
      "id_bophankd"
    ];

    listKey.map((key: any) => {
      setValue( key , detailNTD?.key?.trim());
    })
    setValue( "usc_company_info" , detailNTD?.usc_company_info?.trim());
  };

  const editEmployerSubmit = async (data: any) => {
    let getDetailSupport: any;
    if (data.adm_id) {
      getDetailSupport = listSupport.find((item: any) => item.adm_id == data.adm_id);
    }

    const formData = new FormData();

    formData.append('usc_id', idRecument.idDetailItem);
    formData.append('usc_name_email', data?.usc_name_email ? data?.usc_name_email : detailNTD.usc_name_email);
    formData.append('usc_phone_tk', data?.usc_phone_tk ? data?.usc_phone_tk : detailNTD.usc_phone_tk);
    formData.append('usc_pass', data?.usc_pass ?  data?.usc_pass?.trim() : detailNTD?.usc_pass.trim());
    formData.append('usc_company', data?.usc_company ? data?.usc_company?.trim() : detailNTD?.usc_company.trim());
    formData.append('usc_phone', data?.usc_phone ?  data?.usc_phone ? data?.usc_phone : '' : detailNTD?.usc_phone ? detailNTD?.usc_phone : '');
    formData.append('usc_website', data?.usc_website ? data?.usc_website?.trim() : detailNTD?.usc_website?.trim());
    formData.append('usc_skype', data?.usc_skype ? data?.usc_skype?.trim() : detailNTD?.usc_skype?.trim());
    formData.append('usc_city', data?.usc_city ? data?.usc_city : detailNTD?.usc_city);
    formData.append('usc_district', data?.usc_district ? data?.usc_district : detailNTD?.usc_district);
    formData.append('usc_address', data?.usc_address ? data?.usc_address : detailNTD?.usc_address);
    formData.append('usc_logo', avatarApi);
    formData.append('usc_boss', data?.usc_boss ?  data?.usc_boss?.trim() : detailNTD?.usc_boss?.trim());
    formData.append('usc_mst', data?.usc_mst ? data?.usc_mst?.trim() : detailNTD?.usc_mst?.trim());
    formData.append('usc_note', data?.usc_note ? data?.usc_note?.trim() : detailNTD?.usc_note?.trim()  );
    formData.append('meta_tit', data?.meta_tit ? data?.meta_tit?.trim() : detailNTD?.meta_tit?.trim());
    formData.append('meta_key', data?.meta_key ?  data?.meta_key?.trim() : detailNTD?.meta_key?.trim());
    formData.append('meta_des', data?.meta_des ? data?.meta_des?.trim() : detailNTD?.meta_des?.trim());
    formData.append('usc_size', data?.usc_size ? data?.usc_size : detailNTD?.usc_size);
    formData.append('financial_sector', data?.financial_sector ? data?.financial_sector : detailNTD?.financial_sector);
    formData.append('usc_company_info', dataEditOne);
    formData.append('usc_kd', getDetailSupport?.adm_id);
    formData.append('usc_kd_crm', getDetailSupport?.id_bophankd);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/editEmployer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,  
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if(res.data.data.result) {
        if (flowAfterUpdate == 0) {
          changeDetailAfterUpdate({
            currentNumberSidebar: 22,
          });
          changeIdRecuitment({
            idDetailItem: 0,
            edit: 0
          })
        } else if (flowAfterUpdate == 1) {
          changeDetailAfterUpdate({
            currentNumberSidebar: 22,
          });
          changeIdRecuitment({
            idDetailItem: 0,
            edit: 1
          })
        } else if(flowAfterUpdate == 2){
          return
        }
      }
    } catch (error) {
      console.error("Error editing employer:", error);
    }
};


  useEffect(() => {
    getAllKD();
    getAllTC();
    if (idRecument?.edit == 2) {
      getDetailNTD();
    } else {
      setDetailNTD([]);
    }

    if (city) {
      const newDistric = getDistrict(city);
      setListDistricFilter(newDistric);
      setDistrictReRender(newDistric[0].value);
    } else {
      setDistrictReRender(0);
      setListDistricFilter([
        {
          label: "Chọn quận huyện",
          value: 0
        }
      ]);
    }
  }, [city]);


  return (
    <div>
      {" "}
      <div
        style={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "50px"
        }}
      >
        <span>Những ô dấu sao (*) là bắt buộc phải nhập.</span>
        {detailNTD && (
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            
            <Controller
              name="usc_phone_tk"
              control={control}
              defaultValue={detailNTD?.usc_phone_tk}
              rules={{
                required: "Vui lòng nhập email công ty"
              }}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span>*</span>Email công ty :
                  </p>
                  <Input
                  disabled
                    type="text"
                    defaultValue={detailNTD?.usc_phone_tk}
                    placeholder=""
                    {...field}
                  />
                </div>
              )}
            />
            <Controller
              name="usc_name_email"
              control={control}
              defaultValue={detailNTD?.usc_name_email}
              rules={{
                required: "Vui lòng nhập email công ty"
              }}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span>*</span>Email công ty :
                  </p>
                  <Input
                    type="email"
                    defaultValue={detailNTD?.usc_name_email}
                    placeholder=""
                    {...field}
                  />
                </div>
              )}
            />
            <Controller
              name="usc_company"
              control={control}
              defaultValue={detailNTD?.usc_company}
              rules={{
                required: "Vui lòng nhập tên công ty "
              }}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span>*</span> Tên công ty :
                  </p>
                  <Input type="text" placeholder="" {...field} />
                </div>
              )}
            />
            <Controller
              name={afterUpdate.edit == 2 ? "usc_phone" : "usc_phone_tk"}
              control={control}
              defaultValue={afterUpdate.edit == 2 ? detailNTD?.usc_phone  : detailNTD?.usc_phone_tk}
              rules={{
                required: "Vui lòng nhập số điện thoại"
              }}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span>*</span> Số điện thoại :
                  </p>
                  <Input type="text" placeholder="" {...field} />
                </div>
              )}
            />
            <Controller
              name="usc_website"
              control={control}
              defaultValue={detailNTD?.usc_website}
              rules={{
                required: "Vui lòng nhập mật khẩu"
              }}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span>*</span>Website :
                  </p>
                  <Input type="text" {...field} />
                </div>
              )}
            />
            <Controller
              name="usc_skype"
              control={control}
              defaultValue={detailNTD?.usc_skype}
              rules={{
                required: "Vui lòng nhập Skype or Zalo"
              }}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span>*</span>Skype or Zalo :
                  </p>
                  <Input type="text" placeholder="" {...field} />
                </div>
              )}
            />
            <Controller
              name="usc_address"
              control={control}
              defaultValue={detailNTD?.usc_address}
              rules={{
                required: "Vui lòng nhập mật khẩu"
              }}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span>*</span> Địa chỉ công ty :
                  </p>
                  <TextArea placeholder="" {...field} />
                </div>
              )}
            />

            <Controller
              name="usc_city"
              control={control}
              defaultValue={
                detailNTD?.usc_city ? Number(detailNTD?.usc_city) : 0
              }
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span></span>Tỉnh / thành phố :
                  </p>
                  <Select
                    {...field}
                    className={``}
                    defaultValue={
                      detailNTD?.usc_city ? Number(detailNTD?.usc_city) : 0
                    }
                    placeholder="Please select"
                    onChange={(selectedOptions) => {
                      setCity(selectedOptions);
                      field.onChange(selectedOptions);
                    }}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: 0,
                        label: "Chọn tỉnh thành"
                      },
                      ...getAllCity()
                    ]}
                    size="middle"
                  />
                </div>
              )}
            />

            <Controller
              name="usc_district"
              control={control}
              defaultValue={
                detailNTD?.usc_district ? Number(detailNTD?.usc_district) : 0
              }
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span></span>Quận / huyện :
                  </p>
                  <Select
                    {...field}
                    className={``}
                    defaultValue={
                      detailNTD?.usc_district
                        ? Number(detailNTD?.usc_district)
                        : 0
                    }
                    value={districtReRender}
                    placeholder="Please select"
                    onChange={(selectedOptions) => {
                      field.onChange(selectedOptions);
                      setDistrictReRender(selectedOptions);
                    }}
                    style={{ width: "100%" }}
                    options={listDistrictFilter}
                    size="middle"
                  />
                </div>
              )}
            />

            <Controller
              name="usc_logo"
              control={control}
              defaultValue={detailNTD?.usc_logo}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                Logo công ty :
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%"
                    }}
                  >
                    <input
                      type="file"
                      onChange={(e) => handleChangeFile(e)}
                    ></input>
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        color: "rgb(255, 0, 0)",
                        fontSize: "12px"
                      }}
                    >
                      (Kích thước chuẩn 190 x 190)
                    </span>
                  </div>
                </div>
              )}
            />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px"
                }}
              >
                <Controller
                  name="usc_boss"
                  control={control}
                  defaultValue={detailNTD?.usc_boss}
                  render={({ field }) => (
                    <div className={s.input}>
                      <p>Tổng giám đốc :</p>
                      <Input placeholder="" {...field} />
                    </div>
                  )}
                />
                <Controller
                  name="usc_mst"
                  control={control}
                  defaultValue={detailNTD?.usc_mst}
                  render={({ field }) => (
                    <div className={s.input}>
                      <p>Mã số thuế :</p>
                      <Input placeholder="" {...field} />
                    </div>
                  )}
                />
                <Controller
                  name="usc_note"
                  control={control}
                  defaultValue={detailNTD?.usc_note}
                  render={({ field }) => (
                    <div className={s.input}>
                      <p>Ghi chú :</p>
                      <TextArea placeholder="" {...field} />
                    </div>
                  )}
                />
                <Controller
                  name="meta_tit"
                  control={control}
                  defaultValue={detailNTD?.meta_tit}
                  render={({ field }) => (
                    <div className={s.input}>
                      <p>(SEO) Title :</p>
                      <Input placeholder="" {...field} />
                    </div>
                  )}
                />
                <Controller
                  name="meta_key"
                  control={control}
                  defaultValue={detailNTD?.meta_key}
                  render={({ field }) => (
                    <div className={s.input}>
                      <p>(SEO) Key :</p>
                      <Input placeholder="" {...field} />
                    </div>
                  )}
                />
                <Controller
                  name="meta_des"
                  control={control}
                  defaultValue={detailNTD?.meta_des}
                  render={({ field }) => (
                    <div className={s.input}>
                      <p>(SEO) Description :</p>
                      <TextArea placeholder="" {...field} />
                    </div>
                  )}
                />
              </div>
            <Controller
              name="usc_size"
              defaultValue={detailNTD?.usc_size ? detailNTD?.usc_size : 0}
              control={control}
              rules={{
                required: "Vui lòng nhập Quy mô công ty"
              }}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span>*</span>Quy mô công ty :
                  </p>
                  <Select
                    {...field}
                    className={``}
                    defaultValue={[]}
                    placeholder="Chọn quy mô"
                    onChange={(selectedOptions: any) => {
                      field.onChange(selectedOptions);
                    }}
                    style={{ width: "100%" }}
                    options={[
                      {
                        label: "Chọn quy mô",
                        value: 0
                      },
                      {
                        label: "Dưới 20 nhân viên",
                        value: 1
                      },
                      {
                        label: "20 - 50 nhân viên",
                        value: 2
                      },
                      {
                        label: "50 - 100 nhân viên",
                        value: 3
                      },
                      {
                        label: "100 - 300 nhân viên",
                        value: 4
                      },
                      {
                        label: "300 - 1000 nhân viên",
                        value: 5
                      },
                      {
                        label: "1000 - 3000 nhân viên",
                        value: 6
                      },
                      {
                        label: "Trên 3000 nhân viên",
                        value: 7
                      }
                    ]}
                    size="middle"
                  />
                </div>
              )}
            />
              <Controller
                name="financial_sector"
                defaultValue={detailNTD?.usc_size ? detailNTD?.usc_size : 0}
                control={control}
                render={({ field }) => (
                  <div className={s.input}>
                    <p>
                      <span>*</span>Lĩnh vực tài chính :
                    </p>
                    <Select
                      {...field}
                      className={``}
                      defaultValue={[]}
                      placeholder="Chọn quy mô"
                      onChange={(selectedOptions: any) => {
                        field.onChange(selectedOptions);
                      }}
                      style={{ width: "100%" }}
                      options={listTC?.map((item: any) => (
                        {
                          'label': item.cate_name,
                          'value': item.cate_id
                        }
                      ))}
                      size="middle"
                    />
                  </div>
                )}
              />
            <Controller
              name="adm_id"
              control={control}
              rules={{
                required: afterUpdate.edit == 2 ? true : false
              }}
              defaultValue={detailNTD?.usc_kd ? Number(detailNTD?.usc_kd) : 0}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    {afterUpdate.edit == 2 && <span>*</span>}Kinh doanh hỗ trợ :
                  </p>
                  <Select
                    {...field}
                    className={``}
                    defaultValue={detailNTD?.usc_kd ? Number(detailNTD?.usc_kd)  : 0}
                    onChange={(selectedOptions) => {
                      field.onChange(selectedOptions);
                    }}
                    style={{ width: "100%" }}
                    options={
                      listSupport &&
                      listSupport?.map((support: any) => ({
                        value: Number(support.adm_id),
                        label: support.adm_name
                      }))
                    }
                    size="middle"
                    disabled={!fullRight}
                  />
                </div>
              )}
            />
            <Controller
              name="usc_company_info"
              control={control}
              defaultValue={detailNTD?.usc_company_info}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span>*</span>Mô tả công ty :
                  </p>
                  <Input_textarea
                    value={detailNTD?.usc_company_info}
                    name="img"
                    handleChange={handleCKEChangeOne}
                    dataCustom={() => { } } isAgain={isAgain} handleUrlDelete={function (e: string): void {
                      throw new Error("Function not implemented.");
                    } } />
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
                onChange={(e) => {
                  changeDetailAfterUpdate({
                    currentNumberSidebar: afterUpdate.currentNumberSidebar,
                    idDetailItem: afterUpdate.idDetailItem,
                    edit: e.target.value
                  });
                  setFlowAfterUpdate(e.target.value);
                }}
                defaultValue={flowAfterUpdate}
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
    </div>
  );
};

export default AdminDetailRecuitment;
