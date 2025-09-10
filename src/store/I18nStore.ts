import { makeAutoObservable } from 'mobx'
import type { i18n } from 'i18next'

/**
* MobX store for current language. Changing locale will call i18next.changeLanguage.
*/
export class I18nStore {
  locale: string
  private i18n: i18n

  constructor(i18n: i18n) {
    this.i18n = i18n
    this.locale = i18n.language || 'en'
    makeAutoObservable(this)
  }

  setLocale = async (lng: string) => {
    if (this.locale === lng) return
    this.locale = lng
    await this.i18n.changeLanguage(lng)
  }
}