import { logOut } from "@/components/service/functions";
import axios from "axios";
import { setCookie } from "cookies-next";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

const currentUrl = process.env.NEXT_PUBLIC_BASE_URL_JOBLIKE365;

// 0-ứng viên 1-nhà tuyển dụng 2-nhân viên
export const authorization = ({ isLogin, type }: { isLogin: any; type: any }) => {
    // setCookie("isLogin", isLogin + "");
    // setCookie("type", type + "");

}

export const getCurrentToken = () => {
    // const currentAccessToken = getCookie(`${process.env.NEXT_PUBLIC_TOKEN}`);
    // const tokenJson = currentAccessToken && JSON.parse(`${currentAccessToken}`);
    // return tokenJson && tokenJson[`${process.env.NEXT_PUBLIC_TOKEN}`];
    return Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN}`)
};

export const GET = async (url: string) => {
    const currentToken = getCurrentToken();

    const config = {
        headers: { Authorization: `Bearer ${currentToken}` },
    };

    try {
        const res = await axios.get(`${currentUrl}/${url}`, config);
        if (res?.status === 200) {
            return res?.data?.data;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const POST = async (url: string, conditions: object, token_365?: string | null) => {
    let headers: any = { "Content-Type": "multipart/form-data" };
    const token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN}`);
    if (token)
        headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };
    if (token_365) {
        headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token_365}`,
        };
    }
    try {

        const response = await axios({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_BASE_URL_API}/${url}`,
            data: conditions,
            headers,
        });
        return response.data.data
    } catch (error: any) {
        if (error?.response?.status === 401) {
            alert('Xác thực tài khoản ngay!')
            window.location.href = '/ma-otp'
        } else
            if (error?.response?.status === 402) {
                alert('Hãy đăng nhập')
                logOut()
                window.location.href = '/dang-nhap'
            } else
                if (error?.response?.data?.error?.message) {
                    return {
                        result: false,
                        status: 405,
                        message: error?.response?.data?.error?.message,
                    };
                }
        return null;
    }
};

export const POSTCUSTOM = async (url: string, conditions: object, token_365?: string) => {
    let headers: any = { "Content-Type": "multipart/form-data" };
    const token = getCurrentToken();
    if (token)
        headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };
    if (token_365) {
        headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token_365}`,
        };
    }
    try {
        const response = await axios({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_BASE_URL_API}/${url}`,
            data: conditions,
            headers,
        });
        return response.data
    } catch (error: any) {
        if (error?.response?.data?.error?.message) {
            return {
                result: false,
                status: 405,
                message: error?.response?.data?.error?.message,
            };
        }
        return null;
    }
};

export const POST_SERVER = async (url: string, conditions: object, token_365?: string | null) => {
    let headers: any = { "Content-Type": "multipart/form-data" };
    if (token_365) {
        headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token_365}`,
        };
    }
    try {
        return await axios({
            method: "post",
            url: `${url}`,
            data: conditions,
            headers,
        }).then(async (response) => {
            return response.data.data;
        }).catch((err: any) => {
            // console.log("🚀 ~ POST ~ err:", err)
            return null
        })
    } catch (error: any) {
        if (error?.response?.status === 401) {
            alert('Xác thực tài khoản ngay!')
            window.location.href = '/ma-otp'
        } else
            if (error?.response?.status === 402) {
                alert('Hãy đăng nhập')
                logOut()
                window.location.href = '/dang-nhap'
            } else
                if (error?.response?.data?.error?.message) {
                    return {
                        result: false,
                        status: 405,
                        message: error?.response?.data?.error?.message,
                    };
                }
        return null;
    }
};

export const GetFbConfig = async () => {
    let headers: any = { "Content-Type": "multipart/form-data" };
    let conditions = {
        number: "+840339170155",
        for: "timviechay",
    }
    try {
        const response = await axios({
            method: "post",
            url: `https://api.timviec365.vn:9015/api/users/TakeDataFireBaseOTP`,
            data: conditions,
            headers,
        });
        return response.data.data
    } catch (error: any) {
        if (error?.response?.data?.error?.message) {
            return {
                result: false,
                status: 405,
                message: error?.response?.data?.error?.message,
            };
        }
        return null;
    }
}