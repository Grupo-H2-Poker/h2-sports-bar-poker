export const CMS_LOCALES = ['pt', 'en', 'es', 'zh', 'ja'] as const

export type CmsLocale = (typeof CMS_LOCALES)[number]

export function resolveCmsLocale(value: unknown): CmsLocale {
  const code = typeof value === 'string' ? value.toLowerCase().split('-')[0] : 'pt'
  return (CMS_LOCALES as readonly string[]).includes(code) ? (code as CmsLocale) : 'pt'
}
