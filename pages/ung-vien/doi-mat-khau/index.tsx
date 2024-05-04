
import Temp_comp from "@/components/quan-ly-chung-UV/Temp_comp"
import Intro from "@/components/ung-vien/intro/intro"
import { Button, Form, Input } from "antd"
import s from "./styles.module.scss"
import { useRouter } from "next/router"
import { POST } from "@/pages/api/base-api"
import Cookies from "js-cookie"
import { cookieToken } from "@/components/service/functions"

export default function DoiMK() {
    const router = useRouter()
    const [form] = Form.useForm()

    const validateInput = (_: any, value: string) => {
        if (value && value.length > 5) {
            const hasWhitespace = /\s/.test(value);
            if (hasWhitespace) {
                return Promise.reject('Mật khẩu không được chứa khoảng trắng');
            }
            const hasLetter = /[a-zA-Z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            if (!hasLetter || !hasNumber) {
                return Promise.reject('Mật khẩu phải bao gồm có ít nhất 1 chữ và 1 số.');
            }
        }
        return Promise.resolve();
    };

    const resetPassword = async (value?: any) => {
        // console.log(form.getFieldsValue(true))
        if (value) {
            // console.log(value)
            const result = await POST('user/changePassUv', {
                passowrdOld: value?.old_password,
                password: value?.new_password,
                rePassword: value?.repassword,
                type: 2,
            })
            if (result?.result) {
                alert(result?.message)
                Cookies.set(cookieToken, `${result?.token}`)
                router.push('/ung-vien/quan-ly-chung')
            } else {
                alert(result?.message)
            }
        }
    }

    return (
        <>
            <Temp_comp>
                {/* <div className={s.intro_center}><Intro /></div> */}
                <div className={s.container_table}>
                    <div className={s.title}>
                        <div className={s.label}>Đổi Mật Khẩu </div>
                        <span></span>
                    </div>
                    <div className={s.form_change}>
                        <Form className={s.form_content} name="info_password" onFinish={(value) => resetPassword(value)} form={form}>
                            <Form.Item
                                className={s.form_item}
                                label="Mật khẩu hiện tại"
                                name="old_password"
                                colon={false}
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu cũ' },
                                    // { whitespace: false, message: 'Mật khẩu không được chứa khoảng trắng' },
                                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                                    { validator: validateInput },
                                ]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                            </Form.Item>
                            <Form.Item
                                className={s.form_item}
                                label="Mật khẩu mới"
                                name="new_password"
                                colon={false}
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                                    // { whitespace: false, message: 'Mật khẩu không được chứa khoảng trắng' },
                                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                                    { validator: validateInput },
                                ]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu mới" />
                            </Form.Item>
                            <Form.Item
                                className={s.form_item}
                                label="Nhập lại mật khẩu mới"
                                name="repassword"
                                colon={false}
                                dependencies={['new_password']}
                                rules={[
                                    { required: true, message: 'Vui lòng lại nhập mật khẩu' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('new_password') === value) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(new Error('Mật khẩu không khớp'))
                                        }
                                    })
                                ]}
                            >
                                <Input.Password placeholder="Nhập lại mật khẩu mới" />
                            </Form.Item>
                            <Form.Item className={s.group_button}>
                                <Button type="primary" htmlType="submit" form="info_password">Đổi mật khẩu</Button>
                                <Button htmlType="button" style={{ color: "#3A85D4", borderColor: "#3A85D4" }} onClick={() => { form.resetFields(), router.push('/ung-vien/quan-ly-chung') }}>Hủy</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Temp_comp>
        </>
    )
}