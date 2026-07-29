/** Utilitários de data da agenda (filtro + agrupamento + label do detalhe). */

const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
] as const

/** Curto — tela de detalhe (`08 de Outubro | Quarta`) */
const DIAS_SEMANA_CURTO = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
] as const

/** Completo — cabeçalho da agenda (`Quarta-feira - 29 de julho`) */
const DIAS_SEMANA_COMPLETO = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
] as const

export interface DiaGrupo {
  /** Sempre ISO `YYYY-MM-DD` — uma data = um grupo */
  id: string
  label: string
  sortKey: string
}

function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y!, m! - 1, d!)
}

function toIsoDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function diffDays(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / 86_400_000)
}

/** Agenda só exibe hoje e datas futuras. */
export function isDataHojeOuFutura(iso: string, hoje: Date = new Date()): boolean {
  return parseIsoDate(iso) >= startOfDay(hoje)
}

/** Ex.: `08 de Outubro | Quarta` — detalhe do torneio. */
export function formatDataLabel(iso: string): string {
  const date = parseIsoDate(iso)
  const day = String(date.getDate()).padStart(2, '0')
  const mes = MESES[date.getMonth()]
  const weekday = DIAS_SEMANA_CURTO[date.getDay()]
  return `${day} de ${mes} | ${weekday}`
}

/** Ex.: `Quarta-feira - 29 de julho` — cabeçalho da agenda (estilo prod). */
export function formatAgendaDiaHeader(iso: string): string {
  const date = parseIsoDate(iso)
  const weekday = DIAS_SEMANA_COMPLETO[date.getDay()]
  const day = date.getDate()
  const mes = MESES[date.getMonth()]!.toLowerCase()
  return `${weekday} - ${day} de ${mes}`
}

/** Ex.: `08/10` — badge do card. */
export function formatDataBadge(iso: string): string {
  const date = parseIsoDate(iso)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}/${month}`
}

/**
 * Label inteligente comparado com o dia atual (só hoje → frente).
 * Hoje / Amanhã / Quarta-feira - 29 de julho
 */
export function formatDiaInteligente(iso: string, hoje: Date = new Date()): string {
  const date = startOfDay(parseIsoDate(iso))
  const today = startOfDay(hoje)
  const delta = diffDays(date, today)

  if (delta === 0) return 'Hoje'
  if (delta === 1) return 'Amanhã'

  return formatAgendaDiaHeader(iso)
}

/**
 * Grupo da agenda: sempre 1 data ISO = 1 grupo.
 * O label é inteligente (Hoje, Amanhã, Quarta-feira - 29 de julho…).
 */
export function resolveDiaGrupo(iso: string, hoje: Date = new Date()): DiaGrupo {
  return {
    id: iso,
    label: formatDiaInteligente(iso, hoje),
    sortKey: iso,
  }
}

/** Ordena hoje → futuro (mais perto primeiro). */
export function sortDiaGrupos<T extends { sortKey: string }>(groups: T[]): T[] {
  return [...groups].sort((a, b) => a.sortKey.localeCompare(b.sortKey))
}

/** Opções de filtro `dia` — só hoje/futuro; id = ISO, label inteligente. */
export function buildDiaFilterOptions(
  datas: string[],
  hoje: Date = new Date(),
): { id: string, label: string }[] {
  const unique = [...new Set(datas.filter(iso => iso && isDataHojeOuFutura(iso, hoje)))]
  const groups = unique.map(iso => resolveDiaGrupo(iso, hoje))
  return sortDiaGrupos(groups).map(({ id, label }) => ({ id, label }))
}
