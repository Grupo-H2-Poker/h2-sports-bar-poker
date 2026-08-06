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

const carouselBleedRight = computed(
  () => props.modulo.metadados?.carousel_bleed_right ?? false,
)
</script>
