import {
  AGENDA_TORNEIOS_PINHEIROS,
  AGENDA_TORNEIOS_CPH,
  AGENDA_TORNEIOS_FUN,
  ALL_TORNEIOS,
  CASH_GAME_MESAS,
  toGridCardComponent,
  toPreviewCardComponent,
  toCashGameCardComponent,
  withDiaFilter,
  withEtapaFilter,
} from '../../../../utils/mock-agenda-data'
import {
  createRegulamentosPagina,
  createSegurancaPrivacidadePagina,
} from '../../../../utils/mock-documento-pages'
import { createPokerEsporteDaMentePagina } from '../../../../utils/mock-poker-esporte-da-mente'
import { createSportsBarPagina } from '../../../../utils/mock-sports-bar'
import { createEventosPagina } from '../../../../utils/mock-eventos'
import { createJackpotPagina } from '../../../../utils/mock-jackpot'
import { createSobrePagina } from '../../../../utils/mock-sobre'
import { createUniquePagina } from '../../../../utils/mock-unique'
import { localizeUnidadeModulos } from '../../../../utils/mock-i18n'

const AGENDA_GRID_TOOLBAR_BASE = {
  filtro: {
    label: 'Filtrar torneios',
    modal: {
      titulo: 'Filtros',
      limpar: { label: 'Limpar filtros' },
      aplicar: { label: 'Filtrar' },
      secoes: [
        {
          id: 'buy_in',
          titulo: 'Buy-in',
          colunas: 2,
          opcoes: [
            { id: '50-200', label: 'R$ 50,00   -  R$ 200,00' },
            { id: '201-500', label: 'R$ 201,00   -  R$ 500,00' },
            { id: '500-1000', label: 'R$ 500,00   -  R$ 1000,00' },
            { id: '1001-5000', label: 'R$ 1001,00   -  R$ 5000,00' },
            { id: '5001-10000', label: 'R$ 5001,00   -  R$ 10000,00' },
          ],
        },
        {
          id: 'garantido',
          titulo: 'Garantido',
          colunas: 5,
          opcoes: [
            { id: '5k', label: '5K' },
            { id: '10k', label: '10K' },
            { id: '15k', label: '15K' },
            { id: '20k', label: '20K' },
            { id: '30k', label: '30K' },
            { id: '40k', label: '40K' },
            { id: '50k', label: '50K' },
            { id: '100k', label: '100K' },
            { id: '200k', label: '200K' },
            { id: '300k', label: '300K' },
          ],
        },
        {
          id: 'series',
          titulo: 'Séries',
          opcoes: [
            { id: 'cph', label: 'CPH' },
            { id: 'fun-festival', label: 'Fun Festival' },
          ],
          subsecoes: [
            {
              id: 'etapa',
              titulo: 'Etapas',
              colunas: 3,
              opcoes: [
                { id: '1', label: '1ª Etapa' },
                { id: '2', label: '2ª Etapa' },
                { id: '3', label: '3ª Etapa' },
                { id: '4', label: '4ª Etapa' },
                { id: '5', label: '5ª Etapa' },
              ],
            },
          ],
        },
        {
          id: 'local',
          titulo: 'Local',
          colunas: 2,
          opcoes: [
            { id: 'clube-fisico', label: 'Clube físico' },
            { id: 'online', label: 'Online' },
          ],
        },
      ],
    },
  },
  busca: { placeholder: 'Pesquisar torneios', habilitado: true },
  badges: { limpar: { label: 'Limpar todos os filtros' } },
}

const AGENDA_GRID_TOOLBAR = withDiaFilter(
  AGENDA_GRID_TOOLBAR_BASE,
  ALL_TORNEIOS,
)

function withoutSeriesFilter<T extends {
  filtro: { modal: { secoes: ReadonlyArray<{ id: string }> } }
}>(toolbar: T) {
  return {
    ...toolbar,
    filtro: {
      ...toolbar.filtro,
      modal: {
        ...toolbar.filtro.modal,
        secoes: toolbar.filtro.modal.secoes.filter(s => s.id !== 'series'),
      },
    },
  }
}

/** Séries: sem filtro "Séries" (página já é da série) — mesma lógica de etapa/dia/buy-in. */
const AGENDA_SERIES_GRID_TOOLBAR_CPH = withDiaFilter(
  withoutSeriesFilter(withEtapaFilter(AGENDA_GRID_TOOLBAR_BASE)),
  AGENDA_TORNEIOS_CPH,
)
const AGENDA_SERIES_GRID_TOOLBAR_FUN = withDiaFilter(
  withoutSeriesFilter(withEtapaFilter(AGENDA_GRID_TOOLBAR_BASE)),
  AGENDA_TORNEIOS_FUN,
)

const CASH_GAME_GRID_TOOLBAR = {
  filtro: {
    label: 'Filtrar Mesas',
    modal: {
      titulo: 'Filtros',
      limpar: { label: 'Limpar filtros' },
      aplicar: { label: 'Filtrar' },
      secoes: [
        {
          id: 'status',
          titulo: 'Status',
          colunas: 2,
          opcoes: [
            { id: 'aberta', label: 'Aberta' },
            { id: 'off', label: 'Off' },
          ],
        },
      ],
    },
  },
  busca: { placeholder: 'Pesquisar mesas', habilitado: true },
  badges: { limpar: { label: 'Limpar todos os filtros' } },
}

/** Mesma margem lateral do FAQ da home (sp-pinheiros). */
const HOME_FAQ_MARGIN_LATERAL = 100

/** FAQ abaixo do grid das agendas — reutiliza conteúdo/margem da home. */
function createAgendaFaqModulo(id: number, componentIdBase: number) {
  return {
    id,
    tipo: 'faq' as const,
    ordem: 2,
    status: 'publicado' as const,
    margin_top: 100,
    margin_bottom: 40,
    metadados: {
      margin_lateral: HOME_FAQ_MARGIN_LATERAL,
    },
    components: [
      {
        id: componentIdBase,
        type: 'section_cta',
        ordem: 0,
        status: 'publicado',
        data: {
          titulo: 'Precisa de ajuda?',
          descricao: 'Aqui estão algumas das perguntas mais frequentes sobre o H2.',
          cta: 'Saiba mais',
          cta_link: 'faq',
          cta_cor: 'verde',
          align: 'left',
          size: 'md',
          width: 'md',
        },
      },
      {
        id: componentIdBase + 1,
        type: 'faq',
        ordem: 1,
        status: 'publicado',
        data: {
          pergunta: 'Que horas o clube abre?',
          resposta: 'O clube abre todos os dias às 12h. Os torneios e cash games seguem a agenda do dia — confira os horários na página de agenda.',
        },
      },
      {
        id: componentIdBase + 2,
        type: 'faq',
        ordem: 2,
        status: 'publicado',
        data: {
          pergunta: 'Pode entrar menor de idade no clube?',
          resposta: 'Não. O acesso ao clube é permitido apenas para maiores de 18 anos, conforme a legislação vigente.',
        },
      },
      {
        id: componentIdBase + 3,
        type: 'faq',
        ordem: 3,
        status: 'publicado',
        data: {
          pergunta: 'Quais as modalidades do Cash Game',
          resposta: 'Oferecemos mesas de Texas Hold\'em No Limit com blinds a partir de R$ 2/4. A disponibilidade varia conforme a demanda — consulte a agenda para ver as mesas abertas hoje.',
        },
      },
    ],
  }
}

const SERIES_BANNERS = {
  cph: '/img/banner_cph.png',
  'fun-festival': '/img/banner_funfestival.png',
}

/** Fotos mock reutilizadas entre álbuns (CMS envia `fotos[]` por álbum). */
const GALERIA_FOTOS_CPH = [
  { imagem: '/img/cph/history-1.jpg' },
  { imagem: '/img/cph/history-2.jpg' },
  { imagem: '/img/cph/history-3.jpg' },
  { imagem: '/img/cph/history-4.png' },
  { imagem: '/img/cph/history-5.png' },
  { imagem: '/img/cph/history-6.jpg' },
]

const GALERIA_FOTOS_FUN = [
  { imagem: '/img/fun-festival/jogue-com-a-diversao.png' },
  { imagem: '/img/fun-festival/features-collage.png' },
  { imagem: '/img/fun-festival/estrela.png' },
  { imagem: '/img/galeria/eventos.png' },
  { imagem: '/img/galeria/comunidade.png' },
  { imagem: '/img/galeria/damas-do-poker.png' },
]

const GALERIA_FOTOS_GERAL = [
  { imagem: '/img/galeria/damas-do-poker.png' },
  { imagem: '/img/galeria/eventos.png' },
  { imagem: '/img/galeria/comunidade.png' },
  { imagem: '/img/galeria/eventos-corporativos.png' },
  { imagem: '/img/galeria/franqueado.png' },
  { imagem: '/img/galeria/poker-esporte-da-mente.png' },
]

