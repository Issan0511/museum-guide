"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import { SEED } from "@/data/crafts.seed";
import type { CraftItem } from "@/types/craft";
import { pickLang } from "@/types/craft";
import { getPublicUrl } from "@/lib/supabasePublic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChatbotModal from "@/components/modals/ChatbotModal";

export default function CraftPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const item = (SEED as CraftItem[]).find((craft) => craft.slug === slug);
  const [chatOpen, setChatOpen] = useState(false);
  if (!item) return notFound();

  const hero = item.images?.[0]?.path ? getPublicUrl(item.images[0].path) : "/placeholder.svg";
  const title = String(pickLang(item.name, "ja"));

  return (
    <div className="space-y-6">
      <button onClick={() => history.back()} className="text-sm text-neutral-700 hover:text-neutral-900 mb-3">
        ← 工芸一覧へ戻る
      </button>

      <div>
        <h1 className="text-2xl font-bold mb-3">{title}</h1>
        <div className="relative w-full aspect-[16/9] mb-3 rounded-lg overflow-hidden bg-gray-100">
          <Image 
            src={hero} 
            alt={title} 
            fill 
            className="object-cover" 
            sizes="(max-width: 768px) 100vw, 400px"
            unoptimized={hero.includes('supabase.co')}
          />
        </div>
        <p className="text-sm leading-relaxed text-neutral-700">{String(pickLang(item.summary, "ja"))}</p>
      </div>

      {item.youtubeId && (
        <Card className="bg-neutral-50 border-neutral-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">動画</CardTitle>
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
            <CardTitle className="text-base font-semibold">ショップ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 mb-4">
              この工芸品をオンラインショップで購入できます
            </p>
            <a 
              href={`https://mocad-shop.com/collections/${item.shopCollection}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              aria-label="MOCADショップでこの工芸品を見る"
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
            <CardTitle className="text-base font-semibold">ショップ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 mb-4">
              他の工芸品をオンラインショップで購入できます
            </p>
            <a 
              href="https://mocad-shop.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              aria-label="MOCADショップで他の工芸品を見る"
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
      <ChatbotModal open={chatOpen} onClose={() => setChatOpen(false)} craftSlug={slug} />
    </div>
  );
}
