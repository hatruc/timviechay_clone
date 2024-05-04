import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ReactDOM from "react-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RateDesc from "@/components/rate-desc/Rate_desc";
import style from "./styles.module.css";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

const data = [
    {
        name: "Trần Thanh Huyền",
        position: "Ứng viên tìm việc",
        desc: "“Mình thấy ứng dụng khá hữu ích trong việc tìm kiếm công việc phù hợp với bản thân, đặc biệt là trong lĩnh vực CNTT. Nhờ chức năng tìm kiếm công việc xung quanh mà mình tìm được một công việc phù hợp.”",
        avatar: "/images/candidate/ava_default.png",
    },
    {
        name: "Trần Hưng Đạo",
        position: "Ứng viên tìm việc",
        desc: "“Mình thấy ứng dụng khá hữu ích trong việc tìm kiếm công việc phù hợp với bản thân, đặc biệt là trong lĩnh vực CNTT. Nhờ chức năng tìm kiếm công việc xung quanh mà mình tìm được một công việc phù hợp.”",
        avatar: "/images/candidate/ava_default.png",
    },
    {
        name: "Trần Huyền Trang",
        position: "Ứng viên tìm việc",
        desc: "“Mình thấy ứng dụng khá hữu ích trong việc tìm kiếm công việc phù hợp với bản thân, đặc biệt là trong lĩnh vực CNTT. Nhờ chức năng tìm kiếm công việc xung quanh mà mình tìm được một công việc phù hợp.”",
        avatar: "/images/candidate/ava_default.png",
    },
    {
        name: "Trần Thanh Tâm",
        position: "Ứng viên",
        desc: "“Mình thấy ứng dụng khá hữu ích trong việc tìm kiếm công việc phù hợp với bản thân, đặc biệt là trong lĩnh vực CNTT. Nhờ chức năng tìm kiếm công việc xung quanh mà mình tìm được một công việc phù hợp.”",
        avatar: "/images/candidate/ava_default.png",
    },
];

