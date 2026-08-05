<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-lg font-semibold tracking-tight sm:text-xl">
          Torneios favoritos
        </h2>
        <p class="mt-1 text-sm text-muted-foreground">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <div
      v-if="!favoritos.length"
      class="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border/60 bg-card/40 px-6 py-12 text-center"
    >
      <div class="flex size-14 items-center justify-center rounded-full bg-muted/40">
        <Star class="size-7 text-muted-foreground" :stroke-width="1.5" />
      </div>
      <div class="max-w-sm space-y-2">
        <p class="text-base font-medium text-[#e7e7e7]">
          Nenhum torneio favoritado
        </p>
        <p class="text-sm text-muted-foreground">
          Na agenda, toque na estrela de um card para salvá-lo aqui e abrir o detalhe quando quiser.
        </p>
      </div>
      <Button
        v-if="agendaHref"
        variant="outline"
        size="sm"
        class="mt-1"
        @click="navigateTo(agendaHref)"
      >
        Ver agenda
      </Button>
    </div>

    <div
      v-else
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <CardGeneric
        v-for="entry in favoritos"
        :key="entry.slug"
        :dados="toDisplayCard(entry)"
        fill
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import CardGeneric from '~/components/cards/CardGeneric.vue'
import { Button } from '~/components/ui/button'

const { favoritos, toDisplayCard } = useFavoritosTorneios()
const { defaultUnity } = useUnidades()

const subtitle = computed(() => {
  const n = favoritos.value.length
  if (n === 0) return 'Seus torneios salvos aparecem nesta aba'
  if (n === 1) return '1 torneio salvo — clique no card para ver os detalhes'
  return `${n} torneios salvos — clique no card para ver os detalhes`
})

const agendaHref = computed(() => {
  const slug = defaultUnity.value
  return slug ? `/${slug}/agenda` : null
})
</script>
