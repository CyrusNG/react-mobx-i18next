import { hocTranslatable } from './hocTranslatable'
import type { NamespaceOption, TranslatableOptions } from '../types'

/*
 * Class decorator for translations.
 * Usage:
 *   @observer
 *   @decoratorTranslatable('common')
 *   class App extends React.Component {
 *     render() {
 *       return <div>{this.context.t('hello')}</div>
 *     }
 *   }
 */
export function decoratorTranslatable(ns?: NamespaceOption, options?: TranslatableOptions): ClassDecorator {
  return function (Target: any): any {
    // call HOC to wrap Target
    return hocTranslatable(ns, options)(Target)
  }
}
