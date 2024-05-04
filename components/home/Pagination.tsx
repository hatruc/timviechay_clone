/* eslint-disable @next/next/no-img-element */
import { renderPagination } from '@/functions/functions'
import React, { useEffect, useState } from 'react'

const Pagination = ({ handleNextClick, handlePrevClick, totalItem, handleGoToSlide, currentPage, handleValue }: any) => {
  const handleSetPage = (page: number) => {
    handleGoToSlide(page);
    setPage(page)
  }
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(Number(currentPage + 1))
  }, [currentPage])

  return (
    <div className="pagination_com">
      <div 
        className="show_tag show_left" 
        style={{ cursor: 'pointer' }} 
        onClick={() => {
          if (page <= 1) {/*handleSetPage(1)*/}
          else handleSetPage(page - 1)
        }}
      >
        <img src="/images/small-left1.svg" alt="Lùi" />
      </div>
      <div className="list_pag">
        {
          renderPagination(totalItem)?.map(item => (
            <div key={item} className={`item_pag ${page === item && 'bg_3582CD bd_3582CD ffffff'}`} onClick={() => {
              handleSetPage(item)
              setPage(item)
            }}>{item}</div>
          ))
        }
      </div>
      <div className="show_tag show_right" style={{ cursor: 'pointer' }} onClick={() => {
        if (page >= totalItem) {/*handleSetPage(totalItem)*/}
        else handleSetPage(page + 1)
      }}>
        <img src="/images/small-right.svg" alt="Tiến" />
      </div>
    </div>
  )
}

export default Pagination