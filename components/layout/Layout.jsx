'use client';

import { usePathname } from 'next/navigation';

import Header from './Header';
import BackgroundEffects from './background';

import { LuShield, LuUserRound, LuFileText, LuShoppingCart, LuHouse, LuCircleHelp, LuHeadset, LuCode } from 'react-icons/lu';
import { useRouter } from 'next/router';

function Layout({ children }) {
    const pathname = usePathname();
    const router = useRouter();

    const withoutLayout = ['/auth/login', '/auth/sign-up'];

    const isWithoutLayout = withoutLayout.includes(pathname);

    const navItems = [
        {
            title: 'navigation.home',
            icon: LuHouse,
            activeIcon: LuHouse,
            href: '/',
        },
        {
            title: 'navigation.cart',
            icon: LuShoppingCart,
            activeIcon: LuShoppingCart,
            href: '/cart',
            badge: 2,
        },
        {
            title: 'navigation.articles',
            icon: LuFileText,
            activeIcon: LuFileText,
            href: '/articles',
        },
        {
            title: 'navigation.support',
            icon: LuHeadset,
            activeIcon: LuHeadset,
            href: '/support',
        },
        {
            title: 'navigation.about',
            icon: LuCircleHelp,
            activeIcon: LuCircleHelp,
            href: '/about',
        },
        {
            title: 'navigation.developer',
            icon: LuCode,
            activeIcon: LuCode,
            href: `https://project-consultation.vercel.app?url=salamatmad`,
        },
    ];

    return (
        <div
            className="
                relative
                min-h-screen
                overflow-hidden
            "
            style={{
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
            }}
        >
            <BackgroundEffects />

            <div className="relative z-10">
                {!isWithoutLayout && <Header navItems={navItems} />}

                <main
                    className={`
                        safe-bottom
                        ${isWithoutLayout ? '' : 'pt-25'}
                    `}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;
