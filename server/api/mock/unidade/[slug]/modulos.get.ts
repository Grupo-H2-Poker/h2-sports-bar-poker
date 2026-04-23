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
        
        // Banner
        // {
        //   id: 1,
        //   tipo: 'banner',
        //   ordem: 1,
        //   status: 'publicado',
        //   metadados: {},
        //   components: [
        //     {
        //       id: 1,
        //       type: 'banner',
        //       ordem: 1,
        //       status: 'publicado',
        //       data: {
        //         titulo: 'Bem-vindo à Unidade São Paulo',
        //         subtitulo: 'O melhor clube da cidade',
        //         imagem: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8',
        //         cta: 'Saiba Mais',
        //         link: '/sobre'
        //       }
        //     }
        //   ]
        // },


        // Agenda
        {
          id: 2,
          tipo: 'agenda',
          ordem: 2,
          status: 'publicado',
          metadados: {
            titulo: 'Torneios de hoje',
            cta: 'Veja a agenda completa',
            cta_link: '/agenda'
          },
          components: [
            {
              id: 2,
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
              id: 3,
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
              id: 4,
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
            }
          ]
        }
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
        // Banner
         {
          id: 1,
          tipo: 'banner',
          ordem: 1,
          status: 'publicado',
          metadados: {},
          components: [
            {
              id: 1,
              type: 'banner',
              ordem: 1,
              status: 'publicado',
              data: {
                titulo: 'Bem-vindo à Unidade Campinas',
                subtitulo: 'O melhor clube da cidade',
                imagem: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8',
                cta: 'Saiba Mais',
                link: '/sobre'
              }
            }
          ]
        },

        // Galeria
        {
          id: 3,
          tipo: "galeria",
          ordem: 2,
          status: "publicado",
          metadados: {
            titulo: "Nossas Instalações"
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
            cta_link: '/agenda'
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
