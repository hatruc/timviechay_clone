/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {getDate} from "@/functions/functions"
import Link from 'next/link'
import Image from 'next/image'


const News_box = ({info}:any ) => {
    // console.log(info)
    // /images/tintuc_tuyendung_im.svg"
    return (
        <div className="news_box">
            <div className="box_img img_news" style={{
                height: '185px'
            }}>
                <Image width={280} height={185} src={info.new_picture} alt="Ảnh tin tức" style={{objectFit: 'cover'}} onError={(e)=>{
                    e.currentTarget.srcset = '/images/tintuc_tuyendung_im.svg'
                }}/>
            </div>
            <div className="ct_news">
                <p className="tt_ct_news">{info?.new_title}</p>
                <div className="date_name">
                    <div className="date">{getDate(info?.new_date)}</div>
                    <p className="name_n"><span style={{marginRight:4}}>by</span><span className="f_n">{info?.adm_name}</span></p>
                </div>
                <Link href={`/blog/${info?.new_title_rewrite}-${info?.new_id}.html`} className="see_news">
                    Xem bài viết
                </Link>
            </div>
        </div>
    )
}

export default News_box
