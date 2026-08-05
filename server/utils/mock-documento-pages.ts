/** Páginas documentais (regulamentos / segurança e privacidade) — mock CMS. */

function secao(
  id: number,
  ordem: number,
  slug: string,
  titulo: string,
  conteudo: string,
) {
  return {
    id,
    type: 'documento_secao' as const,
    ordem,
    status: 'publicado' as const,
    data: { slug, titulo, conteudo },
  }
}

export const REGULAMENTOS_CONCEITOS = `
<ol>
  <li>
    <strong>Equipe de supervisão/floor</strong><br>
    A equipe de supervisão deverá considerar o melhor interesse da disputa e a justiça como maiores prioridades no processo de tomada de decisão. Circunstâncias incomuns podem exigir uma decisão que se utilize de bom senso e, no interesse da justiça, tome precedência sobre as regras técnicas. A decisão do pessoal de direção e supervisão do torneio é final.
  </li>
  <li>
    <strong>Responsabilidade do jogador</strong><br>
    É responsabilidade dos jogadores: conferir os dados de sua inscrição e designação de assentos; proteger as suas cartas; tornar as suas intenções claras; acompanhar a ação da mesa; agir na sua vez com terminologia ou gestos apropriados; defender o seu direito de agir; manter suas cartas visíveis; manter suas fichas empilhadas corretamente; permanecer à mesa quando com uma mão viva; abrir corretamente todas as suas cartas quando concorrer no showdown; fazer-se ouvir quando houver um erro acontecendo; pedir tempo quando justificável; mover-se para outra mesa rapidamente; respeitar à regra de “um jogador por mão”; conhecer e respeitar as regras; seguir a etiqueta apropriada e, em geral, contribuir com a organização do torneio.
  </li>
  <li>
    <strong>Terminologia e gestos oficiais para torneios de poker</strong><br>
    Termos de apostas oficiais são declarações simples, inconfundíveis, feitas em momento oportuno, como: bet (aposta), raise (aumento), call (pagamento), fold (desistir), check (mesa), all-in (todas as fichas), pot (apenas na modalidade pot-limit), e completar. Termos regionais podem atender este padrão. Além disso, os jogadores devem usar gestos com cautela quando enfrentam uma ação; bater levemente na mesa é um check (mesa). O uso de linguagem ou gestos fora do padrão é de responsabilidade do jogador, pois pode resultar em uma decisão diferente do pretendido por ele. É responsabilidade do jogador tornar as suas intenções claras. Veja regras 2 e 42.
  </li>
</ol>
`.trim()

export const REGULAMENTOS_PROCEDIMENTOS = `
<p>Os procedimentos de torneio visam garantir fluidez, equidade e segurança em todas as mesas. A direção do evento pode ajustar ritmos e protocolos conforme a fase do torneio, sempre priorizando o melhor interesse da disputa.</p>
<p>Jogadores devem permanecer atentos às instruções do dealer e da equipe de floor. Atrasos injustificados, comunicação irregular entre mesas ou conduta que atrase o andamento podem resultar em advertência ou penalidade, a critério da supervisão.</p>
<p>Em caso de dúvida sobre um procedimento em andamento, o jogador deve solicitar a presença do floor antes de a ação avançar. Decisões tomadas após a ação ter sido concluída podem ser limitadas pelo estado atual da mão.</p>
`.trim()

export const REGULAMENTOS_CRITERIOS = `
<p>O torneio inicia no horário publicado na agenda, sujeito à confirmação da direção do evento. A presença mínima de jogadores, a liberação das mesas e a conclusão do check-in podem condicionar o início efetivo.</p>
<p>Late registration, reentradas e add-ons seguem as regras específicas de cada evento. Após o encerramento do período de registro tardio, novos jogadores não poderão entrar, salvo disposição expressa no regulamento da série.</p>
<p>A estrutura de blinds, o nível de início e a duração de cada nível são publicados previamente. Alterações excepcionais só ocorrem por decisão da direção, com comunicação clara aos participantes.</p>
`.trim()

export const REGULAMENTOS_ALL_IN_FOLD = `
<p>Na modalidade All-in Fold, o jogador está limitado às ações previstas no formato do evento — tipicamente all-in ou fold — sem opções intermediárias de call parcial ou raise padrão, salvo regra específica do torneio.</p>
<p>É obrigação do jogador conhecer as restrições do formato antes de se inscrever. Ações incompatíveis com o All-in Fold podem ser corrigidas pela equipe de piso ou resultarem em declaração forçada conforme a regra da casa.</p>
<p>Disputas sobre a intenção do jogador em All-in Fold serão resolvidas pelo floor, considerando gestos, fichas empurradas e o contexto da mão.</p>
`.trim()

