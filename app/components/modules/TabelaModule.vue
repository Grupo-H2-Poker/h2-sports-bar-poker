<template>
  <section class="container mx-auto px-4">
    <SectionCTA
      v-if="ctaConfig"
      :config="ctaConfig"
      inverted
      class="mb-10"
    />

    <div
      v-for="(table, tableIndex) in tables"
      :key="table.config.id"
      :class="tableIndex > 0 && 'mt-16'"
    >
      <Table class="w-full min-w-[640px] font-[family-name:var(--font-red-hat-display)]">
        <TableHeader>
          <TableRow class="border-white/20 hover:bg-transparent">
            <TableHead
              v-for="(col, colIndex) in table.config.data.colunas"
              :key="col.id"
              class="h-auto px-4 pb-3 text-sm font-bold uppercase text-[#e7e7e7]"
              :class="colAlignClass(col, colIndex)"
            >
              {{ col.label }}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow
            v-for="(row, rowIndex) in table.rows"
            :key="row.id"
            class="h-[76px] border-none hover:bg-transparent"
            :class="rowIndex % 2 === 1 ? 'bg-[#323232]' : 'bg-transparent'"
          >
            <TableCell
              v-for="(col, colIndex) in table.config.data.colunas"
              :key="`${row.id}-${col.id}`"
              class="px-4 text-sm font-medium text-[#e7e7e7]"
              :class="colAlignClass(col, colIndex)"
            >
              {{ row.data.cells[colIndex] ?? '' }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div
      v-if="notas.length"
      class="mt-10 space-y-1 text-center text-base font-medium leading-7 text-[#e7e7e7]"
    >
      <p
        v-for="(nota, i) in notas"
        :key="i"
      >
        {{ nota }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionCTA from '~/components/modules/SectionCTA.vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import {
  TABELA_CONFIG_COMPONENT_TYPE,
  TABELA_LINHA_COMPONENT_TYPE,
  type TabelaColunaData,
  type TabelaConfigData,
  type TabelaLinhaData,
} from '~/types/tabela'
import type { ComponentData, ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'tabela'>
}>()

const { ctaConfig, items } = useModuloComponents(() => props.modulo)

const notas = computed(() => props.modulo.metadados?.notas ?? [])

type TableBlock = {
  config: ComponentData<TabelaConfigData>
  rows: ComponentData<TabelaLinhaData>[]
}

const tables = computed((): TableBlock[] => {
  const blocks: TableBlock[] = []
  let current: TableBlock | null = null

  for (const item of items.value) {
    if (item.type === TABELA_CONFIG_COMPONENT_TYPE) {
      current = {
        config: item as ComponentData<TabelaConfigData>,
        rows: [],
      }
      blocks.push(current)
      continue
    }
    if (item.type === TABELA_LINHA_COMPONENT_TYPE && current) {
      current.rows.push(item as ComponentData<TabelaLinhaData>)
    }
  }

  return blocks
})

/** Padrão = `center` (igual ranking CPH / blinds). */
function colAlignClass(col: TabelaColunaData, _index: number) {
  const align = col.align ?? 'center'
  return {
    'text-left': align === 'left',
    'text-center': align === 'center',
    'text-right': align === 'right',
  }
}
</script>
