"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EventModal from "@/components/modals/EventModal";
import DemoModal from "@/components/modals/DemoModal";
import ChatbotModal from "@/components/modals/ChatbotModal";
import CraftGrid from "@/components/CraftGrid";
import { DEMO_TEMPLATES } from "@/data/demo.seed";
import { supabase, type CalendarData } from "@/lib/supabase";
import type { DemoTemplate } from "@/types/craft";

export default function HomePage() {
  const [eventOpen, setEventOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [todayDemo, setTodayDemo] = useState<DemoTemplate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayDemo = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        type CalendarRow = Pick<CalendarData, "template_id">;

        const { data: calendarRow, error } = await supabase
          .from<CalendarRow>("calendar")
          .select("template_id")
          .eq("demo_date", today)
          .maybeSingle();

        if (error) {
          // エラーの場合はnullを設定
          setTodayDemo(null);
        } else if (calendarRow) {
          // カレンダーからテンプレートIDを取得して、対応するデモを設定
          const demo = DEMO_TEMPLATES.find(t => t.id === calendarRow.template_id);
          setTodayDemo(demo || null);
        } else {
          // 今日のデモがない場合はnull
          setTodayDemo(null);
        }
      } catch (error) {
        setTodayDemo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayDemo();
  }, []);

  return (
    <div className="space-y-4">
      <button onClick={() => history.back()} className="text-sm text-neutral-700 hover:text-neutral-900 mb-3">
        ← 言語選択へ戻る
      </button>

      <Card className="bg-neutral-100 border-neutral-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">本日の職人実演</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-neutral-600">読み込み中...</p>
            </div>
          ) : todayDemo ? (
            <>
              <div className="relative w-full h-40 rounded-lg overflow-hidden">
                <Image
                  src={todayDemo.img || "/images/candle-making-demo.png"}
                  alt={`${todayDemo.name}の実演`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 320px, 100vw"
                />
              </div>
              <div className="text-base font-semibold text-neutral-700 mb-2">
                {todayDemo.name}
              </div>
              <Button variant="outline" onClick={() => setDemoOpen(true)}>
                詳細を見る
              </Button>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-600">本日のデモはありません</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-neutral-100 border-neutral-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">本日開催中のイベント</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image
              src="/images/tradition-meets-today.png"
              alt="Tradition Meets Today イベント"
              fill
              className="object-cover bg-white"
              sizes="(min-width: 768px) 320px, 100vw"
            />
          </div>
          <div className="mt-3">
            <Button variant="outline" onClick={() => setEventOpen(true)}>
              詳細を見る
            </Button>
          </div>
        </CardContent>
      </Card>

      <CraftGrid lang="ja" />

      <EventModal open={eventOpen} onClose={() => setEventOpen(false)} />
      {todayDemo && (
        <DemoModal 
          open={demoOpen} 
          onClose={() => setDemoOpen(false)} 
          demo={todayDemo}
        />
      )}
      <ChatbotModal open={chatOpen} onClose={() => setChatOpen(false)} />

      <Button
        className="fixed right-4 bottom-4 w-14 h-14 rounded-full bg-neutral-900 hover:bg-neutral-800 shadow-lg z-50"
        onClick={() => setChatOpen(true)}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h16v10H7l-3 3V4z" />
        </svg>
      </Button>
    </div>
  );
}
