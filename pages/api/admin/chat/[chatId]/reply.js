import { verifyToken } from '@/helper/auth';
import dbConnect from '@/lib/dbConnect';
import Message from '@/models/Message';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed',
        });
    }

    try {
        await dbConnect();

        // verify token
        const authCookie = req.cookies?.token;

        if (!authCookie) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
        }

        let auth;

        try {
            auth = JSON.parse(authCookie);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid authentication data',
            });
        }

        const decoded = verifyToken(auth.token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token',
            });
        }

        if (decoded.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied',
            });
        }

        const { chatId } = req.query;
        const { message } = req.body;

        // verify chatId
        if (!chatId || typeof chatId !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'chatId is required',
            });
        }

        // verify message
        if (!message || typeof message !== 'string' || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: 'message is required',
            });
        }

        // پیدا کردن کاربر چت
        const userMessage = await Message.findOne({
            chatId,
            type: 'user',
        })
            .select('userId')
            .lean();

        if (!userMessage) {
            return res.status(404).json({
                success: false,
                message: 'Chat user not found',
            });
        }

        // ذخیره پاسخ ادمین
        const newMessage = await Message.create({
            userId: userMessage.userId,
            chatId,
            message: message.trim(),
            type: 'answer',
        });

        return res.status(201).json({
            success: true,
            message: 'Reply sent successfully',
            data: newMessage,
        });
    } catch (error) {
        console.error('Admin reply error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
}

// http://localhost:3000/admin/chat/C-085D24E0
