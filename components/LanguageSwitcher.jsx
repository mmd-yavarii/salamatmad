'use client';

import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

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

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    const [anchorEl, setAnchorEl] = useState(null);

    const languageMenuOpen = Boolean(anchorEl);

    // =========================
    // Language
    // =========================

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'fa';

        const language = languages.find((item) => item.code === savedLanguage) || languages[0];

        setSelectedLanguage(language);

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

    return (
        <>
            {/* Language Button */}

            <button
                onClick={handleLanguage}
                aria-label="Select language"
                aria-haspopup="true"
                aria-expanded={languageMenuOpen}
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

                <span className="text-sm font-medium">{selectedLanguage.code}</span>
            </button>

            {/* Language Menu */}

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
        </>
    );
}
