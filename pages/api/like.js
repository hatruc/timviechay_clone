// pages/api/like.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { ip, userAgent } = req.body;
            console.log('IP Address received:', ip);
            console.log('User Agent received:', userAgent);
            // Trả về kết quả
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
