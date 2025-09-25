/*
* A class decorator to mirror react-mobx-i18n's @translatable.
* Note: mobx-react-lite focuses on function components; this decorator
* is provided for compatibility with class components.
*/
import { hocTranslatable } from './hocTranslatable'
import type { NamespaceOption, TranslatableOptions } from '../types'

export function decoratorTranslatable(ns?: NamespaceOption, options?: TranslatableOptions): ClassDecorator {
  return function (Target: any): any {
    // only create HOC once
    const Wrapped = hocTranslatable(ns, options)(Target)
    class TranslatableTarget extends Target {
      render() {
        // directly render the already wrapped component, without recreating it on every render
        return <Wrapped {...this.props} />
      }
    }
    (TranslatableTarget as any).displayName = `decoratorTranslatable(${Target.displayName || Target.name})`
    return TranslatableTarget
  }
}
