/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/next-script-for-ga */
import { ISeo } from '@/utils/interface'
import Head from 'next/head'

import Script from 'next/script'
// import { Helmet } from 'react-helmet'
type Props = {
	seo?: any
}
//haha
const Seo = ({ seo }: Props) => {
	const today = new Date()
	const month = String(today.getMonth() + 1).padStart(2, '0') // Lấy tháng và định dạng thành 2 chữ số
	const year = today.getFullYear() // Lấy năm
	return (
		<>
			<Head>
				<meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
				<title>{seo?.title}</title>
				<meta itemProp="headline" content={seo?.title} />
				<meta name="description" content={seo?.des} />
				<meta itemProp="description" content={seo?.des} />
				<meta name="keywords" content={seo?.metakeywords} />
				<link rel="canonical" href={seo?.url} />
				<link rel="amphtml" href={`https://timviec365.vn/amp/${seo?.asPath}`} />
				{seo?.noIndex ? <meta name="robots" content={'noindex,nofollow'} /> : <meta name="robots" content="noindex,nofollow"></meta>}
				<meta name="title" content={seo?.h1} />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:site" content="@timviec365vn" />
				<meta name="twitter:title" content={seo?.title} />
				<meta name="twitter:description" content={seo?.des} />
				<meta property="og:title" content={seo?.title} />
				<meta property="og:url" content={seo?.url} />
				<meta property="og:description" content={seo?.des} />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="vi_VN" />
				<meta property="fb:app_id" content="140587033393713" />
				<meta property="og:image" content={seo?.image || 'https://timviec365.vn/images/banner/og_default.png'} />

				<meta name="page-topic" content="Tìm việc làm" />
				<meta name="resource-type" content="Document" />
				<meta name="distribution" content="Global" />
				<meta name="author" itemProp="author" content="timviec365.vn" />
				<meta name="viewport" content="height=device-height,width=device-width,initial-scale=1.0,maximum-scale=1.0, user-scalable=no" />

				{/* <Helmet> */}
				<script type="application/ld+json">
					{JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'EmploymentAgency',
						name: 'Timviec365.vn',
						alternateName: 'Tìm Việc Làm & Tuyển Dụng Việc Làm Nhanh | timviec365.vn',
						logo: 'https://timviec365.vn/images/logo3.png',
						image: 'https://timviec365.vn/images/logo3.png',
						description:
							'Tìm việc 365 cung cấp tin tuyển dụng việc làm từ các công ty uy tín trên cả nước. Hàng nghìn công việc lương cao mới năm 2024 được cập nhật nhanh trong 24h',
						hasMap:
							'https://www.google.com/maps/place/T%C3%ACm+vi%E1%BB%87c+365:+T%E1%BA%A1o+cv+xin+vi%E1%BB%87c+-+T%C3%ACm+vi%E1%BB%87c+l%C3%A0m+nhanh+ch%C3%B3ng/@20.9894824,105.8291999,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ac61ae54bc9f:0x79b00399a56a34e!8m2!3d20.9894655!4d105.8313991',
						url: 'https://timviec365.vn/',
						telephone: '0982079209',
						priceRange: 0,
						address: {
							'@type': 'PostalAddress',
							streetAddress: 'Tầng 4, B50, Lô 6, KĐT Định Công, Hoàng Mai, Hà Nội',
							addressLocality: 'Hoàng Mai',
							addressRegion: 'Hà Nội',
							postalCode: '100000',
							addressCountry: 'Việt Nam',
						},
						geo: {
							'@type': 'GeoCoordinates',
							latitude: 20.9894824,
							longitude: 105.8291999,
						},
						openingHoursSpecification: {
							'@type': 'OpeningHoursSpecification',
							dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
							opens: '08:00',
							closes: '23:00',
						},
						sameAs: [
							'https://www.facebook.com/Timviec365.Vn/',
							'https://twitter.com/timviec365vn',
							'https://www.linkedin.com/in/timviec365/',
							'https://www.pinterest.com/timviec365/',
							'https://timvieclam365.tumblr.com/',
							'https://soundcloud.com/timviec365',
							'https://www.youtube.com/channel/UCI6_mZYL8exLuvmtipBFrkg',
							'https://sites.google.com/site/timviec365vn/',
							'https://issuu.com/timviec365',
							'https://trello.com/timviec365',
							'https://timvieclam365vn.wordpress.com/',
							'https://ello.co/timviec365',
							'https://www.diigo.com/profile/timviec365',
							'https://www.behance.net/timviec365',
							'http://500px.com/timvieclam365',
						],
					})}
				</script>
				<script type="application/ld+json">
					{JSON.stringify({
						'@context': 'http://schema.org',
						'@type': 'ItemPage',
						url: `${seo?.url}`,
						mainEntityOfPage: seo?.title,
					})}
				</script>
				{/* <!-- Google Tag Manager --> */}

				{/* <!-- End Google Tag Manager -->	<!-- End Google Tag Manager -->
    <!-- Global site tag (gtag.js) - Google Ads: 934002795 --> */}
				<script async src="https://www.googletagmanager.com/gtag/js?id=AW-934002795" />
				{/* </Helmet> */}
			</Head>
		</>
	)
}
export default Seo
