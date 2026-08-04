// Types para o sistema de módulos dinâmicos

import type { FooterData } from '~/types/footer'
import type { ModuloMetadadosAgendaPreview } from '~/types/agenda-preview'
import type { BannerData, ModuloMetadadosBanner } from '~/types/banner'
import type { CardGenericData, SectionCTAData } from '~/types/cards'
import type { FaqCategoriaData, ModuloMetadadosFaq, ModuloMetadadosFaqPage } from '~/types/faq-page'
import type { GridConfigData, GridToolbarData } from '~/types/grid'
import type { RankingConfigData, RankingPlayerData } from '~/types/ranking'
import type { FaixaCtaData } from '~/types/faixa-cta'
import type { RankingTabelaConfigData, RankingTabelaLinhaData } from '~/types/ranking-tabela'
import type { ModuloMetadadosGaleria } from '~/types/galeria'

export type { BannerCtaPosition, BannerData, BannerHeight, BannerImagemSize, BannerLayout, BannerSize, ModuloMetadadosBanner } from '~/types/banner'
export type { CardGenericData, SectionCTAData } from '~/types/cards'
export type { FaqCategoriaData, ModuloMetadadosFaq, ModuloMetadadosFaqPage } from '~/types/faq-page'
export type { GridConfigData, GridToolbarData, GridItemType } from '~/types/grid'
export type { FaixaCtaData } from '~/types/faixa-cta'
export type { RankingTabelaConfigData, RankingTabelaLinhaData } from '~/types/ranking-tabela'

export interface Unidade {
  id: number
  nome: string
  slug: string
  tema?: string
  logo?: string
  status: 'ativo' | 'inativo'
}

export interface ComponentData<T = Record<string, unknown>> {
  id: number
  type: string
  ordem: number
  status: 'publicado' | 'rascunho'
  data: T
}

/** Espaçamento vertical configurável via CMS (entre módulos da página). */
export interface ModuloSpacing {
  /** Número (px) ou valor CSS (ex: `2.5rem`, `40px`). Padrão: ver `MODULO_DEFAULT_MARGIN_TOP`. */
  margin_top?: string | number
  /** Número (px) ou valor CSS (ex: `2.5rem`, `40px`). Padrão: ver `MODULO_DEFAULT_MARGIN_BOTTOM`. */
  margin_bottom?: string | number
}

export interface Modulo<
  TData = Record<string, unknown>,
  TMetadados = Record<string, unknown>,
> extends ModuloSpacing {
  id: number
  tipo: ModuloTipo
  ordem: number
  status: 'publicado' | 'rascunho'
  metadados?: TMetadados
  components: ComponentData<TData>[]
}

export interface Pagina {
  slug: string
  titulo?: string
  ordem?: number
  status: 'publicado' | 'rascunho'
  modulos: Modulo[]
}

export const PAGINA_HOME_SLUG = 'home' as const

export interface UnidadeModulos {
  unidade: Unidade
  menu?: HeaderMenuItem[]
  footer?: FooterData
  paginas: Pagina[]
  /** @deprecated Use `paginas`. Mantido só para compatibilidade temporária. */
  modulos?: Modulo[]
}

export interface HeaderMenuBaseItem {
  id: string
  label: string
}

export interface HeaderMenuLinkItem extends HeaderMenuBaseItem {
  kind: 'link'
  /** URL externa ou path legado (ex: /agenda). Preferir `pagina` para rotas da unidade. */
  to?: string
  /** Slug da página no JSON (`paginas[].slug`). Ex: `agenda` → `/{unidade}/agenda` */
  pagina?: string
  external?: boolean
}

export interface HeaderMenuDropdownItem extends HeaderMenuBaseItem {
  kind: 'dropdown'
  items: HeaderMenuLinkItem[]
}

export type HeaderMenuItem = HeaderMenuLinkItem | HeaderMenuDropdownItem

// --- Metadados (cabeçalho / config da seção) ---

/** @deprecated Alias de `SectionCTAData` — usar como `data` do component `section_cta`, não em `metadados` */
export type ModuloMetadadosSection = SectionCTAData

export interface ModuloMetadadosTitulo {
  titulo?: string
}

export interface ModuloMetadadosDownloadApp {
  titulo?: string
  descricao?: string
  link_android?: string
  link_ios?: string
}

export interface ModuloMetadadosTexto {
  align?: 'left' | 'center'
  max_width?: 'sm' | 'md' | 'lg' | 'full'
  background?: 'default' | 'none'
}

export type ModuloMetadadosEmpty = Record<string, never>

// --- Dados de cada component (item dentro do módulo) ---

/** Card da agenda e demais telas — layout via `variant` no JSON */
export type CardAgendaData = CardGenericData

/** Foto individual dentro de um álbum da galeria. */
export interface GaleriaFotoData {
  imagem: string
  titulo?: string
}

