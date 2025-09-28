import { TranslatableContext } from '../context/translatableContext'
import { hocTranslatable } from './hocTranslatable'
import type { NamespaceOption, TranslatableOptions } from '../types'

/*
 * Class decorator for translations.
 * Usage:
 *   @decoratorTranslatable('common')
 *   class MyComp extends React.Component {
 *     render() {
 *       return <div>{this.context.t('hello')}</div>
 *     }
 *   }
 */
export function decoratorTranslatable(ns?: NamespaceOption, options?: TranslatableOptions): ClassDecorator {
  return function (Target: any): any {
    class TranslatableTarget extends Target {
      // make class component able to use this.context.t()
      static contextType = TranslatableContext
    }

    (TranslatableTarget as any).displayName = `decoratorTranslatable(${Target.displayName || Target.name})`

    return hocTranslatable(ns, options)(TranslatableTarget)
  }
}
