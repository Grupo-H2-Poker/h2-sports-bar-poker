<template>
  <div v-if="botoesComAppearance.length" class="flex gap-3">
    <Button
      v-for="({ botao, appearance }, index) in botoesComAppearance"
      :key="index"
      :variant="appearance.variant"
      class="rounded-full px-6 py-3 text-sm font-semibold text-center whitespace-nowrap"
      :class="[appearance.class, stretchButtons ? 'flex-1' : 'w-auto']"
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
import { resolveCtaButtonAppearance } from '~/utils/sectionCtaButton'

const props = withDefaults(defineProps<{
  botoes: CardBotao[]
  fullWidth?: boolean
}>(), {
  fullWidth: true,
})

const botoesVisiveis = computed(() => filterCardBotoes(props.botoes))

const botoesComAppearance = computed(() =>
  botoesVisiveis.value.map(botao => ({
    botao,
    appearance: resolveCtaButtonAppearance(botao.cor ?? 'verde', botao.variant),
  })),
)

/** Só estica quando há 2+ botões; com 1 (ex.: buy-in off) mantém o tamanho natural. */
const stretchButtons = computed(
  () => props.fullWidth && botoesVisiveis.value.length > 1,
)

const { navigateLink } = useCardLink()

function onClick(botao: CardBotao) {
  if (botao.link) navigateLink(botao.link)
}
</script>
