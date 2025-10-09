import React from 'react'
import { TranslatableContext } from './translatableContext'
import type { NamespaceOption, TranslatableOptions, TranslatableValue } from '../types'


/*
 * Class HOC for translations.

 * Usage for Class Component:
 *   class App extends React.Component {
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
      // Get or create translatable context for given ns/options
      const TransContext = TranslatableContext(ns, options);
      // Get value of translatable context
      const value = React.useContext(TransContext);
      // Set translatable context as contextType for Target
      (Component as any).contextType = TransContext;
      // provide translatable context to Component
      return (
        <TransContext.Provider value={value}>
          <Component {...props} />
        </TransContext.Provider>
      )
    }
    // rename display name for debug
    Wrapped.displayName = `hocTranslatable(${Component.displayName || Component.name || 'Component'})`
    // return HOC
    return Wrapped
  }
