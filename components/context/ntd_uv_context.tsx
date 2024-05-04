import { POST } from "@/pages/api/base-api";
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";
import { cookieLogo, cookieName, cookiePhone, cookieToken } from "../service/functions";
import axios from "axios";

export const NTD_UV_Context = createContext<any>(false)

export const NTD_UV_ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [ava, setAva] = useState('')
    const [candiAllowSearch, setCandiAllowSearch] = useState('1');
    const [percentHoSo, setPercentHoSo] = useState('0');
    const [urlUT, setUrlUT] = useState('');
    const [permission, setPermission] = useState<any>();
    const [newSidebar, setNewSidebar] = useState<any>([]);
    const [idBlog, setIdBlog] = useState({
        idDetailItem: 0,
        edit: 0
    });
    const [pointBugget, setPointBugget] = useState({
        idDetailItem: 0,
        edit: 0
    });

    const [pointEdit, setPointEdit] = useState({
        idDetailItem: 0,
        edit: 0
    });

    const [idRecument, setIdRecument] = useState({
        idDetailItem: 0,
        edit: 0
    });

    const [idDetailPostApplication, setdidDetailPostApplication] = useState({
        idDetailItem: 0,
        edit: 0
    });

    const [idDetailApplicationOfList, setdIdDetailApplicationOfList] = useState({
        idDetailItem: 0,
        edit: 0
    });

    const [idPin, setIdPin] = useState({
        idDetailItem: 0,
        edit: 0
    })

    const [idPinded, setIdPined] = useState<any>({
        idDetailItem: 0,
        edit: 0
    })


    const changeNewSidebar = async (data: any) => {
        setNewSidebar(data);
    }
    const [handlePermission, setHandlePermission] = useState<any>({

        add: false,
        edit: false,
        delete: false

    })

    const [idPoint, setIdPoint] = useState(0);
    const [token, setToken] = useState('');
    const [afterUpdate, setAfterUpdate] = useState<any>({
        currentNumberSidebar: 0,
    });

    const [currentSidebar, setCurrentSidebar] = useState<number>(0)

    const [chuyenvien, setChuyenvien] = useState<any>({
        adm_name: '',
        adm_phone: '',
        adm_email: '',
    })

    const [fullRight, setFullRight] = useState(false)
    const checkFullRight = async () => {
        const token = Cookies.get(cookieToken + '_admin')
        if (!token) return;
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/apiCheckFullRight`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )

        if (res.data?.data?.result) {
            setFullRight(!!res.data?.data?.isFullRight)
        }
    }

    const [adminEdit, setAdminEdit] = useState({
        idDetailItem: 0,
        edit: 0
    })

    const [tagTin, setTagTin] = useState<{tag: string, job: string}[]>([])

    const setAll = (name?: string, phone?: string, ava?: string) => {
        name && setName(name), saveDataWithTime(cookieName, `${name}`)
        phone && setPhone(phone), saveDataWithTime(cookiePhone, `${phone}`)
        ava && setAva(ava), saveDataWithTime(cookieLogo, `${ava}`)
        // setGetPoint(true)
    }

    const setCandiAllowEmployerSearch = (allow: string) => {
        setCandiAllowSearch(allow), saveDataWithTime('candiAllowSearch', allow)
    }

    // Đổ từ session 
    useEffect(() => {
        const nameLocal = checkAndGetData(cookieName),
            phoneLocal = checkAndGetData(cookiePhone),
            avaLocal = checkAndGetData(cookieLogo),
            pointLocal = checkAndGetData('point'),
            searchLocal = checkAndGetData('candiAllowSearch'),
            searchPercent = checkAndGetData('percentHoSo'),
            chuyenvienLocal = checkAndGetData('chuyenvien')

        nameLocal && setName(nameLocal)
        phoneLocal && setPhone(phoneLocal)
        avaLocal && avaLocal !== 'undefined' && setAva(avaLocal)
        pointLocal && Number(pointLocal) && setPoint(Number(pointLocal))
        searchLocal && setCandiAllowSearch(searchLocal)
        searchPercent && setPercentHoSo(searchPercent)
        chuyenvienLocal && handleChangeChuyenvien(chuyenvienLocal)

        checkFullRight()
        return () => { };
    }, [])

    // Luồng mới: Thông tin cần phải lưu ít nhất 2 tháng kể từ ngày cập nhật cuối cùng (lần đăng nhập cuối cùng)
    // Hàm lưu và set thời gian
    const saveDataWithTime = (name: string, data: any) => {
        try {
            if (!data) {
                return
            }
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 60);
            // test
            // expiryDate.setMinutes(expiryDate.getMinutes() + 2);
            let saveData: any = {
                data,
                expires: expiryDate
            }
            localStorage.setItem(name, JSON.stringify(saveData))
            // syncTime()
        } catch (error) {
            return
        }
    }
    // Hàm check và lấy dữ liệu 
    const checkAndGetData = (name: string) => {
        try {
            const getDataStr = localStorage.getItem(name)
            if (getDataStr) {
                const getData = JSON.parse(getDataStr)
                if ('expires' in getData && 'data' in getData) {
                    const expiryDate = new Date(getData.expires)
                    let data: any = getData.data
                    if (expiryDate >= new Date()) {
                        if (typeof data === 'object') {
                            // data = JSON.stringify(data)
                        } else {
                            data = `${data}`
                        }
                        return data
                    } else {
                        localStorage.removeItem(name)
                    }
                }
            }
            return null
        } catch (error) {
            return null
        }
    }
    // Đồng bộ thời gian 
    const syncTime = () => {
        try {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 60);
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i)
                if (key) {
                    const value = localStorage.getItem(key)
                    if (value) {
                        const parseValue = JSON.parse(value)
                        if ('expires' in parseValue && 'data' in parseValue) {
                            const newData = {
                                data: parseValue.data,
                                expires: expiryDate
                            }
                            localStorage.setItem(key, JSON.stringify(newData))
                        }
                    }
                }
            }
        } catch (error) {

        }
    }

    const [getPoint, setGetPoint] = useState(false)
    const [point, setPoint] = useState(0)
    const [formDangTin, setFormDangTin] = useState<any>({});

    const fetchPoint = async () => {
        const result = await POST('ntd/ManageServiceNTD', {})
        if (result?.result) {
            setPoint(result?.data?.pointBuy || 0)
        }
    }
    useEffect(() => {
        if (getPoint) {
            fetchPoint()
            setGetPoint(false)
        }
        return () => { };
    }, [getPoint])

    // Những dữ liệu có thể đổi 
    const changeAva = (ava: string) => {
        setAva(ava)
        saveDataWithTime(cookieLogo, ava)
    }
    const changePoint = (point: number) => {
        setPoint(point)
        saveDataWithTime('point', `${point}`)
    }
    const changeName = (name: string) => {
        setName(name)
        saveDataWithTime(cookieName, name)
    }

    const changePercent = async (name: string) => {
        setPercentHoSo(name)
        saveDataWithTime('percentHoSo', name)
    }

    const changePermission = async (data: any) => {
        setPermission(data)
    }

    const changeIdBlog = async (data: any) => {
        setIdBlog({
            idDetailItem: data?.idDetailItem,
            edit: data?.edit
        })
    }

    const changePointBugget = async (data: any) => {
        setPointBugget({
            idDetailItem: data?.idDetailItem,
            edit: data?.edit
        })
    }

    const changePointEdit = async (data: any) => {
        setPointEdit({
            idDetailItem: data?.idDetailItem,
            edit: data?.edit
        })
    }

    const changeIdRecuitment = async (data: any) => {
        setIdRecument({
            idDetailItem: data?.idDetailItem,
            edit: data?.edit
        })
    }

    const changeIdApplication = async (data: any) => {
        setdIdDetailApplicationOfList({
            idDetailItem: data?.idDetailItem,
            edit: data?.edit
        })
    }

    const changeIdPostApplication = async (data: any) => {
        setdidDetailPostApplication({
            idDetailItem: data?.idDetailItem,
            edit: data?.edit
        })
    }

    const changeIdPin = async (data: any) => {
        setIdPin({
            idDetailItem: data?.idDetailItem,
            edit: data?.edit
        })
    }

    const changeIdPined = async (data: any) => {
        setIdPined({
            idDetailItem: data?.idDetailItem,
            edit: data?.edit
        })
    }

    const changeIdPoint = async (id: number) => {
        setIdPoint(id)
    }

    const changeToken = async (id: string) => {
        setToken(id)
    }

    //  current sidebar use
    const changeDetailAfterUpdate = (data: any) => {
        setAfterUpdate({
            currentNumberSidebar: data?.currentNumberSidebar,
        })
    }

    //  current sidebar no use
    const changeCurrentSidebar = (current: number) => {
        setCurrentSidebar(current)
    }

    //  set url khi uv chưa tạo tài khoản
    const changeUrl = (url: string) => {
        setUrlUT(url)
    }

    const handleChangeHandlePermission = async (data: any) => {
        setHandlePermission({
            edit: data.edit,
            add: data.add,
            delete: data.delete
        })
    }

    const handleChangeChuyenvien = (data: any) => {
        setChuyenvien({
            adm_name: data?.adm_name || '',
            adm_phone: data?.adm_phone || '',
            adm_email: data?.adm_email || '',
        })
        saveDataWithTime('chuyenvien', data)
    }

    const changeAdminEdit = async (data: any) => {
        setAdminEdit({
            idDetailItem: data?.idDetailItem,
            edit: data?.edit,
        })
    }

    return (
        <NTD_UV_Context.Provider
            value={{
                name, setName,
                phone, setPhone,
                ava, setAva,
                setAll,
                getPoint, setGetPoint,
                point, setPoint,
                formDangTin, setFormDangTin,
                candiAllowSearch, setCandiAllowSearch,
                setCandiAllowEmployerSearch,
                changeAva,
                changePoint,
                changeName,
                percentHoSo,
                changePercent,
                permission,
                changePermission,
                idBlog,
                changeIdBlog,
                idPoint,
                changeIdPoint,
                token,
                changeToken,
                afterUpdate,
                changeDetailAfterUpdate,
                currentSidebar,
                changeCurrentSidebar,
                pointBugget,
                changePointBugget,
                idRecument,
                changeIdRecuitment,
                pointEdit,
                changePointEdit,
                idDetailApplicationOfList,
                changeIdApplication,
                idDetailPostApplication,
                changeIdPostApplication,
                idPin,
                changeIdPin,
                idPinded,
                changeIdPined,
                urlUT,
                changeUrl,
                chuyenvien,
                handleChangeChuyenvien,
                newSidebar,
                changeNewSidebar,
                handlePermission,
                handleChangeHandlePermission,
                fullRight,
                checkFullRight,
                adminEdit,
                changeAdminEdit,
                tagTin, setTagTin,
            }}
        >
            {children}
        </NTD_UV_Context.Provider>
    )
}