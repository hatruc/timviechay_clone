import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './right-section.module.scss'
// import chatIntroductionImg from '@/images/list-chat/chat-introduction.png';
import Image from 'next/image'
// import avatarImg1 from '@/images/list-chat/avatar1.jpg'
import { Button, Form, Input, Modal, Upload } from 'antd';
import { ArrowLeftOutlined, PaperClipOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib';
import { IUserConversation } from '..';
import { format } from 'date-fns';
import { MY_USER_ID } from '@/components/constants/user';

interface IProps {
    userConversation: IUserConversation | null;
    setUserConversation: Dispatch<SetStateAction<IUserConversation | null>>
}

const getBase64 = (file: any): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file as any);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const RightSection = (props: IProps) => {
    const { userConversation, setUserConversation } = props
    const [form] = Form.useForm()
    const [windowWidth, setWindowWidth] = useState(0)

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);
    }

    const handlePreviewImageMessage = (image: any) => {
        setPreviewImage(image.src)
        setPreviewOpen(true);
        setPreviewTitle('Image');
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [windowWidth])

    const handleGoBack = () => {
        const rightContainer = document.getElementById('chat-right-container')
        const leftContainer = document.getElementById('chat-left-container')

        if (windowWidth <= 767) {
            if (leftContainer && rightContainer) {
                leftContainer.style.width = '100%'
                rightContainer.style.width = '0%'
                leftContainer.style.display = 'block'
                rightContainer.style.display = 'none'
                setUserConversation(null)
            }
        }
    }

    const handleReset = () => {
        form.resetFields()
        setPreviewOpen(false)
        setPreviewImage('')
        setPreviewTitle('')
        setFileList([])
    }

    const onFinish = (values: any) => {
        console.log('Success:', values, fileList);
        handleReset()
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div id='chat-right-container' className={styles['right-container']}>
            {!userConversation?.id ? <div className={styles['chat-introduction']}>
                <Image src={'/images/list-chat/chat-introduction.png'} alt='chatIntroductionImg' width={568} height={336} className={styles['chat-introduction-img']} />
                <div className={styles['chat-introduction-title']}>Nay đã có thể nhắn tin trực tiếp giữa <span>NHÀ TUYỂN DỤNG</span> và <span>ỨNG VIÊN</span> ngay trên Timviechay!</div>
            </div> : <div className={styles['chat']}>
                <div className={styles['chat-heading']}>
                    {windowWidth <= 767 && <ArrowLeftOutlined onClick={handleGoBack} />}
                    <Image src={userConversation?.avatar} alt='avatarImg' width={400} height={400} className={styles['user-avatar']} />
                    <p className={styles['chat-name']}>{userConversation?.name}</p>
                </div>
                <div className={styles['chat-body']}>
                    {userConversation?.conversation?.map((conversation, index) => (
                        <div key={index} className={`${styles['message-item']} ${conversation.userId !== MY_USER_ID ? styles['other-user'] : ''}`}>
                            {conversation.userId !== MY_USER_ID &&
                                <Image src={userConversation.avatar} alt='avatarImg' width={400} height={400} className={styles['user-avatar']} />
                            }
                            <div>
                                <div className={styles['message-time']}>{format(conversation.createAt, `dd/MM/yyyy HH:mm:ss aaaaa'm'`)}</div>
                                {conversation?.image && <div>
                                    <Image onClick={() => handlePreviewImageMessage(conversation.image)} src={conversation.image} alt='img' width={400} height={400} className={styles['message-image']} />
                                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                        <Image alt="preview" style={{ width: '100%' }} src={previewImage} width={500} height={500} />
                                    </Modal></div>}
                                <div className={styles['message-content']}>
                                    {conversation.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles['chat-footer']}>
                    <Form
                        form={form}
                        className={styles['form-footer']}
                        initialValues={{ message: '' }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item name='message' className={styles['message-input']} >
                            <Input placeholder='Viết tin nhắn' style={{ backgroundColor: "#EAF2FA" }} />
                        </Form.Item>

                        <Upload
                            listType="picture"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            <Button style={{ backgroundColor: '#EAF2FA', borderRadius: '50%' }} icon={<PaperClipOutlined />}></Button>
                        </Upload>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <Image alt="preview" style={{ width: '100%' }} src={previewImage} width={500} height={500} />
                        </Modal>
                    </Form>
                </div>
            </div>}

        </div >
    )
}

export default RightSection