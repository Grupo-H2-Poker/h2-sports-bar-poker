/**
 * Troca de idioma com fade na página + toast de confirmação.
 * `switching` é compartilhado via useState para o layout aplicar o fade.
 */
export function useLocaleSwitch() {
  const { locale, locales, setLocale, t } = useI18n()
  const { warning } = useAppToast()

  const switching = useState('locale-switching', () => false)

  async function changeLocale(code: string) {
    if (!code || code === String(locale.value) || switching.value) return

    switching.value = true
    // Fade-out antes de trocar o conteúdo
    await new Promise<void>(resolve => setTimeout(resolve, 220))

    await setLocale(code)
    await nextTick()
    // Tempo para os fetches de CMS aplicarem o novo idioma
    await new Promise<void>(resolve => setTimeout(resolve, 280))

    switching.value = false

    const option = (locales.value as Array<{ code: string; name?: string }>)
      .find(l => l.code === code)
    const language = option?.name ?? code.toUpperCase()

    warning(
      t('language.changedTitle'),
      t('language.changedDescription', { language }),
    )
  }

  return { switching, changeLocale }
}
