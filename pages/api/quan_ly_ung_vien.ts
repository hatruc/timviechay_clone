// api page /ho-so-ung-vien
import axios from 'axios'
import { base_timviec365 } from '@/components/service/functions'
import { parse, getTime } from 'date-fns'
import Cookies from 'js-cookie'
// Lấy thông tin
export const getInfor = async (iduser: any, token?: any) => {
	const access_token1 = Cookies.get('work247_token')
	try {
		const response = await fetch(`${base_timviec365}/api/timviec/candidate/infoCandidate`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token || access_token1}`,
			},
			body: JSON.stringify({
				iduser: iduser,
			}),
			method: 'POST',
		})
		return await response.json()
	} catch (error) { }
}

export const getData = async (url: any) => {
	try {
		const response = await axios.post(`${base_timviec365}/api/getData/${url}`)
		return response.data
	} catch (error) { }
}

export const getInforNo = async (iduser: any) => {
	try {
		const response = await fetch(`${base_timviec365}/api/timviec/candidate/infoCandidate`, {
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				iduser: iduser,
			}),
			method: 'POST',
		})
		return await response.json()
	} catch (error) { }
}
// update thông tin liên hệ
export const updateInforC = async (data: any, accessToken?: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		var ngayThang = new Date(data?.ngaysinh)
		var bir: any = ngayThang.getTime() / 1000
		// Mã hóa chuỗi và lấy mã hex kết quả
		const formData = new FormData()
		formData.append('name', data.hoten)
		formData.append('phone', data.phone)
		formData.append('address', data.address)
		formData.append('birthday', bir)
		formData.append('gioitinh', data?.gioitinh)
		formData.append('honnhan', data?.honnhan)
		formData.append('thanhpho', data?.cities)
		formData.append('quanhuyen', data?.district)
		formData.append('file', data?.file)
		formData.append('email_lh', data?.email)
		const url = `${base_timviec365}/api/timviec/candidate/updateContactInfo`

		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${accessToken || access_token1}`,
			},
		})
		return await res.data
	} catch (error) {
		return error
	}
}
// update bằng cấp, học vấn
export const updateDegree = async (data: any, idhv: any, accessToken?: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		const t1 = parse(data?.thoigianfrom, 'dd/MM/yyyy', new Date())
		const t2 = parse(data?.thoigianto, 'dd/MM/yyyy', new Date())
		var time1: any = t1.getTime() / 1000
		var time2: any = t2.getTime() / 1000
		// Mã hóa chuỗi và lấy mã hex kết quả
		const formData = new FormData()
		formData.append('bc', data.chungchi)
		formData.append('truonghoc', data.truong)
		formData.append('chuyennganh', data.chuyennganh)
		formData.append('xeploai', data.xeploai)
		formData.append('bosung', data?.bosung)
		formData.append('onetime', time1)
		formData.append('twotime', time2)
		formData.append('idhv', idhv)

		const url = `${base_timviec365}/api/timviec/candidate/updateDegree`

		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${access_token1 || accessToken}`,
			},
		})
		if (res?.status === 200) {
			return res?.data?.data
		} else {
			return null
		}
	} catch (error: any) {
		if (error.response && error.response.status === 400) {
			const errorMessage = error.response.data.error.message
			console.log(errorMessage)
		} else {
			console.log(error)
		}
		return null
	}
}
// thêm bằng cấp
export const addDegree = async (data: any, idhv: any, accessToken?: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		const t1 = parse(data?.thoigianfrom, 'dd/MM/yyyy', new Date())
		const t2 = parse(data?.thoigianto, 'dd/MM/yyyy', new Date())
		var time1: any = t1.getTime() / 1000
		var time2: any = t2.getTime() / 1000
		// Mã hóa chuỗi và lấy mã hex kết quả
		const formData = new FormData()
		formData.append('bc', data.chungchi)
		formData.append('truonghoc', data.truong)
		formData.append('chuyennganh', data.chuyennganh)
		formData.append('xeploai', data.xeploai)
		formData.append('bosung', data?.bosung)
		formData.append('onetime', time1)
		formData.append('twotime', time2)

		const url = `${base_timviec365}/api/timviec/candidate/addDegree`

		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${access_token1 || accessToken}`,
			},
		})
		return await res.data
	} catch (error) {
		return error
	}
}
// Xóa bằng cấp
export const deleteDegree = async (idhv: any, accessToken?: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		const formData = new FormData()

		formData.append('idhv', idhv)

		const url = `${base_timviec365}/api/timviec/candidate/deleteDegree`

		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${access_token1 || accessToken}`,
			},
		})
		return await res.data
	} catch (error) {
		return error
	}
}

// update công việc mong muốn

export const updateDesiredJob = async (data: any, accessToken?: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		// Mã hóa chuỗi và lấy mã hex kết quả
		const formData = new FormData()
		formData.append('cate', data.nganhnghe.join(','))
		formData.append('title', data.vitri)
		formData.append('capbac', data.capbac)
		formData.append('kn', data.kinhnghiem)
		formData.append('ht', data.hinhthuc)
		formData.append('city', data.citis)
		formData.append('district', data.district)
		formData.append('money_unit', data?.lg_money_unit)
		formData.append('money_type', data?.lg_money_kg)
		formData.append('address', data?.address)
		if (data?.lg_money_min) {
			formData.append('money_min', data?.lg_money_min)
		}
		if (data?.lg_money_max) {
			formData.append('money_max', data?.lg_money_max)
		}
		formData.append('money_kg', data?.lg_money_type)

		const url = `${base_timviec365}/api/timviec/candidate/updateDesiredJob`

		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${access_token1 || accessToken}`,
			},
		})
		return await res.data
	} catch (error) {
		return error
	}
}

