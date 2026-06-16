<template>
  <UnidadePaginaView :pagina-slug="paginaSlug" />
</template>

<script setup lang="ts">
import UnidadePaginaView from '~/components/pages/UnidadePaginaView.vue'

const route = useRoute()

const paginaSlug = computed(() => {
  const raw = route.params.pagina
  if (!raw) return undefined
  const segments = Array.isArray(raw) ? raw : [raw]
  return segments.filter(Boolean).join('/')
})
</script>
