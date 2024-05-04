import { Pagination, PaginationProps } from 'antd'
import React, { useState } from 'react'
import s from './pagination_page.module.scss'

interface componentProps {
  current?: number,
  setCurrent?: any,  //?: mb(value: nuer) => void,
  total?: number,
  pageSize?: number,
}

const Pagination_page: React.FC<componentProps> = ({
  current = 1,
  setCurrent,
  total = 100,
  pageSize = 10,
}) => {
  // const [page, setPage] = useState(current)
  // const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
  //   console.log(current, pageSize);
  //   setCurrent(current)
  //   // setPage(current)
  // };

  const onChange: PaginationProps['onChange'] = (current, pageSize) => {
    // console.log(current, pageSize);
    setCurrent(current)
  }

  return (
    <>
      <style>{
        `
      .box_pagination {
          margin-top: 28px;
          margin-bottom: 56px;
          display: flex;
          justify-content: center;
      }
      .box_pagination ul{
        display: flex;
        flex-wrap: nowrap;
      }
      .box_pagination ul li{
          width: 29px;
          border-radius: 16px;
          min-width: 36px !important;
      }
      .box_pagination ul li.ant-pagination-item-active{
          padding: 10px;
          gap: 10px;
          width: 29px;
          border-radius: 16px;
          background:#3582CD;
      }
      .box_pagination ul li a,.box_pagination ul li button {
            font-family: Roboto;
            border-radius: 16px !important;
            background: rgba(55, 122, 187, 0.10);
      }
      .box_pagination ul li.ant-pagination-item-active a{
          color: #FFF;
          text-shadow: 0px 0px 5px rgba(51, 51, 51, 0.25);
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 14px;
          display: flex;
          justify-content: center;
          padding: 0 2px !important;
      }
      `
      }</style>
      <div className="box_pagination">
        <Pagination
          showSizeChanger={false}
          // onShowSizeChange={onShowSizeChange}
          // defaultCurrent={1}
          current={current}
          total={total}
          onChange={onChange}
          pageSize={pageSize}
          hideOnSinglePage={true}
        />
      </div>
    </>
  )
}

export default Pagination_page
