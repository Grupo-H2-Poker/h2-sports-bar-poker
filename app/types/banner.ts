import type { ModuloMetadadosCarousel } from '~/types/carousel'
import type { SectionCTAData } from '~/types/cards'

/** Posição do SectionCTA sobre a imagem (layout overlay) */
export type BannerCtaPosition =
  | 'center'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'left'
  | 'right'

/** Largura do banner */
export type BannerSize = 'lg' | 'md' | 'sm'

/** Altura do banner — independente da largura */
export type BannerHeight = 'sm' | 'md' | 'lg'

/** Layout do banner */
export type BannerLayout = 'overlay' | 'two_column'

/** Metadados do módulo `banner` */
export interface ModuloMetadadosBanner extends ModuloMetadadosCarousel {
  /** Agrupa banners `sm` consecutivos em DragCarousel (padrão: grid 2 colunas) */
  drag_carousel?: boolean
}

export interface BannerData {
  imagem: string
  /** Clique na imagem (quando não há CTA ou como fallback) */
  link?: string
  layout?: BannerLayout
  size?: BannerSize
  /** Altura: `sm` mais fino, `md` normal, `lg` mais alto. Padrão: `md` */
  height?: BannerHeight
  /**
   * Posição do bloco SectionCTA no layout overlay.
   * Se omitido, usa `section_cta.align` (left/center/right) ou `cta_column`.
   */
  cta_position?: BannerCtaPosition
  /** Lado da coluna do CTA no layout two_column */
  cta_column?: 'left' | 'right'
  /** Inverte a ordem das colunas no desktop (two_column) */
  reverse_columns?: boolean
  /** Inverte a ordem das colunas no mobile (two_column). Padrão: imagem em cima quando CTA está à esquerda */
  reverse_columns_mobile?: boolean
  /** SectionCTA embutido — omitir para banner só imagem */
  section_cta?: SectionCTAData
  /** Gradiente escuro para legibilidade do texto sobre a imagem */
  overlay?: 'none' | 'gradient' | 'gradient-bottom'
  rounded?: boolean
  /** @deprecated Preferir `section_cta.titulo` */
  titulo?: string
  /** @deprecated Preferir `section_cta.descricao` */
  subtitulo?: string
  /** @deprecated Preferir `section_cta.cta` */
  cta?: string
}
