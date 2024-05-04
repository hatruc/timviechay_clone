
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Checkbox, Col, ConfigProvider, DatePicker, Form, Popconfirm, Row, Select } from 'antd'
import { ActionType, ProColumns, ProForm, ProFormText } from '@ant-design/pro-components';
import { getAllCandidate } from '@/pages/api/candidate';
import { format } from 'date-fns';
import { DeleteOutlined, EditOutlined, TableOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { DatePickerProps } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import styles from './index.module.scss'
import DataTable from '../../table';
import { getAllCity, getDistrict, handleChangeDateEnd, handleChangeDateStart } from '@/functions/functions';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
import { POST } from '@/pages/api/base-api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
import AdminAddRecuitment from '../ntd-add';
import AdminDetailRecuitment from '../detail';
import Link from 'next/link';

const AdminAllRecruitment = () => {
    const { token, setAll, handlePermission, afterUpdate, afterUpdatev, changeDetailAfterUpdate, idRecument,
        changeIdRecuitment } = useContext(NTD_UV_Context);
    const router = useRouter()
    const [isFetching, setIsFetching] = useState(true)
    const tableRef = useRef<ActionType>();

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(30)
    const [totalPages, setTotalPages] = useState(1)
    const [totalRecord, setTotalRecord] = useState(100)
    const [listDistrictFilter, setListDistricFilter] = useState<any>([]);
    const [districtReRender, setDistrictReRender] = useState<number>(1);

    const [dataTable, setDataTable] = useState([])
    const [form] = Form.useForm()
    const [dataFilter, setDataFilter] = useState<any>({});

    const [vip, setVip] = useState('')
    const [provinceSelected, setProvinceSelected] = useState()
    const [sourceSelected, setSourceSelected] = useState('')

    const [dateStart, setDateStart] = useState<string>()
    const [dateEnd, setDateEnd] = useState<string>()


    const LoginNTD = async (record: any) => {
        const res = await axios.post(process.env.NEXT_PUBLIC_BASE_URL_API + '/admin/LoginAs', {
            id: record.usc_id,
            type: 1
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res?.data.data.result) {
            const newData = res.data.data
            console.log('newData', newData);
            Cookies.set('work247_token', newData.Token, { expires: 1 })
            Cookies.set('id', newData.id, { expires: 60 })
            Cookies.set('auth', newData.auth, { expires: 60 })
            Cookies.set('work247_type', '1', { expires: 60 })
            Cookies.set('phone', newData.phone, { expires: 60 })
            Cookies.set('userName', newData.name, { expires: 60 })
            newData.RefreshToken && Cookies.set('rf_token', newData.rfToken, { expires: 60 })
            Cookies.set('isLogin', newData.logo, { expires: 60 })
            Cookies.set('email', record.usc_email)
            setAll(record.usc_company, newData.phone, newData.logo)
            window.open('/nha-tuyen-dung/quan-ly-chung', '_blank');
        }
    };

    const onActiveSubmit = async (record: any) => {

        try {
            const post = await axios.post(process.env.NEXT_PUBLIC_BASE_URL_API + "/admin/VerifyAccount", {
                id: record?.usc_id,
                type: 1,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (post.data.data.result) {
                return post.data.data.result
            }
        } catch (err) {
            console.log(err);
        }
    };

    const columns: ProColumns<any>[] = [
        {
            title: 'STT',
            render: (text, record, index, action) => {
                return (
                    <>{index + 1}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'ID',
            dataIndex: 'usc_id',
            hideInSearch: true
        },
        {
            title: 'Tên công ty',
            dataIndex: 'usc_company',
            hideInSearch: true,
            render: (text, record, index, action) => {
                return (
                    <>
                        <Link
                            href={`/nha-tuyen-dung/chi-tiet-cong-ty/${record?.usc_id}`}
                            target='_blank'
                        >
                            {text}
                        </Link>
                    </>
                )
            }
        },
        {
            title: 'SĐT(tk đăng nhập)',
            dataIndex: 'usc_phone_tk',
            hideInSearch: true
        },
        {
            title: 'Email(tk đăng nhập)',
            dataIndex: 'usc_email',
            hideInSearch: true
        },
        {
            title: 'Email',
            dataIndex: 'usc_name_email',
            hideInSearch: true
        },
        {
            title: 'SĐT',
            dataIndex: 'usc_name_phone',
            hideInSearch: true
        },
        {
            title: 'Skype or Zalo',
            dataIndex: 'usc_skype',
            hideInSearch: true
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'usc_address',
            render: (text, record, index, action) => {
                return (
                    <><p style={{
                        minWidth: '250px'
                    }}>{record.usc_address}</p></>
                )
            },
            hideInSearch: true
        },
        {
            title: 'Website',
            dataIndex: 'usc_website',
            hideInSearch: true,
        },
        {
            title: 'MST',
            dataIndex: 'usc_mst',
            hideInSearch: true,
        },
        {
            title: 'Trạng thái vip',
            dataIndex: 'vip',
            render: (text, record, index, action) => {
                return (
                    <><Checkbox disabled={handlePermission.edit ? false : true} checked={text == 0 ? false : true} onChange={(e) => handleSelectShow(e.target.checked)} /></>
                    // <>
                    //     <p>{text}</p>
                    // </>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: `usc_create_time`,
            render: (text, record, index, action) => {
                return (
                    // <>{record.usc_create_time}</>
                    <>{record.usc_create_time ? format(record.usc_create_time * 1000, `dd/MM/yyyy`) : record.usc_create_time}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Active',
            hideInSearch: true,
            dataIndex: 'usc_active',
            render: (text, record, index, action) => {
                return (
                    <><Checkbox disabled={handlePermission.edit ? false : true} defaultChecked={record.usc_active !== 0 ? true : false} onChange={(e) => handleSelectShow(e.target.checked)} /></>
                )
            },
        },
        {
            title: 'Xác thực',
            hideInSearch: true,
            dataIndex: 'usc_authentic',
            render: (text, record, index, action) => {
                return (
                    <>{record.usc_authentic ? <Button disabled style={{
                        background: '#b8ddef',
                        color: '#FFFF'
                    }}>Đã xác thực</Button> : <Button onClick={async () => {
                        if (handlePermission.edit) {
                            const isDoneActive = await onActiveSubmit(record);
                            if (isDoneActive) {
                                const updatedRecord = {
                                    ...record,
                                    usc_authentic: true // Set to true for active
                                };
                                const updatedData: any = [...dataTable];
                                updatedData[index] = updatedRecord;
                                setDataTable(updatedData);
                            }
                        }
                    }} style={{
                        background: '#44b0e6',
                        color: '#FFFF'
                    }}>Xác thực</Button>
                    }</>
                )
            },
        },
        // {
        //     title: 'Login',
        //     hideInSearch: true,
        //     render: (text, record, index, action) => {
        //         return (
        //             <><Checkbox disabled={handlePermission.edit ? false : true} defaultChecked={record.is_login !== 0 ? true : false} onChange={(e) => handleSelectShow(e.target.checked)} /></>
        //         )
        //     },
        // },
        {
            title: 'index',
            hideInSearch: true,
            render: (text, record, index, action) => {
                return (
                    <><Checkbox disabled={handlePermission.edit ? false : true} defaultChecked={record.usc_index !== 0 ? true : false} onChange={(e) => handleSelectShow(e.target.checked)} /></>
                )
            },
        },
        {
            title: 'Ghi chú',
            render: (text, record, index, action) => {
                return (
                    <>
                        <p>{record.usc_note}</p>
                    </>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Đăng nhập',
            render: (text, record, index, action) => {
                return (
                    <>
                        <Button onClick={() => LoginNTD(record)} style={{
                            background: '#44b0e6',
                            color: '#FFFF'
                        }}>Login</Button>
                    </>
                )
            },
            hideInSearch: true,
        },
        {

            title: 'Sửa',
            hideInSearch: true,
            width: 50,
            render: (text, record, index, action) => (<EditOutlined
                style={{
                    fontSize: 20,
                    color: `${handlePermission.edit ? '#ffa500' : '#ddcfb6'}`,
                }}
                type=""
                onClick={() => {
                    if (handlePermission.edit) {
                        changeDetailAfterUpdate(
                            {
                                currentNumberSidebar: 22,
                            })
                        changeIdRecuitment({
                            idDetailItem: record.usc_id,
                            edit: 2
                        })
                    }
                }}
            />
            ),

        },
        {
            title: 'id chuyên viên',
            hideInSearch: true,
            width: 50,
            dataIndex: 'usc_kd'
        },
    ];

    const getTotal = (data: any) => {
        axios
            .post(
                process.env.NEXT_PUBLIC_BASE_URL_API + "/admin/count",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            .then((response) => {
                setTotalRecord(response.data.data.total);
                setTotalPages(Math.ceil(response.data.data.total / itemsPerPage));
            })
            .catch((error) => {
                alert(error);
            });
    };

    const handleGetData = async (data: any) => {
        setIsFetching(true)
        const json = {
            "module": 15,
            "page": currentPage,
            "pageSize": itemsPerPage,
            "conditions": {
                "usc_id": data?.usc_id,
                "usc_company": data?.usc_company?.trim(),
                "usc_phone_tk": data?.usc_phone_tk?.trim(),
                "usc_email": data?.usc_email?.trim(),
                "usc_name_email": data?.usc_name_email?.trim(),
                "usc_name_phone": data?.usc_name_phone?.trim(),
                "usc_mst": data?.usc_mst?.trim(),
                "vip": vip.toString()?.trim(),
                "usc_city": provinceSelected,
                "usc_district": districtReRender
            },
            "from": dateStart,
            "to": dateEnd
        }
        const res = await getAllCandidate(json, token, '')
        if (res?.data) {
            setDataTable(res.data)
        }
        setIsFetching(false)
        getTotal(json)
    }

    const handleFilter = async (params: any, sort: any, filter: any): Promise<any> => {
        let filterValue = form.getFieldsValue();
        setDataFilter(filterValue)
        setItemsPerPage(params.pageSize)
        setCurrentPage(params.current)
        handleGetData(filterValue)
    }

    const handleSelectShow = (value: boolean) => {
        console.log(value)
    }

    const onFinish = async (values: any) => {
        setCurrentPage(1)
        setDataFilter(values)
        handleGetData(values)
    }

    const handleDateStart: DatePickerProps['onChange'] = (date: any, dateString: any) => {
        const value = handleChangeDateStart(date, dateString)
        setDateStart(value)
    };

    const handleDateEnd: DatePickerProps['onChange'] = (date: any, dateString: any) => {
        const value = handleChangeDateEnd(date, dateString)
        setDateEnd(value)
    };

    useEffect(() => {
        if (idRecument.edit !== 2) {
            changeDetailAfterUpdate({
                currentNumberSidebar: 22,
            })
            changeIdRecuitment({
                idDetailItem: 0,
                edit: 0
            })
            handleGetData(dataFilter)
        }
    }, [])

    useEffect(() => {
        if (provinceSelected) {
            const newDistric = getDistrict(provinceSelected as number)
            setListDistricFilter([
                {
                    'label': 'Chọn quận huyện',
                    'value': 0
                },
                ...newDistric])
            setDistrictReRender(0)
        } else {
            setDistrictReRender(0)
            setListDistricFilter([
                {
                    'label': 'Chọn quận huyện',
                    'value': 0
                }
            ])
        }
    }, [provinceSelected])

    return (
        <div id="ntd-form">
            {
                idRecument.edit == 2 ? <AdminDetailRecuitment /> :
                    <Row>
                        <Col span={24}>
                            <ProForm
                                form={form}
                                onFinish={onFinish}
                                submitter={
                                    {
                                        searchConfig: {
                                            resetText: "Hủy",
                                            submitText: <>{"Tìm kiếm"}</>
                                        },
                                        resetButtonProps: false,
                                        render: (_: any, dom: any) => <div style={{ marginTop: '20px' }}>{dom}</div>,
                                    }
                                }
                            >
                                <Row gutter={[20, 20]}>
                                    <Col span={4}>
                                        <ProFormText
                                            name="usc_id"
                                            placeholder="Nhập Id"
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <ProFormText
                                            name="usc_company"
                                            placeholder="Tên công ty"
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <ProFormText
                                            name="usc_phone_tk"
                                            placeholder="Nhập SĐT(tk đăng nhập)"
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <ProFormText
                                            name="usc_email"
                                            placeholder="Nhập email(tk đăng nhập)"
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <ProFormText
                                            name="usc_name_email"
                                            placeholder="Nhập email liên hệ"
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <ProFormText
                                            name="usc_name_phone"
                                            placeholder="Nhập SĐT"
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <ProFormText
                                            name="usc_mst"
                                            placeholder="MST"
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <Select
                                            style={{ width: '100%' }}
                                            showSearch
                                            placeholder="Chọn vip"
                                            defaultValue={-1}
                                            onChange={(value: any) => setVip(value)}
                                            filterOption={(input: string, option?: { label: string; value: number }) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            options={[
                                                {
                                                    value: -1,
                                                    label: 'Chọn vip',
                                                },
                                                {
                                                    value: 0,
                                                    label: 'Chưa vip',
                                                },
                                                {
                                                    value: 1,
                                                    label: 'Đã vip',
                                                },
                                            ]}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <Select
                                            style={{ width: '100%' }}
                                            showSearch
                                            placeholder="Chọn tỉnh thành"
                                            onChange={(value: any) => setProvinceSelected(value)}
                                            filterOption={(input: string, option?: { label: string; value: number }) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            options={[
                                                {
                                                    value: 0,
                                                    label: "Chọn tỉnh thành"
                                                },
                                                ...getAllCity(),
                                            ]}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <Select
                                            style={{ width: '100%' }}
                                            showSearch
                                            defaultValue={districtReRender}
                                            value={districtReRender}
                                            placeholder="Chọn quận huyện"
                                            onChange={(selectedOptions: any) => setDistrictReRender(selectedOptions)}
                                            filterOption={(input: string, option?: { label: string; value: number }) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            options={listDistrictFilter}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <ConfigProvider locale={enUS}>
                                            <DatePicker placeholder='Từ' style={{ width: '100%' }} onChange={handleDateStart} />
                                        </ConfigProvider>
                                    </Col>
                                    <Col span={4}>
                                        <ConfigProvider locale={enUS}>
                                            <DatePicker placeholder='Đến' style={{ width: '100%' }} onChange={handleDateEnd} />
                                        </ConfigProvider>
                                    </Col>
                                </Row>
                            </ProForm>
                        </Col>
                        <Col span={24} className={styles['table-container']}>
                            <DataTable<any>
                                actionRef={tableRef}
                                rowKey="id"
                                loading={isFetching}
                                columns={columns}
                                dataSource={dataTable}
                                request={handleFilter}
                                scroll={{ x: true }}
                                search={false}
                                pagination={
                                    {
                                        current: currentPage,
                                        pageSize: itemsPerPage,
                                        showSizeChanger: true,
                                        total: totalRecord,
                                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} bản ghi</div>) }
                                    }
                                }
                                rowSelection={false}
                            />
                        </Col>
                    </Row>
            }
        </div>

    )
}

export default AdminAllRecruitment