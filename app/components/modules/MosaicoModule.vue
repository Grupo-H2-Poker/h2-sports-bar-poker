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
          class="relative aspect-square overflow-hidden rounded-lg"
          :style="cellStyle(cell.data)"
          :class="cell.link && 'cursor-pointer transition hover:brightness-110'"
        >
          <img
            v-if="cell.data.imagem"
            :src="cell.data.imagem"
            :alt="cell.data.titulo || ''"
            class="absolute inset-0 size-full object-cover"
            draggable="false"
          >
          <div
            v-if="cell.data.titulo"
            class="relative z-10 flex size-full items-center justify-center p-6 text-center"
          >
            <p class="whitespace-pre-line text-[28px] font-bold leading-7 text-[#e7e7e7]">
              {{ cell.data.titulo }}
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
    case 3: return 'grid-cols-2 md:grid-cols-3'
    default: return 'grid-cols-2 md:grid-cols-4'
  }
})

function cellStyle(data: MosaicoCelulaData) {
  if (data.background) return { background: data.background }
  if (!data.imagem) return { background: '#77158e' }
  return undefined
}
</script>
