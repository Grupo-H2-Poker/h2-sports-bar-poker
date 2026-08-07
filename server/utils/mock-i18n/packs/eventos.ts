/**
 * Pack CMS — página Eventos.
 * Chaves = constantes exportadas de `mock-eventos.ts` (evita drift).
 */
import type { CmsPack } from '../types'
import {
  EVENTOS_CTA_CONSULTORES,
  EVENTOS_CTA_FALE,
  EVENTOS_DEALERS,
  EVENTOS_DEPOIMENTO_AUTOR,
  EVENTOS_DEPOIMENTO_TITLE,
  EVENTOS_DIVERSIDADE_DESC,
  EVENTOS_DRINKS,
  EVENTOS_EQUIPE_DESC,
  EVENTOS_EQUIPE_TITLE,
  EVENTOS_ESPECIALISTAS_TITLE,
  EVENTOS_ESTRUTURA_DESC,
  EVENTOS_FIELD_EMAIL,
  EVENTOS_FIELD_NOME,
  EVENTOS_FIELD_TELEFONE,
  EVENTOS_FIELD_TIPO,
  EVENTOS_FORM_DESC,
  EVENTOS_FORM_NOTA,
  EVENTOS_FORM_SUBMIT,
  EVENTOS_FORM_TITLE,
  EVENTOS_HERO_DESC,
  EVENTOS_HERO_TITLE,
  EVENTOS_HOME_GAME_DESC,
  EVENTOS_MENU,
  EVENTOS_NUMEROS_SUB,
  EVENTOS_NUMEROS_TITLE,
  EVENTOS_OPT_ATIVACAO,
  EVENTOS_OPT_CORPORATIVO,
  EVENTOS_OPT_OUTRO,
  EVENTOS_PAIXAO_DESC,
  EVENTOS_SETOR_DESC,
  EVENTOS_TAGLINE,
  EVENTOS_TIPO_CORPORATIVOS,
} from '../../mock-eventos'

