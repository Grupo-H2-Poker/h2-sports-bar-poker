<template>
  <div class="unidades-page">
    <main class="container mx-auto px-4 py-8">
      <h2 class="text-3xl font-bold mb-6">Nossas Unidades</h2>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="animate-pulse">
          <div class="bg-gray-200 dark:bg-gray-800 h-48 rounded-lg"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error"
        class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <p class="text-red-600 dark:text-red-300">{{ error.message }}</p>
      </div>

      <!-- Unidades List -->
      <div v-else-if="data" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink v-for="unidade in data" :key="unidade.id" :to="`/${unidade.slug}`"
          class="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div class="aspect-video bg-gray-200 dark:bg-gray-700 bg-cover bg-center relative"
            :style="unidade.logo ? `background-image: url('${unidade.logo}')` : ''">
            <div v-if="!unidade.logo" class="absolute inset-0 flex items-center justify-center">
              <span class="text-4xl font-bold text-gray-400">
                {{ unidade.nome.charAt(0) }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <h2
              class="text-2xl font-bold mb-2 group-hover:text-brand-purple transition-colors">
              {{ unidade.nome }}
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              Clique para ver mais
            </p>
          </div>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Unidade } from '~/types/modules'

const api = useH2Api()

const { data, pending, error } = await useAsyncData<Unidade[]>(
  'unidades-list',
  async () => {
    const result = await api.getUnidades()
    return result ?? []
  },
  {
    server: true,
    lazy: false
  }
)


useHead({
  title: 'Nossas Unidades',
  meta: [
    {
      name: 'description',
      content: 'Conheça todas as nossas unidades'
    }
  ]
})
</script>
