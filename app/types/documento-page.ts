import type { ModuloMetadadosMarginLateral } from '~/types/faq-page'

/** Seção lateral de página documental (regulamentos, privacidade, etc.). */
export interface DocumentoSecaoData {
  slug: string
  /** Pode incluir `\n` para quebra forçada no menu lateral. */
  titulo: string
  /** HTML ou texto corrido da seção ativa. */
  conteudo: string
}

export const DOCUMENTO_SECAO_COMPONENT_TYPE = 'documento_secao' as const

export const DOCUMENTO_PAGE_META_COMPONENT_TYPES = [
  'section_cta',
  DOCUMENTO_SECAO_COMPONENT_TYPE,
] as const

/** Metadados do módulo `documento_page` — mesma margem lateral do FAQ. */
export type ModuloMetadadosDocumentoPage = ModuloMetadadosMarginLateral
