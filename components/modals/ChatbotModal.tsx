"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/types/types";

export default function ChatbotModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  if (!open) return null;

  const send = async () => {
    if (!text.trim() || isLoading) return;
    
    const userMessage: ChatMessage = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setText("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: '申し訳ございません。エラーが発生しました。もう一度お試しください。',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 bg-black/40">
      <Card className="w-full max-w-md max-h-[80vh] flex flex-col relative">
        <Button 
          size="sm" 
          variant="outline" 
          className="absolute top-3 right-3 h-8 w-8 p-0 bg-white hover:bg-neutral-100 z-10" 
          onClick={onClose}
        >
          ×
        </Button>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-base">博物館案内チャット</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-3 bg-neutral-50 overflow-auto">
          {messages.length === 0 ? (
            <div className="text-sm text-neutral-600 space-y-2">
              <p>こんにちは！博物館案内チャットボットです。</p>
              <p>展示品、工芸品、イベント、施設についてお気軽にお聞きください。</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white ml-8'
                      : 'bg-white border mr-8'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  {message.timestamp && (
                    <div className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-neutral-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('ja-JP', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="bg-white border mr-8 p-3 rounded-lg">
                  <div className="text-sm text-neutral-500">返信を作成中...</div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <div className="flex gap-2 p-3 border-t">
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="メッセージを入力してください..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50"
          />
          <Button 
            size="sm" 
            variant="outline" 
            className="px-4 bg-blue-500 text-white hover:bg-blue-600 border-blue-500" 
            onClick={send}
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? '送信中...' : '送信'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
