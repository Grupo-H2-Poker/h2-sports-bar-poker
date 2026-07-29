<template>
  <div
    :class="[
      'relative overflow-hidden rounded-3xl px-8 pt-14 pb-8 text-white flex flex-col gap-6',
      fill ? 'w-full h-full min-h-[400px]' : 'flex-shrink-0',
      largura,
      fundoClass,
      isClickable && CARD_INTERACTIVE,
    ]"
    @click="onCardClick"
  >
    <CardBadge :badge="dados.badge" :badge-class="badgeClass(dados.badge?.cor)" />

    <div class="flex flex-col gap-4">
      <div class="flex min-h-7 items-start justify-between gap-3">
        <div class="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
          <span v-if="headerLabel" class="text-lg font-bold leading-tight">
            {{ headerLabel }}
          </span>
          <span
            v-if="etapaLabel"
            class="inline-flex h-7 shrink-0 items-center rounded-full outline-smooth-green bg-transparent px-3 text-xs font-semibold text-brand-green"
          >
            {{ etapaLabel }}
          </span>
        </div>
        <CardFavorito
          v-if="dados.favorito"
          :favorito="dados.favorito"
          :estrela-class="estrelaClass"
        />
      </div>

      <!-- Altura fixa de 2 linhas — títulos curtos não encolhem o bloco (igual agenda_preview) -->
      <div class="flex min-h-[4.4rem] w-full items-center">
        <h3 class="w-full text-[2rem] font-bold leading-[1.1] line-clamp-2">
          {{ dados.titulo }}
        </h3>
      </div>

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
import { CARD_INTERACTIVE } from '~/components/cards/layouts/cardPreviewShared'
import CardBadge from '~/components/cards/parts/CardBadge.vue'
import CardBuyInBlock from '~/components/cards/parts/CardBuyInBlock.vue'
import CardFavorito from '~/components/cards/parts/CardFavorito.vue'
import CardFooterBotoes from '~/components/cards/parts/CardFooterBotoes.vue'
import CardHorarios from '~/components/cards/parts/CardHorarios.vue'
import { filterCardBotoes } from '~/utils/features'

const props = defineProps<{
  dados: CardGenericData
  active?: boolean
  largura?: string
  fill?: boolean
}>()

const active = computed(() => props.active ?? true)
const { fundoClass, badgeClass, estrelaClass } = useCardTheme(
  () => props.dados,
  () => active.value,
)

const headerLabel = computed(() => props.dados.categoria ?? props.dados.garantido)

const etapaLabel = computed(() => {
  const etapa = props.dados.filtros?.etapa
  if (!etapa) return undefined
  return `${etapa}ª Etapa`
})

const largura = computed(() => {
  if (props.fill) return 'w-full'
  return props.dados.largura ?? props.largura ?? 'w-[330px]'
})

const { navigateLink } = useCardLink()

const isClickable = computed(() => {
  if (props.dados.link) return true
  return filterCardBotoes(props.dados.botoes).some(b => !!b.link)
})

function onCardClick() {
  const link = props.dados.link ?? filterCardBotoes(props.dados.botoes).find(b => b.link)?.link
  if (link) navigateLink(link)
}
</script>
