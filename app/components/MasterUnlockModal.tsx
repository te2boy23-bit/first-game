"use client";

interface MasterUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuyPremium: () => void;
  onWatchAd: () => void;
  adWatchCount: number;
  lang: "ja" | "en";
}

export default function MasterUnlockModal({
  isOpen,
  onClose,
  onBuyPremium,
  onWatchAd,
  adWatchCount,
  lang,
}: MasterUnlockModalProps) {
  if (!isOpen) return null;

  const isEn = lang === "en";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-gray-900 via-gray-950 to-black border-2 border-yellow-500 rounded-3xl p-6 md:p-8 shadow-2xl shadow-yellow-500/20 text-center overflow-hidden">
        {/* 背景の光沢エフェクト */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* トロフィー・バッジ */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-500/20 border border-yellow-400 text-3xl mb-4 shadow-lg shadow-yellow-500/30 animate-bounce">
          👑
        </div>

        {/* タイトル */}
        <div className="text-xs uppercase tracking-widest text-yellow-400 font-mono font-bold mb-1">
          {isEn ? "FREE TIER COMPLETED" : "★ 無料捜査パート完全制覇 ★"}
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
          {isEn
            ? "Unlock Infinite Master Mode!"
            : "【最凶エンドレスモード】へ突入せよ！"}
        </h2>

        {/* 説明文 */}
        <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-6 px-2">
          {isEn ? (
            <>
              Congratulations! You busted all 18 targets across Low, Medium, and
              Hard. Beyond this line lies the{" "}
              <span className="text-yellow-400 font-bold">
                Infinite Supreme Syndicate
              </span>
              . Levels will rise endlessly with new generated kingpins!
            </>
          ) : (
            <>
              お見事です！【弱:3件】【中:6件】【強:9件】の全18ターゲットを摘発しました。
              ここから先は、次々と新たな首謀者が立ちはだかる
              <span className="text-yellow-400 font-bold">
                「終わりなき最凶エンドレス捜査」
              </span>
              となります！
            </>
          )}
        </p>

        {/* 2つの解放ボタン */}
        <div className="space-y-3 mb-4">
          <button
            onClick={onBuyPremium}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-amber-300 text-black font-black text-sm md:text-base rounded-2xl transition duration-200 shadow-xl shadow-yellow-500/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>💎</span>
            <span>
              {isEn ? "Buy Premium & Instant Unlock" : "課金で即時アンロック"}
            </span>
          </button>

          <button
            onClick={onWatchAd}
            className="w-full py-3 px-6 bg-blue-600/90 hover:bg-blue-500 text-white font-bold text-xs md:text-sm rounded-2xl border border-blue-400/40 transition duration-200 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>📺</span>
            <span>
              {isEn
                ? `Watch 2 Ads for Free Access (${adWatchCount}/2)`
                : `広告を2回見て無料アンロック (${adWatchCount}/2)`}
            </span>
          </button>
        </div>

        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="text-xs text-gray-500 hover:text-gray-300 transition underline cursor-pointer"
        >
          {isEn ? "Review Case Files for now" : "ひとまず事件記録を確認する"}
        </button>
      </div>
    </div>
  );
}