const pack = {
  en: {
    [EVENTOS_HERO_TITLE]: 'The reference in Events.\nAuthority in Poker.',
    [EVENTOS_HERO_DESC]:
      'Turn your corporate event into a setting that connects people, strengthens relationships, and delivers entertainment with purpose.',
    [EVENTOS_CTA_CONSULTORES]: 'Talk to our consultants',
    [EVENTOS_TIPO_CORPORATIVOS]: 'Corporate\nEvents',
    [EVENTOS_NUMEROS_TITLE]: 'Events in\nnumbers',
    [EVENTOS_NUMEROS_SUB]: 'events',
    [EVENTOS_ESPECIALISTAS_TITLE]: 'Specialists in making it happen',
    [EVENTOS_TAGLINE]: 'Where there\'s a game, there\'s H2 Sports Bar & Poker.',
    [EVENTOS_SETOR_DESC]:
      'The events division of H2 Sports Bar & Poker is where the game comes alive on and off the tables. With more than 20 years of credibility, H2 has become one of the leading references in Brazilian poker — delivering not only tournaments, but complete experiences for different audiences, formats, and settings.',
    [EVENTOS_DIVERSIDADE_DESC]:
      'Diversity is one of the pillars of this work. Corporate events, brand activations, special activations, social gatherings, and exclusive experiences: H2 understands each client\'s goal and turns ideas into tailored projects, always with a delivery standard that has become a benchmark in the industry.',
    [EVENTOS_HOME_GAME_DESC]:
      'And when it comes to taking the experience beyond the club, H2 raises the bar. With full home-game production (private events), poker comes to you — at your company, your home, or wherever you choose.\nProfessional infrastructure, a specialized team, and flawless execution ensure every detail works like a major poker event.',
    [EVENTOS_PAIXAO_DESC]:
      'More than organizing, H2 makes poker happen.\nWith consistency, quality, and passion for the game, it turns every table into a unique chance to experience the best of the mind sport.',
    [EVENTOS_ESTRUTURA_DESC]:
      'A structure that keeps pace with the country and the passion for poker.',
    [EVENTOS_DEALERS]: 'Professional\ndealers',
    [EVENTOS_DRINKS]: 'Exclusive\ndrinks',
    [EVENTOS_MENU]: 'Gastronomic\nmenu',
    [EVENTOS_DEPOIMENTO_TITLE]: 'Nice title!',
    [EVENTOS_DEPOIMENTO_AUTOR]: 'First and last name',
    [EVENTOS_EQUIPE_TITLE]: 'Our team',
    [EVENTOS_EQUIPE_DESC]:
      'A team of qualified professionals who live poker 24 hours a day, ensuring standard, pace, and excellence in every detail.',
    [EVENTOS_CTA_FALE]: 'Talk to us',
    'Equipe 1': 'Team 1',
    'Equipe 2': 'Team 2',
    'Equipe 3': 'Team 3',
    'Equipe 4': 'Team 4',
    [EVENTOS_FORM_TITLE]: 'Get in touch with\nour consultants',
    [EVENTOS_FORM_DESC]: 'Turn your corporate or personal event into',
    [EVENTOS_FORM_SUBMIT]: 'Send',
    [EVENTOS_FORM_NOTA]: '*All fields are required',
    [EVENTOS_FIELD_NOME]: 'Name',
    [EVENTOS_FIELD_TELEFONE]: 'Phone',
    [EVENTOS_FIELD_EMAIL]: 'E-mail',
    [EVENTOS_FIELD_TIPO]: 'Event type',
    [EVENTOS_OPT_CORPORATIVO]: 'Corporate event',
    [EVENTOS_OPT_ATIVACAO]: 'Brand activation',
    [EVENTOS_OPT_OUTRO]: 'Other',
  },
  es: {
    [EVENTOS_HERO_TITLE]: 'Referencia en Eventos.\nAutoridad en Poker.',
    [EVENTOS_HERO_DESC]:
      'Transforma tu evento corporativo en un ambiente que conecta personas, fortalece relaciones y ofrece entretenimiento con propósito.',
    [EVENTOS_CTA_CONSULTORES]: 'Habla con nuestros consultores',
    [EVENTOS_TIPO_CORPORATIVOS]: 'Eventos\ncorporativos',
    [EVENTOS_NUMEROS_TITLE]: 'Eventos en\nforma de números',
    [EVENTOS_NUMEROS_SUB]: 'eventos',
    [EVENTOS_ESPECIALISTAS_TITLE]: 'Especialistas en hacer que suceda',
    [EVENTOS_TAGLINE]: 'Donde hay juego, hay H2 Sports Bar & Poker.',
    [EVENTOS_SETOR_DESC]:
      'El sector de eventos de H2 Sports Bar & Poker es donde el juego cobra vida dentro y fuera de las mesas. Con más de 20 años de credibilidad, H2 se consolidó como una de las mayores referencias del póker brasileño, llevando no solo torneos, sino experiencias completas para distintos públicos, formatos y ambientes.',
    [EVENTOS_DIVERSIDADE_DESC]:
      'La diversidad es uno de los pilares de esta actuación. Eventos corporativos, acciones de marca, activaciones especiales, encuentros sociales y experiencias exclusivas: H2 entiende el objetivo de cada cliente y transforma ideas en proyectos a medida, siempre con un estándar de entrega que se convirtió en referencia del sector.',
    [EVENTOS_HOME_GAME_DESC]:
      'Y cuando se trata de llevar la experiencia más allá del club, H2 eleva el nivel. Con producción completa de home game (eventos particulares), el póker va hasta ti, ya sea en tu empresa, en tu casa o en cualquier lugar que elijas.\nEstructura profesional, equipo especializado y ejecución impecable garantizan que cada detalle funcione como un gran evento de póker.',
    [EVENTOS_PAIXAO_DESC]:
      'Más que organizar, H2 hace que el póker suceda.\nCon consistencia, calidad y pasión por el juego, transforma cada mesa en una oportunidad única de vivir lo mejor del universo del deporte de la mente.',
    [EVENTOS_ESTRUTURA_DESC]:
      'Una estructura que acompaña el ritmo del país y la pasión por el póker.',
    [EVENTOS_DEALERS]: 'Dealers\nprofesionales',
    [EVENTOS_DRINKS]: 'Drinks\nexclusivos',
    [EVENTOS_MENU]: 'Menú\ngastronómico',
    [EVENTOS_DEPOIMENTO_TITLE]: '¡Título bonito!',
    [EVENTOS_DEPOIMENTO_AUTOR]: 'Nombre y apellido',
    [EVENTOS_EQUIPE_TITLE]: 'Nuestro equipo',
    [EVENTOS_EQUIPE_DESC]:
      'Un equipo de profesionales cualificados que vive el póker las 24 horas, garantizando estándar, ritmo y excelencia en cada detalle.',
    [EVENTOS_CTA_FALE]: 'Habla con nosotros',
    'Equipe 1': 'Equipo 1',
    'Equipe 2': 'Equipo 2',
    'Equipe 3': 'Equipo 3',
    'Equipe 4': 'Equipo 4',
    [EVENTOS_FORM_TITLE]: 'Ponte en contacto con\nnuestros consultores',
    [EVENTOS_FORM_DESC]: 'Transforma tu evento corporativo o personal en',
    [EVENTOS_FORM_SUBMIT]: 'Enviar',
    [EVENTOS_FORM_NOTA]: '*Todos los campos son obligatorios',
    [EVENTOS_FIELD_NOME]: 'Nombre',
    [EVENTOS_FIELD_TELEFONE]: 'Teléfono',
    [EVENTOS_FIELD_EMAIL]: 'E-mail',
    [EVENTOS_FIELD_TIPO]: 'Tipo de evento',
    [EVENTOS_OPT_CORPORATIVO]: 'Evento corporativo',
    [EVENTOS_OPT_ATIVACAO]: 'Activación de marca',
    [EVENTOS_OPT_OUTRO]: 'Otro',
  },
  zh: {
    [EVENTOS_HERO_TITLE]: '赛事活动的标杆。\n扑克领域的权威。',
    [EVENTOS_HERO_DESC]:
      '将您的企业活动打造成连接人、巩固关系、并以目标为导向提供娱乐的场景。',
    [EVENTOS_CTA_CONSULTORES]: '联系我们的顾问',
    [EVENTOS_TIPO_CORPORATIVOS]: '企业\n活动',
    [EVENTOS_NUMEROS_TITLE]: '用数字\n看活动',
    [EVENTOS_NUMEROS_SUB]: '活动',
    [EVENTOS_ESPECIALISTAS_TITLE]: '让事情发生的专家',
    [EVENTOS_TAGLINE]: '有牌局的地方，就有 H2 Sports Bar & Poker。',
    [EVENTOS_SETOR_DESC]:
      'H2 Sports Bar & Poker 的活动业务，让牌局在桌内桌外都焕发生机。凭借超过 20 年的信誉，H2 已成为巴西扑克最重要的标杆之一——不仅举办锦标赛，更为不同受众、形式与场景提供完整体验。',
    [EVENTOS_DIVERSIDADE_DESC]:
      '多样性是这一业务的核心支柱之一。企业活动、品牌行动、特别激活、社交聚会与独家体验：H2 理解每位客户的目标，将想法转化为量身定制的项目，交付标准已成为行业参考。',
    [EVENTOS_HOME_GAME_DESC]:
      '当要把体验带到俱乐部之外时，H2 会把水准再抬高一档。凭借完整的家庭局（私人活动）制作能力，扑克可以来到你身边——公司、家里，或你选定的任何地方。\n专业设施、专业团队与出色执行，确保每个细节都像大型扑克赛事一样运转。',
    [EVENTOS_PAIXAO_DESC]:
      'H2 不只是组织，更是让扑克真正发生。\n凭着一贯、品质与对牌局的热情，把每张桌子变成体验心智运动精彩之处的独特机会。',
    [EVENTOS_ESTRUTURA_DESC]:
      '与国家节奏及扑克热情同步的基础设施。',
    [EVENTOS_DEALERS]: '专业\n发牌员',
    [EVENTOS_DRINKS]: '独家\n饮品',
    [EVENTOS_MENU]: '美食\n菜单',
    [EVENTOS_DEPOIMENTO_TITLE]: '漂亮的标题！',
    [EVENTOS_DEPOIMENTO_AUTOR]: '姓名',
    [EVENTOS_EQUIPE_TITLE]: '我们的团队',
    [EVENTOS_EQUIPE_DESC]:
      '一支全天候沉浸在扑克中的专业团队，确保每个细节都达到标准、节奏与卓越。',
    [EVENTOS_CTA_FALE]: '联系我们',
    'Equipe 1': '团队 1',
    'Equipe 2': '团队 2',
    'Equipe 3': '团队 3',
    'Equipe 4': '团队 4',
    [EVENTOS_FORM_TITLE]: '联系\n我们的顾问',
    [EVENTOS_FORM_DESC]: '将您的企业或私人活动变成',
    [EVENTOS_FORM_SUBMIT]: '发送',
    [EVENTOS_FORM_NOTA]: '*所有字段均为必填',
    [EVENTOS_FIELD_NOME]: '姓名',
    [EVENTOS_FIELD_TELEFONE]: '电话',
    [EVENTOS_FIELD_EMAIL]: '电子邮箱',
    [EVENTOS_FIELD_TIPO]: '活动类型',
    [EVENTOS_OPT_CORPORATIVO]: '企业活动',
    [EVENTOS_OPT_ATIVACAO]: '品牌激活',
    [EVENTOS_OPT_OUTRO]: '其他',
  },
  ja: {
    [EVENTOS_HERO_TITLE]: 'イベントの基準。\nポーカーの権威。',
    [EVENTOS_HERO_DESC]:
      '企業イベントを、人をつなぎ、関係を深め、目的のあるエンターテインメントを届ける場に変えましょう。',
    [EVENTOS_CTA_CONSULTORES]: 'コンサルタントに相談する',
    [EVENTOS_TIPO_CORPORATIVOS]: 'コーポレート\nイベント',
    [EVENTOS_NUMEROS_TITLE]: '数字で見る\nイベント',
    [EVENTOS_NUMEROS_SUB]: 'イベント',
    [EVENTOS_ESPECIALISTAS_TITLE]: '実現のスペシャリスト',
    [EVENTOS_TAGLINE]: 'ゲームがある場所に、H2 Sports Bar & Poker。',
    [EVENTOS_SETOR_DESC]:
      'H2 Sports Bar & Poker のイベント部門は、テーブルの内外でゲームが息づく場所です。20年以上の信頼を背景に、H2はブラジル・ポーカーを代表する存在のひとつとなり、トーナメントだけでなく、さまざまな観客・形式・環境向けの完結した体験を届けています。',
    [EVENTOS_DIVERSIDADE_DESC]:
      '多様性はこの活動の柱のひとつです。企業イベント、ブランド施策、特別なアクティベーション、社交の場、限定体験——H2は各クライアントの目的を理解し、アイデアをオーダーメイドのプロジェクトへ変え、業界の基準となったクオリティで届けます。',
    [EVENTOS_HOME_GAME_DESC]:
      'そしてクラブの外へ体験を広げるとき、H2はレベルを引き上げます。ホームゲーム（プライベートイベント）のフルプロダクションで、ポーカーは会社でも自宅でも、あなたが選ぶ場所へ。\nプロ仕様の設備、専門チーム、完璧なオペレーションが、細部まで大規模ポーカーイベントのように機能することを保証します。',
    [EVENTOS_PAIXAO_DESC]:
      'H2は企画するだけでなく、ポーカーを実現します。\n一貫した品質とゲームへの情熱で、すべてのテーブルをマインドスポーツの最良を味わう特別な機会に変えます。',
    [EVENTOS_ESTRUTURA_DESC]:
      '国のリズムとポーカーへの情熱に寄り添う体制。',
    [EVENTOS_DEALERS]: 'プロ\nディーラー',
    [EVENTOS_DRINKS]: '限定\nドリンク',
    [EVENTOS_MENU]: '美食\nメニュー',
    [EVENTOS_DEPOIMENTO_TITLE]: '素敵なタイトル！',
    [EVENTOS_DEPOIMENTO_AUTOR]: '氏名',
    [EVENTOS_EQUIPE_TITLE]: '私たちのチーム',
    [EVENTOS_EQUIPE_DESC]:
      'ポーカーを24時間生きるプロフェッショナルのチームが、すべての細部で基準・リズム・卓越性を保証します。',
    [EVENTOS_CTA_FALE]: 'お問い合わせ',
    'Equipe 1': 'チーム 1',
    'Equipe 2': 'チーム 2',
    'Equipe 3': 'チーム 3',
    'Equipe 4': 'チーム 4',
    [EVENTOS_FORM_TITLE]: 'コンサルタントに\nお問い合わせ',
    [EVENTOS_FORM_DESC]: '企業・個人のイベントを',
    [EVENTOS_FORM_SUBMIT]: '送信',
    [EVENTOS_FORM_NOTA]: '*すべての項目が必須です',
    [EVENTOS_FIELD_NOME]: '名前',
    [EVENTOS_FIELD_TELEFONE]: '電話',
    [EVENTOS_FIELD_EMAIL]: 'メール',
    [EVENTOS_FIELD_TIPO]: 'イベントの種類',
    [EVENTOS_OPT_CORPORATIVO]: '企業イベント',
    [EVENTOS_OPT_ATIVACAO]: 'ブランドアクティベーション',
    [EVENTOS_OPT_OUTRO]: 'その他',
  },
} satisfies CmsPack

export default pack
