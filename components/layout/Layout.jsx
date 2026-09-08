'use client';

import { useTranslation } from 'react-i18next';
import GlassBottomNav from './GlassBottomNav';
import Header from './Header';

import { LuShield, LuUserRound, LuFileText, LuShoppingCart, LuHouse } from 'react-icons/lu';

import BackgroundEffects from './background';

function Layout({ children }) {
    const { t } = useTranslation();

    const navItems = [
        {
            title: t('navigation.admin'),
            icon: LuShield,
            activeIcon: LuShield,
            href: '/admin',
        },
        {
            title: t('navigation.profile'),
            icon: LuUserRound,
            activeIcon: LuUserRound,
            href: '/profile',
        },
        {
            title: t('navigation.articles'),
            icon: LuFileText,
            activeIcon: LuFileText,
            href: '/articles',
        },
        {
            title: t('navigation.cart'),
            icon: LuShoppingCart,
            activeIcon: LuShoppingCart,
            href: '/cart',
            badge: 2,
        },
        {
            title: t('navigation.home'),
            icon: LuHouse,
            activeIcon: LuHouse,
            href: '/',
        },
    ];

    return (
        <div
            className="relative min-h-screen overflow-hidden"
            style={{
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
            }}
        >
            <BackgroundEffects />

            <div className="relative z-10">
                <Header />

                <main className="safe-bottom">{children}</main>

                <GlassBottomNav navItems={navItems} />
            </div>
        </div>
    );
}

export default Layout;
