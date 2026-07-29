import type { Modulo } from '~/types/modules'
import type { ModuloMetadadosMarginLateral } from '~/types/faq-page'

export const PAGINA_MODULOS_KEY = 'paginaModulos' as const

const FAQ_TIPOS = new Set(['faq', 'faq_page'])

function isFaqModulo(modulo: Modulo | undefined): modulo is Modulo {
  return !!modulo && FAQ_TIPOS.has(modulo.tipo)
}

function faqMarginLateral(modulo: Modulo): string | number | undefined {
  return (modulo.metadados as ModuloMetadadosMarginLateral | undefined)?.margin_lateral
}

/**
 * Resolve `margin_lateral` a partir do FAQ imediatamente acima ou abaixo.
 * Prioridade: acima → abaixo.
 */
export function resolveAdjacentFaqMargin(
  moduloId: number,
  modulos: Modulo[],
): string | number | undefined {
  const index = modulos.findIndex(m => m.id === moduloId)
  if (index < 0) return undefined

  const above = modulos[index - 1]
  if (isFaqModulo(above)) return faqMarginLateral(above)

  const below = modulos[index + 1]
  if (isFaqModulo(below)) return faqMarginLateral(below)

  return undefined
}

/**
 * Metadados efetivos de margem lateral para um banner.
 * Se `use_same_faq_margin`, herda do FAQ vizinho; senão usa o próprio `margin_lateral`.
 */
export function useBannerMarginLateral(
  modulo: MaybeRefOrGetter<{
    id: number
    metadados?: ModuloMetadadosMarginLateral & { use_same_faq_margin?: boolean }
  }>,
) {
  const paginaModulos = inject<ComputedRef<Modulo[]> | Ref<Modulo[]> | Modulo[]>(
    PAGINA_MODULOS_KEY,
    computed(() => []),
  )

  return useModuloMarginLateral(() => {
    const current = toValue(modulo)
    const meta = current.metadados

    if (meta?.use_same_faq_margin) {
      const list = toValue(paginaModulos) ?? []
      const inherited = resolveAdjacentFaqMargin(current.id, list)
      return { margin_lateral: inherited ?? meta.margin_lateral }
    }

    return meta
  })
}
