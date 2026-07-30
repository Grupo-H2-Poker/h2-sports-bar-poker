/** Dataset compartilhado agenda / agenda_preview / detalhe / cash game (mock). */

import {
  buildDiaFilterOptions,
  formatDataBadge,
  formatDataLabel,
} from '../../app/utils/agenda-dias'

export interface TorneioMock {
  slug: string
  titulo: string
  /** ISO `YYYY-MM-DD` — base para badge, filtro, grupo e data_label */
  data: string
  garantido?: string
  categoria?: string
  badge?: { texto: string, cor?: string }
  cor?: string
  inicio: string
  late: string
  buy_in: { preco: string, pontos?: string }
  favorito?: { visivel?: boolean, ativo?: boolean, cor?: string }
  filtros: Record<string, string>
  data_label?: string
  faixa_info?: string
  descricao?: string
  specs?: { items: { label: string, valor: string }[] }[]
  nota?: string
  regulamento_link?: string
  blinds_link?: string
  faixa_cta?: { titulo: string, cta: string, cta_link?: string }
}

export interface CashGameMesaMock {
  slug: string
  titulo: string
  categoria?: string
  status: 'aberta' | 'off'
  badge: { texto: string, cor?: string }
  ativo?: boolean
}

const DETALHE_SPECS_DEFAULT = [
  {
    items: [
      { label: 'Buy-in', valor: 'R$350,00 ou 17.000 pontos H2rewards' },
      { label: 'Stack', valor: '40K fichas' },
    ],
  },
  {
    items: [
      { label: 'Rebuy', valor: 'R$350,00 ou 17.000 pontos H2rewards' },
      { label: 'Stack', valor: '40K fichas' },
    ],
  },
  { items: [{ label: 'Reentradas', valor: '80.000 ou menos. Stack será permitido duplo' }] },
  { items: [{ label: 'Blinds', valor: '30/25 minutos' }] },
  { items: [{ label: 'Timechip', valor: '5K fichas' }] },
]

function isFunFestivalTorneio(
  t: Pick<TorneioMock, 'categoria' | 'filtros'>,
): boolean {
  if (t.filtros?.series === 'fun-festival') return true
  return (t.categoria ?? '').toLowerCase().includes('fun festival')
}

function badgeCorDia(t: Pick<TorneioMock, 'cor' | 'categoria' | 'filtros'>): string {
  if (t.cor === 'vermelho') return 'vermelho'
  if (isFunFestivalTorneio(t)) return 'amarelo'
  return t.cor ?? 'purple'
}

function torneioDetalheDefaults(
  t: Omit<TorneioMock, 'specs' | 'nota' | 'data_label' | 'regulamento_link' | 'blinds_link' | 'faixa_cta' | 'badge'>
    & Partial<Pick<TorneioMock, 'specs' | 'nota' | 'data_label' | 'regulamento_link' | 'blinds_link' | 'faixa_cta' | 'badge'>>,
): TorneioMock {
  return {
    ...t,
    // Badge do dia: vermelho no CPH, amarelo (#F4AD00) no Fun Festival, senão segue a cor do card
    badge: t.badge ?? {
      texto: formatDataBadge(t.data),
      cor: badgeCorDia(t),
    },
    data_label: t.data_label ?? formatDataLabel(t.data),
    filtros: {
      ...t.filtros,
      /** ISO da data — o front resolve Hoje / Amanhã / Quarta-feira - 29 de julho */
      dia: t.data,
    },
    // faixa_info e descricao vêm do card de cada torneio (CMS/API) — sem default genérico
    faixa_info: t.faixa_info,
    descricao: t.descricao,
    specs: t.specs ?? DETALHE_SPECS_DEFAULT,
    nota: t.nota ?? 'O ante passa a ser o valor do small blind a partir do nível 17 (até o 16 valor igual do Big Blind)',
    regulamento_link: t.regulamento_link ?? '#',
    blinds_link: t.blinds_link ?? '#',
    faixa_cta: t.faixa_cta ?? {
      titulo: 'Sabia que você pode trocar seus pontos H2rewards por buy-in?',
      cta: 'Saiba mais',
      cta_link: 'faq',
    },
  }
}

