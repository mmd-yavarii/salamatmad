'use client';

import React from 'react';
import Link from 'next/link';
import { FiMessageCircle } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

function About() {
    const { t } = useTranslation();

    return (
        <main className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                {/* Header */}
                <section className="mb-10 text-center">
                    <p className="mb-3 text-xs font-medium" style={{ color: 'var(--them)' }}>
                        {t('about.label')}
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">{t('about.title')}</h1>

                    <div className="mx-auto mt-5 max-w-2xl">
                        <p className="text-sm leading-8 text-gray-500 dark:text-gray-400">{t('about.description')}</p>

                        <p className="mt-4 text-sm leading-8 text-gray-500 dark:text-gray-400">{t('about.description2')}</p>
                    </div>

                    {/* Support Button */}
                    <div className="mt-7 flex justify-center">
                        <Link
                            href="/support"
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-[var(--them)] hover:text-[var(--them)] dark:border-white/10 dark:text-gray-300 dark:hover:border-[var(--them)] dark:hover:text-[var(--them)]"
                        >
                            <FiMessageCircle className="text-base" />
                            {t('about.supportButton')}
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default About;
