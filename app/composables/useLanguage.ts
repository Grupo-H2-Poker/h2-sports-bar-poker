export type Language = 'pt' | 'en'

export const useLanguage = () => {
  const language = useState<Language>('language', () => 'pt')

  const setLanguage = (lang: Language) => {
    language.value = lang
  }

  return { language, setLanguage }
}
