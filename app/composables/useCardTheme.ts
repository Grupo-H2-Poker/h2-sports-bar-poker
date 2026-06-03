import type { CardCorPreset, CardGenericData } from '~/types/cards'

const PRESET_FUNDO: Record<CardCorPreset, { ativo: string; inativo: string }> = {
  purple: { ativo: 'bg-[#3c2348]', inativo: 'bg-[#2d1a35]' },
  vermelho: { ativo: 'bg-[#6e2a24]', inativo: 'bg-[#5d2320]' },
  amarelo: { ativo: 'bg-[#4a3d12]', inativo: 'bg-[#2d1a35]' },
  verde: { ativo: 'bg-[#1f5142]', inativo: 'bg-[#173d31]' },
  branco: { ativo: 'bg-zinc-700', inativo: 'bg-zinc-800' },
}

const PRESET_BADGE: Record<CardCorPreset, string> = {
  purple: 'bg-brand-purple text-white',
  vermelho: 'bg-[#c4392a] text-white',
  amarelo: 'bg-[#e6a23a] text-black',
  verde: 'bg-brand-green text-black',
  branco: 'bg-white text-black',
}

const PRESET_ESTRELA: Record<'verde' | 'branco', string> = {
  verde: 'text-brand-green',
  branco: 'text-white',
}

function isPreset(cor: string | undefined): cor is CardCorPreset {
  return cor != null && cor in PRESET_FUNDO
}

export function useCardTheme(dados: () => CardGenericData, active: () => boolean) {
  const preset = computed<CardCorPreset>(() => {
    const cor = dados().cor
    return isPreset(cor) ? cor : 'purple'
  })

  const fundoClass = computed(() => {
    const { classes } = dados()
    if (active()) {
      return classes?.fundo_ativo ?? classes?.fundo ?? PRESET_FUNDO[preset.value].ativo
    }
    return classes?.fundo_inativo ?? classes?.fundo ?? PRESET_FUNDO[preset.value].inativo
  })

  const badgeClass = (cor?: CardCorPreset | string) => {
    const custom = dados().classes?.badge
    if (custom) return custom
    if (cor && isPreset(cor)) return PRESET_BADGE[cor]
    if (cor && typeof cor === 'string') return cor
    return PRESET_BADGE[preset.value]
  }

  const estrelaClass = computed(() => {
    const custom = dados().classes?.estrela
    if (custom) return custom
    return PRESET_ESTRELA[dados().favorito?.cor ?? 'verde']
  })

  const faixaInfoClass = computed(
    () => dados().classes?.faixa_info ?? 'bg-brand-purple text-white',
  )

  return { fundoClass, badgeClass, estrelaClass, faixaInfoClass }
}

export function getCardHorarioInicio(data: CardGenericData): string | undefined {
  if (data.inicio) return data.inicio
  const slot = data.horarios?.find(
    h => h.label.toLowerCase().includes('início') || h.label.toLowerCase().includes('inicio'),
  )
  return slot?.valor
}
