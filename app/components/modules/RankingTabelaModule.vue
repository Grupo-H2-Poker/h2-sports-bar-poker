<template>
  <RankingTabela
    :config="config"
    :section-cta-configs="sectionCtaConfigs"
    :linhas="linhas"
  />
</template>

<script setup lang="ts">
import type { ModuloOf } from '~/types/modules'
import RankingTabela from '~/components/ranking/RankingTabela.vue'

const props = defineProps<{
  modulo: ModuloOf<'ranking_tabela'>
}>()

const { config, sectionCtaConfigs, linhas } = useRankingTabelaModule(() => props.modulo)
</script>
