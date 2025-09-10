import { useTranslation, UseTranslationResponse } from 'react-i18next'
import { useMemo } from 'react'
import type { NamespaceOption, TranslatableOptions } from '../types'

export interface TranslatableHookResult {
  t: (key: string, options?: any) => string
  i18n: any
  ready: boolean
}

export function useTranslatable(ns?: NamespaceOption, options?: TranslatableOptions): TranslatableHookResult {
  const { i18n, t, ready } = useTranslation(ns, { useSuspense: false, ...options })
  // expose identical shape to react-mobx-i18n expectations (t, i18n, ready)
  return useMemo(() => ({ t, i18n, ready }), [t, i18n, ready])
}