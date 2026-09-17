import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FiSend } from 'react-icons/fi';
import MessageList from '@/components/MessageList';

function Chat() {
    const router = useRouter();

    const { chatId } = router.query;

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // دریافت پیام‌های چت
    useEffect(() => {
        if (!router.isReady || !chatId) return;

        const getMessages = async () => {
            try {
                setLoading(true);
                setError('');

                const response = await fetch(`/api/admin/chat/${chatId}`);

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message || 'خطا در دریافت پیام‌ها');
                    return;
                }

                setMessages(data.messages || []);
            } catch (error) {
                console.error('Get messages error:', error);

                setError('خطا در ارتباط با سرور.');
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, [router.isReady, chatId]);

    // ارسال پاسخ
    const handleSend = async (e) => {
        e.preventDefault();

        if (!message.trim() || !chatId) {
            return;
        }

        setError('');

        try {
            const response = await fetch(`/api/admin/chat/${chatId}/reply`, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    message: message.trim(),
                }),
            });

            const data = await response.json();

            // کاربر احراز هویت نشده
            if (response.status === 401) {
                setError('دسترسی شما معتبر نیست.');
                return;
            }

            // کاربر ادمین نیست
            if (response.status === 403) {
                setError('شما دسترسی ارسال پاسخ ندارید.');
                return;
            }

            // سایر خطاهای API
            if (!response.ok) {
                setError(data.message || 'خطا در ارسال پاسخ');
                return;
            }

            // موفقیت
            setMessages((prev) => [...prev, data.data]);

            setMessage('');
        } catch (error) {
            console.error('Send message error:', error);

            setError('خطا در ارتباط با سرور.');
        }
    };

    return (
        <div
            className="mx-auto w-full max-w-3xl px-4"
            style={{
                color: 'var(--foreground)',
            }}
        >
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-xl font-semibold">چت پشتیبانی</h1>

                <p
                    className="mt-1 text-xs"
                    style={{
                        color: 'color-mix(in srgb, var(--foreground) 45%, transparent)',
                    }}
                >
                    Chat ID: {chatId}
                </p>
            </div>

            {/* Chat */}
            <div
                className="glass-card"
                style={{
                    padding: '16px',
                }}
            >
                {/* Messages */}
                <MessageList messages={messages} loading={loading} height="300px" />

                {/* Error */}
                {error && (
                    <div
                        className="mt-3 rounded-xl px-4 py-3 text-sm"
                        style={{
                            background: 'color-mix(in srgb, var(--them) 10%, transparent)',

                            color: 'var(--them)',

                            border: '1px solid color-mix(in srgb, var(--them) 25%, transparent)',
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* Input */}
                <form onSubmit={handleSend} className="mt-4 flex gap-2">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="پاسخ خود را بنویسید..."
                        className="app-input"
                        style={{
                            paddingRight: '1rem',
                            paddingLeft: '1rem',
                        }}
                    />

                    <button
                        type="submit"
                        disabled={!message.trim()}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition"
                        style={{
                            background: message.trim() ? 'var(--them)' : 'var(--button-background)',

                            color: message.trim() ? '#fff' : 'var(--foreground)',

                            border: '1px solid var(--button-border)',

                            opacity: message.trim() ? 1 : 0.5,

                            cursor: message.trim() ? 'pointer' : 'not-allowed',
                        }}
                    >
                        <FiSend size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
