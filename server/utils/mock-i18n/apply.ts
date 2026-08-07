import type { CmsLocale } from './types'
import { CMS_SKIP_KEYS } from './skip-keys'

type Dictionary = Record<string, string>

type PatternRule = {
  /** Match against full string; replace with locale-specific transform */
  test: (value: string) => boolean
  replace: (value: string, locale: CmsLocale) => string
}

/**
 * Aplica dicionário PT → locale em strings do payload CMS (deep clone).
 * Depois aplica regras de padrão (datas, minutos, pontos no ranking…).
 */
export function applyCmsDictionary<T>(
  data: T,
  dictionary: Dictionary | undefined,
  locale: CmsLocale = 'en',
): T {
  if (locale === 'pt') {
    return structuredClone(data)
  }

  const clone = structuredClone(data)
  walk(clone, dictionary ?? {}, locale)
  return clone
}

function walk(value: unknown, dictionary: Dictionary, locale: CmsLocale): void {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const item = value[i]
      if (typeof item === 'string') {
        value[i] = translateString(item, dictionary, locale)
      }
      else if (item && typeof item === 'object') {
        walk(item, dictionary, locale)
      }
    }
    return
  }

  if (!value || typeof value !== 'object') return

  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (CMS_SKIP_KEYS.has(key)) continue

    // Campo `data` ISO no torneio vs. payload `data` do component CMS
    if (key === 'data' && typeof child === 'string' && ISO_DATE_RE.test(child)) {
      continue
    }

    if (typeof child === 'string') {
      ;(value as Record<string, unknown>)[key] = translateString(child, dictionary, locale)
    }
    else if (child && typeof child === 'object') {
      walk(child, dictionary, locale)
    }
  }
}

function translateString(value: string, dictionary: Dictionary, locale: CmsLocale): string {
  if (dictionary[value]) return dictionary[value]

  let result = value
  for (const rule of PATTERN_RULES) {
    if (rule.test(result)) {
      result = rule.replace(result, locale)
    }
  }
  return result
}

/** `data` ISO (YYYY-MM-DD) no card — não confundir com o objeto `data` do component CMS. */
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/

const MONTHS: Record<CmsLocale, Record<string, string>> = {
  pt: {},
  en: {
    Janeiro: 'January', Fevereiro: 'February', Março: 'March', Abril: 'April',
    Maio: 'May', Junho: 'June', Julho: 'July', Agosto: 'August',
    Setembro: 'September', Outubro: 'October', Novembro: 'November', Dezembro: 'December',
    janeiro: 'january', fevereiro: 'february', março: 'march', abril: 'april',
    maio: 'may', junho: 'june', julho: 'july', agosto: 'august',
    setembro: 'september', outubro: 'october', novembro: 'november', dezembro: 'december',
  },
  es: {
    Janeiro: 'Enero', Fevereiro: 'Febrero', Março: 'Marzo', Abril: 'Abril',
    Maio: 'Mayo', Junho: 'Junio', Julho: 'Julio', Agosto: 'Agosto',
    Setembro: 'Septiembre', Outubro: 'Octubre', Novembro: 'Noviembre', Dezembro: 'Diciembre',
    janeiro: 'enero', fevereiro: 'febrero', março: 'marzo', abril: 'abril',
    maio: 'mayo', junho: 'junio', julho: 'julio', agosto: 'agosto',
    setembro: 'septiembre', outubro: 'octubre', novembro: 'noviembre', dezembro: 'diciembre',
  },
  zh: {
    Janeiro: '1月', Fevereiro: '2月', Março: '3月', Abril: '4月',
    Maio: '5月', Junho: '6月', Julho: '7月', Agosto: '8月',
    Setembro: '9月', Outubro: '10月', Novembro: '11月', Dezembro: '12月',
    janeiro: '1月', fevereiro: '2月', março: '3月', abril: '4月',
    maio: '5月', junho: '6月', julho: '7月', agosto: '8月',
    setembro: '9月', outubro: '10月', novembro: '11月', dezembro: '12月',
  },
  ja: {
    Janeiro: '1月', Fevereiro: '2月', Março: '3月', Abril: '4月',
    Maio: '5月', Junho: '6月', Julho: '7月', Agosto: '8月',
    Setembro: '9月', Outubro: '10月', Novembro: '11月', Dezembro: '12月',
    janeiro: '1月', fevereiro: '2月', março: '3月', abril: '4月',
    maio: '5月', junho: '6月', julho: '7月', agosto: '8月',
    setembro: '9月', outubro: '10月', novembro: '11月', dezembro: '12月',
  },
}

