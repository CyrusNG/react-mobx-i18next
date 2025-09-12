import { observable } from 'mobx'
import type { i18n } from 'i18next'

/**
* MobX store for current language. Changing locale will call i18next.changeLanguage.
*/
export class I18nStore {
  @observable locale: string
  @observable private i18n: i18n

  constructor(i18n: i18n) {
    this.i18n = i18n
    this.locale = i18n.language || 'en'
  }

  setLocale = async (lang: string) => {
    if (this.locale === lang) return this.locale = lang
    await this.i18n.changeLanguage(lang)
  }
}