import { cookieToken } from "@/components/service/functions"
import axios from "axios"
import Cookies from "js-cookie"

const base_work247 = 'https://43.239.223.188/api/work247'
export const axiosWork247 = axios.create({
    baseURL: base_work247,
    headers: {
        "Content-Type": "application/json"
    }
})
axiosWork247.interceptors.request.use((config: any) => {
    let accessToken = Cookies.get(cookieToken)
    return {...config, headers: {Authorization: `Bearer ${accessToken}`}}
})