/** Álbuns da página Galeria — todas as séries/etapas existentes. */
const GALERIA_ALBUNS = [
  {
    id: 801,
    type: 'imagem' as const,
    ordem: 1,
    status: 'publicado' as const,
    data: {
      imagem: '/img/cph/history-1.jpg',
      titulo: '1ª Etapa CPH',
      series: 'cph',
      series_label: 'CPH',
      etapa: '1',
      fotos: GALERIA_FOTOS_CPH,
    },
  },
  {
    id: 802,
    type: 'imagem' as const,
    ordem: 2,
    status: 'publicado' as const,
    data: {
      imagem: '/img/cph/history-2.jpg',
      titulo: '2ª Etapa CPH',
      series: 'cph',
      series_label: 'CPH',
      etapa: '2',
      fotos: [
        { imagem: '/img/cph/history-2.jpg' },
        { imagem: '/img/cph/history-3.jpg' },
        { imagem: '/img/cph/history-4.png' },
        { imagem: '/img/cph/history-5.png' },
        { imagem: '/img/cph/history-6.jpg' },
        { imagem: '/img/cph/history-1.jpg' },
      ],
    },
  },
  {
    id: 803,
    type: 'imagem' as const,
    ordem: 3,
    status: 'publicado' as const,
    data: {
      imagem: '/img/cph/history-3.jpg',
      titulo: '3ª Etapa CPH',
      series: 'cph',
      series_label: 'CPH',
      etapa: '3',
      fotos: [
        { imagem: '/img/cph/history-3.jpg' },
        { imagem: '/img/cph/history-4.png' },
        { imagem: '/img/cph/history-5.png' },
        { imagem: '/img/cph/history-6.jpg' },
        { imagem: '/img/cph/history-1.jpg' },
        { imagem: '/img/cph/history-2.jpg' },
      ],
    },
  },
  {
    id: 804,
    type: 'imagem' as const,
    ordem: 4,
    status: 'publicado' as const,
    data: {
      imagem: '/img/cph/history-4.png',
      titulo: '4ª Etapa CPH',
      series: 'cph',
      series_label: 'CPH',
      etapa: '4',
      fotos: [
        { imagem: '/img/cph/history-4.png' },
        { imagem: '/img/cph/history-5.png' },
        { imagem: '/img/cph/history-6.jpg' },
        { imagem: '/img/cph/history-1.jpg' },
        { imagem: '/img/cph/history-2.jpg' },
        { imagem: '/img/cph/history-3.jpg' },
      ],
    },
  },
  {
    id: 805,
    type: 'imagem' as const,
    ordem: 5,
    status: 'publicado' as const,
    data: {
      imagem: '/img/fun-festival/jogue-com-a-diversao.png',
      titulo: '1ª Etapa Fun Festival',
      series: 'fun-festival',
      series_label: 'Fun Festival',
      etapa: '1',
      fotos: GALERIA_FOTOS_FUN,
    },
  },
  {
    id: 806,
    type: 'imagem' as const,
    ordem: 6,
    status: 'publicado' as const,
    data: {
      imagem: '/img/fun-festival/features-collage.png',
      titulo: '2ª Etapa Fun Festival',
      series: 'fun-festival',
      series_label: 'Fun Festival',
      etapa: '2',
      fotos: [
        { imagem: '/img/fun-festival/features-collage.png' },
        { imagem: '/img/fun-festival/jogue-com-a-diversao.png' },
        { imagem: '/img/fun-festival/estrela.png' },
        { imagem: '/img/galeria/comunidade.png' },
        { imagem: '/img/galeria/eventos.png' },
        { imagem: '/img/galeria/franqueado.png' },
      ],
    },
  },
  {
    id: 807,
    type: 'imagem' as const,
    ordem: 7,
    status: 'publicado' as const,
    data: {
      imagem: '/img/galeria/damas-do-poker.png',
      titulo: 'Damas do Poker',
      series: 'damas-do-poker',
      series_label: 'Damas do Poker',
      fotos: GALERIA_FOTOS_GERAL,
    },
  },
  {
    id: 808,
    type: 'imagem' as const,
    ordem: 8,
    status: 'publicado' as const,
    data: {
      imagem: '/img/galeria/eventos.png',
      titulo: 'Ladies Weekend',
      series: 'ladies-weekend',
      series_label: 'Ladies Weekend',
      fotos: [
        { imagem: '/img/galeria/eventos.png' },
        { imagem: '/img/galeria/damas-do-poker.png' },
        { imagem: '/img/galeria/comunidade.png' },
        { imagem: '/img/galeria/eventos-corporativos.png' },
        { imagem: '/img/cph/history-5.png' },
        { imagem: '/img/cph/history-6.jpg' },
      ],
    },
  },
  {
    id: 809,
    type: 'imagem' as const,
    ordem: 9,
    status: 'publicado' as const,
    data: {
      imagem: '/img/galeria/comunidade.png',
      titulo: 'Xadrez',
      series: 'xadrez',
      series_label: 'Xadrez',
      fotos: [
        { imagem: '/img/galeria/comunidade.png' },
        { imagem: '/img/galeria/poker-esporte-da-mente.png' },
        { imagem: '/img/galeria/franqueado.png' },
        { imagem: '/img/galeria/eventos-corporativos.png' },
        { imagem: '/img/galeria/eventos.png' },
        { imagem: '/img/galeria/damas-do-poker.png' },
      ],
    },
  },
]

const SERIES_MENU_ITEMS = [
  { id: 'cph', kind: 'link', label: 'CPH', to: 'series/cph' },
  { id: 'funfestival', kind: 'link', label: 'Fun Festival', to: 'series/fun-festival' },
]

const CPH_SERIES_RANKING_LINHAS = [
  { id: 5201, type: 'ranking_linha', ordem: 10, status: 'publicado', data: { tab: 'geral', colocacao: 1, nome: 'Nome', avatar: '/img/avatars/jogador-1.png', pontos: 15987 } },
  { id: 5202, type: 'ranking_linha', ordem: 11, status: 'publicado', data: { tab: 'geral', colocacao: 2, nome: 'Nome Sobrenome', avatar: '/img/avatars/jogador-1.png', pontos: 14520 } },
  { id: 5203, type: 'ranking_linha', ordem: 12, status: 'publicado', data: { tab: 'geral', colocacao: 3, nome: 'Nome Sobrenome', avatar: '/img/avatars/jogador-2.png', pontos: 13240 } },
  { id: 5204, type: 'ranking_linha', ordem: 13, status: 'publicado', data: { tab: 'geral', colocacao: 4, nome: 'Nome Sobrenome', avatar: '/img/cph/history-5.png', pontos: 12110 } },
  { id: 5205, type: 'ranking_linha', ordem: 14, status: 'publicado', data: { tab: 'geral', colocacao: 5, nome: 'Nome Sobrenome', avatar: '/img/cph/history-6.jpg', pontos: 11890 } },
  { id: 5206, type: 'ranking_linha', ordem: 15, status: 'publicado', data: { tab: 'geral', colocacao: 6, nome: 'Rodrigo de Miranda Ribeiro Bueno', pontos: 7981 } },
  { id: 5207, type: 'ranking_linha', ordem: 16, status: 'publicado', data: { tab: 'geral', colocacao: 7, nome: 'Rodrigo de Miranda Ribeiro Bueno', pontos: 7981 } },
  { id: 5208, type: 'ranking_linha', ordem: 17, status: 'publicado', data: { tab: 'geral', colocacao: 8, nome: 'Rodrigo de Miranda Ribeiro Bueno', pontos: 7981 } },
  { id: 5209, type: 'ranking_linha', ordem: 18, status: 'publicado', data: { tab: 'geral', colocacao: 9, nome: 'Rodrigo de Miranda Ribeiro Bueno', pontos: 7981 } },
  { id: 5210, type: 'ranking_linha', ordem: 19, status: 'publicado', data: { tab: 'geral', colocacao: 10, nome: 'Rodrigo de Miranda Ribeiro Bueno', pontos: 7981 } },
  { id: 5211, type: 'ranking_linha', ordem: 20, status: 'publicado', data: { tab: 'omaha', colocacao: 1, nome: 'Ana Carolina Lima', avatar: '/img/avatars/player-a.png', pontos: 14200 } },
  { id: 5212, type: 'ranking_linha', ordem: 21, status: 'publicado', data: { tab: 'omaha', colocacao: 2, nome: 'Bruno Ferreira', avatar: '/img/avatars/rank.png', pontos: 13650 } },
  { id: 5213, type: 'ranking_linha', ordem: 22, status: 'publicado', data: { tab: 'omaha', colocacao: 3, nome: 'Carla Mendes', avatar: '/img/avatars/jogador-1.png', pontos: 12980 } },
  { id: 5214, type: 'ranking_linha', ordem: 23, status: 'publicado', data: { tab: 'omaha', colocacao: 4, nome: 'Diego Alves', avatar: '/img/avatars/jogador-2.png', pontos: 12140 } },
  { id: 5215, type: 'ranking_linha', ordem: 24, status: 'publicado', data: { tab: 'omaha', colocacao: 5, nome: 'Eduarda Prado', avatar: '/img/cph/history-5.png', pontos: 11720 } },
  { id: 5216, type: 'ranking_linha', ordem: 25, status: 'publicado', data: { tab: 'omaha', colocacao: 6, nome: 'Felipe Nogueira', pontos: 7540 } },
  { id: 5217, type: 'ranking_linha', ordem: 26, status: 'publicado', data: { tab: 'omaha', colocacao: 7, nome: 'Gabriela Souza', pontos: 7320 } },
  { id: 5218, type: 'ranking_linha', ordem: 27, status: 'publicado', data: { tab: 'omaha', colocacao: 8, nome: 'Henrique Barros', pontos: 7110 } },
  { id: 5219, type: 'ranking_linha', ordem: 28, status: 'publicado', data: { tab: 'omaha', colocacao: 9, nome: 'Isabela Rocha', pontos: 6980 } },
  { id: 5220, type: 'ranking_linha', ordem: 29, status: 'publicado', data: { tab: 'omaha', colocacao: 10, nome: 'João Pedro Costa', pontos: 6840 } },
  { id: 5221, type: 'ranking_linha', ordem: 30, status: 'publicado', data: { tab: 'ladies', colocacao: 1, nome: 'Mariana Duarte', avatar: '/img/cph/history-6.jpg', pontos: 15120 } },
  { id: 5222, type: 'ranking_linha', ordem: 31, status: 'publicado', data: { tab: 'ladies', colocacao: 2, nome: 'Patrícia Gomes', avatar: '/img/avatars/player-a.png', pontos: 14780 } },
  { id: 5223, type: 'ranking_linha', ordem: 32, status: 'publicado', data: { tab: 'ladies', colocacao: 3, nome: 'Renata Pires', avatar: '/img/avatars/rank.png', pontos: 13990 } },
  { id: 5224, type: 'ranking_linha', ordem: 33, status: 'publicado', data: { tab: 'ladies', colocacao: 4, nome: 'Sandra Moura', avatar: '/img/avatars/jogador-1.png', pontos: 12840 } },
  { id: 5225, type: 'ranking_linha', ordem: 34, status: 'publicado', data: { tab: 'ladies', colocacao: 5, nome: 'Tatiana Reis', avatar: '/img/avatars/jogador-2.png', pontos: 12310 } },
  { id: 5226, type: 'ranking_linha', ordem: 35, status: 'publicado', data: { tab: 'ladies', colocacao: 6, nome: 'Vanessa Teixeira', pontos: 8120 } },
  { id: 5227, type: 'ranking_linha', ordem: 36, status: 'publicado', data: { tab: 'ladies', colocacao: 7, nome: 'Yasmin Farias', pontos: 7990 } },
  { id: 5228, type: 'ranking_linha', ordem: 37, status: 'publicado', data: { tab: 'ladies', colocacao: 8, nome: 'Aline Borges', pontos: 7760 } },
  { id: 5229, type: 'ranking_linha', ordem: 38, status: 'publicado', data: { tab: 'ladies', colocacao: 9, nome: 'Bianca Lopes', pontos: 7540 } },
  { id: 5230, type: 'ranking_linha', ordem: 39, status: 'publicado', data: { tab: 'ladies', colocacao: 10, nome: 'Camila Andrade', pontos: 7310 } },
  { id: 5231, type: 'ranking_linha', ordem: 40, status: 'publicado', data: { tab: 'seniors', colocacao: 1, nome: 'Antônio Silva', avatar: '/img/cph/history-5.png', pontos: 13840 } },
  { id: 5232, type: 'ranking_linha', ordem: 41, status: 'publicado', data: { tab: 'seniors', colocacao: 2, nome: 'Carlos Eduardo', avatar: '/img/cph/history-6.jpg', pontos: 13120 } },
  { id: 5233, type: 'ranking_linha', ordem: 42, status: 'publicado', data: { tab: 'seniors', colocacao: 3, nome: 'Fernando Rocha', avatar: '/img/avatars/player-a.png', pontos: 12670 } },
  { id: 5234, type: 'ranking_linha', ordem: 43, status: 'publicado', data: { tab: 'seniors', colocacao: 4, nome: 'José Martins', avatar: '/img/avatars/rank.png', pontos: 11980 } },
  { id: 5235, type: 'ranking_linha', ordem: 44, status: 'publicado', data: { tab: 'seniors', colocacao: 5, nome: 'Paulo Henrique', avatar: '/img/avatars/jogador-1.png', pontos: 11450 } },
  { id: 5236, type: 'ranking_linha', ordem: 45, status: 'publicado', data: { tab: 'seniors', colocacao: 6, nome: 'Roberto Campos', pontos: 7680 } },
  { id: 5237, type: 'ranking_linha', ordem: 46, status: 'publicado', data: { tab: 'seniors', colocacao: 7, nome: 'Sérgio Nunes', pontos: 7420 } },
  { id: 5238, type: 'ranking_linha', ordem: 47, status: 'publicado', data: { tab: 'seniors', colocacao: 8, nome: 'Valter Dias', pontos: 7210 } },
  { id: 5239, type: 'ranking_linha', ordem: 48, status: 'publicado', data: { tab: 'seniors', colocacao: 9, nome: 'Wilson Araújo', pontos: 6990 } },
  { id: 5240, type: 'ranking_linha', ordem: 49, status: 'publicado', data: { tab: 'seniors', colocacao: 10, nome: 'Zeca Oliveira', pontos: 6750 } },
  { id: 5241, type: 'ranking_linha', ordem: 50, status: 'publicado', data: { tab: 'high-roller', colocacao: 1, nome: 'Lucas Fontana', avatar: '/img/avatars/jogador-2.png', pontos: 22450 } },
  { id: 5242, type: 'ranking_linha', ordem: 51, status: 'publicado', data: { tab: 'high-roller', colocacao: 2, nome: 'Marcelo Viana', avatar: '/img/cph/history-5.png', pontos: 21180 } },
  { id: 5243, type: 'ranking_linha', ordem: 52, status: 'publicado', data: { tab: 'high-roller', colocacao: 3, nome: 'Otávio Bastos', avatar: '/img/cph/history-6.jpg', pontos: 19870 } },
  { id: 5244, type: 'ranking_linha', ordem: 53, status: 'publicado', data: { tab: 'high-roller', colocacao: 4, nome: 'Rafael Monteiro', avatar: '/img/avatars/player-a.png', pontos: 18640 } },
  { id: 5245, type: 'ranking_linha', ordem: 54, status: 'publicado', data: { tab: 'high-roller', colocacao: 5, nome: 'Thiago Pacheco', avatar: '/img/avatars/rank.png', pontos: 17920 } },
  { id: 5246, type: 'ranking_linha', ordem: 55, status: 'publicado', data: { tab: 'high-roller', colocacao: 6, nome: 'Vitor Cunha', pontos: 12450 } },
  { id: 5247, type: 'ranking_linha', ordem: 56, status: 'publicado', data: { tab: 'high-roller', colocacao: 7, nome: 'Wagner Lins', pontos: 11980 } },
  { id: 5248, type: 'ranking_linha', ordem: 57, status: 'publicado', data: { tab: 'high-roller', colocacao: 8, nome: 'Xavier Braga', pontos: 11420 } },
  { id: 5249, type: 'ranking_linha', ordem: 58, status: 'publicado', data: { tab: 'high-roller', colocacao: 9, nome: 'Yuri Santana', pontos: 10960 } },
  { id: 5250, type: 'ranking_linha', ordem: 59, status: 'publicado', data: { tab: 'high-roller', colocacao: 10, nome: 'Zion Matos', pontos: 10480 } },
]

