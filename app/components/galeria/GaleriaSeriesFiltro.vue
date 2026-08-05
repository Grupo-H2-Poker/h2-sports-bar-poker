<template>
  <div
    v-if="tabs.length"
    class="flex w-full max-w-full flex-wrap items-center justify-center gap-2 font-[family-name:var(--font-red-hat-display)]"
    role="tablist"
    :aria-label="t('galeria.filterSeriesAria')"
  >
    <button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      role="tab"
      class="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 text-[13px] leading-none transition-all duration-200 ease-out"
      :class="activeTab === tab.id
        ? 'bg-brand-green font-bold text-black shadow-[0_3px_10px_rgba(36,207,164,0.28)]'
        : 'bg-[#373737] font-medium text-[#e7e7e7] hover:bg-[#454545] hover:text-white'"
      :aria-selected="activeTab === tab.id"
      @click="$emit('update:activeTab', tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { GaleriaSeriesFiltroOption } from '~/types/galeria'

defineProps<{
  tabs: GaleriaSeriesFiltroOption[]
  activeTab: string
}>()

defineEmits<{
  'update:activeTab': [tabId: string]
}>()

const { t } = useI18n()
</script>
