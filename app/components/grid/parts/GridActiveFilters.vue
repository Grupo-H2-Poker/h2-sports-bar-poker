<template>
  <div
    v-if="sections.length"
    class="space-y-6"
  >
    <div
      v-for="section in sections"
      :key="section.id"
      class="space-y-3"
    >
      <p class="text-xl font-medium text-[#e7e7e7]">
        {{ section.titulo }}
      </p>

      <div class="flex flex-wrap gap-3">
        <GridFilterChip
          v-for="badge in section.badges"
          :key="`${badge.sectionId}-${badge.optionId}`"
          :label="badge.label"
          @click="emit('remove', badge.sectionId, badge.optionId)"
        />
      </div>
    </div>

    <Button
      v-if="clearLabel"
      type="button"
      variant="outline"
      class="rounded-full border-brand-green bg-transparent px-4 text-brand-green hover:bg-brand-green/10 hover:text-brand-green"
      @click="emit('clear')"
    >
      {{ clearLabel }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import GridFilterChip from '~/components/grid/parts/GridFilterChip.vue'

export interface GridActiveFilterSection {
  id: string
  titulo: string
  badges: {
    sectionId: string
    optionId: string
    label: string
  }[]
}

defineProps<{
  sections: GridActiveFilterSection[]
  clearLabel?: string
}>()

const emit = defineEmits<{
  remove: [sectionId: string, optionId: string]
  clear: []
}>()
</script>
