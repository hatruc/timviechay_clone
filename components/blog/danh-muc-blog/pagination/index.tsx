import React, { useState } from 'react';

import s from './styles.module.scss'
const Pagination = ({ currentPage, setCurrentPage, totalPage, handleChangePage }: { currentPage: number, setCurrentPage: any, totalPage: number; handleChangePage: any; }) => {
    // const [currentPage, setCurrentPage] = useState(1);
    const handlePageLeft = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            handleChangePage(currentPage - 1);
        }
    }

    const handleMorePageLeft = () => {
        if (currentPage >= 11) {
            setCurrentPage(currentPage - 10);
            handleChangePage(currentPage - 10);
        }
        if (currentPage < 11) {
            setCurrentPage(1);
            handleChangePage(1);
        }
    }

    const handlePageRight = () => {
        if (currentPage < totalPage && currentPage >= 1) {
            setCurrentPage(currentPage + 1);
            handleChangePage(currentPage + 1);
        }
    }

    const handleMorePageRight = () => {
        if (currentPage < totalPage && currentPage >= totalPage - 10) {
            setCurrentPage(totalPage);
            handleChangePage(totalPage);
        }

        if (currentPage < totalPage - 10) {
            setCurrentPage(currentPage + 10);
            handleChangePage(currentPage + 10);
        }
    }

    const generatePageNumbers = () => {
        let pageNumber: any = [];
        if (totalPage <= 6 && totalPage > 0) {
            for (let i = 1; i <= totalPage; i++) {
                pageNumber.push(i);
            }
        }
        else if (totalPage > 6) {
            if (currentPage <= 3) {
                pageNumber = [1, 2, 3, 4, 0, totalPage];
            }
            if (currentPage > 3 && currentPage < totalPage - 2) {
                pageNumber = [1, 0, currentPage - 1, currentPage, currentPage + 1, -1, totalPage];
            }
            if (currentPage >= totalPage - 2) {
                pageNumber = [1, 0, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
            }
        }
        return pageNumber;
    };

    return (
        <div className={s.pagination}>

            <div onClick={handleMorePageLeft} className={currentPage > 1 ? s.handleMore : s.disable}>{`<<`}</div>

            <div onClick={handlePageLeft} className={currentPage > 1 ? s.handleMore : s.disable}>{`<`}</div>

            {generatePageNumbers().map((pageNumber: any) => {
                if (pageNumber == 0 || pageNumber == -1) {
                    return (
                        <div key={pageNumber} onClick={() => { }} className={s.disable} style={{ justifyContent: "center", alignItems: "center" }}>...</div>
                    )
                }
                else {
                    return (
                        <div key={pageNumber} onClick={() => { setCurrentPage(pageNumber); handleChangePage(pageNumber) }} className={currentPage == pageNumber ? s.pageFocus : s.page}>{pageNumber}</div>
                    )
                }
            })}

            <div onClick={handlePageRight} className={currentPage < totalPage ? s.handleMore : s.disable}>{`>`}</div>

            <div onClick={handleMorePageRight} className={currentPage < totalPage ? s.handleMore : s.disable}>{`>>`}</div>
        </div>
    );
};

export default Pagination;