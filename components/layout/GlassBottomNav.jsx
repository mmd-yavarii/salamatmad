'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

export default function GlassBottomNav({ navItems }) {
    const pathname = usePathname();

    return (
        <nav
            className="
                fixed
                bottom-5
                left-1/2
                -translate-x-1/2

                w-[92%]
                max-w-[430px]
                h-[88px]

                flex
                items-center
                justify-around

                px-3

                rounded-[32px]

                backdrop-blur-2xl

                border

                z-50

                transition-all
                duration-300
            "
            style={{
                backgroundColor: 'var(--header-background)',
                borderColor: 'var(--header-border)',
                boxShadow: '0 10px 35px var(--header-shadow)',
            }}
        >
            {navItems.map((item, index) => {
                const Icon = item.icon;

                const isActive = pathname === item.href;

                return (
                    <Link
                        key={index}
                        href={item.href}
                        className={`
                            relative

                            flex-1
                            h-full

                            flex
                            flex-col
                            items-center
                            justify-center

                            gap-2

                            text-xs
                            font-medium

                            transition-all
                            duration-300

                            ${isActive ? 'active-btn' : 'text-slate-400 hover:text-foreground'}
                        `}
                    >
                        {/* Active Glow */}

                        {isActive && (
                            <span
                                className="
                                    absolute
                                    top-3

                                    w-14
                                    h-14

                                    rounded-2xl

                                    bg-[var(--them)]
                                    opacity-20

                                    blur-xl
                                "
                            />
                        )}

                        {/* Icon */}

                        <div className="relative z-10">
                            <Icon
                                className={`
                                    text-[26px]

                                    transition-all
                                    duration-300

                                    ${isActive ? 'text-[var(--them)]' : 'text-current'}
                                `}
                            />

                            {/* Badge */}

                            {item.badge && (
                                <span className="absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center rounded-full bg-[var(--them)] text-white text-[11px] font-bold">
                                    {item.badge}
                                </span>
                            )}
                        </div>

                        {/* Title */}

                        <span className="relative z-10">{item.title}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
