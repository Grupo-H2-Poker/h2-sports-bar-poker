/**
 * Disparos de toast padronizados (Nuxt UI useToast).
 * Visual padrão do componente — fundo preto via --ui-bg no CSS.
 */
export function useAppToast() {
  const toast = useToast()

  function success(title: string, description?: string) {
    toast.add({
      title,
      description,
      icon: 'i-lucide-check-circle-2',
      color: 'success',
    })
  }

  function error(title: string, description?: string) {
    toast.add({
      title,
      description,
      icon: 'i-lucide-alert-triangle',
      color: 'error',
    })
  }

  function warning(title: string, description?: string) {
    toast.add({
      title,
      description,
      icon: 'i-lucide-alert-triangle',
      color: 'warning',
    })
  }

  return { success, error, warning, toast }
}
