import type { ButtonVariants } from '~/components/ui/button'
import type { CardBotaoVariant, CardCorPreset } from '~/types/cards'

/**
 * Estilos de botão CTA do site — fonte única.
 * Usar com `Button` variant `plain` (presets) ou `brand` (verde sólido).
 * Evitar copiar essas classes nos componentes.
 */

const HOVER = {
  purple: 'hover:bg-brand-purple/10 hover:text-brand-purple dark:hover:bg-brand-purple/10 dark:hover:text-brand-purple',
  vermelho: 'hover:bg-[#d63d1d]/10 hover:text-[#d63d1d] dark:hover:bg-[#d63d1d]/10 dark:hover:text-[#d63d1d]',
  amarelo: 'hover:bg-[#e6a23a]/10 hover:text-[#e6a23a] dark:hover:bg-[#e6a23a]/10 dark:hover:text-[#e6a23a]',
  verde: 'hover:bg-brand-green/10 hover:text-brand-green dark:hover:bg-brand-green/10 dark:hover:text-brand-green',
  branco: 'hover:bg-white/10 hover:text-white dark:hover:bg-white/10 dark:hover:text-white',
} as const

const PRESET_SOLID: Record<CardCorPreset, string> = {
  purple: `bg-brand-purple text-white hover:bg-brand-purple/90 dark:hover:bg-brand-purple/90 dark:hover:text-white`,
  vermelho: `bg-[#d63d1d] text-white hover:bg-[#d63d1d]/90 dark:hover:bg-[#d63d1d]/90 dark:hover:text-white`,
  amarelo: `bg-[#e6a23a] text-black hover:bg-[#e6a23a]/90 dark:hover:bg-[#e6a23a]/90 dark:hover:text-black`,
  /** Verde sólido vive em `.btn-green-solid` / variant `brand` */
  verde: 'btn-green-solid',
  branco: `bg-white text-black hover:bg-white/90 dark:hover:bg-white/90 dark:hover:text-black`,
}

const PRESET_OUTLINE: Record<CardCorPreset, string> = {
  purple: `outline-smooth-purple text-brand-purple bg-transparent ${HOVER.purple}`,
  vermelho: `outline-smooth-vermelho text-[#d63d1d] bg-transparent ${HOVER.vermelho}`,
  amarelo: `outline-smooth-amarelo text-[#e6a23a] bg-transparent ${HOVER.amarelo}`,
  verde: `outline-smooth-green text-brand-green bg-transparent ${HOVER.verde}`,
  branco: `outline-smooth-white text-white bg-transparent ${HOVER.branco}`,
}

function isPreset(cor: string | undefined): cor is CardCorPreset {
  return cor != null && cor in PRESET_SOLID
}

function isOutlineVariant(variant: CardBotaoVariant): boolean {
  return variant === 'outline' || variant === 'ghost'
}

/**
 * Classes Tailwind do preset. `undefined` = usar variant `brand` do Button.
 * String custom (não-preset) é repassada como está.
 */
export function resolveSectionCtaButtonClass(
  cor?: CardCorPreset | string,
  variant: CardBotaoVariant = 'solid',
): string | undefined {
  if (!cor) return undefined

  if (typeof cor === 'string' && !isPreset(cor)) {
    return cor
  }

  const preset = isPreset(cor) ? cor : 'verde'
  return isOutlineVariant(variant) ? PRESET_OUTLINE[preset] : PRESET_SOLID[preset]
}

export type CtaButtonAppearance = {
  /** Sempre `plain` (preset) ou `brand` (verde sólido padrão) */
  variant: NonNullable<ButtonVariants['variant']>
  class?: string
}

/**
 * Aparência completa para `<Button v-bind="appearance">`.
 * Centraliza a escolha entre `brand` e `plain` + classes de cor.
 */
export function resolveCtaButtonAppearance(
  cor?: CardCorPreset | string,
  variant: CardBotaoVariant = 'solid',
): CtaButtonAppearance {
  const className = resolveSectionCtaButtonClass(cor, variant)

  if (!className || className === 'btn-green-solid') {
    return { variant: 'brand' }
  }

  return { variant: 'plain', class: className }
}
