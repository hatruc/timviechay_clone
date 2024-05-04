/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import Detail_cv from "@/components/CV/xem-cv";
import { POST_SERVER, POST } from "@/pages/api/base-api";
// import { NextPageContext } from "next";
// import { getTokenServerSide } from "@/functions/functions";
import * as dataMau from "@/components/CV/tao-cv/data"

export default function DetailCV({ idcv, id, alias, in4CVSsr, dataCvMau, isMobile }: any) {
  return (
    <>
      <div style={{ height: "100vh" }} id="outerWrapper">
        <Detail_cv in4CVSsr={in4CVSsr} idcv={idcv} id={id} alias={alias} dataCvMau={dataCvMau} isMobile={isMobile} />
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  // const token = getTokenServerSide(context);

  const id = context.query.id;
  const idcv = context.query.idcv;
  console.log(`${process.env.NEXT_PUBLIC_BASE_URL_API}/user/DetailCVPreview`);

  const { req } = context

  const userAgent = req.headers['user-agent']
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

  // const result = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_CANDI}/candidate/detailCV`, { idcv: idcv, id: id },);
  const result2 = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_USER}/user/DetailCVPreview`, { idcv: idcv, id: id });
  console.log(">> Check result: ", result2);
  const fullURL = `/xem-cv3-u:id-c${idcv}`;
  // console.log(">>> Check result: ", result);


  if (result2?.data?.result) {
    return {
      props: {
        in4CVSsr: result2?.data?.result,
        id,
        idcv,
        alias: result2?.data?.alias,
        dataCvMau: dataMau?.dataCvMau,
        isMobile
      },
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
