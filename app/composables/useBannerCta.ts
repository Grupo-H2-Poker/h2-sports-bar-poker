import type { BannerData } from '~/types/banner'
import type { SectionCTAData } from '~/types/cards'

/** Resolve SectionCTA a partir de `section_cta` ou campos legados do banner */
export function useBannerCta(dados: MaybeRefOrGetter<BannerData>) {
  const ctaConfig = computed((): SectionCTAData | undefined => {
    const d = toValue(dados)

    if (d.section_cta) {
      return d.section_cta
    }

    const { titulo, subtitulo, cta, link } = d
    if (!titulo && !subtitulo && !cta) {
      return undefined
    }

    return {
      titulo,
      descricao: subtitulo,
      cta,
      cta_link: link,
      align: 'left',
      size: 'md',
    }
  })

  const hasCta = computed(() => {
    const c = ctaConfig.value
    return !!(c?.titulo || c?.descricao || c?.cta)
  })

  return { ctaConfig, hasCta }
}
