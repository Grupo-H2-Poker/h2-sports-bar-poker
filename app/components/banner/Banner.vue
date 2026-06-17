<template>
  <!-- Layout duas colunas -->
  <TwoColumnLayout
    v-if="layout === 'two_column'"
    :rounded="rounded"
    :border-radius="borderRadiusPx"
    :reverse="reverseColumns"
    :reverse-on-mobile="reverseColumnsMobile"
    :clip-overflow="!hasCarouselBleed"
    class="bg-black"
    :class="sizeClasses.wrapper"
  >
    <template #start>
      <div
        v-if="ctaColumn === 'left'"
        class="flex flex-col justify-center h-full p-8 md:p-12 lg:p-16 text-white"
      >
        <SectionCTA
          v-if="hasCta"
          :config="ctaConfig"
          inverted
        />
      </div>
      <BannerTwoColumnImageColumn
        v-else
        :dados="dados"
        :image-alt="imageAlt"
        :image-link="imageLink"
        :border-radius-style="borderRadiusStyle"
        :bleed-right="carouselBleedRight"
        :bleed-left="carouselBleedLeft"
      />
    </template>

    <template #end>
      <div
        v-if="ctaColumn === 'right'"
        class="flex flex-col justify-center h-full p-8 md:p-12 lg:p-16 text-white"
      >
        <SectionCTA
          v-if="hasCta"
          :config="ctaConfig"
          inverted
        />
      </div>
      <BannerTwoColumnImageColumn
        v-else
        :dados="dados"
        :image-alt="imageAlt"
        :image-link="imageLink"
        :border-radius-style="borderRadiusStyle"
        :bleed-right="carouselBleedRight"
        :bleed-left="carouselBleedLeft"
      />
    </template>
  </TwoColumnLayout>

  <!-- Layout overlay (imagem + CTA posicionável) -->
  <div
    v-else
    :class="[
      'relative overflow-hidden',
      isStripBanner ? 'bg-black' : 'bg-muted',
      sizeClasses.wrapper,
      !isStripBanner && rounded && 'rounded-2xl',
      isClickable && 'cursor-pointer',
    ]"
    :style="borderRadiusStyle"
    @click="handleImageClick"
  >
    <img
      v-if="dados.imagem"
      :src="dados.imagem"
      :alt="imageAlt"
      draggable="false"
      :class="[
        isStripBanner
          ? 'block w-full h-auto'
          : 'absolute inset-0 w-full h-full object-cover pointer-events-none',
      ]"
    />

    <div
      v-if="hasCta && overlayGradient"
      class="absolute inset-0 pointer-events-none"
      :class="overlayGradient"
    />

    <div
      v-if="hasCta"
      class="absolute inset-0 flex p-6 md:p-10 lg:p-12 text-white pointer-events-none"
      :class="ctaPositionClasses"
    >
      <div
        class="w-fit max-w-xl pointer-events-auto"
        @click.stop
      >
        <SectionCTA
          :config="ctaConfig"
          inverted
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TwoColumnLayout from '~/components/layout/TwoColumnLayout.vue'
import SectionCTA from '~/components/modules/SectionCTA.vue'
import BannerTwoColumnImageColumn from '~/components/banner/BannerTwoColumnImageColumn.vue'
import type { BannerData } from '~/types/banner'

const props = defineProps<{
  dados: BannerData
  /** Dentro de grid/carrossel — preenche a célula sem max-width próprio */
  inline?: boolean
}>()

const {
  layout,
  ctaColumn,
  reverseColumns,
  reverseColumnsMobile,
  sizeClasses,
  rounded,
  borderRadiusPx,
  borderRadiusStyle,
  ctaPositionClasses,
  overlayGradient,
  height,
} = useBannerLayout(() => props.dados, () => ({ inline: props.inline }))

const isStripBanner = computed(() => height.value === 'strip')

const { ctaConfig, hasCta } = useBannerCta(() => props.dados)

const imageAlt = computed(
  () => props.dados.section_cta?.titulo ?? props.dados.titulo ?? 'Banner',
)

const imageLink = computed(() => {
  if (hasCta.value) return undefined
  return props.dados.link
})

const isClickable = computed(() => !hasCta.value && !!props.dados.link)

const carouselBleedRight = computed(() => {
  if (!props.dados.drag_carousel) return false
  return props.dados.carousel_bleed_right ?? !reverseColumns.value
})

const carouselBleedLeft = computed(() => {
  if (!props.dados.drag_carousel) return false
  return props.dados.carousel_bleed_left ?? reverseColumns.value
})

const hasCarouselBleed = computed(
  () => carouselBleedRight.value || carouselBleedLeft.value,
)

const route = useRoute()

function handleImageClick() {
  if (!isClickable.value || !props.dados.link) return
  const unidadeSlug = route.params.unidade as string | undefined
  if (unidadeSlug) {
    navigateTo(resolveUnidadeHref(unidadeSlug, props.dados.link))
    return
  }
  navigateTo(props.dados.link)
}
</script>
