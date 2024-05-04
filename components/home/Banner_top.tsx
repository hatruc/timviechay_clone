/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useRef, useState } from 'react';
import $ from 'jquery'
import 'select2'
import s from './banner_top.module.scss';
import dataJson from '../data.json'
import { useRouter } from 'next/router';
import { createLinkTilte2, getCityName, getJobName, job_array } from '@/functions/functions';
import { NTD_UV_Context } from '../context/ntd_uv_context';
import Cookies from 'js-cookie';
import {  cookieLogo, cookieName, cookiePhone } from '../service/functions';
import Link from 'next/link';

const Banner_top = () => {
    const { name, setAll, setCandiAllowEmployerSearch, changePercent, tagTin } = useContext(NTD_UV_Context)
    const [selectedValue, setSelectedValue] = useState("0");
    const [keyword, setKeyWord] = useState<any>()
    const [ keyFindJob  ,setKeyFindJob] = useState<number>(0)
    const formRef = useRef<any>();
    const nameRef = useRef<any>();
    const router = useRouter()
    const allJobRef = useRef<any>();
    const allJobMobileRef = useRef<any>();
    const [ historySearch, setHistorySearch ] = useState<any>([]);
    const [tagFIndJob, setTagFIndJob] = useState<string>('');
    const [tagSearch, setTagSearch] = useState<{tag: string, job: string}[]>([])
    
    useEffect(() => {
        // if (formRef.current) {
        //     formRef.current?.addEventListener("submit", getValues);
        // }
        if (typeof document != 'undefined') {
            $(document).ready(function () {
                $('.select-location').select2();
                $('.select-location').on('change', async (e: any) => {
                    setSelectedValue(e.target.value)
                })
            });
        }
    }, [])

    const categories = ['Kinh doanh', 'IT phần mềm', 'Bán hàng', 'Bất động sản'];
    const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

    const handleLinkClick = (category: string) => {
        setActiveCategory(category);
    };

    const handleSearch = () => {
        if(!historySearch.some((item: any) => item.cat_id == keyFindJob)) {
            const newHistorySearch = [...historySearch, {
                cat_name: keyword,
                cat_id: keyFindJob
            }]

                localStorage.setItem('history-search', JSON.stringify(newHistorySearch));
        }
        let query: any = {}
        keyFindJob > 0 && (query.nameWork = keyFindJob, query.page=1)
        selectedValue && Number(selectedValue) && Number(selectedValue) !== 0 && (query.address = selectedValue, query.page=1)

        // Luồng mới: link tên tỉnh thành, ngành nghề 
        if (query?.nameWork && query?.address) {
            router.push({
                pathname: '/tin-tuyen-dung',
                query: query
            })
        }
        if (!query?.nameWork && !query?.address && !tagFIndJob) {
            router.push('/tin-tuyen-dung')
        }
        if (query?.nameWork && !query?.address) {
            const link = createLinkTilte2(getJobName(query.nameWork))
            router.push(`/tin-tuyen-dung/${link}`)
        }
        if (!query?.nameWork && query?.address && !tagFIndJob) {
            const link = createLinkTilte2(getCityName(query.address))
            router.push(`/tin-tuyen-dung/${link}`)
        }

        if (query?.address && tagFIndJob) {
            router.push({
                pathname: `/tin-tuyen-dung/${tagFIndJob}`,
                query: query
            })
        }

        if (!query?.address && tagFIndJob) {
            router.push(`/tin-tuyen-dung/${tagFIndJob}`)
        }
    }

    

    const handleEnterSearch = (e: any) => {
        if (e.keyCode == 13) {
            handleSearch()
        }
    }

    // function getValues(this: any, e: any) {
    //     e.preventDefault();
    //     let formDataSubmit = {
    //         "name": this.name.value,
    //         "address": this.address.value
    //     }
    //     const name = formDataSubmit.name ? 'name=' + formDataSubmit.name : '';
    //     const address = formDataSubmit.address !== '0' ? 'address=' + formDataSubmit.address : ''
    //     if (name && address) {
    //         router.push(`/tin-tuyen-dung?${name}&${address}`)
    //     } else if (name) {
    //         router.push(`/tin-tuyen-dung?${name}`)
    //     } else if (address) {
    //         router.push(`/tin-tuyen-dung?${address}`)
    //     }
    // }

    //for mobile
    const submitHandle = (e: any) => {
        const name = nameRef.current.value
        const address = selectedValue
        if (name || address) {
            router.push(`/tin-tuyen-dung?name=${name}&address=${address}`)
        }
    }
    const clickHandle = (category: any) => {
        router.push(`/tin-tuyen-dung?name=${category}`)
    };



    const listenFocus = () => {
        allJobRef?.current?.addEventListener('focus', function() {
           const getElementJobs =  document.querySelector('.all_job');
           getElementJobs?.classList.add('all_job_show')
        })
    };

    const listenFocusMobile = () => {
        allJobMobileRef?.current?.addEventListener('focus', function() {
            const getElementJobs =  document.querySelector('.all_job_mobile');
            getElementJobs?.classList.add('all_job_show')
         })
    }

    const closeAllJob = () => {
        const getElementJobs =  document.querySelector('.all_job');
        getElementJobs?.classList.remove('all_job_show')
    };

    const closeAllJobMobile = () => {
        const getElementJobs =  document.querySelector('.all_job_mobile');
        getElementJobs?.classList.remove('all_job_show')
    };

    const checkIsSetContext = () => {
        setAll(`${Cookies.get(cookieName)}`, `${Cookies.get(cookiePhone)}`, `${Cookies.get(cookieLogo)}`)
            // setCandiAllowEmployerSearch(result?.data?.data?.usc_search == 1 ? '1' : '0')
            // changePercent(`${result?.data?.data?.percentHoSo}`)
    }

    function toLowerCaseNonAccentVietnamese(str: string) {
        // if (!str) return ""
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        str = str.replace(/-/g, ""); 
        return str;
      }

    useEffect(() => {
        if(keyword?.length > 0) {
            let newSearch: any = []
            const jobSearch = job_array.filter((job: any) => {
                if(toLowerCaseNonAccentVietnamese(job.cat_name).includes(toLowerCaseNonAccentVietnamese(keyword))) {
                    newSearch.push(job)
                }
            });

            console.log('newSearch', newSearch);

            setHistorySearch(newSearch)

            // Luồng mới: tag ngành nghề 
            let tagSearchResult: any = []
            if (Array.isArray(tagTin)) {
                tagTin.filter((tag: any) => {
                    if (toLowerCaseNonAccentVietnamese(tag.tag).includes(toLowerCaseNonAccentVietnamese(keyword))) {
                        tagSearchResult.push(tag)
                    }
                })
                // for (let i = 0; i < tagTin.length; i++) {
                //     const element = tagTin[i];
                //     if (toLowerCaseNonAccentVietnamese(element.tag).includes(toLowerCaseNonAccentVietnamese(keyword))) {
                //         tagSearchResult.push(element)
                //         console.log(element)
                //     }
                // }
            }
            setTagSearch(tagSearchResult)
            
        }  else {
            console.log('ko co');
            const currentHistory = localStorage.getItem('history-search') ? JSON.parse(localStorage.getItem('history-search') as any)  : [];
            setHistorySearch(currentHistory)
            setTagSearch([])
        }
    }, [keyword])

    useEffect(() => {
        listenFocus()
        listenFocusMobile()
        const currentHistory = localStorage.getItem('history-search') ? JSON.parse(localStorage.getItem('history-search') as any)  : [];
        setHistorySearch(currentHistory)
        if(!name) {
            checkIsSetContext()
        }
    }, [])


    return (
        <>
            <div className="banner_top" style={{
                width: '100%',
                height: '435px'
            }}>
                <div style={{
                    // position: 'relative',
                    width: '100%',
                    height: '435px',
                }}>
                    <img style={{
                        height: '100%',
                        width: '100%',
                        display: 'block',
                        objectFit: 'cover'
                    }} src="/images/banner1.svg" />
                </div>

                <div className="box_banner" style={{
                    position: 'absolute'
                }}>
                    <div className="content_bn_left" style={{
                    }}>
                        <h2 className="title ffffff"><span className="F8971C font32_800 ">TÌM VIỆC NHANH</span><span className='font32_800 '>, TUYỂN DỤNG HIỆU QUẢ</span></h2>
                        <h4 className="font20_500 ffffff ">Work AI - Việc Vàm Chất Lượng, Ứng Viên Tiềm Năng</h4>
                        <div className="form_search_job">
                            <div>
                                <div className="box_form">
                                    <div className="wrapper_search">
                                        <div className="box_position" style={{ position: 'relative' }}>
                                            <div className="img_box_form img_search">
                                                <img src="/images/search.svg" alt="Tìm kiếm" />
                                            </div>
                                            <input
                                                ref={allJobRef} type="text" name="name" className="search_pojob" placeholder="Vị trí ứng tuyển"
                                                value={keyword} onChange={(e) => setKeyWord(e.target.value)}
                                                onKeyUp={(e) => handleEnterSearch(e)}
                                            />
                                        </div>
                                        <div  className="all_job">
                                                <div className='all_job_filtered'>
                                                     <p>Tìm kiếm gần đây</p>       
                                                     <ul style={{
                                                        width: '100%'
                                                     }} className='job-list job-list-history'>
                                                        {
                                                            historySearch?.map((job: any) => (
                                                                <li onClick={() =>{
                                                                    setKeyWord(job?.cat_name);
                                                                    setKeyFindJob(job?.cat_id);
                                                                    setTagFIndJob('')
                                                                }}>{job.cat_name}</li>
                                                            ))
                                                        }
                                                        {
                                                            tagSearch?.map((tag) => (
                                                                <li onClick={() => {
                                                                    setKeyWord(tag.tag)
                                                                    setTagFIndJob(tag.job)
                                                                    setKeyFindJob(0)
                                                                }}>{tag.tag}</li>
                                                            ))
                                                        }
                                                    </ul>     
                                                </div>
                                                <div className='job_have'>
                                                    <div className='job_have_title'>
                                                    <p>Từ khóa phổ biến</p>
                                                    <div onClick={() => closeAllJob()} className='job_have_close'>
                                                    ×
                                                    </div>   
                                                    </div>
                                                    <ul className='job-list'>
                                                        {
                                                            job_array.map((job) => (
                                                                <li onClick={() => {
                                                                    setKeyWord(job.cat_name);
                                                                    setKeyFindJob(job.cat_id);
                                                                    setTagFIndJob('')
                                                                }}>{job.cat_name}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        <div className="box_position_addr">
                                            <div className="img_box_form img_location">
                                                <img src="/images/location.svg" alt="Địa chỉ" />
                                            </div>
                                            <select name="address" className="select-location" value={selectedValue}>
                                                <option key={0} value={0}>Chọn địa điểm</option>
                                                {dataJson?.city.map(item => (
                                                    <option key={item.cit_id} value={item.cit_id}>{item.cit_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <button className="submit_job" onClick={handleSearch}>
                                        Tìm kiếm
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="box_keyword">
                            <span className="tukhoa ffffff" >Từ khóa nổi bật</span>
                            <div className="list_keyword">
                                {categories.map((category) => (
                                    <Link
                                        key={category}
                                        // href={`/tin-tuyen-dung?name=${category}&page=1`}
                                        href={`/tin-tuyen-dung/${createLinkTilte2(category)}`}
                                        className={`font16_500 ffffff ${activeCategory === category ? 'active' : ''}`}
                                        onClick={() => handleLinkClick(category)}
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="content_bn_right">
                        <div className="img_sm_rb">
                            <img src="/images/small_robot.svg" alt="Robot" />
                        </div>
                        <div className="img_big_rb">
                            <img src="/images/big_robot.svg" alt="Robot" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={s['banner-top-mobile']}>
                <div className={s.backgroud}></div>
                <div className={s['box-container']}>
                    <p className={s.title}>TÌM VIỆC NHANH <span>
                        ,</span></p>
                    <p className={s.title_bot}> TUYỂN DỤNG HIỆU QUẢ</p>
                    <p className={s.des}>Work AI - việc làm chất lượng, ứng viên tiềm năng</p>
                    {/* <div> */}
                    <div style={{
                        width: '100%',
                        gap: '10px !important',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative'
                    }}>


                        <div className={s.search_text}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M7.19444 13.6389C10.7536 13.6389 13.6389 10.7536 13.6389 7.19444C13.6389 3.63528 10.7536 0.75 7.19444 0.75C3.63528 0.75 0.75 3.63528 0.75 7.19444C0.75 10.7536 3.63528 13.6389 7.19444 13.6389Z" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15.2503 15.25L11.7461 11.7458" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <input
                              ref={allJobMobileRef}  placeholder='Vị trí ứng tuyển' type="text" name="name" className="search_pojob"
                                value={keyword} onChange={(e: any) => {
                                    setKeyWord(e.cat_name);
                                    setKeyFindJob(e.cat_id);
                                }}
                            />
                        </div>
                        <div className={`${s.all_job_filtered} all_job_mobile`}>
                                <div  className={s.job_have_title}>
                                    <p>Tìm kiếm gần đây</p>
                                    <div onClick={() => closeAllJobMobile()} className={s.job_have_close_mobile}>
                                    ×
                                </div>       
                                </div>  
                                <ul className='job-list job-list-history'>
                                {
                                    historySearch?.map((job: any) => (
                                        <li onClick={() =>{
                                            setKeyWord(job?.cat_name);
                                            setKeyFindJob(job?.cat_id);
                                        }}>{job?.cat_name}</li>
                                    ))
                                }
                                
                            </ul>     
                        </div>
                        <div className={s.search_select}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M7.99992 8.95334C9.14867 8.95334 10.0799 8.02209 10.0799 6.87334C10.0799 5.72458 9.14867 4.79333 7.99992 4.79333C6.85117 4.79333 5.91992 5.72458 5.91992 6.87334C5.91992 8.02209 6.85117 8.95334 7.99992 8.95334Z" stroke="#333333" strokeWidth="1.5" />
                                <path d="M2.41379 5.66004C3.72712 -0.113291 12.2805 -0.106624 13.5871 5.66671C14.3538 9.05338 12.2471 11.92 10.4005 13.6934C9.06046 14.9867 6.94046 14.9867 5.59379 13.6934C3.75379 11.92 1.64712 9.04671 2.41379 5.66004Z" stroke="#333333" strokeWidth="1.5" />
                            </svg>
                            <select name="address" className="select-location" value={selectedValue} onChange={(e: any) => {
                                console.log(e);
                            }}>
                                <option key={0} value={0}>Chọn địa điểm</option>
                                {dataJson?.city.map(item => (
                                    <option key={item.cit_id} value={item.cit_id}>{item.cit_name}</option>
                                ))}
                            </select>
                            {/* <p>Text</p> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ display: 'none' }}>
                                <path d="M9.5308 10.0506C9.39015 10.1912 9.19942 10.2701 9.00055 10.2701C8.80168 10.2701 8.61095 10.1912 8.4703 10.0506L5.0308 6.61181C4.88935 6.47519 4.6999 6.39959 4.50325 6.4013C4.3066 6.40301 4.11849 6.48189 3.97944 6.62094C3.84038 6.76 3.7615 6.94811 3.75979 7.14476C3.75808 7.3414 3.83368 7.53086 3.9703 7.67231L7.4098 11.1088C7.83174 11.5306 8.40393 11.7676 9.00055 11.7676C9.59717 11.7676 10.1694 11.5306 10.5913 11.1088L14.0308 7.66931C14.1674 7.52786 14.243 7.3384 14.2413 7.14176C14.2396 6.94511 14.1607 6.757 14.0217 6.61794C13.8826 6.47889 13.6945 6.40001 13.4979 6.3983C13.3012 6.39659 13.1118 6.47219 12.9703 6.60881L9.5308 10.0506Z" fill="#999999" />
                            </svg>
                        </div>
                        <button className={s.button_search} onClick={handleSearch}>
                            <p>Tìm kiếm</p>
                        </button>
                    </div>
                    {/* </div> */}
                    <div className={s.box_keyword}>
                        <p className={s.key}>Từ khóa nổi bật</p>
                        <div className={s.list_keyword}>
                            {categories.map((category) => (
                                <div
                                    className={s.keyword}
                                    key={category}
                                    onClick={() => clickHandle(category)}
                                >
                                    <p>{category}</p>
                                </div>
                            ))}

                            {/* <div className={s.keyword}>
                                <p>Kinh doanh</p>
                            </div>
                            <div className={s.keyword}>
                                <p>IT phần mềm</p>
                            </div>
                            <div className={s.keyword}>
                                <p>Bán hàng</p>
                            </div>
                            <div className={s.keyword}>
                                <p>Bất động sản</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner_top
