import React, { useEffect, useState } from "react";
import style from "./styles.module.scss";
import Temp_comp from "@/components/quan-ly-chung-UV/Temp_comp";
import Intro from "@/components/ung-vien/intro/intro";
import Image from "next/image";
import Cookies from "js-cookie";
import { POST, POSTCUSTOM } from "@/pages/api/base-api";
import Link from "next/link";
import Taodon from '@/components/taodon/taodon'



export default function DonXinViec() {

  const [ dataCv, setDataCv ] = useState<any>();
  const getDataCVApplyAndSaved = async () => {
    const res = await POSTCUSTOM('candidate/JobApplication', {});
    // console.log('res', res.data);
    if(!res.data.result) {
      alert(`${res?.message}`);
      return 0;
    } else {
      setDataCv(res.data);
    }
  };

  useEffect(() => {
    getDataCVApplyAndSaved();
  },[]);
  return (
    <>
      <Temp_comp>
        <div className={style.container}>
          {/* <Intro /> */}
          <div className={style.my_cv_box}>
            <div className={style.title}>
              <p>ĐƠN XIN VIỆC CỦA TÔI</p>
              <div
                style={{ width: "50px", height: "3px", background: "#f39623" }}
              ></div>
            </div>
            <div className={style.content}>
              <div className={style.create_cv}>
                <Image
                  src="/images/ung-vien/cv-xin-viec/create_new.svg"
                  alt="Icon tạo mới"
                  width={79}
                  height={79}
                />
                <p>Tạo thêm hồ sơ từ các đơn xin việc online</p>
              </div>
              {dataCv?.donXinViecCuaToi && dataCv.donXinViecCuaToi.map((data: any, index: number) => {
                return (
                  <Link href={`${'/' + data.id}`}>
                  <div className={style.item_cv} key={index}>
                    <Image
                      src={data.src}
                      alt={data.alias}
                      width={337}
                      height={477}
                    />
                    <p>{data.name}</p>
                  </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={style.saved_cv}>
            <div className={style.title}>
              <p>ĐƠN XIN VIỆC ĐÃ LƯU</p>
              <div
                style={{ width: "50px", height: "3px", background: "#f39623" }}
              ></div>
            </div>
            <div className={style.content}>
              {dataCv?.donXinViecDaLuu && dataCv?.donXinViecDaLuu.map((data: any, index: number) => {
                return (

                  <Link href={`${'/' + data.idcv}`}>
                  <div className={style.item} key={index}>
                    <Image
                      src={data.src}
                      alt={data.alias}
                      width={337}
                      height={477}
                    />
                    <p>{data.name}</p>
                  </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Temp_comp>
    </>
  );
}
