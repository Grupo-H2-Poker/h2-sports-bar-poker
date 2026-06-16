<template>
  <div class="w-full">
    <div
      class="mb-1 grid items-center gap-4 border-b border-white/20 px-4 pb-3 text-sm font-bold uppercase text-[#e7e7e7]"
      :style="{ gridTemplateColumns }"
    >
      <span
        v-for="coluna in colunas"
        :key="coluna.id"
        class="text-center"
      >
        {{ coluna.label }}
      </span>
    </div>

    <div class="flex flex-col">
      <RankingTabelaLinha
        v-for="(linha, index) in linhas"
        :key="linhaKey(linha, index)"
        :colocacao="linha.colocacao"
        :nome="linha.nome"
        :pontos="linha.pontos"
        :colunas="colunas.length"
        :striped="index % 2 === 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RankingTabelaColunaData } from '~/types/ranking-tabela'
import RankingTabelaLinha from '~/components/ranking/parts/RankingTabelaLinha.vue'

export interface RankingTabelaGridLinha {
  id?: number | string
  colocacao: number | string
  nome: string
  pontos?: string | number
}

const props = defineProps<{
  colunas: RankingTabelaColunaData[]
  linhas: RankingTabelaGridLinha[]
}>()

const gridTemplateColumns = computed(() => {
  if (props.colunas.length === 2) return '100px 1fr'
  return '100px 1fr 100px'
})

function linhaKey(linha: RankingTabelaGridLinha, index: number) {
  return linha.id ?? `${linha.colocacao}-${linha.nome}-${index}`
}
</script>
