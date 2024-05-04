import React, { useEffect, useState } from "react";
import s from "./changeInfor.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ButtonAdmin from "../button/button";
import Cookies from "js-cookie";

type EmailFormInputs = {
  username: string;
  email: string;
};

const ChangeEmail = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<EmailFormInputs>();
  const getEmail = Cookies.get('email_admin');
  const [ currentEmail, setCurrentEmail ] = useState('')
  const onSubmit: SubmitHandler<EmailFormInputs> = (data) => {
    console.log(data);
  };
  
  useEffect(() => {
    setCurrentEmail(getEmail as string)
  },[])

  
  return (
    <div className={s.box_form}>
        <form className={`${s.form}`} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <span>Tên đăng nhập:</span>
            <span>admin_test</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span className={s.input}>Email:</span>
            <Controller
              name="email"
              control={control}
              defaultValue={currentEmail}
              rules={{
                required: "Vui lòng nhập tên đăng nhập"
              }}
              render={({ field }) => (
                <>
                  <input
                    type="email"
                    className={``}
                    placeholder="Email"
                    {...field}
                  />
                  {errors.email &&
                    typeof errors.email?.message === "string" && (
                      <span className={s.text_error}>
                        {errors.email?.message}
                      </span>
                    )}
                </>
              )}
            />
          </div>
          <div></div>
          <div className={s.btns_action}>
          <ButtonAdmin text={"Cập nhật"} action={() => { } } className={s.btn_update} classText={s.btn_text}/>
          <ButtonAdmin text={"Làm lại"} action={() => { setCurrentEmail(getEmail as string) } } className={s.btn_update} classText={s.btn_text}/>
          </div>
        </form>
      </div>
  );
};

export default ChangeEmail;
