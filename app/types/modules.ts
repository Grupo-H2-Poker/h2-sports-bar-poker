// Types para o sistema de módulos dinâmicos

import type { ModuloMetadadosAgendaPreview } from '~/types/agenda-preview'
import type { BannerData, ModuloMetadadosBanner } from '~/types/banner'
import type { CardGenericData, SectionCTAData } from '~/types/cards'
import type { FaqCategoriaData, ModuloMetadadosFaqPage } from '~/types/faq-page'
import type { GridConfigData, GridToolbarData } from '~/types/grid'
import type { RankingConfigData, RankingPlayerData } from '~/types/ranking'

export type { BannerCtaPosition, BannerData, BannerHeight, BannerLayout, BannerSize, ModuloMetadadosBanner } from '~/types/banner'
export type { CardGenericData, SectionCTAData } from '~/types/cards'
export type { FaqCategoriaData, ModuloMetadadosFaqPage } from '~/types/faq-page'
export type { GridConfigData, GridToolbarData, GridItemType } from '~/types/grid'
export type { RankingConfigData, RankingPlayerData } from '~/types/ranking'

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

export interface Modulo<
  TData = Record<string, unknown>,
  TMetadados = Record<string, unknown>,
> {
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

export type ModuloMetadadosEmpty = Record<string, never>

// --- Dados de cada component (item dentro do módulo) ---

/** Card da agenda e demais telas — layout via `variant` no JSON */
export type CardAgendaData = CardGenericData

export interface GaleriaImagemData {
  imagem: string
  titulo?: string
  descricao?: string
  link?: string
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
  | 'faq'
  | 'faq_page'
  | 'embaixadores'
  | 'download_app'
  | 'eventos'

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
  faq: 'faq',
  faq_page: 'faq_categoria',
  embaixadores: 'embaixador',
  download_app: null,
  eventos: 'evento',
} as const satisfies Record<ModuloTipo, string | null>

export interface ModuloDataMap {
  agenda_preview: CardAgendaData | SectionCTAData
  grid: CardAgendaData | GaleriaImagemData | SectionCTAData | GridConfigData | GridToolbarData
  banner: BannerData
  galeria: GaleriaImagemData | SectionCTAData
  texto: TextoData
  ranking: RankingPlayerData | RankingConfigData
  faq: FaqItemData | SectionCTAData
  faq_page: FaqCategoriaData | SectionCTAData
  embaixadores: EmbaixadorData
  download_app: Record<string, never>
  eventos: EventoData | SectionCTAData
}

/** `components[].data` excluindo `section_cta` — tipo inferido por módulo */
export interface ModuloContentDataMap {
  agenda_preview: CardAgendaData
  grid: CardAgendaData | GaleriaImagemData
  banner: BannerData
  galeria: GaleriaImagemData
  texto: TextoData
  ranking: RankingPlayerData
  faq: FaqItemData
  faq_page: FaqItemData
  embaixadores: EmbaixadorData
  download_app: Record<string, never>
  eventos: EventoData
}

export interface ModuloMetadadosMap {
  agenda_preview: ModuloMetadadosAgendaPreview
  grid: ModuloMetadadosEmpty
  banner: ModuloMetadadosBanner
  galeria: ModuloMetadadosEmpty
  texto: ModuloMetadadosEmpty
  ranking: ModuloMetadadosEmpty
  faq: ModuloMetadadosEmpty
  faq_page: ModuloMetadadosFaqPage
  embaixadores: ModuloMetadadosTitulo
  download_app: ModuloMetadadosDownloadApp
  eventos: ModuloMetadadosEmpty
}

/** Módulo tipado pelo `tipo` — usar em todo `*Module.vue`: `modulo: ModuloOf<'agenda_preview'>` */
export type ModuloOf<T extends ModuloTipo> = Modulo<ModuloDataMap[T], ModuloMetadadosMap[T]>
