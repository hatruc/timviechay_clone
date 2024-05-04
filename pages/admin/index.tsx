import React, { useContext, useEffect, useState } from "react";
import HeaderAdmin from "../../components/admin/commons/Header_admin";
import SidebarAdmin from "../../components/admin/commons/Sidebar_admin";
import { getTokenServerSide, getTokenServerSideAdmin } from "@/functions/functions";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
import jwtDecode from "jwt-decode";

export const getServerSideProps = async (context: NextPageContext) => {
  const token = getTokenServerSideAdmin(context);
  if (token) {
      return {
          props: {
              data: token
          }
      }
  } else {
      return {
          redirect: {
              destination: '/admin/login',
              permanent: false,
          }
      }
  }
}

const AdminPage: React.FC<{ data: any }> = ({data}) => { 
  const router = useRouter();
  const { changeToken, token, changePermission } = useContext(NTD_UV_Context)

  const [isMargintTop, setIsMarginTop] = useState<Boolean>(false);
  useEffect(() => {
    // if (jwtDecode(token).exp <  new Date().getTime() / 1000) {
    //   router.push('/admin/login');
    // }
    //  else {
      changeToken(data);
      
    // }
  }, []);

  return (
    <>
      <HeaderAdmin
        changeShowHeader={() => {
          setIsMarginTop(!isMargintTop)
        }}
      />
      <div
        style={{
          width: "100%",
          overflowY: "scroll"
        }}
      >
        <SidebarAdmin isMarginTop={isMargintTop} />
      </div>
    </>
  );
};

export default AdminPage;
