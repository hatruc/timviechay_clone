import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import SidebarTimViec from "./Sidebar-timviec";
import s from "./sidebar.module.scss";
import Link from "next/link";
import Cookies from "js-cookie";
import { cookieId, cookieLogo, cookieName } from "@/components/service/functions";
import { POST } from "@/pages/api/base-api";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
import { useRouter } from "next/router";
import { createLinkTilte, handleImageSource } from "@/functions/functions";

const Sidebar = () => {
  const { ava, name } = useContext(NTD_UV_Context)
  // console.log('>>> check name sidebar: ', name);
  const router = useRouter()
  const [id, setId] = useState('')

  useEffect(() => {
    setId(Cookies.get(cookieId) || '')
    return () => { };
  }, [])

  const RefreshProfileCandi = async () => {
    const result = await POST('candidate/RefreshProfileCandi', {})
    if (result?.result) {
      alert('Làm mới thành công.')
    } else {
      alert('Có lỗi xảy ra. Vui lòng thử lại.')
    }
  }

  return (
    <div className={s.sidebar}>
      <Link href={"/"}>
        <div className={s.box_logo}>
          <Image
            height={10}
            width={10}
            src="/images/quan-ly-chung-ntd/logo.svg"
            alt="Logo website"
          />
        </div>
      </Link>
      <div className={s.box_info}>
        <div className={s.box_img_ava}>
          <Image
            height={80}
            width={80}
            src={handleImageSource(ava) || '/'}
            alt="Ảnh ứng viên"
            onError={(e) => {
              e.currentTarget.srcset = "/images/candidate/ava_default.png"
            }}
            style={{
              border: '1px solid white',
              borderRadius: '50%'
            }}
          />
        </div>
        <p>{`${name}`}</p>
      </div>
      <div className={s.option}>
        <button
          className={s.refesh}
          onClick={RefreshProfileCandi}
          style={{
            cursor: 'pointer'
          }}
        >Làm mới hồ sơ</button>
        <button
          className={s.watch}
          style={{
            cursor: 'pointer'
          }}
          onClick={() => {
            router.push(`/chi-tiet-ung-vien/${createLinkTilte(name)}u-${id}.html`)
          }}
        >Xem hồ sơ</button>
      </div>
      <div className={s.sidebarContent}>
        <SidebarTimViec />
      </div>
    </div>
  );
};

export default Sidebar;
