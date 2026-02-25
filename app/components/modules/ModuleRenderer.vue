<template>
  <div class="module-renderer">
    <component
      v-for="modulo in sortedModulos"
      :key="modulo.id"
      :is="getModuleComponent(modulo.tipo)"
      :modulo="modulo"
      :data="modulo.components"
      class="module-wrapper"
    />
  </div>
</template>

<script setup lang="ts">
import type { Modulo } from '~/types/modules'
import AgendaModule from '~/components/modules/AgendaModule.vue'
import BannerModule from '~/components/modules/BannerModule.vue'
import GaleriaModule from '~/components/modules/GaleriaModule.vue'
import TextoModule from '~/components/modules/TextoModule.vue'

interface Props {
  modulos: Modulo[]
}

const props = defineProps<Props>()

// Mapa de tipos de módulos para componentes
const moduloMapa: Record<string, any> = {
  'agenda': AgendaModule,
  'banner': BannerModule,
  'galeria': GaleriaModule,
  'texto': TextoModule,
}

// Ordena módulos pela ordem definida no CMS
const sortedModulos = computed(() => {
  return [...props.modulos]
    .filter(m => m.status === 'publicado')
    .sort((a, b) => a.ordem - b.ordem)
})

// Retorna o componente correto ou um fallback
const getModuleComponent = (tipo: string) => {
  const component = moduloMapa[tipo]
  
  if (!component) {
    console.warn(`Módulo tipo "${tipo}" não encontrado. Usando fallback.`)
    // Retorna um componente de fallback simples
    return {
      props: ['modulo', 'data'],
      template: `
        <div class="p-4 border border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p class="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ Módulo tipo "{{ modulo.tipo }}" não implementado
          </p>
        </div>
      `
    }
  }
  
  return component
}
</script>

<style scoped>
.module-renderer {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.module-wrapper {
  width: 100%;
}
</style>
