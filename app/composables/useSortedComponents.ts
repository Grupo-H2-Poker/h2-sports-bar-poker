import type {
  ComponentData,
  ModuloContentDataMap,
  ModuloOf,
  ModuloTipo,
} from '~/types/modules'
import type { SectionCTAData } from '~/types/cards'
import { SECTION_CTA_COMPONENT_TYPE } from '~/types/modules'

/**
 * Itens de dados do módulo, ordenados por `ordem` e publicados.
 * O component transversal `section_cta` é excluído — use `useModuleSectionCTA`.
 */
export function useSortedComponents<T extends ModuloTipo>(
  modulo: MaybeRefOrGetter<ModuloOf<T>>,
) {
  return computed((): ComponentData<ModuloContentDataMap[T]>[] => {
    const { components } = toValue(modulo)

    return [...components]
      .filter((c) => c.status === 'publicado' && c.type !== SECTION_CTA_COMPONENT_TYPE)
      .sort((a, b) => a.ordem - b.ordem) as ComponentData<ModuloContentDataMap[T]>[]
  })
}

/** @deprecated Use `ModuloContentDataMap[T]` */
export type ModuloContentData<T> = T extends ModuloTipo ? ModuloContentDataMap[T] : never

/** Config do component `section_cta` (cabeçalho/CTA da seção), se houver. */
export function useModuleSectionCTA<T extends ModuloTipo>(
  modulo: MaybeRefOrGetter<ModuloOf<T>>,
) {
  return computed<SectionCTAData | undefined>(() => {
    const item = toValue(modulo).components.find(
      (c) => c.type === SECTION_CTA_COMPONENT_TYPE && c.status === 'publicado',
    )
    return item?.data as SectionCTAData | undefined
  })
}
