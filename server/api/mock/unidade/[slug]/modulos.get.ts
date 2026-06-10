const AGENDA_GRID_TOOLBAR = {
  filtro: {
    label: 'Filtrar torneios',
    modal: {
      titulo: 'Filtros',
      limpar: { label: 'Limpar filtros' },
      aplicar: { label: 'Filtrar' },
      secoes: [
        {
          id: 'local',
          titulo: 'Local',
          opcoes: [
            { id: 'clube-fisico', label: 'Clube físico' },
            { id: 'online', label: 'Online' },
          ],
        },
        {
          id: 'buy_in',
          titulo: 'Buy-in',
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
            { id: 'damas-do-poker', label: 'Damas do Poker' },
            { id: 'unique-poker-tour', label: 'Unique Poker Tour' },
            { id: 'xadrez', label: 'Xadrez' },
            { id: 'ladies-weekend', label: 'Ladies Weekend' },
          ],
        },
      ],
    },
  },
  busca: { placeholder: 'Pesquisar torneios', habilitado: true },
  badges: { limpar: { label: 'Limpar filtros' } },
}

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
          items: [
            { id: 'funfestival', kind: 'link', label: 'Fun Festival', to: '/series' },
            { id: 'cph', kind: 'link', label: 'CPH', to: '/unique' },
            { id: 'tardezinha', kind: 'link', label: 'Tardezinha', to: '/unique' },
            { id: 'ladiesweekend', kind: 'link', label: 'Ladies Weekend', to: '/unique' },
            { id: 'xadrez', kind: 'link', label: 'Xadrez', to: '/unique' },
          ]
        },
      ],
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
                    cta_link: '/ranking/cph'
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
                      series: 'unique-poker-tour',
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
                      series: 'unique-poker-tour',
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
                      series: 'ladies-weekend',
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
                      series: 'xadrez',
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
        { id: 'series', kind: 'link', label: 'Series', to: '/series' },
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
                      series: 'unique-poker-tour',
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
