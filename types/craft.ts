// Craft item schema: Next.js + Supabase Storage (path-only)
// Save only storage paths like "craft_images/nishijin.png" or text files like "craft_texts/nishijin.md".
// Resolve to public URL at render time.

// ---------- 1) Core types ----------
export type Lang = 'ja' | 'en' | 'zh';

export type Multilang<T = string> = Partial<Record<Lang, T>> & { ja?: T }; // ja preferred fallback

export interface ImageAsset {
  /** Supabase Storage path only (no domain). e.g. "craft_images/nishijin.png" or "crafts/1/main.jpg" */
  path: string;
}

export interface TextAsset {
  /** Supabase Storage path only for long-form text. e.g. "craft_texts/nishijin.md" */
  path: string;
  /** Optional format hint for renderer */
  format?: 'md' | 'txt' | 'html' | 'json';
}

export interface ExternalLink {
  label: Multilang;
  url: string;
  kind?: 'official' | 'wiki' | 'shop' | 'video' | 'other';
}

// ---------- 2) CraftItem ----------
export interface CraftItem {
  id: number;                 // stable numeric id
  slug: string;               // URL-safe id: e.g. "nishijin-ori"

  name: Multilang;            // display name
  kana?: string;              // optional reading for JA

  summary: Multilang;         // 1 paragraph overview
  description: Multilang<string>; // multi paragraph long text

  /**
   * Externalized long multi-paragraph text for chatbot and detail pages.
   * Store file in Supabase Storage and keep only its path here.
   * Example: { path: 'craft_texts/nishijin.md', format: 'md' }
   */
  details?: TextAsset;

  images: ImageAsset[];        // gallery, first item may serve as hero
  videoUrl?: string;           // optional external video
}

// ---------- 3) Helpers ----------
export function getPublicUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl || baseUrl === "undefined" || baseUrl === "null") {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    if (path.startsWith("/")) {
      return path;
    }
    return "/placeholder.svg";
  }
  return `${baseUrl}/storage/v1/object/public/${path}`;
}

export function pickLang<T>(ml: Multilang<T>, lang: Lang): T | undefined {
  if (ml[lang] !== undefined) {
    return ml[lang];
  }
  if (ml.ja !== undefined) {
    return ml.ja;
  }
  return Object.values(ml).find((value): value is T => value !== undefined);
}

// ---------- 4) Example item ----------
export const EXAMPLE_NISHIJIN: CraftItem = {
  id: 101,
  slug: 'nishijin-ori',
  name: { ja: '西陣織', en: 'Nishijin-ori', zh: '西阵织物' },
  summary: {
    ja: '京都・西陣で発展した高級絹織物。多彩な紋様と緻密な技が特徴。',
    en: 'Luxury silk textiles from Kyoto’s Nishijin district, known for intricate patterns.',
    zh: '源自京都西阵地区的高级丝绸织物，以复杂精致的图案闻名。'
  },
  description: {
    ja: '西陣織は室町時代から続く織物産地で、先染めの経緯糸を用いて織られる多彩な技法が特徴です。特に豪華な能装束や帯として知られ、数百年にわたり日本の伝統文化を支えてきました。現代では、インテリアやアート作品にも応用され、伝統と革新が融合した新しい表現が生まれています。',
    en: 'Nishijin-ori is a weaving tradition dating back to the Muromachi period, characterized by the use of pre-dyed warp and weft threads to create diverse and intricate techniques. It is renowned for its luxurious obi and Noh costumes, representing centuries of Japanese cultural heritage. Today, it finds new life in interior design and art, blending tradition with innovation.',
    zh: '西阵织物起源于室町时代，以使用预染的经纬线创造丰富多样的技法而闻名。它以豪华的腰带和能剧服装而著称，数百年来一直支撑着日本的传统文化。如今，西阵织物被广泛应用于室内设计和艺术作品中，传统与创新在此交汇，孕育出新的表现形式。'
  },
  details: { path: 'craft_texts/nishijin.md', format: 'md' },
  images: [
    { path: 'craft_images/nishijin.png' }
  ]
};

// ---------- 5) Optional: zod validation ----------
import { z } from 'zod';

export const ML = z.object({
  ja: z.any().optional(),
  en: z.any().optional(),
  zh: z.any().optional()
}).partial();

export const ImageAssetZ = z.object({
  path: z.string().min(1)
});

export const TextAssetZ = z.object({
  path: z.string().min(1),
  format: z.enum(['md', 'txt', 'html', 'json']).optional()
});

export const CraftItemZ = z.object({
  id: z.number().int().nonnegative(),
  slug: z.string().min(1),
  name: ML.refine(v => !!(v.ja || v.en || v.zh), { message: 'name requires at least one lang' }),
  kana: z.string().optional(),
  summary: ML,
  description: ML,
  details: TextAssetZ.optional(),
  images: z.array(ImageAssetZ).min(1),
  videoUrl: z.string().url().optional()
});

// ---------- 6) Minimal seed JSON ----------
export const SEED: CraftItem[] = [
  {
    id: 101,
    slug: 'nishijin',
    name: { ja: '西陣織', en: 'Nishijin Weaving', zh: '西阵织物' },
    kana: 'にしじんおり',
    summary: {
      ja: '京都市北西部・西陣地域を中心に発展した高級絹織物。',
      en: 'Luxury silk textiles from Kyoto’s Nishijin district.',
      zh: '源自京都西阵地区的高级丝绸织物。'
    },
    description: {
      ja: '西陣織は先染め糸を用いた精緻な文様表現が特徴で...',
      en: 'Nishijin weaving is characterized by intricate patterns using pre-dyed threads...',
      zh: '西阵织物的特点是使用预染线创造复杂的图案...'
    },
    images: [{ path: 'craft_images/nishijin.png' }]
  },
  {
    id: 102,
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
    images: [{ path: 'craft_images/kanoko.png' }]
  },
  {
    id: 103,
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
    images: [{ path: 'craft_images/yuzen.png' }]
  },
  {
    id: 104,
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
    images: [{ path: 'craft_images/zoen.png' }]
  },
  {
    id: 105,
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
    images: [{ path: 'craft_images/bamboo.png' }]
  }
];

