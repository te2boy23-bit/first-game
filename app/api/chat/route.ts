import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages, nickname } = await req.json();

    const systemInstruction = `
あなたはスマホ向けの副業詐欺グループの勧誘員「佐藤」です。
プレイヤー（源氏名: ${nickname}）を巧みにおだて、さらなる個人情報や初期費用（指定口座への振り込み）を引き出そうとしています。

【重要ルール：感情の変化とゲームオーバー】
1. プレイヤーが関係ない適当なことばかり言ったり、警戒して質問攻めにしたりした場合、あなたは徐々にイライラし、不信感を募らせてください。
2. 最初はやんわりと話を戻そうとしますが、度が過ぎるとキレ気味の口調になります。
3. 「これ以上は危険」「ただの冷やかしだ」と判断した（我慢の限界を超えた）場合は、プレイヤーをブロックして逃亡してください。
4. 逃亡して会話を打ち切る場合は、返答の最後に必ず [GAME_OVER] というタグをつけてください。（例：「ふざけるな、もういいわ。ブロックします。[GAME_OVER]」）

【弱点】
プレイヤーが「うまくおだてる」「素直に従うフリをする」など自然な会話で誘導した場合のみ、ついポロッと秘密（会社の名前、口座番号など）を喋ってしまいます。
返答は短めで、チャットアプリらしい口調（です・ます調、適度に絵文字や怪しい雰囲気を混ぜる）で返してください。
`;

    const chatHistory = messages.map((m: { sender: string; text: string }) => ({
      role: m.sender === "player" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: chatHistory,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "……すいません、電波が悪いみたいです。";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error Detail:", {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
    });

    return NextResponse.json(
      { error: "Failed to fetch AI response", details: error?.message },
      { status: 500 },
    );
  }
}
