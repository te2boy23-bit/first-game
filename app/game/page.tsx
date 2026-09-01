"use client";
import { useState } from "react";

export default function GamePage() {
  const [messages, setMessages] = useState([
    {
      sender: "scammer",
      text: "登録ありがとうございます！担当の佐藤です。本日から副業スタートですね。まずは最初の簡単な作業をご案内します。",
    },
  ]);
  const [input, setInput] = useState("");

  const [evidences, setEvidences] = useState([
    { id: 1, name: "組織の正式名称", found: false },
    { id: 2, name: "振込先口座番号", found: false },
    { id: 3, name: "黒幕の連絡先", found: false },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "player", text: input }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "scammer",
          text: "なるほどですね！ちなみに作業を進めるには、こちらの指定口座への初期費用が必要になりまして…（ふふっ、カモだな）",
        },
      ]);
    }, 1000);
  };

  return (
    <main className="flex flex-col md:flex-row h-[100dvh] bg-gray-950 text-gray-100 overflow-hidden">
      {/* 左側（スマホでは上部）：警察からのミッション・証拠リスト */}
      {/* スマホでは高さを抑え、デスクトップ(md)では横幅1/3にする */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-800 p-4 md:p-6 flex flex-col justify-between bg-gray-900/50 shrink-0 max-h-[30vh] md:max-h-none overflow-y-auto">
        <div>
          <div className="text-xs text-pink-500 font-bold mb-1">STAGE 1</div>
          <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">
            副業詐欺グループ摘発作戦
          </h2>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 md:p-4 mb-2 md:mb-6">
            <h3 className="text-xs md:text-sm font-semibold text-gray-300 mb-2 md:mb-3">
              📋 警察指令：証拠リスト
            </h3>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
              {evidences.map((ev) => (
                <li key={ev.id} className="flex items-center space-x-2">
                  <span
                    className={ev.found ? "text-green-400" : "text-gray-600"}
                  >
                    {ev.found ? "[✔]" : "[ ]"}
                  </span>
                  <span
                    className={
                      ev.found ? "text-gray-200 line-through" : "text-gray-400"
                    }
                  >
                    {ev.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="hidden md:block text-xs text-gray-500">
          Status: 潜入捜査中（安全確保済）
        </div>
      </div>

      {/* 右側（スマホでは下部）：詐欺師とのチャット画面 */}
      <div className="w-full md:w-2/3 flex-1 flex flex-col justify-between bg-gray-950 min-h-0">
        {/* チャットヘッダー */}
        <div className="p-3 md:p-4 border-b border-gray-800 bg-gray-900/30 flex items-center justify-between shrink-0">
          <div>
            <span className="font-bold text-pink-400 text-sm md:text-base">
              佐藤（副業エージェント）
            </span>
            <span className="ml-2 text-xs text-gray-500">オンライン</span>
          </div>
          <div className="text-xs bg-red-950 text-red-400 px-2 py-1 rounded border border-red-800">
            危険度：中
          </div>
        </div>

        {/* メッセージ表示エリア */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 min-h-0">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "player" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] md:max-w-md p-3 rounded-lg text-sm ${
                  msg.sender === "player"
                    ? "bg-pink-600 text-white rounded-br-none"
                    : "bg-gray-900 border border-gray-800 text-gray-200 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* 入力フォーム */}
        <form
          onSubmit={handleSend}
          className="p-3 md:p-4 border-t border-gray-800 bg-gray-900/30 flex gap-2 shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="詐欺師への返信を入力..."
            className="flex-1 p-2.5 md:p-3 bg-gray-900 border border-gray-800 rounded text-white focus:border-pink-500 focus:outline-none text-sm"
          />
          <button
            type="submit"
            className="px-4 md:px-6 py-2.5 md:py-3 bg-pink-600 hover:bg-pink-500 font-bold rounded text-sm transition duration-200 shrink-0"
          >
            送信
          </button>
        </form>
      </div>
    </main>
  );
}
