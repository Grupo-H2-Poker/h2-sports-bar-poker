<template>
  <div
    :class="[
      'relative overflow-hidden rounded-3xl px-8 pt-14 pb-8 text-white flex-shrink-0 flex flex-col gap-6 transition-colors',
      largura,
      fundoClass,
    ]"
    @click="onCardClick"
  >
    <CardBadge :badge="dados.badge" :badge-class="badgeClass(dados.badge?.cor)" />

    <div class="flex flex-col gap-4">
      <div class="flex items-start justify-between gap-3">
        <span v-if="headerLabel" class="text-lg font-bold leading-tight">
          {{ headerLabel }}
        </span>
        <CardFavorito
          v-if="dados.favorito"
          :favorito="dados.favorito"
          :estrela-class="estrelaClass"
        />
      </div>

      <h3 class="text-[2rem] font-bold leading-[1.1]">{{ dados.titulo }}</h3>

      <CardHorarios :dados="dados" />
    </div>

    <div v-if="dados.buy_in" class="border-t border-white/15" />

    <CardBuyInBlock :buy-in="dados.buy_in" />

    <CardFooterBotoes
      v-if="dados.botoes?.length"
      :botoes="dados.botoes"
      class="mt-auto"
    />
  </div>
</template>

<script setup lang="ts">
import type { CardGenericData } from '~/types/cards'
import CardBadge from '~/components/cards/parts/CardBadge.vue'
import CardBuyInBlock from '~/components/cards/parts/CardBuyInBlock.vue'
import CardFavorito from '~/components/cards/parts/CardFavorito.vue'
import CardFooterBotoes from '~/components/cards/parts/CardFooterBotoes.vue'
import CardHorarios from '~/components/cards/parts/CardHorarios.vue'

const props = defineProps<{
  dados: CardGenericData
  active?: boolean
  largura?: string
}>()

const active = computed(() => props.active ?? false)
const { fundoClass, badgeClass, estrelaClass } = useCardTheme(
  () => props.dados,
  () => active.value,
)

const headerLabel = computed(() => props.dados.categoria ?? props.dados.garantido)
const largura = computed(() => props.dados.largura ?? props.largura ?? 'w-[330px]')

function onCardClick() {
  if (props.dados.link && !props.dados.botoes?.length) {
    navigateTo(props.dados.link)
  }
}
</script>
