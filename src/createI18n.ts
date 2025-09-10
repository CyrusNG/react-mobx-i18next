import i18next, { i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'

export interface CreateI18nOptions {
  lng?: string
  fallbackLng?: string | string[]
  resources?: any
  debug?: boolean
}

/** Create and init a configured i18n instance. */
export function createI18n(opts: CreateI18nOptions = {}): i18n {
  const {
    lng = 'en',
    fallbackLng = 'en',
    resources,
    debug = false,
  } = opts

  const instance = i18next.createInstance()

  instance
    .use(initReactI18next)
    .init({
      lng,
      fallbackLng,
      resources,
      interpolation: { escapeValue: false },
      debug,
      returnNull: false,
    })

  return instance
}