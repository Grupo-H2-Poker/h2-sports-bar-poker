import type { GridFilterModal, GridFilterSection } from '~/types/grid'
import type { CardGenericData } from '~/types/cards'
import type { ComponentData, ModuloContentDataMap } from '~/types/modules'

type GridModuleItem = ComponentData<ModuloContentDataMap['grid']>
type FilterState = Record<string, Set<string>>

function cloneFilterState(state: FilterState): FilterState {
  return Object.fromEntries(
    Object.entries(state).map(([key, values]) => [key, new Set(values)]),
  )
}

function emptyFilterState(): FilterState {
  return {}
}

function normalizeFilterId(value: string): string {
  return value.trim().toLowerCase()
}

export function useGridFilters(
  modalConfig: MaybeRefOrGetter<GridFilterModal | undefined>,
  initialFilters?: MaybeRefOrGetter<Record<string, string[]> | undefined>,
) {
  const isOpen = ref(false)

  function buildInitialState(): FilterState {
    const initial = toValue(initialFilters)
    if (!initial) return emptyFilterState()

    return Object.fromEntries(
      Object.entries(initial)
        .filter(([, values]) => values.length > 0)
        .map(([key, values]) => [key, new Set(values.map(normalizeFilterId))]),
    )
  }

  const draft = ref<FilterState>(buildInitialState())
  const applied = ref<FilterState>(buildInitialState())

  watch(
    () => toValue(initialFilters),
    () => {
      const next = buildInitialState()
      draft.value = cloneFilterState(next)
      applied.value = cloneFilterState(next)
    },
    { deep: true },
  )

  function syncDraftFromApplied() {
    draft.value = cloneFilterState(applied.value)
  }

  function open() {
    syncDraftFromApplied()
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  /** Sempre troca a referência do state — Sets mutados no lugar não disparam re-render. */
  function toggleDraftOption(sectionId: string, optionId: string) {
    const id = normalizeFilterId(optionId)
    const next = cloneFilterState(draft.value)
    if (!next[sectionId]) {
      next[sectionId] = new Set()
    }

    const selected = next[sectionId]
    if (selected.has(id)) {
      selected.delete(id)
      if (selected.size === 0) {
        delete next[sectionId]
      }
    }
    else {
      selected.add(id)
    }

    draft.value = next
  }

  function isDraftSelected(sectionId: string, optionId: string) {
    return draft.value[sectionId]?.has(normalizeFilterId(optionId)) ?? false
  }

  function apply() {
    applied.value = cloneFilterState(draft.value)
    close()
  }

  function clearAll() {
    draft.value = emptyFilterState()
    applied.value = emptyFilterState()
  }

  function clearDraft() {
    draft.value = emptyFilterState()
  }

  function removeAppliedOption(sectionId: string, optionId: string) {
    const id = normalizeFilterId(optionId)
    const nextApplied = cloneFilterState(applied.value)
    nextApplied[sectionId]?.delete(id)
    if (nextApplied[sectionId]?.size === 0) {
      delete nextApplied[sectionId]
    }
    applied.value = nextApplied

    const nextDraft = cloneFilterState(draft.value)
    nextDraft[sectionId]?.delete(id)
    if (nextDraft[sectionId]?.size === 0) {
      delete nextDraft[sectionId]
    }
    draft.value = nextDraft
  }

  const activeSections = computed(() => {
    const config = toValue(modalConfig)
    if (!config) return []

    function sectionBadges(section: GridFilterSection) {
      const selectedIds = applied.value[section.id]
      if (!selectedIds?.size) return null

      const badges = section.opcoes
        .filter(opcao => selectedIds.has(normalizeFilterId(opcao.id)))
        .map(opcao => ({
          sectionId: section.id,
          optionId: opcao.id,
          label: opcao.label,
        }))

      if (!badges.length) {
        return {
          id: section.id,
          titulo: section.titulo,
          badges: [...selectedIds].map(optionId => ({
            sectionId: section.id,
            optionId,
            label: optionId,
          })),
        }
      }

      return {
        id: section.id,
        titulo: section.titulo,
        badges,
      }
    }

    const result: NonNullable<ReturnType<typeof sectionBadges>>[] = []

    for (const section of config.secoes) {
      const main = sectionBadges(section)
      if (main) result.push(main)

      for (const sub of section.subsecoes ?? []) {
        const nested = sectionBadges(sub)
        if (nested) result.push(nested)
      }
    }

    return result
  })

  const hasActiveFilters = computed(() => activeSections.value.length > 0)

  return {
    isOpen,
    draft,
    applied,
    activeSections,
    hasActiveFilters,
    open,
    close,
    toggleDraftOption,
    isDraftSelected,
    apply,
    clearAll,
    clearDraft,
    removeAppliedOption,
  }
}

/** Valor do card para uma seção de filtro (`filtros[id]`, com fallback de `data` no dia). */
export function getCardFilterValue(
  card: CardGenericData,
  sectionId: string,
): string | undefined {
  const fromFiltros = card.filtros?.[sectionId]
  if (fromFiltros != null && String(fromFiltros).trim() !== '') {
    return normalizeFilterId(String(fromFiltros))
  }

  if (sectionId === 'dia' && card.data) {
    return normalizeFilterId(card.data)
  }

  return undefined
}

export function filterGridItemsByFilters(
  items: GridModuleItem[],
  applied: FilterState,
): GridModuleItem[] {
  const activeSections = Object.entries(applied).filter(([, values]) => values.size > 0)
  if (!activeSections.length) return items

  return items.filter((item) => {
    const card = item.data as CardGenericData

    return activeSections.every(([sectionId, selectedIds]) => {
      const cardValue = getCardFilterValue(card, sectionId)
      if (!cardValue) return false
      return selectedIds.has(cardValue)
    })
  })
}
