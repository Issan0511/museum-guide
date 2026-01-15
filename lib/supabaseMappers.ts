import type { CraftItem, DemoTemplate, Event, Multilang } from "@/types/types";

export type CraftRow = {
  id: number;
  slug: string;
  display_order: number | null;
  name_ja: string | null;
  name_en: string | null;
  name_zh: string | null;
  name_fr: string | null;
  name_ko: string | null;
  name_es: string | null;
  kana: string | null;
  summary_ja: string | null;
  summary_en: string | null;
  summary_zh: string | null;
  summary_fr: string | null;
  summary_ko: string | null;
  summary_es: string | null;
  description_ja: string | null;
  description_en: string | null;
  description_zh: string | null;
  description_fr: string | null;
  description_ko: string | null;
  description_es: string | null;
  youtube_id: string | null;
  shop_collection: string | null;
  details_path: string | null;
  details_format: string | null;
};

type MultilangSource = {
  ja?: string | null;
  en?: string | null;
  zh?: string | null;
  fr?: string | null;
  ko?: string | null;
  es?: string | null;
};

function toMultilang(source: MultilangSource): Multilang {
  const result: Multilang = {};

  if (source.ja) result.ja = source.ja;
  if (source.en) result.en = source.en;
  if (source.zh) result.zh = source.zh;
  if (source.fr) result.fr = source.fr;
  if (source.ko) result.ko = source.ko;
  if (source.es) result.es = source.es;

  return result;
}

export function mapCraftRow(row: CraftRow): CraftItem {
  return {
    id: row.id,
    slug: row.slug,
    displayOrder: row.display_order ?? undefined,
    name: toMultilang({
      ja: row.name_ja ?? undefined,
      en: row.name_en ?? undefined,
      zh: row.name_zh ?? undefined,
      fr: row.name_fr ?? undefined,
      ko: row.name_ko ?? undefined,
      es: row.name_es ?? undefined
    }),
    kana: row.kana ?? undefined,
    summary: toMultilang({
      ja: row.summary_ja ?? undefined,
      en: row.summary_en ?? undefined,
      zh: row.summary_zh ?? undefined,
      fr: row.summary_fr ?? undefined,
      ko: row.summary_ko ?? undefined,
      es: row.summary_es ?? undefined
    }),
    description: toMultilang({
      ja: row.description_ja ?? undefined,
      en: row.description_en ?? undefined,
      zh: row.description_zh ?? undefined,
      fr: row.description_fr ?? undefined,
      ko: row.description_ko ?? undefined,
      es: row.description_es ?? undefined
    }),
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
  name_fr: string | null;
  name_ko: string | null;
  name_es: string | null;
  description_ja: string | null;
  description_en: string | null;
  description_zh: string | null;
  description_fr: string | null;
  description_ko: string | null;
  description_es: string | null;
};

export function mapDemoTemplateRow(row: DemoTemplateRow): DemoTemplate {
  return {
    id: row.id,
    name: toMultilang({
      ja: row.name_ja ?? undefined,
      en: row.name_en ?? undefined,
      zh: row.name_zh ?? undefined,
      fr: row.name_fr ?? undefined,
      ko: row.name_ko ?? undefined,
      es: row.name_es ?? undefined
    }),
    description: toMultilang({
      ja: row.description_ja ?? undefined,
      en: row.description_en ?? undefined,
      zh: row.description_zh ?? undefined,
      fr: row.description_fr ?? undefined,
      ko: row.description_ko ?? undefined,
      es: row.description_es ?? undefined
    }),
  };
}

export type EventRow = {
  id: number;
  display_order: number | null;
  name_ja: string | null;
  name_en: string | null;
  name_zh: string | null;
  name_fr: string | null;
  name_ko: string | null;
  name_es: string | null;
  start_date: string;
  end_date: string;
  detail_ja: string | null;
  detail_en: string | null;
  detail_zh: string | null;
  detail_fr: string | null;
  detail_ko: string | null;
  detail_es: string | null;
};

export function mapEventRow(row: EventRow): Event {
  return {
    id: row.id,
    displayOrder: row.display_order ?? undefined,
    name: toMultilang({
      ja: row.name_ja ?? undefined,
      en: row.name_en ?? undefined,
      zh: row.name_zh ?? undefined,
      fr: row.name_fr ?? undefined,
      ko: row.name_ko ?? undefined,
      es: row.name_es ?? undefined
    }),
    startDate: new Date(row.start_date),
    endDate: new Date(row.end_date),
    detail: toMultilang({
      ja: row.detail_ja ?? undefined,
      en: row.detail_en ?? undefined,
      zh: row.detail_zh ?? undefined,
      fr: row.detail_fr ?? undefined,
      ko: row.detail_ko ?? undefined,
      es: row.detail_es ?? undefined
    }),
  };
}
