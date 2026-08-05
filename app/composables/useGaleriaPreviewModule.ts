import type { ModuloOf } from '~/types/modules'

export function useGaleriaPreviewModule(modulo: MaybeRefOrGetter<ModuloOf<'galeria_preview'>>) {
  const { items } = useModuloComponents(modulo)

  const carouselBleedRight = computed(
    () => toValue(modulo).metadados?.carousel_bleed_right ?? true,
  )
  const carouselBleedLeft = computed(
    () => toValue(modulo).metadados?.carousel_bleed_left ?? true,
  )
  const previewLink = computed(() => toValue(modulo).metadados?.link)

  return {
    items,
    carouselBleedRight,
    carouselBleedLeft,
    previewLink,
  }
}
