import React from "react";
import { useState, useEffect } from 'react';

import $ from 'jquery'
import 'select2';

import s from './styles.module.scss';

const Search = (
    {
        listDistrict,
        listJob,
        onClickSearch
    }: {
        listDistrict: { value: any, label: any }[],
        listJob: { value: any, label: any }[],
        onClickSearch: any
    }) => {

    const [key, setKey] = useState<any>("");
    const [selectedDistric, setSelectedDistrict] = useState<any>();
    const [selectedJob, setSelectedJob] = useState<any>();

    const handleInputKey = (event: any) => {
        const selectedValue = event.target.value;
        setKey(selectedValue);
    };

    const handleChangeJob = (event: any) => {
        const selectedValue = event.target.value;
        setSelectedJob(selectedValue);
    };

    const handleChangeDistrict = (event: any) => {
        const selectedValue = event.target.value;
        setSelectedDistrict(selectedValue);
    };

    useEffect(() => {
        if (typeof document != 'undefined') {
            $(document).ready(function () {
                $('.select-location').select2();

                $('.district').on('change', async (e: any) => {
                    handleChangeDistrict(e)
                })

                $('.job').on('change', async (e: any) => {
                    handleChangeJob(e)
                })
            });
        }
    }, [])

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
            <div className={s.container}>
                <div className={s.body}>
                    <div className={s.item_1}>
                        <div className={s.icon_search}></div>
                        <input className={s.input_text} type="text" placeholder="Nhập từ khóa mong muốn..." value={key} onChange={handleInputKey} />
                    </div>
                    <div className={`${s.item_2} select_2`}>
                        <div className={s.icon_select}></div>
                        <select className={`${s.select} select-location district`} value={selectedDistric} onChange={handleChangeDistrict}>
                            {listDistrict?.map((item: any, index: any) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className={`${s.item_3} select_2`}>
                        <div className={s.icon_select}></div>
                        <select className={`${s.select} select-location job`} value={selectedJob} onChange={handleChangeJob}>
                            {listJob?.map((item: any, index: any) => (
                                <option key={index} className={s.option} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                    <button className={s.item_4} onClick={() => { onClickSearch(key, selectedDistric, selectedJob) }}>
                        <span className={s.text_search}>Tìm kiếm</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Search;