import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './left-section.module.scss'
import { Button, Popover } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons';
import Image from 'next/image';
// import avatarImg1 from '@/images/list-chat/avatar1.jpg'
// import avatarImg2 from '@/images/list-chat/avatar2.jpg'
// import avatarImg3 from '@/images/list-chat/avatar3.jpg'
// import avatarImg4 from '@/images/list-chat/avatar4.jpg'
// import avatarImg5 from '@/images/list-chat/avatar5.jpg'
// import trai1 from '@/images/list-chat/trai1.webp'
// import trai2 from '@/images/list-chat/trai2.jpg'

/*
    Cách import này bị lỗi ở trên base khi build, bạn nhớ dùng đường link trực tiếp nhé
 */

import { IUserConversation } from '..';
import { MY_USER_ID } from '@/components/constants/user';

interface IProps {
    setUserConversation: Dispatch<SetStateAction<IUserConversation | null>>
    userConversation: IUserConversation | null
}

const LeftSection = (props: IProps) => {
    const { setUserConversation, userConversation } = props
    const [windowWidth, setWindowWidth] = useState(0)

    const [usersChat, setUsersChat] = useState<IUserConversation[]>([{
        id: 1,
        // avatar: avatarImg1,
        avatar: '/images/list-chat/avatar1.jpg',
        name: 'Yên Nguyễn',
        status: 'online',
        conversation: [
            {
                userId: MY_USER_ID,
                content: 'Hello guy!',
                file: null,
                image: null,
                createAt: 1710405655000
            },
            {
                userId: 1,
                content: 'Hi there!',
                file: null,
                image: null,
                createAt: 1710405660000
            },
            {
                userId: MY_USER_ID,
                content: 'Nice to meet you!',
                file: null,
                // image: trai1,
                image: '/images/list-chat/trai1.webp',
                createAt: 1710405660010
            },
            {
                userId: 1,
                content: 'Nice to see you!',
                file: null,
                image: null,
                createAt: 1710405660014
            },
            {
                userId: MY_USER_ID,
                content: 'What is your name?',
                file: null,
                image: null,
                createAt: 1710405660300
            },
            {
                userId: 1,
                content: 'My name is Nam. What is your name?',
                file: null,
                // image: trai2,
                image: '/images/list-chat/trai2.jpg',
                createAt: 1710405660305
            },
            {
                userId: MY_USER_ID,
                content: 'My name is Kien, a student of Havard University',
                file: null,
                image: null,
                createAt: 1710405660308
            },
            {
                userId: 1,
                content: `Wow! I'm so amazing!`,
                file: null,
                image: null,
                createAt: 1710405660408
            },
            {
                userId: MY_USER_ID,
                content: `Haha! I'm just kidding. I come here to want you help me something`,
                file: null,
                image: null,
                createAt: 1710405660808
            },
            {
                userId: 1,
                content: 'What do you want me to do?',
                file: null,
                image: null,
                createAt: 1710405660908
            },
            {
                userId: MY_USER_ID,
                content: 'I want you to take care of my children, because I will go to receive my IETLS certification',
                file: null,
                image: null,
                createAt: 1710405660999
            },
            {
                userId: 1,
                content: 'You are good! OK, you can count on me.',
                file: null,
                image: null,
                createAt: 1710405662000
            },
        ]
    }, {
        id: 2,
        // avatar: avatarImg2,
        avatar: '/images/list-chat/avatar2.jpg',
        status: 'offline',
        name: 'Hà Trang',
        conversation: [
            {
                userId: MY_USER_ID,
                content: 'Hello guy!',
                file: null,
                image: null,
                createAt: 1710405662100
            },
            {
                userId: 2,
                content: 'Hi there!',
                file: null,
                image: null,
                createAt: 1710405662200
            },
            {
                userId: MY_USER_ID,
                content: 'Nice to meet you!',
                file: null,
                image: null,
                createAt: 1710405662300
            },
            {
                userId: 2,
                content: 'Haha!',
                file: null,
                image: null,
                createAt: 1710405662400
            },
        ]
    }, {
        id: 3,
        // avatar: avatarImg3,
        avatar: '/images/list-chat/avatar3.jpg',
        status: 'offline',
        name: 'Minh Ngọc',
        conversation: [
            {
                userId: MY_USER_ID,
                content: 'Hello Nam. I want you to meet me at 7:45AM',
                file: null,
                image: null,
                createAt: 1710405662800
            },
            {
                userId: 3,
                content: 'Ok fine!',
                file: null,
                image: null,
                createAt: 1710405663000
            },
            {
                userId: MY_USER_ID,
                content: 'Thanks!',
                file: null,
                image: null,
                createAt: 1710405663050
            },
        ]
    }, {
        id: 4,
        // avatar: avatarImg4,
        avatar: '/images/list-chat/avatar4.jpg',
        status: 'online',
        name: 'Yến Nhi',
        conversation: [
            {
                userId: MY_USER_ID,
                content: 'Congratulations! You have won the game!',
                file: null,
                image: null,
                createAt: 1710405663052
            },
            {
                userId: 4,
                content: 'Yeahhhhh!',
                file: null,
                image: null,
                createAt: 1710405663800
            },
        ]
    }, {
        id: 5,
        // avatar: avatarImg5,
        avatar: '/images/list-chat/avatar5.jpg',
        status: 'online',
        name: 'Mai Anh',
        conversation: [
            {
                userId: MY_USER_ID,
                content: 'I love you!',
                file: null,
                image: null,
                createAt: 1710405663900
            },
            {
                userId: 5,
                content: 'I love you to!',
                file: null,
                image: null,
                createAt: 1710405664400
            },
        ]
    }])
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [windowWidth])

    const handleOpenConvesation = (userChat: IUserConversation) => {
        setUserConversation(userChat)

        const rightContainer = document.getElementById('chat-right-container')
        const leftContainer = document.getElementById('chat-left-container')

        if (windowWidth <= 767) {
            if (leftContainer && rightContainer) {
                leftContainer.style.width = '0%'
                rightContainer.style.width = '100%'
                leftContainer.style.display = 'none'
                rightContainer.style.display = 'block'
            }
        }
    }

    return (
        <div id='chat-left-container' className={styles['left-container']}>
            <div className={styles['heading-left']}>
                <div className={styles['message-title']}>
                    <div>Tin nhắn</div>
                    <div className={styles['message-title-after']}></div>
                </div>
                <Popover
                    content={
                        <div style={{ width: '206px' }}>
                            <p style={{ fontWeight: '700' }}>Cài đặt</p>
                        </div>}
                    trigger="click"
                    placement='bottomRight'
                    open={open}
                    onOpenChange={handleOpenChange}
                >
                    <Button type="primary" style={{ background: '#F8971C', borderRadius: '50%' }} icon={<EllipsisOutlined />}></Button>
                </Popover>
            </div>
            <div>
                <p className={styles['conversation-title']}>Cuộc trò chuyện</p>
                <div>
                    {usersChat.map((userChat, index) => (
                        <div onClick={() => handleOpenConvesation(userChat)} key={index} className={`${styles['conversation-item']} ${userConversation?.id === userChat.id ? styles['active-conversation'] : ''}`}>
                            <div className={styles['avatar']}>
                                <Image src={userChat.avatar} alt="img-chat" width={400} height={400} className={styles['avatar-img']} />
                                <div className={userChat.status === 'offline' ? styles['status'] : styles['active']}></div>
                            </div>
                            <div className={styles['message-newest']}>
                                <p className={styles['message-name']}>{userChat.name}</p>
                                <p className={styles['message-newest-content']}>{userChat?.conversation.length > 0 ? userChat.conversation[userChat.conversation.length - 1].content : ''}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default LeftSection