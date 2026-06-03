<template>
  <section class="py-10">
    <div class="container mx-auto px-4">
      <GridPageHeader
        :cta-config="ctaConfig"
        :toolbar-config="toolbarConfig"
        v-model:search="searchQuery"
      />

      <GridGeneric
        v-if="filteredItems.length"
        :config="gridConfig"
        :items="filteredItems"
      />

      <p
        v-else-if="items.length"
        class="text-center text-muted-foreground py-12"
      >
        Nenhum resultado para "{{ searchQuery }}".
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ComponentData, ModuloContentDataMap, ModuloOf } from '~/types/modules'
import GridGeneric from '~/components/grid/GridGeneric.vue'
import GridPageHeader from '~/components/grid/parts/GridPageHeader.vue'

type GridItem = ComponentData<ModuloContentDataMap['grid']>

const props = defineProps<{
  modulo: ModuloOf<'grid'>
}>()

const { ctaConfig, toolbarConfig, gridConfig, items } = useGridModule(() => props.modulo)

const searchQuery = ref('')

const filteredItems = computed((): GridItem[] =>
  filterGridItemsBySearch(items.value, searchQuery.value),
)
</script>