export interface GaleriaImagemData {
  imagem: string
  titulo?: string
  descricao?: string
  /**
   * Destino ao clicar no card.
   * Relativo à unidade (`agenda`, `series/cph`, `faq`) ou URL absoluta (`https://...`).
   */
  link?: string
  /** ID da série para filtro (ex.: `cph`, `fun-festival`). */
  series?: string
  /** Label exibida no filtro (ex.: `CPH`). Se omitida, usa `series`. */
  series_label?: string
  /** ID da etapa para filtro (ex.: `1`, `2`). */
  etapa?: string
  /**
   * Fotos do álbum (capa = `imagem`).
   * Ao clicar na capa, o módulo abre o grid dessas fotos.
   */
  fotos?: GaleriaFotoData[]
}

export interface EventoData {
  titulo: string
  descricao?: string
  imagem?: string
  cta?: string
  link?: string
}

export interface TextoData {
  titulo?: string
  conteudo?: string
  cta?: string
  cta_link?: string
}

export interface FaqItemData {
  pergunta: string
  resposta: string
}

export interface EmbaixadorData {
  nome: string
  foto?: string
}

// --- Registry: tipo do módulo → shapes de data e metadados ---

export type ModuloTipo =
  | 'agenda_preview'
  | 'grid'
  | 'banner'
  | 'galeria'
  | 'texto'
  | 'ranking'
  | 'ranking_tabela'
  | 'faq'
  | 'faq_page'
  | 'embaixadores'
  | 'download_app'
  | 'eventos'
  | 'faixa_cta'

/**
 * Tipo de component transversal — pode aparecer no `components[]` de qualquer
 * módulo (ex.: bloco de título/CTA da seção). `data` segue `SectionCTAData`.
 */
export const SECTION_CTA_COMPONENT_TYPE = 'section_cta' as const

/** Tipo do item em `components[]` para cada módulo (valor de `component.type` no JSON) */
export const MODULO_COMPONENT_TYPE = {
  agenda_preview: 'card',
  grid: 'card',
  banner: 'banner',
  galeria: 'imagem',
  texto: 'texto',
  ranking: 'ranking',
  ranking_tabela: 'ranking_linha',
  faq: 'faq',
  faq_page: 'faq_categoria',
  embaixadores: 'embaixador',
  download_app: null,
  eventos: 'evento',
  faixa_cta: 'faixa_cta',
} as const satisfies Record<ModuloTipo, string | null>

export interface ModuloDataMap {
  agenda_preview: CardAgendaData | SectionCTAData
  grid: CardAgendaData | GaleriaImagemData | SectionCTAData | GridConfigData | GridToolbarData
  banner: BannerData
  galeria: GaleriaImagemData | SectionCTAData
  texto: TextoData
  ranking: RankingPlayerData | RankingConfigData
  ranking_tabela: RankingTabelaLinhaData | RankingTabelaConfigData | SectionCTAData
  faq: FaqItemData | SectionCTAData
  faq_page: FaqCategoriaData | SectionCTAData
  embaixadores: EmbaixadorData
  download_app: Record<string, never>
  eventos: EventoData | SectionCTAData
  faixa_cta: FaixaCtaData
}

/** `components[].data` excluindo `section_cta` — tipo inferido por módulo */
export interface ModuloContentDataMap {
  agenda_preview: CardAgendaData
  grid: CardAgendaData | GaleriaImagemData
  banner: BannerData
  galeria: GaleriaImagemData
  texto: TextoData
  ranking: RankingPlayerData
  ranking_tabela: RankingTabelaLinhaData
  faq: FaqItemData
  faq_page: FaqItemData
  embaixadores: EmbaixadorData
  download_app: Record<string, never>
  eventos: EventoData
  faixa_cta: FaixaCtaData
}

export interface ModuloMetadadosMap {
  agenda_preview: ModuloMetadadosAgendaPreview
  grid: ModuloMetadadosEmpty
  banner: ModuloMetadadosBanner
  galeria: ModuloMetadadosGaleria
  texto: ModuloMetadadosTexto
  ranking: ModuloMetadadosEmpty
  ranking_tabela: ModuloMetadadosEmpty
  faq: ModuloMetadadosFaq
  faq_page: ModuloMetadadosFaqPage
  embaixadores: ModuloMetadadosTitulo
  download_app: ModuloMetadadosDownloadApp
  eventos: ModuloMetadadosEmpty
  faixa_cta: ModuloMetadadosEmpty
}

/** Módulo tipado pelo `tipo` — usar em todo `*Module.vue`: `modulo: ModuloOf<'agenda_preview'>` */
export type ModuloOf<T extends ModuloTipo> = Modulo<ModuloDataMap[T], ModuloMetadadosMap[T]>
