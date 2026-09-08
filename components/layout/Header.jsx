'use client';

import Image from 'next/image';

import { usePathname, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { FiArrowLeft, FiMoon, FiSun, FiMoreHorizontal } from 'react-icons/fi';

import { IoLanguageSharp } from 'react-icons/io5';

import { Menu, MenuItem } from '@mui/material';

import '@/i18n';

const languages = [
    {
        code: 'fa',
        name: 'فارسی',
        flag: '🇮🇷',
    },
    {
        code: 'en',
        name: 'English',
        flag: '🇺🇸',
    },
];

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const { i18n } = useTranslation();

    const [darkMode, setDarkMode] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    // Language menu
    const [anchorEl, setAnchorEl] = useState(null);

    // More menu
    const [moreAnchorEl, setMoreAnchorEl] = useState(null);

    const isHome = pathname === '/';

    const languageMenuOpen = Boolean(anchorEl);
    const moreMenuOpen = Boolean(moreAnchorEl);

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
    // Language
    // =========================

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'fa';

        const language = languages.find((item) => item.code === savedLanguage);

        if (language) {
            setSelectedLanguage(language);
        }

        if (i18n.language !== savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    const handleLanguage = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeLanguage = () => {
        setAnchorEl(null);
    };

    const changeLanguage = (language) => {
        setSelectedLanguage(language);

        localStorage.setItem('language', language.code);

        i18n.changeLanguage(language.code);

        closeLanguage();

        window.location.reload();
    };

    // =========================
    // More Menu
    // =========================

    const handleMore = (event) => {
        setMoreAnchorEl(event.currentTarget);
    };

    const closeMore = () => {
        setMoreAnchorEl(null);
    };

    const navigateTo = (path) => {
        closeMore();
        router.push(path);
    };

    return (
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
            style={{ direction: 'ltr' }}
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
                        <Image src="/logo.png" alt="logo" width={115} height={35} className="object-contain" priority />
                    ) : (
                        <button
                            onClick={() => router.back()}
                            aria-label="Go back"
                            className="
                                flex
                                items-center
                                justify-center
                                text-foreground
                                hover:text-foreground
                                transition
                                duration-300
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

                    <button
                        onClick={handleLanguage}
                        aria-label="Select language"
                        className="
                            group
                            flex
                            items-center
                            gap-2
                            h-10
                            px-3
                            rounded-2xl
                            text-foreground
                            backdrop-blur-xl
                            transition-all
                            duration-300
                        "
                        style={{
                            backgroundColor: 'var(--button-background)',
                            border: '1px solid var(--button-border)',
                        }}
                    >
                        <IoLanguageSharp
                            size={20}
                            className="
                                text-foreground
                                group-hover:scale-110
                                transition
                            "
                        />

                        {/* <span className="text-base">{selectedLanguage.flag}</span> */}

                        <span className="text-sm font-medium">{selectedLanguage.code}</span>
                    </button>

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
                        "
                        style={{
                            backgroundColor: 'var(--button-background)',
                            border: '1px solid var(--button-border)',
                        }}
                    >
                        {darkMode ? <FiSun size={21} className="text-foreground" /> : <FiMoon size={21} className="text-foreground" />}
                    </button>

                    {/* More */}

                    <button
                        onClick={handleMore}
                        aria-label="More"
                        aria-haspopup="true"
                        aria-expanded={moreMenuOpen}
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
                        "
                        style={{
                            backgroundColor: 'var(--button-background)',
                            border: '1px solid var(--button-border)',
                        }}
                    >
                        <FiMoreHorizontal size={22} />
                    </button>
                </div>
            </div>

            {/* =========================
                Language Menu
            ========================= */}

            <Menu
                anchorEl={anchorEl}
                open={languageMenuOpen}
                onClose={closeLanguage}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            background: 'var(--menu-background)',
                            backdropFilter: 'blur(24px)',
                            borderRadius: '18px',
                            border: '1px solid var(--button-border)',
                            color: 'var(--foreground)',
                            boxShadow: '0 15px 40px var(--header-shadow)',
                            overflow: 'hidden',
                        },
                    },
                }}
            >
                {languages.map((language) => (
                    <MenuItem
                        key={language.code}
                        onClick={() => changeLanguage(language)}
                        sx={{
                            color: 'var(--foreground)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            minWidth: 150,
                            padding: '10px 14px',

                            '&:hover': {
                                background: 'var(--menu-hover)',
                            },
                        }}
                    >
                        <span className="text-lg">{language.flag}</span>

                        <span>{language.name}</span>
                    </MenuItem>
                ))}
            </Menu>

            {/* =========================
                More Menu
            ========================= */}

            <Menu
                anchorEl={moreAnchorEl}
                open={moreMenuOpen}
                onClose={closeMore}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            background: 'var(--menu-background)',
                            backdropFilter: 'blur(24px)',
                            borderRadius: '18px',
                            border: '1px solid var(--button-border)',
                            color: 'var(--foreground)',
                            boxShadow: '0 15px 40px var(--header-shadow)',
                            overflow: 'hidden',
                            minWidth: 160,
                        },
                    },
                }}
            >
                <MenuItem
                    onClick={() => navigateTo('/about')}
                    sx={{
                        color: 'var(--foreground)',
                        padding: '11px 16px',

                        '&:hover': {
                            background: 'var(--menu-hover)',
                        },
                    }}
                >
                    درباره ما
                </MenuItem>

                <MenuItem
                    onClick={() => navigateTo('/contact')}
                    sx={{
                        color: 'var(--foreground)',
                        padding: '11px 16px',

                        '&:hover': {
                            background: 'var(--menu-hover)',
                        },
                    }}
                >
                    تماس با ما
                </MenuItem>
            </Menu>
        </header>
    );
}
