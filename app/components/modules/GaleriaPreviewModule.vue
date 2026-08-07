<template>
  <section class="relative z-10 overflow-x-clip">
    <div class="container mx-auto px-4">
      <DragCarousel
        v-if="items.length"
        class="w-full"
        :bleed-left="carouselBleedLeft"
        :bleed-right="carouselBleedRight"
        :bleed-flush="carouselBleedLeft && carouselBleedRight"
        content-class="gap-4 items-stretch"
      >
        <div
          v-for="component in items"
          :key="component.id"
          :class="[
            GALERIA_PREVIEW_SLIDE_CLASS,
            previewLink && 'cursor-pointer',
          ]"
          @click="onPreviewClick"
        >
          <GaleriaPreviewCard :dados="component.data" />
        </div>
      </DragCarousel>
    </div>
  </section>
</template>

<script setup lang="ts">
import DragCarousel from '~/components/modules/DragCarousel.vue'
import GaleriaPreviewCard from '~/components/galeria/GaleriaPreviewCard.vue'
import { GALERIA_PREVIEW_SLIDE_CLASS } from '~/types/galeria'
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'galeria_preview'>
}>()

const {
  items,
  carouselBleedLeft,
  carouselBleedRight,
  previewLink,
} = useGaleriaPreviewModule(() => props.modulo)

const { navigateCta } = useModuloCtaNavigate()

function onPreviewClick() {
  if (!previewLink.value) return
  navigateCta(previewLink.value)
}
</script>
