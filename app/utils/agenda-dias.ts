/** Utilitários de data da agenda (filtro + agrupamento + label do detalhe). */

export type AgendaLocale = 'pt' | 'en' | 'es' | 'zh' | 'ja'

const MESES: Record<AgendaLocale, string[]> = {
  pt: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  zh: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  ja: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
}

const DIAS_SEMANA_CURTO: Record<AgendaLocale, string[]> = {
  pt: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  zh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  ja: ['日', '月', '火', '水', '木', '金', '土'],
}

const DIAS_SEMANA_COMPLETO: Record<AgendaLocale, string[]> = {
  pt: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  zh: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  ja: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
}

const HOJE: Record<AgendaLocale, string> = {
  pt: 'Hoje',
  en: 'Today',
  es: 'Hoy',
  zh: '今天',
  ja: '今日',
}

const AMANHA: Record<AgendaLocale, string> = {
  pt: 'Amanhã',
  en: 'Tomorrow',
  es: 'Mañana',
  zh: '明天',
  ja: '明日',
}

export interface DiaGrupo {
  /** Sempre ISO `YYYY-MM-DD` — uma data = um grupo */
  id: string
  label: string
  sortKey: string
}

function resolveLocale(locale?: string): AgendaLocale {
  const code = (locale ?? 'pt').toLowerCase().split('-')[0]
  if (code === 'en' || code === 'es' || code === 'zh' || code === 'ja') return code
  return 'pt'
}

function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y!, m! - 1, d!)
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
export function formatDataLabel(iso: string, locale?: string): string {
  const lang = resolveLocale(locale)
  const date = parseIsoDate(iso)
  const day = String(date.getDate()).padStart(2, '0')
  const mes = MESES[lang][date.getMonth()]!
  const weekday = DIAS_SEMANA_CURTO[lang][date.getDay()]!

  if (lang === 'en') return `${day} ${mes} | ${weekday}`
  if (lang === 'zh' || lang === 'ja') return `${mes}${Number(day)}日 | ${weekday}`
  return `${day} de ${mes} | ${weekday}`
}

/** Ex.: `Quarta-feira - 29 de julho` — cabeçalho da agenda (estilo prod). */
export function formatAgendaDiaHeader(iso: string, locale?: string): string {
  const lang = resolveLocale(locale)
  const date = parseIsoDate(iso)
  const weekday = DIAS_SEMANA_COMPLETO[lang][date.getDay()]!
  const day = date.getDate()
  const mesRaw = MESES[lang][date.getMonth()]!
  const mes = lang === 'pt' || lang === 'es' ? mesRaw.toLowerCase() : mesRaw

  if (lang === 'en') return `${weekday} - ${day} ${mes}`
  if (lang === 'zh' || lang === 'ja') return `${weekday} - ${mes}${day}日`
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
export function formatDiaInteligente(iso: string, hoje: Date = new Date(), locale?: string): string {
  const lang = resolveLocale(locale)
  const date = startOfDay(parseIsoDate(iso))
  const today = startOfDay(hoje)
  const delta = diffDays(date, today)

  if (delta === 0) return HOJE[lang]
  if (delta === 1) return AMANHA[lang]

  return formatAgendaDiaHeader(iso, lang)
}

/**
 * Grupo da agenda: sempre 1 data ISO = 1 grupo.
 * O label é inteligente (Hoje, Amanhã, Quarta-feira - 29 de julho…).
 */
export function resolveDiaGrupo(iso: string, hoje: Date = new Date(), locale?: string): DiaGrupo {
  return {
    id: iso,
    label: formatDiaInteligente(iso, hoje, locale),
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
  locale?: string,
): { id: string, label: string }[] {
  const unique = [...new Set(datas.filter(iso => iso && isDataHojeOuFutura(iso, hoje)))]
  const groups = unique.map(iso => resolveDiaGrupo(iso, hoje, locale))
  return sortDiaGrupos(groups).map(({ id, label }) => ({ id, label }))
}
