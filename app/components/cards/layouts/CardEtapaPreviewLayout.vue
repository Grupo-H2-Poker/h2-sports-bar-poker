<template>
  <div
    :class="[
      CARD_PREVIEW_TORNEIO_SHELL,
      largura,
      altura,
      CARD_PREVIEW_TEXT,
      CARD_INTERACTIVE,
    ]"
    :style="cardStyle"
    @click="onCardClick"
  >
    <div class="flex min-h-0 flex-1 flex-col items-start justify-start">
      <h3 class="text-[30px] font-bold leading-[40px] whitespace-pre-line">
        {{ tituloLinhas }}
      </h3>
    </div>

    <div :class="CARD_PREVIEW_TORNEIO_FOOTER">
      <p
        v-if="periodo"
        :class="CARD_PREVIEW_HORARIOS"
      >
        {{ periodo }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardGenericData } from '~/types/cards'
import {
  CARD_INTERACTIVE,
  CARD_PREVIEW_HORARIOS,
  CARD_PREVIEW_TORNEIO_FOOTER,
  CARD_PREVIEW_TORNEIO_SHELL,
  CARD_PREVIEW_TEXT,
} from '~/components/cards/layouts/cardPreviewShared'

const ETAPA_PREVIEW_BG_ATIVO = '#d63d1d'
const ETAPA_PREVIEW_BG_INATIVO = '#E7E7E74D'

const props = defineProps<{
  dados: CardGenericData
  largura?: string
  altura?: string
}>()

const largura = computed(() => props.dados.largura ?? props.largura)
const altura = computed(() => props.dados.altura ?? props.altura)

const isActive = computed(() => props.dados.ativo !== false)

const cardStyle = computed(() => {
  const custom = isActive.value
    ? props.dados.classes?.fundo_ativo ?? props.dados.classes?.fundo
    : props.dados.classes?.fundo_inativo ?? props.dados.classes?.fundo

  if (custom?.startsWith('#') || custom?.startsWith('rgb')) {
    return { background: custom }
  }

  return {
    background: isActive.value ? ETAPA_PREVIEW_BG_ATIVO : ETAPA_PREVIEW_BG_INATIVO,
  }
})

const tituloLinhas = computed(() => {
  const { titulo, subtitulo } = props.dados
  if (subtitulo) return `${titulo}\n${subtitulo}`
  return titulo
})

const periodo = computed(
  () => props.dados.faixa_info ?? props.dados.inicio ?? props.dados.descricao,
)

const { onCardClick } = useCardPreviewLink(() => props.dados)
</script>
