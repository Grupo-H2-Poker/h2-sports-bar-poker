<template>
  <div class="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
    <Button
      v-if="config?.filtro?.label"
      variant="brand"
      class="w-full rounded-full px-6 sm:w-auto"
      @click="onFiltroClick"
    >
      {{ config.filtro.label }}
    </Button>

    <div
      v-if="buscaHabilitada"
      class="flex h-[46px] w-full items-center gap-2 rounded-full bg-[#373737] py-1.5 pl-5 pr-1.5 sm:w-[283px] sm:max-w-[283px]"
    >
      <Input
        :model-value="search"
        :placeholder="config?.busca?.placeholder ?? 'Pesquisar torneios'"
        class="h-full min-w-0 flex-1 rounded-none border-0 !bg-transparent px-0 py-0 text-sm text-[#e7e7e7] shadow-none placeholder:text-sm placeholder:italic placeholder:text-[#e7e7e7]/70 focus-visible:border-0 focus-visible:ring-0 dark:!bg-transparent"
        @update:model-value="emit('update:search', String($event ?? ''))"
      />
      <Button
        type="button"
        variant="brand"
        size="icon-sm"
        class="size-8 shrink-0 rounded-full shadow-none"
        aria-label="Pesquisar"
      >
        <Search class="size-4" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
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