/** Torneios da agenda geral (home preview + /agenda) */
export const AGENDA_TORNEIOS_PINHEIROS: TorneioMock[] = [
  torneioDetalheDefaults({
    slug: '5k-super-5-mega-monster',
    titulo: '5K Super 5 Mega Monster',
    data: '2026-10-08',
    garantido: '5K Garantido',
    categoria: 'Torneio regular',
    badge: { texto: '08/10', cor: 'purple' },
    cor: 'purple',
    inicio: '12:30',
    late: '17:00',
    buy_in: { preco: 'R$50,00', pontos: 'ou 2.500 pontos H2Rewards' },
    favorito: { visivel: true, ativo: true, cor: 'verde' },
    filtros: { local: 'clube-fisico', buy_in: '50-200', garantido: '5k' },
    faixa_info: '320 pontos no ranking do Fun Festival',
    descricao: 'Esse torneio dá uma vaga no Main Event do Fun Festival 1ª Etapa',
  }),
  torneioDetalheDefaults({
    slug: '50k-start-up',
    titulo: '50K Start Up',
    data: '2026-07-29',
    garantido: '50K Garantido',
    categoria: 'Torneio Fun Festival',
    cor: 'purple',
    inicio: '16:00',
    late: '20:30',
    buy_in: { preco: 'R$50,00', pontos: 'ou 2.500 pontos H2Rewards' },
    favorito: { visivel: true, ativo: true, cor: 'verde' },
    filtros: { local: 'clube-fisico', buy_in: '50-200', garantido: '50k' },
    faixa_info: '410 pontos no ranking do Fun Festival',
    descricao: 'Esse torneio dá uma vaga no Main Event do Fun Festival 1ª Etapa',
  }),
  torneioDetalheDefaults({
    slug: 'deep-stack-evening',
    titulo: 'Deep Stack Evening',
    data: '2026-07-29',
    garantido: '10K Garantido',
    categoria: 'Torneio regular',
    cor: 'purple',
    inicio: '19:00',
    late: '21:00',
    buy_in: { preco: 'R$80,00', pontos: 'ou 4.000 pontos H2Rewards' },
    favorito: { visivel: true, cor: 'verde' },
    filtros: { local: 'clube-fisico', buy_in: '50-200', garantido: '10k' },
    faixa_info: '250 pontos no ranking do CPH',
    descricao: 'Esse torneio dá uma vaga no Day 1 do CPH Deep Stack',
  }),
  torneioDetalheDefaults({
    slug: '5k-cph-mega',
    titulo: '5K Super 5 Mega Monster',
    data: '2026-07-30',
    garantido: '5K Garantido',
    categoria: 'CPH',
    cor: 'vermelho',
    inicio: '12:30',
    late: '17:00',
    buy_in: { preco: 'R$50,00', pontos: 'ou 2.500 pontos H2Rewards' },
    favorito: { visivel: true, ativo: true, cor: 'branco' },
    filtros: { local: 'online', buy_in: '50-200', garantido: '5k' },
    faixa_info: '478 pontos no ranking do CPH',
    descricao: 'Esse torneio dá uma vaga no Main Event do CPH 6ª Etapa',
  }),
  torneioDetalheDefaults({
    slug: 'turbo-noturno',
    titulo: 'Turbo Noturno',
    data: '2026-07-31',
    garantido: '5K Garantido',
    categoria: '5K Garantido',
    cor: 'purple',
    inicio: '22:00',
    late: '23:00',
    buy_in: { preco: 'R$120,00' },
    favorito: { visivel: true, cor: 'verde' },
    filtros: { local: 'clube-fisico', buy_in: '201-500', garantido: '5k' },
    faixa_info: '180 pontos no ranking do Fun Festival',
    descricao: 'Turbo noturno com estrutura acelerada e late registration estendido',
  }),
  torneioDetalheDefaults({
    slug: 'sunday-special',
    titulo: 'Sunday Special',
    data: '2026-08-12',
    garantido: '20K Garantido',
    categoria: 'Torneio regular',
    cor: 'purple',
    inicio: '14:00',
    late: '16:00',
    buy_in: { preco: 'R$150,00', pontos: 'ou 7.500 pontos H2Rewards' },
    favorito: { visivel: true, ativo: true, cor: 'verde' },
    filtros: { local: 'online', buy_in: '201-500', garantido: '20k' },
    faixa_info: '520 pontos no ranking do CPH',
    descricao: 'Esse torneio dá uma vaga no Main Event do CPH 6ª Etapa',
  }),
]

