/**
 * Registry de packs CMS.
 *
 * Nova página: criar `packs/foo.ts` (default export `CmsPack`) e
 * adicionar o import abaixo. Sem editar `load.ts` / `apply.ts`.
 */
import type { CmsDictLocale, CmsPack } from '../types'
import documento from './documento'
import eventos from './eventos'
import shared from './shared'

/**
 * Ordem: shared primeiro; packs de página sobrescrevem em colisão.
 * (import.meta.glob não é usado — jiti/audit precisa de imports estáticos.)
 */
export const CMS_PACKS: readonly CmsPack[] = [
  shared,
  documento,
  eventos,
]

export function mergeCmsPacks(locale: CmsDictLocale): Record<string, string> {
  return Object.assign({}, ...CMS_PACKS.map(pack => pack[locale]))
}
