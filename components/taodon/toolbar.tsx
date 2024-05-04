/* eslint-disable @next/next/no-img-element */
import { saveDon } from '@/pages/api/don_xin_viec'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const Toolbar = ({ sethtml, setdata, data, in4DonSsr, in4Don, html, Don }: any) => {
	const updateField = (field: any, value: any) => {
		sethtml((prevData: any) => ({
			...prevData,
			[field]: value,
		}))
	}
	const router = useRouter()

	const handleSaveDon = async () => {
		if (!html?.user_to) {
			alert(
				`Please! ${data.lang === 'vi'
					? 'Tên người nhận'
					: data.lang === 'en'
						? 'To'
						: data.lang === 'jp'
							? 'ホスト名'
							: data.lang === 'cn'
								? '收件人的姓名'
								: '수신자 이름'
				}`
			)
			return
		} else if (!html?.content) {
			alert(
				`Please! ${data.lang === 'vi' ? 'Nội dung' : data.lang === 'en' ? 'Content' : data.lang === 'jp' ? '内容' : data.lang === 'cn' ? '内容' : '내용'
				}`
			)
			return
		} else if (!html?.lt_title) {
			alert(
				`Please! ${data.lang === 'vi'
					? 'Tiêu đề đơn'
					: data.lang === 'en'
						? 'Title'
						: data.lang === 'jp'
							? 'タイトル '
							: data.lang === 'cn'
								? '标题 '
								: '제목 '
				}`
			)
			return
		} else {
			const res = await saveDon(Don[0]?._id, data?.lang, 'test', html)
			router.push('/ung-vien/danh-sach-mau-don')
		}
	}
	return (
		<div id="cvo-toolbar" className="">
			<div className="toolbar-global-controls">
				<div className="ctr">
					<div className="item" id="cvo-toolbar-lang">
						<div className="title">Ngôn ngữ</div>
						<div className="options">
							<span
								onClick={() => {
									sethtml(in4DonSsr?.html_vi), setdata({ ...data, lang: 'vi' })
								}}
								className={`flag btn-lang-option vi ${data.lang === 'vi' && 'active'}`}
								data-lang="vi"
							>
								<img alt='' src="https://devnext.timviec365.vn/static-tv/images/vi.png" />
								<i className="flag-selected" />
							</span>
							<span
								onClick={() => {
									sethtml(in4DonSsr?.html_en), setdata({ ...data, lang: 'en' })
								}}
								className={`flag btn-lang-option en ${data.lang === 'en' && 'active'}`}
								data-lang="en"
							>
								<img alt='' src="https://devnext.timviec365.vn/static-tv/images/en.png" />
								<i className="flag-selected" />
							</span>
							<span
								onClick={() => {
									sethtml(in4DonSsr?.html_jp), setdata({ ...data, lang: 'jp' })
								}}
								className={`flag btn-lang-option jp ${data.lang === 'jp' && 'active'}`}
								data-lang="jp"
							>
								<img alt='' src="https://devnext.timviec365.vn/static-tv/images/jp.png" />
								<i className="flag-selected" />
							</span>
							<span
								onClick={() => {
									sethtml(in4DonSsr?.html_cn), setdata({ ...data, lang: 'cn' })
								}}
								className={`flag btn-lang-option cn ${data.lang === 'cn' && 'active'}`}
								data-lang="cn"
							>
								<img alt='' src="https://devnext.timviec365.vn/static-tv/images/cn.png" />
								<i className="flag-selected" />
							</span>
							<span
								onClick={() => {
									sethtml(in4DonSsr?.html_kr), setdata({ ...data, lang: 'kr' })
								}}
								className={`flag btn-lang-option kr ${data.lang === 'kr' && 'active'}`}
								data-lang="kr"
							>
								<img alt='' src="https://devnext.timviec365.vn/static-tv/images/kr.png" />
								<i className="flag-selected" />
							</span>
						</div>
					</div>
					<div className="item" id="toolbar-color">
						<div className="title">Tông màu</div>
						<div className="options">
							{in4Don?.colors?.split(',')?.map((item: any, index: number) => {
								return (
									<span
										onClick={() => {
											setdata({ ...data, colors: item }), updateField('css', { ...html.css, color: item })
										}}
										key={index}
										className={`color ${data.colors === item && 'active'}`}
										style={{ backgroundColor: `#${item}` }}
										data-color={item}
									>
										<i className="fa fa-check" />
									</span>
								)
							})}
						</div>
					</div>
					<div className="item" id="toolbar-font">
						<div className="title">Font chữ</div>
						<select
							name="font"
							id="font-selector"
							style={{ width: 150 }}
							onChange={(e: any) => {
								setdata({ ...data, Font: e.target.value }), updateField('css', { ...html.css, font: e.target.value })
							}}
						>
							<option value="Roboto">Roboto</option>
							<option value="Tahoma">Tahoma</option>
							<option value="Arial">Arial</option>
							<option value="sun-exta">sun-exta</option>
						</select>
					</div>
					<div className="item">
						<div className="title">Cỡ chữ</div>
						<div className="options">
							<span
								onClick={() => {
									setdata({ ...data, Fontsize: 'small' }), updateField('css', { ...html.css, font_size: 'small' })
								}}
								className={`fontsize ${data.Fontsize === 'small' && 'active'}`}
								data-size="small"
							>
								<i className="fa fa-font" />
							</span>
							<span
								onClick={() => {
									setdata({ ...data, Fontsize: 'normal' }), updateField('css', { ...html.css, font_size: 'normal' })
								}}
								className={`fontsize ${data.Fontsize === 'normal' && 'active'}`}
								data-size="normal"
							>
								<i className="fa fa-font" />
							</span>
							<span
								onClick={() => {
									setdata({ ...data, Fontsize: 'large' }), updateField('css', { ...html.css, font_size: 'large' })
								}}
								className={`fontsize ${data.Fontsize === 'large' && 'active'}`}
								data-size="large"
							>
								<i className="fa fa-font" />
							</span>
						</div>
					</div>
					<div className="item">
						<div className="title">Cách dòng</div>
						<div className="options">
							<span
								onClick={() => {
									setdata({ ...data, Fontspace: 'small' }), updateField('css', { ...html.css, font_spacing: 'small' })
								}}
								className={`line-height ${data.Fontspace === 'small' && 'active'}`}
								data-spacing="small"
							>
								<i className="fa fa-arrows-v" />
							</span>
							<span
								onClick={() => {
									setdata({ ...data, Fontspace: 'normal' }), updateField('css', { ...html.css, font_spacing: 'normal' })
								}}
								data-spacing="normal"
								className={`line-height ${data.Fontspace === 'normal' && 'active'}`}
							>
								<i className="fa fa-arrows-v" />
							</span>
							<span
								onClick={() => {
									setdata({ ...data, Fontspace: 'large' }), updateField('css', { ...html.css, font_spacing: 'large' })
								}}
								data-spacing="large"
								className={`line-height ${data.Fontspace === 'large' && 'active'}`}
							>
								<i className="fa fa-arrows-v" />
							</span>
						</div>
					</div>
					<div onClick={() => handleSaveDon()} className="item button btn-topcv-primary" id="btn-save-file">
						<div className="title">Lưu và tải đơn</div>
						<i className="fa fa-floppy-o" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Toolbar
