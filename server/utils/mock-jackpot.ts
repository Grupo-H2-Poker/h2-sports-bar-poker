/** Página Jackpot — mock CMS (Figma 607:1980). */

export const JACKPOT_O_QUE_E_TITLE = 'O que é o Jackpot?'
export const JACKPOT_O_QUE_E_DESC =
  'O JACKPOT é um programa MEGA especial, progressivo* e contínuo onde os\nvalores vão se acumulando a cada partida nas mesas de Cash Game.'
export const JACKPOT_O_QUE_E_DESC_2 =
  'Qualquer jogador que acertar a mão premiada, será contemplado com um\nprêmio instantâneo, ou uma porcentagem do valor acumulado.'

export const JACKPOT_PROGRESSIVOS_TITLE = 'Jackpot Progressivos'
export const JACKPOT_PROGRESSIVOS_DESC =
  'Os jogos progressivos são calculados a partir de uma porcentagem de cada rodada de aposta, de acordo com os critérios estabelecidos no regulamento, adicionando um valor retirado do POT ao prêmio acumulado.'
export const JACKPOT_PROGRESSIVOS_DESC_2 =
  'Quanto mais jogadores estiverem em jogo, mais altos serão os JACKPOTS gerais. O valor acumulado do JACKPOT pode aumentar exponencialmente, tornando a promoção ainda mais emocionante.'
export const JACKPOT_CTA_REGULAMENTO = 'Ver regulamento completo'

export const JACKPOT_COMO_PARTICIPAR_TITLE = 'Como participar?'
export const JACKPOT_COMO_PARTICIPAR_DESC =
  'Jogando Texas Hold\'em ou Omaha nas mesas de Cash Game do H2 Sports Bar & Poker, o jogador que sair com uma das combinações abaixo, pode ser contemplado com um prêmio instantâneo ou girar a Roda da Fortuna.'

export const JACKPOT_MAO_ROYAL_ESPADAS = 'Royal de Espadas'
export const JACKPOT_MAO_ROYAL_PAUS = 'Royal de Paus'
export const JACKPOT_MAO_ROYAL_FLUSH = 'Royal Flush'
export const JACKPOT_MAO_STRAIGHT_FLUSH = 'Straight Flush'
export const JACKPOT_MAO_QUADRA = 'Quadra (par do dia)'

export const JACKPOT_RODA_TITLE = 'Roda da Fortuna'
/** HTML — SectionCTA usa `v-html` (3 linhas + negrito como no Figma). */
export const JACKPOT_RODA_DESC =
  'Acertando uma <strong>Mão Premiada</strong> que dá direito a girar<br>a <strong>Roda da Fortuna</strong>, você concorre de <strong>20%</strong> a <strong>100%</strong> do<br><strong>Valor Acumulado</strong> e valores fixos de <strong>2k</strong> a <strong>5k</strong>.'

export const JACKPOT_PREMIOS_TITLE = 'Prêmios'
export const JACKPOT_COL_JOGOS = 'Jogos premiados'
export const JACKPOT_COL_MESAS_1_2 = 'Mesas 1/2 - 2/2'
export const JACKPOT_COL_MESAS_5_5 = 'Mesas 5/5'
export const JACKPOT_COL_MESAS_5_10 = 'Mesas 5/10+'
export const JACKPOT_COL_PREMIOS = 'Prêmios'

export const JACKPOT_CELL_GIRA_50 = 'Gira a Roda (50%)'
export const JACKPOT_CELL_GIRA = 'Gira a Roda'
export const JACKPOT_CELL_5X = '5x prêmio (valor fixo)'
export const JACKPOT_CELL_2X = '2x prêmio'
export const JACKPOT_CELL_1X = '1x prêmio'
export const JACKPOT_CELL_20_ACUM = '20% acumulado'
export const JACKPOT_CELL_50_ACUM = '50% acumulado'
export const JACKPOT_CELL_100_ACUM = '100% acumulado'

export const JACKPOT_NOTA_1 =
  '*Valor acumulado é variável e será sempre atualizado e divulgado no painel eletrônico do clube.'
export const JACKPOT_NOTA_2 =
  '** Os jogos com blindes de 1/2 e 2/2, giram a roda da fortuna valendo 50% da tabela, inclusive dos valores acumulados.'

