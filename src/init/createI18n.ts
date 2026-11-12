import i18next, { i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'

export let I18n: Readonly<i18n>

export interface CreateI18nOptions {
  lang?: string
  fallbackLang?: string | string[]
  resources?: any
  debug?: boolean
}

/** Initialize a singleton i18n instance for the app. */
export async function initI18n(opts: CreateI18nOptions = {}): Promise<i18n> {
  
  if (I18n) return I18n

  const {
    lang = 'en',
    fallbackLang = lang,
    resources,
    debug = false,
  } = opts

  I18n = i18next.createInstance()

  await I18n
    .use(initReactI18next)
    .init({
      lng: lang,
      fallbackLng: fallbackLang,
      resources,
      interpolation: { escapeValue: false },
      debug,
      returnNull: false,
    })

  return I18n
}


