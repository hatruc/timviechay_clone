import React, { useEffect, useState } from "react";
import style from "./styles.module.scss";
import Image from "next/image";
import Temp_comp from "@/components/quan-ly-chung-UV/Temp_comp";
import Intro from "@/components/ung-vien/intro/intro";
import { POST, POST_SERVER } from "@/pages/api/base-api";
import Cookies from "js-cookie";
import { Alert } from "antd";
import Link from "next/link";
import { formatDateDifference, getHanNop, getMucLuong, getTokenServerSide, handleImageSource } from "@/functions/functions";
import { NextPageContext } from "next";


// const convertTime = (date: string) => {
//   const futureTime = new Date(date);
//   const currentTime = new Date();
//   const timeDifference = futureTime.getTime() - currentTime.getTime();
//   const remainingMinutes = Math.floor(timeDifference / (1000 * 60));
//   const remainingHours = Math.floor(remainingMinutes / 60);
//   const remainingDays = Math.floor(remainingHours / 24);

//   let remainingTime: any;
//   if (remainingDays >= 1) {
//     remainingTime = remainingDays;
//   } else if (remainingHours >= 1) {
//     remainingTime = remainingHours;
//   } else {
//     remainingTime = remainingMinutes;
//   }
//   return remainingTime;
// };

