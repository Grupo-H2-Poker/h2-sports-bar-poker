<template>
  <div v-if="pending" class="container mx-auto px-4 py-20 text-center text-muted-foreground">
    Carregando tabela de blinds…
  </div>

  <div v-else-if="error || !blinds" class="container mx-auto px-4 py-20 text-center">
    <p class="text-lg text-muted-foreground">Tabela de blinds não encontrada.</p>
  </div>

  <TorneioBlindsView v-else :blinds="blinds" />
</template>

<script setup lang="ts">
import type { TorneioBlindsData } from '~/types/torneio-blinds'
import TorneioBlindsView from '~/components/torneio/TorneioBlindsView.vue'

const route = useRoute()
const api = useH2Api()

const unidadeSlug = computed(() => route.params.unidade as string)
const torneioSlug = computed(() => route.params.slug as string)

const { data: blinds, pending, error } = await useAsyncData<TorneioBlindsData | null>(
  () => `torneio-blinds-${unidadeSlug.value}-${torneioSlug.value}`,
  async () => {
    const result = await api.getTorneioBlinds(unidadeSlug.value, torneioSlug.value)
    return result ?? null
  },
  { watch: [unidadeSlug, torneioSlug] },
)

useSeoMeta({
  title: () => blinds.value ? `Tabela de Blinds — ${blinds.value.titulo}` : 'Tabela de Blinds',
})
</script>
