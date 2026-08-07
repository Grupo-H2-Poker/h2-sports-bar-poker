/**
 * Pack CMS — página Quem somos (`sobre`).
 * Chaves = constantes exportadas de `mock-sobre.ts` (evita drift).
 */
import type { CmsPack } from '../types'
import {
  SOBRE_COMECOU_DESC,
  SOBRE_COMECOU_DESC_2,
  SOBRE_COMECOU_TITLE,
  SOBRE_CTA_ONLINE,
  SOBRE_CTA_UNIDADE,
  SOBRE_CTA_UNIQUE,
  SOBRE_LEGADO_DESC,
  SOBRE_LEGADO_DESC_2,
  SOBRE_LEGADO_DESC_3,
  SOBRE_LEGADO_TITLE,
  SOBRE_UNIQUE_DESC,
  SOBRE_UNIQUE_TITLE,
  SOBRE_UNIDADE_BH,
  SOBRE_UNIDADE_BH_DESC,
  SOBRE_UNIDADE_CAMPINAS,
  SOBRE_UNIDADE_CAMPINAS_DESC,
  SOBRE_UNIDADE_CURITIBA,
  SOBRE_UNIDADE_CURITIBA_DESC,
  SOBRE_UNIDADE_ONLINE,
  SOBRE_UNIDADE_ONLINE_DESC,
  SOBRE_UNIDADE_SP,
  SOBRE_UNIDADE_SP_DESC,
  SOBRE_UNIDADES_DESC,
  SOBRE_UNIDADES_TITLE,
} from '../../mock-sobre'

