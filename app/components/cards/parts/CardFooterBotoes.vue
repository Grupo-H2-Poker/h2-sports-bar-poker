<template>
  <div class="flex gap-3">
    <Button
      v-for="(botao, index) in botoes"
      :key="index"
      variant="ghost"
      class="rounded-full px-6 py-3 text-sm font-semibold text-center whitespace-nowrap"
      :class="[botaoClasses(botao), fullWidth ? 'flex-1' : 'w-auto']"
      @click.stop="onClick(botao)"
    >
      {{ botao.label }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import type { CardBotao } from '~/types/cards'

const props = withDefaults(defineProps<{
  botoes: CardBotao[]
  fullWidth?: boolean
}>(), {
  fullWidth: true,
})

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
      ? 'border border-white text-white bg-transparent hover:bg-white/10'
      : 'border border-brand-green text-brand-green bg-transparent hover:bg-brand-green/10'
  }

  return branco
    ? 'bg-white text-black hover:bg-white/90'
    : 'bg-brand-green text-black hover:bg-brand-green/90'
}

function onClick(botao: CardBotao) {
  if (botao.link) navigateTo(botao.link)
}
</script>
