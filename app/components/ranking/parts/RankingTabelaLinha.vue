<template>
  <div
    class="grid h-[76px] items-center gap-4 px-4 text-sm text-[#e7e7e7]"
    :class="striped ? 'bg-[#323232]' : 'bg-transparent'"
    :style="{ gridTemplateColumns }"
  >
    <span class="text-center font-medium tabular-nums">
      {{ colocacaoLabel }}
    </span>

    <p class="text-center font-medium uppercase">
      {{ nome }}
    </p>

    <span class="text-center font-medium tabular-nums">
      {{ pontosLabel }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  colocacao: number | string
  nome: string
  pontos?: string | number
  colunas: number
  striped?: boolean
}>()

const colocacaoLabel = computed(() => formatRankingColocacao(props.colocacao))
const pontosLabel = computed(() => formatRankingPontos(props.pontos))

const gridTemplateColumns = computed(() => {
  if (props.colunas === 2) return '100px 1fr'
  return '100px 1fr 100px'
})
</script>
