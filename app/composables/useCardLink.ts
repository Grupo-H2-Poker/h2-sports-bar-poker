import type { CardGenericData } from '~/types/cards'
import { filterCardBotoes } from '~/utils/features'

/** Navegação unidade-aware para cards (preview, grid, footer de botões). */
export function useCardLink(dados?: () => Pick<CardGenericData, 'link' | 'botoes'>) {
  const route = useRoute()

  const visibleBotoes = computed(() => filterCardBotoes(dados?.().botoes))

  const primaryButton = computed(() => visibleBotoes.value[0])

  const hasButton = computed(() => !!primaryButton.value?.label)

  function resolveLink(): string | undefined {
    if (!dados) return undefined
    return dados().link ?? primaryButton.value?.link
  }

  function navigateLink(link: string) {
    const unidadeSlug = route.params.unidade as string | undefined
    const href = unidadeSlug
      ? resolveUnidadeHref(unidadeSlug, link)
      : /^https?:\/\//i.test(link) || link.startsWith('/')
        ? link
        : `/${link}`

    if (/^https?:\/\//i.test(href)) {
      navigateTo(href, { external: true })
      return
    }

    navigateTo(href)
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

  return { primaryButton, hasButton, resolveLink, navigateLink, onCardClick, onButtonClick }
}