const pack = {
  en: {
    [SOBRE_LEGADO_TITLE]: 'From a dream, a legacy in Brazilian poker is born',
    [SOBRE_LEGADO_DESC]:
      'In a country with 12 million players passionate about poker, a dream took shape, purpose and identity. A dream that crossed tables, generations and borders, helping build the history of poker in Brazil.',
    [SOBRE_LEGADO_DESC_2]:
      'With pioneering spirit, professionalism and credibility built over 20 years, H2 has established itself as one of the main references in national poker.',
    [SOBRE_LEGADO_DESC_3]:
      'Today, Grupo H2 is recognized as one of the leading poker players in Latin America — the result of a dream that became history, community and legacy.',
    [SOBRE_COMECOU_TITLE]: 'How it started',
    [SOBRE_COMECOU_DESC]:
      'The journey began in 2006, when a group of friends decided to create a professional, structured and welcoming space for poker. That is how Grêmio Recreativo Social e Cultural Hold\'em was born, evolving over the years into H2 Sports Bar & Poker.',
    [SOBRE_COMECOU_DESC_2]:
      'Along the way, H2 started promoting renowned championships and circuits such as CPH, while continuously investing in new players through H2school, the group\'s poker school.',
    [SOBRE_UNIDADES_TITLE]: 'Our Clubs',
    [SOBRE_UNIDADES_DESC]:
      'With four physical clubs in São Paulo, Campinas, Curitiba and Belo Horizonte, the group strengthens its national presence. And with H2online, the game goes even further, connecting people across Brazil.',
    [SOBRE_CTA_UNIDADE]: 'Visit the club',
    [SOBRE_CTA_ONLINE]: 'Discover H2online',
    [SOBRE_UNIDADE_SP]: 'São Paulo',
    [SOBRE_UNIDADE_SP_DESC]: 'The largest poker club in Latin America',
    [SOBRE_UNIDADE_CAMPINAS]: 'Campinas',
    [SOBRE_UNIDADE_CAMPINAS_DESC]: 'The club that elevated poker in Campinas and the region.',
    [SOBRE_UNIDADE_CURITIBA]: 'Curitiba',
    [SOBRE_UNIDADE_CURITIBA_DESC]: 'The best poker club in Curitiba',
    [SOBRE_UNIDADE_BH]: 'Belo Horizonte',
    [SOBRE_UNIDADE_BH_DESC]: 'A fresh take on poker.',
    [SOBRE_UNIDADE_ONLINE]: 'H2online',
    [SOBRE_UNIDADE_ONLINE_DESC]: 'Play 24 hours a day!',
    [SOBRE_UNIQUE_TITLE]: 'H2unique: Exclusivity at the table',
    [SOBRE_UNIQUE_DESC]:
      'This is where new tables, new perspectives and a new concept emerge: H2unique, whose main trait is bringing together a select group of players to experience true exclusivity at the table.',
    [SOBRE_CTA_UNIQUE]: 'Discover H2unique',
  },
  es: {
    [SOBRE_LEGADO_TITLE]: 'De un sueño nace un legado en el póker brasileño',
    [SOBRE_LEGADO_DESC]:
      'En un país con 12 millones de jugadores apasionados por el póker, un sueño tomó forma, propósito e identidad. Un sueño que cruzó mesas, generaciones y fronteras, ayudando a construir la historia del póker en Brasil.',
    [SOBRE_LEGADO_DESC_2]:
      'Con pionerismo, profesionalismo y credibilidad construidos a lo largo de 20 años, H2 se consolidó como una de las principales referencias del póker nacional.',
    [SOBRE_LEGADO_DESC_3]:
      'Hoy, el Grupo H2 es reconocido como uno de los principales players del segmento de póker en América Latina, resultado de un sueño que se transformó en historia, comunidad y legado.',
    [SOBRE_COMECOU_TITLE]: 'Cómo empezó',
    [SOBRE_COMECOU_DESC]:
      'La trayectoria comenzó en 2006, cuando un grupo de amigos decidió crear un espacio profesional, estructurado y acogedor para la práctica del póker. Así nació el Grêmio Recreativo Social e Cultural Hold\'em, que evolucionó hasta convertirse en H2 Sports Bar & Poker.',
    [SOBRE_COMECOU_DESC_2]:
      'A lo largo del camino, H2 pasó a promover campeonatos y circuitos consagrados, como el CPH, además de invertir continuamente en la formación de nuevos jugadores a través de H2school, la escuela de póker del grupo.',
    [SOBRE_UNIDADES_TITLE]: 'Nuestras Unidades',
    [SOBRE_UNIDADES_DESC]:
      'Con cuatro clubes físicos en São Paulo, Campinas, Curitiba y Belo Horizonte, el grupo fortalece su presencia nacional. Y con H2online, lleva el juego aún más lejos, conectando personas de todo Brasil.',
    [SOBRE_CTA_UNIDADE]: 'Conoce la unidad',
    [SOBRE_CTA_ONLINE]: 'Conoce H2online',
    [SOBRE_UNIDADE_SP]: 'São Paulo',
    [SOBRE_UNIDADE_SP_DESC]: 'El mayor club de póker de América Latina',
    [SOBRE_UNIDADE_CAMPINAS]: 'Campinas',
    [SOBRE_UNIDADE_CAMPINAS_DESC]: 'El club que elevó el póker en Campinas y la región.',
    [SOBRE_UNIDADE_CURITIBA]: 'Curitiba',
    [SOBRE_UNIDADE_CURITIBA_DESC]: 'El mejor club de póker de Curitiba',
    [SOBRE_UNIDADE_BH]: 'Belo Horizonte',
    [SOBRE_UNIDADE_BH_DESC]: 'Nuevos aires para el póker.',
    [SOBRE_UNIDADE_ONLINE]: 'H2online',
    [SOBRE_UNIDADE_ONLINE_DESC]: '¡Juega las 24 horas!',
    [SOBRE_UNIQUE_TITLE]: 'H2unique: Exclusividad en la mesa',
    [SOBRE_UNIQUE_DESC]:
      'En ese escenario surgen nuevas mesas, nuevas miradas y un nuevo concepto: H2unique, cuya principal característica es reunir a un selecto grupo de jugadores para vivir, en la mesa, la verdadera experiencia de la exclusividad.',
    [SOBRE_CTA_UNIQUE]: 'Conoce H2unique',
  },
  zh: {
    [SOBRE_LEGADO_TITLE]: '从一个梦想，诞生巴西扑克的传奇',
    [SOBRE_LEGADO_DESC]:
      '在一个拥有 1200 万扑克爱好者的国家，一个梦想有了形状、目标与身份。它穿越牌桌、世代与边界，助力书写巴西扑克的历史。',
    [SOBRE_LEGADO_DESC_2]:
      '凭借 20 年积累的开创精神、专业素养与信誉，H2 已成为国内扑克的重要标杆之一。',
    [SOBRE_LEGADO_DESC_3]:
      '如今，H2 集团被公认为拉丁美洲扑克领域的主要参与者之一——一个梦想化为历史、社群与传承。',
    [SOBRE_COMECOU_TITLE]: '起步之路',
    [SOBRE_COMECOU_DESC]:
      '故事始于 2006 年：一群朋友决定打造一个专业、完善且友好的扑克空间。于是诞生了 Grêmio Recreativo Social e Cultural Hold\'em，并逐步发展为 H2 Sports Bar & Poker。',
    [SOBRE_COMECOU_DESC_2]:
      '一路走来，H2 开始举办 CPH 等知名赛事与巡回赛，并通过集团扑克学校 H2school 持续培养新玩家。',
    [SOBRE_UNIDADES_TITLE]: '我们的场馆',
    [SOBRE_UNIDADES_DESC]:
      '集团在圣保罗、坎皮纳斯、库里蒂巴和贝洛奥里藏特拥有四家实体俱乐部，巩固全国布局；并通过 H2online 将游戏延伸得更远，连接全巴西的玩家。',
    [SOBRE_CTA_UNIDADE]: '了解场馆',
    [SOBRE_CTA_ONLINE]: '了解 H2online',
    [SOBRE_UNIDADE_SP]: '圣保罗',
    [SOBRE_UNIDADE_SP_DESC]: '拉丁美洲最大的扑克俱乐部',
    [SOBRE_UNIDADE_CAMPINAS]: '坎皮纳斯',
    [SOBRE_UNIDADE_CAMPINAS_DESC]: '提升坎皮纳斯及周边扑克水平的俱乐部。',
    [SOBRE_UNIDADE_CURITIBA]: '库里蒂巴',
    [SOBRE_UNIDADE_CURITIBA_DESC]: '库里蒂巴最好的扑克俱乐部',
    [SOBRE_UNIDADE_BH]: '贝洛奥里藏特',
    [SOBRE_UNIDADE_BH_DESC]: '扑克的新气象。',
    [SOBRE_UNIDADE_ONLINE]: 'H2online',
    [SOBRE_UNIDADE_ONLINE_DESC]: '全天 24 小时畅玩！',
    [SOBRE_UNIQUE_TITLE]: 'H2unique：牌桌上的专属体验',
    [SOBRE_UNIQUE_DESC]:
      '在此背景下，新的牌桌、新的视角与新的理念应运而生：H2unique，其核心是汇聚精选玩家，在牌桌上感受真正的专属体验。',
    [SOBRE_CTA_UNIQUE]: '了解 H2unique',
  },
  ja: {
    [SOBRE_LEGADO_TITLE]: '夢から生まれた、ブラジル・ポーカーのレガシー',
    [SOBRE_LEGADO_DESC]:
      'ポーカーを愛する1,200万人のプレイヤーがいる国で、夢は形と目的、そしてアイデンティティを得ました。テーブル、世代、国境を越え、ブラジル・ポーカーの歴史づくりを支えてきた夢です。',
    [SOBRE_LEGADO_DESC_2]:
      '20年にわたるパイオニア精神、プロフェッショナリズム、信頼により、H2は国内ポーカーの主要拠点のひとつとして確立されました。',
    [SOBRE_LEGADO_DESC_3]:
      '今日、Grupo H2はラテンアメリカのポーカー分野における主要プレイヤーのひとつとして認められています。夢が歴史、コミュニティ、レガシーへと変わった結果です。',
    [SOBRE_COMECOU_TITLE]: 'はじまり',
    [SOBRE_COMECOU_DESC]:
      '物語は2006年、友人たちがポーカーのためのプロフェッショナルで構造的、かつ温かい場をつくろうと決めたことから始まりました。こうして Grêmio Recreativo Social e Cultural Hold\'em が生まれ、年月を経て H2 Sports Bar & Poker へと進化しました。',
    [SOBRE_COMECOU_DESC_2]:
      'その歩みの中で、H2はCPHなどの名高いチャンピオンシップやサーキットを開催し、グループのポーカー学校 H2school を通じて新しいプレイヤーの育成にも投資し続けています。',
    [SOBRE_UNIDADES_TITLE]: 'クラブ一覧',
    [SOBRE_UNIDADES_DESC]:
      'サンパウロ、カンピーナス、クリチバ、ベロオリゾンテに4つの実店舗クラブを構え、全国的な存在感を強めています。さらに H2online により、ゲームはさらに遠くまで届き、ブラジル全土の人々をつなぎます。',
    [SOBRE_CTA_UNIDADE]: 'クラブを見る',
    [SOBRE_CTA_ONLINE]: 'H2onlineを見る',
    [SOBRE_UNIDADE_SP]: 'サンパウロ',
    [SOBRE_UNIDADE_SP_DESC]: 'ラテンアメリカ最大のポーカークラブ',
    [SOBRE_UNIDADE_CAMPINAS]: 'カンピーナス',
    [SOBRE_UNIDADE_CAMPINAS_DESC]: 'カンピーナスとその周辺のポーカーを高めたクラブ。',
    [SOBRE_UNIDADE_CURITIBA]: 'クリチバ',
    [SOBRE_UNIDADE_CURITIBA_DESC]: 'クリチバ最高のポーカークラブ',
    [SOBRE_UNIDADE_BH]: 'ベロオリゾンテ',
    [SOBRE_UNIDADE_BH_DESC]: 'ポーカーに新しい風を。',
    [SOBRE_UNIDADE_ONLINE]: 'H2online',
    [SOBRE_UNIDADE_ONLINE_DESC]: '24時間プレイ！',
    [SOBRE_UNIQUE_TITLE]: 'H2unique：テーブルの特別体験',
    [SOBRE_UNIQUE_DESC]:
      'そこから新しいテーブル、新しい視点、そして新しいコンセプトが生まれます。H2unique。厳選されたプレイヤーが集まり、テーブルで真の特別体験を生きることが最大の特徴です。',
    [SOBRE_CTA_UNIQUE]: 'H2uniqueを知る',
  },
} satisfies CmsPack

export default pack
