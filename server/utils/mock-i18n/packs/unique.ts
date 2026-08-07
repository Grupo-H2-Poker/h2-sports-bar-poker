/**
 * Pack CMS — página H2 Unique (`unique`).
 * Chaves = constantes exportadas de `mock-unique.ts` (evita drift).
 */
import type { CmsPack } from '../types'
import {
  UNIQUE_CTA_SAIBA,
  UNIQUE_DESTINO_BROWNS,
  UNIQUE_DESTINO_FAZENDA,
  UNIQUE_DESTINO_LALENAS,
  UNIQUE_DESTINO_ROCAS,
  UNIQUE_DESTINO_TETTO,
  UNIQUE_DESTINOS_DESC,
  UNIQUE_DESTINOS_TITLE,
  UNIQUE_INTRO_DESC,
  UNIQUE_INTRO_TITLE,
  UNIQUE_MAJESTIC_DESC,
  UNIQUE_MAJESTIC_TITLE,
  UNIQUE_TOUR_ATIBAIA,
  UNIQUE_TOUR_ATIBAIA_DESC,
  UNIQUE_TOUR_ATIBAIA_TITLE,
  UNIQUE_TOUR_EYEBROW,
  UNIQUE_TOUR_GUARUJA,
  UNIQUE_TOUR_GUARUJA_DESC,
  UNIQUE_TOUR_GUARUJA_TITLE,
} from '../../mock-unique'

