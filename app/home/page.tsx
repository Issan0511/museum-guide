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
import { EVENTS } from "@/data/events.seed";
import { supabase, type CalendarData } from "@/lib/supabase";
import type { DemoTemplate, Event } from "@/types/types";

export default function HomePage() {
  const [eventOpen, setEventOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [todayDemo, setTodayDemo] = useState<DemoTemplate | null>(null);
  const [todayEvents, setTodayEvents] = useState<Event[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayData = async () => {
      try {
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];

        // デモデータの取得
        type CalendarRow = Pick<CalendarData, "template_id">;

        const { data: calendarRow, error } = await supabase
          .from("calendar")                // ← 型はここに付けない
          .select("template_id")
          .eq("demo_date", todayStr)
          .maybeSingle<CalendarRow>();     // ← ここに付ける

        if (error) {
          setTodayDemo(null);
        } else if (calendarRow) {
          const demo = DEMO_TEMPLATES.find(
            t => t.id === calendarRow.template_id
          );
          setTodayDemo(demo || null);
        } else {
          setTodayDemo(null);
        }

        // イベントデータの取得（開催期間中のもの）
        const currentEvents = EVENTS.filter(event => {
          const start = new Date(event.startDate);
          const end = new Date(event.endDate);
          return today >= start && today <= end;
        });
        setTodayEvents(currentEvents);
        setCurrentEventIndex(0);
      } catch (error) {
        setTodayDemo(null);
        setTodayEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayData();
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
              <div className="relative w-full h-60 rounded-lg overflow-hidden">
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
        <CardContent className="space-y-3">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-neutral-600">読み込み中...</p>
            </div>
          ) : todayEvents.length > 0 ? (
            <>
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/event_images/${todayEvents[currentEventIndex].id}.png`}
                  alt={todayEvents[currentEventIndex].name}
                  fill
                  className="object-cover bg-white"
                  sizes="(min-width: 768px) 320px, 100vw"
                />
                {todayEvents.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentEventIndex(prev => prev - 1)}
                      disabled={currentEventIndex === 0}
                      className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-white/90 hover:bg-white shadow-lg"
                    >
                      ←
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentEventIndex(prev => prev + 1)}
                      disabled={currentEventIndex === todayEvents.length - 1}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-white/90 hover:bg-white shadow-lg"
                    >
                      →
                    </Button>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-base font-semibold text-neutral-700">
                  {todayEvents[currentEventIndex].name}
                </div>
                {todayEvents.length > 1 && (
                  <div className="text-sm text-neutral-600">
                    {currentEventIndex + 1} / {todayEvents.length}
                  </div>
                )}
              </div>
              <Button variant="outline" onClick={() => setEventOpen(true)}>
                詳細を見る
              </Button>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-600">本日開催中のイベントはありません</p>
            </div>
          )}
        </CardContent>
      </Card>

      <CraftGrid lang="ja" />

      {todayEvents.length > 0 && (
        <EventModal 
          open={eventOpen} 
          onClose={() => setEventOpen(false)}
          event={todayEvents[currentEventIndex]}
        />
      )}
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
