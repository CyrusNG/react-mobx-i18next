import i18next, { i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'

export interface CreateI18nOptions {
  lang?: string
  fallbackLang?: string | string[]
  resources?: any
  debug?: boolean
}

/** Create and init a configured i18n instance. */
export function createI18n(opts: CreateI18nOptions = {}): Promise<i18n> {
  const {
    lang = 'en',
    fallbackLang = lang,
    resources,
    debug = false,
  } = opts

  const instance = i18next.createInstance()

  return instance
    .use(initReactI18next)
    .init({
      lng: lang,
      fallbackLng: fallbackLang,
      resources,
      interpolation: { escapeValue: false },
      debug,
      returnNull: false,
    }).then(() => instance)

  // return instance
}