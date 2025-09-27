"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ChatbotModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState("");
  if (!open) return null;

  const send = () => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, `You: ${text}`, "Bot: （ダミー応答）"]);
    setText("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 bg-black/40">
      <Card className="w-full max-w-md max-h-[80vh] flex flex-col">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-3 border-b">
          <CardTitle className="text-base">お問い合わせチャット</CardTitle>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent" onClick={onClose}>
            ×
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-3 bg-neutral-50 overflow-auto">
          {messages.length === 0 ? (
            <p className="text-sm text-neutral-600">こちらはダミーUIです。実装用APIと接続してください。</p>
          ) : (
            <pre className="text-xs whitespace-pre-wrap">{messages.join("\n")}</pre>
          )}
        </CardContent>
        <div className="flex gap-2 p-3 border-t">
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            type="text"
            placeholder="メッセージを入力"
            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
          <Button size="sm" variant="outline" className="px-4 bg-transparent" onClick={send}>
            送信
          </Button>
        </div>
      </Card>
    </div>
  );
}
