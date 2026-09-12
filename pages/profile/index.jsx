'use client';

import Image from 'next/image';

import Link from 'next/link';

import { useTranslation } from 'react-i18next';

import { FiPhone, FiPackage, FiHeadphones, FiClock, FiChevronLeft } from 'react-icons/fi';

export default function ProfilePage() {
    const { t } = useTranslation();

    const user = {
        name: 'محمد',

        phone: '09181111111',
    };

    const menuItems = [
        {
            title: t('profile.menu.trackOrder.title'),

            description: t('profile.menu.trackOrder.description'),

            icon: FiPackage,

            href: '/orders/track',
        },

        {
            title: t('profile.menu.support.title'),

            description: t('profile.menu.support.description'),

            icon: FiHeadphones,

            href: '/support',
        },

        {
            title: t('profile.menu.recentOrders.title'),

            description: t('profile.menu.recentOrders.description'),

            icon: FiClock,

            href: '/orders',
        },
    ];

    return (
        <main
            className="
            px-4
            text-[var(--foreground)]
        "
        >
            <section
                className="
                mx-auto
                max-w-xl
                space-y-6
            "
            >
                {/* User Card */}

                <div className="glass-card">
                    <div
                        className="
                        absolute
                        -top-20
                        -right-20
                        h-40
                        w-40
                        rounded-full
                        bg-[var(--them)]
                        opacity-20
                        blur-3xl
                    "
                    />

                    <div
                        className="
                        relative
                        flex
                        flex-col
                        items-center
                        gap-5
                    "
                    >
                        {/* Avatar */}

                        <div
                            className="
        flex
        h-28
        w-28
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        bg-opacity-10
        shadow-lg
    "
                        >
                            {true ? (
                                <Image src="/avatars/a1.avif" alt="avatar" width={112} height={112} className="h-full w-full object-cover" />
                            ) : (
                                <Image src="/avatars/a2.avif" alt="avatar" width={112} height={112} className="h-full w-full object-cover" />
                            )}
                        </div>
                        {/* User Info */}
                        <div
                            className="
                            text-center
                            space-y-3
                        "
                        >
                            <h1
                                className="
                                text-2xl
                                font-bold
                            "
                            >
                                {user.name}
                            </h1>

                            <div
                                className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                text-sm
                                opacity-70
                            "
                            >
                                <FiPhone />

                                <span dir="ltr">{user.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <div className="glass-card divide-y divide-white/10">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="
                    group
                    flex
                    items-center
                    justify-between
                    px-5
                    py-4
                    transition
                    hover:bg-white/10
                "
                            >
                                <div
                                    className="
                        flex
                        items-center
                        gap-4
                    "
                                >
                                    <div
                                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-[var(--them)]/10
                            text-[var(--them)]
                            transition
                            group-hover:scale-105
                        "
                                    >
                                        <Icon size={22} />
                                    </div>

                                    <div>
                                        <h3
                                            className="
                                font-semibold
                            "
                                        >
                                            {item.title}
                                        </h3>

                                        <p
                                            className="
                                text-sm
                                opacity-60
                            "
                                        >
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                <FiChevronLeft
                                    size={20}
                                    className="
                        opacity-40
                        transition
                        group-hover:-translate-x-1
                        group-hover:text-[var(--them)]
                    "
                                />
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
