import type { CraftItem } from "@/types/craft";
import { pickLang } from "@/types/craft";
import type { UserProfile } from "@/types/types";
import { getPublicUrl } from "@/lib/supabasePublic";

const BASE_PROMPT =
  "あなたは博物館の案内チャットボットです。丁寧に対応してください。博物館の展示品、工芸品について案内することができます。インターネットには接続されていません。\n\n" +
  "以下のルールを厳守してください：\n" +
  "1. 質問者と同じ言語を使って回答してください。\n" +
  "2. スマホで読みやすいよう、回答は200字（英語などの言語では300単語）程度に収めてください。短すぎてもいけません。\n" +
  "3. 字数がもったいないので、この指示を守った旨や「承知しました」などの前置きは表示しないでください。";

/**
 * ユーザーの年齢層に応じて話し方を調整したプロンプトを生成
 */
function getAgeAdjustedPrompt(basePrompt: string, userProfile?: UserProfile): string {
  if (!userProfile || !userProfile.age) {
    return basePrompt;
  }

  if (userProfile.age === 9) {
    // 12歳以下：小学生向け
    return (
      basePrompt +
      "\n\nユーザーは小学生です。わかりやすい言葉を使い、難しい漢字はひらがなで説明し、楽しく親しみやすい口調で話してください。"
    );
  } else if (userProfile.age === 16) {
    // 13-17歳：中高生向け
    return (
      basePrompt +
      "\n\nユーザーは中高生です。丁寧でありながらもフレンドリーな口調で、興味を引くような説明を心がけてください。"
    );
  } else {
    // 18歳以上：通常の大人向け
    return basePrompt + "\n\nユーザーは大人です。";
  }
}

/**
 * 工芸品情報をプロンプトに追加
 */
async function addCraftContext(
  prompt: string,
  craftItem: CraftItem
): Promise<string> {
  const name = pickLang(craftItem.name, "ja");
  const summary = pickLang(craftItem.summary, "ja");
  const desc = pickLang(craftItem.description, "ja");

  let craftPrompt = prompt;
  craftPrompt += `

現在、あなたは「${name}」の詳細ページにいるユーザーと話しています。
工芸品情報：
- 名前: ${name}
- 概要: ${summary}
- 詳細: ${desc}`;

  // MDファイルがあれば追加
  try {
    const mdUrl = getPublicUrl(`craft_texts/${craftItem.id}.md`);
    const response = await fetch(mdUrl);
    if (response.ok) {
      const md = await response.text();
      craftPrompt += `

以下は${name}に関する詳細な展示情報です：
${md}`;
    }
  } catch {
    // MD無しは無視
  }

  craftPrompt += `

この工芸品について詳しく説明し、ユーザーの質問に答えてください。`;

  return craftPrompt;
}

/**
 * システムプロンプトを生成
 */
export async function buildSystemPrompt(
  userProfile?: UserProfile,
  craftItem?: CraftItem
): Promise<string> {
  let prompt = getAgeAdjustedPrompt(BASE_PROMPT, userProfile);

  if (craftItem) {
    prompt = await addCraftContext(prompt, craftItem);
  }

  return prompt;
}
