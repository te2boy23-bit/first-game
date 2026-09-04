"use client";

interface GameOverModalProps {
  isOpen: boolean;
  onRetry: () => void;
  onClose: () => void;
  targetName: string;
  lang: "ja" | "en" | "my" | "ne";
}

export default function GameOverModal({
  isOpen,
  onRetry,
  onClose,
  targetName,
  lang,
}: GameOverModalProps) {
  if (!isOpen) return null;

  const getFailedBadge = () => {
    switch (lang) {
      case "en":
        return "MISSION FAILED • BLOCKED";
      case "my":
        return "စုံစမ်းစစ်ဆေးမှု မအောင်မြင် • ပိတ်ပင်ခံရသည်";
      case "ne":
        return "मिसन असफल भयो • ब्लक गरियो";
      default:
        return "潜入捜査 失敗 • 逃亡";
    }
  };

  const getTargetEscapedTitle = () => {
    switch (lang) {
      case "en":
        return "TARGET ESCAPED!";
      case "my":
        return "ပစ်မှတ် ထွက်ပြေးလွတ်မြောက်သွားသည်!";
      case "ne":
        return "लक्ष्य भाग्यो!";
      default:
        return "ブロックされました！";
    }
  };

  const getTargetEscapedDesc = () => {
    switch (lang) {
      case "en":
        return (
          <>
            <span className="text-red-400 font-bold">{targetName}</span> grew
            suspicious and blocked your account. The target fled!
          </>
        );
      case "my":
        return (
          <>
            <span className="text-red-400 font-bold">{targetName}</span> က
            သင့်ကို သံသယဝင်ပြီး အကောင့်ကို ပိတ်ပင်ကာ ထွက်ပြေးသွားပါသည်！
          </>
        );
      case "ne":
        return (
          <>
            <span className="text-red-400 font-bold">{targetName}</span> ले शंका
            गरेर तपाईंको खाता ब्लक गर्यो। लक्ष्य भाग्यो!
          </>
        );
      default:
        return (
          <>
            <span className="text-red-400 font-bold">{targetName}</span>{" "}
            の警戒度がMAXに達し、アカウントがブロックされました。ターゲットは逃亡しました！
          </>
        );
    }
  };

  const getTipLabel = () => {
    switch (lang) {
      case "en":
        return "Investigation Tip:";
      case "my":
        return "စုံစမ်းစစ်ဆေးရေး အကြံပြုချက်:";
      case "ne":
        return "अनुसन्धान सुझाव:";
      default:
        return "捜査のヒント:";
    }
  };

  const getTipDesc = () => {
    switch (lang) {
      case "en":
        return "Avoid questioning too aggressively or talking off-topic. Flatter them or pretend to comply so they drop their guard.";
      case "my":
        return "ရန်လိုလွန်းသော မေးခွန်းများ မေးခြင်း သို့မဟုတ် မဆိုင်သော စကားများ မပြောပါနှင့်။ ၎င်းတို့ သတိလက်လွတ်ဖြစ်စေရန် လိုက်လျောဟန်ဆောင်ပါ။";
      case "ne":
        return "अति आक्रामक प्रश्नहरू सोध्ने वा अनावश्यक कुरा नगर्नुहोस्। उनीहरूको सतर्कता हटाउन सहमत भएको नाटक गर्नुहोस्।";
      default:
        return "無関係な雑談や警戒しすぎた質問を繰り返すと怪しまれます。うまくおだてたり、素直に従うフリをして油断を誘いましょう。";
    }
  };

  const getRetryBtnText = () => {
    switch (lang) {
      case "en":
        return "Retry this Target (Fresh Start)";
      case "my":
        return "ဤပစ်မှတ်ကို ပြန်လည်စုံစမ်းရန်";
      case "ne":
        return "यो लक्ष्य पुनः अनुसन्धान गर्नुहोस्";
      default:
        return "このターゲットを再捜査（リトライ）";
    }
  };

  const getCloseBtnText = () => {
    switch (lang) {
      case "en":
        return "Return to Inbox";
      case "my":
        return "စာပုံးသို့ ပြန်သွားရန်";
      case "ne":
        return "इनबक्समा फर्कनुहोस्";
      default:
        return "受信トレイに戻る";
    }
  };

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
          {getFailedBadge()}
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-red-400 mb-2 tracking-wide">
          {getTargetEscapedTitle()}
        </h2>

        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          {getTargetEscapedDesc()}
        </p>

        <div className="bg-red-950/60 border border-red-800/80 rounded-xl p-3 mb-6 text-xs text-red-300 space-y-1 text-left">
          <div className="font-bold flex items-center gap-1 text-red-400">
            <span>💡</span>
            <span>{getTipLabel()}</span>
          </div>
          <p className="text-gray-300">{getTipDesc()}</p>
        </div>

        {/* ボタン */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onRetry}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm rounded-xl transition duration-200 shadow-lg shadow-red-600/40 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            <span>{getRetryBtnText()}</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-gray-400 text-xs font-semibold rounded-xl transition cursor-pointer border border-gray-800"
          >
            {getCloseBtnText()}
          </button>
        </div>
      </div>
    </div>
  );
}
