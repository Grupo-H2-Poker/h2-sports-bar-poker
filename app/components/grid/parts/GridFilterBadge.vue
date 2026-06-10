<template>
  <div class="inline-flex h-8 items-center gap-2 rounded-full bg-[#373737] border border-[#373737] pl-4 pr-2 text-sm text-[#e7e7e7]">
    <span class="whitespace-nowrap">{{ label }}</span>

    <button
      type="button"
      class="inline-flex size-5 shrink-0 items-center justify-center text-[#e7e7e7] transition-opacity hover:opacity-70"
      :aria-label="`Remover filtro ${label}`"
      @click="emit('remove')"
    >
      <CircleX class="size-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { CircleX } from 'lucide-vue-next'

defineProps<{
  label: string
}>()

const emit = defineEmits<{
  remove: []
}>()
</script>
