<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-lg font-semibold tracking-tight sm:text-xl">
          {{ t('perfil.favorites.title') }}
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
          {{ t('perfil.favorites.emptyTitle') }}
        </p>
        <p class="text-sm text-muted-foreground">
          {{ t('perfil.favorites.emptyDescription') }}
        </p>
      </div>
      <Button
        v-if="agendaHref"
        variant="outline"
        size="sm"
        class="mt-1"
        @click="navigateTo(agendaHref)"
      >
        {{ t('perfil.favorites.viewAgenda') }}
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

const { t } = useI18n()
const { favoritos, toDisplayCard } = useFavoritosTorneios()
const { defaultUnity } = useUnidades()

const subtitle = computed(() => {
  const n = favoritos.value.length
  if (n === 0) return t('perfil.favorites.subtitleEmpty')
  if (n === 1) return t('perfil.favorites.subtitleOne')
  return t('perfil.favorites.subtitleMany', { n })
})

const agendaHref = computed(() => {
  const slug = defaultUnity.value
  return slug ? `/${slug}/agenda` : null
})
</script>