const CPH_SERIES_RANKING_SECTION_CTAS = [
  {
    id: 521,
    type: 'section_cta',
    ordem: 1,
    status: 'publicado',
    data: { tab: 'geral', titulo: 'Ranking Geral', align: 'center', size: 'md' },
  },
  {
    id: 522,
    type: 'section_cta',
    ordem: 2,
    status: 'publicado',
    data: { tab: 'omaha', titulo: 'Ranking Omaha', align: 'center', size: 'md' },
  },
  {
    id: 523,
    type: 'section_cta',
    ordem: 3,
    status: 'publicado',
    data: { tab: 'ladies', titulo: 'Ranking Ladies', align: 'center', size: 'md' },
  },
  {
    id: 524,
    type: 'section_cta',
    ordem: 4,
    status: 'publicado',
    data: { tab: 'seniors', titulo: 'Ranking Sêniors', align: 'center', size: 'md' },
  },
  {
    id: 525,
    type: 'section_cta',
    ordem: 5,
    status: 'publicado',
    data: { tab: 'high-roller', titulo: 'Ranking High Roller', align: 'center', size: 'md' },
  },
]


export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  const mockData: Record<string, any> = {

    // UNIDADE
    'sp-pinheiros': {
      // Unidade
      unidade: {
        id: 1,
        nome: 'São Paulo',
        slug: 'sp-pinheiros',
        logo: '/images/logo-sp.png',
        status: 'inativo'
      },
      // Menu
      menu: [
        { id: 'h2bet', kind: 'link', label: 'H2Bet', to: 'https://www.h2.bet.br/', external: true },
        { id: 'agenda', kind: 'link', label: 'Agenda', pagina: 'agenda' },
        { id: 'eventos', kind: 'link', label: 'Eventos', pagina: 'eventos' },
        { id: 'unique', kind: 'link', label: 'H2unique', pagina: 'unique' },
        { id: 'galeria', kind: 'link', label: 'Galeria', pagina: 'galeria' },
        { id: 'faq', kind: 'link', label: 'FAQ', pagina: 'faq' },
        {
          id: 'conteudo',
          kind: 'dropdown',
          label: 'Séries',
          items: SERIES_MENU_ITEMS,
        },
      ],
      footer: {
        hashtag: '#TocaEJoga',
        copyright: 'Copyright 2023 ®Grupo H2 Brasil.',
        endereco: 'Rua Henrique Schaumann, 313 - Pinheiros, São Paulo - SP, 05413-001',
        redes_sociais: [
          { id: 'instagram', tipo: 'instagram', url: 'https://instagram.com', label: 'Instagram' },
          { id: 'youtube', tipo: 'youtube', url: 'https://youtube.com', label: 'YouTube' },
        ],
        colunas: [
          {
            id: 'torneios',
            secoes: [
              {
                id: 'torneios',
                titulo: 'Torneios',
                links: [
                  { id: 'cph', label: 'CPH', to: '/series/cph' },
                  { id: 'fun-festival', label: 'Fun Festival', to: '/series/fun-festival' },
                  { id: 'damas-do-poker', label: 'Damas do Poker', to: '/series/damas-do-poker' },
                  { id: 'ladies-weekend', label: 'Ladies Weekend', to: '/series/ladies-weekend' },
                  { id: 'xadrez', label: 'Xadrez', to: '/series/xadrez' },
                ],
              },
            ],
          },
          {
            id: 'clube',
            secoes: [
              {
                id: 'o-clube',
                titulo: 'O clube',
                links: [
                  { id: 'quem-somos', label: 'Quem somos', pagina: 'sobre' },
                  { id: 'social', label: 'Social', to: '/social' },
                  { id: 'galeria', label: 'Galeria de fotos', to: 'galeria' },
                  { id: 'poker-mente-footer', label: 'Poker Esporte da Mente', pagina: 'poker-esporte-da-mente' },
                  { id: 'sports-bar-footer', label: 'Sports Bar', pagina: 'sports-bar' },
                  { id: 'eventos-footer', label: 'Eventos', pagina: 'eventos' },
                ],
              },
              {
                id: 'destaques',
                links: [
                  { id: 'jackpot', label: 'Jackpot', pagina: 'jackpot', estilo: 'destaque' },
                  { id: 'h2bet', label: 'H2bet', to: 'https://www.h2.bet.br/', external: true, estilo: 'destaque' },
                ],
              },
            ],
          },
          {
            id: 'legal',
            secoes: [
              {
                id: 'termos',
                titulo: 'Termos e condições',
                links: [
                  { id: 'regulamentos', label: 'Regulamentos', pagina: 'regulamentos' },
                  { id: 'privacidade', label: 'Segurança e privacidade', pagina: 'seguranca-e-privacidade' },
                ],
              },
              {
                id: 'atendimento',
                titulo: 'Atendimento',
                links: [
                  { id: 'trabalhe', label: 'Trabalhe conosco', to: '/trabalhe' },
                  { id: 'ouvidoria', label: 'Ouvidoria', to: '/ouvidoria' },
                ],
              },
            ],
          },
        ],
      },
      // Páginas
      paginas: [
        // Pagina Home
        {
          slug: 'home',
          titulo: 'Home',
          ordem: 1,
          status: 'publicado',
          modulos: [
            {
              id: 2,
              tipo: 'ranking',
              ordem: 1,
              margin_top: 10,
              status: 'publicado',
              components: [
                {
                  id: 200,
                  type: 'ranking_config',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Ranking',
                    logo: '/img/ranking/logo-cph.png',
                    cor: 'branco',
                    cta: 'Confira o ranking',
                    cta_link: 'series/cph#ranking'
                  }
                },
                {
                  id: 201,
                  type: 'ranking',
                  ordem: 1,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: '/img/avatars/jogador-1.png', pontos: 283000 }
                },
                {
                  id: 202,
                  type: 'ranking',
                  ordem: 2,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: '/img/avatars/jogador-1.png', pontos: 275000 }
                },
                {
                  id: 203,
                  type: 'ranking',
                  ordem: 3,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: '/img/avatars/jogador-1.png', pontos: 268000 }
                },
                {
                  id: 204,
                  type: 'ranking',
                  ordem: 4,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: '/img/avatars/jogador-1.png', pontos: 260000 }
                },
                {
                  id: 205,
                  type: 'ranking',
                  ordem: 5,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: '/img/avatars/jogador-1.png', pontos: 255000 }
                }
              ]
            },
            {
              id: 3,
              tipo: 'ranking',
              ordem: 2,
              margin_top: 0,
              status: 'publicado',
              components: [
                {
                  id: 210,
                  type: 'ranking_config',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Ranking',
                    logo: '/img/ranking/logo-fun-festival.svg',
                    cor: 'purple',
                    cta: 'Confira o ranking',
                    cta_link: '/ranking/fun-festival'
                  }
                },
                {
                  id: 211,
                  type: 'ranking',
                  ordem: 1,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: '/img/avatars/jogador-1.png', pontos: 283000 }
                },
                {
                  id: 212,
                  type: 'ranking',
                  ordem: 2,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: '/img/avatars/jogador-1.png', pontos: 275000 }
                },
                {
                  id: 213,
                  type: 'ranking',
                  ordem: 3,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: '/img/avatars/jogador-1.png', pontos: 268000 }
                },
                {
                  id: 214,
                  type: 'ranking',
                  ordem: 4,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: '/img/avatars/jogador-1.png', pontos: 260000 }
                },
                {
                  id: 215,
                  type: 'ranking',
                  ordem: 5,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: '/img/avatars/jogador-1.png', pontos: 255000 }
                }
              ]
            },

            // Agenda Preview (widget reduzido — cards compactos, clique vai para /agenda)
            {
              id: 4,
              tipo: 'agenda_preview',
              ordem: 3,
              status: 'publicado',
              margin_top: 40,
              margin_bottom: 40,
              metadados: {
                carousel_bleed_right: true,
              },
              components: [
                {
                  id: 100,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Agenda de hoje',
                    cta: 'Veja a agenda completa',
                    cta_link: 'agenda',
                    align: 'left',
                    size: 'md',
                  },
                },
                {
                  id: 400,
                  type: 'cash_game',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    titulo: 'Cash Game',
                    inicio: '12:00',
                    inscricoes: '06:00',
                    link: 'fila-cash-game',
                    botoes: [{ label: 'Garanta seu lugar', link: 'fila-cash-game' }],
                  },
                },
                ...AGENDA_TORNEIOS_PINHEIROS.slice(0, 4).map((t, i) =>
                  toPreviewCardComponent(t, 401 + i, 2 + i, i === 0),
                ),
              ],
            },
            {
              id: 6,
              tipo: 'galeria',
              ordem: 4,
              status: 'publicado',
              margin_top: 40,
              margin_bottom: 40,
              metadados: {
                layout: 'drag_carousel',
                carousel_bleed_right: true,
              },
              components: [
                {
                  id: 601,
                  type: 'imagem',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    imagem: '/img/galeria/eventos.png',
                    titulo: 'Eventos',
                    descricao: 'Jogue onde quiser. O resto é com a gente. Seu foco? Só no all-in.',
                    link: 'agenda',
                  },
                },
                {
                  id: 602,
                  type: 'imagem',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    imagem: '/img/galeria/comunidade.png',
                    titulo: 'Comunidade',
                    descricao: 'Mesas abertas até tarde com estrutura profissional e prêmios garantidos.',
                    link: 'faq',
                  },
                },
                {
                  id: 603,
                  type: 'imagem',
                  ordem: 3,
                  status: 'publicado',
                  data: {
                    imagem: '/img/galeria/damas-do-poker.png',
                    titulo: 'Damas do Poker',
                    descricao: 'Texas Hold\'em No Limit com blinds para todos os níveis de jogo.',
                    link: 'agenda/cph',
                  },
                },
                {
                  id: 604,
                  type: 'imagem',
                  ordem: 4,
                  status: 'publicado',
                  data: {
                    imagem: '/img/galeria/eventos-corporativos.png',
                    titulo: 'Eventos Corporativos',
                    descricao: 'Estrutura premium, conforto e a melhor experiência de poker da cidade.',
                    link: 'fila-cash-game',
                  },
                },
                {
                  id: 605,
                  type: 'imagem',
                  ordem: 5,
                  status: 'publicado',
                  data: {
                    imagem: '/img/galeria/franqueado.png',
                    titulo: 'Franqueado',
                    descricao: 'Grandes festivais com garantidos milionários e calendário o ano todo.',
                    link: 'https://h2.com.br',
                  },
                },
                {
                  id: 606,
                  type: 'imagem',
                  ordem: 6,
                  status: 'publicado',
                  data: {
                    imagem: '/img/galeria/poker-esporte-da-mente.png',
                    titulo: 'Poker Esporte da Mente',
                    descricao: 'Mais que um clube: comunidade, gastronomia e poker em alto nível.',
                    link: 'poker-esporte-da-mente',
                  },
                },
              ],
            },
            {
              id: 700,
              tipo: 'banner',
              margin_bottom: 40,
              ordem: 5,
              status: 'publicado',
              components: [
                {
                  id: 701,
                  type: 'banner',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    layout: 'overlay',
                    height: 'md',
                    cta_position: 'left',
                    overlay: 'gradient',
                    border_radius: 'lg',
                    object_fit: 'contain',
                    imagem: '/img/banners/sports-bar.jpg',
                    section_cta: {
                      titulo: 'Sports Bar',
                      descricao: 'Os maiores jogos do esporte ao vivo.\nTorcida, menu especial e bebidas para acompanhar cada lance.',
                      cta: 'Conheça nosso sports bar',
                      cta_link: 'sports-bar',
                      cta_cor: 'verde',
                      align: 'left',
                      size: 'md',
                    },
                  },
                },
              ],
            },

            {
              id: 1,
              tipo: 'banner',
              ordem: 6,
              status: 'publicado',
              metadados: {
                drag_carousel: true,
                carousel_bleed_right: true,
                carousel_bleed_left: true,
              },
              components: [
                {
                  id: 12,
                  type: 'banner',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    layout: 'overlay',
                    size: 'sm',
                    height: 'lg',
                    cta_position: 'bottom-center',
                    overlay: 'gradient-bottom',
                    imagem: '/img/promos/h2bet.png',
                    section_cta: {
                      titulo: 'H2bet',
                      descricao: 'Aposte nos seus times favoritos com as melhores odds do mercado.',
                      cta: 'Toca e Joga!',
                      cta_link: 'https://www.h2.bet.br/',
                      align: 'center',
                      size: 'md',
                    },
                  },
                },
                {
                  id: 13,
                  type: 'banner',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    layout: 'overlay',
                    size: 'sm',
                    height: 'lg',
                    cta_position: 'bottom-center',
                    overlay: 'gradient-bottom',
                    imagem: '/img/promos/h2rewards-1.png',
                    section_cta: {
                      titulo: 'H2rewards',
                      descricao: 'Acumule pontos em cada buy-in e troque por prêmios exclusivos.',
                      cta: 'Saiba mais',
                      cta_link: 'agenda',
                      align: 'center',
                      size: 'md',
                    },
                  },
                },
                {
                  id: 14,
                  type: 'banner',
                  ordem: 3,
                  status: 'publicado',
                  data: {
                    layout: 'overlay',
                    size: 'sm',
                    height: 'lg',
                    cta_position: 'bottom-center',
                    overlay: 'gradient-bottom',
                    imagem: '/img/promos/h2rewards-2.png',
                    section_cta: {
                      titulo: 'H2rewards',
                      descricao: 'Acumule pontos em cada buy-in e troque por prêmios exclusivos.',
                      cta: 'Saiba mais',
                      cta_link: 'agenda',
                      align: 'center',
                      size: 'md',
                    },
                  },
                },
                
              ],
            },
            {
              id: 702,
              tipo: 'banner',
              ordem: 7,
              status: 'publicado',
              margin_top: 40,
              margin_bottom: 40,
              components: [
                {
                  id: 7021,
                  type: 'banner',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    layout: 'two_column',
                    size: 'lg',
                    cta_column: 'left',
                    reverse_columns: true,
                    imagem_size: 'lg',
                    border_radius: 'lg',
                    imagem: '/img/banners/poker-esporte-da-mente.png',
                    section_cta: {
                      titulo: 'Poker é esporte da mente.',
                      descricao: 'No H2, estratégia é poder, leitura é vantagem e dominar a mesa é o único caminho.',
                      cta: 'Saiba mais',
                      cta_link: 'poker-esporte-da-mente',
                      cta_cor: 'verde',
                      align: 'left',
                      size: 'md',
                    },
                  },
                },
              ],
            },

            {
              id: 5,
              tipo: 'faq',
              ordem: 8,
              status: 'publicado',
              margin_top: 40,
              margin_bottom: 40,
              metadados: {
                margin_lateral: 100,
              },
              components: [
                {
                  id: 500,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Precisa de ajuda?',
                    descricao: 'Aqui estão algumas das perguntas mais frequentes sobre o H2.',
                    cta: 'Saiba mais',
                    cta_link: 'faq',
                    align: 'left',
                    size: 'md',
                    width: 'md',
                  },
                },
                {
                  id: 501,
                  type: 'faq',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    pergunta: 'Que horas o clube abre?',
                    resposta: 'O clube abre todos os dias às 12h. Os torneios e cash games seguem a agenda do dia — confira os horários na página de agenda.',
                  },
                },
                {
                  id: 502,
                  type: 'faq',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    pergunta: 'Pode entrar menor de idade no clube?',
                    resposta: 'Não. O acesso ao clube é permitido apenas para maiores de 18 anos, conforme a legislação vigente.',
                  },
                },
                {
                  id: 503,
                  type: 'faq',
                  ordem: 3,
                  status: 'publicado',
                  data: {
                    pergunta: 'Quais as modalidades do Cash Game',
                    resposta: 'Oferecemos mesas de Texas Hold\'em No Limit com blinds a partir de R$ 2/4. A disponibilidade varia conforme a demanda — consulte a agenda para ver as mesas abertas hoje.',
                  },
                },
              ],
            },

            {
              id: 703,
              tipo: 'banner',
              ordem: 9,
              status: 'publicado',
              margin_top: 40,
              margin_bottom: 40,
              metadados: {
                use_same_faq_margin: true,
              },
              components: [
                {
                  id: 7031,
                  type: 'banner',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    layout: 'overlay',
                    size: 'lg',
                    border_radius: 'lg',
                    object_fit: 'contain',
                    overlay: 'none',
                    imagem: '/img/avatars/embaixador.png',
                  },
                },
              ],
            },

          ],
        },

        // Pagina Agenda
        {
          slug: 'agenda',
          titulo: 'Agenda',
          ordem: 2,
          status: 'publicado',
          modulos: [
            {
              id: 10,
              tipo: 'grid',
              ordem: 1,
              status: 'publicado',
              components: [
                {
                  id: 100,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Agenda',
                    descricao: 'Confira os torneios dos próximos dias',
                    align: 'left',
                    size: 'md'
                  }
                },
                {
                  id: 101,
                  type: 'grid_toolbar',
                  ordem: 1,
                  status: 'publicado',
                  data: AGENDA_GRID_TOOLBAR,
                },
                {
                  id: 102,
                  type: 'grid_config',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    colunas: 4,
                    gap: 'md',
                    item_types: ['card'],
                    agrupar_por_dia: true,
                  }
                },
                ...ALL_TORNEIOS.map((t, i) =>
                  toGridCardComponent(t, 1 + i, 10 + i),
                ),
              ]
            },
            createAgendaFaqModulo(11, 1100),
          ],
        },

        // Página Agenda — CPH
        {
          slug: 'agenda/cph',
          titulo: 'Agenda CPH',
          ordem: 20,
          status: 'publicado',
          modulos: [
            {
              id: 60,
              tipo: 'grid',
              ordem: 1,
              status: 'publicado',
              margin_top: 40,
              margin_bottom: 40,
              components: [
                {
                  id: 600,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Agenda CPH',
                    descricao: 'Confira os torneios desta etapa.',
                    align: 'left',
                    size: 'md',
                  },
                },
                {
                  id: 601,
                  type: 'grid_toolbar',
                  ordem: 1,
                  status: 'publicado',
                  data: AGENDA_SERIES_GRID_TOOLBAR_CPH,
                },
                {
                  id: 602,
                  type: 'grid_config',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    colunas: 4,
                    gap: 'md',
                    item_types: ['card'],
                    agrupar_por_dia: true,
                  },
                },
                ...AGENDA_TORNEIOS_CPH.map((t, i) =>
                  toGridCardComponent(t, 603 + i, 10 + i),
                ),
              ],
            },
            createAgendaFaqModulo(62, 6200),
          ],
        },

        // Página Agenda — Fun Festival
        {
          slug: 'agenda/fun-festival',
          titulo: 'Agenda Fun Festival',
          ordem: 21,
          status: 'publicado',
          modulos: [
            {
              id: 61,
              tipo: 'grid',
              ordem: 1,
              status: 'publicado',
              components: [
                {
                  id: 610,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Agenda Fun Festival',
                    descricao: 'Confira os torneios desta etapa.',
                    align: 'left',
                    size: 'md',
                  },
                },
                {
                  id: 611,
                  type: 'grid_toolbar',
                  ordem: 1,
                  status: 'publicado',
                  data: AGENDA_SERIES_GRID_TOOLBAR_FUN,
                },
                {
                  id: 612,
                  type: 'grid_config',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    colunas: 4,
                    gap: 'md',
                    item_types: ['card'],
                    agrupar_por_dia: true,
                  },
                },
                ...AGENDA_TORNEIOS_FUN.map((t, i) =>
                  toGridCardComponent(t, 613 + i, 10 + i),
                ),
              ],
            },
            createAgendaFaqModulo(63, 6300),
          ],
        },

        // Página Fila Cash Game
        {
          slug: 'fila-cash-game',
          titulo: 'Cash game',
          ordem: 22,
          status: 'publicado',
          modulos: [
            {
              id: 70,
              tipo: 'grid',
              ordem: 1,
              status: 'publicado',
              margin_top: 40,
              margin_bottom: 100,
              components: [
                {
                  id: 700,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Cash game',
                    descricao: 'Confira as mesas abertas, e garanta o seu lugar.',
                    align: 'left',
                    size: 'md',
                  },
                },
                {
                  id: 701,
                  type: 'grid_toolbar',
                  ordem: 1,
                  status: 'publicado',
                  data: CASH_GAME_GRID_TOOLBAR,
                },
                {
                  id: 702,
                  type: 'grid_config',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    colunas: 4,
                    gap: 'md',
                    item_types: ['card'],
                  },
                },
                ...CASH_GAME_MESAS.map((m, i) =>
                  toCashGameCardComponent(m, 703 + i, 10 + i),
                ),
              ],
            },
            {
              id: 71,
              tipo: 'faq',
              ordem: 2,
              status: 'publicado',
              margin_top: 100,
              margin_bottom: 40,
              metadados: { margin_lateral: HOME_FAQ_MARGIN_LATERAL },
              components: [
                {
                  id: 710,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Perguntas frequentes',
                    descricao: 'Aqui estão algumas das perguntas mais frequentes sobre a agenda.',
                    cta: 'Saiba mais',
                    cta_link: 'faq',
                    cta_cor: 'verde',
                    align: 'left',
                    size: 'md',
                  },
                },
                {
                  id: 711,
                  type: 'faq',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    pergunta: 'Como entro na fila do cash game?',
                    resposta: 'Escolha uma mesa aberta e toque em Entrar na fila. Você verá sua posição na fila de espera.',
                  },
                },
                {
                  id: 712,
                  type: 'faq',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    pergunta: 'Posso sair da fila?',
                    resposta: 'Sim. Fale com a equipe de piso ou use o app para cancelar sua inscrição na fila.',
                  },
                },
                {
                  id: 713,
                  type: 'faq',
                  ordem: 3,
                  status: 'publicado',
                  data: {
                    pergunta: 'Quais blinds estão disponíveis?',
                    resposta: 'As mesas e blinds abertos aparecem nesta página e são atualizados conforme o movimento do clube.',
                  },
                },
              ],
            },
          ],
        },

        // Pagina FAQ
        {
          slug: 'faq',
          titulo: 'FAQ',
          ordem: 3,
          status: 'publicado',
          modulos: [
            {
              id: 11,
              tipo: 'faq_page',
              ordem: 1,
              margin_top: 40,
              status: 'publicado',
              metadados: {
                margin_lateral: 40,
              },
              components: [
                {
                  id: 110,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Perguntas Frequentes do H2',
                    align: 'center',
                    size: 'md',
                  },
                },
                {
                  id: 111,
                  type: 'faq_categoria',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    slug: 'torneios',
                    titulo: 'Torneios',
                    perguntas: [
                      {
                        pergunta: 'Qual a grade do clube hoje?',
                        resposta: 'Para sua comodidade, mantemos a grade sempre atualizada em nosso site. Acesse h2club.com.br e confira a programação completa do dia, além da agenda com os próximos eventos.',
                      },
                      {
                        pergunta: 'Tem "Start" no clube?',
                        resposta: 'Sim. Diversos torneios do clube oferecem nível Start, permitindo que você entre em um estágio intermediário do evento dentro do período de registro tardio (late registration), conforme as regras de cada torneio.',
                      },
                      {
                        pergunta: 'Em que nível de "blinds" está o torneio?',
                        resposta: 'O nível atual de blinds é exibido nos relógios das mesas e no painel de torneios do clube. Você também pode consultar a estrutura completa de blinds na página do evento ou com a equipe de piso.',
                      },
                      {
                        pergunta: 'O que é "blinds"?',
                        resposta: 'Blinds são apostas obrigatórias que rotacionam entre os jogadores a cada mão. Elas garantem ação nas mesas e aumentam progressivamente ao longo do torneio, conforme a estrutura de níveis publicada.',
                      },
                    ],
                  },
                },
                {
                  id: 112,
                  type: 'faq_categoria',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    slug: 'cash-game',
                    titulo: 'Cash Game',
                    perguntas: [
                      {
                        pergunta: 'Quais as modalidades do Cash Game?',
                        resposta: 'Oferecemos mesas de Texas Hold\'em No Limit com blinds a partir de R$ 2/4. A disponibilidade varia conforme a demanda — consulte a agenda para ver as mesas abertas hoje.',
                      },
                      {
                        pergunta: 'Qual o buy-in mínimo para sentar na mesa?',
                        resposta: 'O buy-in mínimo segue a regra da mesa, geralmente entre 50 e 100 big blinds. A equipe de piso informa o valor exato no momento do seu assento.',
                      },
                      {
                        pergunta: 'Posso entrar e sair da mesa a qualquer momento?',
                        resposta: 'Sim. No cash game você pode se retirar quando quiser e retornar enquanto houver vaga na mesa, respeitando o buy-in mínimo e máximo da modalidade.',
                      },
                    ],
                  },
                },
                {
                  id: 113,
                  type: 'faq_categoria',
                  ordem: 3,
                  status: 'publicado',
                  data: {
                    slug: 'estacionamento',
                    titulo: 'Estacionamento',
                    perguntas: [
                      {
                        pergunta: 'O clube oferece estacionamento?',
                        resposta: 'Sim. A unidade dispõe de estacionamento para clientes. Em dias de eventos maiores, recomendamos chegar com antecedência para garantir vaga.',
                      },
                      {
                        pergunta: 'O estacionamento é gratuito?',
                        resposta: 'O estacionamento é gratuito para clientes do clube, sujeito à disponibilidade de vagas no período de permanência.',
                      },
                      {
                        pergunta: 'Há serviço de manobrista?',
                        resposta: 'Em eventos especiais podemos oferecer apoio de manobrista. Consulte a recepção no dia da sua visita para confirmar a disponibilidade.',
                      },
                    ],
                  },
                },
                {
                  id: 114,
                  type: 'faq_categoria',
                  ordem: 4,
                  status: 'publicado',
                  data: {
                    slug: 'financeiro',
                    titulo: 'Financeiro',
                    perguntas: [
                      {
                        pergunta: 'Quais formas de pagamento são aceitas?',
                        resposta: 'Aceitamos cartões de débito e crédito, PIX e saldo H2Pay. Para buy-ins de torneios, também é possível utilizar pontos H2Rewards quando a modalidade permitir.',
                      },
                      {
                        pergunta: 'Posso usar pontos H2Rewards no buy-in?',
                        resposta: 'Sim, em torneios e produtos elegíveis. O valor em pontos e a disponibilidade aparecem na agenda de cada evento e no momento da compra.',
                      },
                      {
                        pergunta: 'Como funciona o saque de premiação?',
                        resposta: 'Premiações de torneios podem ser recebidas conforme as regras do evento: em fichas, crédito no clube ou transferência, de acordo com o valor e a política vigente.',
                      },
                    ],
                  },
                },
                {
                  id: 115,
                  type: 'faq_categoria',
                  ordem: 5,
                  status: 'publicado',
                  data: {
                    slug: 'o-clube',
                    titulo: 'O Clube',
                    perguntas: [
                      {
                        pergunta: 'Que horas o clube abre?',
                        resposta: 'O clube abre todos os dias às 12h. Os torneios e cash games seguem a agenda do dia — confira os horários na página de agenda.',
                      },
                      {
                        pergunta: 'Pode entrar menor de idade no clube?',
                        resposta: 'Não. O acesso ao clube é permitido apenas para maiores de 18 anos, conforme a legislação vigente.',
                      },
                      {
                        pergunta: 'Existe dress code no clube?',
                        resposta: 'Pedimos traje casual elegante. Evite chinelos, bermudas de praia e camisetas com mensagens ofensivas. Em séries especiais, consulte o regulamento do evento.',
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },

        createPokerEsporteDaMentePagina(5, 9500),
        createSportsBarPagina(6, 9600),
        createEventosPagina(7, 9700),
        createJackpotPagina(8, 9900),
        createSobrePagina(9, 10100),
        createUniquePagina(10, 10300),
        createRegulamentosPagina(90, 9000),
        createSegurancaPrivacidadePagina(91, 9100),

        // Página Galeria de fotos
        {
          slug: 'galeria',
          titulo: 'Galeria de fotos',
          ordem: 4,
          status: 'publicado',
          modulos: [
            {
              id: 80,
              tipo: 'galeria',
              ordem: 1,
              status: 'publicado',
              margin_top: 40,
              margin_bottom: 40,
              metadados: {
                layout: 'grid',
                colunas: 4,
                itens_por_linha: 2,
                gap: 'md',
                card_variant: 'album',
                filtro_series: true,
              },
              components: [
                {
                  id: 800,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Suas fotos aqui!',
                    align: 'center',
                    size: 'md',
                  },
                },
                ...GALERIA_ALBUNS,
              ],
            },
            {
              id: 81,
              tipo: 'faq',
              ordem: 2,
              status: 'publicado',
              margin_top: 40,
              margin_bottom: 40,
              metadados: {
                margin_lateral: 112,
              },
              components: [
                {
                  id: 810,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Perguntas frequentes',
                    descricao: 'Aqui estão algumas das perguntas mais frequentes sobre a agenda',
                    cta: 'Saiba mais',
                    cta_link: 'faq',
                    cta_cor: 'verde',
                    align: 'left',
                    size: 'md',
                    width: 'md',
                  },
                },
                {
                  id: 811,
                  type: 'faq',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    pergunta: 'Onde encontro as fotos dos torneios?',
                    resposta: 'Na galeria você encontra álbuns por série e etapa. Use o filtro no topo para navegar entre CPH, Fun Festival e demais séries.',
                  },
                },
                {
                  id: 812,
                  type: 'faq',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    pergunta: 'Quando as fotos são publicadas?',
                    resposta: 'As fotos de cada etapa costumam ser publicadas em até 48 horas após o evento. Em séries especiais o prazo pode variar.',
                  },
                },
                {
                  id: 813,
                  type: 'faq',
                  ordem: 3,
                  status: 'publicado',
                  data: {
                    pergunta: 'Posso solicitar uma foto específica?',
                    resposta: 'Sim. Entre em contato pelo atendimento do clube informando a série, a etapa e uma descrição do momento — vamos te ajudar a localizar.',
                  },
                },
              ],
            },
          ],
        },

        // Página Série — CPH (topo fixo: Banner + Próximas etapas)
        {
          slug: 'series/cph',
          titulo: 'CPH',
          ordem: 10,
          status: 'publicado',
          modulos: [
            {
              id: 40,
              tipo: 'banner',
              ordem: 1,
              status: 'publicado',
              metadados: { full_width: true },
              components: [
                {
                  id: 400,
                  type: 'banner',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    imagem: SERIES_BANNERS.cph,
                    size: 'lg',
                    height: 'strip',
                    overlay: 'none',
                    rounded: false,
                  },
                },
              ],
            },
            {
              id: 50,
              tipo: 'agenda_preview',
              ordem: 2,
              status: 'publicado',
              margin_top: 40,
              margin_bottom: 40,
              metadados: {
                carousel_bleed_right: true,
                card_variant: 'etapa_preview',
                hide_cash_game: true,
              },
              components: [
                {
                  id: 500,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Próximas etapas',
                    cta: 'Confira os torneios da 2ª etapa',
                    cta_link: 'agenda/cph?etapa=2',
                    cta_cor: 'branco',
                    align: 'left',
                    size: 'md',
                    width: 'md',
                  },
                },
                {
                  id: 501,
                  type: 'card',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    ativo: true,
                    titulo: '2ª Etapa',
                    subtitulo: 'CPH',
                    faixa_info: '22 de Fevereiro a 03 de Março',
                    link: 'agenda/cph?etapa=2',
                    cor: 'vermelho',
                    classes: { fundo_ativo: '#d63d1d' },
                  },
                },
                {
                  id: 502,
                  type: 'card',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    ativo: false,
                    titulo: '3ª Etapa',
                    subtitulo: 'CPH',
                    faixa_info: '05 a 14 de Abril',
                    link: 'agenda/cph?etapa=3',
                  },
                },
                {
                  id: 503,
                  type: 'card',
                  ordem: 3,
                  status: 'publicado',
                  data: {
                    ativo: false,
                    titulo: '4ª Etapa',
                    subtitulo: 'CPH',
                    faixa_info: '10 a 19 de Maio',
                    link: 'agenda/cph?etapa=4',
                  },
                },
                {
                  id: 504,
                  type: 'card',
                  ordem: 4,
                  status: 'publicado',
                  data: {
                    ativo: false,
                    titulo: '5ª Etapa',
                    subtitulo: 'CPH',
                    faixa_info: '07 a 16 de Junho',
                    link: 'agenda/cph?etapa=5',
                  },
                },
              ],
            },
            {
              id: 52,
              tipo: 'ranking_tabela',
              ordem: 3,
              status: 'publicado',
              margin_top: 93,
              margin_bottom: 40,
              components: [
                {
                  id: 520,
                  type: 'ranking_tabela_config',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    cor: 'vermelho',
                    cta: 'Ver mais',
                    cta_link: 'ranking/cph',
                    tabs: [
                      { id: 'geral', label: 'Geral' },
                      { id: 'omaha', label: 'Omaha' },
                      { id: 'ladies', label: 'Ladies' },
                      { id: 'seniors', label: 'Sêniors' },
                      { id: 'high-roller', label: 'High Roller' },
                    ],
                    colunas: [
                      { id: 'colocacao', label: 'Colocação' },
                      { id: 'nome', label: 'Nome Sobrenome' },
                      { id: 'pontos', label: 'Pontos' },
                    ],
                  },
                },
                ...CPH_SERIES_RANKING_SECTION_CTAS,
                ...CPH_SERIES_RANKING_LINHAS,
              ],
            },
            {
              id: 53,
              tipo: 'faixa_cta',
              ordem: 4,
              status: 'publicado',
              margin_top: 93,
              margin_bottom: 40,
              components: [
                {
                  id: 530,
                  type: 'faixa_cta',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    titulo: 'Quem jogou, marcou. Encontre seu momento.',
                    titulo_size: '20px',
                    cta: 'Suas fotos aqui',
                    cta_link: 'galeria?series=cph',
                    backgroundColor: 'rgba(214, 61, 29, 0.6)',
                    textColor: '#e7e7e7',
                    cta_backgroundColor: '#e7e7e7',
                    cta_textColor: 'rgba(0, 0, 0, 0.88)',
                    fullWidth: true,
                    gap: 40,
                    align_horizontal: 'center',
                    align_vertical: 'center',
                    padding_x: 16,
                    padding_y: 26,
                    stack_mobile: true,
                  },
                },
              ],
            },
            {
              id: 454,
              tipo: 'banner',
              ordem: 5,
              status: 'publicado',
              margin_top: 0,
              margin_bottom: 0,
              metadados: { full_width: true },
              components: [
                {
                  id: 405,
                  type: 'banner',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    imagem: '/img/decembernine.png',
                    size: 'lg',
                    height: 'strip',
                    overlay: 'none',
                    rounded: false,
                  },
                },
              ],
            },
            {
              id: 54,
              tipo: 'banner',
              ordem: 6,
              status: 'publicado',
              margin_top: 40,
              margin_bottom: 0,
              components: [
                {
                  id: 540,
                  type: 'banner',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    layout: 'two_column',
                    size: 'lg',
                    cta_column: 'left',
                    reverse_columns: true,
                    imagem_size: 'md',
                    border_radius: 'sm',
                    imagem: '/img/cph/history-4.png',
                    section_cta: {
                      descricao: 'No fim da temporada, o topo tem dono: R$ 250.000 e um lugar definitivo na história do CPH.',
                      descricao_2: 'No fim da temporada, o topo tem dono: R$ 250.000 e um lugar definitivo na história do CPH.',
                      align: 'left',
                      size: 'md',
                    },
                  },
                },
              ],
            },
            {
              id: 54,
              tipo: 'banner',
              ordem: 7,
              status: 'publicado',
              margin_top: 0,
              margin_bottom: 0,
              components: [
                {
                  id: 540,
                  type: 'banner',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    layout: 'two_column',
                    size: 'lg',
                    cta_column: 'left',
                    reverse_columns: true,
                    imagem_size: 'md',
                    border_radius: 'sm',
                    imagem: '/img/cph/history-6.jpg',
                    section_cta: {
                      titulo: 'Premiação CPH',
                      descricao: 'No fim da temporada, o topo tem dono: R$ 250.000 e um lugar definitivo na história do CPH.',
                      align: 'left',
                      size: 'md',
                    },
                  },
                },
              ],
            },
            {
              id: 54,
              tipo: 'banner',
              ordem: 8,
              status: 'publicado',
              margin_top: 0,
              margin_bottom: 40,
              components: [
                {
                  id: 541,
                  type: 'banner',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    layout: 'two_column',
                    size: 'lg',
                    cta_column: 'left',
                    reverse_columns: false,
                    imagem_size: 'lg',
                    border_radius: 'sm',
                    drag_carousel: true,
                    imagens: [
                      '/img/cph/history-1.jpg',
                      '/img/cph/history-2.jpg',
                      '/img/cph/history-3.jpg',
                      '/img/cph/history-4.png',
                      '/img/cph/history-6.jpg',
                    ],
                    carousel_bleed_right: true,
                    section_cta: {
                      titulo: 'Mais de 20 anos de história!',
                      titulo_nowrap: true,
                      descricao: 'O Campeonato Paulista de Poker é a principal série estadual de Texas Hold’em do Brasil e uma das principais referências técnicas do Hemisfério Sul.',
                      descricao_2: 'Criado em 2004, construiu um legado baseado em tradição, competitividade e excelência.',
                      descricao_3: 'Ao longo de suas temporadas, o CPH consolidou seu formato clássico de deep stack, valorizando habilidade, estratégia e performance de longo prazo — características que definem os verdadeiros campeões.',
                      descricao_4: 'Desde 2015, sob a gestão do H2 Sports Bar & Poker, o CPH preserva sua essência, fortalece sua estrutura e amplia sua credibilidade no cenário do poker brasileiro.',
                      align: 'left',
                      size: 'md',
                    },
                  },
                },
              ],
            },
            {
              id: 454,
              tipo: 'banner',
              ordem: 9,
              status: 'publicado',
              margin_top: 0,
              margin_bottom: 40,
              metadados: { full_width: true },
              components: [
                {
                  id: 405,
                  type: 'banner',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    imagem: '/img/thebests/thebests.png',
                    size: 'lg',
                    height: 'strip',
                    overlay: 'none',
                    rounded: false,
                  },
                },
              ],
            },
            {
              id: 5,
              tipo: 'faq',
              ordem: 10,
              status: 'publicado',
              metadados: {
                margin_lateral: 40,
              },
              components: [
                {
                  id: 500,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Precisa de ajuda?',
                    descricao: 'Aqui estão algumas das perguntas mais frequentes sobre o H2.',
                    cta: 'Saiba mais',
                    cta_link: 'faq',
                    align: 'left',
                    size: 'md',
                    width: 'md',
                  },
                },
                {
                  id: 501,
                  type: 'faq',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    pergunta: 'Que horas o clube abre?',
                    resposta: 'O clube abre todos os dias às 12h. Os torneios e cash games seguem a agenda do dia — confira os horários na página de agenda.',
                  },
                },
                {
                  id: 502,
                  type: 'faq',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    pergunta: 'Pode entrar menor de idade no clube?',
                    resposta: 'Não. O acesso ao clube é permitido apenas para maiores de 18 anos, conforme a legislação vigente.',
                  },
                },
                {
                  id: 503,
                  type: 'faq',
                  ordem: 3,
                  status: 'publicado',
                  data: {
                    pergunta: 'Quais as modalidades do Cash Game',
                    resposta: 'Oferecemos mesas de Texas Hold\'em No Limit com blinds a partir de R$ 2/4. A disponibilidade varia conforme a demanda — consulte a agenda para ver as mesas abertas hoje.',
                  },
                },
              ],
            },
          ],
        },

        // Página Série — Fun Festival (topo fixo: Banner + Próximas etapas)
        {
          slug: 'series/fun-festival',
          titulo: 'Fun Festival',
          ordem: 11,
          status: 'publicado',
          modulos: [
            {
              id: 41,
              tipo: 'banner',
              ordem: 1,
              status: 'publicado',
              metadados: { full_width: true },
              components: [
                {
                  id: 410,
                  type: 'banner',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    imagem: SERIES_BANNERS['fun-festival'],
                    size: 'lg',
                    height: 'strip',
                    overlay: 'none',
                    rounded: false,
                  },
                },
              ],
            },
            {
              id: 51,
              tipo: 'agenda_preview',
              ordem: 2,
              status: 'publicado',
              margin_top: 40,
              margin_bottom: 40,
              metadados: {
                carousel_bleed_right: true,
                card_variant: 'etapa_preview',
                hide_cash_game: true,
              },
              components: [
                {
                  id: 510,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Próximas etapas',
                    cta: 'Confira os torneios da 1ª etapa',
                    cta_link: 'agenda/fun-festival?etapa=1',
                    cta_cor: 'verde',
                    align: 'left',
                    size: 'md',
                    width: 'md',
                  },
                },
                {
                  id: 511,
                  type: 'card',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    ativo: true,
                    titulo: '1ª Etapa',
                    subtitulo: 'Fun Festival',
                    faixa_info: '22 de Fevereiro a 03 de Março',
                    link: 'agenda/fun-festival?etapa=1',
                    cor: 'vermelho',
                    classes: { fundo_ativo: '#B41E92' },
                  },
                },
                {
                  id: 512,
                  type: 'card',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    ativo: false,
                    titulo: '2ª Etapa',
                    subtitulo: 'Fun Festival',
                    faixa_info: '05 a 14 de Abril',
                    link: 'agenda/fun-festival?etapa=2',
                  },
                },
                {
                  id: 513,
                  type: 'card',
                  ordem: 3,
                  status: 'publicado',
                  data: {
                    ativo: false,
                    titulo: '3ª Etapa',
                    subtitulo: 'Fun Festival',
                    faixa_info: '10 a 19 de Maio',
                    link: 'agenda/fun-festival?etapa=3',
                  },
                },
                {
                  id: 514,
                  type: 'card',
                  ordem: 4,
                  status: 'publicado',
                  data: {
                    ativo: false,
                    titulo: '4ª Etapa',
                    subtitulo: 'Fun Festival',
                    faixa_info: '22 a 31 de Maio',
                    link: 'agenda/fun-festival?etapa=4',
                  },
                },
              ],
            },
            {
              id: 52,
              tipo: 'banner',
              ordem: 3,
              status: 'publicado',
              margin_top: 40,
              margin_bottom: 40,
              components: [
                {
                  id: 520,
                  type: 'banner',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    layout: 'two_column',
                    size: 'lg',
                    cta_column: 'right',
                    reverse_columns: false,
                    imagem_size: 'md',
                    border_radius: 'sm',
                    imagem: '/img/fun-festival/jogue-com-a-diversao.png',
                    decoracao: {
                      imagem: '/img/fun-festival/estrela.png',
                      position: 'bottom-right',
                      width: '52px',
                      offset_x: '-16px',
                      offset_y: '-8px',
                    },
                    section_cta: {
                      titulo: 'Jogue com a diversão',
                      descricao: 'O Fun Festival é uma experiência completa que conecta jogo, entretenimento e comunidade em um único ambiente.',
                      descricao_2: 'Criado em 2024, a série nasce com um propósito claro: equilibrar a emoção da competitividade com o prazer de viver o jogo.',
                      align: 'left',
                      size: 'md',
                      width: 'lg',
                    },
                  },
                },
              ],
            },
            {
              id: 53,
              tipo: 'faixa_cta',
              ordem: 4,
              status: 'publicado',
              margin_top: 0,
              margin_bottom: 40,
              components: [
                {
                  id: 530,
                  type: 'faixa_cta',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    titulo: 'Fez parte do jogo? Então fez história.',
                    titulo_size: '20px',
                    cta: 'Veja as fotos',
                    cta_link: 'galeria?series=fun-festival',
                    backgroundColor: '#B41E92',
                    textColor: '#e7e7e7',
                    cta_backgroundColor: '#e7e7e7',
                    cta_textColor: 'rgba(0, 0, 0, 0.88)',
                    fullWidth: true,
                    gap: 40,
                    align_horizontal: 'center',
                    align_vertical: 'center',
                    padding_x: 16,
                    padding_y: 26,
                    stack_mobile: true,
                  },
                },
              ],
            },
            {
              id: 54,
              tipo: 'banner',
              ordem: 5,
              status: 'publicado',
              margin_top: 0,
              margin_bottom: 40,
              metadados: {
                use_same_faq_margin: true,
              },
              components: [
                {
                  id: 540,
                  type: 'banner',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    imagem: '/img/fun-festival/features-collage.png',
                    size: 'lg',
                    height: 'strip',
                    overlay: 'none',
                    rounded: false,
                  },
                },
              ],
            },
            {
              id: 55,
              tipo: 'faq',
              ordem: 6,
              status: 'publicado',
              margin_top: 40,
              margin_bottom: 40,
              metadados: {
                margin_lateral: 112,
              },
              components: [
                {
                  id: 550,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Precisa de ajuda?',
                    descricao: 'Aqui estão algumas das perguntas mais frequentes sobre o H2.',
                    cta: 'Saiba mais',
                    cta_link: 'faq',
                    cta_cor: 'verde',
                    align: 'left',
                    size: 'md',
                    width: 'md',
                  },
                },
                {
                  id: 551,
                  type: 'faq',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    pergunta: 'Que horas o clube abre?',
                    resposta: 'O clube abre todos os dias às 12h. Os torneios e cash games seguem a agenda do dia — confira os horários na página de agenda.',
                  },
                },
                {
                  id: 552,
                  type: 'faq',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    pergunta: 'Pode entrar menor de idade no clube?',
                    resposta: 'Não. O acesso ao clube é permitido apenas para maiores de 18 anos, conforme a legislação vigente.',
                  },
                },
                {
                  id: 553,
                  type: 'faq',
                  ordem: 3,
                  status: 'publicado',
                  data: {
                    pergunta: 'Quais as modalidades do Cash Game',
                    resposta: 'Oferecemos mesas de Texas Hold\'em No Limit com blinds a partir de R$ 2/4. A disponibilidade varia conforme a demanda — consulte a agenda para ver as mesas abertas hoje.',
                  },
                },
              ],
            },
          ],
        },
      ],
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
        { id: 'agenda', kind: 'link', label: 'Agenda', pagina: 'agenda' },
        { id: 'galeria', kind: 'link', label: 'Galeria', pagina: 'galeria' },
        { id: 'faq', kind: 'link', label: 'FAQ', pagina: 'faq' },
        {
          id: 'conteudo',
          kind: 'dropdown',
          label: 'Séries',
          items: SERIES_MENU_ITEMS,
        },
        {
          id: 'mais',
          kind: 'dropdown',
          label: 'Mais',
          items: [
            { id: 'unique', kind: 'link', label: 'H2unique', pagina: 'unique' },
            { id: 'eventos', kind: 'link', label: 'Eventos', pagina: 'eventos' },
            { id: 'unidades', kind: 'link', label: 'Unidades', to: '/unidades' },
            { id: 'h2news', kind: 'link', label: 'H2news', to: '/blognews' },
          ]
        },
      ],

      footer: {
        hashtag: '#TocaEJoga',
        copyright: 'Copyright 2023 ®Grupo H2 Brasil.',
        endereco: 'Rua Henrique Schaumann, 313 - Pinheiros, São Paulo - SP, 05413-001',
        redes_sociais: [
          { id: 'instagram', tipo: 'instagram', url: 'https://instagram.com', label: 'Instagram' },
          { id: 'youtube', tipo: 'youtube', url: 'https://youtube.com', label: 'YouTube' },
        ],
        colunas: [
          {
            id: 'torneios',
            secoes: [
              {
                id: 'torneios',
                titulo: 'Torneios',
                links: [
                  { id: 'cph', label: 'CPH', to: '/series' },
                  { id: 'fun-festival', label: 'Fun Festival', to: '/series' },
                  { id: 'damas-do-poker', label: 'Damas do Poker', to: '/series' },
                  { id: 'ladies-weekend', label: 'Ladies Weekend', to: '/series' },
                  { id: 'xadrez', label: 'Xadrez', to: '/series' },
                ],
              },
            ],
          },
          {
            id: 'clube',
            secoes: [
              {
                id: 'o-clube',
                titulo: 'O clube',
                links: [
                  { id: 'quem-somos', label: 'Quem somos', pagina: 'sobre' },
                  { id: 'social', label: 'Social', to: '/social' },
                  { id: 'galeria', label: 'Galeria de fotos', to: 'galeria' },
                ],
              },
              {
                id: 'destaques',
                links: [
                  { id: 'jackpot', label: 'Jackpot', pagina: 'jackpot', estilo: 'destaque' },
                  { id: 'h2bet', label: 'H2bet', to: 'https://www.h2.bet.br/', external: true, estilo: 'destaque' },
                ],
              },
            ],
          },
          {
            id: 'legal',
            secoes: [
              {
                id: 'termos',
                titulo: 'Termos e condições',
                links: [
                  { id: 'regulamentos', label: 'Regulamentos', pagina: 'regulamentos' },
                  { id: 'privacidade', label: 'Segurança e privacidade', pagina: 'seguranca-e-privacidade' },
                ],
              },
              {
                id: 'atendimento',
                titulo: 'Atendimento',
                links: [
                  { id: 'trabalhe', label: 'Trabalhe conosco', to: '/trabalhe' },
                  { id: 'ouvidoria', label: 'Ouvidoria', to: '/ouvidoria' },
                ],
              },
            ],
          },
        ],
      },

      paginas: [
        {
          slug: 'home',
          titulo: 'Home',
          ordem: 1,
          status: 'publicado',
          modulos: [
            {
              id: 3,
              tipo: "galeria",
              ordem: 1,
              status: "publicado",
              metadados: {
                layout: 'grid',
                colunas: 4,
                itens_por_linha: 2,
                gap: 'md',
              },
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
                    imagem: "/img/galeria/eventos.png",
                    titulo: "Eventos",
                    descricao: "Jogue onde quiser. O resto é com a gente.",
                    link: "agenda",
                  }
                },
                {
                  id: 5,
                  type: "imagem",
                  ordem: 2,
                  status: "publicado",
                  data: {
                    imagem: "/img/galeria/comunidade.png",
                    titulo: "Comunidade",
                    descricao: "A melhor experiência de poker da cidade",
                    link: "faq",
                  }
                }
              ]
            },
          ],
        },
        {
          slug: 'agenda',
          titulo: 'Agenda',
          ordem: 2,
          status: 'publicado',
          modulos: [
            {
              id: 20,
              tipo: 'grid',
              ordem: 1,
              status: 'publicado',
              components: [
                {
                  id: 100,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Agenda',
                    descricao: 'Confira os torneios dos próximos dias',
                    align: 'left',
                    size: 'md'
                  }
                },
                {
                  id: 101,
                  type: 'grid_toolbar',
                  ordem: 1,
                  status: 'publicado',
                  data: AGENDA_GRID_TOOLBAR,
                },
                {
                  id: 102,
                  type: 'grid_config',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    colunas: 4,
                    gap: 'md',
                    item_types: ['card']
                  }
                },
                {
                  id: 2,
                  type: 'card',
                  ordem: 10,
                  status: 'publicado',
                  data: {
                    variant: 'torneio',
                    cor: 'purple',
                    categoria: 'Torneio regular',
                    filtros: {
                      local: 'clube-fisico',
                      buy_in: '201-500',
                      garantido: '20k',
                      series: 'cph',
                    },
                    titulo: 'Main Event Campinas',
                    garantido: 'R$ 20.000 GTD',
                    inicio: '14:00',
                    late: '16:00',
                    inscricoes: '15:50',
                    buy_in: { preco: 'R$200,00' },
                    botoes: [
                      { label: 'Saiba mais', variant: 'outline', cor: 'verde', link: '/torneios/main-event-campinas' },
                      { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: '/torneios/main-event-campinas/comprar' },
                    ],
                  }
                },
                {
                  id: 3,
                  type: 'card',
                  ordem: 11,
                  status: 'publicado',
                  data: {
                    variant: 'torneio',
                    cor: 'purple',
                    titulo: 'Satélite Main Event',
                    filtros: {
                      local: 'online',
                      buy_in: '50-200',
                      garantido: '5k',
                      series: 'fun-festival',
                    },
                    garantido: 'R$ 2.000 GTD',
                    inicio: '19:00',
                    late: '20:30',
                    inscricoes: '20:20',
                    buy_in: { preco: 'R$50,00' },
                    botoes: [
                      { label: 'Saiba mais', variant: 'outline', cor: 'verde', link: '/torneios/satelite-main' },
                      { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: '/torneios/satelite-main/comprar' },
                    ],
                  }
                },
                {
                  id: 5,
                  type: 'card',
                  ordem: 12,
                  status: 'publicado',
                  data: {
                    variant: 'torneio',
                    cor: 'purple',
                    titulo: 'Bounty Noturno',
                    inicio: '21:00',
                    late: '22:30',
                    buy_in: { preco: 'R$80,00' },
                    botoes: [
                      { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: '/torneios/bounty-noturno/comprar' },
                    ],
                  }
                }
              ]
            },
            createAgendaFaqModulo(22, 2200),
          ],
        },
        {
          slug: 'faq',
          titulo: 'FAQ',
          ordem: 3,
          status: 'publicado',
          modulos: [
            {
              id: 21,
              tipo: 'faq_page',
              ordem: 1,
              status: 'publicado',
              metadados: {
                margin_lateral: 40,
              },
              components: [
                {
                  id: 210,
                  type: 'section_cta',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Perguntas Frequentes do H2',
                    align: 'center',
                    size: 'md',
                  },
                },
                {
                  id: 211,
                  type: 'faq_categoria',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    slug: 'torneios',
                    titulo: 'Torneios',
                    perguntas: [
                      {
                        pergunta: 'Qual a grade do clube hoje?',
                        resposta: 'Para sua comodidade, mantemos a grade sempre atualizada em nosso site. Acesse h2club.com.br e confira a programação completa do dia, além da agenda com os próximos eventos.',
                      },
                      {
                        pergunta: 'Tem "Start" no clube?',
                        resposta: 'Sim. Diversos torneios do clube oferecem nível Start, permitindo que você entre em um estágio intermediário do evento dentro do período de registro tardio (late registration), conforme as regras de cada torneio.',
                      },
                      {
                        pergunta: 'Em que nível de "blinds" está o torneio?',
                        resposta: 'O nível atual de blinds é exibido nos relógios das mesas e no painel de torneios do clube. Você também pode consultar a estrutura completa de blinds na página do evento ou com a equipe de piso.',
                      },
                      {
                        pergunta: 'O que é "blinds"?',
                        resposta: 'Blinds são apostas obrigatórias que rotacionam entre os jogadores a cada mão. Elas garantem ação nas mesas e aumentam progressivamente ao longo do torneio, conforme a estrutura de níveis publicada.',
                      },
                    ],
                  },
                },
                {
                  id: 212,
                  type: 'faq_categoria',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    slug: 'cash-game',
                    titulo: 'Cash Game',
                    perguntas: [
                      {
                        pergunta: 'Quais as modalidades do Cash Game?',
                        resposta: 'Oferecemos mesas de Texas Hold\'em No Limit com blinds a partir de R$ 2/4. A disponibilidade varia conforme a demanda — consulte a agenda para ver as mesas abertas hoje.',
                      },
                      {
                        pergunta: 'Qual o buy-in mínimo para sentar na mesa?',
                        resposta: 'O buy-in mínimo segue a regra da mesa, geralmente entre 50 e 100 big blinds. A equipe de piso informa o valor exato no momento do seu assento.',
                      },
                    ],
                  },
                },
                {
                  id: 213,
                  type: 'faq_categoria',
                  ordem: 3,
                  status: 'publicado',
                  data: {
                    slug: 'estacionamento',
                    titulo: 'Estacionamento',
                    perguntas: [
                      {
                        pergunta: 'O clube oferece estacionamento?',
                        resposta: 'Sim. A unidade dispõe de estacionamento para clientes. Em dias de eventos maiores, recomendamos chegar com antecedência para garantir vaga.',
                      },
                    ],
                  },
                },
                {
                  id: 214,
                  type: 'faq_categoria',
                  ordem: 4,
                  status: 'publicado',
                  data: {
                    slug: 'financeiro',
                    titulo: 'Financeiro',
                    perguntas: [
                      {
                        pergunta: 'Quais formas de pagamento são aceitas?',
                        resposta: 'Aceitamos cartões de débito e crédito, PIX e saldo H2Pay. Para buy-ins de torneios, também é possível utilizar pontos H2Rewards quando a modalidade permitir.',
                      },
                    ],
                  },
                },
                {
                  id: 215,
                  type: 'faq_categoria',
                  ordem: 5,
                  status: 'publicado',
                  data: {
                    slug: 'o-clube',
                    titulo: 'O Clube',
                    perguntas: [
                      {
                        pergunta: 'Que horas o clube abre?',
                        resposta: 'O clube abre todos os dias às 12h. Os torneios e cash games seguem a agenda do dia — confira os horários na página de agenda.',
                      },
                      {
                        pergunta: 'Pode entrar menor de idade no clube?',
                        resposta: 'Não. O acesso ao clube é permitido apenas para maiores de 18 anos, conforme a legislação vigente.',
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
        createEventosPagina(7, 9800),
        createJackpotPagina(8, 10000),
        createSobrePagina(9, 10200),
        createUniquePagina(10, 10400),
        createRegulamentosPagina(92, 9200),
        createSegurancaPrivacidadePagina(93, 9300),
      ],
    },


  }

  const data = mockData[slug as string]

  if (!data) {
    throw createError({
      statusCode: 404,
      message: 'Unidade não encontrada'
    })
  }

  const query = getQuery(event)
  return await localizeUnidadeModulos(data, query.lang)
})
