"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/types/types";
import { useUser } from "@/contexts/UserContext";
import { getLocale, getTranslations } from "@/lib/i18n";
import type { UserLanguage } from "@/types/types";
import { supabase } from "@/lib/supabase";

const INTENT_KEYS = [
  'material',        // 素材・原料・道具・耐久性
  'history',         // 歴史・起源・文化背景
  'process',         // 技法・工程・作り方
  'price',           // 販売価格・料金
  'products',        // 工芸品を用いた製品
  'other_craft',     // その他工芸品について
  'purchase',        // 購入場所・店舗・オンライン購入
  'experience',      // ワークショップ・体験・所要時間
  'access_location', // 展示場所・工房所在地・アクセス方法
  'facility_rules',  // 撮影可否・開館時間・ルール・サービス
  'child_beginner',  // 初心者向け・子ども向け・対象年代
  'other'            // その他(分類不能)
] as const;

type IntentKey = typeof INTENT_KEYS[number];

async function classifyIntent(question: string): Promise<IntentKey> {
  try {
    const response = await fetch('/api/classify-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    if (response.ok) {
      const data = await response.json();
      const { intent } = data;
      if (INTENT_KEYS.includes(intent)) {
        return intent;
      }
    }
  } catch (e) {
    console.error('[Intent Classification] Failed:', e);
  }
  return 'other';
}

interface ChatbotModalProps {
  open: boolean;
  onClose: () => void;
  craftSlug?: string;
  craftName?: string;
  craftId?: number;
  lang?: string;
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

export default function ChatbotModal({ open, onClose, craftSlug, craftName, craftId, lang: langProp }: ChatbotModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userProfile, visitId } = useUser();
  const lang = langProp || userProfile?.language || "ja";
  const t = getTranslations(lang as UserLanguage);
  const locale = getLocale(lang as UserLanguage);

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

    // Log chat to Supabase with intent classification
    if (visitId) {
      classifyIntent(text).then((intent) => {
        supabase.from('chat_logs').insert({
          visit_id: visitId,
          craft_id: craftId || null,
          source: 'app',
          language_ui: lang,
          question_text: text,
          user_id_hash: null,
          intent: intent
        }).then(({ error }) => {
          if (error) {
            console.error('Error logging chat:', error);
          }
        });
      });
    }

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
          <CardTitle className="text-base">{craftName ? `${craftName} チャットボット` : t.chatbot.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-3 bg-neutral-50 overflow-auto">
          {messages.length === 0 ? (
            <div className="text-sm text-neutral-600 space-y-2">
              {craftName ? (
                t.chatbot.craftIntro.map((line, index) => (
                  <p key={index}>{line.replace('{craftName}', craftName)}</p>
                ))
              ) : (
                t.chatbot.intro.map((line, index) => (
                  <p key={index}>{line}</p>
                ))
              )}
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
