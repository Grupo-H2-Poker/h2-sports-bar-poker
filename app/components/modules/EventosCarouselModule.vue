<template>
  <section>
    <div class="container mx-auto px-4">
      <SectionCTA v-if="ctaConfig" :config="ctaConfig" />

      <br>

      <Carousel :opts="{ align: 'center', loop: true }" class="w-full">
        <CarouselContent>
          <CarouselItem
            v-for="item in eventos"
            :key="item.id"
            class="md:basis-2/3 lg:basis-1/2"
          >
            <div
              class="relative rounded-2xl overflow-hidden bg-muted min-h-[420px] cursor-pointer flex flex-col justify-end"
              @click="item.data.link && navigateTo(item.data.link)"
            >
              <img
                v-if="item.data.imagem"
                :src="item.data.imagem"
                :alt="item.data.titulo"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div class="relative z-10 p-8 text-center text-white flex flex-col items-center gap-3">
                <h3 class="text-2xl font-bold">{{ item.data.titulo }}</h3>
                <p v-if="item.data.descricao" class="text-sm opacity-90 max-w-sm leading-relaxed">
                  {{ item.data.descricao }}
                </p>
                <Button v-if="item.data.cta" variant="default" class="mt-1 bg-foreground text-background hover:bg-foreground/90">
                  {{ item.data.cta }}
                </Button>
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
import { Button } from '~/components/ui/button'
import SectionCTA from '~/components/modules/SectionCTA.vue'
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'eventos'>
}>()

const { ctaConfig, items: eventos } = useModuloComponents(() => props.modulo)
</script>
