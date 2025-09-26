import { withTranslation, I18nContext } from 'react-i18next'
import type { NamespaceOption, TranslatableOptions } from '../types'
import type { ComponentType } from 'react'

/**
* Class component decorator, directly use this.context.t()
*/
export function decoratorTranslatable<P extends object = {}>(
  ns?: NamespaceOption,
  options?: TranslatableOptions
) {
  return function (Target: ComponentType<P>) {
    // Directly attach contextType to the class component
    (Target as any).contextType = I18nContext

    // Wrap with withTranslation
    return withTranslation(ns, options)(Target)
  }
}