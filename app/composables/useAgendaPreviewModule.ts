import type { CardVariant } from '~/types/cards'
import type { ComponentData, ModuloContentDataMap, ModuloOf } from '~/types/modules'
import type { SectionCTAData } from '~/types/cards'
import {
  AGENDA_PREVIEW_CARD_COMPONENT_TYPE,
  AGENDA_PREVIEW_CASH_GAME_COMPONENT_TYPE,
  AGENDA_PREVIEW_META_COMPONENT_TYPES,
} from '~/types/agenda-preview'
import { SECTION_CTA_COMPONENT_TYPE } from '~/types/modules'

type AgendaPreviewItem = ComponentData<ModuloContentDataMap['agenda_preview']>

function resolveCardVariant(modulo: ModuloOf<'agenda_preview'>): CardVariant {
  const forced = modulo.metadados?.card_variant
  if (forced) return forced
  return 'torneio_preview'
}

export function useAgendaPreviewModule(modulo: MaybeRefOrGetter<ModuloOf<'agenda_preview'>>) {
  const sortedComponents = computed(() => {
    const { components } = toValue(modulo)
    return [...components]
      .filter(c => c.status === 'publicado')
      .sort((a, b) => a.ordem - b.ordem)
  })

  const metadados = computed(() => toValue(modulo).metadados)

  const ctaConfig = computed<SectionCTAData | undefined>(() => {
    const item = sortedComponents.value.find(c => c.type === SECTION_CTA_COMPONENT_TYPE)
    return item?.data as SectionCTAData | undefined
  })

  const cardVariant = computed(() => resolveCardVariant(toValue(modulo)))

  const hideCashGame = computed(() => metadados.value?.hide_cash_game ?? false)

  const cashGameCard = computed((): AgendaPreviewItem | undefined => {
    if (hideCashGame.value) return undefined

    const item = sortedComponents.value.find(
      c => c.type === AGENDA_PREVIEW_CASH_GAME_COMPONENT_TYPE,
    )
    if (!item) return undefined

    return {
      ...item,
      data: {
        ...(item.data as ModuloContentDataMap['agenda_preview']),
        variant: 'cash_game_preview',
      },
    } as AgendaPreviewItem
  })

  const previewCards = computed((): AgendaPreviewItem[] => {
    const variant = cardVariant.value
    return sortedComponents.value
      .filter(c => c.type === AGENDA_PREVIEW_CARD_COMPONENT_TYPE)
      .map(c => ({
        ...c,
        data: {
          ...(c.data as ModuloContentDataMap['agenda_preview']),
          variant,
        },
      })) as AgendaPreviewItem[]
  })

  /** @deprecated Use `previewCards` — mantido para compatibilidade */
  const torneioCards = previewCards

  return {
    ctaConfig,
    cashGameCard,
    previewCards,
    torneioCards,
    cardVariant,
    hideCashGame,
    sortedComponents,
  }
}
