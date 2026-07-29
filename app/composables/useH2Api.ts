import type { Unidade, UnidadeModulos } from '~/types/modules'
import type { TorneioDetalheData } from '~/types/torneio-detalhe'

export const useH2Api = () => {
  const config = useRuntimeConfig()

  const apiBase = config.public.dev
    ? '/api/mock'
    : config.externalApiBaseRw

  const getUnidade = async (slug: string) => {
    try {
      const { data, error } = await useFetch<Unidade>(`${apiBase}/unidade/${slug}`, {
        key: `unidade-${slug}`,
        retry: false,
      })

      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode || 500,
          message: `Erro ao buscar unidade: ${error.value.message}`,
        })
      }

      return data.value
    }
    catch (err) {
      console.error('Erro ao buscar unidade:', err)
      throw err
    }
  }

  const getUnidadeModulos = async (slug: string) => {
    try {
      const { data, error } = await useFetch<UnidadeModulos>(`${apiBase}/unidade/${slug}/modulos`, {
        key: `modulos-${slug}`,
        retry: false,
      })

      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode || 500,
          message: `Erro ao buscar módulos: ${error.value.message}`,
        })
      }

      return data.value
    }
    catch (err) {
      console.error('Erro ao buscar módulos:', err)
      throw err
    }
  }

  const getUnidades = async () => {
    try {
      const response = await $fetch<Unidade[]>(`${apiBase}/unidades`)
      return response
    }
    catch (err) {
      console.error('Erro ao buscar unidades:', err)
      throw createError({
        statusCode: 500,
        message: `Erro ao buscar unidades: ${err}`,
      })
    }
  }

  const getTorneioDetalhe = async (unidadeSlug: string, torneioSlug: string) => {
    try {
      return await $fetch<TorneioDetalheData>(
        `${apiBase}/unidade/${unidadeSlug}/torneios/${torneioSlug}`,
      )
    }
    catch (err: unknown) {
      console.error('Erro ao buscar detalhe do torneio:', err)
      const statusCode = (err as { statusCode?: number })?.statusCode || 404
      throw createError({
        statusCode,
        message: 'Torneio não encontrado',
      })
    }
  }

  return {
    getUnidade,
    getUnidadeModulos,
    getUnidades,
    getTorneioDetalhe,
  }
}