export const REGULAMENTOS_BUY_IN_CASH = `
<p>O buy-in de cash game corresponde ao valor mínimo e máximo permitido para sentar em cada mesa, expresso em múltiplos de big blind ou valor fixo publicado no quadro do clube.</p>
<p>O jogador deve adquirir fichas apenas nos pontos oficiais de caixa. É proibida a transferência irregular de fichas entre jogadores fora das regras de short stack / table change autorizadas pela supervisão.</p>
<p>Ao deixar a mesa, o jogador deve liquidar o stack conforme o procedimento do clube. Reentradas na mesma sessão respeitam o buy-in mínimo vigente no momento do retorno.</p>
`.trim()

export const REGULAMENTOS_BONUS_CHIP = `
<p>A promoção Bonus Chip concede fichas adicionais conforme as condições publicadas no período promocional (valor de buy-in, modalidade elegível e limite por jogador).</p>
<p>O benefício não é cumulativo além do previsto no regulamento da promoção e pode exigir identificação no caixa no momento da compra. Abusos ou tentativas de contorno resultam em cancelamento do bônus e possíveis sanções.</p>
<p>Em caso de conflito entre este resumo e o material oficial da promoção, prevalece o texto publicado pela H2 no período vigente.</p>
`.trim()

export function createRegulamentosPagina(moduloId: number, componentIdBase: number) {
  return {
    slug: 'regulamentos',
    titulo: 'Regulamentos',
    ordem: 10,
    status: 'publicado' as const,
    modulos: [
      {
        id: moduloId,
        tipo: 'documento_page' as const,
        ordem: 1,
        margin_top: 40,
        status: 'publicado' as const,
        metadados: { margin_lateral: 40 },
        components: [
          {
            id: componentIdBase,
            type: 'section_cta' as const,
            ordem: 0,
            status: 'publicado' as const,
            data: {
              titulo: 'Regulamentos',
              descricao:
                'Este é o regulamento de torneios de poker da H2 Sports Bar & Poker. Ele segue o padrão internacional de regulamento da TDA e ADTP.',
              descricao_2:
                'A ADTP é composta de profissionais de salas de poker de toda a América Latina, cujo objetivo é redigir um conjunto de regras padronizadas para torneios de poker.',
              descricao_3:
                'As regras da ADTP a seguir complementam as “regras da casa” deste torneio.',
              align: 'center' as const,
              size: 'md' as const,
            },
          },
          secao(componentIdBase + 1, 1, 'conceitos-gerais', 'Conceitos gerais', REGULAMENTOS_CONCEITOS),
          secao(componentIdBase + 2, 2, 'procedimentos', 'Procedimentos', REGULAMENTOS_PROCEDIMENTOS),
          secao(
            componentIdBase + 3,
            3,
            'criterios-inicio',
            'Critérios para início\ndo torneio',
            REGULAMENTOS_CRITERIOS,
          ),
          secao(componentIdBase + 4, 4, 'all-in-fold', 'All in fold', REGULAMENTOS_ALL_IN_FOLD),
          secao(componentIdBase + 5, 5, 'buy-in-cash-game', 'Buy-in Cash Game', REGULAMENTOS_BUY_IN_CASH),
          secao(
            componentIdBase + 6,
            6,
            'promocao-bonus-chip',
            'Promoção Bonus Chip',
            REGULAMENTOS_BONUS_CHIP,
          ),
        ],
      },
    ],
  }
}

export const PRIVACIDADE_FORMULARIO = `
<p>Nós disponibilizamos o FORMULÁRIO DE PETIÇÕES para que você titular consiga exercer seus direitos de privacidade de forma autônoma e sempre que julgar necessário.</p>
<p>Caso você não consiga acessar o formulário, você poderá entrar em contato com o Encarregado (DPO) através do e-mail indicado na seção ''Encarregado pelo tratamento''.</p>
<p>Você titular possui direitos previstos na Lei Geral de Proteção de Dados Pessoais (13.709/2018) (“LGPD”). Nós do Grupo H2 respeitamos sua privacidade e a qualquer momento você pode solicitar:</p>
<p>
  a) A confirmação da existência de tratamento;<br>
  b) Acesso aos seus dados pessoais;<br>
  c) A correção de dados incompletos, inexatos ou desatualizados;<br>
  d) A anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei;<br>
  e) A portabilidade dos dados a outro fornecedor de serviço ou produto, mediante requisição expressa por você;<br>
  f) A eliminação dos dados tratados com o seu consentimento;<br>
  g) A obtenção de informações sobre as entidades públicas ou privadas com as quais a “empresa controladora” e “empresas controladas” compartilhou os seus dados pessoais;<br>
  h) Informações sobre a possibilidade de não consentir, e as consequências dessa negativa;<br>
  i) Revogação do consentimento fornecido por você; e<br>
  j) Revisão de decisões tomadas unicamente com base em tratamento automatizado.
</p>
`.trim()

