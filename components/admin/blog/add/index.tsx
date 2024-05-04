import React, { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import s from "@/components/admin/ung-vien/style.module.scss";
import style from './index.module.scss'
import { Checkbox, Input, Radio, Select } from "antd";
import axios from "axios";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
import { Input_textarea } from "../../point/add";
import { createLinkTilte, handleRemoveImage } from "@/functions/functions";
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

const AdminBlogAdd = () => {
  const { idBlog, afterUpdatev } = useContext(NTD_UV_Context);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<LoginFormInputs>();
  const {  token, changeDetailAfterUpdate, afterUpdate, changeIdBlog, handlePermission } =
    useContext(NTD_UV_Context);
  const [isFetching, setIsFetching] = useState(false);
  const [dataEditOne, setDataEditOne] = useState<any>();
  const [dataEditTwo, setDataEditTwo] = useState<any>();
  const [isUpdate, setIsUpdate] = useState<Boolean>();
  const [listImg, setListImg] = useState<any>([]);
  const [picture, setPicture] = useState<any>("");
  const [ imgUrl, setImgUrl ] = useState<any>();
  const [dataDetail, setDataDetail] = useState<any>();
  const [flowAfterUpdate, setFlowAfterUpdate] = useState<number>(0);
  const [detailBlog, setDetailBlog] = useState<any>();
  const [ blogCategory, setBlogCategory ] = useState<any>([]);
  const [ listUrlDelete, setListUrlDelete ] = useState<any>([]);
  const [ active, setActive ] = useState<any>(true);
  const [ news, setNews ] = useState<any>(false);
  const [ hot, setHot ] = useState<any>(false);
  const [ titleLength, setTitleLength ] = useState<number>(0);
  const [ titleDesLength, setTitleDesLength ] = useState<number>(0);
  const [ url, setUrl ] = useState<string>('');

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data: any) => {
    if(url.length < 2) {
      alert('Vui lòng nhập Title hoặc Url')
      return 0
    }
    await listUrlDelete.forEach( (element: string) => {
      handleRemoveImage(element, token)
    });
    setIsFetching(true);
    const formData = new FormData();
    console.log('data form', data);
    formData.append("new_category_id", data?.new_category_id || "");
    formData.append("new_title", data?.new_title || "");
    formData.append("new_title_rewrite", url.split(' ').join('-') || "");
    formData.append("new_order", data?.new_order || "");
    formData.append("new_tt", url.split('-').join(' ') || "");
    formData.append("new_des", data?.new_des || "");
    formData.append("new_keyword", data?.new_keyword || "");
    formData.append("key_lq", data?.key_lq || "");
    formData.append("new_teaser", dataEditOne || "");
    formData.append("new_active", active  ? '1' : '0');
    formData.append("new_new", news  ? '1' : '0');
    formData.append("new_hot",hot ? '1' : '0');
    formData.append("new_description", dataEditTwo || "");

    if (picture) {
      formData.append("new_picture", picture);
    }

    const newDataPost = formData;

    try {
      const post = await axios.post(
        "https://timviechay.vn/api/work247/admin/CreateBlog",
        newDataPost,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (post?.data.data.result) {
        if (flowAfterUpdate == 1) {
          changeDetailAfterUpdate({
            currentNumberSidebar: 41,
          });
          changeIdBlog({
            idDetailItem: 0,
            edit: 1
          })
        } else if(flowAfterUpdate == 2){
          changeDetailAfterUpdate({
            currentNumberSidebar: 41,
          });
          changeIdBlog({
            idDetailItem: post?.data.data.new_id,
            edit: 2
          })
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
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setPicture(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
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
      setValue(key, detailBlog?.key?.trim());
    });
    setValue("new_description", detailBlog?.usc_company_info?.trim());
  };

  useEffect(() => {
    getAllBlogCate();
    setDetailBlog([]);
  }, []);

  return (
    <div style={{
      position: 'relative'
    }}>
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
                  <p className={style.input_form}>
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
                  <p className={style.input_form}>
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
                 <p><span>*</span>URL :</p>
                 <textarea style={{
                  width: '100%',
                  height: '32px',
                  borderRadius: '5px',
                  padding: '4px 11px',
                  border: '1px solid #d9d9d9'
                 }}  value={url} onChange={(e) => {
                  let length = e.target.value.split('-').join('').length;
                  if (length <= 70) {
                  setUrl(e.target.value)
                  setTitleLength(length);
                  }
                 }}></textarea>
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
                  <p className={style.input_form}>Thứ tự :</p>
                  <Input type="text" {...field} />
                </div>
              )}
            />
            <Controller
              name="new_picture"
              control={control}
              defaultValue={detailBlog?.new_picture}
              render={({ field }) => (
                <div style={{
                  display: 'flex'
                }}>
                <div style={{
                  width: '100%'
                }} className={s.input}>
                  <p
                    style={{
                      width: "50%"
                    }}
                    className={style.input_form}
                  >
                    Ảnh minh họa :
                  </p>
                  <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row-reverse",
                        gap: "20px",
                        alignItems: "flex-start",
                        justifyContent: "flex-end",

                  }}>

                    <input
                      style={{
                        width: "50%",
                        border: "1px solid #d9d9d9",
                        padding: "8px",
                        borderRadius: "6px",
                        visibility: detailBlog?.new_id ? "hidden" : "visible",
                        order: detailBlog?.new_id ? 2 : 1
                      }}
                      type="file"
                      id="fileInput"
                      placeholder={detailBlog?.new_picture}
                      onChange={(e: any) => {
                        setPicture(e.target.files[0]);
                        handleFileChange(e)
                        field.onChange(e);
                      }}
                    />
                    <img src={imgUrl} alt="" style={{
                      width: '100px',
                      height: '100px'
                    }}/>
                  </div>
                </div>
                </div>
              )}
            />
            <Controller
              name="new_tt"
              control={control}
              defaultValue={detailBlog.new_tt}
              render={({ field }) => (
                <div className={s.input}>
                  <p><span>*</span>Title ((60-70 ký tự) {titleLength}/70 ký tự) :</p>
                  <textarea value={url.split('-').join(' ')}   style={{
                        width: "100%",
                        border: "1px solid #d9d9d9",
                        padding: "8px",
                        borderRadius: "6px",
                        display: "flex",
                        justifyContent: "flex-start",
                        outline: 'none',
                      }} onChange={(e) => {
                        const length = e.target.value.split(' ').join('').length;
                        const newUrl = createLinkTilte(e.target.value)
                        if (length <= 70) {
                          setUrl(newUrl)
                          setTitleLength(length);
                        }
                      }}></textarea>
                </div>
              )}
            />

            <Controller
              name="new_des"
              control={control}
              rules={{
                required: true
              }}
              defaultValue={detailBlog?.new_des}
              render={({ field }) => (
                <div className={s.input}>
                  <p className={style.input_form}>
                    <span>*</span>Description ({titleDesLength}/250 ký tự) :
                  </p>
                  <TextArea style={{
                    height: '100px'
                  }} placeholder="" {...field}  onChange={(e) => {
                        const length = e.target.value.length;
                        if (length <= 250) {
                          setTitleDesLength(length)
                          field.onChange(e); 
                        }}}/>
                </div>
              )}
            />

            <Controller
              name="new_keyword"
              control={control}
              defaultValue={detailBlog?.new_keyword}
              render={({ field }) => (
                <div className={s.input}>
                  <p className={style.input_form}>Keywords :</p>
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
                  <p className={style.input_form}>Key việc làm gợi ý :</p>
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
                  <div 
                  // style={{
                  //   position: 'fixed',
                  //   top: '100px',
                  //   right: 0,
                  //   left: '200px',
                  //   bottom: 0,
                  //   zIndex: 10000
                  // }}
                  >
                    <Input_textarea
                      value={detailBlog?.new_teaser}
                      name="img"
                      handleChange={handleCKEChangeOne}
                      dataCustom={(e: any) => console.log("blog", e)} isAgain={false} handleUrlDelete={(e: string) => setListUrlDelete([...listUrlDelete, e])} 
                      />
                  </div>
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
                    } } isAgain={false} handleUrlDelete={(e: string) => setListUrlDelete([...listUrlDelete, e])}                  />
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
        )}
      </div>
      }
    </div>
  );
};

export default AdminBlogAdd;


