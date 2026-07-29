<template>
  <div v-if="pending" class="container mx-auto px-4 py-20 text-center text-muted-foreground">
    Carregando torneio…
  </div>

  <div v-else-if="error || !detalhe" class="container mx-auto px-4 py-20 text-center">
    <p class="text-lg text-muted-foreground">Torneio não encontrado.</p>
  </div>

  <TorneioDetalheView v-else :detalhe="detalhe" />
</template>

<script setup lang="ts">
import type { TorneioDetalheData } from '~/types/torneio-detalhe'
import TorneioDetalheView from '~/components/torneio/TorneioDetalheView.vue'

const route = useRoute()
const api = useH2Api()

const unidadeSlug = computed(() => route.params.unidade as string)
const torneioSlug = computed(() => route.params.slug as string)

const { data: detalhe, pending, error } = await useAsyncData<TorneioDetalheData | null>(
  () => `torneio-detalhe-${unidadeSlug.value}-${torneioSlug.value}`,
  async () => {
    const result = await api.getTorneioDetalhe(unidadeSlug.value, torneioSlug.value)
    return result ?? null
  },
  { watch: [unidadeSlug, torneioSlug] },
)

useSeoMeta({
  title: () => detalhe.value?.titulo ?? 'Torneio',
})
</script>