/** Torneios CPH por etapa */
export const AGENDA_TORNEIOS_CPH: TorneioMock[] = [
  torneioDetalheDefaults({
    slug: 'cph-main-event-500k',
    titulo: 'CPH Main Event 500K GTD',
    data: '2026-07-29',
    categoria: 'CPH',
    cor: 'vermelho',
    inicio: '14:00',
    late: '18:00',
    buy_in: { preco: 'R$1.500,00', pontos: 'ou 75.000 pontos H2Rewards' },
    favorito: { visivel: true, ativo: true, cor: 'branco' },
    filtros: { local: 'clube-fisico', buy_in: '201-500', garantido: '50k', series: 'cph', etapa: '2' },
    faixa_info: '1.200 pontos no ranking do CPH',
    descricao: 'Main Event da 2ª etapa do CPH com 500K garantidos',
  }),
  torneioDetalheDefaults({
    slug: 'cph-high-roller-100k',
    titulo: 'CPH High Roller 100K GTD',
    data: '2026-07-29',
    categoria: 'CPH',
    cor: 'vermelho',
    inicio: '16:00',
    late: '20:00',
    buy_in: { preco: 'R$2.500,00' },
    favorito: { visivel: true, cor: 'branco' },
    filtros: { local: 'clube-fisico', buy_in: '201-500', garantido: '100k', series: 'cph', etapa: '2' },
    faixa_info: '900 pontos no ranking do CPH',
    descricao: 'High Roller da 2ª etapa — estrutura deep stack e buy-in elevado',
  }),
  torneioDetalheDefaults({
    slug: 'cph-turbo-deep-stack',
    titulo: 'CPH Turbo Deep Stack',
    data: '2026-07-30',
    categoria: 'CPH',
    cor: 'vermelho',
    inicio: '19:00',
    late: '21:00',
    buy_in: { preco: 'R$150,00' },
    favorito: { visivel: true, cor: 'branco' },
    filtros: { local: 'online', buy_in: '50-200', garantido: '20k', series: 'cph', etapa: '3' },
    faixa_info: '340 pontos no ranking do CPH',
    descricao: 'Esse torneio dá uma vaga no Main Event do CPH 3ª Etapa',
  }),
  torneioDetalheDefaults({
    slug: 'cph-omaha-especial',
    titulo: 'CPH Omaha Especial',
    data: '2026-08-05',
    categoria: 'CPH',
    cor: 'vermelho',
    inicio: '15:00',
    late: '19:00',
    buy_in: { preco: 'R$800,00' },
    favorito: { visivel: true, cor: 'branco' },
    filtros: { local: 'clube-fisico', buy_in: '500-1000', garantido: '50k', series: 'cph', etapa: '3' },
    faixa_info: '610 pontos no ranking Omaha do CPH',
    descricao: 'Especial Omaha da 3ª etapa com pontuação no ranking Omaha',
  }),
  torneioDetalheDefaults({
    slug: 'cph-satellite',
    titulo: 'CPH Satellite Main',
    data: '2026-10-12',
    categoria: 'CPH',
    cor: 'vermelho',
    inicio: '13:00',
    late: '16:00',
    buy_in: { preco: 'R$200,00' },
    favorito: { visivel: true, cor: 'branco' },
    filtros: { local: 'clube-fisico', buy_in: '50-200', garantido: '10k', series: 'cph', etapa: '4' },
    faixa_info: 'Satélite — sem pontos de ranking',
    descricao: 'Esse torneio dá uma vaga no Main Event do CPH 4ª Etapa',
  }),
]

