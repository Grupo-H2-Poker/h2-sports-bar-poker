<template>
  <div
    :class="[
      'relative overflow-hidden rounded-3xl px-8 pt-14 pb-8 text-white flex-shrink-0 flex flex-col transition-colors',
      altura,
      largura,
      fundoClass,
    ]"
    @click="onCardClick"
  >
    <CardBadge :badge="dados.badge" :badge-class="badgeClass(dados.badge?.cor)" />

    <div class="flex-1 flex flex-col justify-center gap-2">
      <span v-if="dados.categoria" class="text-2xl font-bold leading-tight">
        {{ dados.categoria }}
      </span>
      <h3 class="text-[2rem] font-bold leading-[1.1]">{{ dados.titulo }}</h3>
      <p v-if="dados.subtitulo" class="text-base opacity-80">{{ dados.subtitulo }}</p>
    </div>

    <CardFooterBotoes
      v-if="dados.botoes?.length"
      :botoes="dados.botoes"
      :full-width="false"
    />
  </div>
</template>

<script setup lang="ts">
import type { CardGenericData } from '~/types/cards'
import CardBadge from '~/components/cards/parts/CardBadge.vue'
import CardFooterBotoes from '~/components/cards/parts/CardFooterBotoes.vue'

const props = defineProps<{
  dados: CardGenericData
  active?: boolean
  largura?: string
}>()

const active = computed(() => props.active ?? false)
const { fundoClass, badgeClass } = useCardTheme(
  () => props.dados,
  () => active.value,
)

const largura = computed(() => props.dados.largura ?? props.largura ?? 'w-[330px]')
const altura = computed(() => props.dados.altura ?? 'min-h-[320px]')

function onCardClick() {
  if (props.dados.link && !props.dados.botoes?.length) {
    navigateTo(props.dados.link)
  }
}
</script>
