<template>
  <!-- Layout duas colunas -->
  <TwoColumnLayout
    v-if="layout === 'two_column'"
    :rounded="rounded"
    :border-radius="borderRadiusPx"
    :reverse="reverseColumns"
    :reverse-on-mobile="reverseColumnsMobile"
    :clip-overflow="!hasCarouselBleed && !hasDecoracao"
    class="bg-black"
    :class="sizeClasses.wrapper"
  >
    <template #start>
      <div
        v-if="ctaColumn === 'left'"
        class="flex h-full flex-col justify-center text-white"
        :class="ctaColumnPaddingClass"
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
        class="flex h-full flex-col justify-center text-white"
        :class="ctaColumnPaddingClass"
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

  <!-- Layout panel: fundo colorido + título acima + mídia (Figma Eventos) -->
  <div
    v-else-if="layout === 'panel'"
    class="w-full overflow-hidden px-6 pb-10 pt-8 md:px-[8%] md:pb-14 md:pt-10"
    :style="panelStyle"
  >
    <div
      v-if="hasCta"
      class="mb-8 flex justify-center text-center md:mb-10"
    >
      <SectionCTA
        :config="ctaConfig"
        inverted
      />
    </div>

    <div
      :class="[
        'relative mx-auto w-full max-w-[907px] overflow-hidden bg-black',
        hasVideoEmbed ? 'aspect-video' : 'aspect-[907/513]',
        isClickable && 'cursor-pointer',
      ]"
      :style="mediaRadiusStyle"
      @click="handleImageClick"
    >
      <iframe
        v-if="isPlaying && embedSrc"
        class="absolute inset-0 h-full w-full border-0"
        :src="embedSrc"
        :title="imageAlt"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />

      <template v-else>
        <img
          v-if="dados.imagem"
          :src="dados.imagem"
          :alt="imageAlt"
          draggable="false"
          class="pointer-events-none absolute inset-0 size-full object-cover"
        >
        <div
          v-if="dados.play_overlay"
          class="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40"
          aria-hidden="true"
        >
          <Play class="size-14 fill-white text-white drop-shadow-lg" />
        </div>
      </template>
    </div>
  </div>

  <!-- Layout overlay (imagem + CTA posicionável) / vídeo embed -->
  <div
    v-else
    :class="[
      'relative overflow-hidden',
      hasVideoEmbed
        ? [sizeClasses.widthOnly, 'aspect-video bg-black']
        : [
            (isStripBanner || isContainFit) ? 'bg-black' : 'bg-muted',
            isContainFit ? sizeClasses.widthOnly : sizeClasses.wrapper,
          ],
      !isStripBanner && rounded && 'rounded-2xl',
      isClickable && 'cursor-pointer',
    ]"
    :style="borderRadiusStyle"
    @click="handleImageClick"
  >
    <iframe
      v-if="isPlaying && embedSrc"
      class="absolute inset-0 h-full w-full border-0"
      :src="embedSrc"
      :title="imageAlt"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />

    <template v-else>
      <img
        v-if="dados.imagem"
        :src="dados.imagem"
        :alt="imageAlt"
        draggable="false"
        :class="[
          isStripBanner || isContainFit
            ? 'block w-full h-auto'
            : 'absolute inset-0 w-full h-full object-cover pointer-events-none',
        ]"
      >

      <div
        v-if="hasCta && overlayGradient"
        class="pointer-events-none absolute inset-0"
        :class="overlayGradient"
      />

      <div
        v-if="dados.play_overlay"
        class="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/60"
        aria-hidden="true"
      >
        <Play class="size-14 fill-white text-white" />
      </div>

      <div
        v-if="hasCta"
        class="pointer-events-none absolute inset-0 flex p-6 text-white md:p-10 lg:p-12"
        :class="ctaPositionClasses"
      >
        <div
          class="pointer-events-auto w-fit max-w-xl"
          @click.stop
        >
          <SectionCTA
            :config="ctaConfig"
            inverted
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Play } from 'lucide-vue-next'
import TwoColumnLayout from '~/components/layout/TwoColumnLayout.vue'
import SectionCTA from '~/components/modules/SectionCTA.vue'
import BannerTwoColumnImageColumn from '~/components/banner/BannerTwoColumnImageColumn.vue'
import type { BannerData } from '~/types/banner'
import { resolveBannerBorderRadius } from '~/types/banner'

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
const isContainFit = computed(() => props.dados.object_fit === 'contain')

const { ctaConfig, hasCta } = useBannerCta(() => props.dados)

const ctaColumnPaddingClass = computed(() => {
  if (props.dados.cta_padding !== 'flush') {
    return 'p-8 md:p-12 lg:p-16'
  }

  return ctaColumn.value === 'right'
    ? 'py-8 pr-0 pl-8 md:py-12 md:pl-12 lg:py-16 lg:pl-16'
    : 'py-8 pl-0 pr-8 md:py-12 md:pr-12 lg:py-16 lg:pr-16'
})

const imageAlt = computed(
  () => props.dados.section_cta?.titulo ?? props.dados.titulo ?? 'Banner',
)

const videoEmbed = computed(() => props.dados.video_embed?.trim() || undefined)
const hasVideoEmbed = computed(() => !!videoEmbed.value)

const isPlaying = ref(false)

const embedSrc = computed(() => {
  if (!videoEmbed.value || !isPlaying.value) return undefined
  const url = new URL(videoEmbed.value)
  if (!url.searchParams.has('autoplay')) url.searchParams.set('autoplay', '1')
  return url.toString()
})

const imageLink = computed(() => {
  if (hasCta.value || hasVideoEmbed.value) return undefined
  return props.dados.link
})

const isClickable = computed(
  () => (!hasCta.value && !!props.dados.link) || (hasVideoEmbed.value && !isPlaying.value),
)

const panelStyle = computed(() => ({
  background: props.dados.panel_background ?? '#77158e',
  borderRadius: resolveBannerBorderRadius(props.dados.border_radius) ?? '8px',
}))

const mediaRadiusStyle = computed(() => {
  const value = resolveBannerBorderRadius(props.dados.border_radius)
  return value ? { borderRadius: value } : undefined
})

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

const hasDecoracao = computed(() => !!props.dados.decoracao?.imagem)

const route = useRoute()

function handleImageClick() {
  if (hasVideoEmbed.value && !isPlaying.value) {
    isPlaying.value = true
    return
  }
  if (!isClickable.value || !props.dados.link) return
  const link = props.dados.link
  if (/^https?:\/\//i.test(link)) {
    navigateTo(link, { external: true })
    return
  }
  const unidadeSlug = route.params.unidade as string | undefined
  if (unidadeSlug) {
    navigateTo(resolveUnidadeHref(unidadeSlug, link))
    return
  }
  navigateTo(link)
}
</script>