// update người tham chiếu

export const updateReferencePersonInfo = async (data: any, access_token: any) => {
	try {
		// Mã hóa chuỗi và lấy mã hex kết quả
		const formData = new FormData()
		formData.append('cv_tc_name', data.hoten)
		formData.append('cv_tc_dc', data.cv_tc_dc)
		formData.append('cv_tc_phone', data.phone)
		formData.append('cv_tc_cv', data.chucdanh)
		formData.append('cv_tc_email', data.email)
		formData.append('cv_tc_company', data.congty)
		const url = `${base_timviec365}/api/timviec/candidate/updateReferencePersonInfo`

		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})
		return await res.data
	} catch (error) {
		return error
	}
}

// update ky nagupdateCareerGoals
export const nagupdateCareerGoals = async (data: any, access_token: any) => {
	try {
		// Mã hóa chuỗi và lấy mã hex kết quả
		const formData = new FormData()
		formData.append('muctieu', data.muctieu)
		formData.append('giaithuong', data.giaithuong)
		formData.append('hoatdong', data.hoatdong)
		formData.append('sothich', data.sothich)
		formData.append('kynang', data.kynang)
		const url = `${base_timviec365}/api/timviec/candidate/updateCareerGoals`

		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})
		return await res.data
	} catch (error) {
		return error
	}
}

// update kinh nghiem lam viec

