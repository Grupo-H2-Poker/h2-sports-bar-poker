<template>
  <div
    :class="[
      'relative overflow-hidden rounded-[10px] px-8 pt-14 pb-8 text-white flex-shrink-0 flex flex-col transition-colors',
      altura,
      largura,
      fundoClass,
      !isActive && 'opacity-50',
    ]"
  >
    <CardBadge :badge="dados.badge" :badge-class="badgeClass(dados.badge?.cor)" />

    <div class="flex-1 flex flex-col justify-center gap-2">
      <span v-if="dados.categoria" class="text-base font-medium leading-tight opacity-90">
        {{ dados.categoria }}
      </span>
      <h3 class="text-[2rem] font-bold leading-[1.1]">{{ dados.titulo }}</h3>
      <p v-if="dados.subtitulo" class="text-base opacity-80">{{ dados.subtitulo }}</p>
    </div>

    <Button
      v-if="ctaLabel && isActive"
      variant="brand"
      class="w-fit rounded-full px-6 py-3 text-sm font-semibold"
      @click.stop="onEntrar"
    >
      {{ ctaLabel }}
    </Button>
    <div
      v-else-if="ctaLabel"
      class="rounded-full px-6 py-3 text-sm font-semibold bg-white/10 text-white/50 w-fit"
    >
      {{ ctaLabel }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardGenericData } from '~/types/cards'
import { Button } from '~/components/ui/button'
import CardBadge from '~/components/cards/parts/CardBadge.vue'

const props = defineProps<{
  dados: CardGenericData
  active?: boolean
  largura?: string
}>()

const { t } = useI18n()
const isActive = computed(() => props.dados.ativo ?? props.active ?? true)
const { fundoClass, badgeClass } = useCardTheme(
  () => props.dados,
  () => isActive.value,
)
const { entrarNaFila } = useCashGameFila()

const largura = computed(() => props.dados.largura ?? props.largura ?? 'w-full')
const altura = computed(() => props.dados.altura ?? 'min-h-[320px]')
const ctaLabel = computed(() => props.dados.botoes?.[0]?.label ?? t('card.joinQueue'))

function onEntrar() {
  if (!isActive.value) return
  entrarNaFila(props.dados.titulo)
}
</script>
