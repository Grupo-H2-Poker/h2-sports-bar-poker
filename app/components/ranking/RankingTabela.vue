<template>
  <section class="py-10 overflow-x-clip">
    <div class="container mx-auto flex flex-col px-4">
      <div
        v-if="tabs.length"
        class="w-full max-w-4xl self-center"
      >
        <RankingTabelaFiltro
          :tabs="tabs"
          :active-tab="activeTab"
          :accent-color="accentColor"
          @update:active-tab="activeTab = $event"
        />
      </div>

      <SectionCTA
        v-if="headerConfig?.titulo || headerConfig?.descricao"
        class="mt-14 self-center"
        :config="headerConfig"
        inverted
      />

      <div
        v-if="podioLinhas.length"
        class="mt-14 grid w-full grid-cols-5 items-end justify-items-center"
      >
        <RankingPodioCard
          v-for="linha in podioLinhas"
          :key="linha.id"
          :colocacao="linha.data.colocacao"
          :nome="linha.data.nome"
          :avatar="linha.data.avatar"
          :pontos="linha.data.pontos"
          :accent-color="accentColor"
        />
      </div>

      <div
        v-if="tabelaLinhas.length"
        class="mt-24 w-full max-w-4xl self-center"
      >
        <RankingTabelaGrid
          :colunas="colunas"
          :linhas="tabelaLinhasGrid"
        />
      </div>

      <div
        v-if="config.cta"
        class="mt-10 flex justify-center"
      >
        <Button
          variant="outline"
          class="rounded-full border-white bg-transparent text-white hover:bg-white/10"
          @click="handleCtaClick"
        >
          {{ config.cta }}
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { ComponentData, ModuloContentDataMap } from '~/types/modules'
import type { RankingTabelaConfigData } from '~/types/ranking-tabela'
import type { SectionCTAData } from '~/types/cards'
import { resolveRankingTabelaAccent } from '~/types/ranking-tabela'
import SectionCTA from '~/components/modules/SectionCTA.vue'
import RankingPodioCard from '~/components/ranking/parts/RankingPodioCard.vue'
import RankingTabelaFiltro from '~/components/ranking/parts/RankingTabelaFiltro.vue'
import RankingTabelaGrid from '~/components/ranking/parts/RankingTabelaGrid.vue'

type RankingLinha = ComponentData<ModuloContentDataMap['ranking_tabela']>

const props = defineProps<{
  config: RankingTabelaConfigData
  sectionCtaConfigs: ComponentData<SectionCTAData>[]
  linhas: RankingLinha[]
}>()

const tabs = computed(() => props.config.tabs ?? [{ id: 'geral', label: 'Geral' }])
const colunas = computed(() => props.config.colunas ?? [
  { id: 'colocacao', label: 'Colocação' },
  { id: 'nome', label: 'Nome Sobrenome' },
  { id: 'pontos', label: 'Pontos' },
])

const defaultTabId = computed(() => tabs.value[0]?.id ?? 'geral')
const activeTab = ref(defaultTabId.value)

watch(defaultTabId, (id) => {
  activeTab.value = id
})

const accentColor = computed(() => resolveRankingTabelaAccent(props.config))

const headerConfig = computed(() =>
  resolveRankingSectionCta(
    props.sectionCtaConfigs,
    activeTab.value,
    defaultTabId.value,
  ),
)

const podioLinhas = computed(() =>
  splitRankingLinhasByPosicao(props.linhas, activeTab.value, defaultTabId.value).podio,
)

const tabelaLinhas = computed(() =>
  splitRankingLinhasByPosicao(props.linhas, activeTab.value, defaultTabId.value).tabela,
)

const tabelaLinhasGrid = computed(() =>
  tabelaLinhas.value.map(linha => ({
    id: linha.id,
    colocacao: linha.data.colocacao,
    nome: linha.data.nome,
    pontos: linha.data.pontos,
  })),
)

const route = useRoute()

function handleCtaClick() {
  const link = props.config.cta_link
  if (!link) return

  const unidadeSlug = route.params.unidade as string | undefined
  if (unidadeSlug) {
    navigateTo(resolveUnidadeHref(unidadeSlug, link))
    return
  }

  navigateTo(link)
}
</script>
