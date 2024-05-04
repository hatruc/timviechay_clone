import Temp_comp from "@/components/quan-ly-chung-UV/Temp_comp";
import ThongTinLienHe from "@/components/ung-vien/ho-so-xin-viec/thong-tin-lien-he/ThongTinLienHe";
import Intro from "@/components/ung-vien/intro/intro";
import Slider from "@/components/ung-vien/ho-so-xin-viec/slider/Slider";
import { useContext, useEffect, useState } from "react";
import CongViecMongMuon from "@/components/ung-vien/ho-so-xin-viec/cong-viec-mong-muon/CongViecMongMuon";
import MucTieuNgheNghiep from "@/components/ung-vien/ho-so-xin-viec/muc-tieu-nghe-nghiep/MucTieuNgheNghiep";
import KyNangBanThan from "@/components/ung-vien/ho-so-xin-viec/ky-nang-ban-than/KyNangBanThan";
import BangCap from "@/components/ung-vien/ho-so-xin-viec/bang-cap/BangCap";
import NgonNgu from "@/components/ung-vien/ho-so-xin-viec/ngon-ngu/NgonNgu";
import KinhNghiemLamViec from "@/components/ung-vien/ho-so-xin-viec/kinh-nghiem-lam-viec/KinhNghiemLamViec";
import NguoiThamChieu from "@/components/ung-vien/ho-so-xin-viec/nguoi-tham-chieu/NguoiThamChieu";
import { POST } from "@/pages/api/base-api";
import useSWR, { useSWRConfig } from 'swr'
import Cookies from "js-cookie";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";


const  HoSoXinViec = () =>  {
  const {   changePercent } = useContext(NTD_UV_Context);
  const [link, setLink] = useState(1);
  const [data, setData ] = useState<any>()
  const getDetialCandidate = async () => {
    const idUser = Cookies.get('id');
    const res = await POST("candidate/DetailCandi", { "id": idUser});
    if (!res?.result) {
      alert(`${res?.message}`);
      return 0;
    } else {
      changePercent(res.data.percentHoSo.toString())
      setData(res.data)
    }
  };

  const refreshDetailCandidate = async () => {
    await getDetialCandidate();
  }
  useEffect(() => {
    getDetialCandidate()
  },[])
  

  return (
    <>
      <Temp_comp>
        {/* <Intro /> */}
        <Slider setLink={setLink} link={link}></Slider>
        {link == 1 &&   
          <ThongTinLienHe dataDetaiUser={data}  handleRefreshData={() => refreshDetailCandidate()}></ThongTinLienHe>
        }
        {/* muc == 2 chua fix call lai sau update */}
        {link == 2  &&  <CongViecMongMuon dataDetaiUser={data} handleRefreshData={() => refreshDetailCandidate()}></CongViecMongMuon>}
        {link == 3 && <MucTieuNgheNghiep dataWorkJob={data?.muc_tieu_nghe_nghiep}  handleRefreshData={() => refreshDetailCandidate()}></MucTieuNgheNghiep>}
        {link == 4 && <KyNangBanThan dataKNBT={data?.ki_nang_ban_than} handleRefreshData={() => refreshDetailCandidate()}></KyNangBanThan>}
        {link == 5 && <BangCap dataUser={data} dataEducation={data?.hocVan} handleRefreshData={() => refreshDetailCandidate()}></BangCap>}
        {link == 6 && <NgonNgu dataLanguage={data?.NgoaiNgu} handleRefreshData={() => refreshDetailCandidate()}></NgonNgu>}
        {link == 7  && <KinhNghiemLamViec dataExWork={data?.KinhNghiem} handleRefreshData={() => refreshDetailCandidate()}></KinhNghiemLamViec>}
        {link == 8 && <NguoiThamChieu dataReference={data?.thamChieu} handleRefreshData={() => refreshDetailCandidate()}></NguoiThamChieu>}
      </Temp_comp>
    </>
  );
};
export default HoSoXinViec;
