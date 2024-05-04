import React from "react";
import { Controller } from "react-hook-form";
import styles from "./input_form.module.scss";

const Textarea = ({ control, errors, input_title, key_input, uniqe=true }: any) => {
  let placeholderNew: any;
  let rules: any = {
    required: `Vui lòng nhập ${input_title.toLowerCase()}`,
  };
  if (key_input == "job_desc") {
    placeholderNew = `- Tiêu đề cho vị trí công việc cần tuyển dụng là gì?
- Mục tiêu của vị trí công việc: “Vị trí này tồn tại để làm gì cho công ty?”
- Các nhiệm vụ chính của vị trí công việc là gì?
- Địa chỉ nơi làm việc
- Nội dung công việc cần thực hiện: ...`;
  } else if (key_input == "job_required") {
    placeholderNew = `- Trách nhiệm của nhân viên cần làm là gì?
- Nhiệm vụ công việc cần thực hiện hàng ngày là gì?
- Những kỹ năng nào cần có để thực hiện công việc tốt nhất?
+ Những kỹ năng bắt buộc (Những kỹ năng cần có là gì?)
+ Những kỹ năng mang tính khuyến khích (Ngoài ra ưng viên có thể đáp ứng những kỹ năng nào để phát triển công việc tốt nhất?)
- Bằng cấp, chứng chỉ phù hợp với công việc
- Yêu cầu về kinh nghiệm, thái độ, phầm chất
- Ngoài ra tùy vào đặc thù công việc tuyển dụng để nêu ra các yêu cầu khác như giới tính, ngoại hình,...`;
  } else if (key_input == "benefits") {
    placeholderNew = `- Chế độ về mức lương, thưởng, chế độ đãi ngộ
- Các chế độ đóng bảo hiểm xã hội và phúc lợi khác của nhân viên cụ thể là gì?
- Môi trường làm việc của công ty hấp dẫn như thế nào? Có thể mang đến những cơ hội học tập, huấn luyện cho ứng viên ra sao?
- Cơ hội thăng tiến của nhân viên là như thế nào?`;
  } else if (key_input == "forms") {
    placeholderNew = `- Đơn xin việc.
- Sơ yếu lý lịch.
- Hộ khẩu, chứng minh nhân dân và giấy khám sức khoẻ.
- Các bằng cấp có liên quan.`;
  } else if (key_input == "yeuCau") {
    placeholderNew = `- Trách nhiệm của nhân viên cần làm là gì?
- Nhiệm vụ công việc cần thực hiện hàng ngày là gì?
- Những kỹ năng nào cần có để thực hiện công việc tốt nhất?
+ Những kỹ năng bắt buộc (Những kỹ năng cần có là gì?)
+ Những kỹ năng mang tính khuyến khích (Ngoài ra ưng viên có thể đáp ứng những kỹ năng nào để phát triển công việc tốt nhất?)
- Bằng cấp, chứng chỉ phù hợp với công việc
- Yêu cầu về kinh nghiệm, thái độ, phầm chất
- Ngoài ra tùy vào đặc thù công việc tuyển dụng để nêu ra các yêu cầu khác như giới tính, ngoại hình,..`
  }
  return (
    <div className={`${styles.form_reg}`}>
      <label htmlFor={key_input} className={styles.form_title}>
        {input_title} <span className={styles.red_star}>*</span>
      </label>
      <Controller
        name={key_input}
        control={control}
        rules={uniqe && rules}
        render={({ field }) => (
          <>
            <textarea
              {...field}
              id={key_input}
              placeholder={placeholderNew}
              className={`${styles.form_control}`}
              style={{ height: "190px" }}
            />
            {errors[`${key_input}`] &&
              typeof errors[`${key_input}`].message === "string" && (
                <span className={styles.text_error}>
                  {errors[`${key_input}`].message}
                </span>
              )}
          </>
        )}
      />
    </div>
  );
};

export default Textarea;
