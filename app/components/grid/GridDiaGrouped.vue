<template>
  <div class="flex flex-col py-1" :class="rowsGapClass">
    <div
      v-for="(row, rowIndex) in packedRows"
      :key="rowIndex"
      :class="['grid', colsClass, cardsGapClass]"
    >
      <div
        v-for="cell in row"
        :key="cell.item.id"
        class="flex min-w-0 flex-col"
      >
        <div
          class="mb-4 flex min-h-[1.75rem] flex-wrap items-center gap-x-4 gap-y-2 sm:min-h-[1.75rem]"
          :class="cell.isFirstOfDay ? '' : 'invisible select-none'"
          :aria-hidden="cell.isFirstOfDay ? undefined : true"
        >
          <h2
            class="text-lg font-bold tracking-tight sm:text-xl"
            :class="cell.isFirstOfDay ? 'text-[#e7e7e7]' : ''"
          >
            <template v-if="cell.isFirstOfDay">{{ cell.dayLabel }}</template>
            <template v-else>&nbsp;</template>
          </h2>
        </div>
        <div class="min-w-0 flex-1">
          <CardGeneric
            v-if="cell.item.type === 'card'"
            fill
            :active="true"
            :dados="cell.item.data as CardGenericData"
          />
          <GridImagemItem
            v-else-if="cell.item.type === 'imagem'"
            :dados="cell.item.data as GaleriaImagemData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComponentData, ModuloContentDataMap, GaleriaImagemData } from '~/types/modules'
import type { CardGenericData } from '~/types/cards'
import type { GridConfigData, GridDiaGroup } from '~/types/grid'
import CardGeneric from '~/components/cards/CardGeneric.vue'
import GridImagemItem from '~/components/grid/parts/GridImagemItem.vue'

type GridItem = ComponentData<ModuloContentDataMap['grid']>

interface PackedCell {
  item: GridItem
  dayId: string
  dayLabel: string
  isFirstOfDay: boolean
}

const props = defineProps<{
  config: GridConfigData
  groups: GridDiaGroup<GridItem>[]
}>()

const columns = computed(() => props.config.colunas ?? 3)

/**
 * Empacota cards em linhas de N colunas.
 * Dias fluem na ordem: se sobrar 1–2 no fim do dia, completa com o próximo.
 */
const packedRows = computed((): PackedCell[][] => {
  const cells: PackedCell[] = []

  for (const group of props.groups) {
    group.items.forEach((item, index) => {
      cells.push({
        item,
        dayId: group.id,
        dayLabel: group.label,
        isFirstOfDay: index === 0,
      })
    })
  }

  const cols = columns.value
  const rows: PackedCell[][] = []
  for (let i = 0; i < cells.length; i += cols) {
    rows.push(cells.slice(i, i + cols))
  }
  return rows
})

const colsClass = computed(() => {
  const cols = columns.value
  const map: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }
  return map[cols] ?? map[3]
})

const cardsGapClass = computed(() => {
  switch (props.config.gap) {
    case 'sm': return 'gap-4'
    case 'lg': return 'gap-8'
    default: return 'gap-6'
  }
})

const rowsGapClass = computed(() => {
  switch (props.config.gap) {
    case 'sm': return 'gap-y-8'
    case 'lg': return 'gap-y-12'
    default: return 'gap-y-10'
  }
})
</script>
