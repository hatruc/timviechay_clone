
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Checkbox, Col, ConfigProvider, DatePicker, Form, Popconfirm, Row, Select } from 'antd'
import { ActionType, ProColumns, ProForm, ProFormText } from '@ant-design/pro-components';
import { getAllCandidate } from '@/pages/api/candidate';
import { format } from 'date-fns';
import { DeleteOutlined, EditOutlined, TableOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { DatePickerProps } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import styles from './register.module.scss'
import DataTable from '../../table';
import {  handleChangeDateEnd, handleChangeDateStart } from '@/functions/functions';
import { getAllCity, getDistrict } from '@/functions/functions';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
import axios from 'axios';
import Link from 'next/link';

const RegisterRecruitment = () => {
    const { token, handlePermission } = useContext(NTD_UV_Context);
    const [isFetching, setIsFetching] = useState(true)
    const tableRef = useRef<ActionType>();

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(30)
    const [totalPages, setTotalPages] = useState(1)
    const [totalRecord, setTotalRecord] = useState(100)
    const [districtReRender, setDistrictReRender] = useState<number>(1);
    const [listDistrictFilter, setListDistricFilter] = useState<any>([]);

    const [dataTable, setDataTable] = useState([])
    const [form] = Form.useForm()
    const [dataFilter, setDataFilter] = useState<any>({});

    const [vip, setVip] = useState('')
    const [jobSelected, setJobSelected] = useState('')
    const [provinceSelected, setProvinceSelected] = useState()
    const [sourceSelected, setSourceSelected] = useState('')

    const [dateStart, setDateStart] = useState<string>()
    const [dateEnd, setDateEnd] = useState<string>()

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
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: `usc_create_time`,
            render: (text, record, index, action) => {
                return (
                    // <>{record.use_create_time}</>
                    <>{record.usc_create_time ? format(record.usc_create_time * 1000, `dd/MM/yyyy`) : record.usc_create_time}</>
                )
            },
            hideInSearch: true,
        },
        // {
        //     title: 'Nguồn',
        //     hideInSearch: true,
        // },
        {
            title: 'Active',
            hideInSearch: true,
            dataIndex: 'usc_active',
            render: (text, record, index, action) => {
                return (
                    <><Checkbox disabled={handlePermission.edit ? false : true} defaultChecked={record.usc_active} onChange={(e) => handleSelectShow(e.target.checked)} /></>
                )
            },
        },
        {
            title: 'index',
            hideInSearch: true,
            render: (text, record, index, action) => {
                return (
                    <><Checkbox disabled={handlePermission.edit ? false : true} defaultChecked={record.use_show} onChange={(e) => handleSelectShow(e.target.checked)} /></>
                )
            },
        },
        // {
        //     title: 'Ghi chú',
        //     render: (text, record, index, action) => {
        //         return (
        //             <div>
        //                 <img src="https://work247.vn/admin/resource/images/add.gif" alt="ghi-chu"></img>
        //             </div>
        //         )
        //     },
        //     hideInSearch: true,
        // },
        {

            title: 'Sửa',
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (<EditOutlined
                style={{
                    fontSize: 20,
                    color: `${handlePermission.edit ? '#ffa500' : '#ddcfb6'}`,
                }}
                type=""
                onClick={() => {
                    if (handlePermission.edit) {
                        // handle
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
        // k đủ data
        setIsFetching(true);
        const json = {
            "module": 14,
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
            setTotalRecord(res.total)
            setTotalPages(Math.ceil(res.total / res.data.length))
        }
        setIsFetching(false)
        getTotal(json)
    }




    const handleFilter = async (params: any, sort: any, filter: any): Promise<any> => {
        setItemsPerPage(params.pageSize)
        setCurrentPage(params.current)
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
                                defaultValue={0}
                                onChange={(value: any) => setVip(value)}
                                filterOption={(input: string, option?: { label: string; value: number }) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                options={[
                                    {
                                        value: -1,
                                        label: 'Chọn vip',
                                    },
                                    {
                                        value: 1,
                                        label: 'Đã vip',
                                    },
                                    {
                                        value: 0,
                                        label: 'Chưa vip',
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
    )
}

export default RegisterRecruitment