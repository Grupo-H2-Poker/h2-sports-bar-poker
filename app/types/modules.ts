// Types para o sistema de módulos dinâmicos

export interface Unidade {
  id: number
  nome: string
  slug: string
  tema?: string
  logo?: string
  status: 'ativo' | 'inativo'
}

export interface ComponentData {
  id: number
  type: string
  ordem: number
  status: 'publicado' | 'rascunho'
  data: Record<string, any>
}

export interface Modulo {
  id: number
  tipo: string
  ordem: number
  status: 'publicado' | 'rascunho'
  metadados?: Record<string, any>
  components: ComponentData[]
}

export interface UnidadeModulos {
  unidade: Unidade
  modulos: Modulo[]
}

// Types específicos para módulos conhecidos
export interface CardAgendaData {
  titulo: string
  descricao: string
  imagem: string
  data: string
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
