import type { CardGenericData } from '~/types/cards'
import { useCardLink } from './useCardLink'

/** @deprecated Prefer `useCardLink` — mantido para layouts de preview existentes. */
export function useCardPreviewLink(dados: () => Pick<CardGenericData, 'link' | 'botoes'>) {
  return useCardLink(dados)
}
