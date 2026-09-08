import '@/i18n';
import '@/styles/globals.css';

import Layout from '@/components/layout/Layout';
import muiTheme from '@/muiTheme';
import { ThemeProvider } from '@emotion/react';

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider theme={muiTheme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}
