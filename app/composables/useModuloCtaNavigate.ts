export function useModuloCtaNavigate() {
  const route = useRoute()

  function navigateCta(link?: string) {
    if (!link) return

    const unidadeSlug = route.params.unidade as string | undefined
    if (unidadeSlug) {
      navigateTo(resolveUnidadeHref(unidadeSlug, link))
      return
    }

    navigateTo(link)
  }

  return { navigateCta }
}
