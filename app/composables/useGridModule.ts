import type { ComponentData, ModuloContentDataMap, ModuloOf } from '~/types/modules'
import type {
  GridConfigData,
  GridDiaGroup,
  GridItemType,
  GridToolbarData,
} from '~/types/grid'
import type { CardGenericData, SectionCTAData } from '~/types/cards'
import {
  GRID_CONFIG_COMPONENT_TYPE,
  GRID_META_COMPONENT_TYPES,
  GRID_TOOLBAR_COMPONENT_TYPE,
} from '~/types/grid'
import { SECTION_CTA_COMPONENT_TYPE } from '~/types/modules'
import { isDataHojeOuFutura, resolveDiaGrupo, sortDiaGrupos } from '~/utils/agenda-dias'

const DEFAULT_GRID_CONFIG: GridConfigData = {
  colunas: 4,
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

/**
 * Agrupa itens do grid por `data` (ISO no card) — só hoje e datas futuras.
 * Label inteligente: Hoje, Amanhã ou Quarta-feira - 29 de julho.
 * Retorna `null` se não houver campo `data`; `[]` se todas as datas forem passadas.
 */
export function groupGridItemsByDia(
  items: GridModuleItem[],
): GridDiaGroup<GridModuleItem>[] | null {
  const hasDia = items.some((item) => Boolean((item.data as CardGenericData).data))
  if (!hasDia) return null

  type Acc = { id: string, label: string, sortKey: string, items: GridModuleItem[] }
  const map = new Map<string, Acc>()

  for (const item of items) {
    const d = item.data as CardGenericData
    if (!d.data || !isDataHojeOuFutura(d.data)) continue

    const grupo = resolveDiaGrupo(d.data)
    const existing = map.get(grupo.id)
    if (existing) {
      existing.items.push(item)
    }
    else {
      map.set(grupo.id, {
        id: grupo.id,
        label: grupo.label,
        sortKey: grupo.sortKey,
        items: [item],
      })
    }
  }

  return sortDiaGrupos([...map.values()]).map(({ id, label, items: groupItems }) => ({
    id,
    label,
    items: groupItems,
  }))
}
