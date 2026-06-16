<template>
  <section class="overflow-x-clip">
    <FaixaCta
      v-for="component in sortedComponents"
      :key="component.id"
      :data="component.data"
    />
  </section>
</template>

<script setup lang="ts">
import FaixaCta from '~/components/faixa-cta/FaixaCta.vue'
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'faixa_cta'>
}>()

const sortedComponents = useSortedComponents(() => props.modulo)
</script>
