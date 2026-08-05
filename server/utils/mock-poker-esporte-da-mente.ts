/** Página Poker Esporte da Mente — mock CMS. */

const PREVIEW_IMGS = [
  '/img/poker-mente/preview-1.png',
  '/img/poker-mente/preview-2.png',
  '/img/poker-mente/preview-3.png',
  '/img/poker-mente/preview-4.png',
  '/img/poker-mente/preview-5.png',
] as const

export function createPokerEsporteDaMentePagina(ordem = 5, idBase = 9500) {
  let cid = idBase

  const nextId = () => ++cid

  return {
    slug: 'poker-esporte-da-mente',
    titulo: 'Poker Esporte da Mente',
    ordem,
    status: 'publicado' as const,
    modulos: [
      // Hero — mesmo formato das páginas de série (strip full-width)
      {
        id: idBase + 1,
        tipo: 'banner' as const,
        ordem: 1,
        status: 'publicado' as const,
        margin_bottom: 40,
        metadados: { full_width: true },
        components: [
          {
            id: nextId(),
            type: 'banner',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              imagem: '/img/poker-mente/hero.png',
              size: 'lg',
              height: 'strip',
              overlay: 'none',
              rounded: false,
            },
          },
        ],
      },

      // Intro — SectionCTA (título sólido + descrição opacity-80)
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
              titulo: 'Poker: Regulamentado,\nreconhecido e respeitado.',
              descricao:
                'Durante muitos anos, o poker foi alvo de polêmicas no Brasil por ser frequentemente\nconfundido com jogos de azar. Hoje, porém, a resposta para a pergunta sobre sua legalidade\né clara: <strong>sim, o poker é lícito no Brasil e reconhecido como um esporte da mente.</strong>',
              align: 'center',
              size: 'md',
              width: 'lg',
            },
          },
        ],
      },

      // Galeria preview (bleed L+R, edge-to-edge)
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
        },
        components: PREVIEW_IMGS.map((imagem, i) => ({
          id: nextId(),
          type: 'imagem' as const,
          ordem: i + 1,
          status: 'publicado' as const,
          data: { imagem },
        })),
      },

      // Poker no Brasil (two column)
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
              imagem_size: 'lg',
              border_radius: 'lg',
              imagem: '/img/poker-mente/poker-brasil.png',
              section_cta: {
                titulo: 'Poker no Brasil',
                descricao:
                  'Um marco relevante para o poker no Brasil ocorreu em 26 de janeiro de 2012, quando o Ministério do Esporte reconheceu oficialmente a modalidade como um esporte da mente.',
                descricao_2:
                  'Na mesma ocasião, a Confederação Brasileira de Texas Hold’em (CBTH) passou a integrar os quadros oficiais do órgão, consolidando o reconhecimento institucional do poker como prática esportiva no país.',
                descricao_3:
                  'A nomenclatura “esportes da mente” é atribuída a modalidades que exigem alto nível de habilidade intelectual. Esportes como xadrez, damas e, agora, o poker, trabalham intensamente o cérebro e a lógica, estimulando o raciocínio rápido e a capacidade de tomada de decisões estratégicas.',
                align: 'left',
                size: 'md',
              },
            },
          },
        ],
      },

      // Quando o jogo virou lei
      {
        id: idBase + 5,
        tipo: 'texto' as const,
        ordem: 5,
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
              titulo: 'Quando o jogo virou lei...',
              align: 'center',
              size: 'md',
            },
          },
        ],
      },
      {
        id: idBase + 6,
        tipo: 'banner' as const,
        ordem: 6,
        status: 'publicado' as const,
        margin_top: 0,
        margin_bottom: 40,
        components: [
          {
            id: nextId(),
            type: 'banner',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              imagem: '/img/poker-mente/video-thumb.png',
              size: 'md',
              border_radius: 'md',
              play_overlay: true,
              video_embed: 'https://www.youtube.com/embed/jwpUgON5AZI',
              titulo: 'Audiência Pública - Marco Regulatório dos Jogos no Brasil - 28/05/16',
              overlay: 'none',
            },
          },
        ],
      },

      // O reconhecimento
      {
        id: idBase + 7,
        tipo: 'texto' as const,
        ordem: 7,
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
              titulo: 'O reconhecimento...',
              descricao:
                'A consolidação definitiva do poker em nível global aconteceu em novembro de 2024, com\num dos momentos mais significativos de sua história: o reconhecimento oficial como Mind\nSport (esporte da mente) pela International Mind Sports Association (IMSA), entidade\nresponsável por chancelar modalidades como o xadrez e os eSports. A decisão, aprovada\npor unanimidade, reforça o entendimento internacional de que o poker é uma prática\nbaseada predominantemente em habilidade, estratégia e raciocínio lógico.',
              descricao_2:
                'Esse avanço histórico foi liderado pela World Poker Federation (WPF), organização\nque reúne federações ativas em mais de 50 países.',
              align: 'center',
              size: 'md',
              width: 'lg',
            },
          },
        ],
      },

      // Quote Federal
      {
        id: idBase + 8,
        tipo: 'banner' as const,
        ordem: 8,
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
              imagem_size: 'md',
              border_radius: 'lg',
              imagem: '/img/poker-mente/federal.png',
              section_cta: {
                descricao:
                  '“O parecer da IMSA representa o trabalho e a dedicação de milhares de pessoas que enxergam o poker como uma verdadeira profissão e uma disciplina intelectual.\nNossa missão agora é construir a base que todo grande esporte possui: regulamentações claras, caminhos profissionais estruturados, proteção aos jogadores e competições internacionais”',
                descricao_2:
                  '<strong>Igor “Federal” Trafane</strong><br>Presidente da WPF',
                align: 'left',
                size: 'md',
              },
            },
          },
        ],
      },

      // Jogo Responsável
      {
        id: idBase + 9,
        tipo: 'texto' as const,
        ordem: 9,
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
              titulo: 'Jogo Responsável',
              descricao:
                'O conceito de jogo responsável visa garantir que as práticas de jogos e apostas sejam realizadas de\nforma segura, saudável e consciente, prevenindo vícios e protegendo os consumidores apostadores,\nespecialmente os mais vulneráveis.',
              descricao_2:
                'Nesse contexto, a Secretaria de Prêmios e Apostas, responsável por regulamentar as atividades de jogos\ne apostas no Brasil, publicou a Portaria SPA/MF nº 1.231, de 31 de julho de 2024, estabelecendo diretrizes\ne medidas para assegurar a integridade e o bem-estar dos apostadores.',
              descricao_3:
                'O H2 está alinhado a esses princípios e faz parte desse movimento de jogo responsável, adotando\npráticas que promovem a transparência, o controle e uma experiência segura para todos os seus clientes.',
              align: 'center',
              size: 'md',
              width: 'lg',
            },
          },
        ],
      },
    ],
  }
}
