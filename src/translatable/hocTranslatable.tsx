import React from 'react'
import { hookTranslatable } from './hookTranslatable'
import { TranslatableContext } from '../context/translatableContext'
import type { NamespaceOption, TranslatableOptions } from '../types'


/*
 * Class HOC for translations.

 * Usage for Class Component:
 *   class App extends React.Component {
 *     static contextType = TranslatableContext
 *     render() {
 *       return <div>{this.context.t('hello')}</div>
 *     }
 *   }
 *  export default observer(withTranslatable('common')(App))
 * 
 * Usage for Function Component:
 * const App: React.FC = (props) => {
 *   const  { i18n, t, ready } = useContext(TranslatableContext)
 *   return <div>{t('hello')}</div>
 * }
 * export default observer(withTranslatable('common')(App))
 */
export const hocTranslatable = (ns?: NamespaceOption, options?: TranslatableOptions) =>
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
    // HOC that inject translatable context
    const Wrapped: React.FC<P> = (props) => {
      return (
        <TranslatableContext.Provider value={hookTranslatable(ns, options)}>
          <Component {...props} />
        </TranslatableContext.Provider>
      )
    }
    // rename display name for debug
    Wrapped.displayName = `hocTranslatable(${Component.displayName || Component.name || 'Component'})`
    // return HOC
    return Wrapped
  }
