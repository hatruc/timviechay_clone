/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './sidebar-timviec.module.scss';

const SidebarTimViec = () => {

    const [showModal, setshowModal] = useState(false)

    const handleCancel = () => {
        setshowModal(false)
    }

    const menuItems = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="29" height="26" viewBox="0 0 29 26" fill="none">
                <path d="M12.5769 19.2174L10.6538 24M16.4231 19.2174L18.3462 24M8.73077 24H20.2692M26.0385 2H2.96154C2.70652 2 2.46195 2.10078 2.28163 2.28016C2.1013 2.45954 2 2.70284 2 2.95652V18.2609C2 18.5146 2.1013 18.7579 2.28163 18.9372C2.46195 19.1166 2.70652 19.2174 2.96154 19.2174H26.0385C26.2935 19.2174 26.538 19.1166 26.7184 18.9372C26.8987 18.7579 27 18.5146 27 18.2609V2.95652C27 2.70284 26.8987 2.45954 26.7184 2.28016C26.538 2.10078 26.2935 2 26.0385 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>,
            label: "Quản lý chung",
            isSubmenu: false,
            externalLink: "/nha-tuyen-dung/quan-ly-chung",
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 20 25" fill="none">
                <path d="M20 9.17024C20 8.93631 19.9287 8.71983 19.8065 8.54131L19.8085 8.54541C19.7891 8.51738 19.7687 8.49001 19.7474 8.46333L19.7423 8.45718C19.722 8.43261 19.7006 8.40899 19.6782 8.38638L19.668 8.37612L19.6395 8.34637L11.6729 0.322159C11.6503 0.299271 11.6265 0.277691 11.6016 0.257522L11.5792 0.237002L11.5242 0.195963L11.4967 0.176469C11.4772 0.164124 11.4575 0.152152 11.4376 0.14056L11.4121 0.12517C11.3851 0.110803 11.3576 0.097456 11.3296 0.0851566L11.295 0.0707928L11.24 0.0502732L11.2003 0.0379614L11.1382 0.0215456L11.1066 0.0143638C11.0755 0.00849809 11.0443 0.00370736 11.0129 0H1.11117C0.500076 0 0.00407394 0.496576 0 1.11114V23.496C0 24.1147 0.498039 24.6154 1.11117 24.6154H18.8878C19.502 24.6154 19.999 24.1137 19.999 23.496V9.19896L20 9.17024ZM11.9978 3.80947L16.2041 8.05191H11.9978V3.80947ZM2.22132 22.3777V2.23049H9.77848V9.17331C9.77848 9.79198 10.2765 10.2927 10.8896 10.2927H17.7817V22.3777H2.22132Z" fill="white" />
                <path d="M13.7025 17.9004H6.26351C5.96881 17.9004 5.68618 18.0184 5.4778 18.2283C5.26941 18.4382 5.15234 18.7229 5.15234 19.0198C5.15234 19.3167 5.26941 19.6014 5.4778 19.8113C5.68618 20.0212 5.96881 20.1391 6.26351 20.1391H6.2961H6.29407H13.7331C14.0278 20.1391 14.3104 20.0212 14.5188 19.8113C14.7272 19.6014 14.8443 19.3167 14.8443 19.0198C14.8443 18.7229 14.7272 18.4382 14.5188 18.2283C14.3104 18.0184 14.0278 17.9004 13.7331 17.9004H13.7005H13.7025ZM13.7025 13.4241H6.26351C5.96881 13.4241 5.68618 13.542 5.4778 13.7519C5.26941 13.9618 5.15234 14.2466 5.15234 14.5434C5.15234 14.8403 5.26941 15.125 5.4778 15.3349C5.68618 15.5448 5.96881 15.6628 6.26351 15.6628H6.2961H6.29407H13.7331C14.0278 15.6628 14.3104 15.5448 14.5188 15.3349C14.7272 15.125 14.8443 14.8403 14.8443 14.5434C14.8443 14.2466 14.7272 13.9618 14.5188 13.7519C14.3104 13.542 14.0278 13.4241 13.7331 13.4241H13.7005H13.7025Z" fill="white" />
            </svg>,
            label: "Tin tuyển dụng",
            isSubmenu: true,
            links: [
                { href: "/nha-tuyen-dung/dang-tin-moi", label: "Đăng tin mới" },
                { href: "/nha-tuyen-dung/tin-da-dang", label: "Tin đã đăng" },
            ],
        },
        {

            icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="27" viewBox="0 0 22 27" fill="none">
                <path d="M1.81492 2.40501C2.00094 2.20349 2.22633 2.11548 2.43338 2.11548H15.0904L19.5893 6.9892V24.3409C19.5893 24.6792 19.4641 24.982 19.2743 25.1875C19.0883 25.389 18.8629 25.4771 18.6559 25.4771H2.43338C2.22633 25.4771 2.00094 25.389 1.81492 25.1875C1.62518 24.982 1.5 24.6792 1.5 24.3409V3.25164C1.5 2.91329 1.62518 2.61057 1.81492 2.40501Z" stroke="white" strokeWidth="3" />
                <path d="M9.45212 15.7491C9.31377 15.7427 9.17542 15.7363 9.03079 15.7363C7.50898 15.7363 6.08778 16.1634 4.8741 16.8963C4.32071 17.2277 4 17.8523 4 18.5088V20.1978H9.82314C9.37898 19.5556 9.11065 18.8056 9.04547 18.0241C8.9803 17.2427 9.12061 16.4577 9.45212 15.7491Z" fill="white" />
                <path d="M9.03102 15.0988C10.4202 15.0988 11.5464 13.9574 11.5464 12.5494C11.5464 11.1414 10.4202 10 9.03102 10C7.64181 10 6.51562 11.1414 6.51562 12.5494C6.51562 13.9574 7.64181 15.0988 9.03102 15.0988Z" fill="white" />
                <path d="M15.7901 17.6484C15.7901 17.5082 15.7712 17.3807 15.7523 17.2469L16.4692 16.6032L15.8404 15.5005L14.9285 15.8128C14.7273 15.6408 14.5009 15.5069 14.2494 15.4113L14.0607 14.4617H12.803L12.6144 15.4113C12.3628 15.5069 12.1364 15.6408 11.9352 15.8128L11.0234 15.5005L10.3945 16.6032L11.1114 17.2469C11.0926 17.3807 11.0737 17.5082 11.0737 17.6484C11.0737 17.7886 11.0926 17.9161 11.1114 18.0499L10.3945 18.6936L11.0234 19.7963L11.9352 19.484C12.1364 19.656 12.3628 19.7899 12.6144 19.8855L12.803 20.8351H14.0607L14.2494 19.8855C14.5009 19.7899 14.7273 19.656 14.9285 19.484L15.8404 19.7963L16.4692 18.6936L15.7523 18.0499C15.7712 17.9161 15.7901 17.7886 15.7901 17.6484ZM13.4319 18.9231C12.7401 18.9231 12.1742 18.3495 12.1742 17.6484C12.1742 16.9473 12.7401 16.3737 13.4319 16.3737C14.1236 16.3737 14.6896 16.9473 14.6896 17.6484C14.6896 18.3495 14.1236 18.9231 13.4319 18.9231Z" fill="white" />
            </svg>,
            label: "Quản lý hồ sơ",
            isSubmenu: true,
            links: [
                { href: "/nha-tuyen-dung/chuyen-vien-gui-ung-vien", label: "Chuyên viên gửi ứng viên" },
                { href: "/nha-tuyen-dung/ung-vien-den-ung-tuyen", label: "Ứng viên đến ứng tuyển" },
                { href: "/nha-tuyen-dung/ung-vien-tu-diem-loc", label: "Ứng viên từ điểm lọc" },
                { href: "/nha-tuyen-dung/ho-so-ung-vien-da-luu", label: "Hồ sơ ứng viên đã lưu" },
            ],
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.50513 8.5672C6.50513 7.12934 7.07631 5.75038 8.09303 4.73366C9.10975 3.71694 10.4887 3.14575 11.9266 3.14575C13.3644 3.14575 14.7434 3.71694 15.7601 4.73366C16.7768 5.75038 17.348 7.12934 17.348 8.5672C17.348 10.0051 16.7768 11.384 15.7601 12.4007C14.7434 13.4175 13.3644 13.9886 11.9266 13.9886C10.4887 13.9886 9.10975 13.4175 8.09303 12.4007C7.07631 11.384 6.50513 10.0051 6.50513 8.5672ZM5.22783 16.8859C6.96595 15.8254 9.3297 15.0729 11.9266 15.0729C12.4113 15.0729 12.8883 15.099 13.3535 15.1488C13.5397 15.1688 13.7176 15.2367 13.8699 15.3459C14.0221 15.4551 14.1434 15.6018 14.222 15.7718C14.3006 15.9419 14.3339 16.1293 14.3185 16.316C14.3031 16.5027 14.2396 16.6822 14.1342 16.8371C13.3997 17.9151 13.0081 19.1899 13.0109 20.4944C13.0109 21.4919 13.2353 22.4353 13.6343 23.2778C13.7121 23.4419 13.7474 23.6229 13.7369 23.8042C13.7265 23.9855 13.6707 24.1613 13.5746 24.3154C13.4786 24.4696 13.3453 24.5971 13.1871 24.6863C13.029 24.7756 12.8509 24.8236 12.6693 24.8261C12.4243 24.8294 12.176 24.8315 11.9266 24.8315C9.50969 24.8315 7.22618 24.6797 5.51517 24.2265C4.664 24.001 3.86271 23.6779 3.25551 23.1899C2.61253 22.6738 2.16797 21.9528 2.16797 21.0365C2.16797 20.1832 2.55614 19.3852 3.08311 18.7172C3.61875 18.0396 4.35932 17.4161 5.22783 16.8848V16.8859ZM18.9745 18.3258C18.5431 18.3258 18.1294 18.4972 17.8244 18.8022C17.5194 19.1072 17.348 19.5209 17.348 19.9522C17.348 20.3836 17.5194 20.7973 17.8244 21.1023C18.1294 21.4073 18.5431 21.5787 18.9745 21.5787C19.4058 21.5787 19.8195 21.4073 20.1245 21.1023C20.4295 20.7973 20.6009 20.3836 20.6009 19.9522C20.6009 19.5209 20.4295 19.1072 20.1245 18.8022C19.8195 18.4972 19.4058 18.3258 18.9745 18.3258ZM15.1794 19.9522C15.1799 19.3748 15.312 18.8052 15.5659 18.2866C15.8198 17.768 16.1886 17.3141 16.6443 16.9596C17.1001 16.6051 17.6307 16.3592 18.1958 16.2408C18.761 16.1223 19.3456 16.1344 19.9054 16.276C20.4652 16.4176 20.9852 16.6851 21.426 17.0581C21.8667 17.4311 22.2166 17.8998 22.4488 18.4284C22.6811 18.957 22.7897 19.5316 22.7664 20.1086C22.743 20.6855 22.5883 21.2495 22.3141 21.7576L23.2184 22.663C23.3219 22.763 23.4045 22.8826 23.4614 23.0149C23.5182 23.1472 23.5481 23.2895 23.5493 23.4335C23.5506 23.5774 23.5232 23.7202 23.4686 23.8535C23.4141 23.9867 23.3336 24.1078 23.2318 24.2096C23.13 24.3114 23.0089 24.3919 22.8757 24.4464C22.7424 24.5009 22.5996 24.5284 22.4557 24.5271C22.3117 24.5259 22.1694 24.496 22.0371 24.4391C21.9049 24.3823 21.7852 24.2997 21.6852 24.1961L20.7798 23.2908C20.2017 23.6034 19.5523 23.7606 18.8952 23.7469C18.2381 23.7331 17.5958 23.549 17.0312 23.2124C16.4667 22.8759 15.9992 22.3985 15.6746 21.827C15.35 21.2555 15.1794 20.6095 15.1794 19.9522Z" fill="white" />
            </svg>,
            label: "Tìm kiếm ứng viên",
            isSubmenu: false,
            externalLink: "/ung-vien-tim-viec",
        },
        // {
        //     icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="27" viewBox="0 0 24 27" fill="none">
        //         <path d="M13.375 1V6.4127C13.375 6.77158 13.5199 7.11577 13.7777 7.36954C14.0356 7.62331 14.3853 7.76587 14.75 7.76587H20.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        //         <path d="M7.875 25.3571H3.75C3.02065 25.3571 2.32118 25.072 1.80546 24.5645C1.28973 24.0569 1 23.3686 1 22.6508V3.70635C1 2.98858 1.28973 2.30021 1.80546 1.79267C2.32118 1.28513 3.02065 1 3.75 1H13.375L20.25 7.76587V12.502M6.5 9.11905H7.875M6.5 14.5317H9.9375M6.5 19.9444H7.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        //         <path d="M13.375 25.3571V19.9444C13.375 19.2266 13.6647 18.5382 14.1805 18.0307C14.6962 17.5232 15.3957 17.238 16.125 17.238C16.8543 17.238 17.5538 17.5232 18.0695 18.0307C18.5853 18.5382 18.875 19.2266 18.875 19.9444V25.3571M13.375 22.6507H18.875M23 17.238V25.3571" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        //     </svg>,
        //     label: "Ứng viên gợi ý từ AI",
        //     isSubmenu: false,
        //     externalLink: "#",
        // },
        // {
        //     icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
        //         <path d="M9.22222 9.70987H20.7778M9.22222 15.5922H17.8889M23.6667 2.35693C24.8159 2.35693 25.9181 2.82174 26.7308 3.64911C27.5435 4.47648 28 5.59863 28 6.7687V18.5334C28 19.7035 27.5435 20.8256 26.7308 21.653C25.9181 22.4804 24.8159 22.9452 23.6667 22.9452H16.4444L9.22222 27.3569V22.9452H6.33333C5.18406 22.9452 4.08186 22.4804 3.2692 21.653C2.45655 20.8256 2 19.7035 2 18.5334V6.7687C2 5.59863 2.45655 4.47648 3.2692 3.64911C4.08186 2.82174 5.18406 2.35693 6.33333 2.35693H23.6667Z" stroke="white" strokeWidth="2.91667" strokeLinecap="round" strokeLinejoin="round" />
        //     </svg>,
        //     label: "Tin nhắn từ ứng viên",
        //     isSubmenu: false,
        //     externalLink: "/nha-tuyen-dung/tin-nhan-tu-ung-vien",
        // },
        // {
        //     icon: <svg xmlns="http://www.w3.org/2000/svg" width="29" height="31" viewBox="0 0 29 31" fill="none">
        //         <path d="M28.2857 24.4335V22.2447H26C25.8599 21.5596 25.5895 20.9081 25.2036 20.3262L26.8246 18.6956L25.2863 17.1481L23.6653 18.7787C23.0868 18.3906 22.4393 18.1186 21.7582 17.9777V15.6783H19.5823V17.9777C18.9013 18.1186 18.2537 18.3906 17.6752 18.7787L16.0542 17.1481L14.5159 18.6956L16.1369 20.3262C15.7511 20.9081 15.4807 21.5596 15.3405 22.2447H13.0548V24.4335H15.3405C15.482 25.1306 15.7583 25.7785 16.1369 26.352L14.5159 27.9826L16.0542 29.5301L17.6752 27.8994C18.2537 28.2876 18.9013 28.5596 19.5823 28.7005V30.9999H21.7582V28.7005C22.4393 28.5596 23.0868 28.2876 23.6653 27.8994L25.2863 29.5301L26.8246 27.9826L25.2036 26.352C25.5895 25.77 25.8599 25.1186 26 24.4335H28.2857ZM20.6703 26.6223C18.8708 26.6223 17.4065 25.1492 17.4065 23.3391C17.4065 21.529 18.8708 20.0559 20.6703 20.0559C22.4697 20.0559 23.934 21.529 23.934 23.3391C23.934 25.1492 22.4697 26.6223 20.6703 26.6223ZM8.70312 4.73438H13.0548V6.92317H8.70312V4.73438Z" fill="white" />
        //         <path d="M2.17584 28.8112V2.54572H19.5826V12.3953H21.7584V2.54572C21.7584 1.33861 20.7826 0.356934 19.5826 0.356934H2.17584C0.975866 0.356934 0 1.33861 0 2.54572V28.8112C0 30.0183 0.975866 31 2.17584 31H10.8792V28.8112H2.17584Z" fill="white" />
        //     </svg>,
        //     label: "Quản lý dịch vụ",
        //     isSubmenu: false,
        //     externalLink: "#",
        // },
        // {
        //     icon: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="31" viewBox="0 0 26 31" fill="none">
        //         <path d="M23.3907 7.72147L15.8479 0.309706C15.7478 0.211411 15.6289 0.133467 15.4981 0.0803265C15.3673 0.0271862 15.2271 -0.000109044 15.0856 3.27387e-07H2.15508C1.58352 3.27387e-07 1.03536 0.223109 0.631208 0.620245C0.227052 1.01738 0 1.55601 0 2.11765V25.4118C0 25.9734 0.227052 26.512 0.631208 26.9092C1.03536 27.3063 1.58352 27.5294 2.15508 27.5294H21.5508C22.1224 27.5294 22.6705 27.3063 23.0747 26.9092C23.4788 26.512 23.7059 25.9734 23.7059 25.4118V8.47059C23.706 8.3315 23.6782 8.19376 23.6241 8.06522C23.5701 7.93668 23.4907 7.81988 23.3907 7.72147ZM16.1631 3.61456L20.0274 7.41177H16.1631V3.61456ZM21.5508 25.4118H2.15508V2.11765H14.008V8.47059C14.008 8.75141 14.1215 9.02072 14.3236 9.21929C14.5257 9.41786 14.7998 9.52941 15.0856 9.52941H21.5508V25.4118Z" fill="white" />
        //         <path d="M12.2345 30.5882C11.8139 30.5882 11.454 30.4386 11.1547 30.1394C10.8555 29.8401 10.7056 29.4799 10.7051 29.0588V20.6471C10.7051 20.2265 10.855 19.8666 11.1547 19.5673C11.4545 19.2681 11.8144 19.1182 12.2345 19.1177H15.2933V17.5882C15.2933 17.1677 15.4432 16.8077 15.743 16.5085C16.0427 16.2092 16.4026 16.0593 16.8227 16.0588H19.8815C20.3021 16.0588 20.6623 16.2087 20.9621 16.5085C21.2618 16.8082 21.4115 17.1682 21.411 17.5882V19.1177H24.4698C24.8904 19.1177 25.2505 19.2675 25.5503 19.5673C25.8501 19.8671 25.9997 20.227 25.9992 20.6471V29.0588C25.9992 29.4794 25.8496 29.8396 25.5503 30.1394C25.2511 30.4391 24.8909 30.5888 24.4698 30.5882H12.2345ZM16.8227 19.1177H19.8815V17.5882H16.8227V19.1177Z" fill="white" />
        //     </svg>,
        //     label: "Kinh nghiệm nhân sự",
        //     isSubmenu: true,
        //     links: [
        //         { href: "/dang-tin.html", label: "Đăng tin mới" },
        //         { href: "/nha-tuyen-dung/tat-ca-tin-dang.html", label: "Tin đã đăng" },
        //     ],
        // },
        {

            icon: <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
                <path d="M11.8048 12.652C11.5052 12.6386 11.2057 12.6252 10.8925 12.6252C7.59754 12.6252 4.5204 13.5213 1.89258 15.0594C0.694399 15.7549 0 17.0656 0 18.4431V21.9874H12.6081C11.6464 20.6398 11.0654 19.066 10.9243 17.4261C10.7832 15.7863 11.087 14.139 11.8048 12.652Z" fill="white" />
                <path d="M10.8916 11.288C13.8995 11.288 16.3378 8.89277 16.3378 5.93817C16.3378 2.98356 13.8995 0.588379 10.8916 0.588379C7.88369 0.588379 5.44531 2.98356 5.44531 5.93817C5.44531 8.89277 7.88369 11.288 10.8916 11.288Z" fill="white" />
                <path d="M25.5299 16.6379C25.5299 16.3437 25.489 16.0762 25.4482 15.7953L27.0004 14.4445L25.6388 12.1307L23.6645 12.7861C23.2288 12.425 22.7387 12.1441 22.1941 11.9435L21.7856 9.95068H19.0625L18.654 11.9435C18.1094 12.1441 17.6192 12.425 17.1835 12.7861L15.2092 12.1307L13.8477 14.4445L15.3998 15.7953C15.359 16.0762 15.3181 16.3437 15.3181 16.6379C15.3181 16.9322 15.359 17.1996 15.3998 17.4805L13.8477 18.8313L15.2092 21.1451L17.1835 20.4898C17.6192 20.8509 18.1094 21.1317 18.654 21.3324L19.0625 23.3252H21.7856L22.1941 21.3324C22.7387 21.1317 23.2288 20.8509 23.6645 20.4898L25.6388 21.1451L27.0004 18.8313L25.4482 17.4805C25.489 17.1996 25.5299 16.9322 25.5299 16.6379ZM20.424 19.3128C18.9263 19.3128 17.7009 18.1091 17.7009 16.6379C17.7009 15.1667 18.9263 13.963 20.424 13.963C21.9217 13.963 23.1471 15.1667 23.1471 16.6379C23.1471 18.1091 21.9217 19.3128 20.424 19.3128Z" fill="white" />
            </svg>,
            label: "Quản lý tài khoản",
            isSubmenu: true,
            links: [
                { href: "/nha-tuyen-dung/cap-nhat-thong-tin", label: "Cập nhật thông tin" },
                { href: "/nha-tuyen-dung/doi-mat-khau", label: "Đổi mật khẩu" },
            ],
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="29" height="25" viewBox="0 0 29 25" fill="none">
                <path d="M14.3352 15.6655C14.7317 15.6655 15.1244 15.5887 15.4908 15.4395C15.8571 15.2902 16.19 15.0714 16.4704 14.7956C16.7508 14.5198 16.9733 14.1924 17.125 13.8321C17.2768 13.4717 17.3549 13.0855 17.3549 12.6954C17.3549 12.3054 17.2768 11.9192 17.125 11.5588C16.9733 11.1985 16.7508 10.8711 16.4704 10.5953C16.19 10.3195 15.8571 10.1007 15.4908 9.95143C15.1244 9.80217 14.7317 9.72534 14.3352 9.72534C13.5343 9.72534 12.7663 10.0383 12.2 10.5953C11.6337 11.1523 11.3155 11.9077 11.3155 12.6954C11.3155 13.4832 11.6337 14.2386 12.2 14.7956C12.7663 15.3526 13.5343 15.6655 14.3352 15.6655ZM6.57031 24.491V25.0001H22.1001V24.491C22.1001 22.5901 22.1001 21.6397 21.7239 20.9133C21.393 20.2746 20.8651 19.7554 20.2158 19.4299C19.4773 19.0599 18.511 19.0599 16.5784 19.0599H12.092C10.1594 19.0599 9.19312 19.0599 8.45459 19.4299C7.80526 19.7554 7.27734 20.2746 6.94648 20.9133C6.57031 21.6397 6.57031 22.5901 6.57031 24.491Z" fill="white" />
                <path d="M3.42465 11.053C3.32304 10.5828 3.8878 10.2621 4.251 10.5837L4.76623 11.04C4.92874 11.1839 5.16575 11.2091 5.35372 11.1023L5.94643 10.7657C6.36849 10.5261 6.85786 10.9633 6.65907 11.4025L6.3843 12.0095C6.2951 12.2065 6.34573 12.4389 6.50946 12.5839L7.01554 13.0321C7.37939 13.3543 7.11702 13.9452 6.63234 13.8951L5.94079 13.8236C5.72531 13.8014 5.52056 13.9176 5.43243 14.1123L5.1496 14.7371C4.95138 15.175 4.29989 15.1031 4.19809 14.632L4.0565 13.9768C4.0107 13.7649 3.83145 13.6056 3.61335 13.583L2.94149 13.5136C2.45543 13.4633 2.31515 12.8279 2.73721 12.5882L3.32993 12.2516C3.5179 12.1448 3.61426 11.9304 3.5688 11.72L3.42465 11.053Z" fill="white" />
                <path d="M13.861 1.76239C14.0121 1.30483 14.6594 1.30483 14.8105 1.76239L15.027 2.41771C15.0947 2.62254 15.286 2.76088 15.5018 2.76088H16.1845C16.6708 2.76088 16.8709 3.3849 16.4752 3.66768L15.9372 4.05216C15.759 4.17947 15.6844 4.40788 15.7531 4.6158L15.962 5.24803C16.1137 5.70723 15.59 6.09285 15.1965 5.81167L14.6265 5.40431C14.4526 5.28005 14.2189 5.28005 14.045 5.40431L13.475 5.81167C13.0815 6.09285 12.5578 5.70723 12.7095 5.24803L12.9184 4.6158C12.9871 4.40788 12.9125 4.17947 12.7343 4.05216L12.1963 3.66768C11.8006 3.3849 12.0006 2.76088 12.487 2.76088H13.1697C13.3854 2.76088 13.5768 2.62254 13.6445 2.41772L13.861 1.76239Z" fill="white" />
                <path d="M24.6536 10.3113C25.0168 9.98965 25.5815 10.3104 25.4799 10.7806L25.3358 11.4476C25.2903 11.658 25.3867 11.8724 25.5746 11.9792L26.1674 12.3158C26.5894 12.5554 26.4491 13.1909 25.9631 13.2412L25.2912 13.3106C25.0731 13.3332 24.8939 13.4924 24.8481 13.7044L24.7065 14.3596C24.6047 14.8306 23.9532 14.9026 23.755 14.4647L23.4721 13.8399C23.384 13.6452 23.1793 13.5289 22.9638 13.5512L22.2722 13.6227C21.7875 13.6728 21.5252 13.0819 21.889 12.7596L22.3951 12.3114C22.5588 12.1664 22.6095 11.9341 22.5203 11.7371L22.2455 11.13C22.0467 10.6909 22.5361 10.2537 22.9581 10.4933L23.5509 10.8299C23.7388 10.9367 23.9758 10.9115 24.1383 10.7676L24.6536 10.3113Z" fill="white" />
            </svg>,
            label: "Đóng góp ý kiến",
            isSubmenu: false,
            externalLink: "/nha-tuyen-dung/dong-gop-y-kien",
        },
    ];
    const router = useRouter();
    const { asPath } = router;
    const [isPathLoaded, setPathLoaded] = useState(false);
    useEffect(() => {
        if (asPath && !isPathLoaded) {
            setPathLoaded(true);
        }
    }, [asPath]);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const handleMenuClick = (index: any) => {
        if (activeSubmenu === index) {
            setActiveSubmenu(null); // Đóng submenu nếu nó đang mở
        } else {
            setActiveSubmenu(index); // Mở submenu nếu nó đang đóng
        }
    };

    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        setShouldRender(menuItems.some((menuItem: any) => {
            if (menuItem.isSubmenu) {
                return menuItem.links.some((link: any) => link.href === asPath);
            } else {
                return menuItem.externalLink === asPath || menuItem.href === asPath;
            }
        }))
    }, [asPath]);
    const isPathInSubmenu = (links: any[]) => {
        return links.some((link: any) => link.href === asPath);
    }

    return (
        <div className={styles.danhmuc_ql}>
            <div className={styles.danhmuc_link}>
                <ul>
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <li
                                className={
                                    styles.dmql + ' ' +
                                    (item.isSubmenu ? styles.mt_ql : "") + ' ' +
                                    (index === 0 ? styles.ic2 : styles.ic1) + ' ' +
                                    (isPathLoaded && asPath === item.externalLink ? styles.li_active : "") + ' ' +
                                    ((shouldRender && isPathInSubmenu(item.links ? item.links : [])) || activeSubmenu === index ? "" : styles.active)
                                }
                                onClick={() => item.isSubmenu && handleMenuClick(index)}
                            >
                                <div className={styles.v_img}>
                                    {item.icon}
                                </div>
                                {item.isSubmenu ? (
                                    <span className={styles.v_text}>{item.label}</span>
                                ) : (
                                    <Link href={item.externalLink ? item.externalLink : ''}>
                                        <span className={styles.v_text}>{item.label}</span>
                                    </Link>
                                )}
                            </li>
                            {item.isSubmenu && (
                                <ul className={`${styles.ex_dm} ${(shouldRender && isPathInSubmenu(item.links ? item.links : [])) || activeSubmenu === index ? styles.show : ""}`}
                                    style={{ overflow: "hidden" }}
                                >
                                    {item.links && item.links.map((link, linkIndex) => (
                                        <li key={linkIndex} className={(shouldRender && asPath === link.href ? styles.li_active : '')}>
                                            <Link href={link.href ? link.href : ''}>{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default SidebarTimViec