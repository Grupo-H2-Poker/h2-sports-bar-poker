<template>
  <div class="unidade-page">
    <main class="min-h-screen">
      <!-- Loading State -->
      <div v-if="pending" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4">
          </div>
          <p class="text-gray-600 dark:text-gray-400">Carregando conteúdo...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="container mx-auto px-4 py-12">
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <h2 class="text-2xl font-bold text-red-800 dark:text-red-200 mb-2">
            Erro ao carregar conteúdo
          </h2>
          <p class="text-red-600 dark:text-red-300 mb-4">{{ error.message }}</p>
          <Button variant="destructive" @click="refresh()">
            Tentar novamente
          </Button>
        </div>
      </div>

      <!-- Content -->
      <div v-else-if="data">
        
        <!-- Módulos Dinâmicos -->
        <ModuleRenderer v-if="data.modulos && data.modulos.length > 0" :modulos="data.modulos" />

        <div v-else class="container mx-auto px-4 py-12 text-center">
          <p class="text-gray-600 dark:text-gray-400">
            Nenhum conteúdo disponível para esta unidade no momento.
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

const route = useRoute()
const api = useH2Api()

// Busca os dados da unidade e seus módulos
const { data, pending, error, refresh } = await useAsyncData<UnidadeModulos>(
  `unidade-${route.params.unidade}`,
  async () => {
    const result = await api.getUnidadeModulos(route.params.unidade as string)
    if (!result) {
      throw createError({
        statusCode: 404,
        message: 'Unidade não encontrada'
      })
    }
    return result
  },
  {
    server: true,
    lazy: false
  }
)

// SEO Meta tags dinâmicos
useHead({
  title: () => data.value?.unidade?.nome || 'Carregando...',
  meta: [
    {
      name: 'description',
      content: () => `Página da unidade ${data.value?.unidade?.nome || ''}`
    }
  ]
})

// Tratamento de erro 404
if (error.value?.statusCode === 404) {
  throw createError({
    statusCode: 404,
    message: 'Unidade não encontrada',
    fatal: true
  })
}
</script>
