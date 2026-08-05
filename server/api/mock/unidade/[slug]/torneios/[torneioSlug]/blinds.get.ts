import { findTorneioBySlug } from '../../../../../../utils/mock-agenda-data'
import { localizeCmsPayload } from '../../../../../../utils/mock-i18n'

export default defineEventHandler(async (event) => {
  const unidadeSlug = getRouterParam(event, 'slug')
  const torneioSlug = getRouterParam(event, 'torneioSlug')
  const query = getQuery(event)

  if (!unidadeSlug || !torneioSlug) {
    throw createError({ statusCode: 400, message: 'slug e torneioSlug são obrigatórios' })
  }

  const torneio = findTorneioBySlug(torneioSlug)
  if (!torneio) {
    throw createError({ statusCode: 404, message: `Torneio "${torneioSlug}" não encontrado` })
  }

  const payload = {
    slug: torneio.slug,
    titulo: torneio.titulo,
    rows: torneio.blinds ?? [],
  }

  return await localizeCmsPayload(payload, query.lang)
})
