<template>
  <section class="overflow-x-clip">
    <div class="container mx-auto px-4">
      <!-- Grid full-width (ex.: depoimentos Eventos) -->
      <div
        v-if="isGrid"
        class="grid grid-cols-1 gap-10 pt-[65px] md:grid-cols-3 md:gap-10"
      >
        <CardGeneric
          v-for="card in previewCards"
          :key="card.id"
          :dados="card.data"
          fill
        />
      </div>

      <!-- Wrap: grade 3+2 centralizada (ex.: mãos Jackpot) -->
      <div
        v-else-if="isWrap"
        class="mx-auto grid max-w-[1100px] grid-cols-1 justify-items-center gap-x-16 gap-y-20 pt-4 sm:grid-cols-2 md:grid-cols-6"
      >
        <div
          v-for="(card, index) in previewCards"
          :key="card.id"
          class="w-full max-w-[281px] md:col-span-2"
          :class="wrapItemClass(index, previewCards.length)"
        >
          <CardGeneric :dados="card.data" />
        </div>
      </div>

      <!-- Carousel padrão (CTA + DragCarousel) -->
      <div
        v-else
        class="flex min-w-0 items-center gap-12"
      >
        <div
          v-if="ctaConfig"
          class="shrink-0"
        >
          <SectionCTA :config="ctaConfig" />
        </div>

        <DragCarousel
          class="min-w-0 w-0 flex-1"
          :bleed-right="carouselBleedRight"
          content-class="gap-4 items-stretch py-2"
        >
          <CardGeneric
            v-if="cashGameCard"
            :key="cashGameCard.id"
            :dados="cashGameCard.data"
          />

          <CardGeneric
            v-for="card in previewCards"
            :key="card.id"
            :dados="card.data"
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
import CardGeneric from '~/components/cards/CardGeneric.vue'

const props = defineProps<{
  modulo: ModuloOf<'agenda_preview'>
}>()

const { ctaConfig, cashGameCard, previewCards } = useAgendaPreviewModule(() => props.modulo)

const isGrid = computed(() => props.modulo.metadados?.layout === 'grid')
const isWrap = computed(() => props.modulo.metadados?.layout === 'wrap')

const carouselBleedRight = computed(
  () => props.modulo.metadados?.carousel_bleed_right ?? false,
)

/** Centraliza a última linha incompleta na grade de 3 colunas (md+). */
function wrapItemClass(index: number, total: number) {
  const remainder = total % 3
  if (remainder === 2 && index === total - 2) return 'md:col-start-2'
  if (remainder === 2 && index === total - 1) return 'md:col-start-4'
  if (remainder === 1 && index === total - 1) return 'md:col-start-3'
  return undefined
}
</script>
