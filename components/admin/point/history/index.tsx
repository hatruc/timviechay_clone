
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Checkbox, Col, ConfigProvider, DatePicker, Form, Popconfirm, Row, Select } from 'antd'
import { ActionType, ProColumns, ProForm, ProFormText } from '@ant-design/pro-components';
import { getAllCandidate } from '@/pages/api/candidate';
import { format } from 'date-fns';
import { DeleteOutlined, EditOutlined, TableOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { DatePickerProps } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import styles from '../index.module.scss'
import DataTable from '../../table';
import { getAllCity, getJob } from '@/functions/functions';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
import axios from 'axios';

const AdminPointHistory = () => {
    const { token } = useContext(NTD_UV_Context);
    const [isFetching, setIsFetching] = useState(true)
    const tableRef = useRef<ActionType>();

    const [currentPage, setCurrentPage] = useState<any>(1)
    const [itemsPerPage, setItemsPerPage] = useState(30)
    const [totalPages, setTotalPages] = useState(1)
    const [totalRecord, setTotalRecord] = useState(100)

    const [dataTable, setDataTable] = useState([])
    const [form] = Form.useForm()
    const [dataFilter, setDataFilter] = useState<any>({})



    const columns: ProColumns<any>[] = [
        {
            title: 'STT',
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <>{index + 1}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Tên công ty',
            dataIndex: 'usc_company',
            hideInSearch: true
        },
        
        {
            title: 'Email công ty',
            dataIndex: 'usc_name_email',
            hideInSearch: true
        },
        {
            title: 'Số điểm cộng',
            dataIndex: 'point_added',
            hideInSearch: true
        },
        {
            title: 'Số điểm trừ',
            dataIndex: 'point_used',
            hideInSearch: true
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
            "module": 23,
            "page": currentPage,
            "pageSize": itemsPerPage,
            "conditions":{
                usc_name_email: data?.email?.trim()
            }
        }
        const res = await getAllCandidate(json, token, '')
        if (res?.data) {
            setDataTable(res.data)
        }
        setIsFetching(false)
        getTotal(json)
    }

    const handleFilter = async (params: any, sort: any, filter: any): Promise<any> => {
        handleGetData(dataFilter)
        setItemsPerPage(params.pageSize)
        setCurrentPage(params.current)
    }

    const onFinish = async (values: any) => {
        setCurrentPage(1)
        setDataFilter(values);
        handleGetData(values);
    }


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
                                name="email"
                                placeholder="Email"
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
                            showTotal: (total: any, range: any) => { return (<div> {range[0]}-{range[1]} trên {total} bản ghi</div>) }
                        }
                    }
                    rowSelection={false}
                />
            </Col>
        </Row>
    )
}

export default  AdminPointHistory