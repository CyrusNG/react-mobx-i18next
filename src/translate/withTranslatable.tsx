import { useTranslatable } from '../hooks/useTranslatable'
import type { NamespaceOption, TranslatableOptions } from '../types'

export type InjectedTransProps = {
  t: (key: string, options?: any) => string
  i18n: any
  ready: boolean
}

export interface WithTranslatableOptions extends TranslatableOptions { }

/**
* HOC for function components — preferred in mobx-react-lite world.
* Usage: export default withTranslatable('common')(observer(MyComp))
*/
export const withTranslatable = (ns?: NamespaceOption, options?: WithTranslatableOptions) =>
  <P extends object>(Component: React.ComponentType<P & InjectedTransProps>) => {
    const Wrapped: React.FC<P> = (props) => {
      const { t, i18n, ready } = useTranslatable(ns, options)
      return <Component {...props} t={t} i18n={i18n} ready={ready} />
    }
    Wrapped.displayName = `withTranslatable(${Component.displayName || Component.name || 'Component'})`
    return Wrapped
  }