import type { ComponentData, Modulo } from '~/types/modules'

export function useSortedComponents<
  TData = Record<string, unknown>,
  TMetadados = Record<string, unknown>,
>(modulo: MaybeRefOrGetter<Modulo<TData, TMetadados>>) {
  return computed(() => {
    const { components } = toValue(modulo)

    return [...components]
      .filter((c) => c.status === 'publicado')
      .sort((a, b) => a.ordem - b.ordem) as ComponentData<TData>[]
  })
}
