export interface MasterCategory {
  no: string;          // '01' to '18'
  id: string;          // unique id e.g. 'planning'
  name: string;        // '予約・事前準備・プランニング'
  subTitle: string;    // '予約、契約、打ち合わせ、見積もり'
  icon: string;        // Lucide icon name
  color: string;       // Tailwind text color
  bgColor: string;     // Tailwind bg color
  borderColor: string; // Tailwind border
}

export interface MasterTerm {
  id: string;
  catNo: string;       // '01' to '18'
  subCat: string;      // 中カテゴリー名 (e.g. 'A. 新婦の洋装', 'B. フランス料理のコース')
  term: string;        // 表示する専門用語
  reading: string;     // 日本語の読み仮名
  english?: string;    // 英語表記
  meaning: string;     // 正式な意味・解説・用途
  point?: string;      // 現場の注意点・プロの心得
  related?: string[];  // 関連用語
}

export type StudyStatus = 'unlearned' | 'learned' | 'review';

export const MASTER_CATEGORIES: MasterCategory[] = [
  {
    no: '01',
    id: 'planning',
    name: '予約・事前準備・プランニング',
    subTitle: '予約、契約、打ち合わせ、見積もり、スケジュール管理',
    icon: 'CalendarCheck',
    color: 'text-sky-700',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200'
  },
  {
    no: '02',
    id: 'costume',
    name: '衣装・フォーマル服飾',
    subTitle: '新郎新婦洋装・和装、親族礼服、装飾小物',
    icon: 'Sparkles',
    color: 'text-rose-700',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200'
  },
  {
    no: '03',
    id: 'beauty',
    name: '着付け・ヘアメイク・美容',
    subTitle: '髪飾り、ブライダルインナー、和装小物、着付け・メイク',
    icon: 'Scissors',
    color: 'text-fuchsia-700',
    bgColor: 'bg-fuchsia-50',
    borderColor: 'border-fuchsia-200'
  },
  {
    no: '04',
    id: 'yuino',
    name: '結納・両家顔合わせ',
    subTitle: '結納形式、結納品9品目、祝い菓子、婚約記念品',
    icon: 'Gift',
    color: 'text-amber-800',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  {
    no: '05',
    id: 'ceremony',
    name: '挙式・儀式',
    subTitle: '神前式、チャペル式、仏前式、人前式、式次第作法',
    icon: 'Church',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200'
  },
  {
    no: '06',
    id: 'lobby',
    name: '控室・ロビー・受付',
    subTitle: '施設空間、受付業務、芳名帳、待合食前酒サービス',
    icon: 'DoorOpen',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  {
    no: '07',
    id: 'banquet',
    name: '披露宴会場・会場設営',
    subTitle: 'バンケット、高砂席次、テーブル装飾、会場備品家具',
    icon: 'LayoutGrid',
    color: 'text-violet-700',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200'
  },
  {
    no: '08',
    id: 'cuisine',
    name: '料飲・料理・ドリンク',
    subTitle: 'フレンチコース、和洋折衷、ワイン・酒類、軽食デザート',
    icon: 'UtensilsCrossed',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    no: '09',
    id: 'tableware',
    name: 'テーブルウェア・サービス',
    subTitle: 'チャイナ陶磁器、シルバーカトラリー、グラス、配膳下膳',
    icon: 'Wine',
    color: 'text-cyan-800',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200'
  },
  {
    no: '10',
    id: 'reception',
    name: '披露宴進行・演出',
    subTitle: '入退場、ケーキ入刀、鏡開き、キャンドル、演出料理',
    icon: 'PartyPopper',
    color: 'text-pink-700',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
  {
    no: '11',
    id: 'av_lighting',
    name: '写真・映像・音響・照明',
    subTitle: 'スナップ型物撮影、音響PA・BGM、ピンスポット照明',
    icon: 'Camera',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    no: '12',
    id: 'staff',
    name: '人物・役職・スタッフ',
    subTitle: '新郎新婦、媒酌人、プランナー、キャプテン、介添人、シェフ',
    icon: 'Users',
    color: 'text-teal-700',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200'
  },
  {
    no: '13',
    id: 'hotel',
    name: 'ホテル・宿泊・ゲストサービス',
    subTitle: 'フロント宿泊、客室アメニティ、送迎ハイヤー・ドアマン',
    icon: 'Building2',
    color: 'text-yellow-800',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  {
    no: '14',
    id: 'barrier_free',
    name: 'バリアフリー・子供・介護対応',
    subTitle: '車椅子対応、託児室・ベビーシッター、授乳室、要介護介助',
    icon: 'HeartHandshake',
    color: 'text-emerald-800',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200'
  },
  {
    no: '15',
    id: 'kitchen',
    name: '厨房・バックヤード・調理',
    subTitle: '厨房機器、調理器具、保管運搬、西洋・日本・中国料理長',
    icon: 'ChefHat',
    color: 'text-stone-800',
    bgColor: 'bg-stone-100',
    borderColor: 'border-stone-300'
  },
  {
    no: '16',
    id: 'catering',
    name: 'ケータリング・外部会場運営',
    subTitle: '仮設厨房、チェーフィング保温、運搬機材、衛生安全管理',
    icon: 'Truck',
    color: 'text-lime-800',
    bgColor: 'bg-lime-50',
    borderColor: 'border-lime-200'
  },
  {
    no: '17',
    id: 'gift_money',
    name: '贈答・ご祝儀・金銭関連',
    subTitle: 'ご祝儀、袱紗、お車代、心づけ、引き出物3品構成、プチギフト',
    icon: 'Coins',
    color: 'text-red-800',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    no: '18',
    id: 'honeymoon',
    name: 'ハネムーン・新婚旅行',
    subTitle: '旅行プラン、リゾート婚、空港送迎、ホテル特典アメニティ',
    icon: 'Plane',
    color: 'text-purple-800',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  }
];
