import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import * as data from '@/components/nha-tuyen-dung/danh-sach-tin-tuyen-dung/data.js';
import Blog from '@/components/ung-vien/danh-sach-ung-vien/blog';
import AIGoiYUngVien from '@/components/ung-vien/danh-sach-ung-vien/body/AIGoiYUngVien';
import BodyListCandi from '@/components/ung-vien/danh-sach-ung-vien/body/BodyListCandi';
import Search from "@/components/ung-vien/danh-sach-ung-vien/search/index";
import TuKhoaLienQuan from '@/components/ung-vien/danh-sach-ung-vien/tu-khoa-lien-quan';
import { array_muc_luong, city_array, getAllCity, getDistrict, getJob, getKeyTag, getKeyTagUV, getKinhNghiem, getList, getTokenServerSide, listHinhThucFilter, listHocVanFilter, listKinhNghiemFilter, listMucLuongFilter } from '@/functions/functions';
import { GetServerSideProps, NextPage, NextPageContext } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { POST, POST_SERVER } from '../api/base-api';
import { useRouter } from "next/router";

export const getServerSideProps = async (context: NextPageContext) => {
    const token = getTokenServerSide(context)
    // Tỉnh thành
    let listCity = [
        { value: "0", label: "Toàn quốc" },
        ...getAllCity()
    ]

    // Ngành nghề
    let listJob = [
        { value: "0", label: "Tất cả ngành nghề" },
        ...getJob(),
    ]

    // UV
    // Lấy những trường đã có ở trên url và truyền vào 
    const city = context.query.city
    const district = context.query.district
    const hinhThuc = context.query.hinhThuc
    const capBac = context.query.capBac
    const kinhNghiem = context.query.kinhNghiem
    const mucLuong = context.query.mucLuong
    const keywords = context.query.keywords
    const catid = context.query.catid

    const formData = {
        city: Number(city) && Number(city) !== 0 ? city : null,
        district: Number(district) && Number(district) !== 0 ? district : null,
        hinhThuc: Number(hinhThuc) && Number(hinhThuc) !== 0 ? hinhThuc : null,
        capBac: Number(capBac) && Number(capBac) !== -1 ? capBac : null,
        kinhNghiem: Number(kinhNghiem) && Number(kinhNghiem) !== -1 ? kinhNghiem : null,
        mucLuong: Number(mucLuong) && Number(mucLuong) !== 0 ? mucLuong : null,
        keywords: keywords && typeof keywords === 'string' && keywords.trim() ? `${keywords}`.trim() : null,
        catid: Number(catid) && Number(catid) !== 0 ? catid : null,
        page: 1,
        perPage: 10,
    }

    const result = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_NEW}/new/SearchCandi`, formData, token)
    // console.log(result)
    if (result?.result) {
        return {
            props: {
                fetchData: result?.data,
                totalData: result?.total,
                city: listCity,
                job: listJob,
                preFormData: formData,
            }
        }
    } else {
        return {
            props: {
                fetchData: [],
                totalData: 0,
                city: listCity,
                job: listJob,
                preFormData: {},
            }
        }
    }
}

interface pageProps {
    fetchData: [],
    totalData: number,
    city: any[],
    job: any[]
}

interface UV_Type {
    name: string,
    avatar: string,
    work_name: string,
    address: string,
    experience: string,
    online: string,
    id: string | number,
    checkSave: string,
}



const DanhSachUngVien: NextPage<{ fetchData: any, totalData: any, city: any, job: any, preFormData: any }> =
    ({
        fetchData, totalData, city, job, preFormData
    }) => {
        // console.log(fetchData, totalData, city, job)
        const [total, setTotal] = useState(totalData);
        const [totalHuyHieu, setTotalHuyHieu] = useState(0);
        const [listDistrict, setListDistrict] = useState<any>([]);
        const [listCity, setListCity] = useState(city);
        const [listJob, setListJob] = useState(job);
        const [listExp, setListExp] = useState([{ value: "-1", label: "Tất cả kinh nghiệm" }, ...listKinhNghiemFilter]);
        const [listSalary, setListSalary] = useState(listMucLuongFilter);
        const [listLevel, setListLevel] = useState(listHocVanFilter);
        const [listWorkForm, setWorkForm] = useState(listHinhThucFilter);
        const [keyTag, setKeyTag] = useState(getKeyTagUV());
        const [contentBlog, setContentBlog] = useState(data.contentBlog);
        const [dataUv, setDataUv] = useState<UV_Type[]>([])
        const [page, setPage] = useState(1)
        const [perPage, setPerPage] = useState(20)
        const router = useRouter()

        useEffect(() => {
            setDataUv(fetchData.map((data: any) => {
                return fetchType_UVType(data)
            }))
        }, [fetchData])

        const handleSearch = async (keyword: any, selectCity: any, selectDistrict: any, selectJob: any, selectExp: any, selectSalary: any, selectLevel: any, selectWorkForm: any) => {
            // console.log(
            //     "key:", keyword,
            //     "selectDistrict:", selectDistrict,
            //     "selectCity:", selectCity,
            //     "selectJob:", selectJob,
            //     "selectExp:", selectExp,
            //     "selectSalary:", selectSalary,
            //     "selectLevel:", selectLevel,
            //     "selectWorkForm:", selectWorkForm
            // );
            // setTotal(3209);
            // setTotalHuyHieu(49);

            let pageSize = page === 1 ? perPage : perPage * page

            const formData = {
                city: Number(selectCity) !== 0 ? selectCity : null,
                district: Number(selectDistrict) !== 0 ? selectDistrict : null,
                hinhThuc: Number(selectWorkForm) !== 0 ? selectWorkForm : null,
                capBac: Number(selectLevel) !== -1 ? selectLevel : null,
                kinhNghiem: Number(selectExp) !== -1 ? selectExp : null,
                mucLuong: Number(selectSalary) !== 0 ? selectSalary : null,
                keywords: keyword && typeof keyword === 'string' && keyword.trim() ? `${keyword}`.trim() : null,
                catid: Number(selectJob) !== 0 ? selectJob : null,
                page: 1,
                pageSize: pageSize
            }

            const result = await POST('new/SearchCandi', formData)
            if (result?.result) {
                setTotal(result?.total)
                // if (page === 1) {
                //     setDataUv(result?.data.map((data: any) => {
                //         return fetchType_UVType(data)
                //     }))
                // } else {
                //     setDataUv(prev => [...prev, ...result?.data.map((data: any) => {
                //         return fetchType_UVType(data)
                //     })])
                // }
                    setDataUv(result?.data.map((data: any) => {
                        return fetchType_UVType(data)
                    }))
            }

            // Thay đường dẫn 
            let query: any = {}
            formData?.city && (query.city = formData?.city)
            formData?.district && (query.district = formData?.district)
            formData?.hinhThuc && (query.hinhThuc = formData?.hinhThuc)
            formData?.capBac && (query.capBac = formData?.capBac)
            formData?.kinhNghiem && (query.kinhNghiem = formData?.kinhNghiem)
            formData?.mucLuong && (query.mucLuong = formData?.mucLuong)
            formData?.keywords && (query.keywords = formData?.keywords)
            formData?.catid && (query.catid = formData?.catid)
            
            router.replace({
                pathname: '/ung-vien-tim-viec',
                query: query
            }, 
            undefined,
            {
                shallow: true
            })
        }

        const fetchType_UVType = (data: any) => {
            return {
                name: data?.use_name || 'Chưa cập nhật',
                // address: listCity.find((city: any) => data?.use_city > 0 && city.value === data?.use_city)?.label || 'Chưa cập nhật',
                address: data?.use_city_job.join(', '),
                avatar: data?.use_logo || "/images/candidate/avatar-candidate.png",
                experience: getKinhNghiem(data?.exp_years || 0),
                online: data?.is_login ? 'Online' : 'Offline',
                work_name: data?.use_job_name || 'Chưa cập nhật',
                id: data?.use_id || 0,
                checkSave: `${data?.checkSave}`,
            }
        }

        const handleDistrict = (city_id: number) => {
            if(city_id) {
                setListDistrict(getDistrict(city_id))
            } else {
                setListDistrict([])
            }
        }

        const handleSearchMore = async () => {
            setPage(prev => prev + 1)
        }

        return (
            <>
                <Header></Header>
                <Search
                    onClickSearch={handleSearch}
                    // onClickSearch={searchCallback}
                    total={total}
                    totalHuyHieu={totalHuyHieu}
                    listCity={listCity}
                    listDistrict={listDistrict}
                    listJob={listJob}
                    listExp={listExp}
                    listSalary={listSalary}
                    listLevel={listLevel}
                    listWorkForm={listWorkForm}
                    handleDistrict={handleDistrict}
                    page={page}
                    setPage={setPage}
                    preFormData={preFormData}
                />
                <BodyListCandi
                    data_ung_vien={dataUv}
                    loadMore={handleSearchMore}
                ></BodyListCandi>
                {/* <AIGoiYUngVien></AIGoiYUngVien> */}
                <TuKhoaLienQuan keyTag={keyTag} />
                {/* <Blog contentBlog={contentBlog} /> */}
                <Footer></Footer>
            </>
        )
    }

export default DanhSachUngVien;