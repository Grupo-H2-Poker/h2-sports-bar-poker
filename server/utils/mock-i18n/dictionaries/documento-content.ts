/**
 * Traduções das páginas documentais (regulamentos / segurança e privacidade).
 *
 * As chaves de título e CTA são o texto PT exato do mock (incluindo `\n` nos
 * títulos). As chaves de HTML usam os próprios identificadores exportados por
 * `mock-documento-pages.ts` como computed keys, garantindo que o valor
 * usado como chave seja idêntico (trim incluído) ao conteúdo renderizado.
 */
import type { CmsLocale } from '../types'
import {
  REGULAMENTOS_CONCEITOS,
  REGULAMENTOS_PROCEDIMENTOS,
  REGULAMENTOS_CRITERIOS,
  REGULAMENTOS_ALL_IN_FOLD,
  REGULAMENTOS_BUY_IN_CASH,
  REGULAMENTOS_BONUS_CHIP,
  PRIVACIDADE_FORMULARIO,
  PRIVACIDADE_ENCARREGADO,
  PRIVACIDADE_DIRETIVA,
  PRIVACIDADE_SOBRE,
  PRIVACIDADE_COLETA,
  PRIVACIDADE_MENORES,
  PRIVACIDADE_COOKIES,
  PRIVACIDADE_TRATAMENTO,
  PRIVACIDADE_COMPARTILHAMENTO,
  PRIVACIDADE_INTERNACIONAL,
  PRIVACIDADE_SEGURANCA,
  PRIVACIDADE_RETENCAO,
} from '../../mock-documento-pages'

type DocLocale = Exclude<CmsLocale, 'pt'>
type DocDict = Record<string, string>

const titles: Record<DocLocale, DocDict> = {
  en: {
    'Conceitos gerais': 'General concepts',
    'Procedimentos': 'Procedures',
    'Critérios para início\ndo torneio': 'Criteria for starting\nthe tournament',
    'All in fold': 'All-in fold',
    'Buy-in Cash Game': 'Cash Game buy-in',
    'Promoção Bonus Chip': 'Bonus Chip promotion',
    'Formulário\nde Privacidade': 'Privacy\nform',
    'Encarregado\npelo tratamento': 'Data protection\nofficer',
    'Diretiva e Avisos\nde Privacidade': 'Privacy directive\nand notices',
    'Sobre o Grupo H2': 'About Grupo H2',
    'Coleta de\ndados pessoais': 'Collection of\npersonal data',
    'Dados de Menores\ne Sensíveis': 'Minors and\nsensitive data',
    'Tratamento de Cookies': 'Cookie processing',
    'Tratamento de\ndados pessoais': 'Processing of\npersonal data',
    'Compartilhamento\npara terceiros': 'Sharing with\nthird parties',
    'Transferência\ninternacional': 'International\ntransfer',
    'Segurança de dados': 'Data security',
    'Retenção de dados': 'Data retention',
    'Segurança e Privacidade': 'Security and Privacy',
    'Regulamentos': 'Regulations',
  },
  es: {
    'Conceitos gerais': 'Conceptos generales',
    'Procedimentos': 'Procedimientos',
    'Critérios para início\ndo torneio': 'Criterios para el inicio\ndel torneo',
    'All in fold': 'All-in fold',
    'Buy-in Cash Game': 'Buy-in Cash Game',
    'Promoção Bonus Chip': 'Promoción de ficha bonus',
    'Formulário\nde Privacidade': 'Formulario\nde Privacidad',
    'Encarregado\npelo tratamento': 'Encargado\ndel tratamiento',
    'Diretiva e Avisos\nde Privacidade': 'Directiva y Avisos\nde Privacidad',
    'Sobre o Grupo H2': 'Sobre el Grupo H2',
    'Coleta de\ndados pessoais': 'Recolección de\ndatos personales',
    'Dados de Menores\ne Sensíveis': 'Datos de menores\ny sensibles',
    'Tratamento de Cookies': 'Tratamiento de cookies',
    'Tratamento de\ndados pessoais': 'Tratamiento de\ndatos personales',
    'Compartilhamento\npara terceiros': 'Compartición\ncon terceros',
    'Transferência\ninternacional': 'Transferencia\ninternacional',
    'Segurança de dados': 'Seguridad de datos',
    'Retenção de dados': 'Retención de datos',
    'Segurança e Privacidade': 'Seguridad y Privacidad',
    'Regulamentos': 'Reglamentos',
  },
  zh: {
    'Conceitos gerais': '基本概念',
    'Procedimentos': '流程',
    'Critérios para início\ndo torneio': '开赛\n条件',
    'All in fold': '全下或弃牌',
    'Buy-in Cash Game': '现金桌买入',
    'Promoção Bonus Chip': '奖励筹码促销',
    'Formulário\nde Privacidade': '隐私\n表单',
    'Encarregado\npelo tratamento': '数据处理\n负责人',
    'Diretiva e Avisos\nde Privacidade': '隐私指令\n与声明',
    'Sobre o Grupo H2': '关于 Grupo H2',
    'Coleta de\ndados pessoais': '个人数据\n收集',
    'Dados de Menores\ne Sensíveis': '未成年人与\n敏感数据',
    'Tratamento de Cookies': 'Cookie 处理',
    'Tratamento de\ndados pessoais': '个人数据\n处理',
    'Compartilhamento\npara terceiros': '向第三方\n共享',
    'Transferência\ninternacional': '跨境\n传输',
    'Segurança de dados': '数据安全',
    'Retenção de dados': '数据保留',
    'Segurança e Privacidade': '安全与隐私',
    'Regulamentos': '规则',
  },
  ja: {
    'Conceitos gerais': '基本概念',
    'Procedimentos': '手順',
    'Critérios para início\ndo torneio': 'トーナメント開始\nの基準',
    'All in fold': 'オールイン・フォールド',
    'Buy-in Cash Game': 'キャッシュゲーム・バイイン',
    'Promoção Bonus Chip': 'ボーナスチップ\nプロモーション',
    'Formulário\nde Privacidade': 'プライバシー\nフォーム',
    'Encarregado\npelo tratamento': 'データ保護\n責任者',
    'Diretiva e Avisos\nde Privacidade': 'プライバシー方針\nと通知',
    'Sobre o Grupo H2': 'Grupo H2 について',
    'Coleta de\ndados pessoais': '個人データ\nの収集',
    'Dados de Menores\ne Sensíveis': '未成年者および\n機微データ',
    'Tratamento de Cookies': 'Cookie の取扱い',
    'Tratamento de\ndados pessoais': '個人データ\nの取扱い',
    'Compartilhamento\npara terceiros': '第三者への\n共有',
    'Transferência\ninternacional': '国際\n転送',
    'Segurança de dados': 'データセキュリティ',
    'Retenção de dados': 'データ保管',
    'Segurança e Privacidade': 'セキュリティとプライバシー',
    'Regulamentos': '規約',
  },
}

