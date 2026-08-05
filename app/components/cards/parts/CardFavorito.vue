<template>
  <Button
    v-if="favorito?.visivel !== false"
    type="button"
    variant="ghost"
    size="icon"
    class="mt-1.5 shrink-0 hover:bg-transparent hover:opacity-80"
    :aria-label="ativo ? 'Remover dos favoritos' : 'Favoritar'"
    @click.stop="onToggle"
  >
    <Star
      class="size-6 transition-[transform,fill] duration-200"
      :class="[
        estrelaClass,
        popping ? 'animate-favorito-pop' : '',
      ]"
      :fill="ativo ? 'currentColor' : 'none'"
      :stroke-width="ativo ? 0 : 2"
    />
  </Button>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import type { CardFavorito as CardFavoritoData, CardGenericData } from '~/types/cards'

const props = defineProps<{
  favorito?: CardFavoritoData
  estrelaClass: string
  /** Identificador estável do torneio — obrigatório para persistir */
  slug?: string
  titulo?: string
  /** Snapshot completo do card (salvo no perfil) */
  card?: CardGenericData
}>()

const route = useRoute()
const { defaultUnity } = useUnidades()
const { isFavorito, toggleFavorito } = useFavoritosTorneios()

const ativo = computed(() => isFavorito(props.slug))
const popping = ref(false)
let popTimer: ReturnType<typeof setTimeout> | null = null

function onToggle() {
  if (!props.slug) return

  const result = toggleFavorito({
    slug: props.slug,
    titulo: props.titulo,
    card: props.card,
    unidadeSlug: (route.params.unidade as string | undefined) || defaultUnity.value || undefined,
  })

  if (result === true) {
    if (popTimer) clearTimeout(popTimer)
    popping.value = false
    nextTick(() => {
      popping.value = true
      popTimer = setTimeout(() => {
        popping.value = false
      }, 450)
    })
  }
}

onBeforeUnmount(() => {
  if (popTimer) clearTimeout(popTimer)
})
</script>

<style scoped>
@keyframes favorito-pop {
  0% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.4);
  }
  65% {
    transform: scale(0.88);
  }
  100% {
    transform: scale(1);
  }
}

.animate-favorito-pop {
  animation: favorito-pop 0.45s cubic-bezier(0.34, 1.45, 0.64, 1);
}
</style>
