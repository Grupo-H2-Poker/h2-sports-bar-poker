<template>
  <div
    ref="sizingRef"
    class="min-w-0"
    :style="trackStyle"
  >
    <div
      ref="carousel"
      class="w-full overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing select-none touch-pan-x [&_img]:pointer-events-none [&_img]:select-none [&_img]:[-webkit-user-drag:none]"
      :style="carouselStyle"
      @mousedown="startDrag"
      @dragstart.prevent
      @click.capture="preventClick"
    >
      <div class="flex flex-nowrap w-fit" :class="contentClass">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResizeObserver, useWindowSize } from '@vueuse/core'

interface Props {
  contentClass?: string
  bleedRight?: boolean
  bleedLeft?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  contentClass: '',
  bleedRight: false,
  bleedLeft: false,
})

const sizingRef = ref<HTMLElement | null>(null)
const carousel = ref<HTMLElement | null>(null)
const carouselWidth = ref(0)
const bleedRightPx = ref(0)
const bleedLeftPx = ref(0)

/** Espaço extra após o último card ao scrollar até o fim */
const SCROLL_END_GAP_PX = 16

const trackStyle = computed(() =>
  carouselWidth.value > 0
    ? { '--carousel-width': `${carouselWidth.value}px` }
    : undefined,
)

const carouselStyle = computed(() => {
  if (props.bleedRight && bleedRightPx.value > 0) {
    const bleed = bleedRightPx.value
    return {
      width: `calc(100% + ${bleed}px)`,
      marginRight: `-${bleed}px`,
      paddingRight: `${bleed + SCROLL_END_GAP_PX}px`,
    }
  }

  if (props.bleedLeft && bleedLeftPx.value > 0) {
    const bleed = bleedLeftPx.value
    return {
      width: `calc(100% + ${bleed}px)`,
      marginLeft: `-${bleed}px`,
      paddingLeft: `${bleed + SCROLL_END_GAP_PX}px`,
    }
  }

  return undefined
})

function updateLayout() {
  if (!sizingRef.value) return

  carouselWidth.value = sizingRef.value.clientWidth

  if (import.meta.server) {
    bleedRightPx.value = 0
    bleedLeftPx.value = 0
    return
  }

  const rect = sizingRef.value.getBoundingClientRect()
  bleedRightPx.value = props.bleedRight
    ? Math.max(0, window.innerWidth - rect.right)
    : 0
  bleedLeftPx.value = props.bleedLeft
    ? Math.max(0, rect.left)
    : 0
}

useResizeObserver(sizingRef, updateLayout)

const { width: windowWidth } = useWindowSize()
watch(() => [props.bleedRight, props.bleedLeft], updateLayout)
watch(windowWidth, updateLayout)

onMounted(() => {
  nextTick(updateLayout)
})

const isDragging = ref(false)
const hasDragged = ref(false)

const startX = ref(0)
const scrollLeft = ref(0)

function onDrag(e: MouseEvent) {
  if (!isDragging.value || !carousel.value) return

  e.preventDefault()

  const rect = carousel.value.getBoundingClientRect()
  const x = e.pageX - rect.left
  const walk = x - startX.value

  if (Math.abs(walk) > 5) {
    hasDragged.value = true
  }

  carousel.value.scrollLeft = scrollLeft.value - walk
}

function stopDrag() {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)

  setTimeout(() => {
    hasDragged.value = false
  }, 50)
}

function startDrag(e: MouseEvent) {
  if (e.button !== 0 || !carousel.value) return

  e.preventDefault()

  isDragging.value = true
  hasDragged.value = false

  const rect = carousel.value.getBoundingClientRect()
  startX.value = e.pageX - rect.left
  scrollLeft.value = carousel.value.scrollLeft

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function preventClick(e: MouseEvent) {
  if (hasDragged.value) {
    e.preventDefault()
    e.stopPropagation()
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})
</script>
