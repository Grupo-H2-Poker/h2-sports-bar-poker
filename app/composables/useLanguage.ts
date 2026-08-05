/** @deprecated Prefer `useI18n()` from `@nuxtjs/i18n`. Thin wrapper for compatibility. */
export type Language = 'pt' | 'en' | 'es' | 'zh' | 'ja'

export const useLanguage = () => {
  const { locale, setLocale } = useI18n()

  const language = computed({
    get: () => locale.value as Language,
    set: (lang: Language) => {
      void setLocale(lang)
    },
  })

  const setLanguage = (lang: Language) => {
    void setLocale(lang)
  }

  return { language, setLanguage }
}
