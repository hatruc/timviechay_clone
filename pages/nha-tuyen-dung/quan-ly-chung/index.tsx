import { useEffect, useState } from 'react';
import style from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Intro from '@/components/nha-tuyen-dung/quan-ly-chung/Intro/Intro';
import Footer from '@/components/common/Footer';
import Temp_comp from '@/components/quan-ly-chung-NTD/Temp_comp';
import Cookies from 'js-cookie';
import { POST } from '@/pages/api/base-api';
import { useRouter } from 'next/router';

const data_list_recruit: any[] = [
  {
    index: '1',
    position: 'Nhân viên kế toán',
    service: 'VIP',
    view: '1000',
    recruit: 'Ứng tuyển',
    send_UV: 'Chuyên viên gửi UV',
    manage: 'Quản lý',
  },
  {
    index: '2',
    position: 'Nhân viên kế toán',
    service: 'VIP',
    view: '1000',
    recruit: 'Ứng tuyển',
    send_UV: 'Chuyên viên gửi UV',
    manage: 'Quản lý',
  },
  {
    index: '3',
    position: 'Nhân viên kế toán',
    service: 'VIP',
    view: '1000',
    recruit: 'Ứng tuyển',
    send_UV: 'Chuyên viên gửi UV',
    manage: 'Quản lý',
  },
  {
    index: '4',
    position: 'Nhân viên kế toán',
    service: 'VIP',
    view: '1000',
    recruit: 'Ứng tuyển',
    send_UV: 'Chuyên viên gửi UV',
    manage: 'Quản lý',
  },
  {
    index: '5',
    position: 'Nhân viên kế toán',
    service: 'VIP',
    view: '1000',
    recruit: 'Ứng tuyển',
    send_UV: 'Chuyên viên gửi UV',
    manage: 'Quản lý',
  },
  {
    index: '6',
    position: 'Nhân viên kế toán',
    service: 'VIP',
    view: '1000',
    recruit: 'Ứng tuyển',
    send_UV: 'Chuyên viên gửi UV',
    manage: 'Quản lý',
  }
]

const data_recruitment: any[] = [
  {
    index: '1',
    UV: 'Hoàng Khắc Đông',
    position: 'Nhân viên kế toán',
    manage: 'Quản lý',
  },
  {
    index: '2',
    UV: 'Hoàng Khắc Đông',
    position: 'Nhân viên kế toán',
    manage: 'Quản lý',
  },
  {
    index: '3',
    UV: 'Hoàng Khắc Đông',
    position: 'Nhân viên kế toán',
    manage: 'Quản lý',
  },
  {
    index: '4',
    UV: 'Hoàng Khắc Đông',
    position: 'Nhân viên kế toán',
    manage: 'Quản lý',
  },
]

