import i18next, { i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'

let i18nInst: i18n | null = null

export interface CreateI18nOptions {
  lang?: string
  fallbackLang?: string | string[]
  resources?: any
  debug?: boolean
}

/** Initialize a singleton i18n instance for the app. */
export async function initI18n(opts: CreateI18nOptions = {}): Promise<i18n> {
  
  if (i18nInst) return i18nInst

  const {
    lang = 'en',
    fallbackLang = lang,
    resources,
    debug = false,
  } = opts

  i18nInst = i18next.createInstance()

  await i18nInst
    .use(initReactI18next)
    .init({
      lng: lang,
      fallbackLng: fallbackLang,
      resources,
      interpolation: { escapeValue: false },
      debug,
      returnNull: false,
    })

  return i18nInst
}

/** Return the initialized singleton instance. */
export function getI18n(): i18n {
  if (!i18nInst) {
    throw new Error('i18n is not initialized. Call initI18n() first.')
  }

  return i18nInst
}

