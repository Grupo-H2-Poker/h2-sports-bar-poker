<template>
  <section class="banner-module">
    <div class="relative w-full">
      <CardBanner
        v-for="component in sortedComponents"
        :key="component.id"
        :dados="component.data"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ModuloOf } from '~/types/modules'
import CardBanner from '~/components/cards/CardBanner.vue'

const props = defineProps<{
  modulo: ModuloOf<'banner'>
}>()

const sortedComponents = useSortedComponents(() => props.modulo)
</script>
