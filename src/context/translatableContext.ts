import React from 'react'

// custom one context globally
export const TranslatableContext = React.createContext({ t: (key: string, options?: any) => key, i18n: null, ready: false })