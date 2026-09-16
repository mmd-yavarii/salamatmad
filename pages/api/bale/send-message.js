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

        const { message, userId, chatId: userChatId } = req.body;
        const { ticket } = req.query;

        if (!message || typeof message !== 'string' || !userId) {
            return res.status(400).json({
                success: false,
                message: 'message and userId are required',
            });
        }

        const token = process.env.BALE_BOT_TOKEN;
        const baleChatId = process.env.BALE_CHAT_ID;

        if (!token || !baleChatId) {
            return res.status(500).json({
                success: false,
                message: 'Bale bot configuration is missing',
            });
        }

        const response = await fetch(`https://tapi.bale.ai/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: baleChatId,
                text: message,
            }),
        });

        const data = await response.json();

        if (!response.ok || data.ok === false) {
            console.error('Bale API Error:', data);

            return res.status(502).json({
                success: false,
                message: 'Failed to send message to Bale',
                error: data,
            });
        }

        if (ticket === 'ok') {
            if (!userChatId) {
                return res.status(400).json({
                    success: false,
                    message: 'chatId is required when ticket=ok',
                });
            }

            await Message.create({
                userId,
                chatId: userChatId,
                message,
                type: 'user',
            });

            console.log('Message saved in database');
        }

        return res.status(200).json({
            success: true,
            message: 'Message sent successfully',
            savedToDatabase: ticket === 'ok',
            data,
        });
    } catch (error) {
        console.error('Bale API Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
}
