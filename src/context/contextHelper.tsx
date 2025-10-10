import React from 'react'
import type { HubsContexts } from '../types'

/**
 * This is an internal merged context
 */
const MergedContext = React.createContext<any>({})

/**
 * Decorator that merges multiple React contexts for a class component.
 * Accepts individual context, contexts array, or functions returning one context.
 *
 * Example:
 * @contextHubs(CtxA, () => CtxB, CtxD)
 */
export function contextHubs(...inputs: HubsContexts[]): ClassDecorator {
  return function (Target: any): any {
    // if no input, return Target directly
    if (inputs.length === 0) return Target
    // HOC that combine multiple contexts into one for class component
    const Wrapped: React.FC<any> = (props) => {
      // normalize all inputs into a flat array of contexts
      const contexts: React.Context<any>[] = inputs.flatMap((input) => {
        if (typeof input === 'function') return [input()] // function returning context
        if (Array.isArray(input)) return input          // array of contexts
        return [input]                                  // single context
      })
      // get all context values and merge into one object
      const values = contexts.map((Ctx) => React.useContext(Ctx))
      const merged = Object.assign({}, ...values)
      // provide merged context to Target
      return (
        <MergedContext.Provider value={merged}>
          <Target {...props} />
        </MergedContext.Provider>
      )
    }
    // rename display name for debug
    Wrapped.displayName = `contextHubs(${Target.displayName || Target.name || 'Component'})`
    // return HOC
    return Wrapped
  }
}


/**
 * Class decorator for setting MergedContext as contextType.
 * Usage:
 *   @contextInjector()
 *   @observer
 *   class App extends React.Component {...}
 */
export function contextInjector(): ClassDecorator {
  return function (Target: any): any {
    // set merged context as contextType for Target
    (Target as any).contextType = MergedContext;
    // rename display name for debug
    (Target as any).displayName = `contextInjector(${Target.displayName || Target.name})`
    // call HOC to wrap Target
    return Target
  }
}