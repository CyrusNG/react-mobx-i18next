# react-mobx-i18next

使用 mobx + mobx-react-lite + i18next + react-i18next 完全替代 `react-mobx-i18n`。

## 安装

```bash
npm i react-mobx-i18next i18next react-i18next mobx mobx-react-lite
# or
pnpm add react-mobx-i18next i18next react-i18next mobx mobx-react-lite
```

## Example
```javascript
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createI18n, I18nProvider, I18nStore, observer, withTranslatable } from 'react-mobx-i18next'
import { makeAutoObservable } from 'mobx'

// 1) 初始化 i18n
const i18n = createI18n({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { common: { hello: 'Hello, {{name}}!' } },
    zh: { common: { hello: '你好，{{name}}！' } },
  },
})

// 2) 建立 MobX 语言 store
const i18nStore = new I18nStore(i18n)

// 3) 业务 store 示例
class CounterStore {
  count = 0
  constructor() { makeAutoObservable(this) }
  inc = () => { this.count++ }
}
const counter = new CounterStore()

// 4) 组件：函数式 + HOC 注入 t
const CounterViewBase: React.FC<{ name: string; count: number; onInc: () => void } & { t: any }> = ({ name, count, onInc, t }) => {
  return (
    <div>
      <p>{ t('common:hello', { name }) } </p>
      <button onClick = { onInc } > + { count } </button>
      <button onClick = {() => i18nStore.setLocale('zh')}> 中文 </button>
      <button onClick = {() => i18nStore.setLocale('en')}> EN </button>
    </div>
  )
}
const CounterView = observer(withTranslatable(['common'])(CounterViewBase))

function App() {
  return (
    <I18nProvider i18n={i18n}>
      <CounterView name="Cyrus" count={counter.count} onInc={counter.inc} />
    </I18nProvider>
)
}

createRoot(document.getElementById('root')!).render(<App />)
```


## Hook Usage
```javascript
import React from 'react'
import { observer, useTranslatable } from 'react-mobx-i18next'

const Hello = observer(() => {
  const { t } = useTranslatable('common')
  return <h1>{ t('hello', { name: 'World' }) } </h1>
})
```

## 类装饰器 @Translatable()
注：mobx-react-lite 主打函数组件；此装饰器用于兼容已有类组件代码。

```javascript
import React from 'react'
import { Translatable, observer } from 'react-mobx-i18next'

@observer
@Translatable('common')
class HelloCls extends React.Component<any> {
  render() {
    const { t } = (this.props as any) // t 被注入到 props
    return <h1>{ t('hello', { name: 'Class' }) } </h1>
  }
}
```


## 与 react-mobx-i18n 的对照
@translatable() → @Translatable()（类组件）或 withTranslatable()（HOC）或 useTranslatable()（Hook）
t() 行为：由 react-i18next 提供，支持 ns:key 或通过 ns 选项配置
语言切换：调用 i18nStore.setLocale(lng)，会触发 i18next 切换并响应式更新组件