const WEEKDAYS: Record<CmsLocale, Record<string, string>> = {
  pt: {},
  en: {
    'Domingo': 'Sunday',
    'Segunda-feira': 'Monday',
    'Terça-feira': 'Tuesday',
    'Quarta-feira': 'Wednesday',
    'Quinta-feira': 'Thursday',
    'Sexta-feira': 'Friday',
    'Sábado': 'Saturday',
    'Segunda': 'Monday',
    'Terça': 'Tuesday',
    'Quarta': 'Wednesday',
    'Quinta': 'Thursday',
    'Sexta': 'Friday',
  },
  es: {
    'Domingo': 'Domingo',
    'Segunda-feira': 'Lunes',
    'Terça-feira': 'Martes',
    'Quarta-feira': 'Miércoles',
    'Quinta-feira': 'Jueves',
    'Sexta-feira': 'Viernes',
    'Sábado': 'Sábado',
    'Segunda': 'Lunes',
    'Terça': 'Martes',
    'Quarta': 'Miércoles',
    'Quinta': 'Jueves',
    'Sexta': 'Viernes',
  },
  zh: {
    'Domingo': '周日',
    'Segunda-feira': '周一',
    'Terça-feira': '周二',
    'Quarta-feira': '周三',
    'Quinta-feira': '周四',
    'Sexta-feira': '周五',
    'Sábado': '周六',
    'Segunda': '周一',
    'Terça': '周二',
    'Quarta': '周三',
    'Quinta': '周四',
    'Sexta': '周五',
  },
  ja: {
    'Domingo': '日曜日',
    'Segunda-feira': '月曜日',
    'Terça-feira': '火曜日',
    'Quarta-feira': '水曜日',
    'Quinta-feira': '木曜日',
    'Sexta-feira': '金曜日',
    'Sábado': '土曜日',
    'Segunda': '月曜',
    'Terça': '火曜',
    'Quarta': '水曜',
    'Quinta': '木曜',
    'Sexta': '金曜',
  },
}

function replaceMap(value: string, map: Record<string, string>): string {
  let result = value
  // Longer keys first (Segunda-feira before Segunda)
  const keys = Object.keys(map).sort((a, b) => b.length - a.length)
  for (const key of keys) {
    if (result.includes(key)) {
      result = result.split(key).join(map[key]!)
    }
  }
  return result
}

