<template>
  <section class="overflow-x-clip">
    <div class="container mx-auto px-4">
      <div
        class="grid gap-4"
        :class="gridClass"
      >
        <component
          :is="cell.link ? 'a' : 'div'"
          v-for="cell in cells"
          :key="cell.id"
          :href="cell.link || undefined"
          class="relative overflow-hidden rounded-lg"
          :class="[
            isTextOnly(cell.data) ? 'aspect-square' : 'aspect-square',
            cell.link && 'cursor-pointer transition hover:brightness-110',
          ]"
          :style="cellStyle(cell.data)"
        >
          <img
            v-if="cell.data.imagem"
            :src="cell.data.imagem"
            :alt="cell.data.titulo || ''"
            class="absolute inset-0 size-full object-cover"
            draggable="false"
          >
          <div
            v-if="cell.data.imagem && cell.data.titulo"
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
          />

          <div
            v-if="cell.data.titulo || cell.data.descricao"
            class="relative z-10 flex size-full p-6 text-[#e7e7e7]"
            :class="cell.data.imagem
              ? 'items-end justify-center pb-8 text-center'
              : 'flex-col items-center justify-center gap-3 text-center'"
          >
            <p
              v-if="cell.data.titulo"
              class="whitespace-pre-line font-bold text-[#e7e7e7]"
              :class="cell.data.imagem
                ? 'text-[28px] leading-7'
                : 'text-[40px] leading-[50px]'"
            >
              {{ cell.data.titulo }}
            </p>
            <p
              v-if="cell.data.descricao"
              class="whitespace-pre-line text-lg font-medium leading-7 opacity-90"
            >
              {{ cell.data.descricao }}
            </p>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MosaicoCelulaData } from '~/types/eventos-page'
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'mosaico'>
}>()

const { items } = useModuloComponents(() => props.modulo)

const cells = computed(() => items.value)

const colunas = computed(() => props.modulo.metadados?.colunas ?? 4)

const gridClass = computed(() => {
  switch (colunas.value) {
    case 2: return 'grid-cols-2'
    case 3: return 'grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-10'
    default: return 'grid-cols-2 md:grid-cols-4'
  }
})

function isTextOnly(data: MosaicoCelulaData) {
  return !data.imagem
}

function cellStyle(data: MosaicoCelulaData) {
  if (data.background === 'transparent') return { background: 'transparent' }
  if (data.background) return { background: data.background }
  if (!data.imagem) return { background: '#77158e' }
  return undefined
}
</script>
