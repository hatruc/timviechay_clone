import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import s from './styles.module.scss';

const Item_2 = ({ url, name }: { url: any; name: any; }) => {
    return (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Image alt={""} src={url} height={40} width={40} style={{ height: "40px", width: "40px", borderRadius: "40px", border: "1px solid #CCC" }}></Image>
            <span>{name}</span>
        </div>
    )
}

export default Item_2;