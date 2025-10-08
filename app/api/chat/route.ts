import { NextRequest } from "next/server";
import OpenAI from "openai";
import { promises as fs } from "fs";
import path from "path";
import { SEED } from "@/data/crafts.seed";
import type { CraftItem } from "@/types/craft";
import { pickLang } from "@/types/craft";
import type { UserProfile } from "@/types/types";

export const runtime = "nodejs"; // fs利用のためEdgeは不可

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { messages, craftSlug, userProfile } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: "Invalid messages format" }), {
      status: 400,
    });
  }

  let systemPrompt =
    "あなたは博物館の案内チャットボットです。日本語で丁寧に対応してください。博物館の展示品、工芸品、イベント、施設について案内することができます。インターネットには接続されていません。max_completion_tokens が2000なので、必要な情報のみを回答してください";

  // ユーザーの年齢層に応じて話し方を調整
  if (userProfile && userProfile.age) {
    if (userProfile.age === 9) {
      // 12歳以下：小学生向け
      systemPrompt += "\n\nユーザーは小学生です。わかりやすい言葉を使い、難しい漢字はひらがなで説明し、楽しく親しみやすい口調で話してください。";
    } else if (userProfile.age === 16) {
      // 13-17歳：中高生向け
      systemPrompt += "\n\nユーザーは中高生です。丁寧でありながらもフレンドリーな口調で、興味を引くような説明を心がけてください。";
    } else {
      // 18歳以上：通常の大人向け
      systemPrompt += "\n\nユーザーは大人です。";
    }
  }

  if (craftSlug) {
    const craftItem = (SEED as CraftItem[]).find((c) => c.slug === craftSlug);
    if (craftItem) {
      const name = pickLang(craftItem.name, "ja");
      const summary = pickLang(craftItem.summary, "ja");
      const desc = pickLang(craftItem.description, "ja");

      systemPrompt += `

現在、あなたは「${name}」の詳細ページにいるユーザーと話しています。
工芸品情報：
- 名前: ${name}
- 概要: ${summary}
- 詳細: ${desc}`;

      try {
        const mdPath = path.join(
          process.cwd(),
          "public",
          "craft_texts",
          `${craftSlug}.md`,
        );
        const md = await fs.readFile(mdPath, "utf-8");
        systemPrompt += `

以下は${name}に関する詳細な展示情報です：
${md}`;
      } catch {
        // MD無しは無視
      }

      systemPrompt += `

この工芸品について詳しく説明し、ユーザーの質問に答えてください。`;
    }
  }

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
          max_completion_tokens: 2000,
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
