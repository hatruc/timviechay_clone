/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import Tao_cv from '@/components/CV/tao-cv'

import { POST_SERVER } from '@/pages/api/base-api';

export default function TaoCV({ in4CVSsr, in4user, dataCvMau, Cv, langcv, colorscv, isMobile, idcv }: any) {

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
            <div style={{ height: '100vh' }} id="outerWrapper">
                <Tao_cv in4CVSsr={in4CVSsr} in4user={in4user} dataCvMau={dataCvMau} Cv={Cv} langcv={langcv} colorscv={colorscv} isMobile={isMobile} idcv={idcv} />
            </div>
            {/* <Footer /> */}
        </>
    )
}

export async function getServerSideProps(context: any) {
    const idcv = Number(context.query.idcv);

    const cookieString = context?.req?.headers.cookie

    const iduv = cookieString?.split(";").find((cookie: any) => cookie.trim().startsWith("id="));
    const iduvValue = Number(iduv?.split("=")[1]);

    const checkLogin = cookieString?.split(";").find((cookie: any) => cookie.trim().startsWith("isLogin="));
    const checkLoginValue = checkLogin?.split("=")[1];

    const result = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_CANDI}/candidate/detailCV`, { idcv: idcv, id: iduvValue });

    const response = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_CV}/in4CV`, { idcv: idcv })

    //cv theo alias
    const fullURL = context?.query?.slug || '';
    const fullURL2 = context?.query?.slug2 || '';
    console.log("response:", response);

    const in4CVSsr = response?.data;
    const in4user: any = [];
    const dataCvMau = response?.data;
    const Cv: any = [];
    const langcv = null;
    const colorscv = null;
    const { req } = context

    const userAgent = req.headers['user-agent']
    const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

    if (context?.query?.idcv) {
        if (checkLoginValue === "true" && result?.data?.type === 1) {
            return {
                redirect: {
                    destination: `/sua-cv/${result?.data?.result?.name_cv}-${result?.data?.result?.idcv}`,
                    // destination: `/CV/sua-cv`,
                    // permanent: false,
                }
            }
        } else {
            return {
                props: {
                    in4CVSsr,
                    in4user,
                    dataCvMau,
                    Cv,
                    langcv,
                    colorscv,
                    isMobile,
                    idcv,
                },
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
