"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { CraftItem, Lang } from "@/types/types";
import { pickLang } from "@/types/types";
import { getPublicUrl } from "@/lib/supabasePublic";
import { supabase } from "@/lib/supabase";
import { mapCraftRow, type CraftRow } from "@/lib/supabaseMappers";
import { getTranslations } from "@/lib/i18n";

type Props = { lang?: Lang };

type CraftCategory = "住" | "礼" | "食" | "職" | "衣" | "その他";

const CATEGORY_ORDER: CraftCategory[] = ["住", "礼", "食", "職", "衣", "その他"];

function categoryFromDisplayOrder(displayOrder?: number): CraftCategory {
  if (displayOrder === undefined || displayOrder === null) return "その他";
  const bucket = Math.floor(displayOrder / 100);
  if (bucket === 1) return "住";
  if (bucket === 2) return "礼";
  if (bucket === 3) return "食";
  if (bucket === 4) return "職";
  if (bucket === 5) return "衣";
  return "その他";
}

function categoryHeading(category: CraftCategory): string {
  if (category === "住") return "カテゴリー住";
  if (category === "礼") return "カテゴリー礼";
  if (category === "食") return "カテゴリー食";
  if (category === "職") return "カテゴリー職";
  if (category === "衣") return "カテゴリー衣";
  return "その他";
}

export default function CraftGrid({ lang = "ja" }: Props) {
  const router = useRouter();
  const [crafts, setCrafts] = useState<CraftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCategories, setOpenCategories] = useState<Record<CraftCategory, boolean>>({
    "住": false,
    "礼": false,
    "食": false,
    "職": false,
    "衣": false,
    "その他": false
  });

  useEffect(() => {
    let active = true;

    const fetchCrafts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("crafts")
        .select("*")
        .order("display_order", { ascending: true });

      if (!active) return;

      if (error) {
        console.error("Failed to fetch crafts from Supabase", error);
        setCrafts([]);
      } else {
        const mapped = (data as CraftRow[] | null)?.map(mapCraftRow) ?? [];
        setCrafts(mapped);
      }
      setLoading(false);
    };

    fetchCrafts();

    return () => {
      active = false;
    };
  }, []);

  const t = useMemo(() => getTranslations(lang), [lang]);

  const groupedItems = useMemo(() => {
    const groups: Record<CraftCategory, { name: string; reading: string; id: number; imageUrl: string }[]> = {
      "住": [],
      "礼": [],
      "食": [],
      "職": [],
      "衣": [],
      "その他": []
    };

    for (const craft of crafts) {
      const label = pickLang(craft.name, lang) ?? "";
      const category = categoryFromDisplayOrder(craft.displayOrder);
      groups[category].push({
        name: label,
        reading: lang === "ja" ? craft.kana ?? "" : "",
        id: craft.id,
        imageUrl: getPublicUrl(`craft_images/${craft.id}.png`)
      });
    }

    return CATEGORY_ORDER.map((category) => ({
      category,
      heading: categoryHeading(category),
      items: groups[category]
    })).filter((group) => group.items.length > 0);
  }, [crafts, lang]);

  return (
    <div className="space-y-6">
      <h3 className="font-semibold mb-3">{t.craftGrid.heading}</h3>
      {loading ? (
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-neutral-100 border border-neutral-200 rounded-lg p-2.5 h-32" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {groupedItems.map((group) => (
            <section key={group.category} className="space-y-2">
              <button
                type="button"
                className="w-full flex items-center justify-between text-left text-sm font-semibold text-neutral-800 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-3 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2"
                aria-expanded={openCategories[group.category]}
                aria-controls={`craft-category-${group.category}`}
                onClick={() =>
                  setOpenCategories((prev) => ({
                    ...prev,
                    [group.category]: !prev[group.category]
                  }))
                }
              >
                <span>{group.heading}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${openCategories[group.category] ? "rotate-180" : "rotate-0"}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                id={`craft-category-${group.category}`}
                className={openCategories[group.category] ? "grid grid-cols-3 gap-3" : "hidden"}
              >
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => router.push(`/crafts/${item.id}`)}
                    className="bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 transition-colors flex flex-col"
                  >
                    <div className="relative w-full aspect-[4/3] mb-2 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100px, 150px"
                        unoptimized={item.imageUrl.includes("supabase.co")}
                      />
                    </div>
                    <div className="text-center break-all">
                      <div className="font-semibold text-sm">{item.name}</div>
                      {item.reading ? <div className="text-xs text-neutral-600">{item.reading}</div> : null}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
