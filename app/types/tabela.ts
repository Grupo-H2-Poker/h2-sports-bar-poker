/** Tabela genérica CMS (ex.: prêmios Jackpot). */

export interface TabelaColunaData {
  id: string
  label: string
  /** Alinhamento da coluna. Padrão: `center` (ranking CPH / blinds). */
  align?: 'left' | 'center' | 'right'
}

/** Config do component `tabela_config` */
export interface TabelaConfigData {
  titulo?: string
  /** Subtítulo / nome da tabela (ex.: "Jogos premiados") — se omitido, usa headers */
  nota?: string
  colunas: TabelaColunaData[]
}

/** Linha — `cells` na mesma ordem de `colunas` */
export interface TabelaLinhaData {
  cells: string[]
}

export type ModuloMetadadosTabela = {
  /** Nota(s) abaixo da(s) tabela(s), uma por linha */
  notas?: string[]
}

export const TABELA_CONFIG_COMPONENT_TYPE = 'tabela_config' as const
export const TABELA_LINHA_COMPONENT_TYPE = 'tabela_linha' as const
