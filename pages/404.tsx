/* eslint-disable @next/next/no-css-tags */
import BlogEditor from '@/components/common/BlogEditor';
import $ from 'jquery';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'select2';
import s from './404.module.scss';
import { getAllCity } from '@/functions/functions';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const NotFound = () => {

    const router = useRouter()

    // const [selectedRandom, setSelectedRandom] = useState("");
    const [listDistrict, setListDisTrict] = useState<{ value: any, label: any }[]>([{ value: 0, label: 'Toàn quốc' }, ...getAllCity()]);
    const [selectedDistric, setSelectedDistrict] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('')

    // console.log('>>> check city: ', listDistrict);

    const handleChangeDistrict = (event: any) => {
        const selectedValue = event.target.value;
        setSelectedDistrict(selectedValue);
    };

    const handleSearch = () => {
        let query: any = {};
        keyword && typeof keyword === 'string' && keyword.trim() && (query.name = keyword.trim())
        selectedDistric && Number(selectedDistric) && Number(selectedDistric) !== 0 && (query.address = selectedDistric)

        router.push({
            pathname: '/tin-tuyen-dung',
            query: query
        })
    }

    const handleEnterSearch = (e: any) => {
        if (e.keyCode == 13) {
            handleSearch()
        }
    }

    useEffect(() => {
        if (typeof document != 'undefined') {
            $(document).ready(function () {
                $('.select-district').select2();
                $('.select-district').on('change', async (e: any) => {
                    setSelectedDistrict(e.target.value)
                });
            });
        }
    }, [])

    return (
        <>
            <link rel="stylesheet" href="styles/register_select.css" />
            <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

            <Header />

            <style>
                {
                    `
                        @media (max-width: 1024px) {
                            .selection {
                                display: none;
                            }
                        }
                    `
                }
            </style>

            <div className={s.container_search}>

                <div className={s.box_search}>
                    <input
                        type="text" className={s.input_search} placeholder='Nhập từ khóa mong muốn...'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyUp={(e) => handleEnterSearch(e)}
                    />
                    {/* <svg
                        className={s.icon_del}
                        xmlns="http://www.w3.org/2000/svg"
                        width="7" height="7" viewBox="0 0 7 7" fill="none" style={{ cursor: 'pointer' }}
                        onClick={() => { setSelectedDistrict('') }}
                    >
                        <path d="M1.09106 0.5L6.09106 6.5" stroke="#403C3A" />
                        <path d="M6.07959 0.490448L1.10263 6.50957" stroke="#403C3A" />
                    </svg> */}
                    <select
                        name="select-district" className={`select-district ${s.select_city}`}
                        placeholder='hihi'
                        value={selectedDistric}
                        onChange={handleChangeDistrict}
                    >
                        {listDistrict?.map((item: any, index: any) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                </div>
                <button className={s.btn_search} onClick={handleSearch} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                        <path d="M17.8769 16.8619L20.6843 19.6679C20.8152 19.8034 20.8877 19.985 20.886 20.1734C20.8844 20.3619 20.8088 20.5422 20.6755 20.6754C20.5423 20.8087 20.362 20.8843 20.1736 20.8859C19.9851 20.8876 19.8035 20.8151 19.668 20.6842L16.8606 17.8767C15.026 19.4486 12.6539 20.2487 10.242 20.1093C7.8302 19.9699 5.56611 18.9017 3.92485 17.129C2.28359 15.3563 1.39274 13.0167 1.43923 10.6013C1.48573 8.18589 2.46595 5.88237 4.17422 4.1741C5.88249 2.46583 8.18601 1.48561 10.6014 1.43911C13.0168 1.39262 15.3564 2.28347 17.1291 3.92473C18.9019 5.56599 19.97 7.83008 20.1094 10.2419C20.2488 12.6537 19.4487 15.0258 17.8769 16.8604V16.8619ZM10.7814 18.6875C12.8782 18.6875 14.8892 17.8545 16.3719 16.3718C17.8546 14.8891 18.6876 12.8781 18.6876 10.7812C18.6876 8.68438 17.8546 6.67339 16.3719 5.19068C14.8892 3.70797 12.8782 2.87499 10.7814 2.87499C8.6845 2.87499 6.67351 3.70797 5.1908 5.19068C3.70809 6.67339 2.87512 8.68438 2.87512 10.7812C2.87512 12.8781 3.70809 14.8891 5.1908 16.3718C6.67351 17.8545 8.6845 18.6875 10.7814 18.6875Z" fill="white" />
                    </svg>
                    <p> Tìm kiếm</p>
                </button>
            </div >
            <div className={s.box_content}>
                <p className={s.title}>Không tìm thấy trang mà bạn đã yêu cầu</p>
                <p className={s.description}>Chúng tôi có hơn <span className={s.num}>2000 </span>tin tuyển dụng hấp dẫn khác dành cho bạn
                    vui lòng sử dụng chức năng tìm kiếm bên trên để lựa chọn việc làm phù hợp</p>
                <div className={s.box_img}>
                    <Image height={373} width={375} src="/images/404.png" alt="" />
                </div>
            </div>

            <Footer />
        </>
    )
}

export default NotFound
