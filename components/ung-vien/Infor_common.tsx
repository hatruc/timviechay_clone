/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import s from "./Infor_common.module.scss";
import { Select } from "antd";
import Cookies from "js-cookie";
import { POST, POSTCUSTOM, POST_SERVER } from "@/pages/api/base-api";
import { get } from "jquery";
import { getTokenServerSide } from "@/functions/functions";
import { NextPage, NextPageContext } from "next";
const videoUrl =
  "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/video_test.mp4";

// Components
interface XinviecProps {
  urlImage: string;
  altText: string;
  html: string;
}

const CompCVXinViec: React.FC<XinviecProps> = ({ urlImage, altText, html }) => {
  const ext =
    urlImage && typeof urlImage === "string" ? urlImage.split(".").pop() : "";
  console.log(urlImage)
  return (
    <div className={s.CompCVXinViec}>
      {urlImage && typeof urlImage === "string" && ext ? (
        ["pdf", "doc", "docx"].includes(ext) ?
          (
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURI(urlImage)}&embedded=true`}
            ></iframe>
          )
          :
          (
            <img
              src={encodeURI(urlImage)}
              alt={altText}
              onError={(e) => {
                e.currentTarget.srcset = "/images/candidate/ava_default.png";
              }}
              style={{
                objectFit: 'contain'
              }}
            />
          )
      ) : (
        <div>Ứng viên không có CV xin việc</div>
      )}
    </div>
  );
};
const CompDonXinViec: React.FC<XinviecProps> = ({
  urlImage,
  altText,
  html,
}) => (
  <div className={s.CompDonXinViec}>
    <img src="/images/candidate/donxinviec.png" alt="" />
  </div>
);
const CompThuXinViec: React.FC<XinviecProps> = ({
  urlImage,
  altText,
  html,
}) => (
  <div className={s.CompThuXinViec}>
    <img src={urlImage} alt="" />
  </div>
);
const CompVideo: React.FC<XinviecProps> = ({ urlImage, altText, html }) => (
  <>
    {urlImage ? (
      <div className={s["CompVideo"]}>
        <ReactPlayer
          url={encodeURI(urlImage)}
          controls={true}
          width="100%"
          height="100%"
        />
      </div>
    ) : (
      <div>Ứng viên không có video giới thiệu</div>
    )}
  </>
);

const Infor_common: React.FC<{ data: any }> = ({ data }) => {
  const [selectedComponent, setSelectedComponent] = useState(1);
  const [url, setUrl] = useState<any>();
  const componentList = [
    {
      id: 1,
      name: "CV xin việc",
      component: () => (
        <CompCVXinViec urlImage={url?.html} altText={url?.alias} html={""} />
      ),
    },
    // {
    //   id: 2,
    //   name: "Đơn xin việc",
    //   component: () => (
    //     <CompDonXinViec urlImage={url?.src} altText={url?.alias} html={""} />
    //   ),
    // },
    // {
    //   id: 3,
    //   name: "Thư xin việc",
    //   component: () => (
    //     <CompThuXinViec
    //       urlImage={url?.nameimg}
    //       altText={url?.alias}
    //       html={""}
    //     />
    //   ),
    // },
    {
      id: 4,
      name: "Video giới thiệu",
      component: () => <CompVideo urlImage={url?.src} altText={""} html={""} />,
    },
  ];

  const handleNavItemClicked = (componentId: any) => {
    setSelectedComponent(componentId);
  };

  const getUrl = async () => {
    const token = Cookies.get("work247_token");
    let res;
    if (selectedComponent === 1) {
      // res = await POSTCUSTOM('candidate/ManageCvCandiDidCreated', {}, token);
      // if (res?.cvXinViecCuaToi) {
      //     setUrl(res?.cvXinViecCuaToi[0])
      // }
      setUrl({ html: "", alias: "Ảnh mẫu" });
      !!data?.img_demo && setUrl({ html: data?.img_demo, alias: "CV Upload hide" });
      !!data?.step2_img && setUrl({ html: data?.step2_img, alias: "CV Upload full" });
      !!data?.img && setUrl({ html: data?.img, alias: "CV hide" });
      !!data?.img_full && setUrl({ html: data?.img_full, alias: "CV full" })
    } else if (selectedComponent === 2) {
      res = await POSTCUSTOM("candidate/JobApplication", {}, token);
      if (res?.cvXinViecCuaToi) {
        setUrl(res?.cvXinViecCuaToi[0]);
      }
    } else if (selectedComponent === 3) {
      res = await POSTCUSTOM("candidate/LetterApplication", {}, token);
      if (res?.cvXinViecCuaToi) {
        setUrl(res?.cvXinViecCuaToi[0]);
      }
    } else {
      // res = await POSTCUSTOM('candidate/LetterApplication', {}, token);
      // setUrl(res?)
      setUrl({ src: "" });
      !!data?.video_link && setUrl({ src: data?.video_link });
    }
  };

  useEffect(() => {
    getUrl();
  }, [selectedComponent]);
  return (
    <>
      <div className={s.list_comp_name}>
        {componentList.map((item) => (
          <div
            className={`${s.item_comp_name} ${item.id === selectedComponent ? s.active : ""
              }`}
            key={item.id}
          >
            <p className={s.name} onClick={() => handleNavItemClicked(item.id)}>
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <Select
        className={s.select_comp_name}
        value={selectedComponent}
        onChange={(e: any) => handleNavItemClicked(e)}
      >
        {componentList.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
      {selectedComponent &&
        componentList.map((item: any) =>
          item.id == selectedComponent ? <item.component key={item.id} /> : null
        )}
    </>
  );
};

export default Infor_common;
