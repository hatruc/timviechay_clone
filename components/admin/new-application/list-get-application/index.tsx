
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
import { getAllCity, getJob, handleChangeDateEnd, handleChangeDateStart } from '@/functions/functions';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
import axios from 'axios';

const AdminGetListApplicationRecruitment = () => {
    const { token, handlePermission } = useContext(NTD_UV_Context)
    const [isFetching, setIsFetching] = useState(true)
    const tableRef = useRef<ActionType>();

    const [currentPage, setCurrentPage] = useState<any>(1)
    const [itemsPerPage, setItemsPerPage] = useState(30)
    const [totalPages, setTotalPages] = useState(1)
    const [totalRecord, setTotalRecord] = useState(100)

    const [dataTable, setDataTable] = useState([])
    const [form] = Form.useForm()
    const [dataFilter, setDataFilter ] = useState<any>({});


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
            dataIndex: 'use_id',
            hideInSearch: true
        },
        
        {
            title: 'Id cty',
            hideInSearch: true
        },
        {
            title: 'Tiêu đề',
            hideInSearch: true
        },
        {
            title: 'Tên công ty',
            hideInSearch: true
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'use_phone_tk',
            hideInSearch: true
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'use_email_contact',
            hideInSearch: true
        },
        {
            title: 'Ngày đăng tin',
            dataIndex: `use_create_time`,
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <>{record.use_create_time ? format(record.use_create_time * 1000, `dd/MM/yyyy`) : record.use_create_time}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Ứng viên UT',
            dataIndex: 'use_email_contact',
            hideInSearch: true
        },
        {
            title: 'Hot',
            dataIndex: 'use_phone_tk',
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <><Checkbox disabled={ handlePermission.edit ? false :true } defaultChecked={record.use_show} onChange={(e) => handleSelectShow(e.target.checked)} /></>
                )
            },
            hideInSearch: true
        },
        {
            title: 'T Gấp',
            dataIndex: 'use_phone_tk',
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <><Checkbox disabled={ handlePermission.edit ? false :true } defaultChecked={record.use_show} onChange={(e) => handleSelectShow(e.target.checked)} /></>
                )
            },
            hideInSearch: true
        },
        {
            title: 'L Cao',
            dataIndex: 'address',
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <><Checkbox disabled={ handlePermission.edit ? false :true } defaultChecked={record.use_show} onChange={(e) => handleSelectShow(e.target.checked)} /></>
                )
            },
            hideInSearch: true
        },
        {
            title: 'G Ngành',
            dataIndex: 'use_job_name',
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <><Checkbox disabled={ handlePermission.edit ? false :true } defaultChecked={record.use_show} onChange={(e) => handleSelectShow(e.target.checked)} /></>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Làm mới',
            dataIndex: 'use_show',
            hideInSearch: true,
        },
        {
            title: 'Ghim',
            dataIndex: 'use_show',
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <div>
                        <img src="https://work247.vn/admin/resource/images/add.gif" alt="ghi-chu"></img>
                    </div>
                )
            },
            hideInSearch: true,
        },
        {

            title: 'Sửa',
            hideInSearch: true,
            width: 50,
            render: (_value: any, entity:any, _index: any, _action: any) => (<EditOutlined
                style={{
                    fontSize: 20,
                    color: `${!handlePermission.edit ? '#ffa500' : '#ddcfb6'}`,
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
        // chua co data
        setIsFetching(true)
        const json = {
            "module": 9,
            "page": currentPage,
            "pageSize": itemsPerPage,
            "conditions":{
                use_id: data?.use_id?.trim() ,
                use_name: data?.use_name?.trim() ,
                use_email_contact: data?.use_email_contact?.trim(),
                use_phone: data?.use_phone?.trim(),
                address: data?.address?.trim(),
                use_nganh_nghe: jobSelected,
                // use_city_job: citySelected,
                use_district_job: provinceSelected,
                // gerder: genderSelectd
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
                                name="ID"
                                placeholder="Nhập Id"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="idcompany"
                                placeholder="ID cty"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="title"
                                placeholder="Tiêu đề"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="nameCompany"
                                placeholder="Tên cty"
                            />
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                placeholder="Chọn ngành nghề"
                                defaultValue={0}
                                onChange={(value: any) => setJobSelected(value)}
                                filterOption={(input: string, option?: { label: string; value: number }) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                options={[
                                    {
                                        'label':'Chọn ngành nghề',
                                        'value': 0
                                    },
                                    ...getJob()
                                ]}
                            />
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                placeholder="Chọn tỉnh thành"
                                defaultValue={0}
                                onChange={(value: any) => setProvinceSelected(value)}
                                filterOption={(input: string, option?: { label: string; value: number }) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                options={[
                                    {
                                    'label':'Chọn tỉnh thành',
                                    'value': 0
                                },...getAllCity()]}
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
                            showTotal: (total: any, range: any) => { return (<div> {range[0]}-{range[1]} trên {total} bản ghi</div>) }
                        }
                    }
                    rowSelection={false}
                />
            </Col>
        </Row>
    )
}

export default  AdminGetListApplicationRecruitment