const cta: Record<DocLocale, DocDict> = {
  en: {
    'Este é o regulamento de torneios de poker da H2 Sports Bar & Poker. Ele segue o padrão internacional de regulamento da TDA e ADTP.':
      'This is the H2 Sports Bar & Poker tournament rulebook. It follows the international TDA and ADTP standard.',
    'A ADTP é composta de profissionais de salas de poker de toda a América Latina, cujo objetivo é redigir um conjunto de regras padronizadas para torneios de poker.':
      'ADTP is made up of poker-room professionals from across Latin America whose goal is to draft a standardized set of rules for poker tournaments.',
    'As regras da ADTP a seguir complementam as “regras da casa” deste torneio.':
      'The following ADTP rules complement this tournament’s “house rules”.',
    'O Grupo H2 estabelece esta política para reforçar seu compromisso com a proteção e o respeito à sua privacidade.':
      'Grupo H2 establishes this policy to reinforce its commitment to protecting and respecting your privacy.',
  },
  es: {
    'Este é o regulamento de torneios de poker da H2 Sports Bar & Poker. Ele segue o padrão internacional de regulamento da TDA e ADTP.':
      'Este es el reglamento de torneos de póker de H2 Sports Bar & Poker. Sigue el estándar internacional de reglamento de la TDA y ADTP.',
    'A ADTP é composta de profissionais de salas de poker de toda a América Latina, cujo objetivo é redigir um conjunto de regras padronizadas para torneios de poker.':
      'La ADTP está formada por profesionales de salas de póker de toda América Latina, cuyo objetivo es redactar un conjunto de reglas estandarizadas para torneos de póker.',
    'As regras da ADTP a seguir complementam as “regras da casa” deste torneio.':
      'Las siguientes reglas de la ADTP complementan las “reglas de la casa” de este torneo.',
    'O Grupo H2 estabelece esta política para reforçar seu compromisso com a proteção e o respeito à sua privacidade.':
      'El Grupo H2 establece esta política para reforzar su compromiso con la protección y el respeto a su privacidad.',
  },
  zh: {
    'Este é o regulamento de torneios de poker da H2 Sports Bar & Poker. Ele segue o padrão internacional de regulamento da TDA e ADTP.':
      '本文件为 H2 Sports Bar & Poker 扑克锦标赛规则，遵循 TDA 与 ADTP 国际规则标准。',
    'A ADTP é composta de profissionais de salas de poker de toda a América Latina, cujo objetivo é redigir um conjunto de regras padronizadas para torneios de poker.':
      'ADTP 由拉丁美洲各地扑克室专业人士组成，旨在起草一套标准化的扑克锦标赛规则。',
    'As regras da ADTP a seguir complementam as “regras da casa” deste torneio.':
      '以下 ADTP 规则补充本赛事的“场馆规则”。',
    'O Grupo H2 estabelece esta política para reforçar seu compromisso com a proteção e o respeito à sua privacidade.':
      'Grupo H2 制定本政策，以强化其对保护并尊重您隐私的承诺。',
  },
  ja: {
    'Este é o regulamento de torneios de poker da H2 Sports Bar & Poker. Ele segue o padrão internacional de regulamento da TDA e ADTP.':
      'これは H2 Sports Bar & Poker のポーカートーナメント規約です。TDA および ADTP の国際基準に従います。',
    'A ADTP é composta de profissionais de salas de poker de toda a América Latina, cujo objetivo é redigir um conjunto de regras padronizadas para torneios de poker.':
      'ADTP はラテンアメリカ各地のポーカールーム専門家で構成され、ポーカートーナメント向けの標準ルール策定を目的としています。',
    'As regras da ADTP a seguir complementam as “regras da casa” deste torneio.':
      '以下の ADTP ルールは、本トーナメントの「ハウスルール」を補完します。',
    'O Grupo H2 estabelece esta política para reforçar seu compromisso com a proteção e o respeito à sua privacidade.':
      'Grupo H2 は、お客様のプライバシー保護と尊重へのコミットメントを強化するため、本ポリシーを定めます。',
  },
}

