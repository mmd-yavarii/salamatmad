import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fa from './language/fa/fa';
import en from './language/en/en';

const resources = {
    fa: {
        translation: fa,
    },
    en: {
        translation: en,
    },
};

if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
        resources,
        lng: 'fa',
        fallbackLng: 'fa',
        supportedLngs: ['fa', 'en'],

        interpolation: {
            escapeValue: false,
        },

        react: {
            useSuspense: false,
        },
    });
}

export default i18n;
