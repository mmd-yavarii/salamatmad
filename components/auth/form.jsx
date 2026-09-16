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

    const inputClass = (field) => (errors[field] ? 'app-input app-input-error' : 'app-input');

    const iconClass = 'app-input-icon';

    return (
        <div className="mx-auto w-full max-w-md pt-10">
            {/* Header */}
            <div className="mb-7 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{t(`${isSignUp ? 'signup' : 'login'}.title`)}</h1>

                <p className="mt-3 text-sm leading-6 text-foreground/50">{t(`${isSignUp ? 'signup' : 'login'}.description`)}</p>
            </div>

            {/* Card */}
            <div className="glass-card">
                {/* Decorative Glow */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-48
                        w-48
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
                        h-48
                        w-48
                        rounded-full
                        bg-sky-500/10
                        blur-3xl
                    "
                />

                {/* Language */}
                <div className="relative mb-6 flex justify-end">
                    <LanguageSwitcher />
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="relative space-y-5" dir="rtl" noValidate>
                    {/* General Error */}
                    {errors.general && (
                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-2xl
                                border
                                border-red-500/20
                                bg-red-500/[0.07]
                                p-3.5
                                text-sm
                                leading-6
                                text-red-400
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-7
                                    w-7
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-red-500/10
                                    font-bold
                                    text-red-400
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
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-foreground/80
                                "
                            >
                                {t('signup.fields.name.label')}
                            </label>

                            <div className="app-input-wrapper">
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

                            {errors.name && <p className="mr-1 mt-2 text-xs text-red-400">{errors.name}</p>}
                        </div>
                    )}

                    {/* Phone */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-foreground/80
                            "
                        >
                            {t(`${isSignUp ? 'signup' : 'login'}.fields.phone.label`)}
                        </label>

                        <div className="app-input-wrapper">
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

                        {errors.phone && <p className="mr-1 mt-2 text-xs text-red-400">{errors.phone}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-foreground/80
                            "
                        >
                            {t(`${isSignUp ? 'signup' : 'login'}.fields.password.label`)}
                        </label>

                        <div className="app-input-wrapper">
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
                                    flex
                                    h-8
                                    w-8
                                    -translate-y-1/2
                                    items-center
                                    justify-center
                                    rounded-xl
                                    text-foreground/35
                                    transition-all
                                    duration-200
                                    hover:bg-foreground/5
                                    hover:text-foreground
                                "
                                aria-label={t(`${isSignUp ? 'signup' : 'login'}.password.${showPassword ? 'hide' : 'show'}`)}
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>

                        {errors.password && <p className="mr-1 mt-2 text-xs text-red-400">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    {isSignUp && (
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-foreground/80
                                "
                            >
                                {t('signup.fields.confirmPassword.label')}
                            </label>

                            <div className="app-input-wrapper">
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
                                        flex
                                        h-8
                                        w-8
                                        -translate-y-1/2
                                        items-center
                                        justify-center
                                        rounded-xl
                                        text-foreground/35
                                        transition-all
                                        duration-200
                                        hover:bg-foreground/5
                                        hover:text-foreground
                                    "
                                    aria-label={t(`signup.password.${showConfirmPassword ? 'hide' : 'show'}`)}
                                >
                                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>

                            {errors.confirmPassword && <p className="mr-1 mt-2 text-xs text-red-400">{errors.confirmPassword}</p>}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            group
                            relative
                            mt-3
                            flex
                            h-12
                            w-full
                            items-center
                            justify-center
                            gap-2
                            overflow-hidden
                            rounded-2xl
                            bg-[#ff0073]
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-[#ff0073]/20
                            transition-all
                            duration-300
                            active:scale-[0.98]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {/* Button Shine */}
                        <span
                            className="
                                absolute
                                inset-0
                                -translate-x-full
                                bg-gradient-to-r
                                from-transparent
                                via-white/20
                                to-transparent
                                transition-transform
                                duration-700
                                group-hover:translate-x-full
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
                                            h-5
                                            w-5
                                            animate-spin
                                            rounded-full
                                            border-2
                                            border-white/30
                                            border-t-white
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
