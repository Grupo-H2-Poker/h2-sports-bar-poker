<template>
  <component
    :is="layout"
    :dados="dados"
    :active="active"
    :largura="larguraProp"
    :fill="fill"
  />
</template>

<script setup lang="ts">
import type { CardGenericData, CardVariant } from '~/types/cards'
import CardCashGameLayout from '~/components/cards/layouts/CardCashGameLayout.vue'
import CardCashGamePreviewLayout from '~/components/cards/layouts/CardCashGamePreviewLayout.vue'
import CardDepoimentoLayout from '~/components/cards/layouts/CardDepoimentoLayout.vue'
import CardEtapaPreviewLayout from '~/components/cards/layouts/CardEtapaPreviewLayout.vue'
import CardImagemLayout from '~/components/cards/layouts/CardImagemLayout.vue'
import CardNumeroLayout from '~/components/cards/layouts/CardNumeroLayout.vue'
import CardTorneioDetalheLayout from '~/components/cards/layouts/CardTorneioDetalheLayout.vue'
import CardTorneioLayout from '~/components/cards/layouts/CardTorneioLayout.vue'
import CardTorneioPreviewLayout from '~/components/cards/layouts/CardTorneioPreviewLayout.vue'
import CardUnidadeLayout from '~/components/cards/layouts/CardUnidadeLayout.vue'

const LAYOUTS: Record<CardVariant, Component> = {
  torneio: CardTorneioLayout,
  cash_game: CardCashGameLayout,
  torneio_detalhe: CardTorneioDetalheLayout,
  torneio_preview: CardTorneioPreviewLayout,
  etapa_preview: CardEtapaPreviewLayout,
  cash_game_preview: CardCashGamePreviewLayout,
  numero: CardNumeroLayout,
  imagem: CardImagemLayout,
  depoimento: CardDepoimentoLayout,
  unidade: CardUnidadeLayout,
}

const props = withDefaults(defineProps<{
  dados: CardGenericData
  active?: boolean
  largura?: string
  /** Preenche a célula do grid (largura/altura 100%) */
  fill?: boolean
}>(), {
  active: true,
  fill: false,
})

const layout = computed(() => LAYOUTS[props.dados.variant] ?? CardTorneioLayout)

const larguraProp = computed(() => {
  if (props.fill) return 'w-full'
  return props.largura
})
</script>
