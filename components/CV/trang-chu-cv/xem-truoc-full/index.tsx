import React from "react"
import styles from './styles.module.scss'
import { handleImageSource } from "@/functions/functions"
import Image from "next/image"

const XemTruocFull: React.FC<{ imgSrc: any, onClose: any }> = ({ imgSrc, onClose }) => {
    return (
        <>
            <div className={`${styles.overlay} ${styles.zoom_cv} `} id="zoom_cv" style={{ display: 'block' }}>
                <div className={`${styles.wapper}`}>
                    <div className={`${styles.auth_form} ${styles.po_r}`}>
                        <div className={`${styles.p_left}`}>
                            <div className={`${styles.frame_img}`}>
                                <Image
                                    className={`${styles.img_cv}`}
                                    src={handleImageSource(imgSrc)}
                                    alt="CV"
                                    width={1000}
                                    height={1000}
                                />
                                <img
                                    onClick={() => {onClose()}}
                                    className={`${styles.close_zoom_cv}`}
                                    src={`/images/close_zoom_cv.png`}
                                    alt="close"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default XemTruocFull