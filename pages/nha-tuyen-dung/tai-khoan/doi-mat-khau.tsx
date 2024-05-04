import Box_container from "@/components/quan-ly-chung-NTD/Box_container";
import Temp_comp from "@/components/quan-ly-chung-NTD/Temp_comp";
import React, { useState } from "react";
import s from "./change_pass.module.scss";
import {
  ShowPassword,
  HiddenPassword
} from "@/public/images/nha-tuyen-dung/quan-ly-tai-khoan/index";
import { POST } from "@/pages/api/base-api";
import { useRouter } from "next/router";
const Repass = () => {
  const router = useRouter();
  const [isPasswordOldVisible, setPasswordOldVisibility] = useState(false);
  const togglePasswordOldVisibility = () => {
    setPasswordOldVisibility(!isPasswordOldVisible);
  };
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  const [isRePasswordVisible, setRePasswordVisibility] = useState(false);
  const toggleRePasswordVisibility = () => {
    setRePasswordVisibility(!isRePasswordVisible);
  };
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");

  const handleCurrentPasswordChange = (e: any) => {
    setCurrentPassword(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const submitData = async (e: any) => {
    e.preventDefault();
    try {
      const changePass = await POST("user/UpdatePasswordEmployers", {
        passwordOld: currentPassword,
        password: password,
        rePassword: rePassword,
        type: 2
      });
      if (changePass?.result) {
        router.push("/nha-tuyen-dung/quan-ly-chung");
        alert("Bạn đã update thành công.");
      } else {
        alert("Vui lòng kiểm tra và thử lại.");
      }
    } catch (error) {
      alert("Vui lòng kiểm tra và thử lại.");
    }
  };

  const handleChangePrePassWord = (e: any) => {
    setCurrentPassword(e.target.value);
  };

  const handleRePasswordChange = (e: any) => {
    setRePassword(e.target.value);
    if (e.target.value !== password) {
      setRePasswordError("Mật khẩu không khớp");
    } else {
      setRePasswordError("");
    }
  };

  const handlePasswordChangeBtn = async () => {
    if (password && rePassword && currentPassword) {
      if (password === rePassword) {
        const response = await POST("user/UpdatePasswordEmployers", {
          passwordOld: currentPassword,
          password,
          rePassword,
          type: 2
        });
        if (response.result) {
          alert(response.message);
          router.push("/nha-tuyen-dung/quan-ly-chung");
        } else {
          alert(response.message);
        }
      } else {
        alert("Vui lòng nhập lại chính xác mật khẩu mới!");
      }
    } else {
      alert("Vui lòng nhập đủ các trường thông tin!");
    }
  };

  const handlePressEnterPasswordChange = async (e: any) => {
    if (e.keyCode === 13) {
      if (password && rePassword && currentPassword) {
        if (password === rePassword) {
          const response = await POST("user/UpdatePasswordEmployers", {
            passwordOld: currentPassword,
            password,
            rePassword,
            type: 2
          });
          if (response.result) {
            alert(response.message);
            router.push("/nha-tuyen-dung/quan-ly-chung");
          } else {
            alert(response.message);
          }
        } else {
          alert("Vui lòng nhập lại chính xác mật khẩu mới!");
        }
      } else {
        alert("Vui lòng nhập đủ các trường thông tin!");
      }
    }
  };

  const handleCancelPasswordChange = () => {
    setCurrentPassword("");
    setPassword("");
    setRePassword("");
    router.push("/nha-tuyen-dung/quan-ly-chung");
  };

  return (
    <Temp_comp>
      <Box_container title="ĐỔI MẬT KHẨU">
        <div className={s.box_container_changepass}>
          <div className={s.box_container}>
            <div className={s.group_input}>
              <div className={s.container_label}>
                <label>Mật khẩu hiện tại</label>
                <span>*</span>
              </div>
              <input
                value={currentPassword}
                type={isPasswordOldVisible ? "text" : "password"}
                placeholder="Nhập mật khẩu mới"
                className={s.container_input}
                onChange={handleCurrentPasswordChange}
                onKeyUp={handlePressEnterPasswordChange}
              />
              {isPasswordOldVisible ? (
                <div onClick={togglePasswordOldVisibility}>
                  <ShowPassword className={s.icon_eye} />
                </div>
              ) : (
                <div onClick={togglePasswordOldVisibility}>
                  <HiddenPassword className={s.icon_eye_close} />
                </div>
              )}
            </div>
            <div className={s.group_input}>
              <div className={s.container_label}>
                <label>Nhập mật khẩu mới</label>
                <span>*</span>
              </div>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Nhập mật khẩu mới"
                className={s.container_input}
                value={password}
                onChange={handlePasswordChange}
                onKeyUp={handlePressEnterPasswordChange}
              />
              {passwordError && (
                <div className={s.error_message}>{passwordError}</div>
              )}
              {isPasswordVisible ? (
                <div onClick={togglePasswordVisibility}>
                  <ShowPassword className={s.icon_eye} />
                </div>
              ) : (
                <div onClick={togglePasswordVisibility}>
                  <HiddenPassword className={s.icon_eye_close} />
                </div>
              )}
            </div>
            <div className={s.group_input}>
              <div className={s.container_label}>
                <label>Nhập lại mật khẩu mới</label>
                <span>*</span>
              </div>
              <input
                type={isRePasswordVisible ? "text" : "password"}
                placeholder="Nhập lại mật khẩu mới"
                className={s.container_input}
                value={rePassword}
                onChange={handleRePasswordChange}
                onKeyUp={handlePressEnterPasswordChange}
              />
              {rePasswordError && (
                <div className={s.error_message}>{rePasswordError}</div>
              )}

              {isRePasswordVisible ? (
                <div onClick={toggleRePasswordVisibility}>
                  <ShowPassword className={s.icon_eye} />
                </div>
              ) : (
                <div onClick={toggleRePasswordVisibility}>
                  <HiddenPassword className={s.icon_eye_close} />
                </div>
              )}
            </div>
            <div className={s.box_confirm}>
              <button onClick={handlePasswordChangeBtn} className={s.confirm}>
                Đổi mật khẩu
              </button>
              <button onClick={handleCancelPasswordChange} className={s.cancle}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      </Box_container>
    </Temp_comp>
  );
};

export default Repass;
