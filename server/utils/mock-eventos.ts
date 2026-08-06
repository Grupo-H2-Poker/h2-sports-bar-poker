/** Página Eventos — mock CMS (Figma 496:2204). */

const PREVIEW_IMGS = [
  '/img/eventos/preview-1.jpg',
  '/img/eventos/preview-2.jpg',
  '/img/eventos/preview-3.jpg',
  '/img/eventos/preview-4.jpg',
  '/img/eventos/preview-5.jpg',
] as const

const MOSAICO_PURPLE = '#77158e'

export function createEventosPagina(ordem = 7, idBase = 9700) {
  let cid = idBase

  const nextId = () => ++cid

  return {
    slug: 'eventos',
    titulo: 'Eventos',
    ordem,
    status: 'publicado' as const,
    modulos: [
      // 1. Hero intro
      {
        id: idBase + 1,
        tipo: 'texto' as const,
        ordem: 1,
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
              titulo: 'Referência em Eventos.\nAutoridade em Poker.',
              descricao:
                'Transforme seu evento corporativo em um ambiente que conecta pessoas, fortalece relações e entrega entretenimento com propósito.',
              cta: 'Fale com nossos consultores',
              cta_link: '#contato',
              cta_cor: 'verde',
              align: 'center',
              size: 'md',
              width: 'lg',
            },
          },
        ],
      },

      // 2. Capas de tipos de evento
      {
        id: idBase + 2,
        tipo: 'eventos' as const,
        ordem: 2,
        status: 'publicado' as const,
        margin_top: 0,
        margin_bottom: 40,
        metadados: { layout: 'grid' as const },
        components: [
          {
            id: nextId(),
            type: 'evento',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              titulo: 'Eventos\nCorporativos',
              imagem: '/img/eventos/hero-1.png',
            },
          },
          {
            id: nextId(),
            type: 'evento',
            ordem: 2,
            status: 'publicado' as const,
            data: {
              titulo: 'Home Game',
              imagem: '/img/eventos/hero-2.jpg',
            },
          },
          {
            id: nextId(),
            type: 'evento',
            ordem: 3,
            status: 'publicado' as const,
            data: {
              titulo: 'Eventos\nCorporativos',
              imagem: '/img/eventos/hero-3.png',
            },
          },
        ],
      },

      // 3. Logos de parceiros
      {
        id: idBase + 3,
        tipo: 'parceiros' as const,
        ordem: 3,
        status: 'publicado' as const,
        margin_top: 80,
        margin_bottom: 80,
        components: Array.from({ length: 12 }, (_, i) => ({
          id: nextId(),
          type: 'parceiro_logo' as const,
          ordem: i + 1,
          status: 'publicado' as const,
          data: {},
        })),
      },

      // 4. Números — agenda_preview + card numero
      {
        id: idBase + 4,
        tipo: 'agenda_preview' as const,
        ordem: 4,
        status: 'publicado' as const,
        margin_top: 40,
        margin_bottom: 40,
        metadados: {
          card_variant: 'numero' as const,
          hide_cash_game: true,
        },
        components: [
          {
            id: nextId(),
            type: 'section_cta',
            ordem: 0,
            status: 'publicado' as const,
            data: {
              titulo: 'Eventos em\nforma de números',
              cta: 'Fale com nossos consultores',
              cta_link: '#contato',
              cta_cor: 'verde',
              align: 'left',
              size: 'md',
              width: 'md',
            },
          },
          {
            id: nextId(),
            type: 'card',
            ordem: 1,
            status: 'publicado' as const,
            data: { titulo: 'R$XXXXXX', subtitulo: 'eventos' },
          },
          {
            id: nextId(),
            type: 'card',
            ordem: 2,
            status: 'publicado' as const,
            data: { titulo: 'R$XXXXXX', subtitulo: 'eventos' },
          },
          {
            id: nextId(),
            type: 'card',
            ordem: 3,
            status: 'publicado' as const,
            data: { titulo: 'R$XXXXXX', subtitulo: 'eventos' },
          },
        ],
      },

      // 5. Especialistas + vídeo (painel roxo — Figma 604:1622)
      {
        id: idBase + 5,
        tipo: 'banner' as const,
        ordem: 5,
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
              layout: 'panel',
              panel_background: '#77158e',
              border_radius: 'sm',
              size: 'lg',
              imagem: '/img/eventos/video.jpg',
              play_overlay: true,
              overlay: 'none',
              section_cta: {
                titulo: 'Especialistas em fazer acontecer',
                align: 'center',
                size: 'md',
              },
            },
          },
        ],
      },

      // 6. Intro + galeria preview
      {
        id: idBase + 7,
        tipo: 'texto' as const,
        ordem: 7,
        status: 'publicado' as const,
        margin_top: 120,
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
              titulo: 'Onde tem jogo, tem H2 Sports Bar & Poker.',
              descricao:
                'O setor de eventos do H2 Sports Bar & Poker é onde o jogo ganha vida dentro e fora das mesas. Com mais de 20 anos de credibilidade, o H2 se consolidou como uma das maiores referências do poker brasileiro, levando não apenas torneios, mas experiências completas para diferentes públicos, formatos e ambientes.',
              align: 'center',
              size: 'md',
              width: 'lg',
            },
          },
        ],
      },
      {
        id: idBase + 8,
        tipo: 'galeria_preview' as const,
        ordem: 8,
        status: 'publicado' as const,
        margin_top: 0,
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

      // 7. Texto + imagem
      {
        id: idBase + 9,
        tipo: 'banner' as const,
        ordem: 9,
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
              imagem: '/img/eventos/split.jpg',
              section_cta: {
                descricao:
                  'A diversidade é um dos pilares dessa atuação. Eventos corporativos, ações de marca, ativações especiais, encontros sociais e experiências exclusivas: o H2 entende o objetivo de cada cliente e transforma ideias em projetos sob medida, sempre com um padrão de entrega que se tornou referência no setor.',
                descricao_2:
                  'E quando o assunto é levar a experiência além do clube, o H2 eleva o nível. Com produção completa de home game (eventos particulares), o poker vai até você, seja na sua empresa, na sua casa ou em qualquer lugar que você escolher.\nEstrutura profissional, equipe especializada e execução impecável garantem que cada detalhe funcione como um grande evento de poker.',
                descricao_3:
                  'Mais do que organizar, o H2 faz o poker acontecer.\nCom consistência, qualidade e paixão pelo jogo, transforma cada mesa em uma oportunidade única de viver o melhor do universo do esporte da mente.',
                align: 'left',
                size: 'md',
              },
            },
          },
        ],
      },

      // 8. Título + mosaico
      {
        id: idBase + 10,
        tipo: 'texto' as const,
        ordem: 10,
        status: 'publicado' as const,
        margin_top: 80,
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
              titulo: 'Onde tem jogo, tem H2 Sports Bar & Poker.',
              descricao: 'Uma estrutura que acompanha o ritmo do país e a paixão pelo poker.',
              align: 'center',
              size: 'md',
              width: 'lg',
            },
          },
        ],
      },
      {
        id: idBase + 11,
        tipo: 'mosaico' as const,
        ordem: 11,
        status: 'publicado' as const,
        margin_top: 0,
        margin_bottom: 40,
        metadados: { colunas: 4 as const },
        components: [
          {
            id: nextId(),
            type: 'mosaico_celula',
            ordem: 1,
            status: 'publicado' as const,
            data: { imagem: '/img/eventos/mosaic-burger.jpg' },
          },
          {
            id: nextId(),
            type: 'mosaico_celula',
            ordem: 2,
            status: 'publicado' as const,
            data: { titulo: 'Dealers\nprofissionais', background: MOSAICO_PURPLE },
          },
          {
            id: nextId(),
            type: 'mosaico_celula',
            ordem: 3,
            status: 'publicado' as const,
            data: { imagem: '/img/eventos/mosaic-talk.jpg' },
          },
          {
            id: nextId(),
            type: 'mosaico_celula',
            ordem: 4,
            status: 'publicado' as const,
            data: { imagem: '/img/eventos/mosaic-players.jpg' },
          },
          {
            id: nextId(),
            type: 'mosaico_celula',
            ordem: 5,
            status: 'publicado' as const,
            data: { titulo: 'Drinks\nExclusivos', background: MOSAICO_PURPLE },
          },
          {
            id: nextId(),
            type: 'mosaico_celula',
            ordem: 6,
            status: 'publicado' as const,
            data: { imagem: '/img/eventos/mosaic-drink.jpg' },
          },
          {
            id: nextId(),
            type: 'mosaico_celula',
            ordem: 7,
            status: 'publicado' as const,
            data: { imagem: '/img/eventos/mosaic-bartender.jpg' },
          },
          {
            id: nextId(),
            type: 'mosaico_celula',
            ordem: 8,
            status: 'publicado' as const,
            data: { titulo: 'Menu\nGastronômico', background: MOSAICO_PURPLE },
          },
        ],
      },

      // 9. Depoimentos — agenda_preview sem CTA lateral (só cards)
      {
        id: idBase + 12,
        tipo: 'agenda_preview' as const,
        ordem: 12,
        status: 'publicado' as const,
        margin_top: 80,
        margin_bottom: 40,
        metadados: {
          card_variant: 'depoimento' as const,
          hide_cash_game: true,
          layout: 'grid' as const,
        },
        components: [
          {
            id: nextId(),
            type: 'card',
            ordem: 1,
            status: 'publicado' as const,
            data: {
              titulo: 'Título bonito!',
              descricao:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              autor: 'Nome e Sobrenome',
              imagem: '/img/eventos/depoimento.jpg',
            },
          },
          {
            id: nextId(),
            type: 'card',
            ordem: 2,
            status: 'publicado' as const,
            data: {
              titulo: 'Título bonito!',
              descricao:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              autor: 'Nome e Sobrenome',
              imagem: '/img/eventos/depoimento.jpg',
            },
          },
          {
            id: nextId(),
            type: 'card',
            ordem: 3,
            status: 'publicado' as const,
            data: {
              titulo: 'Título bonito!',
              descricao:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              autor: 'Nome e Sobrenome',
              imagem: '/img/eventos/depoimento.jpg',
            },
          },
        ],
      },

      // 10. Equipe — agenda_preview + card imagem
      {
        id: idBase + 13,
        tipo: 'agenda_preview' as const,
        ordem: 13,
        status: 'publicado' as const,
        margin_top: 80,
        margin_bottom: 80,
        metadados: {
          card_variant: 'imagem' as const,
          hide_cash_game: true,
          carousel_bleed_right: true,
        },
        components: [
          {
            id: nextId(),
            type: 'section_cta',
            ordem: 0,
            status: 'publicado' as const,
            data: {
              titulo: 'Nossa equipe',
              descricao:
                'Um time de profissionais qualificados que vive o poker 24 horas por dia, garantindo padrão, ritmo e excelência em cada detalhe.',
              cta: 'Fale com a gente',
              cta_link: '#contato',
              cta_cor: 'verde',
              align: 'left',
              size: 'md',
              width: 'md',
            },
          },
          {
            id: nextId(),
            type: 'card',
            ordem: 1,
            status: 'publicado' as const,
            data: { titulo: 'Equipe 1', imagem: '/img/eventos/mosaic-talk.jpg' },
          },
          {
            id: nextId(),
            type: 'card',
            ordem: 2,
            status: 'publicado' as const,
            data: { titulo: 'Equipe 2', imagem: '/img/eventos/mosaic-bartender.jpg' },
          },
          {
            id: nextId(),
            type: 'card',
            ordem: 3,
            status: 'publicado' as const,
            data: { titulo: 'Equipe 3', imagem: '/img/eventos/mosaic-players.jpg' },
          },
          {
            id: nextId(),
            type: 'card',
            ordem: 4,
            status: 'publicado' as const,
            data: { titulo: 'Equipe 4' },
          },
        ],
      },

      // 11. Formulário de contato (full-bleed → footer)
      {
        id: idBase + 14,
        tipo: 'formulario' as const,
        ordem: 14,
        status: 'publicado' as const,
        margin_top: 80,
        margin_bottom: 0,
        metadados: {
          background: '#2f185a',
          flush_footer: true,
        },
        components: [
          {
            id: nextId(),
            type: 'formulario_config',
            ordem: 0,
            status: 'publicado' as const,
            data: {
              titulo: 'Entre em contato com\nnossos consultores',
              descricao: 'Transforme seu evento corporativo ou pessoal em',
              submit_label: 'Enviar',
              nota: '*Todos os campos são obrigatórios',
            },
          },
          {
            id: nextId(),
            type: 'formulario_campo',
            ordem: 1,
            status: 'publicado' as const,
            data: { name: 'nome', label: 'Nome', placeholder: 'Nome' },
          },
          {
            id: nextId(),
            type: 'formulario_campo',
            ordem: 2,
            status: 'publicado' as const,
            data: { name: 'telefone', label: 'Telefone', type: 'tel', placeholder: 'Telefone' },
          },
          {
            id: nextId(),
            type: 'formulario_campo',
            ordem: 3,
            status: 'publicado' as const,
            data: { name: 'email', label: 'E-mail', type: 'email', placeholder: 'E-mail' },
          },
          {
            id: nextId(),
            type: 'formulario_campo',
            ordem: 4,
            status: 'publicado' as const,
            data: {
              name: 'tipo_evento',
              label: 'Tipo de evento',
              type: 'select',
              placeholder: 'Tipo de evento',
              options: ['Evento corporativo', 'Home Game', 'Ativação de marca', 'Outro'],
            },
          },
        ],
      },
    ],
  }
}
