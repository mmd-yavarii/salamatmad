export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed',
        });
    }

    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'message is required',
            });
        }

        const token = process.env.BALE_BOT_TOKEN;
        const chatId = process.env.BALE_CHAT_ID;

        if (!token || !chatId) {
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
                chat_id: chatId,
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

        return res.status(200).json({
            success: true,
            message: 'Message sent successfully',
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
