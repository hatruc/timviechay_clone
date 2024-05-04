/* eslint-disable @next/next/no-img-element */
import React from 'react'

type Props = {}

const Top_footer = (props: Props) => {
	return (
		<div className="ctr" style={{ marginTop: 50 }}>
			<div className="box-hoso">
				<p className="tt_danh_muc">Một bộ hồ sơ xin việc đầy đủ gồm</p>
				<div className="note">
					<ul>
						<li>Sơ yếu lý lịch tự thuật</li>
						<li>Đơn xin việc</li>
						<li>CV xin việc</li>
						<li>Giấy khám sức khỏe (photo công chứng).</li>
						<li>Bằng cấp, chứng chỉ (photo công chứng).</li>
						<li>Bản photo chứng minh thư (photo công chứng).</li>
						<li>Ảnh 3x4 hoặc 4x6 (nếu NTD có yêu cầu).</li>
					</ul>
				</div>
				<div className="clr" />
				<br />
				<br />
				<p className="tt_danh_muc">Những giấy tờ khác giúp bạn hoàn thiện hồ sơ xin việc</p>
				<div className="box_hsxv" style={{ marginBottom: 30, border: 'none' }}>
					<div className="b1">
						<div className="hsxv_img">
							<img src="https://devnext.timviec365.vn/static-tv/images/hsxv3.png" alt="Tạo CV online" />
						</div>
						<div className="ir">
							<a className="h3" href="/cv-xin-viec" title="Tạo CV online">
								Tạo CV online
							</a>
							<div className="ef">
								<p>
									CV xin việc 365 với thiết kế đẹp, chuẩn theo từng ngành. Top 365 mẫu CV Online của timviec365.vn được nhà tuyển dụng đánh giá cao,
									tạo dễ dàng và tải miễn phí
								</p>
							</div>
						</div>
					</div>
					<div className="b1">
						<div className="hsxv_img">
							<img src="https://devnext.timviec365.vn/static-tv/images/hsxv2.png" alt="mẫu thư xin việc" />
						</div>
						<div className="ir">
							<a className="h3" href="/cv365/mau-cover-letter-thu-xin-viec" title="Mẫu thư xin việc">
								Mẫu thư xin việc
							</a>
							<div className="ef">
								<p>Cách viết thư xin việc ấn tượng nhất để thu hút nhà tuyển dụng. Tổng hợp mẫu thư xin việc chuẩn tại timviec365.vn</p>
							</div>
						</div>
					</div>
					<div className="b1">
						<div className="hsxv_img">
							<img src="https://devnext.timviec365.vn/static-tv/images/hsxv4.png" alt="Sơ yếu lý lịch" />
						</div>
						<div className="ir">
							<a className="h3" href="/cv365/mau-so-yeu-ly-lich" title="Sơ yếu lý lịch">
								Sơ yếu lý lịch
							</a>
							<div className="ef">
								<p>
									Sơ yếu lý lịch 365 được thiết kế chuyên nghiệp, hiện đại, phù hợp với các ngành nghề khác nhau và theo đúng mong muốn của người tìm
									việc!
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Top_footer
