import type { CardBotaoVariant, CardCorPreset } from '~/types/cards'

const PRESET_SOLID: Record<CardCorPreset, string> = {
  purple: 'bg-brand-purple text-white hover:bg-brand-purple/90',
  vermelho: 'bg-[#d63d1d] text-white hover:bg-[#d63d1d]/90',
  amarelo: 'bg-[#e6a23a] text-black hover:bg-[#e6a23a]/90',
  verde: 'bg-brand-green text-black hover:bg-brand-green/90',
  branco: 'bg-white text-black hover:bg-white/90',
}

const PRESET_OUTLINE: Record<CardCorPreset, string> = {
  purple: 'border border-brand-purple text-brand-purple bg-transparent hover:bg-brand-purple/10',
  vermelho: 'border border-[#d63d1d] text-[#d63d1d] bg-transparent hover:bg-[#d63d1d]/10',
  amarelo: 'border border-[#e6a23a] text-[#e6a23a] bg-transparent hover:bg-[#e6a23a]/10',
  verde: 'border border-brand-green text-brand-green bg-transparent hover:bg-brand-green/10',
  branco: 'border border-white text-white bg-transparent hover:bg-white/10',
}

function isPreset(cor: string | undefined): cor is CardCorPreset {
  return cor != null && cor in PRESET_SOLID
}

export function resolveSectionCtaButtonClass(
  cor?: CardCorPreset | string,
  variant: CardBotaoVariant = 'solid',
): string | undefined {
  if (!cor) return undefined

  if (typeof cor === 'string' && !isPreset(cor)) {
    return cor
  }

  const preset = isPreset(cor) ? cor : 'verde'
  const isOutline = variant === 'outline' || variant === 'ghost'
  return isOutline ? PRESET_OUTLINE[preset] : PRESET_SOLID[preset]
}
