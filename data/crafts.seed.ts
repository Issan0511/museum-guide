import { CraftItem } from "@/types/types";

export const SEED: CraftItem[] = [
  {
    id: 1,
    slug: 'nishijin',
    name: { ja: '西陣織', en: 'Nishijin Weaving', zh: '西阵织物' },
    kana: 'にしじんおり',
    summary: {
      ja: '京都市北西部・西陣地域を中心に発展した高級絹織物。',
      en: 'Luxury silk textiles from Kyoto\'s Nishijin district.',
      zh: '源自京都西阵地区的高级丝绸织物。'
    },
    description: {
      ja: '西陣織は先染め糸を用いた精緻な文様表現が特徴で...',
      en: 'Nishijin weaving is characterized by intricate patterns using pre-dyed threads...',
      zh: '西阵织物的特点是使用预染线创造复杂的图案...'
    },
    youtubeId: 'Y7_oVhzEpLg',
    shopCollection: 'nishijin-ori',
  },
  {
    id: 2,
    slug: 'kanoko',
    name: { ja: '京鹿の子絞', en: 'Kyoto Kanoko Shibori', zh: '京鹿子绞染' },
    kana: 'きょうかのこしぼり',
    summary: {
      ja: '布を糸で括り防染して模様を作る伝統染色技法。',
      en: 'Traditional tie-dye technique using resist dyeing.',
      zh: '通过捆扎防染形成图案的传统染色技法。'
    },
    description: {
      ja: '京鹿の子絞は多彩な括り技法により複雑な模様を作り出す...',
      en: 'This technique creates complex patterns by binding sections of fabric...',
      zh: '通过不同的捆扎方式创造复杂的图案...'
    },
    youtubeId: 'FAyPDLVqZ7M',
  },
  {
    id: 3,
    slug: 'yuzen',
    name: { ja: '京友禅', en: 'Kyoto Yuzen Dyeing', zh: '京友禅染' },
    kana: 'きょうゆうぜん',
    summary: {
      ja: '手描きによる華やかな模様が特徴の染色技法。',
      en: 'Hand-painted dyeing technique with vivid patterns.',
      zh: '以手绘华丽图案为特色的染色技法。'
    },
    description: {
      ja: '京友禅は江戸時代に確立され、多彩な彩色が特徴...',
      en: 'Kyoto Yuzen was established in the Edo period...',
      zh: '京友禅起源于江户时代，以丰富的彩绘著称...'
    },
    youtubeId: 'K20BwqIHAdE',
    shopCollection: 'fabric-dyeing',
  },
  {
    id: 31,
    slug: 'zoen',
    name: { ja: '造園', en: 'Japanese Garden Design', zh: '造园' },
    kana: 'ぞうえん',
    summary: {
      ja: '庭園を作り自然と調和した空間を生む技術。',
      en: 'The art of designing gardens in harmony with nature.',
      zh: '与自然和谐共生的庭园设计艺术。'
    },
    description: {
      ja: '日本庭園は枯山水や池泉庭園など多様な形式を持つ...',
      en: 'Japanese gardens include various styles such as dry landscapes...',
      zh: '日本庭园包括枯山水、池泉庭园等多种形式...'
    },

  },
  {
    id: 32,
    slug: 'bamboo',
    name: { ja: '京竹工芸', en: 'Kyoto Bamboo Craft', zh: '京都竹工艺' },
    kana: 'きょうたけこうげい',
    summary: {
      ja: '竹を素材にした京都の伝統工芸。',
      en: 'Traditional bamboo crafts from Kyoto.',
      zh: '京都的传统竹工艺品。'
    },
    description: {
      ja: '京竹工芸は茶道具や花器などに広く用いられる...',
      en: 'Used for tea utensils, flower baskets, and more...',
      zh: '广泛用于茶具、花器等...'
    },
    youtubeId: 'GH6relToNIw',
    shopCollection: 'bamboo-crafts',
    details: { path: 'craft_texts/bamboo.md', format: 'md' },
  }
];
