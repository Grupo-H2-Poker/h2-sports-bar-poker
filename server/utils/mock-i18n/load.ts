import { mergeCmsPacks } from './packs'
import type { CmsLocale } from './types'

type Dictionary = Record<string, string>

/**
 * Carrega o dicionário PT → locale mesclando todos os packs em `packs/`.
 */
export async function loadCmsDictionary(locale: CmsLocale): Promise<Dictionary | undefined> {
  if (locale === 'pt') return undefined
  return mergeCmsPacks(locale)
}
