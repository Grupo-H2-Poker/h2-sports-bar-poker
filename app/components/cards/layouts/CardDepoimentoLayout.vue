<template>
  <div
    :class="[
      'relative w-full flex-shrink-0 font-[\'Red_Hat_Display\',sans-serif]',
      largura,
      altura,
      CARD_PREVIEW_TEXT,
      isClickable && CARD_INTERACTIVE,
    ]"
    @click="onCardClick"
  >
    <!-- Imagem flutuando acima do corpo do card (Figma: −65px) -->
    <div
      class="absolute left-1/2 top-0 z-10 h-[194px] w-[min(273px,calc(100%-48px))] -translate-x-1/2 overflow-hidden rounded-lg"
    >
      <img
        v-if="dados.imagem"
        :src="dados.imagem"
        :alt="dados.titulo"
        class="size-full object-cover"
        draggable="false"
      >
      <div
        v-else
        class="size-full bg-muted"
      />
    </div>

    <!-- Corpo cinza — começa abaixo da foto -->
    <div
      class="mt-[65px] flex min-h-[529px] flex-col rounded-lg bg-white/30 px-10 pb-10 pt-[145px] md:px-12"
    >
      <h3 class="text-[28px] font-bold leading-7">
        {{ dados.titulo }}
      </h3>

      <p
        v-if="dados.descricao"
        class="mt-6 text-lg font-medium leading-7 opacity-90"
      >
        {{ dados.descricao }}
      </p>

      <p
        v-if="autor"
        class="mt-auto pt-8 text-lg font-bold leading-7"
      >
        {{ autor }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardGenericData } from '~/types/cards'
import {
  CARD_INTERACTIVE,
  CARD_PREVIEW_TEXT,
} from '~/components/cards/layouts/cardPreviewShared'

const props = defineProps<{
  dados: CardGenericData
  largura?: string
  altura?: string
}>()

const largura = computed(() => props.dados.largura ?? props.largura)
const altura = computed(() => props.dados.altura ?? props.altura)

const isClickable = computed(() => !!(props.dados.link || props.dados.botoes?.some(b => b.link)))

const autor = computed(() => props.dados.autor ?? props.dados.subtitulo)

const { onCardClick } = useCardPreviewLink(() => props.dados)
</script>
