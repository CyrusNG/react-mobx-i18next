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
      <p>{ this.props.t('common:hello', { this.props.name }) } </p> 
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


## React Function Component - HOC
```javascript
import React from 'react'
import { observer, withTranslatable } from 'react-mobx-i18next'

const Hello: React.FC<{ t: any }> = ({ t }) => {
  return <h1>{ t('hello', { name: 'World' }) } </h1>
}

const HelloWithTranslatable = observer(withTranslatable(['common'])(Hello)
```

## React Function Component - Hook
```javascript
import React from 'react'
import { observer, useTranslatable } from 'react-mobx-i18next'

const Hello = observer(() => {
  const { t } = useTranslatable('common')
  return <h1>{ t('hello', { name: 'World' }) } </h1>
})
```

## Class Decorator
Note: mobx-react-lite primarily features function components; this decorator is provided for compatibility with existing class component code.

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

## Comparison with react-mobx-i18n
* class component: @translatable → @translatable()
* HOC: withTranslatable()
* Hook: useTranslatable()
* t() Behavior: Provided by react-i18next, supports ns:key or configurable via the ns option
* I18nProvider: (Optional) When to use? You will need to use the provider if you need to support multiple i18next instances, otherwise no need it.
* Language Switching: Call i18nStore.setLocale(lang) will trigger i18next switching and responsively update components