/*
* A class decorator to mirror react-mobx-i18n's @translatable.
* Note: mobx-react-lite focuses on function components; this decorator
* is provided for compatibility with class components.
*/
import { withTranslatable } from './withTranslatable'
import type { NamespaceOption, TranslatableOptions } from '../types'

export function Translatable(ns?: NamespaceOption, options?: TranslatableOptions): ClassDecorator {
  return function (Target: any): any {
    class WithTranslatable extends Target {
      render() {
        const Wrapped = withTranslatable(ns, options)(Target)
        return <Wrapped {...this.props} />
      }
    }
    (WithTranslatable as any).displayName = `Translatable(${Target.displayName || Target.name})`
    return WithTranslatable
  }
}