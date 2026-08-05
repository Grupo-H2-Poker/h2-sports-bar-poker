<template>
  <div v-if="buyIn" class="flex flex-col gap-1">
    <span class="text-base opacity-80">{{ buyIn.label ?? 'Buy-in:' }}</span>
    <div class="flex flex-nowrap items-baseline gap-2">
      <span class="shrink-0 text-2xl font-bold">{{ buyIn.preco }}</span>
      <span
        v-if="buyIn.pontos"
        class="whitespace-nowrap text-[12px] italic leading-none opacity-70"
      >
        {{ buyIn.pontos }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardBuyIn } from '~/types/cards'

defineProps<{
  buyIn?: CardBuyIn
}>()
</script>
