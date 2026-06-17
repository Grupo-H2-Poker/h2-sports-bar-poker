<template>
  <TableRow
    class="h-[76px] border-none hover:bg-transparent"
    :class="striped ? 'bg-[#323232]' : 'bg-transparent'"
  >
    <TableCell class="px-4 text-center text-sm font-medium tabular-nums text-[#e7e7e7]">
      {{ colocacaoLabel }}
    </TableCell>

    <TableCell class="px-4 text-center text-sm font-medium uppercase text-[#e7e7e7]">
      {{ nome }}
    </TableCell>

    <TableCell
      v-if="colunas > 2"
      class="px-4 text-center text-sm font-medium tabular-nums text-[#e7e7e7]"
    >
      {{ pontosLabel }}
    </TableCell>
  </TableRow>
</template>

<script setup lang="ts">
import { TableCell, TableRow } from '~/components/ui/table'

const props = defineProps<{
  colocacao: number | string
  nome: string
  pontos?: string | number
  colunas: number
  striped?: boolean
}>()

const colocacaoLabel = computed(() => formatRankingColocacao(props.colocacao))
const pontosLabel = computed(() => formatRankingPontos(props.pontos))
</script>
