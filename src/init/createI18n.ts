import i18next, { i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'

let i18nInstance: i18n | null = null

export interface CreateI18nOptions {
  lang?: string
  fallbackLang?: string | string[]
  resources?: any
  debug?: boolean
}

/** Initialize a singleton i18n instance for the app. */
export async function initI18n(opts: CreateI18nOptions = {}): Promise<i18n> {
  if (i18nInstance) return i18nInstance

  const {
    lang = 'en',
    fallbackLang = lang,
    resources,
    debug = false,
  } = opts

  const instance = i18next.createInstance()

  await instance
    .use(initReactI18next)
    .init({
      lng: lang,
      fallbackLng: fallbackLang,
      resources,
      interpolation: { escapeValue: false },
      debug,
      returnNull: false,
    })

  i18nInstance = instance
  return i18nInstance
}

/** Return the initialized singleton instance. */
export function getI18n(): i18n {
  if (!i18nInstance) {
    throw new Error('i18n is not initialized. Call initI18n() first.')
  }

  return i18nInstance
}

