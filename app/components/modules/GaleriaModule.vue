<template>
  <section :class="isCarousel ? 'overflow-x-clip' : undefined">
    <div class="container mx-auto px-4">
      <SectionCTA v-if="ctaConfig" :config="ctaConfig" />

      <div v-if="imagens.length" :class="contentSpacingClass">
        <DragCarousel
          v-if="isCarousel"
          class="w-full"
          :bleed-right="carouselBleedRight"
          content-class="gap-4 items-stretch pb-1"
        >
          <div
            v-for="component in imagens"
            :key="component.id"
            :class="GALERIA_CAROUSEL_SLIDE_CLASS"
          >
            <GaleriaImagemCard :dados="component.data" />
          </div>
        </DragCarousel>

        <div
          v-else
          :class="gridClass"
        >
          <GaleriaImagemCard
            v-for="component in imagens"
            :key="component.id"
            :dados="component.data"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import GaleriaImagemCard from '~/components/galeria/GaleriaImagemCard.vue'
import DragCarousel from '~/components/modules/DragCarousel.vue'
import SectionCTA from '~/components/modules/SectionCTA.vue'
import { GALERIA_CAROUSEL_SLIDE_CLASS } from '~/types/carousel'
import { GALERIA_DEFAULT_LAYOUT, resolveGaleriaGridClasses } from '~/types/galeria'
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'galeria'>
}>()

const { ctaConfig, items: imagens } = useModuloComponents(() => props.modulo)

const layout = computed(() => props.modulo.metadados?.layout ?? GALERIA_DEFAULT_LAYOUT)
const isCarousel = computed(() => layout.value === 'drag_carousel')

const carouselBleedRight = computed(
  () => isCarousel.value && (props.modulo.metadados?.carousel_bleed_right ?? false),
)

const gridClass = computed(() => resolveGaleriaGridClasses(props.modulo.metadados))

const contentSpacingClass = computed(() => (ctaConfig.value ? 'mt-6' : undefined))
</script>
