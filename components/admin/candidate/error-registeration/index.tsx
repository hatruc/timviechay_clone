
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Checkbox, Col, ConfigProvider, DatePicker, Form, Popconfirm, Row, Select } from 'antd'
import { ActionType, ProColumns, ProForm, ProFormText } from '@ant-design/pro-components';
import { getAllCandidate } from '@/pages/api/candidate';
import { format } from 'date-fns';
import { DeleteOutlined, EditOutlined, TableOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { DatePickerProps } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import styles from './error-registeration.module.scss'
import DataTable from '../../table';
import { getAllCity, getJob, handleChangeDateEnd, handleChangeDateStart } from '@/functions/functions';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
import axios from 'axios';

const AdminErrorRegisterationCandidate = () => {
    const { token, handlePermission } = useContext(NTD_UV_Context);
    const [isFetching, setIsFetching] = useState(true)
    const tableRef = useRef<ActionType>();

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(30)
    const [totalPages, setTotalPages] = useState(1)
    const [totalRecord, setTotalRecord] = useState(100)

    const [dataTable, setDataTable] = useState([])
    const [form] = Form.useForm()
    const [dataFilter, setDataFilter] = useState<any>();


    const [ denySelected, setDenySelected ] = useState<number>(0)
    const [jobSelected, setJobSelected] = useState('');
    const [ citySelected, setCitySelected ] = useState<number>(0)
    const [ fromSelected,  setFromSelected] = useState<number>(0);

    const [dateStart, setDateStart] = useState<string>()
    const [dateEnd, setDateEnd] = useState<string>()

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
            title: 'Tên ứng viên',
            dataIndex: 'tmp_name',
            hideInSearch: true
        },
        {
            title: 'Email',
            dataIndex: 'tmp_email_lh',
            hideInSearch: true
        },
        {
            title: 'SĐT',
            dataIndex: 'tmp_phone_tk',
            hideInSearch: true
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: `tmp_time`,
            render: (text, record, index, action) => {
                return (
                    <>{record.tmp_time ? format(record.tmp_time * 1000, `dd/MM/yyyy`) : record.tmp_time}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Lấy từ',
            render: (text, record, index, action) => {
                return (
                    <><p>Timviechay</p></>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Bị loại',
            render: (text, record, index, action) => {
                return (
                    <><Checkbox defaultChecked={record.deny ? true : false} onChange={(e) => handleSelectShow(e.target.checked)} /></>
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
                    color: `${handlePermission.delete ? '#ffa500' : '#ddcfb6'}`,
                }}
                type=""
                onClick={() => { if(handlePermission.edit) {
                    // handle
                }}}
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
        setIsFetching(true)
        const json = {
            "module": 13,
            "page": currentPage,
            "pageSize": itemsPerPage,
            "conditions":{
                "tmp_name": data?.tmp_name?.trim(),
                "tmp_phone_tk": data?.tmp_phone_tk?.trim(),
                "tmp_email_lh": data?.tmp_email_lh?.trim(),
                "tmp_city": citySelected,
                "tmp_nganh_nghe": jobSelected,
                "deny": denySelected,
                'from': fromSelected
            },
            "from":dateStart,
            "to": dateEnd
        }
        const res = await getAllCandidate( json, token, '')
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

    const handleSelectShow = (checkedValue: boolean) => {
        console.log(checkedValue)
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
                                name="name"
                                placeholder="Nhập tên ứng viên"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="tmp_email_lh"
                                placeholder="Nhập email"
                            />
                        </Col>
                        <Col span={4}>
                            <ProFormText
                                name="tmp_phone_tk"
                                placeholder="Nhập SĐT"
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
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                defaultValue={0}
                                placeholder="Bị loại"
                                onChange={(value: any) => setDenySelected(value)}
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
                                onChange={(value: any) => setFromSelected(value)}
                                filterOption={(input: string, option?: { label: string; value: number }) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                options={[
                                    {
                                        value: 0,
                                        label: 'Chọn nguồn',
                                    },
                                    {
                                        value: 2,
                                        label: 'ItViec',
                                    },
                                    {
                                        value:3,
                                        label: 'App tìm việc',
                                    },
                                    {
                                        value: 1,
                                        label: 'Timviechay',
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
                                onChange={(value: any) => setCitySelected(value)}
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

export default AdminErrorRegisterationCandidate