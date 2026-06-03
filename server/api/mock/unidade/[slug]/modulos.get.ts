export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')

  const mockData: Record<string, any> = {

    // UNIDADE
    'sp-pinheiros': {
      unidade: {
        id: 1,
        nome: 'São Paulo',
        slug: 'sp-pinheiros',
        logo: '/images/logo-sp.png',
        status: 'inativo'
      },

      menu: [
        { id: 'h2bet', kind: 'link', label: 'H2Bet', to: 'https://www.h2.bet.br/', external: true },
        { id: 'agenda', kind: 'link', label: 'Agenda', to: '/agenda' },
        {
          id: 'conteudo',
          kind: 'dropdown',
          label: 'Séries',
          items: [
            { id: 'funfestival', kind: 'link', label: 'Fun Festival', to: '/series' },
            { id: 'cph', kind: 'link', label: 'CPH', to: '/unique' },
            { id: 'tardezinha', kind: 'link', label: 'Tardezinha', to: '/unique' },
            { id: 'ladiesweekend', kind: 'link', label: 'Ladies Weekend', to: '/unique' },
            { id: 'xadrez', kind: 'link', label: 'Xadrez', to: '/unique' },
          ]
        },
      ],

      modulos: [
        // Eventos
        {
          id: 1,
          tipo: 'eventos',
          ordem: 1,
          status: 'publicado',
          components: [
            {
              id: 100,
              type: 'section_cta',
              ordem: 0,
              status: 'publicado',
              data: {
                titulo: 'Torneios de hoje',
                descricao: '',
                cta: '',
                cta_link: '/eventos',
                align: 'left',
                size: 'md'
              }
            },
            {
              id: 1,
              type: 'evento',
              ordem: 1,
              status: 'publicado',
              data: {
                titulo: 'H2 Millions São Paulo',
                descricao: 'O maior circuito de poker do Brasil.',
                imagem: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
                cta: 'Saiba mais',
                link: '/eventos/h2-millions'
              }
            },
            {
              id: 2,
              type: 'evento',
              ordem: 2,
              status: 'publicado',
              data: {
                titulo: 'High Roller Experience',
                descricao: 'Estrutura premium para jogadores profissionais.',
                imagem: 'https://images.unsplash.com/photo-1541278107931-e006523892df',
                cta: 'Ver evento',
                link: '/eventos/high-roller'
              }
            },
            {
              id: 3,
              type: 'evento',
              ordem: 3,
              status: 'publicado',
              data: {
                titulo: 'Mystery Bounty Week',
                descricao: 'Premiações surpresa e grandes garantidos.',
                imagem: 'https://images.unsplash.com/photo-1511882150382-421056c89033',
                cta: 'Participar',
                link: '/eventos/mystery-bounty'
              }
            }
          ]
        },
        // Agenda
        {
          id: 2,
          tipo: 'agenda',
          ordem: 2,
          status: 'publicado',
          components: [
            {
              id: 100,
              type: 'section_cta',
              ordem: 0,
              status: 'publicado',
              data: {
                titulo: 'Torneios de hoje',
                descricao: 'Confira a agenda completa de torneios de hoje !!!!!',
                cta: 'Veja a agenda completa',
                cta_link: '/agenda',
                align: 'left',
                size: 'md'
              }
            },
            {
              id: 1,
              type: 'card',
              ordem: 1,
              status: 'publicado',
              data: {
                variant: 'torneio',
                cor: 'purple',
                badge: { texto: '08/10', cor: 'purple' },
                categoria: 'Torneio regular',
                favorito: { visivel: true, ativo: true, cor: 'verde' },
                titulo: '5K Super 5 Mega Monster',
                inicio: '12:30',
                late: '17:00',
                buy_in: {
                  preco: 'R$50,00',
                  pontos: 'ou 2.500 pontos H2Rewards',
                },
                botoes: [
                  { label: 'Saiba mais', variant: 'outline', cor: 'verde', link: '/torneios/sunday-million' },
                  { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: '/torneios/sunday-million/comprar' },
                ],
              },
            },
            {
              id: 2,
              type: 'card',
              ordem: 2,
              status: 'publicado',
              data: {
                variant: 'torneio',
                cor: 'purple',
                badge: { texto: '08/10', cor: 'amarelo' },
                categoria: 'Torneio Fun Festival',
                favorito: { visivel: true, ativo: true, cor: 'verde' },
                titulo: '5K Super 5 Mega Monster',
                inicio: '12:30',
                late: '17:00',
                buy_in: { preco: 'R$50,00', pontos: 'ou 2.500 pontos H2Rewards' },
                botoes: [
                  { label: 'Saiba mais', variant: 'outline', cor: 'verde', link: '/torneios/fun-festival' },
                  { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: '/torneios/fun-festival/comprar' },
                ],
              },
            },
            {
              id: 3,
              type: 'card',
              ordem: 3,
              status: 'publicado',
              data: {
                variant: 'torneio',
                cor: 'vermelho',
                badge: { texto: '08/10', cor: 'vermelho' },
                categoria: 'CPH',
                favorito: { visivel: true, ativo: true, cor: 'branco' },
                titulo: '5K Super 5 Mega Monster',
                inicio: '12:30',
                late: '17:00',
                buy_in: { preco: 'R$50,00', pontos: 'ou 2.500 pontos H2Rewards' },
                botoes: [
                  { label: 'Saiba mais', variant: 'outline', cor: 'branco', link: '/torneios/cph' },
                  { label: 'Comprar buy-in', variant: 'solid', cor: 'branco', link: '/torneios/cph/comprar' },
                ],
              },
            },
            {
              id: 4,
              type: 'card',
              ordem: 4,
              status: 'publicado',
              data: {
                variant: 'cash_game',
                cor: 'purple',
                badge: { texto: 'ABERTA', cor: 'purple' },
                categoria: 'Cash game',
                titulo: 'Omaha 5/5',
                subtitulo: 'Aberta',
                botoes: [
                  { label: 'Entrar na fila', variant: 'solid', cor: 'verde', link: '/cash/omaha-5-5' },
                ],
              },
            },
            {
              id: 5,
              type: 'card',
              ordem: 5,
              status: 'publicado',
              data: {
                variant: 'torneio_detalhe',
                cor: 'purple',
                buy_in: { label: 'Buy-in', preco: 'R$350,00' },
                inicio: '12:30',
                late: '17:00',
                faixa_info: '478 pontos no rankig do CPH',
                descricao: 'Esse torneio dá uma vaga no Main Event do CPH 6ª Etapa',
                botoes: [
                  { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: '/torneios/cph-main/comprar' },
                ],
                link_footer: { texto: 'Confira o regulamento', link: '/torneios/cph/regulamento' },
              },
            },
          ]
        },
      ]
    },

    // ------------------------------------------------------------------------------------------------------------

    // UNIDADE
    'campinas': {
      unidade: {
        id: 2,
        nome: 'Campinas',
        slug: 'campinas',
        logo: '/images/logo-campinas.png',
        status: 'ativo'
      },

      menu: [
        { id: 'h2bet', kind: 'link', label: 'H2Bet', to: 'https://www.h2.bet.br/', external: true },
        { id: 'agenda', kind: 'link', label: 'Agenda', to: '/agenda' },
        { id: 'series', kind: 'link', label: 'Series', to: '/series' },
        {
          id: 'mais',
          kind: 'dropdown',
          label: 'Mais',
          items: [
            { id: 'unique', kind: 'link', label: 'H2unique', to: '/unique' },
            { id: 'eventos', kind: 'link', label: 'Eventos', to: '/eventos' },
            { id: 'unidades', kind: 'link', label: 'Unidades', to: '/unidades' },
            { id: 'h2news', kind: 'link', label: 'H2news', to: '/blognews' },
          ]
        },
      ],

      modulos: [

        // Galeria
        {
          id: 3,
          tipo: "galeria",
          ordem: 1,
          status: "publicado",
          components: [
            {
              id: 100,
              type: 'section_cta',
              ordem: 0,
              status: 'publicado',
              data: {
                titulo: 'Galeria de fotos',
                descricao: '',
                cta: '',
                cta_link: '',
                align: 'center',
                size: 'md'
              }
            },
            {
              id: 4,
              type: "imagem",
              ordem: 1,
              status: "publicado",
              data: {
                imagem: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/1b/lost-valley.jpg?w=700&h=400&s=1",
                titulo: "Quadra de Tênis",
                descricao: "4 quadras profissionais"
              }
            },
            {
              id: 5,
              type: "imagem",
              ordem: 2,
              status: "publicado",
              data: {
                imagem: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/09/meet-and-greet.jpg?w=1000&h=-1&s=1",
                titulo: "Piscina Olímpica",
                descricao: "Piscina aquecida 50m"
              }
            }
          ]
        },


        // Agenda
        {
          id: 2,
          tipo: 'agenda',
          ordem: 3,
          status: 'publicado',
          components: [
            {
              id: 100,
              type: 'section_cta',
              ordem: 0,
              status: 'publicado',
              data: {
                titulo: 'Confira os próximos torneios de hoje',
                cta: 'Veja a agenda completa',
                cta_link: '/agenda',
                size: 'md'
              }
            },
            {
              id: 2,
              type: 'card',
              ordem: 1,
              status: 'publicado',
              data: {
                variant: 'torneio',
                cor: 'purple',
                categoria: 'Torneio regular',
                titulo: 'Main Event Campinas',
                garantido: 'R$ 20.000 GTD',
                inicio: '14:00',
                late: '16:00',
                inscricoes: '15:50',
                buy_in: { preco: 'R$200,00' },
                botoes: [
                  { label: 'Saiba mais', variant: 'outline', link: '/torneios/main-event-campinas' },
                  { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: '/torneios/main-event-campinas/comprar' },
                ],
              }
            },
            {
              id: 3,
              type: 'card',
              ordem: 2,
              status: 'publicado',
              data: {
                variant: 'torneio',
                cor: 'purple',
                titulo: 'Satélite Main Event',
                garantido: 'R$ 2.000 GTD',
                inicio: '19:00',
                late: '20:30',
                inscricoes: '20:20',
                botoes: [
                  { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: '/torneios/satelite-main/comprar' },
                ],
              }
            },
            {
              id: 5,
              type: 'card',
              ordem: 3,
              status: 'publicado',
              data: {
                variant: 'torneio',
                cor: 'purple',
                titulo: 'Bounty Noturno',
                inicio: '21:00',
                late: '22:30',
                botoes: [
                  { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: '/torneios/bounty-noturno/comprar' },
                ],
              }
            }
          ]
        }
      ]
    }


  }

  const data = mockData[slug as string]

  if (!data) {
    throw createError({
      statusCode: 404,
      message: 'Unidade não encontrada'
    })
  }

  return data
})
