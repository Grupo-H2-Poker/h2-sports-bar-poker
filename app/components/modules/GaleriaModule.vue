<template>
  <section :class="isCarousel ? 'overflow-x-clip' : undefined">
    <div class="container mx-auto px-4">
      <SectionCTA
        v-if="ctaConfig && !isAlbumOpen"
        :config="ctaConfig"
        :inverted="cardVariant === 'album'"
      />

      <div
        v-if="isAlbumOpen && activeAlbum"
        class="flex flex-col gap-6"
      >
        <button
          type="button"
          class="inline-flex w-fit items-center gap-2 font-[family-name:var(--font-red-hat-display)] text-sm font-medium text-[#c4c4c4] transition-colors hover:text-white"
          @click="closeAlbum"
        >
          <ArrowLeft class="size-4" aria-hidden="true" />
          {{ t('galeria.backToAlbums') }}
        </button>

        <h2
          v-if="activeAlbum.data.titulo"
          class="font-[family-name:var(--font-red-hat-display)] text-3xl font-bold leading-tight text-white md:text-4xl"
        >
          {{ activeAlbum.data.titulo }}
        </h2>
      </div>

      <div
        v-else-if="showFiltro"
        class="mt-12 mb-12 flex justify-center"
      >
        <GaleriaSeriesFiltro
          class="w-full max-w-3xl"
          :tabs="seriesFiltros"
          :active-tab="activeSeries"
          @update:active-tab="setActiveSeries"
        />
      </div>

      <div
        v-if="isAlbumOpen && albumFotos.length"
        :class="[gridClass, albumContentSpacingClass]"
      >
        <div
          v-for="(foto, index) in albumFotos"
          :key="`${activeAlbum?.id}-foto-${index}`"
          class="min-w-0 h-full"
        >
          <GaleriaFotoCard
            :dados="foto"
            @select="openLightbox(index)"
          />
        </div>
      </div>

      <div
        v-else-if="imagens.length"
        :class="contentSpacingClass"
      >
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
            <component
              :is="cardComponent"
              :dados="component.data"
              @select="openAlbum(component.id)"
            />
          </div>
        </DragCarousel>

        <div
          v-else
          :class="gridClass"
        >
          <div
            v-for="component in imagens"
            :key="component.id"
            class="min-w-0 h-full"
          >
            <component
              :is="cardComponent"
              :dados="component.data"
              @select="openAlbum(component.id)"
            />
          </div>
        </div>
      </div>

      <GaleriaLightbox
        v-model:open="lightboxOpen"
        :fotos="albumFotos"
        :initial-index="lightboxIndex"
        :title="activeAlbum?.data.titulo"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import GaleriaAlbumCard from '~/components/galeria/GaleriaAlbumCard.vue'
import GaleriaFotoCard from '~/components/galeria/GaleriaFotoCard.vue'
import GaleriaImagemCard from '~/components/galeria/GaleriaImagemCard.vue'
import GaleriaLightbox from '~/components/galeria/GaleriaLightbox.vue'
import GaleriaSeriesFiltro from '~/components/galeria/GaleriaSeriesFiltro.vue'
import DragCarousel from '~/components/modules/DragCarousel.vue'
import SectionCTA from '~/components/modules/SectionCTA.vue'
import { GALERIA_CAROUSEL_SLIDE_CLASS } from '~/types/carousel'
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'galeria'>
}>()

const { t } = useI18n()
const {
  ctaConfig,
  imagens,
  isCarousel,
  cardVariant,
  carouselBleedRight,
  gridClass,
  seriesFiltros,
  showFiltro,
  activeSeries,
  setActiveSeries,
  activeAlbum,
  isAlbumOpen,
  albumFotos,
  openAlbum,
  closeAlbum,
} = useGaleriaModule(() => props.modulo)

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox(index: number) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

watch(isAlbumOpen, (open) => {
  if (!open) lightboxOpen.value = false
})

const cardComponent = computed(() =>
  cardVariant.value === 'album' ? GaleriaAlbumCard : GaleriaImagemCard,
)

const contentSpacingClass = computed(() => {
  if (showFiltro.value) return undefined
  if (ctaConfig.value) return 'mt-10'
  return undefined
})

const albumContentSpacingClass = computed(() => 'mt-10')
</script>