const HANDS = [
  {
    titulo: JACKPOT_MAO_ROYAL_ESPADAS,
    imagem: '/img/jackpot/hand-royal-espadas.png',
  },
  {
    titulo: JACKPOT_MAO_ROYAL_PAUS,
    imagem: '/img/jackpot/hand-royal-paus.png',
  },
  {
    titulo: JACKPOT_MAO_ROYAL_FLUSH,
    imagem: '/img/jackpot/hand-royal-flush.png',
  },
  {
    titulo: JACKPOT_MAO_STRAIGHT_FLUSH,
    imagem: '/img/jackpot/hand-straight-flush.png',
  },
  {
    titulo: JACKPOT_MAO_QUADRA,
    imagem: '/img/jackpot/hand-quadra.png',
  },
] as const

const PURPLE = '#77158e'
/** Fundo do card Jackpot Progressivos (Figma 610:2182 — rgba(231,231,231,0.3) sobre preto). */
const PROGRESSIVOS_PANEL = '#454545'

export function createJackpotPagina(ordem = 8, idBase = 9900) {
  let cid = idBase

  const nextId = () => ++cid

  return {
    slug: 'jackpot',
    titulo: 'Jackpot',
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
              imagem: '/img/jackpot/hero.png',
              size: 'lg',
              height: 'strip',
              overlay: 'none',
              rounded: false,
            },
          },
        ],
      },

      // 2. O que é o Jackpot?
      {
        id: idBase + 2,
        tipo: 'texto' as const,
        ordem: 2,
        status: 'publicado' as const,
        margin_top: 40,
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
              titulo: JACKPOT_O_QUE_E_TITLE,
              descricao: JACKPOT_O_QUE_E_DESC,
              descricao_2: JACKPOT_O_QUE_E_DESC_2,
              align: 'center',
              size: 'md',
              width: 'lg',
            },
          },
        ],
      },

      // 3. Jackpot Progressivos (imagem + texto + CTA)
      {
        id: idBase + 3,
        tipo: 'banner' as const,
        ordem: 3,
        status: 'publicado' as const,
        margin_top: 40,
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
              height: 'lg',
              cta_column: 'right',
              imagem_size: 'fill',
              column_ratio: '2/3',
              border_radius: 'sm',
              panel_background: PROGRESSIVOS_PANEL,
              imagem: '/img/jackpot/chips.jpg',
              section_cta: {
                titulo: JACKPOT_PROGRESSIVOS_TITLE,
                descricao: JACKPOT_PROGRESSIVOS_DESC,
                descricao_2: JACKPOT_PROGRESSIVOS_DESC_2,
                cta: JACKPOT_CTA_REGULAMENTO,
                cta_link: 'regulamentos',
                cta_cor: 'verde',
                align: 'left',
                size: 'md',
                width: 'lg',
              },
            },
          },
        ],
      },

      // 4. Como participar?
      {
        id: idBase + 4,
        tipo: 'texto' as const,
        ordem: 4,
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
              titulo: JACKPOT_COMO_PARTICIPAR_TITLE,
              descricao: JACKPOT_COMO_PARTICIPAR_DESC,
              align: 'center',
              size: 'md',
              width: 'lg',
            },
          },
        ],
      },

      // 5. Mãos premiadas
      {
        id: idBase + 5,
        tipo: 'agenda_preview' as const,
        ordem: 5,
        status: 'publicado' as const,
        margin_top: 0,
        margin_bottom: 40,
        metadados: {
          card_variant: 'imagem' as const,
          hide_cash_game: true,
          layout: 'wrap' as const,
        },
        components: HANDS.map((hand, i) => ({
          id: nextId(),
          type: 'card' as const,
          ordem: i + 1,
          status: 'publicado' as const,
          data: {
            titulo: hand.titulo,
            imagem: hand.imagem,
            legenda: true,
          },
        })),
      },

      // 6. Roda da Fortuna
      {
        id: idBase + 6,
        tipo: 'banner' as const,
        ordem: 6,
        status: 'publicado' as const,
        margin_top: 150,
        margin_bottom: 150,
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
              border_radius: 'lg',
              panel_background: 'rgba(119, 21, 142, 0.50)',
              imagem_overflow: true,
              imagem: '/img/jackpot/roda.png',
              section_cta: {
                titulo: JACKPOT_RODA_TITLE,
                descricao: JACKPOT_RODA_DESC,
                align: 'left',
                size: 'md',
                width: 'lg',
              },
            },
          },
        ],
      },

      // 7. Tabelas de prêmios
      {
        id: idBase + 7,
        tipo: 'tabela' as const,
        ordem: 7,
        status: 'publicado' as const,
        margin_top: 40,
        margin_bottom: 80,
        metadados: {
          notas: [JACKPOT_NOTA_1, JACKPOT_NOTA_2],
        },
        components: [
          {
            id: nextId(),
            type: 'section_cta',
            ordem: 0,
            status: 'publicado' as const,
            data: {
              titulo: JACKPOT_PREMIOS_TITLE,
              align: 'center',
              size: 'md',
            },
          },
          {
            id: nextId(),
            type: 'tabela_config',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              colunas: [
                { id: 'jogo', label: JACKPOT_COL_JOGOS },
                { id: 'm12', label: JACKPOT_COL_MESAS_1_2 },
                { id: 'm55', label: JACKPOT_COL_MESAS_5_5 },
                { id: 'm510', label: JACKPOT_COL_MESAS_5_10 },
              ],
            },
          },
          {
            id: nextId(),
            type: 'tabela_linha',
            ordem: 2,
            status: 'publicado' as const,
            data: {
              cells: [
                JACKPOT_MAO_ROYAL_ESPADAS,
                JACKPOT_CELL_GIRA_50,
                JACKPOT_CELL_GIRA,
                JACKPOT_CELL_GIRA,
              ],
            },
          },
          {
            id: nextId(),
            type: 'tabela_linha',
            ordem: 3,
            status: 'publicado' as const,
            data: {
              cells: [
                JACKPOT_MAO_ROYAL_PAUS,
                JACKPOT_CELL_GIRA_50,
                JACKPOT_CELL_GIRA,
                JACKPOT_CELL_GIRA,
              ],
            },
          },
          {
            id: nextId(),
            type: 'tabela_linha',
            ordem: 4,
            status: 'publicado' as const,
            data: {
              cells: [JACKPOT_MAO_ROYAL_FLUSH, 'R$600,00', 'R$1.000,00', 'R$1.500,00'],
            },
          },
          {
            id: nextId(),
            type: 'tabela_linha',
            ordem: 5,
            status: 'publicado' as const,
            data: {
              cells: [JACKPOT_MAO_STRAIGHT_FLUSH, 'R$300,00', 'R$500,00', 'R$800,00'],
            },
          },
          {
            id: nextId(),
            type: 'tabela_linha',
            ordem: 6,
            status: 'publicado' as const,
            data: {
              cells: [JACKPOT_MAO_QUADRA, 'R$200,00', 'R$300,00', 'R$500,00'],
            },
          },
          {
            id: nextId(),
            type: 'tabela_config',
            ordem: 7,
            status: 'publicado' as const,
            data: {
              colunas: [
                { id: 'roda', label: JACKPOT_RODA_TITLE },
                { id: 'premio', label: JACKPOT_COL_PREMIOS },
              ],
            },
          },
          {
            id: nextId(),
            type: 'tabela_linha',
            ordem: 8,
            status: 'publicado' as const,
            data: { cells: [JACKPOT_CELL_5X, 'R$2.000,00'] },
          },
          {
            id: nextId(),
            type: 'tabela_linha',
            ordem: 9,
            status: 'publicado' as const,
            data: { cells: [JACKPOT_CELL_5X, 'R$3.000,00'] },
          },
          {
            id: nextId(),
            type: 'tabela_linha',
            ordem: 10,
            status: 'publicado' as const,
            data: { cells: [JACKPOT_CELL_2X, JACKPOT_CELL_20_ACUM] },
          },
          {
            id: nextId(),
            type: 'tabela_linha',
            ordem: 11,
            status: 'publicado' as const,
            data: { cells: [JACKPOT_CELL_1X, JACKPOT_CELL_50_ACUM] },
          },
          {
            id: nextId(),
            type: 'tabela_linha',
            ordem: 12,
            status: 'publicado' as const,
            data: { cells: [JACKPOT_CELL_1X, JACKPOT_CELL_100_ACUM] },
          },
        ],
      },
    ],
  }
}
