import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { NamespaceOption, TranslatableOptions, TranslatableValue } from '../types'


/**
 * Translations Hook.
 * Usage in function component:
 * const Hello = observer((props) => {
 *   const { i18n, t, ready } = useTranslatable('common')
 *   return <h1>{ t('hello', { name: 'World' }) } </h1>
 * })
 */
export function hookTranslatable(ns?: NamespaceOption, options?: TranslatableOptions): TranslatableValue {
  // get translation related from react-i18next api
  const { i18n, t, ready } = useTranslation(ns, { useSuspense: false, ...options })
  // use memo to avoid unnecessary re-render
  return useMemo(() => ({ t, i18n, ready }), [t, i18n, ready])
}