<template>
  <Banner :dados="dados" />
</template>

<script setup lang="ts">
import Banner from '~/components/banner/Banner.vue'
import type { BannerData } from '~/types/banner'

defineProps<{
  dados: BannerData
}>()
</script>
