import '@/i18n';
import '@/styles/globals.css';

import Layout from '@/components/layout/Layout';

import muiTheme from '@/muiTheme';

import { ThemeProvider } from '@emotion/react';

import QueryProvider from '@/components/providers/QueryProvider';
import { AuthProvider } from '@/context/AuthContext';

export default function App({ Component, pageProps }) {
    return (
        <QueryProvider>
            <AuthProvider>
                <ThemeProvider theme={muiTheme}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </AuthProvider>
        </QueryProvider>
    );
}
