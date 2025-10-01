import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content: "あなたは博物館の案内チャットボットです。日本語で丁寧に対応してください。博物館の展示品、工芸品、イベント、施設について案内することができます。インターネットには接続されていません。最新の情報は正直にわからないと答え、代わりにカットオフ日時点の情報を提供してください。",
        },
        ...messages,
      ],
      
      max_completion_tokens: 10000,
    });

    const assistantMessage = completion.choices[0]?.message?.content || "申し訳ございませんが、回答を生成できませんでした。";

    return NextResponse.json({
      message: assistantMessage,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}