const PATTERN_RULES: PatternRule[] = [
  {
    test: v => v === 'Hoje' || v === 'Amanhã' || /\b(Hoje|Amanhã)\b/.test(v),
    replace: (v, locale) => {
      const map: Record<CmsLocale, [string, string]> = {
        pt: ['Hoje', 'Amanhã'],
        en: ['Today', 'Tomorrow'],
        es: ['Hoy', 'Mañana'],
        zh: ['今天', '明天'],
        ja: ['今日', '明日'],
      }
      const [hoje, amanha] = map[locale]
      return v.replaceAll('Hoje', hoje).replaceAll('Amanhã', amanha)
    },
  },
  {
    test: v => /de (Janeiro|Fevereiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro|janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/.test(v)
      || /(Domingo|Segunda-feira|Terça-feira|Quarta-feira|Quinta-feira|Sexta-feira|Sábado|Segunda|Terça|Quarta|Quinta|Sexta)/.test(v),
    replace: (v, locale) => {
      let result = replaceMap(v, WEEKDAYS[locale] ?? {})
      result = replaceMap(result, MONTHS[locale] ?? {})
      if (locale === 'en') {
        // "08 de October | Wednesday" → "08 October | Wednesday"
        result = result.replace(/(\d{1,2}) de ([A-Za-z]+)/g, '$1 $2')
        result = result.replace(/ - (\d{1,2}) de ([a-z]+)/g, ' - $1 $2')
      }
      else if (locale === 'zh' || locale === 'ja') {
        result = result.replace(/(\d{1,2}) de (\d+月)/g, '$2$1日')
        result = result.replace(/ - (\d{1,2}) de (\d+月)/g, ' - $2$1日')
      }
      else if (locale === 'es') {
        result = result.replace(/(\d{1,2}) de /g, '$1 de ')
      }
      return result
    },
  },
  {
    test: v => /\d+\s*minutos/.test(v) || /MINUTOS/.test(v),
    replace: (v, locale) => {
      const word: Record<CmsLocale, string> = {
        pt: 'minutos',
        en: 'minutes',
        es: 'minutos',
        zh: '分钟',
        ja: '分',
      }
      const upper: Record<CmsLocale, string> = {
        pt: 'MINUTOS',
        en: 'MINUTES',
        es: 'MINUTOS',
        zh: '分钟',
        ja: '分',
      }
      return v
        .replaceAll('minutos', word[locale])
        .replaceAll('MINUTOS', upper[locale])
    },
  },
  {
    test: v => /\d[\d.]*\s*pontos no ranking/.test(v),
    replace: (v, locale) => {
      const templates: Record<CmsLocale, (n: string, rest: string) => string> = {
        pt: (n, rest) => `${n} pontos no ranking${rest}`,
        en: (n, rest) => `${n} ranking points${rest.replace(/^ do /, ' of ').replace(/^ da /, ' of ').replace(/^ de /, ' of ')}`,
        es: (n, rest) => `${n} puntos en el ranking${rest.replace(/^ do /, ' de ').replace(/^ da /, ' de ')}`,
        zh: (n, rest) => `排名积分 ${n}${rest.replace(/^ do /, ' · ').replace(/^ da /, ' · ').replace(/^ de /, ' · ')}`,
        ja: (n, rest) => `ランキングポイント ${n}${rest.replace(/^ do /, ' · ').replace(/^ da /, ' · ').replace(/^ de /, ' · ')}`,
      }
      return v.replace(/([\d.]+)\s*pontos no ranking([^]*)/i, (_, n, rest) => templates[locale](n, rest))
    },
  },
  {
    test: v => /^ou\s+[\d.]+\s+pontos/i.test(v) || /\sou\s+[\d.]+\s+pontos/i.test(v),
    replace: (v, locale) => {
      const orWord: Record<CmsLocale, string> = {
        pt: 'ou',
        en: 'or',
        es: 'o',
        zh: '或',
        ja: 'または',
      }
      const points: Record<CmsLocale, string> = {
        pt: 'pontos',
        en: 'points',
        es: 'puntos',
        zh: '积分',
        ja: 'ポイント',
      }
      return v
        .replace(/\bou\b/gi, orWord[locale])
        .replace(/\bpontos\b/gi, points[locale])
    },
  },
  {
    test: v => v === 'ABERTA' || v === 'Aberta',
    replace: (_v, locale) => ({
      pt: 'ABERTA',
      en: 'OPEN',
      es: 'ABIERTA',
      zh: '开放',
      ja: 'オープン',
    })[locale],
  },
  {
    test: v => /pontos H2rewards/i.test(v) || /pontos no ranking/i.test(v),
    replace: (v, locale) => {
      const points: Record<CmsLocale, string> = {
        pt: 'pontos',
        en: 'points',
        es: 'puntos',
        zh: '积分',
        ja: 'ポイント',
      }
      const ranking: Record<CmsLocale, string> = {
        pt: 'no ranking',
        en: 'in the ranking',
        es: 'en el ranking',
        zh: '排名',
        ja: 'ランキング',
      }
      return v
        .replaceAll('pontos H2rewards', `${points[locale]} H2rewards`)
        .replaceAll('pontos no ranking', `${points[locale]} ${ranking[locale]}`)
        .replaceAll(' ou ', locale === 'en' ? ' or ' : locale === 'es' ? ' o ' : locale === 'zh' ? ' 或 ' : locale === 'ja' ? ' または ' : ' ou ')
    },
  },
  {
    test: v => /\bfichas\b/i.test(v),
    replace: (v, locale) => {
      const chips: Record<CmsLocale, string> = {
        pt: 'fichas',
        en: 'chips',
        es: 'fichas',
        zh: '筹码',
        ja: 'チップ',
      }
      return v.replaceAll('fichas', chips[locale])
    },
  },
  {
    test: v => /^\d+ª Etapa/.test(v) || /ª Etapa/.test(v),
    replace: (v, locale) => {
      const stage: Record<CmsLocale, string> = {
        pt: 'Etapa',
        en: 'Stage',
        es: 'Etapa',
        zh: '阶段',
        ja: 'ステージ',
      }
      const ordinal: Record<CmsLocale, (n: string) => string> = {
        pt: n => `${n}ª`,
        en: n => {
          const map: Record<string, string> = { '1': '1st', '2': '2nd', '3': '3rd', '4': '4th', '5': '5th', '6': '6th' }
          return map[n] ?? `${n}th`
        },
        es: n => `${n}.ª`,
        zh: n => `第${n}`,
        ja: n => `第${n}`,
      }
      return v.replace(/(\d+)ª Etapa/g, (_, n) => {
        if (locale === 'zh' || locale === 'ja') return `${ordinal[locale](n)}${stage[locale]}`
        return `${ordinal[locale](n)} ${stage[locale]}`
      })
    },
  },
  {
    test: v => /\d+K Garantido/.test(v) || /garantidos\b/i.test(v),
    replace: (v, locale) => {
      const guaranteed: Record<CmsLocale, string> = {
        pt: 'Garantido',
        en: 'Guaranteed',
        es: 'Garantizado',
        zh: '保底',
        ja: '保証',
      }
      const guaranteedPlural: Record<CmsLocale, string> = {
        pt: 'garantidos',
        en: 'guaranteed',
        es: 'garantizados',
        zh: '保底',
        ja: '保証',
      }
      return v
        .replace(/(\d+K) Garantido/g, (_, n) => `${n} ${guaranteed[locale]}`)
        .replace(/\bgarantidos\b/gi, guaranteedPlural[locale])
    },
  },
  {
    test: v => /Satélite — sem pontos de ranking/.test(v),
    replace: (_v, locale) => ({
      pt: 'Satélite — sem pontos de ranking',
      en: 'Satellite — no ranking points',
      es: 'Satélite — sin puntos de ranking',
      zh: '卫星赛 — 无排名积分',
      ja: 'サテライト — ランキングポイントなし',
    })[locale],
  },
  {
    test: v => /Stack será permitido duplo/.test(v),
    replace: (v, locale) => ({
      pt: v,
      en: v.replace('ou menos. Stack será permitido duplo', 'or less. Double stack will be allowed'),
      es: v.replace('ou menos. Stack será permitido duplo', 'o menos. Se permitirá stack doble'),
      zh: v.replace('80.000 ou menos. Stack será permitido duplo', '80.000或以下。允许双倍筹码'),
      ja: v.replace('80.000 ou menos. Stack será permitido duplo', '80.000以下。ダブルスタック可'),
    })[locale],
  },
  {
    test: v => /O ante passa a ser o valor do small blind/.test(v),
    replace: (_v, locale) => ({
      pt: 'O ante passa a ser o valor do small blind a partir do nível 17 (até o 16 valor igual do Big Blind)',
      en: 'The ante becomes the small blind amount from level 17 onward (through level 16 it matches the big blind)',
      es: 'El ante pasa a ser el valor del small blind a partir del nivel 17 (hasta el 16 igual al big blind)',
      zh: '从第17级起盲注等于小盲注（至第16级与大盲注相同）',
      ja: 'レベル17以降、アンティはスモールブラインドと同額（レベル16まではビッグブラインドと同額）',
    })[locale],
  },
  {
    test: v => /ª etapa/.test(v) && !/ª Etapa/.test(v),
    replace: (v, locale) => {
      const stage: Record<CmsLocale, string> = {
        pt: 'etapa',
        en: 'stage',
        es: 'etapa',
        zh: '阶段',
        ja: 'ステージ',
      }
      const ordinal: Record<CmsLocale, (n: string) => string> = {
        pt: n => `${n}ª`,
        en: n => {
          const map: Record<string, string> = { '1': '1st', '2': '2nd', '3': '3rd', '4': '4th', '5': '5th', '6': '6th' }
          return map[n] ?? `${n}th`
        },
        es: n => `${n}.ª`,
        zh: n => `第${n}`,
        ja: n => `第${n}`,
      }
      return v.replace(/(\d+)ª etapa/g, (_, n) => {
        if (locale === 'zh' || locale === 'ja') return `${ordinal[locale](n)}${stage[locale]}`
        return `${ordinal[locale](n)} ${stage[locale]}`
      })
    },
  },
]
