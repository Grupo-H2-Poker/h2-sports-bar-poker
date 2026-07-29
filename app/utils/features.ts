/**
 * Feature flags de UI.
 * Reative `FEATURE_COMPRAR_BUY_IN` quando a compra de buy-in estiver pronta.
 */
export const FEATURE_COMPRAR_BUY_IN = false

export function isComprarBuyInButton(botao: { label?: string }) {
  return /comprar\s*buy-?in/i.test(botao.label ?? '')
}

/** Filtra botões "Comprar buy-in" enquanto a feature estiver off. */
export function filterCardBotoes<T extends { label?: string }>(botoes: T[] | undefined): T[] {
  if (!botoes?.length) return []
  if (FEATURE_COMPRAR_BUY_IN) return botoes
  return botoes.filter(b => !isComprarBuyInButton(b))
}
