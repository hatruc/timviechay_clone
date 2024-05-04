import React from "react";
import { useState, useEffect } from 'react';

import s from './styles.module.scss';
import { useRouter } from "next/router";

const Search = ({ setNewsDetail, listDistrict, listJob }: any) => {
    const [key, setKet] = useState<any>();
    const [selectedDistric, setSelectedDistrict] = useState();
    const [selectedJob, setSelectedJob] = useState();
    const router = useRouter()

    const handleInputKey = (event: any) => {
        const selectedValue = event.target.value;
        setKet(selectedValue);
    };

    const handleChangeJob = (event: any) => {
        const selectedValue = event.target.value;
        setSelectedJob(selectedValue);
    };

    const handleChangeDistrict = (event: any) => {
        const selectedValue = event.target.value;
        setSelectedDistrict(selectedValue);
    };

    const onClickSearch = async () => {
        // console.log("key: ", key, "distric: ", selectedDistric, "job: ", selectedJob);
        // console.log("Search tin theo từ khóa");
        let query: any = {};
        key && typeof key === 'string' && key.trim() && (query.name = key.trim())
        selectedDistric && Number(selectedDistric) && Number(selectedDistric) !== 0 && (query.address = selectedDistric)
        selectedJob && Number(selectedJob) && Number(selectedJob) !== 0 && (query.nameWork = selectedJob) 
        router.push({
            pathname: '/tin-tuyen-dung',
            query: query
        })
    }

    return (
        <>
            <div className={s.container}>
                <div className={s.body}>
                    <div className={s.item_1}>
                        <div className={s.icon_search}></div>
                        <input className={s.input_text} type="text" placeholder="Nhập từ khóa mong muốn..." value={key} onChange={handleInputKey} />
                    </div>
                    <div className={s.item_2}>
                        <div className={s.icon_select}></div>
                        <select className={s.select} value={selectedDistric} onChange={handleChangeDistrict}>
                            {listDistrict?.map((item: any, index: any) => (
                                <option key={index} className={s.option} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className={s.item_3}>
                        <div className={s.icon_select}></div>
                        <select className={s.select} value={selectedJob} onChange={handleChangeJob}>
                            {listJob?.map((item: any, index: any) => (
                                <option key={index} className={s.option} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                    <button className={s.item_4} onClick={onClickSearch}>
                        <span className={s.text_search}>Tìm kiếm</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Search;