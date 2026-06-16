const AGENDA_GRID_TOOLBAR = {
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

const SERIES_BANNERS = {
  cph: '/img/banner_cph.png',
  'fun-festival': '/img/banner_funfestival.png',
}

const SERIES_MENU_ITEMS = [
  { id: 'cph', kind: 'link', label: 'CPH', to: 'series/cph' },
  { id: 'funfestival', kind: 'link', label: 'Fun Festival', to: 'series/fun-festival' },
]

const CPH_SERIES_RANKING_LINHAS = [
  { id: 5201, type: 'ranking_linha', ordem: 10, status: 'publicado', data: { tab: 'geral', colocacao: 1, nome: 'Nome', avatar: 'https://www.figma.com/api/mcp/asset/78b87d60-f592-4743-91c0-6836b47c1fd2', pontos: 15987 } },
  { id: 5202, type: 'ranking_linha', ordem: 11, status: 'publicado', data: { tab: 'geral', colocacao: 2, nome: 'Nome Sobrenome', avatar: 'https://i.pravatar.cc/400?img=12', pontos: 14520 } },
  { id: 5203, type: 'ranking_linha', ordem: 12, status: 'publicado', data: { tab: 'geral', colocacao: 3, nome: 'Nome Sobrenome', avatar: 'https://i.pravatar.cc/400?img=15', pontos: 13240 } },
  { id: 5204, type: 'ranking_linha', ordem: 13, status: 'publicado', data: { tab: 'geral', colocacao: 4, nome: 'Nome Sobrenome', avatar: 'https://i.pravatar.cc/400?img=20', pontos: 12110 } },
  { id: 5205, type: 'ranking_linha', ordem: 14, status: 'publicado', data: { tab: 'geral', colocacao: 5, nome: 'Nome Sobrenome', avatar: 'https://i.pravatar.cc/400?img=25', pontos: 11890 } },
  { id: 5206, type: 'ranking_linha', ordem: 15, status: 'publicado', data: { tab: 'geral', colocacao: 6, nome: 'Rodrigo de Miranda Ribeiro Bueno', pontos: 7981 } },
  { id: 5207, type: 'ranking_linha', ordem: 16, status: 'publicado', data: { tab: 'geral', colocacao: 7, nome: 'Rodrigo de Miranda Ribeiro Bueno', pontos: 7981 } },
  { id: 5208, type: 'ranking_linha', ordem: 17, status: 'publicado', data: { tab: 'geral', colocacao: 8, nome: 'Rodrigo de Miranda Ribeiro Bueno', pontos: 7981 } },
  { id: 5209, type: 'ranking_linha', ordem: 18, status: 'publicado', data: { tab: 'geral', colocacao: 9, nome: 'Rodrigo de Miranda Ribeiro Bueno', pontos: 7981 } },
  { id: 5210, type: 'ranking_linha', ordem: 19, status: 'publicado', data: { tab: 'geral', colocacao: 10, nome: 'Rodrigo de Miranda Ribeiro Bueno', pontos: 7981 } },
  { id: 5211, type: 'ranking_linha', ordem: 20, status: 'publicado', data: { tab: 'omaha', colocacao: 1, nome: 'Ana Carolina Lima', avatar: 'https://i.pravatar.cc/400?img=31', pontos: 14200 } },
  { id: 5212, type: 'ranking_linha', ordem: 21, status: 'publicado', data: { tab: 'omaha', colocacao: 2, nome: 'Bruno Ferreira', avatar: 'https://i.pravatar.cc/400?img=32', pontos: 13650 } },
  { id: 5213, type: 'ranking_linha', ordem: 22, status: 'publicado', data: { tab: 'omaha', colocacao: 3, nome: 'Carla Mendes', avatar: 'https://i.pravatar.cc/400?img=33', pontos: 12980 } },
  { id: 5214, type: 'ranking_linha', ordem: 23, status: 'publicado', data: { tab: 'omaha', colocacao: 4, nome: 'Diego Alves', avatar: 'https://i.pravatar.cc/400?img=34', pontos: 12140 } },
  { id: 5215, type: 'ranking_linha', ordem: 24, status: 'publicado', data: { tab: 'omaha', colocacao: 5, nome: 'Eduarda Prado', avatar: 'https://i.pravatar.cc/400?img=35', pontos: 11720 } },
  { id: 5216, type: 'ranking_linha', ordem: 25, status: 'publicado', data: { tab: 'omaha', colocacao: 6, nome: 'Felipe Nogueira', pontos: 7540 } },
  { id: 5217, type: 'ranking_linha', ordem: 26, status: 'publicado', data: { tab: 'omaha', colocacao: 7, nome: 'Gabriela Souza', pontos: 7320 } },
  { id: 5218, type: 'ranking_linha', ordem: 27, status: 'publicado', data: { tab: 'omaha', colocacao: 8, nome: 'Henrique Barros', pontos: 7110 } },
  { id: 5219, type: 'ranking_linha', ordem: 28, status: 'publicado', data: { tab: 'omaha', colocacao: 9, nome: 'Isabela Rocha', pontos: 6980 } },
  { id: 5220, type: 'ranking_linha', ordem: 29, status: 'publicado', data: { tab: 'omaha', colocacao: 10, nome: 'João Pedro Costa', pontos: 6840 } },
  { id: 5221, type: 'ranking_linha', ordem: 30, status: 'publicado', data: { tab: 'ladies', colocacao: 1, nome: 'Mariana Duarte', avatar: 'https://i.pravatar.cc/400?img=41', pontos: 15120 } },
  { id: 5222, type: 'ranking_linha', ordem: 31, status: 'publicado', data: { tab: 'ladies', colocacao: 2, nome: 'Patrícia Gomes', avatar: 'https://i.pravatar.cc/400?img=42', pontos: 14780 } },
  { id: 5223, type: 'ranking_linha', ordem: 32, status: 'publicado', data: { tab: 'ladies', colocacao: 3, nome: 'Renata Pires', avatar: 'https://i.pravatar.cc/400?img=43', pontos: 13990 } },
  { id: 5224, type: 'ranking_linha', ordem: 33, status: 'publicado', data: { tab: 'ladies', colocacao: 4, nome: 'Sandra Moura', avatar: 'https://i.pravatar.cc/400?img=44', pontos: 12840 } },
  { id: 5225, type: 'ranking_linha', ordem: 34, status: 'publicado', data: { tab: 'ladies', colocacao: 5, nome: 'Tatiana Reis', avatar: 'https://i.pravatar.cc/400?img=45', pontos: 12310 } },
  { id: 5226, type: 'ranking_linha', ordem: 35, status: 'publicado', data: { tab: 'ladies', colocacao: 6, nome: 'Vanessa Teixeira', pontos: 8120 } },
  { id: 5227, type: 'ranking_linha', ordem: 36, status: 'publicado', data: { tab: 'ladies', colocacao: 7, nome: 'Yasmin Farias', pontos: 7990 } },
  { id: 5228, type: 'ranking_linha', ordem: 37, status: 'publicado', data: { tab: 'ladies', colocacao: 8, nome: 'Aline Borges', pontos: 7760 } },
  { id: 5229, type: 'ranking_linha', ordem: 38, status: 'publicado', data: { tab: 'ladies', colocacao: 9, nome: 'Bianca Lopes', pontos: 7540 } },
  { id: 5230, type: 'ranking_linha', ordem: 39, status: 'publicado', data: { tab: 'ladies', colocacao: 10, nome: 'Camila Andrade', pontos: 7310 } },
  { id: 5231, type: 'ranking_linha', ordem: 40, status: 'publicado', data: { tab: 'seniors', colocacao: 1, nome: 'Antônio Silva', avatar: 'https://i.pravatar.cc/400?img=51', pontos: 13840 } },
  { id: 5232, type: 'ranking_linha', ordem: 41, status: 'publicado', data: { tab: 'seniors', colocacao: 2, nome: 'Carlos Eduardo', avatar: 'https://i.pravatar.cc/400?img=52', pontos: 13120 } },
  { id: 5233, type: 'ranking_linha', ordem: 42, status: 'publicado', data: { tab: 'seniors', colocacao: 3, nome: 'Fernando Rocha', avatar: 'https://i.pravatar.cc/400?img=53', pontos: 12670 } },
  { id: 5234, type: 'ranking_linha', ordem: 43, status: 'publicado', data: { tab: 'seniors', colocacao: 4, nome: 'José Martins', avatar: 'https://i.pravatar.cc/400?img=54', pontos: 11980 } },
  { id: 5235, type: 'ranking_linha', ordem: 44, status: 'publicado', data: { tab: 'seniors', colocacao: 5, nome: 'Paulo Henrique', avatar: 'https://i.pravatar.cc/400?img=55', pontos: 11450 } },
  { id: 5236, type: 'ranking_linha', ordem: 45, status: 'publicado', data: { tab: 'seniors', colocacao: 6, nome: 'Roberto Campos', pontos: 7680 } },
  { id: 5237, type: 'ranking_linha', ordem: 46, status: 'publicado', data: { tab: 'seniors', colocacao: 7, nome: 'Sérgio Nunes', pontos: 7420 } },
  { id: 5238, type: 'ranking_linha', ordem: 47, status: 'publicado', data: { tab: 'seniors', colocacao: 8, nome: 'Valter Dias', pontos: 7210 } },
  { id: 5239, type: 'ranking_linha', ordem: 48, status: 'publicado', data: { tab: 'seniors', colocacao: 9, nome: 'Wilson Araújo', pontos: 6990 } },
  { id: 5240, type: 'ranking_linha', ordem: 49, status: 'publicado', data: { tab: 'seniors', colocacao: 10, nome: 'Zeca Oliveira', pontos: 6750 } },
  { id: 5241, type: 'ranking_linha', ordem: 50, status: 'publicado', data: { tab: 'high-roller', colocacao: 1, nome: 'Lucas Fontana', avatar: 'https://i.pravatar.cc/400?img=61', pontos: 22450 } },
  { id: 5242, type: 'ranking_linha', ordem: 51, status: 'publicado', data: { tab: 'high-roller', colocacao: 2, nome: 'Marcelo Viana', avatar: 'https://i.pravatar.cc/400?img=62', pontos: 21180 } },
  { id: 5243, type: 'ranking_linha', ordem: 52, status: 'publicado', data: { tab: 'high-roller', colocacao: 3, nome: 'Otávio Bastos', avatar: 'https://i.pravatar.cc/400?img=63', pontos: 19870 } },
  { id: 5244, type: 'ranking_linha', ordem: 53, status: 'publicado', data: { tab: 'high-roller', colocacao: 4, nome: 'Rafael Monteiro', avatar: 'https://i.pravatar.cc/400?img=64', pontos: 18640 } },
  { id: 5245, type: 'ranking_linha', ordem: 54, status: 'publicado', data: { tab: 'high-roller', colocacao: 5, nome: 'Thiago Pacheco', avatar: 'https://i.pravatar.cc/400?img=65', pontos: 17920 } },
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


export default defineEventHandler((event) => {
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
                  { id: 'quem-somos', label: 'Quem somos', to: '/sobre' },
                  { id: 'social', label: 'Social', to: '/social' },
                  { id: 'galeria', label: 'Galeria de fotos', to: '/galeria' },
                ],
              },
              {
                id: 'destaques',
                links: [
                  { id: 'jackpot', label: 'Jackpot', to: '/jackpot', estilo: 'destaque' },
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
                  { id: 'regulamentos', label: 'Regulamentos', to: '/regulamentos' },
                  { id: 'privacidade', label: 'Segurança e privacidade', to: '/privacidade' },
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
              status: 'publicado',
              components: [
                {
                  id: 200,
                  type: 'ranking_config',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Ranking',
                    logo: 'https://placehold.co/48x48/333/fff?text=CPH',
                    cor: 'branco',
                    cta: 'Confira o ranking',
                    cta_link: 'ranking/cph'
                  }
                },
                {
                  id: 201,
                  type: 'ranking',
                  ordem: 1,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: 'https://i.pravatar.cc/80?img=1', pontos: 283000 }
                },
                {
                  id: 202,
                  type: 'ranking',
                  ordem: 2,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: 'https://i.pravatar.cc/80?img=2', pontos: 275000 }
                },
                {
                  id: 203,
                  type: 'ranking',
                  ordem: 3,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: 'https://i.pravatar.cc/80?img=3', pontos: 268000 }
                },
                {
                  id: 204,
                  type: 'ranking',
                  ordem: 4,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: 'https://i.pravatar.cc/80?img=4', pontos: 260000 }
                },
                {
                  id: 205,
                  type: 'ranking',
                  ordem: 5,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: 'https://i.pravatar.cc/80?img=5', pontos: 255000 }
                }
              ]
            },
            {
              id: 3,
              tipo: 'ranking',
              ordem: 2,
              status: 'publicado',
              components: [
                {
                  id: 210,
                  type: 'ranking_config',
                  ordem: 0,
                  status: 'publicado',
                  data: {
                    titulo: 'Ranking',
                    logo: 'https://placehold.co/48x48/3c2348/fff?text=FUN',
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
                  data: { nome: 'Nome', avatar: 'https://i.pravatar.cc/80?img=6', pontos: 283000 }
                },
                {
                  id: 212,
                  type: 'ranking',
                  ordem: 2,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: 'https://i.pravatar.cc/80?img=7', pontos: 275000 }
                },
                {
                  id: 213,
                  type: 'ranking',
                  ordem: 3,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: 'https://i.pravatar.cc/80?img=8', pontos: 268000 }
                },
                {
                  id: 214,
                  type: 'ranking',
                  ordem: 4,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: 'https://i.pravatar.cc/80?img=9', pontos: 260000 }
                },
                {
                  id: 215,
                  type: 'ranking',
                  ordem: 5,
                  status: 'publicado',
                  data: { nome: 'Nome', avatar: 'https://i.pravatar.cc/80?img=10', pontos: 255000 }
                }
              ]
            },

            // Agenda Preview (widget reduzido — cards compactos, clique vai para /agenda)
            {
              id: 4,
              tipo: 'agenda_preview',
              ordem: 3,
              status: 'publicado',
              metadados: {
                carousel_bleed_right: false,
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
                    link: 'agenda',
                    botoes: [{ label: 'Garanta seu lugar', link: 'agenda' }],
                  },
                },
                {
                  id: 401,
                  type: 'card',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    ativo: true,
                    garantido: '50K Garantido',
                    titulo: '50K Start Up',
                    inicio: '16:00',
                    late: '20:30',
                    link: 'agenda',
                    botoes: [{ label: 'Comprar buy-in', link: 'agenda' }],
                  },
                },
                {
                  id: 402,
                  type: 'card',
                  ordem: 3,
                  status: 'publicado',
                  data: {
                    ativo: false,
                    garantido: '5K Garantido',
                    titulo: '5K Super 5 Mega Monster',
                    inicio: '12:30',
                    late: '17:00',
                    link: 'agenda',
                    botoes: [{ label: 'Comprar buy-in', link: 'agenda' }],
                  },
                },
                {
                  id: 403,
                  type: 'card',
                  ordem: 4,
                  status: 'publicado',
                  data: {
                    ativo: false,
                    garantido: '50K Garantido',
                    titulo: '50K Start Up',
                    inicio: '16:00',
                    late: '20:30',
                    link: 'agenda',
                  },
                },
                {
                  id: 404,
                  type: 'card',
                  ordem: 5,
                  status: 'publicado',
                  data: {
                    ativo: false,
                    garantido: '50K Garantido',
                    titulo: '50K Start Up',
                    inicio: '16:00',
                    late: '20:30',
                    link: 'agenda',
                    botoes: [{ label: 'Comprar buy-in', link: 'agenda' }],
                  },
                },
              ],
            },
            {
              id: 1,
              tipo: 'banner',
              ordem: 3,
              status: 'publicado',
              metadados: {
                drag_carousel: true,
                carousel_bleed_right: false,
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
                    imagem: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=750&fit=crop',
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
                    imagem: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=750&fit=crop',
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
                    imagem: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=750&fit=crop',
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
              id: 5,
              tipo: 'faq',
              ordem: 4,
              status: 'publicado',
              metadados: {
                margin_lateral: 150,
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
                    colunas: 3,
                    gap: 'md',
                    item_types: ['card']
                  }
                },
                {
                  id: 1,
                  type: 'card',
                  ordem: 10,
                  status: 'publicado',
                  data: {
                    variant: 'torneio',
                    cor: 'purple',
                    badge: { texto: '08/10', cor: 'purple' },
                    categoria: 'Torneio regular',
                    filtros: {
                      local: 'clube-fisico',
                      buy_in: '50-200',
                      garantido: '5k',
                      series: 'fun-festival',
                    },
                    favorito: { visivel: true, ativo: true, cor: 'verde' },
                    titulo: '5K Super 5 Mega Monster',
                    inicio: '12:30',
                    late: '17:00',
                    buy_in: {
                      preco: 'R$50,00',
                      pontos: 'ou 2.500 pontos H2Rewards',
                    },
                    botoes: [
                      { label: 'Saiba mais', variant: 'outline', cor: 'verde', link: '/torneios/sunday-million' },
                      { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: '/torneios/sunday-million/comprar' },
                    ],
                  },
                },
                {
                  id: 2,
                  type: 'card',
                  ordem: 11,
                  status: 'publicado',
                  data: {
                    variant: 'torneio',
                    cor: 'purple',
                    badge: { texto: '08/10', cor: 'amarelo' },
                    categoria: 'Torneio Fun Festival',
                    filtros: {
                      local: 'clube-fisico',
                      buy_in: '50-200',
                      garantido: '5k',
                      series: 'fun-festival',
                    },
                    favorito: { visivel: true, ativo: true, cor: 'verde' },
                    titulo: '5K Super 5 Mega Monster',
                    inicio: '12:30',
                    late: '17:00',
                    buy_in: { preco: 'R$50,00', pontos: 'ou 2.500 pontos H2Rewards' },
                    botoes: [
                      { label: 'Saiba mais', variant: 'outline', cor: 'verde', link: '/torneios/fun-festival' },
                      { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: '/torneios/fun-festival/comprar' },
                    ],
                  },
                },
                {
                  id: 3,
                  type: 'card',
                  ordem: 12,
                  status: 'publicado',
                  data: {
                    variant: 'torneio',
                    cor: 'vermelho',
                    badge: { texto: '08/10', cor: 'vermelho' },
                    categoria: 'CPH',
                    filtros: {
                      local: 'online',
                      buy_in: '50-200',
                      garantido: '5k',
                      series: 'cph',
                    },
                    favorito: { visivel: true, ativo: true, cor: 'branco' },
                    titulo: '5K Super 5 Mega Monster',
                    inicio: '12:30',
                    late: '17:00',
                    buy_in: { preco: 'R$50,00', pontos: 'ou 2.500 pontos H2Rewards' },
                    botoes: [
                      { label: 'Saiba mais', variant: 'outline', cor: 'branco', link: '/torneios/cph' },
                      { label: 'Comprar buy-in', variant: 'solid', cor: 'branco', link: '/torneios/cph/comprar' },
                    ],
                  },
                },
                {
                  id: 4,
                  type: 'card',
                  ordem: 13,
                  status: 'publicado',
                  data: {
                    variant: 'torneio',
                    cor: 'purple',
                    badge: { texto: '09/10', cor: 'purple' },
                    categoria: 'Torneio regular',
                    filtros: {
                      local: 'clube-fisico',
                      buy_in: '50-200',
                      garantido: '10k',
                      series: 'cph',
                    },
                    favorito: { visivel: true, cor: 'verde' },
                    titulo: 'Deep Stack Evening',
                    inicio: '19:00',
                    late: '21:00',
                    buy_in: { preco: 'R$80,00', pontos: 'ou 4.000 pontos H2Rewards' },
                    botoes: [
                      { label: 'Saiba mais', variant: 'outline', cor: 'verde', link: '/torneios/deep-stack' },
                      { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: '/torneios/deep-stack/comprar' },
                    ],
                  },
                },
                {
                  id: 5,
                  type: 'card',
                  ordem: 14,
                  status: 'publicado',
                  data: {
                    variant: 'torneio',
                    cor: 'purple',
                    badge: { texto: '09/10', cor: 'purple' },
                    categoria: '5K Garantido',
                    filtros: {
                      local: 'clube-fisico',
                      buy_in: '201-500',
                      garantido: '5k',
                      series: 'fun-festival',
                    },
                    favorito: { visivel: true, cor: 'verde' },
                    titulo: 'Turbo Noturno',
                    inicio: '22:00',
                    late: '23:00',
                    buy_in: { preco: 'R$120,00' },
                    botoes: [
                      { label: 'Saiba mais', variant: 'outline', cor: 'verde', link: '/torneios/turbo-noturno' },
                      { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: '/torneios/turbo-noturno/comprar' },
                    ],
                  },
                },
                {
                  id: 6,
                  type: 'card',
                  ordem: 15,
                  status: 'publicado',
                  data: {
                    variant: 'torneio',
                    cor: 'purple',
                    badge: { texto: '10/10', cor: 'purple' },
                    categoria: 'Torneio regular',
                    filtros: {
                      local: 'online',
                      buy_in: '201-500',
                      garantido: '20k',
                      series: 'cph',
                    },
                    favorito: { visivel: true, ativo: true, cor: 'verde' },
                    titulo: 'Sunday Special',
                    inicio: '14:00',
                    late: '16:00',
                    buy_in: { preco: 'R$150,00', pontos: 'ou 7.500 pontos H2Rewards' },
                    botoes: [
                      { label: 'Saiba mais', variant: 'outline', cor: 'verde', link: '/torneios/sunday-special' },
                      { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: '/torneios/sunday-special/comprar' },
                    ],
                  },
                },
              ]
            },
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
                  data: AGENDA_GRID_TOOLBAR,
                },
                {
                  id: 602,
                  type: 'grid_config',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    colunas: 3,
                    gap: 'md',
                    item_types: ['card'],
                  },
                },
                {
                  id: 603,
                  type: 'card',
                  ordem: 10,
                  status: 'publicado',
                  data: {
                    variant: 'torneio',
                    cor: 'vermelho',
                    badge: { texto: '22/02', cor: 'vermelho' },
                    categoria: 'CPH',
                    filtros: {
                      local: 'clube-fisico',
                      buy_in: '201-500',
                      garantido: '50k',
                      series: 'cph',
                    },
                    favorito: { visivel: true, ativo: true, cor: 'branco' },
                    titulo: 'CPH Main Event 500K GTD',
                    inicio: '14:00',
                    late: '18:00',
                    buy_in: { preco: 'R$1.500,00', pontos: 'ou 75.000 pontos H2Rewards' },
                    botoes: [
                      { label: 'Saiba mais', variant: 'outline', cor: 'branco', link: 'series/cph' },
                      { label: 'Comprar buy-in', variant: 'solid', cor: 'branco', link: 'series/cph' },
                    ],
                  },
                },
                {
                  id: 604,
                  type: 'card',
                  ordem: 11,
                  status: 'publicado',
                  data: {
                    variant: 'torneio',
                    cor: 'vermelho',
                    badge: { texto: '23/02', cor: 'vermelho' },
                    categoria: 'CPH',
                    filtros: {
                      local: 'clube-fisico',
                      buy_in: '201-500',
                      garantido: '100k',
                      series: 'cph',
                    },
                    favorito: { visivel: true, cor: 'branco' },
                    titulo: 'CPH High Roller 100K GTD',
                    inicio: '16:00',
                    late: '20:00',
                    buy_in: { preco: 'R$2.500,00' },
                    botoes: [
                      { label: 'Saiba mais', variant: 'outline', cor: 'branco', link: 'series/cph' },
                      { label: 'Comprar buy-in', variant: 'solid', cor: 'branco', link: 'series/cph' },
                    ],
                  },
                },
                {
                  id: 605,
                  type: 'card',
                  ordem: 12,
                  status: 'publicado',
                  data: {
                    variant: 'torneio',
                    cor: 'vermelho',
                    badge: { texto: '24/02', cor: 'vermelho' },
                    categoria: 'CPH',
                    filtros: {
                      local: 'online',
                      buy_in: '50-200',
                      garantido: '20k',
                      series: 'cph',
                    },
                    favorito: { visivel: true, cor: 'branco' },
                    titulo: 'CPH Turbo Deep Stack',
                    inicio: '19:00',
                    late: '21:00',
                    buy_in: { preco: 'R$150,00' },
                    botoes: [
                      { label: 'Saiba mais', variant: 'outline', cor: 'branco', link: 'series/cph' },
                      { label: 'Comprar buy-in', variant: 'solid', cor: 'branco', link: 'series/cph' },
                    ],
                  },
                },
              ],
            },
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
                  data: AGENDA_GRID_TOOLBAR,
                },
                {
                  id: 612,
                  type: 'grid_config',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    colunas: 3,
                    gap: 'md',
                    item_types: ['card'],
                  },
                },
                {
                  id: 613,
                  type: 'card',
                  ordem: 10,
                  status: 'publicado',
                  data: {
                    variant: 'torneio',
                    cor: 'purple',
                    badge: { texto: '22/02', cor: 'purple' },
                    categoria: 'Fun Festival',
                    filtros: {
                      local: 'clube-fisico',
                      buy_in: '201-500',
                      garantido: '50k',
                      series: 'fun-festival',
                    },
                    favorito: { visivel: true, ativo: true, cor: 'verde' },
                    titulo: 'Fun Festival Main Event 500K GTD',
                    inicio: '14:00',
                    late: '18:00',
                    buy_in: { preco: 'R$1.500,00', pontos: 'ou 75.000 pontos H2Rewards' },
                    botoes: [
                      { label: 'Saiba mais', variant: 'outline', cor: 'verde', link: 'series/fun-festival' },
                      { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: 'series/fun-festival' },
                    ],
                  },
                },
                {
                  id: 614,
                  type: 'card',
                  ordem: 11,
                  status: 'publicado',
                  data: {
                    variant: 'torneio',
                    cor: 'purple',
                    badge: { texto: '23/02', cor: 'purple' },
                    categoria: 'Fun Festival',
                    filtros: {
                      local: 'clube-fisico',
                      buy_in: '201-500',
                      garantido: '100k',
                      series: 'fun-festival',
                    },
                    favorito: { visivel: true, cor: 'verde' },
                    titulo: 'Fun Festival High Roller 100K GTD',
                    inicio: '16:00',
                    late: '20:00',
                    buy_in: { preco: 'R$2.500,00' },
                    botoes: [
                      { label: 'Saiba mais', variant: 'outline', cor: 'verde', link: 'series/fun-festival' },
                      { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: 'series/fun-festival' },
                    ],
                  },
                },
                {
                  id: 615,
                  type: 'card',
                  ordem: 12,
                  status: 'publicado',
                  data: {
                    variant: 'torneio',
                    cor: 'purple',
                    badge: { texto: '24/02', cor: 'purple' },
                    categoria: 'Fun Festival',
                    filtros: {
                      local: 'online',
                      buy_in: '50-200',
                      garantido: '20k',
                      series: 'fun-festival',
                    },
                    favorito: { visivel: true, cor: 'verde' },
                    titulo: 'Fun Festival Turbo Deep Stack',
                    inicio: '19:00',
                    late: '21:00',
                    buy_in: { preco: 'R$150,00' },
                    botoes: [
                      { label: 'Saiba mais', variant: 'outline', cor: 'verde', link: 'series/fun-festival' },
                      { label: 'Comprar buy-in', variant: 'solid', cor: 'verde', link: 'series/fun-festival' },
                    ],
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
              status: 'publicado',
              metadados: {
                margin_lateral: 150,
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
              metadados: {
                carousel_bleed_right: false,
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
                    cta_link: 'agenda/cph',
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
                    link: 'agenda/cph',
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
                    link: 'agenda/cph',
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
                    link: 'agenda/cph',
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
                    link: 'agenda/cph',
                  },
                },
              ],
            },
            {
              id: 52,
              tipo: 'ranking_tabela',
              ordem: 3,
              status: 'publicado',
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
              components: [
                {
                  id: 530,
                  type: 'faixa_cta',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    titulo: 'Quem jogou, marcou. Encontre seu momento.',
                    titulo_size: '28px',
                    cta: 'Suas fotos aqui',
                    cta_link: 'galeria/cph',
                    backgroundColor: 'rgba(214, 61, 29, 0.6)',
                    textColor: '#e7e7e7',
                    cta_backgroundColor: '#e7e7e7',
                    cta_textColor: 'rgba(0, 0, 0, 0.88)',
                    fullWidth: true,
                    gap: 20,
                    align_horizontal: 'center',
                    align_vertical: 'center',
                    padding_x: 16,
                    padding_y: 26,
                    stack_mobile: true,
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
              metadados: {
                carousel_bleed_right: false,
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
                    cta_link: 'agenda/fun-festival',
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
                    link: 'agenda/fun-festival',
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
                    link: 'agenda/fun-festival',
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
                    link: 'agenda/fun-festival',
                  },
                },
              ],
            },
            // daqui pra baixo a gente vai montar juntos, módulo por módulo
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
            { id: 'unique', kind: 'link', label: 'H2unique', to: '/unique' },
            { id: 'eventos', kind: 'link', label: 'Eventos', to: '/eventos' },
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
                  { id: 'quem-somos', label: 'Quem somos', to: '/sobre' },
                  { id: 'social', label: 'Social', to: '/social' },
                  { id: 'galeria', label: 'Galeria de fotos', to: '/galeria' },
                ],
              },
              {
                id: 'destaques',
                links: [
                  { id: 'jackpot', label: 'Jackpot', to: '/jackpot', estilo: 'destaque' },
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
                  { id: 'regulamentos', label: 'Regulamentos', to: '/regulamentos' },
                  { id: 'privacidade', label: 'Segurança e privacidade', to: '/privacidade' },
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
                    colunas: 3,
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
                margin_lateral: 150,
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

  return data
})
