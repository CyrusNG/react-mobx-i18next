import React from 'react'
import { hookTranslatable } from './hookTranslatable'
import { TranslatableContext } from '../context/translatableContext'
import type { NamespaceOption, TranslatableOptions } from '../types'


/*
 * Class HOC for translations.

 * Usage for Class Component:
 *   class MyClassComp extends React.Component {
 *     static contextType = TranslatableContext
 *     render() {
 *       return <div>{this.context.t('hello')}</div>
 *     }
 *   }
 *  export default hocTranslatable('common')(MyClassComp)
 * 
 * Usage for Function Component:
 * const MyFuncComp: React.FC = () => {
 *   const { context } = useContext(TranslatableContext)
 *   return <div>{context.t('hello')}</div>
 * }
 * export default hocTranslatable('common')(MyFuncComp)
 */
export const hocTranslatable = (ns?: NamespaceOption, options?: TranslatableOptions) =>
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
    const Wrapped: React.FC<P> = (props) => {
      // get context value from hook
      const { context: value } = hookTranslatable(ns, options)
      // wrap by Context Provider intead of pass props
      return (
        <TranslatableContext.Provider value={value}>
          <Component {...props} />
        </TranslatableContext.Provider>
      )
    }

    Wrapped.displayName = `hocTranslatable(${Component.displayName || Component.name || 'Component'})`

    return Wrapped
  }
