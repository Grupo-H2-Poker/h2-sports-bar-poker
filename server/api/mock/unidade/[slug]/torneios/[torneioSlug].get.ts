import { findTorneioBySlug, torneioLink } from '../../../../../utils/mock-agenda-data'

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

  const link = torneioLink(torneio.slug)
  const btnCor = torneio.cor === 'vermelho' ? 'branco' : 'verde'

  return {
    slug: torneio.slug,
    titulo: torneio.titulo,
    data_label: torneio.data_label,
    specs: torneio.specs ?? [],
    nota: torneio.nota,
    blinds_link: torneio.blinds_link,
    card: {
      variant: 'torneio_detalhe',
      cor: torneio.cor ?? 'purple',
      titulo: torneio.titulo,
      buy_in: {
        label: 'Buy-in',
        preco: torneio.buy_in.preco,
      },
      inicio: torneio.inicio,
      late: torneio.late,
      faixa_info: torneio.faixa_info,
      descricao: torneio.descricao,
      botoes: [
        { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link },
      ],
      link_footer: torneio.regulamento_link
        ? { texto: 'Confira o regulamento', link: torneio.regulamento_link }
        : undefined,
    },
    faixa_cta: torneio.faixa_cta
      ? {
          titulo: torneio.faixa_cta.titulo,
          titulo_size: '30px',
          cta: torneio.faixa_cta.cta,
          cta_link: torneio.faixa_cta.cta_link,
          backgroundColor: '#f5f5f5',
          textColor: '#000000',
          cta_backgroundColor: 'transparent',
          cta_textColor: '#000000',
          cta_border: '1px solid #000000',
          cta_rounded: 'rounded-lg',
          border_radius: '8px',
          fullWidth: false,
          gap: 20,
          align_horizontal: 'start',
          align_vertical: 'start',
          padding_x: 40,
          padding_y: 40,
          stack: true,
          stack_mobile: true,
        }
      : undefined,
  }
})
