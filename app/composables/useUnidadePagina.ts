import type { Modulo, Pagina, UnidadeModulos } from '~/types/modules'
import { PAGINA_HOME_SLUG } from '~/types/modules'

export function normalizePaginaSlug(slug?: string | null): string {
  if (!slug || slug === PAGINA_HOME_SLUG) return PAGINA_HOME_SLUG
  return slug
}

/** Resolve link do menu ou CTA para rota da unidade atual. */
export function resolveUnidadeHref(
  unidadeSlug: string,
  target: string,
  external?: boolean,
): string {
  if (external || /^https?:\/\//i.test(target)) return target

  const clean = target.replace(/^\//, '')
  if (!clean || clean === PAGINA_HOME_SLUG) return `/${unidadeSlug}`

  return `/${unidadeSlug}/${clean}`
}

export function resolveMenuItemHref(
  unidadeSlug: string,
  item: { pagina?: string; to?: string; external?: boolean },
): string {
  if (item.external && item.to) return item.to
  if (item.pagina) return resolveUnidadeHref(unidadeSlug, item.pagina)
  if (item.to) return resolveUnidadeHref(unidadeSlug, item.to, item.external)
  return `/${unidadeSlug}`
}

export function isMenuItemActive(
  routePath: string,
  unidadeSlug: string,
  item: { pagina?: string; to?: string },
): boolean {
  const href = resolveMenuItemHref(unidadeSlug, item)
  return routePath === href || routePath === `${href}/`
}

export function useUnidadePagina(
  unidadeData: MaybeRefOrGetter<UnidadeModulos | null | undefined>,
  paginaSlug?: MaybeRefOrGetter<string | undefined | null>,
) {
  const slug = computed(() => normalizePaginaSlug(toValue(paginaSlug)))

  const paginas = computed(() => {
    const data = toValue(unidadeData)
    if (data?.paginas?.length) return data.paginas
    if (data?.modulos?.length) {
      return [{
        slug: PAGINA_HOME_SLUG,
        status: 'publicado' as const,
        ordem: 0,
        modulos: data.modulos,
      }]
    }
    return []
  })

  const paginaAtual = computed<Pagina | null>(() => {
    const found = paginas.value.find(
      p => p.slug === slug.value && p.status === 'publicado',
    )
    return found ?? null
  })

  const modulos = computed<Modulo[]>(() => paginaAtual.value?.modulos ?? [])

  return { slug, paginas, paginaAtual, modulos }
}