export const getServerSideProps = async (context: NextPageContext) => {
  // console.log(context?.req?.headers?.cookie)
  let returnData = {
    daUngTuyen: 0,
    cout_viecLamPhuHop: 0,
    mauCvDaTao: 0,
    xemHoSo: 0,
    viecLamPhuHop: [],
    mauCvDeXuat: [],
    camNangTimViec: [],
    CvCuaToi: [],
  }
  const token = getTokenServerSide(context);
  const result = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_CANDI}/candidate/ManageAllCandi`, { ga: 1 }, token)
  if (result?.result) {
    returnData = result?.data
  }

  return {
    props: {
      preData: returnData
    }
  }
}

const QuanLyChungUV: React.FC<{ preData: any }> = ({ preData }) => {
  const [displayCount, setDisplayCount] = useState(6);
  const [dataManager, setDataManager] = useState<any>(preData);
  const getDataManager = async () => {
    const token = Cookies.get("work247_token");
    const res = await POST("candidate/ManageAllCandi", {}, token);
    // if (res && res.message !=='success') {
    //   alert(`${res.message}`);
    //   return 0;
    // }
    // setDataManager(res);
    if (res?.result) {
      setDataManager(res?.data)
    } else {
      alert(res?.message)
    }
  };
  const showMore = () => {
    // setDisplayCount(data_job.length);
    setDisplayCount(prev => prev + 6)
  };

  const showLess = () => {
    setDisplayCount(6);
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  };

  // useEffect(() => {
  //   getDataManager();
  // }, [])

  return (
    <>
      <Temp_comp>
        <div className={style.container}>
          {/* <Intro /> */}
          <div className={style.box_ung_tuyen}>
            <div className={style.item} style={{ borderColor: "#ffaa60" }}>
              <div className={style.text}>
                <p>Đã ứng tuyển</p>
                <Image
                  src="/images/ung-vien/quan-ly-chung/icon_handshake.svg"
                  width={72}
                  height={72}
                  style={{ width: "72px", height: "72" }}
                  alt="Icon bắt tay"
                />
              </div>
              <div className={style.quanlity} style={{ color: "#ffaa60" }}>
                {dataManager?.daUngTuyen ? dataManager.daUngTuyen : 0}
              </div>
            </div>
            <div className={style.item} style={{ borderColor: "#81d9ff" }}>
              <div className={style.text}>
                <p>Việc làm phù hợp</p>
                <Image
                  src="/images/ung-vien/quan-ly-chung/icon_research.svg"
                  width={67}
                  height={67}
                  style={{ width: "67px", height: "67" }}
                  alt="Icon"
                />
              </div>
              <div className={style.quanlity} style={{ color: "#81d9ff" }}>
                {dataManager?.cout_viecLamPhuHop
                  ? dataManager.cout_viecLamPhuHop
                  : 0}
              </div>
            </div>
            <div className={style.item} style={{ borderColor: "#89ff8d" }}>
              <div className={style.text}>
                <p>Mẫu CV đã tạo</p>
                <Image
                  src="/images/ung-vien/quan-ly-chung/icon_cv.svg"
                  width={71}
                  height={71}
                  style={{ width: "71px", height: "71" }}
                  alt="Icon"
                />
              </div>
              <div className={style.quanlity} style={{ color: "#89ff8d" }}>
                {dataManager?.mauCvDaTao ? dataManager.mauCvDaTao : 0}
              </div>
            </div>
            <div className={style.item} style={{ borderColor: "#ff89d7" }}>
              <div className={style.text}>
                <p>NTD đã xem hồ sơ</p>
                <Image
                  src="/images/ung-vien/quan-ly-chung/icon_folder.svg"
                  width={70}
                  height={70}
                  style={{ width: "70px", height: "70" }}
                  alt="Icon"
                />
              </div>
              <div className={style.quanlity} style={{ color: "#ff89d7" }}>
                {dataManager?.xemHoSo ? dataManager.xemHoSo : 0}
              </div>
            </div>
          </div>
          <div className={style.box_suitable_job}>
            <div className={style.title}>
              <p>VIỆC LÀM PHÙ HỢP</p>
              <div
                style={{ width: "50px", height: "3px", background: "#f39623" }}
              ></div>
            </div>
            <div className={style.content}>
              {dataManager?.viecLamPhuHop &&
                dataManager?.viecLamPhuHop
                  .slice(0, displayCount)
                  .map((data: any, index: number) => (
                    // <Link href={`/nha-tuyen-dung/chi-tiet-tin-tuyen-dung?id=${data.new_id}`} className={style.item} key={index}>
                    <div className={style.item} key={index}>
                      <div className={style.avatar}>
                        <Image
                          src={
                            data.usc_logo
                              ? handleImageSource(data.usc_logo)
                              : "/images/candidate/ava_default.png"
                          }
                          alt={data.new_alias}
                          width={90}
                          height={90}
                          style={{ width: "90px", height: "90px", borderRadius: '50%', objectFit: 'cover', border: '1px solid #3582CD80' }}
                          onError={(e) => {
                            e.currentTarget.srcset = "/images/candidate/ava_default.png"
                          }}
                        />
                      </div>
                      <div className={style.text}>
                        <div className={style.required}>
                          {/* <Link href={`/nha-tuyen-dung/chi-tiet-tin-tuyen-dung?id=${data.new_id}`}> */}
                          <Link href={`/${data.new_alias}-${data.new_id}.html`}>
                            <p>{data.new_title}</p>
                          </Link>
                        </div>
                        <div className={style.com_name}>
                          <p>{data.usc_company}</p>
                        </div>
                        <div className={style.job_desc}>
                          <p>{data.new_city[0]}</p>
                          <p>{getMucLuong(
                            data.new_money_type || 0,
                            data.new_money_from,
                            data.new_money_to,
                            data.new_money
                          )}</p>
                          <p>
                            Cập nhật: {formatDateDifference(new Date(data.usc_update_time * 1000), new Date(), 'Ít phút')} trước
                          </p>
                          <p>
                            {getHanNop(data.new_han_nop)} ứng tuyển
                          </p>
                        </div>
                      </div>
                      {/* <div className={style.box_chat} style={{ zIndex: 1000 }}>
                        <div className={style.chat} onClick={() => console.log('chat')}>
                          <Image
                            src="/images/ung-vien/quan-ly-chung/icon_chat.svg"
                            alt="Icon"
                            width={16}
                            height={16}
                            style={{ width: "16px", height: "16px" }}
                          />
                          <p>Chat</p>
                        </div>
                      </div> */}
                    </div>
                    // </Link>
                  ))}
            </div>
            {displayCount < dataManager?.viecLamPhuHop?.length && (
              <div className={style.button} onClick={showMore}>
                Xem thêm
              </div>
            )}
            {displayCount === dataManager?.viecLamPhuHop?.length && (
              <div className={style.button} onClick={showLess}>
                Rút gọn
              </div>
            )}
          </div>
          <div className={style.box_cv}>
            <div className={style.item}>
              <div className={style.title}>
                <p>DANH SÁCH CV CỦA TÔI</p>
                <div
                  style={{
                    width: "50px",
                    height: "3px",
                    background: "#f39623"
                  }}
                ></div>
              </div>
              <div
                className={style.content}
                style={{
                  overflowX: 'auto',
                  scrollbarWidth: 'none'
                }}>
                {dataManager?.CvCuaToi &&
                  dataManager.CvCuaToi.map((cv: any, index: number) => (
                    <Link href={`/ung-vien/CV-xin-viec`}>
                      <Image
                        src={cv.name_cv}
                        alt={cv.alias}
                        width={320}
                        height={452}
                        style={{ width: "320px", height: "452px" }}
                        onError={(e) => {
                          e.currentTarget.srcset = "/images/cv/trang-chu-cv/mau11.png"
                        }}
                      />
                    </Link>
                  ))}
              </div>
              {dataManager?.mauCvDeXuat?.length > 0 && (
                <div className={style.button}>
                  <p>Xem tất cả</p>
                  <Image
                    src="/images/ung-vien/quan-ly-chung/double_arrow.svg"
                    width={22}
                    height={22}
                    alt="Icon mũi tên đôi"
                    style={{ width: "22px", height: "22px" }}
                  />
                </div>
              )}
            </div>
            <div className={style.item}>
              <div className={style.title}>
                <p>MẪU CV ĐỀ XUẤT</p>
                <div
                  style={{
                    width: "50px",
                    height: "3px",
                    background: "#f39623"
                  }}
                ></div>
              </div>
              <div
                className={style.content}
                style={{
                  overflowX: 'auto',
                  scrollbarWidth: 'none'
                }}
              >
                {dataManager?.mauCvDeXuat &&
                  dataManager.mauCvDeXuat.map((mau: any, index: number) => (
                    <Link href={`${'/' + mau._id}`}>
                      <Image
                        key={index}
                        src={mau.image}
                        alt={mau.alias}
                        width={320}
                        height={452}
                        style={{ width: "320px", height: "452px" }}
                        onError={(e) => {
                          e.currentTarget.srcset = "/images/cv/trang-chu-cv/mau11.png"
                        }}
                        ref={(node) => {
                          if (node) {
                            node.style.setProperty('width', '320px', 'important')
                            node.style.setProperty('height', '452px', 'important')
                          }
                        }}
                      />
                    </Link>
                  ))}
              </div>
              {dataManager?.mauCvDeXuat?.length > 0 && (
                <div className={style.button}>
                  <p>Xem tất cả</p>
                  <Image
                    src="/images/ung-vien/quan-ly-chung/double_arrow.svg"
                    width={22}
                    height={22}
                    alt="Icon mũi tên đôi"
                    style={{ width: "22px", height: "22px" }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={style.cover_letter}>
            <div className={style.title}>
              <p>CẨM NANG TÌM VIỆC</p>
              <div
                style={{ width: "50px", height: "3px", background: "#f39623" }}
              ></div>
            </div>
            <div className={style.content}>
              {dataManager?.camNangTimViec &&
                dataManager.camNangTimViec.map((cv: any, index: number) => (
                  <div key={index} className={style.item}>
                    <Image
                      src={cv.new_picture}
                      alt={cv.new_title_rewrite}
                      width={319}
                      height={182}
                      style={{ width: "319px", height: "182px" }}
                      onError={(e) => {
                        e.currentTarget.srcset = '/images/candidate/12323213213.png'
                      }}
                    />
                    <Link href={`${'/blog/cam-nang-tim-viec-' + cv.new_id + '.html'}`}>
                      <p>{cv.new_title}</p>
                    </Link>
                  </div>
                ))}
            </div>
            {dataManager?.camNangTimViec?.length > 0 && (
              <div className={style.button}>
                <p>Xem tất cả</p>
                <Image
                  src="/images/ung-vien/quan-ly-chung/double_arrow.svg"
                  width={22}
                  height={22}
                  alt="Icon mũi tên đôi"
                  style={{ width: "22px", height: "22px" }}
                />
              </div>
            )}
          </div>
        </div>
      </Temp_comp>
    </>
  );
}

export default QuanLyChungUV
