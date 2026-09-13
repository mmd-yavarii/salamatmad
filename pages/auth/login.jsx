'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import AuthForm from '@/components/auth/form';

export default function Login() {
    const router = useRouter();
    const auth = useAuth();
    const { t } = useTranslation();

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
                    general: t(data.message) || t('authMessages.server.error'),
                });

                return;
            }

            auth.setToken(data.data);
            router.replace('/profile');
        } catch (error) {
            console.log(error);

            setErrors({
                general: t('authMessages.server.error'),
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
