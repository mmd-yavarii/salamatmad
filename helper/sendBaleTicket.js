export async function sendBaleTicket({ chatId, userId, message }) {
    try {
        const response = await fetch('/api/bale/send-message?ticket=ok', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatId,
                userId,
                message,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(data.message || 'Failed to send Bale message');
        }

        return data;
    } catch (error) {
        console.error('Bale message error:', error);
        throw error;
    }
}
