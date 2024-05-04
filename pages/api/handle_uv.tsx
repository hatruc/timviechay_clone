import { cookieStep1, cookieTempId, cookieToken, getPropOrDefault } from "@/components/service/functions"
import { axiosWork247 } from "./api_work247"
import axios from "axios"
import Cookies from "js-cookie"
import { POST } from "./base-api"

export interface registerStep1Type {
    phoneTK: string,
    password: string,
    rePassword: string,
    jobName: string,
    nganhNghe: number[],
    jobCity: number[],
    name: string,
    Image?: Blob
}

export const registerStep1 = async (data: registerStep1Type) => {
    try {
        let errMsg = ''

        const formData = new FormData()
        formData.append('phoneTK', data.phoneTK)
        formData.append('password', data.password)
        formData.append('rePassword', data.rePassword)
        formData.append('jobName', data.jobName)
        formData.append('nganhNghe', data.nganhNghe.join(','))
        formData.append('jobCity', data.jobCity.join(','))
        formData.append('name', data.name)
        data?.Image && formData.append('Image', data.Image)

        await axiosWork247
            .post('/user/RegisterCandidate', formData)
            .then(res => {
                // console.log(res)
                let id = getPropOrDefault(res, 'data.data.data', 0)
                // console.log(returnId)
                if (getPropOrDefault(res, 'data.data.result', false) === true) {
                    Cookies.set(cookieStep1, '1')
                    Cookies.set(cookieTempId, id + '')
                }
            })
            .catch(err => {
                // console.log(getPropOrDefault(err, 'response.data.error.message', ''))
                errMsg = getPropOrDefault(err, 'response.data.error.message', 'Lỗi')
            })

        return errMsg
    } catch (error) {
        console.log(error)
    }

    // const result = await POST('user/RegisterCandidate', data)
    // if (result) {
    //     if (result?.result === false) {
    //         return result.message
    //     } else {
    //         const id = result?.data
    //         Cookies.set(cookieStep1, '1')
    //         Cookies.set(cookieTempId, `${id}`)
    //         return ''
    //     }
    // }
}

export interface registerStep2CreateType {
    id: number,
    cv: string,
    idcv: number,
    lang: number
}

export const registerStep2Create = async (data: registerStep2CreateType) => {
    try {
        let errMsg = ''

        const formData = new FormData()
        formData.append('id', data.id + '')
        formData.append('cv', data.cv)
        formData.append('idcv', data.idcv + '')
        formData.append('lang', data.lang + '')

        await axiosWork247
            .post('/user/CandidateRegisterByCVOnline', formData)
            .then((res) => {
                if (getPropOrDefault(res, 'data.data.result', false) === true) {
                    Cookies.set(cookieToken, getPropOrDefault(res, 'data.data.Token', ''))
                    Cookies.set(cookieStep1, '0')
                    Cookies.set(cookieTempId, '0')
                }
            })
            .catch((err) => {
                // console.log(err)
                errMsg = getPropOrDefault(err, 'response.data.error.message', 'Lỗi')
            })

        return errMsg
    } catch (error) {
        console.log(error)
    }
}

export interface registerStep2UploadType {
    CV: Blob,
    birthday: string,
    exp: number,
    bangcap: string,
    id: number,
}

export const registerStep2Upload = async (data: registerStep2UploadType) => {
    try {
        let errMsg = ''

        const formData = new FormData()
        formData.append('CV', data.CV)
        formData.append('birthday', data.birthday)
        formData.append('exp', `${data.exp}`)
        formData.append('bangcap', data.bangcap)
        formData.append('id', `${data.id}`)

        await axiosWork247
            .post('/user/CandidateRegisterByUploadCV', formData)
            .then((res) => {
                if (getPropOrDefault(res, 'data.data.result', false) === true) {
                    Cookies.set(cookieToken, getPropOrDefault(res, 'data.data.Token', ''))
                    Cookies.set(cookieStep1, '0')
                    Cookies.set(cookieTempId, '0')
                }
            })
            .catch((err) => {
                errMsg = getPropOrDefault(err, 'response.data.error.message', 'Lỗi')
            })

        return errMsg
    } catch (error) {
        console.log(error)
    }
}

export interface loginType {
    username: string,
    password: string
}

export const login = async (data: loginType) => {
    try {
        let errMsg = ''

        const formData = new FormData()
        formData.append('username', data.username)
        formData.append('password', data.password)

        await axiosWork247
        .post('/user/LoginCandidate', formData)
        .then((res) => {
            // console.log(getPropOrDefault(res, 'data.data.result', ''))
            if (getPropOrDefault(res, 'data.data.result', false) === 'true') {
                Cookies.set(cookieToken, getPropOrDefault(res, 'data.data.Token', ''))
                Cookies.set(cookieStep1, '0')
                Cookies.set(cookieTempId, '0')
            }
        })
        .catch((err) => {
            errMsg = getPropOrDefault(err, 'response.data.error.message', 'Lỗi')
            // console.log(err)
        })

        return errMsg
    } catch (error) {
        console.log(error)
    }
}