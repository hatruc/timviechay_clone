import React, { useState } from 'react';

import s from './styles.module.scss'
const Pagination = ({ totalPage, handleChangePage, handleSeeNow }: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageLeft = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            handleChangePage(currentPage - 1);
            handleSeeNow(false, 0)
        }
    }

    const handlePageRight = () => {
        if (currentPage < totalPage && currentPage >= 1) {
            setCurrentPage(currentPage + 1);
            handleChangePage(currentPage + 1);
            handleSeeNow(false, 0)
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
            <svg onClick={handlePageLeft} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" fill="white" />
                <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#3582CD" />
                <path d="M12.9187 14.5059C12.7616 14.3717 12.6733 14.1897 12.6733 14C12.6733 13.8103 12.7616 13.6283 12.9187 13.4941L16.7614 10.2126C16.9141 10.0777 16.9985 9.89694 16.9966 9.70932C16.9947 9.52171 16.9066 9.34224 16.7512 9.20958C16.5958 9.07691 16.3856 9.00166 16.1658 9.00003C15.9461 8.9984 15.7344 9.07052 15.5763 9.20086L11.7362 12.4823C11.2648 12.8849 11 13.4308 11 14C11 14.5692 11.2648 15.1151 11.7362 15.5177L15.5797 18.7991C15.7377 18.9295 15.9494 19.0016 16.1692 19C16.3889 18.9983 16.5991 18.9231 16.7545 18.7904C16.9099 18.6578 16.9981 18.4783 17 18.2907C17.0019 18.1031 16.9174 17.9223 16.7647 17.7874L12.9187 14.5059Z" fill="#3582CD" />
            </svg>


            {generatePageNumbers().map((pageNumber: any) => {
                if (pageNumber == 0 || pageNumber == -1) {
                    return (
                        <svg key={pageNumber} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" fill="white" />
                            <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#999999" />
                            <path d="M8 14.0391C8 13.7474 8.09896 13.5026 8.29688 13.3047C8.49479 13.1016 8.76302 13 9.10156 13C9.44531 13 9.71354 13.1016 9.90625 13.3047C10.1042 13.5026 10.2031 13.7474 10.2031 14.0391C10.2031 14.3307 10.1042 14.5755 9.90625 14.7734C9.71354 14.9714 9.44531 15.0703 9.10156 15.0703C8.76302 15.0703 8.49479 14.9714 8.29688 14.7734C8.09896 14.5755 8 14.3307 8 14.0391Z" fill="#999999" />
                            <path d="M12.4531 14.0391C12.4531 13.7474 12.5521 13.5026 12.75 13.3047C12.9479 13.1016 13.2161 13 13.5547 13C13.8984 13 14.1667 13.1016 14.3594 13.3047C14.5573 13.5026 14.6562 13.7474 14.6562 14.0391C14.6562 14.3307 14.5573 14.5755 14.3594 14.7734C14.1667 14.9714 13.8984 15.0703 13.5547 15.0703C13.2161 15.0703 12.9479 14.9714 12.75 14.7734C12.5521 14.5755 12.4531 14.3307 12.4531 14.0391Z" fill="#999999" />
                            <path d="M16.9062 14.0391C16.9062 13.7474 17.0052 13.5026 17.2031 13.3047C17.401 13.1016 17.6693 13 18.0078 13C18.3516 13 18.6198 13.1016 18.8125 13.3047C19.0104 13.5026 19.1094 13.7474 19.1094 14.0391C19.1094 14.3307 19.0104 14.5755 18.8125 14.7734C18.6198 14.9714 18.3516 15.0703 18.0078 15.0703C17.6693 15.0703 17.401 14.9714 17.2031 14.7734C17.0052 14.5755 16.9062 14.3307 16.9062 14.0391Z" fill="#999999" />
                        </svg>
                    )
                }
                else {
                    return (
                        <div key={pageNumber} onClick={() => { setCurrentPage(pageNumber); handleChangePage(pageNumber); handleSeeNow(false, 0) }} className={currentPage == pageNumber ? s.pageFocus : s.page}>{pageNumber}</div>
                    )
                }
            })}

            <svg onClick={handlePageRight} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" fill="white" />
                <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#3582CD" />
                <path d="M16.2651 12.4687L12.4255 9.18492C12.2662 9.06164 12.0576 8.99552 11.8429 9.00024C11.6281 9.00495 11.4238 9.08015 11.2721 9.21027C11.1204 9.34038 11.0329 9.51543 11.0279 9.69919C11.0228 9.88295 11.1005 10.0613 11.2449 10.1974L15.082 13.4812C15.2388 13.6155 15.327 13.7976 15.327 13.9875C15.327 14.1774 15.2388 14.3595 15.082 14.4937L11.2449 17.7776C11.088 17.9119 10.9999 18.0941 11 18.2841C11.0001 18.474 11.0883 18.6561 11.2453 18.7904C11.4023 18.9247 11.6152 19.0001 11.8372 19C12.0591 18.9999 12.2719 18.9244 12.4288 18.7901L16.2651 15.5062C16.7356 15.1034 17 14.5571 17 13.9875C17 13.4179 16.7356 12.8716 16.2651 12.4687Z" fill="#3582CD" />
            </svg>
        </div>
    );
};

export default Pagination;