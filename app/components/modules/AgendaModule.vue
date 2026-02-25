<template>
  <section class="agenda-module py-8">
    <div class="container mx-auto px-4">
      <h2 v-if="modulo.metadados?.titulo" class="text-3xl font-bold mb-6">
        {{ modulo.metadados.titulo }}
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardAgenda
          v-for="component in sortedComponents"
          :key="component.id"
          :dados="component.data as any"
        />
      </div>
      
      <div v-if="sortedComponents.length === 0" class="text-center py-12 text-gray-500">
        Nenhum evento agendado no momento
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Modulo, ComponentData } from '~/types/modules'
import CardAgenda from '../cards/CardAgenda.vue'

interface Props {
  modulo: Modulo
  data: ComponentData[]
}

const props = defineProps<Props>()

const sortedComponents = computed(() => {
  return [...props.data]
    .filter(c => c.status === 'publicado')
    .sort((a, b) => a.ordem - b.ordem)
})
</script>
