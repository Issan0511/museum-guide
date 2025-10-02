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
  youtubeId?: string;          // optional YouTube video ID (e.g., "Y7_oVhzEpLg")
  shopCollection?: string;     // optional shop collection name (e.g., "nishijin-ori")
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

// ---------- 4) Optional: zod validation ----------
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
  youtubeId: z.string().min(1).optional(),
  shopCollection: z.string().min(1).optional()
});

