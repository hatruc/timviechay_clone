
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Checkbox, Col, ConfigProvider, DatePicker, Form, Popconfirm, Row, Select } from 'antd'
import { ActionType, ProColumns, ProForm, ProFormText } from '@ant-design/pro-components';
import { getAllCandidate } from '@/pages/api/candidate';
import { format } from 'date-fns';
import { EditOutlined } from '@ant-design/icons';
import type { DatePickerProps } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import styles from './index.module.scss'
import DataTable from '../../table';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
import axios from 'axios';
import { handleChangeDateEnd, handleChangeDateStart } from '@/functions/functions';

const AdminHiddenRecruitment = () => {
    const { token, handlePermission } = useContext(NTD_UV_Context);
    const [isFetching, setIsFetching] = useState(true)
    const tableRef = useRef<ActionType>();

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(30)
    const [totalPages, setTotalPages] = useState(1)
    const [totalRecord, setTotalRecord] = useState(100)

    const [dataTable, setDataTable] = useState([])
    const [form] = Form.useForm()
    const [dataFilter, setDataFilter ] = useState<any>({})

    const [jobSelected, setJobSelected] = useState('')
    const [provinceSelected, setProvinceSelected] = useState('')
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
            dataIndex: 'use_id',
            hideInSearch: true
        },
        {
            title: 'Tên công ty',
            dataIndex: 'use_id',
            hideInSearch: true
        },
        {
            title: 'SĐT',
            dataIndex: 'use_phone_tk',
            hideInSearch: true
        },
        {
            title: 'Email',
            dataIndex: 'use_email_contact',
            hideInSearch: true
        },
        {
            title: 'Website',
            dataIndex: 'address',
            hideInSearch: true
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            hideInSearch: true
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: `use_create_time`,
            render: (text, record, index, action) => {
                return (
                    // <>{record.use_create_time}</>
                    <>{record.use_create_time ? format(record.use_create_time, `dd/MM/yyyy`) : record.use_create_time}</>
                )
            },
            hideInSearch: true,
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
                onClick={() => { if(handlePermission.edit) {
                    // handle
                } }}
            />
            ),

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
            "module": 16,
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
        }
        const res = await getAllCandidate(json, token, '')
        if (res?.data) {
            console.log(res?.data);
            setDataTable(res.data)
        }
        setIsFetching(false)
        getTotal(json)
    }

    useEffect(() => {
        handleGetData({})
    }, [currentPage])


    const handleFilter = async (params: any, sort: any, filter: any): Promise<any> => {
        let filterValue = form.getFieldsValue();
        setDataFilter(filterValue)
        setItemsPerPage(params.pageSize)
        setCurrentPage(params.current)
        handleGetData(filterValue)
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
                                name="ID"
                                placeholder="ID"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="name"
                                placeholder="Tên công ty"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="Số điện thoại"
                                placeholder="Số điện thoại"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="email"
                                placeholder="Nhập email"
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

export default  AdminHiddenRecruitment