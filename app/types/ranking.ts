import type { CardCorPreset } from '~/types/cards'

/** Config do component `ranking_config` — faixa de ranking */
export interface RankingConfigData {
  /** Texto ao lado do logo. Padrão: "Ranking" */
  titulo?: string
  /** Logo da etapa/série (ex.: CPH, FUN) */
  logo?: string
  /** Preset de cor de fundo */
  cor?: CardCorPreset
  /** Classe Tailwind ou cor CSS customizada (sobrescreve `cor`) */
  background?: string
  /** Label do botão CTA */
  cta?: string
  /** Link do botão CTA */
  cta_link?: string
}

/** Dados de cada jogador no ranking (component `ranking`) */
export interface RankingPlayerData {
  nome: string
  avatar?: string
  pontos?: string | number
}

export const RANKING_CONFIG_COMPONENT_TYPE = 'ranking_config' as const
export const RANKING_PLAYER_COMPONENT_TYPE = 'ranking' as const

export const RANKING_META_COMPONENT_TYPES = [
  RANKING_CONFIG_COMPONENT_TYPE,
] as const

const RANKING_BACKGROUND_PRESET: Record<CardCorPreset, string> = {
  purple: 'bg-[#3c2348]',
  vermelho: 'bg-[#6e2a24]',
  amarelo: 'bg-[#4a3d12]',
  verde: 'bg-[#1f5142]',
  branco: 'bg-[#1a1a1a]',
}

export function resolveRankingBackground(config: RankingConfigData): string {
  if (config.background) {
    if (config.background.startsWith('#') || config.background.startsWith('rgb')) {
      return ''
    }
    return config.background
  }
  if (config.cor && config.cor in RANKING_BACKGROUND_PRESET) {
    return RANKING_BACKGROUND_PRESET[config.cor]
  }
  return RANKING_BACKGROUND_PRESET.purple
}

export function resolveRankingBackgroundStyle(config: RankingConfigData): Record<string, string> | undefined {
  const bg = config.background
  if (bg && (bg.startsWith('#') || bg.startsWith('rgb'))) {
    return { backgroundColor: bg }
  }
  return undefined
}
