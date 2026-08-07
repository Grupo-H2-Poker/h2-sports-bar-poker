/**
 * Pack CMS — página Jackpot.
 * Chaves = constantes exportadas de `mock-jackpot.ts` (evita drift).
 */
import type { CmsPack } from '../types'
import {
  JACKPOT_CELL_100_ACUM,
  JACKPOT_CELL_1X,
  JACKPOT_CELL_20_ACUM,
  JACKPOT_CELL_2X,
  JACKPOT_CELL_50_ACUM,
  JACKPOT_CELL_5X,
  JACKPOT_CELL_GIRA,
  JACKPOT_CELL_GIRA_50,
  JACKPOT_COL_JOGOS,
  JACKPOT_COL_MESAS_1_2,
  JACKPOT_COL_MESAS_5_10,
  JACKPOT_COL_MESAS_5_5,
  JACKPOT_COL_PREMIOS,
  JACKPOT_COMO_PARTICIPAR_DESC,
  JACKPOT_COMO_PARTICIPAR_TITLE,
  JACKPOT_CTA_REGULAMENTO,
  JACKPOT_MAO_QUADRA,
  JACKPOT_MAO_ROYAL_ESPADAS,
  JACKPOT_MAO_ROYAL_FLUSH,
  JACKPOT_MAO_ROYAL_PAUS,
  JACKPOT_MAO_STRAIGHT_FLUSH,
  JACKPOT_NOTA_1,
  JACKPOT_NOTA_2,
  JACKPOT_O_QUE_E_DESC,
  JACKPOT_O_QUE_E_DESC_2,
  JACKPOT_O_QUE_E_TITLE,
  JACKPOT_PREMIOS_TITLE,
  JACKPOT_PROGRESSIVOS_DESC,
  JACKPOT_PROGRESSIVOS_DESC_2,
  JACKPOT_PROGRESSIVOS_TITLE,
  JACKPOT_RODA_DESC,
  JACKPOT_RODA_TITLE,
} from '../../mock-jackpot'

