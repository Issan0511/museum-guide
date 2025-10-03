"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { CraftItem, Lang } from "@/types/types";
import { SEED } from "@/data/crafts.seed";
import { pickLang } from "@/types/types";
import { getPublicUrl } from "@/lib/supabasePublic";

type Props = { lang?: Lang };

export default function CraftGrid({ lang = "ja" }: Props) {
  const router = useRouter();
  const items = (SEED as CraftItem[]).map((craft) => ({
    name: String(pickLang(craft.name, lang)),
    reading: craft.kana ?? "",
    id: craft.id,
    imageUrl: getPublicUrl("craft_images/" + craft.id+".png")
  }));

  return (
    <div>
      <h3 className="font-semibold mb-3">工芸一覧</h3>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(`/crafts/${item.id}`)}
            className="bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 transition-colors"
          >
            <div className="relative w-full aspect-[4/3] mb-2 rounded overflow-hidden bg-gray-100">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100px, 150px"
                unoptimized={item.imageUrl.includes('supabase.co')}
              />
            </div>
            <div className="text-center">
              <div className="font-semibold text-sm">{item.name}</div>
              {item.reading ? <div className="text-xs text-neutral-600">{item.reading}</div> : null}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
