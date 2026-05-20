<template>
  <section class="bg-muted py-24">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-2xl font-bold">
        {{ modulo.metadados?.titulo || 'Embaixadores H2' }}
      </h2>

      <div v-if="sortedComponents.length" class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="item in sortedComponents"
          :key="item.id"
          class="flex flex-col items-center gap-3"
        >
          <div class="w-24 h-24 rounded-full bg-muted-foreground/20 overflow-hidden">
            <img v-if="item.data.foto" :src="item.data.foto" :alt="item.data.nome" class="w-full h-full object-cover" />
          </div>
          <p class="text-sm font-medium">{{ item.data.nome }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'embaixadores'>
}>()

const sortedComponents = useSortedComponents(() => props.modulo)
</script>
