import React, { useEffect, useState } from 'react';
import Temp_comp from "@/components/quan-ly-chung-NTD/Temp_comp";
import style from './styles.module.scss';
import Intro from '@/components/nha-tuyen-dung/quan-ly-chung/Intro/Intro';
import Image from 'next/image';
import Pagination_page from '@/components/quan-ly-chung-NTD/common/Pagination_page';
import { NextPage, NextPageContext } from 'next';
import { getTokenServerSide } from '@/functions/functions';
import { POST, POST_SERVER } from '@/pages/api/base-api';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import Link from 'next/link';

const table_data = [
    {
        index: 1,
        position: 'GIÁM ĐỐC KINH DOANH TIỀN TỆ',
        update_time: '17:27:32',
        update_day: '07/12/2023',
        candidate_number: 18223,
        view: 38,
        recruit: 0,
        status: 'Tin đã được đăng',
        deadline: '20/05/2024',
        service: 'Ghim tin',
        solution: '',
        link: '',
        id: 0,
    },
]

export const getServerSideProps = async (context: NextPageContext) => {
    const token = getTokenServerSide(context)
    let returnData = []
    let total = 0
    const result = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_NEW}/new/listNewNTD`, { page: 1, pageSize: 10 }, token)
    if (result?.result) {
        returnData = result?.data
        total = result?.total
    }

    return {
        props: {
            preData: returnData,
            preTotal: total,
        }
    }
}

const TinDaDang: NextPage<{ preData: any, preTotal: any }> = ({ preData, preTotal }) => {
    // console.log(preData, preTotal)
    const [tableData, setTableData] = useState(table_data);
    const [data, setData] = useState<any>([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(preTotal || 1500)
    const [perPage, setPerPage] = useState(10)
    const router = useRouter()
    const [firstLoad, setFirstLoad] = useState(true)

    function deleteItemByIndex(index: any) {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa không?');
        if (confirmDelete) {
            setTableData(prevData => {
                const newData = [...prevData];
                newData.splice(index, 1);
                return newData;
            });
        }
    }

    const deleteNew = async (id: number | string) => {
        if (confirm('Bạn có chắc chắn muốn xóa không?')) {
            const result = await POST('new/DeleteNew', { idNew: `${id}` })
            if (result?.result) {
                alert(result?.message)
                await fetchData()
            } else {
                alert(result?.message)
            }
        }
    }

    const rawData_tableData = (data: any) => {
        let returnData = []
        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                const news = {
                    index: (i + 1),
                    position: `${element?.new_title}`,
                    update_time: format(new Date(element?.new_update_time), 'HH:mm:ss'),
                    update_day: format(new Date(element?.new_update_time), 'dd/MM/yyyy'),
                    candidate_number: element?.soUvTiemNang,
                    view: element?.new_view_count,
                    recruit: element?.soLuongNHS,
                    status: ((new Date()) < (new Date(element?.new_han_nop)) ? 'Tin đã đăng' : 'Tim đã hết hạn'),
                    deadline: format(new Date(element?.new_han_nop), 'dd/MM/yyyy'),
                    service: 'Ghim tin',
                    solution: '',
                    link: `/${element?.new_alias}-${element?.new_id}.html`,
                    id: element?.new_id,
                }
                returnData.push(news)
            }
        }
        // return returnData
        setTableData(returnData)
    }

    const fetchData = async () => {
        const result = await POST(`new/listNewNTD`, { page: page, pageSize: perPage })
        if (result?.result) {
            rawData_tableData(result?.data)
            setTotal(result?.total)
        }
    }

    const RefreshNew = async (idNew: number | string) => {
        const result = await POST('new/RefreshNew', {idNew: idNew})
        if (result?.result) {
            alert(result?.message)
            fetchData()
        } else {
            alert(result?.message)
        }
    }

    useEffect(() => {
        // console.log(rawData_tableData(preData))
        rawData_tableData(preData)
        return () => { };
    }, [])

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false)
        } else {
            fetchData()
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return () => { };
    }, [page])

    return (
        <>
            <Temp_comp>
                <div className={style.container}>
                    <Intro />
                    <div className={style.recruitment_container}>
                        <div className={style.quanlity}>
                            <p>Tổng số tin tuyển dụng: </p>
                            <p>{`${total}`}</p>
                        </div>
                        <div className={style.booster_box}>
                            <div className={style.booster}>
                                <Image src='/images/nha-tuyen-dung/tin-tuyen-dung/icon_rocket.svg' width={80} height={80} style={{ width: '80px', height: '80px' }} alt='Icon Rocket' />
                                <p>Tăng tốc tuyển dụng</p>
                            </div>
                        </div>
                        <div className={style.table_container}>
                            <table className={style.table}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '3.4%' }}>STT</th>
                                        <th style={{ width: '23.8%' }}>Vị trí tuyển dụng</th>
                                        <th style={{ width: '13.2%' }} colSpan={2}>Thống kê</th>
                                        <th style={{ width: '8%' }}>Trạng thái</th>
                                        <th style={{ width: '9.2%' }}>Hạn nộp</th>
                                        <th style={{ width: '11.7%' }}>Dịch vụ</th>
                                        <th style={{ width: '9.8%' }}>Giải pháp tuyển dụng</th>
                                        <th style={{ width: '11.9%' }}>Dịch vụ tuyển dụng</th>
                                        <th style={{ width: '9%' }}>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((data, index) => {
                                        return (
                                            <tr key={index} >
                                                <td>{data.index}</td>
                                                <td>
                                                    <Link href={data.link}>
                                                        <p style={{ fontWeight: '600', color: '#4c5bd7' }}>{data.position}</p>
                                                    </Link>
                                                    <p style={{ fontWeight: '400' }}>{`Cập nhật lúc: ${data.update_time} ngày ${data.update_day}`}</p>
                                                    <p style={{ fontWeight: '400', fontStyle: 'italic', color: '#58c64e' }}>{`(Số lượng ứng viên tiềm năng: ${data.candidate_number})`}</p>
                                                </td>
                                                <td>{`${data.view} Lượt xem`}</td>
                                                <td style={{ color: '#4c72df' }}>{`${data.recruit} Ứng tuyển`}</td>
                                                <td>{data.status}</td>
                                                <td>{data.deadline}</td>
                                                <td>
                                                    <p>{data.service}</p>
                                                    <p style={{ color: '#4c72df', whiteSpace: 'nowrap', cursor: 'pointer' }}>(Xem chi tiết)</p>
                                                </td>
                                                <td style={{ color: data.solution ? '#4c72df' : '#333', cursor: data.solution ? 'pointer' : 'text' }}>{data.solution ? 'Xem giải pháp' : 'Hệ thống đang phân tích giải pháp'}</td>
                                                <td>
                                                    <button className={style.refresh_button} style={{ width: '113px', background: '#ff9c41', color: '#fff', border: 'none' }} onClick={() => RefreshNew(data.id)}>Làm mới tin</button>
                                                    {/* <button className={style.pin_button} style={{ width: '144px', background: '#ff4186', color: '#fff', border: 'none' }}>Ghim tin tự động</button> */}
                                                </td>
                                                <td>
                                                    <button onClick={() => { router.push(`/nha-tuyen-dung/sua-tin${data.link}`) }} style={{ width: '21px', height: '20px', background: 'none', border: 'none', padding: 0, marginRight: '16px' }}>
                                                        <Image src='/images/nha-tuyen-dung/tin-tuyen-dung/icon_them.svg' alt='Nút thêm' width={21} height={20} style={{ width: '21px', height: '20px', marginRight: '8px' }} />
                                                    </button>
                                                    <button onClick={() => deleteNew(data.id)} style={{ width: '21px', height: '20px', background: 'none', border: 'none', padding: 0 }}>
                                                        <Image src='/images/nha-tuyen-dung/tin-tuyen-dung/icon_xoa.svg' alt='Nút xóa' width={21} height={20} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className={style.pagination}>
                            <Pagination_page
                                current={page}
                                pageSize={perPage}
                                setCurrent={setPage}
                                total={total}
                            />
                        </div>
                    </div>
                </div>
            </Temp_comp>
        </>
    )
}

export default TinDaDang