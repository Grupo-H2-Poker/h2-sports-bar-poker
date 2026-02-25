import type { Unidade, UnidadeModulos } from '~/types/modules'

export const useH2Api = () => {
  const config = useRuntimeConfig()
  
  // Base URL da API do H2 System
  // Em desenvolvimento, usa endpoints mock locais
  // Em produção, usa a API real do H2 System
  const apiBase = config.public.dev 
    ? '/api/mock' 
    : config.externalApiBaseRw

  /**
   * Busca dados de uma unidade específica
   */
  const getUnidade = async (slug: string) => {
    try {
      const { data, error } = await useFetch<Unidade>(`${apiBase}/unidade/${slug}`, {
        key: `unidade-${slug}`,
        retry: false
      })

      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode || 500,
          message: `Erro ao buscar unidade: ${error.value.message}`
        })
      }

      return data.value
    } catch (err) {
      console.error('Erro ao buscar unidade:', err)
      throw err
    }
  }

  /**
   * Busca módulos de uma unidade
   */
  const getUnidadeModulos = async (slug: string) => {
    try {
      const { data, error } = await useFetch<UnidadeModulos>(`${apiBase}/unidade/${slug}/modulos`, {
        key: `modulos-${slug}`,
        retry: false
      })

      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode || 500,
          message: `Erro ao buscar módulos: ${error.value.message}`
        })
      }

      return data.value
    } catch (err) {
      console.error('Erro ao buscar módulos:', err)
      throw err
    }
  }

  /**
   * Lista todas as unidades disponíveis
   */
  const getUnidades = async () => {
    try {
      const response = await $fetch<Unidade[]>(`${apiBase}/unidades`)
      return response
    } catch (err) {
      console.error('Erro ao buscar unidades:', err)
      throw createError({
        statusCode: 500,
        message: `Erro ao buscar unidades: ${err}`
      })
    }
  }

  return {
    getUnidade,
    getUnidadeModulos,
    getUnidades
  }
}
