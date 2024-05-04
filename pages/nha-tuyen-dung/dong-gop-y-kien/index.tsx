import Box_container from '@/components/quan-ly-chung-NTD/Box_container';
import Temp_comp from '@/components/quan-ly-chung-NTD/Temp_comp';
import React,{useState} from 'react';
import { Form, Radio, Input, Rate, Button, Typography } from 'antd';
import  { POST }  from '@/pages/api/base-api'

const { TextArea } = Input;

import s from './styles.module.scss';

export default function DongGopYKien() {

    const [submitting1, setSubmitting1] = useState(false)
    const [submitting2, setSubmitting2] = useState(false)

    const onFinish = async (values: any) => {
        // console.log('Received values:', values);
        setSubmitting1(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await POST('ntd/FeedBack', {
            ...values,
            type: 2
        })
        // console.log(response)
        if(response?.result){
            alert('Gửi phản hồi thành công')
        } else {
            alert('Gửi phản hồi thất bại')
        }
        setSubmitting1(false)
    };

    const onFinish_1 = async (values: any) => {
        // console.log('Received values:', values);
        setSubmitting2(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await POST('ntd/FeedBack', {
            ...values,
            type: 1
        })
        // // console.log(response)
        if(response?.result){
            alert('Gửi phản hồi thành công')
        } else {
            alert('Gửi phản hồi thất bại')
        }
        setSubmitting2(false)
    };
    
    return (
        <>
            <style>
                {
                    `
                .ant-rate {
                    color: #ffa317;
                  }
                `
                }
            </style>
            <Temp_comp>
                <Box_container>
                </Box_container>
                <div className={s.body}>
                    <div className={s.box_1}>
                        <span className={s.text_1}>
                            Cám ơn Doanh nghiệp đã tin tưởng và sử dụng dịch vụ Timviechay.vn. Nhằm nâng cao chất lượng dịch vụ cũng như giúp doanh nghiệp tuyển dụng nhanh chóng - thành công, mong quý công ty đưa ra đánh giá quý báu của mình về chuyên viên hỗ trợ và đóng góp về website. Mọi đóng góp của doanh nghiệp sẽ là nền tảng để chúng tôi phát triển và tối ưu!
                        </span>
                        <Form
                            name="myForm"
                            onFinish={onFinish}
                            initialValues={{ chuyenvien_call: 1, deportment: 1, candi_support: '', rate: 0, note: '' }}
                            style={{ width: "100%" }}
                        >
                            <span className={s.text_1}>Chuyên viên Mai Hương có gọi điện hỗ trợ anh/chị trong công tác tuyển dụng không?</span>
                            <Form.Item name="chuyenvien_call" className={s.text_2}>
                                <Radio.Group style={{ display: 'flex', gap: '60px' }}>
                                    <Radio value={1}>Có</Radio>
                                    <Radio value={0}>Không</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <span className={s.text_1}>Thái độ chuyên viên khi hỗ trợ anh/chị như thế nào?</span>
                            <Form.Item name="deportment" className={s.text_2}>
                                <Radio.Group style={{ display: 'flex', gap: '15px' }}>
                                    <Radio value={1}>Nhiệt tình</Radio>
                                    <Radio value={0}>Không nhiệt tình</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <div className={s.item_3}>
                                <span className={s.text_1}>Chuyên viên đã hỗ trợ tuyển dụng cho doanh nghiệp bao nhiêu ứng viên?</span>
                                <Form.Item name="candi_support"
                                    className={s.input_1}
                                    style={{ marginBottom: "0px" }}
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                new Promise((resolve: any, reject: any) => {
                                                    const regex = /^[0-9]*$/;
                                                    if (regex.test(value)) {
                                                        resolve();
                                                    } else {
                                                        reject('Vui lòng chỉ nhập số.');
                                                    }
                                                }),
                                            message: 'Vui lòng chỉ nhập số.',
                                        },
                                    ]}
                                 >
                                    <Input placeholder='Nhập số lượng ứng viên' />
                                </Form.Item>
                            </div>

                            <div className={s.item_4}>
                                <span className={s.text_1}>Đánh giá về độ hài lòng với chuyên viên Mai Hương:</span>
                                <Form.Item name="rate" style={{ marginBottom: "0px" }}>
                                    <Rate allowHalf={true} />
                                </Form.Item>
                            </div>


                            <span className={s.text_1}>Đánh giá thêm về chuyên viên hỗ trợ:</span>
                            <Form.Item name="note">
                                <TextArea rows={4} style={{ marginTop: "12px", width: '100%', height: '229px' }} />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className={s.button} disabled={submitting1}>
                                    GỬI Ý KIẾN
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    <div className={s.box_2}>
                        <Form
                            name="myForm2"
                            onFinish={onFinish_1}
                            initialValues={{
                                feedback_from: 1, danhgia: '', bosung: '', rate: 0
                            }}
                            style={{ width: "100%" }}
                        >
                            <span className={s.text_1}>Anh chị biết website Timviechay.vn từ đâu?</span>
                            <Form.Item name="feedback_from" className={s.text_2}>
                                <Radio.Group className={s.radio_1}>
                                    <div className={s.group_radio}>
                                        <Radio value={1}>Google</Radio>
                                        <Radio value={2}>Facebook</Radio>
                                    </div>

                                    <div className={`${s.group_radio} ${s.group_radio_1}`}>
                                        <Radio value={3}>Giới thiệu</Radio>
                                        <Radio value={4}>Khác</Radio>
                                    </div>
                                </Radio.Group>
                            </Form.Item>

                            <span className={s.text_1}>Anh chị cảm thấy hài lòng nhất điều gì ở website Timviechay.vn?</span>
                            <Form.Item name="danhgia">
                                <TextArea rows={4} style={{ marginTop: "12px", width: '100%', height: '229px' }} />
                            </Form.Item>

                            <span className={s.text_1}>Anh chị thấy nên bổ sung và hoàn thiện chức năng gì ở website Timviechay.vn?</span>
                            <Form.Item name="bosung">
                                <TextArea rows={4} style={{ marginTop: "12px", width: '100%', height: '229px' }} />
                            </Form.Item>

                            <div className={s.item_4}>
                                <span className={s.text_1}>Đánh giá về độ hài lòng với website Timviechay.vn:</span>
                                <Form.Item name="rate" style={{ marginBottom: "0px" }}>
                                    <Rate allowHalf={true} />
                                </Form.Item>
                            </div>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className={s.button} disabled={submitting2}>
                                    GỬI Ý KIẾN
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div >

            </Temp_comp >
        </>
    );
}
