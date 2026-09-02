"use client";

interface ClearModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName: string;
  clearedLevel: "easy" | "medium" | "hard" | "master";
  easyClearedCount: number;
  totalEasyCount: number;
  unlockedNewLevel?: string | null;
  lang: "ja" | "en";
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

  const isEn = lang === "en";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-gradient-to-b from-gray-900 via-gray-950 to-black border-2 border-green-500 rounded-2xl p-6 shadow-[0_0_50px_rgba(34,197,94,0.4)] text-center overflow-hidden">
        {/* 背景のグリッド＆スキャンライン装飾 */}
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

        {/* スタンプ風バッジ */}
        <div className="inline-block transform -rotate-6 mb-4 px-4 py-1.5 bg-green-500/20 border-2 border-green-400 text-green-300 font-extrabold text-sm md:text-base tracking-widest rounded shadow-lg animate-bounce">
          {isEn ? "★ TARGET BUSTED ★" : "★ 摘発・検挙完了 ★"}
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-wide">
          {isEn ? "MISSION CLEARED!" : "捜査任務 成功！"}
        </h2>

        <p className="text-sm text-gray-300 mb-4">
          {isEn ? (
            <>
              Successfully extracted decisive evidence from{" "}
              <span className="text-green-400 font-bold">{targetName}</span>!
            </>
          ) : (
            <>
              <span className="text-green-400 font-bold">{targetName}</span>{" "}
              から決定的な証拠の自白に成功しました！
            </>
          )}
        </p>

        {/* 証拠押収ボックス */}
        <div className="bg-gray-900/90 border border-green-500/40 rounded-xl p-4 mb-4 text-left space-y-2">
          <div className="text-xs text-green-400 font-bold flex items-center gap-1.5">
            <span>🚨</span>
            <span>{isEn ? "Evidence Status:" : "押収ステータス:"}</span>
            <span className="text-white ml-auto">
              {isEn ? "SEIZED & ARCHIVED" : "押収・事件ファイルへ保管済"}
            </span>
          </div>

          {unlockedNewLevel ? (
            <div className="mt-3 p-2.5 bg-yellow-950/60 border border-yellow-500/80 rounded-lg text-xs text-yellow-300 font-bold flex items-center gap-2 animate-pulse">
              <span className="text-base">🔓</span>
              <span>{unlockedNewLevel}</span>
            </div>
          ) : clearedLevel === "easy" ? (
            <div className="text-xs text-gray-400 pt-1 border-t border-gray-800 flex justify-between">
              <span>{isEn ? "Low Danger Targets:" : "難易度・低の摘発:"}</span>
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
            {isEn ? "Proceed to Next Mission ❯" : "次のターゲットの捜査へ ❯"}
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenArchive();
            }}
            className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold rounded-xl transition cursor-pointer border border-gray-700"
          >
            {isEn
              ? "📂 View Evidence Archives"
              : "📂 押収した事件ファイルを開く"}
          </button>
        </div>
      </div>
    </div>
  );
}