/** Torneios Fun Festival por etapa */
export const AGENDA_TORNEIOS_FUN: TorneioMock[] = [
  torneioDetalheDefaults({
    slug: 'fun-festival-main-event',
    titulo: 'Fun Festival Main Event 500K GTD',
    data: '2026-07-29',
    categoria: 'Fun Festival',
    cor: 'purple',
    inicio: '14:00',
    late: '18:00',
    buy_in: { preco: 'R$1.500,00', pontos: 'ou 75.000 pontos H2Rewards' },
    favorito: { visivel: true, ativo: true, cor: 'verde' },
    filtros: { local: 'clube-fisico', buy_in: '201-500', garantido: '50k', series: 'fun-festival', etapa: '1' },
    faixa_info: '1.000 pontos no ranking do Fun Festival',
    descricao: 'Main Event da 1ª etapa do Fun Festival com 500K garantidos',
  }),
  torneioDetalheDefaults({
    slug: 'fun-festival-high-roller',
    titulo: 'Fun Festival High Roller 100K GTD',
    data: '2026-07-30',
    categoria: 'Fun Festival',
    cor: 'purple',
    inicio: '16:00',
    late: '20:00',
    buy_in: { preco: 'R$2.500,00' },
    favorito: { visivel: true, cor: 'verde' },
    filtros: { local: 'clube-fisico', buy_in: '201-500', garantido: '100k', series: 'fun-festival', etapa: '1' },
    faixa_info: '850 pontos no ranking do Fun Festival',
    descricao: 'High Roller da 1ª etapa do Fun Festival',
  }),
  torneioDetalheDefaults({
    slug: 'fun-festival-turbo',
    titulo: 'Fun Festival Turbo',
    data: '2026-07-31',
    categoria: 'Fun Festival',
    cor: 'purple',
    inicio: '19:00',
    late: '21:00',
    buy_in: { preco: 'R$150,00' },
    favorito: { visivel: true, cor: 'verde' },
    filtros: { local: 'online', buy_in: '50-200', garantido: '20k', series: 'fun-festival', etapa: '2' },
    faixa_info: '290 pontos no ranking do Fun Festival',
    descricao: 'Esse torneio dá uma vaga no Main Event do Fun Festival 2ª Etapa',
  }),
  torneioDetalheDefaults({
    slug: 'fun-festival-ladies',
    titulo: 'Fun Festival Ladies',
    data: '2026-08-08',
    categoria: 'Fun Festival',
    cor: 'purple',
    inicio: '14:00',
    late: '18:00',
    buy_in: { preco: 'R$300,00' },
    favorito: { visivel: true, cor: 'verde' },
    filtros: { local: 'clube-fisico', buy_in: '201-500', garantido: '30k', series: 'fun-festival', etapa: '2' },
    faixa_info: '450 pontos no ranking Ladies',
    descricao: 'Torneio Ladies da 2ª etapa com pontuação exclusiva no ranking',
  }),
  torneioDetalheDefaults({
    slug: 'fun-festival-bounty',
    titulo: 'Fun Festival Bounty',
    data: '2026-10-12',
    categoria: 'Fun Festival',
    cor: 'purple',
    inicio: '15:00',
    late: '19:00',
    buy_in: { preco: 'R$400,00' },
    favorito: { visivel: true, cor: 'verde' },
    filtros: { local: 'clube-fisico', buy_in: '201-500', garantido: '40k', series: 'fun-festival', etapa: '3' },
    faixa_info: '380 pontos no ranking do Fun Festival',
    descricao: 'Bounty da 3ª etapa — elimine jogadores e leve o prêmio extra',
  }),
]

export const CASH_GAME_MESAS: CashGameMesaMock[] = [
  { slug: 'omaha-5-5', titulo: 'Omaha 5/5', categoria: 'Cash game', status: 'aberta', badge: { texto: 'ABERTA', cor: 'purple' }, ativo: true },
  { slug: 'omaha-10-10', titulo: 'Omaha 10/10', categoria: 'Cash game', status: 'aberta', badge: { texto: 'ABERTA', cor: 'purple' }, ativo: true },
  { slug: 'holdem-2-5', titulo: 'Hold\'em 2/5', categoria: 'Cash game', status: 'aberta', badge: { texto: 'ABERTA', cor: 'purple' }, ativo: true },
  { slug: 'holdem-5-10', titulo: 'Hold\'em 5/10', categoria: 'Cash game', status: 'off', badge: { texto: 'OFF', cor: 'purple' }, ativo: false },
  { slug: 'plo-1-2', titulo: 'PLO 1/2', categoria: 'Cash game', status: 'aberta', badge: { texto: 'ABERTA', cor: 'purple' }, ativo: true },
  { slug: 'holdem-1-2', titulo: 'Hold\'em 1/2', categoria: 'Cash game', status: 'off', badge: { texto: 'OFF', cor: 'purple' }, ativo: false },
]

export const ALL_TORNEIOS: TorneioMock[] = [
  ...AGENDA_TORNEIOS_PINHEIROS,
  ...AGENDA_TORNEIOS_CPH,
  ...AGENDA_TORNEIOS_FUN,
]

