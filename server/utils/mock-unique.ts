/** Página H2 Unique (`slug: unique`) — mock CMS (Figma 684:1608). */

import {
  AGENDA_TORNEIOS_PINHEIROS,
  toPreviewCardComponent,
} from './mock-agenda-data'

export const UNIQUE_INTRO_TITLE = 'O jogo que vai além das cartas'
export const UNIQUE_INTRO_DESC =
  'O H2unique nasceu com um propósito claro: entregar experiências de poker para quem realmente joga sério. Aqui, não se trata apenas de jogar é sobre viver o jogo em seu mais alto nível, em um ambiente sofisticado, com gastronomia de excelência e um padrão que reflete a grandeza de cada mesa. Em mais de 10 anos, já são mais de 50 milhões arrecadados, resultado de uma operação sólida, confiável e feita para quem exige o melhor.'

export const UNIQUE_MAJESTIC_TITLE = 'Majestic'
export const UNIQUE_MAJESTIC_DESC =
  'Majestic não é para todos  é para quem entende o valor do jogo. Aqui, o poder está na mesa, mas principalmente na premiação. Um prize pool diferenciado, à altura de jogadores que não buscam apenas competir, mas dominar. Cada ficha representa decisão, leitura e coragem — e cada vitória carrega um retorno proporcional ao nível do desafio. O buy-in segue a mesma lógica: é para quem enxerga o poker como investimento. Para quem sabe que grandes resultados exigem grandes movimentos.'

export const UNIQUE_TOUR_EYEBROW = 'Unique Poker Tour'
export const UNIQUE_TOUR_GUARUJA = 'Guarujá'
export const UNIQUE_TOUR_GUARUJA_TITLE = 'Unique Poker Tour\nGuarujá'
export const UNIQUE_TOUR_GUARUJA_DESC =
  'O poker invadiu as areias do Casa Grande Hotel Resort & Spa, um resort 5 estrelas que combina a elegância da arquitetura colonial brasileira com o conforto e a modernidade.'
export const UNIQUE_TOUR_ATIBAIA = 'Atibaia'
export const UNIQUE_TOUR_ATIBAIA_TITLE = 'Unique Poker Tour\nAtibaia'
export const UNIQUE_TOUR_ATIBAIA_DESC =
  'No imponente Bourbon Atibaia Resort, um dos maiores resorts da América do Sul, o Unique Poker Tour 5ª edição encontrou o cenário perfeito para ir além do jogo.'
export const UNIQUE_CTA_SAIBA = 'Saiba mais'

export const UNIQUE_DESTINOS_TITLE = 'Mais do\nque jogo'
export const UNIQUE_DESTINOS_DESC =
  'A Unique leva o poker aos\ndestinos mais icônicos do Brasil'
export const UNIQUE_DESTINO_ROCAS = 'Rocas do Vouga'
export const UNIQUE_DESTINO_LALENAS = 'La Leñas'
export const UNIQUE_DESTINO_BROWNS = 'Browns Singular Man'
export const UNIQUE_DESTINO_TETTO = 'Tetto Rooftop Lounge'
export const UNIQUE_DESTINO_FAZENDA = 'Fazenda Churrascada'

const MAJESTIC_IMGS = [
  '/img/unique/majestic-1.jpg',
  '/img/unique/majestic-2.jpg',
  '/img/unique/majestic-3.jpg',
  '/img/unique/majestic-4.jpg',
  '/img/unique/majestic-5.jpg',
] as const