export default function QuanLyChung() {
  const [dataQuanly,setDataQuanly]=useState<any>()
  const router = useRouter()
  useEffect(()=>{
    const tokenLogin= Cookies.get('login-ntd')
      POST('ntd/ManageAll',{})
      .then((result) => {
        const promiseResult = result; 
        setDataQuanly(promiseResult);
      });
  },[]);

  return (
    <>
      <Temp_comp>
        <div className={style.container}>
          <Intro />
          <div className={style.data}>
            <div className={style.quanlity}>
              <div className={style.item}>
                <p>Việc làm còn hạn:</p>
                <p>{dataQuanly?.data?.tinconhan}</p>
              </div>
              <div className={style.item}>
                <p>Việc làm sắp hết hạn:</p>
                <p>{dataQuanly?.data?.tinsaphethan}</p>
              </div>
              <div className={style.item}>
                <p>Việc làm hết hạn:</p>
                <p>{dataQuanly?.data?.tinhethan}</p>
              </div>
              <div className={style.item}>
                <p>Số tin đăng trong ngày:</p>
                <p>{dataQuanly?.data?.tindangtrongngay}</p>
              </div>
              <div className={style.item}>
                <p>Số lần làm mới tin trong ngày:</p>
                <p>{dataQuanly?.data?.tindangtrongngay}</p>
              </div>
            </div>
            <div className={style.data_file}>
              <div className={style.file_box}>
                <div className={style.item} style={{ borderBottomColor: '#ffaa60' }}>
                  <div className={style.title}>
                    <div className={style.name}>
                      <p>Hồ sơ ứng tuyển</p>
                    </div>
                    <Image src="/images/nha-tuyen-dung/quan-ly-chung/icon_ungtuyen.svg" alt='Icon hồ sơ ứng tuyển' width={56} height={59} style={{ width: '56px', height: '59px' }} />
                  </div>
                  <div className={style.count}>
                    <p style={{ color: '#ffaa60' }}>{dataQuanly?.data?.hoSoUt}</p>
                  </div>
                </div>
                <div className={style.item} style={{ borderBottomColor: '#81d9ff' }}>
                  <div className={style.title}>
                    <div className={style.name}>
                      <p>Hồ sơ lọc điểm</p>
                    </div>
                    <Image src="/images/nha-tuyen-dung/quan-ly-chung/icon_locdiem.svg" alt='Icon hồ sơ ứng tuyển' width={60} height={60} style={{ width: '60px', height: '60px' }} />
                  </div>
                  <div className={style.count}>
                    <p style={{ color: '#81D9FF' }}>{dataQuanly?.data?.hoSoDiemLoc}</p>
                  </div>
                </div>
                <div className={style.item} style={{ borderBottomColor: '#89ff8d' }}>
                  <div className={style.title}>
                    <div className={style.name} style={{ whiteSpace: 'nowrap', paddingBottom: '2px' }}>
                      <p>Chuyên viên gửi ứng viên</p>
                    </div>
                    <Image src="/images/nha-tuyen-dung/quan-ly-chung/icon_guiUV.svg" alt='Icon hồ sơ ứng tuyển' width={58} height={74} style={{ width: '58px', height: '74px' }} />
                  </div>
                  <div className={style.count}>
                    <p style={{ color: '#89FF8D' }}>{dataQuanly?.data?.chuyenVienGuiUv}</p>
                  </div>
                </div>
              </div>
              {/* <div className={style.booster}>
                <Image src="/images/nha-tuyen-dung/quan-ly-chung/icon_rocket.svg" alt='Icon booster' width={48} height={48} style={{ width: '48px', height: '48px' }} />
                <p>tăng tốc tuyển dụng</p>
              </div> */}
            </div>
          </div>
          <div className={style.rate}>
            <p>Nhằm nâng cao chất lượng dịch vụ cũng như giúp doanh nghiệp tuyển dụng nhanh chóng - thành công, mong quý công ty đưa ra đánh giá của mình về chuyên viên hỗ trợ và đóng góp về website. Mọi đóng góp của doanh nghiệp sẽ là nền tảng để chúng tôi phát triển và tối ưu!</p>
            <div className={style.rate_button} onClick={() => router.push('/nha-tuyen-dung/dong-gop-y-kien')}>
              <p>Đánh giá</p>
            </div>
          </div>
          <div className={style.table_list_recruit}>
            <div className={style.title}>
              <p>Danh sách tuyển dụng mới nhất</p>
              <div style={{ width: '50px', height: '3px', background: '#f39623' }}></div>
            </div>
            <div className={style.table_container}>
              <table className={style.table}>
                <thead>
                  <tr>
                    <th style={{ width: '5%' }}>STT</th>
                    <th style={{ width: '30%' }}>Vị trí tuyển dụng</th>
                    <th style={{ width: '11%' }}>Gói dịch vụ</th>
                    <th style={{ width: '11%' }}>Lượt xem</th>
                    <th style={{ width: '11%' }}>Ứng tuyển</th>
                    <th style={{ width: '20%' }}>Chuyên viên gửi UV</th>
                    <th style={{ width: '12%' }}>Quản lý</th>
                  </tr>
                </thead>
                {!(dataQuanly?.data?.tinGanDay.length === 0) && (
                  <tbody>
                    {dataQuanly?.data?.tinGanDay.map((data:any, index:number) => {
                      return (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{data.new_title}</td>
                          <td>{(data.new_hot==0)?"Thường":"Vip"}</td>
                          <td>{data.new_view_count}</td>
                          <td>{data.uVungTuyen}</td>
                          <td>{data.chuyenVienGuiUv}</td>
                          <td>{}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                )}
              </table>
            </div>
            {(dataQuanly?.data?.hoSoMoi.length === 0) && (
              <div className={style.noti}>
                Bạn chưa có tin tuyển dụng nào ? Hãy<Link href='/nha-tuyen-dung/tin-tuyen-dung/dang-tin-moi' style={{ color: '#ffaa60', whiteSpace: 'pre' }}> đăng tin</Link>
              </div>
            )}
          </div>
          <div className={style.table_recruitment}>
            <div className={style.title}>
              <p>Hồ sơ ứng tuyển mới nhất</p>
              <div style={{ width: '50px', height: '3px', background: '#f39623' }}></div>
            </div>
            <div className={style.table_container}>
              <table className={style.table}>
                <thead>
                  <tr>
                    <th style={{ width: '5%' }}>STT</th>
                    <th style={{ width: '29%' }}>Ứng viên</th>
                    <th style={{ width: '52%' }}>Vị trí tuyển dụng</th>
                    <th style={{ width: '14%' }}>Quản lý</th>
                  </tr>
                </thead>
                {!(dataQuanly?.data?.hoSoMoi.length === 0) && (
                  <tbody>
                    {dataQuanly?.data?.hoSoMoi.map((data:any, index:number) => {
                      return (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{data.use_name}</td>
                          <td>{data.new_title}</td>
                          <td></td>
                        </tr>
                      )
                    })}
                  </tbody>
                )}
              </table>
            </div>
            {/* {(data_recruitment.length === 0) && (
              <div className={style.noti}>
                Bạn chưa có ứng viên nộp hồ sơ
              </div>
            )} */}
          </div>
        </div>
      </Temp_comp>
    </>
  )
}