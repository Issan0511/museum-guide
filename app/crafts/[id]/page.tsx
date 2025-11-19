"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import type { CraftItem } from "@/types/types";
import { pickLang } from "@/types/types";
import { getPublicUrl } from "@/lib/supabasePublic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChatbotModal from "@/components/modals/ChatbotModal";
import { supabase } from "@/lib/supabase";
import { mapCraftRow, type CraftRow } from "@/lib/supabaseMappers";
import { useUser } from "@/contexts/UserContext";
import { getTranslations } from "@/lib/i18n";

export default function CraftPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const numericId = Number(id);
  const [item, setItem] = useState<CraftItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const { userProfile } = useUser();
  const lang = userProfile?.language ?? "ja";
  const t = useMemo(() => getTranslations(lang), [lang]);

  useEffect(() => {
    if (Number.isNaN(numericId)) {
      setMissing(true);
      setLoading(false);
      return;
    }

    let active = true;

    const fetchCraft = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("crafts")
        .select("*")
        .eq("id", numericId)
        .maybeSingle();

      if (!active) return;

      if (error || !data) {
        console.error("Failed to fetch craft from Supabase", error);
        setMissing(true);
        setItem(null);
      } else {
        setItem(mapCraftRow(data as CraftRow));
        setMissing(false);
      }
      setLoading(false);
    };

    fetchCraft();

    return () => {
      active = false;
    };
  }, [numericId]);

  const hero = useMemo(() => {
    if (!item) return "/placeholder.svg";
    return getPublicUrl(`craft_images/${item.id}.png`);
  }, [item]);

  const title = useMemo(() => {
    if (!item) return "";
    return pickLang(item.name, lang) ?? "";
  }, [item, lang]);

  if (!loading && missing) {
    return notFound();
  }

  if (loading || !item) {
    return (
      <div className="space-y-6">
        <button onClick={() => history.back()} className="text-sm text-neutral-700 hover:text-neutral-900 mb-3">
          {t.craftPage.backToList}
        </button>
        <div className="space-y-3">
          <div className="w-full aspect-[16/9] bg-neutral-200 rounded-lg animate-pulse" />
          <div className="h-6 bg-neutral-200 rounded w-1/2 animate-pulse" />
          <div className="h-24 bg-neutral-100 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button onClick={() => history.back()} className="text-sm text-neutral-700 hover:text-neutral-900 mb-3">
        {t.craftPage.backToList}
      </button>

      <div>
        <h1 className="text-2xl font-bold mb-3">{title}</h1>
        <div
          className="relative w-full mb-3 rounded-lg overflow-hidden bg-gray-100"
          style={{ aspectRatio: aspectRatio }}
        >
          <Image
            src={hero}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            unoptimized={hero.includes("supabase.co")}
            onLoadingComplete={(img) => {
              if (img.naturalWidth && img.naturalHeight) {
                setAspectRatio(img.naturalWidth / img.naturalHeight);
              }
            }}
          />
        </div>
        <p className="text-sm leading-relaxed text-neutral-700">{pickLang(item.description, lang) ?? ""}</p>
      </div>

      {item.youtubeId && (
        <Card className="bg-neutral-50 border-neutral-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">{t.craftPage.videoSectionTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${item.youtubeId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      )}

      {item.shopCollection ? (
        <Card className="bg-white border-neutral-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">{t.craftPage.shopSectionTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 mb-4">{t.craftPage.shopPrimaryDescription}</p>
            <p className="text-sm text-neutral-500">{t.craftPage.shopTapHint}</p>
            <a
              href={`https://mocad-shop.com/collections/${item.shopCollection}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              aria-label={t.craftPage.shopPrimaryAria}
            >
              <div className="relative w-full h-32 mx-auto hover:opacity-80 transition-opacity cursor-pointer">
                <Image
                  src="/images/mocad_shop_logo.png"
                  alt="MOCAD Shop"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </a>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white border-neutral-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">{t.craftPage.shopSectionTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 mb-4">{t.craftPage.shopOtherDescription}</p>
            <a
              href="https://mocad-shop.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              aria-label={t.craftPage.shopOtherAria}
            >
              <div className="relative w-full h-32 mx-auto hover:opacity-80 transition-opacity cursor-pointer">
                <Image
                  src="/images/mocad_shop_logo.png"
                  alt="MOCAD Shop"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </a>
          </CardContent>
        </Card>
      )}

      <Button
        className="fixed right-4 bottom-4 w-14 h-14 rounded-full bg-neutral-900 hover:bg-neutral-800 shadow-lg z-50"
        onClick={() => setChatOpen(true)}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h16v10H7l-3 3V4z" />
        </svg>
      </Button>
      <ChatbotModal open={chatOpen} onClose={() => setChatOpen(false)} craftSlug={item?.slug || ""} />
    </div>
  );
}