export const PRIVACIDADE_ENCARREGADO = `
<p>O Encarregado pelo Tratamento de Dados Pessoais (DPO) do Grupo H2 é o canal oficial para dúvidas, solicitações e comunicações relacionadas à privacidade.</p>
<p>Você pode entrar em contato pelo e-mail <strong>dpo@grupoh2.com.br</strong>. Responderemos no prazo previsto pela LGPD, observadas as hipóteses legais de prorrogação quando necessário para análise adequada do pedido.</p>
<p>Pedidos formulados por terceiros em nome do titular devem vir acompanhados de procuração ou documento que comprove a legitimidade da representação.</p>
`.trim()

export const PRIVACIDADE_DIRETIVA = `
<p>Esta Diretiva e os Avisos de Privacidade descrevem como o Grupo H2 coleta, utiliza, armazena e protege dados pessoais no âmbito de suas atividades de entretenimento, torneios, cash game, produtos digitais e atendimento.</p>
<p>Documentos complementares podem ser publicados para finalidades específicas (aplicativo, campanhas, parcerias). Em caso de divergência, prevalece o aviso mais específico aplicável ao serviço utilizado.</p>
<p>Recomendamos a leitura periódica desta página, pois a política pode ser atualizada para refletir mudanças legais ou operacionais.</p>
`.trim()

export const PRIVACIDADE_SOBRE = `
<p>O Grupo H2 reúne marcas e unidades de sports bar e poker no Brasil, oferecendo experiências presenciais e serviços digitais aos seus clientes e visitantes.</p>
<p>Para efeitos desta política, “empresa controladora” e “empresas controladas” referem-se às entidades do grupo que determinam as finalidades e os meios do tratamento de dados pessoais, conforme a operação envolvida.</p>
<p>Informações societárias e de contato institucional podem ser solicitadas ao Encarregado ou consultadas nos canais oficiais do grupo.</p>
`.trim()

export const PRIVACIDADE_COLETA = `
<p>Coletamos dados pessoais fornecidos diretamente por você (cadastro, inscrição em torneios, atendimento), dados gerados pelo uso de nossos serviços (frequência, preferências, histórico de participação) e, quando aplicável, dados obtidos de parceiros com base legal adequada.</p>
<p>Exemplos incluem nome, documento, contato, data de nascimento, dados de pagamento e registros de acesso a plataformas digitais.</p>
<p>A coleta é limitada ao necessário para as finalidades informadas, como execução de contrato, cumprimento de obrigação legal, legítimo interesse ou consentimento, conforme o caso.</p>
`.trim()

export const PRIVACIDADE_MENORES = `
<p>Nossos serviços são destinados a maiores de 18 anos. Não coletamos intencionalmente dados pessoais de crianças ou adolescentes para participação em atividades de poker ou produtos correlatos.</p>
<p>Dados sensíveis, quando eventualmente tratados, observam hipóteses legais específicas da LGPD e medidas reforçadas de segurança e restrição de acesso.</p>
<p>Se identificarmos tratamento indevido envolvendo menor de idade, adotaremos medidas para interromper o tratamento e apagar os dados, quando cabível.</p>
`.trim()

export const PRIVACIDADE_COOKIES = `
<p>Utilizamos cookies e tecnologias semelhantes para funcionamento do site, preferências, métricas de audiência e, quando autorizado, personalização de conteúdo.</p>
<p>Você pode gerenciar cookies pelo navegador ou pelos painéis de consentimento disponibilizados. A desativação de cookies essenciais pode afetar funcionalidades do site.</p>
<p>Detalhes sobre categorias de cookies e prazos de retenção podem ser atualizados conforme evolução das ferramentas utilizadas.</p>
`.trim()

export const PRIVACIDADE_TRATAMENTO = `
<p>Tratamos dados pessoais para viabilizar cadastros, inscrição e operação de torneios, cash game, programas de relacionamento, atendimento ao cliente, segurança das unidades e cumprimento de obrigações legais e regulatórias.</p>
<p>Também podemos utilizar dados para comunicação sobre eventos, produtos e novidades, respeitando as bases legais e as opções de opt-out disponíveis.</p>
<p>O tratamento é realizado por equipes autorizadas e por sistemas com controles de acesso compatíveis com a sensibilidade das informações.</p>
`.trim()

export const PRIVACIDADE_COMPARTILHAMENTO = `
<p>Podemos compartilhar dados com prestadores de serviço que nos auxiliam (tecnologia, pagamento, marketing operacional, segurança), sempre mediante contrato e instruções que limitem o uso à finalidade contratada.</p>
<p>Também poderemos compartilhar dados com autoridades públicas quando houver obrigação legal ou ordem válida, e com empresas do Grupo H2 para finalidades compatíveis com esta política.</p>
<p>Não vendemos dados pessoais. Listagens de destinatários específicos podem ser solicitadas ao Encarregado, observados limites legais de sigilo e segurança.</p>
`.trim()

