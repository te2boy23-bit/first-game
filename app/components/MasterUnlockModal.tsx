"use client";

interface MasterUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuyPremium: () => void;
  onWatchAd: () => void;
  adWatchCount: number;
  lang: "ja" | "en" | "my" | "ne";
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

  const getCompletedTag = () => {
    switch (lang) {
      case "en":
        return "FREE TIER COMPLETED";
      case "my":
        return "အခမဲ့ စုံစမ်းစစ်ဆေးမှု ပြီးဆုံးပါပြီ";
      case "ne":
        return "निःशुल्क अनुसन्धान पूरा भयो";
      default:
        return "★ 無料捜査パート完全制覇 ★";
    }
  };

  const getMasterTitle = () => {
    switch (lang) {
      case "en":
        return "Unlock Infinite Master Mode!";
      case "my":
        return "အဆုံးမဲ့ မာစတာ အဆင့်ကို ဖွင့်ပါ!";
      case "ne":
        return "अनन्त मास्टर मोड अनलक गर्नुहोस्!";
      default:
        return "【最凶エンドレスモード】へ突入せよ！";
    }
  };

  const getMasterDesc = () => {
    switch (lang) {
      case "en":
        return (
          <>
            Congratulations! You busted all 18 targets across Low, Medium, and
            Hard. Beyond this line lies the{" "}
            <span className="text-yellow-400 font-bold">
              Infinite Supreme Syndicate
            </span>
            . Levels will rise endlessly with new generated kingpins!
          </>
        );
      case "my":
        return (
          <>
            ဂုဏ်ယူပါသည်！ အဆင့်နိမ့်၊ အလယ်အလတ်နှင့် အဆင့်မြင့် ပစ်မှတ် ၁၈
            ခုလုံးကို အောင်မြင်စွာ ဖမ်းဆီးနိုင်ခဲ့ပါပြီ။ ဤနေရာမှစ၍
            ခေါင်းဆောင်သစ်များ အဆက်မပြတ် ပေါ်ထွက်လာမည့်{" "}
            <span className="text-yellow-400 font-bold">
              「အဆုံးမဲ့ မာစတာ လျှို့ဝှက်စုံစမ်းစစ်ဆေးရေး」
            </span>
            သို့ ရောက်ရှိပါမည်！
          </>
        );
      case "ne":
        return (
          <>
            बधाई छ! तपाईंले कम, मध्यम र कडा गरी १८ वटै लक्ष्यहरू पक्राउ
            गर्नुभयो। अब नयाँ मालिकहरू निरन्तर देखा पर्ने{" "}
            <span className="text-yellow-400 font-bold">
              「अनन्त सर्वोच्च सिन्डिकेट अनुसन्धान」
            </span>
            सुरु हुनेछ!
          </>
        );
      default:
        return (
          <>
            お見事です！【弱:3件】【中:6件】【強:9件】の全18ターゲットを摘発しました。
            ここから先は、次々と新たな首謀者が立ちはだかる
            <span className="text-yellow-400 font-bold">
              「終わりなき最凶エンドレス捜査」
            </span>
            となります！
          </>
        );
    }
  };

  const getBuyPremiumBtn = () => {
    switch (lang) {
      case "en":
        return "Buy Premium & Instant Unlock";
      case "my":
        return "ပရီမီယံ ဝယ်ယူပြီး ချက်ချင်းဖွင့်ရန်";
      case "ne":
        return "प्रिमियम खरिद गरी तुरुन्त अनलक गर्नुहोस्";
      default:
        return "課金で即時アンロック";
    }
  };

  const getWatchAdBtn = () => {
    switch (lang) {
      case "en":
        return `Watch 2 Ads for Free Access (${adWatchCount}/2)`;
      case "my":
        return `အခမဲ့ဖွင့်ရန် ကြော်ငြာ ၂ ခု ကြည့်ပါ (${adWatchCount}/2)`;
      case "ne":
        return `निःशुल्क खोल्न २ विज्ञापन हेर्नुहोस् (${adWatchCount}/2)`;
      default:
        return `広告を2回見て無料アンロック (${adWatchCount}/2)`;
    }
  };

  const getCloseBtn = () => {
    switch (lang) {
      case "en":
        return "Review Case Files for now";
      case "my":
        return "လောလောဆယ် အမှုမှတ်တမ်းကို စစ်ဆေးမည်";
      case "ne":
        return "अहिलेका लागि मुद्दा अभिलेख हेर्नुहोस्";
      default:
        return "ひとまず事件記録を確認する";
    }
  };

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
          {getCompletedTag()}
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
          {getMasterTitle()}
        </h2>

        {/* 説明文 */}
        <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-6 px-2">
          {getMasterDesc()}
        </p>

        {/* 2つの解放ボタン */}
        <div className="space-y-3 mb-4">
          <button
            onClick={onBuyPremium}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-amber-300 text-black font-black text-sm md:text-base rounded-2xl transition duration-200 shadow-xl shadow-yellow-500/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>💎</span>
            <span>{getBuyPremiumBtn()}</span>
          </button>

          <button
            onClick={onWatchAd}
            className="w-full py-3 px-6 bg-blue-600/90 hover:bg-blue-500 text-white font-bold text-xs md:text-sm rounded-2xl border border-blue-400/40 transition duration-200 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>📺</span>
            <span>{getWatchAdBtn()}</span>
          </button>
        </div>

        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="text-xs text-gray-500 hover:text-gray-300 transition underline cursor-pointer"
        >
          {getCloseBtn()}
        </button>
      </div>
    </div>
  );
}
