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
      :variant="clearAppearance.variant"
      class="inline-flex h-8 items-center rounded-full px-4 text-sm"
      :class="clearAppearance.class"
      @click="emit('clear')"
    >
      {{ clearLabel }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { resolveCtaButtonAppearance } from '~/utils/sectionCtaButton'
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

const clearAppearance = computed(() => resolveCtaButtonAppearance('verde', 'outline'))

const badges = computed(() =>
  props.sections.flatMap(section => section.badges),
)
</script>
