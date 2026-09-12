'use client';

import { useState } from 'react';

import AuthForm from '@/components/auth/form';

export default function Login() {
    const [values, setValues] = useState({
        phone: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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

        console.log('Login:', values);

        // API ورود بعداً اینجا قرار می‌گیرد
    };

    return (
        <main className="flex justify-center px-6 pt-16">
            <AuthForm
                mode="login"
                values={values}
                errors={errors}
                loading={loading}
                showPassword={showPassword}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onTogglePassword={() => setShowPassword((prev) => !prev)}
            />
        </main>
    );
}
