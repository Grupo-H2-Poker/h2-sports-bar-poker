<template>
  <button
    type="button"
    class="inline-flex h-8 items-center justify-center rounded-full border px-4 text-sm transition-colors"
    :class="selected
      ? 'border-[#e7e7e7] bg-[#e7e7e7] text-black'
      : 'border-[#e7e7e7] bg-transparent text-[#e7e7e7] hover:bg-[#e7e7e7]/10'"
    @click="emit('click')"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  selected?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>
