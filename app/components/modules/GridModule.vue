<template>
  <section>
    <div class="container mx-auto px-4">
      <GridPageHeader
        :cta-config="ctaConfig"
        :toolbar-config="toolbarConfig"
        :active-filter-sections="activeSections"
        v-model:search="searchQuery"
        @open-filtros="openFilters"
        @remove-filter="removeAppliedOption"
        @clear-filters="clearAll"
      />

      <GridFilterSidebar
        v-if="filterModalConfig"
        v-model:open="isFilterOpen"
        :config="filterModalConfig"
        :is-selected="isDraftSelected"
        @toggle="toggleDraftOption"
        @apply="applyFilters"
        @clear="clearDraft"
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
        {{ emptyStateMessage }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ComponentData, ModuloContentDataMap, ModuloOf } from '~/types/modules'
import GridGeneric from '~/components/grid/GridGeneric.vue'
import GridFilterSidebar from '~/components/grid/parts/GridFilterSidebar.vue'
import GridPageHeader from '~/components/grid/parts/GridPageHeader.vue'

type GridItem = ComponentData<ModuloContentDataMap['grid']>

const props = defineProps<{
  modulo: ModuloOf<'grid'>
}>()

const { ctaConfig, toolbarConfig, gridConfig, items } = useGridModule(() => props.modulo)

const filterModalConfig = computed(() => toolbarConfig.value?.filtro?.modal)
const initialFilters = computed(() => gridConfig.value.filtros_iniciais)

const {
  isOpen: isFilterOpen,
  applied,
  activeSections,
  open: openFilters,
  toggleDraftOption,
  isDraftSelected,
  apply: applyFilters,
  clearAll,
  clearDraft,
  removeAppliedOption,
} = useGridFilters(filterModalConfig, initialFilters)

const searchQuery = ref('')

const filteredItems = computed((): GridItem[] => {
  const byFilters = filterGridItemsByFilters(items.value, applied.value)
  return filterGridItemsBySearch(byFilters, searchQuery.value)
})

const emptyStateMessage = computed(() => {
  if (searchQuery.value.trim()) {
    return `Nenhum resultado para "${searchQuery.value}".`
  }
  return 'Nenhum torneio encontrado com os filtros selecionados.'
})
</script>
