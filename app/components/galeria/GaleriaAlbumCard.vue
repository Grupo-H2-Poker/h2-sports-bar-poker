<template>
  <div
    class="relative w-full h-full min-h-[400px] overflow-hidden rounded-3xl bg-muted group cursor-pointer"
    role="button"
    tabindex="0"
    :aria-label="dados.titulo ? `Abrir álbum ${dados.titulo}` : 'Abrir álbum'"
    @click="onClick"
    @keydown.enter.prevent="onClick"
    @keydown.space.prevent="onClick"
  >
    <img
      v-if="dados.imagem"
      :src="dados.imagem"
      :alt="dados.titulo || ''"
      class="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
    >

    <div
      class="absolute inset-0 bg-black/30"
      aria-hidden="true"
    />

    <div
      v-if="dados.titulo"
      class="absolute inset-0 z-10 flex items-center justify-center px-6 font-[family-name:var(--font-red-hat-display)]"
    >
      <h3 class="text-center text-3xl font-bold leading-tight text-[#e7e7e7]">
        {{ dados.titulo }}
      </h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GaleriaImagemData } from '~/types/modules'

const props = defineProps<{
  dados: GaleriaImagemData
}>()

const emit = defineEmits<{
  select: []
}>()

const { navigateLink } = useCardLink()

function onClick() {
  const link = props.dados.link
  if (link) {
    navigateLink(link)
    return
  }
  emit('select')
}
</script>
