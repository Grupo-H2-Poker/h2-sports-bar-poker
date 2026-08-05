/**
 * Feature flags de UI.
 * Reative `FEATURE_COMPRAR_BUY_IN` quando a compra de buy-in estiver pronta.
 */
export const FEATURE_COMPRAR_BUY_IN = false

/** Labels PT/EN/ES/ZH/JA do CTA de compra (mock-i18n traduz o texto). */
const COMPRAR_BUY_IN_LABEL =
  /comprar\s*buy-?in|purchase\s*buy-?in|购买买入|バイインを購入/i

export function isComprarBuyInButton(botao: { label?: string; link?: string }) {
  if (COMPRAR_BUY_IN_LABEL.test(botao.label ?? '')) return true
  // Fallback estável: links de compra no CMS/mock terminam em /comprar
  return /\/comprar(?:\/|$|\?)/i.test(botao.link ?? '')
}

/** Filtra botões "Comprar buy-in" enquanto a feature estiver off. */
export function filterCardBotoes<T extends { label?: string; link?: string }>(botoes: T[] | undefined): T[] {
  if (!botoes?.length) return []
  if (FEATURE_COMPRAR_BUY_IN) return botoes
  return botoes.filter(b => !isComprarBuyInButton(b))
}
