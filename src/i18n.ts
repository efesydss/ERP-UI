import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'

export const initI18n = () => {
  i18n
    .use(initReactI18next)
    .use(HttpBackend)
    .init({
      lng: 'tr',
      fallbackLng: 'tr',
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }
    })
}
