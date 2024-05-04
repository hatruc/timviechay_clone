import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import ContentEditable from 'react-contenteditable';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import s from './styles.module.scss';
import { handleImageSource } from '@/functions/functions';

const Comment_Item = ({ content_1, replies, onAddReply }: { content_1: any, replies: any; onAddReply: any; }) => {
    const fileInputRef: any = useRef(null);

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isAddingReply, setIsAddingReply] = useState(false);
    const [isOnComment, setIsOnComment] = useState(false);
    const [content, setContent] = useState<any>("");
    const [isOpenEmoticon, setIsOpenEmoticon] = useState(false);
    const [selectedImages, setSelectedImages] = useState<any[]>([]);
    const [isEnter, setIsEnter] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleAddReply = () => {
        setIsAddingReply(!isAddingReply);
    };

    const handleAddReply = (value: any) => {
        onAddReply(value);
        setContent('');
        setIsAddingReply(false);
    };

    const handleLike = () => {
        console.log("Like");
    }

    const handleClick = () => {
        setIsOnComment(true);
    };

    const handleBlur = () => {
        setIsOnComment(false);
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                setIsEnter(true);
            }
        }
    };

    const handleInput = (textContent: any) => {
        setContent(textContent);
    };

    const handleOpenEmoticon = () => {
        setIsOpenEmoticon(!isOpenEmoticon)
    };

    const handleAddEmoticon = (e: any) => {
        const emojiNative = e.native || "";
        setContent((prevContent: any) => prevContent + emojiNative);
    };

    const handleSvgClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

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

    const handleRemoveImage = (index: any) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
    };

    useEffect(() => {
        if (isEnter == true) {
            handleAddReply(content);
            setIsEnter(false);
        }
    }, [isEnter])

    return (
        <div className={s.comment_item}>
            <Image src={'/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/avatar.png'} alt={''} height={100} width={100} style={{ height: "48px", width: "48px", borderRadius: "28px" }}></Image>
            <div className={s.box_1}>
                <div className={s.comment}>
                    <div className={s.name}>Hà Vân Anh</div>
                    <div className={s.content} dangerouslySetInnerHTML={{ __html: content_1 }} />
                </div>

                <div className={s.footer_comment}>
                    <div className={s.time_reply}>
                        <button onClick={handleLike} className={s.txt_like}>Thích</button>
                        <div className={s.divide}></div>
                        <button onClick={toggleAddReply} className={s.txt_like}>Phản hồi</button>
                        <div className={s.divide}></div>
                        <div className={s.txt_like}>1 giờ</div>
                    </div>
                    <div className={s.like}>
                        <div className={s.txt_like}>1</div>
                        <Image src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/like.png"} alt={''} height={100} width={100} style={{ height: "18px", width: "18px" }}></Image>
                    </div>
                </div>

                {isCollapsed && replies && replies.length > 0 && (
                    <div className={s.reply}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none">
                            <path d="M1.5 0.988037C1.5 0.711895 1.27614 0.488037 1 0.488037C0.723858 0.488037 0.5 0.711895 0.5 0.988037L1.5 0.988037ZM1 2.93286H1.5H1ZM10.8535 5.32598C11.0488 5.13072 11.0488 4.81414 10.8536 4.61887L7.67168 1.43679C7.47642 1.24152 7.15984 1.24151 6.96457 1.43677C6.76931 1.63203 6.7693 1.94861 6.96455 2.14388L9.79289 4.97239L6.96438 7.80073C6.76911 7.99599 6.7691 8.31257 6.96436 8.50784C7.15961 8.70311 7.4762 8.70312 7.67146 8.50786L10.8535 5.32598ZM0.5 0.988037V2.93286H1.5V0.988037L0.5 0.988037ZM0.5 2.93286C0.5 3.59505 0.592605 4.19522 0.979636 4.64706C1.36736 5.09972 1.95931 5.29797 2.68059 5.39907C3.40944 5.50124 4.38226 5.51734 5.64338 5.51039C6.92099 5.50334 8.49861 5.47235 10.5 5.47241L10.5 4.47241C8.50139 4.47235 6.89151 4.50348 5.63787 4.5104C4.36774 4.51741 3.46556 4.49933 2.81941 4.40876C2.16569 4.31712 1.88264 4.16409 1.73911 3.99653C1.59489 3.82816 1.5 3.53917 1.5 2.93286H0.5Z" fill="#AEB4C1" />
                        </svg>
                        <button onClick={toggleCollapse} className={s.txt_reply}>{replies.length} phản hồi</button>
                    </div>
                )}

                {!isCollapsed && replies && replies.length > 0 && (
                    <div style={{ width: "100%" }}>
                        {
                            replies.map((reply: any, index: any) => (
                                <Comment_Item key={index} {...reply} onAddReply={(content: any) => onAddReply(content, index)} />
                            ))
                        }
                    </div>
                )}

                {isAddingReply && (
                    <div className={s.comment_box}>
                        <div className={s.comment_box_input}>
                            <Image src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/avatar_user.png"} alt={""} height={48} width={48} style={{ height: "48px", width: "48px", borderRadius: "48px" }}></Image>
                            <div className={s.input_text}>
                                <ContentEditable
                                    className={s.contentEditable}
                                    onClick={handleClick}
                                    onBlur={handleBlur}
                                    onKeyDown={handleKeyDown}
                                    html={content}
                                    onChange={(e) => handleInput(e.target.value)}
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
                )}


            </div>
        </div >
    );
};

export default Comment_Item;