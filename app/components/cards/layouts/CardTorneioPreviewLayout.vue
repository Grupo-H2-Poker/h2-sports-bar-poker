<template>
  <div
    :class="[
      CARD_PREVIEW_SHELL,
      largura,
      altura,
      isActive ? CARD_PREVIEW_TEXT : 'text-zinc-500',
    ]"
    :style="cardStyle"
    @click="onCardClick"
  >
    <div :class="CARD_PREVIEW_HEADER">
      <span
        v-if="dados.garantido"
        :class="CARD_PREVIEW_TORNEIO_GARANTIDO"
      >
        {{ dados.garantido }}
      </span>

      <h3 :class="['mt-5', CARD_PREVIEW_TORNEIO_TITULO]">{{ dados.titulo }}</h3>
    </div>

    <div :class="CARD_PREVIEW_FOOTER_FIXED">
      <div :class="CARD_PREVIEW_INFO_SLOT">
        <div
          v-if="dados.inicio || dados.late"
          :class="['flex flex-wrap items-center gap-x-6 gap-y-0', CARD_PREVIEW_HORARIOS]"
        >
          <span v-if="dados.inicio">
            Início {{ dados.inicio }}
          </span>
          <span v-if="dados.late">
            Late {{ dados.late }}
          </span>
        </div>
      </div>

      <div :class="CARD_PREVIEW_BUTTON_SLOT">
        <button
          v-if="hasButton"
          type="button"
          :class="[CARD_PREVIEW_BUTTON, botaoClass]"
          @click.stop="onButtonClick(isActive)"
        >
          {{ primaryButton!.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardGenericData } from '~/types/cards'
import {
  CARD_PREVIEW_BUTTON,
  CARD_PREVIEW_BUTTON_SLOT,
  CARD_PREVIEW_FOOTER_FIXED,
  CARD_PREVIEW_HEADER,
  CARD_PREVIEW_HORARIOS,
  CARD_PREVIEW_INFO_SLOT,
  CARD_PREVIEW_SHELL,
  CARD_PREVIEW_TEXT,
  CARD_PREVIEW_TORNEIO_GARANTIDO,
  CARD_PREVIEW_TORNEIO_TITULO,
} from '~/components/cards/layouts/cardPreviewShared'

const TORNEIO_PREVIEW_BG_ATIVO = 'rgba(119, 21, 142, 0.30)'
const TORNEIO_PREVIEW_BG_INATIVO = 'rgba(255, 255, 255, 0.06)'

const props = defineProps<{
  dados: CardGenericData
  largura?: string
  altura?: string
}>()

const largura = computed(() => props.dados.largura ?? props.largura)
const altura = computed(() => props.dados.altura ?? props.altura)

const isActive = computed(() => props.dados.ativo !== false)

const cardStyle = computed(() => ({
  background: isActive.value ? TORNEIO_PREVIEW_BG_ATIVO : TORNEIO_PREVIEW_BG_INATIVO,
}))

const botaoClass = computed(() =>
  isActive.value
    ? 'bg-brand-green text-black hover:bg-brand-green/90'
    : 'bg-zinc-700 text-zinc-500 cursor-default',
)

const { primaryButton, hasButton, onCardClick, onButtonClick } = useCardPreviewLink(
  () => props.dados,
)
</script>
