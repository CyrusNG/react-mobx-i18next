import React from 'react'
import { hookTranslatable } from '../translatable/hookTranslatable'
import type { NamespaceOption, TranslatableOptions, TranslatableValue } from '../types'

export const TranslatableContext = (ns?: NamespaceOption, options?: TranslatableOptions): React.Context<TranslatableValue> => React.createContext(hookTranslatable(ns, options))