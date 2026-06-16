<template>
  <div
    :class="[
      CARD_PREVIEW_TORNEIO_SHELL,
      largura,
      altura,
      isActive ? CARD_PREVIEW_TEXT : 'text-zinc-500',
    ]"
    :style="cardStyle"
    @click="onCardClick"
  >
    <div :class="CARD_PREVIEW_TORNEIO_HEADER">
      <span
        v-if="dados.garantido"
        :class="CARD_PREVIEW_TORNEIO_GARANTIDO"
      >
        {{ dados.garantido }}
      </span>

      <div :class="CARD_PREVIEW_TORNEIO_TITULO_SLOT">
        <h3 :class="CARD_PREVIEW_TORNEIO_TITULO">{{ dados.titulo }}</h3>
      </div>
    </div>

    <div :class="CARD_PREVIEW_TORNEIO_FOOTER">
      <div :class="CARD_PREVIEW_TORNEIO_INFO_SLOT">
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
        <Button
          v-if="hasButton"
          variant="ghost"
          size="sm"
          :class="[CARD_PREVIEW_BUTTON, botaoClass]"
          @click.stop="onButtonClick(isActive)"
        >
          {{ primaryButton!.label }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import type { CardGenericData } from '~/types/cards'
import {
  CARD_PREVIEW_BUTTON,
  CARD_PREVIEW_BUTTON_SLOT,
  CARD_PREVIEW_TORNEIO_FOOTER,
  CARD_PREVIEW_TORNEIO_HEADER,
  CARD_PREVIEW_TORNEIO_SHELL,
  CARD_PREVIEW_HORARIOS,
  CARD_PREVIEW_TORNEIO_INFO_SLOT,
  CARD_PREVIEW_TEXT,
  CARD_PREVIEW_TORNEIO_GARANTIDO,
  CARD_PREVIEW_TORNEIO_TITULO,
  CARD_PREVIEW_TORNEIO_TITULO_SLOT,
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
