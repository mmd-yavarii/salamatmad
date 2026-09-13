import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
    typography: {
        fontFamily: 'Vazirmatn, sans-serif',
    },

    direction: 'rtl',

    components: {
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'var(--background)',

                    color: 'var(--foreground)',
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: 'Vazirmatn, sans-serif',
                    borderRadius: '12px',
                    textTransform: 'none',
                },

                contained: {
                    backgroundColor: 'var(--them)',
                    color: '#fff',

                    '&:hover': {
                        backgroundColor: 'var(--them)',
                        filter: 'brightness(0.9)',
                    },
                },
                outlined: {
                    color: 'var(--them)',
                    borderColor: 'var(--them)',
                    '&:hover': {
                        borderColor: 'var(--them)',
                        backgroundColor: 'var(--button-background)',
                    },
                },
            },
        },

        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: '16px 24px',
                },
            },
        },
    },
});

export default muiTheme;
