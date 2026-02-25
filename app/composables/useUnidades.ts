import type { Unidade } from '~/types/modules'

export const useUnidades = () => {
  const api = useH2Api()
  
  // Estado reativo para as unidades
  const unidadesData = useState<Unidade[]>('unidades-data', () => [])
  const isLoading = useState<boolean>('unidades-loading', () => false)

  // Busca as unidades da API se ainda não foram carregadas
  const fetchUnidades = async (force = false) => {
    // Se já tem dados e não é forçado, retorna
    if (unidadesData.value.length > 0 && !force) return
    
    isLoading.value = true
    try {
      const result = await api.getUnidades()
      if (result && result.length > 0) {
        unidadesData.value = result
      } else {
        console.warn('Nenhuma unidade retornada pela API')
      }
    } catch (error) {
      console.error('Erro ao buscar unidades:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Computed para criar o mapeamento dinamicamente
  const unityMap = computed(() => {
    return unidadesData.value.reduce((acc, unidade) => {
      acc[unidade.nome] = unidade.slug
      return acc
    }, {} as Record<string, string>)
  })

  // Mapeamento reverso (slug -> nome)
  const slugToUnityName = computed(() => {
    return unidadesData.value.reduce((acc, unidade) => {
      acc[unidade.slug] = unidade.nome
      return acc
    }, {} as Record<string, string>)
  })

  // Lista de nomes de unidades disponíveis
  const unidades = computed(() => {
    return unidadesData.value.map(u => u.nome)
  })

  // Unidade padrão (primeira da lista retornada pela API)
  const defaultUnity = computed(() => unidadesData.value[0]?.slug || null)
  const defaultUnityName = computed(() => unidadesData.value[0]?.nome || null)

  // Estado global da unidade selecionada
  const selectedUnityName = useState<string>('selected-unity-name', () => '')

  /**
   * Converte nome da unidade para slug
   */
  const getSlugFromName = (name: string): string | undefined => {
    return unityMap.value[name]
  }

  /**
   * Converte slug para nome da unidade
   */
  const getNameFromSlug = (slug: string): string | undefined => {
    return slugToUnityName.value[slug]
  }

  /**
   * Busca uma unidade específica por slug
   */
  const getUnidadeBySlug = (slug: string): Unidade | undefined => {
    return unidadesData.value.find(u => u.slug === slug)
  }

  /**
   * Verifica se há unidades carregadas
   */
  const hasUnidades = computed(() => unidadesData.value.length > 0)

  /**
   * Total de unidades disponíveis
   */
  const totalUnidades = computed(() => unidadesData.value.length)

  return {
    unidadesData,
    isLoading,
    fetchUnidades,
    unityMap,
    slugToUnityName,
    unidades,
    defaultUnity,
    defaultUnityName,
    selectedUnityName,
    getSlugFromName,
    getNameFromSlug,
    getUnidadeBySlug,
    hasUnidades,
    totalUnidades
  }
}
