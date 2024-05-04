
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Checkbox, Col, ConfigProvider, DatePicker, Form, Popconfirm, Row, Select } from 'antd'
import { ActionType, ProColumns, ProForm, ProFormText } from '@ant-design/pro-components';
import { getAllCandidate } from '@/pages/api/candidate';
import { format } from 'date-fns';
import type { DatePickerProps } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import styles from './index.module.scss'
import DataTable from '../../table';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
import axios from 'axios';

const  AdminExpiresRecruitment = () => {
    const { token } = useContext(NTD_UV_Context);
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
            render: (text: any, record: any, index: any, action: any) => {
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
            title: 'SĐT',
            dataIndex: 'usc_phone',
            hideInSearch: true
        },
        {
            title: 'Email',
            dataIndex: 'usc_name_email',
            hideInSearch: true
        },
        {
            title: 'Website',
            dataIndex: 'address',
            hideInSearch: true
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'usc_address',
            hideInSearch: true
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: `use_create_time`,
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <>{record.usc_create_time ? format(record.usc_create_time * 1000, `dd/MM/yyyy`) : record.usc_create_time}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Ghi chú',
            dataIndex: 'usc_note',
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
            "module": 18,
            "page": currentPage,
            "pageSize": itemsPerPage,
            "conditions":{
                "usc_id": data?.usc_id?.trim(),
                "usc_company": data?.usc_company?.trim(),
                "usc_phone":data?.usc_phone?.trim() ,
                "usc_name_email" : data?.usc_name_email?.trim(),
            },
            "from": dateStart,
            "to":dateEnd
        }
        const res = await getAllCandidate(  json, token, '')
        if (res?.data) {
            setDataTable(res.data)
        }
        setIsFetching(false)
        getTotal(json)
    }

   


    const handleFilter = async (params: any, sort: any, filter: any): Promise<any> => {
        let filterValue = form.getFieldsValue();
        handleGetData(filterValue);
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

    const handleChangeDateStart: DatePickerProps['onChange'] = (date: any, dateString: any) => {
        if (!date) {
            setDateStart('')
            return;
          }
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0); 
            const formattedDate = startOfDay?.toISOString();
            setDateStart(formattedDate)
    };

    const handleChangeDateEnd: DatePickerProps['onChange'] = (date: any, dateString: any) => {
        if (!date) {
            setDateEnd('')
            return;
          }
          const startOfDay = new Date(date);
          startOfDay.setHours(23, 59, 59, 999); 
          const formattedDate = startOfDay.toISOString();
          setDateEnd(formattedDate)
    };
    useEffect(() => {
        handleGetData(dataFilter)
    }, [currentPage])

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
                                placeholder="ID"
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
                                name="usc_phone"
                                placeholder="Số điện thoại"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="usc_name_email"
                                placeholder="Nhập email"
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
                    </Row>
                </ProForm>
            </Col>
          
            <div style={{
                width: 'fit-content',
                padding: '8px 16px',
                background: '#E17009',
                marginTop: '10px',
                margin: '20px 20px 0 20px',
                borderRadius: '5px',
                fontWeight: 600,
                fontSize: '12px',
                color: 'white',
                cursor: 'pointer'
            }}>
            Xuất Excel
            </div>
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

export default  AdminExpiresRecruitment