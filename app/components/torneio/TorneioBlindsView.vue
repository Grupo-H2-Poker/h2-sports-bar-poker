<template>
  <div class="pb-16 pt-10">
    <div class="container mx-auto flex flex-col px-4">
      <h1 class="text-center text-[30px] font-bold leading-[50px] text-[#e7e7e7]">
        Tabela de Blinds
      </h1>

      <div class="mt-14 w-full overflow-x-auto">
        <Table class="w-full min-w-[640px] font-[family-name:var(--font-red-hat-display)]">
          <TableHeader>
            <TableRow class="border-white/20 hover:bg-transparent">
              <TableHead
                v-for="coluna in colunas"
                :key="coluna.id"
                class="h-auto px-4 pb-3 text-center text-sm font-bold uppercase text-[#e7e7e7]"
              >
                {{ coluna.label }}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <template
              v-for="(row, index) in blinds.rows"
              :key="rowKey(row, index)"
            >
              <!-- BREAK / LATE — container cinza arredondado (Figma 401:2925 + 401:2987) -->
              <TableRow
                v-if="row.type === 'separator'"
                class="border-none hover:bg-transparent"
              >
                <TableCell
                  :colspan="colunas.length"
                  class="p-0 py-14"
                >
                  <div
                    class="flex h-[60px] w-full items-center justify-center overflow-clip rounded-lg bg-[#373737]"
                  >
                    <p class="text-center text-base font-bold leading-7 text-[#e7e7e7]">
                      {{ row.label }}
                    </p>
                  </div>
                </TableCell>
              </TableRow>

              <!-- Níveis — mesmo layout da tabela do ranking -->
              <TableRow
                v-else
                class="h-[76px] border-none hover:bg-transparent"
                :class="index % 2 === 1 ? 'bg-[#323232]' : 'bg-transparent'"
              >
                <TableCell class="px-4 text-center text-sm font-medium tabular-nums text-[#e7e7e7]">
                  {{ row.nivel }}
                </TableCell>
                <TableCell class="px-4 text-center text-sm font-medium text-[#e7e7e7]">
                  {{ row.duracao }}
                </TableCell>
                <TableCell class="px-4 text-center text-sm font-medium tabular-nums text-[#e7e7e7]">
                  {{ row.small }}
                </TableCell>
                <TableCell class="px-4 text-center text-sm font-medium tabular-nums text-[#e7e7e7]">
                  {{ row.big }}
                </TableCell>
                <TableCell class="px-4 text-center text-sm font-medium tabular-nums text-[#e7e7e7]">
                  {{ row.ante }}
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import type { TorneioBlindsData, TorneioBlindsRow } from '~/types/torneio-blinds'

defineProps<{
  blinds: TorneioBlindsData
}>()

const colunas = [
  { id: 'nivel', label: 'Nível' },
  { id: 'duracao', label: 'Duração' },
  { id: 'small', label: 'Small' },
  { id: 'big', label: 'Big' },
  { id: 'ante', label: 'Ante' },
] as const

function rowKey(row: TorneioBlindsRow, index: number) {
  return row.type === 'separator' ? `sep-${row.label}-${index}` : `lvl-${row.nivel}`
}
</script>
