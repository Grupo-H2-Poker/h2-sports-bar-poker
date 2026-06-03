import type { ComponentData, ModuloContentDataMap, ModuloOf, ModuloTipo } from '~/types/modules'

/**
 * Padrão de módulo com seção + lista de components:
 * - `ctaConfig` → item `type: 'section_cta'` (SectionCTA)
 * - `items` → demais components publicados, ordenados por `ordem`
 */
export function useModuloComponents<T extends ModuloTipo>(
  modulo: MaybeRefOrGetter<ModuloOf<T>>,
) {
  const ctaConfig = useModuleSectionCTA(modulo)
  const items = useSortedComponents(modulo)

  return { ctaConfig, items }
}

export type ModuloItems<T extends ModuloTipo> = ComponentData<ModuloContentDataMap[T]>[]
