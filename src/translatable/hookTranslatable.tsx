import { useMemo, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TranslatableContext } from '../context/translatableContext'
import type { NamespaceOption, TranslatableOptions, TranslatableInContext } from '../types'


/**
 * Hook for initializing translations.
 * Usage in function component:
 * const Hello = observer(() => {
 *   const { context } = useTranslatable('common')
 *   return <h1>{ context.t('hello', { name: 'World' }) } </h1>
 * })
 */
export function hookTranslatable(ns?: NamespaceOption, options?: TranslatableOptions): TranslatableInContext {
  const { i18n, t, ready } = useTranslation(ns, { useSuspense: false, ...options })
  const value = useMemo(() => ({ t, i18n, ready }), [t, i18n, ready])
  // const outer = useContext(TranslatableContext)
  return { context: value }
}