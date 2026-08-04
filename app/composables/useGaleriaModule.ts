import {
  GALERIA_DEFAULT_CARD_VARIANT,
  GALERIA_DEFAULT_LAYOUT,
  GALERIA_FILTER_TODAS_ID,
  resolveGaleriaGridClasses,
  type GaleriaSeriesFiltroOption,
} from '~/types/galeria'
import type {
  ComponentData,
  GaleriaFotoData,
  GaleriaImagemData,
  ModuloOf,
} from '~/types/modules'

/**
 * Extrai opções de filtro a partir dos `series` presentes nos itens.
 * Ordem de aparição nos dados é preservada.
 */
export function buildGaleriaSeriesFiltros(
  itens: ReadonlyArray<ComponentData<GaleriaImagemData>>,
): GaleriaSeriesFiltroOption[] {
  const seen = new Map<string, string>()

  for (const item of itens) {
    const id = item.data.series?.trim()
    if (!id || seen.has(id)) continue
    seen.set(id, item.data.series_label?.trim() || id.toUpperCase())
  }

  if (!seen.size) return []

  return [
    { id: GALERIA_FILTER_TODAS_ID, label: 'Todas' },
    ...Array.from(seen.entries()).map(([id, label]) => ({ id, label })),
  ]
}

function parseAlbumQuery(raw: unknown): number | null {
  const value = Array.isArray(raw) ? raw[0] : raw
  if (typeof value !== 'string' || !value) return null
  const id = Number(value)
  return Number.isFinite(id) ? id : null
}

export function useGaleriaModule(modulo: MaybeRefOrGetter<ModuloOf<'galeria'>>) {
  const { ctaConfig, items } = useModuloComponents(modulo)
  const route = useRoute()
  const router = useRouter()

  const layout = computed(() => toValue(modulo).metadados?.layout ?? GALERIA_DEFAULT_LAYOUT)
  const isCarousel = computed(() => layout.value === 'drag_carousel')
  const cardVariant = computed(
    () => toValue(modulo).metadados?.card_variant ?? GALERIA_DEFAULT_CARD_VARIANT,
  )
  const filtroEnabled = computed(() => toValue(modulo).metadados?.filtro_series === true)
  const isAlbumMode = computed(() => cardVariant.value === 'album')

  const carouselBleedRight = computed(
    () => isCarousel.value && (toValue(modulo).metadados?.carousel_bleed_right ?? false),
  )

  const gridClass = computed(() => resolveGaleriaGridClasses(toValue(modulo).metadados))

  const seriesFiltros = computed(() =>
    filtroEnabled.value ? buildGaleriaSeriesFiltros(items.value) : [],
  )

  const showFiltro = computed(() => seriesFiltros.value.length > 1)

  const activeSeries = computed(() => {
    if (!showFiltro.value) return GALERIA_FILTER_TODAS_ID

    const fromQuery = route.query.series
    const raw = Array.isArray(fromQuery) ? fromQuery[0] : fromQuery
    if (!raw || typeof raw !== 'string') return GALERIA_FILTER_TODAS_ID

    const match = seriesFiltros.value.find(f => f.id === raw)
    return match?.id ?? GALERIA_FILTER_TODAS_ID
  })

  const albums = computed(() => {
    if (!showFiltro.value || activeSeries.value === GALERIA_FILTER_TODAS_ID) {
      return items.value
    }
    return items.value.filter(item => item.data.series === activeSeries.value)
  })

  const activeAlbumId = computed(() => {
    if (!isAlbumMode.value) return null
    return parseAlbumQuery(route.query.album)
  })

  const activeAlbum = computed(() => {
    const id = activeAlbumId.value
    if (id == null) return null
    return items.value.find(item => item.id === id) ?? null
  })

  const isAlbumOpen = computed(() => activeAlbum.value != null)

  const albumFotos = computed((): GaleriaFotoData[] => {
    const album = activeAlbum.value
    if (!album) return []

    const fotos = album.data.fotos?.filter(f => !!f.imagem) ?? []
    if (fotos.length) return fotos

    // Fallback: capa como única foto se o CMS ainda não enviou `fotos`.
    return album.data.imagem ? [{ imagem: album.data.imagem, titulo: album.data.titulo }] : []
  })

  /** Itens exibidos no grid/carrossel (álbuns ou vazio quando o álbum está aberto). */
  const imagens = computed(() => (isAlbumOpen.value ? [] : albums.value))

  function setActiveSeries(seriesId: string) {
    if (!showFiltro.value) return

    const query = { ...route.query }
    delete query.album

    if (seriesId === GALERIA_FILTER_TODAS_ID) {
      delete query.series
    }
    else {
      query.series = seriesId
    }

    void router.replace({ query })
  }

  function openAlbum(albumId: number) {
    if (!isAlbumMode.value) return
    const exists = items.value.some(item => item.id === albumId)
    if (!exists) return

    void router.replace({
      query: {
        ...route.query,
        album: String(albumId),
      },
    })
  }

  function closeAlbum() {
    if (!isAlbumOpen.value) return
    const query = { ...route.query }
    delete query.album
    void router.replace({ query })
  }

  return {
    ctaConfig,
    items,
    imagens,
    albums,
    layout,
    isCarousel,
    cardVariant,
    isAlbumMode,
    carouselBleedRight,
    gridClass,
    seriesFiltros,
    showFiltro,
    activeSeries,
    setActiveSeries,
    activeAlbum,
    isAlbumOpen,
    albumFotos,
    openAlbum,
    closeAlbum,
  }
}