const pack = {
  en: {
    [UNIQUE_INTRO_TITLE]: 'The game that goes beyond the cards',
    [UNIQUE_INTRO_DESC]:
      'H2unique was born with a clear purpose: deliver poker experiences for those who play seriously. Here it is not only about playing — it is about living the game at its highest level, in a sophisticated environment, with outstanding dining and a standard that reflects the greatness of every table. In more than 10 years, over 50 million have been raised — the result of a solid, reliable operation built for those who demand the best.',
    [UNIQUE_MAJESTIC_TITLE]: 'Majestic',
    [UNIQUE_MAJESTIC_DESC]:
      'Majestic is not for everyone — it is for those who understand the value of the game. Here power is at the table, but above all in the prize. A differentiated prize pool, worthy of players who do not just compete — they dominate. Every chip means decision, reading and courage — and every win carries a return matching the challenge. The buy-in follows the same logic: for those who see poker as an investment. For those who know great results demand great moves.',
    [UNIQUE_TOUR_EYEBROW]: 'Unique Poker Tour',
    [UNIQUE_TOUR_GUARUJA]: 'Guarujá',
    [UNIQUE_TOUR_GUARUJA_TITLE]: 'Unique Poker Tour\nGuarujá',
    [UNIQUE_TOUR_GUARUJA_DESC]:
      'Poker took over the sands of Casa Grande Hotel Resort & Spa, a 5-star resort that blends the elegance of Brazilian colonial architecture with comfort and modernity.',
    [UNIQUE_TOUR_ATIBAIA]: 'Atibaia',
    [UNIQUE_TOUR_ATIBAIA_TITLE]: 'Unique Poker Tour\nAtibaia',
    [UNIQUE_TOUR_ATIBAIA_DESC]:
      'At the imposing Bourbon Atibaia Resort, one of the largest resorts in South America, Unique Poker Tour 5th edition found the perfect stage to go beyond the game.',
    [UNIQUE_CTA_SAIBA]: 'Learn more',
    [UNIQUE_DESTINOS_TITLE]: 'More than\na game',
    [UNIQUE_DESTINOS_DESC]:
      'Unique brings poker to\nBrazil\'s most iconic destinations',
    [UNIQUE_DESTINO_ROCAS]: 'Rocas do Vouga',
    [UNIQUE_DESTINO_LALENAS]: 'La Leñas',
    [UNIQUE_DESTINO_BROWNS]: 'Browns Singular Man',
    [UNIQUE_DESTINO_TETTO]: 'Tetto Rooftop Lounge',
    [UNIQUE_DESTINO_FAZENDA]: 'Fazenda Churrascada',
  },
  es: {
    [UNIQUE_INTRO_TITLE]: 'El juego que va más allá de las cartas',
    [UNIQUE_INTRO_DESC]:
      'H2unique nació con un propósito claro: entregar experiencias de póker para quien realmente juega en serio. Aquí no se trata solo de jugar: es vivir el juego en su máximo nivel, en un ambiente sofisticado, con gastronomía de excelencia y un estándar que refleja la grandeza de cada mesa. En más de 10 años, ya se recaudaron más de 50 millones, resultado de una operación sólida, confiable y hecha para quien exige lo mejor.',
    [UNIQUE_MAJESTIC_TITLE]: 'Majestic',
    [UNIQUE_MAJESTIC_DESC]:
      'Majestic no es para todos: es para quien entiende el valor del juego. Aquí el poder está en la mesa, pero sobre todo en el premio. Un prize pool diferenciado, a la altura de jugadores que no solo compiten: dominan. Cada ficha representa decisión, lectura y coraje — y cada victoria carga un retorno proporcional al desafío. El buy-in sigue la misma lógica: es para quien ve el póker como inversión. Para quien sabe que grandes resultados exigen grandes movimientos.',
    [UNIQUE_TOUR_EYEBROW]: 'Unique Poker Tour',
    [UNIQUE_TOUR_GUARUJA]: 'Guarujá',
    [UNIQUE_TOUR_GUARUJA_TITLE]: 'Unique Poker Tour\nGuarujá',
    [UNIQUE_TOUR_GUARUJA_DESC]:
      'El póker invadió las arenas del Casa Grande Hotel Resort & Spa, un resort 5 estrellas que combina la elegancia de la arquitectura colonial brasileña con el confort y la modernidad.',
    [UNIQUE_TOUR_ATIBAIA]: 'Atibaia',
    [UNIQUE_TOUR_ATIBAIA_TITLE]: 'Unique Poker Tour\nAtibaia',
    [UNIQUE_TOUR_ATIBAIA_DESC]:
      'En el imponente Bourbon Atibaia Resort, uno de los mayores resorts de América del Sur, Unique Poker Tour 5ª edición encontró el escenario perfecto para ir más allá del juego.',
    [UNIQUE_CTA_SAIBA]: 'Saber más',
    [UNIQUE_DESTINOS_TITLE]: 'Más que\nun juego',
    [UNIQUE_DESTINOS_DESC]:
      'Unique lleva el póker a\nlos destinos más icónicos de Brasil',
    [UNIQUE_DESTINO_ROCAS]: 'Rocas do Vouga',
    [UNIQUE_DESTINO_LALENAS]: 'La Leñas',
    [UNIQUE_DESTINO_BROWNS]: 'Browns Singular Man',
    [UNIQUE_DESTINO_TETTO]: 'Tetto Rooftop Lounge',
    [UNIQUE_DESTINO_FAZENDA]: 'Fazenda Churrascada',
  },
  zh: {
    [UNIQUE_INTRO_TITLE]: '超越纸牌的游戏',
    [UNIQUE_INTRO_DESC]:
      'H2unique 的诞生目标明确：为真正认真打牌的人提供扑克体验。这里不只是打牌，而是在精致环境中、以卓越餐饮与高标准，把游戏过到最高水平。十余年来已筹集超过五千万，源于稳健可靠、为追求极致者打造的运营。',
    [UNIQUE_MAJESTIC_TITLE]: 'Majestic',
    [UNIQUE_MAJESTIC_DESC]:
      'Majestic 并非人人适合——它属于懂得游戏价值的人。力量在牌桌上，更在奖池里。差异化的奖池配得上不只是竞争、而是要主宰的玩家。每一枚筹码代表决策、读牌与勇气——每一场胜利都带来与挑战相称的回报。买入遵循同样逻辑：把扑克当作投资的人；知道大结果需要大动作的人。',
    [UNIQUE_TOUR_EYEBROW]: 'Unique Poker Tour',
    [UNIQUE_TOUR_GUARUJA]: 'Guarujá',
    [UNIQUE_TOUR_GUARUJA_TITLE]: 'Unique Poker Tour\nGuarujá',
    [UNIQUE_TOUR_GUARUJA_DESC]:
      '扑克登陆 Casa Grande Hotel Resort & Spa 的沙滩——这座五星度假村将巴西殖民建筑的优雅与现代舒适融为一体。',
    [UNIQUE_TOUR_ATIBAIA]: 'Atibaia',
    [UNIQUE_TOUR_ATIBAIA_TITLE]: 'Unique Poker Tour\nAtibaia',
    [UNIQUE_TOUR_ATIBAIA_DESC]:
      '在南美最大度假村之一 Bourbon Atibaia Resort，Unique Poker Tour 第五届找到了超越牌局的完美舞台。',
    [UNIQUE_CTA_SAIBA]: '了解更多',
    [UNIQUE_DESTINOS_TITLE]: '不止是\n游戏',
    [UNIQUE_DESTINOS_DESC]:
      'Unique 把扑克带到\n巴西最具标志性的目的地',
    [UNIQUE_DESTINO_ROCAS]: 'Rocas do Vouga',
    [UNIQUE_DESTINO_LALENAS]: 'La Leñas',
    [UNIQUE_DESTINO_BROWNS]: 'Browns Singular Man',
    [UNIQUE_DESTINO_TETTO]: 'Tetto Rooftop Lounge',
    [UNIQUE_DESTINO_FAZENDA]: 'Fazenda Churrascada',
  },
  ja: {
    [UNIQUE_INTRO_TITLE]: 'カードを超えるゲーム',
    [UNIQUE_INTRO_DESC]:
      'H2uniqueは、本気でプレイする人のためのポーカー体験を届けるという明確な目的で生まれました。ここでは単に遊ぶだけでなく、洗練された空間、卓越した美食、そして各テーブルの格を映す基準のもと、ゲームを最高レベルで生きることです。10年以上で5,000万以上を集め、堅実で信頼できる運営の成果です。',
    [UNIQUE_MAJESTIC_TITLE]: 'Majestic',
    [UNIQUE_MAJESTIC_DESC]:
      'Majesticは万人向けではありません——ゲームの価値を知る人のためのものです。力はテーブルにありますが、何より賞金にあります。競うだけでなく支配するプレイヤーにふさわしい差別化されたプライズプール。チップ一枚が決断・読み・勇気を表し、勝利は挑戦に見合うリターンをもたらします。バイインも同じ論理：ポーカーを投資と見る人へ。大きな結果には大きな一手が必要だと知る人へ。',
    [UNIQUE_TOUR_EYEBROW]: 'Unique Poker Tour',
    [UNIQUE_TOUR_GUARUJA]: 'Guarujá',
    [UNIQUE_TOUR_GUARUJA_TITLE]: 'Unique Poker Tour\nGuarujá',
    [UNIQUE_TOUR_GUARUJA_DESC]:
      'ポーカーが Casa Grande Hotel Resort & Spa の砂浜を席巻。ブラジル植民地建築の優雅さと快適・モダンが融合する5つ星リゾートです。',
    [UNIQUE_TOUR_ATIBAIA]: 'Atibaia',
    [UNIQUE_TOUR_ATIBAIA_TITLE]: 'Unique Poker Tour\nAtibaia',
    [UNIQUE_TOUR_ATIBAIA_DESC]:
      '南米最大級のリゾートの一つ Bourbon Atibaia Resort で、Unique Poker Tour 第5回はゲームを超える完璧な舞台を見つけました。',
    [UNIQUE_CTA_SAIBA]: '詳しく見る',
    [UNIQUE_DESTINOS_TITLE]: 'ゲーム以上の\nもの',
    [UNIQUE_DESTINOS_DESC]:
      'Uniqueはブラジルを代表する\n名所へポーカーを届けます',
    [UNIQUE_DESTINO_ROCAS]: 'Rocas do Vouga',
    [UNIQUE_DESTINO_LALENAS]: 'La Leñas',
    [UNIQUE_DESTINO_BROWNS]: 'Browns Singular Man',
    [UNIQUE_DESTINO_TETTO]: 'Tetto Rooftop Lounge',
    [UNIQUE_DESTINO_FAZENDA]: 'Fazenda Churrascada',
  },
} satisfies CmsPack

export default pack
