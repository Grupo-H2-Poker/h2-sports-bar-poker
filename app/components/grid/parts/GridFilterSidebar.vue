<template>
  <Drawer
    v-model:open="open"
    direction="right"
    :should-scale-background="false"
  >
    <DrawerContent
      class="bg-black border-black text-[#e7e7e7] inset-y-0 right-0 left-auto mt-0 h-full max-h-none w-full !max-w-[600px] data-[vaul-drawer-direction=right]:sm:!max-w-[600px] rounded-none"
    >
      <div class="flex h-full flex-col p-5">
        <div class="flex shrink-0 items-center justify-between pb-6">
          <h2 class="text-2xl font-bold text-[#e7e7e7]">
            {{ config?.titulo ?? 'Filtros' }}
          </h2>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            class="text-[#e7e7e7] hover:bg-transparent hover:opacity-70"
            aria-label="Fechar filtros"
            @click="open = false"
          >
            <CircleX class="size-6" />
          </Button>
        </div>

        <div class="flex-1 overflow-y-auto pb-6">
          <div
            v-for="(section, index) in config?.secoes ?? []"
            :key="section.id"
            :class="index > 0 ? 'mt-10' : ''"
          >
            <h3 class="mb-4 text-sm font-normal text-[#e7e7e7]">
              {{ section.titulo }}
            </h3>

            <div :class="sectionGridClass(section)">
              <GridFilterChip
                v-for="opcao in section.opcoes"
                :key="opcao.id"
                :label="opcao.label"
                :selected="isSelected(section.id, opcao.id)"
                :full-width="!!section.colunas"
                @click="emit('toggle', section.id, opcao.id)"
              />
            </div>

            <div
              v-for="sub in section.subsecoes ?? []"
              :key="sub.id"
              class="mt-6"
            >
              <h4 class="mb-3 text-sm font-normal text-[#e7e7e7]/70">
                {{ sub.titulo }}
              </h4>
              <div :class="sectionGridClass(sub)">
                <GridFilterChip
                  v-for="opcao in sub.opcoes"
                  :key="opcao.id"
                  :label="opcao.label"
                  :selected="isSelected(sub.id, opcao.id)"
                  :full-width="!!sub.colunas"
                  @click="emit('toggle', sub.id, opcao.id)"
                />
              </div>
            </div>
          </div>
        </div>

        <DrawerFooter class="shrink-0 flex-row gap-4 border-t border-white/10 p-0 pt-6">
          <Button
            type="button"
            variant="ghost"
            class="flex-1 rounded-full outline-smooth-green bg-transparent text-brand-green hover:bg-brand-green/10 hover:text-brand-green"
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
import { Button } from '~/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
} from '@/components/ui/drawer'
import type { GridFilterModal, GridFilterSection } from '~/types/grid'
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

const SECTION_GRID_CLASSES: Record<NonNullable<GridFilterSection['colunas']>, string> = {
  1: 'grid grid-cols-1 gap-3',
  2: 'grid grid-cols-2 gap-3',
  3: 'grid grid-cols-3 gap-3',
  4: 'grid grid-cols-4 gap-3',
  5: 'grid grid-cols-5 gap-3',
}

function sectionGridClass(section: GridFilterSection) {
  if (!section.colunas) return 'flex flex-wrap gap-3'
  return SECTION_GRID_CLASSES[section.colunas]
}
</script>
