import type { UnidadeModulos } from '../../../app/types/modules'
import { applyCmsDictionary } from './apply'
import { loadCmsDictionary } from './load'
import { resolveCmsLocale } from './types'

/**
 * API pública do CMS i18n.
 * Não reexportar apply/load/types/packs aqui — o Nitro auto-importa
 * `server/utils/**` e reexports duplicam os símbolos (WARN Duplicated imports).
 */

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
