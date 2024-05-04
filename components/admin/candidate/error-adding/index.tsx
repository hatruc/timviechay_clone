
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Checkbox, Col, ConfigProvider, DatePicker, Form, Popconfirm, Row, Select } from 'antd'
import { ActionType, ProColumns, ProForm, ProFormText } from '@ant-design/pro-components';
import { getAllCandidate } from '@/pages/api/candidate';
import { format } from 'date-fns';
import { DeleteOutlined, EditOutlined, TableOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { DatePickerProps } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import styles from './error-adding.module.scss'
import DataTable from '../../table';
import { getAllCity, getJob } from '@/functions/functions';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';

const AdminErrorAddingCandidate = () => {
    const { token } = useContext(NTD_UV_Context);
    const [isFetching, setIsFetching] = useState(true)
    const tableRef = useRef<ActionType>();

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(30)
    const [totalPages, setTotalPages] = useState(1)
    const [totalRecord, setTotalRecord] = useState(100)

    const [dataTable, setDataTable] = useState([])
    const [form] = Form.useForm()

    const [jobSelected, setJobSelected] = useState('')
    const [provinceSelected, setProvinceSelected] = useState('')
    const [sourceSelected, setSourceSelected] = useState('')

    const [dateStart, setDateStart] = useState<number>()
    const [dateEnd, setDateEnd] = useState<number>()

    const columns: ProColumns<any>[] = [
        {
            title: 'STT',
            dataIndex: `stt`,
            render: (text, record, index, action) => {
                return (
                    <>{index + 1}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Email ứng viên',
            dataIndex: 'use_email_contact',
            hideInSearch: true
        },
        {
            title: 'SĐT',
            dataIndex: 'use_phone',
            hideInSearch: true
        },
        {
            title: 'Thời điểm add uv',
            hideInSearch: true
        },
        {
            title: 'Lý do lỗi',
            hideInSearch: true,
        },
        {
            title: 'Link trùng',
            hideInSearch: true,
        },
    ];

    const handleGetData = async (id: string = '', name: string = '', email: string = '', phone: string = '', address: string = '') => {
        setIsFetching(true)
        const res = await getAllCandidate({
            "module": 12,
            "page": currentPage,
            "pageSize": itemsPerPage,
            // "conditons":{}
            "searchItem": {
                // "use_id":1,
                // "use_name":1,
                // "use_mail":1,
                // "use_phone":1,
                // "use_job_name":1,
                // "use_create_time":1,
                // "register":1,
                // "use_otp":1,
                // "use_show":1,
                // "use_authentic":1
            }
            // "from":"2021/12/2",
            // "to":"2022/12/2"
        }, token, '')
        if (res?.data) {
            setDataTable(res.data)
            setTotalRecord(res.total)
            setTotalPages(Math.ceil(res.total / res.data.length))
        }
        setIsFetching(false)
    }

    useEffect(() => {
        handleGetData()
    }, [currentPage, itemsPerPage, totalPages])


    const handleFilter = async (params: any, sort: any, filter: any): Promise<any> => {
        setItemsPerPage(params.pageSize)
        setCurrentPage(params.current)
    }

    const handleSelectShow = (checkedValue: boolean) => {
        console.log(checkedValue)
    }

    const onFinish = async (values: any) => {
        console.log(values)
    }

    const handleChangeDateStart: DatePickerProps['onChange'] = (date, dateString) => {
        setDateStart(new Date(dateString).getTime() as number)
    };

    const handleChangeDateEnd: DatePickerProps['onChange'] = (date, dateString) => {
        setDateEnd(new Date(dateString).getTime() as number)
    };

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
                                name="name"
                                placeholder="Nhập tên ứng viên"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="email"
                                placeholder="Nhập email"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="phone"
                                placeholder="Nhập SĐT"
                            />
                        </Col>
                        <Col span={4}>
                            <ConfigProvider locale={enUS}>
                                <DatePicker placeholder='Từ' style={{ width: '100%' }} onChange={handleChangeDateStart} />
                            </ConfigProvider>
                        </Col>
                        <Col span={4}>
                            <ConfigProvider locale={enUS}>
                                <DatePicker placeholder='Đến' style={{ width: '100%' }} onChange={handleChangeDateEnd} />
                            </ConfigProvider>
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                defaultValue={0}
                                placeholder="Bị loại"
                                onChange={(value: any) => setJobSelected(value)}
                                filterOption={(input: string, option?: { label: string; value: number }) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                options={[
                                    {
                                        value: 0,
                                        label: 'Tất cả',
                                    },
                                    {
                                        value: 1,
                                        label: 'Bị loại',
                                    }
                                ]}
                            />
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                placeholder="Chọn nguồn"
                                onChange={(value: string) => setSourceSelected(value)}
                                filterOption={(input: string, option?: { label: string; value: number }) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                options={[
                                    {
                                        value: 0,
                                        label: 'Chọn nguồn',
                                    },
                                    {
                                        value: 1,
                                        label: 'ItViec',
                                    },
                                    {
                                        value:2,
                                        label: 'App tìm việc',
                                    },
                                    {
                                        value: 3,
                                        label: 'Timviec365.nv',
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                placeholder="Chọn ngành nghề"
                                onChange={(value: any) => setJobSelected(value)}
                                filterOption={(input: string, option?: { label: string; value: number }) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                options={getJob()}
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
                                options={getAllCity()}
                            />
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

export default AdminErrorAddingCandidate