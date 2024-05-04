import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
import s from "@/components/admin/ung-vien/style.module.scss";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { getDate  } from '@/functions/functions';
import { Input } from 'antd';


export type LoginFormInputs = {
    point_usc: any,
    // point: any,
    day_end: string
}
export interface EditItemProps {
    action: () => void
}

export const EditItem: React.FC<EditItemProps> = ({ action }) => {
    const { token, afterUpdate, changeDetailAfterUpdate, pointEdit, changePointEdit } = useContext(NTD_UV_Context);
    const {
        watch, control, handleSubmit, formState: { errors }, setValue
    } = useForm<LoginFormInputs>();
    const [dataDetail, setDataDetail] = useState<any>();
    const [dateEnd, setDateEnd] = useState<string>()
    const formatDate = (dateString: string): string => {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      };

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data: any) => {
        const dayEndValue = watch("day_end");
        console.log('day_end', dayEndValue, dataDetail.day_end);
        try {
            const post = await axios.post(process.env.NEXT_PUBLIC_BASE_URL_API + "/admin/EditPointCompany", {
                usc_id: dataDetail?.usc_id,
                point_usc: data.point_usc ? data.point_usc : dataDetail.point_usc ,
                // point: data?.point ? Number(data?.point)  : Number(dataDetail?.point),
                day_end: dayEndValue  ? dayEndValue : dataDetail.day_end
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (post.data.data.result) {
                changeDetailAfterUpdate({
                    currentNumberSidebar: 52,
                  });
                  changePointEdit({
                    idDetailItem: 0,
                    edit: 0
                  })
            }
        } catch (err) {
            console.log(err);
        }
    };


    const getPointDetail = async (id: any) => {
        const post = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/DetailPointCompany`,
          {
            usc_id: id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );
        if (post?.data.data.result) {
          setDataDetail(post.data.data.data);
        }
      };


    const resetFields = () => {
        setValue("point_usc", dataDetail?.point_usc);
        setValue("day_end", formatDate(getDate(dataDetail?.day_end)));
        // setValue("point", formatDate(getDate(dataDetail?.point)));
      };

    useEffect(() => {
        getPointDetail(pointEdit.idDetailItem);
    }, []); 
    return (
        <>
            {dataDetail && 
            <div>
                <div
                style={{
                    width: "100%",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: '50px'
                }}
            >
                <span>Những ô dấu sao (*) là bắt buộc phải nhập.</span>

                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    {/* <Controller
                        name="point"
                        control={control}
                        rules={{
                          required: dataDetail?.point > 0 ? false :true
                        }}
                        render={({ field }) => (
                            <div className={s.input}>
                                <p>
                                    <span>*</span>Nhập điểm cộng hằng ngày :
                                </p>
                                <Input defaultValue={dataDetail?.point} type="text" placeholder="" {...field} />
                            </div>
                        )} /> */}
                    <Controller
                        name="point_usc"
                        control={control}
                        render={({ field }) => (
                            <div className={s.input}>
                                <p>
                                    Nhập điểm :
                                </p>
                                <Input defaultValue={dataDetail?.point_usc > 0 ? dataDetail?.point_usc : ''} type="text" placeholder="" {...field} />
                            </div>
                        )} />
                    <Controller
                        name="day_end"
                        control={control}
                        rules={{
                            required: dataDetail.day_end ? false : true
                        }}
                        render={({ field }) => (
                            <div className={s.input}>
                                <p>
                                    <span>*</span> Ngày hết hạn :
                                </p>
                                <Input defaultValue={dataDetail?.day_end ? formatDate(getDate(dataDetail?.day_end)) : 0} type="date"
                                    {...field} />
                            </div>
                        )} />

                    <div className={s.btns_add}>
                        <button type="submit" className={`${s.update}`}>
                            Cập nhật
                        </button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            resetFields();
                        }}>Làm lại</button>
                    </div>
                </form>
            </div>
            </div>}
        </>
    );
};
