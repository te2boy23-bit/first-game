"use client";
import { useState, useEffect } from "react";

interface AdModalProps {
  isOpen: boolean;
  onAdFinished: () => void;
  onClose: () => void;
  lang: "ja" | "en" | "my" | "ne";
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

  const getRewardReadyText = () => {
    switch (lang) {
      case "en":
        return "Reward Ready!";
      case "my":
        return "ဆုလာဘ် အသင့်ဖြစ်ပြီ！";
      case "ne":
        return "इनाम तयार छ!";
      default:
        return "視聴完了！";
    }
  };

  const getAdTitle = () => {
    switch (lang) {
      case "en":
        return "Cyber Crime Prevention App";
      case "my":
        return "ဆိုက်ဘာလုံခြုံရေး ကာကွယ်ရေး အက်ပ်";
      case "ne":
        return "साइबर सुरक्षा रोकथाम एप";
      default:
        return "警視庁公認：防犯セキュリティPlus";
    }
  };

  const getAdDesc = () => {
    switch (lang) {
      case "en":
        return "Protect your assets from phishing & covert side-hustle scams with AI monitoring.";
      case "my":
        return "မသင်္ကာဖွယ် လင့်ခ်များနှင့် လိမ်လည်မှုများကို AI ဖြင့် အချိန်နှင့်တစ်ပြေးညီ ကာကွယ်ပါ။";
      case "ne":
        return "AI निगरानीको साथ फिसिङ र शंकास्पद अनलाइन ठगीहरूबाट आफ्नो सम्पत्ति सुरक्षित गर्नुहोस्।";
      default:
        return "「うまい話には裏がある」怪しいURLや投資勧誘をAIがリアルタイム検知・自動ブロック！";
    }
  };

  const getClaimText = () => {
    switch (lang) {
      case "en":
        return "Claim Ad Reward & Unlock ❯";
      case "my":
        return "ဆုလာဘ် ရယူပြီး အဆင့်ဖွင့်ရန် ❯";
      case "ne":
        return "विज्ञापन इनाम लिनुहोस् र अनलक गर्नुहोस् ❯";
      default:
        return "広告特典を受け取る（解放） ❯";
    }
  };

  const getWatchingText = () => {
    switch (lang) {
      case "en":
        return `Watching ad... (${countdown}s)`;
      case "my":
        return `ကြော်ငြာ ကြည့်ရှုနေပါသည်... (${countdown}စက္ကန့်)`;
      case "ne":
        return `विज्ञापन हेर्दै... (${countdown} सेकेन्ड)`;
      default:
        return `広告を視聴中... (${countdown}秒)`;
    }
  };

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
            {canSkip ? getRewardReadyText() : `${countdown}s`}
          </span>
        </div>

        {/* 広告内容（防犯啓発のパロディ広告） */}
        <div className="bg-gradient-to-br from-blue-950/60 to-purple-950/60 border border-blue-800/50 rounded-xl p-5 mb-4 space-y-2 text-left">
          <div className="text-2xl text-center">🛡️</div>
          <div className="text-sm font-black text-blue-300 text-center">
            {getAdTitle()}
          </div>
          <p className="text-xs text-gray-300 leading-relaxed text-center">
            {getAdDesc()}
          </p>
        </div>

        {/* ボタン */}
        {canSkip ? (
          <button
            onClick={handleClaim}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black text-sm rounded-xl transition duration-200 shadow-lg shadow-yellow-500/30 cursor-pointer animate-pulse"
          >
            {getClaimText()}
          </button>
        ) : (
          <button
            disabled
            className="w-full py-3 bg-gray-800 text-gray-500 font-bold text-xs rounded-xl cursor-not-allowed"
          >
            {getWatchingText()}
          </button>
        )}
      </div>
    </div>
  );
}
