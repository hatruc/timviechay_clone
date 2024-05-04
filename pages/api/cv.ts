import { base_timviec365 } from "@/components/service/functions";
import { access_token } from "@/utils/convert";
import axios from "axios";

// Lấy thông tin module seo
export const getModuleSeo = async (module: any) => {
    try {
        const res = await fetch(`${base_timviec365}/api/timviec/cv/module`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                module: module,
            }),
        });
        const data = await res.json();
        return data;
    } catch (error) {}
};

// Lấy data default trang cv-xin-viec, tim kiem

export const getCVSSRXinViec = async (
    pageSize: number,
    sortBy?: any,
    cate?: number,
    lang?: number,
    designID?: number
) => {
    try {
        const fd = new FormData();
        fd.append("pageNumber", "1");
        fd.append("pageSize", pageSize?.toString());
        fd.append("sortBy", sortBy?.toString());
        if (cate) fd.append("cate", cate?.toString());
        if (lang) fd.append("lang", lang?.toString());
        if (designID) fd.append("designID", designID?.toString());

        const res = await axios.post(
            `${base_timviec365}/api/timviec/cv/getList`,
            fd,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        let data = {};
        if (res?.status === 200) {
            data = res?.data;
        }
        return data;
    } catch (error) {
        console.log(error);
    }
};

// data site cv Ngon Ngu
export const getCVSSRNgonNgu = async (
    pageSize: number,
    lang?: any,
    sortBy?: any
) => {
    try {
        const res = await fetch(`${base_timviec365}/api/timviec/cv/getList`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                pageNumber: 1,
                pageSize: pageSize,
                sortBy: sortBy,
                lang: lang,
            }),
        });
        const data = await res.json();
        return data;
    } catch (error) {}
};

// seo cv ngon ngu
export const getSeoCVNgonNgu = async (lang?: any) => {
    try {
        const res = await fetch(
            `${base_timviec365}/api/timviec/cv/seo_dm_nn_cv`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    lang_id: lang,
                }),
            }
        );
        const data = await res.json();
        return data;
    } catch (error) {}
};

// Lấy cv theo ngành nghề - alias

export const getCvWithAlias = async (alias: any) => {
    try {
        const res = await fetch(`${base_timviec365}/api/timviec/cv/list/cate`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                alias: alias,
            }),
        });
        const data = await res.json();
        return data;
    } catch (error) {}
};

// Lấy cv theo ngành nghề - cate_id

export const getCvWithCate = async (
    page?: any,
    pageSize?: any,
    cate_id?: any
) => {
    try {
        const res = await fetch(`${base_timviec365}/api/timviec/cv/list/cate`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                page: page,
                pageSize: pageSize,
                cate_id: cate_id,
            }),
        });
        const data = await res.json();
        return data;
    } catch (error) {}
};

export const listCV = async () => {
    try {
        const res = await fetch(`${base_timviec365}/api/timviec/cv/getList`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                pageSize: 100,
            }),
        });
        const data = await res.json();
        return data;
    } catch (error) {}
};

// Lấy thông tin chi tiết CV xem trước
export const getCvView = async (_id: any) => {
    try {
        const res = await fetch(`${base_timviec365}/api/timviec/cv/preview`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                _id: _id,
            }),
        });
        const data = await res.json();
        return data;
    } catch (error) {}
};

// Thích CV
export const likeCv = async (type: any, idcv: any, accessToken?: any) => {
    try {
        const res = await fetch(`${base_timviec365}/api/timviec/cv/like`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken || access_token}`,
            },
            method: "POST",
            body: JSON.stringify({
                type: type,
                idcv: idcv,
            }),
        });
        const data = await res.json();
        return data;
    } catch (error) {}
};

// Lấy danh sách cv đã lưu

export const getListCV_Saved = async (accessToken?: any) => {
    try {
        const res = await fetch(
            `${base_timviec365}/api/timviec/candidate/cvXinViec`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken || access_token}`,
                },
                method: "POST",
                body: JSON.stringify({
                    page: 1,
                    pageSize: 100,
                }),
            }
        );
        const data = await res.json();
        return data;
    } catch (error) {}
};

