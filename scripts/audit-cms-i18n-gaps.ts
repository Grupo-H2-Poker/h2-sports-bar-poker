/**
 * Audit CMS mock localization gaps (PT → EN).
 *
 * Usage (from repo root):
 *   npm run audit:cms-i18n
 */
import fs from 'node:fs'
import path from 'node:path'
import { createJiti } from 'jiti'
import { createError, defineEventHandler, getQuery, getRouterParam } from 'h3'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const jiti = createJiti(import.meta.url, { interopDefault: true })

// Nitro auto-imports used by mock API handlers
Object.assign(globalThis, {
  defineEventHandler,
  getRouterParam,
  getQuery,
  createError,
})

const { applyCmsDictionary } = jiti(
  path.join(ROOT, 'server/utils/mock-i18n/apply.ts'),
) as typeof import('../server/utils/mock-i18n/apply')

const { loadCmsDictionary } = jiti(
  path.join(ROOT, 'server/utils/mock-i18n/load.ts'),
) as typeof import('../server/utils/mock-i18n/load')

const { CMS_SKIP_KEYS } = jiti(
  path.join(ROOT, 'server/utils/mock-i18n/skip-keys.ts'),
) as typeof import('../server/utils/mock-i18n/skip-keys')

const enDict = (await loadCmsDictionary('en')) ?? {}
const esDict = (await loadCmsDictionary('es')) ?? {}
const zhDict = (await loadCmsDictionary('zh')) ?? {}
const jaDict = (await loadCmsDictionary('ja')) ?? {}

const SKIP_KEYS = CMS_SKIP_KEYS

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const TIME_RE = /^\d{1,2}:\d{2}$/
const MONEY_RE = /^R\$\s*[\d.,]+$/
const URL_RE = /^https?:\/\//i
const SLUGISH_RE = /^[a-z0-9]+(?:-[a-z0-9]+)+$/
const TECH_ID_RE = /^[\w.-]+@(?:[\w.-]+)$|^\d+$|^#[\w]+$/i
const PURE_BRANDS = new Set([
  'H2', 'H2Bet', 'H2bet', 'H2Pay', 'H2Rewards', 'H2rewards', 'CPH', 'Fun Festival',
  'IMSA', 'WPF', 'ADTP', 'TDA', 'CBTH', 'PIX', 'Instagram', 'YouTube', 'YouTube',
  'Texas Hold\'em', 'Omaha', 'Main Event', 'High Roller', 'Deep Stack', 'Cash Game',
  'Cash game', 'Sports Bar', 'Sports Bar 24h', 'Jackpot', 'FAQ', 'Offline', 'Online',
  'Stack', 'Rebuy', 'Timechip', 'Ladies Weekend', 'Buy-in', 'Blinds', 'Ranking',
  'Status', 'Home', 'Off', 'ABERTA', 'Campinas', 'São Paulo', '#TocaEJoga',
  'Lorem ipsum dolor sit amet, t, sed tempor?',
])

/** Strong PT signals (accents + distinctive tokens). Avoid bare "de/do/da/com" alone. */
const PT_TOKEN_RE = new RegExp(
  [
    '[àáâãäåèéêëìíîïòóôõöùúûüçñ]',
    '\\b(?:você|vocês|também|não|são|está|estão|será|serão|pode|podem|quando|onde|como|quais|qual|quem|porque|porquê)',
    '\\b(?:torneio|torneios|pontos|garantido|garantidos|etapa|etapas|minutos|fichas|clube|saiba|comprar|filtrar|limpar)',
    '\\b(?:hoje|amanhã|quarta|quinta|sexta|segunda|terça|sábado|domingo|regulamento|inscrição|inscrições)',
    '\\b(?:pesquisar|confira|conheça|garanta|veja|entre|sair|fila|mesa|mesas|premiação|premiações)',
    '\\b(?:perguntas|frequentes|segurança|privacidade|estacionamento|atendimento|ouvidoria)',
    '\\b(?:franqueado|trabalhe|conosco|unidade|unidades|galeria|agenda|próximas|próximos)',
    '\\b(?:abrir|abre|aberto|aberta|fechado|fechada|horário|horários|nível|níveis)',
    '\\b(?:jogadores|jogador|buy-in|reentradas|colocação|série|séries|satélite)',
    '\\b(?:para|pelo|pela|pelos|pelas|nosso|nossa|nossos|nossas|seu|sua|seus|suas)\\b',
    '\\b(?:do|da|dos|das|no|na|nos|nas|em|um|uma|uns|umas|ao|à|aos|às)\\b',
    '\\b(?:com|sem|mais|menos|muito|muitos|todas|todos|cada|desta|deste|dessa|desse)\\b',
    '\\b(?:é|foi|são|ser|ter|tem|há|aqui|ainda|após|antes|durante|conforme|mediante)\\b',
  ].join('|'),
  'i',
)

