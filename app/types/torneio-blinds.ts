/** Linha de nível na tabela de blinds */
export interface TorneioBlindsLevelRow {
  type: 'level'
  nivel: number
  duracao: string
  small: string
  big: string
  ante: string
}

/** Separador (break / late registration) */
export interface TorneioBlindsSeparatorRow {
  type: 'separator'
  label: string
}

export type TorneioBlindsRow = TorneioBlindsLevelRow | TorneioBlindsSeparatorRow

export interface TorneioBlindsData {
  slug: string
  titulo: string
  rows: TorneioBlindsRow[]
}
