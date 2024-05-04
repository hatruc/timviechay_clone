import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import s from './changeInfor.module.scss'
import ButtonAdmin from "../button/button";

type ChangePassInputs = {
  oldpass: string;
  newpass: string;
  confirmnewpass: string;
};

const ChangePassWord = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePassInputs>();
  const onSubmit: SubmitHandler<ChangePassInputs> = (data) => {
    console.log(data);
  };
  return (
    <div className={s.box_form}>
      <form className={`${s.form}`} onSubmit={handleSubmit(onSubmit)}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <span className={s.input}>Mật khẩu cũ:</span>
          <Controller
            name="oldpass"
            control={control}
            defaultValue=""

            rules={{
              required: "Vui lòng nhập tên đăng nhập"
            }}
            render={({ field }) => (
              <>
                <input
                  type="password"
                  className={``}
                  placeholder="Mật khẩu hiện tại"
                  {...field}
                />
                {/* {errors.username &&
                  typeof errors.username?.message === "string" && (
                    <span className={s.text_error}>
                      {errors.username?.message}
                    </span>
                  )} */}
              </>
            )}
          />
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <span className={s.input}>Mật khẩu mới:</span>
          <Controller
            name="newpass"
            control={control}
            defaultValue=""
            rules={{
              required: "Vui lòng nhập tên đăng nhập"
            }}
            render={({ field }) => (
              <>
                <input
                  type="password"
                  className={``}
                  placeholder="Mật khẩu mới"
                  {...field}
                />
                {/* {errors.username &&
                  typeof errors.username?.message === "string" && (
                    <span className={s.text_error}>
                      {errors.username?.message}
                    </span>
                  )} */}
              </>
            )}
          />
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <span className={s.input}>Nhập lại mật khẩu mới:</span>
          <Controller
            name="confirmnewpass"
            control={control}
            defaultValue=""
            rules={{
              required: "Vui lòng nhập tên đăng nhập"
            }}
            render={({ field }) => (
              <>
                <input
                  type="password"
                  className={``}
                  placeholder="Xác nhận mật khẩu mới"
                  {...field}
                />
                {/* {errors.confirmnewpass &&
                  typeof errors.confirmnewpass?.message === "string" && (
                    <span className={s.text_error}>
                      {errors.username?.message}
                    </span>
                  )} */}
              </>
            )}
          />
        </div>
         <div className={s.btns_action}>
          <ButtonAdmin text={"Cập nhật"} action={() => { } } className={s.btn_update} classText={s.btn_text}/>
          <ButtonAdmin text={"Làm lại"} action={() => { } } className={s.btn_update} classText={s.btn_text}/>
          </div>
      </form>
    </div>
  );
};

export default ChangePassWord;
