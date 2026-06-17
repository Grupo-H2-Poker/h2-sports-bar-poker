<template>
  <Table class="w-full">
    <TableHeader>
      <TableRow class="border-white/20 hover:bg-transparent">
        <TableHead
          v-for="coluna in colunas"
          :key="coluna.id"
          class="h-auto px-4 pb-3 text-center text-sm font-bold uppercase text-[#e7e7e7]"
          :class="columnWidthClass(coluna.id, colunas.length)"
        >
          {{ coluna.label }}
        </TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <RankingTabelaLinha
        v-for="(linha, index) in linhas"
        :key="linhaKey(linha, index)"
        :colocacao="linha.colocacao"
        :nome="linha.nome"
        :pontos="linha.pontos"
        :colunas="colunas.length"
        :striped="index % 2 === 1"
      />
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
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

function columnWidthClass(colunaId: string, totalColunas: number) {
  if (totalColunas === 2) {
    return colunaId === 'colocacao' ? 'w-[100px]' : undefined
  }

  if (colunaId === 'colocacao' || colunaId === 'pontos') {
    return 'w-[100px]'
  }

  return undefined
}

function linhaKey(linha: RankingTabelaGridLinha, index: number) {
  return linha.id ?? `${linha.colocacao}-${linha.nome}-${index}`
}
</script>
