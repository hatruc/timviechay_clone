
import React, { useEffect, useRef, useState } from 'react'
import { Checkbox, Col, ConfigProvider, DatePicker, Form, Popconfirm, Row, Select } from 'antd'
import DataTable from './table';
import { ActionType, ProColumns, ProForm, ProFormText } from '@ant-design/pro-components';
import { getAllCandidate } from '@/pages/api/candidate';
import { format } from 'date-fns';
import { DeleteOutlined, EditOutlined, TableOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { DatePickerProps } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import styles from './admin.module.scss'
import Image from 'next/image';

const Admin = () => {
    return (
        <Row>
            <Col span={24}>
                <Image src={'/images/admin/background.jpg'} width={2000} height={2000} alt='backgroundImg' />
            </Col>
        </Row>
    )
}

export default Admin