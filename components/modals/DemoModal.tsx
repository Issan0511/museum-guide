"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DemoTemplate, UserLanguage } from "@/types/types";
import { getPublicUrl } from "@/lib/supabasePublic";
import { getTranslations } from "@/lib/i18n";

export default function DemoModal({
  open,
  onClose,
  demo,
  lang
}: {
  open: boolean;
  onClose: () => void;
  demo?: DemoTemplate;
  lang?: UserLanguage;
}) {
  if (!open) return null;

  const t = getTranslations(lang);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <Card className="w-full max-w-md relative">
        <Button
          size="sm" 
          variant="outline" 
          className="absolute top-3 right-3 h-8 w-8 p-0 bg-white hover:bg-neutral-100 z-10" 
          onClick={onClose}
        >
          ×
        </Button>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-base">{t.demoModal.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {demo ? (
            <>
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={getPublicUrl(`demo_images/${demo.id}.png`)}
                  alt={demo.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 400px, 100vw"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{demo.name}</h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {demo.description}
                </p>
              </div>
            </>
          ) : (
            <p className="text-sm text-neutral-700">{t.demoModal.empty}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
