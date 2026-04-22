<template>
  <section class="py-8">
    <div class="container mx-auto px-4">
      <div class="flex gap-6 items-start">
        <div class="flex-shrink-0 flex flex-col gap-4 max-w-[220px]">
          <h2 class="text-xl font-bold leading-snug">
            {{ modulo.metadados?.titulo || 'Confira os próximos torneios de hoje:' }}
          </h2>
          <Button v-if="modulo.metadados?.cta_link" variant="default" size="sm" class="w-fit" @click="navigateTo(modulo.metadados.cta_link)">
            {{ modulo.metadados?.cta || 'Veja a agenda completa' }}
          </Button>
          <Button v-else variant="default" size="sm" class="w-fit">
            {{ modulo.metadados?.cta || 'Veja a agenda completa' }}
          </Button>
        </div>

        <div class="flex-1 overflow-x-auto">
          <div class="flex gap-3 pb-2">
            <CardAgenda
              v-for="component in sortedComponents"
              :key="component.id"
              :dados="component.data as any"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import type { Modulo, ComponentData } from '~/types/modules'
import CardAgenda from '~/components/cards/CardAgenda.vue'

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
