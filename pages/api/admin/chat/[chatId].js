import dbConnect from '@/lib/dbConnect';
import Message from '@/models/Message';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed',
        });
    }

    try {
        await dbConnect();

        const { chatId } = req.query;

        if (!chatId || typeof chatId !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'chatId is required',
            });
        }

        const messages = await Message.find({
            chatId,
        })
            .sort({ createdAt: 1 })
            .lean();

        return res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        console.error('Get chat messages error:', error);

        return res.status(500).json({
            success: false,
            message: 'خطا در دریافت پیام‌ها',
        });
    }
}
