
import React from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import styles from './sensitive-keyword.module.scss'

const AdminSensitiveKeywordCandidate = () => {
    const [form1] = Form.useForm()
    const [form2] = Form.useForm()

    const onFinish1 = (values: any) => {
        console.log('Success:', values);
    };

    const onFinish2 = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <Row>
            <Col span={12}>
                <Form
                    form={form1}
                    className={styles['form']}
                    initialValues={{ keywordAdding: '' }}
                    onFinish={onFinish1}
                    autoComplete="off"
                >
                    <p>Nhập từ khóa cần thêm</p>
                    <Form.Item name='keywordAdding' className={styles['keyword']} >
                        <Input placeholder='Nhập từ khóa cần thêm' style={{ backgroundColor: "#EAF2FA" }} />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ background: '#32CD32' }} type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>

                <Form
                    form={form2}
                    className={styles['form']}
                    initialValues={{ keyworDeleting: '' }}
                    onFinish={onFinish2}
                    autoComplete="off"
                >
                    <p>Nhập từ khóa cần xóa</p>
                    <Form.Item name='keywordDeleting' className={styles['keyword']} >
                        <Input placeholder='Nhập từ khóa cần xóa' style={{ backgroundColor: "#EAF2FA" }} />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ background: '#FF0000' }} type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default AdminSensitiveKeywordCandidate