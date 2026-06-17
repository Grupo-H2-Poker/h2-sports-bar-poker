<template>
  <!-- Layout duas colunas -->
  <TwoColumnLayout
    v-if="layout === 'two_column'"
    :rounded="rounded"
    :reverse="reverseColumns"
    :reverse-on-mobile="reverseColumnsMobile"
    class="bg-black"
    :class="[sizeClasses.wrapper, rounded && 'rounded-2xl overflow-hidden']"
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
      <div
        v-else
        :class="twoColumnImageWrapperClass"
      >
        <div :class="twoColumnImageShellClass">
          <BannerImage
            :src="dados.imagem"
            :alt="imageAlt"
            :fill="false"
            :image-class="twoColumnImageClass"
            :link="imageLink"
          />
        </div>
      </div>
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
      <div
        v-else
        :class="twoColumnImageWrapperClass"
      >
        <div :class="twoColumnImageShellClass">
          <BannerImage
            :src="dados.imagem"
            :alt="imageAlt"
            :fill="false"
            :image-class="twoColumnImageClass"
            :link="imageLink"
          />
        </div>
      </div>
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
import BannerImage from '~/components/banner/BannerImage.vue'
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

const imagemSize = computed(() => props.dados.imagem_size ?? 'lg')

const twoColumnImageWrapperClass = 'flex h-full w-full items-center justify-center p-6 md:p-10'

const twoColumnImageShellClass = computed(() => {
  switch (imagemSize.value) {
    case 'sm':
      return 'w-[220px] md:w-[260px] shrink-0'
    case 'md':
      return 'w-[320px] md:w-[380px] shrink-0'
    default:
      return 'w-[400px] md:w-[480px] shrink-0'
  }
})

const twoColumnImageClass = 'aspect-square w-full'

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
