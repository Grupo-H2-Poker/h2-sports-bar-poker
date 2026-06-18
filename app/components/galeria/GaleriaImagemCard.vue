<template>
  <div
    class="relative aspect-[3/4] h-full overflow-hidden rounded-xl bg-muted cursor-pointer group"
    @click="dados.link && navigateTo(dados.link)"
  >
    <img
      v-if="dados.imagem"
      :src="dados.imagem"
      :alt="dados.titulo || ''"
      class="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
    >

    <div
      class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
      aria-hidden="true"
    />

    <div
      v-if="dados.titulo || dados.descricao"
      class="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 pt-5 font-[family-name:var(--font-red-hat-display)]"
    >
      <div class="flex h-32 flex-col">
        <h3
          v-if="dados.titulo"
          class="h-9 shrink-0 text-[28px] font-bold leading-9 text-white line-clamp-1"
        >
          {{ dados.titulo }}
        </h3>
        <div v-else class="h-9 shrink-0" aria-hidden="true" />

        <p
          v-if="dados.descricao"
          class="mt-2 h-[5.25rem] shrink-0 text-md font-medium leading-7 text-card-preview-text line-clamp-3"
        >
          {{ dados.descricao }}
        </p>
        <div
          v-else
          class="mt-2 h-[5.25rem] shrink-0"
          aria-hidden="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GaleriaImagemData } from '~/types/modules'

defineProps<{
  dados: GaleriaImagemData
}>()
</script>
