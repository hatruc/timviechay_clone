import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import myIcon from './emoticon_icon';
import ContentEditable from 'react-contenteditable';
import { Modal, Tabs } from 'antd';
import Item from './like_item/index';
import Item_1 from './share_action_item/index';
import Item_2 from './share_item/index';

import Comment_Item from "./comment_item";

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import s from './styles.module.scss';
import { handleImageSource } from "@/functions/functions";

const Comment = () => {

    const fileInputRef: any = useRef(null);
    const [userInfo, setUserInfo] = useState({ userName: "Công ty Hưng Hà 365" })
    const [like, setLike] = useState<any>({ count: 15, like: 5, heart: 6, wow: 0, hearteye: 0, angry: 0, sad: 0, haha: 4 });
    const [comment, setConment] = useState({
        count: 15, name:
            ["Nguyễn Văn Minh 1", "Nguyễn Văn Minh 2", "Nguyễn Văn Minh 3", "Nguyễn Văn Minh 4", "Nguyễn Văn Minh 5",
                "Nguyễn Văn Minh 6", "Nguyễn Văn Minh 7", "Nguyễn Văn Minh 8", "Nguyễn Văn Minh 9", "Nguyễn Văn Minh 10",
                "Nguyễn Văn Minh 11", "Nguyễn Văn Minh 12", "Nguyễn Văn Minh 13", "Nguyễn Văn Minh 14", "Nguyễn Văn Minh 15",
            ]
    });
    const [share, setShare] = useState({
        count: 6, name:
            ["Nguyễn Văn Minh 1", "Nguyễn Văn Minh 2", "Nguyễn Văn Minh 3", "Nguyễn Văn Minh 4", "Nguyễn Văn Minh 5", "Nguyễn Văn Minh 6"]
    });
    const [listFriend, setListFriend] = useState({
        count: 6, info:
            [{ name: "Nguyễn Văn Minh 1", url: "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/avatar_user_2.jpg", isSend: true }, { name: "Nguyễn Văn Minh 2", url: "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/avatar_user_2.jpg", isSend: true }, { name: "Nguyễn Văn Minh 3", url: "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/avatar_user_2.jpg", isSend: true },
            { name: "Nguyễn Văn Minh 4", url: "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/avatar_user_2.jpg", isSend: false }, { name: "Nguyễn Văn Minh 5", url: "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/avatar_user_2.jpg", isSend: false }, { name: "Nguyễn Văn Minh 6", url: "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/avatar_user_2.jpg", isSend: true }]
    });
    const [userLike, setUserLike] = useState<{ isLike: any, action: any }>({ isLike: false, action: "" })
    const [likeInfo, setLikeInfo] = useState([{
        action: "like",
        name: ["Tần Thủy Hoàng 1", "Tần Thủy Hoàng 2", "Tần Thủy Hoàng 3", "Tần Thủy Hoàng 4", "Tần Thủy Hoàng 5"],
        count: 5
    },
    {
        action: "heart",
        name: ["Tần Thủy Hoàng 6", "Tần Thủy Hoàng 7", "Tần Thủy Hoàng 8", "Tần Thủy Hoàng 9", "Tần Thủy Hoàng 10", "Tần Thủy Hoàng 11"],
        count: 6
    },
    {
        action: "wow",
        name: [],
        count: 0
    },
    {
        action: "hearteye",
        name: [],
        count: 0
    },
    {
        action: "haha",
        name: ["Tần Thủy Hoàng 12", "Tần Thủy Hoàng 13", "Tần Thủy Hoàng 14", "Tần Thủy Hoàng 15"],
        count: 4
    },
    {
        action: "angry",
        name: [],
        count: 0
    },
    {
        action: "sad",
        name: [],
        count: 0
    }])

    const [commentsData, setCommentsData] = useState([
        {
            content_1: 'NTD không nêu rõ thời gian làm việc',
            replies: [
                {
                    content_1: 'Reply 1.1',
                    replies: [
                        {
                            content_1: 'Reply 1.1.1',
                            replies: [],
                        },
                        {
                            content_1: 'Reply 1.1.2',
                            replies: [],
                        },
                    ],
                },
                {
                    content_1: 'Reply 1.2',
                    replies: [],
                },
            ],
        },
        {
            content_1: 'Comment 2',
            replies: [],
        },
    ]);

    const [content, setContent] = useState("");
    const [content1, setContent1] = useState("");
    const [mention, setMention] = useState("");
    const [isOnComment, setIsOnComment] = useState(false);
    const [isOnCommentShare, setIsOnCommentShare] = useState(false);
    const [isOpenEmoticon, setIsOpenEmoticon] = useState(false);
    const [isOpenLike, setIsOpenLike] = useState(false);
    const [isOpenShare, setIsOpenShare] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const [selectedImages, setSelectedImages] = useState<any[]>([]);
    const [newCommentContent, setNewCommentContent] = useState('');

    const handleImageChange = (event: any) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const promises = Array.from(files).map((file: any) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e: any) => {
                        resolve(e.target.result);
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(promises).then((base64Images) => {
                setSelectedImages(base64Images);
            });
        }
    };

    const handleSvgClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleRemoveImage = (index: any) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
    };

    const handleCancel = () => {
        setIsOpenLike(false);
        setIsOpenShare(false);
        setIsShare(false);
    };

    const handleInput = (e: any) => {
        const textContent = e.target.value;
        setContent(textContent);
    };

    const handleInput1 = (e: any) => {
        const textContent = e.target.value;
        setContent1(textContent);
    };

    const handleBlur = () => {
        setIsOnComment(false);
    };

    const handleClick = () => {
        setIsOnComment(true);
    };

    const handleBlur1 = () => {
        setIsOnCommentShare(false);
    };

    const handleClick1 = () => {
        setIsOnCommentShare(true);
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
            }
        }
    };

    const handleKeyDown1 = (e: any) => {
        if (e.key === 'Enter') {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
            }
        }
    };

    const handleActionEmotion = (action: any, isLike: any = true) => {
        setUserLike({ isLike: isLike, action: action })
    }

    const handleAddEmoticon = (e: any) => {
        const emojiNative = e.native || "";
        setContent((prevContent) => prevContent + emojiNative);
    }

    const handleOpenEmoticon = () => {
        setIsOpenEmoticon(!isOpenEmoticon)
    }

    const handleAddReply = (content_1: any, commentIndex: any, replyIndex: any) => {
        const newCommentsData = [...commentsData];

        if (typeof replyIndex !== 'undefined') {
            newCommentsData[commentIndex].replies[replyIndex].replies.push({ content_1, replies: [] });
        } else {
            newCommentsData[commentIndex].replies.push({ content_1, replies: [] });
        }

        setCommentsData(newCommentsData);
    };

    const handleAddComment = () => {
        const newCommentsData = [...commentsData];
        newCommentsData.push({ content_1: newCommentContent, replies: [] });
        setCommentsData(newCommentsData);
        setNewCommentContent('');
    };

    return (
        <div className={s.job_detail_box_5}>

            <div className={s.header}>
                <span>Bình luận</span>
            </div>

            <div className={s.body}>

                <div className={s.info}>
                    <div className={s.like}>
                        <div className={s.icon}>
                            {like.like > 0 && <div className={s.like_icon}>
                                <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/like.png"} height={20} width={20} style={{ height: "20px", objectFit: "cover", width: "auto" }}></Image>
                                <div className={s.list_like}>
                                    <span className={s.title} style={{ cursor: "text" }}>Thích</span>
                                    {likeInfo?.filter((item: any) => item.action == "like")?.map((item: any) => item?.name?.slice(0, 5)?.map((item: any, index: any) => (
                                        <div key={index} className={s.list}>{item}</div>
                                    )))}
                                    {like.like > 5 && <div className={s.list}>và {like.like - 5} người khác</div>}
                                </div>
                            </div>}
                            {like.heart > 0 && <div className={s.like_icon}>
                                <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/heart.png"} height={20} width={20} style={{ height: "20px", objectFit: "cover", width: "auto" }}></Image>
                                <div className={s.list_like}>
                                    <span className={s.title} style={{ cursor: "text" }}>Yêu thích</span>
                                    {likeInfo?.filter((item: any) => item.action == "heart")?.map((item: any) => item?.name?.slice(0, 5)?.map((item: any, index: any) => (
                                        <div key={index} className={s.list}>{item}</div>
                                    )))}
                                    {like.heart > 5 && <div className={s.list}>và {like.heart - 5} người khác</div>}
                                </div>
                            </div>}
                            {like.wow > 0 && <div className={s.like_icon}>
                                <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/wow.png"} height={20} width={20} style={{ height: "20px", objectFit: "cover", width: "auto" }}></Image>
                                <div className={s.list_like}>
                                    <span className={s.title} style={{ cursor: "text" }}>Wow</span>
                                    {likeInfo?.filter((item: any) => item.action == "wow")?.map((item: any) => item?.name?.slice(0, 5)?.map((item: any, index: any) => (
                                        <div key={index} className={s.list}>{item}</div>
                                    )))}
                                    {like.wow > 5 && <div className={s.list}>và {like.wow - 5} người khác</div>}
                                </div>
                            </div>}
                            {like.hearteye > 0 && <div className={s.like_icon}>
                                <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/hearteye.png"} height={20} width={20} style={{ height: "20px", objectFit: "cover", width: "auto" }}></Image>
                                <div className={s.list_like}>
                                    <span className={s.title} style={{ cursor: "text" }}>Thương thương</span>
                                    {likeInfo?.filter((item: any) => item.action == "hearteye")?.map((item: any) => item?.name?.slice(0, 5)?.map((item: any, index: any) => (
                                        <div key={index} className={s.list}>{item}</div>
                                    )))}
                                    {like.hearteye > 5 && <div className={s.list}>và {like.hearteye - 5} người khác</div>}
                                </div>
                            </div>}
                            {like.angry > 0 && <div className={s.like_icon}>
                                <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/angry.png"} height={20} width={20} style={{ height: "20px", objectFit: "cover", width: "auto" }}></Image>
                                <div className={s.list_like}>
                                    <span className={s.title} style={{ cursor: "text" }}>Phẫn nộ</span>
                                    {likeInfo?.filter((item: any) => item.action == "angry")?.map((item: any) => item?.name?.slice(0, 5)?.map((item: any, index: any) => (
                                        <div key={index} className={s.list}>{item}</div>
                                    )))}
                                    {like.angry > 5 && <div className={s.list}>và {like.angry - 5} người khác</div>}
                                </div>
                            </div>}
                            {like.sad > 0 && <div className={s.like_icon}>
                                <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/sad.png"} height={20} width={20} style={{ height: "20px", objectFit: "cover", width: "auto" }}></Image>
                                <div className={s.list_like}>
                                    <span className={s.title} style={{ cursor: "text" }}>Buồn</span>
                                    {likeInfo?.filter((item: any) => item.action == "sad")?.map((item: any) => item?.name?.slice(0, 5)?.map((item: any, index: any) => (
                                        <div key={index} className={s.list}>{item}</div>
                                    )))}
                                    {like.sad > 5 && <div className={s.list}>và {like.sad - 5} người khác</div>}
                                </div>
                            </div>}
                            {like.haha > 0 && <div className={s.like_icon}>
                                <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/haha.png"} height={20} width={20} style={{ height: "20px", objectFit: "cover", width: "auto" }}></Image>
                                <div className={s.list_like}>
                                    <span className={s.title} style={{ cursor: "text" }}>Haha</span>
                                    {likeInfo?.filter((item: any) => item.action == "haha")?.map((item: any) => item?.name?.slice(0, 5)?.map((item: any, index: any) => (
                                        <div key={index} className={s.list}>{item}</div>
                                    )))}
                                    {like.haha > 5 && <div className={s.list}>và {like.haha - 5} người khác</div>}
                                </div>
                            </div>}
                        </div>
                        {like.count > 0 && <span className={s.count} onClick={() => { setIsOpenLike(true) }}>{like.count}</span>}
                    </div>
                    <div className={s.comment_share}>
                        <div className={s.comment}>
                            <span style={{ cursor: "pointer" }}>{comment.count} bình luận</span>
                            <div className={s.list_like}>
                                <span className={s.title}>Bình luận</span>
                                {comment?.name?.slice(0, 5)?.map((item: any, index: any) => (
                                    <div key={index} className={s.list}>{item}</div>
                                ))}
                                {comment?.count > 5 && <div className={s.list}>và {comment?.count - 5} người khác</div>}
                            </div>
                        </div>
                        <div className={s.share}>
                            <span style={{ cursor: "pointer" }}>{share.count} lượt chi sẻ</span>
                            {share?.count > 0 && <div className={s.list_like} style={{ zIndex: 1 }}>
                                <span className={s.title}>Chia sẻ</span>
                                {share?.name?.slice(0, 5)?.map((item: any, index: any) => (
                                    <div key={index} className={s.list}>{item}</div>
                                ))}
                                {share?.count > 5 && <div onClick={() => { setIsOpenShare(true) }} className={s.list}>và {share?.count - 5} người khác</div>}
                            </div>}
                        </div>
                    </div>
                </div>

                <div className={s.action}>
                    <div className={s.like}>
                        <div className={s.like_child}>

                            <div className={s.group_like}>
                                <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/like.png"} height={35} width={35} className={s.image_icon} onClick={(e: any) => { handleActionEmotion("like") }}></Image>
                                <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/heart.png"} height={35} width={35} className={s.image_icon} onClick={(e: any) => { handleActionEmotion("heart") }}></Image>
                                <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/wow.png"} height={35} width={35} className={s.image_icon} onClick={(e: any) => { handleActionEmotion("wow") }}></Image>
                                <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/hearteye.png"} height={35} width={35} className={s.image_icon} onClick={(e: any) => { handleActionEmotion("hearteye") }}></Image>
                                <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/angry.png"} height={35} width={35} className={s.image_icon} onClick={(e: any) => { handleActionEmotion("angry") }}></Image>
                                <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/sad.png"} height={35} width={35} className={s.image_icon} onClick={(e: any) => { handleActionEmotion("sad") }}></Image>
                                <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/haha.png"} height={35} width={35} className={s.image_icon} onClick={(e: any) => { handleActionEmotion("haha") }}></Image>

                            </div>

                            {userLike?.isLike == true ?
                                (userLike?.action != "like" ?
                                    (userLike?.action != "heart" ?
                                        (userLike?.action != "wow" ?
                                            (userLike?.action != "hearteye" ?
                                                (userLike?.action != "angry" ?
                                                    (userLike?.action != "sad" ?
                                                        <>
                                                            <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/sad.png"} height={24} width={24} style={{ height: "24px", width: "24px" }}></Image>
                                                            <span style={{ color: "#FFA800" }} onClick={(e: any) => { handleActionEmotion("sad", false) }}>Buồn</span>
                                                        </>
                                                        : <>
                                                            <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/haha.png"} height={24} width={24} style={{ height: "24px", width: "24px" }}></Image>
                                                            <span style={{ color: "#FFA800" }} onClick={(e: any) => { handleActionEmotion("haha", false) }}>Haha</span>
                                                        </>)
                                                    : <>
                                                        <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/angry.png"} height={24} width={24} style={{ height: "24px", width: "24px" }}></Image>
                                                        <span style={{ color: "#FE4B4B" }} onClick={(e: any) => { handleActionEmotion("angry", false) }}>Phẫn nộ</span>
                                                    </>)
                                                : <>
                                                    <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/hearteye.png"} height={24} width={24} style={{ height: "24px", width: "24px" }}></Image>
                                                    <span style={{ color: "#FFA800" }} onClick={(e: any) => { handleActionEmotion("hearteye", false) }}>Thương thương</span>
                                                </>)
                                            : <>
                                                <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/wow.png"} height={24} width={24} style={{ height: "24px", width: "24px" }}></Image>
                                                <span style={{ color: "#FFA800" }} onClick={(e: any) => { handleActionEmotion("wow", false) }}>Wow</span>
                                            </>)
                                        : <>
                                            <Image alt={""} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/heart.png"} height={24} width={24} style={{ height: "24px", width: "24px" }}></Image>
                                            <span style={{ color: "#FE4B4B" }} onClick={(e: any) => { handleActionEmotion("heart", false) }}>Yêu thích</span>
                                        </>)
                                    : <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M22.7169 12.6294L22.7202 12.6101C22.7774 12.2421 22.7519 11.8664 22.6458 11.5093C22.5397 11.1523 22.3558 10.8234 22.108 10.5451C21.8603 10.2667 21.5546 10.0456 21.213 9.89577C20.8728 9.74661 20.5043 9.67148 20.1327 9.67496H17.922C17.784 9.67496 17.672 9.56303 17.672 9.42496V5.69998C17.672 4.77926 17.2975 3.89989 16.6366 3.25431C16.1924 2.82039 15.6435 2.51591 15.0504 2.36305C14.1469 2.13016 13.4418 2.77668 13.2166 3.42855L10.9181 10.0816C10.8833 10.1824 10.7884 10.25 10.6818 10.25H10C9.0335 10.25 8.25 11.0335 8.25 12V19.9999C8.25 20.9664 9.0335 21.7499 10 21.7499H18.8614C19.4801 21.7557 20.0827 21.5435 20.5584 21.1485C21.033 20.7545 21.3501 20.2039 21.4472 19.5955L22.7169 12.6294Z" stroke="#2767A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <rect x="2.25" y="10.25" width="5.5" height="11.5" rx="1.75" stroke="#2767A5" strokeWidth="1.5" />
                                        </svg>
                                        <span style={{ color: "#2767A5" }} onClick={(e: any) => { handleActionEmotion("like", false) }}>Thích</span>
                                    </>)
                                : <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                        <g clipPath="url(#clip0_1590_37706)">
                                            <path d="M19.7203 10.5469L19.7235 10.5276C19.774 10.2026 19.7515 9.87077 19.6578 9.55549C19.5642 9.24026 19.4018 8.95001 19.1832 8.70444L18.623 9.2031L19.1832 8.70443C18.9647 8.45892 18.6952 8.26397 18.3942 8.132C18.0946 8.00065 17.7703 7.93449 17.4432 7.93747H15.7682C15.6301 7.93747 15.5182 7.82554 15.5182 7.68747V4.74999C15.5182 3.94861 15.1922 3.1837 14.6177 2.62251C14.2695 2.28239 13.8475 2.03395 13.3904 1.89111C12.4616 1.60085 11.7436 2.29125 11.5234 2.92855L9.68557 8.2483C9.65075 8.34906 9.55588 8.41667 9.44927 8.41667H9.1665C8.20001 8.41667 7.4165 9.20017 7.4165 10.1667V16.4999C7.4165 17.4664 8.20001 18.2499 9.1665 18.2499H16.3837C16.9284 18.2549 17.4591 18.0681 17.8784 17.7199C18.2965 17.3728 18.5763 16.8875 18.6624 16.3507L19.7203 10.5469Z" stroke="#474747" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <rect x="2.4165" y="8.41663" width="4.83333" height="9.83333" rx="1.75" stroke="#474747" strokeWidth="1.5" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1590_37706">
                                                <rect width="20" height="20" fill="white" transform="translate(0.666504)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span onClick={(e: any) => { handleActionEmotion("like") }}>Thích</span>
                                </>}
                        </div>

                    </div>
                    <div className={s.comment}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.6665 9.44341C1.6665 5.11096 5.40938 1.66663 9.94264 1.66663C14.4734 1.66663 18.2188 5.11084 18.2188 9.44341C18.2188 13.7759 14.4759 17.2202 9.94264 17.2202C9.20965 17.2202 8.49583 17.131 7.81615 16.9613L5.49453 18.2499C5.05704 18.4927 4.51963 18.1763 4.51963 17.676V15.3184C2.77929 13.899 1.6665 11.799 1.6665 9.44341ZM9.94264 2.86001C5.99167 2.86001 2.85989 5.84431 2.85989 9.44341C2.85989 11.4963 3.87084 13.3384 5.47625 14.5525L5.71302 14.7316V16.7637L7.66189 15.682L7.89829 15.7485C8.54338 15.9299 9.23077 16.0268 9.94264 16.0268C13.8936 16.0268 17.0254 13.0425 17.0254 9.44341C17.0254 5.84442 13.8913 2.86001 9.94264 2.86001Z" fill="#474747" />
                        </svg>
                        <span>Bình luận</span>
                    </div>
                    <div className={s.share}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path d="M14.382 13.2334L19.4785 8.17855L19.5431 8.10426C19.6387 7.97477 19.6848 7.81484 19.673 7.65382C19.6611 7.4928 19.5921 7.3415 19.4785 7.22769L14.382 2.17511L14.3117 2.11454C13.9037 1.80597 13.303 2.10311 13.303 2.65054V5.08483L13.048 5.10197C9.01004 5.42426 6.64481 8.00141 6.08042 12.6757C6.00789 13.2757 6.69014 13.6517 7.13214 13.254C8.75391 11.7934 10.4301 10.886 12.1697 10.5226C12.4485 10.4643 12.7285 10.4197 13.0106 10.3888L13.303 10.3626V12.758L13.3087 12.8517C13.3767 13.3694 13.9989 13.6128 14.382 13.2334ZM13.1308 6.2414L14.4364 6.1534V3.82997L18.3418 7.70198L14.4364 11.5763V9.11112L12.8996 9.25055H12.8905C10.9605 9.45969 9.13924 10.2391 7.42 11.5386C7.75773 10.0083 8.33459 8.85741 9.09277 8.03341C10.0334 7.01055 11.3481 6.38426 13.1308 6.24026V6.2414ZM5.50809 3.13283C4.75666 3.13283 4.036 3.43385 3.50466 3.96967C2.97331 4.50549 2.6748 5.23221 2.6748 5.98997V15.1328C2.6748 15.8906 2.97331 16.6173 3.50466 17.1532C4.036 17.689 4.75666 17.99 5.50809 17.99H14.5746C15.3261 17.99 16.0467 17.689 16.5781 17.1532C17.1094 16.6173 17.4079 15.8906 17.4079 15.1328V13.99C17.4079 13.8384 17.3482 13.6931 17.2419 13.5859C17.1357 13.4788 16.9915 13.4186 16.8413 13.4186C16.691 13.4186 16.5468 13.4788 16.4406 13.5859C16.3343 13.6931 16.2746 13.8384 16.2746 13.99V15.1328C16.2746 15.5875 16.0955 16.0235 15.7767 16.345C15.4579 16.6665 15.0255 16.8471 14.5746 16.8471H5.50809C5.05723 16.8471 4.62484 16.6665 4.30603 16.345C3.98722 16.0235 3.80812 15.5875 3.80812 15.1328V5.98997C3.80812 5.53532 3.98722 5.09928 4.30603 4.77779C4.62484 4.4563 5.05723 4.27569 5.50809 4.27569H8.90804C9.05833 4.27569 9.20246 4.21548 9.30873 4.10832C9.415 4.00115 9.4747 3.85581 9.4747 3.70426C9.4747 3.5527 9.415 3.40736 9.30873 3.3002C9.20246 3.19303 9.05833 3.13283 8.90804 3.13283H5.50809Z" fill="#474747" />
                        </svg>
                        <span onClick={() => { setIsShare(true) }}>Chia sẻ</span>
                    </div>
                </div>

                <div className={s.comment_box}>
                    <div className={s.comment_box_title}>
                        <span>Xem các bình luận trước</span>
                        <div className={s.comment_box_title_right}>
                            <span>Cũ nhất</span>
                            <Image src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/oldest.svg"} alt={""} height={17} width={17} style={{ height: "17px", width: "17px" }}></Image>
                        </div>
                    </div>
                    <div className={s.comment_box_input}>
                        <Image src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/avatar_user.png"} alt={""} height={48} width={48} style={{ height: "48px", width: "48px", borderRadius: "48px" }}></Image>
                        <div className={s.input_text}>
                            <ContentEditable
                                className={s.contentEditable}
                                onClick={handleClick}
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                                html={content}
                                onChange={handleInput}
                            />
                            <span className={s.hasContent}>{(content == "" && isOnComment == false) ? "Viết bình luận" : ""}</span>
                            <div className={s.input_text_add}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ cursor: "pointer" }} onClick={handleOpenEmoticon}>
                                    <g clipPath="url(#clip0_1590_37730)">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9 10H9.01" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15 10H15.01" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9 15C9.39105 15.6332 9.85782 16.1363 10.373 16.4797C10.8881 16.8231 11.4412 17 12 17C12.5588 17 13.1119 16.8231 13.627 16.4797C14.1422 16.1363 14.6089 15.6332 15 15" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1590_37730">
                                            <rect width="24" height="24" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <div style={{ zIndex: 1 }} className={`${isOpenEmoticon ? s.tableEmoticon : s.displayNone}`} onBlur={handleOpenEmoticon}>
                                    <Picker data={data} perLine={6} emojiSize={30} onEmojiSelect={handleAddEmoticon} />
                                </div>

                                <svg onClick={handleSvgClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ cursor: "pointer" }}>
                                    <path d="M6.76017 22H17.2402C20.0002 22 21.1002 20.31 21.2302 18.25L21.7502 9.99C21.8902 7.83 20.1702 6 18.0002 6C17.3902 6 16.8302 5.65 16.5502 5.11L15.8302 3.66C15.3702 2.75 14.1702 2 13.1502 2H10.8602C9.83017 2 8.63017 2.75 8.17017 3.66L7.45017 5.11C7.17017 5.65 6.61017 6 6.00017 6C3.83017 6 2.11017 7.83 2.25017 9.99L2.77017 18.25C2.89017 20.31 4.00017 22 6.76017 22Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.5 8H13.5" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 18C13.79 18 15.25 16.54 15.25 14.75C15.25 12.96 13.79 11.5 12 11.5C10.21 11.5 8.75 12.96 8.75 14.75C8.75 16.54 10.21 18 12 18Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                    multiple={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={s.input_image}>
                        {selectedImages?.map((image: any, index: any) => (
                            <div key={index}>
                                <div style={{ position: "relative" }}>
                                    <div style={{ position: "absolute", top: "5px", right: "5px", cursor: 'pointer' }} onClick={() => handleRemoveImage(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="white" fillOpacity="0.74" />
                                            <path d="M16.5001 7.50006L12 12.0001M12 12.0001L7.49994 16.5002M12 12.0001L16.5001 16.5002M12 12.0001L7.49994 7.50006" stroke="#666666" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <Image
                                        src={handleImageSource(image)}
                                        alt={`Selected Image ${index + 1}`}
                                        width={224}
                                        height={125}
                                        style={{ width: "auto", height: "125px" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={s.comment_box_body}>
                    {/* <textarea
                        value={newCommentContent}
                        onChange={(e) => setNewCommentContent(e.target.value)}
                        placeholder="Type your comment..."
                    />
                    <button onClick={handleAddComment}>Submit Comment</button> */}
                    {commentsData.map((comment, index) => (
                        <Comment_Item key={index} {...comment} onAddReply={(content: any, replyIndex: any) => handleAddReply(content, index, replyIndex)} />
                    ))}
                </div>
            </div>

            <Modal
                title=""
                open={isOpenLike}
                onCancel={handleCancel}
                className='modal_like'
                closeIcon={null}
                closable={false}
                footer={null}
            >
                <Tabs
                    defaultActiveKey="0"
                    items={
                        likeInfo.map((item, index) => {
                            let label: any;
                            let children: any;

                            label = (
                                <div style={{ display: "flex", alignItems: "center", gap: "4px", minWidth: "50px" }}>
                                    <Image alt={""} src={`/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/${item.action}.png`} height={20} width={20} style={{ width: "20px" }}></Image>
                                    <span style={{ color: "#474747", fontFamily: "Roboto", fontSize: "16px", fontStyle: "normal", fontWeight: "400", lineHeight: "normal" }}>{item.count}</span>
                                </div>
                            )
                            let action = item.action;
                            children = item.name.map((item: any, index: any) => (
                                <Item key={index} url={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/avatar_user_2.jpg"} name={item} action={action} />
                            ))

                            return {
                                label: label,
                                key: index.toString(),
                                children: <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "15px", height: "400px", overflowX: "auto" }}>
                                    {children}
                                </div>,
                            };
                        })}
                />
            </Modal >

            <Modal
                title=""
                open={isOpenShare}
                onCancel={handleCancel}
                className='modal_like'
                closeIcon={<svg style={{ width: "24px", height: "24px" }} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                    <path d="M11.3724 22.6564L17.0293 16.9995M17.0293 16.9995L22.6862 11.3426M17.0293 16.9995L22.6862 22.6564M17.0293 16.9995L11.3724 11.3426" stroke="#474747" strokeWidth="2" strokeLinecap="round" />
                </svg>}
                closable={true}
                footer={null}
            >
                <div className={s.modal_comment_title}>Những người đã chia sẻ tin này</div>
                <div className={s.dashed}></div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "15px", height: "400px", overflowX: "auto" }}>
                    {share?.name?.map((item: any, index: any) => (
                        <Item_2 key={index} url={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/avatar_user_2.jpg"} name={item} />
                    ))
                    }
                </div>
            </Modal >

            <Modal
                title=""
                open={isShare}
                onCancel={handleCancel}
                className='modal_like'
                closeIcon={<svg style={{ width: "24px", height: "24px" }} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                    <path d="M11.3724 22.6564L17.0293 16.9995M17.0293 16.9995L22.6862 11.3426M17.0293 16.9995L22.6862 22.6564M17.0293 16.9995L11.3724 11.3426" stroke="#474747" strokeWidth="2" strokeLinecap="round" />
                </svg>}
                closable={true}
                footer={null}
            >
                <div className={s.modal_comment_title}>Gửi bằng Chat.Timviechay.vn</div>
                <div className={s.dashed}></div>
                <div className={s.comment_box_input}>
                    <Image src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/avatar_user.png"} alt={""} height={48} width={48} style={{ height: "48px", width: "48px", borderRadius: "48px" }}></Image>
                    <div className={s.input_text}>
                        <ContentEditable
                            className={s.contentEditable}
                            onClick={handleClick1}
                            onBlur={handleBlur1}
                            onKeyDown={handleKeyDown1}
                            html={content1}
                            onChange={handleInput1}
                            style={{ maxHeight: "50px", maxWidth: "400px", overflowX: "hidden", overflowY: "auto" }}
                        />
                        <span className={s.hasContent}>{(content1 == "" && isOnCommentShare == false) ? "Hãy nói gì đó về nội dung này" : ""}</span>
                    </div>
                </div>
                <div className={s.dashed}></div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "15px", height: "300px", overflowX: "auto" }}>
                    {listFriend?.info?.map((item: any, index: any) => (
                        <Item_1 key={index} url={item.url} name={item.name} isSend={item.isSend} />
                    ))
                    }
                </div>
            </Modal >
        </div >
    )
}

export default Comment;