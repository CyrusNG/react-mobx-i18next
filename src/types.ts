export type NamespaceOption = string | string[] | undefined

export interface TranslatableOptions {
  /** i18next key prefix / namespace list */
  ns?: NamespaceOption
  /** When true, waits until namespaces are loaded */
  wait?: boolean
}