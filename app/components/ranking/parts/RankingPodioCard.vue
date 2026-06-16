<template>
  <div class="relative h-[220px] w-full min-w-0">
    <img
      :src="rankImage"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute bottom-0 left-0 h-[220px] w-[220px] select-none object-contain object-left-bottom"
    >

    <div
      class="absolute bottom-0 right-0 z-10 flex h-[220px] w-[130px] flex-col justify-end overflow-hidden rounded-md"
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

      <div class="relative z-10 flex flex-col gap-1 p-2">
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
</script>
