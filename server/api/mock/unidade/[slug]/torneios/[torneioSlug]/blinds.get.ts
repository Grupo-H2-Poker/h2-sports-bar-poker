import { findTorneioBySlug } from '../../../../../../utils/mock-agenda-data'

export default defineEventHandler((event) => {
  const unidadeSlug = getRouterParam(event, 'slug')
  const torneioSlug = getRouterParam(event, 'torneioSlug')

  if (!unidadeSlug || !torneioSlug) {
    throw createError({ statusCode: 400, message: 'slug e torneioSlug são obrigatórios' })
  }

  const torneio = findTorneioBySlug(torneioSlug)
  if (!torneio) {
    throw createError({ statusCode: 404, message: `Torneio "${torneioSlug}" não encontrado` })
  }

  return {
    slug: torneio.slug,
    titulo: torneio.titulo,
    rows: torneio.blinds ?? [],
  }
})
