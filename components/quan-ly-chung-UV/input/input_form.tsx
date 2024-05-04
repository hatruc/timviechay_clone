import { Controller } from "react-hook-form";
import s from "./input_form.module.scss";
import { DatePicker } from "antd";
const Input_form = ({
  control,
  errors,
  input_title,
  key_input,
  default_value,
  uniqe = true,
  left_50,
  right_50,
  disable = false,
  type = "text",
}: any) => {
  let placeholderNew: any;
  let rules: any = {
    required: `Vui lòng nhập ${input_title.toLowerCase()}`,
  };

  if (
    key_input === "sdt" ||
    key_input === "phone" ||
    key_input === "sdt_contact"
  ) {
    rules.pattern = {
      value: /^[0-9]{10}$/,
      message: "Số điện thoại không hợp lệ",
    };
    placeholderNew = "Nhập số điện thoại";
  } else if (key_input === "position") {
    placeholderNew =
      "Ví dụ: Nhân viên kinh doanh, Nhân viên hành chính nhân sự";
  } else if (key_input === "address") {
    placeholderNew = "Bạn vui lòng nhập địa chỉ làm việc chi tiết";
  } else if (key_input === "quanlity") {
    placeholderNew = "Nhập số lượng";
  } else if (key_input == "trial_time") {
    placeholderNew = "Ví dụ: 3 tuần, 5 tuần, ...";
  } else if (key_input == "commission") {
    placeholderNew = "Ví dụ: 25%, 35%, ...";
  } else if (key_input == "job_desc") {
    placeholderNew = "- Tiêu đề cho vị trí công việc cần tuyển dụng là gì?";
  } else if (key_input == "job_required") {
    placeholderNew = "- Trách nhiệm của nhân viên là gì?";
  } else if (key_input == "benefits") {
    placeholderNew = "Nhập địa chỉ công ty";
  } else if (key_input == "user_contact") {
    placeholderNew = "- Chế độ lương thưởng, đãi ngộ";
  } else if (key_input == "forms") {
    placeholderNew = "- Đơn xin việc";
  } else if (key_input == "name") {
    placeholderNew = "Nhập tên";
  } else if (key_input == "address_contact") {
    placeholderNew = "Nhập địa chỉ";
  } else if (key_input == "email") {
    placeholderNew = "Nhập email";
  }
  return (
    <div
      className={`${s.form_reg} ${left_50 && s.reg_left_50} ${
        right_50 && s.reg_right_50
      }`}
    >
      <label htmlFor={key_input} className={s.form_title}>
        {input_title + " "}
        {uniqe && <span className={s.red_star}>*</span>}
      </label>
      <Controller
        name={key_input}
        control={control}
        rules={uniqe && rules}
        defaultValue={default_value}
        render={({ field }) => (
          <>
            <input
              id={key_input}
              type={type}
              {...field}
              disabled={disable}
              className={`${s.form_control}`}
              placeholder={placeholderNew}
            />
            {errors[`${key_input}`] &&
              typeof errors[`${key_input}`].message === "string" && (
                <span className={s.text_error}>
                  {errors[`${key_input}`].message}
                </span>
              )}
          </>
        )}
      />
    </div>
  );
};

export default Input_form;
