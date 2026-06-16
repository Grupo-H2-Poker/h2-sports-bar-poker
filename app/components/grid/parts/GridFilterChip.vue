<template>
  <Button
    type="button"
    variant="ghost"
    class="inline-flex h-8 items-center justify-center rounded-full border px-4 text-sm"
    :class="[
      fullWidth ? 'w-full' : '',
      selected
        ? 'border-[#e7e7e7] bg-[#e7e7e7] text-black hover:bg-[#e7e7e7]'
        : 'border-[#e7e7e7] bg-transparent text-[#e7e7e7] hover:bg-[#e7e7e7]/10',
    ]"
    @click="emit('click')"
  >
    {{ label }}
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
