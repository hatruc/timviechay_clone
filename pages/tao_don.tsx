import * as data from '@/components/CV/tao-don/data'
import Footer from '@/components/common/Footer'
import Seo from '@/components/common/seo'
import Taodon from '@/components/taodon/taodon'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Props = {}

const Tao_don_home = ({ in4DonSsr, in4user, dataDonMau, Don }: any) => {
	const [url, setUrl] = useState<string>()
	const router = useRouter()
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setUrl(window.location.href)
		}
	}, [router.asPath])
	const seo = {
		title: `Tạo mẫu đơn xin việc Online`,
		des: `Tạo mẫu đơn xin việc Online`,
		metakeywords: ``,
		h1: `Tạo mẫu đơn xin việc Online`,
		url: url,
		asPath: router?.asPath,
	}
	return (
		<>
			<Seo seo={seo} />
			<Taodon in4DonSsr={in4DonSsr} in4user={in4user} Don={Don} dataDonMau={dataDonMau} />
			<Footer />
		</>
	)
}
export async function getServerSideProps(context: any) {
	const in4DonSsr = data.resin4Don?.data?.data;
	const in4user = data.resInfor?.data || []
	const dataDonMau = data.dataDonMau;
	const Don =
		dataDonMau?.data?.items?.filter((item: any) => {
			return item?.alias === 'mau-don-xin-viec-bat-dong-san-01'
		}) || []

	return {
		props: {
			in4DonSsr,
			in4user,
			dataDonMau,
			Don
		},
	}
}
export default Tao_don_home
