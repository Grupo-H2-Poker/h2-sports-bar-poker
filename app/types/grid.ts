import type { CardGenericData } from '~/types/cards'
import type { GaleriaImagemData } from '~/types/modules'

/** Config do component `grid_config` — layout do grid */
export interface GridConfigData {
  colunas?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  /** Tipos de item renderizados no grid (demais `components[]` com esse type) */
  item_types?: GridItemType[]
}

export type GridItemType = 'card' | 'imagem'

export interface GridToolbarFiltro {
  label: string
  link?: string
}

export interface GridToolbarBusca {
  placeholder?: string
  habilitado?: boolean
}

/** Config do component `grid_toolbar` — filtro + busca */
export interface GridToolbarData {
  filtro?: GridToolbarFiltro
  busca?: GridToolbarBusca
}

export type GridCardItemData = CardGenericData
export type GridImagemItemData = GaleriaImagemData

export const GRID_CONFIG_COMPONENT_TYPE = 'grid_config' as const
export const GRID_TOOLBAR_COMPONENT_TYPE = 'grid_toolbar' as const
export const GRID_CARD_COMPONENT_TYPE = 'card' as const
export const GRID_IMAGEM_COMPONENT_TYPE = 'imagem' as const

export const GRID_META_COMPONENT_TYPES = [
  'section_cta',
  GRID_TOOLBAR_COMPONENT_TYPE,
  GRID_CONFIG_COMPONENT_TYPE,
] as const
