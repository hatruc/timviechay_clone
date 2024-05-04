import React, { useContext, useEffect, useState } from "react";
import { Input_textarea } from "../../point/add";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { getAllCity, getDistrict, handleRemoveImage, job_array } from "@/functions/functions";
import s from "@/components/admin/ung-vien/style.module.scss";
import { Checkbox, Input, Radio, Select } from "antd";
import axios from "axios";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
const { TextArea } = Input;

type LoginFormInputs = {
  new_category_id: number;
  new_title: string;
  new_title_rewrite: string;
  new_order: number;
  new_picture: string;
  new_tt: string;
  new_des: string;
  new_keyword: string;
  key_lq: string;
  new_new: boolean;
  new_teaser: any;
  new_active: boolean;
  new_hot: boolean;
  new_description: string;
};

const AdminBlogDetail = () => {
  const { idBlog, afterUpdatev } = useContext(NTD_UV_Context);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<LoginFormInputs>();
  const { changeIdBlog, token, changeDetailAfterUpdate, handlePermission } =
    useContext(NTD_UV_Context);
  const [dataEditOne, setDataEditOne] = useState<any>();
  const [dataEditTwo, setDataEditTwo] = useState<any>();
  const [isUpdate, setIsUpdate] = useState<Boolean>();
  const [listImg, setListImg] = useState<any>([]);
  const [picture, setPicture] = useState<any>("");
  const [dataDetail, setDataDetail] = useState<any>();
  const [flowAfterUpdate, setFlowAfterUpdate] = useState<number>(0);
  const [detailBlog, setDetailBlog] = useState<any>();
  const [ blogCategory, setBlogCategory ] = useState<any>(null);
  const [ listUrlDelete, setListUrlDelete ] = useState<any>([]);
  const [ active, setActive ] = useState<any>(false);
  const [ news, setNews ] = useState<any>(false);
  const [ hot, setHot ] = useState<any>(false);


  const getDetailBlog = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/detailBlog`,
      {
        new_id: idBlog.idDetailItem
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (res.data.data.result) {
      setDetailBlog(res.data.data.data);
      setActive(res.data.data.data.new_active  == 1 ? true : false);
      setNews(res.data.data.data.new_new  == 1 ? true : false);
      setHot(res.data.data.data.new_hot  == 1 ? true : false)
      setFlowAfterUpdate(1);
    }
  };

  

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data: any) => {
    
    const formData = new FormData();

    formData.append("new_category_id", data?.new_category_id || "");
    formData.append("new_title", data?.new_title || "");
    formData.append("new_title_rewrite", data?.new_title_rewrite || "");
    formData.append("new_order", data?.new_order || "");
    formData.append("new_tt", data?.new_tt || "");
    formData.append("new_des", data?.new_des || "");
    formData.append("new_keyword", data?.new_keyword || "");
    formData.append("key_lq", data?.key_lq || "");
    formData.append("new_teaser", dataEditOne ? dataEditOne :  detailBlog.new_teaser);
    formData.append("new_active", active ? "1" : "0");
    formData.append("new_new", news  ? '1' : '0');
    formData.append("new_hot",hot ? '1' : '0');
    formData.append("new_description", dataEditTwo ? dataEditTwo : detailBlog.new_description);

    if (picture) {
      formData.append("new_picture", picture);
    }

    const newDataPost = formData;

    try {
      formData.append("new_id", detailBlog.new_id);
      console.log('(listUrlDelete', listUrlDelete);
      // await Promise.all(listUrlDelete.map((element: string) => handleRemoveImage(element, token)));
      const post = await axios.post(
        "https://timviechay.vn/api/work247/admin/UpdateBlog",
        newDataPost,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (post?.data.data.result) {
        if (flowAfterUpdate == 0) {
          changeDetailAfterUpdate({
            currentNumberSidebar: 41,
          });
          changeIdBlog({
            idDetailItem: 0,
            edit: 0
          })
        } else if (flowAfterUpdate == 1) {
          changeDetailAfterUpdate({
            currentNumberSidebar: 40,
          });
          changeIdBlog({
            idDetailItem: 0,
            edit: 1
          })
        } else if(flowAfterUpdate == 2){
          return
        }
      }
    } catch (error: any) {
      alert(error);
    }
  };

  const handleCKEChangeOne = async (e: any, type: string) => {
    setDataEditOne(e);
  };

  const handleCKEChangeTwo = (e: any, type: string) => {
    setDataEditTwo(e);
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
      setValue(key, detailBlog?.key?.trim());
    });
    setValue("new_description", detailBlog?.usc_company_info?.trim());
  };

  const getAllBlogCate = async () => {
    try {
      const post  = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/allBlogCate`, {},  {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      if(post?.data.data.result) {
        setBlogCategory(post.data.data.data)
       
      }
    } catch (err) {
      
    }
  }

  useEffect(() => {
    getAllBlogCate();
    if (idBlog?.edit == 2) {
      getDetailBlog();
    } else {
      setDetailBlog([]);
    }
  }, [idBlog.idDetailItem]);

  return (
    <div>
      {" "}

      {
        blogCategory  &&
      <div
        style={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "50px 0"
        }}
      >
        <span>Những ô dấu sao (*) là bắt buộc phải nhập.</span>

        {detailBlog && (
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="new_category_id"
              control={control}
              defaultValue={
                Number(detailBlog?.lang_id) ? Number(detailBlog?.lang_id) : 0
              }
              rules={{
                required: "Vui lòng nhập email công ty"
              }}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span>*</span>Chọn danh mục :
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
                        cat_id: 0,
                        cat_name: "Chọn danh mục"
                      },
                      ...blogCategory
                    ].map((category) => (
                      {
                        'value': category.cat_id,
                        'label': category.cat_name
                      }
                    ))}
                    size="middle"
                  />
                </div>
              )}
            />
            <Controller
              name="new_title"
              control={control}
              defaultValue={detailBlog?.new_title}
              rules={{
                required: "Vui lòng nhập tiêu đề tin"
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
              name="new_title_rewrite"
              control={control}
              defaultValue={detailBlog?.new_title_rewrite}
              render={({ field }) => (
                <div className={s.input}>
                  <p>URL :</p>
                  <Input type="text" placeholder="" {...field} />
                </div>
              )}
            />
            <Controller
              name="new_order"
              control={control}
              defaultValue={
                Number(detailBlog?.new_order)
                  ? Number(detailBlog?.new_order)
                  : 0
              }
              render={({ field }) => (
                <div className={s.input}>
                  <p>Thứ tự :</p>
                  <Input type="text" {...field} />
                </div>
              )}
            />
            <Controller
              name="new_picture"
              control={control}
              render={({ field }) => (
                <div className={s.input}>
                  <p
                    style={
                      {
                        // width: "100%"
                      }
                    }
                  >
                    Ảnh minh họa :
                  </p>
                  <input
                    style={{
                      width: "100%",
                      border: "1px solid #d9d9d9",
                      padding: "8px",
                      borderRadius: "6px",
                      display: "flex",
                      justifyContent: "flex-start"
                    }}
                    type="file"
                    placeholder={picture ? picture : detailBlog?.new_picture}
                    onChange={(e: any) => {
                      setPicture(e.target.files[0]);
                      field.onChange(e);
                    }}
                  />
                </div>
              )}
            />
            <Controller
              name="new_tt"
              control={control}
              defaultValue={detailBlog.new_tt}
              render={({ field }) => (
                <div className={s.input}>
                  <p>Title ((60-70 ký tự) 0/70 ký tự) :</p>
                  <TextArea placeholder="" {...field} />
                </div>
              )}
            />

            <Controller
              name="new_des"
              control={control}
              defaultValue={detailBlog?.new_des}
              render={({ field }) => (
                <div className={s.input}>
                  <p>
                    <span></span>Description (0/250 ký tự) :
                  </p>
                  <TextArea placeholder="" {...field} />
                </div>
              )}
            />

            <Controller
              name="new_keyword"
              control={control}
              defaultValue={detailBlog?.new_keyword}
              render={({ field }) => (
                <div className={s.input}>
                  <p>Keywords :</p>
                  <TextArea placeholder="" {...field} />
                </div>
              )}
            />

            <Controller
              name="key_lq"
              defaultValue={detailBlog?.key_lq}
              control={control}
              render={({ field }) => (
                <div className={s.input}>
                  <p>Key việc làm gợi ý :</p>
                  <TextArea placeholder="" {...field} />
                </div>
              )}
            />

            <Controller
              name="new_teaser"
              control={control}
              defaultValue={detailBlog?.new_teaser}
              render={({ field }) => (
                <div
                  className={s.input}
                  style={{
                    display: "block"
                  }}
                >
                  <p
                    style={{
                      marginBottom: "20px"
                    }}
                  >
                    Tóm tắt :
                  </p>
                  <Input_textarea
                    value={detailBlog?.new_teaser}
                    name="img"
                    handleChange={handleCKEChangeOne}
                    dataCustom={(e) => console.log("blog", e)}
                    isAgain={false}
                    handleUrlDelete={(e: string) => { console.log('url delete nay', e) , setListUrlDelete([...listUrlDelete, e])}}
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
                name="new_active"
                control={control}
                render={({ field }) => (
                  <div className={s.input}>
                    <p
                      style={{
                        marginRight: "10px"
                      }}
                    >
                      Kích hoạt :
                    </p>
                    <input style={{
                      marginRight: '30px'
                    }} checked={active}  type="checkbox" onChange={() => setActive(!active)}></input>

                  </div>
                )}
              />
              <Controller
                name="new_new"
                control={control}
                render={({ field }) => (
                  <div className={s.input}>
                    <p
                      style={{
                        marginRight: "10px"
                      }}
                    >
                      Tin mới :
                    </p>
                    <input style={{
                      marginRight: '30px'
                    }} checked={news}  type="checkbox" onChange={() => setNews(!news)}></input>
                  </div>
                )}
              />
              <Controller
                name="new_hot"
                control={control}
                render={({ field }) => (
                  <div className={s.input}>
                    <p
                      style={{
                        marginRight: "10px"
                      }}
                    >
                      Tin hot :
                    </p>
                    <input style={{
                      marginRight: '30px'
                    }} checked={hot}  type="checkbox" onChange={() => setHot(!hot)}></input>
                  </div>
                )}
              />
            </div>
            <Controller
              name="new_description"
              control={control}
              defaultValue={detailBlog?.new_description}
              render={({ field }) => (
                <div
                  className={s.input}
                  style={{
                    display: "block"
                  }}
                >
                  <p
                    style={{
                      marginBottom: "20px"
                    }}
                  >
                    Nội dung :
                  </p>
                  <Input_textarea
                    value={detailBlog?.new_description}
                    name="img"
                    handleChange={handleCKEChangeTwo}
                    dataCustom={function (e: any): void {
                      throw new Error("Function not implemented.");
                    }}
                    isAgain={false}
                    handleUrlDelete={(e: string) => setListUrlDelete([...listUrlDelete, e])}
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
                }}
              >
                Làm lại
              </button>
            </div>
          </form>
        )}
      </div>
      }
    </div>
  );
};

export default AdminBlogDetail;
