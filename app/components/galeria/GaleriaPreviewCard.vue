<template>
  <div class="relative aspect-[364/250] w-full overflow-hidden rounded-2xl bg-muted">
    <img
      v-if="dados.imagem"
      :src="dados.imagem"
      :alt="dados.titulo || ''"
      class="absolute inset-0 size-full object-cover"
      draggable="false"
    >
  </div>
</template>

<script setup lang="ts">
import type { GaleriaImagemData } from '~/types/modules'

defineProps<{
  dados: GaleriaImagemData
}>()
</script>
