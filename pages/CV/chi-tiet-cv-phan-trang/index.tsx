/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";

import * as data from '@/components/CV/tao-cv/data.js'

import DetailCV from "@/components/CV/chi-tiet-cv-phan-trang";
import { POST_SERVER } from "@/pages/api/base-api";
import { NextPageContext } from "next";
import { getTokenServerSide } from "@/functions/functions";

export async function getServerSideProps(context: NextPageContext) {
  const token = getTokenServerSide(context);

  const id = context.query.id;
  const idcv = context.query.idcv;

  const in4CVSsr = data.in4CVSsr;
  const in4user: any = [];
  const dataCvMau = data.dataCvMau;
  const Cv: any = [];
  const langcv = null;
  const colorscv = null;
  const isMobile = false;

  const result = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_CANDI}/candidate/detailCV`, { idcv: idcv, id: id }, token);

  const response = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_CV}/in4CV`, { idcv: context.query.idcv })

  const fullURL = `/xem-cv2-u${id}-c${idcv}`;


  if (result?.result && result?.data?.type === 1 && response?.result) {
    return {
      props: {
        in4CVSsr: result?.data?.result,
        id,
        idcv,
        in4user,
        dataCvMau: response?.data,
        Cv,
        langcv,
        colorscv: response?.data?.colors,
        isMobile,
        alias: result?.data?.alias,
        // htmlData: JSON.parse(result?.data?.result?.html),
        // imgCV: result?.data?.result?.nameimg,
        // dataFake: data?.in4CVSsr,
      }
    }
  } else {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      }
    }
  }
}

export default function XemCV({ in4CVSsr, id, idcv, in4user, dataCvMau, Cv, langcv, colorscv, isMobile, dataFake, imgCV, alias }: any) {
  return (
    <>
      {/* <Header /> */}
      {/* <div className={s.container}>
                <div className={s.banner}>
                    <Image src={'/images/cv/tao-cv/banner_1.png'} alt={""} priority height={1024} width={161} className={s.image_banner}></Image>
                    <div className={s.name_cv}>Tạo mẫu CV SEO Website 01</div>
                </div>

                <div className={s.cv_body}>
                    <Tao_cv in4CVSsr={in4CVSsr} in4user={in4user} dataCvMau={dataCvMau} Cv={Cv} langcv={langcv} colorscv={colorscv} isMobile={isMobile} />
                </div>
            </div> */}
      <div style={{ height: "100vh" }} id="outerWrapper">
        <DetailCV in4CVSsr={in4CVSsr} id={id} idcv={idcv} in4user={in4user} dataCvMau={dataCvMau} Cv={Cv} langcv={langcv} colorscv={colorscv} isMobile={isMobile} dataFake={dataFake} imgCV={imgCV} alias={alias} />
      </div>
      {/* <Footer /> */}
    </>
  );
}