export const updateExp = async (data: any, idhv: any, accessToken?: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		const t1 = parse(data?.kn_one_time, 'dd/MM/yyyy', new Date())
		const t2 = parse(data?.kn_two_time, 'dd/MM/yyyy', new Date())
		var time1: any = t1.getTime() / 1000
		var time2: any = t2.getTime() / 1000
		const formData = new FormData()
		formData.append('kn_name', data.kn_name)
		formData.append('kn_cv', data.kn_cv)
		formData.append('kn_mota', data.kn_mota)
		formData.append('kn_one_time', time1)
		formData.append('kn_two_time', time2)
		formData.append('kn_id', idhv)
		formData.append('kn_duan', data?.kn_duan)

		const url = `${base_timviec365}/api/timviec/candidate/updateExp`

		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${accessToken || access_token1}`,
			},
		})
		return await res.data
	} catch (error) {
		return error
	}
}

//add kinh nghiệm

export const addExp = async (data: any, accessToken?: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		const t1 = parse(data?.kn_one_time, 'dd/MM/yyyy', new Date())
		const t2 = parse(data?.kn_two_time, 'dd/MM/yyyy', new Date())
		var time1: any = t1.getTime() / 1000
		var time2: any = t2.getTime() / 1000
		// Mã hóa chuỗi và lấy mã hex kết quả
		const formData = new FormData()
		formData.append('kn_name', data.kn_name)
		formData.append('kn_cv', data.kn_cv)
		formData.append('kn_mota', data.kn_mota)
		formData.append('kn_one_time', time1)
		formData.append('kn_two_time', time2)
		formData.append('kn_duan', data?.kn_duan)

		const url = `${base_timviec365}/api/timviec/candidate/addExp`

		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${accessToken || access_token1}`,
			},
		})
		return await res.data
	} catch (error) {
		return error
	}
}

// Xóa kinh nghiệm deleteExp
export const deleteExp = async (id: any, accessToken?: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		const formData = new FormData()
		formData.append('idkn', id)
		const url = `${base_timviec365}/api/timviec/candidate/deleteExp`
		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${accessToken || access_token1}`,
			},
		})
		return await res.data
	} catch (error) {
		return error
	}
}
// update avartar
export const updateAvatarUser = async (AvatarUser: any, accessToken?: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		const formData = new FormData()
		formData.append('AvatarUser', AvatarUser)
		const url = `${base_timviec365}/api/timviec/candidate/updateAvatarUser`
		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${access_token1 || accessToken}`,
			},
		})
		return await res.data
	} catch (error) {
		return error
	}
}
// update video
export const updateIntroVideo = async (videoUpload: any, access_token: any, link?: any) => {
	try {
		const formData = new FormData()
		if (videoUpload.length) {
			formData.append('videoLink', videoUpload)
		} else {
			formData.append('videoUpload', videoUpload)
		}

		const url = `${base_timviec365}/api/timviec/candidate/updateIntroVideo`
		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})
		return await res.data
	} catch (error) {
		return error
	}
}

// cập nhật trạng thái tìm kiếm
//use_show
export const setting_display = async (access_token?: any) => {
	try {
		const url = `${base_timviec365}/api/timviec/candidate/setting_display`
		const res: any = await axios.post(
			url,
			{},
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		)
		return await res.data
	} catch (error) {
		return error
	}
}

//data trang quản lý ứng viên

export const completeProfileQlc = async (accessToken?: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		const url = `${base_timviec365}/api/timviec/candidate/completeProfileQlc`
		const res: any = await axios.post(
			url,
			{},
			{
				headers: {
					Authorization: `Bearer ${access_token1 || accessToken}`,
				},
			}
		)
		return await res.data
	} catch (error) {
		return error
	}
}

// danh sách hồ sơ đã tải

export const listProfileUploaded = async (accessToken?: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		const url = `${base_timviec365}/api/timviec/candidate/listProfileUploaded`
		const res: any = await axios.post(
			url,
			{},
			{
				headers: {
					Authorization: `Bearer ${access_token1 || accessToken}`,
				},
			}
		)
		return await res.data
	} catch (error) {
		return error
	}
}

// tải lên hồ sơ

export const upLoadHoSo = async (access_token: any, cvname: any, file: any) => {
	try {
		const formData = new FormData()
		formData.append('cv', file)
		formData.append('cvname', cvname)

		const url = `${base_timviec365}/api/timviec/candidate/upLoadHoSo`
		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})
		return await res.data
	} catch (error) {
		return error
	}
}