export function createUniquePagina(ordem = 10, idBase = 10300) {
  let cid = idBase

  const nextId = () => ++cid

  return {
    slug: 'unique',
    titulo: 'H2unique',
    ordem,
    status: 'publicado' as const,
    modulos: [
      // 1. Agenda preview (mesmo widget da home)
      {
        id: idBase + 1,
        tipo: 'agenda_preview' as const,
        ordem: 1,
        status: 'publicado' as const,
        margin_top: 40,
        margin_bottom: 40,
        metadados: {
          carousel_bleed_right: true,
        },
        components: [
          {
            id: nextId(),
            type: 'section_cta',
            ordem: 0,
            status: 'publicado' as const,
            data: {
              titulo: 'Agenda de hoje',
              cta: 'Veja a agenda completa',
              cta_link: 'agenda',
              align: 'left',
              size: 'md',
            },
          },
          {
            id: nextId(),
            type: 'cash_game',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              titulo: 'Cash Game',
              inicio: '12:00',
              inscricoes: '06:00',
              link: 'fila-cash-game',
              botoes: [{ label: 'Garanta seu lugar', link: 'fila-cash-game' }],
            },
          },
          ...AGENDA_TORNEIOS_PINHEIROS.slice(0, 4).map((t, i) =>
            toPreviewCardComponent(t, nextId(), 2 + i, i === 0),
          ),
        ],
      },

      // 2. Intro — imagem esquerda + texto direita
      {
        id: idBase + 2,
        tipo: 'banner' as const,
        ordem: 2,
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
              size: 'md',
              cta_column: 'right',
              column_ratio: '1/1' as const,
              imagem_size: 'lg',
              border_radius: 'lg',
              imagem: '/img/unique/intro.jpg',
              section_cta: {
                titulo: UNIQUE_INTRO_TITLE,
                descricao: UNIQUE_INTRO_DESC,
                align: 'left',
                size: 'md',
                width: 'md',
              },
            },
          },
        ],
      },

      // 3. Majestic — título + strip
      {
        id: idBase + 3,
        tipo: 'texto' as const,
        ordem: 3,
        status: 'publicado' as const,
        margin_top: 80,
        margin_bottom: 0,
        metadados: {
          align: 'center' as const,
          max_width: 'lg' as const,
          background: 'fade_gray' as const,
        },
        components: [
          {
            id: nextId(),
            type: 'section_cta',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              titulo: UNIQUE_MAJESTIC_TITLE,
              descricao: UNIQUE_MAJESTIC_DESC,
              align: 'center',
              size: 'md',
              width: 'lg',
            },
          },
        ],
      },
      {
        id: idBase + 4,
        tipo: 'galeria_preview' as const,
        ordem: 4,
        status: 'publicado' as const,
        /** Figma 684:1842 — cards sobem ~98px sobre a faixa cinza (só o topo) */
        margin_top: -98,
        margin_bottom: 80,
        metadados: {
          carousel_bleed_left: true,
          carousel_bleed_right: true,
        },
        components: MAJESTIC_IMGS.map((imagem, i) => ({
          id: nextId(),
          type: 'imagem' as const,
          ordem: i + 1,
          status: 'publicado' as const,
          data: { imagem },
        })),
      },

      // 4. Unique Poker Tour — 2 cards overlay
      {
        id: idBase + 5,
        tipo: 'eventos' as const,
        ordem: 5,
        status: 'publicado' as const,
        margin_top: 100,
        margin_bottom: 100,
        metadados: { layout: 'grid' as const, colunas: 2 as const },
        components: [
          {
            id: nextId(),
            type: 'evento',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              titulo: UNIQUE_TOUR_GUARUJA_TITLE,
              descricao: UNIQUE_TOUR_GUARUJA_DESC,
              imagem: '/img/unique/tour-guaruja.jpg',
              /** Mostra as ondas (lado direito do frame, como no Figma) */
              imagem_position: '78% 45%',
              cta: UNIQUE_CTA_SAIBA,
              link: '#',
            },
          },
          {
            id: nextId(),
            type: 'evento',
            ordem: 2,
            status: 'publicado' as const,
            data: {
              titulo: UNIQUE_TOUR_ATIBAIA_TITLE,
              descricao: UNIQUE_TOUR_ATIBAIA_DESC,
              imagem: '/img/unique/tour-atibaia.jpg',
              imagem_position: '50% 40%',
              cta: UNIQUE_CTA_SAIBA,
              link: '#',
            },
          },
        ],
      },

      // 5. Destinos — mosaico 3 colunas (texto + 5 fotos)
      {
        id: idBase + 6,
        tipo: 'mosaico' as const,
        ordem: 6,
        status: 'publicado' as const,
        margin_top: 40,
        margin_bottom: 80,
        metadados: { colunas: 3 as const },
        components: [
          {
            id: nextId(),
            type: 'mosaico_celula',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              titulo: UNIQUE_DESTINOS_TITLE,
              descricao: UNIQUE_DESTINOS_DESC,
              background: 'transparent',
            },
          },
          {
            id: nextId(),
            type: 'mosaico_celula',
            ordem: 2,
            status: 'publicado' as const,
            data: {
              titulo: UNIQUE_DESTINO_ROCAS,
              imagem: '/img/unique/destino-rocas.jpg',
            },
          },
          {
            id: nextId(),
            type: 'mosaico_celula',
            ordem: 3,
            status: 'publicado' as const,
            data: {
              titulo: UNIQUE_DESTINO_LALENAS,
              imagem: '/img/unique/destino-lalenas.jpg',
            },
          },
          {
            id: nextId(),
            type: 'mosaico_celula',
            ordem: 4,
            status: 'publicado' as const,
            data: {
              titulo: UNIQUE_DESTINO_BROWNS,
              imagem: '/img/unique/destino-browns.jpg',
            },
          },
          {
            id: nextId(),
            type: 'mosaico_celula',
            ordem: 5,
            status: 'publicado' as const,
            data: {
              titulo: UNIQUE_DESTINO_TETTO,
              imagem: '/img/unique/destino-tetto.jpg',
            },
          },
          {
            id: nextId(),
            type: 'mosaico_celula',
            ordem: 6,
            status: 'publicado' as const,
            data: {
              titulo: UNIQUE_DESTINO_FAZENDA,
              imagem: '/img/unique/destino-fazenda.jpg',
            },
          },
        ],
      },
    ],
  }
}
