import React from 'react'
import s from './box_candi_online.module.scss'
import Image from 'next/image'
const Item_candidate_online = () => {
    return (
        <div className={s.info_online}>
            <div className={s.box_avatar_onl}>
                <Image className={s.avatar_onl} src={'/images/candidate/32131.svg'} fill alt=''/>
            </div>
            <div className={s.info_detail}>
                <p className={s.name}>Vũ Thị Thùy Dung</p>
                <p className={s.positon}>Nhân Viên Pha Chế</p>
                <p className={s.address}>Hà Nội</p>
            </div>
            <div className={s.chat}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M11.9866 7.19334V9.86001C11.9866 10.0333 11.9799 10.2 11.9599 10.36C11.8066 12.16 10.7466 13.0533 8.79325 13.0533H8.52659C8.35992 13.0533 8.19991 13.1333 8.09991 13.2667L7.29993 14.3333C6.94659 14.8067 6.37325 14.8067 6.01992 14.3333L5.21991 13.2667C5.13324 13.1533 4.93992 13.0533 4.79325 13.0533H4.52659C2.39992 13.0533 1.33325 12.5267 1.33325 9.86001V7.19334C1.33325 5.24001 2.23326 4.18001 4.02659 4.02667C4.18659 4.00667 4.35326 4 4.52659 4H8.79325C10.9199 4 11.9866 5.06667 11.9866 7.19334Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.6533 4.52671V7.19338C14.6533 9.15338 13.7533 10.2067 11.9599 10.36C11.9799 10.2 11.9866 10.0334 11.9866 9.86005V7.19338C11.9866 5.06671 10.9199 4.00004 8.79327 4.00004H4.52661C4.35328 4.00004 4.18661 4.00671 4.02661 4.02671C4.17994 2.23338 5.23994 1.33337 7.19328 1.33337H11.4599C13.5866 1.33337 14.6533 2.40005 14.6533 4.52671Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.99708 8.83333H9.00308" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.66359 8.83333H6.66959" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.33033 8.83333H4.33633" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <svg className={s.icon_onl} xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.50024" r="6" fill="#5DC22D" stroke="white" />
            </svg>
        </div>
    )
}
interface CandidateOnlineProps {
    dataCandidateOnline: any
}
const Box_candi_online: React.FC<CandidateOnlineProps> = ({ dataCandidateOnline }) => {
    return (
        <div className={s.candidate_online}>
            <div className={s.online_title}>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" >
                    <path d="M0.86084 7.99953C0.86084 9.14778 1.89427 10.0775 3.17092 10.0775C4.44634 10.0775 11.6383 7.99953 11.6383 7.99953C11.6383 7.99953 4.44634 5.92033 3.17092 5.92033C1.89427 5.92156 0.86084 6.85375 0.86084 7.99953ZM3.38701 1.81009C2.77338 2.77932 3.1524 4.12017 4.23027 4.80048C5.30691 5.48078 12.5001 7.5612 12.5001 7.5612C12.5001 7.5612 7.52687 1.96566 6.44653 1.28535C5.36989 0.605047 3.99817 0.839639 3.38701 1.81009ZM3.38701 14.189C3.99941 15.1607 5.36989 15.3952 6.44653 14.7149C7.52687 14.0346 12.5001 8.43906 12.5001 8.43906C12.5001 8.43906 5.30691 10.5195 4.23027 11.1998C3.15117 11.8801 2.77338 13.2197 3.38701 14.189Z" fill="#3582CD" />
                </svg>
                <p>ỨNG VIÊN ONLINE</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                    <path d="M12.1392 7.99953C12.1392 9.14778 11.1057 10.0775 9.82908 10.0775C8.55366 10.0775 1.36168 7.99953 1.36168 7.99953C1.36168 7.99953 8.55366 5.92033 9.82908 5.92033C11.1057 5.92156 12.1392 6.85375 12.1392 7.99953ZM9.61299 1.81009C10.2266 2.77932 9.8476 4.12017 8.76973 4.80048C7.69309 5.48078 0.499877 7.5612 0.499877 7.5612C0.499877 7.5612 5.47313 1.96566 6.55347 1.28535C7.63011 0.605047 9.00183 0.839639 9.61299 1.81009ZM9.61299 14.189C9.00059 15.1607 7.63011 15.3952 6.55347 14.7149C5.47313 14.0346 0.499877 8.43906 0.499877 8.43906C0.499877 8.43906 7.69309 10.5195 8.76973 11.1998C9.84883 11.8801 10.2266 13.2197 9.61299 14.189Z" fill="#3582CD" />
                </svg>
            </div>
            <Item_candidate_online />
            <Item_candidate_online />
        </div>
    )
}

export default Box_candi_online