// chi tiết cv http://210.245.108.202:3001/api/timviec/cv/detail
export const detailCv = async (id: any, access_tokenne?: any) => {
    try {
        if (access_tokenne) {
            const res = await fetch(
                // `${base_timviec365}/api/timviec/cv/detail`
                `${base_timviec365}/api/timviec/cv/detail`,

                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_tokenne}`,
                    },
                    method: "POST",
                    body: JSON.stringify({
                        url_alias: id,
                    }),
                }
            );
            const data = await res.json();
            return data;
        } else {
            const res = await fetch(
                // `${base_timviec365}/api/timviec/cv/detail`
                `${base_timviec365}/api/timviec/cv/detail`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        url_alias: id,
                    }),
                }
            );
            const data = await res.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

// tạo cv
export const saveCV = async (
    cvid: any,
    lang: any,
    height_cv: any,
    name_img: any,
    html: any
) => {
    try {
        const formData: any = new FormData();
        formData.append("cvid", `${cvid}`);
        formData.append("lang", `${lang}`);
        formData.append("height_cv", `${height_cv}`);
        formData.append("name_img", `${name_img}`);
        formData.append("allowSendChat", `1`);
        formData.append("html", `${JSON.stringify(html)}`);

        const res = await axios.post(
            `${base_timviec365}/api/timviec/cv/saveCV`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        const data = await res.data;
        return data;
    } catch (error) {}
};
//lưu cv khi đăng ký
export const saveCVRes = async (
    cvid: any,
    lang: any,
    height_cv: any,
    name_img: any,
    html: any,
    access_tokenne: any
) => {
    try {
        const formData: any = new FormData();
        formData.append("cvid", `${cvid}`);
        formData.append("lang", `${lang}`);
        formData.append("height_cv", `${height_cv}`);
        formData.append("name_img", `${name_img}`);
        formData.append("allowSendChat", `1`);
        formData.append("html", `${JSON.stringify(html)}`);

        const res = await axios.post(
            `${base_timviec365}/api/timviec/cv/saveCV`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_tokenne}`,
                },
            }
        );
        const data = await res.data;
        return data;
    } catch (error) {}
};
// xóa cv, đơn, thư, syll http://210.245.108.202:3001/api/timviec/candidate/delfile
export const delfile = async (id: any, type: any) => {
    try {
        const formData: any = new FormData();
        formData.append("id", `${id}`);
        formData.append("type", `${type}`);

        const res = await axios.post(
            `${base_timviec365}/api/timviec/candidate/delfile`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        const data = await res.data;
        return data;
    } catch (error) {}
};

// upload avatar cv uploadAvatarCV

export const uploadAvatarCV = async (img: any, access_token2: any) => {
    try {
        const formData: any = new FormData();
        formData.append("img", `${img}`);
        const res = await axios.post(
            `${base_timviec365}/api/timviec/cv/uploadAvatarCV`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token2}`,
                },
            }
        );
        const data = await res.data;
        return data;
    } catch (error) {}
};
// render cv preview http://210.245.108.202:3001/api/timviec/cv/renderPreview

export const renderPreview = async (
    cvid: any,
    lang: any,
    id: any,
    html: any,
    access_tokenne: any
) => {
    try {
        const formData: any = new FormData();
        formData.append("cvid", `${cvid}`);
        formData.append("lang", `${lang}`);
        formData.append("id", `${id}`);
        formData.append("json_cv", `${JSON.stringify(html)}`);

        const res = await axios.post(
            `${base_timviec365}/api/timviec/cv/renderPreview`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_tokenne}`,
                },
            }
        );
        const data = await res.data;
        return data;
    } catch (error) {}
};
