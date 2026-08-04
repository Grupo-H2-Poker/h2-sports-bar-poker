import type { DocumentoSecaoData } from '~/types/documento-page'
import { DOCUMENTO_SECAO_COMPONENT_TYPE } from '~/types/documento-page'
import type { ModuloOf } from '~/types/modules'

export function useDocumentoPageModule(modulo: MaybeRefOrGetter<ModuloOf<'documento_page'>>) {
  const ctaConfig = useModuleSectionCTA(modulo)

  const secoes = computed((): DocumentoSecaoData[] => {
    return [...toValue(modulo).components]
      .filter(c => c.status === 'publicado' && c.type === DOCUMENTO_SECAO_COMPONENT_TYPE)
      .sort((a, b) => a.ordem - b.ordem)
      .map(c => c.data as DocumentoSecaoData)
  })

  return { ctaConfig, secoes }
}

export function getDocumentoConteudoBySecao(
  secoes: DocumentoSecaoData[],
  secaoSlug: string,
): string {
  return secoes.find(s => s.slug === secaoSlug)?.conteudo ?? ''
}
