import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="fa">
            <Head>
                <link rel="icon" href="/logo.png" type="image/png" />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function () {
                                const theme = localStorage.getItem('theme');

                                if (theme === 'light') {
                                    document.documentElement.classList.remove('dark');
                                } else {
                                    document.documentElement.classList.add('dark');
                                }
                            })();
                        `,
                    }}
                />
            </Head>

            <body className="antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
