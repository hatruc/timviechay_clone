
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Checkbox, Col, ConfigProvider, DatePicker, Form, Popconfirm, Row, Select } from 'antd'
import { ActionType, ProColumns, ProForm, ProFormText } from '@ant-design/pro-components';
import { getAllCandidate } from '@/pages/api/candidate';
import { format } from 'date-fns';
import { DeleteOutlined, EditOutlined, TableOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { DatePickerProps } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import styles from './get-all.module.scss'
import DataTable from '../../table';
import { NTD_UV_Context } from '@/components/context/ntd_uv_context';
import { city_array, getDistrict, handleChangeDateEnd, handleChangeDateStart, job_array } from '@/functions/functions';
import axios from 'axios';
import AdminModalShow from './modal';
import CvContent from './CvContent';

const AdminGetAllCandidate = () => {
    const { token, handlePermission } = useContext(NTD_UV_Context);
    const [isFetching, setIsFetching] = useState(true)
    const tableRef = useRef<ActionType>();

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(30)
    const [totalPages, setTotalPages] = useState(1)
    const [totalRecord, setTotalRecord] = useState(100)

    // data table
    const [dataTable, setDataTable] = useState([])
    const [form] = Form.useForm()
    const [dataFilter, setDataFilter ] = useState<any>({});
    // cv
    const [ isOpenModalCv, setIsOpenModalCv ] = useState<boolean>(false);
    const [ listCv, setListCv ] = useState<any>(); 

    const [jobSelected, setJobSelected] = useState('');
    const [ citySelected, setCitySelected ] = useState<number>()
    const [provinceSelected, setProvinceSelected] = useState<number>();
    const [ genderSelectd, setGenderSelected] = useState<number>(0);
    const [ listDistrict, setListDistrict ] = useState<any>();
    const [sourceSelected, setSourceSelected] = useState('')

    const [dateStart, setDateStart] = useState<string>()
    const [dateEnd, setDateEnd] = useState<string>()

    const onActiveSubmit  = async (record: any) => {

        try {
            const post = await axios.post(process.env.NEXT_PUBLIC_BASE_URL_API + "/admin/VerifyAccount", {
                id: record?.use_id,
                type : 2,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (post.data.data.result) {
                return post.data.data.result
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getAllCV  = async (record: any) => {
        try {
            const post = await axios.post(process.env.NEXT_PUBLIC_BASE_URL_API + "/admin/getAllCandiCV", {
                id: record?.use_id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            console.log('post ', post, post.data.data.result);
            if (post.data.data.result) {
                console.log('post.data.data', post.data.data);
                setListCv(post.data.data.data)
                setIsOpenModalCv(true)
            }
        } catch (err) {
            alert(err)
        }
    };

    

    const columns: ProColumns<any>[] = [
        {
            title: 'Stt',
            render: (text: any, record: any, index: any, action: any) => {
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
            hideInSearch: true
        },
        {
            title: 'Email',
            dataIndex: 'use_email_contact',
            hideInSearch: true
        },
        {
            title: 'SĐT',
            dataIndex: 'use_phone',
            hideInSearch: true
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            hideInSearch: true
        },
        {
            title: 'Công việc',
            dataIndex: 'use_job_name',
            hideInSearch: true,
        },
        {
            title: 'Lượt xem',
            dataIndex: 'use_show',
            hideInSearch: true,
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: `use_create_time`,
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <>{record.use_create_time ? format(record.use_create_time * 1000, `dd/MM/yyyy`) : record.use_create_time}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Nguồn',
            hideInSearch: true,
        },
        {
            title: 'Làm mới',
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <><TableOutlined/></>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Show',
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <><Checkbox 
                    disabled={ handlePermission.edit ? false :true }
                    defaultChecked={record.use_show} onChange={(e) => {}} /></>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Xác thực',
            hideInSearch: true,
            dataIndex: 'use_authentic',
            render: (text, record, index, action) => {
                return (
                    <>{ record.use_authentic  ? <Button disabled style={{
                        background: '#b8ddef',
                        color: '#FFFF'
                    }}>Actived</Button> : <Button onClick={ async() => {
                        if(handlePermission.edit) {
                            const isDoneActive = await onActiveSubmit(record) ;
                            if(isDoneActive) {
                                      const updatedRecord = {
                                        ...record,
                                        use_authentic: true 
                                      };
                                      const updatedData: any = [...dataTable];
                                      updatedData[index] = updatedRecord;
                                      setDataTable(updatedData);
                            } 
                        }
                }} style={{
                        background: '#44b0e6',
                        color: '#FFFF'
                    }}>Active</Button>
                    }</>
                )
            },
        },
        {
            title: 'Xem CV',
            hideInSearch: true,
            render: (text, record, index, action) => {
                return (
                    <>
                    <Button onClick={ async() => { await getAllCV(record)
                    }} style={{
                        background: '#44b0e6',
                        color: '#FFFF'
                    }}>Xem CV</Button>
                    </>
                )
            },
        },
        {
            title: 'Active',
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <><Checkbox 
                    disabled={ handlePermission.edit ? false :true } defaultChecked={record.adm_active} onChange={(e) => { console.log(e.target.checked) }} /></>
                )
            },
            hideInSearch: true
        },
        {

            title: 'Sửa',
            hideInSearch: true,
            width: 50,
            render: (_value: any, entity: any, _index: any, _action: any) => (<EditOutlined
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
            render: (_value: any, entity: any, _index: any, _action: any) => (<Popconfirm
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
                use_city_job: citySelected,
                use_district_job: provinceSelected,
                gender: genderSelectd
            },
            "from": dateStart,
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
        if(citySelected) {
            setProvinceSelected(0)
         let districts = [{
            'label': 'Chọn ngành nghề',
            'value': 0
        }, ...getDistrict(citySelected)];

        setListDistrict(districts)
        }
        
    }, [citySelected])

    useEffect(() => {
        handleGetData(dataFilter)
    }, [currentPage])

    return (
        <>
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
                                    name="use_id"
                                    placeholder="Nhập Id"
                                />
                            </Col>
                            <Col span={4}>
                                <ProFormText
                                    name="use_name"
                                    placeholder="Nhập tên ứng viên"
                                />
                            </Col>
                            <Col span={4}>
                                <ProFormText
                                    name="use_email_contact"
                                    placeholder="Nhập email"
                                />
                            </Col>
                            <Col span={4}>
                                <ProFormText
                                    name="use_phone"
                                    placeholder="Nhập SĐT"
                                />
                            </Col>
                            <Col span={4}>
                                <ProFormText
                                    name="address"
                                    placeholder="Nhập địa chỉ"
                                />
                            </Col>
                            
                            <Col span={4}>
                                <Select
                                    style={{ width: '100%' }}
                                    showSearch
                                    placeholder="Chọn ngành nghề"
                                    onChange={(value: string) => setJobSelected(value)}
                                    filterOption={(input: string, option?: { label: string; value: number }) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                    options={[{
                                        'cat_name': 'Chọn ngành nghề',
                                        'cat_id': 0
                                    }, ...job_array].map((job) => (
                                        {
                                            'label': job.cat_name,
                                            'value': job.cat_id
                                        }
                                    ))}
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
                                    options={[{
                                        cit_name: 'Chọn tỉnh thành',
                                        cit_id: 0
                                    }, ...city_array].map((city) => (
                                        {
                                            'label': city.cit_name,
                                            'value': city.cit_id
                                        }
                                    ))}
                                />
                            </Col>
                            <Col span={4}>
                                <Select
                                    style={{ width: '100%' }}
                                    showSearch
                                    placeholder="Chọn quận huyện"
                                    value={provinceSelected}
                                    onChange={(value: number) => setProvinceSelected(value)}
                                    filterOption={(input: string, option?: { label: string; value: number }) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                    options={listDistrict}
                                />
                            </Col>

                            <Col span={4}>
                                <Select
                                    style={{ width: '100%' }}
                                    showSearch
                                    placeholder="Chọn giới tính"
                                    value={genderSelectd}
                                    onChange={(value: number) => setGenderSelected(value)}
                                    filterOption={(input: string, option?: { label: string; value: number }) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                    options={[
                                        {
                                            'label': 'Chọn giới tính',
                                            'value': 0
                                        },
                                        {
                                            'label': 'Nam',
                                            'value': 1
                                        },
                                        {
                                            'label': 'Nữ',
                                            'value': 2
                                        },
                                        {
                                            'label': 'Khác',
                                            'value': 3
                                        }
                                    ]}
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
                                    placeholder="Chọn nguồn"
                                    onChange={(value: string) => setSourceSelected(value)}
                                    filterOption={(input: string, option?: { label: string; value: string }) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                    options={[
                                        {
                                            value: 'ITVIEC',
                                            label: 'ItViec',
                                        },
                                        {
                                            value: 'APP_TIM_VIEC',
                                            label: 'App tìm việc',
                                        },
                                        {
                                            value: 'TIMVIEC365.VN',
                                            label: 'Timviec365.nv',
                                        },
                                    ]}
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
            <AdminModalShow isOpen={isOpenModalCv} action={() => setIsOpenModalCv(!isOpenModalCv)} content={
                <CvContent data={listCv}/>
            }/>
        </>
    )
}

export default AdminGetAllCandidate