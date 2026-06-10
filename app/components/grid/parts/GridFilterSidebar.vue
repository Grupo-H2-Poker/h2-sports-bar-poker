<template>
  <Drawer
    v-model:open="open"
    direction="right"
    :should-scale-background="false"
  >
    <DrawerContent
      class="bg-black border-black text-[#e7e7e7] inset-y-0 right-0 left-auto mt-0 h-full max-h-none w-full max-w-[519px] rounded-none"
    >
      <div class="flex h-full flex-col">
        <div class="relative shrink-0 px-8 pt-10 pb-6">
          <h2 class="text-center text-2xl font-bold text-[#e7e7e7]">
            {{ config?.titulo ?? 'Filtros' }}
          </h2>

          <button
            type="button"
            class="absolute top-8 right-8 text-[#e7e7e7] transition-opacity hover:opacity-70"
            aria-label="Fechar filtros"
            @click="open = false"
          >
            <CircleX class="size-6" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-8 pb-6">
          <div
            v-for="(section, index) in config?.secoes ?? []"
            :key="section.id"
            :class="index > 0 ? 'mt-10' : ''"
          >
            <h3 class="mb-4 text-xl font-medium text-[#e7e7e7]">
              {{ section.titulo }}
            </h3>

            <div class="flex flex-wrap gap-3">
              <GridFilterChip
                v-for="opcao in section.opcoes"
                :key="opcao.id"
                :label="opcao.label"
                :selected="isSelected(section.id, opcao.id)"
                @click="emit('toggle', section.id, opcao.id)"
              />
            </div>
          </div>
        </div>

        <DrawerFooter class="shrink-0 flex-row gap-4 border-t border-white/10 px-8 py-6">
          <Button
            type="button"
            variant="outline"
            class="flex-1 rounded-full border-brand-green bg-transparent text-brand-green hover:bg-brand-green/10 hover:text-brand-green"
            @click="emit('clear')"
          >
            {{ config?.limpar?.label ?? 'Limpar filtros' }}
          </Button>

          <Button
            type="button"
            variant="brand"
            class="flex-1 rounded-full"
            @click="emit('apply')"
          >
            {{ config?.aplicar?.label ?? 'Filtrar' }}
          </Button>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">
import { CircleX } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
} from '@/components/ui/drawer'
import type { GridFilterModal } from '~/types/grid'
import GridFilterChip from '~/components/grid/parts/GridFilterChip.vue'

defineProps<{
  config?: GridFilterModal
  isSelected: (sectionId: string, optionId: string) => boolean
}>()

const open = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  toggle: [sectionId: string, optionId: string]
  apply: []
  clear: []
}>()
</script>
