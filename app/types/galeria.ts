import type { ModuloMetadadosCarousel } from '~/types/carousel'

export type GaleriaLayout = 'grid' | 'drag_carousel'

export type GaleriaGridColunas = 1 | 2 | 3 | 4

export type GaleriaGridGap = 'sm' | 'md' | 'lg'

export interface ModuloMetadadosGaleria extends ModuloMetadadosCarousel {
  /**
   * `grid` — grade de imagens com colunas configuráveis.
   * `drag_carousel` — carrossel horizontal com drag (padrão).
   */
  layout?: GaleriaLayout
  /** Colunas no desktop (lg+). Padrão: 3 */
  colunas?: GaleriaGridColunas
  /** Itens por linha no tablet (md). Padrão: 2 */
  itens_por_linha?: GaleriaGridColunas
  /** Espaçamento entre itens no modo grid. Padrão: `md` */
  gap?: GaleriaGridGap
}

export const GALERIA_DEFAULT_LAYOUT: GaleriaLayout = 'drag_carousel'

export const GALERIA_GRID_GAP_CLASS: Record<GaleriaGridGap, string> = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
}

const GALERIA_GRID_MD_CLASS: Record<GaleriaGridColunas, string> = {
  1: 'grid grid-cols-1',
  2: 'grid grid-cols-1 md:grid-cols-2',
  3: 'grid grid-cols-1 md:grid-cols-3',
  4: 'grid grid-cols-1 md:grid-cols-4',
}

const GALERIA_GRID_LG_CLASS: Record<GaleriaGridColunas, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

export function resolveGaleriaGridClasses(metadados?: ModuloMetadadosGaleria) {
  const colunas = metadados?.colunas ?? 3
  const itensPorLinha = metadados?.itens_por_linha ?? 2
  const gap = GALERIA_GRID_GAP_CLASS[metadados?.gap ?? 'md']

  return [
    GALERIA_GRID_MD_CLASS[itensPorLinha],
    GALERIA_GRID_LG_CLASS[colunas],
    gap,
  ].join(' ')
}
