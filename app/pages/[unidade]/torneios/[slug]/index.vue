<template>
  <div v-if="pending && !detalhe" class="container mx-auto px-4 py-20 text-center text-muted-foreground">
    {{ t('torneio.loading') }}
  </div>

  <div v-else-if="(error || !detalhe) && !pending" class="container mx-auto px-4 py-20 text-center">
    <p class="text-lg text-muted-foreground">{{ t('torneio.notFound') }}</p>
  </div>

  <TorneioDetalheView v-else-if="detalhe" :detalhe="detalhe" />
</template>

<script setup lang="ts">
import type { TorneioDetalheData } from '~/types/torneio-detalhe'
import TorneioDetalheView from '~/components/torneio/TorneioDetalheView.vue'

const route = useRoute()
const api = useH2Api()
const { t, locale } = useI18n()

const unidadeSlug = computed(() => route.params.unidade as string)
const torneioSlug = computed(() => route.params.slug as string)

const { data: detalhe, pending, error } = await useAsyncData<TorneioDetalheData | null>(
  () => `torneio-detalhe-${unidadeSlug.value}-${torneioSlug.value}`,
  async () => {
    const result = await api.getTorneioDetalhe(
      unidadeSlug.value,
      torneioSlug.value,
      String(locale.value),
    )
    return result ?? null
  },
  { watch: [unidadeSlug, torneioSlug, locale] },
)

useSeoMeta({
  title: () => detalhe.value?.titulo ?? 'Torneio',
})
</script>
