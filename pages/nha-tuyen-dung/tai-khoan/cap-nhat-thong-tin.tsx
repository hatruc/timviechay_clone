/* eslint-disable @next/next/no-img-element */
'use client'
import Box_container from '@/components/quan-ly-chung-NTD/Box_container'
import Temp_comp from '@/components/quan-ly-chung-NTD/Temp_comp'
import Date_form from '@/components/quan-ly-chung-NTD/account/date_form'
import Input_form from '@/components/quan-ly-chung-NTD/account/input_form'
import Pass_input from '@/components/quan-ly-chung-NTD/account/pass_input'
import Select_form from '@/components/quan-ly-chung-NTD/account/select_form'
import Textarea from '@/components/quan-ly-chung-NTD/account/textarea'
import { useRouter } from 'next/router';
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { array_quy_mo_com, getAllCity, getDistrict, getJob, getList } from "@/functions/functions"
import { POST } from '@/pages/api/base-api'
import s from './update_info.module.scss'
import Upload_img_ntd from '@/components/common/upload_img_ntd'
import Cookies from "js-cookie";
import { Spin } from 'antd';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context'

const optionQuymo = getList(array_quy_mo_com)
const optionCity = getAllCity()
const optionJob = getJob()

const Update_info = () => {
    const { changeAva, changeName, name, ava } = useContext(NTD_UV_Context)
    const router = useRouter();
    const [valueT, setValueT] = useState('')
    const [avatar, setAvatar] = useState('');
    const [avatarApi, setAvatarApi] = useState<any>('');
    const [submitting, setSubmitting] = useState(false)
    const [info, setInfo] = useState<any>()
    const [date, setDate] = useState<any>();
    const [district, setListDistrict] = useState<any>();

    async function fetchData() {
        const id = Cookies.get('id');
        try {
            const response = await POST('ntd/DetailNTD', { id })
            // console.log(response)
            setInfo(response?.data)
            const date = new Date(response?.data?.usc_create_time)
            let month = date.getMonth() + 1
            let day = date.getDate()
            setDate(`${date?.getFullYear()}-${month <= 9 ? `0${month}` : month}-${day <= 9 ? `0${day}` : day}`)
        } catch (error) {
            alert('Có lỗi xảy ra vui lòng thử lại')
            router.push('/nha-tuyen-dung/quan-ly-chung');
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    // lưu thông tin sau cập nhật vào context
    useEffect(() => {
        changeName(info?.usc_company)
        changeAva(info?.usc_logo)
    }, [info])

    // xử lý upload ảnh
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                alert('Chỉ cho phép tải lên các tệp tin ảnh dạng (jpg, jpeg, png, gif)');
                event.target.value = '';
            } else {
                const imageUrl = URL.createObjectURL(file);
                // console.log(imageUrl)
                setAvatar(imageUrl);
                setAvatarApi(file)
            }
        }
    };
    const { handleSubmit, control, register, formState, setError, getValues, setValue } = useForm({});
    // Xử lý ảnh
    const [parentImages, setParentImages] = useState<any[]>([]);
    const handleImagesChange = (newImages: any[]) => {
        setParentImages(newImages);
    };

    // submit  
    const onSubmit = async (data: any) => {
        setSubmitting(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let existImage = ''
        let Image: any[] = []
        parentImages?.forEach((image: any) => {
            if (image.file) {
                Image.push(image.file)
            } else {
                existImage ? existImage += `,${image.imageUrl}` : existImage = image.imageUrl
            }
        })
        const data1 = {
            ...data,
            inforCompany: valueT,
            Logo: avatarApi,
            Image,
            existImage
        }
        // console.log(data1)
        console.log('>>> check data: ', info);
        const response = await POST('user/UpdateInfoEmployers', data1)
        // console.log('>>> check data NTD: ', response)
        if (response?.result) {
            alert('Cập nhật thành công')
            await fetchData()

            router.push('/nha-tuyen-dung/quan-ly-chung');
        } else {
            if (response?.message?.nameCompany) {
                alert(`${response.message.nameCompany}`)
            } else {
                if (typeof response?.message === 'object' && Object.keys(response?.message).length > 0) {
                    const key = Object.keys(response?.message)[0]
                    alert(response?.message[key])
                }
            }
        }
        setSubmitting(false)
    };

    useEffect(() => {
        const handleKeyUp = (event: any) => {
            if (event.key === 'Enter') {
                if (!submitting) {
                    handleSubmit(onSubmit)
                }
            }
        };
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        if (info?.usc_city) {
            const district = getDistrict(Number(info.usc_city))
            setListDistrict(district)
        }
    }, [info?.usc_city])

    return (
        <Temp_comp>
            <Box_container>
                {
                    info && date &&
                    <form onSubmit={handleSubmit(onSubmit)} className={s.container}  >
                        <div className={s.box_content}>
                            <p className={s.title_info}>
                                Thông tin tài khoản
                            </p>
                            <div className={s.box_info_account}>
                                <div className={s.box_info}>
                                    <div className={s.form_gr}>
                                        <Input_form control={control} errors={formState.errors} disable={true} input_title="Số điện thoại đăng nhập" key_input="" default_value={info?.usc_phone_tk} uniqe={false} />
                                        <Pass_input control={control} errors={formState.errors} default_value="jiiádasdashidfsdf" />
                                    </div>
                                </div>
                                <div className={s.box_avatar}>
                                    {avatar ?
                                        <div className={s.up_avatar}>
                                            <div className={s.box_img_ava}>
                                                <img className={s.avatar} src={avatar} alt='' />
                                            </div>
                                            <label htmlFor="up_avatar" >
                                                <Image height={28} width={28} className={s.nut_up} src={'/images/authorization/avatar.png'} alt='' style={{ cursor: 'pointer' }} />
                                            </label>
                                        </div>
                                        :
                                        <label htmlFor="up_avatar" className={s.box_img_ava}>
                                            <img style={{ borderRadius: '50%' }} src={info?.usc_logo || '/images/authorization/avatar.png'} alt='' />
                                        </label>
                                    }
                                    <input type='file' hidden id='up_avatar' onChange={handleFileChange} accept=".jpg, .jpeg, .png, .gif" />

                                </div>
                            </div>
                            <p className={s.title_info}>
                                Thông tin nhà tuyển dụng
                            </p>
                            <div className={s.box_info_NTD}>
                                <div className={s.form_gr}>
                                    <Input_form control={control} errors={formState.errors} input_title="Tên công ty" key_input="nameCompany" default_value={info?.usc_company} />
                                    <Input_form control={control} errors={formState.errors} input_title="Tổng giám đốc" key_input="usc_boss" default_value={info?.usc_boss} left_50={true} />
                                    <Select_form control={control} errors={formState.errors} select_title='Quy mô công ty' key_select='quyMo'
                                        defaultValue={Number(info?.usc_size) || null} option_arr={optionQuymo} right_50 multiple={false}
                                    />
                                    <Input_form control={control} errors={formState.errors} input_title="Số điện thoại cố định" key_input="phone" default_value={info?.usc_phone} left_50={true} />
                                    <Input_form control={control} errors={formState.errors} input_title="Mã số thuế" key_input="mst" default_value={info?.usc_mst || null} right_50={true} />
                                    <Select_form control={control} errors={formState.errors} select_title='Lĩnh vực hoạt động' key_select='financial_sector'
                                        defaultValue={info?.financial_sector.length === 0 ? null : info?.financial_sector?.map((item: any) => Number(item?.id))}
                                        option_arr={optionJob} left_50 multiple={true}
                                    />
                                    <Date_form control={control} errors={formState.errors} key_date='DateOfIncorporation' date_title="Ngày thành lập" default_value={date} right_50 />
                                    <Input_form control={control} errors={formState.errors} uniqe={false} input_title="Skype" key_input="skype" default_value={info?.usc_skype} left_50={true} />
                                    <Input_form control={control} errors={formState.errors} uniqe={false} input_title="Website" key_input="website" default_value={info?.usc_website} right_50={true} />
                                    <Select_form control={control} errors={formState.errors} select_title='Chọn Tỉnh/Thành phố' defaultValue={Number(info?.usc_city) || null} key_select='city' option_arr={optionCity} left_50 multiple={false} />
                                    <Select_form control={control} errors={formState.errors} select_title='Quận/Huyện' defaultValue={Number(info?.usc_district) || null} key_select='district' option_arr={district} right_50 multiple={false} />
                                    <Input_form control={control} errors={formState.errors} input_title="Địa chỉ công ty" key_input="address" default_value={info?.usc_address} />
                                    <Textarea control={control} errors={formState.errors} type='textarea' input_title="Giới thiệu về công ty" key_input="inforCompany" text={valueT} setText={setValueT} defaut={info?.usc_company_info} />
                                    <Upload_img_ntd arrImage={info?.image_com} onImagesChange={handleImagesChange} />
                                </div>
                            </div>
                            <p className={s.title_info}>
                                Thông tin liên hệ
                            </p>
                            <div className={s.box_contact}>
                                <div className={s.form_gr}>
                                    <Input_form control={control} errors={formState.errors} input_title="Người liên hệ" key_input="nameContact" default_value={info?.usc_name} left_50={true} />
                                    <Input_form control={control} errors={formState.errors} input_title="Địa chỉ liên hệ" key_input="addressContact" default_value={info?.usc_name_add} right_50={true} />
                                    <Input_form control={control} errors={formState.errors} input_title="Số điện thoại liên hệ" key_input="phoneContact" default_value={info?.usc_name_phone} left_50={true} />
                                    <Input_form control={control} errors={formState.errors} type='email' input_title="Email liên hệ" key_input="emailContact" default_value={info?.usc_name_email} right_50={true} />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className={s.confirm_update} disabled={submitting}>
                            {submitting ? <Spin /> : 'Cập nhật '}
                        </button>
                    </form>
                }
            </Box_container >
        </Temp_comp >
    )
}
export default Update_info