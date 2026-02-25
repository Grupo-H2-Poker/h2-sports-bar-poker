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
                titulo: 'Bem-vindo à Unidade São Paulo',
                subtitulo: 'O melhor clube da cidade',
                imagem: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8',
                cta: 'Saiba Mais',
                link: '/sobre'
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
            titulo: 'Próximos Eventos'
          },
          components: [
            {
              id: 2,
              type: 'card',
              ordem: 1,
              status: 'publicado',
              data: {
                titulo: 'Torneio de Tênis',
                descricao: 'Campeonato interno de tênis. Inscrições abertas!',
                imagem: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8',
                data: '2025-12-15T10:00:00',
                link: '/eventos/torneio-tenis'
              }
            },
            {
              id: 3,
              type: 'card',
              ordem: 2,
              status: 'publicado',
              data: {
                titulo: 'Aula de Natação',
                descricao: 'Aulas especiais para iniciantes',
                imagem: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487',
                data: '2025-12-20T14:00:00',
                link: '/eventos/natacao'
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
            titulo: 'Próximos Eventos'
          },
          components: [
            {
              id: 2,
              type: 'card',
              ordem: 1,
              status: 'publicado',
              data: {
                titulo: 'Torneio de Tênis',
                descricao: 'Campeonato interno de tênis. Inscrições abertas!',
                imagem: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8',
                data: '2025-12-15T10:00:00',
                link: '/eventos/torneio-tenis'
              }
            },
            {
              id: 3,
              type: 'card',
              ordem: 2,
              status: 'publicado',
              data: {
                titulo: 'Aula de Natação',
                descricao: 'Aulas especiais para iniciantes',
                imagem: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487',
                data: '2025-12-20T14:00:00',
                link: '/eventos/natacao'
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
