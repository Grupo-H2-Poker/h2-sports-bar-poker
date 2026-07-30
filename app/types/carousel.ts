/** Metadados compartilhados por módulos com carrossel horizontal */
export interface ModuloMetadadosCarousel {
  /**
   * Estende o carrossel além da margem direita do container até a borda da viewport
   * (como a faixa de ranking / agenda preview com bleed).
   */
  carousel_bleed_right?: boolean
  /**
   * Estende o carrossel além da margem esquerda até a borda da viewport.
   * No estado inicial o conteúdo fica alinhado à margem do container; ao rolar,
   * os cards ocupam a área de bleed à esquerda.
   */
  carousel_bleed_left?: boolean
}

/**
 * Bleed esquerda/direita é calculado em runtime no DragCarousel
 * (distância do track até a borda da viewport — funciona no banner e na agenda preview).
 */

/**
 * Largura de cada slide no carrossel de banners `sm`.
 * `--carousel-width` = largura do container (fixa com ou sem bleed).
 */
export const BANNER_CAROUSEL_SLIDE_CLASS =
  'shrink-0 w-[min(85vw,320px)] sm:w-[calc((var(--carousel-width,320px)-1rem)/2)]' as const

/** Largura de cada slide no carrossel de imagens (`galeria`) — 345px no Figma. */
export const GALERIA_CAROUSEL_SLIDE_CLASS =
  'shrink-0 w-[min(85vw,345px)]' as const
