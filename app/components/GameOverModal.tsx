"use client";

interface GameOverModalProps {
  isOpen: boolean;
  onRetry: () => void;
  onClose: () => void;
  targetName: string;
  lang: "ja" | "en";
}

export default function GameOverModal({
  isOpen,
  onRetry,
  onClose,
  targetName,
  lang,
}: GameOverModalProps) {
  if (!isOpen) return null;

  const isEn = lang === "en";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-gradient-to-b from-gray-950 via-red-950/40 to-black border-2 border-red-600 rounded-2xl p-6 shadow-[0_0_60px_rgba(220,38,38,0.5)] text-center overflow-hidden">
        {/* 背景の警告ストライプ装飾 */}
        <div className="absolute -top-12 -left-12 -right-12 h-16 bg-red-600/20 rotate-12 blur-xl pointer-events-none" />

        {/* 警告アイコン */}
        <div className="w-16 h-16 mx-auto mb-3 bg-red-600/20 border-2 border-red-500 rounded-full flex items-center justify-center text-3xl text-red-400 animate-pulse">
          ⚠️
        </div>

        {/* 警告バッジ */}
        <div className="inline-block mb-3 px-3 py-1 bg-red-600 text-white font-extrabold text-xs tracking-widest rounded-full uppercase shadow-md">
          {isEn ? "MISSION FAILED • BLOCKED" : "潜入捜査 失敗 • 逃亡"}
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-red-400 mb-2 tracking-wide">
          {isEn ? "TARGET ESCAPED!" : "ブロックされました！"}
        </h2>

        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          {isEn ? (
            <>
              <span className="text-red-400 font-bold">{targetName}</span> grew
              suspicious and blocked your account. The target fled!
            </>
          ) : (
            <>
              <span className="text-red-400 font-bold">{targetName}</span>{" "}
              の警戒度がMAXに達し、アカウントがブロックされました。ターゲットは逃亡しました！
            </>
          )}
        </p>

        <div className="bg-red-950/60 border border-red-800/80 rounded-xl p-3 mb-6 text-xs text-red-300 space-y-1 text-left">
          <div className="font-bold flex items-center gap-1 text-red-400">
            <span>💡</span>
            <span>{isEn ? "Investigation Tip:" : "捜査のヒント:"}</span>
          </div>
          <p className="text-gray-300">
            {isEn
              ? "Avoid questioning too aggressively or talking off-topic. Flatter them or pretend to comply so they drop their guard."
              : "無関係な雑談や警戒しすぎた質問を繰り返すと怪しまれます。うまくおだてたり、素直に従うフリをして油断を誘いましょう。"}
          </p>
        </div>

        {/* ボタン */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onRetry}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm rounded-xl transition duration-200 shadow-lg shadow-red-600/40 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            <span>
              {isEn
                ? "Retry this Target (Fresh Start)"
                : "このターゲットを再捜査（リトライ）"}
            </span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-gray-400 text-xs font-semibold rounded-xl transition cursor-pointer border border-gray-800"
          >
            {isEn ? "Return to Inbox" : "受信トレイに戻る"}
          </button>
        </div>
      </div>
    </div>
  );
}
