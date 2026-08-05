import type { UnidadeModulos } from '../../../app/types/modules'
import { applyCmsDictionary, loadCmsDictionary } from './apply'
import { resolveCmsLocale } from './types'

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