const regulamentosHtml: Record<DocLocale, DocDict> = {
  en: {
    [REGULAMENTOS_CONCEITOS]: `<ol>
  <li>
    <strong>Floor / supervisory staff</strong><br>
    Supervisory staff must treat the best interest of the contest and fairness as the highest priorities when making decisions. Unusual circumstances may require a decision that uses common sense and, in the interest of fairness, takes precedence over technical rules. Decisions by tournament management and supervisory staff are final.
  </li>
  <li>
    <strong>Player responsibility</strong><br>
    Players are responsible for: checking registration details and seat assignments; protecting their cards; making their intentions clear; following the action; acting in turn with proper terminology or gestures; defending their right to act; keeping cards visible; stacking chips correctly; remaining at the table with a live hand; properly showing all cards at showdown; speaking up when an error occurs; calling time when justified; moving to another table promptly; respecting “one player to a hand”; knowing and following the rules; observing proper etiquette; and generally contributing to the tournament’s organization.
  </li>
  <li>
    <strong>Official tournament terminology and gestures</strong><br>
    Official betting terms are simple, unmistakable declarations made at the proper time, such as: bet, raise, call, fold, check, all-in, pot (pot-limit only), and complete. Regional terms may meet this standard. Players must also use gestures carefully when facing action; a light tap on the table is a check. Non-standard language or gestures are the player’s responsibility and may result in a ruling different from what was intended. Players must make their intentions clear. See rules 2 and 42.
  </li>
</ol>`,
    [REGULAMENTOS_PROCEDIMENTOS]: `<p>Tournament procedures aim to ensure flow, fairness and safety at every table. Event management may adjust pace and protocols by tournament phase, always prioritizing the best interest of the contest.</p>
<p>Players must stay attentive to dealer and floor instructions. Unjustified delays, irregular communication between tables or conduct that slows play may result in a warning or penalty at the supervisor’s discretion.</p>
<p>If unsure about a procedure in progress, the player must request the floor before action continues. Rulings made after action is complete may be limited by the current state of the hand.</p>`,
    [REGULAMENTOS_CRITERIOS]: `<p>The tournament starts at the time published on the schedule, subject to event management confirmation. Minimum player presence, table readiness and completed check-in may condition the effective start.</p>
<p>Late registration, re-entries and add-ons follow each event’s specific rules. After late registration closes, new players may not enter unless expressly allowed by the series rules.</p>
<p>The blinds structure, starting level and duration of each level are published in advance. Exceptional changes occur only by management decision, with clear communication to participants.</p>`,
    [REGULAMENTOS_ALL_IN_FOLD]: `<p>In All-in Fold, the player is limited to the actions allowed by the event format — typically all-in or fold — without intermediate options such as a partial call or standard raise, unless a tournament-specific rule applies.</p>
<p>Players must know the format restrictions before registering. Actions incompatible with All-in Fold may be corrected by the floor or result in a forced declaration under house rules.</p>
<p>Disputes about player intent in All-in Fold are resolved by the floor, considering gestures, chips pushed and the context of the hand.</p>`,
    [REGULAMENTOS_BUY_IN_CASH]: `<p>The cash-game buy-in is the minimum and maximum amount allowed to sit at each table, expressed as big-blind multiples or a fixed amount posted on the club board.</p>
<p>Players must buy chips only at official cashier points. Irregular chip transfers between players outside short-stack / table-change rules authorized by supervision are prohibited.</p>
<p>When leaving the table, the player must cash out the stack per club procedure. Re-entries in the same session respect the minimum buy-in in force at the time of return.</p>`,
    [REGULAMENTOS_BONUS_CHIP]: `<p>The Bonus Chip promotion grants extra chips under the conditions published during the promotional period (buy-in amount, eligible modality and per-player limit).</p>
<p>The benefit is not cumulative beyond the promotion rules and may require ID at the cashier at purchase. Abuse or workarounds result in bonus cancellation and possible sanctions.</p>
<p>If this summary conflicts with the official promotion material, the text published by H2 for the current period prevails.</p>`,
  },
  es: {
    [REGULAMENTOS_CONCEITOS]: `<ol>
  <li>
    <strong>Equipo de supervisión/floor</strong><br>
    El equipo de supervisión deberá considerar el mejor interés de la competencia y la justicia como las máximas prioridades en el proceso de toma de decisiones. Circunstancias inusuales pueden exigir una decisión que utilice el sentido común y, en interés de la justicia, tenga precedencia sobre las reglas técnicas. La decisión del personal de dirección y supervisión del torneo es final.
  </li>
  <li>
    <strong>Responsabilidad del jugador</strong><br>
    Es responsabilidad de los jugadores: verificar los datos de su inscripción y asignación de asientos; proteger sus cartas; dejar claras sus intenciones; seguir la acción de la mesa; actuar en su turno con la terminología o los gestos adecuados; defender su derecho a actuar; mantener sus cartas visibles; mantener sus fichas correctamente apiladas; permanecer en la mesa cuando tengan una mano viva; mostrar correctamente todas sus cartas cuando participen en el showdown; hacerse oír cuando ocurra un error; pedir tiempo cuando sea justificable; moverse rápidamente a otra mesa; respetar la regla de “un jugador por mano”; conocer y respetar las reglas; seguir la etiqueta adecuada y, en general, contribuir con la organización del torneo.
  </li>
  <li>
    <strong>Terminología y gestos oficiales para torneos de póker</strong><br>
    Los términos de apuesta oficiales son declaraciones simples e inconfundibles, hechas en el momento oportuno, como: bet (apuesta), raise (aumento), call (pagar), fold (retirarse), check (pasar), all-in (todas las fichas), pot (solo en la modalidad pot-limit) y completar. Los términos regionales pueden cumplir con este estándar. Además, los jugadores deben usar los gestos con cautela cuando enfrentan una acción; golpear ligeramente la mesa equivale a un check (pasar). El uso de lenguaje o gestos fuera del estándar es responsabilidad del jugador, ya que puede resultar en una decisión distinta a la pretendida. Es responsabilidad del jugador dejar claras sus intenciones. Véanse las reglas 2 y 42.
  </li>
</ol>`,
    [REGULAMENTOS_PROCEDIMENTOS]: `<p>Los procedimientos del torneo buscan garantizar fluidez, equidad y seguridad en todas las mesas. La dirección del evento puede ajustar ritmos y protocolos según la fase del torneo, priorizando siempre el mejor interés de la competencia.</p>
<p>Los jugadores deben permanecer atentos a las instrucciones del dealer y del equipo de floor. Los retrasos injustificados, la comunicación irregular entre mesas o la conducta que retrase el desarrollo pueden resultar en una advertencia o sanción, a criterio de la supervisión.</p>
<p>En caso de duda sobre un procedimiento en curso, el jugador debe solicitar la presencia del floor antes de que la acción continúe. Las decisiones tomadas después de completada la acción pueden verse limitadas por el estado actual de la mano.</p>`,
    [REGULAMENTOS_CRITERIOS]: `<p>El torneo comienza en el horario publicado en la agenda, sujeto a confirmación de la dirección del evento. La presencia mínima de jugadores, la disponibilidad de las mesas y la finalización del check-in pueden condicionar el inicio efectivo.</p>
<p>El late registration, las reentradas y los add-ons siguen las reglas específicas de cada evento. Tras el cierre del período de registro tardío, no podrán ingresar nuevos jugadores, salvo disposición expresa en el reglamento de la serie.</p>
<p>La estructura de blinds, el nivel de inicio y la duración de cada nivel se publican con anticipación. Los cambios excepcionales solo ocurren por decisión de la dirección, con comunicación clara a los participantes.</p>`,
    [REGULAMENTOS_ALL_IN_FOLD]: `<p>En la modalidad All-in Fold, el jugador está limitado a las acciones previstas en el formato del evento — típicamente all-in o fold — sin opciones intermedias de call parcial o raise estándar, salvo regla específica del torneo.</p>
<p>Es obligación del jugador conocer las restricciones del formato antes de inscribirse. Las acciones incompatibles con el All-in Fold pueden ser corregidas por el equipo de piso o resultar en una declaración forzada según la regla de la casa.</p>
<p>Las disputas sobre la intención del jugador en All-in Fold serán resueltas por el floor, considerando gestos, fichas empujadas y el contexto de la mano.</p>`,
    [REGULAMENTOS_BUY_IN_CASH]: `<p>El buy-in de cash game corresponde al valor mínimo y máximo permitido para sentarse en cada mesa, expresado en múltiplos de big blind o en un valor fijo publicado en el tablero del club.</p>
<p>El jugador debe adquirir fichas únicamente en los puntos oficiales de caja. Está prohibida la transferencia irregular de fichas entre jugadores fuera de las reglas de short stack / table change autorizadas por la supervisión.</p>
<p>Al dejar la mesa, el jugador debe liquidar su stack según el procedimiento del club. Las reentradas en la misma sesión respetan el buy-in mínimo vigente en el momento del regreso.</p>`,
    [REGULAMENTOS_BONUS_CHIP]: `<p>La promoción de ficha bonus otorga fichas adicionales según las condiciones publicadas durante el período promocional (valor del buy-in, modalidad elegible y límite por jugador).</p>
<p>El beneficio no es acumulable más allá de lo previsto en el reglamento de la promoción y puede exigir identificación en caja en el momento de la compra. Abusos o intentos de elusión resultan en la cancelación del bono y posibles sanciones.</p>
<p>En caso de conflicto entre este resumen y el material oficial de la promoción, prevalece el texto publicado por H2 en el período vigente.</p>`,
  },
  zh: {
    [REGULAMENTOS_CONCEITOS]: `<ol>
  <li>
    <strong>现场监督 / Floor</strong><br>
    监督团队在决策时须以比赛最佳利益与公平为最高优先。特殊情况可能需要基于常识的裁决，并为公平起见优先于技术规则。赛事管理与监督人员的决定为最终决定。
  </li>
  <li>
    <strong>玩家责任</strong><br>
    玩家有责任：核对照报名与座位信息；保护手牌；明确表达意图；跟进牌局行动；轮到自己时使用正确术语或手势行动；维护行动权利；保持手牌可见；正确叠放筹码；有活牌时留在桌边；摊牌时正确亮出全部手牌；出现错误时及时指出；在合理时请求计时；快速换桌；遵守“一手牌一名玩家”；了解并遵守规则；遵守礼仪，并总体上配合赛事组织。
  </li>
  <li>
    <strong>锦标赛官方术语与手势</strong><br>
    官方下注术语应是在适当时机作出的简单、明确声明，例如：bet（下注）、raise（加注）、call（跟注）、fold（弃牌）、check（过牌）、all-in（全下）、pot（仅限底池限注）以及补盲。地区性术语也可符合此标准。面对行动时须谨慎使用手势；轻敲桌面视为过牌。使用非标准语言或手势由玩家自行负责，可能导致与其意图不符的裁决。玩家须明确表达意图。参见规则 2 与 42。
  </li>
</ol>`,
    [REGULAMENTOS_PROCEDIMENTOS]: `<p>锦标赛流程旨在保障各桌流畅、公平与安全。赛事管理可按阶段调整节奏与规程，始终以比赛最佳利益为优先。</p>
<p>玩家须留意发牌员与 floor 指示。无正当理由的拖延、桌间不当沟通或拖延进程的行为，监督方可警告或处罚。</p>
<p>对进行中的流程有疑问时，玩家须在行动继续前请求 floor。行动结束后作出的裁决可能受当前牌局状态限制。</p>`,
    [REGULAMENTOS_CRITERIOS]: `<p>赛事按赛程公布时间开始，须经赛事管理确认。最低到场人数、桌台就绪与完成签到可能影响实际开赛。</p>
<p>迟到报名、重入与 add-on 遵循各赛事规则。迟到报名结束后，除非系列规则明确允许，否则不得新进。</p>
<p>盲注结构、起始级别与每级时长预先公布。特殊变更仅由管理层决定，并须向参赛者明确告知。</p>`,
    [REGULAMENTOS_ALL_IN_FOLD]: `<p>在 All-in Fold 玩法中，玩家仅可执行赛制允许的行动——通常为全下或弃牌——除非赛事另有规定，不得进行部分跟注或常规加注等中间选项。</p>
<p>报名前玩家须了解赛制限制。与 All-in Fold 不符的行动可由现场纠正，或按场馆规则强制声明。</p>
<p>关于玩家意图的争议由 floor 根据手势、推进的筹码及牌局情境裁定。</p>`,
    [REGULAMENTOS_BUY_IN_CASH]: `<p>现金桌买入为各桌允许入座的最低与最高金额，以大盲倍数或俱乐部公告的固定金额表示。</p>
<p>玩家只能在官方收银台购买筹码。禁止在监督未授权的短筹码/换桌规则之外私下转筹码。</p>
<p>离桌时须按俱乐部流程结算筹码。同一场次重入须遵守返回时有效的最低买入。</p>`,
    [REGULAMENTOS_BONUS_CHIP]: `<p>奖励筹码促销按促销期公布条件（买入金额、适用玩法与每位玩家限额）发放额外筹码。</p>
<p>福利不得超过促销规则，购买时可能需在收银台核验身份。滥用或规避将取消奖励并可能受到处罚。</p>
<p>本摘要与官方促销材料冲突时，以 H2 当期公布文本为准。</p>`,
  },
  ja: {
    [REGULAMENTOS_CONCEITOS]: `<ol>
  <li>
    <strong>フロア／監督スタッフ</strong><br>
    監督スタッフは、意思決定において競技の最善の利益と公正さを最優先事項として考慮しなければならない。異例の状況では、常識に基づき、公正さを優先して技術的規則に優先する判断が必要になる場合がある。トーナメントの運営・監督スタッフの決定は最終的なものとする。
  </li>
  <li>
    <strong>プレイヤーの責任</strong><br>
    プレイヤーには次の責任がある：登録内容と座席の割り当てを確認すること；手札を守ること；自分の意図を明確にすること；テーブルの進行を把握すること；順番が来たら適切な用語やジェスチャーで行動すること；行動する権利を守ること；手札を見える状態に保つこと；チップを正しく積み上げること；生きている手がある間はテーブルに留まること；ショーダウンに参加する際は全ての手札を正しく開示すること；ミスが起きた際は声を上げること；正当な場合はタイムを要求すること；速やかに別のテーブルへ移動すること；「1ハンド1プレイヤー」の原則を守ること；ルールを理解し遵守すること；適切なエチケットを守り、総じてトーナメントの運営に協力すること。
  </li>
  <li>
    <strong>ポーカートーナメントの公式用語とジェスチャー</strong><br>
    公式なベッティング用語は、適切なタイミングで行われる、単純で紛れのない宣言でなければならない。例：bet（ベット）、raise（レイズ）、call（コール）、fold（フォールド）、check（チェック）、all-in（オールイン）、pot（ポットリミットの場合のみ）、および completar（コンプリート）。地域的な用語もこの基準を満たすことができる。また、プレイヤーはアクションに直面した際、ジェスチャーの使用には注意しなければならない。テーブルを軽く叩く行為はチェックとみなされる。標準外の言葉やジェスチャーの使用はプレイヤーの責任であり、意図しない裁定につながる可能性がある。プレイヤーは自分の意図を明確にする責任を負う。ルール2および42を参照。
  </li>
</ol>`,
    [REGULAMENTOS_PROCEDIMENTOS]: `<p>トーナメントの運営手順は、全てのテーブルにおける円滑さ、公平性、安全性を確保することを目的とする。イベント運営はトーナメントの段階に応じてペースやプロトコルを調整することがあるが、常に競技の最善の利益を優先する。</p>
<p>プレイヤーはディーラーおよびフロアスタッフの指示に常に注意を払わなければならない。正当な理由のない遅延、テーブル間の不適切な連絡、進行を遅らせる行為は、監督の判断により警告または処罰の対象となる場合がある。</p>
<p>進行中の手順について疑問がある場合、プレイヤーはアクションが進む前にフロアの立ち会いを求めなければならない。アクションが完了した後に下された裁定は、その時点での手の状態によって制限される場合がある。</p>`,
    [REGULAMENTOS_CRITERIOS]: `<p>トーナメントはスケジュールに公表された時刻に開始するが、イベント運営の確認を要する。最低参加人数、テーブルの準備状況、チェックインの完了状況が実際の開始時刻に影響する場合がある。</p>
<p>レイトレジストレーション、リエントリー、アドオンは各イベント固有の規則に従う。レイトレジストレーション期間終了後は、シリーズ規約に明示的な定めがない限り、新規プレイヤーは参加できない。</p>
<p>ブラインド構成、開始レベル、各レベルの時間は事前に公表される。例外的な変更は運営の判断によってのみ行われ、参加者に明確に周知される。</p>`,
    [REGULAMENTOS_ALL_IN_FOLD]: `<p>All-in Fold形式では、プレイヤーはイベント形式で定められたアクション——通常はオールインまたはフォールド——に限定され、トーナメント固有の規則がない限り、部分的なコールや通常のレイズといった中間的な選択肢は認められない。</p>
<p>プレイヤーは登録前にこの形式の制限を理解しておく義務がある。All-in Foldと矛盾する行動は、フロアスタッフにより修正されるか、ハウスルールに従って強制的な宣言となる場合がある。</p>
<p>All-in Foldにおけるプレイヤーの意図に関する争いは、ジェスチャー、押し出されたチップ、および手の状況を考慮してフロアが裁定する。</p>`,
    [REGULAMENTOS_BUY_IN_CASH]: `<p>キャッシュゲームのバイインは、各テーブルに着席する際に許可される最低額および最高額であり、ビッグブラインドの倍数またはクラブの掲示板に公表された固定額で表される。</p>
<p>プレイヤーは公式のキャッシャーでのみチップを購入しなければならない。監督が承認したショートスタック／テーブルチェンジのルール以外での、プレイヤー間の不正なチップの譲渡は禁止される。</p>
<p>テーブルを離れる際、プレイヤーはクラブの手続きに従いスタックを精算しなければならない。同一セッション内でのリエントリーは、復帰時点で有効な最低バイイン額に従う。</p>`,
    [REGULAMENTOS_BONUS_CHIP]: `<p>ボーナスチップ・プロモーションは、プロモーション期間中に公表された条件（バイイン額、対象となるゲーム形式、プレイヤーごとの上限）に従って追加チップを付与する。</p>
<p>この特典はプロモーション規約に定められた範囲を超えて累積することはできず、購入時にキャッシャーでの本人確認が必要となる場合がある。不正利用や回避の試みは、ボーナスの取り消しおよび処罰の対象となる。</p>
<p>本要約と公式のプロモーション資料との間に矛盾がある場合、当該期間にH2が公表した文書が優先される。</p>`,
  },
}

