import React from 'react'
import styles from '../cv_xin_viec.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = {}

const Menu = (props: Props) => {
	const router = useRouter()
	const path = router.asPath
	return (
		<div className={styles.body} style={{ paddingTop: 65 }}>
			<div className={styles.menu} style={{ background: '#fff' }}>
				<div className={styles.ctr}>
					<div className={styles.mn_pc}>
						<ul className={styles.right}>
							<li className={styles.menu_cv}>
								<Link
									href="/cv365/"
									style={{
										borderBottom: path == '/cv365' ? '1px solid #363636' : '',
									}}
								>
									<i className={styles.mi_1} />
									CV365
								</Link>
							</li>
							<li className={styles.menu_cv}>
								<Link href="/">Tìm việc làm</Link>
							</li>
							<li className={styles.menu_cv}>
								<Link
									href="/cv-xin-viec"
									style={{
										borderBottom: path.includes('cv-xin-viec') ? '1px solid #363636' : '',
									}}
								>
									CV xin việc
								</Link>
							</li>
							<li className={styles.menu_nncv}>
								<span>CV theo ngành nghề</span>
								<div className={styles.dm_more}>
									<div className={styles.dm_more_bg}>
										<ul style={{ zIndex: 9999 }}>
											<li>
												<Link href="/cv365/cv-it">IT</Link>
											</li>
											<li>
												<Link href="/cv365/cv-seo-website">SEO Website</Link>
											</li>
											<li>
												<Link href="/cv365/cv-marketing">Marketing</Link>
											</li>
											<li>
												<Link href="/cv365/cv-ke-toan">Kế toán</Link>
											</li>
											<li>
												<Link href="/cv365/cv-hanh-chinh-nhan-su">Hành chính nhân sự</Link>
											</li>
											<li>
												<Link href="/cv365/cv-kinh-doanh">Kinh doanh</Link>
											</li>
											<li>
												<Link href="/cv365/cv-xay-dung">Xây dựng</Link>
											</li>
											<li>
												<Link href="/cv365/cv-co-khi">Cơ khí</Link>
											</li>
											<li>
												<Link href="/cv365/cv-dien-dien-tu">Điện - điện tử</Link>
											</li>
											<li>
												<Link href="/cv365/cv-xuat-nhap-khau">Xuất nhập khẩu</Link>
											</li>
											<li>
												<Link href="/cv365/cv-bien-phien-dich">Biên phiên dịch</Link>
											</li>
											<li>
												<Link href="/cv365/cv-kien-truc-noi-that">Kiến trúc nội thất</Link>
											</li>
											<li>
												<Link href="/cv365/cv-bat-dong-san">Bất động sản</Link>
											</li>
											<li>
												<Link href="/cv365/cv-sinh-vien-moi-ra-truong">Sinh viên mới ra trường</Link>
											</li>
											<li>
												<Link href="/cv365/cv-nhan-vien-ban-hang">Nhân viên bán hàng</Link>
											</li>
											<li>
												<Link href="/cv365/cv-quan-tri-kinh-doanh">Quản trị kinh doanh</Link>
											</li>
											<li>
												<Link href="/cv365/cv-thu-ky-tro-ly">Thư ký - trợ lý</Link>
											</li>
											<li>
												<Link href="/cv365/cv-tu-van-vien">Tư vấn viên</Link>
											</li>
											<li>
												<Link href="/cv365/cv-cham-soc-khach-hang">Chăm sóc khách hàng</Link>
											</li>
											<li>
												<Link href="/cv365/cv-tiep-thi-quang-cao">Tiếp thị quảng cáo</Link>
											</li>
											<li>
												<Link href="/cv365/cv-y-te-duoc">Y tế dược</Link>
											</li>
											<li>
												<Link href="/cv365/cv-thuong-mai-dien-tu">Thương mại điện tử</Link>
											</li>
											<li>
												<Link href="/cv365/cv-luat-phap-ly">Luật pháp lý</Link>
											</li>
											<li>
												<Link href="/cv365/cv-thiet-bi-vat-tu">Thiết bị vật tư</Link>
											</li>
											<li>
												<Link href="/cv365/cv-giao-thong-van-tai">Giao thông vận tải</Link>
											</li>
											<li>
												<Link href="/cv365/cv-quan-ly-dieu-hanh">Quản lý điều hành</Link>
											</li>
											<li>
												<Link href="/cv365/cv-phat-trien-thi-truong">Phát triển thị trường</Link>
											</li>
											<li>
												<Link href="/cv365/cv-van-hanh-san-xuat">Vận hành sản xuất</Link>
											</li>
											<li>
												<Link href="/cv365/cv-nhap-lieu">Nhập liệu</Link>
											</li>
											<li>
												<Link href="/cv365/cv-tham-dinh-giam-dinh">Thẩm định giám định</Link>
											</li>
											<li>
												<Link href="/cv365/cv-du-lich">Du lịch</Link>
											</li>
											<li>
												<Link href="/cv365/cv-nha-hang-khach-san">Nhà hàng khách sạn</Link>
											</li>
											<li>
												<Link href="/cv365/cv-bao-chi-truyen-hinh">Báo chí - Truyền hình</Link>
											</li>
											<li>
												<Link href="/cv365/cv-buu-chinh-vien-thong">Bưu chính viễn thông</Link>
											</li>
											<li>
												<Link href="/cv365/cv-dien-tu-vien-thong">Điện tử viễn thông</Link>
											</li>
											<li>
												<Link href="/cv365/cv-hanh-chinh-van-phong">Hành chính văn phòng</Link>
											</li>
											<li>
												<Link href="/cv365/cv-it-phan-cung-mang">It - Phần Cứng - Mạng</Link>
											</li>
											<li>
												<Link href="/cv365/cv-ky-thuat">Kỹ Thuật</Link>
											</li>
											<li>
												<Link href="/cv365/cv-thiet-ke-my-thuat">Thiết Kế - Mỹ Thuật</Link>
											</li>
											<li>
												<Link href="/cv365/cv-bao-hiem">Bảo Hiểm</Link>
											</li>
											<li>
												<Link href="/cv365/cv-bao-ve">Bảo Vệ</Link>
											</li>
											<li>
												<Link href="/cv365/cv-det-may-da-giay">Dệt May - Da Giày</Link>
											</li>
											<li>
												<Link href="/cv365/cv-hoa-hoc-sinh-hoc">Hóa Học - Sinh Học</Link>
											</li>
											<li>
												<Link href="/cv365/cv-hoach-dinh-du-an">Hoạch Định - Dự án</Link>
											</li>
											<li>
												<Link href="/cv365/cv-lao-dong-pho-thong">Lao Động Phổ Thông</Link>
											</li>
											<li>
												<Link href="/cv365/cv-my-pham-thoi-trang-trang-suc">Mỹ Phẩm - Thời Trang</Link>
											</li>
											<li>
												<Link href="/cv365/cv-ngan-hang-chung-khoan">Ngân hàng</Link>
											</li>
											<li>
												<Link href="/cv365/cv-dich-vu">Dịch Vụ</Link>
											</li>
											<li>
												<Link href="/cv365/cv-ky-thuat-ung-dung">Kỹ Thuật Ứng Dụng</Link>
											</li>
											<li>
												<Link href="/cv365/cv-nong-lam-ngu-nghiep">Nông Lâm Ngư nghiệp</Link>
											</li>
											<li>
												<Link href="/cv365/cv-quan-he-doi-ngoai">Quan Hệ Đối Ngoại</Link>
											</li>
											<li>
												<Link href="/cv365/cv-the-duc-the-thao">Thể dục - Thể thao</Link>
											</li>
											<li>
												<Link href="/cv365/cv-thuc-pham-do-uong">Thực phẩm - Đồ uống</Link>
											</li>
											<li>
												<Link href="/cv365/cv-van-tai-lai-xe">Vận tải - Lái xe</Link>
											</li>
											<li>
												<Link href="/cv365/cv-lam-dep-the-luc-spa">Làm đẹp - Spa</Link>
											</li>
											<li>
												<Link href="/cv365/cv-chan-nuoi-thu-y">Chăn nuôi thú y</Link>
											</li>
											<li>
												<Link href="/cv365/cv-thuy-san">Thủy Sản</Link>
											</li>
											<li>
												<Link href="/cv365/cv-cong-nghe-thuc-pham">Công Nghệ Thực Phẩm</Link>
											</li>
											<li>
												<Link href="/cv365/cv-hang-khong">Hàng Không</Link>
											</li>
											<li>
												<Link href="/cv365/cv-truyen-thong">Truyền Thông</Link>
											</li>
											<li>
												<Link href="/cv365/cv-trac-dia">Trắc Địa</Link>
											</li>
											<li>
												<Link href="/cv365/cv-nau-an">Nấu Ăn</Link>
											</li>
											<li>
												<Link href="/cv365/cv-hang-hai">Hàng Hải</Link>
											</li>
											<li>
												<Link href="/cv365/cv-bao-tri">Bảo Trì </Link>
											</li>
											<li>
												<Link href="/cv365/cv-an-toan-lao-dong">An Toàn Lao Động</Link>
											</li>
											<li>
												<Link href="/cv365/cv-to-chuc-su-kien">Tổ Chức Sự Kiện</Link>
											</li>
											<li>
												<Link href="/cv365/cv-dia-chat">Địa Chất</Link>
											</li>
											<li>
												<Link href="/cv365/cv-thu-vien">Thư Viện</Link>
											</li>
											<li>
												<Link href="/cv365/cv-van-chuyen-giao-nhan">Vận Chuyển Giao Nhận</Link>
											</li>
											<li>
												<Link href="/cv365/cv-thu-ngan">Thu Ngân</Link>
											</li>
											<li>
												<Link href="/cv365/cv-viec-lam-ban-thoi-gian">Việc Làm Bán Thời Gian</Link>
											</li>
											<li>
												<Link href="/cv365/cv-developers">Developers</Link>
											</li>
											<li>
												<Link href="/cv365/cv-tro-giang-tieng-anh">Trợ Giảng Tiếng Anh </Link>
											</li>
											<li>
												<Link href="/cv365/cv-viec-lam-nganh-giao-duc">Việc Làm Giáo Dục </Link>
											</li>
											<li>
												<Link href="/cv365/cv-viec-lam-phuc-vu">Việc Làm Phục Vụ</Link>
											</li>
											<li>
												<Link href="/cv365/cv-viec-lam-trai-nganh">Việc Làm Trái Ngành </Link>
											</li>
											<li>
												<Link href="/cv365/cv-viec-lam-telesale">Việc Làm Telesale</Link>
											</li>
											<li>
												<Link href="/cv365/cv-viec-lam-le-tan">Việc Làm Lễ Tân</Link>
											</li>
											<li>
												<Link href="/cv365/cv-thong-ke">Thống Kê</Link>
											</li>
											<li>
												<Link href="/cv365/cv-copywriter">Copywriter</Link>
											</li>
											<li>
												<Link href="/cv365/cv-cong-nghe-cao">Công Nghệ Cao </Link>
											</li>
											<li>
												<Link href="/cv365/cv-logistic">Logistic</Link>
											</li>
											<li>
												<Link href="/cv365/cv-tai-chinh">Tài Chính</Link>
											</li>
											<li>
												<Link href="/cv365/cv-khu-che-xuat-khu-cong-nghiep">Khu chế xuất - khu công nghiệp</Link>
											</li>
											<li>
												<Link href="/cv365/cv-startup">Startup</Link>
											</li>
										</ul>
									</div>
								</div>
							</li>
							<li className={styles.menu_langcv}>
								<span>CV theo ngôn ngữ</span>
								<div className={styles.dm_more}>
									<div className={styles.dm_more_bg}>
										<ul>
											<li>
												<Link href="/cv365/cv-tieng-anh">CV tiếng Anh</Link>
											</li>
											<li>
												<Link href="/cv365/cv-tieng-trung">CV tiếng Trung</Link>
											</li>
											<li>
												<Link href="/cv365/cv-tieng-nhat">CV tiếng Nhật</Link>
											</li>
											<li>
												<Link href="/cv365/cv-tieng-han">CV tiếng Hàn</Link>
											</li>
											<li>
												<Link href="/cv365/cv-tieng-viet">CV tiếng Việt</Link>
											</li>
										</ul>
									</div>
								</div>
							</li>
							<li className={styles.menu_cv}>
								<Link
									href="/cv365/mau-don-xin-viec"
									style={{
										borderBottom: path.includes('mau-don-xin-viec') ? '1px solid #363636' : '',
									}}
								>
									Mẫu đơn xin việc
								</Link>
							</li>
							<li className={styles.menu_cv}>
								<Link
									href="/cv365/mau-cover-letter-thu-xin-viec"
									style={{
										borderBottom: path.includes('mau-cover-letter-thu-xin-viec') ? '1px solid #363636' : '',
									}}
								>
									Thư xin việc
								</Link>
							</li>
							<li className={styles.menu_cv}>
								<Link
									href="/cv365/mau-so-yeu-ly-lich"
									style={{
										borderBottom: path.includes('mau-so-yeu-ly-lich') ? '1px solid #363636' : '',
									}}
								>
									Sơ yếu lý lịch
								</Link>
							</li>
							<li className={styles.menu_blog}>
								<Link
									href="/blog/c24/bi-quyet-viet-cv"
									style={{
										borderBottom: path.includes('bi-quyet-viet-cv') ? '1px solid #363636' : '',
									}}
								>
									{' '}
									Bí quyết viết CV{' '}
								</Link>
							</li>
						</ul>
					</div>{' '}
				</div>
			</div>
		</div>
	)
}

export default Menu
