'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        token: null,
        info: {
            name: '',
            phone: '',
        },
    });

    // get token from cookie after load
    useEffect(() => {
        const cookie = document.cookie.split('; ').find((row) => row.startsWith('token='));

        if (cookie) {
            const value = cookie.split('=').slice(1).join('=');

            try {
                const data = JSON.parse(decodeURIComponent(value));

                setAuth(data);
            } catch (error) {
                console.log(error);

                setAuth({
                    token: null,
                    info: {
                        name: '',
                        phone: '',
                    },
                });
            }
        }
    }, []);

    // save token
    function setToken(data) {
        setAuth(data);

        if (data) {
            document.cookie = `token=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=604800; SameSite=Lax`;
        } else {
            document.cookie = 'token=; path=/; max-age=0; SameSite=Lax';
        }
    }

    // logout
    function logout() {
        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setToken,
                logout,
                isAuthenticated: Boolean(auth?.token),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
}
