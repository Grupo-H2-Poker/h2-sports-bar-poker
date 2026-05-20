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

      modulos: [
        // Eventos
        {
          id: 1,
          tipo: 'eventos',
          ordem: 1,
          status: 'publicado',
          metadados: {
            titulo: 'Torneios de hoje',
            descricao: 'ulalalal',
            cta: 'Ir para eventos',
            cta_link: '/eventos',
            align: 'center',
            size: 'md'
          },
          components: [
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
          metadados: {
            titulo: 'Torneios de hoje',
            descricao: 'Confira a agenda completa de torneios de hoje !!!!!',
            cta: 'Veja a agenda completa',
            cta_link: '/agenda',
            align: 'left',
            size: 'md'
          },
          components: [
            {
              id: 1,
              type: 'card',
              ordem: 1,
              status: 'publicado',
              data: {
                titulo: '5K Super 5 Mega Monster',
                garantido: '5K Garantido',
                inicio: '15:00',
                late: '17:00',
                inscricoes: '16:50',
                link: '/torneios/sunday-million'
              }
            },
            {
              id: 2,
              type: 'card',
              ordem: 2,
              status: 'publicado',
              data: {
                titulo: 'Freezeout Noturno',
                garantido: '50K Garantido',
                inicio: '20:00',
                late: '22:00',
                inscricoes: '21:50',
                link: '/torneios/freezeout-noturno'
              }
            },
            {
              id: 3,
              type: 'card',
              ordem: 3,
              status: 'publicado',
              data: {
                titulo: 'Turbo Semanal',
                garantido: '10K Garantido',
                inicio: '22:30',
                late: '23:30',
                link: '/torneios/turbo-semanal'
              }
            },
            {
              id: 4,
              type: 'card',
              ordem: 4,
              status: 'publicado',
              data: {
                titulo: 'Turbo Semanal',
                garantido: '10K Garantido',
                inicio: '22:30',
                late: '23:30',
                link: '/torneios/turbo-semanal'
              }
            },
            {
              id: 4,
              type: 'card',
              ordem: 4,
              status: 'publicado',
              data: {
                titulo: 'Turbo Semanal',
                garantido: '10K Garantido',
                inicio: '22:30',
                late: '23:30',
                link: '/torneios/turbo-semanal'
              }
            },
            {
              id: 4,
              type: 'card',
              ordem: 4,
              status: 'publicado',
              data: {
                titulo: 'Turbo Semanal',
                garantido: '10K Garantido',
                inicio: '22:30',
                late: '23:30',
                link: '/torneios/turbo-semanal'
              }
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

      modulos: [

        // Galeria
        {
          id: 3,
          tipo: "galeria",
          ordem: 1,
          status: "publicado",
          metadados: {
            titulo: 'Galeria de fotos',
            descricao: '',
            cta: '',
            cta_link: '',
            align: 'center',
            size: 'md'
          },
          components: [
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
          metadados: {
            titulo: 'Confira os próximos torneios de hoje',
            cta: 'Veja a agenda completa',
            cta_link: '/agenda',
            size: 'md'
          },
          components: [
            {
              id: 2,
              type: 'card',
              ordem: 1,
              status: 'publicado',
              data: {
                titulo: 'Main Event Campinas',
                garantido: 'R$ 20.000 GTD',
                inicio: '14:00',
                late: '16:00',
                inscricoes: '15:50',
                link: '/torneios/main-event-campinas'
              }
            },
            {
              id: 3,
              type: 'card',
              ordem: 2,
              status: 'publicado',
              data: {
                titulo: 'Satélite Main Event',
                garantido: 'R$ 2.000 GTD',
                inicio: '19:00',
                late: '20:30',
                inscricoes: '20:20',
                link: '/torneios/satelite-main'
              }
            },
            {
              id: 5,
              type: 'card',
              ordem: 3,
              status: 'publicado',
              data: {
                titulo: 'Bounty Noturno',
                inicio: '21:00',
                late: '22:30',
                link: '/torneios/bounty-noturno'
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
