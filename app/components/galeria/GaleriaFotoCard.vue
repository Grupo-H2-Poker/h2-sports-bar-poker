<template>
  <div
    class="relative w-full h-full min-h-[400px] overflow-hidden rounded-3xl bg-muted group cursor-pointer"
    role="button"
    tabindex="0"
    :aria-label="dados.titulo ? `Ampliar ${dados.titulo}` : 'Ampliar foto'"
    @click="emit('select')"
    @keydown.enter.prevent="emit('select')"
    @keydown.space.prevent="emit('select')"
  >
    <img
      v-if="dados.imagem"
      :src="dados.imagem"
      :alt="dados.titulo || ''"
      class="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
    >
  </div>
</template>

<script setup lang="ts">
import type { GaleriaFotoData } from '~/types/modules'

defineProps<{
  dados: GaleriaFotoData
}>()

const emit = defineEmits<{
  select: []
}>()
</script>
