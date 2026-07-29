export type FooterSocialTipo = 'instagram' | 'youtube'

export interface FooterSocialItem {
  id: string
  tipo: FooterSocialTipo
  url: string
  label: string
}

export interface FooterLinkItem {
  id: string
  label: string
  /** URL externa ou path legado. Preferir `pagina` para rotas da unidade. */
  to?: string
  /** Slug da página no JSON (`paginas[].slug`). */
  pagina?: string
  external?: boolean
  /** Links em destaque (ex.: Jackpot, H2bet) — tipografia de título. */
  estilo?: 'destaque'
}

export interface FooterSecao {
  id: string
  titulo?: string
  links: FooterLinkItem[]
}

export interface FooterColuna {
  id: string
  secoes: FooterSecao[]
}

export interface FooterAviso {
  texto: string
  idade_minima?: number
}

export interface FooterData {
  hashtag: string
  copyright: string
  endereco: string
  redes_sociais: FooterSocialItem[]
  colunas: FooterColuna[]
  /** Opcional — o selo 18+ + T&C já é renderizado no layout. */
  aviso?: FooterAviso
}
