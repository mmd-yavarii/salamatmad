import React from 'react';

function MessageList({ messages = [], loading = false, height = '300px' }) {
    return (
        <div
            className="overflow-y-auto"
            style={{
                height,
                scrollbarWidth: 'thin',
            }}
        >
            {loading ? (
                <div className="flex h-full items-center justify-center">
                    <span
                        className="h-7 w-7 animate-spin rounded-full border-2"
                        style={{
                            borderColor: 'color-mix(in srgb, var(--them) 20%, transparent)',
                            borderTopColor: 'var(--them)',
                        }}
                        aria-label="Loading"
                    />
                </div>
            ) : messages.length === 0 ? (
                <div
                    className="flex h-full items-center justify-center text-sm"
                    style={{
                        color: 'color-mix(in srgb, var(--foreground) 45%, transparent)',
                    }}
                >
                    هنوز پیامی وجود ندارد.
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {messages.map((item) => {
                        const isAdmin = item.type === 'answer';

                        return (
                            <div
                                key={item._id}
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
            )}
        </div>
    );
}

export default MessageList;
