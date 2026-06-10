import type { FaqCategoriaData } from '~/types/faq-page'
import { FAQ_CATEGORIA_COMPONENT_TYPE } from '~/types/faq-page'
import type { FaqItemData, ModuloOf } from '~/types/modules'

export function useFaqPageModule(modulo: MaybeRefOrGetter<ModuloOf<'faq_page'>>) {
  const ctaConfig = useModuleSectionCTA(modulo)

  const categorias = computed((): FaqCategoriaData[] => {
    return [...toValue(modulo).components]
      .filter(c => c.status === 'publicado' && c.type === FAQ_CATEGORIA_COMPONENT_TYPE)
      .sort((a, b) => a.ordem - b.ordem)
      .map(c => c.data as FaqCategoriaData)
  })

  return { ctaConfig, categorias }
}

export function getFaqItemsByCategoria(
  categorias: FaqCategoriaData[],
  categoriaSlug: string,
): FaqItemData[] {
  return categorias.find(c => c.slug === categoriaSlug)?.perguntas ?? []
}
