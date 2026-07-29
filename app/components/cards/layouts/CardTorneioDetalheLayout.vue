<template>
  <div class="flex flex-col items-center gap-3 flex-shrink-0" :class="largura">
    <div
      :class="[
        'relative w-full overflow-hidden rounded-3xl p-8 text-white flex flex-col gap-5 transition-colors',
        fundoClass,
      ]"
    >
      <div v-if="tituloTopo" class="flex items-baseline justify-center gap-2">
        <span class="text-xl font-medium">{{ buyInLabel }}</span>
        <span class="text-2xl font-bold">{{ buyInValor }}</span>
      </div>

      <div class="border-t border-white/15" />

      <CardHorariosBoxes :dados="dados" />

      <div
        v-if="dados.faixa_info"
        class="rounded-lg px-4 py-3 text-center text-sm font-medium italic"
        :class="faixaInfoClass"
      >
        {{ dados.faixa_info }}
      </div>

      <p v-if="dados.descricao" class="px-2 text-center text-base italic leading-relaxed opacity-90">
        {{ dados.descricao }}
      </p>

      <CardFooterBotoes
        v-if="dados.botoes?.length"
        :botoes="dados.botoes"
      />
    </div>

    <NuxtLink
      v-if="dados.link_footer"
      :to="footerHref"
      class="text-sm text-white/80 underline underline-offset-2 hover:text-white cursor-pointer"
    >
      {{ dados.link_footer.texto }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { CardGenericData } from '~/types/cards'
import CardFooterBotoes from '~/components/cards/parts/CardFooterBotoes.vue'
import CardHorariosBoxes from '~/components/cards/parts/CardHorariosBoxes.vue'

const props = defineProps<{
  dados: CardGenericData
  active?: boolean
  largura?: string
}>()

const route = useRoute()
const active = computed(() => props.active ?? true)
const { fundoClass, faixaInfoClass } = useCardTheme(
  () => props.dados,
  () => active.value,
)

const buyInLabel = computed(() => props.dados.buy_in?.label ?? 'Buy-in')
const buyInValor = computed(() => props.dados.buy_in?.preco ?? '')
const tituloTopo = computed(() => !!props.dados.buy_in || !!props.dados.titulo)

const largura = computed(() => props.dados.largura ?? props.largura ?? 'w-[330px]')

const footerHref = computed(() => {
  const link = props.dados.link_footer?.link
  if (!link || link === '#') return '#'
  const unidadeSlug = route.params.unidade as string | undefined
  if (unidadeSlug) return resolveUnidadeHref(unidadeSlug, link)
  return link.startsWith('/') ? link : `/${link}`
})
</script>