type Hit = { value: string; path: string; kind: 'remaining' | 'missing_dict' }

function isExcludable(value: string): boolean {
  const v = value.trim()
  if (!v) return true
  if (PURE_BRANDS.has(v)) return true
  if (URL_RE.test(v)) return true
  if (ISO_DATE_RE.test(v)) return true
  if (TIME_RE.test(v)) return true
  if (MONEY_RE.test(v)) return true
  if (/^R\$\s*[\d.,]+\s*-\s*R\$\s*[\d.,]+$/.test(v)) return true
  if (/^\d+K$/.test(v)) return true
  if (SLUGISH_RE.test(v) && !/\s/.test(v)) return true
  if (TECH_ID_RE.test(v)) return true
  if (/^\/(images|series|sobre|social|jackpot)/.test(v)) return true
  if (/^torneios\//.test(v)) return true
  if (/^\d+([.,]\d+)?$/.test(v)) return true
  // Asset / path-like
  if (v.startsWith('/images/') || v.startsWith('/img/')) return true
  // Address kept as-is in EN dict intentionally
  if (/Rua Henrique Schaumann/.test(v)) return true
  // Likely person names (2–4 capitalized tokens) — not document titles
  if (/^[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+(?:\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+){1,3}$/.test(v)
    && !/\b(?:Clube|Torneio|Agenda|Filtros|Garantido|Etapa|Privacidade|Dados|Formulário|Promoção|Critérios|Diretiva|Avisos|Compartilhamento|Tratamento|Encarregado|Transferência|Coleta|Segurança|Retenção|Conceitos|Procedimentos|Bonus|Chip|Cash|Game|Buy-in)\b/i.test(v)) {
    return true
  }
  return false
}

function looksMostlyEnglish(value: string): boolean {
  if (/^(How|What|When|Where|Why|Can|Does|Is|Are|Do|Did|Which|Who)\b/.test(value)) return true
  const enHints = (value.match(/\b(?:the|and|or|with|from|for|your|our|check|learn|see|join|filter|clear|stage|points|minutes|chips|tournament|schedule|gallery|club|between|usually|follows|available|visit|keep|always|updated|leave|return|while|there|seat|respecting|earn|redeem|every|exclusive|rewards|minimum|maximum|table|floor|team|will|tell|exact|amount|when|take|offer|tables|blinds|demand|today|open|convenience|grid|site|full|daily|program|upcoming|events|casual|sophisticated|menu|brings|options|taste|occasion|dishes|juicy|leading|series|main|technical|references|southern|hemisphere|context|secretariat|prizes|betting|responsible|regulating|gaming|activities|brazil|published|ordinance|occasion|confederation|joined|ministry|official|roster|consolidating|institutional|recognition|poker|sporting|practice|country|satellite|ranking|deep|stack|structure|higher|buy-in|no-limit|texas|hold'?em|skill|level|queue|cash|game)\b/gi) || []).length
  const ptDistinctive = (value.match(/\b(?:você|torneio|torneios|pontos|garantido|garantidos|etapa|etapas|minutos|fichas|clube|saiba|comprar|filtrar|limpar|hoje|amanhã|regulamento|inscrição|pesquisar|confira|conheça|garanta|perguntas|frequentes|segurança|privacidade|estacionamento|atendimento|ouvidoria|franqueado|trabalhe|conosco|galeria|agenda|próxim|horário|jogadores|jogador|reentradas|colocação|série|séries|satélite|premiação|critérios|diretiva|avisos|compartilhamento|terceiros|encarregado|tratamento|retenção|formulário|promoção|disponibilizamos|coletamos|tratamos|adotamos|mantemos|utilizamos|procedimentos|modalidade|coleta|transferência|sensíveis)\b/gi) || []).length
  if (enHints >= 3 && ptDistinctive === 0) return true
  if (enHints >= 1 && ptDistinctive === 0 && !/[àáâãäåèéêëìíîïòóôõöùúûüçñ]/i.test(value)) {
    // residual PT connectors only (e.g. "ranking points Omaha do CPH")
    const residual = /\b(?:do|da|de|dos|das|para|com)\b/i.test(value)
    if (!residual) return true
  }
  return false
}

function looksPortuguese(value: string): boolean {
  if (isExcludable(value)) return false
  if (looksMostlyEnglish(value)) return false
  // Person names / avatars / addresses kept but tagged separately by caller
  if (/^\/img\//.test(value)) return false
  // Require either an accent OR at least one distinctive PT token / multiple connector hits
  if (/[àáâãäåèéêëìíîïòóôõöùúûüçñ]/i.test(value)) return true
  const distinctive = /\b(?:você|torneio|torneios|pontos|garantido|garantidos|etapa|etapas|minutos|fichas|clube|saiba|comprar|filtrar|limpar|hoje|amanhã|regulamento|inscrição|pesquisar|confira|conheça|garanta|veja|perguntas|frequentes|segurança|privacidade|estacionamento|atendimento|ouvidoria|franqueado|trabalhe|conosco|galeria|agenda|próxim|horário|jogadores|jogador|reentradas|colocação|série|séries|satélite|premiação|abre|aberto|aberta|fila|mesa|mesas|unidade|unidades|critérios|diretiva|avisos|compartilhamento|terceiros|encarregado|tratamento|retenção|formulário|promoção|dados|menores|sensíveis|início|petições|supervisão|conceitos|gerais|procedimentos|coleta|transferência|internacional|retenção)\b/i
  if (distinctive.test(value)) return true
  // Accented Portuguese words even without known tokens
  if (/[àáâãäåèéêëìíîïòóôõöùúûüçñ]/i.test(value) && /[a-zà-ú]{3,}/i.test(value)) return true
  // Multi-word Portuguese-looking: connectors + latin letters length
  const connectorHits = (value.match(/\b(?:de|do|da|dos|das|para|com|sem|pelo|pela|no|na|em|um|uma|os|as|ao|à)\b/gi) || []).length
  if (connectorHits >= 2 && /[a-zà-ú]{4,}/i.test(value) && !/^(the|and|or|with|from|for)\b/i.test(value)) {
    return true
  }
  // Partial translation leftover: EN stem + PT connector
  if (/\b(?:ranking points|points|stage|guaranteed|minutes|chips)\b/i.test(value) && /\b(?:do|da|de|dos|das)\b/.test(value)) {
    return true
  }
  return PT_TOKEN_RE.test(value) && connectorHits >= 1 && value.split(/\s+/).length >= 3
}

function walkCollect(
  value: unknown,
  pathParts: string[],
  out: Hit[],
  mode: 'remaining' | 'missing_dict',
  dict?: Record<string, string>,
): void {
  if (Array.isArray(value)) {
    value.forEach((item, i) => walkCollect(item, [...pathParts, String(i)], out, mode, dict))
    return
  }
  if (!value || typeof value !== 'object') {
    if (typeof value === 'string') {
      const p = pathParts.join('.')
      if (mode === 'remaining') {
        if (looksPortuguese(value)) out.push({ value, path: p, kind: 'remaining' })
      }
      else if (mode === 'missing_dict') {
        if (looksPortuguese(value) && dict && !(value in dict) && !isExcludable(value)) {
          out.push({ value, path: p, kind: 'missing_dict' })
        }
      }
    }
    return
  }

  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (SKIP_KEYS.has(key)) continue
    if (key === 'data' && typeof child === 'string' && ISO_DATE_RE.test(child)) continue
    walkCollect(child, [...pathParts, key], out, mode, dict)
  }
}

function uniqueByValue(hits: Hit[]): Hit[] {
  const seen = new Map<string, Hit>()
  for (const h of hits) {
    if (!seen.has(h.value)) seen.set(h.value, h)
  }
  return [...seen.values()]
}

function loadPinheirosPayload(): Promise<unknown> {
  // Prefer importing the handler; nitro auto-imports are on globalThis.
  const handlerModule = jiti(
    path.join(ROOT, 'server/api/mock/unidade/[slug]/modulos.get.ts'),
  ) as { default: (event: unknown) => Promise<unknown> }

  const event = {
    context: { params: { slug: 'sp-pinheiros' } },
    node: { req: { url: '/api/mock/unidade/sp-pinheiros/modulos?lang=pt' } },
    _query: { lang: 'pt' },
  }

  // h3 getQuery reads from event — patch via Object.defineProperty if needed
  const handler = handlerModule.default
  return handler(event)
}

/** Fallback: walk exported mock builders + agenda data if handler fails. */
async function loadFallbackPayload(): Promise<unknown> {
  const agenda = jiti(path.join(ROOT, 'server/utils/mock-agenda-data.ts')) as Record<string, unknown>
  const docs = jiti(path.join(ROOT, 'server/utils/mock-documento-pages.ts')) as {
    createRegulamentosPagina: (a: number, b: number) => unknown
    createSegurancaPrivacidadePagina: (a: number, b: number) => unknown
  }
  const sports = jiti(path.join(ROOT, 'server/utils/mock-sports-bar.ts')) as {
    createSportsBarPagina: () => unknown
  }
  const poker = jiti(path.join(ROOT, 'server/utils/mock-poker-esporte-da-mente.ts')) as {
    createPokerEsporteDaMentePagina: () => unknown
  }
  const eventos = jiti(path.join(ROOT, 'server/utils/mock-eventos.ts')) as {
    createEventosPagina: () => unknown
  }

  // Also scrape string literals from modulos.get.ts for inline content not in builders
  const modulosSrc = fs.readFileSync(
    path.join(ROOT, 'server/api/mock/unidade/[slug]/modulos.get.ts'),
    'utf8',
  )
  const stringLits: string[] = []
  const re = /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/gs
  let m: RegExpExecArray | null
  while ((m = re.exec(modulosSrc))) {
    const raw = m[2] ?? ''
    if (raw.length < 2) continue
    if (raw.includes('${')) continue
    stringLits.push(raw.replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"'))
  }

  return {
    _source: 'fallback',
    agenda: {
      ALL_TORNEIOS: agenda.ALL_TORNEIOS,
      CASH_GAME_MESAS: agenda.CASH_GAME_MESAS,
      AGENDA_TORNEIOS_PINHEIROS: agenda.AGENDA_TORNEIOS_PINHEIROS,
    },
    pages: {
      regulamentos: docs.createRegulamentosPagina(92, 9200),
      seguranca: docs.createSegurancaPrivacidadePagina(93, 9300),
      sportsBar: sports.createSportsBarPagina(),
      pokerMente: poker.createPokerEsporteDaMentePagina(),
      eventos: eventos.createEventosPagina(),
    },
    modulosStringLiterals: stringLits,
  }
}

async function main() {
  let payload: unknown
  let source = 'handler'
  try {
    payload = await loadPinheirosPayload()
  }
  catch (err) {
    console.error('Handler load failed, using fallback walk:', (err as Error).message)
    payload = await loadFallbackPayload()
    source = 'fallback'
  }

  // If handler localized with query.lang — ensure we start from PT.
  // Re-fetch with explicit stub if needed: apply dictionary ourselves from a PT clone.
  // When lang=pt, localizeUnidadeModulos returns structuredClone without translation.
  const localizedEn = applyCmsDictionary(payload, enDict, 'en')

  const remaining: Hit[] = []
  walkCollect(localizedEn, ['sp-pinheiros'], remaining, 'remaining')

  // Missing from EN dict: unique PT strings in raw payload not present as exact keys
  const missing: Hit[] = []
  walkCollect(payload, ['sp-pinheiros'], missing, 'missing_dict', enDict)

  // Also walk raw agenda ALL_TORNEIOS for missing dict keys (fields may differ from card transforms)
  try {
    const agenda = jiti(path.join(ROOT, 'server/utils/mock-agenda-data.ts')) as {
      ALL_TORNEIOS: unknown
      CASH_GAME_MESAS: unknown
    }
    walkCollect(agenda.ALL_TORNEIOS, ['ALL_TORNEIOS'], missing, 'missing_dict', enDict)
    walkCollect(agenda.CASH_GAME_MESAS, ['CASH_GAME_MESAS'], missing, 'missing_dict', enDict)
  }
  catch {
    /* ignore */
  }

  const remainingUnique = uniqueByValue(remaining)
    .sort((a, b) => b.value.length - a.value.length || a.value.localeCompare(b.value))
  const missingUnique = uniqueByValue(missing)
    .sort((a, b) => b.value.length - a.value.length || a.value.localeCompare(b.value))

  // Pattern gaps: strings that changed via rules but still have PT residue,
  // OR parametric forms missing from exact dict that rules should cover.
  const patternGapExamples: { issue: string; before?: string; after: string; path: string }[] = []

  const parametricMissing = missingUnique.filter(({ value }) =>
    /\d[\d.]*\s*pontos no ranking/i.test(value)
    || /^\d+ª\s+Etapa/i.test(value)
    || /\d+K\s+Garantido/i.test(value)
    || /\d+\s*minutos/i.test(value)
    || /\d+\s+de\s+[A-Za-zÀ-ú]+/i.test(value)
    || /^(Segunda|Terça|Quarta|Quinta|Sexta|Sábado|Domingo)/i.test(value)
    || /\b(Hoje|Amanhã)\b/.test(value)
    || / a \d{1,2} de /i.test(value),
  )

  for (const h of remainingUnique) {
    if (/ranking points.*\b(?:do|da|de)\b/i.test(h.value)) {
      patternGapExamples.push({
        issue: 'pontos no ranking: leaves modality/series connector (do/da) when not "do X" immediately after ranking',
        after: h.value,
        path: h.path,
      })
    }
    if (/\b[A-Za-z]+ a \d{1,2}\b/.test(h.value) || /\d{1,2} [A-Za-z]+ a \d{1,2}/.test(h.value)) {
      patternGapExamples.push({
        issue: 'date range "X de Mês a Y de Mês" → month translated but leftover Portuguese "a"',
        after: h.value,
        path: h.path,
      })
    }
  }

  // Probe known partial transforms from agenda raw strings
  for (const sample of [
    '22 de Fevereiro a 03 de Março',
    'Segunda-feira - 12 de outubro',
    'Quarta-feira - 12 de agosto',
    '610 pontos no ranking Omaha do CPH',
    '450 pontos no ranking Ladies',
    '1.000 pontos no ranking do Fun Festival',
  ]) {
    const after = (applyCmsDictionary({ t: sample }, enDict, 'en') as { t: string }).t
    if (after !== sample && looksPortuguese(after)) {
      patternGapExamples.push({
        issue: 'partial pattern transform',
        before: sample,
        after,
        path: '(probe)',
      })
    }
    else if (after !== sample) {
      patternGapExamples.push({
        issue: 'covered by pattern (OK) but missing exact dict key',
        before: sample,
        after,
        path: '(probe)',
      })
    }
  }

  const longHtmlMissing = remainingUnique.filter(h => h.value.includes('<') && h.value.length > 200)
  const shortUiMissing = remainingUnique.filter(h => !h.value.includes('<') && h.value.length <= 120)

  const report = {
    source,
    dictKeyCounts: {
      en: Object.keys(enDict).length,
      es: Object.keys(esDict).length,
      zh: Object.keys(zhDict).length,
      ja: Object.keys(jaDict).length,
    },
    remainingAfterEn: {
      totalOccurrences: remaining.length,
      unique: remainingUnique.length,
      longHtmlBlocks: longHtmlMissing.length,
      shortUiLabels: shortUiMissing.length,
      top: remainingUnique.slice(0, 100).map(h => ({
        samplePath: h.path,
        value: h.value.length > 220 ? `${h.value.slice(0, 220)}…` : h.value,
        chars: h.value.length,
      })),
      allShortUi: shortUiMissing.map(h => ({
        samplePath: h.path,
        value: h.value,
      })),
    },
    missingExactDictKeys: {
      unique: missingUnique.length,
      top: missingUnique.slice(0, 120).map(h => ({
        samplePath: h.path,
        value: h.value.length > 220 ? `${h.value.slice(0, 220)}…` : h.value,
        chars: h.value.length,
      })),
    },
    patternGaps: {
      count: patternGapExamples.length,
      parametricMissingFromDict: parametricMissing.length,
      items: patternGapExamples,
      parametricSamples: parametricMissing.slice(0, 40).map(h => ({
        samplePath: h.path,
        value: h.value,
      })),
    },
  }

  const outPath = path.join(ROOT, 'scripts/audit-cms-i18n-gaps.report.json')
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2))

  console.log('=== CMS i18n gap audit (sp-pinheiros → EN) ===')
  console.log(`Source: ${source}`)
  console.log('\nC) Dictionary key counts:')
  console.log(report.dictKeyCounts)

  console.log(`\nA) Remaining PT-looking strings after EN apply: ${remainingUnique.length} unique (${remaining.length} occurrences)`)
  console.log(`   - long HTML blocks: ${longHtmlMissing.length}`)
  console.log(`   - short UI / titles: ${shortUiMissing.length}`)
  console.log('\n--- Short UI / titles (full list) ---')
  for (const [i, h] of shortUiMissing.entries()) {
    console.log(`  ${i + 1}. [${h.path}] ${JSON.stringify(h.value)}`)
  }
  console.log('\n--- Long HTML blocks (paths only + first 100 chars) ---')
  for (const [i, h] of longHtmlMissing.entries()) {
    console.log(`  ${i + 1}. [${h.path}] ${JSON.stringify(h.value.slice(0, 100))}… (${h.value.length} chars)`)
  }
  console.log('\n--- Other remaining ---')
  const other = remainingUnique.filter(h => !longHtmlMissing.includes(h) && !shortUiMissing.includes(h))
  for (const [i, h] of other.entries()) {
    const preview = h.value.length > 140 ? `${h.value.slice(0, 140)}…` : h.value
    console.log(`  ${i + 1}. [${h.path}] ${JSON.stringify(preview)}`)
  }

  console.log(`\nB) Pattern gaps (${patternGapExamples.length}) + parametric missing from dict (${parametricMissing.length}):`)
  for (const [i, g] of patternGapExamples.entries()) {
    console.log(`  ${i + 1}. ${g.issue}`)
    if (g.before) console.log(`     before: ${JSON.stringify(g.before)}`)
    console.log(`     after:  ${JSON.stringify(g.after)}`)
  }
  console.log('  Parametric PT forms (need regex, not exact dict):')
  for (const [i, h] of parametricMissing.slice(0, 25).entries()) {
    console.log(`  ${i + 1}. ${JSON.stringify(h.value)}`)
  }

  const missingNonParametric = missingUnique.filter(h => !parametricMissing.includes(h))
  console.log(`\nMissing exact EN dict keys: ${missingUnique.length} unique (${parametricMissing.length} parametric, ${missingNonParametric.length} need exact entries)`)
  for (const [i, h] of missingNonParametric.slice(0, 50).entries()) {
    const preview = h.value.length > 140 ? `${h.value.slice(0, 140)}…` : h.value
    console.log(`  ${i + 1}. ${JSON.stringify(preview)}`)
  }

  console.log(`\nFull JSON report: ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
