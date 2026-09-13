'use client';

import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

import { useTranslation } from 'react-i18next';

import { FiPhone, FiPackage, FiHeadphones, FiClock, FiChevronLeft, FiLogOut } from 'react-icons/fi';
import { useState } from 'react';

export default function ProfilePage() {
    const { t } = useTranslation();
    const router = useRouter();
    const auth = useAuth();
    const [openLogout, setOpenLogout] = useState(false);

    const user = {
        name: auth.auth?.info?.name || '....',
        phone: auth.auth?.info?.phone || '...........',
    };

    const handleLogout = () => {
        setOpenLogout(true);
    };

    const confirmLogout = () => {
        auth.logout();
        setOpenLogout(false);
        router.replace('/auth/login');
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

        {
            title: t('profile.menu.logout.title'),
            description: t('profile.menu.logout.description'),
            icon: FiLogOut,
            action: handleLogout,
            danger: true,
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
                                shadow-lg
                            "
                        >
                            <Image
                                src="/avatars/a1.avif"
                                alt="avatar"
                                width={112}
                                height={112}
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />
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

                <div
                    className="
                        glass-card
                        divide-y
                        divide-white/10
                    "
                >
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        const content = (
                            <>
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-4
                                    "
                                >
                                    <div
                                        className={`
                                            flex
                                            h-11
                                            w-11
                                            items-center
                                            justify-center
                                            rounded-xl
                                            transition
                                            group-hover:scale-105

                                            ${item.danger ? 'bg-red-500/10 text-red-500' : 'bg-[var(--them)]/10 text-[var(--them)]'}
                                        `}
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
                                    className={`
                                        opacity-40
                                        transition
                                        group-hover:-translate-x-1

                                        ${item.danger ? 'group-hover:text-red-500' : 'group-hover:text-[var(--them)]'}
                                    `}
                                />
                            </>
                        );

                        if (item.href) {
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
                                    {content}
                                </Link>
                            );
                        }

                        return (
                            <button
                                key={item.title}
                                onClick={item.action}
                                className="
                                    group
                                    flex
                                    w-full
                                    items-center
                                    justify-between
                                    px-5
                                    py-4
                                    text-right
                                    transition
                                    hover:bg-white/10
                                "
                            >
                                {content}
                            </button>
                        );
                    })}
                </div>
            </section>

            <Dialog open={openLogout} onClose={() => setOpenLogout(false)}>
                <DialogTitle>{t('profile.logoutDialog.title')}</DialogTitle>

                <DialogContent>{t('profile.logoutDialog.message')}</DialogContent>

                <DialogActions sx={{ gap: 1 }}>
                    <Button variant="outlined" color="primary" onClick={() => setOpenLogout(false)}>
                        {t('profile.logoutDialog.cancel')}
                    </Button>

                    <Button color="primary" variant="contained" onClick={confirmLogout}>
                        {t('profile.logoutDialog.confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        </main>
    );
}
