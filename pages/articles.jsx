'use client';

import React from 'react';

import { FiInstagram, FiArrowLeft, FiExternalLink } from 'react-icons/fi';

import { useTranslation } from 'react-i18next';

// Temporary data
const articlesData = [
    {
        id: 1,
        title: 'چطور محصول مناسب خود را انتخاب کنیم؟',
        description: 'در این پست نکات مهمی را بررسی کرده‌ایم که قبل از انتخاب و خرید محصول بهتر است بدانید.',
        instagramUrl: 'https://www.instagram.com/p/POST_ID_1/',
    },
    {
        id: 2,
        title: 'نکات مهم قبل از خرید',
        description: 'با چند نکته ساده می‌توانید انتخاب دقیق‌تر و مطمئن‌تری هنگام خرید داشته باشید.',
        instagramUrl: 'https://www.instagram.com/p/POST_ID_2/',
    },
    {
        id: 3,
        title: 'راهنمای استفاده از محصولات',
        description: 'در این مقاله کوتاه، روش صحیح استفاده و نکات کاربردی مربوط به محصولات را توضیح داده‌ایم.',
        instagramUrl: 'https://www.instagram.com/p/POST_ID_3/',
    },
    {
        id: 4,
        title: 'پاسخ به سوالات متداول',
        description: 'پاسخ سوالات متداول کاربران را در این پست اینستاگرامی جمع‌آوری کرده‌ایم.',
        instagramUrl: 'https://www.instagram.com/p/POST_ID_4/',
    },
];

export default function Articles() {
    const { t } = useTranslation();

    return (
        <main className="relative overflow-hidden px-4 py-5 sm:px-6 lg:px-8">
            <div className="relative z-10 mx-auto max-w-4xl">
                {/* Header */}
                <section className="text-center">
                    <div
                        className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1"
                        style={{
                            borderColor: 'color-mix(in srgb, var(--them) 20%, transparent)',
                            background: 'color-mix(in srgb, var(--them) 4%, transparent)',
                        }}
                    >
                        <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{
                                background: 'var(--them)',
                            }}
                        />

                        <span
                            className="text-xs font-semibold"
                            style={{
                                color: 'var(--them)',
                            }}
                        >
                            {t('articles.badge')}
                        </span>
                    </div>

                    <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl">{t('articles.title')}</h1>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-500 dark:text-gray-400">{t('articles.description')}</p>
                </section>

                {/* Articles */}
                <section className="mt-12">
                    <div className="space-y-3">
                        {articlesData.map((article) => (
                            <a
                                key={article.id}
                                href={article.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-4
                                    rounded-2xl
                                    border
                                    border-gray-200/80
                                    bg-white/70
                                    p-4
                                    backdrop-blur-md
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:border-[var(--them)]
                                    hover:shadow-lg
                                    hover:shadow-gray-200/30
                                    dark:border-gray-800/80
                                    dark:bg-gray-900/50
                                    dark:hover:shadow-none
                                    sm:p-5
                                "
                            >
                                {/* Instagram Icon */}
                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        transition-all
                                        duration-300
                                        group-hover:scale-105
                                    "
                                    style={{
                                        color: 'var(--them)',
                                        borderColor: 'color-mix(in srgb, var(--them) 20%, transparent)',
                                        background: 'color-mix(in srgb, var(--them) 5%, transparent)',
                                    }}
                                >
                                    <FiInstagram size={21} strokeWidth={1.7} />
                                </div>

                                {/* Content */}
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-sm font-bold text-gray-900 dark:text-white sm:text-base">{article.title}</h2>

                                    <p className="mt-1.5 line-clamp-2 text-xs leading-6 text-gray-500 dark:text-gray-400 sm:text-sm">
                                        {article.description}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        text-gray-400
                                        transition-all
                                        duration-300
                                        group-hover:bg-[var(--them)]
                                        group-hover:text-white
                                        dark:text-gray-500
                                    "
                                >
                                    <FiArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Instagram Footer */}
                <div className="mt-8 flex justify-center">
                    <a
                        href="https://www.instagram.com/salamat.mad.ir"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            group
                            inline-flex
                            items-center
                            gap-2
                            text-xs
                            font-semibold
                            text-gray-500
                            transition-colors
                            hover:text-[var(--them)]
                            dark:text-gray-400
                        "
                    >
                        <FiInstagram size={15} />

                        <span>{t('articles.instagram')}</span>

                        <FiExternalLink size={13} className="transition-transform group-hover:-translate-y-0.5" />
                    </a>
                </div>
            </div>
        </main>
    );
}
