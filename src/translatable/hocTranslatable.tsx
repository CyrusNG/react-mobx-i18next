import React from 'react'
import { withTranslation } from 'react-i18next'
import type { NamespaceOption, TranslatableOptions, InjectedTransProps } from '../types'

/**
* HOC: Functional component uses hocTranslatable('ns')(MyComp)
* Props will be injected with { t, i18n, ready }
*/
export const hocTranslatable = (ns?: NamespaceOption, options?: TranslatableOptions) =>
  <P extends object>(Component: React.ComponentType<P & InjectedTransProps>) => {
    const Wrapped: React.FC<P & InjectedTransProps> = (props) => <Component {...props} />
    Wrapped.displayName = `hocTranslatable(${Component.displayName || Component.name || 'Component'})`
    return withTranslation(ns, options)(Wrapped)
  }