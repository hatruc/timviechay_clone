import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { Rate, Progress } from 'antd';

import s from './styles.module.scss'

function formatNumber(number: any) {
    if (Number.isInteger(number)) {
        return number + ".0";
    } else {
        return number?.toString();
    }
}

const RateStar = ({ rateInfo, rateMedium, handleDanhGia1 }: { rateInfo: any; rateMedium: any; handleDanhGia1: any; }) => {
    return (
        <div className={s.box_7}>
            <div className={s.title}>Đánh giá công ty</div>
            <div className={s.group_rate}>
                <div className={s.group_left}>
                    <Progress
                        type="circle"
                        strokeWidth={10}
                        strokeColor={"#225D97"}
                        percent={rateMedium / 5 * 100 || 0}
                        format={() => {
                            return (
                                <span style={{
                                    color: "#474747",
                                    fontFamily: "Roboto",
                                    fontSize: "32px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "135%"
                                }}>{formatNumber(rateMedium) || 0} / 5</span>
                            )
                        }}
                        size={152}
                    />

                    <div className={`star_chi_tiet_cong_ty_2`}>
                        <Rate disabled tooltips={[]} allowHalf value={Number(rateMedium) || 0} />
                    </div>

                    <div className={s.danhGia}>{rateInfo?.danhGia || 0} đánh giá</div>
                </div>
                <div className={s.group_right}>
                    {rateInfo?.chiTiet?.map((item: any, index: any) => {
                        return (
                            <div key={index} className={s.loaiDanhGia}>
                                <div className={s.titleRate}>{item.title}</div>
                                <div className={`star_chi_tiet_cong_ty_2`}>
                                    <Rate disabled tooltips={[]} allowHalf value={Number(item.rate)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={s.divide}></div>
            <div className={s.groupPercent}>
                {rateInfo?.percent?.map((item: any, index: any) => {
                    return (
                        <div key={index} className={s.percent_item}>
                            <span className={s.percent_title}>{item?.title}</span>
                            <div className={s.group_row}>
                                <div className={s.percentProgress}>
                                    <Progress percent={item?.percent} strokeColor={"#3582CD"} showInfo={false} />
                                </div>
                                <span className={s.percentNumber}>{item?.number}</span>
                            </div>

                        </div>
                    )
                })}
            </div>
            <div className={s.divide}></div>
            <div className={s.footer_danh_gia}>HÃY CHO CHÚNG TÔI BIẾT ĐÁNH GIÁ CỦA BẠN</div>
            <button className={s.button_danh_gia} onClick={handleDanhGia1}>Đánh giá ngay</button>
        </div >
    )
}

export default RateStar;