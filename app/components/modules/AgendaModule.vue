<template>
  <section class="py-10">
    <div class="container mx-auto px-4">
      <div class="flex gap-18 items-center">
        <div class="flex-shrink-0 flex flex-col gap-10 w-[220px]">
          <div>
            <h2 class="text-2xl font-bold leading-snug">
              {{ modulo.metadados?.titulo }}
            </h2>
            <span v-if="modulo.metadados?.descricao" class="opacity-70">{{ modulo.metadados?.descricao }}</span>
          </div>
        
          <Button
            variant="brand"
            size="lg"
            class="rounded-full"
            @click="modulo.metadados?.cta_link ? navigateTo(modulo.metadados.cta_link) : undefined" >
            {{ modulo.metadados?.cta || 'Veja a agenda completa' }}
          </Button>
        </div>

        <div class="flex-1 overflow-x-auto scrollbar-none">
          <div class="flex gap-4 pb-1">
            <CardAgenda
              v-for="component in sortedComponents"
              :key="component.id"
              :dados="component.data as any"
              :active="component.id === activeId"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Modulo, ComponentData } from '~/types/modules'
import CardAgenda from '~/components/cards/CardAgenda.vue'
import { Button } from '@/components/ui/button'

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

const activeId = computed(() => {
  const now = new Date()
  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  let bestId: number | null = null
  let bestDiff = Infinity
  let bestFutureDiff = Infinity
  let bestFutureId: number | null = null

  for (const component of sortedComponents.value) {
    const inicio = (component.data as any)?.inicio as string | undefined
    if (!inicio) continue

    const parts = inicio.split(':')
    const h = parseInt(parts[0] ?? '', 10)
    const m = parseInt(parts[1] ?? '', 10)
    if (isNaN(h) || isNaN(m)) continue

    const cardMinutes = h * 60 + m
    const diff = cardMinutes - nowMinutes

    if (diff >= 0 && diff < bestFutureDiff) {
      bestFutureDiff = diff
      bestFutureId = component.id
    }

    if (Math.abs(diff) < bestDiff) {
      bestDiff = Math.abs(diff)
      bestId = component.id
    }
  }

  return bestFutureId ?? bestId
})
</script>
