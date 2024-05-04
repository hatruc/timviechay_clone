import style from './styles.module.scss';
import Image from 'next/image';

export default function Intro() {
    return (
        <>
            <div className={style.intro}>
                <div className={style.avatar}>
                    <Image src='/images/nha-tuyen-dung/quan-ly-chung/avatar.svg' width={114} height={114} style={{ width: '114px', height: '114px' }} alt='avatar' />
                </div>
                <div className={style.text}>
                    <div className={style.name}>
                    <p style={{ color: '#333' }}>Chuyên viên hỗ trợ: </p>
                    <p style={{ color: '#3582cd'}}>Mrs. Nguyễn Hồng</p>
                    </div>
                    <div className={style.phone}>
                    <p style={{ color: '#333' }}>SĐT - Zalo: </p>
                    <p style={{ color: '#3582cd'}}>0972319116</p>
                    </div>
                    <div className={style.email}>
                    <p style={{ color: '#333' }}>Email: </p>
                    <p style={{ color: '#f39623'}}>nguyenhongg2609@gmail.com</p>
                    </div>
                </div>
            </div>
        </>
    )
}