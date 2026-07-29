<template>
  <section>
    <div class="container mx-auto px-4">
      <GridPageHeader
        :cta-config="ctaConfig"
        :toolbar-config="toolbarConfig"
        :active-filter-sections="activeSections"
        v-model:search="searchQuery"
        @open-filtros="openFilters"
        @remove-filter="removeAppliedOption"
        @clear-filters="clearAll"
      />

      <GridFilterSidebar
        v-if="filterModalConfig"
        v-model:open="isFilterOpen"
        :config="filterModalConfig"
        :is-selected="isDraftSelected"
        @toggle="toggleDraftOption"
        @apply="applyFilters"
        @clear="clearDraft"
      />

      <GridDiaGrouped
        v-if="diaGroups?.length"
        :config="gridConfig"
        :groups="diaGroups"
      />

      <GridGeneric
        v-else-if="filteredItems.length && diaGroups === null"
        :config="gridConfig"
        :items="filteredItems"
      />

      <p
        v-else-if="items.length"
        class="text-center text-muted-foreground py-12"
      >
        {{ emptyStateMessage }}
      </p>
    </div>

    <CashGameFilaModal />
  </section>
</template>

<script setup lang="ts">
import type { CardGenericData } from '~/types/cards'
import type { GridFilterModal } from '~/types/grid'
import type { ComponentData, ModuloContentDataMap, ModuloOf } from '~/types/modules'
import GridGeneric from '~/components/grid/GridGeneric.vue'
import GridDiaGrouped from '~/components/grid/GridDiaGrouped.vue'
import GridFilterSidebar from '~/components/grid/parts/GridFilterSidebar.vue'
import GridPageHeader from '~/components/grid/parts/GridPageHeader.vue'
import CashGameFilaModal from '~/components/cash-game/CashGameFilaModal.vue'
import { buildDiaFilterOptions } from '~/utils/agenda-dias'

type GridItem = ComponentData<ModuloContentDataMap['grid']>

const props = defineProps<{
  modulo: ModuloOf<'grid'>
}>()

const route = useRoute()

const { ctaConfig, toolbarConfig, gridConfig, items } = useGridModule(() => props.modulo)

/** Seção Dia montada no client a partir de `card.data` (labels inteligentes).
 * Demais seções: só opções que existem nos cards (evita filtro sem resultado). */
const filterModalConfig = computed((): GridFilterModal | undefined => {
  const modal = toolbarConfig.value?.filtro?.modal
  if (!modal) return undefined

  const cards = items.value.map(item => item.data as CardGenericData)

  const datas = cards
    .map(card => card.data)
    .filter((d): d is string => Boolean(d))

  const valuesBySection = new Map<string, Set<string>>()
  for (const card of cards) {
    for (const [key, value] of Object.entries(card.filtros ?? {})) {
      if (!value) continue
      if (!valuesBySection.has(key)) valuesBySection.set(key, new Set())
      valuesBySection.get(key)!.add(String(value).trim().toLowerCase())
    }
    if (card.data) {
      if (!valuesBySection.has('dia')) valuesBySection.set('dia', new Set())
      valuesBySection.get('dia')!.add(card.data.trim().toLowerCase())
    }
  }

  const secoesBase = modal.secoes
    .filter(s => s.id !== 'dia')
    .map((section) => {
      const present = valuesBySection.get(section.id)
      const opcoes = present?.size
        ? section.opcoes.filter(op => present.has(op.id.trim().toLowerCase()))
        : section.opcoes

      const subsecoes = (section.subsecoes ?? [])
        .map((sub) => {
          const subPresent = valuesBySection.get(sub.id)
          if (!subPresent?.size) return { ...sub, opcoes: [] }
          return {
            ...sub,
            opcoes: sub.opcoes.filter(op => subPresent.has(op.id.trim().toLowerCase())),
          }
        })
        .filter(sub => sub.opcoes.length > 0)

      return {
        ...section,
        opcoes,
        subsecoes: subsecoes.length ? subsecoes : undefined,
      }
    })
    .filter(section => section.opcoes.length > 0 || (section.subsecoes?.length ?? 0) > 0)

  if (!datas.length) {
    return { ...modal, secoes: secoesBase }
  }

  const diaSection = {
    id: 'dia',
    titulo: 'Dia',
    colunas: 2 as const,
    opcoes: buildDiaFilterOptions(datas),
  }

  return {
    ...modal,
    secoes: [diaSection, ...secoesBase],
  }
})

const initialFilters = computed(() => {
  const base = { ...(gridConfig.value.filtros_iniciais ?? {}) }
  const etapa = route.query.etapa
  if (typeof etapa === 'string' && etapa) {
    base.etapa = [etapa]
  }
  const series = route.query.series
  if (typeof series === 'string' && series) {
    base.series = [series]
  }
  const dia = route.query.dia
  if (typeof dia === 'string' && dia) {
    base.dia = [dia]
  }
  return Object.keys(base).length ? base : undefined
})

const {
  isOpen: isFilterOpen,
  applied,
  activeSections,
  open: openFilters,
  toggleDraftOption,
  isDraftSelected,
  apply: applyFilters,
  clearAll,
  clearDraft,
  removeAppliedOption,
} = useGridFilters(filterModalConfig, initialFilters)

const searchQuery = ref('')

const filteredItems = computed((): GridItem[] => {
  const byFilters = filterGridItemsByFilters(items.value, applied.value)
  return filterGridItemsBySearch(byFilters, searchQuery.value)
})

const diaGroups = computed(() => {
  if (gridConfig.value.agrupar_por_dia === false) return null
  return groupGridItemsByDia(filteredItems.value)
})

const emptyStateMessage = computed(() => {
  if (searchQuery.value.trim()) {
    return `Nenhum resultado para "${searchQuery.value}".`
  }
  return 'Nenhum torneio encontrado com os filtros selecionados.'
})
</script>