export function findTorneioBySlug(slug: string): TorneioMock | undefined {
  return ALL_TORNEIOS.find(t => t.slug === slug)
}

export function torneioLink(slug: string) {
  return `torneios/${slug}`
}

export function toGridCardComponent(t: TorneioMock, id: number, ordem: number) {
  const link = torneioLink(t.slug)
  const btnCor = t.cor === 'vermelho' ? 'branco' : 'verde'
  return {
    id,
    type: 'card',
    ordem,
    status: 'publicado',
    data: {
      variant: 'torneio',
      slug: t.slug,
      cor: t.cor,
      badge: t.badge,
      categoria: t.categoria,
      /** ISO — o front compara com hoje e monta Hoje / Amanhã / Quarta-feira - 29 de julho */
      data: t.data,
      filtros: t.filtros,
      favorito: t.favorito,
      titulo: t.titulo,
      inicio: t.inicio,
      late: t.late,
      buy_in: t.buy_in,
      faixa_info: t.faixa_info,
      descricao: t.descricao,
      link,
      botoes: [
        { label: 'Saiba mais', variant: 'outline', cor: btnCor, link },
        { label: 'Comprar buy-in', variant: 'solid', cor: btnCor, link },
      ],
    },
  }
}

export function toPreviewCardComponent(
  t: TorneioMock,
  id: number,
  ordem: number,
  ativo: boolean,
) {
  const link = torneioLink(t.slug)
  return {
    id,
    type: 'card',
    ordem,
    status: 'publicado',
    data: {
      slug: t.slug,
      ativo,
      garantido: t.garantido ?? t.categoria,
      titulo: t.titulo,
      inicio: t.inicio,
      late: t.late,
      link,
      botoes: [{ label: 'Saiba mais', link }],
    },
  }
}

export function toCashGameCardComponent(m: CashGameMesaMock, id: number, ordem: number) {
  const aberta = m.status === 'aberta'
  return {
    id,
    type: 'card',
    ordem,
    status: 'publicado',
    data: {
      variant: 'cash_game',
      slug: m.slug,
      cor: 'purple',
      badge: m.badge,
      categoria: m.categoria ?? 'Cash game',
      titulo: m.titulo,
      subtitulo: aberta ? 'Aberta' : 'Off',
      ativo: m.ativo ?? aberta,
      filtros: { status: m.status },
      botoes: [
        {
          label: 'Entrar na fila',
          variant: 'solid',
          cor: 'verde',
          // Sem link: CardCashGameLayout abre o modal via useCashGameFila
        },
      ],
    },
  }
}

export const ETAPA_FILTER_SECTION = {
  id: 'etapa',
  titulo: 'Etapa',
  colunas: 3 as const,
  opcoes: [
    { id: '1', label: '1ª Etapa' },
    { id: '2', label: '2ª Etapa' },
    { id: '3', label: '3ª Etapa' },
    { id: '4', label: '4ª Etapa' },
    { id: '5', label: '5ª Etapa' },
  ],
}

export function buildDiaFilterSection(torneios: TorneioMock[]) {
  return {
    id: 'dia',
    titulo: 'Dia',
    colunas: 2 as const,
    opcoes: buildDiaFilterOptions(torneios.map(t => t.data)),
  }
}

/** Toolbar mínimo para helpers que manipulam `filtro.modal.secoes` (preserva o restante via genérico). */
type ToolbarWithSecoes = {
  filtro: { modal: { secoes: ReadonlyArray<{ id: string }> } }
}

export function withDiaFilter<T extends ToolbarWithSecoes>(
  toolbar: T,
  torneios: TorneioMock[],
) {
  return {
    ...toolbar,
    filtro: {
      ...toolbar.filtro,
      modal: {
        ...toolbar.filtro.modal,
        secoes: [buildDiaFilterSection(torneios), ...toolbar.filtro.modal.secoes],
      },
    },
  }
}

export function withEtapaFilter<T extends ToolbarWithSecoes>(toolbar: T) {
  return {
    ...toolbar,
    filtro: {
      ...toolbar.filtro,
      modal: {
        ...toolbar.filtro.modal,
        secoes: [ETAPA_FILTER_SECTION, ...toolbar.filtro.modal.secoes],
      },
    },
  }
}
