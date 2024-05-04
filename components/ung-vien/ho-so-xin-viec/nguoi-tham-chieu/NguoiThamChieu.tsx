import { POST, POSTCUSTOM } from '@/pages/api/base-api';
import s from './NguoiThamChieu.module.scss';
import { getAllCity, useForm } from '@/functions/functions';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';

interface NguoiThamChieuProps {
    dataReference: any,
    handleRefreshData: () => void
}
const NguoiThamChieu:React.FC<NguoiThamChieuProps> = ({dataReference, handleRefreshData }) => {
    const { handleSubmit, handleChange, error_message, formFields } = useForm();
    const [cityAll, setCityAll] = useState<any>();
    const [isLoading, setIsLoading] = useState<any>(false);

   
    const getUser = async (data: any) => {
        formFields.ho_ten = data?.id_user
        formFields.email = data?.email
        formFields.position = data?.id_thamchieu
        formFields.sdt = data?.sdt
        formFields.company = data?.company
    };
    const getCityAll = async () => {
        // const res = await POST("new/getCity", {});
        // if (res?.message === "success") {
        //   setCityAll(res.data);
        // }
        setCityAll(getAllCity())
      };

    const handleSubmitChange = async (data: any) => {
        setIsLoading(true);
        // e.preventDefault();
        const getId = Cookies.get('id');
        const postReference = await POSTCUSTOM('candidate/CompleteProfileUV_NTC', {
            id_thamchieu: getId,
            ho_ten : formFields.ho_ten,
            email : formFields.email,
            position : formFields.position,
            sdt : formFields.sdt,
            company : formFields.company
        });
        if(postReference?.data?.result) {
            alert('Cập nhật thành công.');
            await handleRefreshData();
            setIsLoading(false);
        }
        else {
            setIsLoading(false);
            alert('Vui lòng kiểm tra các trường và thử lại.')
        }
      };

      useEffect(() => {
        getCityAll();
        getUser(dataReference);
    }, [])

    useEffect(() => {
        getUser(dataReference)
    }, [dataReference] )
    
    return (<>
        <div className={s.body}>
            <div className={s.container}>
                <div className={s.title}>
                    <div className={s.title_1}>
                    NGƯỜI THAM CHIẾU
                    </div>
                    <div className={s.title_2}>
                    </div>
                </div>
                <div className={s.form}>
                    <div className={s.form_input}>
                        <label htmlFor="ho_ten">Tên người tham chiếu <span style={{ color: "red" }}>*</span></label>
                        <div className={s.form_input_div}><input className={s.input} value={formFields.ho_ten} placeholder='Nhập tên người tham chiếu' name='ho_ten' onChange={(e) => handleChange({ e, null: false })} ></input></div>
                        {error_message("ho_ten")}
                    </div>
                    <div className={s.form_input}>
                        <label htmlFor="email">Email <span style={{ color: "red" }}>*</span></label>
                        <div className={s.form_input_div}><input className={s.input} value={formFields.email} placeholder='Nhập email' name='email' onChange={(e) => handleChange({ e, null: false })}></input></div>
                        {error_message("email")}
                    </div>
                    <div className={s.form_input}>
                        <label htmlFor="position">Chức danh <span style={{ color: "red" }}>*</span></label>
                        <div className={s.form_input_div}><input className={s.input} value={formFields.position} placeholder='Nhập chức danh' name='position' onChange={(e) => handleChange({ e, null: false })}></input></div>
                        {error_message("position")}
                    </div>
                    <div className={s.form_input}>
                        <label htmlFor="sdt">Số điện thoại <span style={{ color: "red" }}>*</span></label>
                        <div className={s.form_input_div}><input className={s.input} value={formFields.sdt} placeholder='Nhập số điện thoại' name='sdt' onChange={(e) => handleChange({ e, null: false })}></input></div>
                        {error_message("sdt")}
                    </div>
                    <div className={s.form_input} style={{width:"100%"}}>
                        <label htmlFor="company">Tên công ty <span style={{ color: "red" }}>*</span></label>
                        <div className={s.form_input_div}><input className={s.input} value={formFields.company} placeholder='Nhập tên công ty' name='company' onChange={(e) => handleChange({ e, null: false })}></input></div>
                        {error_message("company")}
                    </div>
                </div>
                <button
           disabled={isLoading}
            type="submit"
            className={s.btn_submit}
            onClick={(e) => handleSubmitChange(e)}
          >
            {
             isLoading ?  <Spin/> : 'Cập nhật'
           } 
          </button>
            </div>
        </div>

    </>)
}
export default NguoiThamChieu