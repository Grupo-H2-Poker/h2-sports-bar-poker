/** Metadados compartilhados por módulos com carrossel horizontal */
export interface ModuloMetadadosCarousel {
  /**
   * Estende o carrossel além da margem direita do container até a borda da viewport
   * (como a faixa de ranking / agenda preview com bleed).
   */
  carousel_bleed_right?: boolean
}

/**
 * Bleed à direita é calculado em runtime no DragCarousel
 * (distância do track até a borda da viewport — funciona no banner e na agenda preview).
 */

/**
 * Largura de cada slide no carrossel de banners `sm`.
 * `--carousel-width` = largura do container (fixa com ou sem `carousel_bleed_right`).
 */
export const BANNER_CAROUSEL_SLIDE_CLASS =
  'shrink-0 w-[min(85vw,320px)] sm:w-[calc((var(--carousel-width,320px)-1rem)/2)]' as const

/** Largura de cada slide no carrossel de imagens (`galeria`). */
export const GALERIA_CAROUSEL_SLIDE_CLASS =
  'shrink-0 w-[min(75vw,240px)] sm:w-[calc((var(--carousel-width,320px)-2rem)/3)] lg:w-[calc((var(--carousel-width,320px)-3rem)/4)]' as const
