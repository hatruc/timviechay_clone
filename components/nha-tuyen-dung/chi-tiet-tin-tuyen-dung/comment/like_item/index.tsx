import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import s from './styles.module.scss';

const Item = ({ url, name, action = "" }: { url: any; name: any; action: any }) => {
    const action_url = action == "like" ? "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/like.png" :
        (action == "heart" ? "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/heart.png" :
            (action == "wow" ? "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/wow.png" :
                action == "hearteye" ? "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/hearteye.png" :
                    (action == "angry" ? "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/angry.png" :
                        (action == "sad" ? "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/sad.png" : "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/haha.png"))))
    return (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
                <Image alt={""} src={action_url} height={15} width={15} style={{ height: "15px", width: "15px", borderRadius: "15px", position: "absolute", bottom: "0px", right: "0px" }}></Image>
                <Image alt={""} src={url} height={40} width={40} style={{ height: "40px", width: "40px", borderRadius: "40px", border: "1px solid #CCC" }}></Image>
            </div>
            <span>{name}</span>
        </div>
    )
}

export default Item;
