
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Checkbox, Col, ConfigProvider, DatePicker, Form, Popconfirm, Row, Select } from 'antd'
import { ActionType, ProColumns, ProForm, ProFormText } from '@ant-design/pro-components';
import { getAllCandidate } from '@/pages/api/candidate';
import { EditOutlined } from '@ant-design/icons';
import type { DatePickerProps } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import DataTable from '../../table';
import { getAllCity } from '@/functions/functions';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
import AdminEditAccount from '../edit';

const AdminListAccount = () => {
    const { token, handlePermission } = useContext(NTD_UV_Context);
    const [isFetching, setIsFetching] = useState(true)
    const tableRef = useRef<ActionType>();

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(30)
    const [totalPages, setTotalPages] = useState(1)
    const [totalRecord, setTotalRecord] = useState(100)

    const [dataTable, setDataTable] = useState([])
    const [form] = Form.useForm()
    const [dataFilter, setDataFilter ] = useState<any>({});

    const [currrentId, setCurrrentId] = useState(0)
    const [isEditiing, setIsEditiing] = useState(false)

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
            title: 'Ngôn Ngữ',
            dataIndex: 'language',
            hideInSearch: true
        },
        {
            title: 'Active',
            hideInSearch: true,
            render: (text, record, index, action) => {
                return (
                    <><Checkbox checked={record.adm_active} onChange={(e) => {}} /></>
                )
            },
        },
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
                onClick={() => { if(handlePermission.edit) {
                    // handle
                    setCurrrentId(entity.adm_id);
                    setIsEditiing(true)
                } }}
            />
            ),

        },
    ];

    const handleGetData = async (data: any) => {
        setIsFetching(true)
        const res = await getAllCandidate({
            "module": 1,
            "page": currentPage,
            "pageSize": itemsPerPage,
            "conditions":{
                // "use_id": data?.use_id,
                
            }
            
        }, token, '')
        if (res?.data) {
            setDataTable(res.data)
            setTotalRecord(res.total)
            setTotalPages(Math.ceil(res.total / res.data.length))
        }
        setIsFetching(false)
    }

    const handleFilter = async (params: any, sort: any, filter: any): Promise<any> => {
        setItemsPerPage(params.pageSize)
        setCurrentPage(params.current)
    }

    useEffect(() => {
        handleGetData(dataFilter)
    }, [currentPage])

    console.log(isEditiing)
    return (
    <>
        {isEditiing ? <AdminEditAccount onClose={() => setIsEditiing(false)} id={currrentId}/> : <Row>
            <Col span={24} style={{
                marginTop: '30px'
            }}>
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
        </Row>}
    </>
    )
}

export default AdminListAccount