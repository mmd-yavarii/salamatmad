'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';

import AuthForm from '@/components/auth/form';

export default function Login() {
    const router = useRouter();

    const auth = useAuth();

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

        setErrors({});

        try {
            setLoading(true);

            const response = await fetch('/api/auth/login', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },

                credentials: 'include',

                body: JSON.stringify({
                    phone: values.phone,

                    password: values.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors({
                    general: data.message || 'Something went wrong',
                });

                return;
            }

            auth.setToken(data.data);
            router.replace('/profile');
        } catch (error) {
            console.log(error);

            setErrors({
                general: 'Server connection error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex justify-center px-6">
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
