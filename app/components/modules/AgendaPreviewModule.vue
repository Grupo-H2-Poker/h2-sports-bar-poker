<template>
  <section class="py-10">
    <div class="container mx-auto px-4">
      <div class="flex gap-12 items-center">
        <div v-if="ctaConfig" class="shrink-0">
          <SectionCTA :config="ctaConfig" />
        </div>

        <DragCarousel class="min-w-0 flex-1" content-class="gap-4 items-stretch pb-1">
          <CardGeneric
            v-if="cashGameCard"
            :key="cashGameCard.id"
            :dados="cashGameCard.data"
          />

          <CardGeneric
            v-for="card in torneioCards"
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

const { ctaConfig, cashGameCard, torneioCards } = useAgendaPreviewModule(() => props.modulo)
</script>
