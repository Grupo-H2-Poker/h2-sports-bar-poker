<script setup lang="ts">
const { defaultUnity, fetchUnidades, hasUnidades } = useUnidades()

const error = ref<string | null>(null)

try {
  // Garante que as unidades sejam carregadas antes de redirecionar
  await fetchUnidades()

  // Aguarda o computed ser atualizado
  await nextTick()

  // Verifica se há unidades disponíveis
  if (!hasUnidades.value) {
    error.value = 'Nenhuma unidade disponível no momento'
  } else if (defaultUnity.value) {
    // Redireciona para a unidade padrão
    await navigateTo(`/${defaultUnity.value}`, { replace: true })
  } else {
    error.value = 'Não foi possível determinar a unidade padrão'
  }
} catch (err) {
  console.error('Erro ao carregar unidades:', err)
  error.value = 'Erro ao carregar as unidades. Tente novamente.'
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div v-if="error" class="text-center max-w-md px-4">
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <h2 class="text-xl font-bold text-red-800 dark:text-red-200 mb-2">
          Erro
        </h2>
        <p class="text-red-600 dark:text-red-300 mb-4">{{ error }}</p>
        <button 
          @click="() => { error = null; fetchUnidades(true) }"
          class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
    
    <div v-else class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4">
      </div>
      <p class="text-gray-600 dark:text-gray-400">Carregando unidades...</p>
    </div>
  </div>
</template>