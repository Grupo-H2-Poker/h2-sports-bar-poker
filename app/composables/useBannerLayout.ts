import {
  resolveBannerBorderRadius,
  type BannerCtaPosition,
  type BannerData,
  type BannerHeight,
  type BannerSize,
} from '~/types/banner'

/** Altura mínima por `height` — escala conforme a largura (`size`) */
const HEIGHT_CLASSES: Record<BannerSize, Record<BannerHeight, string>> = {
  lg: {
    strip: 'w-full',
    sm: 'min-h-[240px] md:min-h-[300px]',
    md: 'min-h-[320px] md:min-h-[420px] lg:min-h-[480px]',
    lg: 'min-h-[400px] md:min-h-[520px] lg:min-h-[600px]',
  },
  md: {
    strip: 'w-full',
    sm: 'min-h-[200px] md:min-h-[260px]',
    md: 'min-h-[280px] md:min-h-[360px]',
    lg: 'min-h-[360px] md:min-h-[460px]',
  },
  sm: {
    strip: 'w-full',
    sm: 'min-h-[180px]',
    md: 'min-h-[220px]',
    lg: 'min-h-[320px] md:min-h-[400px]',
  },
}

function getWidthClasses(size: BannerSize, inline: boolean): string {
  switch (size) {
    case 'lg':
      return 'w-full'
    case 'md':
      return inline ? 'w-full' : 'w-full max-w-5xl mx-auto'
    case 'sm':
      return inline ? 'w-full' : 'w-full max-w-md mx-auto'
  }
}

function getBannerClasses(size: BannerSize, height: BannerHeight, inline: boolean) {
  const isStrip = height === 'strip'
  const width = getWidthClasses(size, inline)
  return {
    wrapper: `${width} ${HEIGHT_CLASSES[size][height]}`,
    /** Só largura — altura definida pela imagem (`object_fit: contain`) */
    widthOnly: width,
    image: isStrip ? 'block w-full h-auto' : 'w-full h-full object-cover',
    strip: isStrip,
  }
}

/** Resolve posição do CTA no overlay quando `cta_position` não foi definido */
function resolveOverlayCtaPosition(d: BannerData): BannerCtaPosition {
  if (d.cta_position) return d.cta_position

  if (d.cta_column === 'right') return 'right'
  if (d.cta_column === 'left') return 'left'

  const align = d.section_cta?.align
  if (align === 'left') return 'left'
  if (align === 'right') return 'right'
  if (align === 'center') return 'center'

  return 'bottom-center'
}

const CTA_POSITION_CLASSES: Record<BannerCtaPosition, string> = {
  center: 'items-center justify-center',
  'top-left': 'items-start justify-start',
  'top-center': 'items-start justify-center',
  'top-right': 'items-start justify-end',
  'bottom-left': 'items-end justify-start',
  'bottom-center': 'items-end justify-center',
  'bottom-right': 'items-end justify-end',
  left: 'items-center justify-start',
  right: 'items-center justify-end',
}

export function useBannerLayout(
  dados: MaybeRefOrGetter<BannerData>,
  options?: MaybeRefOrGetter<{ inline?: boolean }>,
) {
  const inline = computed(() => toValue(options)?.inline ?? false)
  const size = computed((): BannerSize => toValue(dados).size ?? 'lg')
  const height = computed((): BannerHeight => toValue(dados).height ?? 'md')
  const layout = computed(() => toValue(dados).layout ?? 'overlay')
  const ctaPosition = computed((): BannerCtaPosition => {
    const d = toValue(dados)
    if (d.layout === 'two_column') return d.cta_position ?? 'center'
    return resolveOverlayCtaPosition(d)
  })
  const ctaColumn = computed(() => toValue(dados).cta_column ?? 'left')
  const reverseColumns = computed(() => toValue(dados).reverse_columns ?? false)
  const reverseColumnsMobile = computed(() => {
    const d = toValue(dados)
    if (d.reverse_columns_mobile !== undefined) return d.reverse_columns_mobile
    return d.cta_column !== 'right' && !d.reverse_columns
  })
  const borderRadiusPx = computed(() => resolveBannerBorderRadius(toValue(dados).border_radius))

  const borderRadiusStyle = computed(() => {
    const value = borderRadiusPx.value
    return value ? { borderRadius: value } : undefined
  })

  const rounded = computed(() => {
    const d = toValue(dados)
    if (d.height === 'strip' || d.border_radius) return false
    return d.rounded ?? size.value !== 'lg'
  })

  const hasRoundedCorners = computed(() => rounded.value || !!borderRadiusPx.value)

  const sizeClasses = computed(() =>
    getBannerClasses(size.value, height.value, inline.value),
  )
  const ctaPositionClasses = computed(() => CTA_POSITION_CLASSES[ctaPosition.value])

  const overlayGradient = computed(() => {
    const overlay = toValue(dados).overlay
    if (overlay === 'none') return ''
    if (overlay === 'gradient-bottom' || ctaPosition.value.startsWith('bottom')) {
      return 'bg-gradient-to-t from-black/80 via-black/30 to-transparent'
    }
    return 'bg-gradient-to-t from-black/60 via-black/20 to-black/10'
  })

  return {
    size,
    height,
    layout,
    ctaPosition,
    ctaColumn,
    reverseColumns,
    reverseColumnsMobile,
    rounded,
    borderRadiusPx,
    borderRadiusStyle,
    hasRoundedCorners,
    sizeClasses,
    ctaPositionClasses,
    overlayGradient,
  }
}
