import type { CardGenericData } from '~/types/cards'

export function useCardPreviewLink(dados: () => Pick<CardGenericData, 'link' | 'botoes'>) {
  const route = useRoute()

  const primaryButton = computed(() => dados().botoes?.[0])

  const hasButton = computed(() => !!primaryButton.value?.label)

  function resolveLink(): string | undefined {
    return dados().link ?? primaryButton.value?.link
  }

  function navigateLink(link: string) {
    const unidadeSlug = route.params.unidade as string | undefined
    if (unidadeSlug) {
      navigateTo(resolveUnidadeHref(unidadeSlug, link))
      return
    }
    navigateTo(link)
  }

  function onCardClick() {
    const link = resolveLink()
    if (link) navigateLink(link)
  }

  function onButtonClick(active: boolean) {
    if (!active) return
    const link = resolveLink()
    if (link) navigateLink(link)
  }

  return { primaryButton, hasButton, onCardClick, onButtonClick }
}
