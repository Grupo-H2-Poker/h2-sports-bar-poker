import type { CardVariant } from '~/types/cards'
import type { ModuloMetadadosCarousel } from '~/types/carousel'

export type ModuloMetadadosAgendaPreview = ModuloMetadadosCarousel & {
  /** Variante forçada nos cards (ex.: `etapa_preview` para séries) */
  card_variant?: CardVariant
  /** Oculta o card fixo de cash game */
  hide_cash_game?: boolean
  /**
   * `carousel` — DragCarousel (padrão).
   * `grid` — grade fixa na largura do container (ex.: depoimentos Eventos).
   */
  /** `wrap` — grade centralizada (ex.: mãos Jackpot) */
  layout?: 'carousel' | 'grid' | 'wrap'
}

export const AGENDA_PREVIEW_CASH_GAME_COMPONENT_TYPE = 'cash_game' as const
export const AGENDA_PREVIEW_CARD_COMPONENT_TYPE = 'card' as const

export const AGENDA_PREVIEW_META_COMPONENT_TYPES = [
  'section_cta',
] as const
