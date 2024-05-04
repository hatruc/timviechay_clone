import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
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
import { EditOutlined } from "@ant-design/icons";
import styles from "../index.module.scss";
import DataTable from "../../table";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
import AdminAddPoint from "../add";
import axios from "axios";
import AdminEditPoint from "./edit";

const AdminGetPointBugget = () => {
  const {
    idPoint,
    changeIdPoint,
    token,
    afterUpdate,
    changeDetailAfterUpdate,
    pointBugget,
    changePointBugget,
    handlePermission
  } = useContext(NTD_UV_Context);
  const [isFetching, setIsFetching] = useState(true);
  const tableRef = useRef<ActionType>();

  const [currentPage, setCurrentPage] = useState<any>(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecord, setTotalRecord] = useState(100);

  const [dataTable, setDataTable] = useState([]);
  const [form] = Form.useForm();
  const [dataFilter, setDataFilter] = useState<any>({});
  const [isShowDetail, setIsShowDetail] = useState<Boolean>(false);

  const columns: ProColumns<any>[] = [
    {
      title: "STT",
      render: (text: any, record: any, index: any, action: any) => {
        return <>{index + 1}</>;
      },
      hideInSearch: true
    },
    {
      title: "Tên gói",
      dataIndex: "name",
      hideInSearch: true
    },

    {
      title: "Số điểm",
      dataIndex: "point",
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
            color: `${handlePermission.edit ? "#ffa500" : "#ddcfb6"}`
          }}
          type=""
          onClick={async () => {
            if (handlePermission.edit) {
              changeDetailAfterUpdate({
                currentNumberSidebar: 51
              });
              changePointBugget({
                idDetailItem: record.point_id,
                edit: 0
              });
            }
          }}
        />
      )
    },
    {
      title: "Xóa",
      hideInSearch: true,
      width: 50,
      render: (_value: any, entity: any, _index: any, _action: any) => (
        <EditOutlined
          style={{
            fontSize: 20,
            color: `${handlePermission.delete ? '#ff4d4f' : '#ddcfb6'}`
          }}
          type=""
          onClick={async () => {
            if(handlePermission.delete) {
                // handle
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
      module: 21,
      page: currentPage,
      pageSize: itemsPerPage,
      conditions: {}
    };
    const res = await getAllCandidate(json, token, "");
    if (res?.result) {
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
  };

  const onFinish = async (values: any) => {
    setCurrentPage(1);
    setDataFilter(values);
    handleGetData(values);
  };

  useEffect(() => {
    handleGetData({});
  }, []);

  useEffect(() => {
    if (idPoint) {
      setIsShowDetail(true);
    }
  }, [idPoint]);

  return (
    <>
      {pointBugget.idDetailItem == 0 ? (
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
                {/* <Col span={4}>
                            <ProFormText
                                name="Tìm kiếm"
                                placeholder="Nhập Id"
                            />
                        </Col> */}
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
        <AdminEditPoint action={() => handleGetData({})} />
      )}{" "}
    </>
  );
};

export default AdminGetPointBugget;