export const PRIVACIDADE_INTERNACIONAL = `
<p>Alguns fornecedores ou sistemas podem armazenar ou processar dados fora do Brasil. Nesses casos, adotamos salvaguardas compatíveis com a LGPD, como cláusulas contratuais e avaliação do nível de proteção do destino.</p>
<p>Você pode solicitar informações adicionais sobre transferências internacionais aplicáveis ao seu caso junto ao Encarregado.</p>
`.trim()

export const PRIVACIDADE_SEGURANCA = `
<p>Adotamos medidas técnicas e administrativas para proteger dados pessoais contra acessos não autorizados, perda, alteração ou divulgação indevida, incluindo controles de acesso, monitoramento e boas práticas de segurança da informação.</p>
<p>Nenhum ambiente é absolutamente isento de riscos. Em caso de incidente relevante, seguiremos os procedimentos legais de avaliação e comunicação quando cabível.</p>
`.trim()

export const PRIVACIDADE_RETENCAO = `
<p>Mantemos dados pessoais pelo tempo necessário para cumprir as finalidades informadas, obrigações legais, exercício regular de direitos e defesa em processos.</p>
<p>Após o encerramento da necessidade, os dados são eliminados ou anonimizados, salvo hipóteses de retenção previstas em lei.</p>
<p>Prazos concretos podem variar conforme o tipo de dado e a relação mantida com o titular (cliente ativo, ex-cliente, candidato, fornecedor etc.).</p>
`.trim()

export function createSegurancaPrivacidadePagina(moduloId: number, componentIdBase: number) {
  return {
    slug: 'seguranca-e-privacidade',
    titulo: 'Segurança e Privacidade',
    ordem: 11,
    status: 'publicado' as const,
    modulos: [
      {
        id: moduloId,
        tipo: 'documento_page' as const,
        ordem: 1,
        margin_top: 40,
        status: 'publicado' as const,
        metadados: { margin_lateral: 40 },
        components: [
          {
            id: componentIdBase,
            type: 'section_cta' as const,
            ordem: 0,
            status: 'publicado' as const,
            data: {
              titulo: 'Segurança e Privacidade',
              descricao:
                'O Grupo H2 estabelece esta política para reforçar seu compromisso com a proteção e o respeito à sua privacidade.',
              align: 'center' as const,
              size: 'md' as const,
            },
          },
          secao(
            componentIdBase + 1,
            1,
            'formulario-privacidade',
            'Formulário\nde Privacidade',
            PRIVACIDADE_FORMULARIO,
          ),
          secao(
            componentIdBase + 2,
            2,
            'encarregado',
            'Encarregado\npelo tratamento',
            PRIVACIDADE_ENCARREGADO,
          ),
          secao(
            componentIdBase + 3,
            3,
            'diretiva-avisos',
            'Diretiva e Avisos\nde Privacidade',
            PRIVACIDADE_DIRETIVA,
          ),
          secao(componentIdBase + 4, 4, 'sobre-grupo-h2', 'Sobre o Grupo H2', PRIVACIDADE_SOBRE),
          secao(
            componentIdBase + 5,
            5,
            'coleta-dados',
            'Coleta de\ndados pessoais',
            PRIVACIDADE_COLETA,
          ),
          secao(
            componentIdBase + 6,
            6,
            'dados-menores',
            'Dados de Menores\ne Sensíveis',
            PRIVACIDADE_MENORES,
          ),
          secao(
            componentIdBase + 7,
            7,
            'cookies',
            'Tratamento de Cookies',
            PRIVACIDADE_COOKIES,
          ),
          secao(
            componentIdBase + 8,
            8,
            'tratamento-dados',
            'Tratamento de\ndados pessoais',
            PRIVACIDADE_TRATAMENTO,
          ),
          secao(
            componentIdBase + 9,
            9,
            'compartilhamento',
            'Compartilhamento\npara terceiros',
            PRIVACIDADE_COMPARTILHAMENTO,
          ),
          secao(
            componentIdBase + 10,
            10,
            'transferencia-internacional',
            'Transferência\ninternacional',
            PRIVACIDADE_INTERNACIONAL,
          ),
          secao(
            componentIdBase + 11,
            11,
            'seguranca-dados',
            'Segurança de dados',
            PRIVACIDADE_SEGURANCA,
          ),
          secao(
            componentIdBase + 12,
            12,
            'retencao-dados',
            'Retenção de dados',
            PRIVACIDADE_RETENCAO,
          ),
        ],
      },
    ],
  }
}
