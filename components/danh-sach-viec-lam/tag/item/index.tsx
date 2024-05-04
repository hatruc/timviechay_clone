import React from "react";
import { useState, useEffect, useRef } from 'react';

import s from './styles.module.scss';

const Item = ({ title, listTag }: { title: any; listTag: any }) => {

    const [show, setShow] = useState(false);
    const [hide, setHide] = useState(false);

    const handleSetHide: any = (status: any) => {
        setHide(!status);
        setShow(false);
    }

    return (
        <div className={s.box_1}>
            <div className={s.box_header}>
                <span>{title}</span>
                {hide == false ?
                    <svg style={{ cursor: "pointer" }} onClick={() => { handleSetHide(hide) }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M12.4526 9.1001L6.92625 3.57375L1.3999 9.1001" stroke="#3582CD" strokeLinecap="round" strokeLinejoin="round" />
                    </svg> :
                    <svg style={{ cursor: "pointer" }} onClick={() => { handleSetHide(hide) }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M12.4526 4.8999L6.92625 10.4263L1.3999 4.8999" stroke="#3582CD" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                }

            </div>
            <div className={hide == false ? s.box_body : s.displayNone}>
                {show == false ? listTag?.slice(0, 20)?.map((item: any, index: any) => {
                    return (
                        <div key={index} className={s.item}>
                            <span>{item}</span>
                        </div>)
                }) : listTag?.map((item: any, index: any) => {
                    return (
                        <div key={index} className={s.item}>
                            <span>{item}</span>
                        </div>)
                })}

                {listTag.length > 20 ? <div className={show == false ? s.item : s.displayNone} onClick={() => { setShow(!show) }}>
                    <span>Xem thêm</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                        <path d="M5.299 4.66276L8.67331 0.5L11 0.5L6.39535 5.5L4.9701 5.5L5.299 4.66276ZM2.32669 0.5L5.77409 4.67447L6.0299 5.5L4.61683 5.5L0 0.5L2.32669 0.5Z" fill="#3582CD" />
                    </svg>
                </div> : <></>}

            </div>
        </div >
    )
}

export default Item;