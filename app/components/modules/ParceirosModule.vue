<template>
  <section>
    <div class="container mx-auto px-4">
      <div class="flex w-full items-center justify-between gap-2">
        <component
          :is="logo.data.link ? 'a' : 'div'"
          v-for="logo in items"
          :key="logo.id"
          :href="logo.data.link || undefined"
          class="size-[71px] shrink-0 overflow-hidden rounded bg-[#d9d9d9]/20"
          :class="logo.data.link && 'transition hover:opacity-80'"
        >
          <img
            v-if="logo.data.imagem"
            :src="logo.data.imagem"
            :alt="logo.data.alt || ''"
            class="size-full object-contain p-2"
            draggable="false"
          >
        </component>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'parceiros'>
}>()

const { items } = useModuloComponents(() => props.modulo)
</script>
