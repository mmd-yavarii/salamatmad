import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fa from './language/fa/common.json';
import en from './language/en/common.json';

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

        interpolation: {
            escapeValue: false,
        },
    });
}

export default i18n;
