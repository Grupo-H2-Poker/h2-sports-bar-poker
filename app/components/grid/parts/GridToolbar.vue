<template>
  <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
    <Button
      v-if="config?.filtro?.label"
      variant="brand"
      class="rounded-full px-6"
      @click="onFiltroClick"
    >
      {{ config.filtro.label }}
    </Button>

    <div
      v-if="buscaHabilitada"
      class="relative flex items-center min-w-[240px] sm:min-w-[320px]"
    >
      <Input
        :model-value="search"
        :placeholder="config?.busca?.placeholder ?? 'Pesquisar'"
        class="rounded-full h-11 pl-5 pr-14 bg-muted/40 border-0 shadow-none"
        @update:model-value="emit('update:search', String($event ?? ''))"
      />
      <button
        type="button"
        class="absolute right-1.5 flex size-9 items-center justify-center rounded-full bg-brand-green text-black"
        aria-label="Pesquisar"
      >
        <Search class="size-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { GridToolbarData } from '~/types/grid'

const props = defineProps<{
  config?: GridToolbarData
  search?: string
}>()

const emit = defineEmits<{
  'update:search': [value: string]
  'open-filtros': []
}>()

const buscaHabilitada = computed(() => props.config?.busca?.habilitado !== false)

function onFiltroClick() {
  if (props.config?.filtro?.modal) {
    emit('open-filtros')
    return
  }

  const link = props.config?.filtro?.link
  if (link) navigateTo(link)
}
</script>
