/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";

import Detail_cv from "@/components/CV/chi-tiet-cv";
import { POST_SERVER } from "@/pages/api/base-api";
import { NextPageContext } from "next";
import { getTokenServerSide } from "@/functions/functions";
import * as dataMau from "@/components/CV/tao-cv/data"
import axios from "axios";

export default function DetailCV({ idcv, type, id, alias, in4CVSsr, dataCvMau, htmlStrings }: any) {
  return (
    <>
      <div style={{ height: "100vh" }} id="outerWrapper">
        <Detail_cv in4CVSsr={in4CVSsr} idcv={idcv} type={type} id={id} alias={alias} dataCvMau={dataCvMau} />
      </div>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const token = getTokenServerSide(context);

  const id = context.query.id;
  const idcv = context.query.idcv;
  const type = context.query.type;

  const result = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_CANDI}/candidate/detailCV`, { idcv: context.query.idcv, id: id }, token);

  const fullURL = `/xem-cv-u:id-c${idcv}-t${type}`;

  if (result?.result && result?.data?.type === 1) {
    return {
      props: {
        in4CVSsr: result?.data?.result,
        id,
        idcv,
        type,
        alias: result?.data?.alias,
        dataCvMau: dataMau?.dataCvMau,
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
