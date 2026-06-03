import type { ComponentData, ModuloContentDataMap, ModuloOf } from '~/types/modules'
import type {
  GridConfigData,
  GridItemType,
  GridToolbarData,
} from '~/types/grid'
import type { SectionCTAData } from '~/types/cards'
import {
  GRID_CONFIG_COMPONENT_TYPE,
  GRID_META_COMPONENT_TYPES,
  GRID_TOOLBAR_COMPONENT_TYPE,
} from '~/types/grid'
import { SECTION_CTA_COMPONENT_TYPE } from '~/types/modules'

const DEFAULT_GRID_CONFIG: GridConfigData = {
  colunas: 3,
  gap: 'md',
  item_types: ['card'],
}

type GridModuleItem = ComponentData<ModuloContentDataMap['grid']>

export function useGridModule(modulo: MaybeRefOrGetter<ModuloOf<'grid'>>) {
  const sortedComponents = computed(() => {
    const { components } = toValue(modulo)
    return [...components]
      .filter(c => c.status === 'publicado')
      .sort((a, b) => a.ordem - b.ordem)
  })

  const ctaConfig = computed<SectionCTAData | undefined>(() => {
    const item = sortedComponents.value.find(c => c.type === SECTION_CTA_COMPONENT_TYPE)
    return item?.data as SectionCTAData | undefined
  })

  const toolbarConfig = computed<GridToolbarData | undefined>(() => {
    const item = sortedComponents.value.find(c => c.type === GRID_TOOLBAR_COMPONENT_TYPE)
    return item?.data as GridToolbarData | undefined
  })

  const gridConfig = computed<GridConfigData>(() => {
    const item = sortedComponents.value.find(c => c.type === GRID_CONFIG_COMPONENT_TYPE)
    return { ...DEFAULT_GRID_CONFIG, ...(item?.data as GridConfigData | undefined) }
  })

  const items = computed((): GridModuleItem[] => {
    const allowed = new Set<GridItemType>(gridConfig.value.item_types ?? ['card'])
    const meta = new Set<string>(GRID_META_COMPONENT_TYPES)

    return sortedComponents.value.filter(
      c => !meta.has(c.type) && allowed.has(c.type as GridItemType),
    ) as GridModuleItem[]
  })

  return { ctaConfig, toolbarConfig, gridConfig, items, sortedComponents }
}

export function filterGridItemsBySearch(
  items: GridModuleItem[],
  query: string,
): GridModuleItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return items

  return items.filter((item) => {
    const d = item.data as unknown as Record<string, unknown>
    const haystack = ['titulo', 'categoria', 'garantido', 'descricao']
      .map(k => d[k])
      .filter(v => typeof v === 'string')
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
}
