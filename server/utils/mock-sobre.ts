/** Página Quem somos (`slug: sobre`) — mock CMS (Figma 616:40078). */

export const SOBRE_LEGADO_TITLE = 'De um sonho, nasce um legado no poker brasileiro'
export const SOBRE_LEGADO_DESC =
  'Em um país com 12 milhões de jogadores apaixonados pelo poker, um sonho ganhou forma, propósito e identidade. Um sonho que atravessou mesas, gerações e fronteiras, ajudando a construir a história do poker no Brasil.'
export const SOBRE_LEGADO_DESC_2 =
  'Com pioneirismo, profissionalismo e credibilidade construídos ao longo de 20 anos de atuação, o H2 consolidou-se como uma das principais referências do poker nacional.'
export const SOBRE_LEGADO_DESC_3 =
  'Hoje, o Grupo H2 é reconhecido como um dos principais players do segmento de poker na América Latina, resultado de um sonho que se transformou em história, comunidade e legado.'

export const SOBRE_COMECOU_TITLE = 'Como começou'
export const SOBRE_COMECOU_DESC =
  'A trajetória começou em 2006, quando um grupo de amigos decidiu criar um espaço profissional, estruturado e acolhedor para a prática do poker. Assim nasceu o Grêmio Recreativo Social e Cultural Hold\'em, que evoluiu ao longo dos anos até se tornar o H2 Sports Bar & Poker.'
export const SOBRE_COMECOU_DESC_2 =
  'Ao longo dessa caminhada, o H2 passou a promover campeonatos e circuitos consagrados, como o CPH. Além de investir continuamente na formação de novos jogadores através da H2school, escola de poker do grupo.'

export const SOBRE_UNIDADES_TITLE = 'Nossas Unidades'
export const SOBRE_UNIDADES_DESC =
  'Com quatro clubes físicos em São Paulo, Campinas, Curitiba e Belo Horizonte, o grupo fortalece sua presença nacional. E com o H2online, leva o jogo ainda mais longe, conectando pessoas de todo o Brasil.'

export const SOBRE_CTA_UNIDADE = 'Conheça a unidade'
export const SOBRE_CTA_ONLINE = 'Conheça o H2online'

export const SOBRE_UNIDADE_SP = 'São Paulo'
export const SOBRE_UNIDADE_SP_DESC = 'O maior clube de poker da América Latina'
export const SOBRE_UNIDADE_CAMPINAS = 'Campinas'
export const SOBRE_UNIDADE_CAMPINAS_DESC = 'O clube que elevou o poker em Campinas e região.'
export const SOBRE_UNIDADE_CURITIBA = 'Curitiba'
export const SOBRE_UNIDADE_CURITIBA_DESC = 'O melhor clube de poker de Curitiba'
export const SOBRE_UNIDADE_BH = 'Belo Horizonte'
export const SOBRE_UNIDADE_BH_DESC = 'Novos ares para o poker.'
export const SOBRE_UNIDADE_ONLINE = 'H2online'
export const SOBRE_UNIDADE_ONLINE_DESC = 'Jogue 24 horas por dia!'

export const SOBRE_UNIQUE_TITLE = 'H2unique: Exclusividade na mesa'
export const SOBRE_UNIQUE_DESC =
  'É nesse cenário que surgem novas mesas, novos olhares e um novo conceito: a H2unique, cuja principal característica é reunir um seleto grupo de jogadores para viver, à mesa, a verdadeira experiência da exclusividade.'
export const SOBRE_CTA_UNIQUE = 'Conheça o H2unique'

const STRIP_IMGS = [
  '/img/sobre/strip-1.jpg',
  '/img/sobre/strip-2.jpg',
  '/img/sobre/strip-3.jpg',
  '/img/sobre/strip-4.jpg',
  '/img/sobre/strip-5.jpg',
] as const

const UNIDADES = [
  {
    titulo: SOBRE_UNIDADE_SP,
    descricao: SOBRE_UNIDADE_SP_DESC,
    imagem: '/img/sobre/unidade-sp.jpg',
    cta: SOBRE_CTA_UNIDADE,
    link: '/',
  },
  {
    titulo: SOBRE_UNIDADE_CAMPINAS,
    descricao: SOBRE_UNIDADE_CAMPINAS_DESC,
    imagem: '/img/sobre/unidade-campinas.jpg',
    cta: SOBRE_CTA_UNIDADE,
    link: '/',
  },
  {
    titulo: SOBRE_UNIDADE_CURITIBA,
    descricao: SOBRE_UNIDADE_CURITIBA_DESC,
    imagem: '/img/sobre/unidade-curitiba.jpg',
    cta: SOBRE_CTA_UNIDADE,
    link: '/',
  },
  {
    titulo: SOBRE_UNIDADE_BH,
    descricao: SOBRE_UNIDADE_BH_DESC,
    imagem: undefined as string | undefined,
    cta: SOBRE_CTA_UNIDADE,
    link: '/',
  },
  {
    titulo: SOBRE_UNIDADE_ONLINE,
    descricao: SOBRE_UNIDADE_ONLINE_DESC,
    imagem: '/img/sobre/unidade-online.jpg',
    cta: SOBRE_CTA_ONLINE,
    link: 'https://h2.bet.br',
  },
] as const

