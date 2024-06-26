import React, { useContext, useEffect, useRef, useState } from "react";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
import { Col, ConfigProvider, DatePicker, Form, Row } from "antd";
import {
  ActionType,
  ProColumns,
  ProForm,
  ProFormText
} from "@ant-design/pro-components";
import { getAllCandidate } from "@/pages/api/candidate";
import { format } from "date-fns";
import { EditOutlined } from "@ant-design/icons";
import type { DatePickerProps } from "antd";
import enUS from "antd/lib/locale/en_US";
import styles from "../index.module.scss";
import DataTable from "../../table";
import { EditItem } from "./EditItem";
import axios from "axios";
import {
  handleChangeDateEnd,
  handleChangeDateStart
} from "@/functions/functions";
// import { EditItem } from './EditItem';

export type LoginFormInputs = {
  point_every_day: number;
  point_add: number;
  date: string;
};

const AdminPointList = () => {
  const {
    token,
    afterUpdate,
    changeDetailAfterUpdate,
    pointEdit,
    changePointEdit,
    handlePermission
  } = useContext(NTD_UV_Context);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const tableRef = useRef<ActionType>();
  const [dataRecord, setDataRecord] = useState<any>();
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(30);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRecord, setTotalRecord] = useState<number>(100);

  const [dataTable, setDataTable] = useState<any>([]);
  const [form] = Form.useForm();
  const [dataFilter, setDataFilter] = useState<any>({});
  const [isShowDetail, setIsShowDetail] = useState<Boolean>(false);

  const [dateStart, setDateStart] = useState<string>();
  const [dateEnd, setDateEnd] = useState<string>();

  const columns: ProColumns<any>[] = [
    {
      title: "STT",
      render: (text: any, record: any, index: any, action: any) => {
        return <>{index + 1}</>;
      },
      hideInSearch: true
    },
    {
      title: "ID",
      dataIndex: "usc_id",
      hideInSearch: true
    },

    {
      title: "Tên công ty",
      dataIndex: "usc_company",
      hideInSearch: true
    },
    {
      title: "Email",
      dataIndex: "usc_name_email",
      hideInSearch: true
    },
    {
      title: "Điểm khuyến mãi",
      dataIndex: "point",
      hideInSearch: true
    },
    {
      title: "Điểm cộng thêm",
      dataIndex: "point_usc",
      hideInSearch: true
    },
    {
      title: "Ngày hết hạn điểm",
      dataIndex: "day_end",
      render: (text: any, record: any, index: any, action: any) => {
        return (
          <>
            {record.day_end
              ? format(record.day_end * 1000, `dd/MM/yyyy`)
              : "Chưa cập nhật"}
          </>
        );
      },
      hideInSearch: true
    },
    {
      title: "Sửa",
      hideInSearch: true,
      width: 50,
      render: (text: any, record: any, index: any, action: any) => (
        <EditOutlined
          style={{
            fontSize: 20,
            color: `${handlePermission.edit ? '#ffa500' : '#ddcfb6'}`
          }}
          type=""
          onClick={() => {
           if(handlePermission.edit) {
            changeDetailAfterUpdate({
              currentNumberSidebar: 52
            });
            changePointEdit({
              idDetailItem: record.usc_id,
              edit: 1
            });
           }
          }}
        />
      )
    }
  ];

  const getTotal = (data: any) => {
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL_API + "/admin/count", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
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
      module: 22,
      page: currentPage,
      pageSize: itemsPerPage,
      conditions: {
        usc_id: data?.ID?.trim(),
        usc_name_email: data?.email?.trim(),
      },
      from: dateStart,
      to: dateEnd
    };
    const res = await getAllCandidate(json, token, "");
    if (res?.data) {
      setDataTable(res.data);
    }
    setIsFetching(false);
    getTotal(json);
  };



  const handleFilter = async (
    params: any,
    sort: any,
    filter: any
  ): Promise<any> => {
    let filterValue = form.getFieldsValue();
    setDataFilter(filterValue);
    setItemsPerPage(params.pageSize);
    setCurrentPage(params.current);
    handleGetData(filterValue);
  };

  const onFinish = async (values: any) => {
    setCurrentPage(1);
    setDataFilter(values);
    handleGetData(values);
  };

  const handleDateStart: DatePickerProps["onChange"] = (
    date: any,
    dateString: any
  ) => {
    const value = handleChangeDateStart(date, dateString);
    setDateStart(value);
  };

  const handleDateEnd: DatePickerProps["onChange"] = (
    date: any,
    dateString: any
  ) => {
    const value = handleChangeDateEnd(date, dateString);
    setDateEnd(value);
  };

  useEffect(() => {
    console.log('pointEdit', pointEdit);
    if (pointEdit.edit !== 2) {
      changeDetailAfterUpdate({
        currentNumberSidebar: 52
      });
      changePointEdit({
        idDetailItem: pointEdit.idDetailItem,
        edit: 0
      });
    } else {
      changeDetailAfterUpdate({
        currentNumberSidebar: 52
      });
      changePointEdit({
        idDetailItem: pointEdit.idDetailItem,
        edit: pointEdit.edit
      });
    }
  }, []);

  return (
    <>
      {pointEdit.idDetailItem == 0 ? (
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
                  <ProFormText name="ID" placeholder="Nhập Id" />
                </Col>
                <Col span={4}>
                  <ProFormText name="email" placeholder="Email" />
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
                showTotal: (total: any, range: any) => {
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
      ) : (
        <EditItem action={() => setIsShowDetail(false)} />
      )}
    </>
  );
};

export default AdminPointList;
