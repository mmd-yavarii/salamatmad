'use client';

import Image from 'next/image';

import { usePathname, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { FiArrowLeft, FiMoon, FiSun, FiMenu } from 'react-icons/fi';

import LanguageSwitcher from '@/components/LanguageSwitcher';

import SideMenu from './SideMenu';

export default function Header({ navItems = [] }) {
    const pathname = usePathname();
    const router = useRouter();

    const [darkMode, setDarkMode] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    const isHome = pathname === '/';

    // =========================
    // Theme
    // =========================

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light') {
            setDarkMode(false);

            document.documentElement.classList.remove('dark');
        } else {
            setDarkMode(true);

            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        setDarkMode((prev) => {
            const newDarkMode = !prev;

            const newTheme = newDarkMode ? 'dark' : 'light';

            localStorage.setItem('theme', newTheme);

            document.documentElement.classList.toggle('dark', newDarkMode);

            return newDarkMode;
        });
    };

    // =========================
    // Render
    // =========================

    return (
        <>
            <header
                className="
                    fixed
                    top-0
                    left-0
                    right-0
                    z-50
                    px-5
                    pt-4
                "
                style={{
                    direction: 'ltr',
                }}
            >
                <div
                    className="
                        h-16
                        flex
                        items-center
                        justify-between
                        px-5
                        rounded-3xl
                        backdrop-blur-2xl
                        border
                        transition-all
                        duration-300
                    "
                    style={{
                        backgroundColor: 'var(--header-background)',

                        borderColor: 'var(--header-border)',

                        boxShadow: '0 10px 35px var(--header-shadow)',
                    }}
                >
                    {/* =========================
                        Left
                    ========================= */}

                    <div className="flex items-center">
                        {isHome ? (
                            <Image src="/logo.png" alt="logo" width={45} height={45} className="object-contain" priority />
                        ) : (
                            <button
                                onClick={() => router.back()}
                                aria-label="Go back"
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    text-foreground
                                    transition-all
                                    duration-300
                                    hover:scale-110
                                "
                            >
                                <FiArrowLeft size={25} />
                            </button>
                        )}
                    </div>

                    {/* =========================
                        Right
                    ========================= */}

                    <div className="flex items-center gap-3">
                        {/* Language */}

                        <LanguageSwitcher />

                        {/* Theme */}

                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="
                                flex
                                items-center
                                justify-center
                                w-10
                                h-10
                                rounded-2xl
                                text-foreground
                                transition-all
                                duration-300
                                hover:scale-105
                            "
                            style={{
                                backgroundColor: 'var(--button-background)',

                                border: '1px solid var(--button-border)',
                            }}
                        >
                            {darkMode ? <FiSun size={21} className="text-foreground" /> : <FiMoon size={21} className="text-foreground" />}
                        </button>

                        {/* Hamburger */}

                        <button
                            onClick={() => setMenuOpen(true)}
                            aria-label="Open menu"
                            aria-expanded={menuOpen}
                            className="
                                flex
                                items-center
                                justify-center
                                w-10
                                h-10
                                rounded-2xl
                                text-foreground
                                transition-all
                                duration-300
                                hover:scale-105
                            "
                            style={{
                                backgroundColor: 'var(--button-background)',

                                border: '1px solid var(--button-border)',
                            }}
                        >
                            <FiMenu size={22} />
                        </button>
                    </div>
                </div>
            </header>

            {/* =========================
                Side Menu
            ========================= */}

            <SideMenu navItems={navItems} open={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
}
