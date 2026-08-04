<script setup lang="ts">
/**
 * Scrollbar overlay (mesma cara do CustomScrollbar da página)
 * para containers com overflow — ex.: drawer de filtros.
 */
const TRACK_PAD = 8
const THUMB_MIN = 48
const THUMB_MAX = 110

const props = withDefaults(defineProps<{
  /** Espaço à direita do conteúdo (afasta badges do thumb). */
  contentPaddingRight?: number
}>(), {
  contentPaddingRight: 16,
})

const scrollerRef = ref<HTMLElement | null>(null)
const thumbRef = ref<HTMLElement | null>(null)

const visible = ref(false)
const thumbTop = ref(0)
const thumbHeight = ref(THUMB_MAX)
const isDragging = ref(false)
const isInteracting = ref(false)

let dragStartY = 0
let dragStartScroll = 0
let hideTimer: ReturnType<typeof setTimeout> | null = null
let rafId = 0
let resizeObserver: ResizeObserver | null = null

function metrics() {
  const el = scrollerRef.value
  if (!el) {
    return { scrollHeight: 0, clientHeight: 0, scrollTop: 0, trackHeight: 0, maxScroll: 0 }
  }
  const scrollHeight = el.scrollHeight
  const clientHeight = el.clientHeight
  const scrollTop = el.scrollTop
  const trackHeight = Math.max(0, clientHeight - TRACK_PAD * 2)
  const maxScroll = Math.max(0, scrollHeight - clientHeight)
  return { scrollHeight, clientHeight, scrollTop, trackHeight, maxScroll }
}

function update() {
  const { scrollHeight, clientHeight, scrollTop, trackHeight, maxScroll } = metrics()
  const overflow = scrollHeight > clientHeight + 1
  visible.value = overflow
  if (!overflow) return

  const ratio = clientHeight / scrollHeight
  const nextThumb = Math.min(THUMB_MAX, Math.max(THUMB_MIN, Math.round(trackHeight * ratio)))
  thumbHeight.value = nextThumb

  const maxThumbTop = Math.max(0, trackHeight - nextThumb)
  thumbTop.value = maxScroll > 0 ? (scrollTop / maxScroll) * maxThumbTop : 0
}

function scheduleUpdate() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(update)
}

function pulseInteraction() {
  isInteracting.value = true
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    if (!isDragging.value) isInteracting.value = false
  }, 900)
}

function onScroll() {
  scheduleUpdate()
  pulseInteraction()
}

function onThumbPointerDown(e: PointerEvent) {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = true
  isInteracting.value = true
  dragStartY = e.clientY
  dragStartScroll = scrollerRef.value?.scrollTop ?? 0
  thumbRef.value?.setPointerCapture(e.pointerId)
}

function onThumbPointerMove(e: PointerEvent) {
  if (!isDragging.value || !scrollerRef.value) return
  const { trackHeight, maxScroll } = metrics()
  const maxThumbTop = Math.max(0, trackHeight - thumbHeight.value)
  if (maxThumbTop <= 0 || maxScroll <= 0) return
  const deltaY = e.clientY - dragStartY
  scrollerRef.value.scrollTop = dragStartScroll + (deltaY / maxThumbTop) * maxScroll
}

function onThumbPointerUp(e: PointerEvent) {
  if (!isDragging.value) return
  isDragging.value = false
  thumbRef.value?.releasePointerCapture(e.pointerId)
  pulseInteraction()
}

function onTrackPointerDown(e: PointerEvent) {
  if (!scrollerRef.value) return
  if (e.target === thumbRef.value || thumbRef.value?.contains(e.target as Node)) return
  const { trackHeight, maxScroll } = metrics()
  const maxThumbTop = Math.max(0, trackHeight - thumbHeight.value)
  if (maxThumbTop <= 0 || maxScroll <= 0) return

  const trackRect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const y = e.clientY - trackRect.top - TRACK_PAD - thumbHeight.value / 2
  const ratio = Math.min(1, Math.max(0, y / maxThumbTop))
  scrollerRef.value.scrollTo({ top: ratio * maxScroll, behavior: 'smooth' })
  pulseInteraction()
}

onMounted(() => {
  update()
  const scroller = scrollerRef.value
  if (!scroller) return
  scroller.addEventListener('scroll', onScroll, { passive: true })
  resizeObserver = new ResizeObserver(scheduleUpdate)
  resizeObserver.observe(scroller)
  if (scroller.firstElementChild) resizeObserver.observe(scroller.firstElementChild)
})

onBeforeUnmount(() => {
  scrollerRef.value?.removeEventListener('scroll', onScroll)
  resizeObserver?.disconnect()
  cancelAnimationFrame(rafId)
  if (hideTimer) clearTimeout(hideTimer)
})

defineExpose({ update: scheduleUpdate })
</script>

<template>
  <div class="container-scrollbar relative min-h-0 flex-1">
    <div
      ref="scrollerRef"
      class="container-scrollbar__scroller h-full min-w-0 overflow-x-hidden overflow-y-auto"
      :style="{ paddingRight: `${contentPaddingRight}px` }"
    >
      <slot />
    </div>

    <div
      v-show="visible"
      class="container-scrollbar__track"
      :class="{ 'is-active': isInteracting || isDragging }"
      :style="{ paddingBlock: `${TRACK_PAD}px` }"
      aria-hidden="true"
      @pointerdown="onTrackPointerDown"
    >
      <div
        ref="thumbRef"
        class="container-scrollbar__thumb"
        :style="{
          height: `${thumbHeight}px`,
          transform: `translateY(${thumbTop}px)`,
        }"
        @pointerdown="onThumbPointerDown"
        @pointermove="onThumbPointerMove"
        @pointerup="onThumbPointerUp"
        @pointercancel="onThumbPointerUp"
      />
    </div>
  </div>
</template>

<style scoped>
.container-scrollbar__scroller {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.container-scrollbar__scroller::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.container-scrollbar__track {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 10px;
  display: flex;
  justify-content: center;
  pointer-events: auto;
  opacity: 0.4;
  transition: opacity 0.2s ease;
}

.container-scrollbar__track.is-active,
.container-scrollbar__track:hover {
  opacity: 1;
}

.container-scrollbar__thumb {
  width: 6px;
  border-radius: 9999px;
  background: oklch(0.35 0 0);
  cursor: grab;
  touch-action: none;
  will-change: transform;
  transition: background-color 0.15s ease;
}

.container-scrollbar__track.is-active .container-scrollbar__thumb,
.container-scrollbar__track:hover .container-scrollbar__thumb {
  background: oklch(0.45 0 0);
}

.container-scrollbar__thumb:active {
  cursor: grabbing;
  background: oklch(0.55 0 0);
}
</style>
