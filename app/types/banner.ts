import type { ModuloMetadadosCarousel } from '~/types/carousel'
import type { SectionCTAData } from '~/types/cards'
import type { ModuloMetadadosMarginLateral } from '~/types/faq-page'

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
export type BannerHeight = 'sm' | 'md' | 'lg' | 'strip'

/** Layout do banner */
export type BannerLayout = 'overlay' | 'two_column'

/** Tamanho da imagem na coluna do layout `two_column` */
export type BannerImagemSize = 'sm' | 'md' | 'lg'

/** Raio das bordas do banner — `sm` 8px, `md` 16px, `lg` 24px */
export type BannerBorderRadius = 'sm' | 'md' | 'lg'

export const BANNER_BORDER_RADIUS_PX: Record<BannerBorderRadius, string> = {
  sm: '8px',
  md: '16px',
  lg: '24px',
}

/**
 * Largura de cada card no DragCarousel da coluna de imagens (`two_column`).
 * Mesma largura e altura da imagem padrão em cada breakpoint.
 */
export const BANNER_TWO_COLUMN_CAROUSEL_CARD_CLASS: Record<BannerImagemSize, string> = {
  sm: 'shrink-0 h-[220px] w-[300px] overflow-hidden md:h-[260px] md:w-[360px]',
  md: 'shrink-0 h-[320px] w-[420px] overflow-hidden md:h-[380px] md:w-[500px]',
  lg: 'shrink-0 h-[400px] w-[400px] overflow-hidden md:h-[480px] md:w-[480px]',
}

export function resolveBannerBorderRadius(
  value: BannerBorderRadius | undefined,
): string | undefined {
  if (!value) return undefined
  return BANNER_BORDER_RADIUS_PX[value]
}

/** Metadados do módulo `banner` */
export interface ModuloMetadadosBanner extends ModuloMetadadosCarousel, ModuloMetadadosMarginLateral {
  /** Agrupa banners `sm` consecutivos em DragCarousel (padrão: grid 2 colunas) */
  drag_carousel?: boolean
  /** Banner ocupa largura total da viewport (sem container) */
  full_width?: boolean
  /**
   * Quando `true`, usa o `margin_lateral` do módulo `faq` / `faq_page`
   * imediatamente acima ou abaixo na página.
   */
  use_same_faq_margin?: boolean
}

export interface BannerData {
  imagem?: string
  /** Clique na imagem (quando não há CTA ou como fallback) */
  link?: string
  layout?: BannerLayout
  size?: BannerSize
  /** Altura: `strip` = faixa 48:5 (1440×150), imagem em tamanho natural sem crop */
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
  /** Tamanho do quadrado da foto na coluna de imagem (`two_column`). Padrão: `lg` */
  imagem_size?: BannerImagemSize
  /** Substitui a imagem única por DragCarousel na coluna de imagens (`two_column`) */
  drag_carousel?: boolean
  /** URLs das imagens do carousel — usado quando `drag_carousel: true` */
  imagens?: string[]
  /** Estende o carousel além da margem direita do container até a borda da viewport */
  carousel_bleed_right?: boolean
  /** Estende o carousel além da margem esquerda do container até a borda da viewport */
  carousel_bleed_left?: boolean
  /** SectionCTA embutido — omitir para banner só imagem */
  section_cta?: SectionCTAData
  /** Gradiente escuro para legibilidade do texto sobre a imagem */
  overlay?: 'none' | 'gradient' | 'gradient-bottom'
  /** Exibe ícone de play central (thumbnail de vídeo) */
  play_overlay?: boolean
  /**
   * URL do embed (ex.: `https://www.youtube.com/embed/...`).
   * Com `play_overlay`, o clique troca o thumbnail pelo iframe no próprio site.
   */
  video_embed?: string
  rounded?: boolean
  /** Raio das bordas: `sm` 8px, `md` 16px, `lg` 24px. Sobrescreve `rounded` quando definido. */
  border_radius?: BannerBorderRadius
  /** Como a imagem preenche o banner no layout overlay. Padrão: `cover` */
  object_fit?: 'cover' | 'contain'
  /**
   * Decoração sobreposta à imagem no layout `two_column`
   * (ex.: estrela no canto da foto).
   */
  decoracao?: BannerDecoracao
  /** @deprecated Preferir `section_cta.titulo` */
  titulo?: string
  /** @deprecated Preferir `section_cta.descricao` */
  subtitulo?: string
  /** @deprecated Preferir `section_cta.cta` */
  cta?: string
}

export type BannerDecoracaoPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left'

export interface BannerDecoracao {
  imagem: string
  /** Posição relativa à foto. Padrão: `bottom-right` */
  position?: BannerDecoracaoPosition
  /** Largura em CSS (ex.: `52px`). Padrão: `52px` */
  width?: string
  /** Offset horizontal a partir da borda. Padrão: `-12px` */
  offset_x?: string
  /** Offset vertical a partir da borda. Padrão: `-12px` */
  offset_y?: string
}
