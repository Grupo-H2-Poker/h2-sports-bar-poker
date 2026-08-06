import type { Unidade, UnidadeModulos } from '~/types/modules'
import type { TorneioBlindsData } from '~/types/torneio-blinds'
import type { TorneioDetalheData } from '~/types/torneio-detalhe'

export const useH2Api = () => {
  const config = useRuntimeConfig()

  const useMockApi = Boolean(config.public.useMockApi)
  const externalBase = String(config.public.externalApiBaseRw || '').replace(/\/$/, '')
  const apiBase = useMockApi || !externalBase
    ? '/api/mock'
    : externalBase

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

  const getUnidadeModulos = async (slug: string, lang = 'pt') => {
    try {
      return await $fetch<UnidadeModulos>(`${apiBase}/unidade/${slug}/modulos`, {
        query: { lang },
      })
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

  const getTorneioDetalhe = async (unidadeSlug: string, torneioSlug: string, lang = 'pt') => {
    try {
      return await $fetch<TorneioDetalheData>(
        `${apiBase}/unidade/${unidadeSlug}/torneios/${torneioSlug}`,
        { query: { lang } },
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

  const getTorneioBlinds = async (unidadeSlug: string, torneioSlug: string, lang = 'pt') => {
    try {
      return await $fetch<TorneioBlindsData>(
        `${apiBase}/unidade/${unidadeSlug}/torneios/${torneioSlug}/blinds`,
        { query: { lang } },
      )
    }
    catch (err: unknown) {
      console.error('Erro ao buscar tabela de blinds:', err)
      const statusCode = (err as { statusCode?: number })?.statusCode || 404
      throw createError({
        statusCode,
        message: 'Tabela de blinds não encontrada',
      })
    }
  }

  return {
    getUnidade,
    getUnidadeModulos,
    getUnidades,
    getTorneioDetalhe,
    getTorneioBlinds,
  }
}
