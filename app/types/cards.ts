/** Configuração do bloco lateral (SectionCTA) — passada inteira via JSON */
export interface SectionCTAData {
  titulo?: string
  descricao?: string
  cta?: string
  cta_link?: string
  align?: 'left' | 'center' | 'right'
  size?: 'sm' | 'md' | 'lg'
}

export type CardVariant =
  | 'torneio'
  | 'cash_game'
  | 'torneio_detalhe'
  | 'torneio_preview'
  | 'cash_game_preview'

export type CardCorPreset = 'purple' | 'vermelho' | 'amarelo' | 'verde' | 'branco'

export interface CardBadge {
  texto: string
  cor?: CardCorPreset | string
}

export interface CardFavorito {
  visivel?: boolean
  ativo?: boolean
  cor?: 'verde' | 'branco'
}

export interface CardHorario {
  label: string
  valor: string
}

export interface CardBuyIn {
  label?: string
  preco: string
  pontos?: string
}

export type CardBotaoVariant = 'brand' | 'outline' | 'ghost' | 'default' | 'secondary' | 'solid'

export interface CardBotao {
  label: string
  variant?: CardBotaoVariant
  /** Preset ou classe Tailwind (ex. bg-white text-black) */
  cor?: CardCorPreset | string
  link?: string
}

export interface CardLinkFooter {
  texto: string
  link: string
}

export interface CardClasses {
  fundo?: string
  fundo_ativo?: string
  fundo_inativo?: string
  badge?: string
  estrela?: string
  botao_primario?: string
  botao_secundario?: string
  faixa_info?: string
}

/** Dados genéricos de card — `variant` define o layout */
export interface CardGenericData {
  variant: CardVariant

  badge?: CardBadge
  categoria?: string
  favorito?: CardFavorito

  titulo: string
  subtitulo?: string
  garantido?: string

  inicio?: string
  late?: string
  inscricoes?: string
  horarios?: CardHorario[]

  buy_in?: CardBuyIn
  faixa_info?: string
  descricao?: string

  botoes?: CardBotao[]
  link_footer?: CardLinkFooter

  /** Preset de tema ou classes customizadas */
  cor?: CardCorPreset
  classes?: CardClasses

  largura?: string
  altura?: string

  /** Preview: false deixa o card apagado (cinza). Padrão: true */
  ativo?: boolean

  /** Navegação ao clicar no card (quando não há botões com link) */
  link?: string
}
