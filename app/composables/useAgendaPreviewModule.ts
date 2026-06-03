import type { CardGenericData } from '~/types/cards'
import type { ComponentData, ModuloContentDataMap, ModuloOf } from '~/types/modules'
import type { SectionCTAData } from '~/types/cards'
import {
  AGENDA_PREVIEW_CARD_COMPONENT_TYPE,
  AGENDA_PREVIEW_CASH_GAME_COMPONENT_TYPE,
  AGENDA_PREVIEW_META_COMPONENT_TYPES,
} from '~/types/agenda-preview'
import { SECTION_CTA_COMPONENT_TYPE } from '~/types/modules'

type AgendaPreviewItem = ComponentData<ModuloContentDataMap['agenda_preview']>

export function useAgendaPreviewModule(modulo: MaybeRefOrGetter<ModuloOf<'agenda_preview'>>) {
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

  const cashGameCard = computed((): AgendaPreviewItem | undefined => {
    const item = sortedComponents.value.find(
      c => c.type === AGENDA_PREVIEW_CASH_GAME_COMPONENT_TYPE,
    )
    if (!item) return undefined

    return {
      ...item,
      data: {
        ...(item.data as CardGenericData),
        variant: 'cash_game_preview',
      },
    } as AgendaPreviewItem
  })

  const torneioCards = computed((): AgendaPreviewItem[] => {
    return sortedComponents.value
      .filter(c => c.type === AGENDA_PREVIEW_CARD_COMPONENT_TYPE)
      .map(c => ({
        ...c,
        data: {
          ...(c.data as CardGenericData),
          variant: 'torneio_preview',
        },
      })) as AgendaPreviewItem[]
  })

  return { ctaConfig, cashGameCard, torneioCards, sortedComponents }
}
