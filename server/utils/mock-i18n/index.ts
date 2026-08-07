import type { UnidadeModulos } from '../../../app/types/modules'
import { applyCmsDictionary } from './apply'
import { loadCmsDictionary } from './load'
import { resolveCmsLocale } from './types'

export { applyCmsDictionary } from './apply'
export { loadCmsDictionary } from './load'
export type { CmsLocale, CmsPack, CmsDictLocale } from './types'
export { CMS_LOCALES, CMS_DICT_LOCALES, resolveCmsLocale } from './types'
export { CMS_SKIP_KEYS } from './skip-keys'
export { CMS_PACKS, mergeCmsPacks } from './packs'

export async function localizeCmsPayload<T>(
  data: T,
  lang: unknown,
): Promise<T> {
  const locale = resolveCmsLocale(lang)
  if (locale === 'pt') return structuredClone(data)
  const dictionary = await loadCmsDictionary(locale)
  return applyCmsDictionary(data, dictionary, locale)
}

export async function localizeUnidadeModulos(
  data: UnidadeModulos,
  lang: unknown,
): Promise<UnidadeModulos> {
  return localizeCmsPayload(data, lang)
}
