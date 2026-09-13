'use client';
import { useAuth } from '@/context/AuthContext';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import AuthForm from '@/components/auth/form';

export default function Signup() {
    const router = useRouter();
    const auth = useAuth();

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

    // input change handler
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

    // signup handler
    const handleSubmit = async (event) => {
        event.preventDefault();

        setErrors({});

        if (values.password !== values.confirmPassword) {
            setErrors({
                confirmPassword: 'Passwords do not match',
            });
            return;
        }

        try {
            setLoading(true);

            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: values.name,
                    phone: values.phone,
                    password: values.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors({ general: data.message || 'Something went wrong' });
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
        <main className="flex items-start justify-center px-6 ">
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
