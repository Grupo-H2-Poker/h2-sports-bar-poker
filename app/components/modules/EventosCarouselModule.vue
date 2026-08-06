<template>
  <section>
    <div class="container mx-auto px-4">
      <SectionCTA
        v-if="ctaConfig"
        :config="ctaConfig"
        inverted
      />

      <!-- Hero Eventos: grade de capas com título sobre a imagem -->
      <div
        v-if="isGrid"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        :class="ctaConfig && 'mt-10'"
      >
        <div
          v-for="item in eventos"
          :key="item.id"
          class="relative aspect-[346/400] cursor-pointer overflow-hidden rounded-lg"
          @click="item.data.link && navigateToEvento(item.data.link)"
        >
          <img
            v-if="item.data.imagem"
            :src="item.data.imagem"
            :alt="item.data.titulo"
            class="absolute inset-0 size-full object-cover"
            draggable="false"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div class="absolute inset-x-0 bottom-8 flex justify-center px-4 text-center">
            <h3 class="flex min-h-[76px] items-start justify-center whitespace-pre-line text-[32px] font-bold leading-[38px] text-[#e7e7e7]">
              {{ item.data.titulo }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Layout legado: carrossel shadcn -->
      <template v-else>
        <br v-if="ctaConfig">

        <Carousel
          :opts="{ align: 'center', loop: true }"
          class="w-full"
        >
          <CarouselContent>
            <CarouselItem
              v-for="item in eventos"
              :key="item.id"
              class="md:basis-2/3 lg:basis-1/2"
            >
              <div
                class="relative flex min-h-[420px] cursor-pointer flex-col justify-end overflow-hidden rounded-2xl bg-muted"
                @click="item.data.link && navigateToEvento(item.data.link)"
              >
                <img
                  v-if="item.data.imagem"
                  :src="item.data.imagem"
                  :alt="item.data.titulo"
                  class="absolute inset-0 size-full object-cover"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div class="relative z-10 flex flex-col items-center gap-3 p-8 text-center text-white">
                  <h3 class="text-2xl font-bold">
                    {{ item.data.titulo }}
                  </h3>
                  <p
                    v-if="item.data.descricao"
                    class="max-w-sm text-sm leading-relaxed opacity-90"
                  >
                    {{ item.data.descricao }}
                  </p>
                  <Button
                    v-if="item.data.cta"
                    variant="default"
                    class="mt-1 bg-foreground text-background hover:bg-foreground/90"
                  >
                    {{ item.data.cta }}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </template>
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

const isGrid = computed(() => props.modulo.metadados?.layout === 'grid')

const { navigateCta } = useModuloCtaNavigate()

function navigateToEvento(link: string) {
  navigateCta(link)
}
</script>