const pack = {
  en: {
    [JACKPOT_O_QUE_E_TITLE]: 'What is the Jackpot?',
    [JACKPOT_O_QUE_E_DESC]:
      'The JACKPOT is a special MEGA progressive* and ongoing program where\nvalues accumulate with every hand at the Cash Game tables.',
    [JACKPOT_O_QUE_E_DESC_2]:
      'Any player who hits a winning hand is awarded an instant prize\nor a percentage of the accumulated value.',
    [JACKPOT_PROGRESSIVOS_TITLE]: 'Progressive Jackpots',
    [JACKPOT_PROGRESSIVOS_DESC]:
      'Progressive games are calculated from a percentage of each betting round, according to the criteria set in the rules, adding an amount taken from the POT to the accumulated prize.',
    [JACKPOT_PROGRESSIVOS_DESC_2]:
      'The more players at the table, the higher the overall JACKPOTS. The accumulated JACKPOT value can grow exponentially, making the promotion even more exciting.',
    [JACKPOT_CTA_REGULAMENTO]: 'See full rules',
    [JACKPOT_COMO_PARTICIPAR_TITLE]: 'How to play?',
    [JACKPOT_COMO_PARTICIPAR_DESC]:
      'By playing Texas Hold\'em or Omaha at the Cash Game tables of H2 Sports Bar & Poker, the player who hits one of the combinations below may receive an instant prize or spin the Wheel of Fortune.',
    [JACKPOT_MAO_ROYAL_ESPADAS]: 'Royal of Spades',
    [JACKPOT_MAO_ROYAL_PAUS]: 'Royal of Clubs',
    [JACKPOT_MAO_ROYAL_FLUSH]: 'Royal Flush',
    [JACKPOT_MAO_STRAIGHT_FLUSH]: 'Straight Flush',
    [JACKPOT_MAO_QUADRA]: 'Four of a Kind (pair of the day)',
    [JACKPOT_RODA_TITLE]: 'Wheel of Fortune',
    [JACKPOT_RODA_DESC]:
      'By hitting a <strong>Winning Hand</strong> that grants a spin<br>of the <strong>Wheel of Fortune</strong>, you compete for <strong>20%</strong> to <strong>100%</strong> of<br>the <strong>Accumulated Value</strong> and fixed prizes from <strong>2k</strong> to <strong>5k</strong>.',
    [JACKPOT_PREMIOS_TITLE]: 'Prizes',
    [JACKPOT_COL_JOGOS]: 'Winning hands',
    [JACKPOT_COL_MESAS_1_2]: 'Tables 1/2 - 2/2',
    [JACKPOT_COL_MESAS_5_5]: 'Tables 5/5',
    [JACKPOT_COL_MESAS_5_10]: 'Tables 5/10+',
    [JACKPOT_COL_PREMIOS]: 'Prizes',
    [JACKPOT_CELL_GIRA_50]: 'Spin the Wheel (50%)',
    [JACKPOT_CELL_GIRA]: 'Spin the Wheel',
    [JACKPOT_CELL_5X]: '5x prize (fixed value)',
    [JACKPOT_CELL_2X]: '2x prize',
    [JACKPOT_CELL_1X]: '1x prize',
    [JACKPOT_CELL_20_ACUM]: '20% accumulated',
    [JACKPOT_CELL_50_ACUM]: '50% accumulated',
    [JACKPOT_CELL_100_ACUM]: '100% accumulated',
    [JACKPOT_NOTA_1]:
      '*Accumulated value is variable and is always updated and displayed on the club\'s electronic board.',
    [JACKPOT_NOTA_2]:
      '** Games with 1/2 and 2/2 blinds spin the wheel of fortune at 50% of the table, including accumulated values.',
  },
  es: {
    [JACKPOT_O_QUE_E_TITLE]: '¿Qué es el Jackpot?',
    [JACKPOT_O_QUE_E_DESC]:
      'El JACKPOT es un programa MEGA especial, progresivo* y continuo en el que los\nvalores se acumulan en cada partida en las mesas de Cash Game.',
    [JACKPOT_O_QUE_E_DESC_2]:
      'Cualquier jugador que acierte la mano premiada será premiado con un\npremio instantáneo o un porcentaje del valor acumulado.',
    [JACKPOT_PROGRESSIVOS_TITLE]: 'Jackpots progresivos',
    [JACKPOT_PROGRESSIVOS_DESC]:
      'Los juegos progresivos se calculan a partir de un porcentaje de cada ronda de apuesta, según los criterios del reglamento, sumando un valor retirado del POT al premio acumulado.',
    [JACKPOT_PROGRESSIVOS_DESC_2]:
      'Cuantos más jugadores haya en juego, más altos serán los JACKPOTS generales. El valor acumulado del JACKPOT puede aumentar de forma exponencial, haciendo la promoción aún más emocionante.',
    [JACKPOT_CTA_REGULAMENTO]: 'Ver reglamento completo',
    [JACKPOT_COMO_PARTICIPAR_TITLE]: '¿Cómo participar?',
    [JACKPOT_COMO_PARTICIPAR_DESC]:
      'Jugando Texas Hold\'em u Omaha en las mesas de Cash Game de H2 Sports Bar & Poker, el jugador que salga con una de las combinaciones abajo puede ser premiado con un premio instantáneo o girar la Rueda de la Fortuna.',
    [JACKPOT_MAO_ROYAL_ESPADAS]: 'Royal de Espadas',
    [JACKPOT_MAO_ROYAL_PAUS]: 'Royal de Tréboles',
    [JACKPOT_MAO_ROYAL_FLUSH]: 'Royal Flush',
    [JACKPOT_MAO_STRAIGHT_FLUSH]: 'Straight Flush',
    [JACKPOT_MAO_QUADRA]: 'Póker (par del día)',
    [JACKPOT_RODA_TITLE]: 'Rueda de la Fortuna',
    [JACKPOT_RODA_DESC]:
      'Acertando una <strong>Mano Premiada</strong> que da derecho a girar<br>la <strong>Rueda de la Fortuna</strong>, compites de <strong>20%</strong> a <strong>100%</strong> del<br><strong>Valor Acumulado</strong> y valores fijos de <strong>2k</strong> a <strong>5k</strong>.',
    [JACKPOT_PREMIOS_TITLE]: 'Premios',
    [JACKPOT_COL_JOGOS]: 'Juegos premiados',
    [JACKPOT_COL_MESAS_1_2]: 'Mesas 1/2 - 2/2',
    [JACKPOT_COL_MESAS_5_5]: 'Mesas 5/5',
    [JACKPOT_COL_MESAS_5_10]: 'Mesas 5/10+',
    [JACKPOT_COL_PREMIOS]: 'Premios',
    [JACKPOT_CELL_GIRA_50]: 'Gira la Rueda (50%)',
    [JACKPOT_CELL_GIRA]: 'Gira la Rueda',
    [JACKPOT_CELL_5X]: '5x premio (valor fijo)',
    [JACKPOT_CELL_2X]: '2x premio',
    [JACKPOT_CELL_1X]: '1x premio',
    [JACKPOT_CELL_20_ACUM]: '20% acumulado',
    [JACKPOT_CELL_50_ACUM]: '50% acumulado',
    [JACKPOT_CELL_100_ACUM]: '100% acumulado',
    [JACKPOT_NOTA_1]:
      '*El valor acumulado es variable y siempre se actualiza y divulga en el panel electrónico del club.',
    [JACKPOT_NOTA_2]:
      '** Los juegos con blinds de 1/2 y 2/2 giran la rueda de la fortuna valiendo el 50% de la tabla, inclusive de los valores acumulados.',
  },
  zh: {
    [JACKPOT_O_QUE_E_TITLE]: '什么是 Jackpot？',
    [JACKPOT_O_QUE_E_DESC]:
      'JACKPOT 是一项特别的 MEGA 渐进式*持续计划，\n现金桌每打一手牌，奖金都会累积。',
    [JACKPOT_O_QUE_E_DESC_2]:
      '任何打出中奖牌型的玩家，\n都将获得即时奖金或累积奖池的一定比例。',
    [JACKPOT_PROGRESSIVOS_TITLE]: '渐进式 Jackpot',
    [JACKPOT_PROGRESSIVOS_DESC]:
      '渐进式游戏按每轮下注的一定比例计算，依据规则从底池（POT）中抽取金额加入累积奖池。',
    [JACKPOT_PROGRESSIVOS_DESC_2]:
      '桌上玩家越多，整体 JACKPOT 越高。累积奖金可呈指数增长，让活动更加刺激。',
    [JACKPOT_CTA_REGULAMENTO]: '查看完整规则',
    [JACKPOT_COMO_PARTICIPAR_TITLE]: '如何参与？',
    [JACKPOT_COMO_PARTICIPAR_DESC]:
      '在 H2 Sports Bar & Poker 的现金桌玩德州扑克或奥马哈，打出下列组合之一的玩家，可获得即时奖金或转动幸运轮盘。',
    [JACKPOT_MAO_ROYAL_ESPADAS]: '黑桃皇家同花顺',
    [JACKPOT_MAO_ROYAL_PAUS]: '梅花皇家同花顺',
    [JACKPOT_MAO_ROYAL_FLUSH]: '皇家同花顺',
    [JACKPOT_MAO_STRAIGHT_FLUSH]: '同花顺',
    [JACKPOT_MAO_QUADRA]: '四条（当日对子）',
    [JACKPOT_RODA_TITLE]: '幸运轮盘',
    [JACKPOT_RODA_DESC]:
      '打出可转动幸运轮盘的<strong>中奖牌型</strong>后，<br>你可争夺累积奖池的 <strong>20%</strong> 至 <strong>100%</strong>，<br>以及 <strong>2k</strong> 至 <strong>5k</strong> 的固定奖金。',
    [JACKPOT_PREMIOS_TITLE]: '奖金',
    [JACKPOT_COL_JOGOS]: '中奖牌型',
    [JACKPOT_COL_MESAS_1_2]: '1/2 - 2/2 桌',
    [JACKPOT_COL_MESAS_5_5]: '5/5 桌',
    [JACKPOT_COL_MESAS_5_10]: '5/10+ 桌',
    [JACKPOT_COL_PREMIOS]: '奖金',
    [JACKPOT_CELL_GIRA_50]: '转轮盘（50%）',
    [JACKPOT_CELL_GIRA]: '转轮盘',
    [JACKPOT_CELL_5X]: '5 倍奖金（固定值）',
    [JACKPOT_CELL_2X]: '2 倍奖金',
    [JACKPOT_CELL_1X]: '1 倍奖金',
    [JACKPOT_CELL_20_ACUM]: '累积奖池 20%',
    [JACKPOT_CELL_50_ACUM]: '累积奖池 50%',
    [JACKPOT_CELL_100_ACUM]: '累积奖池 100%',
    [JACKPOT_NOTA_1]:
      '*累积金额可变，并将始终在俱乐部电子屏上更新并公布。',
    [JACKPOT_NOTA_2]:
      '**盲注为 1/2 与 2/2 的牌局，幸运轮盘按表中金额的 50% 计算，包括累积奖池。',
  },
  ja: {
    [JACKPOT_O_QUE_E_TITLE]: 'ジャックポットとは？',
    [JACKPOT_O_QUE_E_DESC]:
      'JACKPOT は特別な MEGA プログレッシブ*の継続プログラムで、\nキャッシュゲームのテーブルでハンドごとに賞金が積み上がります。',
    [JACKPOT_O_QUE_E_DESC_2]:
      'プリミアムハンドを当てたプレイヤーは、\n即時賞金または累積額の一定割合を獲得します。',
    [JACKPOT_PROGRESSIVOS_TITLE]: 'プログレッシブ・ジャックポット',
    [JACKPOT_PROGRESSIVOS_DESC]:
      'プログレッシブは各ベッティングラウンドの一定割合から計算され、規則に従ってポットから差し引かれた額が累積賞金に加算されます。',
    [JACKPOT_PROGRESSIVOS_DESC_2]:
      'テーブルのプレイヤーが多いほど、全体の JACKPOT は高くなります。累積額は指数関数的に増え、プロモーションをさらに盛り上げます。',
    [JACKPOT_CTA_REGULAMENTO]: '完全な規則を見る',
    [JACKPOT_COMO_PARTICIPAR_TITLE]: '参加方法は？',
    [JACKPOT_COMO_PARTICIPAR_DESC]:
      'H2 Sports Bar & Poker のキャッシュゲームでテキサスホールデムまたはオマハをプレイし、下記の組み合わせのいずれかで上がったプレイヤーは、即時賞金または運命のルーレットを回す権利を得られます。',
    [JACKPOT_MAO_ROYAL_ESPADAS]: 'スペードのロイヤル',
    [JACKPOT_MAO_ROYAL_PAUS]: 'クラブのロイヤル',
    [JACKPOT_MAO_ROYAL_FLUSH]: 'ロイヤルフラッシュ',
    [JACKPOT_MAO_STRAIGHT_FLUSH]: 'ストレートフラッシュ',
    [JACKPOT_MAO_QUADRA]: 'フォーカード（当日のペア）',
    [JACKPOT_RODA_TITLE]: '運命のルーレット',
    [JACKPOT_RODA_DESC]:
      '運命のルーレットを回せる<strong>プリミアムハンド</strong>を当てると、<br>累積額の <strong>20%</strong>〜<strong>100%</strong>、および <strong>2k</strong>〜<strong>5k</strong> の<br>固定賞金を争えます。',
    [JACKPOT_PREMIOS_TITLE]: '賞金',
    [JACKPOT_COL_JOGOS]: '対象ハンド',
    [JACKPOT_COL_MESAS_1_2]: 'テーブル 1/2 - 2/2',
    [JACKPOT_COL_MESAS_5_5]: 'テーブル 5/5',
    [JACKPOT_COL_MESAS_5_10]: 'テーブル 5/10+',
    [JACKPOT_COL_PREMIOS]: '賞金',
    [JACKPOT_CELL_GIRA_50]: 'ルーレット（50%）',
    [JACKPOT_CELL_GIRA]: 'ルーレット',
    [JACKPOT_CELL_5X]: '5倍賞金（固定額）',
    [JACKPOT_CELL_2X]: '2倍賞金',
    [JACKPOT_CELL_1X]: '1倍賞金',
    [JACKPOT_CELL_20_ACUM]: '累積の 20%',
    [JACKPOT_CELL_50_ACUM]: '累積の 50%',
    [JACKPOT_CELL_100_ACUM]: '累積の 100%',
    [JACKPOT_NOTA_1]:
      '*累積額は変動し、クラブの電子ボードで常に更新・公開されます。',
    [JACKPOT_NOTA_2]:
      '**ブラインド 1/2 および 2/2 のゲームでは、運命のルーレットは表の 50%（累積額を含む）で回ります。',
  },
} satisfies CmsPack

export default pack
