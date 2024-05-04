import { Button, Modal } from "antd";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import s from "./header.module.scss";
import ChangeInfor from "@/components/admin/Infor/ChangeInfor";
import { logOut, logOutAdmin } from "@/components/service/functions";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";

interface HeaderAdminProps {
  changeShowHeader: () => void;
}

const HeaderAdmin = ({ changeShowHeader }: HeaderAdminProps) => {
  const router = useRouter();
  const { changePermission } = useContext(NTD_UV_Context);
  const name = Cookies.get("userName_admin");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState<Boolean>(false);

  useEffect(() => {
    const storedSidebar: any = localStorage.getItem("permission");
      if(storedSidebar) {
        changePermission(storedSidebar)
      }
  }, [])
  return (
    <>
      <div
        className={s.admin__wrapper}
        style={{
          height: !hidden ? "50px" : "0px",
          overflow: hidden ? "hidden" : "visible"
        }}
      >
        {/* content left */}
        <div className={s.admin__header_left}>
          <Button>F5 lại trang chủ</Button>
          <Button>F5 lại trang ngành</Button>
        </div>
        <div className={s.admin__header_right}>
          <p className={s.header_right_name}>
            Xin chào{" "}
            <span
              style={{
                color: "#236a9f",
                fontSize: "16px",
                fontWeight: "550"
              }}
            >
              {name && name}
            </span>
          </p>
          <div className={s.header_right_detail} onClick={() => setOpen(true)}>
            <p>Thông tin tài khoản</p>
          </div>
          <div
            className={s.header_right_logout}
            onClick={() => {
              logOutAdmin(), router.push("/admin/login");
            }}
          >
            <Image
              src="https://work247.vn/admin/resource/images/logoff.gif"
              alt=""
              width={20}
              height={20}
            />
            <span>Thoát</span>
          </div>
        </div>
      </div>
      <div
        className={s.wrapper_btn_close}
        onClick={() => {
          setHidden(!hidden), changeShowHeader();
        }}
      >
        <div className={s.btn_close}>
          {!hidden ? (
            <Image
              src={"https://work247.vn/admin/resource/images/bar_up.gif"}
              alt="close"
              height={11}
              width={50}
            />
          ) : (
            <Image
              src={"https://work247.vn/admin/resource/images/bar_down.gif"}
              alt="close"
              height={11}
              width={50}
            />
          )}
        </div>
      </div>

      <div id="admin-header">
        <Modal
          title=""
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width="800px"
          style={{
            height: "300px"
          }}
        >
          <ChangeInfor />
        </Modal>
      </div>
    </>
  );
};

export default HeaderAdmin;
