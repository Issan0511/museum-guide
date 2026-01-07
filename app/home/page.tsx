"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EventModal from "@/components/modals/EventModal";
import DemoModal from "@/components/modals/DemoModal";
import CraftGrid from "@/components/CraftGrid";
import { supabase, type CalendarData } from "@/lib/supabase";
import { getPublicUrl } from "@/lib/supabasePublic";
import type { DemoTemplate, Event } from "@/types/types";
import { pickLang } from "@/types/types";
import { mapDemoTemplateRow, mapEventRow, type DemoTemplateRow, type EventRow } from "@/lib/supabaseMappers";
import { useUser, useRequireUser } from "@/contexts/UserContext";
import { getTranslations } from "@/lib/i18n";

export default function HomePage() {
  const { isReady } = useRequireUser();
  const [eventOpen, setEventOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [todayDemo, setTodayDemo] = useState<DemoTemplate | null>(null);
  const [todayEvents, setTodayEvents] = useState<Event[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { userProfile } = useUser();

  const lang = useMemo(() => userProfile?.language ?? "ja", [userProfile]);
  const t = useMemo(() => getTranslations(lang), [lang]);

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
          const { data: demoRow, error: demoError } = await supabase
            .from("demo_templates")
            .select("*")
            .eq("id", calendarRow.template_id)
            .maybeSingle();

          if (demoError || !demoRow) {
            setTodayDemo(null);
          } else {
            setTodayDemo(mapDemoTemplateRow(demoRow as DemoTemplateRow));
          }
        } else {
          setTodayDemo(null);
        }

        // イベントデータの取得（開催期間中のもの）
        const { data: eventsData, error: eventsError } = await supabase
          .from("events")
          .select("*")
          .lte("start_date", todayStr)
          .gte("end_date", todayStr)
          .order("start_date", { ascending: true });

        if (eventsError || !eventsData) {
          setTodayEvents([]);
        } else {
          setTodayEvents((eventsData as EventRow[]).map(mapEventRow));
        }
        setCurrentEventIndex(0);
      } catch (error) {
        console.error("Failed to load home page data", error);
        setTodayDemo(null);
        setTodayEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayData();
  }, []);


  const currentDemoName = todayDemo ? pickLang(todayDemo.name, lang) ?? "" : "";
  const currentEventName = todayEvents.length > 0 ? pickLang(todayEvents[currentEventIndex].name, lang) ?? "" : "";

  // ユーザー情報がなければリダイレクト中なので何も表示しない
  if (!isReady) {
    return null;
  }

  return (
    <div className="space-y-4">
      <button onClick={() => history.back()} className="text-sm text-neutral-700 hover:text-neutral-900 mb-3">
        {t.home.backToLanguageSelection}
      </button>

      <Card className="bg-neutral-100 border-neutral-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t.home.todaysDemoTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-neutral-600">{t.home.loading}</p>
            </div>
          ) : todayDemo ? (
            <>
              <div className="relative w-full h-60 rounded-lg overflow-hidden">
                <Image
                  src={getPublicUrl(`demo_images/${todayDemo.id}.png`)}
                  alt={currentDemoName}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 320px, 100vw"
                  unoptimized
                />
              </div>
              <div className="text-base font-semibold text-neutral-700 mb-2">
                {currentDemoName}
              </div>
              <Button variant="outline" onClick={() => setDemoOpen(true)}>
                {t.home.viewDetails}
              </Button>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-600">{t.home.noDemo}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-neutral-100 border-neutral-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t.home.eventsTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-neutral-600">{t.home.loading}</p>
            </div>
          ) : todayEvents.length > 0 ? (
            <>
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <Image
                  src={getPublicUrl(`event_images/${todayEvents[currentEventIndex].id}.png`)}
                  alt={currentEventName}
                  fill
                  className="object-cover bg-white"
                  sizes="(min-width: 768px) 320px, 100vw"
                  unoptimized
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
                  {currentEventName}
                </div>
                {todayEvents.length > 1 && (
                  <div className="text-sm text-neutral-600">
                    {currentEventIndex + 1} / {todayEvents.length}
                  </div>
                )}
              </div>
              <Button variant="outline" onClick={() => setEventOpen(true)}>
                {t.home.viewDetails}
              </Button>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-600">{t.home.noEvents}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <CraftGrid lang={lang} />

      <div className="mt-8 pt-4 border-t border-neutral-200 text-center text-sm text-neutral-600 space-x-4">
        <Link href="/legal/terms" className="hover:text-neutral-900 underline">
          {t.home.termsOfUse}
        </Link>
        <span>|</span>
        <Link href="/legal/privacy" className="hover:text-neutral-900 underline">
          {t.home.privacyPolicy}
        </Link>
      </div>

      {todayEvents.length > 0 && (
        <EventModal
          open={eventOpen}
          onClose={() => setEventOpen(false)}
          event={todayEvents[currentEventIndex]}
          lang={lang}
        />
      )}
      {todayDemo && (
        <DemoModal
          open={demoOpen}
          onClose={() => setDemoOpen(false)}
          demo={todayDemo}
          lang={lang}
        />
      )}
    </div>
  );
}
