import React, { useState } from 'react'
import styles from './list-chat.module.scss'
import LeftSection from './left-section'
import RightSection from './right-section'

export interface IConversation {
    userId: number,
    content: string,
    file: any,
    image: any,
    createAt: number
}

export interface IUserConversation {
    id: number,
    avatar: any,
    name: string,
    status: string
    conversation: IConversation[]
}

const ListChat = () => {
    const [userConversation, setUserConversation] = useState<IUserConversation | null>(null)

    return (
        <div className={styles['list-chat-container']}>
            <LeftSection userConversation={userConversation} setUserConversation={setUserConversation} />
            <RightSection userConversation={userConversation} setUserConversation={setUserConversation} />
        </div>
    )
}

export default ListChat