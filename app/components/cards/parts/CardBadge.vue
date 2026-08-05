<template>
  <span
    v-if="badge?.texto"
    class="absolute top-0 right-0 rounded-bl-[10px] px-7 py-3 text-sm font-extrabold tracking-wide"
    :class="badgeClass"
  >
    {{ badge.texto }}
  </span>
</template>

<script setup lang="ts">
import type { CardBadge as CardBadgeData } from '~/types/cards'

defineProps<{
  badge?: CardBadgeData
  badgeClass: string
}>()
</script>
