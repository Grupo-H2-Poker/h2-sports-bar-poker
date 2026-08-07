<template>
  <div
    :class="[
      /* pt-[65px] (não mt no corpo): evita collapse de margem no wrap/grid e mantém a foto flutuando */
      'relative flex w-full flex-shrink-0 flex-col pt-[65px] font-[\'Red_Hat_Display\',sans-serif]',
      largura,
      CARD_PREVIEW_TEXT,
    ]"
  >
    <!-- Foto flutuando acima do corpo (Figma Quem somos — 273×194, −65px) -->
    <div
      class="absolute left-1/2 top-0 z-10 h-[194px] w-[min(273px,calc(100%-48px))] -translate-x-1/2 overflow-hidden rounded-lg"
    >
      <img
        v-if="dados.imagem"
        :src="dados.imagem"
        :alt="dados.titulo"
        class="size-full object-cover"
        draggable="false"
      >
      <div
        v-else
        class="size-full bg-[#d9d9d9]"
      />
    </div>

    <div
      class="flex min-h-[356px] flex-col items-center rounded-lg bg-white/30 px-6 pb-8 pt-[167px] text-center"
    >
      <div class="flex w-full max-w-[277px] flex-col items-center">
        <h3 class="text-[28px] font-bold leading-7">
          {{ dados.titulo }}
        </h3>

        <p
          v-if="dados.descricao"
          class="mt-2 w-full text-lg font-medium leading-7 opacity-90"
        >
          {{ dados.descricao }}
        </p>

        <div
          v-if="botao"
          class="mt-6 flex w-full justify-center"
        >
          <Button
            :variant="ctaAppearance.variant"
            size="default"
            class="rounded-full"
            :class="ctaAppearance.class"
            @click.stop="onCtaClick"
          >
            {{ botao.label }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import type { CardGenericData } from '~/types/cards'
import { CARD_PREVIEW_TEXT } from '~/components/cards/layouts/cardPreviewShared'
import { resolveCtaButtonAppearance } from '~/utils/sectionCtaButton'
import { filterCardBotoes } from '~/utils/features'

const props = defineProps<{
  dados: CardGenericData
  largura?: string
}>()

const largura = computed(() => props.dados.largura ?? props.largura)

const botao = computed(() => filterCardBotoes(props.dados.botoes)[0])

const ctaAppearance = computed(() =>
  resolveCtaButtonAppearance(botao.value?.cor ?? 'verde', botao.value?.variant),
)

const { navigateLink } = useCardLink()

function onCtaClick() {
  const link = botao.value?.link
  if (link) navigateLink(link)
}
</script>
