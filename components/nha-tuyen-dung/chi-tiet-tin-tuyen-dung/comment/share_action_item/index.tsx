import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import s from './styles.module.scss';

const Item_1 = ({ url, name, isSend }: { url: any; name: any; isSend: any; }) => {
    return (
        <div style={{ display: "flex", gap: "10px", alignItems: "center", width: "100%" }}>
            <Image alt={""} src={url} height={40} width={40} style={{ height: "40px", width: "40px", borderRadius: "40px", border: "1px solid #CCC" }}></Image>
            <span>{name}</span>
            <button style={{ marginLeft: "auto", marginRight: "10px" }} className={isSend ? s.button_send : s.button}>{isSend ? "Đã gửi" : "Gửi"}</button>
        </div>
    )
}

export default Item_1;