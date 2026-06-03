<template>
  <div
    v-if="hasHeader"
    class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-10 mb-10"
  >
    <SectionCTA v-if="ctaConfig" :config="ctaConfig" compact />

    <GridToolbar
      v-if="toolbarConfig"
      :config="toolbarConfig"
      :search="search"
      @update:search="emit('update:search', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { SectionCTAData } from '~/types/cards'
import type { GridToolbarData } from '~/types/grid'
import SectionCTA from '~/components/modules/SectionCTA.vue'
import GridToolbar from '~/components/grid/parts/GridToolbar.vue'

const props = defineProps<{
  ctaConfig?: SectionCTAData
  toolbarConfig?: GridToolbarData
  search?: string
}>()

const emit = defineEmits<{
  'update:search': [value: string]
}>()

const hasHeader = computed(
  () => !!(props.ctaConfig?.titulo || props.ctaConfig?.descricao || props.toolbarConfig),
)
</script>
