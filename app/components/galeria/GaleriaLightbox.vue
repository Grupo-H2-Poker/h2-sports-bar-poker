<template>
  <Dialog :open="open" @update:open="onOpenChange">
    <DialogContent
      class="fixed inset-0 top-0 left-0 z-50 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 bg-black/95 p-0 shadow-none data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 sm:max-w-none [&>button]:hidden"
    >
      <DialogTitle class="sr-only">
        {{ title || 'Visualizar foto' }}
      </DialogTitle>
      <DialogDescription class="sr-only">
        Use as setas ou os botões para navegar entre as fotos. Pressione Escape para fechar.
      </DialogDescription>

      <div class="relative flex h-full w-full flex-col">
        <div class="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-4 py-4 md:px-6">
          <p
            class="font-[family-name:var(--font-red-hat-display)] text-sm font-medium text-[#c4c4c4]"
            aria-live="polite"
          >
            {{ currentLabel }}
          </p>

          <button
            type="button"
            class="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Fechar"
            @click="close"
          >
            <X class="size-5" />
          </button>
        </div>

        <Carousel
          v-if="open && fotos.length"
          :key="carouselKey"
          class="flex h-full w-full flex-1 items-center"
          :opts="{
            loop: fotos.length > 1,
            startIndex: safeInitialIndex,
            align: 'center',
          }"
          @init-api="onInitApi"
        >
          <CarouselContent class="h-full !ml-0">
            <CarouselItem
              v-for="(foto, index) in fotos"
              :key="`${foto.imagem}-${index}`"
              class="basis-full !pl-0"
            >
              <div class="flex h-dvh w-full items-center justify-center px-4 pb-16 pt-20 md:px-16">
                <img
                  :src="foto.imagem"
                  :alt="foto.titulo || title || `Foto ${index + 1}`"
                  class="max-h-full max-w-full object-contain select-none"
                  draggable="false"
                >
              </div>
            </CarouselItem>
          </CarouselContent>

          <template v-if="fotos.length > 1">
            <CarouselPrevious
              class="left-3 size-11 border-0 bg-white/10 text-white hover:bg-white/20 hover:text-white disabled:opacity-30 md:left-6"
            />
            <CarouselNext
              class="right-3 size-11 border-0 bg-white/10 text-white hover:bg-white/20 hover:text-white disabled:opacity-30 md:right-6"
            />
          </template>
        </Carousel>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import type { CarouselApi } from '~/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '~/components/ui/dialog'
import type { GaleriaFotoData } from '~/types/modules'

const props = defineProps<{
  open: boolean
  fotos: ReadonlyArray<GaleriaFotoData>
  initialIndex?: number
  title?: string
}>()

const emit = defineEmits<{
  'update:open': [open: boolean]
}>()

const currentIndex = ref(0)
const api = shallowRef<CarouselApi>()

const safeInitialIndex = computed(() => {
  const max = Math.max(props.fotos.length - 1, 0)
  const index = props.initialIndex ?? 0
  return Math.min(Math.max(index, 0), max)
})

const carouselKey = computed(
  () => `${props.open ? 'open' : 'closed'}-${safeInitialIndex.value}-${props.fotos.length}`,
)

const currentLabel = computed(() => {
  if (!props.fotos.length) return ''
  return `${currentIndex.value + 1} / ${props.fotos.length}`
})

function onOpenChange(next: boolean) {
  emit('update:open', next)
}

function close() {
  emit('update:open', false)
}

function syncIndex(carousel: CarouselApi) {
  currentIndex.value = carousel.selectedScrollSnap()
}

function onInitApi(carousel: CarouselApi) {
  api.value = carousel
  syncIndex(carousel)
  carousel.on('select', syncIndex)
}

function onKeyDown(event: KeyboardEvent) {
  if (!props.open) return
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    api.value?.scrollPrev()
    return
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    api.value?.scrollNext()
  }
}

watch(
  () => props.open,
  (open) => {
    if (open) {
      currentIndex.value = safeInitialIndex.value
      window.addEventListener('keydown', onKeyDown)
      return
    }
    window.removeEventListener('keydown', onKeyDown)
  },
)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>
