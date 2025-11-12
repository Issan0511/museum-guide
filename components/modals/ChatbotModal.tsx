"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/types/types";
import { useUser } from "@/contexts/UserContext";
import { getLocale, getTranslations } from "@/lib/i18n";

interface ChatbotModalProps {
  open: boolean;
  onClose: () => void;
  craftSlug?: string;
}

// 簡易的なフォーマット関数
function formatMessage(content: string): React.ReactNode {
  // 改行を保持して表示
  return (
    <pre className="whitespace-pre-wrap break-words font-sans text-sm m-0">
      {content}
    </pre>
  );
}

export default function ChatbotModal({ open, onClose, craftSlug }: ChatbotModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userProfile } = useUser();
  const lang = userProfile?.language ?? "ja";
  const t = getTranslations(lang);
  const locale = getLocale(lang);

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
          })),
          craftSlug: craftSlug,
          userProfile: userProfile
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      console.log('Response received:', response);
      
      // ストリーミングレスポンスを処理
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';
      let buffer = ''; // SSEのバッファ

      // 空のアシスタントメッセージを追加
      const assistantMessageIndex = messages.length + 1;
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          
          // バッファに追加
          buffer += chunk;
          
          // SSE形式のデータをパース（完全な行のみ処理）
          const lines = buffer.split('\n');
          
          // 最後の不完全な行はバッファに残す
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              
              if (data === '[DONE]') {
                console.log('Stream finished with [DONE]');
                break;
              }
              
              if (data.startsWith('[ERROR]')) {
                console.error('Stream error:', data);
                throw new Error(data.slice(8));
              }
              
              // 通常のテキストデータを追加（マーカーを改行に戻す）
              const decodedData = data.replace(/⸨NEWLINE⸩/g, '\n');
              assistantContent += decodedData;
              
              // メッセージを更新
              setMessages((prev) => {
                const updated = [...prev];
                updated[assistantMessageIndex] = {
                  role: 'assistant',
                  content: assistantContent,
                  timestamp: new Date()
                };
                return updated;
              });
            }
          }
        }
      }
      
      console.log('Final assistant message:', assistantContent);
      console.log('Final message length:', assistantContent.length);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: t.chatbot.error,
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
          <CardTitle className="text-base">{t.chatbot.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-3 bg-neutral-50 overflow-auto">
          {messages.length === 0 ? (
            <div className="text-sm text-neutral-600 space-y-2">
              {t.chatbot.intro.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white ml-8'
                      : 'bg-white border mr-8'
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.role === 'assistant' && message.content
                      ? formatMessage(message.content)
                      : message.content || '...'}
                  </div>
                  {message.timestamp && (
                    <div className={`text-xs mt-2 pt-2 border-t ${
                      message.role === 'user' ? 'text-blue-100 border-blue-400' : 'text-neutral-500 border-neutral-200'
                    }`}>
                      {message.timestamp.toLocaleTimeString(locale, {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="bg-white border mr-8 p-3 rounded-lg">
                  <div className="text-sm text-neutral-500">{t.chatbot.typing}</div>
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
            placeholder={t.chatbot.inputPlaceholder}
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50"
          />
          <Button
            size="sm"
            variant="outline"
            className="px-4 bg-blue-500 text-black hover:bg-blue-600 border-blue-500"
            onClick={send}
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? t.chatbot.sending : t.chatbot.send}
          </Button>
        </div>
      </Card>
    </div>
  );
}
