/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";

import * as data from '@/components/CV/tao-cv/data.js'

import Sua_cv from "@/components/CV/sua-cv";
import { POST_SERVER } from "@/pages/api/base-api";
import { NextPageContext } from "next";
import { getTokenServerSide } from "@/functions/functions";

export async function getServerSideProps(context: any) {
  const idcv = Number(context.query.idcv);
  const token = getTokenServerSide(context);

  //cv theo alias
  const fullURL = context?.query?.slug || '';
  const fullURL2 = context?.query?.slug2 || '';

  const in4CVSsr = data.in4CVSsr;
  const in4user: any = [];
  const dataCvMau = data.dataCvMau;
  const Cv: any = [];
  const langcv = null;
  const colorscv = null;
  const { req } = context

  const userAgent = req.headers['user-agent']
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

  const result = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_CANDI}/candidate/detailCV`, { idcv: idcv }, token);

  const response = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_CV}/in4CV`, { idcv: idcv })

  if (result?.result && result?.data?.type === 1 && response?.result) {
    return {
      props: {
        in4CVSsr: result?.data?.result,
        in4user,
        dataCvMau: response?.data,
        Cv,
        langcv,
        colorscv: response?.data?.colors,
        isMobile,
        idcv,
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

export default function SuaCV({ in4CVSsr, in4user, dataCvMau, Cv, langcv, colorscv, isMobile, dataFake, imgCV, idcv }: any) {
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
        <Sua_cv in4CVSsr={in4CVSsr} in4user={in4user} dataCvMau={dataCvMau} Cv={Cv} langcv={langcv} colorscv={colorscv} isMobile={isMobile} dataFake={dataFake} imgCV={imgCV} idcv={idcv} />
      </div>
      {/* <Footer /> */}
    </>
  );
}
