import type { ComponentData, ModuloContentDataMap, ModuloOf } from '~/types/modules'
import type { RankingConfigData } from '~/types/ranking'
import {
  RANKING_CONFIG_COMPONENT_TYPE,
  RANKING_META_COMPONENT_TYPES,
  RANKING_PLAYER_COMPONENT_TYPE,
} from '~/types/ranking'

const DEFAULT_RANKING_CONFIG: RankingConfigData = {
  titulo: 'Ranking',
  cta: 'Confira o ranking',
}

type RankingModuleItem = ComponentData<ModuloContentDataMap['ranking']>

export function useRankingModule(modulo: MaybeRefOrGetter<ModuloOf<'ranking'>>) {
  const sortedComponents = computed(() => {
    const { components } = toValue(modulo)
    return [...components]
      .filter(c => c.status === 'publicado')
      .sort((a, b) => a.ordem - b.ordem)
  })

  const config = computed<RankingConfigData>(() => {
    const item = sortedComponents.value.find(c => c.type === RANKING_CONFIG_COMPONENT_TYPE)
    return { ...DEFAULT_RANKING_CONFIG, ...(item?.data as RankingConfigData | undefined) }
  })

  const players = computed((): RankingModuleItem[] => {
    const meta = new Set<string>(RANKING_META_COMPONENT_TYPES)
    return sortedComponents.value.filter(
      c => !meta.has(c.type) && c.type === RANKING_PLAYER_COMPONENT_TYPE,
    ) as RankingModuleItem[]
  })

  return { config, players, sortedComponents }
}
