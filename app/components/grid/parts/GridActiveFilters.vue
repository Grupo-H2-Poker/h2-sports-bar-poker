<template>
  <div
    v-if="badges.length"
    class="flex flex-wrap gap-3"
  >
    <GridFilterBadge
      v-for="badge in badges"
      :key="`${badge.sectionId}-${badge.optionId}`"
      :label="badge.label"
      @remove="emit('remove', badge.sectionId, badge.optionId)"
    />

    <Button
      v-if="clearLabel"
      type="button"
      variant="outline"
      class="inline-flex h-8 items-center rounded-full border-brand-green bg-transparent px-4 text-sm text-brand-green hover:bg-brand-green/10 hover:text-brand-green"
      @click="emit('clear')"
    >
      {{ clearLabel }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import GridFilterBadge from '~/components/grid/parts/GridFilterBadge.vue'

export interface GridActiveFilterBadge {
  sectionId: string
  optionId: string
  label: string
}

export interface GridActiveFilterSection {
  id: string
  titulo: string
  badges: GridActiveFilterBadge[]
}

const props = defineProps<{
  sections: GridActiveFilterSection[]
  clearLabel?: string
}>()

const emit = defineEmits<{
  remove: [sectionId: string, optionId: string]
  clear: []
}>()

const badges = computed(() =>
  props.sections.flatMap(section => section.badges),
)
</script>
