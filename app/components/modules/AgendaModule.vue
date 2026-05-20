<template>
  <section class="py-10">
    <div class="container mx-auto px-4">
      <div class="flex gap-18 items-center">
        <SectionCTA
          :align="modulo.metadados?.align"
          :size="modulo.metadados?.size"
          :title="modulo.metadados?.titulo"
          :description="modulo.metadados?.descricao"
          :cta="modulo.metadados?.cta"
          :cta-link="modulo.metadados?.cta_link"
        />

        <!-- Carousel -->
        <DragCarousel class="flex-1" content-class="gap-4 pb-1">
          <CardAgenda
            v-for="component in sortedComponents"
            :key="component.id"
            :dados="component.data"
            :active="component.id === activeId"
          />
        </DragCarousel>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ModuloOf } from '~/types/modules'

import DragCarousel from '~/components/modules/DragCarousel.vue'
import SectionCTA from '~/components/modules/SectionCTA.vue'
import CardAgenda from '~/components/cards/CardAgenda.vue'

const props = defineProps<{
  modulo: ModuloOf<'agenda'>
}>()

const sortedComponents = useSortedComponents(() => props.modulo)

const activeId = computed(() => {
  const now = new Date()
  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  let bestId: number | null = null
  let bestDiff = Infinity
  let bestFutureDiff = Infinity
  let bestFutureId: number | null = null

  for (const component of sortedComponents.value) {
    const inicio = component.data.inicio

    if (!inicio) continue

    const parts = inicio.split(':')

    const h = parseInt(parts[0] ?? '', 10)
    const m = parseInt(parts[1] ?? '', 10)

    if (isNaN(h) || isNaN(m)) continue

    const cardMinutes = h * 60 + m
    const diff = cardMinutes - nowMinutes

    if (diff >= 0 && diff < bestFutureDiff) {
      bestFutureDiff = diff
      bestFutureId = component.id
    }

    if (Math.abs(diff) < bestDiff) {
      bestDiff = Math.abs(diff)
      bestId = component.id
    }
  }

  return bestFutureId ?? bestId
})


</script>