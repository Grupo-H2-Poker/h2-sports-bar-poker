/** Configuração do bloco lateral (SectionCTA) — passada inteira via JSON */
export interface SectionCTAData {
  titulo?: string
  /** Mantém o título em uma única linha */
  titulo_nowrap?: boolean
  descricao?: string
  /** Descrições adicionais — renderizadas abaixo de `descricao` com espaçamento */
  descricao_2?: string
  descricao_3?: string
  descricao_4?: string
  cta?: string
  cta_link?: string
  align?: 'left' | 'center' | 'right'
  /** Tamanho da tipografia (título, descrição, botão) */
  size?: 'sm' | 'md' | 'lg'
  /** Largura máxima do bloco de descrições — `sm` deixa o texto mais junto; `full` preenche o container do módulo */
  width?: 'sm' | 'md' | 'lg' | 'full'
  /** Preset ou classe Tailwind do botão CTA (ex.: `branco`, `verde`, `vermelho`) */
  cta_cor?: CardCorPreset | string
  /** Variante visual do botão CTA — padrão: `solid` */
  cta_variant?: CardBotaoVariant
  /** Aba do módulo (ex.: ranking_tabela) — associa o bloco ao filtro ativo */
  tab?: string
}

export type CardVariant =
  | 'torneio'
  | 'cash_game'
  | 'torneio_detalhe'
  | 'torneio_preview'
  | 'cash_game_preview'
  | 'etapa_preview'
  /** Agenda preview: valor + label centralizados (ex.: números de eventos) */
  | 'numero'
  /** Agenda preview: só imagem (ex.: equipe) */
  | 'imagem'
  /** Agenda preview / grid: depoimento com foto, título, texto e autor */
  | 'depoimento'

export type CardCorPreset = 'purple' | 'vermelho' | 'amarelo' | 'verde' | 'branco'

export interface CardBadge {
  texto: string
  cor?: CardCorPreset | string
}

export interface CardFavorito {
  visivel?: boolean
  /**
   * Ignorado no front — o estado ativo vem de `useFavoritosTorneios`
   * (perfil do usuário / localStorage). Mantido por compatibilidade com CMS.
   */
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

  /** Valores por seção de filtro da agenda (ex.: `{ local: 'online', buy_in: '50-200' }`) */
  filtros?: Record<string, string>

  /** Data do evento (ISO `YYYY-MM-DD`) — o front compara com hoje e monta o label */
  data?: string

  largura?: string
  altura?: string

  /** Preview: false deixa o card apagado (cinza). Padrão: true */
  ativo?: boolean

  /** Identificador estável (agenda / detalhe / cash game) */
  slug?: string

  /** Navegação ao clicar no card (quando não há botões com link) */
  link?: string

  /** Imagem de fundo / capa (`imagem`, `depoimento`, capas de evento) */
  imagem?: string

  /**
   * Variante `imagem`: exibe `titulo` em barra abaixo da foto
   * (ex.: mãos premiadas do Jackpot).
   */
  legenda?: boolean

  /** Autor / assinatura — usado em `depoimento` (fallback: `subtitulo`) */
  autor?: string
}
