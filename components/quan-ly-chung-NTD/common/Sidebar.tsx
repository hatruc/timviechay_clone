import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import SidebarTimViec from './Sidebar-timviec';
import s from './sidebar.module.scss';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
import { handleImageSource } from '@/functions/functions';

const Sidebar = () => {
    const { name, phone, ava, } = useContext(NTD_UV_Context)
    // console.log(ava)
    // console.log(name);

    return (
        <div className={s.sidebar}>
            <Link href={'/'}>
                <div className={s.box_logo}>
                    <Image height={10} width={10} src="/images/quan-ly-chung-ntd/logo.svg" alt="" />
                </div>
            </Link>
            <div className={s.box_info}>
                <div className={s.box_img_ava}>
                    <Image
                        height={80}
                        width={80}
                        src={handleImageSource(ava) || '/images/quan-ly-chung-ntd/logo.svg'}
                        alt="Logo công ty"
                        onError={(e) => {
                            e.currentTarget.srcset = '/images/candidate/ava_default.png'
                        }}
                        style={{
                            borderRadius: '50%',
                            border: '1px solid white',
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <p>{name}</p>
            </div>
            <div className={s.sidebarContent}>
                <SidebarTimViec />
            </div>
        </div>
    )
}

export default Sidebar
