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
      class="relative flex w-full sm:w-[283px] sm:max-w-[283px] items-center"
    >
      <Input
        :model-value="search"
        :placeholder="config?.busca?.placeholder ?? 'Pesquisar torneios'"
        class="h-[46px] w-full rounded-full border-0 !bg-[#373737] dark:!bg-[#373737] pl-5 pr-12 text-sm text-[#e7e7e7] shadow-none placeholder:text-sm placeholder:italic placeholder:text-[#e7e7e7]/70 focus-visible:border-0 focus-visible:ring-0"
        @update:model-value="emit('update:search', String($event ?? ''))"
      />
      <button
        type="button"
        class="absolute right-[7px] flex size-8 items-center justify-center rounded-full bg-brand-green text-black shadow-[0_2px_0_rgba(5,145,255,0.1)]"
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
