<template>
  <div
    :class="[
      CARD_PREVIEW_SHELL,
      CARD_PREVIEW_TEXT,
      CARD_INTERACTIVE,
      largura,
      altura,
    ]"
    :style="{ background: '#77158E' }"
    @click="onCardClick"
  >
    <div :class="CARD_PREVIEW_HEADER">
      <h3 :class="CARD_PREVIEW_CASH_TITULO">
        <span v-for="(line, index) in titleLines" :key="index" class="block">
          {{ line }}
        </span>
      </h3>
    </div>

    <div :class="CARD_PREVIEW_FOOTER_FIXED">
      <div :class="CARD_PREVIEW_INFO_SLOT">
        <div :class="CARD_PREVIEW_CASH_DETALHES">
          <p v-if="dados.inicio" class="m-0">
            {{ t('card.start') }} {{ dados.inicio }}
          </p>
          <p v-if="dados.inscricoes" class="m-0">
            {{ t('card.registrationUntil', { time: dados.inscricoes }) }}
          </p>
        </div>
      </div>

      <div :class="CARD_PREVIEW_BUTTON_SLOT">
        <Button
          v-if="hasButton"
          variant="brand"
          size="sm"
          :class="CARD_PREVIEW_BUTTON"
          @click.stop="onButtonClick(true)"
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
  CARD_INTERACTIVE,
  CARD_PREVIEW_BUTTON,
  CARD_PREVIEW_BUTTON_SLOT,
  CARD_PREVIEW_CASH_DETALHES,
  CARD_PREVIEW_CASH_TITULO,
  CARD_PREVIEW_FOOTER_FIXED,
  CARD_PREVIEW_HEADER,
  CARD_PREVIEW_INFO_SLOT,
  CARD_PREVIEW_SHELL,
  CARD_PREVIEW_TEXT,
} from '~/components/cards/layouts/cardPreviewShared'

const { t } = useI18n()

const props = defineProps<{
  dados: CardGenericData
  largura?: string
  altura?: string
}>()

const largura = computed(() => props.dados.largura ?? props.largura)
const altura = computed(() => props.dados.altura ?? props.altura)

const titleLines = computed(() => props.dados.titulo.split(/\s+/))

const { primaryButton, hasButton, onCardClick, onButtonClick } = useCardPreviewLink(
  () => props.dados,
)
</script>
