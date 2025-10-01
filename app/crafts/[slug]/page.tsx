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
import AudioPlayer from "@/components/AudioPlayer";
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

      <Card className="bg-neutral-50 border-neutral-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">音声ガイド</CardTitle>
        </CardHeader>
        <CardContent>
          <AudioPlayer src="/audio/nishijin-guide.mp3" downloadName="nishijin-guide.mp3" />
        </CardContent>
      </Card>

      <Card className="bg-neutral-50 border-neutral-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">動画</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden">
            <iframe
              className="absolute inset-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/Y7_oVhzEpLg"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </CardContent>
      </Card>

      <Button
        className="fixed right-4 bottom-4 w-14 h-14 rounded-full bg-neutral-900 hover:bg-neutral-800 shadow-lg z-50"
        onClick={() => setChatOpen(true)}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h16v10H7l-3 3V4z" />
        </svg>
      </Button>
      <ChatbotModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
