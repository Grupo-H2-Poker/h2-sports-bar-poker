// Types para o sistema de módulos dinâmicos

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

export interface UnidadeModulos {
  unidade: Unidade
  modulos: Modulo[]
}

// --- Metadados (cabeçalho / config da seção) ---

export interface ModuloMetadadosSection {
  titulo?: string
  descricao?: string
  cta?: string
  cta_link?: string
  align?: 'left' | 'center' | 'right'
  size?: 'sm' | 'md' | 'lg'
}

export interface ModuloMetadadosTitulo {
  titulo?: string
}

export interface ModuloMetadadosRanking {
  titulo?: string
  logo?: string
}

export interface ModuloMetadadosDownloadApp {
  titulo?: string
  descricao?: string
  link_android?: string
  link_ios?: string
}

export type ModuloMetadadosEmpty = Record<string, never>

// --- Dados de cada component (item dentro do módulo) ---

export interface CardAgendaData {
  titulo: string
  garantido?: string
  inicio: string
  late?: string
  inscricoes?: string
  link?: string
}

export interface BannerData {
  titulo?: string
  subtitulo?: string
  imagem: string
  link?: string
  cta?: string
}

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

export interface RankingPlayerData {
  nome: string
  avatar?: string
}

export interface EmbaixadorData {
  nome: string
  foto?: string
}

// --- Registry: tipo do módulo → shapes de data e metadados ---

export type ModuloTipo =
  | 'agenda'
  | 'banner'
  | 'galeria'
  | 'texto'
  | 'ranking'
  | 'faq'
  | 'embaixadores'
  | 'download_app'
  | 'eventos'

/** Tipo do item em `components[]` para cada módulo (valor de `component.type` no JSON) */
export const MODULO_COMPONENT_TYPE = {
  agenda: 'card',
  banner: 'banner',
  galeria: 'imagem',
  texto: 'texto',
  ranking: 'ranking',
  faq: 'faq',
  embaixadores: 'embaixador',
  download_app: null,
  eventos: 'evento',
} as const satisfies Record<ModuloTipo, string | null>

export interface ModuloDataMap {
  agenda: CardAgendaData
  banner: BannerData
  galeria: GaleriaImagemData
  texto: TextoData
  ranking: RankingPlayerData
  faq: FaqItemData
  embaixadores: EmbaixadorData
  download_app: Record<string, never>
  eventos: EventoData
}

export interface ModuloMetadadosMap {
  agenda: ModuloMetadadosSection
  banner: ModuloMetadadosEmpty
  galeria: ModuloMetadadosSection
  texto: ModuloMetadadosEmpty
  ranking: ModuloMetadadosRanking
  faq: ModuloMetadadosSection
  embaixadores: ModuloMetadadosTitulo
  download_app: ModuloMetadadosDownloadApp
  eventos: ModuloMetadadosSection
}

/** Módulo tipado pelo `tipo` — usar em todo `*Module.vue`: `modulo: ModuloOf<'agenda'>` */
export type ModuloOf<T extends ModuloTipo> = Modulo<ModuloDataMap[T], ModuloMetadadosMap[T]>
