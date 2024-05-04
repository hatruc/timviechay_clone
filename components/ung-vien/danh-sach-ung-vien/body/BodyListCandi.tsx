import Image from 'next/image'
import s from './BodyListCandi.module.scss'
import Box_candi_online from '../candi_online/Box_candi_online'
import BoxChat from '@/components/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/box_chat'
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { POST } from '@/pages/api/base-api';
import Cookies from 'js-cookie';
import { checkLogin, cookieLogin, cookieType } from '@/components/service/functions';
import Link from 'next/link';
import { createLinkTilte, handleImageSource } from '@/functions/functions';
import SignInNTDModal from '@/components/nha-tuyen-dung/sign_in';
import { useRouter } from 'next/router';


interface BodyCandi {
    data_ung_vien: {
        name: string;
        avatar: string;
        work_name: string;
        address: string;
        experience: string;
        online: string;
        id: string | number;
        checkSave: string;
    }[],
    loadMore: any,
}
const BodyListCandi: React.FC<BodyCandi> = ({ data_ung_vien, loadMore }) => {
    // console.log('data ung vien', data_ung_vien);
    const [dataUngVien, setDataUngVien] = useState(data_ung_vien)
    const [dataCandiDidSave, setDataCandiDidSave] = useState<number[]>([])
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [listSelect, setListSelect] = useState([
        { value: "1", label: "Liên quan" },
        { value: "2", label: "Thời gian truy cập" },
        { value: "3", label: "Lương cao đến thấp" }
    ]);
    const router = useRouter()

    const saveCandi = async (id_uv: number) => {
        // console.log('1')
        // console.log(id_uv)
        if (!checkLogin(1)) {
            setIsLoginOpen(true)
        } else {
            const result = await POST('ntd/SaveCandi', { id_uv: id_uv })
            if (result?.result) {
                // console.log(result?.message)
                // getDataCandiDidSave()
                // TODO Trigger reload
                alert(result?.message)
                setDataCandiDidSave((prev: any) => [id_uv, ...prev])
            } else {
                result?.message && alert(result?.message)
                // console.log(result?.message)
            }
        }
    }

    const isCandiSaved = (id: number) => {
        // if (dataCandiDidSave.length > 0 && dataCandiDidSave.findIndex((candi: any) => candi.use_id[0] === id_uv) !== -1) {
        //     return true
        // } 
        // return false
        // const foundUv = dataUngVien.find(item => item.id === id)
        // if (dataCandiDidSave.includes(id) || (foundUv && foundUv.checkSave === 'true')) {
        // console.log(typeof id, typeof dataCandiDidSave[0])
        if (dataCandiDidSave.includes(Number(id))) {
            return true
        }
        return false
    }

    // console.log(dataCandiDidSave)

    // const getDataCandiDidSave = async () => {
    //     const isLogin = Cookies.get(cookieLogin)
    //     const type = Cookies.get(cookieType)
    //     if (isLogin === 'true' && type === '1') {
    //         const result = await POST('ntd/CandiDidSave', {})
    //         if (result?.result) {
    //             setDataCandiDidSave(result?.data)
    //         } else {
    //             setDataCandiDidSave([])
    //         }
    //     }
    // }

    // useEffect(() => {
    //     getDataCandiDidSave()
    //     return () => { };
    // }, [])
    useEffect(() => {
        if (Array.isArray(data_ung_vien)) {
            setDataUngVien([...data_ung_vien])
            setDataCandiDidSave(data_ung_vien.filter(item => item.checkSave === 'true').map(item => Number(item.id)))
        }
        return () => { };
    }, [data_ung_vien])

    return (
        <>
            {/* <div className={s.position_chat}>
                <BoxChat />
            </div> */}
            <div className={s.container}>
                <div className={s.body}>
                    <div style={{ color: "#F8971C" }} className={s.title}>NGƯỜI TÌM VIỆC <span style={{ color: "#3582CD" }} >CHẤT LƯỢNG</span></div>
                    <div className={s.link}>
                        <div className={s.link_text_1} style={{cursor: 'pointer'}} onClick={() => router.push('/')}>Trang chủ</div>
                        <div className={s.icon_back}>
                            <Image
                                src={'/images/candidate/material-symbols_arrow-back-ios-rounded.png'}
                                alt='back-ios-rounded'
                                width={12}
                                height={12}
                            ></Image>
                        </div>
                        <div style={{cursor: 'pointer'}} onClick={() => router.push('/ung-vien-tim-viec')}>Tìm ứng viên</div>
                    </div>

                    <div className={s.body_main}>
                        <div className={s.content}>
                            {/* <div className={s.show_follow}>
                                <div>
                                    Hiển thị theo:
                                </div>
                                <div className={s.show_follow_radio}>
                                    <input type="radio" name='follow' style={{ cursor: "pointer" }} defaultChecked={true} />
                                    Liên quan
                                </div>
                                <div className={s.show_follow_radio}>
                                    <input type="radio" name='follow' style={{ cursor: "pointer" }} />
                                    Thời gian truy cập
                                </div>
                                <div className={s.show_follow_radio}>
                                    <input type="radio" name='follow' style={{ cursor: "pointer" }} />
                                    Lương cao đến thấp
                                </div>
                            </div> */}
                            {/* <div className={s.filter_1}>
                                <div className={s.filter_1_1}>
                                    <div className={s.filter_1_icon}>
                                        <Image
                                            src={'/images/candidate/filter-search.png'}
                                            alt='filter-search'
                                            width={24}
                                            height={24}
                                        ></Image>
                                    </div>
                                </div>
                                <Select
                                    defaultValue={'Liên quan'}
                                    options={listSelect}
                                    className={"select_search_AI"}
                                >
                                </Select>
                            </div> */}
                            {/* ---------------------------------------------------------------------------------- */}
                            {dataUngVien?.map((item: any, index: any) => (
                                <>
                                    <div className={s.List_candi_div} key={index}>
                                        <div className={s.list_candi}>
                                            <div className={s.avatar}>
                                                <Image
                                                    src={handleImageSource(item.avatar)}
                                                    alt='avatar-ungvien'
                                                    fill
                                                    onError={(e) => {
                                                        // TODO Thay avatar khác 
                                                        e.currentTarget.srcset = "/images/candidate/ava_default.png"
                                                        // e.currentTarget.srcset = "https://43.239.223.188/pictures/2021/5/18/1626078620d4095fc2c213814d21fba060f05e1d61.jpg"
                                                    }}
                                                    style={{
                                                        borderRadius: '50%',
                                                        objectFit: 'cover'
                                                    }}
                                                >
                                                </Image>
                                                {/* <div className={s.icon_online}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                                        <circle cx="12" cy="12.0002" r="11" fill="#5DC22D" stroke="white" strokeWidth="2" />
                                                    </svg>
                                                </div> */}
                                            </div>
                                            <div className={s.info}>
                                                <Link href={`/chi-tiet-ung-vien/${createLinkTilte(item.name)}-${item.id}.html`}>
                                                    <div className={s.name}>
                                                        {item.name}
                                                    </div>
                                                </Link>
                                                <div className={s.work_name} style={{ marginBottom: '5px' }}>
                                                    {item.work_name}
                                                </div>
                                                <div>
                                                    <div className={s.info_candi}>
                                                        <div className={s.info_candi_1} style={{ flexWrap: 'wrap' }}>
                                                            <div className={s.info_candi_item}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.33325C5.05456 1.33325 2.66675 4.00164 2.66675 6.99992C2.66675 9.9747 4.36896 13.2082 7.02479 14.4495C7.64391 14.7389 8.35625 14.7389 8.97537 14.4495C11.6312 13.2082 13.3334 9.9747 13.3334 6.99992C13.3334 4.00164 10.9456 1.33325 8.00008 1.33325ZM8.00008 7.99992C8.73646 7.99992 9.33342 7.40296 9.33342 6.66658C9.33342 5.93021 8.73646 5.33325 8.00008 5.33325C7.2637 5.33325 6.66675 5.93021 6.66675 6.66658C6.66675 7.40296 7.2637 7.99992 8.00008 7.99992Z" fill="#3582CD" />
                                                                </svg>
                                                                <div>                                                   {item.address}
                                                                </div>
                                                            </div>
                                                            <div className={s.info_candi_item}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.03459 0.833253H7.96525C7.36628 0.833234 6.86678 0.833218 6.47027 0.886529C6.05174 0.942798 5.67387 1.06658 5.37022 1.37023C5.06658 1.67387 4.9428 2.05174 4.88653 2.47027C4.83322 2.86679 4.83323 3.36626 4.83325 3.96524V4.01706C3.4858 4.06115 2.67666 4.21861 2.1143 4.78097C1.33325 5.56202 1.33325 6.8191 1.33325 9.33325C1.33325 11.8474 1.33325 13.1045 2.1143 13.8855C2.89535 14.6666 4.15243 14.6666 6.66658 14.6666H9.33325C11.8474 14.6666 13.1045 14.6666 13.8855 13.8855C14.6666 13.1045 14.6666 11.8474 14.6666 9.33325C14.6666 6.8191 14.6666 5.56202 13.8855 4.78097C13.3232 4.21861 12.514 4.06115 11.1666 4.01706V3.96526C11.1666 3.36628 11.1666 2.86679 11.1133 2.47027C11.057 2.05174 10.9333 1.67387 10.6296 1.37023C10.326 1.06658 9.9481 0.942798 9.52957 0.886529C9.13306 0.833218 8.63356 0.833234 8.03459 0.833253ZM10.1666 4.00118V3.99992C10.1666 3.35725 10.1655 2.92554 10.1222 2.60352C10.0809 2.29587 10.0094 2.16421 9.92251 2.07733C9.83563 1.99045 9.70397 1.91897 9.39633 1.87761C9.0743 1.83432 8.64259 1.83325 7.99992 1.83325C7.35725 1.83325 6.92554 1.83432 6.60351 1.87761C6.29587 1.91897 6.16421 1.99045 6.07733 2.07733C5.99045 2.16421 5.91897 2.29587 5.87761 2.60352C5.83431 2.92554 5.83325 3.35725 5.83325 3.99992V4.00118C6.09461 3.99992 6.37196 3.99992 6.66658 3.99992H9.33325C9.62787 3.99992 9.90523 3.99992 10.1666 4.00118ZM11.3333 5.99992C11.3333 6.36811 11.0348 6.66659 10.6666 6.66659C10.2984 6.66659 9.99992 6.36811 9.99992 5.99992C9.99992 5.63173 10.2984 5.33325 10.6666 5.33325C11.0348 5.33325 11.3333 5.63173 11.3333 5.99992ZM5.33325 6.66659C5.70144 6.66659 5.99992 6.36811 5.99992 5.99992C5.99992 5.63173 5.70144 5.33325 5.33325 5.33325C4.96506 5.33325 4.66658 5.63173 4.66658 5.99992C4.66658 6.36811 4.96506 6.66659 5.33325 6.66659Z" fill="#3582CD" />
                                                                </svg>
                                                                <div>                                                   {item.experience}
                                                                </div>
                                                            </div>
                                                            <div className={s.info_candi_item}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                    <path d="M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z" fill="#3582CD" />
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 4.83325C8.27606 4.83325 8.49992 5.05711 8.49992 5.33325V7.79281L10.0201 9.31303C10.2154 9.50829 10.2154 9.82488 10.0201 10.0201C9.82488 10.2154 9.50829 10.2154 9.31303 10.0201L7.64637 8.35347C7.5526 8.2597 7.49992 8.13253 7.49992 7.99992V5.33325C7.49992 5.05711 7.72378 4.83325 7.99992 4.83325Z" fill="white" />
                                                                </svg>
                                                                <div>{item.online}</div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className={s.save_chat}>
                                                <div className={s.save} onClick={() => !isCandiSaved(item.id) && saveCandi(item.id)}>{!isCandiSaved(item.id) ? 'Lưu ứng viên' : 'Đã lưu'}</div>
                                                {/* <div className={s.chat}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M11.9868 7.19334V9.86001C11.9868 10.0333 11.9802 10.2 11.9602 10.36C11.8068 12.16 10.7468 13.0533 8.7935 13.0533H8.52684C8.36017 13.0533 8.20016 13.1333 8.10016 13.2667L7.30017 14.3333C6.94684 14.8067 6.3735 14.8067 6.02016 14.3333L5.22015 13.2667C5.13349 13.1533 4.94016 13.0533 4.7935 13.0533H4.52684C2.40017 13.0533 1.3335 12.5267 1.3335 9.86001V7.19334C1.3335 5.24001 2.2335 4.18001 4.02684 4.02667C4.18684 4.00667 4.3535 4 4.52684 4H8.7935C10.9202 4 11.9868 5.06667 11.9868 7.19334Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14.6535 4.52659V7.19326C14.6535 9.15326 13.7535 10.2066 11.9602 10.3599C11.9802 10.1999 11.9869 10.0333 11.9869 9.85992V7.19326C11.9869 5.06659 10.9202 3.99992 8.79352 3.99992H4.52686C4.35352 3.99992 4.18686 4.00659 4.02686 4.02659C4.18019 2.23326 5.24019 1.33325 7.19352 1.33325H11.4602C13.5869 1.33325 14.6535 2.39992 14.6535 4.52659Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.99684 8.83333H9.00284" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M6.66383 8.83333H6.66983" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M4.33033 8.83333H4.33633" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className={s.save_chat_1}>
                                            <div className={s.save_1} onClick={() => !isCandiSaved(item.id) && saveCandi(item.id)}>{!isCandiSaved(item.id) ? 'Lưu ứng viên' : 'Đã lưu'}</div>
                                            {/* <div className={s.chat_1}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M11.9868 7.19334V9.86001C11.9868 10.0333 11.9802 10.2 11.9602 10.36C11.8068 12.16 10.7468 13.0533 8.7935 13.0533H8.52684C8.36017 13.0533 8.20016 13.1333 8.10016 13.2667L7.30017 14.3333C6.94684 14.8067 6.3735 14.8067 6.02016 14.3333L5.22015 13.2667C5.13349 13.1533 4.94016 13.0533 4.7935 13.0533H4.52684C2.40017 13.0533 1.3335 12.5267 1.3335 9.86001V7.19334C1.3335 5.24001 2.2335 4.18001 4.02684 4.02667C4.18684 4.00667 4.3535 4 4.52684 4H8.7935C10.9202 4 11.9868 5.06667 11.9868 7.19334Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M14.6535 4.52659V7.19326C14.6535 9.15326 13.7535 10.2066 11.9602 10.3599C11.9802 10.1999 11.9869 10.0333 11.9869 9.85992V7.19326C11.9869 5.06659 10.9202 3.99992 8.79352 3.99992H4.52686C4.35352 3.99992 4.18686 4.00659 4.02686 4.02659C4.18019 2.23326 5.24019 1.33325 7.19352 1.33325H11.4602C13.5869 1.33325 14.6535 2.39992 14.6535 4.52659Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M8.99684 8.83333H9.00284" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M6.66383 8.83333H6.66983" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M4.33033 8.83333H4.33633" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div>Chat</div>
                                            </div> */}
                                        </div>
                                    </div>
                                </>
                            ))}




                            {/* ---------------------------------------------------------------------------------- */}
                            <div className={s.xemthem} onClick={() => loadMore()}>
                                <div className={s.btn_loadMore}>
                                    Xem thêm
                                </div>
                            </div>
                        </div>
                        <div className={s.content_online}>
                            {/* <Box_candi_online
                                dataCandidateOnline={[]}
                            ></Box_candi_online> */}
                            {/* <div className={s.downloadApp}>
                                <div className={s.txt_download}>Tải ngay ứng dụng TIMVIEC và CV để trải nghiệm tốt nhất</div>
                                <div className={s.groupButton}>
                                    <button className={s.buttonTimViec}>
                                        <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/down_1.png"} alt={""} height={35} width={35} style={{ height: "35px", width: "35px" }}></Image>
                                        <span>Tải app Timviec</span>
                                    </button>
                                    <button className={s.buttonCV}>
                                        <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/down_2.png"} alt={""} height={35} width={35} style={{ height: "35px", width: "35px" }}></Image>
                                        <span>Tải app CV</span>
                                    </button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <SignInNTDModal isOpenSignIn={isLoginOpen} handleCancelSignIn={() => setIsLoginOpen(false)} />
        </>
    )
}
export default BodyListCandi