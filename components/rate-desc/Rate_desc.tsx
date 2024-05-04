import React from 'react';
import Image from 'next/image';
import style from './styles.module.scss';
import { handleImageSource } from '@/functions/functions';

// Người dùng nói gì về Joblike 365

const RateDesc = ({name, position, avatar, desc} : {name : string, position:string, avatar : string, desc : string}) => {
      
    return (
        <>
            <div className={style.carousel_container}>
                <div className={style.avatar}>
                    <Image width={100} height={100} src={handleImageSource(avatar)} className={style.image} alt="" />
                </div>
                <div className={style.text}>
                    <div className={style.name}>{name}</div>
                    <div className={style.position}>{position}</div>
                    <div className={style.desc}>{desc}</div>
                </div>
            </div>
        
        </>
    )
}

export default RateDesc;