import { Select } from "antd";
import s from "./NgonNgu.module.scss";
import { useEffect, useState } from "react";
import { listNgonNgu } from "@/functions/functions";

export interface dataProps {
    data: any;
    handleDelete: () => void
    handleData: (e: any) => void;
    id: number;
    isCreate: Boolean;
    isRefresh: Boolean
    
  }
  export const FormDataNgonNgu: React.FC<dataProps> = ({ data, handleDelete, handleData, id, isCreate, isRefresh }) => {
    const [dataObject, setDataObject] = useState<any>();
    const [language, setLanguge] = useState<number>();
    const [certificate, setCertificate] = useState<string>();
    const [result, setResult] = useState<string>();
    const [ errorLanguage, setErrorLanguage ] = useState<Boolean>(false);
    const [ errorCertificate, setErrorCertificate ] = useState<Boolean>(false);
    const [ errorResult, setErrorResult ] = useState<Boolean>(false);
  
  
    const handleCerti = (e: any) => {
      if(e.target.value) {
        setErrorCertificate(false)
      } else {
        setErrorCertificate(true)
      }
      setCertificate(e.target.value);
      let copy = dataObject;
      copy.id = id;
      copy.chung_chi = e.target.value;
      setDataObject(copy);
      handleData(copy);
    };
  
  
    const handleLanguage = (e: any) => {
      if(e) {
        setErrorLanguage(false)
      } else {
        setErrorLanguage(true)
      }
      setLanguge(e);
      let copy = dataObject;
      copy.id = id;
      copy.id_ngonngu = e;
      setDataObject(copy);
      handleData(copy);
    };
  
    const handleResult = (e: any) => {
      if(e.target.value) {
        setErrorResult(false)
      } else {
        setErrorResult(true)
      }
      setResult(e.target.value);
      let copy = dataObject;
      copy.id = id;
      copy.ket_qua = e.target.value;
      setDataObject(copy);
      handleData(copy);
    }

    useEffect(() => {
      if(isCreate) {
        setDataObject([]);
        setLanguge(0);
        setCertificate('');
        setResult('')
      } else {
        // console.log('aaaaa');
        setDataObject(data)
        setLanguge(data?.id_ngonngu);
        setCertificate(data?.chung_chi);
        setResult(data?.ket_qua)
      }
    }, [isCreate, isRefresh])
  
  
  
    return (
      <>
        <div className={s.form}>
          <div className={s.form_input}>
            <label>
              Ngôn ngữ <span style={{ color: "red" }}>*</span>
            </label>
            <div className={s.form_input_div}>
              <Select
                value={language}
                defaultValue={0}
                options={listNgonNgu?.map((item) => ({
                  label: item.label,
                  value: item.value
                }))}
                onBlur={() => {
                  if(language) {
                    setErrorLanguage(false)
                  } else {
                    setErrorLanguage(true)
                  }
                }}
                onChange={(e: any) => handleLanguage(e)}
                className={`${s.select} select_search_AI select_hs_uv`}
              ></Select>
            </div>
            {errorLanguage && 
              <div className={`error_message`}>Vui long nhap truong nay</div>
            }
          </div>
          <div className={s.form_input}>
            <label>
              Chứng chỉ <span style={{ color: "red" }}>*</span>
            </label>
            <div className={s.form_input_div}>
              <input
              onBlur={() => {
                if(certificate) {
                  setErrorCertificate(false)
                } else {
                  setErrorCertificate(true)
                }
              }} 
                className={s.input}
                value={certificate}
                placeholder="Nhập tên chứng chỉ của bạn"
                onChange={(e: any) =>  handleCerti(e)}
              ></input>
            </div>
            {errorCertificate && 
              <div className={`error_message`}>Vui long nhap truong nay</div>
            }
          </div>
          <div className={s.form_input}>
            <label htmlFor="result">
              Kết quả <span style={{ color: "red" }}>*</span>
            </label>
            <div className={s.form_input_div}>
              <input
              onBlur={() => {
                if(result) {
                  setErrorResult(false)
                } else {
                  setErrorResult(true)
                }
              }}
                className={s.input}
                value={result}
                placeholder="Nhập kết quả"
                onChange={(e: any) => handleResult(e)}
              ></input>
            </div>
            {errorResult && (
              <div className={`error_message`}>Vui long nhap truong nay</div>
            )}
          </div>
        </div>
       
        {!isCreate  &&
        <div className={s.btn_xoa} onClick={() => handleDelete()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
            >
              <path
                d="M16.3334 4.75065C16.5352 4.75087 16.7293 4.82814 16.876 4.96666C17.0227 5.10517 17.111 5.29449 17.1229 5.49592C17.1347 5.69736 17.0691 5.8957 16.9396 6.05044C16.8101 6.20517 16.6264 6.30461 16.4261 6.32844L16.3334 6.33398H16.2693L15.5418 15.0423C15.5418 15.6481 15.3103 16.231 14.8947 16.6718C14.4792 17.1125 13.9108 17.3778 13.3061 17.4134L13.1668 17.4173H6.83343C5.56835 17.4173 4.53443 16.4285 4.46477 15.2402L4.46081 15.108L3.7301 6.33398H3.66677C3.46499 6.33376 3.27091 6.2565 3.12418 6.11798C2.97746 5.97946 2.88916 5.79015 2.87734 5.58871C2.86551 5.38728 2.93105 5.18893 3.06056 5.0342C3.19007 4.87947 3.37377 4.78002 3.57414 4.75619L3.66677 4.75065H16.3334ZM11.5834 1.58398C12.0034 1.58398 12.4061 1.7508 12.703 2.04773C13 2.34466 13.1668 2.74739 13.1668 3.16732C13.1665 3.3691 13.0893 3.56318 12.9508 3.7099C12.8122 3.85663 12.6229 3.94492 12.4215 3.95675C12.2201 3.96857 12.0217 3.90303 11.867 3.77352C11.7122 3.64402 11.6128 3.46031 11.589 3.25994L11.5834 3.16732H8.41677L8.41122 3.25994C8.38739 3.46031 8.28795 3.64402 8.13322 3.77352C7.97848 3.90303 7.78014 3.96857 7.5787 3.95675C7.37727 3.94492 7.18796 3.85663 7.04944 3.7099C6.91092 3.56318 6.83366 3.3691 6.83343 3.16732C6.83331 2.76786 6.98417 2.38312 7.25578 2.09022C7.5274 1.79732 7.89969 1.6179 8.29802 1.58794L8.41677 1.58398H11.5834Z"
                fill="#FF0000"
              />
            </svg>
            <div>Xoá</div>
          </div>
        }
      </>
    );
  };