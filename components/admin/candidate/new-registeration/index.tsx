import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
  Dropdown,
  Form,
  Popconfirm,
  Row,
  Select
} from "antd";
import {
  ActionType,
  ProColumns,
  ProForm,
  ProFormText
} from "@ant-design/pro-components";
import { getAllCandidate } from "@/pages/api/candidate";
import { format } from "date-fns";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
  TableOutlined
} from "@ant-design/icons";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import type { DatePickerProps } from "antd";
import enUS from "antd/lib/locale/en_US";
import styles from "./list.module.scss";
import DataTable from "../../table";
import moment from "moment";
import { city_array, getJob, handleChangeDateEnd, handleChangeDateStart } from "@/functions/functions";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
import axios from "axios";

const AdminNewestRegisterCandidate = () => {
  const { token, handlePermission } = useContext(NTD_UV_Context);
  const [isFetching, setIsFetching] = useState(true);
  const tableRef = useRef<ActionType>();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecord, setTotalRecord] = useState(100);

  const [dataTable, setDataTable] = useState([]);
  const [form] = Form.useForm();
  const [dataFilter, setDataFilter] = useState<any>();

  const [jobSelected, setJobSelected] = useState("");
  const [provinceSelected, setProvinceSelected] = useState("");
  const [sourceSelected, setSourceSelected] = useState("");

  const [dateStart, setDateStart] = useState<any>();
  const [dateEnd, setDateEnd] = useState<any>();
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
      module: 2,
      page: currentPage,
      pageSize: itemsPerPage,
      conditions: {
        use_id: data?.id?.trim(),
        use_name: data?.name?.trim(),
        use_email_contact: data?.email?.trim(),
        use_phone: data?.phone?.trim(),
        address: data?.address?.trim(),
        use_nganh_nghe: jobSelected,
        use_city_job: provinceSelected
      },
      from: dateStart ,
      to: dateEnd 
    }
    const res = await getAllCandidate(
      json,
      token,
      ""
    );
    if (res?.data) {
      setDataTable(res.data);
    }
    setIsFetching(false);
    getTotal(json);
  };

  

  const columns: ProColumns<any>[] = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (text, record, index, action) => {
        return (
          <>{index + 1}</>
        );
      },
      hideInSearch: true
    },
    {
      title: "Id",
      dataIndex: "use_id",
      hideInSearch: true
    },
    {
      title: "Tên ứng viên",
      dataIndex: "use_name",
      hideInSearch: true
    },
    {
      title: "Email",
      dataIndex: "use_email_contact",
      hideInSearch: true
    },
    {
      title: "SĐT (TK đăng nhập)",
      dataIndex: "use_phone_tk",
      hideInSearch: true
    },
    {
      title: "SĐT",
      dataIndex: "use_phone",
      hideInSearch: true
    },
    {
      title: "Công việc",
      dataIndex: "use_job_name",
      hideInSearch: true
    },
    {
      title: "Ngày đăng ký",
      dataIndex: `use_create_time`,
      render: (text, record, index, action) => {
        return (
          <>
            {record.use_create_time
              ? format(new Date(record.use_create_time * 1000), `dd/MM/yyyy`)
              : record.use_create_time}
          </>
        );
      },
      hideInSearch: true
    },
    {
      title: "Nguồn",
      dataIndex: "source",
      hideInSearch: true
    },
    {
      title: "OTP",
      dataIndex: "use_otp",
      hideInSearch: true
    },
    {
      title: "Làm mới",
      render: (text, record, index, action) => {
        return (
          <div>
            <TableOutlined />
          </div>
        );
      },
      hideInSearch: true
    },
    {
      title: "Show",
      render: (text, record, index, action) => {
        return (
          <>
            <Checkbox
            disabled={ handlePermission.edit ? false :true }
              defaultChecked={record.use_show}
              onChange={(e) => handleSelectShow(e.target.checked)}
            />
          </>
        );
      },
      hideInSearch: true
    },
    {
      title: "Active",
      render: (text, record, index, action) => {
        return (
          <>
            <Checkbox
            disabled={ handlePermission.edit ? false :true }
              defaultChecked={record.adm_active}
              onChange={(e) => {
                console.log(e.target.checked);
              }}
            />
          </>
        );
      },
      hideInSearch: true
    },
    {
      title: "Sửa",
      hideInSearch: true,
      width: 50,
      render: (_value, entity, _index, _action) => (
        <EditOutlined
          style={{
            fontSize: 20,
            color: "#ffa500"
          }}
          type=""
          onClick={() => {}}
        />
      )
    },
    {
      title: "Xóa",
      hideInSearch: true,
      width: 50,
      render: (_value, entity, _index, _action) => (
        <Popconfirm
          placement="leftTop"
          title={"Xác nhận xóa ứng viên"}
          description={"Bạn có chắc chắn muốn xóa ứng viên này ?"}
          onConfirm={() => {}}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <span style={{ cursor: "pointer", margin: "0 10px" }}>
            <DeleteOutlined
              style={{
                fontSize: 20,
                color: "#ff4d4f"
              }}
            />
          </span>
        </Popconfirm>
      )
    }
  ];

  

  const handleFilter = async (
    params: any,
    sort: any,
    filter: any
  ): Promise<any> => {
    let filterValue = form.getFieldsValue();
        setDataFilter(filterValue)
        setItemsPerPage(params.pageSize)
        setCurrentPage(params.current)
        handleGetData(filterValue)
  };

  const handleSelectShow = (checkedValue: boolean) => {
    console.log(checkedValue);
  };

  const onFinish = async (values: any) => {
    setCurrentPage(1)
    setDataFilter(values)
    handleGetData(values)
  };

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
          submitter={{
            searchConfig: {
              resetText: "Hủy",
              submitText: <>{"Tìm kiếm"}</>
            },
            resetButtonProps: false,
            render: (_: any, dom: any) => (
              <div style={{ marginTop: "20px" }}>{dom}</div>
            )
          }}
        >
          <Row gutter={[20, 20]}>
            <Col span={4}>
              <ProFormText name="id" placeholder="Nhập Id" />
            </Col>
            <Col span={4}>
              <ProFormText name="name" placeholder="Nhập tên ứng viên" />
            </Col>
            <Col span={4}>
              <ProFormText name="email" placeholder="Nhập email" />
            </Col>
            <Col span={4}>
              <ProFormText name="phone" placeholder="Nhập SĐT" />
            </Col>
            <Col span={4}>
              <ProFormText name="address" placeholder="Nhập địa chỉ" />
            </Col>
            <Col span={4}>
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Chọn ngành nghề"
                onChange={(value: any) => setJobSelected(value)}
                filterOption={(
                  input: string,
                  option?: { label: string; value: number }
                ) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { value: 0, label: "Tất cả ngành nghề" },
                  ...getJob()
                ]}
              />
            </Col>
            <Col span={4}>
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Chọn tỉnh thành"
                onChange={(value: any) => setProvinceSelected(value)}
                filterOption={(
                  input: string,
                  option?: { label: string; value: number }
                ) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={city_array.map((city) => ({
                  label: city.cit_name,
                  value: city.cit_id
                }))}
              />
            </Col>
            <Col span={4}>
              <ConfigProvider locale={enUS}>
                <DatePicker
                  placeholder="Từ"
                  style={{ width: "100%" }}
                  onChange={handleDateStart}
                />
              </ConfigProvider>
            </Col>
            <Col span={4}>
              <ConfigProvider locale={enUS}>
                <DatePicker
                  placeholder="Đến"
                  style={{ width: "100%" }}
                  onChange={handleDateEnd}
                />
              </ConfigProvider>
            </Col>
            <Col span={4}>
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Chọn nguồn"
                onChange={(value: string) => setSourceSelected(value)}
                filterOption={(
                  input: string,
                  option?: { label: string; value: string }
                ) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "ITVIEC",
                    label: "ItViec"
                  },
                  {
                    value: "APP_TIM_VIEC",
                    label: "App tìm việc"
                  },
                  {
                    value: "TIMVIEC365.VN",
                    label: "Timviec365.nv"
                  }
                ]}
              />
            </Col>
          </Row>
        </ProForm>
      </Col>
      <Col span={24} className={styles["table-container"]}>
        <DataTable<any>
          actionRef={tableRef}
          rowKey="id"
          loading={isFetching}
          columns={columns}
          dataSource={dataTable}
          request={handleFilter}
          scroll={{ x: true }}
          search={false}
          pagination={{
            current: currentPage,
            pageSize: itemsPerPage,
            showSizeChanger: true,
            total: totalRecord,
            showTotal: (total, range) => {
              return (
                <div>
                  {" "}
                  {range[0]}-{range[1]} trên {total} bản ghi
                </div>
              );
            }
          }}
          rowSelection={false}
        />
      </Col>
    </Row>
  );
};

export default AdminNewestRegisterCandidate;
