"use client";
import { useState, useEffect } from "react";

interface AdModalProps {
  isOpen: boolean;
  onAdFinished: () => void;
  onClose: () => void;
  lang: "ja" | "en";
}

export default function AdModal({
  isOpen,
  onAdFinished,
  onClose,
  lang,
}: AdModalProps) {
  const [countdown, setCountdown] = useState(3);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(3);
      setCanSkip(false);
      return;
    }

    setCountdown(3);
    setCanSkip(false);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const isEn = lang === "en";

  const handleClaim = () => {
    onAdFinished();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-gray-900 border border-blue-500 rounded-2xl p-6 shadow-2xl text-center overflow-hidden">
        {/* スポンサー広告表示 */}
        <div className="flex justify-between items-center text-[11px] text-gray-400 mb-3 border-b border-gray-800 pb-2">
          <span className="bg-blue-950 text-blue-400 border border-blue-800 px-2 py-0.5 rounded font-mono font-bold">
            SPONSOR AD
          </span>
          <span className="font-mono text-yellow-400 font-bold">
            {canSkip
              ? isEn
                ? "Reward Ready!"
                : "視聴完了！"
              : `${countdown}s`}
          </span>
        </div>

        {/* 広告内容（防犯啓発のパロディ広告） */}
        <div className="bg-gradient-to-br from-blue-950/60 to-purple-950/60 border border-blue-800/50 rounded-xl p-5 mb-4 space-y-2 text-left">
          <div className="text-2xl text-center">🛡️</div>
          <div className="text-sm font-black text-blue-300 text-center">
            {isEn
              ? "Cyber Crime Prevention App"
              : "警視庁公認：防犯セキュリティPlus"}
          </div>
          <p className="text-xs text-gray-300 leading-relaxed text-center">
            {isEn
              ? "Protect your assets from phishing & covert side-hustle scams with AI monitoring."
              : "「うまい話には裏がある」怪しいURLや投資勧誘をAIがリアルタイム検知・自動ブロック！"}
          </p>
        </div>

        {/* ボタン */}
        {canSkip ? (
          <button
            onClick={handleClaim}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black text-sm rounded-xl transition duration-200 shadow-lg shadow-yellow-500/30 cursor-pointer animate-pulse"
          >
            {isEn
              ? "Claim Ad Reward & Unlock ❯"
              : "広告特典を受け取る（解放） ❯"}
          </button>
        ) : (
          <button
            disabled
            className="w-full py-3 bg-gray-800 text-gray-500 font-bold text-xs rounded-xl cursor-not-allowed"
          >
            {isEn
              ? `Watching ad... (${countdown}s)`
              : `広告を再生中... (${countdown}秒)`}
          </button>
        )}
      </div>
    </div>
  );
}
