<template>
    <div
        ref="carousel"
        class="overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing select-none"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
        @click.capture="preventClick"
      >
      
      <div class="flex" :class="contentClass">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Props {
    contentClass?: string
  }
  
  withDefaults(defineProps<Props>(), {
    contentClass: ''
  })
  
  const carousel = ref<HTMLElement | null>(null)
  
  const isDragging = ref(false)
  const hasDragged = ref(false)
  
  const startX = ref(0)
  const scrollLeft = ref(0)
  
  const startDrag = (e: any) => {
    if (!carousel.value) return
  
    isDragging.value = true
    hasDragged.value = false
  
    startX.value = e.pageX - carousel.value.offsetLeft
    scrollLeft.value = carousel.value.scrollLeft
  }
  
  const onDrag = (e: any) => {
    if (!isDragging.value || !carousel.value) return
  
    e.preventDefault()
  
    const x = e.pageX - carousel.value.offsetLeft
    const walk = x - startX.value
  
    if (Math.abs(walk) > 5) {
      hasDragged.value = true
    }
  
    carousel.value.scrollLeft = scrollLeft.value - walk
  }
  
  const stopDrag = () => {
    isDragging.value = false
  
    setTimeout(() => {
      hasDragged.value = false
    }, 50)
  }
  
  const preventClick = (e: any) => {
    if (hasDragged.value) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
  </script>