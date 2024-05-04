/* eslint-disable @next/next/no-img-element */
import React from 'react'
import s from './box_candidate.module.scss';

export interface BoxCandidateProps {
    dataBoxCandidate: any
}

const Box_candidate:React.FC<BoxCandidateProps> = ({dataBoxCandidate}) => {
    return (
        <div className={s.box_candidate}>
            <div className={s.candidate_container}>
                <div className={s.content_left}>
                    <div className={s.box_ava}>
                        <img src="/images/candidate/avatar-candidate.png" alt="" />
                    </div>
                    <div className={s.content_detai_candidate}>
                        <p className={s.name}>Ngô Minh Trang</p>
                        <p className={s.position}>Nhân viên kinh doanh</p>
                        <div className={s.box_detail}>
                            <div className={s.item_detail}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.33331C5.05456 1.33331 2.66675 4.0017 2.66675 6.99998C2.66675 9.97476 4.36896 13.2083 7.02479 14.4496C7.64391 14.739 8.35625 14.739 8.97537 14.4496C11.6312 13.2083 13.3334 9.97476 13.3334 6.99998C13.3334 4.0017 10.9456 1.33331 8.00008 1.33331ZM8.00008 7.99998C8.73646 7.99998 9.33342 7.40303 9.33342 6.66665C9.33342 5.93027 8.73646 5.33331 8.00008 5.33331C7.2637 5.33331 6.66675 5.93027 6.66675 6.66665C6.66675 7.40303 7.2637 7.99998 8.00008 7.99998Z" fill="#3582CD" />
                                </svg>
                                <p>Bà Rịa - Vũng Tàu</p>
                            </div>
                            <div className={s.item_detail}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.33331C5.05456 1.33331 2.66675 4.0017 2.66675 6.99998C2.66675 9.97476 4.36896 13.2083 7.02479 14.4496C7.64391 14.739 8.35625 14.739 8.97537 14.4496C11.6312 13.2083 13.3334 9.97476 13.3334 6.99998C13.3334 4.0017 10.9456 1.33331 8.00008 1.33331ZM8.00008 7.99998C8.73646 7.99998 9.33342 7.40303 9.33342 6.66665C9.33342 5.93027 8.73646 5.33331 8.00008 5.33331C7.2637 5.33331 6.66675 5.93027 6.66675 6.66665C6.66675 7.40303 7.2637 7.99998 8.00008 7.99998Z" fill="#3582CD" />
                                </svg>
                                <p>Dưới 1 năm kinh nghiệm</p>
                            </div>
                            <div className={s.item_detail}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M14.6666 7.99998C14.6666 11.6819 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6819 1.33325 7.99998C1.33325 4.31808 4.31802 1.33331 7.99992 1.33331C11.6818 1.33331 14.6666 4.31808 14.6666 7.99998Z" fill="#3582CD" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 4.83331C8.27606 4.83331 8.49992 5.05717 8.49992 5.33331V7.79287L10.0201 9.31309C10.2154 9.50835 10.2154 9.82494 10.0201 10.0202C9.82488 10.2155 9.50829 10.2155 9.31303 10.0202L7.64637 8.35353C7.5526 8.25976 7.49992 8.13259 7.49992 7.99998V5.33331C7.49992 5.05717 7.72378 4.83331 7.99992 4.83331Z" fill="white" />
                                </svg>
                                <p>Vừa truy cập</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.content_right}>
                    <div className={s.save_store}>
                        <p>Lưu ứng viên</p>
                    </div>
                    <div className={s.chat}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M11.9866 7.19334V9.86001C11.9866 10.0333 11.9799 10.2 11.9599 10.36C11.8066 12.16 10.7466 13.0533 8.79325 13.0533H8.52659C8.35992 13.0533 8.19991 13.1333 8.09991 13.2667L7.29993 14.3333C6.94659 14.8067 6.37325 14.8067 6.01992 14.3333L5.21991 13.2667C5.13324 13.1533 4.93992 13.0533 4.79325 13.0533H4.52659C2.39992 13.0533 1.33325 12.5267 1.33325 9.86001V7.19334C1.33325 5.24001 2.23326 4.18001 4.02659 4.02667C4.18659 4.00667 4.35326 4 4.52659 4H8.79325C10.9199 4 11.9866 5.06667 11.9866 7.19334Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14.6533 4.52665V7.19332C14.6533 9.15332 13.7533 10.2067 11.9599 10.36C11.9799 10.2 11.9866 10.0333 11.9866 9.85999V7.19332C11.9866 5.06665 10.9199 3.99998 8.79327 3.99998H4.52661C4.35328 3.99998 4.18661 4.00665 4.02661 4.02665C4.17994 2.23332 5.23994 1.33331 7.19328 1.33331H11.4599C13.5866 1.33331 14.6533 2.39999 14.6533 4.52665Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.99708 8.83333H9.00308" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6.66359 8.83333H6.66959" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.33033 8.83333H4.33633" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Box_candidate
