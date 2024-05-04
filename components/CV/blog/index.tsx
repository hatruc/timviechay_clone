import style from "./styles.module.scss";
import Image from "next/image";
import React, { useState } from "react";

export default function Blog() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={style.blog}>
        <div className={style.content}>
          <p className={style.blog_title}>1. Nghề Business Analyst là gì?</p>
          <p>
            Business Analyst (BA) là chuyên viên phân tích kinh doanh. BA sẽ làm
            việc với hệ thống nhiệm vụ phức tạp, phải có chuyên môn cao để làm
            cầu kết nối giữa dùng công nghệ số:
          </p>
          <ul>
            <li>Đánh giá hiệu quả của quy trình vận hành doanh nghiệp. </li>
            <li>
              Nghiên cứu, đề xuất và các giải pháp cần thiết cho hoạt động kinh
              doanh của doanh nghiệp
            </li>
            <li>
              Phát triển và quản lý, đánh giá và đưa ra phương án cải tiến chất
              lượng của các dự án.{" "}
            </li>
            <li>
              Làm việc với phòng kinh doanh và các cấp lãnh đạo về những thay
              đổi, tác động lên doanh nghiệp.
            </li>
          </ul>
          <p>
            BA đang là ngành có triển vọng khi nền kinh tế và công nghệ số đang
            ngày càng không thể tách rời. Vì vậy, nếu bạn đang theo đuổi vị trí
            Business Analyst và muốn có một khởi đầu với công việc tốt thì nên
            chuẩn bị chiếc TopCV ngành Business Analyst thật chuyên nghiệp.
          </p>
          <div className={style.blog_image}>
            <Image
              src="/images/cv/thu-xin-viec/blog_image.svg"
              width={705}
              height={369}
              alt="chuyên viên BA"
              style={{ width: "705px", height: "369px" }}
            />
            <p>
              Chuyên viên BA đảm nhiệm các công việc liên quan đến dữ liệu để
              phân tích (Nguồn: Internet)
            </p>
          </div>
          {isExpanded && (
            <>
              <p className={style.blog_title}>
                2. Cách viết CV Business Analyst
              </p>
              <p>2.1. Thông tin cá nhân </p>
              <p>2.2. Mục tiêu nghề nghiệp </p>
              <p>2.3. Kinh nghiệm làm việc </p>
              <p>2.4. Kỹ năng </p>
              <p>2.5. Học vấn</p>
              <p className={style.blog_title}>
                3. Mẫu CV xin việc Business Analyst
              </p>
              <p>3.1. CV Business Analyst hiện đại</p>
              <p>3.2. CV Business Analyst basic</p>
              <p>3.3. CV Business Analyst chuyên nghiệp</p>
              <p className={style.blog_title}>
                4. Lưu ý khi viết CV Business Analyst
              </p>
              <div className={style.button_them} onClick={handleExpand}>
                Rút gọn
              </div>
            </>
          )}
          {!isExpanded && (
            <div className={style.button_them} onClick={handleExpand}>
              Xem thêm
            </div>
          )}
        </div>
        <div className={style.appendix}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "50px",
              borderBottom: "1px dashed #3582CD",
            }}
          >
            <p className={style.appendix_title}>MỤC LỤC</p>
          </div>
          <div className={style.appendix_content}>
            <p className={style.appendix_content_title}>
              1. Nghề Business Analyst là gì?
            </p>
            <p className={style.appendix_content_title}>
              2. Cách viết CV Business Analyst
            </p>
            <p>2.1. Thông tin cá nhân</p>
            <p>2.2. Mục tiêu nghề nghiệp</p>
            <p>2.3. Kinh nghiệm làm việc</p>
            <p>2.4. Kỹ năng</p>
            <p>2.5. Học vấn</p>
            <p className={style.appendix_content_title}>
              3. Mẫu CV xin việc Business Analyst
            </p>
            <p>3.1. CV Business Analyst hiện đại</p>
            <p>3.2. CV Business Analyst basic</p>
            <p>3.3. CV Business Analyst chuyên nghiệp</p>
            <p className={style.appendix_content_title}>
              4. Lưu ý khi viết CV Business Analyst
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
