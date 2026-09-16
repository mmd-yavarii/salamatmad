'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { FiUser, FiLogIn } from 'react-icons/fi';

export default function SideMenu({ navItems = [], open, onClose, isRtl = true }) {
    const router = useRouter();
    const pathname = router.pathname; // یا router.asPath اگه query dynamic رو هم می‌خوای لحاظ کنی

    const { t } = useTranslation();

    const [mounted, setMounted] = useState(false);
    const [user, setUser] = useState(null);

    // =========================
    // Get Cookie
    // =========================
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null;
    };

    // =========================
    // Client Mount
    // =========================
    useEffect(() => {
        setMounted(true);

        const token = getCookie('token');

        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({
                    name: payload.name || payload.username || 'User',
                });
            } catch (error) {
                console.log('Invalid token');
                setUser(null);
            }
        }
    }, []);

    // Prevent hydration error
    if (!mounted) {
        return null;
    }

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`
                    fixed
                    inset-0
                    z-[60]
                    bg-black/40
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    ${open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
                `}
            />

            {/* Sidebar */}
            <aside
                dir={isRtl ? 'rtl' : 'ltr'}
                className={`
                    fixed
                    top-0
                    bottom-0
                    z-[70]
                    w-[290px]
                    max-w-[85vw]
                    p-6
                    flex
                    flex-col
                    backdrop-blur-2xl
                    transition-transform
                    duration-300
                    ${isRtl ? 'right-0' : 'left-0'}
                    ${open ? 'translate-x-0' : isRtl ? 'translate-x-full' : '-translate-x-full'}
                `}
                style={{
                    backgroundColor: 'var(--header-background)',
                    boxShadow: open ? '0 0 50px -10px rgba(0,0,0,.3)' : 'none',
                }}
            >
                <div>
                    {/* User Header */}
                    <div
                        className="
                            pb-6
                            mb-4
                            border-b
                            border-white/10
                        "
                    >
                        {user ? (
                            <Link
                                href="/profile"
                                onClick={onClose}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    group
                                "
                            >
                                <div
                                    className="
                                        w-11
                                        h-11
                                        rounded-2xl
                                        flex
                                        items-center
                                        justify-center
                                        transition-all
                                        duration-300
                                        group-hover:scale-105
                                    "
                                    style={{
                                        backgroundColor: 'var(--them)',
                                        color: '#fff',
                                        boxShadow: '0 0 20px color-mix(in srgb, var(--them) 35%, transparent)',
                                    }}
                                >
                                    <FiUser size={23} />
                                </div>

                                <div className="flex flex-col">
                                    <span
                                        className="
                                            text-base
                                            font-bold
                                        "
                                        style={{
                                            color: 'var(--foreground)',
                                        }}
                                    >
                                        {user.name}
                                    </span>

                                    <span
                                        className="
                                            text-xs
                                            opacity-60
                                        "
                                    >
                                        {t('navigation.profile')}
                                    </span>
                                </div>
                            </Link>
                        ) : (
                            <Link
                                href="/auth/login"
                                onClick={onClose}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    p-3
                                    rounded-2xl
                                    transition-all
                                    duration-300
                                    group
                                    hover:-translate-y-1
                                "
                                style={{
                                    backgroundColor: 'var(--button-background)',
                                    border: '1px solid var(--button-border)',
                                }}
                            >
                                <div
                                    className="
                                        w-11
                                        h-11
                                        rounded-2xl
                                        flex
                                        items-center
                                        justify-center
                                        transition-all
                                        duration-300
                                        group-hover:scale-110
                                    "
                                    style={{
                                        backgroundColor: 'var(--them)',
                                        color: '#fff',
                                        boxShadow: '0 0 18px color-mix(in srgb, var(--them) 35%, transparent)',
                                    }}
                                >
                                    <FiLogIn size={23} />
                                </div>

                                <div className="flex flex-col">
                                    <span
                                        className="
                                            text-base
                                            font-bold
                                        "
                                        style={{
                                            color: 'var(--foreground)',
                                        }}
                                    >
                                        {t('navigation.login')}
                                    </span>

                                    <span
                                        className="
                                            text-xs
                                            opacity-60
                                        "
                                    >
                                        {t('navigation.profile')}
                                    </span>
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-1.5">
                        {navItems.map((item) => {
                            const Icon = item.icon;

                            const isActive = !pathname
                                ? false
                                : item.href === '/'
                                  ? pathname === '/'
                                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className="
                                            relative
                                            flex
                                            items-center
                                            gap-3.5
                                            px-4
                                            py-3
                                            rounded-2xl
                                            text-sm
                                            font-medium
                                            transition-all
                                            duration-300
                                            hover:translate-x-1
                                        "
                                    style={{
                                        color: isActive ? 'var(--them)' : 'var(--foreground)',
                                    }}
                                >
                                    {Icon && <Icon size={20} />}
                                    <span>{t(item.title)}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>
        </>
    );
}
