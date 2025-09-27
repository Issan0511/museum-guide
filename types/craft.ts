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
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
}

export function pickLang<T extends Record<string, any>>(ml: Partial<Record<Lang, T>>, lang: Lang): T | string {
  return ml[lang] ?? ml.ja ?? Object.values(ml)[0] ?? '';
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
    { path: 'craft_images/nishijin.png' },
    { path: 'crafts/101/detail-1.jpg' }
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
    id: 1,
    slug: 'maki-e',
    name: { ja: '蒔絵', en: 'Maki-e', zh: '撒绘' },
    summary: { ja: '漆に金銀粉を蒔いて加飾する技法。', en: 'Urushi lacquer sprinkled with gold/silver powder.', zh: '在漆上撒金银粉进行装饰的技法。' },
    description: {
      ja: '蒔絵は、日本独自の漆芸技法で、漆の表面に金や銀の粉を蒔き、豪華で繊細な装飾を施すものです。平安時代から発展し、茶道具や調度品、工芸品などに広く用いられてきました。',
      en: 'Maki-e is a unique Japanese lacquer technique where gold or silver powder is sprinkled onto wet lacquer to create luxurious and delicate designs. Originating in the Heian period, it has been widely used for tea utensils, furnishings, and various crafts.',
      zh: '撒绘是一种日本独特的漆艺技法，通过在湿漆上撒金银粉，形成华丽精致的装饰。起源于平安时代，被广泛应用于茶具、家具和各种工艺品。'
    },
    details: { path: 'craft_texts/maki-e.md', format: 'md' },
    images: [{ path: 'crafts/1/main.jpg' }]
  },
  EXAMPLE_NISHIJIN
];
