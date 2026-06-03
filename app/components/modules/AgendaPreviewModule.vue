<template>
  <section class="py-10">
    <div class="container mx-auto px-4">
      <div class="flex gap-18 items-center">
        <SectionCTA v-if="ctaConfig" :config="ctaConfig" />

        <DragCarousel class="flex-1" content-class="gap-4 pb-1">
          <CardGeneric
            v-for="card in cards"
            :key="card.id"
            :dados="card.data"
            :active="card.id === activeId"
          />
        </DragCarousel>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ModuloOf } from '~/types/modules'
import { getCardHorarioInicio } from '~/composables/useCardTheme'

import DragCarousel from '~/components/modules/DragCarousel.vue'
import SectionCTA from '~/components/modules/SectionCTA.vue'
import CardGeneric from '~/components/cards/CardGeneric.vue'

const props = defineProps<{
  modulo: ModuloOf<'agenda'>
}>()

const { ctaConfig, items: cards } = useModuloComponents(() => props.modulo)

const activeId = computed(() => {
  const now = new Date()
  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  let bestId: number | null = null
  let bestDiff = Infinity
  let bestFutureDiff = Infinity
  let bestFutureId: number | null = null

  for (const card of cards.value) {
    const inicio = getCardHorarioInicio(card.data)

    if (!inicio) continue

    const parts = inicio.split(':')

    const h = parseInt(parts[0] ?? '', 10)
    const m = parseInt(parts[1] ?? '', 10)

    if (isNaN(h) || isNaN(m)) continue

    const cardMinutes = h * 60 + m
    const diff = cardMinutes - nowMinutes

    if (diff >= 0 && diff < bestFutureDiff) {
      bestFutureDiff = diff
      bestFutureId = card.id
    }

    if (Math.abs(diff) < bestDiff) {
      bestDiff = Math.abs(diff)
      bestId = card.id
    }
  }

  return bestFutureId ?? bestId
})
</script>
