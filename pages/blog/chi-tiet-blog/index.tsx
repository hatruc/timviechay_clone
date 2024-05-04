/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import s from './styles.module.scss';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import TableContent from '@/components/blog/chi-tiet-blog/table-content';
import * as data from '@/components/blog/chi-tiet-blog/data.js'; 
import BoxContent from '@/components/blog/chi-tiet-blog/box-content';
import { Button } from 'antd';
import { NextPageContext } from 'next';
import { POST, POST_SERVER } from "@/pages/api/base-api";
import { parseJSON } from "date-fns";
import { handleImageSource } from "@/functions/functions";


export const getServerSideProps = async (context: NextPageContext) => {
    const id = context.query.id;
    const data = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_NEW}/new/DetailBlog`, 
        {
        id: id}
    );
    return {
        props: {
            data
        }
    }
};

interface listPost {
    img: string,
    title?: string,
}
export default function ChiTietBlog({ data }: any) {
    // console.log(data)
    const router = useRouter();
    const navigateToAbout = (route: any) => {
        router.push(route);
    };
    const [tableContent,setTableContent]= useState(``);
    const [ html, setHtml ] = useState<any>('');
    const [ dataBlog, setDataBlog ] = useState<any>(data?.data);
    const [boxContent,setBoxContent]= useState(``);
    const [isClose,setIsClose]=useState(false);
    const [isFloat,setIsFloat]=useState(false);
    const [ element, setElement ] = useState<any>();
    const desRef = useRef<any>();
    const [seo_tt, setSeo_tt] = useState(data?.data?.new_tt || '')
    const [seo_des, setSeo_des] = useState(data?.data?.new_des || '')

    const newArrayIndex : any= []
    const getDetailBlog = async () => {
        const res  = await POST('new/DetailBlog', {
            id: 4962
        });
        // console.log('res', res.data.);
        if(res?.result){
            // setHtml(res.data.new_teaser)
            setDataBlog(res.data)
        }
    };

    const handleChangeValueTable =  (e: any) => {
        // console.log('e', e);
        setTableContent(e)

    };

    // useEffect(() => {
    //     // console.log(data?.data.datanew_description);
    //     desRef?.current?.querySelectorAll('h1, h2, h3').forEach( async function(heading: any) {
    //         const text = heading.textContent; 
    //         // console.log(text)
    //         newArrayIndex.push({
    //             type: heading,
    //             text: text
    //         });
    //     });

    //     setElement(newArrayIndex);
    // }, [data])

    useEffect(()=>{
        // getDetailBlog()
        setTableContent(data?.tableContent)
        setBoxContent(data?.boxContend)
    },[])
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            if (scrollY >= 800) {
               setIsFloat(true)
            }
            if(scrollY <= 800){
                setIsFloat(false)
            }

            const stickyDiv = document.getElementById('stickyDiv');
            const footer = document.getElementById('footer');
            if (!stickyDiv || !footer) return;

            const stickyDivHeight = stickyDiv.offsetHeight;
            const footerOffset = footer.offsetTop;

            if (window.pageYOffset + window.innerHeight < footerOffset) {
                stickyDiv.style.position = 'fixed';
                stickyDiv.style.bottom = '0';
            } else {
                stickyDiv.style.position = 'absolute';
                stickyDiv.style.bottom = footerOffset - stickyDivHeight + 'px';
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleClose=()=>{
        setIsClose(true)
        setIsFloat(true)
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    const postNews :listPost[] = [
        {
            img:"/images/blog/chi-tiet-blog/Screenshot_64.png",
            title:"Tạo sức hút ấn tượng với nhà tuyển dụng bằng mẫu CV xin...",
        },
        {
            img:"/images/blog/chi-tiet-blog/Screenshot_64.png",
            title:"Tạo sức hút ấn tượng với nhà tuyển dụng bằng mẫu CV xin...",
        },
        {
            img:"/images/blog/chi-tiet-blog/Screenshot_64.png",
            title:"Tạo sức hút ấn tượng với nhà tuyển dụng bằng mẫu CV xin...",
        },
        {
            img:"/images/blog/chi-tiet-blog/Screenshot_64.png",
            title:"Tạo sức hút ấn tượng với nhà tuyển dụng bằng mẫu CV xin...",
        },
        {
            img:"/images/blog/chi-tiet-blog/Screenshot_64.png",
            title:"Tạo sức hút ấn tượng với nhà tuyển dụng bằng mẫu CV xin...",
        },
        {
            img:"/images/blog/chi-tiet-blog/Screenshot_64.png",
            title:"Tạo sức hút ấn tượng với nhà tuyển dụng bằng mẫu CV xin...",
        },
    ];

    console.log(data);
    

    return (
        <>
        <Header/>
        <head>
                <title>{seo_tt}</title>
                <meta name="description" content={seo_des} />
        </head>
        <link rel="stylesheet" href="/styles/ck_blog.css" type="text/css"/>
        <div className={s.container_blog}>
            <div className={s.content}>
                <div className={s.router}>
                    <div style={{display:"flex",flexDirection:"row"}}>
                    <div className={s.textBlue} onClick={() => navigateToAbout("/")}>Trang chủ</div>
                    <div className={s.path}><div><span>/</span></div></div>
                    <div className={s.textBlue} onClick={() => navigateToAbout("/")}> Blog</div>
                    <div className={s.path}><div><span>/</span></div></div>
                    <div className={s.text}>{`${dataBlog?.new_category}`}</div>
                    <div className={s.path}><div><span>/</span></div></div>
                    </div>
                        <div className={s.text}>
                                {`${dataBlog?.new_title}`}
                        </div>
                </div>
                <div className={s.first_map}>
                    <div className={s.big_div}>
                        <div className={s.table_content}>
                            <TableContent tableContent={tableContent}/>
                            <div className={s.contact}>
                                <div className={s.word}>Chia Sẻ</div>
                                <div className={s.icon}>
                                    <Image className={s.icon_img}  src="/images/blog/chi-tiet-blog/image15.png" alt="" height={44} width={44}/>
                                    <Image className={s.icon_img}  src="/images/blog/chi-tiet-blog/image16.png" alt="" height={44} width={44}/>
                                    <Image className={s.icon_img}  src="/images/blog/chi-tiet-blog/image17.png" alt="" height={44} width={44}/>
                                </div>
                            </div>
                        </div>
                        <div className={s.box_content} ref={desRef} >
                            <BoxContent  boxContent={dataBlog} handleShowTable={(e) => handleChangeValueTable(e)}/>
                        </div>
                    </div>
                    <div className={s.big_post}>
                        <div className={s.post}>
                            <div className={s.div_a}>
                                <div className={s.text}>Bài Viết Liên quan</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="6" viewBox="0 0 33 6" fill="none">
                                        <path d="M33 1C29.7 1 29.7 5 26.402 5C23.1 5 23.1 1 19.8 1C16.5 1 16.5 5 13.201 5C9.901 5 9.901 1 6.601 1C3.301 1 3.303 5 0 5" stroke="url(#paint0_linear_1993_40175)" strokeWidth="2"/>
                                        <defs>
                                            <linearGradient id="paint0_linear_1993_40175" x1="0" y1="1" x2="3300" y2="1" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#FE4F70"/>
                                                <stop offset="1" stopColor="#FFA387"/>
                                            </linearGradient>
                                        </defs>
                                </svg>
                            </div>
                            <div className={s.box_new}>
                                    {
                                        postNews.map((item,index)=>{
                                            return(
                                                <div key={index} className={s.news}>
                                                    <div className={s.news_item}>
                                                        <Image className={s.item_img} src={handleImageSource(item.img)} alt="" height={161} width={257}/>
                                                        <div>{item.title}</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${s.header_cv} ${isClose ? s.none :""}`}>
                <div className={s.content_header}>
                    <div className={s.label}>Tạo CV và tìm việc làm tại Timviechay.vn</div>
                    <div style={{display:"flex", flexDirection:"row", gap:"6px"}}>
                    <Button className={s.create_btn} onClick={() => navigateToAbout('/CV/trang-chu-cv')}>Tạo cv</Button>
                    <Button className={`${s.create_btn} ${s.more}`} onClick={() => navigateToAbout('/tin-tuyen-dung')}>Tìm Việc Làm</Button>
                    </div>
                </div>
                <div className={s.content_header_2}>
                    <div className={s.close} onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" fill="none">
                        <path d="M0.824153 0.824153C1.08504 0.562889 1.39488 0.355622 1.73595 0.214206C2.07701 0.0727902 2.44261 0 2.81183 0C3.18105 0 3.54665 0.0727902 3.88771 0.214206C4.22878 0.355622 4.53861 0.562889 4.79951 0.824153L15.0004 11.0213L25.2013 0.824153C25.4623 0.563127 25.7722 0.35607 26.1133 0.214804C26.4543 0.0735382 26.8199 0.000829778 27.189 0.000829771C27.5581 0.000829763 27.9237 0.0735382 28.2647 0.214804C28.6058 0.35607 28.9156 0.563127 29.1767 0.824153C29.4377 1.08518 29.6448 1.39506 29.786 1.73611C29.9273 2.07715 30 2.44268 30 2.81183C30 3.18098 29.9273 3.54651 29.786 3.88755C29.6448 4.2286 29.4377 4.53848 29.1767 4.79951L18.9795 15.0004L29.1767 25.2013C29.7038 25.7285 30 26.4435 30 27.189C30 27.9345 29.7038 28.6495 29.1767 29.1767C28.6495 29.7038 27.9345 30 27.189 30C26.4435 30 25.7285 29.7038 25.2013 29.1767L15.0004 18.9795L4.79951 29.1767C4.27234 29.7038 3.55735 30 2.81183 30C2.06631 30 1.35132 29.7038 0.824153 29.1767C0.296988 28.6495 0.000829771 27.9345 0.000829771 27.189C0.000829771 26.4435 0.296988 25.7285 0.824153 25.2013L11.0213 15.0004L0.824153 4.79951C0.562889 4.53861 0.355622 4.22878 0.214206 3.88771C0.0727902 3.54665 0 3.18105 0 2.81183C0 2.44261 0.0727902 2.07701 0.214206 1.73595C0.355622 1.39488 0.562889 1.08504 0.824153 0.824153Z" fill="#F8F8F8"/>
                    </svg>
                    </div>
                    <div className={s.float_btn} onClick={scrollToTop}>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 27 30" fill="none">
                        <path d="M26.4329 13.8767C26.2538 14.0445 26.041 14.1776 25.8066 14.2684C25.5723 14.3592 25.321 14.406 25.0673 14.406C24.8135 14.406 24.5623 14.3592 24.3279 14.2684C24.0936 14.1776 23.8807 14.0445 23.7016 13.8767L15.4289 6.15471V28.2004C15.4289 28.6777 15.2258 29.1354 14.8642 29.4729C14.5026 29.8104 14.0122 30 13.5009 30C12.9896 30 12.4992 29.8104 12.1376 29.4729C11.776 29.1354 11.5729 28.6777 11.5729 28.2004V6.15471L3.297 13.8767C2.9348 14.2148 2.44356 14.4047 1.93134 14.4047C1.41912 14.4047 0.927872 14.2148 0.565676 13.8767C0.20348 13.5386 5.39714e-09 13.0801 0 12.6019C-5.39714e-09 12.1238 0.20348 11.6653 0.565676 11.3272L12.1336 0.529315C12.3128 0.36154 12.5256 0.22842 12.7599 0.137588C12.9943 0.0467566 13.2456 0 13.4993 0C13.7531 0 14.0043 0.0467566 14.2387 0.137588C14.473 0.22842 14.6859 0.36154 14.865 0.529315L26.4329 11.3272C26.6127 11.4944 26.7553 11.693 26.8526 11.9118C26.9499 12.1305 27 12.3651 27 12.6019C27 12.8388 26.9499 13.0733 26.8526 13.2921C26.7553 13.5108 26.6127 13.7095 26.4329 13.8767Z" fill="#3582CD"/>
                    </svg>
                    </div>
                </div> 
            </div>
            <div className={(isFloat === true && isClose) ? s.float_btn_s : s.none} onClick={scrollToTop}>
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="30" viewBox="0 0 27 30" fill="none">
                    <path d="M26.4329 13.8767C26.2538 14.0445 26.041 14.1776 25.8066 14.2684C25.5723 14.3592 25.321 14.406 25.0673 14.406C24.8135 14.406 24.5623 14.3592 24.3279 14.2684C24.0936 14.1776 23.8807 14.0445 23.7016 13.8767L15.4289 6.15471V28.2004C15.4289 28.6777 15.2258 29.1354 14.8642 29.4729C14.5026 29.8104 14.0122 30 13.5009 30C12.9896 30 12.4992 29.8104 12.1376 29.4729C11.776 29.1354 11.5729 28.6777 11.5729 28.2004V6.15471L3.297 13.8767C2.9348 14.2148 2.44356 14.4047 1.93134 14.4047C1.41912 14.4047 0.927872 14.2148 0.565676 13.8767C0.20348 13.5386 5.39714e-09 13.0801 0 12.6019C-5.39714e-09 12.1238 0.20348 11.6653 0.565676 11.3272L12.1336 0.529315C12.3128 0.36154 12.5256 0.22842 12.7599 0.137588C12.9943 0.0467566 13.2456 0 13.4993 0C13.7531 0 14.0043 0.0467566 14.2387 0.137588C14.473 0.22842 14.6859 0.36154 14.865 0.529315L26.4329 11.3272C26.6127 11.4944 26.7553 11.693 26.8526 11.9118C26.9499 12.1305 27 12.3651 27 12.6019C27 12.8388 26.9499 13.0733 26.8526 13.2921C26.7553 13.5108 26.6127 13.7095 26.4329 13.8767Z" fill="#3582CD"/>
                </svg>
            </div>
        </div>
        <Footer />
        </>
    )
}