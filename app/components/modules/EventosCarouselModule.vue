<template>
  <section>
    <div class="container mx-auto px-4">
      <SectionCTA
        v-if="ctaConfig"
        :config="ctaConfig"
        inverted
      />

      <!-- Hero Eventos / Unique Tour: grade de capas -->
      <div
        v-if="isGrid"
        class="grid grid-cols-1 gap-6"
        :class="[gridColsClass, ctaConfig && 'mt-10']"
      >
        <div
          v-for="item in eventos"
          :key="item.id"
          class="relative cursor-pointer overflow-hidden rounded-lg"
          :class="isRichCard(item.data) ? 'aspect-[573/365]' : 'aspect-[346/400]'"
          @click="item.data.link && navigateToEvento(item.data.link)"
        >
          <img
            v-if="item.data.imagem"
            :src="item.data.imagem"
            :alt="item.data.titulo"
            class="absolute inset-0 size-full object-cover"
            :style="item.data.imagem_position
              ? { objectPosition: item.data.imagem_position }
              : undefined"
            draggable="false"
          >
          <div
            class="absolute inset-0"
            :class="isRichCard(item.data)
              ? 'bg-gradient-to-r from-black/55 via-black/25 to-transparent'
              : 'bg-gradient-to-t from-black/70 via-transparent to-transparent'"
          />

          <!-- Card rico: título + descrição + CTA (Unique Poker Tour) -->
          <div
            v-if="isRichCard(item.data)"
            class="absolute inset-0 z-10 flex flex-col items-start justify-center gap-3 p-8 text-[#e7e7e7] md:p-10"
          >
            <h3 class="text-[30px] leading-[45px] text-[#e7e7e7]">
              <template v-if="richTitleParts(item.data.titulo).eyebrow">
                <span class="font-normal">{{ richTitleParts(item.data.titulo).eyebrow }}</span>
                <br>
              </template>
              <span class="font-bold">{{ richTitleParts(item.data.titulo).rest }}</span>
            </h3>
            <p
              v-if="item.data.descricao"
              class="max-w-[378px] text-lg font-medium leading-7 opacity-90"
            >
              {{ item.data.descricao }}
            </p>
            <div v-if="item.data.cta" class="pt-1">
              <Button
                variant="brand"
                size="default"
                class="rounded-full"
                @click.stop="item.data.link && navigateToEvento(item.data.link)"
              >
                {{ item.data.cta }}
              </Button>
            </div>
          </div>

          <!-- Card simples: só título (hero Eventos) -->
          <div
            v-else
            class="absolute inset-x-0 bottom-8 flex justify-center px-4 text-center"
          >
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
import type { EventoData, ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'eventos'>
}>()

const { ctaConfig, items: eventos } = useModuloComponents(() => props.modulo)

const isGrid = computed(() => props.modulo.metadados?.layout === 'grid')

const gridColsClass = computed(() => {
  const cols = props.modulo.metadados?.colunas ?? 3
  return cols === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
})

function isRichCard(data: EventoData) {
  return !!(data.descricao || data.cta)
}

function richTitleParts(titulo: string) {
  const lines = titulo.split('\n')
  if (lines.length === 1) {
    return { eyebrow: undefined as string | undefined, rest: titulo }
  }
  return {
    eyebrow: lines[0],
    rest: lines.slice(1).join('\n'),
  }
}

const { navigateCta } = useModuloCtaNavigate()

function navigateToEvento(link: string) {
  navigateCta(link)
}
</script>
