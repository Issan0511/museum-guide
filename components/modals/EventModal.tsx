"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/craft";

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
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-3 border-b">
          <CardTitle className="text-base">{event.name}</CardTitle>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent" onClick={onClose}>
            ×
          </Button>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/event_images/${event.id}.png`}
              alt={event.name}
              fill
              className="object-cover bg-white"
              sizes="(min-width: 768px) 400px, 100vw"
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
