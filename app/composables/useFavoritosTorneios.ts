import type { CardGenericData } from '~/types/cards'

export interface FavoritoTorneioEntry {
  slug: string
  titulo: string
  favoritadoEm: string
  /** Unidade em que o torneio foi favoritado (para montar a rota de detalhe) */
  unidadeSlug?: string
  /** Snapshot do card da agenda no momento do favorito */
  card?: CardGenericData
}

const STORAGE_PREFIX = 'h2_favoritos_torneios'

function storageKey(email: string) {
  return `${STORAGE_PREFIX}:${email.trim().toLowerCase()}`
}

function isFavoritoEntry(item: unknown): item is FavoritoTorneioEntry {
  return !!item
    && typeof item === 'object'
    && typeof (item as FavoritoTorneioEntry).slug === 'string'
    && typeof (item as FavoritoTorneioEntry).titulo === 'string'
}

function readFavoritos(email: string): FavoritoTorneioEntry[] {
  if (!import.meta.client) return []
  try {
    const raw = localStorage.getItem(storageKey(email))
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isFavoritoEntry)
  }
  catch {
    return []
  }
}

function writeFavoritos(email: string, items: FavoritoTorneioEntry[]) {
  if (!import.meta.client) return
  localStorage.setItem(storageKey(email), JSON.stringify(items))
}

function resolveDetailHref(unidadeSlug: string, slug: string) {
  return resolveUnidadeHref(unidadeSlug, `torneios/${slug}`)
}

function resolveCardLink(unidadeSlug: string, link: string | undefined, slug: string) {
  if (!link) return resolveDetailHref(unidadeSlug, slug)
  if (/^https?:\/\//i.test(link) || link.startsWith('/')) return link
  return resolveUnidadeHref(unidadeSlug, link)
}

/** Snapshot do card com links absolutos (funcionam fora da rota da unidade). */
function snapshotCard(
  card: CardGenericData | undefined,
  opts: { slug: string, titulo: string, unidadeSlug: string },
): CardGenericData {
  const { slug, titulo, unidadeSlug } = opts
  const detailHref = resolveDetailHref(unidadeSlug, slug)
  const base: CardGenericData = card
    ? { ...card }
    : {
        variant: 'torneio',
        slug,
        titulo,
        favorito: { visivel: true, cor: 'verde' },
      }

  return {
    ...base,
    variant: base.variant || 'torneio',
    slug,
    titulo: base.titulo || titulo,
    link: resolveCardLink(unidadeSlug, base.link, slug),
    favorito: {
      visivel: true,
      cor: base.favorito?.cor ?? 'verde',
    },
    botoes: base.botoes?.map(b => ({
      ...b,
      link: resolveCardLink(unidadeSlug, b.link || detailHref, slug),
    })),
  }
}

/**
 * Favoritos de torneio no front (localStorage por e-mail do usuário).
 * Substituir por API quando existir endpoint de perfil.
 */
export function useFavoritosTorneios() {
  const { user, isAuthenticated } = useAuth()
  const { defaultUnity } = useUnidades()
  const favoritos = useState<FavoritoTorneioEntry[]>('favoritos-torneios', () => [])

  function syncFromStorage() {
    const email = user.value?.email
    if (!email) {
      favoritos.value = []
      return
    }
    favoritos.value = readFavoritos(email)
  }

  if (import.meta.client) {
    watch(
      () => user.value?.email,
      () => syncFromStorage(),
      { immediate: true },
    )
  }

  function isFavorito(slug?: string | null) {
    if (!slug) return false
    return favoritos.value.some(f => f.slug === slug)
  }

  /** Card pronto para exibir no perfil (com link absoluto para o detalhe). */
  function toDisplayCard(entry: FavoritoTorneioEntry): CardGenericData {
    const unidadeSlug = entry.unidadeSlug || defaultUnity.value || 'sp-pinheiros'
    if (entry.card) {
      return snapshotCard(entry.card, {
        slug: entry.slug,
        titulo: entry.titulo,
        unidadeSlug,
      })
    }
    return snapshotCard(undefined, {
      slug: entry.slug,
      titulo: entry.titulo,
      unidadeSlug,
    })
  }

  /**
   * Alterna favorito. Sem login: abre modal e não altera estado.
   * @returns se favoritou (true), removeu (false), ou cancelou por auth (null)
   */
  function toggleFavorito(opts: {
    slug: string
    titulo?: string
    card?: CardGenericData
    unidadeSlug?: string
  }): boolean | null {
    if (!opts.slug) return null

    if (!isAuthenticated.value || !user.value?.email) {
      useLoginModal().open()
      return null
    }

    const email = user.value.email
    const already = isFavorito(opts.slug)
    let next: FavoritoTorneioEntry[]

    if (already) {
      next = favoritos.value.filter(f => f.slug !== opts.slug)
      favoritos.value = next
      writeFavoritos(email, next)
      useAppToast().success(
        'Removido dos favoritos',
        opts.titulo || 'Torneio removido da sua lista.',
      )
      return false
    }

    const unidadeSlug = opts.unidadeSlug || defaultUnity.value || undefined
    const titulo = opts.titulo?.trim() || opts.card?.titulo || opts.slug
    const entry: FavoritoTorneioEntry = {
      slug: opts.slug,
      titulo,
      favoritadoEm: new Date().toISOString(),
      unidadeSlug,
      card: unidadeSlug
        ? snapshotCard(opts.card, { slug: opts.slug, titulo, unidadeSlug })
        : opts.card
          ? { ...opts.card, slug: opts.slug, titulo }
          : {
              variant: 'torneio',
              slug: opts.slug,
              titulo,
              favorito: { visivel: true, cor: 'verde' },
              link: `torneios/${opts.slug}`,
            },
    }
    next = [entry, ...favoritos.value.filter(f => f.slug !== opts.slug)]
    favoritos.value = next
    writeFavoritos(email, next)
    useAppToast().success(
      'Torneio favoritado!',
      entry.titulo,
    )
    return true
  }

  function removeFavorito(slug: string) {
    const item = favoritos.value.find(f => f.slug === slug)
    toggleFavorito({ slug, titulo: item?.titulo, card: item?.card, unidadeSlug: item?.unidadeSlug })
  }

  return {
    favoritos,
    isFavorito,
    toggleFavorito,
    removeFavorito,
    toDisplayCard,
    syncFromStorage,
  }
}