export function createSobrePagina(ordem = 9, idBase = 10100) {
  let cid = idBase

  const nextId = () => ++cid

  return {
    slug: 'sobre',
    titulo: 'Quem somos',
    ordem,
    status: 'publicado' as const,
    modulos: [
      // 1. Hero strip
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
              imagem: '/img/sobre/hero.png',
              size: 'lg',
              height: 'strip',
              overlay: 'none',
              rounded: false,
            },
          },
        ],
      },

      // 2. Legado — título + textos
      {
        id: idBase + 2,
        tipo: 'texto' as const,
        ordem: 2,
        status: 'publicado' as const,
        margin_top: 40,
        margin_bottom: 40,
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
              titulo: SOBRE_LEGADO_TITLE,
              descricao: SOBRE_LEGADO_DESC,
              descricao_2: SOBRE_LEGADO_DESC_2,
              descricao_3: SOBRE_LEGADO_DESC_3,
              align: 'center',
              size: 'md',
              width: 'lg',
            },
          },
        ],
      },

      // 3. Carrossel de fotos (bleed L/R)
      {
        id: idBase + 3,
        tipo: 'galeria_preview' as const,
        ordem: 3,
        status: 'publicado' as const,
        margin_top: 0,
        margin_bottom: 80,
        metadados: {
          carousel_bleed_left: true,
          carousel_bleed_right: true,
        },
        components: STRIP_IMGS.map((imagem, i) => ({
          id: nextId(),
          type: 'imagem' as const,
          ordem: i + 1,
          status: 'publicado' as const,
          data: { imagem },
        })),
      },

      // 4. Como começou — banner two_column + drag_carousel (padrão CPH / Mais de 20 anos)
      {
        id: idBase + 4,
        tipo: 'banner' as const,
        ordem: 4,
        status: 'publicado' as const,
        margin_top: 80,
        margin_bottom: 80,
        components: [
          {
            id: nextId(),
            type: 'banner',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              layout: 'two_column',
              size: 'lg',
              cta_column: 'left',
              reverse_columns: false,
              imagem_size: 'lg',
              border_radius: 'sm',
              drag_carousel: true,
              carousel_bleed_right: true,
              imagens: ['/img/sobre/comecou-1.jpg', '/img/sobre/comecou-2.jpg'],
              section_cta: {
                titulo: SOBRE_COMECOU_TITLE,
                descricao: SOBRE_COMECOU_DESC,
                descricao_2: SOBRE_COMECOU_DESC_2,
                align: 'left',
                size: 'md',
              },
            },
          },
        ],
      },

      // 5. Nossas Unidades — título
      {
        id: idBase + 5,
        tipo: 'texto' as const,
        ordem: 5,
        status: 'publicado' as const,
        margin_top: 80,
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
              titulo: SOBRE_UNIDADES_TITLE,
              descricao: SOBRE_UNIDADES_DESC,
              align: 'center',
              size: 'md',
              width: 'lg',
            },
          },
        ],
      },

      // 6. Cards das unidades (3+2)
      {
        id: idBase + 6,
        tipo: 'agenda_preview' as const,
        ordem: 6,
        status: 'publicado' as const,
        margin_top: 0,
        margin_bottom: 80,
        metadados: {
          hide_cash_game: true,
          card_variant: 'unidade' as const,
          layout: 'wrap' as const,
        },
        components: UNIDADES.map((u, i) => ({
          id: nextId(),
          type: 'card' as const,
          ordem: i + 1,
          status: 'publicado' as const,
          data: {
            variant: 'unidade' as const,
            titulo: u.titulo,
            descricao: u.descricao,
            imagem: u.imagem,
            botoes: [
              {
                label: u.cta,
                cor: 'verde' as const,
                link: u.link,
              },
            ],
          },
        })),
      },

      // 7. H2unique — banner two_column + drag_carousel (padrão CPH + CTA)
      {
        id: idBase + 7,
        tipo: 'banner' as const,
        ordem: 7,
        status: 'publicado' as const,
        margin_top: 80,
        margin_bottom: 80,
        components: [
          {
            id: nextId(),
            type: 'banner',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              layout: 'two_column',
              size: 'lg',
              cta_column: 'left',
              reverse_columns: false,
              imagem_size: 'lg',
              border_radius: 'sm',
              drag_carousel: true,
              carousel_bleed_right: true,
              imagens: ['/img/sobre/unique-1.jpg', '/img/sobre/unique-2.jpg'],
              section_cta: {
                titulo: SOBRE_UNIQUE_TITLE,
                descricao: SOBRE_UNIQUE_DESC,
                cta: SOBRE_CTA_UNIQUE,
                cta_link: 'unique',
                cta_cor: 'verde',
                align: 'left',
                size: 'md',
              },
            },
          },
        ],
      },
    ],
  }
}
