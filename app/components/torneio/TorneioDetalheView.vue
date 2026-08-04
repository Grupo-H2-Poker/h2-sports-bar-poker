<template>
  <div class="pb-16">
    <div class="container mx-auto px-4 pt-10">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_343px] lg:gap-16">
        <!-- Coluna esquerda: specs -->
        <div class="min-w-0">
          <h1 class="text-[30px] font-bold leading-[50px] text-[#e7e7e7]">
            {{ detalhe.titulo }}
          </h1>
          <p v-if="detalhe.data_label" class="mt-1 text-base font-medium text-[#e7e7e7]">
            {{ detalhe.data_label }}
          </p>

          <div class="mt-8 flex flex-col">
            <div
              v-for="(group, gi) in detalhe.specs"
              :key="gi"
              class="border-b border-white/15 py-4 first:pt-0"
            >
              <div class="flex flex-col gap-3">
                <div
                  v-for="(spec, si) in group.items"
                  :key="`${spec.label}-${si}`"
                  class="flex items-baseline gap-x-20 sm:gap-x-32"
                >
                  <span class="w-[7.5rem] shrink-0 text-xl font-bold text-[#e7e7e7] sm:w-[8.5rem]">
                    {{ spec.label }}
                  </span>
                  <span class="min-w-0 text-left text-lg text-[#e7e7e7]">
                    <span>{{ formatValor(spec.valor).main }}</span>
                    <span
                      v-if="formatValor(spec.valor).rest"
                      class="italic text-[#e7e7e7]/80"
                    >{{ formatValor(spec.valor).rest }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p
            v-if="detalhe.nota"
            class="mt-6 max-w-[584px] text-base leading-7 text-[#d6d6d6] transition-colors hover:text-white"
          >
            {{ detalhe.nota }}
          </p>

          <NuxtLink
            :to="blindsHref"
            class="mt-8 flex h-14 w-full max-w-[589px] items-center justify-center rounded bg-white/10 px-6 text-center text-base text-[#e7e7e7] underline underline-offset-2 hover:bg-white/15 cursor-pointer"
          >
            Acesse aqui a tabela de blinds
          </NuxtLink>
        </div>

        <!-- Coluna direita: CTA card -->
        <div class="lg:pt-2">
          <CardTorneioDetalheLayout
            :dados="detalhe.card"
            :active="true"
            largura="w-full max-w-[343px] mx-auto lg:mx-0"
          />
        </div>
      </div>
    </div>

    <div v-if="detalhe.faixa_cta" class="mt-16">
      <FaixaCta :data="detalhe.faixa_cta" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TorneioDetalheData } from '~/types/torneio-detalhe'
import CardTorneioDetalheLayout from '~/components/cards/layouts/CardTorneioDetalheLayout.vue'
import FaixaCta from '~/components/faixa-cta/FaixaCta.vue'

const props = defineProps<{
  detalhe: TorneioDetalheData
}>()

const route = useRoute()

/** Separa "R$350,00 ou 17.000 pontos…" para o trecho após "ou" em itálico (Figma). */
function formatValor(valor: string): { main: string, rest: string | null } {
  const match = valor.match(/^(.*?)\s+(ou\s+.+)$/i)
  if (!match) return { main: valor, rest: null }
  return { main: match[1], rest: ` ${match[2]}` }
}

const blindsHref = computed(() => {
  const unidadeSlug = route.params.unidade as string | undefined
  const link = props.detalhe.blinds_link
    ?? `torneios/${props.detalhe.slug}/blinds`
  if (!unidadeSlug) return `/${link}`
  return resolveUnidadeHref(unidadeSlug, link)
})
</script>
