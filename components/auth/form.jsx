'use client';

import { Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { FiUser, FiPhone, FiLock, FiEye, FiEyeOff, FiUserPlus, FiLogIn } from 'react-icons/fi';

import LanguageSwitcher from '../LanguageSwitcher';

export default function AuthForm({
    mode = 'login',
    values,
    errors = {},
    loading = false,
    showPassword = false,
    showConfirmPassword = false,
    onChange,
    onSubmit,
    onTogglePassword,
    onToggleConfirmPassword,
}) {
    const { t } = useTranslation();

    const isSignUp = mode === 'signup';

    const inputClass = (field) => `
        w-full
        h-12
        pr-11
        pl-12
        rounded-2xl
        outline-none
        text-sm
        text-right
        text-foreground
        placeholder:text-right
        placeholder:text-foreground/35
        backdrop-blur-xl
        border
        transition-all
        duration-300

        ${
            errors[field]
                ? `
                    border-red-500/60
                    bg-red-500/[0.04]
                    focus:border-red-400
                    focus:ring-4
                    focus:ring-red-500/10
                `
                : `
                    border-[var(--button-border)]
                    bg-[var(--button-background)]
                    hover:border-cyan-400/30
                    focus:border-cyan-400/70
                    focus:ring-4
                    focus:ring-cyan-400/10
                `
        }
`;

    const iconClass = `
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-foreground/35
        pointer-events-none
        transition-colors
        duration-300
    `;

    return (
        <div className="w-full max-w-md mx-auto pt-10">
            {/* Header */}
            <div className="text-center mb-7">
                <h1
                    className="
                        text-2xl
                        sm:text-3xl
                        font-bold
                        tracking-tight
                        text-foreground
                    "
                >
                    {t(`${isSignUp ? 'signup' : 'login'}.title`)}
                </h1>

                <p
                    className="
                        mt-3
                        text-sm
                        leading-6
                        text-foreground/50
                    "
                >
                    {t(`${isSignUp ? 'signup' : 'login'}.description`)}
                </p>
            </div>

            {/* Card */}
            <div className="glass-card">
                {/* Decorative Glow */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        -top-24
                        -right-24
                        w-48
                        h-48
                        rounded-full
                        bg-cyan-400/10
                        blur-3xl
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-24
                        -left-24
                        w-48
                        h-48
                        rounded-full
                        bg-sky-500/10
                        blur-3xl
                    "
                />

                {/* Language */}
                <div className="relative flex justify-end mb-6">
                    <LanguageSwitcher />
                </div>

                {/* Form */}
                {/* <form onSubmit={onSubmit} className="relative space-y-5" noValidate> */}
                <form onSubmit={onSubmit} className="relative space-y-5" dir="rtl" noValidate>
                    {/* General Error */}
                    {errors.general && (
                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                p-3.5
                                rounded-2xl
                                text-sm
                                leading-6
                                text-red-400
                                bg-red-500/[0.07]
                                border
                                border-red-500/20
                            "
                        >
                            <span
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    w-7
                                    h-7
                                    shrink-0
                                    rounded-full
                                    bg-red-500/10
                                    text-red-400
                                    font-bold
                                "
                            >
                                !
                            </span>

                            <span>{errors.general}</span>
                        </div>
                    )}

                    {/* Name */}
                    {isSignUp && (
                        <div>
                            <label
                                htmlFor="name"
                                className="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-foreground/80
                                "
                            >
                                {t('signup.fields.name.label')}
                            </label>

                            <div className="relative">
                                <FiUser size={18} className={iconClass} />

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={values.name || ''}
                                    onChange={onChange}
                                    placeholder={t('signup.fields.name.placeholder')}
                                    className={inputClass('name')}
                                    autoComplete="name"
                                />
                            </div>

                            {errors.name && (
                                <p
                                    className="
                                        mt-2
                                        mr-1
                                        text-xs
                                        text-red-400
                                    "
                                >
                                    {errors.name}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Phone */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="
                                block
                                mb-2
                                text-sm
                                font-medium
                                text-foreground/80
                            "
                        >
                            {t(`${isSignUp ? 'signup' : 'login'}.fields.phone.label`)}
                        </label>

                        <div className="relative">
                            <FiPhone size={18} className={iconClass} />

                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={values.phone || ''}
                                onChange={onChange}
                                placeholder={t(`${isSignUp ? 'signup' : 'login'}.fields.phone.placeholder`)}
                                className={inputClass('phone')}
                                autoComplete="tel"
                                inputMode="tel"
                                dir="ltr"
                            />
                        </div>

                        {errors.phone && (
                            <p
                                className="
                                    mt-2
                                    mr-1
                                    text-xs
                                    text-red-400
                                "
                            >
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="
                                block
                                mb-2
                                text-sm
                                font-medium
                                text-foreground/80
                            "
                        >
                            {t(`${isSignUp ? 'signup' : 'login'}.fields.password.label`)}
                        </label>

                        <div className="relative">
                            <FiLock size={18} className={iconClass} />

                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password || ''}
                                onChange={onChange}
                                placeholder={t(`${isSignUp ? 'signup' : 'login'}.fields.password.placeholder`)}
                                className={inputClass('password')}
                                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                                dir="ltr"
                            />

                            <button
                                type="button"
                                onClick={onTogglePassword}
                                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    flex
                                    items-center
                                    justify-center
                                    w-8
                                    h-8
                                    rounded-xl
                                    text-foreground/35
                                    hover:text-foreground
                                    hover:bg-foreground/5
                                    transition-all
                                    duration-200
                                "
                                aria-label={t(`${isSignUp ? 'signup' : 'login'}.password.${showPassword ? 'hide' : 'show'}`)}
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>

                        {errors.password && (
                            <p
                                className="
                                    mt-2
                                    mr-1
                                    text-xs
                                    text-red-400
                                "
                            >
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    {isSignUp && (
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-foreground/80
                                "
                            >
                                {t('signup.fields.confirmPassword.label')}
                            </label>

                            <div className="relative">
                                <FiLock size={18} className={iconClass} />

                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={values.confirmPassword || ''}
                                    onChange={onChange}
                                    placeholder={t('signup.fields.confirmPassword.placeholder')}
                                    className={inputClass('confirmPassword')}
                                    autoComplete="new-password"
                                    dir="ltr"
                                />

                                <button
                                    type="button"
                                    onClick={onToggleConfirmPassword}
                                    className="
                                        absolute
                                        left-3
                                        top-1/2
                                        -translate-y-1/2
                                        flex
                                        items-center
                                        justify-center
                                        w-8
                                        h-8
                                        rounded-xl
                                        text-foreground/35
                                        hover:text-foreground
                                        hover:bg-foreground/5
                                        transition-all
                                        duration-200
                                    "
                                    aria-label={t(`signup.password.${showConfirmPassword ? 'hide' : 'show'}`)}
                                >
                                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>

                            {errors.confirmPassword && (
                                <p
                                    className="
                                        mt-2
                                        mr-1
                                        text-xs
                                        text-red-400
                                    "
                                >
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            group
                            relative
                            overflow-hidden
                            w-full
                            h-12
                            mt-3
                            rounded-2xl
                            flex
                            items-center
                            justify-center
                            gap-2
                            font-semibold
                            text-white
                            bg-[#ff0073]
                            active:scale-[0.98]
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            transition-all
                            duration-300
                            shadow-lg
                            shadow-[#ff0073]/20
                        "
                    >
                        {/* Button shine */}
                        <span
                            className="
                                absolute
                                inset-0
                                -translate-x-full
                                group-hover:translate-x-full
                                transition-transform
                                duration-700
                                bg-gradient-to-r
                                from-transparent
                                via-white/20
                                to-transparent
                            "
                        />

                        <span
                            className="
                                relative
                                flex
                                items-center
                                justify-center
                                gap-2
                            "
                        >
                            {loading ? (
                                <>
                                    <span
                                        className="
                                            w-5
                                            h-5
                                            rounded-full
                                            border-2
                                            border-white/30
                                            border-t-white
                                            animate-spin
                                        "
                                    />

                                    <span>{t(`${isSignUp ? 'signup' : 'login'}.button.loading`)}</span>
                                </>
                            ) : (
                                <>
                                    {isSignUp ? <FiUserPlus size={18} /> : <FiLogIn size={18} />}

                                    <span>{t(`${isSignUp ? 'signup' : 'login'}.button.submit`)}</span>
                                </>
                            )}
                        </span>
                    </button>

                    {/* Switch Auth */}
                    <p
                        className="
                            pt-3
                            text-center
                            text-sm
                            text-foreground/50
                        "
                    >
                        {t(`${isSignUp ? 'signup' : 'login'}.switch.text`)}

                        <Link
                            href={isSignUp ? '/auth/login' : '/auth/sign-up'}
                            className="
                                mr-1.5
                                font-medium
                                text-[#ff0073]
                                transition-colors
                            "
                        >
                            {t(`${isSignUp ? 'signup' : 'login'}.switch.link`)}
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
