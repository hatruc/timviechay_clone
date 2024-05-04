import { base_timviec365 } from '@/components/service/functions'
import { access_token } from '@/utils/convert'
import axios from 'axios'

// ----------------------------- LIST -------------------------------
export const list_don_xin_viec_trang_chu = async (formData: FormData) => {
	try {
		const response = await axios.post(`${base_timviec365}/api/timviec/letter/list`, formData, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		return response.data
	} catch (error) {}
}

export const don_xem_truoc = async (formData: FormData) => {
	try {
		const response = await fetch(`${base_timviec365}/api/timviec/letter/preview`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: formData,
		})
		return await response.json()
	} catch (error) {}
}

export const don_theo_nganh_nghe = async ({ alias }: any) => {
	let don_theo_nganh_nghe = null
	try {
		const response = await fetch(`${base_timviec365}/api/timviec/appli/list/cate`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				alias: alias,
			}),
		})
		const datas = await response.json()
		don_theo_nganh_nghe = datas || []
		return don_theo_nganh_nghe
	} catch (error) {}
}

// lấy đơn xin việc đã lưu

export const donXinViec_Saved = async (accessToken: any) => {
	try {
		const res = await fetch(`${base_timviec365}/api/timviec/candidate/donXinViec`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			method: 'POST',
			body: JSON.stringify({
				page: 1,
				pageSize: 100,
			}),
		})
		const data = await res.json()
		return data
	} catch (error) {}
}

// lấy syll đã lưu
export const syll_Saved = async (accessToken: any) => {
	try {
		const res = await fetch(`${base_timviec365}/api/timviec/candidate/hosoXinViec`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			method: 'POST',
			body: JSON.stringify({
				page: 1,
				pageSize: 100,
			}),
		})
		const data = await res.json()
		return data
	} catch (error) {}
}

// Chi tiết đơn

// chi tiết cv http://210.245.108.202:3001/api/timviec/cv/detail
export const detailDon = async (id: number, access_tokenne: any) => {
	console.log(id)
	try {
		const res = await fetch(`${base_timviec365}/api/timviec/appli/detail`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_tokenne}`,
			},
			method: 'POST',
			body: JSON.stringify({
				_id: id,
			}),
		})
		const data = await res.json()

		return data
	} catch (error) {}
}

// get don alias
export const getDonWithAlias = async (alias: any) => {
	try {
		const res = await fetch(`${base_timviec365}/api/timviec/appli/list/cate`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				alias: alias,
			}),
		})
		const data = await res.json()
		return data
	} catch (error) {}
}

// tạo đơn

// tạo cv
export const saveDon = async (id: any, lang: any, name_img: any, html: any) => {
	try {
		const formData: any = new FormData()
		formData.append('id', `${id}`)
		formData.append('lang', `${lang}`)
		formData.append('base64', `base64`)
		formData.append('name_img', `${name_img}`)
		formData.append('html', `${JSON.stringify(html)}`)

		const res = await axios.post(`${base_timviec365}/api/timviec/appli/save`, formData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			},
		})
		const data = await res.data
		return data
	} catch (error) {}
}
// ----------------------------- Save -------------------------------
