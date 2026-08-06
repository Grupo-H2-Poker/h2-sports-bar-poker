<template>
  <div
    :class="[
      'relative flex-shrink-0 overflow-hidden rounded-lg',
      'h-[300px] w-[265px]',
      largura,
      altura,
      isClickable && CARD_INTERACTIVE,
    ]"
    :style="bgStyle"
    @click="onCardClick"
  >
    <img
      v-if="dados.imagem"
      :src="dados.imagem"
      :alt="dados.titulo || ''"
      class="absolute inset-0 size-full object-cover"
      draggable="false"
    >
    <div
      v-else
      class="absolute inset-0 bg-[#d9d9d9]"
    />
  </div>
</template>

<script setup lang="ts">
import type { CardGenericData } from '~/types/cards'
import { CARD_INTERACTIVE } from '~/components/cards/layouts/cardPreviewShared'

const props = defineProps<{
  dados: CardGenericData
  largura?: string
  altura?: string
}>()

const largura = computed(() => props.dados.largura ?? props.largura)
const altura = computed(() => props.dados.altura ?? props.altura)

const isClickable = computed(() => !!(props.dados.link || props.dados.botoes?.some(b => b.link)))

const bgStyle = computed(() => {
  const custom = props.dados.classes?.fundo
  if (custom?.startsWith('#') || custom?.startsWith('rgb')) {
    return { background: custom }
  }
  return undefined
})

const { onCardClick } = useCardPreviewLink(() => props.dados)
</script>
