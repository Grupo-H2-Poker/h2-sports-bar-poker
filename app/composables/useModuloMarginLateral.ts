import type { ModuloMetadadosMarginLateral } from '~/types/faq-page'

export function useModuloMarginLateral(
  metadados: MaybeRefOrGetter<ModuloMetadadosMarginLateral | undefined>,
) {
  return computed(() => {
    const margin = toValue(metadados)?.margin_lateral
    const value = margin == null
      ? '1rem'
      : typeof margin === 'number'
        ? `${margin}px`
        : margin
    return { paddingLeft: value, paddingRight: value }
  })
}
