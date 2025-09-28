import React from 'react'

// custom one context globally
export const TranslatableContext = React.createContext({ t: (key: string) => key, i18n: null, ready: false })