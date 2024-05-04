
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Checkbox, Col, ConfigProvider, DatePicker, Form, Popconfirm, Row, Select } from 'antd'
import { ActionType, ProColumns, ProForm, ProFormText } from '@ant-design/pro-components';
import { getAllCandidate } from '@/pages/api/candidate';
import { format } from 'date-fns';
import { DeleteOutlined, EditOutlined, TableOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { DatePickerProps } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import styles from './index.module.scss'
import DataTable from '../../table';
import { getAllCity, handleChangeDateEnd, handleChangeDateStart } from '@/functions/functions';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
import axios from 'axios';

const AdminNoPostNewRecruitment = () => {
    const { token } = useContext(NTD_UV_Context);
    const [isFetching, setIsFetching] = useState(true)
    const tableRef = useRef<ActionType>();

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(30)
    const [totalPages, setTotalPages] = useState(1)
    const [totalRecord, setTotalRecord] = useState(100)

    const [dataTable, setDataTable] = useState([])
    const [form] = ProForm.useForm();
    const [dataFilter, setDataFilter ] = useState<any>({});

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
            hideInSearch: true
        },
        {
            title: 'Email',
            dataIndex: 'usc_email',
            hideInSearch: true
        },
        {
            title: 'SĐT',
            dataIndex: 'usc_phone',
            hideInSearch: true
        },
        {
            title: 'Skype',
            dataIndex: 'usc_skype',
            hideInSearch: true
        },
        {
            title: 'Website',
            dataIndex: 'usc_website',
            hideInSearch: true
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: `use_create_time`,
            render: (text, record, index, action) => {
                return (
                    // <>{record.use_create_time}</>
                    <>{record.usc_create_time ? format(record.usc_create_time * 1000, `dd/MM/yyyy`) : record.usc_create_time}</>
                )
            },
            hideInSearch: true,
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
        setIsFetching(true);
        const json = {
            "module": 17,
            "page": currentPage,
            "pageSize": itemsPerPage,
            "conditions":{
                usc_company: data?.usc_company?.trim(),
                usc_email: data?.usc_email?.trim(),
            },
            "from": dateStart,
            "to": dateEnd
        };
        try {
            const res = await getAllCandidate(json, token, '')
            if (res?.data) {
                setDataTable(res.data)
            }
        } catch (err) {
            alert(err)
        }
        setIsFetching(false)
        getTotal(json)
    }

    const handleFilter = async (params: any, sort: any, filter: any): Promise<any> => {
        let filterValue = form.getFieldsValue();
        setDataFilter(filterValue)
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
        handleGetData(dataFilter);
    }, [currentPage]);

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
                                name="usc_company"
                                placeholder="Tên công ty"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="usc_email"
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

export default  AdminNoPostNewRecruitment