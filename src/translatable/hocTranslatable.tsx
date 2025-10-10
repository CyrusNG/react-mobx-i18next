import React from 'react'
import { hookTranslatable } from './hookTranslatable'
import type { NamespaceOption, TranslatableOptions, TranslatableValue } from '../types'


/*
 * Usage - ONLY Class Component:
 *   class App extends React.Component {
 *     render() {
 *       return <div>{this.t('hello')}</div>
 *     }
 *   }
 *  export default withTranslatable('common')(observer(App))
 */
export const hocTranslatable = (ns?: NamespaceOption, options?: TranslatableOptions) =>
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
    // HOC that inject translatable context
    const Wrapped: React.FC<P> = (props) => {
      // Get translatable values from hookTranslatable
      const value = hookTranslatable(ns, options);
      // Construct a new class component that extends the input Component
      const Base = Component as React.ComponentClass<P>
      // Create a new class that extends the original component
      class WithTranslatable extends Base {
        // inject translatable values into class component instance
        constructor(props: P) { super(props); Object.assign(this, value); }
      }
      // render the new class component
      return <WithTranslatable {...props} />
    }
    // rename display name for debug
    Wrapped.displayName = `hocTranslatable(${Component.displayName || Component.name || 'Component'})`
    // return HOC
    return Wrapped
  }