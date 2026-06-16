import type { ComponentData, ModuloContentDataMap, ModuloOf } from '~/types/modules'
import type { RankingTabelaConfigData } from '~/types/ranking-tabela'
import type { SectionCTAData } from '~/types/cards'
import {
  DEFAULT_RANKING_TABELA_COLUNAS,
  DEFAULT_RANKING_TABELA_TABS,
  RANKING_TABELA_CONFIG_COMPONENT_TYPE,
  RANKING_TABELA_LINHA_COMPONENT_TYPE,
  RANKING_TABELA_META_COMPONENT_TYPES,
} from '~/types/ranking-tabela'
import { SECTION_CTA_COMPONENT_TYPE } from '~/types/modules'

type RankingTabelaLinha = ComponentData<ModuloContentDataMap['ranking_tabela']>
type RankingSectionCta = ComponentData<SectionCTAData>

export function useRankingTabelaModule(modulo: MaybeRefOrGetter<ModuloOf<'ranking_tabela'>>) {
  const sortedComponents = computed(() => {
    const { components } = toValue(modulo)
    return [...components]
      .filter(c => c.status === 'publicado')
      .sort((a, b) => a.ordem - b.ordem)
  })

  const sectionCtaConfigs = computed((): RankingSectionCta[] =>
    sortedComponents.value.filter(c => c.type === SECTION_CTA_COMPONENT_TYPE) as RankingSectionCta[],
  )

  const config = computed<RankingTabelaConfigData>(() => {
    const item = sortedComponents.value.find(
      c => c.type === RANKING_TABELA_CONFIG_COMPONENT_TYPE,
    )
    const data = item?.data as RankingTabelaConfigData | undefined
    return {
      tabs: DEFAULT_RANKING_TABELA_TABS,
      colunas: DEFAULT_RANKING_TABELA_COLUNAS,
      ...data,
    }
  })

  const linhas = computed((): RankingTabelaLinha[] => {
    const meta = new Set<string>(RANKING_TABELA_META_COMPONENT_TYPES)
    return sortedComponents.value.filter(
      c => !meta.has(c.type) && c.type === RANKING_TABELA_LINHA_COMPONENT_TYPE,
    ) as RankingTabelaLinha[]
  })

  return { sectionCtaConfigs, config, linhas, sortedComponents }
}

export function resolveRankingSectionCta(
  configs: RankingSectionCta[],
  tabId: string,
  defaultTabId: string,
): SectionCTAData | undefined {
  const byTab = configs.find(c => c.data.tab === tabId)
  if (byTab) return byTab.data

  const withoutTab = configs.find(c => !c.data.tab)
  if (withoutTab) return withoutTab.data

  const byDefaultTab = configs.find(c => c.data.tab === defaultTabId)
  return byDefaultTab?.data ?? configs[0]?.data
}

export function filterRankingLinhasByTab(
  linhas: RankingTabelaLinha[],
  tabId: string,
  defaultTabId: string,
): RankingTabelaLinha[] {
  return linhas.filter((linha) => {
    const tab = linha.data.tab ?? defaultTabId
    return tab === tabId
  })
}

export function formatRankingColocacao(colocacao: number | string): string {
  if (typeof colocacao === 'string') return colocacao
  return `${colocacao}º`
}

export function formatRankingPontos(pontos?: string | number): string {
  if (pontos == null || pontos === '') return '—'
  if (typeof pontos === 'number') return pontos.toLocaleString('pt-BR')
  return pontos
}

export function resolveRankingColocacaoNumero(colocacao: number | string): number {
  if (typeof colocacao === 'number') return colocacao
  const parsed = Number.parseInt(String(colocacao).replace(/\D/g, ''), 10)
  return Number.isFinite(parsed) ? parsed : 0
}

export function sortRankingLinhasByColocacao(
  linhas: RankingTabelaLinha[],
): RankingTabelaLinha[] {
  return [...linhas].sort(
    (a, b) =>
      resolveRankingColocacaoNumero(a.data.colocacao)
      - resolveRankingColocacaoNumero(b.data.colocacao),
  )
}

export function splitRankingLinhasByPosicao(
  linhas: RankingTabelaLinha[],
  tabId: string,
  defaultTabId: string,
) {
  const ativas = sortRankingLinhasByColocacao(
    filterRankingLinhasByTab(linhas, tabId, defaultTabId),
  )

  const podio = ativas.filter((linha) => {
    const posicao = resolveRankingColocacaoNumero(linha.data.colocacao)
    return posicao >= 1 && posicao <= 5
  })

  const tabela = ativas.filter(
    linha => resolveRankingColocacaoNumero(linha.data.colocacao) >= 6,
  )

  return { podio, tabela }
}
