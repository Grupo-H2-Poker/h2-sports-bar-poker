<template>
  <Button
    v-if="favorito?.visivel !== false"
    type="button"
    variant="ghost"
    size="icon"
    class="shrink-0 hover:bg-transparent hover:opacity-80"
    :aria-label="favorito?.ativo ? 'Remover dos favoritos' : 'Favoritar'"
    @click.stop="$emit('toggle')"
  >
    <Star
      class="size-6"
      :class="estrelaClass"
      :fill="favorito?.ativo !== false ? 'currentColor' : 'none'"
      :stroke-width="favorito?.ativo !== false ? 0 : 2"
    />
  </Button>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import type { CardFavorito as CardFavoritoData } from '~/types/cards'

defineProps<{
  favorito?: CardFavoritoData
  estrelaClass: string
}>()

defineEmits<{
  toggle: []
}>()
</script>
