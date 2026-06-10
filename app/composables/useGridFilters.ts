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

export function useGridFilters(modalConfig: MaybeRefOrGetter<GridFilterModal | undefined>) {
  const isOpen = ref(false)
  const draft = ref<FilterState>(emptyFilterState())
  const applied = ref<FilterState>(emptyFilterState())

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

  function toggleDraftOption(sectionId: string, optionId: string) {
    if (!draft.value[sectionId]) {
      draft.value[sectionId] = new Set()
    }

    const selected = draft.value[sectionId]
    if (selected.has(optionId)) {
      selected.delete(optionId)
      if (selected.size === 0) {
        delete draft.value[sectionId]
      }
    }
    else {
      selected.add(optionId)
    }
  }

  function isDraftSelected(sectionId: string, optionId: string) {
    return draft.value[sectionId]?.has(optionId) ?? false
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
    applied.value[sectionId]?.delete(optionId)
    if (applied.value[sectionId]?.size === 0) {
      delete applied.value[sectionId]
    }

    draft.value[sectionId]?.delete(optionId)
    if (draft.value[sectionId]?.size === 0) {
      delete draft.value[sectionId]
    }
  }

  const activeSections = computed(() => {
    const config = toValue(modalConfig)
    if (!config) return []

    return config.secoes
      .map((section: GridFilterSection) => {
        const selectedIds = applied.value[section.id]
        if (!selectedIds?.size) return null

        const badges = section.opcoes
          .filter(opcao => selectedIds.has(opcao.id))
          .map(opcao => ({
            sectionId: section.id,
            optionId: opcao.id,
            label: opcao.label,
          }))

        if (!badges.length) return null

        return {
          id: section.id,
          titulo: section.titulo,
          badges,
        }
      })
      .filter((section): section is NonNullable<typeof section> => section !== null)
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

export function filterGridItemsByFilters(
  items: GridModuleItem[],
  applied: FilterState,
): GridModuleItem[] {
  const activeSections = Object.entries(applied).filter(([, values]) => values.size > 0)
  if (!activeSections.length) return items

  return items.filter((item) => {
    const cardFilters = (item.data as CardGenericData).filtros ?? {}

    return activeSections.every(([sectionId, selectedIds]) => {
      const cardValue = cardFilters[sectionId]
      if (!cardValue) return false
      return selectedIds.has(cardValue)
    })
  })
}
