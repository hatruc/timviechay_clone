import React, { useEffect, useState } from "react";
import style from "./styles.module.scss";
import Temp_comp from "@/components/quan-ly-chung-UV/Temp_comp";
import Intro from "@/components/ung-vien/intro/intro";
import Image from "next/image";
import Cookies from "js-cookie";
import { POSTCUSTOM } from "@/pages/api/base-api";
import Link from "next/link";
import { NextPageContext } from "next";


// export const getServerSideProps = async (context: NextPageContext) => {
//   const res = await POSTCUSTOM('candidate/LetterApplication', {});
//   console.log('res', res);
//   if (res?.data?.result) {
//       return {
//           props: {
//               data: res.data
//           }
//       }
//   } else {
//       return {
//           redirect: {
//               destination: '/404',
//               permanent: false,
//           }
//       }
//   }

// }

export const ThuXinViec:React.FC<{ data: any }> = ({ data }) => {
  const [ dataLetterCv, setDataLetterCv ] = useState<any>();
  const getDataCVApplyAndSaved = async () => {
    const res = await POSTCUSTOM('candidate/LetterApplication', {});
    if(!res.data.result) {
      alert(`${res?.message}`);
      return 0;
    } 
    setDataLetterCv(res.data);
  };

  useEffect(() => {
    getDataCVApplyAndSaved();
  },[])
  return (
    <>
      <Temp_comp>
        <div className={style.container}>
          {/* <Intro /> */}
          <div className={style.my_cv_box}>
            <div className={style.title}>
              <p>THƯ XIN VIỆC CỦA TÔI</p>
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
                <p>Tạo thêm hồ sơ từ các thư xin việc online</p>
              </div>
              
              {dataLetterCv?.thuXinViecCuaToi && dataLetterCv.thuXinViecCuaToi.map((data: any, index: number) => {
                return (
                  <Link href={`${'/' + data.idlt}`}>
                  <div className={style.item_cv} key={index}>
                    <Image
                      src={data.nameimg}
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
              <p>THƯ XIN VIỆC ĐÃ LƯU</p>
              <div
                style={{ width: "50px", height: "3px", background: "#f39623" }}
              ></div>
            </div>
            <div className={style.content}>
            {dataLetterCv?.thuXinViecDaLuu && dataLetterCv.thuXinViecDaLuu.map((data: any, index: number) => {
                return (
                  <Link href={`${ '/' + data.idcv}`}>
                  <div className={style.item} key={index}>
                    <Image
                     src={data.nameimg}
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

export default ThuXinViec
