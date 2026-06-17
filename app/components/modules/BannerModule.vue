<template>
  <section
    class="banner-module overflow-x-clip"
  >
    <div
      class="flex flex-col gap-6"
      :class="fullWidth ? 'w-full' : 'container mx-auto px-4'"
    >
      <template v-for="(group, index) in bannerGroups" :key="index">
        <!-- Banners sm consecutivos: grid ou carrossel -->
        <div v-if="group.type === 'sm-row'" class="w-full">
          <DragCarousel
            v-if="dragCarousel"
            :bleed-right="carouselBleedRight"
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
const carouselBleedRight = computed(
  () => dragCarousel.value && (props.modulo.metadados?.carousel_bleed_right ?? false),
)

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
