"use client";

interface ClearModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName: string;
  clearedLevel: "easy" | "medium" | "hard" | "master";
  easyClearedCount: number;
  totalEasyCount: number;
  unlockedNewLevel?: string | null;
  lang: "ja" | "en" | "my" | "ne";
  onOpenArchive: () => void;
}

export default function ClearModal({
  isOpen,
  onClose,
  targetName,
  clearedLevel,
  easyClearedCount,
  totalEasyCount,
  unlockedNewLevel,
  lang,
  onOpenArchive,
}: ClearModalProps) {
  if (!isOpen) return null;

  const getBustedBadge = () => {
    switch (lang) {
      case "en":
        return "★ TARGET BUSTED ★";
      case "my":
        return "★ ပစ်မှတ် ဖမ်းဆီးရမိ ★";
      case "ne":
        return "★ लक्ष्य पक्राउ पर्यो ★";
      default:
        return "★ 摘発・検挙完了 ★";
    }
  };

  const getMissionClearedTitle = () => {
    switch (lang) {
      case "en":
        return "MISSION CLEARED!";
      case "my":
        return "စုံစမ်းစစ်ဆေးရေး အောင်မြင်သည်!";
      case "ne":
        return "मिसन सफल भयो!";
      default:
        return "捜査任務 成功！";
    }
  };

  const getEvidenceDesc = () => {
    switch (lang) {
      case "en":
        return (
          <>
            Successfully extracted decisive evidence from{" "}
            <span className="text-green-400 font-bold">{targetName}</span>!
          </>
        );
      case "my":
        return (
          <>
            <span className="text-green-400 font-bold">{targetName}</span> ထံမှ
            ခိုင်လုံသော သက်သေအထောက်အထားများ ရယူနိုင်ခဲ့ပါသည်！
          </>
        );
      case "ne":
        return (
          <>
            <span className="text-green-400 font-bold">{targetName}</span> बाट
            निर्णायक प्रमाण सफलतापूर्वक प्राप्त भयो!
          </>
        );
      default:
        return (
          <>
            <span className="text-green-400 font-bold">{targetName}</span>{" "}
            から決定的な証拠の自白に成功しました！
          </>
        );
    }
  };

  const getEvidenceStatusLabel = () => {
    switch (lang) {
      case "en":
        return "Evidence Status:";
      case "my":
        return "သက်သေ အခြေအနေ:";
      case "ne":
        return "प्रमाण स्थिति:";
      default:
        return "押収ステータス:";
    }
  };

  const getEvidenceStatusValue = () => {
    switch (lang) {
      case "en":
        return "SEIZED & ARCHIVED";
      case "my":
        return "သိမ်းဆည်းပြီး မှတ်တမ်းတင်ပြီး";
      case "ne":
        return "जफत र अभिलेख गरियो";
      default:
        return "押収・事件ファイルへ保管済";
    }
  };

  const getNextBtnText = () => {
    switch (lang) {
      case "en":
        return "Proceed to Next Mission ❯";
      case "my":
        return "နောက်ထပ် ပစ်မှတ် စုံစမ်းရန် ❯";
      case "ne":
        return "अर्को मिसनमा जानुहोस् ❯";
      default:
        return "次のターゲットの捜査へ ❯";
    }
  };

  const getArchiveBtnText = () => {
    switch (lang) {
      case "en":
        return "📂 View Evidence Archives";
      case "my":
        return "📂 သက်သေ မှတ်တမ်းတွဲ ဖွင့်ရန်";
      case "ne":
        return "📂 प्रमाण अभिलेख हेर्नुहोस्";
      default:
        return "📂 押収した事件ファイルを開く";
    }
  };

  const getLowDangerText = () => {
    switch (lang) {
      case "en":
        return "Low Danger Targets:";
      case "my":
        return "အဆင့်နိမ့် ပစ်မှတ်များ:";
      case "ne":
        return "कम जोखिम लक्ष्य:";
      default:
        return "難易度・低の摘発:";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-gradient-to-b from-gray-900 via-gray-950 to-black border-2 border-green-500 rounded-2xl p-6 shadow-[0_0_50px_rgba(34,197,94,0.4)] text-center overflow-hidden">
        {/* 背景のグリッド＆スキャンライン装飾 */}
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

        {/* スタンプ風バッジ */}
        <div className="inline-block transform -rotate-6 mb-4 px-4 py-1.5 bg-green-500/20 border-2 border-green-400 text-green-300 font-extrabold text-sm md:text-base tracking-widest rounded shadow-lg animate-bounce">
          {getBustedBadge()}
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-wide">
          {getMissionClearedTitle()}
        </h2>

        <p className="text-sm text-gray-300 mb-4">{getEvidenceDesc()}</p>

        {/* 証拠押収ボックス */}
        <div className="bg-gray-900/90 border border-green-500/40 rounded-xl p-4 mb-4 text-left space-y-2">
          <div className="text-xs text-green-400 font-bold flex items-center gap-1.5">
            <span>🚨</span>
            <span>{getEvidenceStatusLabel()}</span>
            <span className="text-white ml-auto">
              {getEvidenceStatusValue()}
            </span>
          </div>

          {unlockedNewLevel ? (
            <div className="mt-3 p-2.5 bg-yellow-950/60 border border-yellow-500/80 rounded-lg text-xs text-yellow-300 font-bold flex items-center gap-2 animate-pulse">
              <span className="text-base">🔓</span>
              <span>{unlockedNewLevel}</span>
            </div>
          ) : clearedLevel === "easy" ? (
            <div className="text-xs text-gray-400 pt-1 border-t border-gray-800 flex justify-between">
              <span>{getLowDangerText()}</span>
              <span className="text-green-400 font-bold">
                {easyClearedCount} / {totalEasyCount}
              </span>
            </div>
          ) : null}
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-black font-black text-sm rounded-xl transition duration-200 shadow-lg shadow-green-600/30 cursor-pointer"
          >
            {getNextBtnText()}
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenArchive();
            }}
            className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold rounded-xl transition cursor-pointer border border-gray-700"
          >
            {getArchiveBtnText()}
          </button>
        </div>
      </div>
    </div>
  );
}
