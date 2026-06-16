import type { CardCorPreset } from '~/types/cards'

export interface RankingTabelaTabData {
  id: string
  label: string
}

export interface RankingTabelaColunaData {
  id: string
  label: string
}

/** Config do component `ranking_tabela_config` */
export interface RankingTabelaConfigData {
  titulo?: string
  logo?: string
  descricao?: string
  cor?: CardCorPreset
  background?: string
  cta?: string
  cta_link?: string
  tabs?: RankingTabelaTabData[]
  colunas?: RankingTabelaColunaData[]
}

/** Linha do ranking (component `ranking_linha`) */
export interface RankingTabelaLinhaData {
  /** Aba ativa — padrão: primeira tab ou `geral` */
  tab?: string
  colocacao: number | string
  nome: string
  avatar?: string
  pontos?: string | number
  premio?: string
  /** Top 3 — card destacado com foto */
  destacado?: boolean
}

export const RANKING_TABELA_CONFIG_COMPONENT_TYPE = 'ranking_tabela_config' as const
export const RANKING_TABELA_LINHA_COMPONENT_TYPE = 'ranking_linha' as const

export const RANKING_TABELA_META_COMPONENT_TYPES = [
  RANKING_TABELA_CONFIG_COMPONENT_TYPE,
] as const

const RANKING_TABELA_ACCENT: Record<CardCorPreset, string> = {
  purple: '#77158e',
  vermelho: '#d63d1d',
  amarelo: '#e6a23a',
  verde: '#1f5142',
  branco: '#e7e7e7',
}

export function resolveRankingTabelaAccent(config: RankingTabelaConfigData): string {
  if (config.background?.startsWith('#')) return config.background
  if (config.cor && config.cor in RANKING_TABELA_ACCENT) {
    return RANKING_TABELA_ACCENT[config.cor]
  }
  return RANKING_TABELA_ACCENT.vermelho
}

export const DEFAULT_RANKING_TABELA_COLUNAS: RankingTabelaColunaData[] = [
  { id: 'colocacao', label: 'Colocação' },
  { id: 'nome', label: 'Nome Sobrenome' },
  { id: 'pontos', label: 'Pontos' },
]

export const DEFAULT_RANKING_TABELA_TABS: RankingTabelaTabData[] = [
  { id: 'geral', label: 'Geral' },
]
