import type { CardGenericData } from '~/types/cards'
import type { FaixaCtaData } from '~/types/faixa-cta'

export interface TorneioDetalheSpec {
  label: string
  valor: string
}

/** Grupo de specs — divider só após o grupo (ex.: Buy-in + Stack) */
export interface TorneioDetalheSpecGroup {
  items: TorneioDetalheSpec[]
}

export interface TorneioDetalheData {
  slug: string
  titulo: string
  data_label?: string
  specs: TorneioDetalheSpecGroup[]
  nota?: string
  blinds_link?: string
  /** Card lateral (buy-in / horários / CTA) */
  card: CardGenericData
  faixa_cta?: FaixaCtaData
}
