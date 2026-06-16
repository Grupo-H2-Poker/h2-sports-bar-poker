<template>
  <div
    class="flex w-full items-center justify-between rounded-full bg-[#323232] p-[7.5px] font-[family-name:var(--font-red-hat-display)]"
    role="tablist"
    aria-label="Filtrar ranking"
  >
    <Button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      role="tab"
      variant="ghost"
      class="flex h-10 w-[98px] shrink-0 items-center justify-center whitespace-nowrap rounded-full px-2 text-base leading-none text-[#e7e7e7] hover:bg-white/10"
      :class="activeTab === tab.id
        ? 'font-bold'
        : 'bg-transparent font-medium'"
      :style="activeTab === tab.id ? { backgroundColor: accentColor } : undefined"
      :aria-selected="activeTab === tab.id"
      @click="$emit('update:activeTab', tab.id)"
    >
      {{ tab.label }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import type { RankingTabelaTabData } from '~/types/ranking-tabela'

defineProps<{
  tabs: RankingTabelaTabData[]
  activeTab: string
  accentColor: string
}>()

defineEmits<{
  'update:activeTab': [tabId: string]
}>()
</script>
