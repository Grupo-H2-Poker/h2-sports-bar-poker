<template>
  <div class="unidade-page">
    <main class="min-h-screen">
      <div v-if="pending && !data" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4" />
          <p class="text-gray-600 dark:text-gray-400">{{ t('page.loading') }}</p>
        </div>
      </div>

      <div v-else-if="error && !data" class="container mx-auto px-4 py-12">
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <h2 class="text-2xl font-bold text-red-800 dark:text-red-200 mb-2">
            {{ t('page.loadErrorTitle') }}
          </h2>
          <p class="text-red-600 dark:text-red-300 mb-4">{{ error.message }}</p>
          <Button variant="destructive" @click="refresh()">
            {{ t('page.retry') }}
          </Button>
        </div>
      </div>

      <div v-else-if="data && !paginaAtual" class="container mx-auto px-4 py-12 text-center">
        <h2 class="text-2xl font-bold mb-2">{{ t('page.notFoundTitle') }}</h2>
        <p class="text-muted-foreground mb-4">{{ t('page.notFoundDescription') }}</p>
        <Button as-child>
          <NuxtLink :to="`/${unidadeSlug}`">{{ t('page.backHome') }}</NuxtLink>
        </Button>
      </div>

      <div v-else-if="data">
        <ModuleRenderer v-if="modulos.length > 0" :modulos="modulos" />

        <div v-else class="container mx-auto px-4 py-12 text-center">
          <p class="text-gray-600 dark:text-gray-400">
            {{ t('page.emptyContent') }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { UnidadeModulos } from '~/types/modules'
import ModuleRenderer from '~/components/modules/ModuleRenderer.vue'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  paginaSlug?: string
}>()

const route = useRoute()
const api = useH2Api()
const { t, locale } = useI18n()

const unidadeSlug = computed(() => route.params.unidade as string)

const { data, pending, error, refresh } = await useAsyncData<UnidadeModulos>(
  () => `unidade-${unidadeSlug.value}-${props.paginaSlug ?? 'home'}`,
  async () => {
    const result = await api.getUnidadeModulos(unidadeSlug.value, String(locale.value))
    if (!result) {
      throw createError({ statusCode: 404, message: t('page.unitNotFound') })
    }
    return result
  },
  { server: true, lazy: false, watch: [unidadeSlug, () => props.paginaSlug, locale] },
)

const { modulos, paginaAtual } = useUnidadePagina(data, () => props.paginaSlug)

function scrollToRouteHash() {
  const hash = route.hash?.replace(/^#/, '')
  if (!hash || import.meta.server) return

  const el = document.getElementById(hash)
  if (!el) return

  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

watch(
  [() => route.hash, () => pending.value, () => modulos.value.length],
  async ([hash, isPending, moduloCount]) => {
    if (!hash || isPending || moduloCount === 0) return
    await nextTick()
    // Aguarda layout/imagens do módulo ancorado
    requestAnimationFrame(() => {
      setTimeout(scrollToRouteHash, 50)
    })
  },
  { flush: 'post', immediate: true },
)

useHead({
  title: () => {
    const pagina = paginaAtual.value?.titulo
    const unidade = data.value?.unidade?.nome
    if (pagina && unidade) return `${pagina} | ${unidade}`
    return unidade ?? t('page.loadingShort')
  },
})
</script>
