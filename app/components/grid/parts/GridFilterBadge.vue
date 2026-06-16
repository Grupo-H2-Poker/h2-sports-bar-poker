<template>
  <div class="inline-flex h-8 items-center gap-2 rounded-full bg-[#373737] border border-[#373737] pl-4 pr-2 text-sm text-[#e7e7e7]">
    <span class="whitespace-nowrap">{{ label }}</span>

    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      class="size-5 shrink-0 text-[#e7e7e7] hover:bg-transparent hover:opacity-70"
      :aria-label="`Remover filtro ${label}`"
      @click="emit('remove')"
    >
      <CircleX class="size-5" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { CircleX } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

defineProps<{
  label: string
}>()

const emit = defineEmits<{
  remove: []
}>()
</script>
