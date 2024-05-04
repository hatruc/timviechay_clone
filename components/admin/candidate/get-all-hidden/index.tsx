
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Checkbox, Col, ConfigProvider, DatePicker, Form, Popconfirm, Row, Select } from 'antd'
import { ActionType, ProColumns, ProForm, ProFormText } from '@ant-design/pro-components';
import { getAllCandidate } from '@/pages/api/candidate';
import { format } from 'date-fns';
import { DeleteOutlined, EditOutlined, TableOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { DatePickerProps } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import styles from './get-all-hidden.module.scss'
import DataTable from '../../table';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
import { createLinkTilte, handleChangeDateEnd, handleChangeDateStart } from '@/functions/functions';
import axios from 'axios';

const AdminGetAllHiddenCandidate = () => {
    const { token, handlePermission} = useContext(NTD_UV_Context);
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
    const [dateEnd, setDateEnd] = useState<string>();
    const localHost = window.location.host;
    console.log('localHost', localHost);

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
            title: 'Id',
            dataIndex: 'use_id',
            hideInSearch: true
        },
        {
            title: 'Tên ứng viên',
            dataIndex: 'use_name',
            render: (text, record, index, action) => {
                return (
                    <a target='_blank' href={localHost + '/ung-vien/' + createLinkTilte(record.use_name) + `-uv${record.use_id}.html`}>
                        <>{record.use_name}</>
                    </a>
                )
            },
            hideInSearch: true
        },
        {
            title: 'Email',
            dataIndex: 'use_mail',
            hideInSearch: true
        },
        {
            title: 'SĐT',
            dataIndex: 'use_phone',
            hideInSearch: true
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: `use_time`,
            render: (text, record, index, action) => {
                return (
                    <>{record.use_time ? format(record.use_time * 1000, `dd/MM/yyyy`) : record.use_time}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Làm mới',
            render: (text, record, index, action) => {
                return (
                    <><TableOutlined /></>
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
        {

            title: 'Xóa',
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (<Popconfirm
                placement="leftTop"
                title={"Xác nhận xóa ứng viên"}
                description={"Bạn có chắc chắn muốn xóa ứng viên này ?"}
                onConfirm={() => { if(handlePermission.delete) {
                    // handle
                }}}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <span style={{ cursor: "pointer", margin: "0 10px" }}>
                    <DeleteOutlined
                        style={{
                            fontSize: 20,
                            color: `${handlePermission.delete ? '#ff4d4f' : '#ddcfb6'}`,
                        }}
                    />
                </span>
            </Popconfirm>),

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
            "module": 10,
            "page": currentPage,
            "pageSize": itemsPerPage,
            "conditions":{
                "use_name": data?.use_name?.trim(),
                "use_email_contact": data?.use_email?.trim()
            },
            "from":dateStart,
            "to": dateEnd
        };
        const res = await getAllCandidate( json, token, '')
        if (res?.data) {
            setDataTable(res.data)
            setTotalRecord(res.total)
            setTotalPages(Math.ceil(res.total / res.data.length))
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
        handleGetData({})
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
                                name="use_name"
                                placeholder="Nhập tên ứng viên"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="use_email"
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

export default AdminGetAllHiddenCandidate