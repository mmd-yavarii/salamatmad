'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { FiSend, FiInstagram, FiPhone, FiMessageCircle, FiLogIn, FiLock, FiMail, FiArrowLeft } from 'react-icons/fi';

import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { sendBaleTicket } from '@/helper/sendBaleTicket';

function Support() {
    const { t } = useTranslation();
    const auth = useAuth();

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const isAuthenticated = auth?.isAuthenticated || false;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated || !message.trim() || loading) {
            return;
        }

        setStatus(null);
        setLoading(true);

        try {
            const name = auth?.auth?.info?.name || 'نامشخص';
            const phone = auth?.auth?.info?.phone || 'نامشخص';
            // const userId = auth?.auth?.info?._id || auth?.auth?.info?.id;

            // if (!userId) {
            //     throw new Error('User ID is not available');
            // }

            // const ticketId = Math.random().toString(36).substring(2, 8).toUpperCase();

            const userId = auth?.auth?.info?._id || auth?.auth?.info?.id;

            if (!userId) {
                throw new Error('User ID is not available');
            }
            const chatId = `C-${String(userId).slice(-8).toUpperCase()}`;

            const supportMessage =
                `🎫 کد پیگیری: #${chatId}\n` +
                `👤 نام: ${name}\n` +
                `📱 شماره تلفن: ${phone}\n` +
                `────────────────\n` +
                `💬 پیام:\n${message.trim()}`;

            await sendBaleTicket({
                chatId,
                userId,
                message: supportMessage,
            });
            await sendBaleTicket(supportMessage);

            setMessage('');
            setStatus('success');
        } catch (error) {
            console.error('Failed to send support message:', error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const supportLinks = [
        {
            key: 'instagram',
            icon: FiInstagram,
            href: 'https://www.instagram.com/salamat.mad.ir',
            external: true,
        },
        {
            key: 'sales',
            icon: FiPhone,
            href: 'tel:09120710677',
        },
        {
            key: 'guide',
            icon: FiPhone,
            href: 'tel:09350710677',
        },
        {
            key: 'support',
            icon: FiPhone,
            href: 'tel:09196429360',
        },
        {
            key: 'rubika',
            icon: FiMessageCircle,
            href: 'https://rubika.ir/Erfanhemati1372',
            external: true,
        },
        {
            key: 'email',
            icon: FiMail,
            href: 'mailto:Erfanhemati7280@gmail.com',
        },
    ];

    return (
        <main className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
            <div className="relative z-10 mx-auto max-w-3xl">
                {/* Header */}
                <section className="text-center">
                    <div
                        className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 shadow-sm"
                        style={{
                            borderColor: 'color-mix(in srgb, var(--them) 20%, transparent)',
                            background: 'color-mix(in srgb, var(--them) 4%, transparent)',
                        }}
                    >
                        <span
                            className="h-1.5 w-1.5 animate-pulse rounded-full"
                            style={{
                                background: 'var(--them)',
                            }}
                        />

                        <span
                            className="text-xs font-semibold tracking-wide"
                            style={{
                                color: 'var(--them)',
                            }}
                        >
                            {t('support.badge')}
                        </span>
                    </div>

                    <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl">{t('support.title')}</h1>

                    <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-gray-500 dark:text-gray-400">{t('support.description')}</p>
                </section>

                {/* Message Section */}
                <section className="mt-12">
                    {/* Login Required */}
                    {!isAuthenticated && (
                        <div className="mb-6 rounded-2xl border border-gray-200/85 bg-white/80 p-5 shadow-sm backdrop-blur-md transition-all dark:border-gray-800 dark:bg-gray-900/60">
                            <div className="flex items-start gap-4">
                                <div
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-inner"
                                    style={{
                                        color: 'var(--them)',
                                        background: 'color-mix(in srgb, var(--them) 10%, transparent)',
                                    }}
                                >
                                    <FiLock size={19} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{t('support.loginRequired.title')}</p>

                                    <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                                        {t('support.loginRequired.description')}
                                    </p>

                                    <Link
                                        href="/auth/login"
                                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2"
                                        style={{
                                            color: 'var(--them)',
                                        }}
                                    >
                                        {t('support.loginRequired.loginButton')}
                                        <FiLogIn size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Message Form */}
                    <form
                        onSubmit={handleSubmit}
                        className={`relative overflow-hidden rounded-3xl border border-gray-200/85 bg-white/70 p-6 shadow-xl shadow-gray-100/50 backdrop-blur-xl transition-all duration-300 dark:border-gray-800/85 dark:bg-gray-900/50 dark:shadow-none sm:p-8 ${
                            !isAuthenticated ? 'pointer-events-none opacity-50' : ''
                        }`}
                    >
                        {/* Top Accent Line */}
                        <div
                            className="absolute right-0 top-0 h-1 w-full"
                            style={{
                                background: 'linear-gradient(90deg, transparent, var(--them), transparent)',
                            }}
                        />

                        {/* Form Header */}
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-base font-bold text-gray-900 dark:text-white">{t('support.message.title')}</h2>

                                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{t('support.message.description')}</p>
                            </div>

                            <span
                                className="hidden rounded-full border px-3 py-1 text-xs font-medium sm:block"
                                style={{
                                    color: 'var(--them)',
                                    borderColor: 'color-mix(in srgb, var(--them) 25%, transparent)',
                                    background: 'color-mix(in srgb, var(--them) 6%, transparent)',
                                }}
                            >
                                {t('support.message.status')}
                            </span>
                        </div>

                        {/* Textarea */}
                        <div className="relative">
                            <textarea
                                id="message"
                                name="message"
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);

                                    if (status) {
                                        setStatus(null);
                                    }
                                }}
                                placeholder={isAuthenticated ? t('support.message.placeholder') : t('support.message.loginPlaceholder')}
                                disabled={!isAuthenticated || loading}
                                rows={5}
                                className="
                                    w-full
                                    resize-none
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    bg-gray-50/50
                                    p-4
                                    text-sm
                                    leading-relaxed
                                    text-gray-900
                                    outline-none
                                    transition-all
                                    duration-300
                                    placeholder:text-gray-400
                                    hover:border-gray-300
                                    focus:border-[var(--them)]
                                    focus:bg-white
                                    focus:ring-4
                                    focus:ring-[color-mix(in_srgb,var(--them)_10%,transparent)]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                    dark:border-gray-800
                                    dark:bg-gray-950/40
                                    dark:text-white
                                    dark:placeholder:text-gray-600
                                    dark:focus:bg-gray-950/80
                                "
                                autoComplete="off"
                            />

                            {/* Bottom Controls */}
                            <div className="mt-4 flex min-h-11 items-center justify-between gap-4">
                                {/* Status */}
                                <div className="min-h-5 min-w-0">
                                    {status === 'success' && (
                                        <p className="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                            {t('support.message.success')}
                                        </p>
                                    )}

                                    {status === 'error' && (
                                        <p className="flex items-center gap-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                            {t('support.message.error')}
                                        </p>
                                    )}
                                </div>

                                {/* Send Button */}
                                <button
                                    type="submit"
                                    disabled={!isAuthenticated || !message.trim() || loading}
                                    className="
                                        group
                                        inline-flex
                                        h-11
                                        shrink-0
                                        items-center
                                        gap-2
                                        rounded-xl
                                        px-6
                                        text-xs
                                        font-bold
                                        text-white
                                        transition-all
                                        duration-300
                                        hover:-translate-y-0.5
                                        hover:shadow-lg
                                        active:translate-y-0
                                        disabled:cursor-not-allowed
                                        disabled:opacity-40
                                        disabled:hover:translate-y-0
                                        disabled:hover:shadow-none
                                    "
                                    style={{
                                        background: 'var(--them)',
                                        boxShadow: '0 10px 25px -5px color-mix(in srgb, var(--them) 45%, transparent)',
                                    }}
                                >
                                    <span>{loading ? t('support.message.sendingButton') : t('support.message.sendButton')}</span>

                                    {loading ? (
                                        <span
                                            className="
                                                h-4
                                                w-4
                                                animate-spin
                                                rounded-full
                                                border-2
                                                border-white/30
                                                border-t-white
                                            "
                                        />
                                    ) : (
                                        <FiSend
                                            size={14}
                                            className="
                                                transition-transform
                                                duration-300
                                                group-hover:-rotate-45
                                            "
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </section>

                {/* Contact Methods */}
                <section className="mt-14">
                    <div className="mb-6">
                        <p className="text-base font-bold text-gray-900 dark:text-white">{t('support.contact.title')}</p>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{t('support.contact.description')}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {supportLinks.map((item) => {
                            const Icon = item.icon;

                            return (
                                <a
                                    key={item.key}
                                    href={item.href}
                                    target={item.external ? '_blank' : undefined}
                                    rel={item.external ? 'noopener noreferrer' : undefined}
                                    className="
                                        group
                                        relative
                                        flex
                                        items-center
                                        gap-4
                                        rounded-2xl
                                        border
                                        border-gray-200/85
                                        bg-white/70
                                        p-4
                                        shadow-sm
                                        backdrop-blur-md
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-[var(--them)]
                                        hover:shadow-md
                                        dark:border-gray-800/85
                                        dark:bg-gray-900/50
                                    "
                                >
                                    <span
                                        className="
                                            flex
                                            h-11
                                            w-11
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            transition-transform
                                            duration-300
                                            group-hover:scale-110
                                        "
                                        style={{
                                            color: 'var(--them)',
                                            background: 'color-mix(in srgb, var(--them) 10%, transparent)',
                                        }}
                                    >
                                        <Icon size={20} strokeWidth={1.8} />
                                    </span>

                                    <div className="min-w-0 flex-1">
                                        <span className="block text-xs font-bold text-gray-900 dark:text-white">
                                            {t(`support.contact.${item.key}.name`)}
                                        </span>

                                        <span className="mt-0.5 block truncate text-[11px] text-gray-500 dark:text-gray-400">
                                            {t(`support.contact.${item.key}.description`)}
                                        </span>
                                    </div>

                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-300 group-hover:bg-[var(--them)] group-hover:text-white dark:bg-gray-800">
                                        <FiArrowLeft size={13} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Support;
