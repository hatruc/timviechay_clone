import React, { useEffect, useState } from 'react'

const Test = () => {
    const handleLikeClick = async () => {
        try {
            // Lấy địa chỉ IP
            const ipResponse = await fetch('https://api64.ipify.org?format=json');
            const { ip } = await ipResponse.json();
            console.log(`IP Address: ${ip}`);

            // Lấy thông tin User Agent
            const userAgent = navigator.userAgent;
            console.log(`User Agent: ${userAgent}`);

            // Gửi thông tin lên server
            const response = await fetch('/api/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ip, userAgent }),
            });

            if (response.ok) {
                console.log('Thông tin đã được gửi thành công!');
            } else {
                console.error('Có lỗi xảy ra khi gửi thông tin.');
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
    };
    const [totalVisitors, setTotalVisitors] = useState(0);
    const [onlineVisitors, setOnlineVisitors] = useState(0);

    useEffect(() => {
        // Tính tổng số lượt truy cập khi trang được tải
        const fetchTotalVisitors = async () => {
            try {
                const response = await fetch('/api/totalVisitors');
                const data = await response.json();
                setTotalVisitors(data.total);
            } catch (error) {
                console.error('Đã xảy ra lỗi khi lấy tổng số lượt truy cập:', error);
            }
        };

        // Tính số người trực tuyến khi trang được tải và cập nhật mỗi 5 giây
        const fetchOnlineVisitors = async () => {
            try {
                const response = await fetch('/api/onlineVisitors');
                const data = await response.json();
                setOnlineVisitors(data.online);
            } catch (error) {
                console.error('Đã xảy ra lỗi khi lấy số người trực tuyến:', error);
            }
        };

        fetchTotalVisitors();
        fetchOnlineVisitors();

        const interval = setInterval(() => {
            fetchOnlineVisitors();
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <div>
                <button onClick={handleLikeClick}>Like</button>
            </div>
            <p>Tổng số người đã truy cập: {totalVisitors}</p>
            <p>Số người đang trực tuyến: {onlineVisitors}</p>
        </div>
    )
}

export default Test
