import i18next from 'i18next';
import { en, vi } from '@i18n';
import { initReactI18next } from 'react-i18next';

export const LANGUAGE_CODE = ['en', 'vi'];

export enum Language {
  Vi = 'VI',
  En = 'EN',
}

const resources = {
  [LANGUAGE_CODE[0]]: {
    translation: en,
  },
  [LANGUAGE_CODE[1]]: {
    translation: vi,
  },
};

class AppLanguage {
  private language_code = LANGUAGE_CODE[1];

  public getLanguageCode = () => {
    return this.language_code.toLowerCase();
  };

  public init(lang: Language) {
    this.language_code = lang;
    i18next.use(initReactI18next).init({
      compatibilityJSON: 'v3',
      resources,
      lng: lang.toLocaleLowerCase(),
      fallbackLng: LANGUAGE_CODE[1],
      interpolation: {
        escapeValue: false,
      },
    });
  }
}

export default new AppLanguage();
