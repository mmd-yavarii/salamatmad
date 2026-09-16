export async function sendBaleMessage(message) {
    try {
        const response = await fetch('/api/bale/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to send Bale message');
        }

        return data;
    } catch (error) {
        console.error('Bale message error:', error);
        throw error;
    }
}
