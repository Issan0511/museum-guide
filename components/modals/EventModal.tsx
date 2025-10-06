"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/types";
import { getPublicUrl } from "@/lib/supabasePublic";

export default function EventModal({ open, onClose, event }: { open: boolean; onClose: () => void; event: Event }) {
  if (!open) return null;
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto relative">
        <Button 
          size="sm" 
          variant="outline" 
          className="absolute top-3 right-3 h-8 w-8 p-0 bg-white hover:bg-neutral-100 z-10" 
          onClick={onClose}
        >
          ×
        </Button>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-base">{event.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={getPublicUrl(`event_images/${event.id}.png`)}
              alt={event.name}
              fill
              className="object-cover bg-white"
              sizes="(min-width: 768px) 400px, 100vw"
              unoptimized
            />
          </div>
          <div>
            <p className="text-sm text-neutral-600 whitespace-pre-wrap">{event.detail}</p>
          </div>
                    <div>
            <h3 className="font-semibold text-sm text-neutral-700 mb-1">開催期間</h3>
            <p className="text-sm text-neutral-600">
              {formatDate(event.startDate)} 〜 {formatDate(event.endDate)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
