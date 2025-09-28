# react-mobx-i18next

Use mobx + mobx-react-lite + i18next + react-i18next to completely replace `react-mobx-i18n` that is incompatible with react17+.

## Install

```bash
npm i react-mobx-i18next                                       # this project
npm react react-dom i18next react-i18next mobx mobx-react-lite # required peer dependencies

# or
pnpm add react-mobx-i18next
```

## Example
```javascript
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createI18n, I18nProvider, I18nStore, observer, translatable } from 'react-mobx-i18next'
import { makeAutoObservable } from 'mobx'

// Initialize i18n
const i18n = createI18n({ 
  lang: 'en', 
  fallbackLang: 'en', 
  resources: {
    en: { common: { hello: 'Hello, {{name}}!' } },
    zh: { common: { hello: 'Hello, {{name}}!' } },
  }
})

// Inject tranlatable into react component
@observer
@translatable('common')
class Hello extends React.Component<any> {
  constructor {
    this.i18nStore = new I18nStore(i18n)   // Create a MobX language store
  }

  render() {
    return (
      <div> 
      <p>{ this.context.t('common:hello', { this.props.name }) } </p> 
      <button onClick = { this.props.onInc } > + { this.props.count } </button> 
      <button onClick = {() => this.i18nStore.setLocale('zh')}> CN </button>
      <button onClick = {() => this.i18nStore.setLocale('en')}> EN </button> 
    </div> 
    )
  }
}

// Business store example
class CounterStore {
  count = 0
  constructor() { makeAutoObservable(this) }
  inc = () => { this.count++ }
}
const counter = new CounterStore()

// Boot react app
function App() { 
  return ( 
    <I18nProvider i18n={i18n}>
      <CounterView name="Chris" count={counter.count} onInc={counter.inc} />
    </I18nProvider>
  )
}
createRoot(document.getElementById('root')!).render(<App />)
```


## React Function Component - Hook
```javascript
import React from 'react'
import { observer, useTranslatable, TranslatableContext } from 'react-mobx-i18next'

const Hello = observer(() => {
  const { context } = useTranslatable('common')
  return <h1>{ context.t('hello', { name: 'World' }) } </h1>
})
```

## React Class Component - Decorator
```javascript
import React from 'react'
import { translatable, observer } from 'react-mobx-i18next'

@observer
@translatable('common')
class Hello extends React.Component<any> {
  render() {
    return <h1>{ this.context.t('hello', { name: 'Class' }) }</h1>
  }
}
```

## HOC
Note: if you use HOC, you need one more step that defines context manually.

### Function Component's HOC
```javascript
import React from 'react'
import { observer, withTranslatable, TranslatableContext } from 'react-mobx-i18next'

const Hello: React.FC<{ t: any }> = ({}) => {
  const { context } = useContext(TranslatableContext) // define context here
  return <h1>{ context.t('hello', { name: 'World' }) } </h1>
}

const HelloWithTranslatable = observer(withTranslatable('common')(Hello))
```

### Class Component's HOC
```javascript
import React from 'react'
import { observer, withTranslatable, TranslatableContext } from 'react-mobx-i18next'

class Hello extends React.Component<any> {
  static contextType = TranslatableContext  // define context here
  render() {
    return <h1>{ this.context.t('hello', { name: 'Class' }) }</h1>
  }
}

export default observer(withTranslatable('common')(Hello))
```



## Comparison with react-mobx-i18n
* class component: @translatable → @translatable()
* HOC: withTranslatable()
* Hook: useTranslatable()
* t() Behavior: this.props.t(...) → this.context.t(...), Provided by react-i18next, supports ns:key or configurable via the ns option
* I18nProvider: (Optional) When to use? You will need to use the provider if you need to support multiple i18next instances, otherwise no need it.
* Language Switching: Call i18nStore.setLocale(lang) will trigger i18next switching and responsively update components