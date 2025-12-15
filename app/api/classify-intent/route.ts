import { NextRequest } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

// 2つ目のAPIキーを使用
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY_2});

const INTENT_CLASSIFICATION_PROMPT = `あなたは質問の意図を分類するアシスタントです。
ユーザーの質問を以下のカテゴリのうち1つに分類してください。

## カテゴリ一覧

- material: 素材・原料・道具・耐久性について
- history: 歴史・起源・文化背景について
- process: 技法・工程・作り方について
- price: 販売価格・料金について
- products: 工芸品を用いた製品について
- other_craft: 工芸品について(上記には分類できないが工芸品に関連する質問)
- purchase: 購入場所・店舗・オンライン購入について
- experience: ワークショップ・体験・所要時間について
- access_location: 展示場所・工房所在地・アクセス方法について
- facility_rules: 撮影可否・開館時間・ルール・サービスについて
 - child_beginner: 初心者向け・子ども向け・対象年代について
- other: 上記のいずれにも当てはまらない場合

## 重要な指示

1. 必ず上記のカテゴリのキーのうち1つだけを返してください
2. キー以外の余分なテキスト、説明、句読点は含めないでください
3. 小文字で返してください

## 例

質問: "この織物の値段はいくらですか？"
回答: price

質問: "初心者でも作れますか？"
回答: child_beginner`;

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string") {
      return new Response(JSON.stringify({ intent: "other" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
        { role: "system", content: INTENT_CLASSIFICATION_PROMPT },
        { role: "user", content: question },
      ],

    });

    const rawContent = response.choices[0]?.message?.content || "other";
    const intent = rawContent.trim().toLowerCase();

    const validIntents = [
      "material",
      "history",
      "process",
      "price",
      "products",
      "other_craft",
      "purchase",
      "experience",
      "access_location",
      "facility_rules",
      "child_beginner",
      "other",
    ];

    const finalIntent = validIntents.includes(intent) ? intent : "other";

    return new Response(JSON.stringify({ intent: finalIntent }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Intent classification error:", error);
    return new Response(JSON.stringify({ intent: "other" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
