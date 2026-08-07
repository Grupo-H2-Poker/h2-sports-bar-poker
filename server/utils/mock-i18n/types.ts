export const CMS_LOCALES = ['pt', 'en', 'es', 'zh', 'ja'] as const

export type CmsLocale = (typeof CMS_LOCALES)[number]

/** Locales com dicionário (PT é a língua-fonte do mock). */
export type CmsDictLocale = Exclude<CmsLocale, 'pt'>

export const CMS_DICT_LOCALES = ['en', 'es', 'zh', 'ja'] as const satisfies readonly CmsDictLocale[]

/** Pack de tradução CMS: PT exato → string do locale. */
export type CmsPack = Record<CmsDictLocale, Record<string, string>>

export function resolveCmsLocale(value: unknown): CmsLocale {
  const code = typeof value === 'string' ? value.toLowerCase().split('-')[0] : 'pt'
  return (CMS_LOCALES as readonly string[]).includes(code) ? (code as CmsLocale) : 'pt'
}