export const syncInfoCandiFromCvUploadWithAI = async (userId: any, linkImg: any) => {
	try {
		const formData = new FormData()
		formData.append('userId', userId)
		formData.append('linkImg', linkImg)
		const url = `${base_timviec365}/api/timviec/candidate/syncInfoCandiFromCvUploadWithAI`
		const res: any = await axios.post(url, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
		return res.data
	} catch (error) {
		return error
	}
}

// xóa hồ sơ tải lên

export const deleteProfile = async (access_token: any, hs_id: any) => {
	try {
		const formData = new FormData()
		formData.append('hs_id', hs_id)

		const url = `${base_timviec365}/api/timviec/candidate/deleteProfile`
		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})
		return await res.data
	} catch (error) {
		return error
	}
}

// làm mới hồ sơ RefreshProfile

export const RefreshProfile = async (access_token: any) => {
	try {
		const url = `${base_timviec365}/api/timviec/candidate/RefreshProfile`
		const res: any = await axios.post(
			url,
			{},
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		)
		return await res.data
	} catch (error) {
		return error
	}
}

// lấy danh sách phân quyền http://210.245.108.202:3001/api/timviec/permission/getListPermissionByUser
// Update phân quyền
export const getListPermissionByUser = async (type: any, accessToken?: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		const formData = new FormData()
		formData.append('type', type)
		const url = `${base_timviec365}/api/timviec/permission/getListPermissionByUser`
		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${accessToken || access_token1}`,
			},
		})
		return await res.data
	} catch (error) {
		return error
	}
}
export const updatePermissions = async (listdata: any, accessToken?: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		const formData = new FormData()

		const data: any = JSON.stringify(
			listdata?.flatMap((item: any) =>
				item?.rs_usc?.map((itemc: any) => ({
					id_chat: itemc.id,
					type_noti: item?.pn_type_noti === '0' ? '1,2,3,4' : item?.pn_type_noti || '',
				}))
			)
		)

		formData.append('listPermissions', data)
		const url = `${base_timviec365}/api/timviec/candidate/updatePermissions`

		const res: any = await axios.post(url, formData, {
			headers: {
				Authorization: `Bearer ${accessToken || access_token1}`,
			},
		})

		return await res.data
	} catch (error) {
		return error
	}
}

// getuser by getUserByIdChat
export const getUserByIdChat = async (Infor: any) => {
	try {
		const formData = new FormData()
		formData.append('Infor', Infor)
		const url = `${base_timviec365}/api/timviec/permission/getUserByIdChat`
		const res: any = await axios.post(url, formData, {
			headers: {},
		})
		return await res.data
	} catch (error) {
		return error
	}
}

// lấy danh sách vote của ứng viênhttp://210.245.108.202:3001/api/timviec/candidate/getVote
export const getVoteUV = async (userId: any) => {
	try {
		const formData = new FormData()
		formData.append('userId', userId)
		formData.append('userType', '0')
		const url = `${base_timviec365}/api/timviec/candidate/getVote`
		const res: any = await axios.post(url, formData, {
			headers: {},
		})
		return await res.data
	} catch (error) {
		return error
	}
}

// cv đại diện
export const chooseCv = async (cvid: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		const response = await fetch(`${base_timviec365}/api/timviec/candidate/chooseCv`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token1}`,
			},
			body: JSON.stringify({
				cvid: cvid,
			}),
			method: 'POST',
		})
		return await response.json()
	} catch (error) { }
}
// cv đại diện
export const activeProfile = async (hs_id: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		const response = await axios.post(
			`${base_timviec365}/api/timviec/candidate/activeProfile`,
			{ hs_id: hs_id },
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${access_token1}`,
				},
			}
		)

		return response.data
	} catch (error) { }
}

export const uploadImg = async (formData: any) => {
	try {
		const access_token1 = Cookies.get('work247_token')
		const response = await axios.post(`${base_timviec365}/api/timviec/candidate/uploadImg`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${access_token1}`,
			},
		})

		return response.data
	} catch (error) {
		// Xử lý lỗi
	}
}
