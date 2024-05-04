import Image from 'next/image'
import React from 'react'
import styles from './content_left.module.scss';

const Content_left = () => {
    return (
        <div>
            <div className={styles.content_left}>
                <div className={styles.wrapper_img}>
                    <Image height={124} width={377} src="/images/authorization/img_right.png" alt="" className={styles.logo_pc} />
                    <Image height={124} width={377} src="/images/authorization/logo_tablet.png" alt="" className={styles.logo_tablet} />
                </div>
                <p className={styles.title}>Tìm việc nhanh, tuyển dụng hiệu quả</p>
            </div>
            <div className={styles.img_bot_pc}>
                <Image height={354} width={606} src='/images/authorization/img_bot_left.svg' className={styles.images_bot} alt=''></Image>
            </div>
            <div className={styles.img_bot_tablet}>
                <Image height={166} width={290} src='/images/authorization/bg_login_tablet.png' className={styles.images_bot} alt=''></Image>
            </div>
        </div>
    )
}

export default Content_left
