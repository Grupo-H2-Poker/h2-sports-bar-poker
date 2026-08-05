<template>
  <div
    :class="[
      'relative overflow-hidden rounded-[10px] px-6 pt-12 pb-6 text-white flex flex-col gap-5',
      fill ? 'w-full h-full min-h-[380px]' : 'flex-shrink-0',
      largura,
      fundoClass,
      isClickable && CARD_INTERACTIVE,
    ]"
    @click="onCardClick"
  >
    <CardBadge :badge="dados.badge" :badge-class="badgeClass(dados.badge?.cor)" />

    <div class="flex flex-col gap-3">
      <div class="flex min-h-7 items-start justify-between gap-3">
        <div class="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
          <span v-if="headerLabel" class="text-base font-bold leading-tight sm:text-lg">
            {{ headerLabel }}
          </span>
          <span
            v-if="etapaLabel"
            class="inline-flex h-7 shrink-0 items-center rounded-full smooth-border bg-transparent px-3 text-xs font-semibold text-brand-green"
          >
            {{ etapaLabel }}
          </span>
        </div>
        <CardFavorito
          v-if="dados.favorito"
          :favorito="dados.favorito"
          :estrela-class="estrelaClass"
          :slug="dados.slug"
          :titulo="dados.titulo"
          :card="dados"
        />
      </div>

      <!-- Altura fixa de 2 linhas — títulos curtos não encolhem o bloco (igual agenda_preview) -->
      <div class="flex min-h-[4rem] w-full items-center">
        <h3 class="w-full text-[1.75rem] font-bold leading-[1.1] line-clamp-2 xl:text-[1.625rem]">
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

const { t, locale } = useI18n()

const active = computed(() => props.active ?? true)
const { fundoClass, badgeClass, estrelaClass } = useCardTheme(
  () => props.dados,
  () => active.value,
)

const headerLabel = computed(() => props.dados.categoria ?? props.dados.garantido)

function stageOrdinal(n: string): string {
  const code = String(locale.value).toLowerCase().split('-')[0]
  if (code === 'en') {
    const map: Record<string, string> = { '1': '1st', '2': '2nd', '3': '3rd', '4': '4th', '5': '5th', '6': '6th' }
    return map[n] ?? `${n}th`
  }
  if (code === 'es') return `${n}.ª`
  return `${n}ª`
}

const etapaLabel = computed(() => {
  const etapa = props.dados.filtros?.etapa
  if (!etapa) return undefined
  return t('card.stageBadge', { n: etapa, ordinal: stageOrdinal(etapa) })
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
