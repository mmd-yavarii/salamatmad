import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FiSend } from 'react-icons/fi';

function Chat() {
    const router = useRouter();
    const { chatId } = router.query;

    const [message, setMessage] = useState('');

    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'user',
            message: 'سلام، برای انتخاب محصول مناسب راهنمایی می‌خواستم.',
        },
        {
            id: 2,
            sender: 'admin',
            message: 'سلام، حتماً. خوشحال می‌شم راهنماییتون کنم.',
        },
        {
            id: 3,
            sender: 'user',
            message: 'برای استفاده روزانه می‌خوام.',
        },
        {
            id: 4,
            sender: 'admin',
            message: 'حتماً. چه بودجه‌ای در نظر گرفتید؟',
        },
        {
            id: 5,
            sender: 'user',
            message: 'حدود ۲ میلیون تومان.',
        },
    ]);

    const handleSend = (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                sender: 'admin',
                message: message.trim(),
            },
        ]);

        console.log('پاسخ:', message);

        setMessage('');
    };

    return (
        <div className="mx-auto w-full max-w-3xl px-4 py-6" style={{ color: 'var(--foreground)' }}>
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
                <div className="flex min-h-[450px] flex-col gap-3 overflow-y-auto">
                    {messages.map((item) => {
                        const isAdmin = item.sender === 'admin';

                        return (
                            <div
                                key={item.id}
                                className="flex"
                                style={{
                                    justifyContent: isAdmin ? 'flex-start' : 'flex-end',
                                }}
                            >
                                <div
                                    className="max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-7"
                                    style={{
                                        background: isAdmin ? 'color-mix(in srgb, var(--them) 12%, var(--background))' : 'var(--button-background)',

                                        border: '1px solid var(--button-border)',

                                        color: 'var(--foreground)',

                                        borderBottomLeftRadius: isAdmin ? '5px' : '16px',

                                        borderBottomRightRadius: !isAdmin ? '5px' : '16px',
                                    }}
                                >
                                    {item.message}
                                </div>
                            </div>
                        );
                    })}
                </div>

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
