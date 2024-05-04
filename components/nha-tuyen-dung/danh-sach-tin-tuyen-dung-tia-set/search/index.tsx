/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import { Select } from 'antd';

import $ from 'jquery'
import 'select2';

import s from './styles.module.scss';

const Search = ({
    onClickSearch,
    totalHuyHieu,
    resetFilter_1,
    setResetFilter,
    listCity,
    listDistrict,
    listJob,
    listExp,
    listSalary,
    listLevel,
    listWorkForm,
}: {
    onClickSearch: any;
    totalHuyHieu: any;
    resetFilter_1: any;
    setResetFilter: any;
    listCity: any;
    listDistrict: any;
    listJob: any;
    listExp: any;
    listSalary: any;
    listLevel: any;
    listWorkForm: any;
}) => {
    const tagContainerRef = useRef<any>(null);

    const [keyword, setKeyword] = useState("");
    const [filter, setFilter] = useState(false);
    const [showDistrict, setShowDistrict] = useState(false);
    const [selectCity, setSelectCity] = useState("0");
    const [selectDistrict, setSelectDistrict] = useState("0");
    const [selectJob, setSelectJob] = useState("0");
    const [selectExp, setSelectExp] = useState("0");
    const [selectSalary, setSelectSalary] = useState("0");
    const [selectLevel, setSelectLevel] = useState("0");
    const [selectWorkForm, setSelectWorkForm] = useState("0");

    const handleInputChange = (event: any) => {
        setKeyword(event.target.value);
    }

    const handleFilter = () => {
        setFilter(!filter);
    }

    const apply = () => {
        setFilter(false);
    }

    const onChangeDistrict = (value: string) => {
        setSelectDistrict(value);
    };

    const onChangeCity = (value: string) => {
        setSelectCity(value);
    };

    const onChangeJob = (value: string) => {
        setSelectJob(value);
    };

    const onSelectExp = (value: string) => {
        setSelectExp(value);
    };

    const onSelectSalary = (value: string) => {
        setSelectSalary(value);
    };

    const onSelectLevel = (value: string) => {
        setSelectLevel(value);
    };

    const onSelectWorkForm = (value: string) => {
        setSelectWorkForm(value);
    };

    const resetFilter = () => {
        setSelectCity("0");
        setSelectDistrict("0");
        setSelectJob("0");
        setSelectExp("0");
        setSelectSalary("0");
        setSelectLevel("0");
        setSelectWorkForm("0");
    }

    const handleSearch = () => {
        onClickSearch(keyword, selectCity, selectDistrict, selectJob, selectExp, selectSalary, selectLevel, selectWorkForm);
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

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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
    }, [selectCity, selectJob])

    useEffect(() => {
        if (selectCity != "0" && listDistrict.length > 0) {
            setShowDistrict(true);
        }
        else {
            setShowDistrict(false);
        }
    }, [selectCity, listDistrict])

    useEffect(() => {
        if (resetFilter_1 == true) {
            resetFilter();
            setResetFilter(false);
        }
    }, [resetFilter])

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

                            <select className={`${s.select} select-location city`} value={selectCity} onChange={() => { }}>
                                {listCity?.map((item: any, index: any) => (
                                    <option key={index} value={item.value}>{item.label}</option>
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
                        <div className={s.button_search} onClick={handleSearch}>Tìm kiếm</div>
                    </div>

                    <div className={s.item_2}>
                        <div className={s.total}>
                            <span className={s.text}>Tổng <span>{totalHuyHieu}</span> kết quả</span>
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
                                onChange={(e) => onSelectExp(e)}
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
                                onChange={(e) => onSelectSalary(e)}
                                filterOption={filterOption}
                                options={listSalary}
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
                                onChange={onSelectLevel}
                                filterOption={filterOption}
                                options={listLevel}
                                className={"select_search_1"}
                            />
                        </div>
                        <div className={s.box_search_4}>
                            <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/select_wf.png"} alt={""} width={24} height={24} style={{ height: "24px", width: "24px" }}></Image>
                            <Select
                                showSearch
                                defaultValue={"Tất cả hình thức"}
                                optionFilterProp="children"
                                onChange={onSelectWorkForm}
                                filterOption={filterOption}
                                options={listWorkForm}
                                className={"select_search_1"}
                            />
                        </div>
                        {showDistrict ? <div className={s.box_search_5}>
                            <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/left_icon.svg"} alt={""} width={28} height={28} style={{ height: "28px", width: "28px" }} onClick={scrollLeft}></Image>
                            <div className={s.district_wrap} ref={tagContainerRef}>
                                {listDistrict?.map((item: any, index: any) => {
                                    return (
                                        <div key={item.value} className={selectDistrict == item.value ? s.tag_exp_select : s.tag_exp} onClick={() => onChangeDistrict(item.value)}>{item.label}</div>
                                    )
                                })}
                            </div>
                            <Image src={"/images/nha-tuyen-dung/danh-sach-tin-tuyen-dung/right_icon.svg"} alt={""} width={28} height={28} style={{ height: "28px", width: "28px" }} onClick={scrollRight}></Image>
                        </div> : <></>}
                    </div> : <></>}

                </div>
            </div >

            <div>
                <div className={filter ? s.modal_mask : s.displayNone}></div>
                <div className={filter ? s.modal_wrap : s.displayNone}>
                    <div className={s.filter}>
                        <div className={s.header}>
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
                                        options={listCity}
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
                                        options={listJob}
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