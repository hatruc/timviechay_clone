import { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';
import { useSearchVariables } from '@/components/store';

import { Select } from 'antd';

import $ from 'jquery'
import 'select2';

import s from './styles.module.scss';
import { findCityFromLink, findJobFromLink } from '@/functions/functions';

const Search = ({
    keySearch,
    address,
    onClickSearch,
    total,
    totalHuyHieu,
    listCity,
    listDistrict,
    listJob,
    listExp,
    listSalary,
    listLevel,
    listWorkForm,
    setLoading,
    changeCity,
}: {
    keySearch: string,
    address: any,
    onClickSearch: any;
    total: any;
    totalHuyHieu: any;
    listCity: any;
    listDistrict: any;
    listJob: any;
    listExp: any;
    listSalary: any;
    listLevel: any;
    listWorkForm: any;
    setLoading: any;
    changeCity: any;
}) => {
    const tagContainerRef = useRef<any>(null);
    const searchParams = new URLSearchParams(window.location.search);
    const router = useRouter();
    const searchVariables: any = useSearchVariables();
    const [keyword, setKeyword] = useState<any>("");
    const [filter, setFilter] = useState(false);
    const [showDistrict, setShowDistrict] = useState(false);
    const [selectCity, setSelectCity] = useState<number>(0);
    const [selectDistrict, setSelectDistrict] = useState<number>(0);
    const [selectJob, setSelectJob] = useState<number>(0);
    const [selectExp, setSelectExp] = useState<number>(0);
    const [selectSalary, setSelectSalary] = useState<number>(0);
    const [selectLevel, setSelectLevel] = useState<number>(0);
    const [selectWorkForm, setSelectWorkForm] = useState<number>(0);
    const [lisDistricChange, setLisDistricChange] = useState<any>([]);

    const handleInputChange = (event: any) => {
        setKeyword(event.target.value);
    }

    const handleFilter = () => {
        if (searchParams.has('district')) {
            setSelectDistrict(Number(searchParams.get('district')))
        }
        setShowDistrict(true)
        setFilter(!filter);
    }

    const apply = () => {
        setFilter(false);
        handleSearch()
    }

    const onChangeDistrict = (value: number) => {
        if (selectDistrict === value) {
            setSelectDistrict(0);
        } else {
            setSelectDistrict(value);
        }
    };

    const onChangeCity = (value: any) => {
        setSelectCity(value);
        changeCity(value)
    };

    const onChangeJob = (value: number) => {
        setSelectJob(value);
    };

    const onSelectExp = (value: number) => {
        setSelectExp(value);
    };

    const onSelectSalary = (value: number) => {
        setSelectSalary(value);
    };

    const onSelectLevel = (value: number) => {
        setSelectLevel(value);
    };

    const onSelectWorkForm = (value: number) => {
        setSelectWorkForm(value);
    };

    const resetFilter = () => {
        setSelectCity(0);
        setSelectDistrict(0);
        setSelectJob(0);
        setSelectExp(0);
        setSelectSalary(0);
        setSelectLevel(0);
        setSelectWorkForm(0);
    }

    const handleSearch = () => {
        onClickSearch(keyword, selectCity, selectDistrict, selectJob, selectExp, selectSalary, selectLevel, selectWorkForm);
    }

    const handleTotalHuyHieu = () => {
        if (totalHuyHieu > 0) {
            setLoading(true);
            searchVariables.setAllSelect(keyword, selectCity, selectDistrict, selectJob, selectExp, selectSalary, selectLevel, selectWorkForm);
            router.push('/nha-tuyen-dung/danh-sach-tin-tuyen-dung-tia-set');
        }
    }

    const scrollLeft = () => {
        if (tagContainerRef.current) {
            tagContainerRef.current.scrollLeft -= 50;
        }
    };

    const scrollRight = () => {
        if (tagContainerRef.current) {
            tagContainerRef.current.scrollLeft += 50;
        }
    };

    const filterOption = (input: string, option?: { label: string; value: number }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


    const changeParam = () => {
        if (searchParams.has(keySearch)) {
            setKeyword(searchParams.get(keySearch))
        } else {
            setKeyword('')
        }
        if (searchParams.has(address)) {
            setSelectCity(Number(searchParams.get(address)))
            onChangeCity(Number(searchParams.get(address)))
        } else {
            onChangeCity(0)
        }
        if (searchParams.has('exp')) {
            setSelectExp(Number(searchParams.get('exp')))
        } else {
            setSelectExp(0)
        }
        if (searchParams.has('salary')) {
            setSelectSalary(Number(searchParams.get('salary')))
        } else {
            setSelectSalary(0)
        }
        if (searchParams.has('edu')) {
            setSelectLevel(Number(searchParams.get('edu')))
        } else {
            setSelectLevel(0)
        }
        if (searchParams.has('fomati')) {
            setSelectWorkForm(Number(searchParams.get('fomati')))
        } else {
            setSelectWorkForm(0)
        }
        if (searchParams.has('nameWork')) {
            setSelectJob(Number(searchParams.get('nameWork')))
        } else {
            setSelectJob(0)
        }
        if (searchParams.has('district')) {
            setSelectDistrict(Number(searchParams.get('district')))
        } else {
            setSelectDistrict(0)
        }

        // Link tên tỉnh thành, ngành nghề 
        // console.log(router.pathname, router.basePath)
        console.log(router.asPath)
        const path = router.asPath
        const job_id = findJobFromLink(path)
        if (job_id) {
            setSelectJob(job_id)
        }
        const city_id = findCityFromLink(path)
        if (city_id) {
            setSelectCity(city_id)
            onChangeCity(city_id)
        }
        // Check link nếu có thì set giá trị dropdown 
        // 1 functions dung chung?
    }

    useEffect(() => {
        if (typeof document != 'undefined') {
            $(document).ready(function () {
                $('.select-location').select2();

                $('.city').on('change', async (e: any) => {
                    onChangeCity(e.target.value)
                })

                $('.job').on('change', async (e: any) => {
                    onChangeJob(e.target.value)
                })
            });
        }
    }, [selectCity, selectJob]);



    useEffect(() => {
        if (selectCity != 0 && listDistrict?.length > 0) {
            setShowDistrict(true);
            // setSelectDistrict(0)
        }
        else {
            setShowDistrict(false);
        }
    }, [selectCity, listDistrict]);

    useEffect(() => {
        (async () => {
            await changeParam()
        })()
    }, [router.query]);


    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
            <div className={s.container}>
                <div className={s.body}>

                    <div className={s.item_1}>
                        <div className={s.group_input}>
                            <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/ep_search.svg"} alt={""} height={23} width={23} style={{ height: "23px", width: "23px" }}></Image>
                            <input type="text" placeholder="Nhập từ khóa mong muốn..." value={keyword} onChange={handleInputChange} />
                        </div>
                        <div className={`${s.group_select_1} select_2 select_ds_tin_tuyen_dung`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M4 10.1433C4 5.64588 7.58172 2 12 2C16.4183 2 20 5.64588 20 10.1433C20 14.6055 17.4467 19.8124 13.4629 21.6744C12.5343 22.1085 11.4657 22.1085 10.5371 21.6744C6.55332 19.8124 4 14.6055 4 10.1433Z" stroke="#6B6B6B" strokeWidth="1.5" />
                                <path d="M14.1249 12.1178L15.5 13.5M14.1249 12.1178C14.6657 11.5752 15 10.8266 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C12.8302 13 13.5817 12.6628 14.1249 12.1178Z" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>

                            <select className={`${s.select} select-location city`} value={selectCity} onChange={(e) => { }}>
                                {listCity?.map((item: any, index: any) => (
                                    <option key={index} value={item.cit_id} >{item.cit_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={`${s.group_select_2} select_2 select_ds_tin_tuyen_dung`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z" stroke="#666666" strokeWidth="1.5" />
                                <path d="M5.76613 10L4.97883 10.3149C2.99294 11.1093 2 11.5065 2 12C2 12.4935 2.99294 12.8907 4.97883 13.6851L7.7873 14.8085C9.77318 15.6028 10.7661 16 12 16C13.2339 16 14.2268 15.6028 16.2127 14.8085L19.0212 13.6851C21.0071 12.8907 22 12.4935 22 12C22 11.5065 21.0071 11.1093 19.0212 10.3149L18.2339 10" stroke="#666666" strokeWidth="1.5" />
                                <path d="M5.76613 14L4.97883 14.3149C2.99294 15.1093 2 15.5065 2 16C2 16.4935 2.99294 16.8907 4.97883 17.6851L7.7873 18.8085C9.77318 19.6028 10.7661 20 12 20C13.2339 20 14.2268 19.6028 16.2127 18.8085L19.0212 17.6851C21.0071 16.8907 22 16.4935 22 16C22 15.5065 21.0071 15.1093 19.0212 14.3149L18.2339 14" stroke="#666666" strokeWidth="1.5" />
                            </svg>

                            <select className={`${s.select} select-location job`} value={selectJob} onChange={() => { }}>
                                {listJob?.map((item: any, index: any) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))}
                            </select>

                        </div>
                        <div className={s.button_search} onClick={() => handleSearch()}>Tìm kiếm</div>
                    </div>

                    <div className={s.item_2}>
                        <div className={s.total}>
                            <span className={s.text}>Tổng <span>{total}</span> kết quả</span>
                            {/* <div className={s.totalHuyHieu} onClick={handleTotalHuyHieu}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                                    <path d="M11.7273 0.361566C11.5791 0.223023 11.4501 0.105142 11.3432 0C11.2352 0.105142 11.106 0.223023 10.9574 0.361566C9.16182 2.01044 4.52112 5.84937 0 6.11099C0 6.11099 2.07893 18.7278 11.1759 23.9076C11.232 23.9383 11.2868 23.9693 11.3432 24C11.3981 23.9693 11.4544 23.9383 11.5094 23.9076C20.6062 18.7278 22.6866 6.11099 22.6866 6.11099C18.1638 5.84937 13.5248 2.01044 11.7273 0.361566Z" fill="url(#paint0_linear_1551_61437)" fillOpacity="0.82" />
                                    <path d="M11.7156 0.715446C11.5717 0.581061 11.4468 0.466822 11.343 0.364929C11.2382 0.466822 11.1131 0.581191 10.9689 0.715446C9.22803 2.31415 4.72848 6.03638 0.344727 6.29007C0.344727 6.29007 2.36037 18.5232 11.1806 23.5456C11.2352 23.5755 11.2881 23.6054 11.343 23.6352C11.3962 23.6053 11.451 23.5754 11.5042 23.5456C20.3245 18.5232 22.3415 6.29007 22.3415 6.29007C17.9563 6.03638 13.4583 2.31415 11.7156 0.715446Z" fill="url(#paint1_linear_1551_61437)" fillOpacity="0.82" />
                                    <path d="M11.7031 1.0864C11.5639 0.956431 11.4432 0.845958 11.3429 0.747314C11.2416 0.845958 11.1205 0.956431 10.9812 1.0864C9.29732 2.6326 4.94567 6.23239 0.706055 6.47777C0.706055 6.47777 2.65541 18.3089 11.1859 23.1664C11.2386 23.1953 11.29 23.2242 11.3429 23.253C11.3943 23.2242 11.4472 23.1953 11.4988 23.1664C20.0291 18.3089 21.9798 6.47777 21.9798 6.47777C17.7386 6.23239 13.3884 2.6326 11.7031 1.0864Z" fill="url(#paint2_linear_1551_61437)" fillOpacity="0.82" />
                                    <path d="M11.6908 1.45715C11.5563 1.3316 11.4397 1.22477 11.3427 1.12964C11.2449 1.22477 11.1279 1.3316 10.9933 1.45715C9.36662 2.95072 5.163 6.42821 1.06738 6.6654C1.06738 6.6654 2.95059 18.0945 11.1911 22.7869C11.2422 22.8148 11.2915 22.8429 11.3427 22.8707C11.3924 22.8429 11.4435 22.8148 11.4935 22.7869C19.7339 18.0946 21.6185 6.6654 21.6185 6.6654C17.5213 6.42834 13.319 2.95072 11.6908 1.45715Z" fill="url(#paint3_linear_1551_61437)" fillOpacity="0.82" stroke="url(#paint4_linear_1551_61437)" strokeMiterlimit="10" />
                                    <path d="M11.6888 1.52215C11.5552 1.39738 11.4394 1.29133 11.3428 1.19672C11.2456 1.29133 11.1293 1.39751 10.9955 1.52215C9.37889 3.00649 5.20113 6.46267 1.13086 6.6983C1.13086 6.6983 3.00237 18.0569 11.1922 22.7203C11.2429 22.748 11.2921 22.7758 11.3429 22.8038C11.3922 22.7758 11.4431 22.748 11.4927 22.7203C19.6821 18.0569 21.555 6.6983 21.555 6.6983C17.4833 6.46267 13.3068 3.00662 11.6888 1.52215Z" fill="url(#paint5_linear_1551_61437)" fillOpacity="0.82" />
                                    <path d="M11.6835 1.68146C11.5519 1.55851 11.4379 1.45415 11.3429 1.36096C11.2471 1.45415 11.1326 1.55851 11.0008 1.68146C9.40874 3.14331 5.29454 6.54686 1.28613 6.77885C1.28613 6.77885 3.12918 17.9647 11.1945 22.5573C11.2445 22.5845 11.2929 22.6122 11.3429 22.6392C11.3915 22.6122 11.4415 22.5845 11.4904 22.5573C19.5554 17.9649 21.3999 6.77885 21.3999 6.77885C17.3902 6.54686 13.277 3.14331 11.6835 1.68146Z" fill="url(#paint6_linear_1551_61437)" fillOpacity="0.82" />
                                    <path d="M11.714 2.37249C11.714 2.57719 11.5481 2.74316 11.3433 2.74316C11.1386 2.74316 10.9727 2.57719 10.9727 2.37249C10.9727 2.1678 11.1386 2.00183 11.3433 2.00183C11.548 2.00183 11.714 2.16767 11.714 2.37249Z" fill="#567EBA" />
                                    <path d="M2.28234 7.22515C2.28234 7.42985 2.1165 7.59581 1.91168 7.59581C1.70698 7.59581 1.54102 7.42985 1.54102 7.22515C1.54102 7.02046 1.70698 6.85449 1.91168 6.85449C2.11637 6.85449 2.28234 7.02046 2.28234 7.22515Z" fill="#567EBA" />
                                    <path d="M20.926 7.22515C20.926 7.42985 20.7601 7.59581 20.5552 7.59581C20.3505 7.59581 20.1846 7.42985 20.1846 7.22515C20.1846 7.02046 20.3505 6.85449 20.5552 6.85449C20.7599 6.85449 20.926 7.02046 20.926 7.22515Z" fill="#567EBA" />
                                    <path d="M11.3435 20.8187C11.2227 20.8187 11.1248 20.9274 11.1248 21.0618C11.1248 21.1961 11.3435 21.9531 11.3435 21.9531C11.3435 21.9531 11.5624 21.1961 11.5624 21.0618C11.5623 20.9274 11.4642 20.8187 11.3435 20.8187ZM11.9951 21.0846C11.893 21.02 11.7519 21.0599 11.6803 21.1733C11.6087 21.2867 11.3897 22.0439 11.3897 22.0439C11.3897 22.0439 11.9787 21.5204 12.0503 21.4066C12.1219 21.2933 12.0972 21.1489 11.9951 21.0846ZM10.692 21.0846C10.5897 21.149 10.565 21.2933 10.6367 21.4066C10.7083 21.5204 11.2973 22.0439 11.2973 22.0439C11.2973 22.0439 11.0783 21.2867 11.0067 21.1733C10.9351 21.0598 10.794 21.02 10.692 21.0846Z" fill="#567EBA" />
                                    <path d="M13.1034 5.19128C13.0904 5.21081 12.5383 5.75366 12.5383 5.75366L9.00684 13.0284L12.1505 12.0368L9.68534 18.2396L10.6822 17.2427L15.5541 8.89627L12.0171 9.93941L13.1034 5.19128Z" fill="#B3D7FB" />
                                    <path d="M12.5382 5.75366C12.486 5.83218 8.00977 14.0253 8.00977 14.0253L11.1534 13.0337L9.68518 18.2396L14.6586 9.86337L11.0202 10.9365L12.5382 5.75366Z" fill="white" />
                                    <defs>
                                        <linearGradient id="paint0_linear_1551_61437" x1="11.3433" y1="0" x2="11.3433" y2="24" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#AAD5FF" />
                                            <stop offset="0.21875" stopColor="#377ABB" />
                                            <stop offset="0.458333" stopColor="#377ABB" />
                                            <stop offset="0.71875" stopColor="#6EACE8" />
                                            <stop offset="1" stopColor="#075CAF" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_1551_61437" x1="11.3431" y1="0.364929" x2="11.3431" y2="23.6352" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#AAD5FF" />
                                            <stop offset="0.21875" stopColor="#377ABB" />
                                            <stop offset="0.458333" stopColor="#377ABB" />
                                            <stop offset="0.71875" stopColor="#6EACE8" />
                                            <stop offset="1" stopColor="#075CAF" />
                                        </linearGradient>
                                        <linearGradient id="paint2_linear_1551_61437" x1="11.3429" y1="0.747314" x2="11.3429" y2="23.253" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#AAD5FF" />
                                            <stop offset="0.21875" stopColor="#377ABB" />
                                            <stop offset="0.458333" stopColor="#377ABB" />
                                            <stop offset="0.71875" stopColor="#6EACE8" />
                                            <stop offset="1" stopColor="#075CAF" />
                                        </linearGradient>
                                        <linearGradient id="paint3_linear_1551_61437" x1="11.3429" y1="1.12964" x2="11.3429" y2="22.8707" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#AAD5FF" />
                                            <stop offset="0.21875" stopColor="#377ABB" />
                                            <stop offset="0.458333" stopColor="#377ABB" />
                                            <stop offset="0.71875" stopColor="#6EACE8" />
                                            <stop offset="1" stopColor="#075CAF" />
                                        </linearGradient>
                                        <linearGradient id="paint4_linear_1551_61437" x1="0.991561" y1="11.9918" x2="21.6943" y2="11.9918" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.0056" stopColor="#DEE3E6" />
                                            <stop offset="0.2528" stopColor="#FFFDE5" />
                                            <stop offset="0.3953" stopColor="#F0ECD8" />
                                            <stop offset="0.5955" stopColor="#D6CDC1" />
                                            <stop offset="0.7865" stopColor="#EDEDEE" />
                                            <stop offset="1" stopColor="#D8D5BB" />
                                        </linearGradient>
                                        <linearGradient id="paint5_linear_1551_61437" x1="11.3429" y1="1.19672" x2="11.3429" y2="22.8038" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#AAD5FF" />
                                            <stop offset="0.21875" stopColor="#377ABB" />
                                            <stop offset="0.458333" stopColor="#377ABB" />
                                            <stop offset="0.71875" stopColor="#6EACE8" />
                                            <stop offset="1" stopColor="#075CAF" />
                                        </linearGradient>
                                        <linearGradient id="paint6_linear_1551_61437" x1="11.343" y1="1.36096" x2="11.343" y2="22.6392" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#AAD5FF" />
                                            <stop offset="0.21875" stopColor="#377ABB" />
                                            <stop offset="0.458333" stopColor="#377ABB" />
                                            <stop offset="0.71875" stopColor="#6EACE8" />
                                            <stop offset="1" stopColor="#075CAF" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                <span className={s.text_2}>Đã tìm thấy <span className={s.text_3}>{totalHuyHieu}</span> tin đăng đạt huy hiệu</span>

                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                    <path d="M13.8021 3.18894L9.36939 7.84793C9.31662 7.90323 9.25945 7.9423 9.19789 7.96516C9.13632 7.98839 9.07036 8 9 8C8.92964 8 8.86368 7.98839 8.80211 7.96516C8.74055 7.9423 8.68338 7.90323 8.63061 7.84793L4.1847 3.18894C4.06157 3.05991 4 2.89862 4 2.70507C4 2.51152 4.06596 2.34562 4.19789 2.20737C4.32982 2.06912 4.48373 2 4.65963 2C4.83553 2 4.98945 2.06912 5.12137 2.20737L9 6.27189L12.8786 2.20737C13.0018 2.07834 13.1534 2.01382 13.3335 2.01382C13.514 2.01382 13.6702 2.08295 13.8021 2.2212C13.934 2.35945 14 2.52074 14 2.70507C14 2.8894 13.934 3.05069 13.8021 3.18894Z" fill="white" />
                                    <path d="M13.8021 9.18894L9.36939 13.8479C9.31662 13.9032 9.25945 13.9423 9.19789 13.9652C9.13632 13.9884 9.07036 14 9 14C8.92964 14 8.86368 13.9884 8.80211 13.9652C8.74055 13.9423 8.68338 13.9032 8.63061 13.8479L4.1847 9.18894C4.06157 9.05991 4 8.89862 4 8.70507C4 8.51152 4.06596 8.34562 4.19789 8.20737C4.32982 8.06912 4.48373 8 4.65963 8C4.83553 8 4.98945 8.06912 5.12137 8.20737L9 12.2719L12.8786 8.20737C13.0018 8.07834 13.1534 8.01382 13.3335 8.01382C13.514 8.01382 13.6702 8.08295 13.8021 8.2212C13.934 8.35945 14 8.52074 14 8.70507C14 8.8894 13.934 9.05069 13.8021 9.18894Z" fill="white" />
                                </svg>
                            </div> */}
                        </div>

                        <div className={s.advanced_filtering} onClick={handleFilter}>
                            <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/filter-remove.svg"} alt={""} height={20} width={20} style={{ height: "20px", width: "20px" }}></Image>
                            Lọc nâng cao
                            {filter == true ? <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/up.svg"} alt={""} height={20} width={20} style={{ height: "20px", width: "20px", marginLeft: "auto" }}></Image> :
                                <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/down.svg"} alt={""} height={20} width={20} style={{ height: "20px", width: "20px", marginLeft: "auto" }}></Image>}
                        </div>

                    </div>

                    {filter == true ? <div className={s.item_3}>
                        <div className={s.box_search_1}>
                            <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/dollar_circle.png"} alt={""} width={24} height={24} style={{ height: "24px", width: "24px" }}></Image>
                            <Select
                                showSearch
                                defaultValue={"Tất cả kinh nghiệm"}
                                optionFilterProp="children"
                                onChange={(e: any) => onSelectExp(e)}
                                value={selectExp}
                                filterOption={filterOption}
                                options={listExp}
                                className={"select_search_1"}
                            />
                        </div>
                        <div className={s.box_search_2}>
                            <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/select_salary.png"} alt={""} width={24} height={24} style={{ height: "24px", width: "24px" }}></Image>
                            <Select
                                showSearch
                                defaultValue={"Tất cả mức lương"}
                                optionFilterProp="children"
                                onChange={(e: any) => onSelectSalary(e)}
                                filterOption={filterOption}
                                options={listSalary}
                                value={selectSalary}
                                className={"select_search_1"}
                            />
                        </div>
                        <div className={s.box_search_3}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M9.00033 17.4C8.75033 17.4 8.50033 17.3417 8.29199 17.225C6.73366 16.375 3.99199 15.475 2.27533 15.25L2.03366 15.2167C0.941992 15.0834 0.0419922 14.0584 0.0419922 12.95V2.88338C0.0419922 2.22505 0.300326 1.62505 0.775326 1.19171C1.25033 0.758381 1.86699 0.550047 2.51699 0.60838C4.35033 0.750047 7.11699 1.66671 8.68366 2.65005L8.88366 2.76671C8.94199 2.80005 9.06699 2.80005 9.11699 2.77505L9.25033 2.69171C10.817 1.70838 13.5837 0.775047 15.4253 0.616714C15.442 0.616714 15.5087 0.616714 15.5253 0.616714C16.1337 0.558381 16.7587 0.775047 17.2253 1.20838C17.7003 1.64171 17.9587 2.24171 17.9587 2.90005V12.9584C17.9587 14.075 17.0587 15.0917 15.9587 15.225L15.6837 15.2584C13.967 15.4834 11.217 16.3917 9.69199 17.2334C9.49199 17.35 9.25033 17.4 9.00033 17.4ZM2.31699 1.85005C2.05033 1.85005 1.80866 1.94171 1.61699 2.11671C1.40866 2.30838 1.29199 2.58338 1.29199 2.88338V12.95C1.29199 13.4417 1.71699 13.9167 2.19199 13.9834L2.44199 14.0167C4.31699 14.2667 7.19199 15.2084 8.85866 16.1167C8.93366 16.15 9.04199 16.1584 9.08366 16.1417C10.7503 15.2167 13.642 14.2667 15.5253 14.0167L15.8087 13.9834C16.2837 13.925 16.7087 13.4417 16.7087 12.95V2.89171C16.7087 2.58338 16.592 2.31671 16.3837 2.11671C16.167 1.92505 15.892 1.83338 15.5837 1.85005C15.567 1.85005 15.5003 1.85005 15.4837 1.85005C13.892 1.99171 11.3253 2.85005 9.92533 3.72505L9.79199 3.81671C9.33366 4.10005 8.68366 4.10005 8.24199 3.82505L8.04199 3.70838C6.61699 2.83338 4.05033 1.98338 2.41699 1.85005C2.38366 1.85005 2.35033 1.85005 2.31699 1.85005Z" fill="white" />
                            </svg>
                            <Select
                                showSearch
                                defaultValue={"Tất cả trình độ"}
                                optionFilterProp="children"
                                onChange={(e: any) => onSelectLevel(e)}
                                filterOption={filterOption}
                                options={listLevel}
                                value={selectLevel}
                                className={"select_search_1"}
                            />
                        </div>
                        <div className={s.box_search_4}>
                            <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/select_wf.png"} alt={""} width={24} height={24} style={{ height: "24px", width: "24px" }}></Image>
                            <Select
                                showSearch
                                defaultValue={"Tất cả hình thức"}
                                optionFilterProp="children"
                                onChange={(e: any) => onSelectWorkForm(e)}
                                filterOption={filterOption}
                                value={selectWorkForm}
                                options={listWorkForm}
                                className={"select_search_1"}
                            />
                        </div>
                        <div className={s.box_search_5} style={{
                            display: showDistrict && listDistrict.length > 0 ? 'flex' : 'none'
                        }}>
                            <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/left_icon.svg"} alt={""} width={28} height={28} style={{ height: "28px", width: "28px" }} onClick={scrollLeft}></Image>
                            <div className={s.district_wrap} ref={tagContainerRef}>
                                {listDistrict?.map((item: any, index: any) => {
                                    return (
                                        <div key={item.value} className={selectDistrict == item.value ? s.tag_exp_select : s.tag_exp} onClick={() => onChangeDistrict(item.value)}>{item.label}</div>
                                    )
                                })}
                            </div>
                            <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/right_icon.svg"} alt={""} width={28} height={28} style={{ height: "28px", width: "28px" }} onClick={scrollRight}></Image>
                        </div>
                    </div> : <></>}

                </div>
            </div >

            <div>
                <div className={filter ? s.modal_mask : s.displayNone}></div>
                <div className={filter ? s.modal_wrap : s.displayNone}>
                    <div className={s.filter}>
                        <div className={s.header} onClick={() => onChangeDistrict(selectDistrict)}>
                            <div>Bộ lọc nâng cao</div>
                            <svg style={{ cursor: "pointer" }} onClick={handleFilter} xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <rect y="0.5" width="24" height="24" rx="12" fill="white" fillOpacity="0.15" />
                                <path d="M16.9497 7.55025L7.05025 17.4497M7.05025 7.55025L16.9497 17.4497" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <div className={s.body_filter}>

                            <div className={s.box_1}>
                                <span className={s.text_district}>Địa điểm</span>
                                <div className={s.select_district}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 10.1433C4 5.64588 7.58172 2 12 2C16.4183 2 20 5.64588 20 10.1433C20 14.6055 17.4467 19.8124 13.4629 21.6744C12.5343 22.1085 11.4657 22.1085 10.5371 21.6744C6.55332 19.8124 4 14.6055 4 10.1433Z" stroke="white" strokeWidth="1.5" />
                                        <path d="M14.1249 12.1178L15.5 13.5M14.1249 12.1178C14.6657 11.5752 15 10.8266 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C12.8302 13 13.5817 12.6628 14.1249 12.1178Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <Select
                                        showSearch
                                        value={selectCity}
                                        optionFilterProp="children"
                                        onChange={onChangeCity}
                                        filterOption={filterOption}
                                        options={listCity?.map((city: any) => ({
                                            label: city.cit_name,
                                            value: Number(city.cit_id)
                                        }))}
                                        className={"select_search_1"}
                                    />
                                </div>

                            </div>

                            <div className={s.box_1}>
                                <span className={s.text_district}>Nghành nghề</span>
                                <div className={s.select_district}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z" stroke="white" strokeWidth="1.5" />
                                        <path d="M5.76613 10L4.97883 10.3149C2.99294 11.1093 2 11.5065 2 12C2 12.4935 2.99294 12.8907 4.97883 13.6851L7.7873 14.8085C9.77318 15.6028 10.7661 16 12 16C13.2339 16 14.2268 15.6028 16.2127 14.8085L19.0212 13.6851C21.0071 12.8907 22 12.4935 22 12C22 11.5065 21.0071 11.1093 19.0212 10.3149L18.2339 10" stroke="white" strokeWidth="1.5" />
                                        <path d="M5.76613 14L4.97883 14.3149C2.99294 15.1093 2 15.5065 2 16C2 16.4935 2.99294 16.8907 4.97883 17.6851L7.7873 18.8085C9.77318 19.6028 10.7661 20 12 20C13.2339 20 14.2268 19.6028 16.2127 18.8085L19.0212 17.6851C21.0071 16.8907 22 16.4935 22 16C22 15.5065 21.0071 15.1093 19.0212 14.3149L18.2339 14" stroke="white" strokeWidth="1.5" />
                                    </svg>
                                    <Select
                                        showSearch
                                        value={selectJob}
                                        optionFilterProp="children"
                                        onChange={onChangeJob}
                                        filterOption={filterOption}
                                        options={listJob?.map((job: any) => ({
                                            label: job.label,
                                            value: Number(job.value)
                                        }))}
                                        className={"select_search_1"}
                                    />
                                </div>

                            </div>

                            <div className={s.box_2}>
                                <span className={s.text_exp}>Kinh nghiệm</span>
                                <div className={s.select_exp}>
                                    {listExp?.map((item: any, index: any) => {
                                        return (
                                            <div key={item.value} className={selectExp == item.value ? s.tag_exp_select : s.tag_exp} onClick={() => onSelectExp(item.value)}>{item.label}</div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className={s.box_2}>
                                <span className={s.text_exp}>Mức lương</span>
                                <div className={s.select_exp}>
                                    {listSalary?.map((item: any, index: any) => {
                                        return (
                                            <div key={item.value} className={selectSalary == item.value ? s.tag_exp_select : s.tag_exp} onClick={() => onSelectSalary(item.value)}>{item.label}</div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className={s.box_2}>
                                <span className={s.text_exp}>Trình độ</span>
                                <div className={s.select_exp}>
                                    {listLevel?.map((item: any, index: any) => {
                                        return (
                                            <div key={item.value} className={selectLevel == item.value ? s.tag_exp_select : s.tag_exp} onClick={() => onSelectLevel(item.value)}>{item.label}</div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className={s.box_2}>
                                <span className={s.text_exp}>Hình thức làm việc</span>
                                <div className={s.select_exp}>
                                    {listWorkForm?.map((item: any, index: any) => {
                                        return (
                                            <div key={item.value} className={selectWorkForm == item.value ? s.tag_exp_select : s.tag_exp} onClick={() => onSelectWorkForm(item.value)}>{item.label}</div>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>

                        <div className={s.footer}>
                            <button className={s.reset_filter} onClick={resetFilter}>Xóa lọc</button>
                            <button className={s.apply} onClick={apply}>Áp dụng</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Search;