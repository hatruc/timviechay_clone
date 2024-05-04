import React from "react";
import s from "./changeInfor.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ChangeEmail from "./ChangeEmail";
import ChangePassWord from "./ChangePassWord";
import Cookies from "js-cookie";

type LoginFormInputs = {
  username: string;
  password: string;
};

type ChangePassInputs = {
  oldpass: string,
  newpass: string,
  confirmnewpass: string,
}

const ChangeInfor = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();
  
  
  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
  };
  return (
    <div className={s.admin__change_infor}>
      {/* change email */}
      <div className={s.admin__left}>
        <p className={s.title}>Thay đổi email</p>
        <ChangeEmail/>
      </div>
      {/* change password */}
      <div className={s.admin__right}>
        <p className={s.title}>Thay đổi mật khẩu</p>
         <ChangePassWord/>             
      </div>
    </div>
  );
};

export default ChangeInfor;
