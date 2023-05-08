import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en, ar} from './index';

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18n;
