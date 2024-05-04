import { useEffect, useState } from 'react';
import { Progress } from 'antd';
import Image from "next/image";

import s from './styles.module.scss';

const ProgressLine = ({ percent, title }: { percent: any; title: any; }) => {
    return (
        <>
            <div className={s.line}>
                <div>
                    <div className={s.titleFit}>
                        <span>{title}</span>
                        <Image onClick={() => { }} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/infor-icon.png"} alt={""} width={14} height={14} style={{ height: "14px", width: "14px", cursor: "pointer" }}></Image>
                    </div>
                    <div className={s.percent}>{percent || "--"}%</div>
                </div>

            </div>
            <div className={s.linePercent}>
                <Progress className="progress_fit" percent={Number(percent) || 0} showInfo={false} />
            </div>
        </>
    )
}

export default ProgressLine;

