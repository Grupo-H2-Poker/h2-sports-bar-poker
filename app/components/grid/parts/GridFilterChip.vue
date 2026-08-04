<template>
  <Button
    type="button"
    variant="plain"
    class="inline-flex h-auto min-h-8 min-w-0 max-w-full shrink items-center justify-center overflow-hidden rounded-full px-4 py-1.5 text-center text-sm !whitespace-normal outline-smooth-muted"
    :class="[
      fullWidth ? 'w-full' : '',
      selected
        ? 'bg-[#e7e7e7] text-black hover:bg-[#e7e7e7] hover:text-black'
        : 'bg-transparent text-[#e7e7e7] hover:bg-[#e7e7e7]/10 hover:text-[#e7e7e7]',
    ]"
    @click="emit('click')"
  >
    <span class="min-w-0 max-w-full break-words">
      {{ label }}
    </span>
  </Button>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'

defineProps<{
  label: string
  selected?: boolean
  fullWidth?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>
