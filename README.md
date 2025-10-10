# react-mobx-i18next

Use mobx + mobx-react-lite + i18next + react-i18next to completely replace `react-mobx-i18n` that is incompatible with react17+.

## Install

```bash
npm i react-mobx-i18next                                       # this project
npm react react-dom i18next react-i18next mobx mobx-react-lite # required peer dependencies

# or
pnpm add react-mobx-i18next
```

## React Class Component

### Method 1: Context (RECOMMENDED)
We RECOMMENDs you to use this method because it can combine others contexts like UNSAFE_NavigationContext, UNSAFE_LocationContext together.
```javascript
import React from 'react'
import { createRoot } from 'react-dom/client'
import { configure, makeAutoObservable } from 'mobx'
import { observer, Provider } from 'mobx-react'
import { UNSAFE_NavigationContext, UNSAFE_LocationContext } from 'react-router-dom'
import { createI18n, I18nStore, translatable, contextHubs, TranslatableContext } from 'react-mobx-i18next'

// Initialize i18n
const i18n = createI18n({ 
  lang: 'en', 
  fallbackLang: 'en', 
  resources: {
    en: { common: { hello: 'Hello, {{name}}!' } },
    zh: { common: { hello: 'Hello, {{name}}!' } },
  }
})

// Config MobX (if need)
configure({ enforceActions: "always" });

// Business Stores
class CounterStore {
  count = 0
  constructor() { makeAutoObservable(this) }
  inc = () => { this.count++ }
}

// Business Components
@inject('i18nStore', 'counterStore')
@contextInjector()
@observer
class CounterView extends React.Component<any> {
  render() {
    return (
      <div> 
      <p>{ this.context.t('common:hello', { this.props.name }) } </p> 
      <button onClick = { this.props.counterStore.onInc } > + { this.props.counterStore.count } </button> 
      <button onClick = {() => this.props.i18nStore.setLocale('zh')}> CN </button>
      <button onClick = {() => this.props.i18nStore.setLocale('en')}> EN </button> 
    </div> 
    )
  }
}

// Root Component
@contextHubs(TranslatableContext, UNSAFE_NavigationContext, UNSAFE_LocationContext)
@observer
class App extends React.Component<any> {
  constructor {
    this.store = { 
      i18nStore: new I18nStore(i18n)   // mobx language store
      counterStore: new CounterStore() // business store 
    }
  }
  render() {
    return (
      <Provider {...this.store}>
        <BrowserRouter>
          <CounterView name="Chris" />
        </BrowserRouter>
      </Provider>
    )
  }
}

// Boot react app
createRoot(document.getElementById('root')!).render(<App />)
```


### Method 2: Decorator
```javascript
import React from 'react'
import { observer, translatable } from 'react-mobx-i18next'

@translatable('common')
@observer
class Hello extends React.Component<any> {
  render() {
    return <h1>{ this.t('hello', { name: 'Chris' }) }</h1>
  }
}
```


### Method 3: HOC
```javascript
import React from 'react'
import { observer, withTranslatable } from 'react-mobx-i18next'

class Hello extends React.Component<any> {
  render() {
    return <h1>{ this.t('hello', { name: 'Chris' }) }</h1>
  }
}

export default withTranslatable('common')(observer(Hello))
```

## React Function Component
### Method 1 : Hook
```javascript
import React from 'react'
import { observer, useTranslatable } from 'react-mobx-i18next'

const Hello = observer((props) => {
  const { i18n, t, ready } = useTranslatable('common')
  return <h1>{ t('hello', { name: 'World' }) } </h1>
})
```


## Comparison with react-mobx-i18n
* class component: @translatable → @translatable()
* HOC: withTranslatable()
* Hook: useTranslatable()
* t() Behavior: Provided by react-i18next, supports ns:key or configurable via the ns option
* I18nProvider: (Optional) When to use? You will need to use the provider if you need to support multiple i18next instances, otherwise no need it.
* Language Switching: Call i18nStore.setLocale(lang) will trigger i18next switching and responsively update components