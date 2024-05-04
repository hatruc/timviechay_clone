import Image from 'next/image';
import style from './intro.module.scss';
import { useContext } from 'react';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';

export default function Intro() {
  const { chuyenvien } = useContext(NTD_UV_Context)
    return (
      <div className={style.intro}>
        <div className={style.info}>
          <div className={style.avatar}>
            <Image src='/images/candidate/ava_default.png' width={114} height={114} style={{ width: '114px', height: '114px', borderRadius: "50%", border: '1px solid #3582CD' }} alt='avatar' />
          </div>
          <div className={style.text}>
            <div className={style.name}>
              <p style={{ color: '#333' }}>Chuyên viên hỗ trợ: </p>
              <p style={{ color: '#3582cd'}}>{chuyenvien?.adm_name || 'Chưa cập nhật'}</p>
            </div>
            <div className={style.phone}>
              <p style={{ color: '#333' }}>SĐT - Zalo: </p>
              <p style={{ color: '#3582cd'}}>{chuyenvien?.adm_phone || 'Chưa cập nhật'}</p>
            </div>
            <div className={style.email}>
              <p style={{ color: '#333' }}>Email: </p>
              <p style={{ color: '#f39623'}}>{chuyenvien?.adm_email || 'Chưa cập nhật'}</p>
            </div>
          </div>
        </div>
        <div className={style.ads}>
          <div className={style.ads_intro}>
            <p style={{ color: '#fff' }}>Tặng app chấm công nhận diện khuôn mặt và phần mềm tính lương miễn phí trọn đời</p>
          </div>
          <div className={style.ads_logo}>
            <Image src='/images/nha-tuyen-dung/quan-ly-chung/icon_chat.svg' alt='Logo chấm công 365' width={30} height={43} style={{ width: '30px', height: '43px' }} />
            <p style={{ color: '#3852cd' }}>Chấm công 365</p>
          </div>
        </div>
      </div>
    )
}