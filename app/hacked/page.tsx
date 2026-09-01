"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function HackedPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("プレイヤー");

  useEffect(() => {
    // ローカルストレージなどからニックネームを受け取る（ここでは簡易的に）
    const savedName = localStorage.getItem("scam_nickname");
    if (savedName) setNickname(savedName);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-green-400 font-mono p-4">
      <div className="w-full max-w-lg bg-black border border-green-500 rounded-xl p-8 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
        <div className="text-xs text-green-600 mb-2">[SYSTEM INTERRUPT]</div>
        <h1 className="text-2xl font-bold mb-4 text-green-300">
          ⚠️ 警視庁 サイバー犯罪対策課
        </h1>
        <p className="text-sm leading-relaxed mb-6">
          対象のデータベースへの侵入を確認。
          <br />
          おい、<span className="text-white font-bold">{nickname}</span>
          。さっき入力したデータ、完全に詐欺グループのサーバーに吸い上げられたぞ。
          <br />
          <br />
          ……だが、好都合だ。お前を「おとり捜査官（エージェント）」として特例採用する。
          これより、そのアカウントを使って奴らを逆にハックし、全ての証拠を暴いてもらう！
        </p>
        <button
          onClick={() => router.push("/game")}
          className="w-full py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded transition duration-200 cursor-pointer"
        >
          捜査任務を開始する ＞
        </button>
      </div>
    </main>
  );
}
