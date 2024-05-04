import { Button, Modal, Select } from "antd";
import s from "./styles.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { handleImageSource } from "@/functions/functions";
import { previewData } from "next/headers";

interface IPropModal {
  isOpenModal: boolean;
  onCancel: () => void;
  previewData: any;
  setPreviewSrc: (src?: any) => void;
  openFullPreview: () => void;
}
export default function ModalCv(props: IPropModal) {
  const router = useRouter();
  const [colorOrder, setColorOrder] = useState(0)
  const [imgSrc, setImgSrc] = useState(props?.previewData ? props?.previewData[`img${colorOrder + 1}`] : '/images/cv/trang-chu-cv/mau11.png')
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props?.previewData) {
      setImgSrc(props?.previewData[`img${colorOrder + 1}`])
      props?.setPreviewSrc && props.setPreviewSrc(props?.previewData[`img${colorOrder + 1}`])
      setLoading(true)
    }
    return () => {
    };
  }, [colorOrder, props?.previewData])
  // console.log(props?.previewData[`img${colorOrder + 1}`])

  return (
    <Modal
      open={props.isOpenModal && props?.previewData?.img1}
      onCancel={props.onCancel}
      width={900}
      footer={null}
      styles={{ body: { maxHeight: "80vh", overflowY: "auto" } }}
      closable={false}
      centered
    >
      <div className={s.review_container}>
        <div className={s.content}>
          <div className={s.img_cv}>
            <div style={{
              transition: 'visibility 1s ease, opacity 1s linear',
              // display: loading ? 'block' : 'none',
              opacity: loading ? '1' : '0',
              visibility: loading ? 'visible' : 'hidden',
              color: '#3582CD',
              position: 'absolute',
              fontStyle: 'italic',
              top: '0',
              width: '100%',
              textAlign: 'center',
              backgroundColor: 'white',
              border: 'solid 1px #3582CD',

            }}>
              Đang tải...
            </div>
            <Image
              alt=""
              src={handleImageSource(imgSrc, "/images/cv/trang-chu-cv/mau11.png")}
              width={814}
              height={1159}
              // fill={true}
              // loading="eager"
              // style={imageContainerStyle}
              onLoadingComplete={() => setLoading(false)}
              className={s.img_cv_preview}
            />
            <img
              // onClick={() => (setshowZoomCV(true), setshowXemtruoc(false))}
              onClick={() => {props.onCancel(); props.openFullPreview()}}
              className={`${s.plus_zoom_cv}`}
              id="plus_zoom_cv"
              // src={`${STATIC_URL}/images/plus_zoom_cv.png`}
              src={`/images/plus_zoom_cv.png`}
              alt="zoom"
              style={{ position: 'absolute', left: '40%' }}
            />
          </div>
          <div className={s.right_side}>
            <div className={s.box_right}>
              <div className={s.text}>{props?.previewData?.name || 'Chưa cập nhật'}</div>
              {/* <div className={s.language}>
                <div> Ngôn ngữ</div>
                <Select className={s.sl_btn} placeholder="Tiếng Việt" />
              </div> */}
              <div className={s.color}>
                <div> Màu sắc</div>
                <div>
                  {props?.previewData?.codecolor.split(',').map((color: any, index: number) => (
                    <span style={{ background: `#${color}`, cursor: 'pointer' }} onClick={() => setColorOrder(index)}>
                      {index === colorOrder &&
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                        >
                          <path
                            d="M23 10L12.8253 20L7 14.2748"
                            stroke="white"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>}
                    </span>
                  ))}
                </div>
              </div>
              <div className={s.btn}>
                <Button
                  className={s.first_btn}
                  onClick={(e) => {
                    // router.push("/tao-cv-moi/cv-moi");
                    router.push(`/tao-cv/${props?.previewData?.link}-${props?.previewData?.id}`)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_2003_96797)">
                      <path
                        d="M0 4.69822C0.0340165 4.58579 0.0657267 4.47221 0.102049 4.36036C0.388595 3.48688 1.23901 2.87342 2.22779 2.82672C2.32811 2.82211 2.42785 2.81923 2.52817 2.81923C5.54987 2.81865 8.57157 2.81865 11.5933 2.8198C11.7218 2.8198 11.8539 2.81865 11.9778 2.84344C12.3347 2.91493 12.5849 3.23723 12.5648 3.57855C12.5434 3.93255 12.2546 4.22256 11.8804 4.25889C11.7812 4.26869 11.6803 4.26523 11.58 4.26523C8.5439 4.2658 5.50778 4.26523 2.47167 4.2658C2.01966 4.2658 1.70659 4.44915 1.6103 4.78586C1.57456 4.91097 1.57398 5.04761 1.57398 5.17849C1.57225 8.09298 1.57283 11.0075 1.57225 13.922C1.57225 15.7197 1.57225 17.5174 1.57283 19.3145C1.57283 19.4136 1.57341 19.5134 1.58724 19.6114C1.63048 19.9181 1.90665 20.1695 2.24047 20.207C2.33964 20.2179 2.44054 20.2191 2.54028 20.2191C7.1302 20.2197 11.7201 20.2197 16.31 20.2191C16.4103 20.2191 16.5112 20.2179 16.6104 20.207C16.9604 20.1689 17.2417 19.9014 17.2734 19.5762C17.2827 19.4846 17.2809 19.3912 17.2809 19.2989C17.2815 16.999 17.2804 14.6992 17.2838 12.3993C17.2838 12.2626 17.2977 12.1191 17.3426 11.9899C17.447 11.6947 17.775 11.5045 18.1106 11.5206C18.4502 11.5373 18.7425 11.7524 18.8221 12.0597C18.8503 12.1675 18.8572 12.2817 18.8572 12.3929C18.859 14.7193 18.8595 17.0457 18.8584 19.3716C18.8578 20.5719 18.129 21.3953 16.8549 21.642C16.8353 21.6461 16.8185 21.6605 16.8001 21.6703C11.8873 21.6703 6.97453 21.6703 2.06174 21.6703C2.02196 21.6576 1.98333 21.6409 1.94297 21.634C1.27591 21.5192 0.737984 21.2085 0.390901 20.6746C0.212747 20.4007 0.127418 20.0726 0 19.7688C0 14.7453 0 9.72175 0 4.69822Z"
                        fill="white"
                      />
                      <path
                        d="M22 3.43364C21.9873 4.16529 21.6898 4.88771 21.0948 5.48271C17.673 8.90572 14.2512 12.3287 10.8236 15.746C10.6973 15.8722 10.5249 15.9737 10.3549 16.0314C8.85929 16.5387 7.35969 17.0334 5.86181 17.5333C5.57584 17.6284 5.2991 17.6434 5.04195 17.4584C4.73696 17.2387 4.64817 16.8951 4.78712 16.4776C5.20224 15.23 5.64733 13.9915 6.0244 12.7323C6.24291 12.0018 6.62285 11.4264 7.16366 10.8914C10.3802 7.70937 13.5737 4.50315 16.7701 1.2998C17.3922 0.675971 18.1239 0.325425 19.0077 0.327155C20.6544 0.330038 21.9954 1.6786 22 3.43364ZM6.74854 15.5701C6.81888 15.5523 6.85924 15.5448 6.89787 15.5321C7.82611 15.2213 8.75551 14.9129 9.68203 14.5958C9.77774 14.5629 9.86653 14.4897 9.94032 14.4164C13.2538 11.1064 16.5649 7.79413 19.8754 4.48181C19.9665 4.39072 20.0571 4.29732 20.1332 4.19411C20.4629 3.74728 20.5212 3.25663 20.2969 2.75561C20.0692 2.24651 19.6604 1.95938 19.0971 1.91268C18.5938 1.87059 18.2029 2.08969 17.8575 2.43562C14.8208 5.4758 11.7951 8.52635 8.73245 11.5394C8.05501 12.2059 7.53669 12.9082 7.31298 13.8399C7.17346 14.4193 6.94515 14.9769 6.74854 15.5701Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2003_96797">
                        <rect
                          width="22"
                          height="21.3452"
                          fill="white"
                          transform="translate(0 0.327148)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Dùng mẫu này
                </Button>
                <Button className={s.second_btn} onClick={() => { setColorOrder(0); props.onCancel() }}>
                  Đóng lại
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
