import type { FaqItemData } from '~/types/modules'

export interface FaqCategoriaData {
  slug: string
  titulo: string
  perguntas: FaqItemData[]
}

export const FAQ_CATEGORIA_COMPONENT_TYPE = 'faq_categoria' as const

export const FAQ_PAGE_META_COMPONENT_TYPES = [
  'section_cta',
  FAQ_CATEGORIA_COMPONENT_TYPE,
] as const

/** Metadados do módulo `faq_page` */
export interface ModuloMetadadosFaqPage {
  /** Margem horizontal da página — número (px) ou valor CSS (ex: `2rem`, `24px`). Padrão: `1rem`. */
  margin_lateral?: string | number
}
