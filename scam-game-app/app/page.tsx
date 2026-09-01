"use client";
import { useState } from "react";

export default function Home() {
  // 画面の状態管理（'login' = 詐欺登録画面, 'hacked' = 警察にハックされた瞬間, 'game' = 本編チャットへ）
  const [step, setStep] = useState<"login" | "hacked" | "game">("login");

  // 入力フォームの状態
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname || !email || !password) {
      alert("すべての項目を入力してください！");
      return;
    }
    // まず「ハックされた（警察の介入）」演出の画面へ切り替える
    setStep("hacked");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-100 p-4">
      {/* 1. 詐欺の新規登録（ログイン）画面 */}
      {step === "login" && (
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">
          {/* 詐欺バナー風の演出 */}
          <div className="absolute top-0 left-0 right-0 bg-pink-600 text-white text-xs font-bold text-center py-1">
            ✨ 先着3名限定・日給5万円簡単ワーク ✨
          </div>

          <h2 className="text-xl font-bold mt-4 mb-2 text-pink-400">
            【公式】シークレット副業エージェント
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            以下の情報を登録して、今すぐ高収入案件をゲットしよう！
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                ニックネーム（源氏名）
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="例：カモ太郎"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                連絡用メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                ログインパスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-pink-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-pink-600 hover:bg-pink-500 font-bold rounded text-white transition duration-200 shadow-lg shadow-pink-600/30"
            >
              無料登録して今すぐ稼ぐ 🚀
            </button>
          </form>
        </div>
      )}

      {/* 2. ハック（警察スカウト）演出画面 */}
      {step === "hacked" && (
        <div className="w-full max-w-lg bg-black border border-green-500 rounded-xl p-8 shadow-[0_0_30px_rgba(34,197,94,0.3)] text-green-400 font-mono">
          <div className="text-xs text-green-600 mb-2">[SYSTEM INTERRUPT]</div>
          <h1 className="text-2xl font-bold mb-4 text-green-300">
            ⚠️ 警視庁 サイバー犯罪対策課
          </h1>
          <p className="text-sm leading-relaxed mb-6">
            対象のデータベースへの侵入を確認。
            <br />
            おい、<span className="text-white font-bold">{nickname}</span>
            。今入力したデータ、完全に詐欺グループのサーバーに吸い上げられたぞ。
            <br />
            <br />
            ……だが、好都合だ。お前を「おとり捜査官（エージェント）」として特例採用する。
            これより、そのアカウントを使って奴らを逆にハックし、全ての証拠を暴いてもらう！
          </p>
          <button
            onClick={() => setStep("game")}
            className="w-full py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded transition duration-200"
          >
            捜査任務を開始する ＞
          </button>
        </div>
      )}

      {/* 3. 本編スタート画面（ここからチャットやミッションに繋がります） */}
      {step === "game" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-pink-500 mb-4">
            ステージ1：副業詐欺グループの潜入捜査
          </h1>
          <p className="text-gray-400">
            ここに次のチャット画面や警察のミッションリストを展開していきます！
          </p>
        </div>
      )}
    </main>
  );
}