const Partner = ({ image }: { image: any }) => {
    return (
        <div
            className={style.item}
            style={{
                borderRadius: "12px",
                width: "193px",
                height: "108px",
                border: "1px solid #d5d5d5",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Image
                src={image}
                width={115}
                height={76}
                alt="Vin group"
                style={{ width: "115px", height: "76px" }}
            />
        </div>
    );
};

export default function AboutUsPage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrev = () => {
        setCurrentSlide((index) => (index > 0 ? index - 1 : 3));
    };
    const handleNext = () => {
        setCurrentSlide((index) => (index < 4 ? index + 1 : 0));
    };
    return (
        <>
            <Header />
            <div className={style.about_us_container}>
                {/* Giới thiệu */}
                <div className={style.intro}>
                    {/* <img src="./images/about-us/intro_bg.svg" alt="" /> */}
                    <div className={style.text}>
                        <p className={style.title} style={{ textTransform: "uppercase" }}>
                            Về chúng tôi
                        </p>
                        <p className={style.content}>
                            Timviechay là tập hợp của những thành viên trẻ, tài năng, tràn trề
                            nhiệt huyết, máu lửa và khát khao cống hiến. Chúng tôi yêu thích
                            công việc có thể tạo ra các sản phẩm việc làm uy tín và review
                            công ty hiện đại giúp mọi người tìm được việc làm phù hợp cùng nơi
                            làm việc tuyệt vời.
                        </p>
                    </div>
                </div>
                {/* Chúng tôi mang lại điều gì */}
                <div className={style.bring}>
                    <p className={style.title} style={{ textTransform: "uppercase" }}>
                        Chúng tôi mang lại điều gì?
                    </p>
                    <div className={style.content}>
                        <div className={`${style.user} ${style.item}`}>
                            <Image
                                src="/images/about-us/user.svg"
                                width={186}
                                height={186}
                                style={{
                                    width: "186px",
                                    height: "186px",
                                    marginBottom: "16px",
                                }}
                                alt=""
                            />
                            <p className={style.name}>Người tìm việc</p>
                            <p className={style.desc}>
                                Tìm được công việc phù hợp nhất, giúp cuộc sống trở nên hạnh
                                phúc hơn. Tìm được nơi tư vấn, hỗ trợ, hỏi đáp.
                            </p>
                        </div>
                        <div className={`${style.employer} ${style.item}`}>
                            <Image
                                src="/images/about-us/employer.svg"
                                width={186}
                                height={186}
                                style={{
                                    width: "186px",
                                    height: "186px",
                                    marginBottom: "16px",
                                }}
                                alt=""
                            />
                            <p className={style.name}>Nhà tuyển dụng</p>
                            <p className={style.desc}>
                                Tuyển dụng, kết nối những nhân sự tốt, phù hợp về: đạo đức,
                                chuyên môn, cùng mục tiêu.
                            </p>
                        </div>
                        <div className={`${style.social} ${style.item}`}>
                            <Image
                                src="/images/about-us/social.svg"
                                width={186}
                                height={186}
                                style={{
                                    width: "186px",
                                    height: "186px",
                                    marginBottom: "16px",
                                }}
                                alt=""
                            />
                            <p className={style.name}>Xã hội</p>
                            <p className={style.desc}>
                                Giúp cho con người hạnh phúc vì tìm được đam mê của mình trong
                                công việc, tiết kiệm thời gian cho tất cả mọi người.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Những con số ấn tượng */}
                <div className={style.number}>
                    <p className={style.title} style={{ textTransform: "uppercase" }}>
                        Những con số ấn tượng
                    </p>
                    <div className={style.content}>
                        <div className={style.item}>
                            <div className={style.image}>1.000.000+</div>
                            <p className={style.desc}>Lượt truy cập hàng tháng</p>
                        </div>
                        <div className={style.item}>
                            <div className={style.image}>2.000+</div>
                            <p className={style.desc}>
                                Thành viên mới tạo tài khoản mỗi ngày
                            </p>
                        </div>
                        <div className={style.item}>
                            <div className={style.image}>1.500.000+</div>
                            <p className={style.desc}>
                                Ứng viên sử dụng công cụ tạo CV xin việc online
                            </p>
                        </div>
                        <div className={style.item}>
                            <div className={style.image}>250.000+</div>
                            <p className={style.desc}>
                                Đối tác sử dụng dịch vụ, đăng tin tuyển dụng
                            </p>
                        </div>
                    </div>
                </div>
                {/* Tiện ích website */}
                <div className={style.utility}>
                    <p className={style.title} style={{ textTransform: "uppercase" }}>
                        Tiện ích website
                    </p>
                    <div className={style.content}>
                        <div className={style.item}>
                            <Image
                                src="/images/about-us/website_utility_1.svg"
                                width={73}
                                height={73}
                                style={{
                                    width: "73px",
                                    height: "73px",
                                    marginTop: "10px",
                                    marginBottom: "12px",
                                }}
                                alt=""
                            />
                            <p className={style.desc}>
                                Tìm việc làm uy tín, chất lượng, thu nhập cao. Dễ dàng ứng tuyển
                                vị trí công việc phù hợp.
                            </p>
                        </div>
                        <div className={style.item}>
                            <Image
                                src="/images/about-us/website_utility_2.svg"
                                width={73}
                                height={73}
                                style={{
                                    width: "73px",
                                    height: "73px",
                                    marginTop: "10px",
                                    marginBottom: "12px",
                                }}
                                alt=""
                            />
                            <p className={style.desc}>
                                Tìm kiếm ứng viên nhanh chóng, chất lượng, đáp ứng nhu cầu tuyển
                                dụng.
                            </p>
                        </div>
                        <div className={style.item}>
                            <Image
                                src="/images/about-us/website_utility_3.svg"
                                width={73}
                                height={73}
                                style={{
                                    width: "73px",
                                    height: "73px",
                                    marginTop: "10px",
                                    marginBottom: "12px",
                                }}
                                alt=""
                            />
                            <p className={style.desc}>
                                Chia sẻ kinh nghiệm tìm việc trên các lĩnh vực khác nhau.
                            </p>
                        </div>
                        <div className={style.item}>
                            <Image
                                src="/images/about-us/website_utility_4.svg"
                                width={73}
                                height={73}
                                style={{
                                    width: "73px",
                                    height: "73px",
                                    marginTop: "10px",
                                    marginBottom: "12px",
                                }}
                                alt=""
                            />
                            <p className={style.desc}>
                                Tạo CV xin việc online hoàn toàn miễn phí. Công cụ tạo CV xin
                                việc thông minh, dễ dàng sử dụng.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Người dùng nói gì về Joblike365 */}
                <div className={style.user_comment}>
                    <p className={style.title} style={{ textTransform: "uppercase" }}>
                        Người dùng nói gì về Timviechay
                    </p>
                    <div className={style.content}>
                        <div
                            className={style.button_prev}
                            onClick={handlePrev}
                            style={{ marginBottom: "3%" }}
                        >
                            <Image
                                src="/images/small-left1.svg"
                                width={70}
                                height={70}
                                style={{ width: "70px", height: "70px" }}
                                alt="Lùi"
                            />
                        </div>
                        <div className={style.carousel_container}>
                            <Carousel
                                selectedItem={currentSlide}
                                infiniteLoop={true}
                                showThumbs={false}
                                autoPlay={true}
                                interval={3000}
                                showStatus={false}
                                showArrows={false}
                                showIndicators={false}
                            >
                                {data.map((item, index) => (
                                    <div key={index}>
                                        <RateDesc
                                            name={item.name}
                                            position={item.position}
                                            desc={item.desc}
                                            avatar={item.avatar}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div
                            className={style.button_next}
                            onClick={handleNext}
                            style={{ marginBottom: "3%" }}
                        >
                            <Image
                                src="/images/small-right.svg"
                                width={70}
                                height={70}
                                style={{ width: "70px", height: "70px" }}
                                alt="Tiến"
                            />
                        </div>
                    </div>
                    <div className={style.mini_content}>
                        <div className={style.carousel_container}>
                            <Carousel
                                selectedItem={currentSlide}
                                infiniteLoop={true}
                                showThumbs={false}
                                autoPlay={true}
                                interval={3000}
                                showStatus={false}
                                showArrows={false}
                                showIndicators={false}
                            >
                                {data.map((item, index) => (
                                    <div key={index}>
                                        <RateDesc
                                            name={item.name}
                                            position={item.position}
                                            desc={item.desc}
                                            avatar={item.avatar}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div
                            className={style.button_box}
                            style={{ display: "flex", justifyContent: "space-evenly" }}
                        >
                            <div className={style.button_prev} onClick={handlePrev}>
                                <Image
                                    src="/images/small-left1.svg"
                                    width={40}
                                    height={40}
                                    style={{ width: "40px", height: "40px" }}
                                    alt="Lùi"
                                />
                            </div>
                            <div className={style.button_next} onClick={handleNext}>
                                <Image
                                    src="/images/small-right.svg"
                                    width={40}
                                    height={40}
                                    style={{ width: "40px", height: "40px" }}
                                    alt="Tiến"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Đối tác của Joblike365 */}
                {/* <div className={style.partner}>
                    <p className={style.title} style={{ textTransform: "uppercase" }}>
                        Đối tác của Timviechay
                    </p>
                    <div className={style.content}>
                        <Partner image="/images/about-us/partner/vingroup.svg" />
                        <Partner image="/images/about-us/partner/doji.svg" />
                        <Partner image="/images/about-us/partner/dai_ichi.svg" />
                        <Partner image="/images/about-us/partner/fpt.svg" />
                        <Partner image="/images/about-us/partner/manulife.svg" />
                        <Partner image="/images/about-us/partner/viettel.svg" />
                        <Partner image="/images/about-us/partner/sapo.svg" />
                        <Partner image="/images/about-us/partner/j&t_express.svg" />
                    </div>
                </div> */}
            </div>
            <Footer />
        </>
    );
}