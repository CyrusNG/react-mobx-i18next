import { hocTranslatable } from './hocTranslatable'
import type { NamespaceOption, TranslatableOptions } from '../types'

/*
 * Class decorator for translations.
 * Usage:
 *   @observer
 *   @decoratorTranslatable('common')
 *   class App extends React.Component {
 *     static contextType = TranslatableContext
 *     render() {
 *       return <div>{this.context.t('hello')}</div>
 *     }
 *   }
 * OR
 *   @observer
 *   @decoratorTranslatable('common')
 *   @context(TranslatableContext)
 *   class App extends React.Component {
 *     render() {
 *       return <div>{this.context.t('hello')}</div>
 *     }
 *   }
 */
export function decoratorTranslatable(ns?: NamespaceOption, options?: TranslatableOptions): ClassDecorator {
  return function (Target: any): any {
    // rename display name for debug
    (Target as any).displayName = `decoratorTranslatable(${Target.displayName || Target.name})`
    // call HOC to wrap Target
    return hocTranslatable(ns, options)(Target)
  }
}
