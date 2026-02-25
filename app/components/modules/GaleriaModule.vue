<template>
  <section class="galeria-module py-8">
    <div class="container mx-auto px-4">
      <h2 v-if="modulo.metadados?.titulo" class="text-3xl font-bold mb-6">
        {{ modulo.metadados.titulo }}
      </h2>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <CardGaleria
          v-for="component in sortedComponents"
          :key="component.id"
          :dados="component.data"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Modulo, ComponentData } from '~/types/modules'
import CardGaleria from '~/components/cards/CardGaleria.vue'

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
