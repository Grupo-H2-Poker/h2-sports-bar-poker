import type { CardBotaoVariant, CardCorPreset } from '~/types/cards'

export type FaixaCtaAlignHorizontal = 'start' | 'center' | 'end' | 'between' | 'around'
export type FaixaCtaAlignVertical = 'start' | 'center' | 'end' | 'stretch'

/** Dados do component `faixa_cta` — faixa promocional com conteúdo + CTA */
export interface FaixaCtaData {
  titulo?: string
  descricao?: string
  cta?: string
  cta_link?: string

  backgroundColor?: string
  textColor?: string
  cta_backgroundColor?: string
  cta_textColor?: string
  /** Preset ou classe Tailwind do botão (sobrescreve cores customizadas quando definido) */
  cta_cor?: CardCorPreset | string
  cta_variant?: CardBotaoVariant

  fullWidth?: boolean
  gap?: string | number
  align_horizontal?: FaixaCtaAlignHorizontal
  align_vertical?: FaixaCtaAlignVertical
  padding?: string
  padding_x?: string
  padding_y?: string
  border?: string
  border_radius?: string

  titulo_size?: string
  descricao_size?: string

  /** Empilha conteúdo e botão em telas menores. Padrão: true */
  stack_mobile?: boolean
}

export const FAIXA_CTA_COMPONENT_TYPE = 'faixa_cta' as const

function toCssSize(value: string | number | undefined): string | undefined {
  if (value == null) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

export function resolveFaixaCtaBackgroundStyle(
  data: FaixaCtaData,
): Record<string, string> | undefined {
  if (!data.backgroundColor) return undefined
  return { backgroundColor: data.backgroundColor }
}

export function resolveFaixaCtaTextStyle(
  data: FaixaCtaData,
): Record<string, string> | undefined {
  if (!data.textColor) return undefined
  return { color: data.textColor }
}

export function resolveFaixaCtaPaddingStyle(
  data: FaixaCtaData,
): Record<string, string> | undefined {
  const style: Record<string, string> = {}

  if (data.padding) {
    style.padding = data.padding
    return style
  }

  const paddingX = toCssSize(data.padding_x)
  const paddingY = toCssSize(data.padding_y)

  if (paddingX) style.paddingLeft = paddingX
  if (paddingX) style.paddingRight = paddingX
  if (paddingY) style.paddingTop = paddingY
  if (paddingY) style.paddingBottom = paddingY

  return Object.keys(style).length > 0 ? style : undefined
}

export function resolveFaixaCtaBorderStyle(
  data: FaixaCtaData,
): Record<string, string> | undefined {
  const style: Record<string, string> = {}

  if (data.border) style.border = data.border
  if (data.border_radius) style.borderRadius = data.border_radius

  return Object.keys(style).length > 0 ? style : undefined
}

export function resolveFaixaCtaGapStyle(
  data: FaixaCtaData,
): Record<string, string> | undefined {
  const gap = toCssSize(data.gap)
  if (!gap) return undefined
  return { gap }
}

export function resolveFaixaCtaCtaStyle(
  data: FaixaCtaData,
): Record<string, string> | undefined {
  const style: Record<string, string> = {}

  if (data.cta_backgroundColor) style.backgroundColor = data.cta_backgroundColor
  if (data.cta_textColor) style.color = data.cta_textColor

  return Object.keys(style).length > 0 ? style : undefined
}

const HORIZONTAL_ALIGN_CLASS: Record<FaixaCtaAlignHorizontal, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
}

const VERTICAL_ALIGN_CLASS: Record<FaixaCtaAlignVertical, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

export function resolveFaixaCtaAlignClasses(data: FaixaCtaData): string[] {
  const horizontal = data.align_horizontal ?? 'start'
  const vertical = data.align_vertical ?? 'center'

  return [
    HORIZONTAL_ALIGN_CLASS[horizontal],
    VERTICAL_ALIGN_CLASS[vertical],
  ]
}
