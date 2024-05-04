import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import Image from "next/image";

import s from './styles.module.scss';

const VideoPlayer = ({ url }: { url: any }) => {
    const playerRef: any = useRef();

    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [showVolumeControl, setShowVolumeControl] = useState(false);

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleSeekMouseDown = () => {
        setSeeking(true);
    };

    const handleSeekChange = (e: any) => {
        setPlayed(parseFloat(e.target.value));
    };

    const handleSeekMouseUp = () => {
        setSeeking(false);
        playerRef.current.seekTo(played);
    };

    const handleProgress = (state: any) => {
        // Update played and loaded progress
        if (!seeking) {
            setLoaded(state.played);
            setPlayed(state.played);
            setCurrentTime(state.playedSeconds);
            setDuration(state.loadedSeconds);
        }
    };

    const handleContextMenu = (e: any) => {
        e.preventDefault();
    };

    const formatTime = (seconds: any) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleVolumeChange = (e: any) => {
        setVolume(parseFloat(e.target.value));
    };

    const handleVolumeIconClick = () => {
        setShowVolumeControl(!showVolumeControl);
    };

    useEffect(() => {
        if (loaded == 1) {
            setIsPlaying(false);
        }
    }, [loaded])

    return (
        <div>
            <div className={s.job_detail_video}>
                <div className={s.logo}>
                    <Image src={"/images/header/logo.jpg"} alt={""} width={114} height={42} className={s.logo_css}></Image>
                </div>
                <div className={s.video}>
                    <div className={s.react_player} onContextMenu={handleContextMenu}>
                        <ReactPlayer
                            ref={playerRef}
                            url={url}
                            controls={false}
                            onProgress={handleProgress}
                            volume={volume}
                            playing={isPlaying}
                            config={{
                                youtube: {
                                    playerVars: {
                                        autoplay: 0, // Tự động phát video khi trang tải
                                        controls: 0, // Ẩn thanh điều khiển mặc định của YouTube
                                        showinfo: 0, // Ẩn tiêu đề video và tên người tải lên
                                        modestbranding: 0, // Hiển thị logo YouTube nhỏ hơn
                                        loop: 0, // Tự động lặp lại video khi kết thúc
                                        rel: 0, // Tắt video liên quan khi video kết thúc
                                        iv_load_policy: 3, // Tắt chú thích (annotations)
                                        showRelated: 0, // Tắt phần "Xem sau"
                                    },
                                },
                            }}
                        />
                    </div>

                    <div className={s.menu}>
                        <button className={s.button_play} onClick={handlePlay}>
                            {isPlaying ?
                                (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M11.9702 2C6.45021 2 1.97021 6.48 1.97021 12C1.97021 17.52 6.45021 22 11.9702 22C17.4902 22 21.9702 17.52 21.9702 12C21.9702 6.48 17.5002 2 11.9702 2ZM10.7202 15.03C10.7202 15.51 10.5202 15.7 10.0102 15.7H8.71021C8.20021 15.7 8.00021 15.51 8.00021 15.03V8.97C8.00021 8.49 8.20021 8.3 8.71021 8.3H10.0002C10.5102 8.3 10.7102 8.49 10.7102 8.97V15.03H10.7202ZM16.0002 15.03C16.0002 15.51 15.8002 15.7 15.2902 15.7H14.0002C13.4902 15.7 13.2902 15.51 13.2902 15.03V8.97C13.2902 8.49 13.4902 8.3 14.0002 8.3H15.2902C15.8002 8.3 16.0002 8.49 16.0002 8.97V15.03Z" fill="#3582CD" />
                                    </svg>
                                )
                                :
                                (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M11.97 2C6.44997 2 1.96997 6.48 1.96997 12C1.96997 17.52 6.44997 22 11.97 22C17.49 22 21.97 17.52 21.97 12C21.97 6.48 17.5 2 11.97 2ZM14.97 14.23L12.07 15.9C11.71 16.11 11.31 16.21 10.92 16.21C10.52 16.21 10.13 16.11 9.76997 15.9C9.04997 15.48 8.61997 14.74 8.61997 13.9V10.55C8.61997 9.72 9.04997 8.97 9.76997 8.55C10.49 8.13 11.35 8.13 12.08 8.55L14.98 10.22C15.7 10.64 16.13 11.38 16.13 12.22C16.13 13.06 15.7 13.81 14.97 14.23Z" fill="#3582CD" />
                                    </svg>
                                )
                            }
                        </button>
                        <div className={s.time}>
                            <span className={s.text}>{formatTime(currentTime)}</span>
                            <span className={s.text}>/</span>
                            <span className={s.text}>{formatTime(duration)}</span>
                        </div>
                        <div className={s.bar}>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step="any"
                                value={played}
                                onMouseDown={handleSeekMouseDown}
                                onChange={handleSeekChange}
                                onMouseUp={handleSeekMouseUp}
                            />
                            <progress value={loaded} max={1} />
                        </div>

                        <div className={s.voice}>
                            {
                                (volume <= 1 && volume > 0.7) ? <Image onClick={handleVolumeIconClick} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/volume.svg"} alt={""} width={24} height={24}></Image>
                                    : ((volume <= 0.7 && volume > 0.4) ? <Image onClick={handleVolumeIconClick} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/volume-2.svg"} alt={""} width={24} height={24}></Image>
                                        : ((volume <= 0.4 && volume > 0) ? <Image onClick={handleVolumeIconClick} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/volume-3.svg"} alt={""} width={24} height={24}></Image>
                                            : <Image onClick={handleVolumeIconClick} src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/volume-1.svg"} alt={""} width={24} height={24}></Image>))
                            }
                            {showVolumeControl && (
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step="any"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className={s.voice_option}
                                />
                            )}
                        </div>
                        <div className={s.function}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={s.function_css}>
                                <circle cx="12" cy="6" r="2" fill="#3582CD" />
                                <circle cx="12" cy="12" r="2" fill="#3582CD" />
                                <circle cx="12" cy="18" r="2" fill="#3582CD" />
                            </svg>
                        </div>
                        <div className={s.audio}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={s.audio_css}>
                                <path d="M23.614 12.8736C23.651 13.7597 23.3351 14.6243 22.7355 15.2778C22.136 15.9312 21.3017 16.3202 20.4157 16.3593C20.3639 16.3617 20.3121 16.3629 20.2605 16.3629C20.0251 16.3627 19.7904 16.3372 19.5604 16.2869C18.8781 17.3404 17.9834 18.2399 16.9336 18.9278C15.8837 19.6157 14.7018 20.077 13.4635 20.282C13.3171 20.7123 13.0249 21.0779 12.6375 21.3156C12.25 21.5533 11.7917 21.6482 11.3418 21.5838C10.8918 21.5194 10.4785 21.2999 10.1733 20.9631C9.86803 20.6263 9.69004 20.1935 9.67008 19.7394C9.65012 19.2853 9.78943 18.8385 10.064 18.4763C10.3385 18.114 10.7309 17.859 11.1735 17.7554C11.6161 17.6518 12.0809 17.7061 12.4877 17.9089C12.8945 18.1117 13.2176 18.4502 13.4013 18.866C15.1447 18.5436 16.7196 17.6196 17.8516 16.2551C18.9837 14.8907 19.601 13.1722 19.5961 11.3993C19.5961 7.2108 16.1885 3.80322 12 3.80322C7.81145 3.80322 4.40387 7.2108 4.40387 11.3993C4.40364 12.6945 4.73465 13.9682 5.36542 15.0993C5.3868 15.1367 5.40284 15.1768 5.41309 15.2186C5.47402 15.3879 5.4675 15.5742 5.3949 15.7389C5.3223 15.9036 5.18916 16.034 5.02304 16.1033C4.61629 16.2745 4.17941 16.3626 3.7381 16.3625C3.68617 16.3625 3.63412 16.3613 3.58196 16.3589C2.69635 16.3193 1.86257 15.9302 1.26345 15.2768C0.664339 14.6233 0.348783 13.759 0.38598 12.8733C0.400933 12.5201 0.392589 12.205 0.384433 11.9002C0.376839 11.6133 0.368917 11.3166 0.381948 11.007C0.420839 10.1422 0.792852 9.32593 1.42007 8.72925C2.04728 8.13257 2.88105 7.80173 3.74673 7.80602C5.13685 4.62546 8.31278 2.39697 12 2.39697C15.6872 2.39697 18.8631 4.62546 20.2532 7.80607C21.119 7.80113 21.9531 8.13168 22.5804 8.72838C23.2077 9.32507 23.5796 10.1415 23.6179 11.0065C23.631 11.3165 23.6231 11.6132 23.6154 11.9001C23.6074 12.2049 23.599 12.5202 23.614 12.8736ZM17.8971 11.3993C17.8967 12.3028 17.6889 13.1941 17.2896 14.0045C16.8903 14.8149 16.3102 15.5228 15.594 16.0735C14.8779 16.6243 14.0448 17.0032 13.159 17.181C12.2733 17.3589 11.3585 17.3309 10.4852 17.0993L8.09832 18.4778C7.97789 18.5473 7.83953 18.5796 7.70075 18.5705C7.56197 18.5614 7.42901 18.5114 7.31867 18.4267C7.20833 18.3421 7.12558 18.2266 7.08088 18.0949C7.03618 17.9632 7.03154 17.8212 7.06754 17.6868L7.67757 15.4112C6.66733 14.3192 6.10522 12.8869 6.10309 11.3993C6.10309 8.14675 8.74829 5.50085 12 5.50085C15.2516 5.50085 17.8971 8.14675 17.8971 11.3993ZM10.3605 11.3993C10.3605 11.2128 10.2864 11.034 10.1546 10.9021C10.0227 10.7703 9.84387 10.6962 9.65739 10.6962H9.65621C9.51721 10.6965 9.38139 10.7379 9.26594 10.8153C9.15048 10.8927 9.06056 11.0026 9.00755 11.1312C8.95453 11.2597 8.94079 11.401 8.96807 11.5373C8.99535 11.6736 9.06242 11.7988 9.16081 11.897C9.25919 11.9952 9.38448 12.062 9.52084 12.089C9.65719 12.116 9.7985 12.102 9.9269 12.0488C10.0553 11.9955 10.165 11.9054 10.2422 11.7898C10.3194 11.6742 10.3607 11.5383 10.3607 11.3993H10.3605ZM12.7032 11.3993C12.7032 11.3763 12.7019 11.3533 12.6995 11.3304C12.6973 11.3074 12.6938 11.2846 12.6892 11.262C12.685 11.2394 12.6794 11.2172 12.6723 11.1954C12.6658 11.1734 12.6578 11.1518 12.6494 11.1303C12.6409 11.1087 12.6306 11.0885 12.6198 11.0684C12.6091 11.0481 12.5974 11.0284 12.5847 11.0093C12.5719 10.99 12.5581 10.9714 12.5434 10.9535C12.5289 10.9356 12.5135 10.9186 12.497 10.9024C12.4811 10.886 12.4637 10.8706 12.4459 10.8556C12.4281 10.8415 12.4093 10.8274 12.3901 10.8148C12.371 10.8021 12.3513 10.7903 12.3311 10.7796C12.3109 10.7688 12.2898 10.759 12.2687 10.7501C12.2476 10.7413 12.226 10.7336 12.2041 10.7271C12.1602 10.713 12.1149 10.7039 12.0691 10.6999C12.0002 10.6933 11.9307 10.6966 11.8628 10.7098C11.8402 10.7144 11.8178 10.7202 11.7958 10.7271C11.7739 10.7336 11.7523 10.7412 11.7311 10.7501C11.71 10.759 11.6889 10.7688 11.6688 10.7796C11.6486 10.7904 11.6289 10.8021 11.6097 10.8148C11.5904 10.8274 11.5717 10.8415 11.5544 10.8556C11.5361 10.8706 11.5193 10.886 11.5029 10.9024C11.4864 10.9186 11.4709 10.9356 11.4564 10.9535C11.4419 10.9714 11.4283 10.99 11.4157 11.0093C11.4028 11.0284 11.3909 11.0481 11.38 11.0684C11.3692 11.0885 11.3595 11.1091 11.3509 11.1303C11.342 11.1516 11.3342 11.1733 11.3275 11.1954C11.321 11.217 11.3154 11.2395 11.3107 11.262C11.306 11.2846 11.3026 11.3074 11.3003 11.3304C11.298 11.3534 11.297 11.3763 11.297 11.3993C11.297 11.4223 11.298 11.4457 11.3003 11.4687C11.3026 11.4915 11.3061 11.5142 11.3107 11.5367C11.3154 11.5592 11.321 11.5817 11.3275 11.6037C11.3342 11.6256 11.342 11.6472 11.3509 11.6684C11.3595 11.6897 11.3692 11.7105 11.38 11.7307C11.3908 11.7509 11.403 11.7706 11.4157 11.7898C11.4283 11.8089 11.4419 11.8274 11.4564 11.8451C11.471 11.8631 11.4865 11.8803 11.5029 11.8967C11.5193 11.9126 11.5361 11.9285 11.5544 11.9431C11.572 11.9577 11.5905 11.9713 11.6097 11.9838C11.6289 11.9965 11.6486 12.0087 11.6688 12.0195C11.7095 12.0407 11.752 12.0583 11.7958 12.072C11.8178 12.0785 11.8403 12.0842 11.8628 12.0888C11.908 12.0981 11.954 12.1026 12.0002 12.1024C12.1864 12.1019 12.365 12.028 12.497 11.8967C12.5294 11.8638 12.5588 11.828 12.5847 11.7898C12.5973 11.7706 12.6091 11.7509 12.6198 11.7307C12.6306 11.7106 12.6405 11.6895 12.6494 11.6684C12.6583 11.6473 12.6658 11.6253 12.6723 11.6037C12.6793 11.5817 12.685 11.5593 12.6892 11.5367C12.6938 11.5142 12.6972 11.4915 12.6995 11.4687C12.7019 11.4456 12.7031 11.4224 12.7031 11.3992L12.7032 11.3993ZM15.047 11.3993C15.047 11.2128 14.9729 11.034 14.841 10.9021C14.7092 10.7703 14.5303 10.6962 14.3439 10.6962H14.3425C14.2035 10.6965 14.0677 10.7379 13.9522 10.8153C13.8368 10.8928 13.7469 11.0027 13.6939 11.1312C13.6409 11.2597 13.6271 11.401 13.6544 11.5373C13.6817 11.6736 13.7488 11.7988 13.8472 11.897C13.9455 11.9952 14.0708 12.062 14.2072 12.089C14.3435 12.116 14.4848 12.102 14.6132 12.0488C14.7416 11.9955 14.8514 11.9054 14.9286 11.7898C15.0058 11.6742 15.047 11.5383 15.047 11.3993Z" fill="#3582CD" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;