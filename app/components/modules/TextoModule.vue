<template>
  <section class="texto-module py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      <div
        v-for="component in sortedComponents"
        :key="component.id"
        class="prose dark:prose-invert max-w-none mb-6"
      >
        <h2 v-if="component.data.titulo">{{ component.data.titulo }}</h2>
        <div v-html="component.data.conteudo" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Modulo, ComponentData } from '~/types/modules'

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
