/* eslint-disable @next/next/no-img-element */
import React from 'react'
import TooltipComponent from './TooltipComponent'
import { Popover } from 'antd'

const Detail_com_onl = () => {
    return (
        <div className="detail_com_onl">
            <div className="company_info mr0">
                <a href="#" className="avata_com_onl">
                    <img src="/images/candidate/ava_default.png" alt="avata" />
                    <div className="dot_online">
                        <img src="/images/online.svg" alt="Online" />
                    </div>
                    {/* <div className="tiaset">
                        <img src="/images/tiaset.svg" alt="Tia sét" />
                    </div> */}
                </a>
                <div className="box_detail_com_onl">
                    <div className="box_tt_c">
                        <Popover content={<TooltipComponent content="Tuyển dụng 20 nhân viên kinh doanh bất động sản " />} overlayClassName="custom-tooltip">
                            <a href="#" className="title_com_onl cl3582CD">
                                <span className="title_com_onl">Công ty Cổ phần đầu tư xây dựng</span>
                            </a>
                        </Popover>
                        <Popover content={<TooltipComponent content="Công ty cổ phần đầu tư và phát triển freedom" />} overlayClassName="custom-tooltip">
                            <p className="name_com_onl font15_400">Bà Rịa Vũng Tàu</p>
                        </Popover>
                        <p className="add_job_onl font15_400">Tuyển nhân viên kinh doanh bất động sản</p>
                    </div>
                    {/* <div className="img_mess">
                        <img src="/images/messages.svg" alt="Nhắn tin" />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Detail_com_onl
