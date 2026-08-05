import type { ModuloMetadadosCarousel } from '~/types/carousel'

export type GaleriaLayout = 'grid' | 'drag_carousel'

export type GaleriaGridColunas = 1 | 2 | 3 | 4

export type GaleriaGridGap = 'sm' | 'md' | 'lg'

/** Variante visual do card de imagem da galeria. */
export type GaleriaCardVariant = 'default' | 'album'

export const GALERIA_FILTER_TODAS_ID = 'todas' as const

export interface GaleriaSeriesFiltroOption {
  id: string
  label: string
}

export interface ModuloMetadadosGaleria extends ModuloMetadadosCarousel {
  /**
   * `grid` — grade de imagens com colunas configuráveis.
   * `drag_carousel` — carrossel horizontal com drag (padrão).
   */
  layout?: GaleriaLayout
  /** Colunas no desktop (xl+). Padrão: 4 — mesmo grid da agenda */
  colunas?: GaleriaGridColunas
  /** Itens por linha no tablet (sm/md). Padrão: 2 */
  itens_por_linha?: GaleriaGridColunas
  /** Espaçamento entre itens no modo grid. Padrão: `md` */
  gap?: GaleriaGridGap
  /**
   * `default` — card com título/descrição na base (home).
   * `album` — overlay centralizado estilo página Galeria de Fotos (Figma).
   */
  card_variant?: GaleriaCardVariant
  /**
   * Quando `true`, exibe filtro de séries derivado dos itens com `series`.
   * Tabs: Todas + cada série presente nos dados.
   */
  filtro_series?: boolean
}

/**
 * Carrossel de preview (só imagem) — Figma Poker Esporte da Mente.
 * Bleed L/R via `carousel_bleed_left` / `carousel_bleed_right`.
 */
export interface ModuloMetadadosGaleriaPreview extends ModuloMetadadosCarousel {
  /** Clique no preview navega para esta página (ex.: `galeria`) */
  link?: string
}

export const GALERIA_DEFAULT_LAYOUT: GaleriaLayout = 'drag_carousel'
export const GALERIA_DEFAULT_CARD_VARIANT: GaleriaCardVariant = 'default'

/** Slide do `galeria_preview` — sempre mais largo que a viewport (peek L+R). */
export const GALERIA_PREVIEW_SLIDE_CLASS =
  'shrink-0 w-[calc((100vw+12rem)/5)]' as const

export const GALERIA_GRID_GAP_CLASS: Record<GaleriaGridGap, string> = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
}

/** Mesmo breakpoint do grid da agenda. */
const GALERIA_GRID_COLS_CLASS: Record<GaleriaGridColunas, string> = {
  1: 'grid grid-cols-1',
  2: 'grid grid-cols-1 sm:grid-cols-2',
  3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}

export function resolveGaleriaGridClasses(metadados?: ModuloMetadadosGaleria) {
  const colunas = metadados?.colunas ?? 4
  const gap = GALERIA_GRID_GAP_CLASS[metadados?.gap ?? 'md']

  return [GALERIA_GRID_COLS_CLASS[colunas], gap].join(' ')
}