const privacidadeHtml: Record<DocLocale, DocDict> = {
  en: {
    [PRIVACIDADE_FORMULARIO]: `<p>We provide a REQUESTS FORM so that you, as data subject, can exercise your privacy rights independently whenever you deem necessary.</p>
<p>If you cannot access the form, you may contact the Data Protection Officer (DPO) at the email listed in the “Data protection officer” section.</p>
<p>As data subject you have rights under Brazil’s General Personal Data Protection Law (13.709/2018) (“LGPD”). Grupo H2 respects your privacy and you may at any time request:</p>
<p>
  a) Confirmation that processing exists;<br>
  b) Access to your personal data;<br>
  c) Correction of incomplete, inaccurate or outdated data;<br>
  d) Anonymization, blocking or deletion of unnecessary, excessive or unlawfully processed data;<br>
  e) Portability of data to another service or product provider, upon your express request;<br>
  f) Deletion of data processed with your consent;<br>
  g) Information about public or private entities with which the “controller” and “controlled companies” shared your personal data;<br>
  h) Information about the option not to consent and the consequences of refusal;<br>
  i) Withdrawal of consent you provided; and<br>
  j) Review of decisions made solely based on automated processing.
</p>`,
    [PRIVACIDADE_ENCARREGADO]: `<p>Grupo H2’s Data Protection Officer (DPO) is the official channel for privacy questions, requests and communications.</p>
<p>You may contact us at <strong>dpo@grupoh2.com.br</strong>. We will respond within the LGPD timeframe, subject to lawful extensions when needed for proper review.</p>
<p>Requests made by third parties on behalf of the data subject must include a power of attorney or document proving legitimate representation.</p>`,
    [PRIVACIDADE_DIRETIVA]: `<p>This Directive and Privacy Notices describe how Grupo H2 collects, uses, stores and protects personal data in entertainment, tournaments, cash game, digital products and support activities.</p>
<p>Complementary documents may be published for specific purposes (app, campaigns, partnerships). In case of conflict, the more specific notice for the service used prevails.</p>
<p>We recommend reviewing this page periodically, as the policy may be updated to reflect legal or operational changes.</p>`,
    [PRIVACIDADE_SOBRE]: `<p>Grupo H2 brings together sports bar and poker brands and venues in Brazil, offering in-person experiences and digital services to customers and guests.</p>
<p>For this policy, “controller” and “controlled companies” mean group entities that determine the purposes and means of personal data processing for the relevant operation.</p>
<p>Corporate and institutional contact information may be requested from the DPO or found on the group’s official channels.</p>`,
    [PRIVACIDADE_COLETA]: `<p>We collect personal data you provide directly (registration, tournament entry, support), data generated by use of our services (frequency, preferences, participation history) and, when applicable, data from partners under an adequate legal basis.</p>
<p>Examples include name, ID, contact details, date of birth, payment data and digital platform access logs.</p>
<p>Collection is limited to what is necessary for stated purposes, such as contract performance, legal obligation, legitimate interest or consent, as applicable.</p>`,
    [PRIVACIDADE_MENORES]: `<p>Our services are for adults 18+. We do not intentionally collect personal data from children or adolescents for poker or related products.</p>
<p>Sensitive data, when processed, follows specific LGPD legal bases and stronger security and access controls.</p>
<p>If we identify improper processing involving a minor, we will stop processing and delete the data when applicable.</p>`,
    [PRIVACIDADE_COOKIES]: `<p>We use cookies and similar technologies for site operation, preferences, audience metrics and, when authorized, content personalization.</p>
<p>You may manage cookies via your browser or consent panels. Disabling essential cookies may affect site features.</p>
<p>Details on cookie categories and retention periods may be updated as tools evolve.</p>`,
    [PRIVACIDADE_TRATAMENTO]: `<p>We process personal data to enable registration, tournament entry and operation, cash game, loyalty programs, customer support, venue security and legal/regulatory obligations.</p>
<p>We may also use data to communicate about events, products and news, respecting legal bases and available opt-out options.</p>
<p>Processing is performed by authorized teams and systems with access controls matching the sensitivity of the information.</p>`,
    [PRIVACIDADE_COMPARTILHAMENTO]: `<p>We may share data with service providers that support us (technology, payments, operational marketing, security), always under contracts and instructions limiting use to the contracted purpose.</p>
<p>We may also share data with public authorities when legally required or under a valid order, and with Grupo H2 companies for purposes compatible with this policy.</p>
<p>We do not sell personal data. Specific recipient lists may be requested from the DPO, subject to legal confidentiality and security limits.</p>`,
    [PRIVACIDADE_INTERNACIONAL]: `<p>Some vendors or systems may store or process data outside Brazil. In those cases we adopt LGPD-compatible safeguards such as contractual clauses and assessment of the destination’s protection level.</p>
<p>You may request more information about international transfers applicable to your case from the DPO.</p>`,
    [PRIVACIDADE_SEGURANCA]: `<p>We adopt technical and administrative measures to protect personal data against unauthorized access, loss, alteration or improper disclosure, including access controls, monitoring and information-security best practices.</p>
<p>No environment is risk-free. In a relevant incident we will follow legal assessment and notification procedures when applicable.</p>`,
    [PRIVACIDADE_RETENCAO]: `<p>We keep personal data for as long as needed for stated purposes, legal obligations, regular exercise of rights and defense in proceedings.</p>
<p>When no longer needed, data are deleted or anonymized, except where retention is required by law.</p>
<p>Concrete periods may vary by data type and relationship with the subject (active customer, former customer, candidate, supplier, etc.).</p>`,
  },
  es: {
    [PRIVACIDADE_FORMULARIO]: `<p>Ponemos a su disposición el FORMULARIO DE SOLICITUDES para que usted, como titular, pueda ejercer sus derechos de privacidad de forma autónoma y siempre que lo considere necesario.</p>
<p>Si no puede acceder al formulario, puede ponerse en contacto con el Encargado (DPO) a través del correo electrónico indicado en la sección "Encargado del tratamiento".</p>
<p>Usted, como titular, posee derechos previstos en la Ley General de Protección de Datos Personales (13.709/2018) ("LGPD"). En Grupo H2 respetamos su privacidad y en cualquier momento usted puede solicitar:</p>
<p>
  a) La confirmación de la existencia de tratamiento;<br>
  b) El acceso a sus datos personales;<br>
  c) La corrección de datos incompletos, inexactos o desactualizados;<br>
  d) La anonimización, bloqueo o eliminación de datos innecesarios, excesivos o tratados en incumplimiento de la ley;<br>
  e) La portabilidad de los datos a otro proveedor de servicio o producto, mediante solicitud expresa suya;<br>
  f) La eliminación de los datos tratados con su consentimiento;<br>
  g) La obtención de información sobre las entidades públicas o privadas con las cuales la "empresa controladora" y las "empresas controladas" compartieron sus datos personales;<br>
  h) Información sobre la posibilidad de no otorgar consentimiento y las consecuencias de dicha negativa;<br>
  i) La revocación del consentimiento otorgado por usted; y<br>
  j) La revisión de decisiones tomadas únicamente con base en tratamiento automatizado.
</p>`,
    [PRIVACIDADE_ENCARREGADO]: `<p>El Encargado del Tratamiento de Datos Personales (DPO) de Grupo H2 es el canal oficial para dudas, solicitudes y comunicaciones relacionadas con la privacidad.</p>
<p>Puede ponerse en contacto a través del correo electrónico <strong>dpo@grupoh2.com.br</strong>. Responderemos dentro del plazo previsto por la LGPD, sujeto a las prórrogas legales cuando sean necesarias para el análisis adecuado de la solicitud.</p>
<p>Las solicitudes realizadas por terceros en nombre del titular deben ir acompañadas de un poder o documento que acredite la legitimidad de la representación.</p>`,
    [PRIVACIDADE_DIRETIVA]: `<p>Esta Directiva y los Avisos de Privacidad describen cómo Grupo H2 recopila, utiliza, almacena y protege los datos personales en el ámbito de sus actividades de entretenimiento, torneos, cash game, productos digitales y atención al cliente.</p>
<p>Se pueden publicar documentos complementarios para finalidades específicas (aplicación, campañas, alianzas). En caso de discrepancia, prevalece el aviso más específico aplicable al servicio utilizado.</p>
<p>Recomendamos la lectura periódica de esta página, ya que la política puede actualizarse para reflejar cambios legales u operativos.</p>`,
    [PRIVACIDADE_SOBRE]: `<p>Grupo H2 reúne marcas y sedes de sports bar y póker en Brasil, ofreciendo experiencias presenciales y servicios digitales a sus clientes y visitantes.</p>
<p>Para efectos de esta política, "empresa controladora" y "empresas controladas" se refieren a las entidades del grupo que determinan las finalidades y los medios del tratamiento de datos personales, según la operación involucrada.</p>
<p>La información societaria y de contacto institucional puede solicitarse al Encargado o consultarse en los canales oficiales del grupo.</p>`,
    [PRIVACIDADE_COLETA]: `<p>Recopilamos datos personales proporcionados directamente por usted (registro, inscripción en torneos, atención al cliente), datos generados por el uso de nuestros servicios (frecuencia, preferencias, historial de participación) y, cuando corresponda, datos obtenidos de socios con base legal adecuada.</p>
<p>Ejemplos incluyen nombre, documento de identidad, contacto, fecha de nacimiento, datos de pago y registros de acceso a plataformas digitales.</p>
<p>La recopilación se limita a lo necesario para las finalidades informadas, como la ejecución de un contrato, el cumplimiento de una obligación legal, el interés legítimo o el consentimiento, según el caso.</p>`,
    [PRIVACIDADE_MENORES]: `<p>Nuestros servicios están dirigidos a mayores de 18 años. No recopilamos intencionalmente datos personales de niños o adolescentes para participar en actividades de póker o productos relacionados.</p>
<p>Los datos sensibles, cuando eventualmente son tratados, se ajustan a hipótesis legales específicas de la LGPD y a medidas reforzadas de seguridad y restricción de acceso.</p>
<p>Si identificamos un tratamiento indebido que involucre a un menor de edad, adoptaremos medidas para interrumpir el tratamiento y eliminar los datos, cuando corresponda.</p>`,
    [PRIVACIDADE_COOKIES]: `<p>Utilizamos cookies y tecnologías similares para el funcionamiento del sitio, preferencias, métricas de audiencia y, cuando esté autorizado, personalización de contenido.</p>
<p>Usted puede administrar las cookies a través del navegador o de los paneles de consentimiento disponibles. La desactivación de las cookies esenciales puede afectar las funcionalidades del sitio.</p>
<p>Los detalles sobre las categorías de cookies y los plazos de retención pueden actualizarse conforme evolucionen las herramientas utilizadas.</p>`,
    [PRIVACIDADE_TRATAMENTO]: `<p>Tratamos datos personales para posibilitar registros, inscripción y operación de torneos, cash game, programas de fidelización, atención al cliente, seguridad de las sedes y cumplimiento de obligaciones legales y regulatorias.</p>
<p>También podemos utilizar datos para comunicaciones sobre eventos, productos y novedades, respetando las bases legales y las opciones de exclusión (opt-out) disponibles.</p>
<p>El tratamiento es realizado por equipos autorizados y por sistemas con controles de acceso compatibles con la sensibilidad de la información.</p>`,
    [PRIVACIDADE_COMPARTILHAMENTO]: `<p>Podemos compartir datos con proveedores de servicios que nos asisten (tecnología, pagos, marketing operativo, seguridad), siempre mediante contrato e instrucciones que limiten el uso a la finalidad contratada.</p>
<p>También podremos compartir datos con autoridades públicas cuando exista una obligación legal u orden válida, y con empresas del Grupo H2 para finalidades compatibles con esta política.</p>
<p>No vendemos datos personales. Los listados de destinatarios específicos pueden solicitarse al Encargado, respetando los límites legales de confidencialidad y seguridad.</p>`,
    [PRIVACIDADE_INTERNACIONAL]: `<p>Algunos proveedores o sistemas pueden almacenar o procesar datos fuera de Brasil. En esos casos, adoptamos salvaguardas compatibles con la LGPD, como cláusulas contractuales y evaluación del nivel de protección del destino.</p>
<p>Usted puede solicitar información adicional sobre las transferencias internacionales aplicables a su caso ante el Encargado.</p>`,
    [PRIVACIDADE_SEGURANCA]: `<p>Adoptamos medidas técnicas y administrativas para proteger los datos personales contra accesos no autorizados, pérdida, alteración o divulgación indebida, incluyendo controles de acceso, monitoreo y buenas prácticas de seguridad de la información.</p>
<p>Ningún entorno está absolutamente exento de riesgos. En caso de un incidente relevante, seguiremos los procedimientos legales de evaluación y comunicación cuando corresponda.</p>`,
    [PRIVACIDADE_RETENCAO]: `<p>Mantenemos los datos personales durante el tiempo necesario para cumplir con las finalidades informadas, las obligaciones legales, el ejercicio regular de derechos y la defensa en procesos judiciales.</p>
<p>Una vez finalizada la necesidad, los datos son eliminados o anonimizados, salvo en los casos de retención previstos por la ley.</p>
<p>Los plazos concretos pueden variar según el tipo de dato y la relación mantenida con el titular (cliente activo, exclíente, candidato, proveedor, etc.).</p>`,
  },
  zh: {
    [PRIVACIDADE_FORMULARIO]: `<p>我们提供“请求表单”，以便您作为数据主体可以在认为必要时自主行使隐私权利。</p>
<p>如无法访问该表单，您可通过“数据处理负责人”一节中列出的邮箱联系数据保护负责人（DPO）。</p>
<p>作为数据主体，您依据《巴西通用个人数据保护法》（13.709/2018 号，简称“LGPD”）享有相应权利。Grupo H2 尊重您的隐私，您可随时请求：</p>
<p>
  a) 确认是否存在数据处理；<br>
  b) 访问您的个人数据；<br>
  c) 更正不完整、不准确或过时的数据；<br>
  d) 对不必要、过度或违法处理的数据进行匿名化、封锁或删除；<br>
  e) 在您明确要求下，将数据可携带至其他服务或产品提供方；<br>
  f) 删除基于您同意而处理的数据；<br>
  g) 获取“管理公司”与“被管理公司”向哪些公共或私人实体共享了您个人数据的信息；<br>
  h) 获取关于不同意的可能性及其后果的信息；<br>
  i) 撤回您所给予的同意；以及<br>
  j) 对仅基于自动化处理作出的决定进行复核。
</p>`,
    [PRIVACIDADE_ENCARREGADO]: `<p>Grupo H2 的数据处理负责人（DPO）是处理隐私相关问题、请求与沟通的官方渠道。</p>
<p>您可通过邮箱 <strong>dpo@grupoh2.com.br</strong> 与我们联系。我们将在 LGPD 规定期限内答复，如为妥善分析请求而需要延期，将依法进行。</p>
<p>由第三方代表数据主体提出的请求，须附有委托书或能证明代理合法性的文件。</p>`,
    [PRIVACIDADE_DIRETIVA]: `<p>本指令及隐私声明描述了 Grupo H2 在娱乐、锦标赛、现金桌、数字产品及客服活动中如何收集、使用、存储和保护个人数据。</p>
<p>针对特定目的（应用程序、活动、合作）可能发布补充文件。如有不一致之处，以适用于所使用服务的更具体声明为准。</p>
<p>建议您定期查阅本页面，因为本政策可能因法律或运营变化而更新。</p>`,
    [PRIVACIDADE_SOBRE]: `<p>Grupo H2 汇聚了巴西境内多个体育酒吧与扑克品牌及门店，为客户与访客提供线下体验与数字服务。</p>
<p>就本政策而言，“管理公司”与“被管理公司”指根据相关业务决定个人数据处理目的与方式的集团内实体。</p>
<p>公司及机构联系信息可向数据保护负责人索取，或在集团官方渠道查询。</p>`,
    [PRIVACIDADE_COLETA]: `<p>我们收集您直接提供的个人数据（注册、锦标赛报名、客服互动）、因使用我们服务而产生的数据（使用频率、偏好、参与历史），以及在适用情况下基于适当法律依据从合作伙伴处获得的数据。</p>
<p>示例包括姓名、证件、联系方式、出生日期、支付数据以及数字平台访问记录。</p>
<p>数据收集仅限于所声明目的所需的范围，例如履行合同、遵守法律义务、正当利益或同意，视具体情况而定。</p>`,
    [PRIVACIDADE_MENORES]: `<p>我们的服务面向 18 岁以上人群。我们不会为参与扑克或相关产品活动而故意收集儿童或青少年的个人数据。</p>
<p>如涉及敏感数据处理，须遵循 LGPD 规定的特定法律依据，并采取更严格的安全与访问限制措施。</p>
<p>若发现涉及未成年人的不当处理，我们将采取措施停止处理，并在适用时删除相关数据。</p>`,
    [PRIVACIDADE_COOKIES]: `<p>我们使用 Cookie 及类似技术用于网站运行、偏好设置、受众指标统计，以及在获得授权时进行内容个性化。</p>
<p>您可通过浏览器或提供的同意管理面板管理 Cookie。停用必要 Cookie 可能影响网站部分功能。</p>
<p>Cookie 类别及保留期限的详情可能随所用工具的更新而调整。</p>`,
    [PRIVACIDADE_TRATAMENTO]: `<p>我们处理个人数据，以支持注册、锦标赛报名与运营、现金桌、会员计划、客户服务、场馆安全以及法律与监管义务的履行。</p>
<p>我们还可能在遵循法律依据及可用退订选项的前提下，使用数据就活动、产品和资讯进行沟通。</p>
<p>数据处理由经授权的团队及具备与信息敏感度相匹配访问控制的系统执行。</p>`,
    [PRIVACIDADE_COMPARTILHAMENTO]: `<p>我们可能与协助我们运营的服务提供商（技术、支付、运营营销、安全）共享数据，但始终基于合同及将使用限制在约定目的范围内的指示。</p>
<p>在法律要求或存在有效命令时，我们也可能与公共机构共享数据；出于与本政策相符的目的，也可能与 Grupo H2 集团公司共享数据。</p>
<p>我们不出售个人数据。特定收件方名单可在符合法律保密及安全限制的前提下向数据保护负责人索取。</p>`,
    [PRIVACIDADE_INTERNACIONAL]: `<p>部分供应商或系统可能在巴西境外存储或处理数据。在此情况下，我们采取符合 LGPD 的保障措施，例如合同条款以及对目的地保护水平的评估。</p>
<p>您可就适用于您情况的跨境传输向数据保护负责人索取更多信息。</p>`,
    [PRIVACIDADE_SEGURANCA]: `<p>我们采取技术与管理措施，保护个人数据免受未经授权的访问、丢失、篡改或不当披露，包括访问控制、监控以及信息安全最佳实践。</p>
<p>任何环境都无法完全排除风险。如发生重大安全事件，我们将在适用情况下遵循法律规定的评估与通知程序。</p>`,
    [PRIVACIDADE_RETENCAO]: `<p>我们会在履行所述目的、法律义务、正常行使权利及进行诉讼抗辩所需的时间内保留个人数据。</p>
<p>在不再需要之后，数据将被删除或匿名化，法律另有留存要求的情形除外。</p>
<p>具体期限可能因数据类型及与数据主体的关系（现有客户、前客户、应聘者、供应商等）而有所不同。</p>`,
  },
  ja: {
    [PRIVACIDADE_FORMULARIO]: `<p>H2グループは、お客様がご自身のプライバシー権を必要と判断した際にいつでも自主的に行使できるよう、「請求フォーム」をご用意しています。</p>
<p>フォームにアクセスできない場合は、「データ保護責任者」の項に記載のメールアドレスより、データ保護責任者（DPO）までご連絡ください。</p>
<p>お客様は、ブラジル一般個人データ保護法（13.709/2018号、以下「LGPD」）に定められた権利を有しています。Grupo H2はお客様のプライバシーを尊重し、いつでも以下を請求することができます。</p>
<p>
  a) 取扱いの有無の確認；<br>
  b) ご自身の個人データへのアクセス；<br>
  c) 不完全、不正確または古くなったデータの訂正；<br>
  d) 不要、過剰、または法令に違反して取り扱われたデータの匿名化、ブロックまたは削除；<br>
  e) お客様の明示的な請求に基づく、他のサービスまたは製品提供者へのデータのポータビリティ；<br>
  f) お客様の同意に基づき取り扱われたデータの削除；<br>
  g) 「管理会社」および「被管理会社」がお客様の個人データを共有した公的または私的機関に関する情報の取得；<br>
  h) 同意しない可能性およびその拒否がもたらす結果についての情報；<br>
  i) お客様が付与した同意の撤回；および<br>
  j) 自動化された処理のみに基づいて下された決定の見直し。
</p>`,
    [PRIVACIDADE_ENCARREGADO]: `<p>Grupo H2のデータ保護責任者（DPO）は、プライバシーに関する質問、請求および連絡のための公式窓口です。</p>
<p>お問い合わせは<strong>dpo@grupoh2.com.br</strong>までメールにてご連絡ください。LGPDが定める期限内に回答いたしますが、請求内容の適切な分析のために必要な場合は法律上認められた延長を行うことがあります。</p>
<p>本人に代わって第三者が行う請求には、委任状または代理の正当性を証明する書類の添付が必要です。</p>`,
    [PRIVACIDADE_DIRETIVA]: `<p>本方針およびプライバシー通知は、Grupo H2がエンターテインメント、トーナメント、キャッシュゲーム、デジタル製品およびサポート活動において、個人データをどのように収集、利用、保管、保護するかを説明するものです。</p>
<p>特定の目的（アプリ、キャンペーン、提携）のために補足文書が公表される場合があります。内容に相違がある場合は、利用するサービスに適用されるより具体的な通知が優先されます。</p>
<p>本方針は法令上または運用上の変更を反映するため更新される場合がありますので、定期的にご確認いただくことをお勧めします。</p>`,
    [PRIVACIDADE_SOBRE]: `<p>Grupo H2は、ブラジル国内でスポーツバーおよびポーカーのブランドと店舗を展開し、対面での体験とデジタルサービスをお客様およびご来店の皆様に提供しています。</p>
<p>本方針において「管理会社」および「被管理会社」とは、当該業務に応じて個人データの取扱いの目的および手段を決定するグループ内の各法人を指します。</p>
<p>法人情報および公式な問い合わせ先については、データ保護責任者にご請求いただくか、グループの公式チャネルにてご確認いただけます。</p>`,
    [PRIVACIDADE_COLETA]: `<p>当社は、お客様から直接ご提供いただく個人データ（登録、トーナメント参加登録、サポート対応）、当社サービスのご利用によって生成されるデータ（利用頻度、ご希望、参加履歴）、および該当する場合には適切な法的根拠に基づきパートナーから取得したデータを収集します。</p>
<p>例としては、氏名、身分証明書、連絡先、生年月日、決済データ、デジタルプラットフォームへのアクセス記録などが挙げられます。</p>
<p>データの収集は、契約の履行、法的義務の遵守、正当な利益または同意など、案内された目的のために必要な範囲に限定されます。</p>`,
    [PRIVACIDADE_MENORES]: `<p>当社のサービスは18歳以上を対象としています。ポーカー関連のアクティビティや関連製品への参加を目的として、児童または未成年者の個人データを意図的に収集することはありません。</p>
<p>機微データを取り扱う場合には、LGPDが定める特定の法的根拠、および強化されたセキュリティ対策とアクセス制限措置に従います。</p>
<p>未成年者に関する不適切な取扱いを確認した場合、当社は取扱いを中止し、該当する場合はデータを削除する措置を講じます。</p>`,
    [PRIVACIDADE_COOKIES]: `<p>当社は、サイトの運営、設定の保存、視聴者に関する指標の測定、および許可がある場合にはコンテンツのパーソナライズのために、Cookieおよび類似の技術を使用しています。</p>
<p>お客様はブラウザまたは提供される同意管理パネルからCookieを管理することができます。必須Cookieを無効にすると、サイトの一部機能に影響が生じる場合があります。</p>
<p>Cookieのカテゴリーおよび保存期間の詳細は、使用するツールの変化に応じて更新される場合があります。</p>`,
    [PRIVACIDADE_TRATAMENTO]: `<p>当社は、登録、トーナメントの参加登録および運営、キャッシュゲーム、ロイヤリティプログラム、カスタマーサポート、店舗のセキュリティ、ならびに法令上および規制上の義務の遵守を可能にするために個人データを取り扱います。</p>
<p>また、法的根拠およびご利用可能なオプトアウトの選択肢を尊重した上で、イベント、製品および最新情報に関するご連絡のためにデータを利用する場合があります。</p>
<p>取扱いは、権限を与えられたチームおよび情報の機微性に応じたアクセス制御を備えたシステムによって行われます。</p>`,
    [PRIVACIDADE_COMPARTILHAMENTO]: `<p>当社は、技術、決済、業務上のマーケティング、セキュリティなどの業務を支援するサービス提供者とデータを共有する場合がありますが、常に契約および契約された目的に利用を限定する指示に基づいて行います。</p>
<p>また、法的義務または有効な命令がある場合は公的機関と、本方針に適合する目的の場合はGrupo H2グループ会社とデータを共有することがあります。</p>
<p>当社は個人データを販売しません。特定の受領者リストについては、法律上の守秘義務およびセキュリティの制限の範囲内で、データ保護責任者に請求することができます。</p>`,
    [PRIVACIDADE_INTERNACIONAL]: `<p>一部のプロバイダーまたはシステムは、ブラジル国外でデータを保管または処理する場合があります。その場合、当社は契約条項の締結や移転先の保護水準の評価など、LGPDに適合した保護措置を講じます。</p>
<p>お客様のケースに適用される国際移転に関する追加情報については、データ保護責任者にご請求いただけます。</p>`,
    [PRIVACIDADE_SEGURANCA]: `<p>当社は、不正アクセス、紛失、改ざんまたは不適切な開示から個人データを保護するために、アクセス制御、監視、および情報セキュリティのベストプラクティスを含む技術的および組織的な対策を講じています。</p>
<p>いかなる環境もリスクが完全にないわけではありません。重大なインシデントが発生した場合、該当する法的な評価および通知の手続きに従います。</p>`,
    [PRIVACIDADE_RETENCAO]: `<p>当社は、案内された目的の達成、法的義務の履行、権利の通常の行使、および訴訟における防御のために必要な期間、個人データを保管します。</p>
<p>必要性がなくなった後、データは法律で定められた保管義務がある場合を除き、削除または匿名化されます。</p>
<p>具体的な保管期間は、データの種類および本人との関係（現在の顧客、元顧客、応募者、取引先など）に応じて異なる場合があります。</p>`,
  },
}

export function getDocumentoDictionary(locale: DocLocale): Record<string, string> {
  return {
    ...titles[locale],
    ...cta[locale],
    ...regulamentosHtml[locale],
    ...privacidadeHtml[locale],
  }
}
