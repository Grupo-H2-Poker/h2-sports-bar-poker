<template>
  <div :class="['grid py-1', colunasClass, gapClass]">
    <div
      v-for="item in items"
      :key="item.id"
      class="min-w-0 h-full"
    >
      <CardGeneric
        v-if="item.type === 'card'"
        fill
        :active="true"
        :dados="item.data as CardGenericData"
      />
      <GridImagemItem
        v-else-if="item.type === 'imagem'"
        :dados="item.data as GaleriaImagemData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComponentData, ModuloContentDataMap } from '~/types/modules'
import type { CardGenericData } from '~/types/cards'
import type { GridConfigData } from '~/types/grid'
import type { GaleriaImagemData } from '~/types/modules'
import CardGeneric from '~/components/cards/CardGeneric.vue'
import GridImagemItem from '~/components/grid/parts/GridImagemItem.vue'

type GridItem = ComponentData<ModuloContentDataMap['grid']>

const props = defineProps<{
  config: GridConfigData
  items: GridItem[]
}>()

const colunasClass = computed(() => {
  const cols = props.config.colunas ?? 3
  const map: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }
  return map[cols] ?? map[3]
})

const gapClass = computed(() => {
  switch (props.config.gap) {
    case 'sm': return 'gap-4'
    case 'lg': return 'gap-8'
    default: return 'gap-6'
  }
})
</script>
