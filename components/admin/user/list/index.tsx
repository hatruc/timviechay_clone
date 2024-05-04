
import React, { useEffect, useRef, useState } from 'react'
import { Checkbox, Col, ConfigProvider, DatePicker, Form, Popconfirm, Row, Select } from 'antd'
import { ActionType, ProColumns, ProForm, ProFormText } from '@ant-design/pro-components';
import { getAllCandidate } from '@/pages/api/candidate';
import { format } from 'date-fns';
import { DeleteOutlined, EditOutlined, TableOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { DatePickerProps } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import styles from './list.module.scss'
import DataTable from '../../table';

const ListUser = () => {
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
            dataIndex: 'stt',
            render: (text, record, index, action) => {
                return (
                    // <>{record.use_create_time}</>
                    <>{index + 1}</>
                )
            },
            hideInSearch: true
        },
        {
            title: 'Tài khoản',
            dataIndex: 'adm_loginname',
            hideInSearch: true
        },
        {
            title: 'Họ tên',
            dataIndex: 'adm_name',
            hideInSearch: true
        },
        {
            title: 'Quyền',
            dataIndex: 'permision',
            hideInSearch: true
        },
        {
            title: 'Ngôn ngữ',
            dataIndex: 'lang_id',
            render: (text, record, index, action) => {
                return (
                    <>{record.lang_id === 1 ? 'Tiếng Việt' : 'English'}</>
                )
            },
            hideInSearch: true
        },
        {
            title: 'Active',
            render: (text, record, index, action) => {
                return (
                    <><Checkbox defaultChecked={record.adm_active} onChange={(e) => { console.log(e.target.checked) }} /></>
                )
            },
            hideInSearch: true
        },
        {

            title: 'Sửa',
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (<EditOutlined
                style={{
                    fontSize: 20,
                    color: '#ffa500',
                }}
                type=""
                onClick={() => { }}
            />
            ),

        },
        {

            title: 'Xóa',
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (<Popconfirm
                placement="leftTop"
                title={"Xác nhận xóa ứng viên"}
                description={"Bạn có chắc chắn muốn xóa ứng viên này ?"}
                onConfirm={() => { }}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <span style={{ cursor: "pointer", margin: "0 10px" }}>
                    <DeleteOutlined
                        style={{
                            fontSize: 20,
                            color: '#ff4d4f',
                        }}
                    />
                </span>
            </Popconfirm>),

        },
    ];

    const handleGetData = async (id: string = '', name: string = '', email: string = '', phone: string = '', address: string = '') => {
        setIsFetching(true)
        const res = await getAllCandidate({
            "module": 1,
            "page": currentPage,
            "pageSize": itemsPerPage,
            // "conditons":{}
            "searchItem": {
                // "use_id": 1,
                // "use_name": 1,
                // "use_mail": 1,
                // "use_phone": 1,
                // "use_job_name": 1,
                // "use_create_time": 1,
                // "register": 1,
                // "use_otp": 1,
                // "use_show": 1,
                // "use_authentic": 1
            }
            // "from":"2021/12/2",
            // "to":"2022/12/2"
        })
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
        console.log('params', params)
        console.log('sort', sort)
        console.log('filter', filter)
        setItemsPerPage(params.pageSize)
        setCurrentPage(params.current)
    }

    const handleSelectShow = (checkedValue: CheckboxValueType[]) => {
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
                                name="username"
                                placeholder="Nhập tài khoản"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="name"
                                placeholder="Nhập họ và tên"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="permission"
                                placeholder="Nhập quyền"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="language"
                                placeholder="Nhập ngôn ngữ"
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

export default ListUser