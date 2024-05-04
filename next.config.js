/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/pictures/**',
            },
            {
                protocol: 'http',
                hostname: '43.239.223.188',
                pathname: '/pictures/**',
            },
            {
                protocol: 'https',
                hostname: '43.239.223.188',
                pathname: '/pictures/**',
            },
            {
                protocol: 'http',
                hostname: '43.239.223.188',
            },
            {
                protocol: 'https',
                hostname: '43.239.223.188',
            },
            {
                protocol: 'https',
                hostname: 'work247.vn',
            },
            {
                protocol: 'https',
                hostname: 'timviechay.vn',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'timviechay.vn',
                pathname: '/pictures/**',
            },
            {
                protocol: 'https',
                hostname: 'timviechay.vn',
                pathname: '/upload/**',
            },
            {
                protocol: 'https',
                hostname: 'timviechay.vn',
                pathname: '/tmp/**',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

    async rewrites() {
        return [
            // Đăng ký đăng nhập
            {
                source: '/dang-nhap',
                destination: '/authorization/signIn-signUp',
            },
            {
                source: '/dang-ky',
                destination: '/authorization/signIn-signUp',
            },
            {
                source: '/dang-ky-ung-vien',
                destination: '/authorization/register-uv',
            },
            {
                source: '/dang-ky-nha-tuyen-dung',
                destination: '/authorization/register-ntd',
            },
            {
                source: '/dang-nhap-nha-tuyen-dung',
                destination: '/authorization/login-ntd',
            },
            {
                source: '/dang-nhap-ung-vien',
                destination: '/authorization/login-uv',
            },
            {
                source: '/quen-mat-khau',
                destination: '/authorization/forget_pass',
            },
            {
                source: '/cap-nhat-mat-khau',
                destination: '/authorization/update_pass',
            },
            {
                source: '/ma-otp',
                destination: '/authorization/input_otp',
            },
            {
                source: '/dang-ky-dang-tai-cv',
                destination: '/authorization/register-uv-upload-cv'
            },
            // Ứng viên
            {
                source: '/chi-tiet-ung-vien/:slug([^/]+)-:id.html',
                destination: '/ung-vien/chi-tiet-ung-vien'
            },
            {
                source: '/ung-vien-tim-viec',
                destination: '/ung-vien/danh-sach-ung-vien',
            },
            {
                source: '/ung-vien/CV-xin-viec',
                destination: '/ung-vien/bo-ho-so-xin-viec/CV-xin-viec',
            },
            {
                source: '/ung-vien/don-xin-viec',
                destination: '/ung-vien/bo-ho-so-xin-viec/don-xin-viec',
            },
            {
                source: '/ung-vien/thu-xin-viec',
                destination: '/ung-vien/bo-ho-so-xin-viec/thu-xin-viec',
            },
            {
                source: '/ung-vien/tai-len-ho-so',
                destination: '/ung-vien/bo-ho-so-xin-viec/tai-len-ho-so',
            },
            {
                source: '/ung-vien/ho-so-xin-viec',
                destination: '/ung-vien/bo-ho-so-xin-viec/ho-so-xin-viec',
            },
            // Quản lý hồ sơ

            // Giới thiệu
            {
                source: '/about-us',
                destination: '/ve-chung-toi/about-us',
            },
            // CV
            {
                source: '/thu-xin-viec',
                destination: '/CV/thu-xin-viec',
            },
            {
                source: '/tao-cv/:slug([^/]+)-:idcv',
                destination: '/CV/tao-cv',
            },
            {
                source: '/sua-cv/:slug([^/]+)-:idcv',
                destination: '/CV/sua-cv',
            },
            {
                source: '/CV/trang-chu-cv/:slug',
                destination: '/CV/trang-chu-cv'
            },
            // Phục vụ cho tạo ảnh, pdf cv
            {
                // 1 - che | 0 - không che 
                source: '/xem-cv-u:id-c:idcv-t:type',
                destination: '/CV/chi-tiet-cv'
            },
            {
                source: '/xem-cv2-u:id-c:idcv',
                destination: '/CV/chi-tiet-cv-phan-trang'
            },
            {
                source: '/xem-cv3-u:id-c:idcv',
                destination: '/CV/xem-cv'
            },
            //nhà tuyển dụng
            {
                source: '/nha-tuyen-dung/danh-sach-tin-tuyen-dung-tia-set',
                destination: '/nha-tuyen-dung/danh-sach-tin-tuyen-dung-tia-set',
            },
            // {
            //     source: '/nha-tuyen-dung/danh-sach-tin-tuyen-dung:id.html',
            //     destination: '/nha-tuyen-dung/danh-sach-tin-tuyen-dung',
            // },
            {
                source: '/tin-tuyen-dung',
                destination: '/nha-tuyen-dung/danh-sach-tin-tuyen-dung',
            },
            {
                source: '/tin-tuyen-dung/:slug',
                destination: '/nha-tuyen-dung/danh-sach-tin-tuyen-dung',
            },
            {
                source: '/:slug([^/]+)-:id.html',
                destination: '/nha-tuyen-dung/chi-tiet-tin-tuyen-dung',
            },
            // {
            //     source: '/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/:slug',
            //     destination: '/nha-tuyen-dung/chi-tiet-tin-tuyen-dung',
            // },
            {
                source: '/nha-tuyen-dung/chi-tiet-cong-ty/:id',
                destination: '/nha-tuyen-dung/chi-tiet-cong-ty/',
            },
            {
                source: '/nha-tuyen-dung/dang-tin-moi',
                destination: '/nha-tuyen-dung/tin-tuyen-dung/dang-tin-moi',
            },
            {
                source: '/nha-tuyen-dung/sua-tin/:slug([^/]+)-:id.html',
                destination: '/nha-tuyen-dung/tin-tuyen-dung/dang-tin-moi/'
            },
            {
                source: '/nha-tuyen-dung/tin-da-dang',
                destination: '/nha-tuyen-dung/tin-tuyen-dung/tin-da-dang',
            },
            {
                source: '/nha-tuyen-dung/chuyen-vien-gui-ung-vien',
                destination: '/nha-tuyen-dung/quan-ly-ho-so/chuyen-vien-gui-ung-vien'
            },
            {
                source: '/nha-tuyen-dung/ung-vien-den-ung-tuyen',
                destination: '/nha-tuyen-dung/quan-ly-ho-so/ung-vien-den-ung-tuyen'
            },
            {
                source: '/nha-tuyen-dung/ung-vien-tu-diem-loc',
                destination: '/nha-tuyen-dung/quan-ly-ho-so/ung-vien-tu-diem-loc'
            },
            {
                source: '/nha-tuyen-dung/ho-so-ung-vien-da-luu',
                destination: '/nha-tuyen-dung/quan-ly-ho-so/ho-so-ung-vien-da-luu'
            },
            {
                source: '/nha-tuyen-dung/tin-nhan-tu-ung-vien',
                destination: '/nha-tuyen-dung/tin-nhan-tu-ung-vien'
            },
            {
                source: '/nha-tuyen-dung/cap-nhat-thong-tin',
                destination: '/nha-tuyen-dung/tai-khoan/cap-nhat-thong-tin'
            },
            {
                source: '/nha-tuyen-dung/doi-mat-khau',
                destination: '/nha-tuyen-dung/tai-khoan/doi-mat-khau'
            },
            {
                source: '/nha-tuyen-dung/dong-gop-y-kien',
                destination: '/nha-tuyen-dung/dong-gop-y-kien'
            },
            {
                source: '/dang-tin',
                destination: '/nha-tuyen-dung/dang-tin'
            },
            {
                source: '/dang-tin-mien-phi',
                destination: '/nha-tuyen-dung/dang-tin-sau-dang-nhap'
            },
            //blog
            {
                source: '/blog',
                destination: '/blog/trang-chu-blog',
            },
            {
                source: '/blog/danh-muc-blog/:type',
                destination: '/blog/danh-muc-blog',
            },
            {
                source: '/blog/:slug([^/]+)-:id.html',
                destination: '/blog/chi-tiet-blog',
            },
            //danh-sach-viec-lam
            {
                source: '/danh-sach-viec-lam/khu-vuc',
                destination: '/danh-sach-viec-lam/khu-vuc',
            },
            {
                source: '/danh-sach-viec-lam/tag',
                destination: '/danh-sach-viec-lam/tag',
            },
            {
                source: '/danh-sach-viec-lam/nganh-nghe',
                destination: '/danh-sach-viec-lam/nganh-nghe',
            },
            {
                source: '/cv365/tao-don-xin-viec/:slug-:id([0-9]+)',
                destination: '/tao_don',
            },
        ]
    },

    compiler: {
        styledComponents: true,
    },
}

module.exports = nextConfig
