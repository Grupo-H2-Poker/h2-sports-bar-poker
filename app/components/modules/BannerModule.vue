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
import type { Modulo, ComponentData, BannerData } from '~/types/modules'
import CardBanner from '~/components/cards/CardBanner.vue'

const props = defineProps<{
  modulo: Modulo<BannerData>
}>()

const sortedComponents = computed(() => {
  return [...props.modulo.components]
    .filter(c => c.status === 'publicado')
    .sort((a, b) => a.ordem - b.ordem)
})
</script>
