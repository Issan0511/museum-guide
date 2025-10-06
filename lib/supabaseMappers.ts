import type { CraftItem, DemoTemplate, Event, Multilang } from "@/types/types";
import { getPublicUrl } from "@/lib/supabasePublic";

export type CraftRow = {
  id: number;
  slug: string;
  name_ja: string | null;
  name_en: string | null;
  name_zh: string | null;
  kana: string | null;
  summary_ja: string | null;
  summary_en: string | null;
  summary_zh: string | null;
  description_ja: string | null;
  description_en: string | null;
  description_zh: string | null;
  youtube_id: string | null;
  shop_collection: string | null;
  details_path: string | null;
  details_format: string | null;
};

type MultilangSource = {
  ja?: string | null;
  en?: string | null;
  zh?: string | null;
};

function toMultilang(source: MultilangSource): Multilang {
  const result: Multilang = {};

  if (source.ja) result.ja = source.ja;
  if (source.en) result.en = source.en;
  if (source.zh) result.zh = source.zh;

  return result;
}

export function mapCraftRow(row: CraftRow): CraftItem {
  return {
    id: row.id,
    slug: row.slug,
    name: toMultilang({ ja: row.name_ja ?? undefined, en: row.name_en ?? undefined, zh: row.name_zh ?? undefined }),
    kana: row.kana ?? undefined,
    summary: toMultilang({ ja: row.summary_ja ?? undefined, en: row.summary_en ?? undefined, zh: row.summary_zh ?? undefined }),
    description: toMultilang({ ja: row.description_ja ?? undefined, en: row.description_en ?? undefined, zh: row.description_zh ?? undefined }),
    details: row.details_path
      ? {
          path: row.details_path,
          format: row.details_format === "md" || row.details_format === "txt" || row.details_format === "html" || row.details_format === "json"
            ? row.details_format
            : undefined
        }
      : undefined,
    youtubeId: row.youtube_id ?? undefined,
    shopCollection: row.shop_collection ?? undefined,
  };
}

export type DemoTemplateRow = {
  id: number;
  name_ja: string | null;
  name_en: string | null;
  name_zh: string | null;
  description_ja: string | null;
  description_en: string | null;
  description_zh: string | null;
};

export function mapDemoTemplateRow(row: DemoTemplateRow): DemoTemplate {
  return {
    id: row.id,
    name: row.name_ja ?? row.name_en ?? row.name_zh ?? "",
    description: row.description_ja ?? row.description_en ?? row.description_zh ?? "",
  };
}

export type EventRow = {
  id: number;
  name_ja: string | null;
  name_en: string | null;
  name_zh: string | null;
  start_date: string;
  end_date: string;
  detail_ja: string | null;
  detail_en: string | null;
  detail_zh: string | null;
};

export function mapEventRow(row: EventRow): Event {
  return {
    id: row.id,
    name: row.name_ja ?? row.name_en ?? row.name_zh ?? "",
    startDate: new Date(row.start_date),
    endDate: new Date(row.end_date),
    detail: row.detail_ja ?? row.detail_en ?? row.detail_zh ?? "",
  };
}
