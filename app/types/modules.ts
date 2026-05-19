// Types para o sistema de módulos dinâmicos

export interface Unidade {
  id: number
  nome: string
  slug: string
  tema?: string
  logo?: string
  status: 'ativo' | 'inativo'
}

export interface ComponentData<T = Record<string, any>> {
  id: number
  type: string
  ordem: number
  status: 'publicado' | 'rascunho'
  data: T
}

export interface Modulo<T = Record<string, any>> {
  id: number
  tipo: string
  ordem: number
  status: 'publicado' | 'rascunho'
  metadados?: Record<string, any>
  components: ComponentData<T>[]
}

export interface UnidadeModulos {
  unidade: Unidade
  modulos: Modulo[]
}

// Types específicos para módulos conhecidos
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
