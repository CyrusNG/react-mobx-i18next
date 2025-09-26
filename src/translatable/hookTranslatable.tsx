import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import type { NamespaceOption, TranslatableOptions, TranslatableHookResult } from '../types'

/**
* Hook: Function component uses const { t } = hookTranslatable('ns')
*/
export function hookTranslatable(ns?: NamespaceOption, options?: TranslatableOptions): TranslatableHookResult {
  const { t, i18n, ready } = useTranslation(ns, { useSuspense: false, ...options })
  return useMemo(() => ({ t, i18n, ready }), [t, i18n, ready])
}
