<template>
  <div
    class="flex h-full w-full items-center overflow-visible"
    :class="wrapperClass"
  >
    <DragCarousel
      v-if="useCarousel"
      class="min-w-0 w-full"
      :bleed-right="bleedRight"
      :bleed-left="bleedLeft"
      content-class="gap-4 items-stretch"
    >
      <div
        v-for="(src, index) in carouselImagens"
        :key="index"
        :class="carouselCardClass"
        :style="borderRadiusStyle"
      >
        <img
          :src="src"
          :alt="imageAlt"
          draggable="false"
          class="pointer-events-none h-full w-full select-none object-cover"
        />
      </div>
    </DragCarousel>

    <div
      v-else
      :class="imageShellClass"
      :style="borderRadiusStyle"
    >
      <BannerImage
        v-if="dados.imagem"
        :src="dados.imagem"
        :alt="imageAlt"
        :fill="false"
        :class="imagemSize !== 'lg' ? 'h-full w-full' : 'w-full'"
        :image-class="imageClass"
        :link="imageLink"
        :style="borderRadiusStyle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BannerImage from '~/components/banner/BannerImage.vue'
import DragCarousel from '~/components/modules/DragCarousel.vue'
import {
  BANNER_TWO_COLUMN_CAROUSEL_CARD_CLASS,
  type BannerData,
  type BannerImagemSize,
} from '~/types/banner'

const props = defineProps<{
  dados: BannerData
  imageAlt: string
  imageLink?: string
  borderRadiusStyle?: Record<string, string>
  bleedRight?: boolean
  bleedLeft?: boolean
}>()

const imagemSize = computed((): BannerImagemSize => props.dados.imagem_size ?? 'lg')

const useCarousel = computed(
  () => (props.dados.drag_carousel ?? false) && carouselImagens.value.length > 0,
)

const carouselImagens = computed(() => props.dados.imagens ?? [])

const wrapperAlignClass = computed(() => {
  if (props.bleedRight) return 'justify-start'
  if (props.bleedLeft) return 'justify-end'
  return 'justify-center'
})

const wrapperClass = computed(() => {
  const padding = props.bleedRight
    ? 'py-6 ps-6 pe-0 md:py-10 md:ps-10 md:pe-0'
    : props.bleedLeft
      ? 'py-6 pe-6 ps-0 md:py-10 md:pe-10 md:ps-0'
      : 'p-6 md:p-10'

  return [padding, wrapperAlignClass.value]
})

const roundedShell = computed(() => (props.borderRadiusStyle ? 'overflow-hidden' : ''))

const imageShellClass = computed(() => {
  switch (imagemSize.value) {
    case 'sm':
      return `h-[220px] w-[300px] shrink-0 overflow-hidden md:h-[260px] md:w-[360px] ${roundedShell.value}`
    case 'md':
      return `h-[320px] w-[420px] shrink-0 overflow-hidden md:h-[380px] md:w-[500px] ${roundedShell.value}`
    default:
      return `w-[400px] shrink-0 md:w-[480px] ${roundedShell.value}`
  }
})

const carouselCardClass = computed(
  () => `${BANNER_TWO_COLUMN_CAROUSEL_CARD_CLASS[imagemSize.value]} ${roundedShell.value}`,
)

const imageClass = computed(() => {
  if (imagemSize.value === 'lg') {
    return 'aspect-square w-full'
  }

  return 'h-full w-full object-cover'
})
</script>
