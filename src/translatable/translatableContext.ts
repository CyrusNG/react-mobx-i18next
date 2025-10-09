import React from 'react'
import { hookTranslatable } from './hookTranslatable'
import type { NamespaceOption, TranslatableOptions, TranslatableValue } from '../types'

/**
 * A map to cache created contexts for different settings
 */
const contextMap = new Map<string, React.Context<TranslatableValue>>()

/**
 * get singleton TranslatableContext
 * same ns/options combination returns the same context instance
 */
export const TranslatableContext = (ns?: NamespaceOption, options?: TranslatableOptions): React.Context<TranslatableValue> => {
  // generate a unique key, simply use JSON.stringify
  const key = JSON.stringify({ ns, options })
  // if found in context map then return directly
  if (contextMap.has(key)) return contextMap.get(key)!
  // create a new context with default value from hookTranslatable if not found in context map
  const ctx = React.createContext(hookTranslatable(ns, options))
  // store in map
  contextMap.set(key, ctx)
  // return context
  return ctx
}