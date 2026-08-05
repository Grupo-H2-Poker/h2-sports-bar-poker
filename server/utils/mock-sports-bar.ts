/** Página Sports Bar — mock CMS (Figma 494:1447). */

const PREVIEW_IMGS = [
  '/img/sports-bar/preview-1.png',
  '/img/sports-bar/preview-2.png',
  '/img/sports-bar/preview-3.png',
  '/img/sports-bar/preview-4.png',
  '/img/sports-bar/preview-5.jpg',
] as const

export function createSportsBarPagina(ordem = 6, idBase = 9600) {
  let cid = idBase

  const nextId = () => ++cid

  return {
    slug: 'sports-bar',
    titulo: 'Sports Bar',
    ordem,
    status: 'publicado' as const,
    modulos: [
      // Hero strip
      {
        id: idBase + 1,
        tipo: 'banner' as const,
        ordem: 1,
        status: 'publicado' as const,
        margin_top: 0,
        margin_bottom: 40,
        metadados: { full_width: true },
        components: [
          {
            id: nextId(),
            type: 'banner',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              imagem: '/img/sports-bar/hero.png',
              size: 'lg',
              height: 'strip',
              overlay: 'none',
              rounded: false,
            },
          },
        ],
      },

      // Intro
      {
        id: idBase + 2,
        tipo: 'texto' as const,
        ordem: 2,
        status: 'publicado' as const,
        margin_top: 0,
        margin_bottom: 80,
        metadados: {
          align: 'center' as const,
          max_width: 'lg' as const,
          background: 'none' as const,
        },
        components: [
          {
            id: nextId(),
            type: 'section_cta',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              titulo: 'Sports Bar 24h',
              descricao:
                'Muito além de ser reconhecido como a melhor casa de poker da América Latina, o H2 entrega uma experiência completa e a gastronomia é parte essencial dela.',
              descricao_2:
                'Em todas as unidades, jogadores e visitantes contam com um Sports Bar que funciona 24 horas por dia, ideal para quem valoriza boa comida, conforto e entretenimento a qualquer momento.',
              align: 'center',
              size: 'md',
              width: 'lg',
            },
          },
        ],
      },

      // Galeria preview
      {
        id: idBase + 3,
        tipo: 'galeria_preview' as const,
        ordem: 3,
        status: 'publicado' as const,
        margin_top: 40,
        margin_bottom: 40,
        metadados: {
          carousel_bleed_left: true,
          carousel_bleed_right: true,
          link: 'galeria',
        },
        components: PREVIEW_IMGS.map((imagem, i) => ({
          id: nextId(),
          type: 'imagem' as const,
          ordem: i + 1,
          status: 'publicado' as const,
          data: { imagem },
        })),
      },

      // Nosso sports bar (CTA esquerda flush, imagem direita)
      {
        id: idBase + 4,
        tipo: 'banner' as const,
        ordem: 4,
        status: 'publicado' as const,
        margin_top: 40,
        margin_bottom: 40,
        components: [
          {
            id: nextId(),
            type: 'banner',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              layout: 'two_column',
              size: 'md',
              cta_column: 'left',
              cta_padding: 'flush',
              imagem_size: 'lg',
              border_radius: 'lg',
              imagem: '/img/sports-bar/nosso-sports-bar.png',
              section_cta: {
                titulo: 'Nosso sports bar',
                descricao:
                  'O Sports Bar oferece lounge, bar completo, mesas confortáveis e telas estrategicamente distribuídas, para que você acompanhe as principais transmissões do esporte mundial com total conforto, imersão e atmosfera vibrante.',
                align: 'left',
                size: 'md',
              },
            },
          },
        ],
      },

      // Sabor com assinatura (imagem esquerda, CTA direita)
      {
        id: idBase + 5,
        tipo: 'banner' as const,
        ordem: 5,
        status: 'publicado' as const,
        margin_top: 40,
        margin_bottom: 40,
        components: [
          {
            id: nextId(),
            type: 'banner',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              layout: 'two_column',
              size: 'md',
              cta_column: 'right',
              imagem_size: 'lg',
              border_radius: 'lg',
              imagem: '/img/sports-bar/japones.png',
              section_cta: {
                titulo: 'Sabor com assinatura\nde excelência',
                descricao:
                  'A culinária japonesa ganha protagonismo com uma seleção refinada de sushis, sashimis e temakis, além de pratos especiais que valorizam técnica, frescor e apresentação.',
                descricao_2:
                  'Cada detalhe é cuidadosamente preparado por chefs especializados, entregando uma experiência autêntica, leve e sofisticada em cada peça.',
                align: 'left',
                size: 'md',
              },
            },
          },
        ],
      },

      // Um menu, mil momentos (CTA esquerda flush, imagem direita)
      {
        id: idBase + 6,
        tipo: 'banner' as const,
        ordem: 6,
        status: 'publicado' as const,
        margin_top: 40,
        margin_bottom: 40,
        components: [
          {
            id: nextId(),
            type: 'banner',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              layout: 'two_column',
              size: 'md',
              cta_column: 'left',
              cta_padding: 'flush',
              imagem_size: 'lg',
              border_radius: 'lg',
              imagem: '/img/sports-bar/menu.png',
              section_cta: {
                titulo: 'Um menu,\nmil momentos',
                descricao:
                  'Do prático ao sofisticado, o menu reúne opções para todos os gostos e ocasiões: pratos executivos para o dia a dia, hambúrgueres suculentos, massas e risotos irresistíveis, além de uma seleção à la carte com aves e carnes vermelhas. Para completar, sobremesas que encerram a experiência com o toque perfeito. Tudo pensado para oferecer variedade, qualidade e muito sabor em cada escolha.',
                align: 'left',
                size: 'md',
              },
            },
          },
        ],
      },

      // O brinde perfeito (imagem esquerda, CTA direita)
      {
        id: idBase + 7,
        tipo: 'banner' as const,
        ordem: 7,
        status: 'publicado' as const,
        margin_top: 40,
        margin_bottom: 40,
        components: [
          {
            id: nextId(),
            type: 'banner',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              layout: 'two_column',
              size: 'md',
              cta_column: 'right',
              imagem_size: 'lg',
              border_radius: 'lg',
              imagem: '/img/sports-bar/drinks.png',
              section_cta: {
                titulo: 'O brinde perfeito\ncomeça aqui',
                descricao:
                  'Os melhores drinks do país elevam a experiência, servidos tanto no balcão quanto nas mesas do H2. Clássicos consagrados como Negroni, Margarita, Dry Martini, Tequila e Mojito dividem espaço com uma curadoria especial de vinhos selecionados criando o equilíbrio perfeito entre sofisticação, sabor e momentos que convidam a ficar mais.',
                align: 'left',
                size: 'md',
              },
            },
          },
        ],
      },

      // FAQ
      {
        id: idBase + 8,
        tipo: 'faq' as const,
        ordem: 8,
        status: 'publicado' as const,
        margin_top: 40,
        margin_bottom: 40,
        metadados: {
          margin_lateral: 100,
        },
        components: [
          {
            id: nextId(),
            type: 'section_cta',
            ordem: 0,
            status: 'publicado' as const,
            data: {
              titulo: 'Precisa\nde ajuda?',
              descricao: 'Aqui estão algumas das perguntas mais frequentes do H2.',
              cta: 'Saiba mais',
              cta_link: 'faq',
              cta_cor: 'verde',
              align: 'left',
              size: 'md',
              width: 'md',
            },
          },
          {
            id: nextId(),
            type: 'faq',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              pergunta: 'Lorem ipsum dolor sit amet, t, sed tempor?',
              resposta:
                'Em breve publicaremos as respostas específicas do Sports Bar. Enquanto isso, confira a página de FAQ completa.',
            },
          },
          {
            id: nextId(),
            type: 'faq',
            ordem: 2,
            status: 'publicado' as const,
            data: {
              pergunta: 'Lorem ipsum dolor sit amet, t, sed tempor?',
              resposta:
                'Em breve publicaremos as respostas específicas do Sports Bar. Enquanto isso, confira a página de FAQ completa.',
            },
          },
          {
            id: nextId(),
            type: 'faq',
            ordem: 3,
            status: 'publicado' as const,
            data: {
              pergunta: 'Lorem ipsum dolor sit amet, t, sed tempor?',
              resposta:
                'Em breve publicaremos as respostas específicas do Sports Bar. Enquanto isso, confira a página de FAQ completa.',
            },
          },
        ],
      },
    ],
  }
}
