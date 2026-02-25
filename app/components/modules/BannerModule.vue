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
import type { Modulo, ComponentData } from '~/types/modules'
import CardBanner from '~/components/cards/CardBanner.vue'

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
