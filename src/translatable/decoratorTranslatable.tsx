import { hocTranslatable } from './hocTranslatable'
import type { NamespaceOption, TranslatableOptions } from '../types'

/*
 * Usage - ONLY Class Component:
 *   @translatable('common')
 *   @obeserver
 *   class App extends React.Component {
 *     render() {
 *       return <div>{this.t('hello')}</div>
 *     }
 *   }
 *  export default App
 */
export function decoratorTranslatable(ns?: NamespaceOption, options?: TranslatableOptions): ClassDecorator {
  return function (Target: any): any {
    // call HOC to wrap Target
    return hocTranslatable(ns, options)(Target)
  }
}
