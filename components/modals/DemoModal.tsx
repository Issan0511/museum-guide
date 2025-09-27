"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-3 border-b">
          <CardTitle className="text-base">職人実演</CardTitle>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent" onClick={onClose}>
            ×
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm text-neutral-700">準備中</p>
        </CardContent>
      </Card>
    </div>
  );
}
