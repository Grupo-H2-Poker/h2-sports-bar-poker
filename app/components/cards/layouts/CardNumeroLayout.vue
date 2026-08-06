<template>
  <div
    :class="[
      'relative flex flex-shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg',
      'h-[250px] w-[265px] border-2 border-[#77158e] bg-transparent p-6 text-center',
      'font-[\'Red_Hat_Display\',sans-serif]',
      largura,
      altura,
      CARD_PREVIEW_TEXT,
      isClickable && CARD_INTERACTIVE,
    ]"
    @click="onCardClick"
  >
    <p class="whitespace-pre-line text-[30px] font-bold leading-[40px]">
      {{ valorLinhas }}
    </p>
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

/** `titulo` + `subtitulo` (ex.: R$XXXXXX / eventos) */
const valorLinhas = computed(() => {
  const { titulo, subtitulo } = props.dados
  if (subtitulo) return `${titulo}\n${subtitulo}`
  return titulo
})

const { onCardClick } = useCardPreviewLink(() => props.dados)
</script>
