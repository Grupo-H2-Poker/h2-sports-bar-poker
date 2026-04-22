<template>
  <section class="py-8">
    <div class="container mx-auto px-4">
      <h2 v-if="modulo.metadados?.titulo" class="text-2xl font-bold mb-6">
        {{ modulo.metadados.titulo }}
      </h2>

      <Carousel :opts="{ align: 'start', loop: false }" class="w-full">
        <CarouselContent class="-ml-4">
          <CarouselItem
            v-for="component in sortedComponents"
            :key="component.id"
            class="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <div
              class="rounded-xl overflow-hidden bg-muted cursor-pointer group"
              @click="component.data.link && navigateTo(component.data.link)"
            >
              <div class="aspect-[3/4] bg-muted overflow-hidden">
                <img
                  v-if="component.data.imagem"
                  :src="component.data.imagem"
                  :alt="component.data.titulo || ''"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div class="p-4">
                <h3 class="font-bold text-base mb-1">{{ component.data.titulo }}</h3>
                <p v-if="component.data.descricao" class="text-sm text-muted-foreground line-clamp-2">
                  {{ component.data.descricao }}
                </p>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel'
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
