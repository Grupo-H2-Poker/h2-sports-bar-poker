<script setup lang="ts">
/**
 * Scrollbar custom overlay (fina, cinza).
 * A nativa fica escondida via CSS em main.css.
 */
const TRACK_PAD = 8
const THUMB_HEIGHT = 110

const visible = ref(false)
const thumbTop = ref(0)
const isDragging = ref(false)
const isInteracting = ref(false)

const thumbRef = ref<HTMLElement | null>(null)

let dragStartY = 0
let dragStartScroll = 0
let hideTimer: ReturnType<typeof setTimeout> | null = null
let rafId = 0

function metrics() {
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = window.innerHeight
  const scrollTop = window.scrollY
  const trackHeight = Math.max(0, clientHeight - TRACK_PAD * 2)
  const maxScroll = Math.max(0, scrollHeight - clientHeight)
  return { scrollHeight, clientHeight, scrollTop, trackHeight, maxScroll }
}

function update() {
  const { scrollHeight, clientHeight, scrollTop, trackHeight, maxScroll } = metrics()
  const overflow = scrollHeight > clientHeight + 1
  visible.value = overflow
  if (!overflow) return

  const maxThumbTop = Math.max(0, trackHeight - THUMB_HEIGHT)
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
  dragStartScroll = window.scrollY
  thumbRef.value?.setPointerCapture(e.pointerId)
}

function onThumbPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  const { trackHeight, maxScroll } = metrics()
  const maxThumbTop = Math.max(0, trackHeight - THUMB_HEIGHT)
  if (maxThumbTop <= 0 || maxScroll <= 0) return
  const deltaY = e.clientY - dragStartY
  window.scrollTo({ top: dragStartScroll + (deltaY / maxThumbTop) * maxScroll })
}

function onThumbPointerUp(e: PointerEvent) {
  if (!isDragging.value) return
  isDragging.value = false
  thumbRef.value?.releasePointerCapture(e.pointerId)
  pulseInteraction()
}

function onTrackPointerDown(e: PointerEvent) {
  if (e.target === thumbRef.value || thumbRef.value?.contains(e.target as Node)) return
  const { trackHeight, maxScroll } = metrics()
  const maxThumbTop = Math.max(0, trackHeight - THUMB_HEIGHT)
  if (maxThumbTop <= 0 || maxScroll <= 0) return

  const y = e.clientY - TRACK_PAD - THUMB_HEIGHT / 2
  const ratio = Math.min(1, Math.max(0, y / maxThumbTop))
  window.scrollTo({ top: ratio * maxScroll, behavior: 'smooth' })
  pulseInteraction()
}

const route = useRoute()

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', scheduleUpdate)

  resizeObserver = new ResizeObserver(scheduleUpdate)
  resizeObserver.observe(document.documentElement)
  if (document.body) resizeObserver.observe(document.body)
})

watch(
  () => route.fullPath,
  () => nextTick(scheduleUpdate),
)

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', scheduleUpdate)
  resizeObserver?.disconnect()
  cancelAnimationFrame(rafId)
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<template>
  <ClientOnly>
    <div
      v-show="visible"
      class="custom-scrollbar"
      :class="{ 'is-active': isInteracting || isDragging }"
      :style="{ paddingBlock: `${TRACK_PAD}px` }"
      aria-hidden="true"
      @pointerdown="onTrackPointerDown"
    >
      <div
        ref="thumbRef"
        class="custom-scrollbar__thumb"
        :style="{
          height: `${THUMB_HEIGHT}px`,
          transform: `translateY(${thumbTop}px)`,
        }"
        @pointerdown="onThumbPointerDown"
        @pointermove="onThumbPointerMove"
        @pointerup="onThumbPointerUp"
        @pointercancel="onThumbPointerUp"
      />
    </div>
  </ClientOnly>
</template>

<style scoped>
.custom-scrollbar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2147483000;
  width: 10px;
  display: flex;
  justify-content: center;
  pointer-events: auto;
  opacity: 0.4;
  transition: opacity 0.2s ease;
}

.custom-scrollbar.is-active,
.custom-scrollbar:hover {
  opacity: 1;
}

.custom-scrollbar__thumb {
  width: 6px;
  border-radius: 9999px;
  background: oklch(0.35 0 0);
  cursor: grab;
  touch-action: none;
  will-change: transform;
  transition: background-color 0.15s ease;
}

.custom-scrollbar.is-active .custom-scrollbar__thumb,
.custom-scrollbar:hover .custom-scrollbar__thumb {
  background: oklch(0.45 0 0);
}

.custom-scrollbar__thumb:active {
  cursor: grabbing;
  background: oklch(0.55 0 0);
}
</style>
