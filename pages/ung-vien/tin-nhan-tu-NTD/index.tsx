
import SidebarTimViec from "@/components/quan-ly-chung-UV/common/Sidebar-timviec"
import s from "./styles.module.scss"
import Temp_comp from "@/components/quan-ly-chung-UV/Temp_comp"
import Intro from "@/components/ung-vien/intro/intro"
import type { ColumnsType } from 'antd/es/table';
import { Table } from "antd"
import { useEffect, useState } from "react";
import Pagination_page from "@/components/quan-ly-chung-UV/common/Pagination_page";


export default function TinNhanTuNTD() {
    const [data,setData] = useState<any>([]);
    const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

    const columns: ColumnsType<any> = [
        {
          title: 'Ứng viên',
          key: 'candidate',
          align:"center",
          width: 200,
          render:(record)=>(
            <div style={{color:"#4C5BD7"}}>{record.candidate}</div>
          ),
        },
        {
          title: 'Tiêu đề',
          key: 'title',
          width: 300,
          align:"center",
          render:(record)=>(
            <div style={{fontWeight:"600"}}>{record.title}</div>
          )
        },
        {
          title: 'Nội dung',
          key: 'content',
          align:"center",
          width: 530,
          render:(record)=>(
            <div style={{textAlign:"left",fontWeight:"400"}}>{record.content}</div>
          )
        },
        {
          title: 'Thời gian gửi',
          dataIndex: 'time',
          key: 'time',
          align:"center",
        },
        {
          title: 'Hành động',
          dataIndex: 'action',
          key: 'action',
          align:"center",
        },
      ];    
      for(var i=0;i<=10;i++){
        data.push({
            key: i.toString(),
            candidate: 'ITP GROUP',
            title: "THƯ MỜI PHỎNG VẤN VÀO NGÀY 11/12/2024",
            content: 'Chúc mừng ứng viên Triệu Việt Hoàng đã thành cồn vượt qua vòng xét duyệt CV. Chúng tôi rất mong ứng viên có mặt tại Công ty ITP GROUP vào ngày 11/12/2024 để trao đổi cũng như tìm hiểu để biết rõ hơn...',
            time:"00:00 - 01/01/2024",
            action: 'Đã xem',
          });
      }

      useEffect(() => {
        // danhSachUngVien();
        // setData again
        return () => {};
      }, [page]);
    return(
        <>
        <Temp_comp>
        {/* <div className={s.intro_center}><Intro /></div> */}
        <div className={s.container_table}>
            <div className={s.title}>
                <div className={s.label}>Tin nhắn từ NTD </div>
                <span></span>
            </div>
            <Table columns={columns} dataSource={data} className={s.table_content} rowKey="key" pagination={false} scroll={{ x: 900 }}/>
            <Pagination_page
                current={page}
                pageSize={perPage}
                setCurrent={setPage}
                total={10}
              />
        </div>
        </Temp_comp>
        </>
    )
}