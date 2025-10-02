"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DemoTemplate } from "@/types/craft";

export default function DemoModal({ 
  open, 
  onClose, 
  demo 
}: { 
  open: boolean; 
  onClose: () => void; 
  demo?: DemoTemplate;
}) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center justify-between space-y-0 pb-3 border-b">
          <CardTitle className="text-base">職人実演</CardTitle>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent ml-auto" onClick={onClose}>
            ×
          </Button>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {demo ? (
            <>
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={demo.img}
                  alt={`${demo.name}の実演`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 400px, 100vw"
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
            <p className="text-sm text-neutral-700">準備中</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
