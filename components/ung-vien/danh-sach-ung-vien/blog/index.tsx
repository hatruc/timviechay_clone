/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import * as data from '@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/data.js';

import s from './styles.module.scss';

const Blog = ({ contentBlog }: { contentBlog: any; }) => {

    const [content, setContent] = useState(``);
    const [tableContent, setTableContent] = useState(``);

    const handleRutGon = () => {
        console.log("Rút gon")
    };

    useEffect(() => {
        //Tách mục lục và nội dung ở đây
        setContent(contentBlog);
        setTableContent(data.contentTable);
    }, [])
    return (
        <div className={s.container}>
            <div className={s.list_news_box_6}>
                <div className={s.note}>SAPO: When everyone had finished eating, I walked over to the front door to see what the weather was like. It was a sad scene. The darkness fell too soon, and the wind blew the snowflakes so that the hills and the sky were no longer visible. When everyone had finished eating, I walked over to the front door to see what the weather was like. It was a sad scene. The darkness fell too soon, and the wind blew the snowflakes so that the hills and the sky were no longer visible.</div>

                <div className={s.tableContent}>
                    <div className={s.tableContentHeader}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M22 19L7 19" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M22 12L7 12" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M22 5L7 5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
                            <circle cx="3" cy="5" r="1" fill="#333333" />
                            <circle cx="3" cy="12" r="1" fill="#333333" />
                            <circle cx="3" cy="19" r="1" fill="#333333" />
                        </svg>
                        <span>Mục lục:</span>
                    </div>

                    <div className={s.tableContentItem} dangerouslySetInnerHTML={{ __html: tableContent }} />
                </div>

                <div className={s.blogContent} dangerouslySetInnerHTML={{ __html: content }} />

                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <button className={s.button_rut_gon} style={{ cursor: "pointer" }} onClick={() => { handleRutGon() }}>Rút gọn</button>
                </div>
            </div >
            <div className={s.box_Blog}>
                <div className={s.box_Blog_title}>Blog tuyển dụng</div>
                <div className={s.box_Blog_items}>
                    <div className={s.box_Blog_item}>
                        Cách viết thư từ chối ứng viên bằng tiếng Anh và mẫu tham khảo
                    </div>
                    <div className={s.box_Blog_item}>
                        Cách viết thư từ chối ứng viên bằng tiếng Anh và mẫu tham khảo
                    </div>
                    <div className={s.box_Blog_item}>
                        Cách viết thư từ chối ứng viên bằng tiếng Anh và mẫu tham khảo
                    </div>
                    <div className={s.box_Blog_item}>
                        Cách viết thư từ chối ứng viên bằng tiếng Anh và mẫu tham khảo
                    </div>
                    <div className={s.box_Blog_item}>
                        Cách viết thư từ chối ứng viên bằng tiếng Anh và mẫu tham khảo
                    </div>
                    <div className={s.box_Blog_item}>
                        Cách viết thư từ chối ứng viên bằng tiếng Anh và mẫu tham khảo
                    </div>
                    <div className={s.box_Blog_item}>
                        Cách viết thư từ chối ứng viên bằng tiếng Anh và mẫu tham khảo
                    </div>
                    <div className={s.box_Blog_item}>
                        Cách viết thư từ chối ứng viên bằng tiếng Anh và mẫu tham khảo
                    </div>
                    <div className={s.btn_tatca}>
                        <div>Tất cả</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.68871 0.920127C4.63366 0.974539 4.59012 1.0395 4.56068 1.11115C4.53124 1.18279 4.51651 1.25965 4.51737 1.33712C4.51822 1.4146 4.53465 1.49111 4.56566 1.56208C4.59668 1.63305 4.64163 1.69704 4.69787 1.75022L7.60862 4.52938H0.665435C0.589229 4.52924 0.513746 4.54417 0.443314 4.57332C0.372882 4.60248 0.308883 4.64527 0.254998 4.69926C0.201112 4.75325 0.158402 4.81737 0.129305 4.88794C0.100208 4.9585 0.0853082 5.03413 0.0854502 5.11049V5.88493C0.0853082 5.96128 0.100208 6.03691 0.129305 6.10748C0.158402 6.17805 0.201112 6.24217 0.254998 6.29616C0.308883 6.35015 0.372882 6.39296 0.443314 6.42211C0.513746 6.45126 0.589229 6.46619 0.665435 6.46605H7.60968L4.69896 9.24522C4.64325 9.29871 4.59876 9.3628 4.56808 9.43373C4.53741 9.50467 4.52116 9.58102 4.52031 9.65833C4.51946 9.73563 4.53401 9.81233 4.56311 9.88392C4.59221 9.95552 4.63528 10.0206 4.68979 10.0753L5.22882 10.6154C5.28247 10.6694 5.34625 10.7123 5.41651 10.7416C5.48677 10.7709 5.56211 10.786 5.6382 10.786C5.71429 10.786 5.78964 10.7709 5.85989 10.7416C5.93015 10.7123 5.99394 10.6694 6.04759 10.6154L10.7447 5.90924C10.7986 5.85541 10.8413 5.79144 10.8705 5.72101C10.8997 5.65057 10.9147 5.57505 10.9147 5.49879C10.9147 5.42252 10.8997 5.34702 10.8705 5.27659C10.8413 5.20615 10.7986 5.14219 10.7447 5.08835L6.04759 0.384925C5.99397 0.330795 5.93021 0.287831 5.85994 0.258512C5.78968 0.229194 5.71431 0.214111 5.6382 0.214111C5.56209 0.214111 5.48672 0.229194 5.41646 0.258512C5.3462 0.287831 5.28243 0.330795 5.22882 0.384925L4.68871 0.920127Z" fill="#3582CD" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Blog;
