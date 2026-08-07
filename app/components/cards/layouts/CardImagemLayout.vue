<template>
  <div
    :class="[
      'flex flex-shrink-0 flex-col items-center',
      !dados.legenda && [
        'relative overflow-hidden rounded-lg',
        'h-[300px] w-[265px]',
        largura,
        altura,
        isClickable && CARD_INTERACTIVE,
      ],
      dados.legenda && [
        'w-full max-w-[281px]',
        isClickable && CARD_INTERACTIVE,
      ],
    ]"
    :style="!dados.legenda ? bgStyle : undefined"
    @click="onCardClick"
  >
    <div
      v-if="dados.legenda"
      class="relative w-full overflow-hidden rounded-lg"
      :class="largura ?? 'aspect-[257/182]'"
      :style="bgStyle"
    >
      <img
        v-if="dados.imagem"
        :src="dados.imagem"
        :alt="dados.titulo || ''"
        class="absolute inset-0 size-full object-contain"
        draggable="false"
      >
      <div
        v-else
        class="absolute inset-0 bg-[#d9d9d9]"
      />
    </div>

    <template v-else>
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
    </template>

    <div
      v-if="dados.legenda && dados.titulo"
      class="relative z-10 -mt-3 w-[calc(100%+1.5rem)] max-w-[281px] rounded-lg bg-[#77158e] px-4 py-4 text-center"
    >
      <p class="text-xl font-medium leading-7 text-[#e7e7e7]">
        {{ dados.titulo }}
      </p>
    </div>
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
