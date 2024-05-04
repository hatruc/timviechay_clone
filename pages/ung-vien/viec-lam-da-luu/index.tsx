
import s from "./styles.module.scss"
import Temp_comp from "@/components/quan-ly-chung-UV/Temp_comp"
import Intro from "@/components/ung-vien/intro/intro"
import type { ColumnsType } from 'antd/es/table';
import { Modal, Table } from "antd"
import { useCallback, useEffect, useState } from "react";
import Pagination_page from "@/components/quan-ly-chung-UV/common/Pagination_page";
import { GetServerSideProps, NextPage, NextPageContext } from "next";
import { POST, POST_SERVER } from "@/pages/api/base-api";
import { format } from "date-fns";
import { cookieAuth } from "@/components/service/functions";
import Cookies from "js-cookie";
import { getTokenServerSide } from "@/functions/functions";
import Link from "next/link";

interface pageProps {
  preFetchData: [],
  preTotal: number,
}

export const getServerSideProps = async (context: NextPageContext) => {
  let savedJob = []
  let total = 0
  const token = getTokenServerSide(context)
  const result = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_CANDI}/candidate/JobDidSave`, { page: 1, pageSize: 10 }, token)
  if (result?.result) {
    savedJob = result?.data
    total = result?.total
  }
  return {
    props: {
      preFetchData: savedJob,
      preTotal: total
    }
  }
}

interface DataType {
  key: string,
  stt: string,
  position: string,
  company: string,
  // deadline: string,
  date: string,
  // status: string,
  link: string,
  id: number | string,
  new_id: number | string,
  usc_id: number | string,
}

const ViecLamDaLuu: NextPage<pageProps> = ({ preFetchData, preTotal }) => {
  const [data, setData] = useState<any>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(preTotal || 1500)
  const [perPage, setPerPage] = useState(10)
  const [firstLoad, setFirstLoad] = useState(true)

  const rawData_tableData = (data: any[]) => {
    if (Array.isArray(data)) {
      let returnData = []
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const tblData: DataType = {
          key: i.toString(),
          stt: (i + 1).toString(),
          position: `${element?.new_title}`,
          company: `${element?.usc_company},`,
          date: format(new Date(element?.create_time), 'dd/MM/yyyy'),
          link: `/${element?.new_alias}-${element?.new_id}.html`,
          id: element?.id,
          new_id: element?.new_id,
          usc_id: element?.usc_id,
        }
        returnData.push(tblData)
      }
      setData([...returnData])
    }
  }

  const fetchCallback = useCallback(
    async () => {
      const result = await POST(`candidate/JobDidSave`, { page: page, pageSize: perPage })
      if (result?.result) {
        rawData_tableData(result?.data)
        setTotal(result?.total)
      }
    },
    [page, perPage],
  )

  const unsaveJob = async (id: number, name: string = '') => {
    // console.log(id)
    if (confirm(`Bạn có muốn hủy lưu ${name}?`)) {
      const result = await POST('candidate/SaveNew', { id_tin: `${id}` })
      if (result?.result) {
        await fetchCallback()
      } else {
        alert(result?.message)
      }
    }
  }

  useEffect(() => {
    rawData_tableData(preFetchData)
  }, [])

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false)
    } else {
      fetchCallback()
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [page])

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      align: "center",
    },
    {
      title: 'Vị trí công việc',
      key: 'position',
      align: "center",
      render: (record) => (
        <div style={{ color: "#4C5BD7" }}>{record.position}</div>
      ),
    },
    {
      title: 'Công ty',
      key: 'company',
      align: "center",
      width: 190,
      render: (record) => (
        <div>
          <div style={{ color: "#4C5BD7" }}>{record.company}</div>
          <Link
            href={`${record.link}`}
            // target="_blank"
          >
            <span style={{ color: "#4C5BD7", fontStyle: "italic" }} >(xem chi tiết)</span>
          </Link>
        </div>
      ),
    },
    {
      title: 'Ngày lưu',
      dataIndex: 'date',
      key: 'date',
      align: "center",
    },
    {
      title: 'Xóa',
      key: 'action',
      align: "center",
      render: (record) => (
        <div style={{ color: "#FF0707" }} onClick={() => { unsaveJob(record.new_id, record.position) }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="24" viewBox="0 0 19 24" fill="none">
            <path d="M17.75 3.78571H13.25V2.55357C13.25 2.00893 13.0525 1.4866 12.7008 1.10148C12.3492 0.716358 11.8723 0.5 11.375 0.5H7.625C7.12772 0.5 6.65081 0.716358 6.29917 1.10148C5.94754 1.4866 5.75 2.00893 5.75 2.55357V3.78571H1.25C1.05109 3.78571 0.860322 3.87226 0.71967 4.02631C0.579018 4.18035 0.5 4.38929 0.5 4.60714C0.5 4.825 0.579018 5.03393 0.71967 5.18798C0.860322 5.34203 1.05109 5.42857 1.25 5.42857H2.04688L2.9375 21.0829C3.00406 22.4614 3.96875 23.5 5.1875 23.5H13.8125C15.0373 23.5 15.9828 22.4845 16.0625 21.0871L16.9531 5.42857H17.75C17.9489 5.42857 18.1397 5.34203 18.2803 5.18798C18.421 5.03393 18.5 4.825 18.5 4.60714C18.5 4.38929 18.421 4.18035 18.2803 4.02631C18.1397 3.87226 17.9489 3.78571 17.75 3.78571ZM6.52672 20.2143H6.5C6.30563 20.2144 6.11881 20.1319 5.9789 19.9841C5.83899 19.8364 5.75692 19.6349 5.75 19.4221L5.375 7.92212C5.36791 7.70426 5.44014 7.49225 5.57578 7.33271C5.71142 7.17318 5.89937 7.07919 6.09828 7.07143C6.29719 7.06367 6.49077 7.14277 6.63644 7.29133C6.7821 7.43989 6.86791 7.64574 6.875 7.86359L7.25 19.3636C7.25357 19.4715 7.23769 19.5791 7.20326 19.6802C7.16884 19.7814 7.11654 19.8741 7.04937 19.9531C6.98219 20.0322 6.90146 20.0959 6.81178 20.1407C6.7221 20.1855 6.62523 20.2105 6.52672 20.2143ZM10.25 19.3929C10.25 19.6107 10.171 19.8196 10.0303 19.9737C9.88968 20.1277 9.69891 20.2143 9.5 20.2143C9.30109 20.2143 9.11032 20.1277 8.96967 19.9737C8.82902 19.8196 8.75 19.6107 8.75 19.3929V7.89286C8.75 7.675 8.82902 7.46607 8.96967 7.31202C9.11032 7.15797 9.30109 7.07143 9.5 7.07143C9.69891 7.07143 9.88968 7.15797 10.0303 7.31202C10.171 7.46607 10.25 7.675 10.25 7.89286V19.3929ZM11.75 3.78571H7.25V2.55357C7.24943 2.49946 7.25875 2.44578 7.27739 2.39567C7.29604 2.34556 7.32364 2.30004 7.35857 2.26177C7.39351 2.22351 7.43507 2.19328 7.48083 2.17286C7.52658 2.15244 7.5756 2.14224 7.625 2.14286H11.375C11.4244 2.14224 11.4734 2.15244 11.5192 2.17286C11.5649 2.19328 11.6065 2.22351 11.6414 2.26177C11.6764 2.30004 11.704 2.34556 11.7226 2.39567C11.7413 2.44578 11.7506 2.49946 11.75 2.55357V3.78571ZM13.25 19.4221C13.2431 19.6349 13.161 19.8364 13.0211 19.9841C12.8812 20.1319 12.6944 20.2144 12.5 20.2143H12.4728C12.3743 20.2104 12.2775 20.1854 12.1879 20.1406C12.0983 20.0957 12.0176 20.032 11.9505 19.953C11.8833 19.874 11.8311 19.7813 11.7967 19.6801C11.7623 19.579 11.7464 19.4714 11.75 19.3636L12.125 7.86359C12.1285 7.75572 12.1514 7.64966 12.1923 7.55147C12.2332 7.45328 12.2914 7.36489 12.3636 7.29133C12.4357 7.21777 12.5203 7.16049 12.6127 7.12276C12.705 7.08503 12.8032 7.06759 12.9017 7.07143C13.0002 7.07527 13.097 7.10032 13.1867 7.14515C13.2763 7.18999 13.3571 7.25372 13.4242 7.33271C13.4914 7.41171 13.5437 7.50442 13.5781 7.60555C13.6126 7.70668 13.6285 7.81425 13.625 7.92212L13.25 19.4221Z" fill="#FF0707" />
          </svg>
        </div>
      )
    },
  ];
  // const item =
  // {
  //   stt: '1',
  //   position: 'ITP GROUP tuyển dụng nhận viên SEO',
  //   company: "ITP GROUP",
  //   deadline: '01/01/2024',
  //   date: "01/01/2024",
  //   status: 'Chưa đánh giá',
  // }
  // for (var i = 0; i <= 9; i++) {
  //   data.push({
  //     key: i.toString(),
  //     stt: i.toString(),
  //     position: 'ITP GROUP tuyển dụng nhận viên SEO',
  //     company: "ITP GROUP",
  //     deadline: '01/01/2024',
  //     date: "01/01/2024",
  //     status: 'Chưa đánh giá',
  //   });
  // }
  return (
    <>
      <Temp_comp>
        {/* <div className={s.intro_center}><Intro /></div> */}
        <div className={s.container_table}>
          <div className={s.title}>
            <div className={s.label}>Việc làm đã lưu </div>
            <span></span>
          </div>
          <Table columns={columns} dataSource={data} className={s.table_content} rowKey="key" pagination={false} scroll={{ x: 900 }} />
          <Pagination_page
            current={page}
            setCurrent={setPage}
            total={total}
            pageSize={perPage}
          />
        </div>
      </Temp_comp>
    </>
  )
}

export default ViecLamDaLuu