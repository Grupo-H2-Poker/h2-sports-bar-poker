<template>
  <div v-if="botoesVisiveis.length" class="flex gap-3">
    <Button
      v-for="(botao, index) in botoesVisiveis"
      :key="index"
      variant="ghost"
      class="rounded-full px-6 py-3 text-sm font-semibold text-center whitespace-nowrap"
      :class="[botaoClasses(botao), stretchButtons ? 'flex-1' : 'w-auto']"
      @click.stop="onClick(botao)"
    >
      {{ botao.label }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import type { CardBotao } from '~/types/cards'
import { filterCardBotoes } from '~/utils/features'

const props = withDefaults(defineProps<{
  botoes: CardBotao[]
  fullWidth?: boolean
}>(), {
  fullWidth: true,
})

const botoesVisiveis = computed(() => filterCardBotoes(props.botoes))

/** Só estica quando há 2+ botões; com 1 (ex.: buy-in off) mantém o tamanho natural. */
const stretchButtons = computed(
  () => props.fullWidth && botoesVisiveis.value.length > 1,
)

function botaoClasses(botao: CardBotao) {
  const presetClass = resolveSectionCtaButtonClass(botao.cor, botao.variant)
  if (presetClass) return presetClass

  if (botao.cor && typeof botao.cor === 'string' && botao.cor !== 'verde' && botao.cor !== 'branco') {
    return botao.cor
  }

  const branco = botao.cor === 'branco'
  const outline = botao.variant === 'outline' || botao.variant === 'ghost'

  if (outline) {
    return branco
      ? 'outline-smooth-white text-white bg-transparent hover:bg-white/10'
      : 'outline-smooth-green text-brand-green bg-transparent hover:bg-brand-green/10'
  }

  return branco
    ? 'bg-white text-black hover:bg-white/90'
    : 'btn-green-solid'
}

const { navigateLink } = useCardLink()

function onClick(botao: CardBotao) {
  if (botao.link) navigateLink(botao.link)
}
</script>
