/* eslint-disable @next/next/no-img-element */
import { Popover } from 'antd'
import React from 'react'
import TooltipComponent from './TooltipComponent'
import { getHanNop, getMucLuong } from '@/functions/functions'
import Link from 'next/link'

const Detail_company = ({ data }: any) => {
    return (
        <div className="detail_company">
            <div className="company_info">
                <a href="#" className="avata_com">
                    <img src="/images/candidate/ava_default.png" alt="avata" />
                    {/* <div className="dot_online">
                        <img src="/images/online.svg" alt="Online" />
                    </div> */}
                    {/* <div className="tiaset">
                        <img src="/images/tiaset.svg" alt="Tia sét" />
                    </div> */}
                </a>
                <div className="box_detail_com">
                    <div className="box_tt_c">
                        <Popover content={<TooltipComponent content={data.new_title} />} overlayClassName="custom-tooltip">
                            <Link href={`/${data.new_alias}-${data.new_id}.html`} className="title_com cl3582CD">
                                <span className='title_com'>{data.new_title}</span>
                            </Link>
                        </Popover>
                        <Popover content={<TooltipComponent content={`${data.usc_company}`} />} overlayClassName="custom-tooltip">
                            <p className="name_com">{`${data.usc_company}`}</p>
                        </Popover>
                        {/* <div className="vote_com">
                            <img src="/images/Star_y.svg" alt="Star vote" className="start_vote" />
                            <img src="/images/Star_y.svg" alt="Star vote" className="start_vote" />
                            <img src="/images/Star_y.svg" alt="Star vote" className="start_vote" />
                            <img src="/images/Star_y.svg" alt="Star vote" className="start_vote" />
                            <img src="/images/Star1.svg" alt="Star vote" className="start_vote" />
                        </div> */}
                    </div>
                    {/* <div className="img_mess">
                        <img src="/images/messages.svg" alt="Nhắn tin" />
                    </div> */}
                </div>
            </div>
            <div className="more_info_com">
                <Popover content={<TooltipComponent content="Hà Nội, Hồ Chí Minh, Đà Nẵng" />} overlayClassName="custom-tooltip">
                    <p className="mor_i">{data.new_city[0]}</p>
                </Popover>
                <p className="mor_i">{getMucLuong(data.new_money_type,
                    data.new_money_from,
                    data.new_money_to,
                    data.new_money)}</p>
                <p className="mor_i">{getHanNop(data.new_han_nop)}</p>
            </div>
        </div>
    )
}

export default Detail_company
