<template>
  <section
    class="banner-module"
    :class="hasImagemOverflow ? 'overflow-visible' : 'overflow-x-clip'"
  >
    <div
      class="flex flex-col gap-6"
      :class="wrapperClass"
      :style="wrapperStyle"
    >
      <template v-for="(group, index) in bannerGroups" :key="index">
        <!-- Banners sm consecutivos: grid ou carrossel -->
        <div v-if="group.type === 'sm-row'" class="w-full">
          <DragCarousel
            v-if="dragCarousel"
            :bleed-right="carouselBleedRight"
            :bleed-left="carouselBleedLeft"
            content-class="gap-4 items-stretch pb-1"
          >
            <div
              v-for="component in group.items"
              :key="component.id"
              :class="BANNER_CAROUSEL_SLIDE_CLASS"
            >
              <Banner :dados="component.data" inline />
            </div>
          </DragCarousel>

          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Banner
              v-for="component in group.items"
              :key="component.id"
              :dados="component.data"
              inline
            />
          </div>
        </div>

        <!-- Banner individual -->
        <Banner
          v-else
          :key="group.items[0].id"
          :dados="group.items[0].data"
        />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import Banner from '~/components/banner/Banner.vue'
import DragCarousel from '~/components/modules/DragCarousel.vue'
import { BANNER_CAROUSEL_SLIDE_CLASS } from '~/types/carousel'
import type { BannerData } from '~/types/banner'
import type { ComponentData, ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'banner'>
}>()

const sortedComponents = useSortedComponents(() => props.modulo)

const dragCarousel = computed(() => props.modulo.metadados?.drag_carousel ?? false)
const fullWidth = computed(() => props.modulo.metadados?.full_width ?? false)
const useSameFaqMargin = computed(() => props.modulo.metadados?.use_same_faq_margin ?? false)
const hasImagemOverflow = computed(() =>
  sortedComponents.value.some(c => c.data.imagem_overflow === true),
)
const carouselBleedRight = computed(
  () => dragCarousel.value && (props.modulo.metadados?.carousel_bleed_right ?? false),
)
const carouselBleedLeft = computed(
  () => dragCarousel.value && (props.modulo.metadados?.carousel_bleed_left ?? false),
)

const marginLateralStyle = useBannerMarginLateral(() => props.modulo)

const hasCustomLateralMargin = computed(
  () => useSameFaqMargin.value || props.modulo.metadados?.margin_lateral != null,
)

const wrapperStyle = computed(() =>
  hasCustomLateralMargin.value ? marginLateralStyle.value : undefined,
)

const wrapperClass = computed(() => {
  if (fullWidth.value) return 'w-full'
  // Mesma base do FAQ: container + padding lateral via style (sem px-4 fixo)
  if (hasCustomLateralMargin.value) {
    return 'container mx-auto'
  }
  return 'container mx-auto px-4'
})

type BannerGroup =
  | { type: 'single', items: ComponentData<BannerData>[] }
  | { type: 'sm-row', items: ComponentData<BannerData>[] }

/** Agrupa banners `sm` consecutivos numa mesma linha */
const bannerGroups = computed((): BannerGroup[] => {
  const groups: BannerGroup[] = []
  let smBuffer: ComponentData<BannerData>[] = []

  const flushSm = () => {
    if (smBuffer.length === 0) return
    groups.push({ type: 'sm-row', items: [...smBuffer] })
    smBuffer = []
  }

  for (const component of sortedComponents.value) {
    if (component.data.size === 'sm') {
      smBuffer.push(component)
    }
    else {
      flushSm()
      groups.push({ type: 'single', items: [component] })
    }
  }

  flushSm()
  return groups
})
</script>
