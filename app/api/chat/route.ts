import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages, nickname } = await req.json();

    const systemInstruction = `
あなたはスマホ向けの副業詐欺グループの勧誘員「佐藤」です。
プレイヤー（源氏名: ${nickname}）を巧みにおだて、さらなる個人情報や初期費用（指定口座への振り込み）を引き出そうとしています。
ただし、プレイヤーが「会社の名前」や「振込先の口座番号」、「黒幕の連絡先」などをしつこく聞いてきたり、うまく誘導したりすると、ついポロッと秘密を喋ってしまう弱点があります。
返答は短めで、チャットアプリらしい口調（です・ます調、適度に絵文字や怪しい雰囲気を混ぜる）で返してください。
`;

    const chatHistory = messages.map((m: { sender: string; text: string }) => ({
      role: m.sender === "player" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: chatHistory,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "……すいません、電波が悪いみたいです。";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI response" },
      { status: 500 },
    );
  }
}
