<template>
  <button
    v-if="favorito?.visivel !== false"
    type="button"
    class="shrink-0 transition-opacity hover:opacity-80"
    :aria-label="favorito?.ativo ? 'Remover dos favoritos' : 'Favoritar'"
    @click.stop="$emit('toggle')"
  >
    <Star
      class="size-6"
      :class="estrelaClass"
      :fill="favorito?.ativo !== false ? 'currentColor' : 'none'"
      :stroke-width="favorito?.ativo !== false ? 0 : 2"
    />
  </button>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import type { CardFavorito as CardFavoritoData } from '~/types/cards'

defineProps<{
  favorito?: CardFavoritoData
  estrelaClass: string
}>()

defineEmits<{
  toggle: []
}>()
</script>
