import { NextRequest } from "next/server";
import OpenAI from "openai";
import type { CraftItem } from "@/types/craft";
import type { UserProfile } from "@/types/types";
import { buildSystemPrompt } from "@/lib/chatPrompts";
import { supabase } from "@/lib/supabase";
import { mapCraftRow, type CraftRow } from "@/lib/supabaseMappers";

export const runtime = "nodejs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { messages, craftId, userProfile } = await req.json();

  console.log('=== リクエスト情報 ===');
  console.log('craftId:', craftId);
  console.log('userProfile:', userProfile);

  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: "Invalid messages format" }), {
      status: 400,
    });
  }

  let craftItem: CraftItem | undefined;
  if (craftId) {
    const { data, error } = await supabase
      .from("crafts")
      .select("*")
      .eq("id", craftId)
      .maybeSingle();
    
    if (!error && data) {
      craftItem = mapCraftRow(data as CraftRow);
    }
  }

  const systemPrompt = await buildSystemPrompt(userProfile, craftItem);

  console.log('=== システムプロンプト ===');
  console.log(systemPrompt);
  console.log('=== メッセージ履歴 ===');
  console.log(JSON.stringify(messages, null, 2));
  console.log('========================');

  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      const send = (data: string) => {
        controller.enqueue(enc.encode(`data: ${data}\n\n`));
      };

      try {
        console.log('Starting OpenAI stream...');
        const resp = await openai.chat.completions.create({
          model: "gpt-5-mini",
          stream: true,
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          max_completion_tokens: 5000,
          reasoning_effort : "low",
        });

        let fullResponse = '';
        for await (const part of resp) {
          const delta = part.choices?.[0]?.delta?.content;
          if (delta) {
            fullResponse += delta;
            // 改行を特殊マーカーに置き換えて送信
            const markedDelta = delta.replace(/\n/g, '⸨NEWLINE⸩');
            send(markedDelta);
          }
        }
        console.log('Stream complete. Response length:', fullResponse.length);
        console.log('Has newlines:', fullResponse.includes('\n'));
      } catch (e: unknown) {
        console.error("Chat error:", e);
        send(`[ERROR] ${e instanceof Error ? e.message : "unknown error"}`);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
