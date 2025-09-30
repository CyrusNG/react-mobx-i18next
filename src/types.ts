import { withTranslation } from 'react-i18next'

/**
* Namespace parameter, can be a single string or string array
*/
export type NamespaceOption = string | string[] | undefined

/**
* Directly infer its options type from react-i18next's withTranslation
* This way different versions can also maintain compatibility
*/
export type WithTranslationOptionsFromLib = Parameters<typeof withTranslation>[1]

/**
* Our own TranslatableOptions (merge library options + extendable fields)
*/
export type TranslatableOptions = WithTranslationOptionsFromLib & {
  keyPrefix?: string
}

export type TranslatableContent = {
  t: (key: string, options?: any) => string
  i18n: any
  ready: boolean
}
