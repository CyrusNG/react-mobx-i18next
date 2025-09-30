import React from 'react'

export function contextMerger(...contexts: React.Context<any>[]): ClassDecorator {
  return function (Target: any): any {
    if (contexts.length === 0) return Target
    // create one merged context
    const MergedContext = React.createContext<any>({})
    // HOC that combine multiple contexts into one for class component
    const Wrapped: React.FC<any> = (props) => {
      const values = contexts.map((Ctx) => React.useContext(Ctx))
      const merged = Object.assign({}, ...values)
      return (
        <MergedContext.Provider value={merged}>
          <Target {...props} />
        </MergedContext.Provider>
      )
    }
    // set merged context as contextType for Target
    (Target as any).contextType = MergedContext
    // rename display name for debug
    Wrapped.displayName = `context(${Target.displayName || Target.name || 'Component'})`
    // return HOC
    return Wrapped
  }
}
