/** Tokens compartilhados dos cards de agenda preview */
export const CARD_PREVIEW_SHELL =
  'relative overflow-hidden rounded-lg flex-shrink-0 w-[265px] h-[280px] p-8 font-[\'Red_Hat_Display\',sans-serif]'

export const CARD_PREVIEW_TEXT = 'text-[#E7E7E7]'

export const CARD_PREVIEW_HEADER = 'max-h-[148px] overflow-hidden'

/** Torneio preview: coluna flex — rodapé no fim do card */
export const CARD_PREVIEW_TORNEIO_SHELL =
  `${CARD_PREVIEW_SHELL} flex flex-col`

export const CARD_PREVIEW_TORNEIO_HEADER =
  'flex min-h-0 flex-1 flex-col items-start justify-start overflow-hidden'

/** Altura de 2 linhas (leading 30px) — título de 1 linha fica centralizado nesse bloco */
export const CARD_PREVIEW_TORNEIO_TITULO_SLOT =
  'mt-5 flex min-h-[60px] w-full items-center'

export const CARD_PREVIEW_TORNEIO_FOOTER = 'mt-auto shrink-0'

export const CARD_PREVIEW_FOOTER_FIXED = 'absolute bottom-8 left-8 right-8'

export const CARD_PREVIEW_INFO_SLOT = 'min-h-[56px]'

/** Torneio: horários colados acima do botão (sem min-height que empurra o texto para cima) */
export const CARD_PREVIEW_TORNEIO_INFO_SLOT = 'flex flex-col justify-end'

export const CARD_PREVIEW_CASH_TITULO =
  'text-[30px] font-bold leading-[40px]'

export const CARD_PREVIEW_TORNEIO_GARANTIDO =
  'text-[20px] font-bold leading-[28px]'

export const CARD_PREVIEW_TORNEIO_TITULO =
  'w-full text-left text-[24px] font-normal leading-[30px] line-clamp-2'

export const CARD_PREVIEW_HORARIOS =
  'text-[15px] font-bold leading-[28px]'

export const CARD_PREVIEW_CASH_DETALHES =
  'text-left text-base font-normal leading-[28px] text-[#E7E7E7]'

export const CARD_PREVIEW_BUTTON =
  'rounded-full px-5 py-2.5 text-xs font-semibold transition-colors'

export const CARD_PREVIEW_BUTTON_SLOT = 'mt-5 min-h-[34px]'
