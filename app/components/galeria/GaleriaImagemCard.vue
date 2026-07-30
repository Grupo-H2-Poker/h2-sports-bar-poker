<template>
  <div
    class="relative aspect-[3/4] h-full overflow-hidden rounded-xl bg-muted group"
    :class="hasLink ? 'cursor-pointer' : undefined"
    :role="hasLink ? 'link' : undefined"
    :tabindex="hasLink ? 0 : undefined"
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
      class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
      aria-hidden="true"
    />

    <div
      v-if="dados.titulo || dados.descricao"
      class="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 pt-5 font-[family-name:var(--font-red-hat-display)]"
    >
      <div class="flex h-[7.5rem] flex-col">
        <h3
          v-if="dados.titulo"
          class="h-7 shrink-0 text-xl font-bold leading-7 text-white line-clamp-1"
        >
          {{ dados.titulo }}
        </h3>
        <div v-else class="h-7 shrink-0" aria-hidden="true" />

        <p
          v-if="dados.descricao"
          class="mt-2 h-[4.5rem] shrink-0 text-sm font-medium leading-6 text-[#c4c4c4] line-clamp-3"
        >
          {{ dados.descricao }}
        </p>
        <div
          v-else
          class="mt-2 h-[4.5rem] shrink-0"
          aria-hidden="true"
        />
      </div>
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
