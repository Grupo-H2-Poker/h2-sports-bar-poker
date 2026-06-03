<template>
  <RankingFaixa
    :config="config"
    :players="players"
  />
</template>

<script setup lang="ts">
import type { ModuloOf } from '~/types/modules'
import RankingFaixa from '~/components/ranking/RankingFaixa.vue'

const props = defineProps<{
  modulo: ModuloOf<'ranking'>
}>()

const { config, players } = useRankingModule(() => props.modulo)
</script>
