'use client';

import { useState } from 'react';

import AuthForm from '@/components/auth/form';

export default function Signup() {
    const [values, setValues] = useState({
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: '',
            general: '',
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('Sign Up:', values);

        // API ثبت‌نام بعداً اینجا
    };

    return (
        <main className="flex items-start justify-center p-6 pt-16">
            <AuthForm
                mode="signup"
                values={values}
                errors={errors}
                loading={loading}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onTogglePassword={() => setShowPassword((prev) => !prev)}
                onToggleConfirmPassword={() => setShowConfirmPassword((prev) => !prev)}
            />
        </main>
    );
}
