<template>
  <component
    :is="layout"
    :dados="dados"
    :active="active"
    :largura="largura"
  />
</template>

<script setup lang="ts">
import type { CardGenericData, CardVariant } from '~/types/cards'
import CardCashGameLayout from '~/components/cards/layouts/CardCashGameLayout.vue'
import CardTorneioDetalheLayout from '~/components/cards/layouts/CardTorneioDetalheLayout.vue'
import CardTorneioLayout from '~/components/cards/layouts/CardTorneioLayout.vue'

const LAYOUTS: Record<CardVariant, Component> = {
  torneio: CardTorneioLayout,
  cash_game: CardCashGameLayout,
  torneio_detalhe: CardTorneioDetalheLayout,
}

const props = withDefaults(defineProps<{
  dados: CardGenericData
  active?: boolean
  largura?: string
}>(), {
  active: false,
})

const layout = computed(() => LAYOUTS[props.dados.variant] ?? CardTorneioLayout)
</script>
