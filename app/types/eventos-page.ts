import type { SectionCTAData } from '~/types/cards'

/** Célula do mosaico (imagem ou bloco de texto sobre fundo). */
export interface MosaicoCelulaData {
  /** Imagem de fundo — se omitida, usa só `titulo` + `background` */
  imagem?: string
  titulo?: string
  /** Cor de fundo (ex.: `#77158e`). Padrão: transparente / muted */
  background?: string
  link?: string
}

export type ModuloMetadadosMosaico = {
  /** Colunas no desktop. Padrão: 4 */
  colunas?: 2 | 3 | 4
}

export const MOSAICO_CELULA_COMPONENT_TYPE = 'mosaico_celula' as const

export interface FormularioCampoData {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'select'
  placeholder?: string
  options?: string[]
  required?: boolean
}

/**
 * Config legado do formulário.
 * Preferir `section_cta` (título/descrição) + `metadados.submit_label` / `metadados.nota`.
 */
export interface FormularioConfigData {
  titulo?: string
  descricao?: string
  submit_label?: string
  nota?: string
  background?: string
  campos?: FormularioCampoData[]
}

export type ModuloMetadadosFormulario = {
  background?: string
  border_radius?: string
  /**
   * Quando `true`, o painel fica full-bleed e encosta no footer
   * (cancela o `mt-16` do footer via margem negativa).
   */
  flush_footer?: boolean
  submit_label?: string
  nota?: string
}

export const FORMULARIO_CAMPO_COMPONENT_TYPE = 'formulario_campo' as const
export const FORMULARIO_CONFIG_COMPONENT_TYPE = 'formulario_config' as const

/** Logo de parceiro / marca. */
export interface ParceiroLogoData {
  imagem?: string
  alt?: string
  link?: string
}

export type ModuloMetadadosParceiros = Record<string, never>

export const PARCEIRO_LOGO_COMPONENT_TYPE = 'parceiro_logo' as const

/** Metadados do módulo `eventos` (carrossel / grid de capas). */
export type ModuloMetadadosEventos = {
  /** `grid` — grade fixa (hero Eventos). `carousel` — shadcn carousel (padrão legado). */
  layout?: 'grid' | 'carousel'
}

export type { SectionCTAData }
