import type { CardGenericData } from '~/types/cards'
import type { GaleriaImagemData } from '~/types/modules'

/** Config do component `grid_config` — layout do grid */
export interface GridConfigData {
  colunas?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  /** Tipos de item renderizados no grid (demais `components[]` com esse type) */
  /** Filtros aplicados ao carregar a página (ex.: `{ series: ['cph'] }`) */
  filtros_iniciais?: Record<string, string[]>
}

export type GridItemType = 'card' | 'imagem'

export interface GridFilterOption {
  id: string
  label: string
}

export interface GridFilterSection {
  id: string
  titulo: string
  opcoes: GridFilterOption[]
  /** Chips por linha no modal (ex.: buy-in = 2, garantido = 5) */
  colunas?: 1 | 2 | 3 | 4 | 5
}

export interface GridFilterModalAction {
  label: string
}

export interface GridFilterModal {
  titulo?: string
  secoes: GridFilterSection[]
  limpar?: GridFilterModalAction
  aplicar?: GridFilterModalAction
}

export interface GridToolbarFiltro {
  label: string
  link?: string
  modal?: GridFilterModal
}

export interface GridToolbarBusca {
  placeholder?: string
  habilitado?: boolean
}

export interface GridFilterBadges {
  limpar?: GridFilterModalAction
}

/** Config do component `grid_toolbar` — filtro + busca + modal de filtros */
export interface GridToolbarData {
  filtro?: GridToolbarFiltro
  busca?: GridToolbarBusca
  badges?: GridFilterBadges
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
