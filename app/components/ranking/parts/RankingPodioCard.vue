<template>
  <div
    class="relative mx-auto h-[222px]"
    :style="{ width: `${PODIO_COLUMN_WIDTH}px` }"
  >
    <img
      :src="rankImage"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute top-0 z-0 h-[222px] w-[220px] select-none object-contain object-left-bottom"
      :style="{ left: `${layout.numberLeft}px` }"
    >

    <div
      class="absolute z-10 flex h-[220px] w-[160px] flex-col justify-end overflow-hidden rounded-[6px]"
      :style="{
        left: `${layout.cardLeft}px`,
        top: `${PODIO_CARD_TOP}px`,
      }"
    >
      <img
        v-if="avatar"
        :src="avatar"
        :alt="nome"
        class="absolute inset-0 h-full w-full object-cover"
      >

      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent from-[60%] to-black"
        aria-hidden="true"
      />

      <div class="relative z-10 flex flex-col gap-1 px-2.5 pb-2.5 pt-2">
        <p class="text-sm font-medium leading-snug text-[#e7e7e7]">
          {{ nome }}
        </p>

        <p
          v-if="pontos != null && pontos !== ''"
          class="text-sm font-medium tabular-nums text-[#e7e7e7]"
        >
          {{ formattedPontos }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ranking1 from '~/assets/img/ranking/1.png'
import ranking2 from '~/assets/img/ranking/2.png'
import ranking3 from '~/assets/img/ranking/3.png'
import ranking4 from '~/assets/img/ranking/4.png'
import ranking5 from '~/assets/img/ranking/5.png'

const RANKING_NUMBER_IMAGES: Record<number, string> = {
  1: ranking1,
  2: ranking2,
  3: ranking3,
  4: ranking4,
  5: ranking5,
}

/** Largura uniforme entre cards no Figma (~243–244px). */
const PODIO_COLUMN_WIDTH = 244

/** Foto 3px acima do topo do número (Figma: card y=934, number y=937). */
const PODIO_CARD_TOP = -3

/**
 * Offsets relativos ao número (nodes 408:1617, 1273:956, 1273:958, 1273:962, 1273:966
 * + cards 408:2079, 408:2091, 408:2093, 408:2095, 408:2097).
 * numberLeft extra nos dígitos 4 e 5 compensa o PNG mais largo.
 */
const PODIO_LAYOUT: Record<number, { cardLeft: number; numberLeft: number }> = {
  1: { cardLeft: 63, numberLeft: 0 },
  2: { cardLeft: 80, numberLeft: -10 },
  3: { cardLeft: 89, numberLeft: -7 },
  4: { cardLeft: 97, numberLeft: -36 },
  5: { cardLeft: 97, numberLeft: 10 },
}

const DEFAULT_PODIO_LAYOUT = PODIO_LAYOUT[3]!

const props = defineProps<{
  colocacao: number | string
  nome: string
  avatar?: string
  pontos?: string | number
  accentColor: string
}>()

const colocacaoNumero = computed(() => {
  if (typeof props.colocacao === 'number') return String(props.colocacao)
  return props.colocacao.replace(/\D/g, '') || props.colocacao
})

const formattedPontos = computed(() => formatRankingPontos(props.pontos))

const numero = computed(() => {
  const parsed = Number(colocacaoNumero.value)
  if (parsed >= 1 && parsed <= 5) return parsed
  return 5
})

const rankImage = computed(() => RANKING_NUMBER_IMAGES[numero.value])

const layout = computed(() => PODIO_LAYOUT[numero.value] ?? DEFAULT_PODIO_LAYOUT)
</script>
