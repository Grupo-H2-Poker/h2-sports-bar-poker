<template>
  <div
    class="rounded-2xl overflow-hidden bg-muted group h-full flex flex-col"
    :class="hasLink ? 'cursor-pointer' : undefined"
    :role="hasLink ? 'link' : undefined"
    :tabindex="hasLink ? 0 : undefined"
    @click="onClick"
    @keydown.enter.prevent="onClick"
    @keydown.space.prevent="onClick"
  >
    <div class="aspect-[4/3] bg-muted overflow-hidden flex-shrink-0">
      <img
        v-if="dados.imagem"
        :src="dados.imagem"
        :alt="dados.titulo || ''"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      >
    </div>
    <div v-if="dados.titulo || dados.descricao" class="p-4 flex-1">
      <h3 v-if="dados.titulo" class="font-bold text-base mb-1">{{ dados.titulo }}</h3>
      <p v-if="dados.descricao" class="text-sm text-muted-foreground line-clamp-2">
        {{ dados.descricao }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GaleriaImagemData } from '~/types/modules'

const props = defineProps<{
  dados: GaleriaImagemData
}>()

const { navigateLink } = useCardLink()

const hasLink = computed(() => !!props.dados.link)

function onClick() {
  const link = props.dados.link
  if (link) navigateLink(link)
}
</script>
