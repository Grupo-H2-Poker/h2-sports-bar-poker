<template>
  <UnidadePaginaView :pagina-slug="paginaSlug" />
</template>

<script setup lang="ts">
import UnidadePaginaView from '~/components/pages/UnidadePaginaView.vue'

const route = useRoute()
const paginaSlug = computed(() => route.params.pagina as string)
</script>
