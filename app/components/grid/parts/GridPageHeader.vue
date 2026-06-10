<template>
  <div v-if="hasHeader" class="mb-10 space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-10">
      <SectionCTA v-if="ctaConfig" :config="ctaConfig" compact />

      <GridToolbar
        v-if="toolbarConfig"
        :config="toolbarConfig"
        :search="search"
        @update:search="emit('update:search', $event)"
        @open-filtros="emit('open-filtros')"
      />
    </div>

    <GridActiveFilters
      v-if="activeFilterSections?.length"
      :sections="activeFilterSections"
      :clear-label="toolbarConfig?.badges?.limpar?.label"
      @remove="(sectionId, optionId) => emit('remove-filter', sectionId, optionId)"
      @clear="emit('clear-filters')"
    />
  </div>
</template>

<script setup lang="ts">
import type { SectionCTAData } from '~/types/cards'
import type { GridToolbarData } from '~/types/grid'
import SectionCTA from '~/components/modules/SectionCTA.vue'
import GridActiveFilters from '~/components/grid/parts/GridActiveFilters.vue'
import GridToolbar from '~/components/grid/parts/GridToolbar.vue'
import type { GridActiveFilterSection } from '~/components/grid/parts/GridActiveFilters.vue'

const props = defineProps<{
  ctaConfig?: SectionCTAData
  toolbarConfig?: GridToolbarData
  search?: string
  activeFilterSections?: GridActiveFilterSection[]
}>()

const emit = defineEmits<{
  'update:search': [value: string]
  'open-filtros': []
  'remove-filter': [sectionId: string, optionId: string]
  'clear-filters': []
}>()

const hasHeader = computed(
  () => !!(props.ctaConfig?.titulo || props.ctaConfig?.descricao || props.toolbarConfig),
)
</script>
